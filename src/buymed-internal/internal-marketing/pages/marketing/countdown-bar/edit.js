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

function render({ countdownBar = {} }) {
    const toast = useToast();
    const router = useRouter();
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
            name: "Cập nhật countdown bar",
        },
    ];
    async function submit(data) {
        try {
            const { code } = countdownBar;

            const resp = await getMarketingClient().updateCountdownBar({
                code,
                ...data,
            });

            if (resp.status === "OK") {
                toast.success("Cập nhật countdown bar thành công");
                router.push({
                    pathname: "/marketing/countdown-bar/edit",
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
            <AppMarketing
                select="/marketing/countdown-bar"
                breadcrumb={breadcrumb}
            >
                <Head>
                    <title>Cập nhật countdown bar</title>
                </Head>
                <FormData onSubmit={submit} data={countdownBar} />
            </AppMarketing>
        </AuthorizationScreen>
    );
}
export default function CountdownBarEdit(props) {
    return renderWithLoggedInUser(props, render);
}
export async function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, async () => {
        const props = {
            countdownBar: {},
        };
        const marketingClient = getMarketingClient(ctx, {});
        const { code } = ctx.query;
        const countdownBarResp = await marketingClient.getCountdownBarList({
            q: {
                code: code,
            },
        });

        if (countdownBarResp?.status == "OK" && countdownBarResp?.total === 1) {
            props.countdownBar = countdownBarResp.data[0];
        }

        return {
            props: props,
        };
    });
}
