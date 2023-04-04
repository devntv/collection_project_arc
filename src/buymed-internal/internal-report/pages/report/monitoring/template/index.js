import { faPencilAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	Box,
	Button,
	IconButton,
	Tab,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Tabs,
	Tooltip
} from "@material-ui/core";
import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import { MyCard, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import { getAccountClient } from "client/account";
import { getReportClient } from "client/report";
import { displayDate } from "components/utils";
import { TemplateContent } from "containers/monitoring/template";
import { APIStatus } from "lib/common";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { loadLocale, loadNamespaces } from "pages/_app";
import ReportApp from "pages/_layout";
import { useState } from "react";
import styles from "./template.module.css";

export async function getServerSideProps(ctx) {
	return await doWithLoggedInUser(ctx, (ctx) => {
		return loadTemplateReportData(ctx);
	});
}

export async function loadTemplateReportData(ctx) {
	// setup data
	let props = { selectedTab: ctx.query.tab || "self" },
		data = { props };

	// load parameters
	let query =
		props.selectedTab === "self" && ctx.loggedInUserInfo?.account?.accountId
			? { createdBy: ctx.loggedInUserInfo?.account?.accountId }
			: {};
	let page = query.page || 0;
	let limit = query.limit || 20;
	let offset = page * limit;

	// get data
	let reportClient = getReportClient(ctx, data);
	let templateResult = reportClient.getTemplateList(query, offset, limit);
	let eventResult = reportClient.getEventDefinitions();
	let arr = await Promise.all([templateResult, eventResult]);
	templateResult = arr[0];
	eventResult = arr[1];

	// fill event data
	let evMap = {};
	if (eventResult && eventResult.status === APIStatus.OK) {
		eventResult.data.forEach((ev) => {
			evMap[ev.code] = ev;
		});
	}

	props.templates =
		templateResult && templateResult.status === APIStatus.OK ? templateResult.data : [];
	props.total = (templateResult && templateResult.total) || 0;

	let accountIDs = [],
		templateByAccountMap = {};
	props.templates.forEach((template) => {
		if (accountIDs.indexOf(template.createdBy) < 0) {
			accountIDs.push(template.createdBy);
			templateByAccountMap[template.createdBy] =
				templateByAccountMap[template.createdBy] || [];
			templateByAccountMap[template.createdBy].push(template);
		}

		if (template.eventCode) {
			template.eventName = evMap[template.eventCode].description;
			template.eventData = evMap[template.eventCode];
		}
	});

	if (accountIDs.length > 0) {
		let accountClient = getAccountClient(ctx, data);
		let accountResult = await accountClient.getAccounts(accountIDs);
		if (accountResult.status === APIStatus.OK) {
			let accounts = accountResult.data;
			accounts.forEach((account) => {
				templateByAccountMap[account.accountId]?.forEach((template) => {
					template.createdByName = account.fullname;
					template.createdByUsername = account.username;
				});
			});
		}
	}

	// setup multi lang
	const lang = loadLocale(ctx.req.cookies["lang"]);
	props.__lang = lang;
	props.__namespaces = await loadNamespaces(["common", "monitoring"], lang);

	return data;
}

export default function TemplatePage(props) {
	return renderWithLoggedInUser(props, render);
}

function render({ loggedInUserInfo, templates, total, selectedTab }) {
	const router = useRouter();
	const [offset, setOffset] = useState(router.query.offset ? parseInt(router.query.offset) : 0);
	const [limit, setLimit] = useState(router.query.limit ? parseInt(router.query.limit) : 20);
	const [page, setPage] = useState(parseInt(offset / limit) ?? 0);

	const { t } = useTranslation();
	const redirectToTemplateDetail = (id) => {
		router.push({
			pathname: "/report/monitoring/template/edit",
			query: {
				id: id,
			},
		});
	};

	const onTabChange = (_, option) => {
		setOffset(0);

		router.push({
			pathname: "/report/monitoring/template",
			query: {
				tab: option,
			},
		});
	};

	let breadcrumb = [
		{
			name: t("common:report"),
		},
		{
			name: t("monitoring:templates"),
		},
	];

	return (
		<ReportApp breadcrumb={breadcrumb}>
			<Head>
				<title>Mẫu báo cáo</title>
			</Head>
			<MyCard>
				<MyCardHeader title={t("monitoring:template_list")}>
					<Link href="/report/monitoring/template/new">
						<Button variant="contained" color="primary">
							<FontAwesomeIcon icon={faPlus} style={{ marginRight: 8 }} /> Thêm mẫu
						</Button>
					</Link>
				</MyCardHeader>
			</MyCard>
			<Tabs
				onChange={onTabChange}
				value={selectedTab}
				textColor="primary"
				indicatorColor="primary"
			>
				<Tab label={t("monitoring:created_by_myself")} key="self" value="self" />
				<Tab label={t("monitoring:all")} key="all" value="all" />
			</Tabs>
			<MyCard>
				<Table size="small" className={styles.tableWrapper}>
					<colgroup>
						<col />
						<col />
						<col />
						<col />
						<col style={{ width: 180 }} />
					</colgroup>
					<TableHead>
						<TableRow>
							<TableCell>{t("monitoring:template.name")}</TableCell>
							<TableCell align="left">
								{t("monitoring:template.created_by")}
							</TableCell>
							<TableCell align="left">{t("monitoring:template.content")}</TableCell>
							<TableCell align="left">
								{t("monitoring:template.last_reported_time")}
							</TableCell>
							<TableCell align="center">{t("common:action")}</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{templates?.length > 0 ? (
							templates.map((template) => (
								<TableRow key={template.reportTemplateID} style={{ height: 51 }}>
									<TableCell component="th" scope="row">
										<Box>
											{template.reportTemplateID} - {template.name}
										</Box>
									</TableCell>

									<TableCell>
										<Box>
											<Tooltip
												title={
													template.createdBy +
													" - " +
													template.createdByName
												}
											>
												<span>{template.createdByUsername}</span>
											</Tooltip>
										</Box>
										<Box className={styles.smallDescription}>
											{displayDate(template.createdTime, "-")}
										</Box>
									</TableCell>
									<TableCell align="left">
										<TemplateContent templateData={template} t={t} />
									</TableCell>
									<TableCell align="left">
										{template.lastReportID ? (
											<Box>
												<Link
													href={`/report/monitoring/report/detail?id=${template.lastReportID}`}
												>
													<a>{template.lastReportID}</a>
												</Link>
												<Box>
													{displayDate(template.lastProcessedTime, "-")}
												</Box>
											</Box>
										) : (
											""
										)}
									</TableCell>
									<TableCell align="center">
										<Tooltip title={t("common:actions.edit")}>
											<IconButton
												onClick={() =>
													redirectToTemplateDetail(
														template.reportTemplateID
													)
												}
											>
												<FontAwesomeIcon
													icon={faPencilAlt}
													style={{ fontSize: 14 }}
												/>
											</IconButton>
										</Tooltip>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan="100%">
									{t("monitoring:template.not_found")}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
					{templates?.length > 0 && (
						<MyTablePagination
							labelUnit={t("monitoring:template.unit")}
							count={total}
							rowsPerPage={limit}
							page={page}
							onChangePage={(_, page, rowsPerPage) => {
								setOffset(page * limit);
								setLimit(rowsPerPage);
								router.push({
									pathname: router.pathname,
									query: {
										...router.query,
										offset: page * limit,
										limit: rowsPerPage,
									},
								});
							}}
						/>
					)}
				</Table>
			</MyCard>
		</ReportApp>
	);
}
