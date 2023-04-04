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
	Tooltip,
	Typography,
	Box,
} from "@material-ui/core";
import styles from "./sku.module.css";
import { getProductClient } from "client/product";
import { displayDate, getTotay, formatNumber, getThisMonth } from "components/utils";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import { useRouter } from "next/router";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { loadLocale, loadNamespaces } from "../../_app";
import { APIStatus } from "lib/common";

export async function getServerSideProps(ctx) {
	return await doWithLoggedInUser(ctx, (ctx) => {
		return loadCustomerRealtimeData(ctx);
	});
}

export async function loadCustomerRealtimeData(ctx) {
	let query = ctx.query;
	let limit = parseInt(query.limit || 50);
	let offset = parseInt(query.page || 0) * limit;
	let props = { page: parseInt(query.page || 0), limit: limit, offset: offset },
		data = { props };
	let client = getAnalyticsClient(ctx, data);

	let skuResult = await client.getSkuStats({ timeSpan: "MONTH" }, offset, limit);
	if (skuResult && skuResult.status === APIStatus.OK) {
		let skuMap = {};
		skuResult.data.forEach((stats) => {
			skuMap[stats.sku] = stats;
		});
		let skus = skuResult.data.map((stats) => stats.sku);

		// get today stats
		let dayResult = await client.getStatsOfMultiSkus("DAY", skus);
		if (dayResult && dayResult.status === APIStatus.OK) {
			dayResult.data.forEach((stats) => {
				let obj = skuMap[stats.sku];
				if (obj) {
					obj.todayOrderCount = stats.orderCount || 0;
					obj.todayOrderedQuantity = stats.orderedQuantity || 0;
					obj.todayTotalValue = stats.totalValue || 0;
				}
			});
		}

		// get name of products
		let productList = skuResult.data.map((stats) => stats.productCode);
		let productResult = await getProductClient(ctx, data).getProductByCodes(productList);
		let productMap = {};
		if (productResult && productResult.status === APIStatus.OK) {
			productResult.data.forEach((product) => {
				productMap[product.code] = product;
			});
			skuResult.data.forEach((stats) => {
				stats.productName =
					productMap[stats.productCode] && productMap[stats.productCode].name;
			});
		}
		props.stats = skuResult.data;
		props.count = skuResult.total;
	}

	// get last process
	let processResult = await client.getLastProcess("SKU");
	if (processResult && processResult.status === APIStatus.OK) {
		props.lastProcess = processResult.data[0];
	}

	const lang = loadLocale(ctx.req.cookies["lang"], ctx.req.headers.host);
	props.__lang = lang;
	props.__namespaces = await loadNamespaces(["common", "analytics", "sku"], lang);

	return data;
}

export default function SkusStatsPage(props) {
	const { t } = useTranslation();
	const router = useRouter();
	const breadcrumb = [
		{
			name: t`common:menu.report`,
		},
		{
			name: t`common:menu.sku`,
		},
	];

	const handlePageChange = async (event, page, rowsPerPage) => {
		router.push({
			pathname: "/report/sku",
			query: {
				page: page,
				limit: rowsPerPage,
			},
		});
	};

	let data = props.stats || [];
	return (
		<ReportApp breadcrumb={breadcrumb}>
			<Head>
				<title>{t`common:menu.report` + " " + t`common:menu.sku`}</title>
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
							<TableCell align="center" colSpan={4} className={styles.rightBorder}>
								{t`analytics:sku.product`}hhm
							</TableCell>
							<TableCell align="center" colSpan={3} className={styles.rightBorder}>
								{t`analytics:today`}({getTotay()})adad
							</TableCell>
							<TableCell align="center" colSpan={3}>
								{t`analytics:thisMonth`} ({getThisMonth()})
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell align="left">#</TableCell>
							<TableCell align="left">Seller</TableCell>
							<TableCell align="left">{t`analytics:sku.productID`}</TableCell>
							<TableCell
								align="left"
								className={styles.rightBorder}
								width="30%"
							>{t`analytics:sku.name`}</TableCell>
							<TableCell align="right">{t`analytics:sku.orderCount`}</TableCell>
							<TableCell align="right">{t`analytics:sku.quantity`}</TableCell>
							<TableCell
								align="right"
								className={styles.rightBorder}
							>{t`analytics:sku.value`}</TableCell>
							<TableCell align="right">{t`analytics:sku.orderCount`}</TableCell>
							<TableCell align="right">{t`analytics:sku.quantity`}</TableCell>
							<TableCell
								align="right"
								className={styles.rightBorder}
							>{t`analytics:sku.value`}</TableCell>
						</TableRow>
					</TableHead>
					{data.length > 0 ? (
						<>
							<TableBody>
								{data.map((row, i) => (
									<TableRow key={row.sku}>
										<TableCell align="left">{props.offset + i + 1}</TableCell>
										<TableCell align="left">{row.sellerCode}</TableCell>
										<TableCell align="left">{row.productID}</TableCell>
										<TableCell align="left" className={styles.rightBorder}>
											<Link href={"/report/sku/detail?sku=" + row.sku}>
												<Tooltip title={t`sku:view_sku_analytics`}>
													<Box className={styles.skuLink}>
														{row.productName}
													</Box>
												</Tooltip>
											</Link>
										</TableCell>
										<TableCell align="right">
											<a
												href={`/crm/order/product-detail?productCode=${row.productCode}&sku=${row.sku}`}
												target={"_blank"}
											>
												{formatNumber(row.todayOrderCount || 0)}
											</a>
										</TableCell>
										<TableCell align="right">
											{formatNumber(row.todayOrderedQuantity || 0)}{" "}
										</TableCell>
										<TableCell align="right" className={styles.rightBorder}>
											{formatNumber(row.todayTotalValue || 0)}
										</TableCell>
										<TableCell align="right">
											{formatNumber(row.orderCount || 0)}
										</TableCell>
										<TableCell align="right">
											{formatNumber(row.orderedQuantity || 0)}
										</TableCell>
										<TableCell align="right">
											{formatNumber(row.totalValue || 0)}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							<MyTablePagination
								labelUnit={t`analytics:sku.product`}
								count={props.count}
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
