import { doWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import Head from "next/head";
import ReportApp from "pages/_layout";
import { getAnalyticsClient } from "client/integration-analytics";
import {
	Paper,
	Table,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableBody,
	Typography,
} from "@material-ui/core";
import styles from "./seller.module.css";
import { displayDate, getTotay, formatNumber, getThisMonth } from "components/utils";
import { getSellerClient } from "client/seller";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import { useRouter } from "next/router";
import { loadLocale, loadNamespaces } from "../../_app";
import useTranslation from "next-translate/useTranslation";
import { APIStatus } from "lib/common";

export async function getServerSideProps(ctx) {
	return await doWithLoggedInUser(ctx, (ctx) => {
		return loadSellerData(ctx);
	});
}

export async function loadSellerData(ctx) {
	let query = ctx.query;
	let limit = query.limit || 50;
	let offset = (query.page || 0) * limit;
	let props = { page: query.page || 0, limit: limit, offset: offset },
		data = { props };
	let client = getAnalyticsClient(ctx, data);

	let sellerResult = await client.getSellerStats({ timeSpan: "MONTH" }, offset, limit);
	if (sellerResult && sellerResult.status === APIStatus.OK) {
		let sellerMap = {};
		sellerResult.data.forEach((stats) => {
			sellerMap[stats.sellerCode] = stats;
		});
		let sellerCodes = sellerResult.data.map((stats) => stats.sellerCode);
		let dayResult = await client.getStatsOfMultiSellers("DAY", sellerCodes);
		if (dayResult && dayResult.status === APIStatus.OK) {
			dayResult.data.forEach((stats) => {
				let obj = sellerMap[stats.sellerCode];
				if (obj) {
					obj.todayOrderCount = stats.orderCount || 0;
					obj.todayCustomerCount = stats.customerCount || 0;
					obj.todayTotalValue = stats.totalValue || 0;
				}
			});
		}

		let sellerInfo = await getSellerClient(ctx, data).getSellersByCodes(sellerCodes);
		if (sellerInfo && sellerInfo.status === APIStatus.OK) {
			sellerInfo.data.forEach((seller) => {
				sellerMap[seller.code].sellerName = seller.name;
				if (seller.sellerClass === "EXTERNAL") {
					sellerMap[seller.code].sellerID = seller.sellerID;
				} else {
					sellerMap[seller.code].sellerID = seller.code;
				}
			});
		}

		props.stats = sellerResult.data;
		props.count = sellerResult.total;
	}

	// get last process
	let processResult = await client.getLastProcess("SELLER");
	if (processResult && processResult.status === APIStatus.OK) {
		props.lastProcess = processResult.data[0];
	}

	const lang = loadLocale(ctx.req.cookies["lang"], ctx.req.headers.host);
	props.__lang = lang;
	props.__namespaces = await loadNamespaces(["common", "analytics"], lang);

	return data;
}

export default function CustomerRealtimePage(props) {
	const router = useRouter();
	const { t } = useTranslation();
	const breadcrumb = [
		{
			name: t`common:menu.report`,
		},
		{
			name: t`common:menu.seller`,
			link: "/report/seller",
		},
	];

	const handlePageChange = async (event, page, rowsPerPage) => {
		router.push({
			pathname: "/report/seller",
			query: {
				page: page,
				limit: rowsPerPage,
			},
		});
	};

	let data = props.stats || [];
	let count = props.count || 0;
	let offset = props.offset;
	return (
		<ReportApp breadcrumb={breadcrumb}>
			<Head>
				<title>{t`common:menu.seller`}</title>
			</Head>
			<Typography style={{ marginBottom: 10, color: "#444444", fontSize: 14 }}>
				{t("analytics:scheduleDescription")}
				{props.lastProcess ? (
					<b>{displayDate(new Date(props.lastProcess.createdTime))}</b>
				) : (
					""
				)}
			</Typography>
			<Typography style={{ marginBottom: 10, color: "#444444", fontSize: 14 }}>
				{t("analytics:revenueDescription")}
			</Typography>
			<TableContainer component={Paper}>
				<Table size="small" aria-label="a dense table">
					<TableHead className={styles.tableHead}>
						<TableRow>
							<TableCell align="center" colSpan={3} className={styles.rightBorder}>
								{t("analytics:seller.seller")}
							</TableCell>
							<TableCell align="center" colSpan={3} className={styles.rightBorder}>
								{t`analytics:today`}({getTotay()})
							</TableCell>
							<TableCell align="center" colSpan={3}>
								{t`analytics:thisMonth`} ({getThisMonth()})
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell align="left">#</TableCell>
							<TableCell align="left">ID</TableCell>
							<TableCell
								align="left"
								className={styles.rightBorder}
							>{t`analytics:seller.name`}</TableCell>
							<TableCell align="right">{t`analytics:seller.orderCount`}</TableCell>
							<TableCell align="right">{t`analytics:seller.customer`} </TableCell>
							<TableCell
								align="right"
								className={styles.rightBorder}
							>{t`analytics:seller.value`}</TableCell>
							<TableCell align="right">{t`analytics:seller.orderCount`}</TableCell>
							<TableCell align="right">{t`analytics:seller.customer`} </TableCell>
							<TableCell
								align="right"
								className={styles.rightBorder}
							>{t`analytics:seller.value`}</TableCell>
						</TableRow>
					</TableHead>
					{data.length > 0 ? (
						<>
							<TableBody>
								{data.map((row, i) => (
									<TableRow key={row.sellerID}>
										<TableCell align="left">{offset + i + 1}</TableCell>
										<TableCell align="left">{row.sellerID}</TableCell>
										<TableCell align="left" className={styles.rightBorder}>
											{row.sellerName}
										</TableCell>
										<TableCell align="right">
											{formatNumber(row.todayOrderCount || 0)}
										</TableCell>
										<TableCell align="right">
											{formatNumber(row.todayCustomerCount || 0)}{" "}
										</TableCell>
										<TableCell align="right" className={styles.rightBorder}>
											{formatNumber(row.todayTotalValue || 0)}
										</TableCell>
										<TableCell align="right">
											{formatNumber(row.orderCount || 0)}
										</TableCell>
										<TableCell align="right">
											{formatNumber(row.customerCount || 0)}
										</TableCell>
										<TableCell align="right">
											{formatNumber(row.totalValue || 0)}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							<MyTablePagination
								labelUnit={t("seller.normalSeller")}
								count={count}
								rowsPerPage={props.limit}
								page={props.page}
								onChangePage={handlePageChange}
							/>
						</>
					) : (
						<TableBody>
							<TableRow>
								<TableCell colSpan="100%" align="left">
									{t("common:not_found")}
								</TableCell>
							</TableRow>
						</TableBody>
					)}
				</Table>
			</TableContainer>
		</ReportApp>
	);
}
