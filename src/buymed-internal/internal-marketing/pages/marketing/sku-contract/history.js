import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import { registerTranslatorMap } from "@thuocsi/nextjs-components/my-activity/value-translator";
import AppCMS from "pages/_layout";
import { getActivities, MyActivity } from "@thuocsi/nextjs-components/my-activity/my-activity";
import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import Head from "next/head";
import React from "react";
import NotFound from "@thuocsi/nextjs-components/not-found/not-found";
import { getSkuContractClient } from "client/skuContract";
import { formatDateTime, formatNumber } from "components/global";
import { getProductClient } from "client/product";

export async function getServerSideProps(ctx) {
    return await doWithLoggedInUser(ctx, loadData);
}

export default function HistoryPage(props) {
    return renderWithLoggedInUser(props, render)
}

// load history of
async function loadData(ctx) {

    let query = ctx.query ?? {}
    let props = {
        code: query?.code ?? null
    }, data = { props }

    if (!query.code) {
        props.skuContract = false
        return data
    }

    let resp = await getSkuContractClient(ctx, data).getSkuContract({ code: query.code });

    if (resp.status === "NOT_FOUND") {
        props.skuContract = false
        return data
    }

    props.skuContract = resp.data[0]

    // register values translator
    let dict = {
        startTime: function (values) {
            return formatDateTime(values)
        },
        endTime: function (values) {
            return formatDateTime(values)
        },
        isActive: function (value) {
            return value === "true" ? "Đang hoạt động" : "Ngừng hoạt động"
        },
        documentFiles: function (value) {
            return JSON.parse(value)?.map(item => item.name)?.toString(", ") || ""
        },
        skuContractDetail: async function (value) {
            const ids = JSON.parse(value)?.map(item => item.productID)
            const productResp = await getProductClient(ctx, data).getListProductByIds(ids);
            const prdMap = {}
            productResp?.data?.forEach(element => {
                prdMap[element.code] = element.name
            });

            return JSON.parse(value)?.map(item => {
                return `Mã sp: ${item.productCode} - Tên sp: ${prdMap[item.productCode] || ""} - Giá hợp đồng: ${formatNumber(item.price)}`
            })?.toString(", ") || ""
        },
        price: function (value) {
            return formatNumber(value)
        },
        productCode: async function (value) {
            const productResp = await getProductClient(ctx, data).getListProductByCodes([value]);
            return value + " - " + (productResp?.data ? productResp?.data[0]?.name : "")
        },
    }
    registerTranslatorMap({
        "update-sku-contract": dict,
        "create-sku-contract": dict,
        "create-sku-contract-detail": dict,
        "update-sku-contract-detail": dict,
        "delete-sku-contract-detail": dict,
    })

    props.activities = await getActivities(ctx, data, {
        target: "pricing",
        primaryKey: query?.code
    })

    return data
}

function render({ skuContract, activities }) {

    if (!skuContract) {
        return <AppCMS>
            <Head>
                <title>Lịch sử cập nhật thông tin Cài đặt giá theo hợp đồng </title>
            </Head>
            <NotFound linkAddress={"/marketing/sku-contract"}
                linkLabel="Danh sách Cài đặt giá theo hợp đồng" />
        </AppCMS>
    }

    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing"
        },
        {
            name: "Danh sách Cài đặt giá theo hợp đồng",
            link: "/marketing/sku-contract"
        },
        {
            name: "Lịch sử cập nhật Cài đặt giá theo hợp đồng",
        },
    ]

    return (<AppCMS breadcrumb={breadcrumb}>
        <Head>
            <title>Lịch sử cập nhật thông tin Cài đặt giá theo hợp đồng </title>
        </Head>
        <MyCard>
            <MyCardHeader title={`Cài đặt giá theo hợp đồng #${skuContract.code}`} />
            <MyCardContent>
                <MyActivity
                    data={activities.data || []}
                    message="Chưa ghi nhận thao tác nào"
                >
                </MyActivity>
            </MyCardContent>
        </MyCard>

    </AppCMS>)
}