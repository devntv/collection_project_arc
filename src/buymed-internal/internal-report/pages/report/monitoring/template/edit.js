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

	// get event definition list
	let evResult = monitoringClient.getEventDefinitions();

	// get template data
	let id = parseInt(ctx.query.id);
	if (id && !isNaN(id) && id > 0) {
		let templateResult = await monitoringClient.getTemplate(id);
		if (templateResult.status === APIStatus.OK) {
			props.templateData = templateResult.data[0];
		}
	}

	// get response of event definition list
	evResult = await evResult;
	if (evResult.status === APIStatus.OK) {
		props.eventDefinitions = evResult.data;
	}

	// setup multi lang
	const lang = loadLocale(ctx.req.cookies["lang"]);
	props.__lang = lang;
	props.__namespaces = await loadNamespaces(["common", "monitoring"], lang);

	return data;
}

export default function EditTemplatePage(props) {
	return renderWithLoggedInUser(props, renderEditTemplatePagePage);
}

export function renderEditTemplatePagePage(props) {
	const { t } = useTranslation();
	let router = useRouter();

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
			name: t("monitoring:template.edit_template"),
		},
	];

	return (
		<ReportApp breadcrumb={breadcrumb}>
			<Head>
				<title>{t("monitoring:template.edit_template")}</title>
			</Head>
			<TemplateForm
				templateData={props.templateData}
				eventDefinitions={props.eventDefinitions}
				t={t}
				callback={callback}
			/>
		</ReportApp>
	);
}
