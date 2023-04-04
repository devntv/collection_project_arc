import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Grid, Tooltip, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import InsertChartIcon from '@material-ui/icons/InsertChart';
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import Loader from "@thuocsi/nextjs-components/loader/loader";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import { getProductClient } from "client/product";
import { getMasterDataClient } from "clients/master-data";
import { getRealtimeClient } from "clients/realtime";
import useCountDown from "components/hook/useCountDown";
import { formatNumber, getCurrentDate, roundToDecimal } from "components/utils";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { pushData } from "utilities/localStorage";
import { MarkFluctuation, PURCHASER_CODE, TIME_TO_ASYNC } from "utilities/realtime-constants";
import styles from "./styles.module.css";


function TableSKUPricing({
    region = [],
    selectSku = "",
    isPagination = false,
    limitPerpage,
    sortDefault = "diff_percent_avg_14_DESC",
    getTotal = false,
    showCountdown = false,
    source = null
}) {
    const router = useRouter();
    const { t } = useTranslation();
    let query = router.query;
    const page = query.page || 0;

    let limit = limitPerpage ?? parseInt(query.limit || 20);
    let offset = parseInt(query.offset || 0) * limit;
    const locationMap = { "00": t("realtime:nationwide") };
    const today = getCurrentDate();

    const [location, setLocation] = useState([]);
    const [sortBy, setSortBy] = useState(sortDefault);
    const [nameProduct, setNameProduct] = useState("");
    const [dataPricing, setDataPricing] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [loadingSync, setLoadingSync] = useState(false);
    const [numPage, setNumpage] = useState((+offset + limit) / limit - 1);

    const params = {
        offset,
        limit: +limit,
        getTotal,
        sort: sortBy,
        q: JSON.stringify({
        ...(region.length > 0
            ? { LocationCodeIn: region.map((r) => r.value) }
            : { LocationCodeIn: [] }),
        sku: selectSku,
        dayStr: today,
        }),
    };

    const handleDisplayTitleSort = (row) => {
        let title = t("realtime:sort");
        if (row === "diff_percent_avg_14" && sortBy === "diff_percent_avg_14_DESC") {
            title = t("realtime:sort_low_to_high_percent");
        } else if (row === "diff_percent_avg_14" && sortBy === "diff_percent_avg_14_ASC") {
            title = t("realtime:sort_high_to_low_percent");
        } else if (row === "diff_amount_avg_14" && sortBy === "diff_amount_avg_14_DESC") {
            title = t("realtime:sort_high_to_low_amount");
        } else if (row === "diff_amount_avg_14" && sortBy === "diff_amount_avg_14_ASC") {
            title = t("realtime:sort_low_to_high_amount");
        }
        return title;
    };

    const getMasterDataByRegion = async () => {
        let provinceCode = {};
        const regionResp = await getMasterDataClient().getRegion(0, 100, "", false);
        regionResp.data?.forEach?.(({ name, code }) => {
            locationMap[code] = name;
        });
        const provinceResp = await getMasterDataClient().getProvince(
            0,
            1000,
            "",
            Object.keys(provinceCode),
            false
        );
        provinceResp?.data.forEach(({ name = "", code = "" }) => {
            locationMap[code] = name;
        });
        setLocation(locationMap);
    };

    async function synchPricingData() {
        setLoadingSync(true);
        await getRealtimeClient().getReportSKUPrice(params);
        setLoadingSync(false);
    }

    const time = useCountDown(synchPricingData, TIME_TO_ASYNC);

    useEffect(() => {
        async function getDataPricing() {
            let productNameMap = {};
            setLoading(true);
            const res = await getRealtimeClient().getReportSKUPrice(params);
            const productByNameRes = await getProductClient().getProductByCodes(
                res?.data?.map((r) => r.productCode)
            );
            productByNameRes?.data?.forEach((product) => {
                productNameMap[product.code] = product.name;
            });
            setNameProduct(productNameMap);
            setDataPricing(res.data);
            setTotal(res.total);
            setLoading(false);
            pushData("pricing", JSON.stringify(params.q));
        }
        getDataPricing();
    }, [offset, limit, numPage, sortBy, region, selectSku, params.q]);

    useEffect(() => {
        getMasterDataByRegion();
    }, []);

    const handleChangePage = (_, page, rowsPerPage) => {
        setNumpage(page);
        router.push({
        pathname: "/report/realtime/sku-pricing",
        query: {
            page,
            offset: page,
            limit: rowsPerPage,
        },
        });
    };

    const handleSortPercentAVG = () => {
        if(sortBy === "diff_percent_avg_14_ASC") {
            setSortBy('diff_percent_avg_14_DESC');  
        } else {
            setSortBy('diff_percent_avg_14_ASC')
        }
    }

    const handleSortAmountAVG = () => {
        if(sortBy === 'diff_amount_avg_14_ASC'){
            setSortBy("diff_amount_avg_14_DESC");
        } else {
            setSortBy("diff_amount_avg_14_ASC");
        }
    }

    return (
        <>
        {/* count dount */}
        {showCountdown && (
            <Grid container xs={12} item>
            <Grid
                item
                style={{ display: "flex" }}
                xs={12}
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                container
            >
                <WatchLaterIcon style={{ color: "#219653", marginRight: "4px" }} />
                <p style={{ color: "#219653" }}>
                    {t("realtime:synch_afrer")}: {time}s
                </p>
            </Grid>
            </Grid>
        )}
        <Paper>
            <TableContainer
            style={{ borderTopLeftRadius: "4px", borderTopRightRadius: "4px", overflow: 'hidden'}}
            >
            <Table size="small">
                <TableHead className={styles.tableHead}>
                    <TableCell align="left" width="150px">{t('realtime:seller_location')}</TableCell>
                    <TableCell align="left">{t('realtime:product')}</TableCell>
                    <TableCell align="right">{t('realtime:purchase_price')}</TableCell>
                    <TableCell align="right">{t('realtime:display_price')}</TableCell>
                    <TableCell align="right">{t('realtime:avgDisplayPrice7days')}</TableCell>
                    <TableCell align="right">{t('realtime:avgDisplayPrice14days')}</TableCell>
                    <TableCell align="right">
                        {t('realtime:diffAmountAVG14')}
                        <Tooltip title={handleDisplayTitleSort('diff_amount_avg_14')}>
                            <span>
                                <FontAwesomeIcon  
                                    onClick={()=>handleSortAmountAVG('diff_amount_avg_14')}
                                    icon={sortBy === 'diff_amount_avg_14_ASC' ? faChevronUp : faChevronDown}
                                    style={{
                                    marginLeft: "4px",
                                    color: sortBy.split("_").slice(0, -1).join("_") === 'diff_amount_avg_14' ? "#219653" :'black',
                                    cursor: "pointer",
                                    }} 
                                />
                            </span>
                        </Tooltip>       
                    </TableCell>
                    <TableCell align="right">
                        {t('realtime:percent_difference')}
                        <Tooltip title={handleDisplayTitleSort('diff_percent_avg_14')}>
                            <span>
                                <FontAwesomeIcon 
                                    onClick={() => handleSortPercentAVG('diff_percent_avg_14')}
                                    icon={sortBy === 'diff_percent_avg_14_ASC' ? faChevronUp : faChevronDown}
                                    style={{
                                    marginLeft: "4px",
                                    color:  sortBy.split("_").slice(0, -1).join("_") === 'diff_percent_avg_14' ? "#219653" :'black',
                                    cursor: "pointer",
                                    }} 
                                />
                            </span>
                        </Tooltip>       
                    </TableCell>              
                </TableHead>
                <TableBody>
                {dataPricing?.length > 0 ? (
                    dataPricing?.map((data, i) => (
                    <TableRow className={styles.colLeftTable} key={i}>
                        <TableCell align="left" style={{ width: "120px" }}>
                        {data.sellerCode}
                        <br />
                        {location[data.locationCodes] && (
                            <i style={{ color: "black" }}>
                            {location[data.locationCodes] || ""}
                            </i>
                        )}
                        </TableCell>
                        <TableCell align="left" style={{ color: "#219653", position: 'relative' }}>
                            <Link href={`/internal-seller/${data?.sellerCode}/${PURCHASER_CODE[data?.locationCodes]}/sku/edit?code=${data?.itemCode}`} passHref>
                                <a rel="noopener noreferrer" target="_blank" style={{textDecoration:'none', color: "#219653"}}>
                                    {`${data.productID} - ${nameProduct[data.productCode]}`}
                                </a>
                            </Link>
                            <Box
                               sx={{
                                position: 'absolute',
                                right: 0,
                                bottom: '-5px'
                               }}
                            >
                                <Link
                                    target="_blank"
                                    href={`/report/realtime/sku-pricing/chart?sku=${data?.sku}&locationCode=${data?.locationCodes}`}
                                    passHref
                                >
                                    <a rel="noopener noreferrer" target="_blank">
                                        <InsertChartIcon style={{color: '#000'}} fontSize="small" />
                                    </a>
                                </Link>
                            </Box>
                        </TableCell>
                        <TableCell align="right">
                        {data.purchasePrice &&
                            formatNumber(data.purchasePrice.toFixed(0))}
                        </TableCell>
                        <TableCell align="right">
                        {data.displayPrice &&
                            formatNumber(data.displayPrice.toFixed(0))}
                        </TableCell>
                        <TableCell align="right">
                        {data.avgDisplayPrice7days &&
                            formatNumber(data.avgDisplayPrice7days.toFixed(0))}
                        </TableCell>
                        <TableCell align="right">
                        {data.avgDisplayPrice14days &&
                            formatNumber(data.avgDisplayPrice14days.toFixed(0))}
                        </TableCell>
                        <TableCell align="right"  style={{ color: Math.abs(data.diffAmountAVG14) >= MarkFluctuation.amountGMV && "red" }}>
                        {data.diffAmountAVG14 &&
                            formatNumber(data.diffAmountAVG14.toFixed(0))}
                        </TableCell>
                        <TableCell
                        align="right"
                        style={{ color: Math.abs(data.diffPercentAVG14) >= MarkFluctuation.percentWrongPrice && "red" }}
                        >
                        {roundToDecimal(data.diffPercentAVG14, 2)}%
                        </TableCell>
                    </TableRow>
                    ))
                ) : (
                    <TableCell colSpan={8}>
                    <Typography>{t("realtime:no_data")}</Typography>
                    </TableCell>
                )}
                </TableBody>
                {isPagination && dataPricing?.length > 0 && (
                <MyTablePagination
                    page={numPage}
                    rowsPerPage={limit}
                    count={total}
                    onChangePage={handleChangePage}
                />
                )}
            </Table>
            </TableContainer>
            <Loader show={loading} />
        </Paper>
        </>
    );
}

export default TableSKUPricing;
