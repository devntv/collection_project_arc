import {
    doWithLoggedInUser,
    renderWithLoggedInUser,
} from "@thuocsi/nextjs-components/lib/login";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { getMarketingClient } from "client/marketing";
import AuthorizationScreen from "components/authorization-screen";
import FormData from "containers/hashtag-search/form";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { useRouter } from "next/router";
import AppMarketing from "pages/_layout";

function render({ hashtag = {} }) {
    const { t } = useTranslation();
    const toast = useToast();
    const router = useRouter();
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
            name: "Cập nhật hashtag",
        },
    ];
    async function submit(data) {
        try {
            const { code } = hashtag;

            const resp = await getMarketingClient().updateHashtagSearch({
                code,
                ...data,
            });

            if (resp.status === "OK") {
                toast.success("Cập nhật hashtag thành công");
                router.push({
                    pathname: "/marketing/hashtag-search/edit",
                    query: {
                        ...router.query,
                        code: code,
                    },
                });
                return;
            }
            if (resp && resp.message) toast.error(resp.message);
        } catch (e) {
            toast.error(e.message);
        }
    }
    return (
        <AuthorizationScreen>
            <AppMarketing select="/marketing/top-search" breadcrumb={breadcrumb}>
                <Head>
                    <title>Cập nhật hashtag</title>
                </Head>
                <FormData onSubmit={submit} data={hashtag} type="edit" />
            </AppMarketing>
        </AuthorizationScreen>
    );
}
export default function TopSearch(props) {
    return renderWithLoggedInUser(props, render);
}
export async function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, async () => {
        const props = {
            hashtag: {},
        };
        const marketingClient = getMarketingClient(ctx, {});
        const { code } = ctx.query;
        const hashtagResp = await marketingClient.getHashtagSearchList({
            q: {
                code: code,
            },
        });

        if (hashtagResp?.status == "OK" && hashtagResp?.total === 1) {
            props.hashtag = hashtagResp.data[0];
        } else {
        }

        return {
            props: props,
        };
    });
}
