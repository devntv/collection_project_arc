import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import { Box } from "@material-ui/core";
import {
	getCustomerReportData,
	CustomerReportInfo,
	getCustomerChartData,
} from "containers/customer";
import ReportApp from "pages/_layout";
import Head from "next/head";
import { AnalyticsChart } from "containers/common/chart";
import { loadLocale, loadNamespaces } from "pages/_app";
import useTranslation from "next-translate/useTranslation";
import React from "react";

export async function getServerSideProps(ctx) {
	return await doWithLoggedInUser(ctx, (ctx) => {
		return loadCustomerReportData(ctx);
	});
}

export async function loadCustomerReportData(ctx) {
	let props = {
			customerData: {},
			chartData: {},
		},
		data = { props };

	props.customerData = await getCustomerReportData(ctx, data);
	props.chartData = await getCustomerChartData(ctx, data);
	console.log(props);
	const lang = loadLocale(ctx.req.cookies["lang"], ctx.req.headers.host);
	props.__lang = lang;
	props.__namespaces = await loadNamespaces(["common", "analytics"], lang);

	return data;
}

export default function CustomerReportPage(props) {
	return renderWithLoggedInUser(props, render);
}

function render({ customerData, chartData }) {
	const { t } = useTranslation();

	const breadcrumb = [
		{
			name: t("common:menu.report"),
		},
		{
			name: t("common:menu.customer"),
		},
	];

	return (
		<ReportApp breadcrumb={breadcrumb}>
			<Head>
				<title>{t("common:menu.report") + " " + t("common:menu.customer")}</title>
			</Head>
			<Box>
				<CustomerReportInfo {...customerData} />
				<Box>
					<AnalyticsChart
						title={t`analytics:customer.30daysRegistration`}
						data={chartData.registration}
					/>
					<AnalyticsChart
						title={t`analytics:customer.30daysActivation`}
						data={chartData.activation}
					/>
					<AnalyticsChart
						title={t`analytics:customer.30daysPlaceOrder`}
						data={chartData.placeOrder}
					/>
				</Box>
			</Box>
		</ReportApp>
	);
}
