import {
    doWithLoggedInUser,
    renderWithLoggedInUser,
} from "@thuocsi/nextjs-components/lib/login";
import {
    getActivities,
    MyActivity,
} from "@thuocsi/nextjs-components/my-activity/my-activity";
import { registerTranslatorMap } from "@thuocsi/nextjs-components/my-activity/value-translator";
import {
    MyCard,
    MyCardContent,
    MyCardHeader,
} from "@thuocsi/nextjs-components/my-card/my-card";
import AuthorizationScreen from "components/authorization-screen";
import { formatDateTime } from "components/global";
import Head from "next/head";
import AppMarketing from "pages/_layout";

export async function getServerSideProps(ctx) {
    return await doWithLoggedInUser(ctx, loadData);
}
export default function CountdownBarHistoryPage(props) {
    return renderWithLoggedInUser(props, render);
}

function render({ activities }) {
    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing",
        },
        {
            name: "Danh sách countdown bar",
            link: "/marketing/countdown-bar",
        },
        {
            name: "Lịch sử cài đặt countdown bar",
        },
    ];

    return (
        <AuthorizationScreen>
            <AppMarketing
                select="/marketing/countdown-bar"
                breadcrumb={breadcrumb}
            >
                <Head>
                    <title>Lịch sử cài đặt countdown bar</title>
                </Head>
                <MyCard>
                    <MyCardHeader title="Lịch sử cài đặt countdown bar" />
                    <MyCardContent>
                        <MyActivity
                            data={activities.data || []}
                            message="Chưa ghi nhận thao tác nào"
                        ></MyActivity>
                    </MyCardContent>
                </MyCard>
            </AppMarketing>
        </AuthorizationScreen>
    );
}

// load history of
async function loadData(ctx) {
    // register values translator
    let props = {};
    let dict = {
        startDisplayTime: function (values) {
            return formatDateTime(values);
        },
        endDisplayTime: function (values) {
            return formatDateTime(values);
        },
        isActive: function (value) {
            return value == "true" ? "Bật" : "Tắt";
        },
    };
    registerTranslatorMap({
        "countdown-bar-create": dict,
        "countdown-bar-update": dict,
        "countdown-bar-delete": dict,
    });

    props.activities = await getActivities(
        ctx,
        {},
        {
            target: "countdown-bar",
        }
    );
    return {
        props,
    };
}
