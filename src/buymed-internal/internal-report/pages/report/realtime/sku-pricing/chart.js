import { Box, Grid, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { APIStatus } from '@thuocsi/nextjs-components/lib/common';
import {
    doWithLoggedInUser,
    renderWithLoggedInUser
} from '@thuocsi/nextjs-components/lib/login';
import Loader from '@thuocsi/nextjs-components/loader/loader';
import { MuiAutoFuzzy } from '@thuocsi/nextjs-components/muiauto-fuzzy/muiauto-fuzzy';
import { getProductClient } from 'clients/product';
import { getRealtimeClient } from 'clients/realtime';
import HeaderReport from 'components/ChatReport/HeaderReport';
import PageHeader from 'components/PageHeader/PageHeader';
import Countdown from 'components/Realtime/Countdown';
import { PricingChart } from 'components/Realtime/PricingChart';
import { getFormattedDate } from 'lib/DateTimeUtil';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { loadLocale, loadNamespaces } from 'pages/_app';
import ReportApp from 'pages/_layout';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getNDayFromNow } from 'utilities/datetime';
import {
    INTERNAL_SELLERS,
    PURCHASER_CODE,
    RANGE_CHART,
    REGIONS
} from 'utilities/realtime-constants';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles({
    select: {
        padding: 0,
        paddingLeft: '15px',
        lineHeight: '40px'
    }
});

