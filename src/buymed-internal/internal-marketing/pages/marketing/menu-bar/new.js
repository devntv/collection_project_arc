import {
    doWithLoggedInUser,
    renderWithLoggedInUser,
} from "@thuocsi/nextjs-components/lib/login";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { getMarketingClient } from "client/marketing";
import AuthorizationScreen from "components/authorization-screen";
import FormData from "containers/menu-bar/form";
import Head from "next/head";
import { useRouter } from "next/router";
import AppMarketing from "pages/_layout";

function render({ menuBar }) {
    const router = useRouter();

    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing",
        },
        {
            name: "Danh sách menu",
            link: "/marketing/menu-bar",
        },
        {
            name: "Thêm tab cho menu",
        },
    ];

    const toast = useToast();

    async function submit(data) {
        try {
            const resp = await getMarketingClient().updateMenubar(data);
            if (resp.status === "OK") {
                toast.success("Cập nhật danh sách menu thành công");
                router.push({
                    pathname: "/marketing/menu-bar",
                });
                return;
            }
            if (resp && resp.message) toast.error(resp.message);
        } catch (e) {
            toast.error(e.message);
        }
    }

    return (
        <>
            <Head>
                <title>Thêm tab cho menu</title>
            </Head>
            <AuthorizationScreen>
                <AppMarketing
                    select="/marketing/menu-bar"
                    breadcrumb={breadcrumb}
                >
                    <FormData
                        onSubmit={submit}
                        data={null}
                        index={null}
                        menuBar={menuBar}
                    />
                </AppMarketing>
            </AuthorizationScreen>
        </>
    );
}

export default function MenuBarNew(props) {
    return renderWithLoggedInUser(props, render);
}
export async function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, async () => {
        const props = {
            menuBar: [],
        };
        const marketingClient = getMarketingClient(ctx, {});
        const menuBarResp = await marketingClient.getMenubar();

        if (menuBarResp.status == "OK") {
            props.menuBar = menuBarResp?.data[0]?.items || [];
        }

        return {
            props: props,
        };
    });
}
