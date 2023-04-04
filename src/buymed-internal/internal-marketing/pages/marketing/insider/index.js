import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import Head from 'next/head';
import AppMarketing from 'pages/_layout';
import { MyCard, MyCardActions, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import {
    Button,
    Switch
} from "@material-ui/core";
import { getInsiderSettingClient } from "client/insider-setting";
import { useState } from "react";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { useRouter } from "next/router";
import { MyActivity, getActivities } from "@thuocsi/nextjs-components/my-activity/my-activity";
import { registerTranslatorMap } from "@thuocsi/nextjs-components/my-activity/value-translator";

export async function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, (cbCtx) => loadData(cbCtx));
}

export async function loadData(ctx) {
    let data = {}
    const _client = getInsiderSettingClient(ctx, {});
    const resp = await _client.getInsiderSetting()

    if (resp.status == "OK") {
        data.setting = resp.data[0]
    }
    let dict = {
        isActive: function (value) {
            return value == "true" ? "Bật" : "Tắt"
        }
    }
    registerTranslatorMap({
        "update-insider": dict,
    })

    data.activities = await getActivities(ctx, {}, {
        target: "insider-setting",
    })
    return {
        props: data
    }
}

const breadcrumb = [
    {
        name: "Trang chủ",
        link: "/marketing"
    },
    {
        name: "Quản lý hình ảnh Insider",
    }
]

function InsiderPage({ setting = {}, activities = {} }) {
    const [isActive, setIsActive] = useState(setting.isActive);
    const insiderClient = getInsiderSettingClient();
    const toast = useToast();
    const router = useRouter()
    const handleInsider = async () => {
        const updateResp = await insiderClient.updateInsiderSetting({ isActive: isActive });
        if (updateResp.status == "OK") {
            toast.success(`${isActive ? "Bật" : "Tắt"} insider thành công`)
            router.push("/marketing/insider")
        } else {
            toast.error(updateResp?.message || "Có lỗi xảy ra")
        }
    };

    return (
        <AppMarketing select="/marketing/insider" breadcrumb={breadcrumb}>
            <Head>
                <title>Quản lý hình ảnh Insider</title>
            </Head>

            <MyCard>
                <MyCardHeader title="Cập nhật hình ảnh Insider"></MyCardHeader>

                <MyCardContent>
                    <div>
                        <b>Công cụ quản lý hình ảnh Insider: khi bật.tắt trạng thái thì tất cả hình ảnh (banner, mini banner)
                            của Insider trên website, web mobile và app sẽ được hiển thị (Bật) hoặc ẩn đi (Tắt)</b>
                    </div><br />

                    <div><b>Trạng thái</b>
                        <Switch
                            color="primary"
                            onClick={() => {
                                setIsActive(!isActive)
                            }}
                            checked={isActive}
                        />
                    </div>
                </MyCardContent>

                <MyCardActions>
                    <Button style={{ marginLeft: 10 }} color="primary" variant="contained" onClick={handleInsider}>
                        LƯU
                    </Button>
                    <Button color="default" variant="contained" onClick={() => router.back()} >
                        QUAY LẠI
                    </Button>
                </MyCardActions>
            </MyCard>

            <MyCard>
                <MyCardHeader title="Lịch sử cài đặt hình ảnh Insider"></MyCardHeader>
                <MyCardContent>
                    <MyActivity
                        data={activities.data || []}
                        message="Chưa ghi nhận thao tác nào"
                    ></MyActivity>
                </MyCardContent>
            </MyCard>
        </AppMarketing>
    )
}

export default function Insider(props) {
    return renderWithLoggedInUser(props, InsiderPage);
}