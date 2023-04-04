import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import { getMonitoringAnalyticsClient } from "client/monitoring-analytics";
import { loadLocale, loadNamespaces } from "pages/_app";
import { getReportClient } from "client/report";
import ReportApp from "pages/_layout";
import Head from "next/head";
import { Box } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { TrackingReport } from "containers/monitoring/report/report";
import { APIStatus } from "lib/common";

export async function getServerSideProps(ctx) {
	return await doWithLoggedInUser(ctx, loadData);
}

export async function loadData(ctx) {
	let props = {},
		data = { props };

	let analyticsClient = getMonitoringAnalyticsClient(ctx, data);
	let reportClient = getReportClient(ctx, data);

	let id = parseInt(ctx.query.id),
		analyticsResult = { status: "ERROR" },
		reportResult = { status: "ERROR" },
		userResult = { status: "ERROR" };
	let analyticsObject = {
		groupAnalytics: [],
	};
	if (id && !isNaN(id) && id > 0) {
		await Promise.all([
			analyticsClient.getStandardAnalytics(id),
			reportClient.getReport(id),
			analyticsClient.getUserAnalytics(id, 0, 10),
		]).then(([aResult, rResult, cResult]) => {
			analyticsResult = aResult;
			reportResult = rResult;
			userResult = cResult;
		});

		if (reportResult.status === APIStatus.OK) {
			analyticsObject.userAnalytics =
				userResult.status === APIStatus.OK
					? {
							data: userResult.data,
							total: userResult.total,
					  }
					: {
							data: [],
							total: 0,
					  };
			analyticsObject.standardAnalytics =
				analyticsResult.status === APIStatus.OK ? analyticsResult.data : [];
			let report = reportResult.data[0];
			let groupAPICalls = [
				{ groupType: "BASIC", metadataKey: "PLATFORM", offset: 0, limit: 10 },
				{ groupType: "BASIC", metadataKey: "OS", offset: 0, limit: 10 },
				{ groupType: "BASIC", metadataKey: "OS_VERSION", offset: 0, limit: 10 },
				{ groupType: "BASIC", metadataKey: "CLIENT", offset: 0, limit: 10 },
				{
					groupType: "BASIC",
					metadataKey: "CLIENT_VERSION",
					offset: 0,
					limit: 10,
				},
				{ groupType: "BASIC", metadataKey: "STATUS", offset: 0, limit: 10 },
				{ groupType: "USER", metadataKey: "LOCATION", offset: 0, limit: 100 },
			];
			if (report.reportTemplate?.classifiedKeys?.length) {
				report.reportTemplate?.classifiedKeys.forEach((key) => {
					groupAPICalls.push({
						groupType: "CLASSIFICATION",
						metadataKey: key,
						offset: 0,
						limit: 10,
					});
				});
			}
			if (report.reportTemplate?.statisticKeys?.length) {
				report.reportTemplate?.statisticKeys.forEach((key) => {
					groupAPICalls.push({
						groupType: "STATISTIC",
						metadataKey: key,
						offset: 0,
						limit: 10,
					});
				});
			}
			if (report.reportTemplate?.customerKeys?.length) {
				report.reportTemplate?.customerKeys.forEach((key) => {
					groupAPICalls.push({
						groupType: "CUSTOMER",
						metadataKey: key,
						offset: 0,
						limit: 10,
					});
				});
			}

			await Promise.all(
				groupAPICalls.map((item) => {
					return analyticsClient.getGroupAnalytics(
						id,
						item.groupType,
						item.metadataKey,
						item.offset,
						item.limit
					);
				})
			).then((results) => {
				results.forEach((result, i) => {
					if (groupAPICalls[i].groupType === "USER") {
						console.log(result);
					}

					if (result.status === APIStatus.OK) {
						analyticsObject.groupAnalytics = analyticsObject.groupAnalytics.concat({
							groupType: groupAPICalls[i].groupType,
							metadataKey: groupAPICalls[i].metadataKey,
							data: result.data,
							total: result.total,
						});
					}
				});
			});

			props.reportAnalytics = analyticsObject;
		}
	}

	props.report = reportResult.status === APIStatus.OK ? reportResult.data[0] : {};

	// console.log(id, props.reportAnalytics, props.report)
	// setup multi lang
	const lang = loadLocale(ctx.req.cookies["lang"]);
	props.__lang = lang;
	props.__namespaces = await loadNamespaces(["common", "monitoring"], lang);

	return data;
}

export default function ReportDetailPage(props) {
	return renderWithLoggedInUser(props, renderReportDetailPage);
}

export function renderReportDetailPage({ report, reportAnalytics, __lang }) {
	const { t } = useTranslation();
	// console.log(report, reportAnalytics)

	let breadcrumb = [
		{
			name: t("common:report"),
		},
		{
			name: t("monitoring:reports"),
			link: "/report/monitoring/report",
		},
		{
			name: t("monitoring:report.detail") + " " + report.reportID,
		},
	];

	return (
		<ReportApp breadcrumb={breadcrumb}>
			<Head>
				<title>{t("monitoring:report.detail")}</title>
			</Head>
			<Box>
				<TrackingReport
					lang={__lang}
					report={report}
					reportAnalytics={reportAnalytics}
					t={t}
				/>
			</Box>
		</ReportApp>
	);
}
