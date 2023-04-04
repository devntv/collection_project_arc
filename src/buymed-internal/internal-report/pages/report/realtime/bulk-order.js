import ReportApp from 'pages/_layout';
import Head from 'next/head';
import { Box  } from '@material-ui/core';
import {
    renderWithLoggedInUser,
    doWithLoggedInUser
} from '@thuocsi/nextjs-components/lib/login';
import { loadLocale, loadNamespaces } from 'pages/_app';
import useTranslation from 'next-translate/useTranslation';
import PageHeader from 'components/PageHeader/PageHeader';
import BulkOrderTable from 'components/Realtime/BulkOrderTable';

async function getBulkOrder(ctx) {
    const props = { host: ctx.req.headers.host },
        data = { props };
    const lang = loadLocale(ctx.req.cookies['lang'], ctx.req.headers.host);
    props.__lang = lang;
    props.__namespaces = await loadNamespaces(['common', 'realtime'], lang);

    return data;
}

export async function getServerSideProps(ctx) {
    return await doWithLoggedInUser(ctx, (ctx) => {
        return getBulkOrder(ctx);
    });
}

export default function BulkOrderReportPage(props) {
    return renderWithLoggedInUser(props, render);
}

function render(props) {
    const { t } = useTranslation();
    const breadcrumb = [
        {
            name: t('common:menu.report')
        },
        {
            name: t('common:menu.realtime.overview_report'),
            link: '/report/realtime'
        },
        {
            name: t('common:menu.realtime.report_bulk_order'),
            link: '/report/realtime/bulk-order'
        }
    ];

    return (
        <ReportApp breadcrumb={breadcrumb}>
            <Head>
                <title>{t('common:menu.realtime.report_bulk_order')}</title>
            </Head>
            <Box sx={{ paddingBottom: 0 }} width={'100%'} flexGrow={1}>
                <PageHeader>
                    {t('common:menu.realtime.report_bulk_order')}
                </PageHeader>                                
                <BulkOrderTable key="bulk-order" showCountdown={true} source='/report/realtime/bulk-order' />
            </Box>
        </ReportApp>
    );
}
