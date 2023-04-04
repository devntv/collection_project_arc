import { doWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import { useRouter } from "next/router";
import { getProductClient } from "client/product";
import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import { MuiAutoFuzzy } from "@thuocsi/nextjs-components/muiauto-fuzzy/muiauto-fuzzy";
import React from "react";
import { useForm } from "react-hook-form";
import ReportApp from "pages/_layout";
import { FlexContainer, FlexContent } from "containers/common/flex";
import styles from "./sku.module.css";
import { Box, Tab, Tabs } from "@material-ui/core";
import {
	SKUSummary,
	SKUChart,
	TransactionAnalytics,
	SKUInfo,
	BriefAnalytics,
} from "containers/sku";
import useTranslation from "next-translate/useTranslation";
import { loadLocale, loadNamespaces } from "../../_app";
import { mockData } from "./detail-mock";
import { ActionAnalytics } from "containers/sku/analytics-action";
import Loader from "@thuocsi/nextjs-components/loader/loader";
import Head from "next/head";
import { getMonitoringAnalyticsClient } from "client/monitoring-analytics";
import { getSellerClient } from "client/seller";
import { getAnalyticsClient } from "client/integration-analytics";
import { formatNumber } from "components/utils";
import { APIStatus } from "lib/common";

export async function getServerSideProps(ctx) {
	return await doWithLoggedInUser(ctx, (ctx) => {
		return loadSKUDetailData(ctx);
	});
}

export async function loadSKUDetailData(ctx) {
	let props = {},
		data = { props };

	props.defaultSKU = ctx.query.sku || "";
	// let productClient = getProductClient(ctx, data)
	// if (defaultSKU !== "") {
	//     let skuResult = await productClient.getSingleSku(defaultSKU)
	//     if (skuResult.status === APIStatus.OK) {
	//         let sku = skuResult.data[0]
	//         let productCode = sku.productCode
	//         props.defaultSKU = defaultSKU
	//     }
	// }

	const lang = loadLocale(ctx.req.cookies["lang"], ctx.req.headers.host);
	props.__lang = lang;
	props.__namespaces = await loadNamespaces(["common", "sku"], lang);

	return data;
}

async function loadMockupData(sku, timePreset) {
	mockData.sku.code = sku;
	await new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, 550);
	});
	return mockData;
}

