import {
    doWithLoggedInUser,
    renderWithLoggedInUser,
} from "@thuocsi/nextjs-components/lib/login";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { getMarketingClient } from "client/marketing";
import AuthorizationScreen from "components/authorization-screen";
import FormData from "containers/seo/form";
import Head from "next/head";
import { useRouter } from "next/router";
import AppMarketing from "pages/_layout";

function render({ thumbnail }) {
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
            name: "Cập nhật thumbnail",
        },
    ];

    const toast = useToast();
    const router = useRouter();

    async function submit(data) {
        try {
            const { code } = thumbnail;

            const resp = await getMarketingClient().updateThumbnail({
                code,
                ...data,
            });

            if (resp.status === "OK") {
                toast.success("Cập nhật thumbnail thành công");
                router.push({
                    pathname: "/marketing/seo/edit",
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
            <AppMarketing select="/marketing/seo" breadcrumb={breadcrumb}>
                <Head>
                    <title>Cập nhật thumbnail</title>
                </Head>

                <FormData onSubmit={submit} data={thumbnail} />
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
            thumbnail: {},
        };

        const { code } = ctx.query;
        const marketingClient = getMarketingClient(ctx, {});
        const thumbnailResp = await marketingClient.getThumbnail(code);

        if (
            thumbnailResp?.status == "OK" &&
            thumbnailResp?.data?.length === 1
        ) {
            props.thumbnail = thumbnailResp.data[0];
        }

        return {
            props,
        };
    });
}
