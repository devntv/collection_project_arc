import { Box, Grid, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { APIStatus } from "lib/common";
import { doWithLoggedInUser } from "lib/login";
import { renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import { getListEmployee } from "services/ChatService";
import {
	getCountAverageCompletedTopic,
	getCountAverageProcessingTopic,
} from "services/ReportService";
import { stringify } from "query-string";
import { useRouter } from "next/router";
import GroupTable from "components/ChatReport/Table/GroupTable";
import LastUpdate, { SCHEDULE_TOPIC } from "components/ChatReport/LastUpdate";
import { loadLocale, loadNamespaces } from "pages/_app";
import ReportApp from "pages/_layout";
import Head from "next/head";
import { makeStyles } from "@material-ui/styles";
import useTranslation from "next-translate/useTranslation";
import { regions } from "components/ChatReport/Filter";

const rowsPerPageOptionsDefault = [20, 50, 100];

const schema1 = {
	numColumn: 7,
	columns: [
		{
			data: "customerSupportName",
			align: "left",
			width: 300,
		},
		{
			data: "inProcessing",
		},
		{
			data: "completedToday",
		},
		{
			data: "completedWeek",
		},
		{
			data: "completedMonth",
		},
		{
			data: "averageWaitTime",
			width: 200,
		},
		{
			data: "averageComplete",
			width: 200,
		},
	],
};

const useStyles = makeStyles({
	select: {
		padding: 0,
		paddingLeft: "15px",
		lineHeight: "40px",
	},
});

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
		link: "/report/chat/summary-by-cs",
		name: t("common:menu.chat.summary_by_cs"),
	},
];

function SummaryByCS(props) {
	const { t } = useTranslation();
	const lang = props.__lang;
	const classes = useStyles();
	const [dataTime, setDataTime] = useState([]);
	const [dataTimeSorted, setDataTimeSorted] = useState([]);

	const [region, setRegion] = useState(props.region || "");

	const [pageTime, setPageTime] = useState(props.pageRating || 1);
	const [rowsPerPageTime, setRowsPerPageTime] = useState(
		props.rowsPerPageRating || rowsPerPageOptionsDefault[0]
	);
	const router = useRouter();

	const handleChangeRegion = (e) => {
		const dataQuery = {
			region: e.target?.value || "",
			limit: rowsPerPageTime || rowsPerPageOptionsDefault[0],
			page: pageTime || 1,
		};

		router.push(`?${stringify(dataQuery, { skipNull: true, skipEmptyString: true })}`);
	};

	useEffect(() => {
		const dataTimeFull = {};
		const dataTimeFullArray = [];
		const dataCompletedTemp = props.completedTimeData;
		const dataWaitTemp = props.waitTimeData;

		dataCompletedTemp?.map((item) => {
			const dataTimeItem = {};
			dataTimeItem.customerSupportID = item.customerSupportID;
			dataTimeItem.customerSupportName = props.listCSMap[item.customerSupportID];
			dataTimeItem.averageComplete = Math.floor(item.averageByMonth);
			dataTimeItem.completedToday = item.numberByDate;
			dataTimeItem.completedWeek = item.numberByWeek;
			dataTimeItem.completedMonth = item.numberByMonth;

			dataTimeFull[item.customerSupportID] = dataTimeItem;
		});

		dataWaitTemp?.map((item) => {
			dataTimeFull[item.customerSupportID].inProcessing = item.numberByMonth;
			dataTimeFull[item.customerSupportID].averageWaitTime = Math.floor(item.averageByMonth);
		});

		for (let i in dataTimeFull) {
			dataTimeFullArray.push(dataTimeFull[i]);
		}

		setRowsPerPageTime(props.limit || rowsPerPageOptionsDefault[0]);
		setPageTime(props.page || 1);
		setRegion(props.region || "");
		setDataTime([...dataTimeFullArray]);
	}, [props]);

	const handleChangePageTime = (newPage) => {
		setPageTime(newPage);
		const dataQuery = {
			region,
			limit: rowsPerPageTime || 0,
			page: newPage,
		};
		router.push(`?${stringify(dataQuery, { skipNull: true, skipEmptyString: true })}`);
	};

	const handleChangeRowsPerPageTime = (newRowsPerPage) => {
		setRowsPerPageTime(newRowsPerPage);
		const dataQuery = {
			region,
			limit: newRowsPerPage || 0,
			offset: (pageTime - 1) * newRowsPerPage,
		};
		router.push(`?${stringify(dataQuery, { skipNull: true, skipEmptyString: true })}`);
	};

	useEffect(() => {
		dataTime.sort((a, b) => a.customerSupportID - b.customerSupportID);
		setDataTimeSorted([...dataTime]);
	}, [dataTime]);

	return (
		<ReportApp breadcrumb={breadCrumbs(t)} user={props.user}>
			<Head>
				<title>{t("common:menu.chat.summary_by_cs")}</title>
			</Head>
			<Box sx={{ height: "100%", width: "100%" }}>
				<Grid
					style={{ position: "relative", marginBottom: "20px" }}
					container
					justifyContent={"space-between"}
				>
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
							variant="outlined"
							fullWidth
							displayEmpty
							defaultValue={regions[0].value}
							size={"small"}
							value={props.customerRegionCode || ""}
							onChange={handleChangeRegion}
							classes={{
								select: classes.select,
							}}
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
				<Paper>
					<GroupTable
						schema={schema1}
						page={pageTime}
						rowsPerPage={rowsPerPageTime}
						totalCS={props.totalCS}
						rowsPerPageOptions={props.rowsPerPageOptions}
						data={dataTimeSorted}
						handleChangePage={handleChangePageTime}
						handleChangeRowsPerPage={handleChangeRowsPerPageTime}
						lang={lang}
					/>
				</Paper>
			</Box>
		</ReportApp>
	);
}

