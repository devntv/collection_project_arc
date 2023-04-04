import React, { useEffect } from "react";
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import Layout from "@thuocsi/nextjs-components/layout/layout";
import Loader, { setupLoading } from "@thuocsi/nextjs-components/loader/loader";
import { ToastProvider } from "@thuocsi/nextjs-components/toast/providers/ToastProvider";
import styles from "./global.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useRouter } from "next/router";
import I18nProvider from "next-translate/I18nProvider";
import { useCookies } from "react-cookie";
import i18nConfig from "../i18n";
import useTranslation from "next-translate/useTranslation";
import appWithI18n from "next-translate/appWithI18n";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import { acceptedScreenExactly } from "utilities/screenCheck";

export var theme = createTheme({
	palette: {
		primary: {
			main: "#00b46e",
			dark: "#00a45e",
			contrastText: "#fff",
		},
	},
});
export function loadLocale(lang, host) {
	if (typeof lang == "undefined") {
		if (typeof host === "string") {
			if (host.endsWith(".vn") || host.startsWith("localhost")) {
				lang = i18nConfig.defaultLocale;
			} else {
				lang = "en";
			}
		} else {
			lang = i18nConfig.defaultLocale;
		}
	}
	return lang;
}

export async function loadNamespaces(namespaces, lang) {
	lang = loadLocale(lang);

	let res = {};
	for (let ns of namespaces) {
		res[ns] = await import(`../locales/${lang}/${ns}.json`).then((m) => m.default);
	}
	return res;
}

function App(props) {
	const router = useRouter();
	const [showLoader, setShowLoader] = React.useState(true);
	const [showLoaderText, setShowLoaderText] = React.useState(true);
	const [cookies] = useCookies(["lang"]);
	const { Component, pageProps } = props;

	const { t } = useTranslation();
	pageProps.__lang = pageProps.__lang || cookies?.lang || i18nConfig.defaultLocale;
	let menu = [
		{
			key: "CUSTOMER",
			name: t("common:menu.customer"),
			link: "/report/customer",
		},
		{
			key: "ORDER",
			name: t("common:menu.order"),
			link: "/report/order",
		},
		{
			key: "SELLER",
			name: t("common:menu.seller"),
			link: "/report/seller",
		},
		{
			key: "SKU",
			name: t("common:menu.sku"),
			link: "/report/sku",
		},
		{
			key: "CHAT",
			name: t("common:menu.chat.title"),
			required: "/report/chat",
			subMenu: [
				{
					key: "SUMMARY",
					name: t("common:menu.chat.summary"),
					link: "/report/chat/summary",
					icon: faChartBar,
				},
				{
					key: "SUMMARY_BY_CS",
					name: t("common:menu.chat.summary_by_cs"),
					link: "/report/chat/summary-by-cs",
					icon: faChartBar,
				},
				{
					key: "RATING",
					name: t("common:menu.chat.rating"),
					link: "/report/chat/rating",
					icon: faChartBar,
				},
				{
					key: "COMPLETED_TIME_BY_DATE",
					name: t("common:menu.chat.completed_by_date"),
					link: "/report/chat/completed-time",
					icon: faChartBar,
				},
				{
					key: "WAIT_TO_PROCESS_DATE",
					name: t("common:menu.chat.wait_by_date"),
					link: "/report/chat/wait-time",
					icon: faChartBar,
				},
				{
					key: "CHAT_BY_EMPLOYEE",
					name: t("common:menu.chat.number_by_cs"),
					link: "/report/chat/number-by-cs",
					icon: faChartBar,
				},
				{
					key: "CONVERSATION_CREATE_BY_DATE",
					name: t("common:menu.chat.number_by_date"),
					link: "/report/chat/number-by-date",
					icon: faChartBar,
				},
				{
					key: "CONVERSATION_CREATE_BY_TIME",
					name: t("common:menu.chat.number_by_hour"),
					link: "/report/chat/number-by-hour",
					icon: faChartBar,
				},
			],
		},
		{
			key: "CHAT_SELLER_WITH_ADMIN",
			name: t("common:menu.chat.title_seller_admin"),
			required: "/report/seller-chat",
			subMenu: [
				{
					key: "SUMMARY_SELLER_ADMIN",
					name: t("common:menu.sellerChat.last30DaysStats"),
					link: "/report/seller-chat/summary",
					icon: faChartBar,
				},
				{
					key: "SUMMARY_BY_SA",
					name: t("common:menu.sellerChat.last30DaysStatsByEmployee"),
					link: "/report/seller-chat/summary-by-sa",
					icon: faChartBar,
				},
			],
		},
        {
            key: "DASHBOARD_REALTIME",
            name: t("common:menu.realtime.report_supply"),
            required: "/report/realtime",
            subMenu: [
                {
                    key: "SUMMARY_REALTIME",
                    name: t("common:menu.realtime.overview_report"),
                    link: "/report/realtime",
                    icon: faChartBar
                },
                {
                    key: "REALTIME_SKU",
                    name: t("common:menu.realtime.report_sku"),
                    link: "/report/realtime/sku-pricing",
                    icon: faChartBar
                },
                {
                    key: "REALTIME_GMV",
                    name: t("common:menu.realtime.report_gmv"),
                    link: "/report/realtime/gmv",
                    icon: faChartBar
                },
                {
                    key: "REALTIME_BULK_ORDER",
                    name: t("common:menu.realtime.report_bulk_order"),
                    link: "/report/realtime/bulk-order",
                    icon: faChartBar
                },
            ]
        }
	];

	menu = menu.filter((menuItem) => {
		if (!menuItem.subMenu) {
			return acceptedScreenExactly(pageProps.loggedInUserInfo, menuItem.link);
		} else {
			return acceptedScreenExactly(pageProps.loggedInUserInfo, menuItem.required);
		}
	});

	// do once
	useEffect(() => {
		// setup first loading
		setTimeout(() => {
			setShowLoaderText(false);
			setShowLoader(false);
		}, 500);

		// setup loading when navigate
		return setupLoading(router, setShowLoader);
	}, []);

	// after logged in
	if (pageProps.loggedIn) {
		return (
			<I18nProvider lang={props.pageProps.__lang} namespaces={pageProps.__namespaces}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<ToastProvider>
						<Layout
							className={styles.blank}
							loggedInUserInfo={pageProps.loggedInUserInfo}
							menu={menu}
							title="Report"
						>
							<Component {...pageProps} />
						</Layout>
					</ToastProvider>
					<Loader show={showLoader} showText={showLoaderText} />
				</ThemeProvider>
			</I18nProvider>
		);
	}

	// if not logged in
	return (
		<I18nProvider lang={props.pageProps.__lang} namespaces={pageProps.__namespaces}>
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</I18nProvider>
	);

	// // after logged in
	// if (pageProps.loggedIn) {
	//     return <ThemeProvider theme={theme}>
	//         <CssBaseline/>
	//         <ToastProvider>
	//             <Layout className={styles.blank} loggedInUserInfo={pageProps.loggedInUserInfo}
	//                     menu={menu} title="Report">
	//                 <Component {...pageProps} />
	//             </Layout>
	//         </ToastProvider>
	//         <Loader show={showLoader} showText={showLoaderText}></Loader>
	//     </ThemeProvider>
	//
	// }
	//
	// // if not logged in
	// return <ThemeProvider theme={theme}>
	//     <Component {...pageProps} />
	// </ThemeProvider>
}

export default appWithI18n(App, {
	...i18nConfig,
	skipInitialProps: true,
});