function render(props) {
    const router = useRouter();
    const classes = useStyles();
    const { t } = useTranslation();
    let formObject = useForm({
        mode: 'onChange',
        defaultValues: {
            sku: ''
        }
    });

    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState('');
    const [chartData, setChartData] = useState([]);
    const [productData, setProductData] = useState(null);
    console.log('chảtD', chartData);
    const breadcrumb = [
        {
            name: t('common:report')
        },
        {
            name: t('realtime:gmv_name_page'),
            link: '/report/realtime/sku-pricing'
        },
        {
            name: t('realtime:gmv_graph')
        }
    ];

    const getChartData = useCallback(
        async ({ sku = '', locationCode = '' }) => {
            if (!sku) {
                formObject.setValue('sku', {
                    label: '',
                    value: ''
                });
                setLocation(locationCode);
                setChartData([]);

                return;
            }

            let params = {};
            params.q = {
                sku,
                locationCodes: [locationCode],
                locationCode // for get gmv
            };

            const res = await loadChart({ params });

            // convert data for chart
            let convertData = [];

            for (const [key, valueMap] of Object.entries(res?.rangeMap)) {
                const keyDate = new Date(key);

                if (!valueMap) {
                    convertData.push({
                        time: keyDate.toISOString(),
                        label: getFormattedDate(keyDate, 'DD/MM'),
                        value: 0,
                        avgDisplayPrice14days: 0, // ??
                        diffAmountAVG14: 0,
                        diffPercentAVG14: 0,
                        purchasePrice: 0,
                        retailPrice: 0,
                        todayGMV: 0
                    });
                } else {
                    convertData.push({
                        ...valueMap,
                        time: keyDate.toISOString(),
                        label: getFormattedDate(keyDate, 'DD/MM'),
                        value: valueMap?.displayPrice || 0,
                        todayGMV: valueMap?.todayGMV || 0
                    });
                }
            }

            convertData.sort((a, b) => {
                return new Date(a.time) - new Date(b.time);
            });

            // get product info
            let productCode = '';
            let productName = '';
            let productID = '';
            let sellerCode = '';
            let itemCode = '';

            if (!res?.data) {
                const skuRes = await getProductClient(null, {}).getSingleSku(
                    sku
                );

                if (skuRes?.status === APIStatus.OK) {
                    productCode = skuRes?.data[0]?.productCode;
                    sellerCode = skuRes?.data[0]?.sellerCode;
                    itemCode = skuRes?.data[0]?.itemCode;
                }
            } else {
                productCode = res?.data?.productCode;
                sellerCode = res?.data?.sellerCode;
                itemCode = res?.data?.itemCode;
            }

            const productRes = await getProductClient(
                null,
                {}
            ).getProductNameByCode({
                codes: [productCode],
                limit: 10
            });

            if (productRes?.status === APIStatus.OK) {
                productName = productRes?.data[0]?.name;
                productID = productRes?.data[0]?.productID;

                setProductData({
                    ...productRes?.data[0],
                    sellerCode,
                    itemCode
                });
            }

            formObject.setValue('sku', {
                label: `${productID} - ${productName}`,
                value: sku
            });
            setLocation(locationCode);
            setChartData(convertData);
        },
        []
    );

    useEffect(() => {
        const fetch = async () => {
            const { sku, locationCode } = router.query;
            try {
                setIsLoading(true);
                await getChartData({ sku, locationCode });
            } finally {
                setIsLoading(false);
            }
        };

        fetch();
    }, []);

    return (
        <ReportApp breadcrumb={breadcrumb}>
            <Head>
                <title>{t('realtime:chart_pricing')}</title>
            </Head>
            {isLoading && <Loader show={true} />}
            <Box sx={{ paddingBottom: 0 }} width={'100%'} flexGrow={1}>
                <PageHeader>
                    <HeaderReport label={t('realtime:chart_pricing')} />
                </PageHeader>

                {/* filters & info */}
                <Grid
                    container
                    style={{
                        width: '100%',
                        marginTop: '26px',
                        rowGap: '26px'
                    }}
                >
                    <Grid item xs={12} container spacing={2}>
                        {/* select sku */}
                        <Grid item xs={2} container>
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
                                <span style={{ color: '#FF0000' }}>*</span>
                            </Box>
                            <Grid item xs={12}>
                                <MuiAutoFuzzy
                                    type={'SKU'}
                                    componentType={'MUI_SINGLE'}
                                    name="sku"
                                    placeholder={t('realtime:placeholder_sku')}
                                    filterForm={formObject}
                                    onValueChange={(val) => {
                                        const sku = val?.value || '';

                                        getChartData({
                                            sku,
                                            locationCode: location
                                        });

                                        router.push({
                                            pathname:
                                                '/report/realtime/sku-pricing/chart',
                                            query: {
                                                ...router.query,
                                                sku
                                            }
                                        });
                                    }}
                                    conditions={[{ sellers: INTERNAL_SELLERS }]}
                                />
                            </Grid>
                        </Grid>

                        {/* select region */}
                        <Grid item xs={2} container>
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
                                <span style={{ color: '#FF0000' }}>*</span>
                            </Box>
                            <Grid item xs={12}>
                                <Select
                                    id="region"
                                    variant="outlined"
                                    fullWidth
                                    displayEmpty
                                    placeholder={t('realtime:choose_region')}
                                    size={'small'}
                                    value={location}
                                    onChange={(e) => {
                                        const newLocation = e.target.value;

                                        setLocation(newLocation);
                                        getChartData({
                                            sku: formObject.getValues().sku
                                                ?.value,
                                            locationCode: newLocation
                                        });

                                        router.push({
                                            pathname:
                                                '/report/realtime/sku-pricing/chart',
                                            query: {
                                                ...router.query,
                                                locationCode: newLocation
                                            }
                                        });
                                    }}
                                    classes={{
                                        select: classes.select
                                    }}
                                >
                                    {REGIONS.map((item) => (
                                        <MenuItem
                                            value={item.value}
                                            key={item.value}
                                        >
                                            {item.label}{' '}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                        </Grid>

                        {/* countdown */}
                        <Grid item xs={8} container justifyContent="flex-end">
                            <Countdown
                                key={uuidv4()}
                                t={t}
                                callback={getChartData}
                                params={{
                                    sku: router.query?.sku,
                                    locationCode: router.query?.locationCode
                                }}
                            />
                        </Grid>
                    </Grid>

                    {/* view detail */}
                    <Grid item xs={6}>
                        <Link
                            href={`/internal-seller/${productData?.sellerCode}/${PURCHASER_CODE[location]}/sku/edit?code=${productData?.itemCode}`}
                            passHref
                        >
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                style={{ color: '#09884D' }}
                            >
                                {formObject.getValues().sku?.label}
                            </a>
                        </Link>
                    </Grid>
                </Grid>

                {/* chart */}
                <Box sx={{ marginTop: '50px', width: '80%' }}>
                    <PricingChart data={chartData} t={t} />
                </Box>
            </Box>
        </ReportApp>
    );
}

async function loadChart({ params = null }) {
    const newParams = { ...params };

    newParams.getTotal = false;
    newParams.offset = 0;
    newParams.limit = 20;

    let promiseChart = [];
    let promiseGMV = [];

    // get data today
    const now = getFormattedDate(new Date(), 'YYYY/MM/DD');
    promiseChart.push(
        getRealtimeClient(null, {}).getReportSKUPrice({
            ...newParams,
            q: JSON.stringify({ ...newParams.q, dayStr: now })
        })
    );
    promiseGMV.push(
        getRealtimeClient(null, {}).getGMVFluctuation({
            ...newParams,
            q: JSON.stringify({ ...newParams.q, dayStr: now, ratio: 1 })
        })
    );

    let range = RANGE_CHART;
    let rangeMap = {};

    while (range > 0) {
        const dayParams = { ...newParams };
        const rDay = getFormattedDate(getNDayFromNow(range), 'YYYY/MM/DD');
        dayParams.q.dayStr = rDay;

        const qStr = JSON.stringify(dayParams?.q || null) || null;
        dayParams.q = qStr;

        promiseChart.push(
            getRealtimeClient(null, {}).getReportSKUPrice(dayParams)
        );
        promiseGMV.push(getRealtimeClient(null, {}).getGMVData(dayParams));

        rangeMap[rDay] = null;
        range--;
    }

    let chartRes = await Promise.all(promiseChart);
    let gmvRes = await Promise.all(promiseGMV);
    let productData = null;

    chartRes.forEach((res) => {
        if (res?.status === APIStatus.OK) {
            rangeMap[res.data[0].dayStr] = res?.data[0];

            if (!productData) {
                productData = res?.data[0];
            }
        }
    });

    gmvRes.forEach((res) => {
        if (res?.status === APIStatus.OK) {
            // gmv top
            if (res.data?.length > 0) {
                let dateChartData = rangeMap[res.data[0].dayStr] || {};
                dateChartData.todayGMV = res.data[0]?.todayGMV || 0;
                rangeMap[res.data[0].dayStr] = dateChartData;
            }
        }
    });

    return { data: productData, rangeMap };
}

async function getData(ctx) {
    const props = { host: ctx.req.headers.host },
        data = { props };
    const lang = loadLocale(ctx.req.cookies['lang'], ctx.req.headers.host);
    props.__lang = lang;
    props.__namespaces = await loadNamespaces(
        ['common', 'realtime', 'monitoring', 'sku'],
        lang
    );

    return data;
}

export async function getServerSideProps(ctx) {
    return await doWithLoggedInUser(ctx, (ctx) => {
        return getData(ctx);
    });
}

export default function GMVChartPage(props) {
    return renderWithLoggedInUser(props, render);
}
