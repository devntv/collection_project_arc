import { doWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import { Box, MenuItem, Select } from "@material-ui/core";
import ReportApp from "pages/_layout";
import Head from "next/head";
import { OrderReportInfo, getOrderReportData } from "containers/order";
import { getOrderChartData } from "containers/order/chart";
import { AnalyticsChart } from "containers/common/chart";
import Router from "next/router";
import { loadLocale, loadNamespaces } from "../../_app";
import useTranslation from "next-translate/useTranslation";
import { getProvinces } from "services/MasterDataService";
export async function getServerSideProps(ctx) {
	return await doWithLoggedInUser(ctx, (ctx) => {
		return loadOrderReportData(ctx);
	});
}

export async function loadOrderReportData(ctx) {
	let props = { host: ctx.req.headers.host },
		data = { props };
	props.orderData = await getOrderReportData(ctx, data);

	props.chartData = await getOrderChartData(ctx, data);

	props.provinces = await getProvinces(ctx, null);

	props.provinceCode = ctx.query.provinceCode || "";

	const lang = loadLocale(ctx.req.cookies["lang"], ctx.req.headers.host);
	props.__lang = lang;
	props.__namespaces = await loadNamespaces(["common", "analytics"], lang);

	return data;
}

export default function OrderReportPage(props) {
	const { t } = useTranslation();

	const breadcrumb = [
		{
			name: t("common:menu.report"),
		},
		{
			name: t("common:menu.order"),
		},
	];

	let isVN = false;
	if (
		typeof props.host == "string" &&
		(props.host?.endsWith(".vn") || props.host?.startsWith("localhost"))
	) {
		isVN = true;
	}
	let onProvinceChange = function (e) {
		let provinceCode = e.target.value;
		if (provinceCode && provinceCode !== "ALL") {
			Router.push(`/report/order?provinceCode=${provinceCode}`);
		} else {
			Router.push(`/report/order`);
		}
	};

	return (
		<ReportApp breadcrumb={breadcrumb}>
			<Head>
				<title>{t("common:menu.report") + " " + t("common:menu.order")}</title>
			</Head>
			<Box>
				{isVN && (
					<Box style={{ marginBottom: 20 }}>
						<Select
							onChange={onProvinceChange}
							value={props.provinceCode ? props.provinceCode : "ALL"}
						>
							<MenuItem value="ALL" key="ALL" selected={!props.provinceCode}>
								{t("common:all")}
							</MenuItem>
							{props.provinces.map((p) => {
								return (
									<MenuItem
										value={p.code}
										key={p.code}
										selected={props.provinceCode === p.code}
									>
										{p.name}
									</MenuItem>
								);
							})}
						</Select>
					</Box>
				)}
				<OrderReportInfo {...props.orderData} />
				<Box>
					<AnalyticsChart
						title={t`analytics:order.30daysCount`}
						data={props.chartData.orderCount}
					/>
					<AnalyticsChart
						title={t`analytics:order.30daysValue`}
						data={props.chartData.orderValue}
					/>
				</Box>
			</Box>
		</ReportApp>
	);
}
