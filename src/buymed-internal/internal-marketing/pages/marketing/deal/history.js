import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import { registerTranslatorMap } from "@thuocsi/nextjs-components/my-activity/value-translator";
import AppMarketing from "pages/_layout";
import { getActivities, MyActivity } from "@thuocsi/nextjs-components/my-activity/my-activity";
import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import Head from "next/head";
import React from "react";
import NotFound from "@thuocsi/nextjs-components/not-found/not-found";
import { getDealClient } from "client/deal";
import { getProductClient } from "client/product";
import { formatDateTime } from "components/global";
import { SkuStatusText } from "view-model/sku";
import AuthorizationScreen from "components/authorization-screen";

export async function getServerSideProps(ctx) {
    return await doWithLoggedInUser(ctx, loadData);
}

export default function HistoryPage(props) {
    return renderWithLoggedInUser(props, render)
}

// load history of
async function loadData(ctx) {

    let query = ctx.query
    let props = {
        dealCode: query.dealCode
    }, data = { props }

    if (!query.dealCode) {
        props.deal = false
        return data
    }

    let dealResult = await getDealClient(ctx, data).getDealByCode({
        q: JSON.stringify({ code: query.dealCode })
    })

    // console.log(dealResult)
    if (dealResult.status !== "OK") {
        props.deal = false
        return data
    }

    props.deal = dealResult.data[0]

    // register values translator
    let dict = {
        skus: async function (values) {
            let skusArr = JSON.parse(values)
            let skuList = skusArr.map(sku => sku.sku.split(".", 2)[1])
            let skuResult = await getProductClient(ctx, data).getListProductByCodes(skuList)
            // console.log(skuResult)
            if (skuResult && skuResult.status === "OK") {
                let capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
                return skuResult.data.map(prod => prod.productID + " - " + capitalize(prod.name)).join("\n")
            }
            return skuList.join("\n")
        },
        autoUpdateDataSku: function (values) {
            let arrays = JSON.parse(values)
            let str = ""
            arrays?.forEach((item, index) => {
                str = str + `${index > 0 ? `\n` : ""} Sku item: ${item.skuItemCode} - Trạng thái: ${SkuStatusText[item.nextStatus] ?? "Tắt hiển thị"}`
            })
            return str === "" ? " - " : str
        },
        readyTime: formatDateTime,
        startTime: formatDateTime,
        endTime: formatDateTime
    }
    registerTranslatorMap({
        "deal-update": dict,
        "deal-create": dict
    })

    props.activities = await getActivities(ctx, data, {
        target: "deal",
        primaryKey: query.dealCode
    })

    // console.log(props.activities)
    return data
}

function render({ dealCode, deal, activities }) {

    if (!deal) {
        return <AppMarketing>
            <NotFound linkAddress={"/marketing/deal"}
                linkLabel="Trang chủ" />
        </AppMarketing>
    }

    let breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing",
        },
        {
            name: "Deal",
            link: "/marketing/deal",
        },
        {
            name: "Lịch sử cập nhật deal",
        },
    ]
    return (<AppMarketing breadcrumb={breadcrumb}>
        <Head>
            <title>Lịch sử cập nhật thông tin deal {deal.code}</title>
        </Head>
        <AuthorizationScreen>
            <MyCard>
                <MyCardHeader title={`Deal #${deal.code} - ${deal.name}`} />
                <MyCardContent>
                    <MyActivity
                        data={activities.data}
                        message="Chưa ghi nhận thao tác nào"
                    >
                    </MyActivity>
                </MyCardContent>
            </MyCard>
        </AuthorizationScreen>
    </AppMarketing>)
}