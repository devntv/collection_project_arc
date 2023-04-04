import {
    doWithLoggedInUser,
    renderWithLoggedInUser,
} from "@thuocsi/nextjs-components/lib/login";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { getMarketingClient } from "client/marketing";
import AuthorizationScreen from "components/authorization-screen";
import FormData from "containers/countdown-bar/form";
import Head from "next/head";
import { useRouter } from "next/router";
import AppMarketing from "pages/_layout";

function render({}) {
    const toast = useToast();
    const router = useRouter();
    let breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing",
        },
        {
            name: "Danh sách countdown bar",
            link: "/marketing/countdown-bar",
        },
        {
            name: "Tạo countdown bar mới",
        },
    ];
    async function submit(data) {
        try {
            const resp = await getMarketingClient().createCountdownBar(data);
            if (resp.status === "OK") {
                toast.success("Tạo countdown bar thành công");
                router.back();
                return;
            }
            if (resp && resp.message) toast.error(resp.message);
        } catch (e) {
            toast.error(e.message);
        }
    }
    return (
        <AuthorizationScreen>
            <AppMarketing
                select="/marketing/countdown-bar"
                breadcrumb={breadcrumb}
            >
                <Head>
                    <title>Tạo countdown bar mới</title>
                </Head>
                <FormData onSubmit={submit} />
            </AppMarketing>
        </AuthorizationScreen>
    );
}
export default function CountdownBarNew(props) {
    return renderWithLoggedInUser(props, render);
}
export async function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, async () => {
        return {
            props: {},
        };
    });
}
