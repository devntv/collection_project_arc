import useTranslation from 'next-translate/useTranslation';
import ReportApp from 'pages/_layout';
import Head from 'next/head';
import HeaderReport from 'components/ChatReport/HeaderReport';
import { Box, Grid, Typography } from '@material-ui/core';
import {
    doWithLoggedInUser,
    renderWithLoggedInUser
} from '@thuocsi/nextjs-components/lib/login';
import PageHeader from 'components/PageHeader/PageHeader';
import { loadLocale, loadNamespaces } from 'pages/_app';
import BulkOrderTable from 'components/Realtime/BulkOrderTable';
import { makeStyles } from '@material-ui/styles';
import MuiMultipleAuto from '@thuocsi/nextjs-components/muiauto/multiple';
import { REGIONS } from 'utilities/realtime-constants';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import CallMadeIcon from '@material-ui/icons/CallMade';
import { useRouter } from 'next/router';
import GMVTable from 'components/Realtime/GmvTable';
import TableSKUPricing from 'components/Realtime/ReportSKU/TableSKUPricing';

const useStyles = makeStyles({
    filterWrapper: {
        maxWidth: '15%',
        marginTop: '15px'
    },
    titleWrapper: {
        color: 'black',
        fontWeight: 'bold',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        alignSelf: 'center'
    }
});

function render(props) {
    const classes = useStyles();
    const { t } = useTranslation();
    const router = useRouter();
    // default vùng miền nam
    const regionQ = JSON.parse(router.query?.regions || null) || [];
    let formObject = useForm({
        mode: 'onChange',
        defaultValues: {
            regions: REGIONS.filter((reg) => regionQ?.includes(reg.value))
        }
    });
    const selectRegions = formObject.watch('regions');

    const breadcrumb = [
        {
            name: t('common:report')
        },
        {
            name: t('common:menu.realtime.overview_report'),
            link: '/report/realtime'
        }
    ];

    return (
        <ReportApp breadcrumb={breadcrumb}>
            <Head>
                <title>{t('common:menu.realtime.overview_report')}</title>
            </Head>
            <Box sx={{ paddingBottom: 0 }} width={'100%'} flexGrow={1}>
                <PageHeader>
                    <HeaderReport
                        label={t('common:menu.realtime.overview_report')}
                    />
                </PageHeader>

                {/* filter */}
                <Grid item className={classes.filterWrapper} container>
                    <Box className={classes.titleWrapper}>
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
                            onValueChange={(e) => {
                                const newRegions = e?.map?.(
                                    (reg) => reg?.value
                                );
                                formObject.setValue('regions', e);
                                // change query url but dont reload page
                                const url = new URL(window.location);
                                if (url) {
                                    url.searchParams.set(
                                        'regions',
                                        JSON.stringify(newRegions)
                                    );
                                    window.history.replaceState(
                                        null,
                                        '',
                                        url.toString()
                                    );
                                }
                            }}
                        />
                    </Grid>
                </Grid>

                {/* sku-pricing */}
                <Box
                    className={classes.titleWrapper}
                    style={{ margin: '45px 0px 15px 0px' }}
                >
                    {t('realtime:pricing_table')}
                </Box>
                {/* table place */}
                <TableSKUPricing
                    limitPerpage={5}
                    region={formObject.getValues().regions}
                    selectSku={''}
                    // showCountdown={true}
                />
                {/* view more */}
                <Box
                    className={classes.titleWrapper}
                    style={{
                        marginTop: '15px'
                    }}
                >
                    <Link href="/report/realtime/sku-pricing">
                        <span
                            style={{
                                textDecoration: 'none',
                                color: '#219653',
                                display: 'flex',
                                alignItems: 'center',
                                columnGap: '5px'
                            }}
                        >
                            {t('common:view_all')}
                            <CallMadeIcon
                                style={{
                                    backgroundColor: '#219653',
                                    color: '#fff'
                                }}
                                fontSize="small"
                            />
                        </span>
                    </Link>
                </Box>

                {/* GMV */}
                <Box
                    className={classes.titleWrapper}
                    style={{ margin: '45px 0px 15px 0px' }}
                >
                    {t('realtime:table_gmv')}
                </Box>
                {/* table place */}
                <GMVTable
                    rows={5}
                    location={encodeURIComponent(
                        selectRegions?.map((item) => item.value)
                    )}
                    // showCountdown={true}
                />
                {/* view more */}
                <Box
                    className={classes.titleWrapper}
                    style={{
                        marginTop: '15px'
                    }}
                >
                    <Link href="/report/realtime/gmv">
                        <span
                            style={{
                                textDecoration: 'none',
                                color: '#219653',
                                display: 'flex',
                                alignItems: 'center',
                                columnGap: '5px'
                            }}
                        >
                            {t('common:view_all')}
                            <CallMadeIcon
                                style={{
                                    backgroundColor: '#219653',
                                    color: '#fff'
                                }}
                                fontSize="small"
                            />
                        </span>
                    </Link>
                </Box>

                {/* bulk_order */}
                <Box
                    className={classes.titleWrapper}
                    style={{ margin: '45px 0px 15px 0px' }}
                >
                    {t('realtime:table_bulk_order')}
                </Box>
                {/* table place */}
                <BulkOrderTable
                    key="dashboard"
                    rows={5}
                    isDisplayFilter={false}
                    isDisplayPagination={false}
                    regions={selectRegions}
                    // showCountdown={true}
                />
                {/* view more */}
                <Box
                    className={classes.titleWrapper}
                    style={{
                        marginTop: '15px'
                    }}
                >
                    <Link href="/report/realtime/bulk-order">
                        <span
                            style={{
                                textDecoration: 'none',
                                color: '#219653',
                                display: 'flex',
                                alignItems: 'center',
                                columnGap: '5px'
                            }}
                        >
                            {t('common:view_all')}
                            <CallMadeIcon
                                style={{
                                    backgroundColor: '#219653',
                                    color: '#fff'
                                }}
                                fontSize="small"
                            />
                        </span>
                    </Link>
                </Box>
            </Box>
        </ReportApp>
    );
}

async function getData(ctx) {
    const props = { host: ctx.req.headers.host },
        data = { props };
    const lang = loadLocale(ctx.req.cookies['lang'], ctx.req.headers.host);
    props.__lang = lang;
    props.__namespaces = await loadNamespaces(['common', 'realtime'], lang);

    return data;
}

export async function getServerSideProps(ctx) {
    return await doWithLoggedInUser(ctx, (ctx) => {
        return getData(ctx);
    });
}

export default function RealtimeDashboardPage(props) {
    return renderWithLoggedInUser(props, render);
}