async function loadRealData(sku, timePreset) {
	let data = JSON.parse(JSON.stringify(mockData));
	data.sku.code = sku;

	// get data
	let from = new Date();
	let to = new Date();
	from.setDate(from.getDate() - 32);
	from.setHours(0);
	from.setMinutes(0, 0, 0);
	let monitoringClient = getMonitoringAnalyticsClient();
	let integrationClient = getAnalyticsClient();
	let productClient = getProductClient();
	let skuInfo = productClient.getSingleSku(sku);
	let skuImpression, skuDetailView, skuAddToCart, skuAnalytics;
	await Promise.all([
		monitoringClient.getFixedStandardAnalytics("SKU_IMPRESSION", sku, from, to, "DAY"),
		monitoringClient.getFixedStandardAnalytics("SKU_DETAIL_VIEW", sku, from, to, "DAY"),
		monitoringClient.getFixedStandardAnalytics("ADD_TO_CART", sku, from, to, "DAY"),
		integrationClient.getSkuAnalytics(sku, from, to, "DAY"),
		skuInfo,
	]).then(([a, b, c, d, e]) => {
		skuImpression = a;
		skuDetailView = b;
		skuAddToCart = c;
		skuAnalytics = d;
		skuInfo = e;
	});
	// console.log("time", from, to)
	// console.log("skuImpression", skuImpression)
	// console.log("skuDetailView", skuDetailView)
	// console.log("skuAddToCart", skuAddToCart)

	let impression = skuImpression.status === APIStatus.OK ? skuImpression.data : [];
	let detailView = skuDetailView.status === APIStatus.OK ? skuDetailView.data : [];
	let addToCart = skuAddToCart.status === APIStatus.OK ? skuAddToCart.data : [];
	let analytics = skuAnalytics.status === APIStatus.OK ? skuAnalytics.data : [];

	// common functions used for computation
	function getAnalyticsTimeKey(t = new Date()) {
		return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate();
	}

	function getMonitoringTimeIndex(t = new Date()) {
		let monthStr = t.getMonth() + 1;
		if (monthStr < 10) {
			monthStr = "0" + monthStr;
		}
		let dayStr = t.getDate();
		if (dayStr < 10) {
			dayStr = "0" + dayStr;
		}
		return t.getFullYear() + "_" + monthStr + "_" + dayStr;
	}

	function computeData(data, timeAs, timeMs) {
		analytics
			.filter((a) => timeAs.indexOf(a.timeKey) >= 0)
			.forEach((analyticsObj) => {
				data.orderCount = (data.orderCount || 0) + (analyticsObj.orderCount || 0);
				data.orderedQuantity =
					(data.orderedQuantity || 0) + (analyticsObj.orderedQuantity || 0);
				data.orderedValue = (data.orderedValue || 0) + (analyticsObj.totalValue || 0);
			});
		impression
			.filter((a) => timeMs.indexOf(a.timeIndex) >= 0)
			.forEach((analyticsObj) => {
				data.impression = (data.impression || 0) + (analyticsObj.value || 0);
			});

		detailView
			.filter((a) => timeMs.indexOf(a.timeIndex) >= 0)
			.forEach((analyticsObj) => {
				data.view = (data.view || 0) + (analyticsObj.value || 0);
			});
		addToCart
			.filter((a) => timeMs.indexOf(a.timeIndex) >= 0)
			.forEach((analyticsObj) => {
				data.addToCart = (data.addToCart || 0) + (analyticsObj.value || 0);
			});
	}

	function computeChart([timeAs, timeMs], impression, detailView, addToCart, analytics) {
		let result = [];
		for (let i = 0; i < timeAs.length; i++) {
			let item = {
				impression: 0,
				view: 0,
				addToCart: 0,
				orderCount: 0,
				orderedQuantity: 0,
				orderedValue: 0,
			};
			let timeKey = timeAs[i];
			let timeParts = timeKey.split("-");
			item.label =
				timeParts.length === 4 ? timeParts[3] + ":00" : timeParts[2] + "/" + timeParts[1];

			let r = analytics.filter((a) => timeKey === a.timeKey);

			if (r && r.length) {
				item.orderCount = r[0].orderCount || 0;
				item.orderedQuantity = r[0].orderedQuantity || 0;
				item.orderedValue = r[0].totalValue || 0;
			}

			timeKey = timeMs[i];
			impression
				.filter((a) => timeKey === a.timeIndex)
				.forEach((analyticsObj) => {
					item.impression = analyticsObj.value || 0;
				});

			detailView
				.filter((a) => timeKey === a.timeIndex)
				.forEach((analyticsObj) => {
					item.view = analyticsObj.value || 0;
				});
			addToCart
				.filter((a) => timeKey === a.timeIndex)
				.forEach((analyticsObj) => {
					item.addToCart = analyticsObj.value || 0;
				});
			result.push(item);
		}

		return result;
	}

	function getTimerange(days = 0) {
		let timeAs = [],
			timeMs = [];
		let result = [timeAs, timeMs];

		let now = new Date();
		let from = new Date(+now - 24 * 3600000 * days);
		while (+from <= +now) {
			timeAs.push(getAnalyticsTimeKey(from));
			timeMs.push(getMonitoringTimeIndex(from));
			from = new Date(+from + 24 * 3600000);
		}

		return result;
	}

	// generate summary data
	data.summary.forEach((sum, i) => {
		sum.data = {
			impression: 0,
			view: 0,
			addToCart: 0,
			orderCount: 0,
			orderedQuantity: 0,
			orderedValue: 0,
		};

		switch (sum.title) {
			case "today":
				let todayA = getAnalyticsTimeKey();
				let todayM = getMonitoringTimeIndex();
				computeData(sum.data, [todayA], [todayM]);
				break;
			case "this_week":
				{
					let timeRange = getTimerange(new Date().getDay() - 1);
					computeData(sum.data, timeRange[0], timeRange[1]);
				}
				break;
			case "this_month":
				{
					let timeRange = getTimerange(new Date().getDate() - 1);
					computeData(sum.data, timeRange[0], timeRange[1]);
				}
				break;
			case "7_days":
				{
					let timeRange = getTimerange(6);
					computeData(sum.data, timeRange[0], timeRange[1]);
				}
				break;
			case "30_days":
				{
					let timeRange = getTimerange(30);
					computeData(sum.data, timeRange[0], timeRange[1]);
				}
				break;
		}
	});

	// generate chart data
	let timeRange = [];
	switch (timePreset) {
		case "today":
			break;
		case "this_week":
			{
				timeRange = getTimerange(new Date().getDay() - 1);
			}
			break;
		case "this_month":
			{
				timeRange = getTimerange(new Date().getDate() - 1);
			}
			break;
		case "7_days":
			{
				timeRange = getTimerange(6);
			}
			break;
		case "30_days":
			{
				timeRange = getTimerange(30);
			}
			break;
	}
	data.chart = computeChart(timeRange, impression, detailView, addToCart, analytics);

	// fill basic info of SKU
	if (skuInfo.status === APIStatus.OK) {
		let info = skuInfo.data[0];
		data.sku.productID = info.productID;
		data.sku.slug = info.slug;
		let sellerClient = getSellerClient();
		await Promise.all([
			productClient.getProductByCodes([info.productCode]),
			sellerClient.getSellersByCodes([info.sellerCode]),
		]).then(([productResult, sellerResult]) => {
			// console.log("productResult", productResult)
			// console.log("sellerResult", sellerResult)
			if (productResult.status === APIStatus.OK) {
				let product = productResult.data[0];
				data.sku.productName = product.name;
			}

			if (sellerResult.status === APIStatus.OK) {
				let seller = sellerResult.data[0];
				data.sku.sellerName = seller.name;
			}
		});
	}

	// console.log("skuInfo", skuInfo)
	return data;
}

