import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import { registerTranslatorMap } from "@thuocsi/nextjs-components/my-activity/value-translator";
import AppCMS from "pages/_layout";
import { getActivities, MyActivity } from "@thuocsi/nextjs-components/my-activity/my-activity";
import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import Head from "next/head";
import React from "react";
import NotFound from "@thuocsi/nextjs-components/not-found/not-found";
import { getSaleCampaignClient } from "client/saleCampaign";
import { getSellerClient } from "client/seller";
import { getAreaClient } from "client/area";
import { getProductClient } from "client/product";
import { getCategoryClient } from "client/category";
import { formatDateTime, formatShortDateTime, formatNumber } from "components/global";
import { SaleCampaignStatusLabel } from "containers/sale-campaign/SaleCampaignStatus"
import { rewards } from "components/component/constant"
import { scopes } from 'components/global'
import { listTimeSlot } from "components/component/constant"

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
        props.saleCampaign = false
        return data
    }

    const resp = await getSaleCampaignClient(ctx, data).getSaleCampaign({ campaignCode: query.code });

    if (resp.status === "NOT_FOUND") {
        props.saleCampaign = false
        return data
    }

    props.saleCampaign = resp.data[0]

    // register values translator
    let dict = {
        campaignType: function (value) {
            return value === "FLASH_SALE" ? "Flash sale" : "Chương trình khuyến mãi"
        },
        description: function (value) {
            var rex = /(<([^>]+)>)/ig;
            return value.replace(rex , "") || value
        },
        registrationStartTime: formatDateTime,
        registrationEndTime: formatDateTime,
        startTime: formatDateTime,
        endTime: formatDateTime,
        status: function (value) {
            return SaleCampaignStatusLabel[value] || ""
        },
        customerScopes: function (value) {
            const customerScopes = JSON.parse(value) || []
            if (customerScopes.length === 0) return "Tất cả"
            const objScopes = {}
            customerScopes.forEach(element => {
                objScopes[element] = element
            });
            return scopes.filter(item => objScopes[item.value] === item.value)?.map(item => item.label)?.join(", ") || ""
        },
        sellerCodes: async function (value) {
            const sellerCodes = JSON.parse(value) || []
            if (sellerCodes.length === 0) return "Tất cả"
            const resSeller = await getSellerClient(ctx, data).getSellerBySellerCodesClient(sellerCodes);
            return resSeller?.data?.map(seller => seller.name)?.join(", ") || "";
        },
        regions: async function (value) {
            const regions = JSON.parse(value) || []
            if (regions.length === 0) return "Tất cả"
            const resRegion = await getAreaClient(ctx, data).getListAreaByCodes(regions);
            return resRegion?.data?.map(region => region.name)?.join(", ") || "";
        },
        saleType: function (value) {
            return rewards?.find(item => item.value === value)?.label || "Không giới hạn"
        },
        reward: function (value) {
            const reward = JSON.parse(value) || {}
            for (const key in reward) {
                if (reward[key]) return formatNumber(reward[key])
            }
            return ""
        },
        flashSaleTimes: async function (value) {
            const reward = JSON.parse(value) || {}
            let str = ""
            const result = await Promise.all(reward?.map(async (item) => {
                str += `Khung giờ bắt đầu: ${formatDateTime(item.startTime)}
                \nKhung giờ kết thúc: ${formatDateTime(item.endTime)}`
                const resultPrd = await Promise.all(item.detail?.map(async (el) => {
                    let flashsale = ""
                    if(el.code) flashsale += `Khung giờ áp dụng: ${el.name 
                        || listTimeSlot?.find(time => time.value === el.code)?.label} (${formatShortDateTime(item.startTime)} - ${formatShortDateTime(item.endTime)})\n`
                    if (!el.categoryCodes || (el.categoryCodes && el.categoryCodes[0] === "all") || el.categoryCodes?.length === 0) {
                        flashsale += "Danh mục: Tất cả\n"
                    } else {
                        const categoryResp = await getCategoryClient(ctx, {}).getListCategoryByCodesClient(el.categoryCodes);
                        flashsale += `Danh mục: ${categoryResp?.data?.map(category => category.name)}\n`
                    }

                    if (!el.productIDs || el.productIDs?.length === 0) {
                        flashsale += "\nSản phẩm: Tất cả"
                    } else {
                        const productResp = await getProductClient(ctx, {}).getListProductByIds(el.productIDs);
                        flashsale += `\nSản phẩm: ${productResp?.data?.map(category => category.name)}`
                    }
                    return flashsale
                }))
                return resultPrd.join("\n")
            }))
            return result?.join("\n")
        },
    }
    registerTranslatorMap({
        "update-sale-campaign": dict,
        "create-sale-campaign": dict
    })

    props.activities = await getActivities(ctx, data, {
        target: "sale-campaign",
        primaryKey: query?.code
    }, 0, 1000)

    return data
}

function render({ saleCampaign, activities }) {

    if (!saleCampaign) {
        return <AppCMS>
            <Head>
                <title>Lịch sử cập nhật thông tin chương trình khuyến mãi</title>
            </Head>
            <NotFound linkAddress={"/marketing/sale-campaign"}
                linkLabel="Danh sách chương trình khuyến mãi" />
        </AppCMS>
    }

    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing"
        },
        {
            name: "Danh sách chương trình khuyến mãi",
            link: "/marketing/sale-campaign"
        },
        {
            name: "Lịch sử cập nhật chương trình khuyến mãi",
        },
    ]

    return (<AppCMS breadcrumb={breadcrumb}>
        <Head>
            <title>Lịch sử cập nhật thông tin chương trình khuyến mãi</title>
        </Head>
        <MyCard>
            <MyCardHeader title={`Chương trình khuyến mãi #${saleCampaign.campaignCode}`} />
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