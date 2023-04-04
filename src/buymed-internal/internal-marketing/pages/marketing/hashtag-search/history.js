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
            name: "Hashtag tìm kiếm nhiều nhất",
            link: "/marketing/hashtag-search",
        },
        {
            name: "Lịch sử cập nhật hashtag",
        },
    ];

    return (
        <AuthorizationScreen>
            <AppMarketing
                select="/marketing/hashtag-search"
                breadcrumb={breadcrumb}
            >
                <Head>
                    <title>Lịch sử thao tác</title>
                </Head>
                <MyCard>
                    <MyCardHeader title={`Hashtag`} />
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
    let { code } = ctx.query;
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
        "hashtag-search-create": dict,
        "hashtag-search-update": dict,
    });

    props.activities = await getActivities(
        ctx,
        {},
        {
            target: "hashtag-search",
            primaryKey: code,
        }
    );
    return {
        props,
    };
}