/**
 *
 * @param data 30 days data
 * @returns {JSX.Element}
 */
function analyze(data, t) {
	// console.log("analyze", data)
	let dataLine = JSON.parse(JSON.stringify(data.chart || []));
	let today = dataLine.splice(dataLine.length - 1)[0];

	// compute trend
	let firstHalf = 0,
		secondHalf = 0;
	for (let i = 0; i < parseInt(dataLine.length / 2); i++) {
		firstHalf += dataLine[i]?.orderedValue || 0;
	}
	for (let i = parseInt(dataLine.length / 2); i < dataLine.length; i++) {
		secondHalf += dataLine[i]?.orderedValue || 0;
	}

	// console.log("analyze 2", firstHalf, secondHalf)
	let trend = "";
	let diff = 0;
	if (firstHalf > 0) {
		diff = Math.pow(secondHalf / firstHalf, 1 / parseInt(dataLine.length / 2)) - 1;
		if (firstHalf > secondHalf) {
			trend = (
				<>
					{t`sku:analysis.decrement`} <b>{Number(diff * 100).toFixed(2)}</b> %{" "}
					{t`sku:analysis.perDay`}{" "}
				</>
			);
		} else {
			trend = (
				<>
					{t`sku:analysis.increment`} <b>{Number(diff * 100).toFixed(2)}</b> %{" "}
					{t`sku:analysis.perDay`}{" "}
				</>
			);
		}
	}

	// compute min,max
	let min = { label: "", value: -1 },
		max = { label: "", value: -1 };
	for (let i = 0; i < dataLine.length; i++) {
		if (min.value < 0 || min.value > dataLine[i].orderedValue) {
			min.value = dataLine[i].orderedValue;
			min.label = dataLine[i].label;
		}

		if (max.value < 0 || max.value < dataLine[i].orderedValue) {
			max.value = dataLine[i].orderedValue;
			max.label = dataLine[i].label;
		}
	}

	// predict today
	let template = [
		229, 432, 799, 1194, 973, 783, 657, 670, 802, 748, 513, 373, 307, 283, 425, 340, 281, 191,
	];

	let last7days = 0;
	for (let i = 0; i < 6; i++) {
		last7days += dataLine[dataLine.length - i - 1].orderedValue;
	}
	last7days = last7days / 6;
	let predictByHistory = 0;
	let historyDayDiff = dataLine[dataLine.length - 7].orderedValue / last7days;
	if (historyDayDiff > 2.5 || historyDayDiff < 0.4) {
		predictByHistory =
			(dataLine[dataLine.length - 7].orderedValue * 0.4 + last7days * 0.6) * (1 + diff);
	} else {
		predictByHistory =
			(dataLine[dataLine.length - 7].orderedValue * 0.9 + last7days * 0.1) * (1 + diff);
	}

	let current = new Date();
	let hour = current.getHours();
	let minutes = current.getMinutes();
	let predictByCurrent = 0;
	let finalPrediction = 0;
	if (hour < 7) {
		finalPrediction = predictByHistory;
	} else {
		let ratio = 0;
		for (let i = 0; i + 7 <= hour; i++) {
			ratio += template[i];
			if (i + 7 === hour) {
				ratio += (minutes * template[i + 1]) / 60.0;
			}
		}
		predictByCurrent = Math.floor((today.orderedValue * 10000) / (ratio * 100)) * 100;
		finalPrediction =
			predictByHistory > today.orderedValue
				? (predictByHistory * 2 + predictByCurrent * 8) / 10
				: predictByCurrent;
	}

	if (((predictByHistory > 10000000 && hour > 8) || hour > 12) && today.orderedValue === 0) {
		finalPrediction = 0;
	}

	finalPrediction = parseInt(finalPrediction / 100 + "") * 100;
	// console.log(last7days, hour, predictByHistory, predictByCurrent, finalPrediction)

	return (
		<>
			<li>{trend}</li>
			<li>
				{t`sku:analysis.lowestRevenueDay`} <b>{min.label}</b> {t`sku:analysis.withRevenue`}{" "}
				<b>{formatNumber(min.value)}</b>
			</li>
			<li>
				{t`sku:analysis.highestRevenueDay`} <b>{max.label}</b> {t`sku:analysis.withRevenue`}{" "}
				<b>{formatNumber(max.value)}</b>
			</li>
			<li>
				{finalPrediction ? (
					<>
						{t`sku:analysis.prediction`} <b>{formatNumber(finalPrediction)}</b>
					</>
				) : (
					<>{t`sku:analysis.predictionProcessing`} </>
				)}
			</li>
		</>
	);
}

