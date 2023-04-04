import { Button, Grid, makeStyles, TextField } from "@material-ui/core";

import { MyCard, MyCardActions, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { getLoyaltyClient } from "client/loyalty";
import Link from "next/link";
import { useRouter } from "next/router";
import MuiSingleAuto from "@thuocsi/nextjs-components/muiauto/single";

import React from "react";
import { useForm } from "react-hook-form";
import {
    LoyaltyStatus
} from "view-model/loyalty";
import Head from "next/head";
import { formatErrorMessage } from "components/global";

const useStyles = makeStyles({
    gridAlignTop: {
        alignItems: "flex-start",
        alignContent: "flex-start",
    },
});

export const LoyaltyForm = (props) => {

    const statuses = [
        {label: "Bật", value: LoyaltyStatus.ACTIVE},
        {label: "Tắt", value: LoyaltyStatus.INACTIVE}
    ]
    const { promos = [] } = props;
    const classes = useStyles();
    const router = useRouter();
    const toast = useToast();

    const loyaltyClient = getLoyaltyClient();

    const loyaltyForm = useForm({
        defaultValues: {
            point: props.loyalty?.point || 0,
            promotion: props.loyalty?.promo || null,
            status: statuses.find( status => status.value === props.loyalty?.status) || null,
        },
        mode: "onChange",
    });


    async function createOrUpdateLoyalty({ point, promotion, status }) {
        const data = {
            point: Number(point),
            promotionId: promotion.value,
            status: status?.value || '',
        };

        let resp;
        if (props.isUpdate) {
            data.code = props.code;
            resp = await loyaltyClient.updateLoyalty(data);
        } else {
            resp = await loyaltyClient.createLoyalty(data);
        }
        if (resp.status !== "OK") {
            throw new Error(formatErrorMessage(resp));
        }
        return resp.data[0];
    }

    const handleSubmitLoyaltyForm = async (formData) => {
        try {
            let promo = formData.promotion?.promo || {}
            if (!promo.rewards?.[0]?.type || promo.rewards?.[0]?.type === ""){
                return toast.error("Chương trình chọn chưa được cài đặt giá trị khuyến mãi")
            }
            const loyalty = await createOrUpdateLoyalty(formData);
            toast.success(props.isUpdate ? "Cập nhật đổi điểm thành công" : "Tạo đổi điểm thành công");
            if (!props.isUpdate) {
                router.push({
                    pathname: "/marketing/loyalty/edit",
                    query: {
                        code: loyalty.code,
                    },
                });
            }
        } catch (e) {
            toast.error(formatErrorMessage(e));
        }
    };

    return (
        <MyCard>
            <Head>
                <title>{props.isUpdate ? "Cập nhật đổi điểm" : "Tạo mới đổi điểm"}</title>
            </Head>
            <MyCardHeader title={props.isUpdate ? `Đổi điểm #${props.loyalty.code}` : "Tạo mới đổi điểm"} />

            <form>
            <MyCardContent>
                <Grid container spacing={8}>
                    <Grid item xs={12} md={6}>
                        <MuiSingleAuto
                            label="Chương trình khuyến mãi"
                            options={promos}
                            placeholder="Chọn"
                            name="promotion"
                            errors={loyaltyForm.errors}
                            control={loyaltyForm.control}
                            message="Vui lòng chọn"
                            required
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            name="point"
                            variant="outlined"
                            size="small"
                            label="Điểm"
                            type="number"
                            fullWidth
                            required
                            error={!!loyaltyForm.errors.point}
                            helperText={loyaltyForm.errors.point?.message}
                            onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
                            inputRef={loyaltyForm.register({
                                min: {
                                    value: 0,
                                    message: "Điểm không được nhỏ hơn 0"
                                },
                                max: {
                                    value: 1000000000,
                                    message: "Điểm không được lớn hơn 1,000,000,000"
                                }
                            })}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                         <MuiSingleAuto
                            options={statuses}
                            name="status"
                            placeholder="Chọn trạng thái hiển thị"
                            control={loyaltyForm.control}
                            errors={loyaltyForm.errors}
                            label="Trạng thái hiển thị"
                            message="Vui lòng chọn"
                            required
                        />
                    </Grid>
                </Grid>
               
            </MyCardContent>
            <MyCardActions>
                <Link href="/marketing/loyalty">
                    <Button variant="contained">Quay lại</Button>
                </Link>
                <Button variant="contained" color="primary" onClick={loyaltyForm.handleSubmit(handleSubmitLoyaltyForm)}>
                    Lưu
                </Button>
            </MyCardActions>
            </form>
        </MyCard>
    );
};