const getData = async (context, user) => {
	const rowsPerPageOptions = [...rowsPerPageOptionsDefault];
	const listCSMap = {};
	let waitTimeData = [];
	let completedTimeData = [];

	const query = context.query || {};
	const customerRegionCode = query.region || "";
	const limit = parseInt(query.limit) || rowsPerPageOptionsDefault[0];
	if (!rowsPerPageOptions.includes(limit)) {
		rowsPerPageOptions.unshift(limit);
	}
	const page = parseInt(query.page);
	let totalCS = 0;
	const dataQuery = {
		customerRegionCode,
		offset: (page - 1) * limit,
		limit: limit,
	};

	const waitTimeDataRes = await getCountAverageProcessingTopic({
		ctx: context,
		params: dataQuery,
	});
	if (waitTimeDataRes.data?.status == APIStatus.OK) {
		waitTimeData = waitTimeDataRes.data?.data || [];
	}

	const completedDataRes = await getCountAverageCompletedTopic({
		ctx: context,
		params: {
			...dataQuery,
			getTotal: true,
		},
	});
	if (completedDataRes.data?.status == APIStatus.OK) {
		completedTimeData = completedDataRes.data?.data || [];
		totalCS = completedDataRes.data?.total;
		const listCS = completedTimeData.map((item) => item.customerSupportID);
		const getListCSRes = await getListEmployee({
			ctx: context,
			params: {
				accountIDs: listCS.join(","),
			},
		});
		if (getListCSRes.data?.status == APIStatus.OK) {
			const dataCSRes = getListCSRes.data?.data;
			dataCSRes.map((item) => {
				listCSMap[item.accountId || 0] = item.fullname || "";
			});
		}
	}

	const __lang = loadLocale(context.req.cookies["lang"]);
	const __namespaces = await loadNamespaces(["common", "chat"], __lang);

	return {
		props: {
			__lang,
			__namespaces,
			user,
			waitTimeData,
			completedTimeData,
			customerRegionCode,
			totalCS,
			page,
			limit,
			region: customerRegionCode,
			listCSMap,
			rowsPerPageOptions,
		},
	};
};

export async function getServerSideProps(context) {
	return await doWithLoggedInUser(context, (context, user) => {
		return getData(context, user);
	});
}

export default function SummaryByCSReportPage(props) {
	return renderWithLoggedInUser(props, SummaryByCS);
}
