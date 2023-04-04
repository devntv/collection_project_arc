import { Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useRouter } from "next/router";
import React from "react";
import LineBarChartCustom from "components/ChatReport/Chart/LineBarChart";
import { APIStatus } from "lib/common";
import { getNDayFromNow } from "utilities/datetime";
import { doWithLoggedInUser } from "lib/login";
import { renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import { CONVERSATION_TYPE } from "services/ChatService";
import {
	getCompletedTimeSellerWithSAChartData,
	getNumberByDateSellerWithSAChartData,
	getRatingSellerWithSAChartData,
	getWaitTimeSellerWithSAChartData,
} from "services/ReportService";
import { regions } from "components/ChatReport/Filter";
import SummaryTable from "components/ChatReport/Table/SummaryTable";
import LineChartCustom from "components/ChatReport/Chart/LineChart";
import { getFormattedDate } from "lib/DateTimeUtil";
import { stringify } from "query-string";
import Head from "next/head";
import { isEqualDateMonth } from "../chat/wait-time";
import { SCHEDULE_TOPIC } from "components/ChatReport/LastUpdate";
import { loadLocale, loadNamespaces } from "pages/_app";
import ReportApp from "pages/_layout";
import { makeStyles } from "@material-ui/styles";
import LastUpdateSellerWithSA from "components/ChatReport/LastUpdateSellerWithSA";
import { getAverageRating } from "../chat/rating";
import useTranslation from "next-translate/useTranslation";
import {
	dateLabel,
	numberByDateLabel,
	waitTimeLabel,
	completedTimeLabel,
	ratingLabel,
	ratingCountLabel,
} from "constants/chat";

const useStyles = makeStyles({
	select: {
		padding: 0,
		paddingLeft: "15px",
		lineHeight: "40px",
	},
	gridLeft: {
		paddingLeft: "0px !important",
	},
	gridRight: {
		paddingRight: "0px !important",
	},
});

const title = "common:menu.sellerChat.last30DaysStats";
const breadCrumbs = (t) => [
	{
		link: "/",
		name: t("common:menu.report"),
	},
	{
		link: "/report/seller-chat/summary",
		name: t("common:menu.chat.title_seller_admin"),
	},
	{
		link: "/report/seller-chat/summary",
		name: t(title),
	},
];
function Summary(props) {
	const { t } = useTranslation();
	const classes = useStyles();
	const router = useRouter();

	const handleChangeRegion = (e) => {
		const dataQuery = {
			region: e.target?.value || "",
		};

		router.push(`?${stringify(dataQuery, { skipNull: true, skipEmptyString: true })}`);
	};

	return (
		<ReportApp breadcrumb={breadCrumbs(t)}>
			<Head>
				<title>{t(title)}</title>
			</Head>
			<Box width={"100%"} flexGrow={1}>
				<Grid style={{ position: "relative" }} container justifyContent={"space-between"}>
					<Grid
						item
						xs={12}
						md={5}
						lg={5}
						style={{ display: "flex", gap: "10px", maxWidth: "400px" }}
					>
						<Box
							sx={{
								color: "black",
								fontWeight: "bold",
								cursor: "pointer",
								whiteSpace: "nowrap",
								alignSelf: "center",
							}}
						>
							{t("common:region")}
						</Box>
						<Select
							id="region"
							classes={{
								select: classes.select,
							}}
							variant="outlined"
							fullWidth
							displayEmpty
							defaultValue={regions[0].value}
							size={"small"}
							style={{ height: "40px" }}
							value={props.sellerRegionCode || ""}
							onChange={handleChangeRegion}
						>
							{regions.map((item) => (
								<MenuItem value={item.value} key={item.value}>
									{t(item.name)}{" "}
								</MenuItem>
							))}
						</Select>
					</Grid>
					<Grid
						item
						xs={12}
						md={5}
						lg={5}
						style={{ textAlign: "right", alignSelf: "center" }}
					>
						<LastUpdateSellerWithSA
							topic={SCHEDULE_TOPIC.COUNT_RATING_BY_HOUR_SELLER_WITH_SA}
						/>
					</Grid>
				</Grid>
				<Box>
					<Grid container spacing={2} style={{ width: "100%", margin: 0 }}>
						<Grid
							item
							xs={12}
							md={6}
							lg={4}
							className={classes.gridLeft}
							style={{ paddingLeft: "0px !important" }}
						>
							<SummaryTable
								data={props.dateData}
								label={t("chat:title.today")}
								ratingLabel={ratingLabel}
								numberByDateLabel={numberByDateLabel}
								waitTimeLabel={waitTimeLabel}
								completedTimeLabel={completedTimeLabel}
							/>
						</Grid>
						<Grid item xs={12} md={6} lg={4}>
							<SummaryTable
								data={props.weekData}
								label={t("chat:title.last7Days")}
								ratingLabel={ratingLabel}
								numberByDateLabel={numberByDateLabel}
								waitTimeLabel={waitTimeLabel}
								completedTimeLabel={completedTimeLabel}
							/>
						</Grid>
						<Grid
							item
							xs={12}
							md={6}
							lg={4}
							className={classes.gridRight}
							style={{ paddingRight: "0px !important" }}
						>
							<SummaryTable
								data={props.monthData}
								label={t("chat:title.last30Days")}
								ratingLabel={t(ratingLabel)}
								numberByDateLabel={t(numberByDateLabel)}
								waitTimeLabel={t(waitTimeLabel)}
								completedTimeLabel={t(completedTimeLabel)}
							/>
						</Grid>
					</Grid>
				</Box>

				<Box xs={12}>
					<LineBarChartCustom
						leftLabel={t("chat:chart.quantity")}
						rightLabel={t("common:time.minute")}
						data={props.dataTopicChart}
					/>
				</Box>
				<Box sx={{ textAlign: "center", fontSize: "24px", marginTop: "20px" }}>
					{t("chat:sellerRating")}
				</Box>
				<Box xs={12}>
					<LineChartCustom
						data={props.dataRating}
						label={t("chat:rating")}
						dateLabel={t(dateLabel)}
						ratingLabel={t(ratingLabel)}
						ratingCountLabel={t(ratingCountLabel)}
					/>
				</Box>
			</Box>
		</ReportApp>
	);
}

export const getDataSummaryReport = async (ctx) => {
	let numberByDateChartData = [];
	let waitTimeChartData = [];
	let completedTimeChartData = [];
	let ratingChartData = [];

	const query = ctx.query;
	const sellerRegionCode = query.region || "";

	const queryData = {
		sellerRegionCode,
		conversationType: CONVERSATION_TYPE.SELLER_WITH_SELLER_ADMIN,
		startTime: getNDayFromNow(29, 7),
		endTime: new Date(),
	};

	const getNumberByDateChartDataRes = await getNumberByDateSellerWithSAChartData({
		ctx,
		params: queryData,
	});

	if (getNumberByDateChartDataRes.data.status == APIStatus.OK) {
		numberByDateChartData = getNumberByDateChartDataRes.data?.data || [];
	}
	const getWaitTimeChartDataRes = await getWaitTimeSellerWithSAChartData({
		ctx,
		params: queryData,
	});

	if (getWaitTimeChartDataRes.data.status == APIStatus.OK) {
		waitTimeChartData = getWaitTimeChartDataRes.data?.data || [];
	}

	const getCompletedTimeChartDataRes = await getCompletedTimeSellerWithSAChartData({
		ctx,
		params: queryData,
	});

	if (getCompletedTimeChartDataRes.data.status == APIStatus.OK) {
		completedTimeChartData = getCompletedTimeChartDataRes.data?.data || [];
	}

	const getRatingChartDataRes = await getRatingSellerWithSAChartData({
		ctx,
		params: queryData,
	});

	if (getRatingChartDataRes.data.status == APIStatus.OK) {
		ratingChartData = getRatingChartDataRes.data?.data || [];
	}

	const dataTopicChart = [];
	const start = getNDayFromNow(29);
	const end = new Date();
	const dataRating = [];
	for (let i = new Date(start); i <= end; i.setDate(i.getDate() + 1)) {
		let ratingChartItem = {
			value: 0,
			count: 0,
		};
		ratingChartItem.name = getFormattedDate(new Date(i), "DD/MM");
		const findRatingByDate = ratingChartData.filter((item) =>
			isEqualDateMonth(item.countDate, i)
		);
		let countCS = 0;
		findRatingByDate.forEach((item) => {
			if (item.count > 0) {
				ratingChartItem.value += getAverageRating(item?.listData);
				ratingChartItem.count += item?.count;
				countCS++;
			}
		});
		if (countCS == 0) {
			countCS = 1;
		}
		ratingChartItem.value = Math.round((ratingChartItem.value / countCS) * 10) / 10;
		dataRating.push(ratingChartItem);
	}

	for (let i = new Date(start); i <= end; i.setDate(i.getDate() + 1)) {
		let dataChartItem = {};
		dataChartItem.name = getFormattedDate(new Date(i), "DD/MM");
		dataChartItem[dateLabel] = getFormattedDate(new Date(i), "DD/MM");
		const findNumberByDate =
			numberByDateChartData.find((item) => isEqualDateMonth(item.countDate, i)) || {};
		dataChartItem[numberByDateLabel] = findNumberByDate?.count || 0;
		const findWaitTime =
			waitTimeChartData.find((item) => isEqualDateMonth(item.countDate, i)) || {};
		dataChartItem[waitTimeLabel] = findWaitTime?.averageTime || 0;
		const findCompletedTime =
			completedTimeChartData.find((item) => isEqualDateMonth(item.countDate, i)) || {};
		dataChartItem[completedTimeLabel] = findCompletedTime?.averageProcessingTime || 0;
		dataTopicChart.push(dataChartItem);
	}

	const weekData = {};
	weekData[numberByDateLabel] = 0;
	weekData[waitTimeLabel] = 0;
	weekData[completedTimeLabel] = 0;
	weekData[ratingLabel] = 0;
	weekData[ratingCountLabel] = 0;

	const monthData = {};
	monthData[numberByDateLabel] = 0;
	monthData[waitTimeLabel] = 0;
	monthData[completedTimeLabel] = 0;
	monthData[ratingLabel] = 0;
	monthData[ratingCountLabel] = 0;

	const dateData = {};
	dateData[numberByDateLabel] = 0;
	dateData[waitTimeLabel] = 0;
	dateData[completedTimeLabel] = 0;
	dateData[ratingLabel] = 0;
	dateData[ratingCountLabel] = 0;

	dataTopicChart.forEach((item, index) => {
		if (index >= dataTopicChart.length - 7) {
			weekData[numberByDateLabel] += item[numberByDateLabel];
			weekData[waitTimeLabel] += item[waitTimeLabel];
			weekData[completedTimeLabel] += item[completedTimeLabel];
		}
		if (index == dataTopicChart.length - 1) {
			dateData[numberByDateLabel] += item[numberByDateLabel];
			dateData[waitTimeLabel] += item[waitTimeLabel];
			dateData[completedTimeLabel] += item[completedTimeLabel];
		}
		monthData[numberByDateLabel] += item[numberByDateLabel];
		monthData[waitTimeLabel] += item[waitTimeLabel];
		monthData[completedTimeLabel] += item[completedTimeLabel];
	});

	dataRating.forEach((item, index) => {
		if (index >= dataTopicChart.length - 7) {
			weekData[ratingLabel] += item.value;
			item.count > 0 ? weekData[ratingCountLabel]++ : {};
		}
		if (index == dataTopicChart.length - 1) {
			dateData[ratingLabel] += item.value;
			item.count > 0 ? dateData[ratingCountLabel]++ : {};
		}
		monthData[ratingLabel] += item.value;
		item.count > 0 ? monthData[ratingCountLabel]++ : {};
	});

	weekData[waitTimeLabel] = Math.floor(weekData[waitTimeLabel] / 7);
	weekData[completedTimeLabel] = Math.floor(weekData[completedTimeLabel] / 7);
	weekData[ratingLabel] =
		weekData[ratingCountLabel] > 0
			? Math.round((weekData[ratingLabel] / weekData[ratingCountLabel]) * 10) / 10
			: 0;

	monthData[waitTimeLabel] = Math.floor(monthData[waitTimeLabel] / 30);
	monthData[completedTimeLabel] = Math.floor(monthData[completedTimeLabel] / 30);
	monthData[ratingLabel] =
		monthData[ratingCountLabel] > 0
			? Math.round((monthData[ratingLabel] / monthData[ratingCountLabel]) * 10) / 10
			: 0;

	const __lang = loadLocale(ctx.req.cookies["lang"]);
	const __namespaces = await loadNamespaces(["common", "chat"], __lang);

	return {
		props: {
			__lang,
			__namespaces,
			dataTopicChart,
			dateData,
			weekData,
			monthData,
			dataRating,
			sellerRegionCode,
			ratingChartData,
		},
	};
};

export async function getServerSideProps(context) {
	return await doWithLoggedInUser(context, (context) => {
		return getDataSummaryReport(context);
	});
}

export default function SummaryReportPage(props) {
	return renderWithLoggedInUser(props, Summary);
}
