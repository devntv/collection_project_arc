import {
    faCog,
    faComment,
    faFlag,
    faGift,
    faHandHoldingUsd,
    faHistory,
    faLiraSign,
    faList,
    faNewspaper,
    faTag,
    faWrench,
    faSearch
} from "@fortawesome/free-solid-svg-icons";
import { ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createTheme } from "@material-ui/core/styles";
import Layout from "@thuocsi/nextjs-components/layout/layout";
import Loader, { setupLoading } from "@thuocsi/nextjs-components/loader/loader";
import { ToastProvider } from "@thuocsi/nextjs-components/toast/providers/ToastProvider";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styles from "./global.css";

const menu = [
    {
        key: "VOUCHER",
        name: "Voucher",
        subMenu: [
            {
                key: "DISCOUNT",
                name: "Danh sách chương trình",
                link: "/marketing/promotion",
                icon: faGift,
            },
            {
                key: "VOUCHER",
                name: "Danh sách mã khuyến mãi",
                link: "/marketing/voucher",
                icon: faTag,
            },
            {
                key: "HISTORY-VOUCHER",
                name: "Lịch sử dùng mã khuyến mãi",
                link: "/marketing/history-voucher",
                icon: faTag,
            },
            {
                key: "LOYALTY",
                name: "Đổi điểm",
                link: "/marketing/loyalty",
                icon: faHandHoldingUsd,
            },
            {
                key: "HISTORY-LOYALTY",
                name: "Lịch sử đổi điểm",
                link: "/marketing/history-loyalty",
                icon: faHandHoldingUsd,
            },
            {
                key: "GIFT-SETTING",
                name: "Referral & Newbie",
                link: "/marketing/gift",
                icon: faCog,
            },
        ],
    },
    {
        key: "DEAL",
        name: "Deal",
        required: "/marketing/deal",
        subMenu: [
            {
                key: "DEAL",
                name: "Deal",
                link: "/marketing/deal",
                icon: faTag,
            },
            {
                key: "HISTORY-DEAL",
                name: "Lịch sử dùng deal",
                link: "/marketing/history-deal",
                icon: faSearch,
            },
            {
                key: "IMPORT_HISTORY",
                name: "Lịch sử import deal",
                link: "/marketing/import-history-deal",
                icon: faHistory,
            }
        ],
    },
    {
        key: "SKU_POINT",
        name: "Cài đặt điểm",
        required: "/marketing/sku-point",
        subMenu: [
            {
                key: "UPDATE_SKU_POINT",
                name: "Cài đặt điểm",
                link: "/marketing/sku-point",
                icon: faWrench,
            },
            {
                key: "IMPORT_SKU_POINT_HISTORY",
                name: "Lịch sử import hàng loạt",
                link: "/marketing/sku-point/list-import",
                icon: faHistory,
            },
        ],
    },
    {
        key: "SALE-CAMPAIGN",
        name: "Chương trình khuyến mãi",
        // required: "/marketing/sale-campaign",
        subMenu: [
            {
                key: "LIST-SALE-CAMPAIGN",
                name: "Danh sách chương trình khuyến mãi",
                link: "/marketing/sale-campaign",
                icon: faList,
            },
            {
                key: "IMPORT-PRODUCT-RESULT",
                name: "Lịch sử import sản phẩm hàng loạt",
                link: "/marketing/import-result-sale-campaign",
                icon: faHistory,
            },
            {
                key: "HISTORY-LIST-SALE-CAMPAIGN",
                name: "Lịch sử tham gia chương trình khuyến mãi",
                link: "/marketing/history-sale-campaign",
                icon: faHistory,
            },
            {
                key: "CHECK-PRODUCT-FULFILLMENT",
                name: "Lịch sử kiểm tra tỉ lệ fulfill",
                link: "/marketing/check-product-fulfillment ",
                icon: faHistory,
            },
            {
                key: "SELLER-TICKET",
                name: "Yêu cầu chờ duyệt",
                link: "/marketing/seller-ticket",
                icon: faLiraSign,
            },
        ],
    },
    {
        key: "SKU-CONTRACT",
        name: "Cài đặt giá theo hợp đồng",
        link: "/marketing/sku-contract",
    },
    {
        key: "PERMISSION",
        name: "Chương trình thưởng",
        required: "/marketing/gamification",
        subMenu: [
            {
                key: "GAMIFICATION",
                name: "Danh sách chương trình thưởng",
                link: "/marketing/gamification",
                icon: faGift,
            },
            {
                key: "SYNC-GAMIFICATION",
                name: "Lịch sử cập nhật kết quả trả thưởng",
                link: "/marketing/sync-gamification",
                icon: faHistory,
            },
        ],
    },
    {
        key: "SETTING",
        name: "Cài đặt hiển thị",
        required: "/marketing/setting",
        subMenu: [
            {
                key: "POPUP_LIST",
                name: "Popup",
                link: "/marketing/popup",
                icon: faComment,
            },
            {
                key: "BANNER_LIST",
                name: "Banner",
                link: "/marketing/banner",
                icon: faFlag,
            },
            {
                key: "DISCOVERY_LIST",
                name: "Post",
                link: "/marketing/post",
                icon: faNewspaper,
            },
        ],
    },
    {
        key: "TOOL_WEBSITE",
        name: "Tool website",
        subMenu: [
            {
                key: "HASHTAG_SEARCH",
                name: "Hashtag tìm kiếm nhiều nhất",
                link: "/marketing/hashtag-search",
            },
            {
                key: "NEW_PRODUCTS",
                name: "Sản phẩm mới",
                link: "/marketing/new-products",
            },
            {
                key: "COUNTDOWN_BAR",
                name: "Countdown bar",
                link: "/marketing/countdown-bar",
            },
            {
                key: "MENU_BAR",
                name: "Menu bar",
                link: "/marketing/menu-bar",
            },
            {
                key: "SEO",
                name: "SEO",
                link: "/marketing/seo",
            },
            {
                key: "INSIDER_SETTING",
                name: "Cài đặt Insider",
                link: "/marketing/insider",
            },
            {
                key: "CHAT_SETTING",
                name: "Cài đặt chat",
                link: "/marketing/chat",
            },
        ],
    }
];
export var theme = createTheme({
    palette: {
        primary: {
            main: "#00b46e",
            dark: "#00a45e",
            contrastText: "#fff",
        },
    },
});

export default function App(props) {
    const router = useRouter();
    const [showLoader, setShowLoader] = React.useState(true);
    const [showLoaderText, setShowLoaderText] = React.useState(true);

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

    const { Component, pageProps } = props;

    if (pageProps.loggedIn) {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ToastProvider>
                    <Layout
                        className={styles.blank}
                        loggedInUserInfo={pageProps.loggedInUserInfo}
                        menu={menu}
                        title="Marketing"
                    >
                        <Component {...pageProps} />
                    </Layout>
                </ToastProvider>
                <Loader show={showLoader} showText={showLoaderText}></Loader>
            </ThemeProvider>
        );
    } else {
        return (
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        );
    }
}
