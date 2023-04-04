import {
    doWithLoggedInUser,
    renderWithLoggedInUser,
} from "@thuocsi/nextjs-components/lib/login";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { getMarketingClient } from "client/marketing";
import FormData from "containers/hashtag-search/form";
import Head from "next/head";
import AppMarketing from "pages/_layout";
import { useRouter } from "next/router";
import AuthorizationScreen from "components/authorization-screen";

function render({ }) {
    const toast = useToast();
    const router = useRouter();
    let breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing",
        },
        {
            name: "Hashtag tìm kiếm nhiều nhất",
            link: "/marketing/hashtag-search",
        },
        {
            name: "Tạo hashtag mới",
        },
    ];
    async function submit(data) {
        try {
            const resp = await getMarketingClient().createHashtagSearch(data);
            if (resp.status === "OK") {
                toast.success("Tạo hashtag thành công");
                router.back()
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
                    <title>Tạo hashtag mới</title>
                </Head>
                <FormData onSubmit={submit} />
            </AppMarketing>
        </AuthorizationScreen>
    );
}
export default function TopSearch(props) {
    return renderWithLoggedInUser(props, render);
}
export async function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, async () => {
        return {
            props: {},
        };
    });
}
