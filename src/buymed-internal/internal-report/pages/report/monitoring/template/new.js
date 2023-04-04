import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import ReportApp from "pages/_layout";
import Head from "next/head";
import { TemplateForm } from "containers/monitoring/template";
import useTranslation from "next-translate/useTranslation";
import { loadLocale, loadNamespaces } from "pages/_app";
import { getReportClient } from "client/report";
import { useRouter } from "next/router";
import { APIStatus } from "lib/common";

export async function getServerSideProps(ctx) {
	return await doWithLoggedInUser(ctx, loadData);
}

export async function loadData(ctx) {
	let props = {},
		data = { props };

	let monitoringClient = getReportClient(ctx, data);
	let evResult = await monitoringClient.getEventDefinitions();

	if (evResult.status === APIStatus.OK) {
		props.eventDefinitions = evResult.data;
	}

	// setup multi lang
	const lang = loadLocale(ctx.req.cookies["lang"]);
	props.__lang = lang;
	props.__namespaces = await loadNamespaces(["common", "monitoring"], lang);

	return data;
}

export default function NewTemplatePage(props) {
	return renderWithLoggedInUser(props, renderNewTemplatePagePage);
}

export function renderNewTemplatePagePage(props) {
	const { t } = useTranslation();
	const router = useRouter();

	let callback = {
		submitSuccessfully: function () {
			router.push({ pathname: "/report/monitoring/template" });
		},
	};

	let breadcrumb = [
		{
			name: t("common:report"),
		},
		{
			name: t("monitoring:templates"),
			link: "/report/monitoring/template",
		},
		{
			name: t("monitoring:template.new_template"),
		},
	];

	return (
		<ReportApp breadcrumb={breadcrumb}>
			<Head>
				<title>{t("monitoring:template.new_template")}</title>
			</Head>
			<TemplateForm
				templateData={null}
				eventDefinitions={props.eventDefinitions}
				t={t}
				callback={callback}
			/>
		</ReportApp>
	);
}
