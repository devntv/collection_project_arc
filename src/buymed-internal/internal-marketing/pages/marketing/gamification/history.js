import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import { registerTranslatorMap } from "@thuocsi/nextjs-components/my-activity/value-translator";
import AppCMS from "pages/_layout";
import { getActivities, MyActivity } from "@thuocsi/nextjs-components/my-activity/my-activity";
import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import Head from "next/head";
import React from "react";
import NotFound from "@thuocsi/nextjs-components/not-found/not-found";
import { formatDateTime, formatNumber } from "components/global";
import { scopes, gamificationType } from 'components/global'
import { getGamificationClient } from "client/gamification";
import { getCustomerClient } from "client/customer";

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
        props.gamification = false
        return data
    }

    const resp = await getGamificationClient(ctx, data).getGamification({}, query.code);
    if (resp.status === "NOT_FOUND") {
        props.gamification = false
        return data
    }

    props.gamification = resp.data[0]

    const getText = (value) => {
        const rex = /(<([^>]+)>)/ig;
        return value?.replace(rex, "") || value
    }

    // register values translator
    let dict = {
        description: getText,
        publicTime: formatDateTime,
        startTime: formatDateTime,
        endTime: formatDateTime,
        isActive: function (value) {
            return JSON.parse(value) ? "Đang hoạt động" : "Ngừng hoạt động"
        },
        scope: async function (value) {
            const scope = JSON.parse(value)
            let str = ""
            if (!scope?.customerScopes || scope?.customerScopes?.length === 0) str = "Vai trò khách hàng: Tất cả\n"
            else {
                const objScopes = {}
                scope?.customerScopes?.forEach(element => {
                    objScopes[element] = element
                });
                str = `Vai trò khách hàng: ${scopes.filter(item => objScopes[item.value] === item.value)?.map(item => item.label)?.join(", ") || ""}\n`
            }

            if (!scope?.customerIDs || scope?.customerIDs?.length === 0) str += "Khách hàng: Tất cả"
            else {
                const resCustomer = await getCustomerClient(ctx, {}).getCustomerByCustomerIDs(scope?.customerIDs);
                str += `Khách hàng: ${resCustomer?.data?.map(customer => customer.name)?.join(", ") || ""}`
            }
            if(scope?.description) str += `\nNội dung mô tả: ${getText(scope?.description) || ""}`
            
            return str
        },
        details: function (value) {
            const detail = JSON.parse(value)[0]
            let str = ""
            if(detail?.condition?.type) str = `Loại chương trình: ${gamificationType.find(item => item.value === detail?.type) || "Chương trình theo doanh số"}\n`
            if(detail?.condition?.target) str += `\nDoanh thu yêu cầu: ${formatNumber(detail?.condition?.target)}`
            if(detail?.condition?.description) str += `\nNội dung mô tả: ${getText(detail?.condition?.description)}`
            if(detail?.reward) str += `\nPhần thưởng: ${getText(detail?.reward?.description) || ""}`
            return str
        }
    }
    registerTranslatorMap({
        "create-gamification": dict,
        "update-gamification": dict
    })

    props.activities = await getActivities(ctx, data, {
        target: "gamification",
        primaryKey: query?.code
    })

    return data
}

function render({ gamification, activities }) {

    if (!gamification) {
        return <AppCMS>
            <Head>
                <title>Lịch sử cập nhật thông tin chương trình thưởng</title>
            </Head>
            <NotFound linkAddress={"/marketing/gamification"}
                linkLabel="Danh sách chương trình thưởng" />
        </AppCMS>
    }

    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing"
        },
        {
            name: "Danh sách chương trình thưởng",
            link: "/marketing/gamification"
        },
        {
            name: "Lịch sử cập nhật chương trình thưởng",
        },
    ]

    return (<AppCMS breadcrumb={breadcrumb}>
        <Head>
            <title>Lịch sử cập nhật thông tin chương trình thưởng</title>
        </Head>
        <MyCard>
            <MyCardHeader title={`Chương trình thưởng #${gamification.gamificationCode}`} />
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