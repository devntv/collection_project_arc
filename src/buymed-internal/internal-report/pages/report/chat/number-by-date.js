import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Filter from "components/ChatReport/Filter";
import HeaderReport from "components/ChatReport/HeaderReport";
import { APIStatus } from "lib/common";
import { doWithLoggedInUser } from "lib/login";
import { renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import { getListNumberByDate } from "services/ChatService";
import { getNDayFromNow, getNDayFromNowInVN, newDateWithoutLocation } from "utilities/datetime";
import { getNumberByDateChartData } from "services/ReportService";
import { getFormattedDate, getLastDate } from "lib/DateTimeUtil";
import ConversationsTable from "components/ConversationsInternal/ConversationTable";
import BarChart1 from "components/ChatReport/Chart/BarChart1";
import { exportExcel } from "lib/exportExcel";
import { useRef } from "react";
import { stringify } from "query-string";
import { useRouter } from "next/router";
import Head from "next/head";
import { isEqualDateMonth } from "./wait-time";
import { loadLocale, loadNamespaces } from "pages/_app";
import ReportApp from "pages/_layout";
import { SCHEDULE_TOPIC } from "components/ChatReport/LastUpdate";
import useTranslation from "next-translate/useTranslation";
import { conversationStatusLabel } from "constants/chat";

const rowsPerPageOptionsDefault = [20, 50, 100];

const headCells = (t) => [
	{
		id: "id-column",
		label: "#",
	},
	{
		id: "customer-info-short",
		label: t("chat:customer"),
	},
	{
		id: "region",
		label: t("common:region"),
	},
	{
		id: "customer-support",
		label: t("chat:supportEmployee"),
	},
	{
		id: "created-time",
		label: t("common:created_time"),
		haveSort: true,
	},
	{
		id: "approval-time",
		label: t("chat:receptionTime"),
	},
	{
		id: "short-status",
		label: t("common:status"),
		align: "center",
	},
];

const title = "common:menu.chat.completed_by_date";
const breadCrumbs = (t) => [
	{
		link: "/",
		name: t("common:menu.report"),
	},
	{
		link: "/report/chat/rating",
		name: t("common:menu.chat.title"),
	},
	{
		link: "/report/chat/rating",
		name: t(title),
	},
];
const NumberByDate = ({ rowsPerPageOptions, ...props }) => {
	const { t } = useTranslation();
	const lang = props.__lang;
	const [chartData, setChartData] = useState([]);
	const [topics, setTopics] = useState([]);
	const [topicsSorted, setTopicsSorted] = useState([]);
	const [totalTopic, setTotalTopic] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(
		props.rowsPerPage || rowsPerPageOptionsDefault[0]
	);
	const [page, setPage] = useState(props.page || 1);
	const [isLoading, setIsLoading] = useState(false);
	const [dataFilter, setDataFilter] = useState({
		customerRegionCode: "",
		customerSupportIDs: [],
	});
	const [dataQuery, setDataQuery] = useState({
		customerRegionCode: "",
		customerSupportIDs: [],
	});
	const [isSubmit, setIsSubmit] = useState(false);
	const firstLoadPage = useRef(true);
	const firstLoadRowsPerPage = useRef(true);
	const router = useRouter();

	useEffect(() => {
		topics.map((item) => {
			item.sortField = new Date(item.createdTime);
			item.sortField = item.sortField.getTime();
		});
		setTopicsSorted([...topics]);
	}, [topics]);

	const getListTopic = async (filterData) => {
		const dataQueryUrl = {
			region: filterData.customerRegionCode,
			supporter:
				filterData.customerSupportIDs && filterData.customerSupportIDs.length != 0
					? filterData.customerSupportIDs.join(",")
					: "",
			starttime: filterData.startTime ? filterData.startTime.getTime() : "",
			endtime: filterData.endTime
				? new Date(filterData.endTime.setDate(filterData.endTime.getDate() - 1)).getTime()
				: "",
			limit: rowsPerPage != rowsPerPageOptionsDefault[0] ? rowsPerPage : null,
			page: filterData.page != 1 ? filterData.page : null,
		};
		router.push(`?${stringify(dataQueryUrl, { skipNull: true, skipEmptyString: true })}`);
	};

	const getListNumberByDateFunc = async (offset) => {
		const res = await getListNumberByDate({
			params: {
				...dataFilter,
				startTime: dataFilter.startTime
					? new Date(dataFilter.startTime)
					: getNDayFromNow(6),
				endTime: new Date(props.lastCountHour),
				isHaveWaitToProcess: true,
				offset: offset,
				limit: 1000,
			},
		});
		if (res.data?.status == APIStatus.OK) {
			return res.data?.data;
		}
		return null;
	};

	const exportExcelFunc = async () => {
		setIsLoading(true);
		const topicsTemp = [];
		const promises = [];
		let promiseTime = Math.ceil(props.total / 1000);
		for (let i = 0; i < promiseTime; i++) {
			promises.push(getListNumberByDateFunc(i * 1000));
		}
		await Promise.all(promises).then((res) => {
			res = res.filter((i) => i != null);
			res.forEach((item) => {
				topicsTemp.push(...item);
			});
		});
		let dataExportTemp = [];
		topicsTemp.forEach((item) => {
			let itemTemp = {};
			itemTemp["id-column"] = item.topicID;
			itemTemp[
				"customer-info-short"
			] = `${item.customer?.phone} - ${item.customer?.accountID} - ${item.customer?.name}`;
			itemTemp["region"] = item.region;
			itemTemp["customer-support"] = item.customerSupportName || "";
			itemTemp["created-time"] = item.createdTime ? new Date(item.createdTime) : "";
			itemTemp["approval-time"] = item.approvalTime ? new Date(item.approvalTime) : "";
			itemTemp["short-status"] = conversationStatusLabel(t)[item.status];
			dataExportTemp.push(itemTemp);
		});
		setIsLoading(false);
		exportExcel(dataExportTemp, "Report", "NumberByDate", headCells(t));
	};

	const setIsSubmitFunc = (value) => {
		setIsSubmit(value);
	};

	const setDataFilterFunc = (value) => {
		setDataFilter(value);
	};

	const setPageFunc = (value) => {
		setPage(value);
	};

	const setRowsPerPageFunc = (value) => {
		setRowsPerPage(value);
	};

	const setListTopicsSortedFunc = (value) => {
		setTopicsSorted([...value]);
	};

	useEffect(() => {
		let dataFilter = {
			customerRegionCode: props.customerRegionCode,
			startTime: props.startTime ? new Date(props.startTime) : null,
			endTime: props.endTime ? new Date(props.endTime) : null,
			customerSupportIDs: props.customerSupportIDs,
			page: props.page,
			rowsPerPage: props.rowsPerPage,
		};
		setDataFilter(dataFilter);
		setDataQuery(dataFilter);
		let dataChartFull = [];
		let dataTemp = props.dataChart;
		let start = props.startTime
			? newDateWithoutLocation(new Date(props.startTime), 7)
			: getNDayFromNow(6);
		let end = props.endTime ? newDateWithoutLocation(new Date(props.endTime), 7) : new Date();
		for (let i = new Date(start); i <= end; i.setDate(i.getDate() + 1)) {
			let dataChartFullItem = {};
			const findDateData = dataTemp.find((item) => isEqualDateMonth(item.countDate, i));
			dataChartFullItem.name = getFormattedDate(new Date(i));
			dataChartFullItem.value = findDateData?.count || 0;
			dataChartFull.push(dataChartFullItem);
		}
		if (props.page) {
			setPage(props.page);
		} else {
			if (page == 1) {
				setIsSubmit(false);
			}
			setPage(1);
		}
		setChartData([...dataChartFull]);
		setTopics(props.dataList);
		setTotalTopic(props.total);
	}, [props.dataChart]);

	useEffect(() => {
		if (!firstLoadPage.current) {
			if (!isSubmit) {
				getListTopic({
					...dataFilter,
					page,
					offset: false,
					endTime: dataFilter.endTime
						? new Date(
								new Date(dataFilter.endTime).setDate(
									dataFilter.endTime.getDate() + 1
								)
						  )
						: null,
				});
			}
		}
		setIsSubmit(false);
		firstLoadPage.current = false;
	}, [page]);

	useEffect(() => {
		if (!firstLoadRowsPerPage.current) {
			getListTopic({
				...dataFilter,
				page,
				offset: true,
				endTime: dataFilter.endTime
					? new Date(
							new Date(dataFilter.endTime).setDate(dataFilter.endTime.getDate() + 1)
					  )
					: null,
			});
		}
		firstLoadRowsPerPage.current = false;
	}, [rowsPerPage]);

	return (
		<ReportApp breadcrumb={breadCrumbs(t)}>
			<Head>
				<title>{t(title)}</title>
			</Head>
			<Box sx={{ paddingBottom: 0 }} width={"100%"} flexGrow={1}>
				<HeaderReport label={t(title)} exportExcel={exportExcelFunc} />
				<Box
					sx={{
						padding: "15px",
						marginBottom: "20px",
						boxShadow:
							"0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
						borderBottomLeftRadius: "4px",
						borderBottomRightRadius: "4px",
					}}
					xs={12}
				>
					<Filter
						scheduleTopic={SCHEDULE_TOPIC.COUNT_TOPIC_BY_HOUR}
						setIsSubmit={setIsSubmitFunc}
						exportExcel={exportExcelFunc}
						setPage={setPageFunc}
						getListTopic={getListTopic}
						setDataFilter={setDataFilterFunc}
						dataQuery={dataQuery}
					/>
				</Box>
				<BarChart1 chartData={chartData} label={t("chat:conversationQty")} />
				<ConversationsTable
					loggedInUserInfo={props.loggedInUserInfo}
					rowsPerPageOptions={rowsPerPageOptions}
					headCells={headCells(t)}
					totalTopic={totalTopic}
					listTopics={topicsSorted}
					rowsPerPage={rowsPerPage}
					page={page}
					setPage={setPageFunc}
					setRowsPerPage={setRowsPerPageFunc}
					setListTopics={setListTopicsSortedFunc}
					loading={isLoading}
					lang={lang}
				/>
			</Box>
		</ReportApp>
	);
};

const getData = async (context, user) => {
	const rowsPerPageOptions = [...rowsPerPageOptionsDefault];
	const query = context.query || {};
	const customerRegionCode = query.region || "";
	const startTime = parseInt(query.starttime) || null;
	const endTime = parseInt(query.endtime) || null;
	let customerSupportIDs = query.supporter ? query.supporter.split(",") : [];
	customerSupportIDs = customerSupportIDs.map((item) => parseInt(item));
	const page = parseInt(query.page) > 0 ? parseInt(query.page) : 0;
	const rowsPerPage =
		parseInt(query.limit) > 0 ? parseInt(query.limit) : rowsPerPageOptionsDefault[0];
	if (!rowsPerPageOptions.includes(rowsPerPage)) {
		rowsPerPageOptions.unshift(rowsPerPage);
	}

	let dataChart = [];
	let dataList = [];
	let total = 0;
	let lastCountHour = new Date();
	const getChartDataRes = await getNumberByDateChartData({
		ctx: context,
		params: {
			customerRegionCode,
			customerSupportIDs,
			startTime: startTime ? new Date(startTime) : null,
			endTime: endTime
				? new Date(new Date(endTime).setDate(new Date(endTime).getDate() + 1))
				: null,
		},
	});

	if (getChartDataRes.data?.status == APIStatus.OK) {
		dataChart = getChartDataRes.data?.data;
		lastCountHour = getLastDate(dataChart.map((item) => new Date(item.countHour)));
		const getListDataRes = await getListNumberByDate({
			ctx: context,
			params: {
				customerRegionCode,
				customerSupportIDs,
				startTime: startTime ? new Date(startTime) : getNDayFromNowInVN(6),
				endTime: new Date(lastCountHour.setTime(lastCountHour.getTime() + 60 * 60 * 1000)),
				isHaveWaitToProcess: true,
				limit: rowsPerPage,
				offset: rowsPerPage * (page - 1),
			},
		});

		if (getListDataRes.data?.status == APIStatus.OK) {
			dataList = getListDataRes.data?.data;
			total = getListDataRes.data?.total;
		}
	}

	const __lang = loadLocale(context.req.cookies["lang"]);
	const __namespaces = await loadNamespaces(["common", "chat"], __lang);

	return {
		props: {
			__lang,
			__namespaces,
			user,
			dataChart,
			dataList,
			customerRegionCode,
			customerSupportIDs,
			startTime,
			endTime,
			page,
			rowsPerPage,
			rowsPerPageOptions,
			total,
			lastCountHour: lastCountHour.getTime(),
		},
	};
};

export async function getServerSideProps(context) {
	return await doWithLoggedInUser(context, (context, user) => {
		return getData(context, user);
	});
}

export default function NumberByDateReportPage(props) {
	return renderWithLoggedInUser(props, NumberByDate);
}
