import {doWithLoggedInUser} from "@thuocsi/nextjs-components/lib/login";
import Head from "next/head";
import ReportApp from "pages/_layout";


export async function getServerSideProps(ctx) {
    return await doWithLoggedInUser(ctx, (ctx) => {
        return loadCartData(ctx)
    })
}

export async function loadCartData(ctx) {
    let props = {
    }, data = {props}

    return data
}

export default function CustomerRealtimePage(props) {
    const breadcrumb = [
        {
            name: "Báo cáo",
        },
        {
            name: "Đơn hàng",
            link: "/report/order"
        },
        {
            name: "Giỏ hàng",
        },
    ];

    return <ReportApp breadcrumb={breadcrumb}>
        <Head>
            <title>Giỏ hàng</title>
        </Head>
        <div>
            Tính năng sắp ra mắt
        </div>
    </ReportApp>
}