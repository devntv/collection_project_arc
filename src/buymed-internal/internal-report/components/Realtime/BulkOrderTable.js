import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box,
    Button,
    Grid,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import { makeStyles } from '@material-ui/styles';
import { APIStatus } from '@thuocsi/nextjs-components/lib/common';
import Loader from '@thuocsi/nextjs-components/loader/loader';
import { MuiAutoFuzzy } from '@thuocsi/nextjs-components/muiauto-fuzzy/muiauto-fuzzy';
import MuiMultipleAuto from '@thuocsi/nextjs-components/muiauto/multiple';
import MuiSingleAuto from '@thuocsi/nextjs-components/muiauto/single';
import MyTablePagination from '@thuocsi/nextjs-components/my-pagination/my-pagination';
import { getProductClient } from 'client/product';
import { getAccountClient } from 'clients/account';
import { getRealtimeClient } from 'clients/realtime';
import { getWarehouseClient } from 'clients/warehouse';
import { DateRangePickerInput } from 'components/DatePicker';
import { formatNumber } from 'components/utils';
import { getFormattedDate } from 'lib/DateTimeUtil';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { getData, pushData } from 'utilities/localStorage';
import {
    CONFIRM_STATUS,
    INTERNAL_SELLERS,
    PURCHASER_CODE,
    REGIONS,
    WAREHOUSE_CODES
} from 'utilities/realtime-constants';
import { v4 as uuidv4 } from 'uuid';
import Countdown from './Countdown';

async function loadData({ params = null }) {
    let newParamsQuery = { ...params };

    const newQ = JSON.stringify(newParamsQuery.q);
    newParamsQuery.q = newQ;
    let bulkOrderRes = await getRealtimeClient(null, {}).getBulkOrderData(
        newParamsQuery
    );
    let bulkOrderData = [];
    let total = 0;

    if (bulkOrderRes?.status === APIStatus.OK) {
        bulkOrderData = bulkOrderRes?.data || [];
        total = bulkOrderRes?.total || 0;
    }

    // convert data
    // name of products
    let skus = [];
    let productsCode = [];
    bulkOrderData.forEach((item) => {
        productsCode.push(item?.productCode);
        skus.push(item?.sku);
    });
    const productResult = await getProductClient(null, {}).getProductByCodes(
        productsCode
    );
    let productMap = {};

    if (productResult?.status === APIStatus.OK) {
        // map
        productResult.data.forEach((product) => {
            productMap[product.code] = product;
        });
        // add name
        bulkOrderData.forEach((item) => {
            item.productName =
                productMap[item.productCode] &&
                productMap[item.productCode].name;
        });
    }

    // inventory sku
    let warehousePromises = [];
    bulkOrderData.forEach((item) => {
        // hardcode warehouse
        let warehouseCode = WAREHOUSE_CODES[item?.regionCode] || '';
        let qStringify = JSON.stringify({
            sku: item?.sku,
            warehouseCode
        });
        warehousePromises.push(
            getWarehouseClient(null, {}).getInventorySku({
                q: qStringify,
                offset: 0,
                limit: 1000,
                getTotal: false
            })
        );
    });
    let warehouseRes = await Promise.all(warehousePromises);
    // inventory quantity
    let inventoryWarehouseMap = {};
    warehouseRes.forEach((item) => {
        if (item?.status === APIStatus.OK) {
            inventoryWarehouseMap[item?.data[0]?.sku] = item?.data[0];
        }
    });
    bulkOrderData.forEach((item) => {
        item.inventoryQuantity =
            inventoryWarehouseMap[item.sku]?.availableQuantity || 0;
    });

    // pic, cic account
    let cicIds = [];
    let picIds = [];
    bulkOrderData.forEach((item) => {
        cicIds.push(item?.categoryInChargeAccountID);
        picIds.push(item?.purchaserInChargeAccountID);
    });
    const accRes = await getAccountClient(null, {}).getAccounts([
        ...cicIds,
        ...picIds
    ]);

    if (accRes?.status === APIStatus.OK) {
        bulkOrderData.forEach((item) => {
            item.cicAccountName =
                accRes?.data?.find(
                    (acc) => acc.accountId === item.categoryInChargeAccountID
                )?.fullname || '';
            item.picAccountName =
                accRes?.data?.find(
                    (acc) => acc.accountId === item.purchaserInChargeAccountID
                )?.fullname || '';
        });
    }

    return { bulkOrderData, total };
}

