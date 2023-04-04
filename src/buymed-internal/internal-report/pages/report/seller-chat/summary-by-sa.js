import { Box, Grid, Paper } from "@material-ui/core";
import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { APIStatus } from "lib/common";
import { doWithLoggedInUser } from "lib/login";
import { renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import { getListEmployee } from "services/ChatService";
import {
	getCountAverageCompletedTopicSellerWithSA,
	getCountAverageProcessingTopicSellerWithSA,
} from "services/ReportService";
import { useRouter } from "next/router";
import GroupTable from "components/ChatReport/Table/GroupTable";
import { loadLocale, loadNamespaces } from "pages/_app";
import ReportApp from "pages/_layout";
import Head from "next/head";
import { makeStyles } from "@material-ui/styles";
import LastUpdateSellerWithSA from "components/ChatReport/LastUpdateSellerWithSA";
import useTranslation from "next-translate/useTranslation";

const rowsPerPageOptionsDefault = [20, 50, 100];
const regions = (t) => [
	{
		name: t("common:all"),
		value: "",
	},
	{
		name: t("chat:northern"),
		value: "MIENBAC",
	},
	{
		name: t("chat:southern"),
		value: "MIENNAM",
	},
];

const schema1 = {
	numColumn: 7,
	columns: [
		{
			data: "sellerAdminName",
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

const title = "common:menu.sellerChat.last30DaysStatsByEmployee";
const breadCrumbs = (t) => [
	{
		link: "/",
		name: t("common:menu.report"),
	},
	{
		link: "/report/seller-chat/summary-by-sa",
		name: t("common:menu.chat.title_seller_admin"),
	},
	{
		link: "/report/seller-chat/summary-by-sa",
		name: t(title),
	},
];

function SummaryByEmployee(props) {
	const { t } = useTranslation();
	const lang = props.__lang;
	const classes = useStyles();
	const router = useRouter();

	const handleChangeRegion = (e) => {
		const query = router.query || {};
		router.push({
			pathname: "",
			query: {
				...query,
				region: e.target.value || "",
			},
		});
	};

	return (
		<ReportApp breadcrumb={breadCrumbs(t)} user={props.user}>
			<Head>
				<title>{t(title)}</title>
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
							{t("chat:region")}
						</Box>
						<Select
							id="region"
							variant="outlined"
							fullWidth
							displayEmpty
							defaultValue={regions(t)[0].value}
							size={"small"}
							value={props.sellerRegionCode || ""}
							onChange={handleChangeRegion}
							classes={{
								select: classes.select,
							}}
						>
							{regions(t).map((item) => (
								<MenuItem value={item.value} key={item.value}>
									{item.name}{" "}
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
						<LastUpdateSellerWithSA />
					</Grid>
				</Grid>
				<Paper>
					<GroupTable
						schema={schema1}
						page={props.page || 1}
						rowsPerPage={props.limit}
						totalCS={props.totalSA}
						rowsPerPageOptions={props.rowsPerPageOptions}
						data={props.dataTimeFullArray || []}
						lang={lang}
					/>
				</Paper>
			</Box>
		</ReportApp>
	);
}

const getData = async (context) => {
	const rowsPerPageOptions = [...rowsPerPageOptionsDefault];
	const listSAMap = {};
	const dataTimeFullArray = [];
	let waitTimeData = [];
	let completedTimeData = [];

	const query = context.query || {};
	const sellerRegionCode = query.region || "";
	const limit = parseInt(query.limit) || rowsPerPageOptionsDefault[0];
	if (!rowsPerPageOptions.includes(limit)) {
		rowsPerPageOptions.unshift(limit);
	}
	const page = parseInt(query.page) || 0;
	let totalSA = 0;
	const dataQuery = {
		sellerRegionCode,
		offset: (page - 1) * limit,
		limit: limit,
	};

	const waitTimeDataRes = await getCountAverageProcessingTopicSellerWithSA({
		ctx: context,
		params: dataQuery,
	});
	if (waitTimeDataRes.data?.status == APIStatus.OK) {
		waitTimeData = waitTimeDataRes.data?.data || [];
	}

	const completedDataRes = await getCountAverageCompletedTopicSellerWithSA({
		ctx: context,
		params: {
			...dataQuery,
			getTotal: true,
		},
	});
	if (completedDataRes.data?.status == APIStatus.OK) {
		completedTimeData = completedDataRes.data?.data || [];
		totalSA = completedDataRes.data?.total;
		const listSA = completedTimeData.map((item) => item.sellerAdminID);
		const getListSARes = await getListEmployee({
			ctx: context,
			params: {
				accountIDs: listSA.join(","),
			},
		});
		if (getListSARes.data?.status == APIStatus.OK) {
			const dataSARes = getListSARes.data?.data;
			dataSARes.map((item) => {
				listSAMap[item.accountId || 0] = item.fullname || "";
			});
			const dataTimeFull = {};

			completedTimeData?.map((item) => {
				const dataTimeItem = {};
				dataTimeItem.sellerAdminID = item.sellerAdminID;
				dataTimeItem.sellerAdminName = listSAMap[item.sellerAdminID];
				dataTimeItem.averageComplete = Math.floor(item.averageByMonth);
				dataTimeItem.completedToday = item.numberByDate;
				dataTimeItem.completedWeek = item.numberByWeek;
				dataTimeItem.completedMonth = item.numberByMonth;

				dataTimeFull[item.sellerAdminID] = dataTimeItem;
			});

			waitTimeData?.map((item) => {
				dataTimeFull[item.sellerAdminID].inProcessing = item.numberByMonth;
				dataTimeFull[item.sellerAdminID].averageWaitTime = Math.floor(item.averageByMonth);
			});

			for (let i in dataTimeFull) {
				dataTimeFullArray.push(dataTimeFull[i]);
			}
			dataTimeFullArray.sort((a, b) => a.sellerAdminID - b.sellerAdminID);
		}
	}

	const __lang = loadLocale(context.req.cookies["lang"]);
	const __namespaces = await loadNamespaces(["common", "chat"], __lang);

	return {
		props: {
			__lang,
			__namespaces,
			dataTimeFullArray,
			sellerRegionCode,
			totalSA,
			page,
			limit,
			listSAMap,
			rowsPerPageOptions,
		},
	};
};

export async function getServerSideProps(context) {
	return await doWithLoggedInUser(context, (context) => {
		return getData(context);
	});
}

export default function SummaryBySAReportPage(props) {
	return renderWithLoggedInUser(props, SummaryByEmployee);
}
