import { doWithLoggedInUser } from '@thuocsi/nextjs-components/lib/login'
import ReportApp from 'pages/_layout';
import React, { useEffect, useState } from 'react'
import Head from "next/head";
import PageHeader from 'components/PageHeader/PageHeader';
import { useRouter } from 'next/router';
import GMVTable from 'components/Realtime/GmvTable';
import { loadLocale, loadNamespaces } from 'pages/_app';
import { CATE_MANAGEMENTS, INTERNAL_SELLERS, LIMIT_PER_PAGE, REGION_LIST } from 'utilities/realtime-constants';
import { parseJsonToOjb } from 'utilities/object';
import { convertParameter, replaceChangeParameter } from 'utilities/router';
import { useForm } from 'react-hook-form';
import { Box, Typography } from '@material-ui/core';
import styles from '../styles.module.css';
import MuiMultipleAuto from '@thuocsi/nextjs-components/muiauto/multiple';
import { MuiAutoFuzzy } from '@thuocsi/nextjs-components/muiauto-fuzzy/muiauto-fuzzy';
import MuiSingleAuto from '@thuocsi/nextjs-components/muiauto/single';
import { getAccountClient } from 'clients/account';
import useTranslation from 'next-translate/useTranslation';

const handleAtServerSide = async (ctx) => {
    const props = {};
    const lang = loadLocale(ctx.req.cookies['lang'], ctx.req.headers.host)
    const { page = 0, limit = LIMIT_PER_PAGE, sku = null } = ctx.query
    const skuObject = parseJsonToOjb(sku)

    props.query = ctx.query
    props.sku = skuObject || {}
    props.page = Number(page)
    props.limit = Number(limit)
    props.__namespaces = await loadNamespaces(['common', "realtime"], lang)
    props.__lang = lang
    return { props }
}

export async function getServerSideProps(ctx) {
    return await doWithLoggedInUser(ctx, async (ctx) => {
        return handleAtServerSide(ctx)
    })
}



const RealTimeGMV = (props) => {
    const { page = 0, limit = LIMIT_PER_PAGE, sku = null, query } = props
    const { cic = null, pic = null } = query
    const router = useRouter()
    const { location = "" } = router.query
    const { t } = useTranslation()
    const pageName = t('realtime:gmv_name_page');

    const breadcrumb = [
        {
            name: t('common:menu.report')
        },
        {
            name: t('common:menu.realtime.overview_report'),
            link: '/report/realtime'
        },
        {
            name: pageName,
            link: '/null',
        },
    ];

    const [cicState, setCICState] = useState([])
    const [locationRoute, setLocationRoute] = useState(location)
    const [skuRoute, setSkuRoute] = useState(sku)
    const [picRoute, setPicRoute] = useState(pic)
    const [cicRoute, setCicRoute] = useState(cic)

    const picObject = parseJsonToOjb(picRoute)
    const cicObject = parseJsonToOjb(cicRoute)

    useEffect(() => {
        ; (async () => {
            const { data = [] } = await getAccountClient().getListEmployeeByDepartment('CATEGORY')
            const picOptions = data.map(item => ({
                label: item?.fullname,
                value: item?.accountId
            }))
            setCICState(picOptions)
        })()
    }, [])

    const selectedRegion = convertParameter(locationRoute).map((item) => {
        const region = REGION_LIST?.[item]
        if (region) {
            return {
                label: region.label,
                value: region.value
            }
        }
    })
    const formObject = useForm({
        mode: "onChange",
        defaultValues: {
            sku: sku,
            regions: selectedRegion,
            picManagement: picObject || {},
            cicManagement: cicObject || {},
        },
    })
    return (
        <ReportApp breadcrumb={breadcrumb}>
            <Head>
                <title>{pageName}</title>
            </Head>
            <PageHeader>
                {pageName}
            </PageHeader>
            <Box style={{ margin: '50px 0px 50px 0px', display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
                <Box style={{ width: '330px' }}>
                    <Typography variant="h5" className={styles.selectAreas} >{t("realtime:choose_region")} <span style={{ color: 'red' }}>*</span></Typography>
                    <MuiMultipleAuto
                        id="regions"
                        options={Object.values(REGION_LIST)}
                        name="regions"
                        placeholder={t("realtime:choose_region")}
                        control={formObject.control}
                        errors={formObject.errors}
                        onValueChange={(value) => {
                            setLocationRoute(encodeURIComponent(value.map(item => item.value)))
                            replaceChangeParameter('location', encodeURIComponent(value.map(item => item.value)))
                        }}
                    />
                </Box>
                <Box style={{ width: '330px' }}>
                    <Typography variant="h5" className={styles.selectAreas} >{t("realtime:choose_sku")}</Typography>
                    <MuiAutoFuzzy
                        type={'SKU'}
                        componentType={'MUI_SINGLE'}
                        name="sku"
                        placeholder={t("realtime:enter_id_or_product")}
                        labelFormatOption="ID-NAME-SKU"
                        filterForm={formObject}
                        onValueChange={(sku) => {
                            setSkuRoute(sku)
                            replaceChangeParameter('sku', JSON.stringify(sku))
                        }}
                        conditions={[{ sellers: INTERNAL_SELLERS }]}
                    />
                </Box>
                <Box style={{ width: '330px' }}>
                    <Typography variant="h5" className={styles.selectAreas} >{t("realtime:choose_cic")}</Typography>
                    <MuiSingleAuto
                        id="cicManagement"
                        name="cicManagement"
                        options={CATE_MANAGEMENTS}
                        placeholder={t("realtime:choose_manager")}
                        control={formObject.control}
                        errors={formObject.errors}
                        onValueChange={(value) => {
                            setPicRoute(value ? JSON.stringify(value) : '')
                            replaceChangeParameter('cic', value ? JSON.stringify(value) : '')
                        }}
                    />
                </Box>
                <Box style={{ width: '330px' }}>
                    <Typography variant="h5" className={styles.selectAreas} >{t("realtime:choose_manager")}</Typography>
                    <MuiSingleAuto
                        id="picManagement"
                        name="picManagement"
                        options={cicState}
                        placeholder={t("realtime:enter_manager_name")}
                        control={formObject.control}
                        errors={formObject.errors}
                        onValueChange={(value) => {
                            setCicRoute(value ? JSON.stringify(value) : '')
                            replaceChangeParameter('pic', value ? JSON.stringify(value) : '')
                        }}
                    />
                </Box>
            </Box>
            <GMVTable
                page={page}
                limit={limit}
                location={locationRoute}
                sku={skuRoute}
                pic={picObject}
                cic={cicObject}
                showCountdown={true}
            />
        </ReportApp >
    )
}

export default RealTimeGMV
