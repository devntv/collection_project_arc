import {
    Box,
    Divider,
    Grid,
    MenuItem,
    Select,
    Typography
} from '@material-ui/core';
import {
    doWithLoggedInUser,
    renderWithLoggedInUser
} from '@thuocsi/nextjs-components/lib/login';
import HeaderReport from 'components/ChatReport/HeaderReport';
import PageHeader from 'components/PageHeader/PageHeader';
import useTranslation from 'next-translate/useTranslation';
import { loadLocale, loadNamespaces } from 'pages/_app';
import ReportApp from 'pages/_layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MuiAutoFuzzy } from '@thuocsi/nextjs-components/muiauto-fuzzy/muiauto-fuzzy';
import { useForm } from 'react-hook-form';
import {
    calForeCastGMV,
    INTERNAL_SELLERS,
    PURCHASER_CODE,
    RANGE_CHART,
    ratioGMVForeCast,
    REGIONS
} from 'utilities/realtime-constants';
import { makeStyles } from '@material-ui/styles';
import Link from 'next/link';
import { formatNumber } from 'components/utils';
import { GMVChart } from 'components/Realtime/GMVChart';
import { useCallback, useEffect, useState } from 'react';
import { APIStatus } from '@thuocsi/nextjs-components/lib/common';
import { getRealtimeClient } from 'clients/realtime';
import { getFormattedDate } from 'lib/DateTimeUtil';
import { getNDayFromNow } from 'utilities/datetime';
import { getProductClient } from 'clients/product';
import { v4 as uuidv4 } from 'uuid';
import Countdown from 'components/Realtime/Countdown';
import Loader from '@thuocsi/nextjs-components/loader/loader';

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

    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState('');
    const [chartData, setChartData] = useState([]);
    const [topGMVTodayData, setTopGMVTodayData] = useState(null);
    const [productData, setProductData] = useState(null);
    const [confirmTotal, setConfirmTotal] = useState(0);

    const breadcrumb = [
        {
            name: t('common:report')
        },
        {
            name: t('realtime:chart_gmv'),
            link: '/report/realtime/gmv'
        },
        {
            name: t('realtime:gmv_graph')
        }
    ];

    const getChartData = useCallback(
        async ({ sku = '', locationCode = '' }) => {
            if (!sku || !locationCode) {
                setChartData([]);
                setTopGMVTodayData(null);
                setProductData(null);
                setConfirmTotal(0)

                return;
            }

            let params = {};
            params.q = {
                sku,
                locationCode
            };

            const {
                data,
                topGMVToday = null,
                rangeMap
            } = await loadChart({
                params
            });
            let product = data || null;

            // calculate forecast gmv today
            const forecastAmountGMV = calForeCastGMV(topGMVToday?.todayGMV);
            if (topGMVToday) {
                topGMVToday.forecastAmountGMV = forecastAmountGMV
            }

            // convert data for chart

            const topGMVTodayTime = new Date(topGMVToday?.dayStr);
            let convertData = [];

            if (topGMVToday) {
                convertData.push({
                    time: topGMVTodayTime?.toISOString(),
                    label: getFormattedDate(topGMVTodayTime, 'DD/MM'),
                    value: topGMVToday?.todayGMV,
                    diffAmountAVG14:
                        topGMVToday?.forecastDiffAmountEndDayByCurrent,
                    diffPercentAVG14:
                        topGMVToday?.forecastDiffPercentEndDayByCurrent,
                    // forecastAmountEndDay: topGMVToday?.forecastAmountEndDay,
                    avg14days: topGMVTodayTime?.avg14days,
                    forecastAmountGMV
                });
            }

            for (const [key, value] of Object.entries(rangeMap)) {
                if (!value) {
                    const keyDate = new Date(key);

                    convertData.push({
                        time: keyDate.toISOString(),
                        label: getFormattedDate(keyDate, 'DD/MM'),
                        value: 0,
                        avg14days: topGMVTodayTime?.avg14days // ??
                    });
                } else {
                    const itemDate = new Date(value?.dayStr);

                    convertData.push({
                        time: itemDate.toISOString(),
                        label: getFormattedDate(itemDate, 'DD/MM'),
                        value: value?.todayGMV,
                        diffAmountAVG14: value?.diffAmountAVG14,
                        diffPercentAVG14: value?.diffPercentAVG14,
                        avg14days: value?.avg14days
                    });
                }
            }

            convertData.sort((a, b) => {
                return new Date(a.time) - new Date(b.time);
            });

            // get product data
            let productCode = '';
            let productName = '';
            let productID = '';
            let sellerCode = '';
            let itemCode = '';

            if (!product) {
                const skuRes = await getProductClient(null, {}).getSingleSku(
                    sku
                );

                if (skuRes?.status === APIStatus.OK) {
                    productCode = skuRes?.data[0]?.productCode;
                    sellerCode = skuRes?.data[0]?.sellerCode;
                    itemCode = skuRes?.data[0]?.itemCode;
                }
            } else {
                productCode = product?.productCode;
                sellerCode = product?.sellerCode;
                itemCode = product?.itemCode;
            }

            const qStr = JSON.stringify({
                itemCode,
                status: 'WAIT_TO_CONFIRM'
            });

            const [productRes, confirmTotalRes] = await Promise.all([
                getProductClient(null, {}).getProductNameByCode({
                    codes: [productCode],
                    limit: 100
                }),
                getRealtimeClient(null, {}).getOrderItem({
                    getTotal: true,
                    q: qStr
                })
            ]);

            if (productRes?.status === APIStatus.OK) {
                productName = productRes?.data[0]?.name;
                productID = productRes?.data[0]?.productID;

                setProductData({
                    ...productRes?.data[0],
                    sellerCode,
                    itemCode
                });
            }

            if (confirmTotalRes?.status === APIStatus.OK) {
                setConfirmTotal(confirmTotalRes?.total || 0);
            } else {
                setConfirmTotal(0);
            }

            formObject.setValue('sku', {
                label: `${productID} - ${productName}`,
                value: sku
            });
            setLocation(locationCode);
            setChartData(convertData);
            setTopGMVTodayData(topGMVToday);
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
                <title>{t('realtime:chart_gmv')}</title>
            </Head>
            {isLoading && <Loader show={true} />}
            <Box sx={{ paddingBottom: 0 }} width={'100%'} flexGrow={1}>
                <PageHeader>
                    <HeaderReport label={t('realtime:chart_gmv')} />
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
                                    labelFormatOption="ID-NAME-SKU"
                                    filterForm={formObject}
                                    onValueChange={(val) => {
                                        const sku = val?.value || '';

                                        getChartData({
                                            sku,
                                            locationCode: location
                                        });

                                        router.push({
                                            pathname:
                                                '/report/realtime/gmv/chart',
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
                                                '/report/realtime/gmv/chart',
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
                                style={{ color: '#09884D'}}
                            >
                                {formObject.getValues().sku?.label}
                            </a>
                        </Link>
                    </Grid>

                    {/* info */}
                    <Grid item xs={12} container>
                        <Box
                            sx={{ border: '1px solid #DADADA', width: '478px' }}
                        >
                            <Grid
                                container
                                justifyContent="space-between"
                                style={{ width: '100%', padding: '15px' }}
                            >
                                <Typography style={{ fontWeight: 'bold' }}>
                                    {t('realtime:forecast_today_gmv')}
                                </Typography>
                                <Typography>
                                    {formatNumber(
                                        Math.floor(
                                            topGMVTodayData?.forecastAmountGMV
                                        ) || 0
                                    )}
                                </Typography>
                            </Grid>
                            <Divider />
                            <Grid
                                container
                                justifyContent="space-between"
                                style={{ width: '100%', padding: '15px' }}
                            >
                                <Typography style={{ fontWeight: 'bold' }}>
                                    {t('realtime:current_gmv')}
                                </Typography>
                                <Typography style={{ color: '#FF0000' }}>
                                    {formatNumber(
                                        Math.floor(topGMVTodayData?.todayGMV) ||
                                            0
                                    )}
                                </Typography>
                            </Grid>
                            <Divider />
                            <Grid
                                container
                                justifyContent="space-between"
                                style={{ width: '100%', padding: '15px' }}
                            >
                                <Typography style={{ fontWeight: 'bold' }}>
                                    {t('realtime:wait_to_confirm_total')}
                                </Typography>
                                <Typography>
                                    {formatNumber(confirmTotal)}
                                </Typography>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                {/* chart */}
                <Box sx={{ marginTop: '50px', width: '75%' }}>
                    <GMVChart
                        data={chartData}
                        t={t}
                        forecastGMV={topGMVTodayData}
                    />
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

    const curDate = new Date();
    const now = getFormattedDate(curDate, 'YYYY/MM/DD');

    // calculate ratio gmv

    const qTopGMV = {
        ...newParams.q,
        locationCodeIn: [newParams.q.locationCode],
        dayStr: now,
        ratio: ratioGMVForeCast()
    };

    let range = RANGE_CHART;
    let rangeMap = {};

    while (range > 0) {
        const rDay = getFormattedDate(getNDayFromNow(range), 'YYYY/MM/DD');
        promiseChart.push(
            getRealtimeClient(null, {}).getGMVData({
                ...params,
                q: JSON.stringify({ ...newParams.q, dayStr: rDay })
            })
        );
        rangeMap[rDay] = null;
        range--;
    }

    let [gmvTopRes, ...chartRes] = await Promise.all([
        getRealtimeClient(null, {}).getGMVFluctuation({
            ...newParams,
            q: JSON.stringify(qTopGMV)
        }),
        ...promiseChart
    ]);
    let topGmvData = null;
    let productData = null;

    chartRes.forEach((res) => {
        if (res?.status === APIStatus.OK) {
            rangeMap[res.data[0].dayStr] = res?.data[0];

            if (!productData) {
                productData = res?.data[0];
            }
        }
    });

    if (gmvTopRes?.status === APIStatus.OK) {
        topGmvData = gmvTopRes?.data[0];
    }

    return { data: productData, topGMVToday: topGmvData, rangeMap };
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