const useStyles = makeStyles({
    select: {
        padding: 0,
        paddingLeft: '15px',
        lineHeight: '40px'
    },
    borderRight: {
        borderRight: '1px solid #C4C4C4'
    },
    filterWrapper: {
        maxWidth: '14%',
        flexBasis: '14%',
        rowGap: '8px'
    },
    button: {
        '&:hover': {
            backgroundImage: 'linear-gradient(rgb(0 0 0/10%) 0 0)'
        }
    }
});

function BulkOrderTable({
    regions = null,
    rows = null,
    isDisplayFilter = true,
    isDisplayPagination = true,
    showCountdown = false,
    source = null
}) {
    const { t } = useTranslation();
    const classes = useStyles();

    const DEFAULT_PARAMS_QUERY = {
        getTotal: true,
        offset: 0,
        limit: 20,
        page: 0,
        sort: 'order_time_DESC',
        q: {}
    };
    const DEFAULT_FILTERS = {
        sku: '',
        regions: [],
        purchaserInCharge: '',
        categoryInCharge: '',
        orderTimeQuery: { start: null, end: null }
    };

    const [paramsQuery, setParamsQuery] = useState(DEFAULT_PARAMS_QUERY);
    const [tableData, setTableData] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [cicOptions, setCicOptions] = useState([]);
    const [picOptions, setPicOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    let formObject = useForm({
        mode: 'onChange',
        defaultValues: DEFAULT_FILTERS
    });

    const getTableData = useCallback(async ({ params = null }) => {
        let localQ;
        if (params) {
            localQ = { ...params };
        } else {
            localQ = { ...DEFAULT_PARAMS_QUERY };
        }

        // call api
        const { bulkOrderData, total = 0 } = await loadData({
            params: localQ
        });
        setTableData(bulkOrderData);
        setTotalData(total);

        // set value to filters
        if (
            formObject.getValues().regions?.length === 0 &&
            localQ?.q?.regionCodeIn?.length > 0
        ) {
            formObject.setValue(
                'regions',
                REGIONS.filter((reg) =>
                    localQ?.q?.regionCodeIn?.includes(reg.value)
                )
            );
        }
        if (
            !formObject.getValues().sku?.value &&
            localQ?.skuSelect &&
            localQ?.q?.sku
        ) {
            formObject.setValue('sku', localQ?.skuSelect || '');
        }
        if (localQ?.q?.orderTimeFromQuery && localQ?.q?.orderTimeToQuery) {
            let orderTimeQ = {};
            orderTimeQ.start = new Date(localQ?.q?.orderTimeFromQuery);
            orderTimeQ.end = new Date(localQ?.q?.orderTimeToQuery);
            formObject.setValue('orderTimeQuery', orderTimeQ);
        }
        if (
            !formObject.getValues().purchaserInCharge?.value &&
            localQ?.picSelect &&
            localQ?.q?.purchaserInChargeAccountID
        ) {
            formObject.setValue('purchaserInCharge', localQ?.picSelect || '');
        }
        if (
            !formObject.getValues().categoryInCharge?.value &&
            localQ?.cicSelect &&
            localQ?.q?.categoryInChargeAccountID
        ) {
            formObject.setValue('categoryInCharge', localQ?.cicSelect || '');
        }

        // reset sort
        localQ.sort = 'order_time_DESC';
        // store to localStorage
        pushData(`${source}.bulkOrder`, JSON.stringify(localQ));
    }, []);

    useEffect(() => {
        // reload page => get data from localStorage to fill filters val
        const localStorageParams =
            JSON.parse(getData(`${source}.bulkOrder`) || null) || null;
        // dashboard page
        let dashboardQ;
        if (rows && Number(rows) > 0) {
            dashboardQ = DEFAULT_PARAMS_QUERY;
            dashboardQ.limit = rows;
            dashboardQ.q.confirmStatus = 'WAIT_TO_CONFIRM';
            dashboardQ.getTotal = false;
        }
        // get data
        try {
            setIsLoading(true);

            if (regions && rows) {
                let regionCodeIn =
                    regions?.map?.((region) => region?.value) || [];
                dashboardQ.q.regionCodeIn = regionCodeIn;
                setParamsQuery(dashboardQ);
                getTableData({ params: dashboardQ });
            } else if (!localStorageParams) {
                getTableData({ params: DEFAULT_PARAMS_QUERY });
            } else {
                setParamsQuery(localStorageParams);
                getTableData({ params: localStorageParams });
            }
        } finally {
            setIsLoading(false);
        }

        // reset localStorage if leave page
        return () => {
            pushData(`${source}.bulkOrder`, null);
        };
    }, [regions]);

    function handleSort(sortType) {
        const newParamsQuery = {
            ...paramsQuery
        };

        if (sortType === 'order_time') {
            newParamsQuery.sort =
                newParamsQuery.sort === 'order_time_DESC'
                    ? 'order_time_ASC'
                    : 'order_time_DESC';
        } else if (sortType === 'total_price') {
            newParamsQuery.sort =
                newParamsQuery.sort === 'total_price_ASC'
                    ? 'total_price_DESC'
                    : 'total_price_ASC';
        }

        if (rows && Number(rows) > 0) {
            newParamsQuery.limit = rows;
        }

        refreshTable({ newParamsQuery });
    }

    function handleChangePage(e, page, rowsPerPage) {
        const newParamsQuery = { ...paramsQuery };
        newParamsQuery.limit = rowsPerPage;
        newParamsQuery.offset = page * rowsPerPage;

        refreshTable({ newParamsQuery });
    }

    async function refreshTable({ newParamsQuery = null }) {
        try {
            setIsLoading(true);
            setParamsQuery(newParamsQuery);
            await getTableData({ params: newParamsQuery });
        } finally {
            setIsLoading(false);
        }
    }

    async function applyFilterCicPic({
        keyword = '',
        isCic = false,
        isPic = false
    }) {
        let optionsAcc = [];
        const searchRes = await getAccountClient(null, {}).getEmployeeV2({
            q: JSON.stringify({ search: keyword }),
            offset: 0,
            limit: 100
        });

        if (searchRes?.status === APIStatus.OK) {
            const { data: dataSeach = [] } = searchRes;
            optionsAcc = dataSeach?.map((item) => {
                const itemResult = {
                    value: item?.accountId,
                    label: `${item?.accountId} - ${item?.fullname}`
                };
                return itemResult;
            });
        }

        if (isCic) {
            setCicOptions(optionsAcc);
        } else if (isPic) {
            setPicOptions(optionsAcc);
        }
    }

    return (
        <>
            {isLoading && <Loader show={true} />}
            {/* filter */}
            {isDisplayFilter && (
                <Grid
                    container
                    style={{
                        width: '100%',
                        marginTop: '34px',
                        rowGap: '48px',
                        columnGap: '20px'
                    }}
                    justifyContent="flex-start"
                >
                    {/* select region */}
                    <Grid item className={classes.filterWrapper} container>
                        <Box
                            sx={{
                                color: 'black',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                alignSelf: 'center'
                            }}
                        >
                            {t('realtime:choose_region')}
                        </Box>
                        <Grid item xs={12}>
                            <MuiMultipleAuto
                                id="regions"
                                options={REGIONS}
                                name="regions"
                                placeholder={t('realtime:choose_region')}
                                control={formObject?.control}
                                errors={formObject?.errors}
                                onValueChange={() => {
                                    let regionCodeIn =
                                        formObject
                                            .getValues()
                                            ?.regions?.map?.(
                                                (region) => region?.value
                                            ) || [];
                                    const newParamsQuery = {
                                        ...paramsQuery
                                    };
                                    newParamsQuery.q.regionCodeIn =
                                        regionCodeIn;
                                    newParamsQuery.offset = 0;

                                    refreshTable({ newParamsQuery });
                                }}
                            />
                        </Grid>
                    </Grid>
                    {/* select sku */}
                    <Grid item className={classes.filterWrapper} container>
                        <Box
                            sx={{
                                color: 'black',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                alignSelf: 'center'
                            }}
                        >
                            {t('realtime:filters.sku')}
                        </Box>
                        <Grid item xs={12}>
                            <MuiAutoFuzzy
                                type={'SKU'}
                                componentType={'MUI_SINGLE'}
                                name="sku"
                                placeholder={t('realtime:placeholder_sku')}
                                labelFormatOption="ID-NAME-SKU"
                                filterForm={formObject}
                                onValueChange={(val) => {
                                    const sku = val?.value || '';
                                    const newParamsQuery = { ...paramsQuery };
                                    newParamsQuery.q.sku = sku;
                                    newParamsQuery.skuSelect = sku ? val : null;
                                    newParamsQuery.offset = 0;

                                    refreshTable({ newParamsQuery });
                                }}
                                conditions={[{ sellers: INTERNAL_SELLERS }]}
                            />
                        </Grid>
                    </Grid>
                    {/* select status */}
                    <Grid item className={classes.filterWrapper} container>
                        <Box
                            sx={{
                                color: 'black',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                alignSelf: 'center'
                            }}
                        >
                            {t('realtime:filters.status')}
                        </Box>
                        <Select
                            id="region"
                            variant="outlined"
                            fullWidth
                            displayEmpty
                            placeholder={t('realtime:filters.status')}
                            size={'small'}
                            // defaultValue={CONFIRM_STATUS[0].value}
                            value={
                                paramsQuery?.q?.confirmStatus ||
                                CONFIRM_STATUS[0].value
                            }
                            onChange={(e) => {
                                const confirmStatus = e.target?.value || '';
                                const newParamsQuery = { ...paramsQuery };
                                newParamsQuery.q.confirmStatus = confirmStatus;
                                newParamsQuery.offset = 0;

                                refreshTable({ newParamsQuery });
                            }}
                            classes={{
                                select: classes.select
                            }}
                        >
                            {CONFIRM_STATUS.map((item) => (
                                <MenuItem value={item.value} key={item.value}>
                                    {item.name}{' '}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    {/* select manager */}
                    <Grid item className={classes.filterWrapper} container>
                        <Box
                            sx={{
                                color: 'black',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                alignSelf: 'center'
                            }}
                        >
                            {t('realtime:filters.pic')}
                        </Box>
                        <Grid item xs={12}>
                            <MuiSingleAuto
                                id="purchaserInCharge"
                                options={picOptions}
                                name="purchaserInCharge"
                                placeholder={t('realtime:placeholder_pic')}
                                control={formObject.control}
                                errors={formObject.errors}
                                onFieldChange={(val) => {
                                    applyFilterCicPic({
                                        keyword: val,
                                        isPic: true
                                    });
                                }}
                                onValueChange={(val) => {
                                    const purchaserInChargeAccountID =
                                        val?.value || null;
                                    const newParamsQuery = { ...paramsQuery };
                                    newParamsQuery.q.purchaserInChargeAccountID =
                                        purchaserInChargeAccountID;
                                    newParamsQuery.picSelect =
                                        purchaserInChargeAccountID ? val : null;
                                    newParamsQuery.offset = 0;

                                    refreshTable({ newParamsQuery });
                                }}
                            />
                        </Grid>
                    </Grid>
                    {/* select category manager */}
                    <Grid item className={classes.filterWrapper} container>
                        <Box
                            sx={{
                                color: 'black',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                alignSelf: 'center'
                            }}
                        >
                            {t('realtime:filters.cic')}
                        </Box>
                        <Grid item xs={12}>
                            <MuiSingleAuto
                                id="categoryInCharge"
                                options={cicOptions}
                                name="categoryInCharge"
                                placeholder={t('realtime:placeholder_cic')}
                                control={formObject.control}
                                errors={formObject.errors}
                                onFieldChange={(val) => {
                                    applyFilterCicPic({
                                        keyword: val,
                                        isCic: true
                                    });
                                }}
                                onValueChange={(val) => {
                                    const categoryInChargeAccountID =
                                        val?.value || null;
                                    const newParamsQuery = { ...paramsQuery };
                                    newParamsQuery.q.categoryInChargeAccountID =
                                        categoryInChargeAccountID;
                                    newParamsQuery.cicSelect =
                                        categoryInChargeAccountID ? val : null;
                                    newParamsQuery.offset = 0;

                                    refreshTable({ newParamsQuery });
                                }}
                            />
                        </Grid>
                    </Grid>
                    {/* select date */}
                    <Grid item className={classes.filterWrapper} container>
                        <Box
                            sx={{
                                color: 'black',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                alignSelf: 'center'
                            }}
                        >
                            {t('realtime:filters.order_date')}
                        </Box>
                        <Controller
                            name="orderTimeQuery"
                            control={formObject.control}
                            render={({ onChange, value, error }) => (
                                <DateRangePickerInput
                                    id="createdTime"
                                    // maxRange={30}
                                    fullWidth
                                    height={'40px'}
                                    size="small"
                                    value={value}
                                    showClearIc
                                    onChange={(e) => {
                                        onChange(e);
                                        const newParamsQuery = {
                                            ...paramsQuery
                                        };

                                        if (e?.start && e?.end) {
                                            const orderTimeFromQuery = new Date(
                                                e?.start
                                            ).toISOString();
                                            const orderTimeToQuery = new Date(
                                                e?.end
                                            ).toISOString();
                                            newParamsQuery.q.orderTimeFromQuery =
                                                orderTimeFromQuery;
                                            newParamsQuery.q.orderTimeToQuery =
                                                orderTimeToQuery;
                                        } else {
                                            newParamsQuery.q.orderTimeFromQuery =
                                                null;
                                            newParamsQuery.q.orderTimeToQuery =
                                                null;
                                        }
                                        newParamsQuery.offset = 0;

                                        refreshTable({ newParamsQuery });
                                    }}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                />
                            )}
                        ></Controller>
                    </Grid>
                    <Grid item container xs={1}>
                        <Button
                            className={classes.button}
                            style={{
                                whiteSpace: 'nowrap',
                                backgroundColor: '#d9d9d9',
                                height: '40px',
                                marginTop: '26px'
                            }}
                            variant="contained"
                            onClick={() => {
                                const sort = paramsQuery.sort;
                                formObject.reset(DEFAULT_FILTERS);

                                const newParamsQuery = {
                                    ...DEFAULT_PARAMS_QUERY,
                                    sort
                                };

                                refreshTable({ newParamsQuery });
                            }}
                        >
                            {t('realtime:clear_filters')}
                        </Button>
                    </Grid>
                </Grid>
            )}
            {showCountdown && (
                <Grid
                    container
                    justifyContent="flex-end"
                    style={{ margin: '15px 0px' }}
                >
                    <Countdown
                        key={uuidv4()}
                        t={t}
                        callback={getTableData}
                        params={{ params: paramsQuery }}
                    />
                </Grid>
            )}
            {/* table */}
            <Grid
                container
                style={{
                    width: '100%'
                    // marginTop: '20px'
                }}
            >
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead style={{ backgroundColor: '#f0f0f0' }}>
                            <TableRow>
                                <TableCell
                                    align="left"
                                    className={classes.borderRight}
                                >
                                    {t('realtime:order_id')}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    className={classes.borderRight}
                                >
                                    <Grid
                                        container
                                        style={{ minWidth: 90, columnGap: 4 }}
                                        justifyContent="center"
                                    >
                                        <span>{t('realtime:order_date')}</span>
                                        <Tooltip
                                            title={
                                                paramsQuery?.sort ===
                                                    'order_time_ASC' ||
                                                paramsQuery?.sort === ''
                                                    ? t(
                                                          'realtime:tooltip_sort_asc'
                                                      )
                                                    : t(
                                                          'realtime:tooltip_sort_desc'
                                                      )
                                            }
                                        >
                                            <span>
                                                <FontAwesomeIcon
                                                    icon={
                                                        paramsQuery?.sort ===
                                                        'order_time_ASC'
                                                            ? faChevronUp
                                                            : faChevronDown
                                                    }
                                                    size="1x"
                                                    style={{
                                                        cursor: 'pointer',
                                                        color: [
                                                            'order_time_ASC',
                                                            'order_time_DESC'
                                                        ].includes(
                                                            paramsQuery?.sort
                                                        )
                                                            ? '#00b46e'
                                                            : '#000'
                                                    }}
                                                    onClick={() =>
                                                        handleSort('order_time')
                                                    }
                                                />
                                            </span>
                                        </Tooltip>
                                    </Grid>
                                </TableCell>
                                {/* <TableCell align='center'>Tên khách hàng</TableCell> */}
                                <TableCell
                                    align="left"
                                    className={classes.borderRight}
                                    width="150px"
                                >
                                    {t('realtime:seller_location')}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    className={classes.borderRight}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            minHeight: '60px'
                                        }}
                                    >
                                        <span>SKU</span>
                                        <Tooltip
                                            title={t(
                                                'realtime:tooltip_warehouse_region'
                                            )}
                                        >
                                            <span
                                                style={{
                                                    marginTop: '5px',
                                                    marginLeft: '10px'
                                                }}
                                            >
                                                <ErrorIcon fontSize="small" />
                                            </span>
                                        </Tooltip>
                                    </Box>
                                </TableCell>
                                <TableCell
                                    align="left"
                                    className={classes.borderRight}
                                >
                                    {t('realtime:pic')}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    className={classes.borderRight}
                                >
                                    {t('realtime:cic')}
                                </TableCell>
                                {/* <TableCell
                                    align="left"
                                    className={classes.borderRight}
                                >
                                    Vendor Type
                                </TableCell> */}
                                <TableCell
                                    align="right"
                                    className={classes.borderRight}
                                >
                                    <Grid
                                        container
                                        justifyContent="center"
                                        style={{ columnGap: 4, minWidth: 100 }}
                                    >
                                        {t('realtime:total_price')}
                                        <Tooltip
                                            title={
                                                paramsQuery?.sort ===
                                                'total_price_DESC'
                                                    ? t(
                                                          'realtime:tooltip_sort_asc'
                                                      )
                                                    : t(
                                                          'realtime:tooltip_sort_desc'
                                                      )
                                            }
                                        >
                                            <span>
                                                <FontAwesomeIcon
                                                    icon={
                                                        paramsQuery?.sort ===
                                                        'total_price_DESC'
                                                            ? faChevronUp
                                                            : faChevronDown
                                                    }
                                                    size="1x"
                                                    style={{
                                                        cursor: 'pointer',
                                                        color: [
                                                            'total_price_ASC',
                                                            'total_price_DESC'
                                                        ].includes(
                                                            paramsQuery.sort
                                                        )
                                                            ? '#00b46e'
                                                            : '#000'
                                                    }}
                                                    onClick={() =>
                                                        handleSort(
                                                            'total_price'
                                                        )
                                                    }
                                                />
                                            </span>
                                        </Tooltip>
                                    </Grid>
                                </TableCell>
                                <TableCell
                                    align="right"
                                    className={classes.borderRight}
                                >
                                    {t('realtime:display_price')} / VAT
                                </TableCell>
                                <TableCell
                                    align="right"
                                    className={classes.borderRight}
                                >
                                    {t('realtime:inventory_quantity')}
                                </TableCell>
                                <TableCell
                                    align="right"
                                    className={classes.borderRight}
                                >
                                    {t('realtime:order_quantity')}
                                </TableCell>
                                <TableCell align="center" width="150px">
                                    {t('realtime:confirmed_status')}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {tableData?.length > 0 ? (
                            <>
                                <TableBody>
                                    {tableData.map((row, i) => (
                                        <TableRow key={uuidv4()}>
                                            <TableCell
                                                align="left"
                                                className={classes.borderRight}
                                            >
                                                <Link
                                                    href={`/crm/order/detail?orderId=${row?.orderID}`}
                                                    passHref
                                                >
                                                    <a
                                                        rel="noopener noreferrer"
                                                        target="_blank"
                                                        style={{
                                                            textDecoration:
                                                                'none'
                                                        }}
                                                    >
                                                        <Tooltip
                                                            title={t(
                                                                'realtime:tooltip_view_order'
                                                            )}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    color: '#00b46e',
                                                                    cursor: 'pointer'
                                                                }}
                                                            >
                                                                {row?.orderID}
                                                            </Box>
                                                        </Tooltip>
                                                    </a>
                                                </Link>
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                className={classes.borderRight}
                                            >
                                                {getFormattedDate(
                                                    new Date(row?.orderTime),
                                                    'DD-MM-YYYY HH:mm'
                                                )
                                                    ?.split(' ')
                                                    ?.map((text) => (
                                                        <p
                                                            style={{
                                                                margin: 0,
                                                                padding: 0
                                                            }}
                                                        >
                                                            {text}
                                                        </p>
                                                    ))}
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                className={classes.borderRight}
                                            >
                                                {row?.sellerCode}
                                                <br />
                                                {/* region */}
                                                <span
                                                    style={{
                                                        fontStyle: 'italic'
                                                    }}
                                                >
                                                    {`${
                                                        REGIONS.find(
                                                            (reg) =>
                                                                reg.value ===
                                                                row?.regionCode
                                                        ).label ||
                                                        'Do not have any data'
                                                    }`}
                                                </span>
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                className={classes.borderRight}
                                                style={{ width: '350px' }}
                                            >
                                                {/* name + url */}
                                                <Link
                                                    href={`/internal-seller/${
                                                        row?.sellerCode
                                                    }/${
                                                        PURCHASER_CODE[
                                                            row?.regionCode
                                                        ]
                                                    }/sku/edit?code=${
                                                        row?.itemCode
                                                    }`}
                                                    passHref
                                                >
                                                    <a
                                                        rel="noopener noreferrer"
                                                        target="_blank"
                                                        style={{
                                                            textDecoration:
                                                                'none'
                                                        }}
                                                    >
                                                        <Tooltip
                                                            title={t(
                                                                'realtime:tooltip_view_product'
                                                            )}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    color: '#00b46e',
                                                                    cursor: 'pointer',
                                                                    display:
                                                                        'flex',
                                                                    flexWrap:
                                                                        'wrap'
                                                                }}
                                                            >
                                                                {row?.productID}{' '}
                                                                -{' '}
                                                                {
                                                                    row?.productName
                                                                }
                                                            </Box>
                                                        </Tooltip>
                                                    </a>
                                                </Link>
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                className={classes.borderRight}
                                            >
                                                {row?.picAccountName}
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                className={classes.borderRight}
                                            >
                                                {row?.cicAccountName}
                                            </TableCell>
                                            {/* <TableCell
                                                className={classes.borderRight}
                                            >
                                                TRADING
                                            </TableCell> */}
                                            <TableCell
                                                align="right"
                                                className={classes.borderRight}
                                            >
                                                {formatNumber(row?.totalPrice)}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                className={classes.borderRight}
                                            >
                                                {formatNumber(
                                                    row?.displayPrice
                                                )}
                                                <br />
                                                {formatNumber(row?.vat ?? 0)}%
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                className={classes.borderRight}
                                            >
                                                {formatNumber(
                                                    row?.inventoryQuantity
                                                )}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                className={classes.borderRight}
                                            >
                                                <Link
                                                    href={`/crm/order/product-detail?productCode=${row?.productCode}&sku=${row?.sku}`}
                                                    passHref
                                                >
                                                    <a
                                                        rel="noopener noreferrer"
                                                        target="_blank"
                                                    >
                                                        <Tooltip
                                                            title={t(
                                                                'realtime:tooltip_view_product'
                                                            )}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    color: '#000',
                                                                    cursor: 'pointer',
                                                                    textDecoration:
                                                                        'underline'
                                                                }}
                                                            >
                                                                {formatNumber(
                                                                    row?.quantity
                                                                )}
                                                            </Box>
                                                        </Tooltip>
                                                    </a>
                                                </Link>
                                            </TableCell>
                                            <TableCell align="center">
                                                {CONFIRM_STATUS.find(
                                                    (item) =>
                                                        item.value ===
                                                        row?.confirmStatus
                                                )?.name || ''}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                {isDisplayPagination && (
                                    <MyTablePagination
                                        count={totalData}
                                        rowsPerPage={paramsQuery?.limit}
                                        page={Math.floor(
                                            paramsQuery?.offset /
                                                paramsQuery?.limit
                                        )}
                                        onChangePage={handleChangePage}
                                    />
                                )}
                            </>
                        ) : (
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan="100%" align="left">
                                        {t('common:not_found')}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>
            </Grid>
        </>
    );
}

export default BulkOrderTable;
