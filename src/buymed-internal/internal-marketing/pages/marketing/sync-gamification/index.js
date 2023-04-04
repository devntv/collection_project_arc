import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import React, { useState } from 'react';
import Head from 'next/head';
import AppMarketing from 'pages/_layout';
import { MyCard, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import {
    Button
} from "@material-ui/core";
import { useRouter } from "next/router";
import ModalCustom from "@thuocsi/nextjs-components/simple-dialog/dialogs";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { getAccountClient } from "client/account";
import { getGamificationClient } from "client/gamification";
import HistorySyncGamification from "containers/sync-gamification/HistorySyncGamification";
import { SyncGamificationFilter } from "containers/sync-gamification/SyncGamificationFilter";

export async function loadData(ctx) {
    const props = {
        filterData: {},
        listResult: [],
        accountMap: {},
        totalResult: 0,
        gamificationMap: {}
    };

    let data = { props };
    let query = ctx.query;
    let page = parseInt(query.page) || 0;
    let limit = parseInt(query.limit) || 20;
    let offset = page * limit;
    let q = JSON.parse(query?.q || "{}");

    const filterData = q;
    props.filterData = filterData

    const gamificationClient = getGamificationClient(ctx, {})
    const resultResp = await gamificationClient.getListSyncGamification(offset, limit, q)
    if (resultResp.status === "OK") {
        props.totalResult = resultResp.total
        props.listResult = resultResp.data
    }
    else {
        props.totalResult = 0
        props.listResult = []
    }

    const accountIds = resultResp.data?.map(item => (item.accountID))

    const accountResp = await getAccountClient(ctx, data).getAccountByIds([... new Set(accountIds)])
    if (accountResp.status === "OK") {
        accountResp.data.forEach(acc => {
            props.accountMap[acc.accountId] = acc.email || "";
        })
    }

    const gamificationCodes = resultResp.data?.map(item => (item.gamificationCode))
    const gamificationResp = await gamificationClient.getGamificationByCode([...new Set(gamificationCodes)])
    if (gamificationResp.status === "OK") {
        gamificationResp.data?.forEach(item => {
            props.gamificationMap[item.gamificationCode] = item
        })
    }
    return data
}

export async function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, (cbCtx) => loadData(cbCtx));
}

function GamificationPage(props) {
    // console.log(props)
    let router = useRouter();
    const limit = +(router.query?.limit || 20);
    const toast = useToast()
    const [open, setOpen] = useState(false)

    const handleApplyFilter = async (data) => {

        router.push({
            pathname: "/marketing/sync-gamification",
            query: {
                q: JSON.stringify(data),
                page: 0,
                limit: limit
            }
        });
    };

    const handleUpdateCustomer = async () => {
        setOpen(false)
        const resp = await getGamificationClient().syncGamification()
        if (resp.status === "OK") {
            toast.success(resp?.message || "Đang tiến hàng cập nhật kết quả chương trình trả thưởng")
            router.push({
                pathname: "/marketing/sync-gamification",
                query: {
                    ...router.query
                }
            })
        }
        else {
            toast.error(resp?.message || "Có lỗi xảy ra, vui lòng thử lại sau")
        }
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
            name: "Lịch sử cập nhật kết quả trả thưởng",
        }
    ]

    return (
        <AppMarketing select="/marketing/gamification" breadcrumb={breadcrumb}>
            <Head>
                <title>Lịch sử cập nhật kết quả trả thưởng</title>
            </Head>

            <MyCard>
                <MyCardHeader title="Lịch sử cập nhật kết quả trả thưởng">
                    <Button style={{ marginRight: 8 }} variant="contained" color="primary" onClick={() => setOpen(true)}>
                        Cập nhật kết quả chương trình
                    </Button>
                </MyCardHeader>

                <SyncGamificationFilter
                    open={true}
                    onFilterChange={handleApplyFilter}
                    filterData={props.filterData}
                    router={router}

                />

                <HistorySyncGamification {...props} />

                <ModalCustom
                    open={open}
                    title="Thông báo"
                    primaryText="Đồng ý"
                    onClose={setOpen}
                    onExcute={handleUpdateCustomer}
                >
                    <strong>Thao tác này sẽ thực hiện tính điểm cho tất cả chương trình của Thuocsi có trạng thái đang diễn ra hoặc đã kết thúc nhưng còn trong thời gian tính điểm.</strong>
                    <br />
                    Bạn có chắc muốn thực hiện thao tác này?
                </ModalCustom>
            </MyCard>

        </AppMarketing>
    )

};

export default function Gamification(props) {
    return renderWithLoggedInUser(props, GamificationPage);
}
