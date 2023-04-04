import { Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import LineBarChartCustom from "components/ChatReport/Chart/LineBarChart";
import { APIStatus } from "lib/common";
import { getNDayFromNow } from "utilities/datetime";
import { doWithLoggedInUser } from "lib/login";
import { renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import { getRatingChartData } from "services/ChatService";
import {
	getCompletedTimeChartData,
	getNumberByDateChartData,
	getWaitTimeChartData,
} from "services/ReportService";
import { regions } from "components/ChatReport/Filter";
import SummaryTable from "components/ChatReport/Table/SummaryTable";
import LineChartCustom from "components/ChatReport/Chart/LineChart";
import { getFormattedDate } from "lib/DateTimeUtil";
import { stringify } from "query-string";
import Head from "next/head";
import { isEqualDateMonth } from "./wait-time";
import LastUpdate, { SCHEDULE_TOPIC } from "components/ChatReport/LastUpdate";
import { loadLocale, loadNamespaces } from "pages/_app";
import ReportApp from "pages/_layout";
import { makeStyles } from "@material-ui/styles";
import useTranslation from "next-translate/useTranslation";
import {
	completedTimeLabel,
	dateLabel,
	numberByDateLabel,
	waitTimeLabel,
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
	const [chartData, setChartData] = useState([]);
	const [chartRating, setChartRating] = useState([]);
	const [dateData, setDateData] = useState({});
	const [weekData, setWeekData] = useState({});
	const [monthData, setMonthData] = useState({});

	const router = useRouter();

	const handleChangeRegion = (e) => {
		const dataQuery = {
			region: e.target?.value || "",
		};

		router.push(`?${stringify(dataQuery, { skipNull: true, skipEmptyString: true })}`);
	};

	useEffect(() => {
		let dataChartFull = [];
		let dataChartRating = [];
		let numberByDateDataChartTemp = props.numberByDateChartData;
		let waitTimeDataChartTemp = props.waitTimeChartData;
		let completedTimeChartDataTemp = props.completedTimeChartData;
		let ratingChartDataTemp = props.ratingChartData;
		let start = getNDayFromNow(29);
		let end = new Date();
		for (let i = new Date(start); i <= end; i.setDate(i.getDate() + 1)) {
			let dataChartItem = {};
			dataChartItem.name = getFormattedDate(new Date(i), "DD/MM");
			dataChartItem[dateLabel] = getFormattedDate(new Date(i), "DD/MM");
			const findNumberByDate =
				numberByDateDataChartTemp.find((item) => isEqualDateMonth(item.countDate, i)) || {};
			dataChartItem[numberByDateLabel] = findNumberByDate?.count || 0;
			const findWaitTime =
				waitTimeDataChartTemp.find((item) => isEqualDateMonth(item.countDate, i)) || {};
			dataChartItem[waitTimeLabel] = findWaitTime?.averageTime || 0;
			const findCompletedTime =
				completedTimeChartDataTemp.find((item) => isEqualDateMonth(item.countDate, i)) ||
				{};
			dataChartItem[completedTimeLabel] = findCompletedTime?.averageProcessingTime || 0;
			dataChartFull.push(dataChartItem);

			let ratingChartItem = {};
			ratingChartItem.name = getFormattedDate(new Date(i), "DD/MM");
			const findRatingByDate =
				ratingChartDataTemp.find((item) => isEqualDateMonth(item.countDate, i)) || {};
			ratingChartItem.value = findRatingByDate?.average || 0;
			ratingChartItem.value = Math.round(ratingChartItem.value * 10) / 10;
			ratingChartItem.count = findRatingByDate?.count || 0;
			dataChartRating.push(ratingChartItem);
		}
		setChartRating([...dataChartRating]);
		setChartData([...dataChartFull]);
	}, [props]);

	useEffect(() => {
		let weekDataTemp = {};
		weekDataTemp[numberByDateLabel] = 0;
		weekDataTemp[waitTimeLabel] = 0;
		weekDataTemp[completedTimeLabel] = 0;
		weekDataTemp[ratingLabel] = 0;
		weekDataTemp[ratingCountLabel] = 0;

		let monthDataTemp = {};
		monthDataTemp[numberByDateLabel] = 0;
		monthDataTemp[waitTimeLabel] = 0;
		monthDataTemp[completedTimeLabel] = 0;
		monthDataTemp[ratingLabel] = 0;
		monthDataTemp[ratingCountLabel] = 0;

		let dateDataTemp = {};
		dateDataTemp[numberByDateLabel] = 0;
		dateDataTemp[waitTimeLabel] = 0;
		dateDataTemp[completedTimeLabel] = 0;
		dateDataTemp[ratingLabel] = 0;
		dateDataTemp[ratingCountLabel] = 0;

		chartData.forEach((item, index) => {
			if (index >= chartData.length - 7) {
				weekDataTemp[numberByDateLabel] += item[numberByDateLabel];
				weekDataTemp[waitTimeLabel] += item[waitTimeLabel];
				weekDataTemp[completedTimeLabel] += item[completedTimeLabel];
			}
			if (index == chartData.length - 1) {
				dateDataTemp[numberByDateLabel] += item[numberByDateLabel];
				dateDataTemp[waitTimeLabel] += item[waitTimeLabel];
				dateDataTemp[completedTimeLabel] += item[completedTimeLabel];
			}
			monthDataTemp[numberByDateLabel] += item[numberByDateLabel];
			monthDataTemp[waitTimeLabel] += item[waitTimeLabel];
			monthDataTemp[completedTimeLabel] += item[completedTimeLabel];
		});

		chartRating.forEach((item, index) => {
			if (index >= chartData.length - 7) {
				weekDataTemp[ratingLabel] += item.value;
				item.count > 0 ? weekDataTemp[ratingCountLabel]++ : {};
			}
			if (index == chartData.length - 1) {
				dateDataTemp[ratingLabel] += item.value;
				item.count > 0 ? dateDataTemp[ratingCountLabel]++ : {};
			}
			monthDataTemp[ratingLabel] += item.value;
			item.count > 0 ? monthDataTemp[ratingCountLabel]++ : {};
		});

		weekDataTemp[waitTimeLabel] = Math.floor(weekDataTemp[waitTimeLabel] / 7);
		weekDataTemp[completedTimeLabel] = Math.floor(weekDataTemp[completedTimeLabel] / 7);
		weekDataTemp[ratingLabel] =
			weekDataTemp[ratingCountLabel] > 0
				? Math.round((weekDataTemp[ratingLabel] / weekDataTemp[ratingCountLabel]) * 10) / 10
				: 0;

		monthDataTemp[waitTimeLabel] = Math.floor(monthDataTemp[waitTimeLabel] / 30);
		monthDataTemp[completedTimeLabel] = Math.floor(monthDataTemp[completedTimeLabel] / 30);
		monthDataTemp[ratingLabel] =
			monthDataTemp[ratingCountLabel] > 0
				? Math.round((monthDataTemp[ratingLabel] / monthDataTemp[ratingCountLabel]) * 10) /
				  10
				: 0;

		setDateData(dateDataTemp);
		setWeekData(weekDataTemp);
		setMonthData(monthDataTemp);
	}, [chartData]);

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
							value={props.customerRegionCode || ""}
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
						<LastUpdate topic={SCHEDULE_TOPIC.COUNT_TOPIC_BY_HOUR} />
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
								data={dateData}
								label={t("chat:title.today")}
								ratingLabel={t(ratingLabel)}
								numberByDateLabel={t(numberByDateLabel)}
								waitTimeLabel={t(waitTimeLabel)}
								completedTimeLabel={t(completedTimeLabel)}
							/>
						</Grid>
						<Grid item xs={12} md={6} lg={4}>
							<SummaryTable
								data={weekData}
								label={t("chat:title.last7Days")}
								ratingLabel={t(ratingLabel)}
								numberByDateLabel={t(numberByDateLabel)}
								waitTimeLabel={t(waitTimeLabel)}
								completedTimeLabel={t(completedTimeLabel)}
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
								data={monthData}
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
						data={chartData}
					/>
				</Box>
				<Box sx={{ textAlign: "center", fontSize: "24px", marginTop: "20px" }}>
					{t("chat:customerRating")}
				</Box>
				<Box xs={12}>
					<LineChartCustom
						data={chartRating}
						label="Rating"
						dateLabel={t(dateLabel)}
						ratingLabel={t(ratingLabel)}
						ratingCountLabel={t(ratingCountLabel)}
					/>
				</Box>
			</Box>
		</ReportApp>
	);
}

export const getDataSummaryReport = async (context, user) => {
	let numberByDateChartData = [];
	let waitTimeChartData = [];
	let completedTimeChartData = [];
	let ratingChartData = [];

	const query = context.query;
	const customerRegionCode = query.region || "";

	const dataQuery = {
		customerRegionCode,
		startTime: getNDayFromNow(29, 7),
		endTime: new Date(),
	};

	const getNumberByDateChartDataRes = await getNumberByDateChartData({
		ctx: context,
		params: dataQuery,
	});

	if (getNumberByDateChartDataRes.data.status == APIStatus.OK) {
		numberByDateChartData = getNumberByDateChartDataRes.data?.data || [];
	}
	const getWaitTimeChartDataRes = await getWaitTimeChartData({
		ctx: context,
		params: dataQuery,
	});

	if (getWaitTimeChartDataRes.data.status == APIStatus.OK) {
		waitTimeChartData = getWaitTimeChartDataRes.data?.data || [];
	}

	const getCompletedTimeChartDataRes = await getCompletedTimeChartData({
		ctx: context,
		params: dataQuery,
	});

	if (getCompletedTimeChartDataRes.data.status == APIStatus.OK) {
		completedTimeChartData = getCompletedTimeChartDataRes.data?.data || [];
	}

	const getRatingChartDataRes = await getRatingChartData({
		ctx: context,
		params: dataQuery,
	});

	if (getRatingChartDataRes.data.status == APIStatus.OK) {
		ratingChartData = getRatingChartDataRes.data?.data || [];
	}

	const __lang = loadLocale(context.req.cookies["lang"]);
	const __namespaces = await loadNamespaces(["common", "chat"], __lang);

	return {
		props: {
			__lang,
			__namespaces,
			user,
			numberByDateChartData,
			waitTimeChartData,
			completedTimeChartData,
			customerRegionCode,
			ratingChartData,
		},
	};
};

export async function getServerSideProps(context) {
	return await doWithLoggedInUser(context, (context, user) => {
		return getDataSummaryReport(context, user);
	});
}

export default function SummaryReportPage(props) {
	return renderWithLoggedInUser(props, Summary);
}
