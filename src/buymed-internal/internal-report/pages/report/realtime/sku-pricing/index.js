import { Box, Grid, Typography } from '@material-ui/core';
import InputLabel from "@material-ui/core/InputLabel";
import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import { MuiAutoFuzzy } from "@thuocsi/nextjs-components/muiauto-fuzzy/muiauto-fuzzy";
import MuiMultipleAuto from '@thuocsi/nextjs-components/muiauto/multiple';
import TableSKUPricing from 'components/Realtime/ReportSKU/TableSKUPricing';
import Head from "next/head";
import ReportApp from "pages/_layout";
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { getData, pushData } from 'utilities/localStorage';
import {loadLocale, loadNamespaces} from "../../../_app";
import useTranslation from "next-translate/useTranslation";
import styles from '../styles.module.css';
import { INTERNAL_SELLERS, REGIONS } from 'utilities/realtime-constants';


export const loadReportSkuPrice = async (context) => {
	let props = {}, data = {props}
	const lang = loadLocale(context.req.cookies['lang'],context.req.headers.host)
    props.__lang = lang
    props.__namespaces = await loadNamespaces(['common','realtime'], lang)
	return data
}

function ReportSkuPrice(props) {
	const {t} = useTranslation()	

	const source = '/report/realtime/sku-pricing'
	const regionLength = JSON.parse(getData(`${source}.regionPricing`))?.length 
	const regionLocal = regionLength > 0 ? JSON.parse(getData(`${source}.regionPricing`)) : [];
	const [region, setRegion] = useState(regionLocal)

	const [selectSku, setSelectSku] = useState(JSON.parse(getData(`${source}.skuPricing`)) || '')

	const formHook = useForm({
		defaultValues : {
			region: [] || region, 
			sku_pricing	: selectSku
		},
		mode: 'onChange'	
	})

	const handleChangeRegion = (data) => {
		setRegion(data)		
	};

	useEffect(()=>{
		pushData(`${source}.regionPricing`, JSON.stringify(region))
		pushData(`${source}.skuPricing`, JSON.stringify(selectSku))
    formHook.setValue("region", region);
	},[region,selectSku])
	

	const breadcrumb = [
        {
            name: t('common:menu.report')
        },
        {
            name: t('common:menu.realtime.overview_report'),
            link: '/report/realtime'
        },
		{
			link: "/report/report-sku-pricing",
			name: t("realtime:report_sku_wrong_price"),
		},
	]

	const handleChangeFuzzySku = (data)=> {
		setSelectSku(data)
	}
	
  	return (
		<ReportApp breadcrumb={breadcrumb}>
			<Head>
				<title>{t("realtime:report_sku_wrong_price")}</title>
			</Head>
			<Box>
				<Grid container>
					<Box className={styles.ctnHeader}>
						<Typography>{t("realtime:report_sku_wrong_price")}</Typography>
					</Box>
				</Grid>
				{/* <Paper style={{paddingBottom: "80px"}}> */}		
				<Box className={styles.ctnFilterComp}>
					<Grid container xs={12} className={styles.ctnFilter} item>			
						<Box style={{width:'329px'}} 
							// className={`${styles.ctnFilterRegion} ${regionLength <=1 && styles.filterRegionUnset}`}
						>
							<InputLabel
								htmlFor=""
								style={{
									color: "black",
									fontWeight: "500",
									fontSize: "16px",
									lineHeight: "19px",
									marginRight: '4px',
									marginBottom:'12px'
									}}
								>
								{t("realtime:select_region")}
							</InputLabel>
							<MuiMultipleAuto 
								options={REGIONS} 
								placeholder={t("realtime:choose_region")}
								name='region'
								control={formHook.control} 
								errors={formHook.errors}  
								register={formHook.register} 
								onValueChange ={handleChangeRegion}	
								// disabled={regionLength <=1}											
							/>
						</Box>	
						{/* chọn sku */}
						<Box style={{width:'329px', marginLeft:'60px'}}>
							<InputLabel
								htmlFor=""
								style={{
									color: "black",
									fontWeight: "500",
									fontSize: "16px",
									lineHeight: "19px",
									marginRight: '4px',
									marginBottom:'12px'
									}}
								>
								{t("realtime:select_sku")}
							</InputLabel>
							<MuiAutoFuzzy 	
								filterForm={formHook}						
								placeholder={t("realtime:input_info_sku")}
                                labelFormatOption="ID-NAME-SKU"
								name='sku_pricing'
								onValueChange={handleChangeFuzzySku}
                                conditions={[{ sellers: INTERNAL_SELLERS }]}							
							/>
						</Box>					
					</Grid>
				</Box>
				<Box style={{marginTop:"10px"}}>
					<TableSKUPricing 
						region={region}
						selectSku={selectSku?.value}
						isPagination
						getTotal
						showCountdown={true}
						source={source}
					/>
				</Box>
			</Box>
		</ReportApp>
	)
}

export async function getServerSideProps(context) {
	return await doWithLoggedInUser(context, (context) => {
		return loadReportSkuPrice(context);
	});
}

export default function SkuReportPrice(props) {
	return renderWithLoggedInUser(props, ReportSkuPrice);
}