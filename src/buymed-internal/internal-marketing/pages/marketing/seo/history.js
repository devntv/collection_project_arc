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
export default function HistoryPage(props) {
    return renderWithLoggedInUser(props, render);
}

function render({ activities }) {
    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing",
        },
        {
            name: "Danh sách thumbnail",
            link: "/marketing/seo",
        },
        {
            name: "Lịch sử cài đặt thumbnail",
        },
    ];

    return (
        <AuthorizationScreen>
            <AppMarketing select="/marketing/seo" breadcrumb={breadcrumb}>
                <Head>
                    <title>Lịch sử cài đặt thumbnail</title>
                </Head>
                <MyCard>
                    <MyCardHeader title="Lịch sử cài đặt thumbnail" />
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
        "thumbnail-create": dict,
        "thumbnail-update": dict,
        "thumbnail-delete": dict,
    });

    props.activities = await getActivities(
        ctx,
        {},
        {
            target: "thumbnail",
        }
    );
    return {
        props,
    };
}