function SkuContent({ sku, t }) {
	// state
	let [loading, setLoading] = React.useState(false);
	let [data, setData] = React.useState(null);
	let [timePreset, setTimePreset] = React.useState("30_days");
	let [briefContent, setBriefContent] = React.useState(null);

	let loadData = loadRealData;
	let reloadData = async function (localTimePreset) {
		setLoading(true);
		let loadedData = await loadData(sku, localTimePreset || timePreset);
		setData(loadedData);
		setLoading(false);
		return loadedData;
	};

	React.useEffect(() => {
		(async () => {
			if (sku !== "") {
				setTimePreset("30_days");
				let loadedData = await reloadData("30_days");
				setBriefContent(analyze(loadedData, t));
			}
		})();
	}, [sku]);

	let onTimePresetChange = function (option) {
		setTimePreset(option);
	};

	React.useEffect(() => {
		reloadData();
	}, [timePreset]);

	if (!data) {
		return <>{loading ? <Loader show={true} /> : ""}</>;
	}

	return (
		<>
			<FlexContainer className={styles.skuInfoBox}>
				<FlexContent>
					<SKUInfo sku={data?.sku || {}} t={t} />
				</FlexContent>
				<FlexContent>
					<BriefAnalytics t={t}>{briefContent || ""}</BriefAnalytics>
				</FlexContent>
			</FlexContainer>
			<FlexContainer>
				{data?.summary
					? data.summary.map((summaryItem) => (
							<FlexContent key={summaryItem.title}>
								{/* <SKUSummary
									title={summaryItem.title}
									t={t}
									data={summaryItem.data}
									currentPreset={timePreset}
									onTimePresetChange={onTimePresetChange}
								/> */}
							</FlexContent>
					  ))
					: " "}
			</FlexContainer>

			{loading ? (
				<Loader show={true} />
			) : (
				<>
					<Box className={styles.timePresetDesc}>{t("sku:desc." + timePreset)}</Box>
					<SKUChart data={data.chart} t={t} />
					<FlexContainer className={styles.skuInfoBox}>
						<FlexContent>
							<ActionAnalytics data={data} t={t} />
						</FlexContent>
						<FlexContent>
							<TransactionAnalytics data={data} t={t} />
						</FlexContent>
					</FlexContainer>
				</>
			)}
		</>
	);
}

export default function SkuDetailPage({ defaultSKU = "" }) {
	let formObject = useForm({
		sku: defaultSKU,
	});
	const router = useRouter();
	const { t } = useTranslation("sku");

	let [sku, setSKU] = React.useState(defaultSKU);

	async function onSKUChange(option) {
		setSKU(option.value);
		await router.push("?sku=" + option.value, null, { shallow: true });
	}

	const breadcrumb = (t) => [
		{
			name: t("common:menu.report"),
		},
		{
			name: t("common:menu.sku"),
			link: "/report/sku",
		},
		{
			name: t("sku:page_title.sku_detail"),
		},
	];
	return (
		<ReportApp breadcrumb={breadcrumb(t)}>
			<Head>
				<title>{t`sku:page_title.sku_detail`}</title>
			</Head>
			<FlexContainer>
				<FlexContent>
					<MuiAutoFuzzy
						type={"SKU"}
						componentType={"MUI_SINGLE"}
						name={"sku"}
						filterForm={formObject}
						onValueChange={onSKUChange}
					/>
				</FlexContent>
			</FlexContainer>
			{sku === "" ? "" : <SkuContent sku={sku} t={t} />}
		</ReportApp>
	);
}
