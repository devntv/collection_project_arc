import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import Head from 'next/head';
import AppMarketing from 'pages/_layout';
import { MyCard, MyCardActions, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import {
    Button, Grid,
} from "@material-ui/core";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { useRouter } from "next/router";
import { MyActivity, getActivities } from "@thuocsi/nextjs-components/my-activity/my-activity";
import { registerTranslatorMap } from "@thuocsi/nextjs-components/my-activity/value-translator";
import { useForm } from "react-hook-form";
import MuiSingleAuto from "@thuocsi/nextjs-components/muiauto/single";
import { getChatSettingClient } from "client/chat-setting";
import { CHAT_CONFIG_STATE, CHAT_CONFIG_STATE_ENUM, CHAT_SETTING_KEY } from "components/global";
import AuthorizationScreen from "components/authorization-screen";
import AuthorizationButton from "components/authorization-button";

export async function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, (cbCtx) => loadData(cbCtx));
}

export async function loadData(ctx) {
    let data = {}
    const _client = getChatSettingClient(ctx, data);
    const resp = await _client.getChatSetting();

    if (resp?.status == "OK") {
        data.setting = resp.data[0]
    }
    let dict = {
        value: function (value) {
            if (value === CHAT_CONFIG_STATE_ENUM.OFF) return "Tắt"
            if (value === CHAT_CONFIG_STATE_ENUM.MESSENGER) return "Sử dụng Messenger"
            if (value === CHAT_CONFIG_STATE_ENUM.THUOCSI) return "Sử dụng chat thuocsi"
        }
    }
    registerTranslatorMap({
        "update-chat-setting": dict,
    })

    const activitiesRes = await getActivities(ctx, {}, {
        target: "chat-setting",
    })

    activitiesRes.data = activitiesRes?.data?.filter(item => item?.rawData?.key === CHAT_SETTING_KEY) || []

    data.activities = activitiesRes

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
        name: "Cài đặt chat",
    }
]

function ChatSettingPage({ setting = {}, activities = {} }) {
    const toast = useToast();
    const router = useRouter()

    const { control, errors, handleSubmit, watch } = useForm({ mode: "onChange", defaultValues: { type: CHAT_CONFIG_STATE.find((item) => item.value == setting?.value) || CHAT_CONFIG_STATE_ENUM.THUOCSI } });

    const onUpdateChatState = async (data) => {
        const submitData = {
            value: data.type.value,
            key: CHAT_SETTING_KEY,
            isPublic: true
        }
        try {
            const res = await getChatSettingClient().updateChatSetting(submitData);
            if (res.status === "OK") {
                toast.success("Cập nhật cài đặt chat thành công")
                router.push(router.asPath)
            }
            else toast.error(res.message)
        } catch (e) {
            toast.error(e.message)
        }
    }

    return (
        <AuthorizationScreen>
            <AppMarketing select="/marketing/chat" breadcrumb={breadcrumb}>
                <Head>
                    <title>Cài đặt chat</title>
                </Head>

                <MyCard>
                    <MyCardHeader title="Cài đặt chat"></MyCardHeader>

                    <form onSubmit={handleSubmit(onUpdateChatState)}>
                    <MyCardContent>
                        <div>
                        <b>Công cụ cài đặt chat, chuyển đổi giữa ba trạng thái: Tắt (ẩn chat), sử dụng Messenger, sử dụng chat thuocsi</b>
                        </div><br />

                        <Grid container>
                            <Grid item xs={12} md={6} lg={4}>
                            <MuiSingleAuto
                                required
                                label="Trạng thái"
                                placeholder="Chọn trạng thái"
                                options={CHAT_CONFIG_STATE}
                                name="type"
                                errors={errors}
                                control={control}
                            />
                            </Grid>
                        </Grid>
                    </MyCardContent>

                    <MyCardActions>
                        <AuthorizationButton requiredAPI="PUT/marketplace/marketing/v1/settings">
                            <Button style={{ marginLeft: 10 }} color="primary" variant="contained" type="submit" disabled={watch("type")?.value === setting?.value || !watch("type")?.value}>
                                LƯU
                            </Button>
                        </AuthorizationButton>
                        <Button color="default" variant="contained" onClick={() => router.back()} >
                            QUAY LẠI
                        </Button>
                    </MyCardActions>
                    </form>
                </MyCard>

                <MyCard>
                    <MyCardHeader title="Lịch sử cài đặt chat"></MyCardHeader>
                    <MyCardContent>
                        <MyActivity
                            data={activities.data || []}
                            message="Chưa ghi nhận thao tác nào"
                        ></MyActivity>
                    </MyCardContent>
                </MyCard>
            </AppMarketing>
        </AuthorizationScreen>
    )
}

export default function ChatPage(props) {
    return renderWithLoggedInUser(props, ChatSettingPage);
}