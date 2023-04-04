import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@material-ui/core";
import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import MuiMultipleAuto from "@thuocsi/nextjs-components/muiauto/multiple";

import { MyCard, MyCardContent, MyCardActions, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { getVoucherClient } from "client/voucher";
import { getPromoClient } from "client/promo";
import { isValid, getData, getFirst, formatErrorMessage } from "components/global";

import Head from "next/head";
import { useRouter } from "next/router";
import AppMarketing from "pages/_layout";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./gift.module.css";

export async function getServerSideProps(ctx) {
    return await doWithLoggedInUser(ctx, (ctx) => {
        return loadGiftData(ctx);
    });
}

export default function NewPage(props) {
    return renderWithLoggedInUser(props, render);
}

export async function loadGiftData(ctx) {
    let data = {
        props: {
            promos: []
        },
    };
    // get list voucher
    const voucherClient = getVoucherClient(ctx, {});
    const promoClient = getPromoClient(ctx, {});

    const voucherResp = await voucherClient.getVoucherCode("", 200, 0, true);
    if (voucherResp.status === "OK") {
        data.props.listVoucher = voucherResp.data.map((voucher) => ({
            value: voucher.code | "",
            label: voucher.code + " - " + voucher.promotionName,
        }));
    }

    const promoResp = await promoClient.getListPromotionByStatus("ACTIVE");

    if (isValid(promoResp)) {
        promoResp?.data?.forEach((promo) => {
            if (!!promo.rewards?.[0]?.type) data.props.promos.push({
                label: promo.promotionName,
                value: promo.promotionId,
            });
        })
    } else {
        data.props.promos = [];
    }

    // get gift setting
    const giftResp = await voucherClient.getGiftSetting();
    if (isValid(giftResp)) {
        const gift = getFirst(giftResp);
        data.props.friendGift = {
            orderQuantity: gift.friendGift?.orderQuantity || 0,
            promotionIds: gift.friendGift?.promotionIds || [],
            friendPromotionIds: gift.friendGift?.friendPromotionIds || [],
            promotions: [],
            friendPromotions: [],
        };
        data.props.newbieGift = {
            promotionIds: gift.newbieGift || [],
            newbiePromos: [],
        }
        const promoLength = data.props.friendGift.promotionIds.length
        const friendPromoLength = data.props.friendGift.friendPromotionIds.length
        const newbiePromoLength = data.props.newbieGift.promotionIds.length
        if (promoLength > 0) {
            for (let i = 0; i < promoLength; i++) {
                const giftResp = await promoClient.getPromotionByID(data.props.friendGift.promotionIds[i])
                if (isValid(giftResp)) {
                    data.props.friendGift.promotions.push({ value: data.props.friendGift.promotionIds[i], label: giftResp.data[0].promotionName })
                }
            }
        }
        if (friendPromoLength > 0) {
            for (let i = 0; i < friendPromoLength; i++) {
                const friendGiftResp = await promoClient.getPromotionByID(data.props.friendGift.friendPromotionIds[i])
                if (isValid(friendGiftResp)) {
                    data.props.friendGift.friendPromotions.push({ value: data.props.friendGift.friendPromotionIds[i], label: friendGiftResp.data[0].promotionName })
                }
            }
        }
        if (newbiePromoLength > 0) {
            for (let i = 0; i < newbiePromoLength; i++) {
                const newbiePromoResp = await promoClient.getPromotionByID(data.props.newbieGift.promotionIds[i])
                if (isValid(newbiePromoResp)) {
                    data.props.newbieGift.newbiePromos.push({ value: data.props.newbieGift.promotionIds[i], label: newbiePromoResp.data[0].promotionName })
                }
            }
        }
    }
    return data;
}

function render(props) {

    const { register, handleSubmit, errors, control, watch } = useForm({
        mode: "onChange",
        defaultValues: props.friendGift || {},
    });
    const { register: register2, handleSubmit: handleSubmit2, errors: errors2, control: control2 } = useForm({
        mode: "onChange",
        defaultValues: props.newbieGift || {},
    });
    const _client = getVoucherClient();
    const { error, warn, info, success } = useToast();
    const [friendLoading, setFriendLoading] = useState(false);
    const [customerLoading, setCustomerLoading] = useState(false);
    const router = useRouter();

    async function createCustomerGift(formData) {
        setCustomerLoading(true);
        const result = await _client.createGift({ newbieGift: formData.newbiePromos?.map(newbiePromo => newbiePromo.value) });
        setCustomerLoading(false);
        if (result.status === "OK") {
            success("Áp dụng mã quà tặng cho khách hàng mới thành công");
        } else {
            error(formatErrorMessage(result));
        }
    }

    async function createFriendGift({ orderQuantity, promotions, friendPromotions }) {
        setFriendLoading(true);
        let friendGift = {
            orderQuantity: +orderQuantity,
            promotionIds: promotions?.map(promotion => promotion.value),
            friendPromotionIds: friendPromotions?.map(friendPromotion => friendPromotion.value),
        };
        const result = await _client.createGift({ friendGift });
        setFriendLoading(false);
        if (result.status === "OK") {
            success("Áp dụng mã quà tặng khi giới thiệu bạn bè thành công");
        } else {
            error(formatErrorMessage(result));
        }
    }

    async function onSubmit(formData) {
        try {
            await createFriendGift(formData);
        } catch (err) {
            setFriendLoading(false);
            error(formatErrorMessage(err));
        }
    }

    async function onSubmit2(formData) {
        try {
            await createCustomerGift(formData);
        } catch (err) {
            setCustomerLoading(false);
            error(formatErrorMessage(err));
        }
    }

    const onSearchVoucher = async (search) => {
        let data = [];
        const voucherClient = getVoucherClient();
        const voucherResp = await voucherClient.getVoucherFromClient(search, 20, 0, true);
        if (voucherResp.status === "OK") {
            data = voucherResp.data.map((voucher) => ({
                value: voucher.code,
                label: voucher.code + " - " + voucher.promotionName,
            }));
        }
        return data;
    };

    let breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing",
        },
        {
            name: "Cài đặt quà tặng",
        },
    ];

    const { promos } = props;

    return (
        <AppMarketing select="/marketing/gift" breadcrumb={breadcrumb}>
            <Head>
                <title>Cài đặt quà tặng</title>
            </Head>
            <MyCard>
                <Grid container direction="column" xs={12} sm={12} md={12} spacing={1}>
                    <Grid item xs={12} sm={12} md={12}>
                        <MyCardHeader title="Mã quà tặng khi giới thiệu bạn bè" />
                        <form>
                            <MyCardContent>
                                <Grid container spacing={2} direction="row" className={styles.contentPadding}>
                                    <Grid item container xs={12} sm={12} md={6}>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <Typography>Số đơn đặt hàng thành công</Typography>
                                            <TextField
                                                name="orderQuantity"
                                                size="small"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                required
                                                fullWidth
                                                error={!!errors.orderQuantity}
                                                helperText={errors.orderQuantity?.message}
                                                inputRef={register({
                                                    required: "Vui lòng nhập số lượng đơn hàng",
                                                })}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} />
                                    <Grid item container xs={12} sm={12} md={6} spacing={3}>
                                        <Grid item xs={12} sm={6} md={12}>
                                            <Typography>Khuyến mãi cho người giới thiệu</Typography>
                                            <MuiMultipleAuto
                                                options={promos}
                                                name="promotions"
                                                placeholder="Chọn"
                                                control={control}
                                                register={register}
                                                errors={errors}
                                                message="Vui lòng chọn"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={12}>
                                            <Typography>Khuyến mãi cho người được giới thiệu</Typography>
                                            <MuiMultipleAuto
                                                options={promos}
                                                name="friendPromotions"
                                                placeholder="Chọn"
                                                register={register}
                                                control={control}
                                                errors={errors}
                                                message="Vui lòng chọn"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Button
                                            disabled={friendLoading}
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSubmit(onSubmit)}
                                            style={{ margin: 8 }}
                                        >
                                            {friendLoading && <CircularProgress size={20} />}
                                            Áp dụng
                                        </Button>
                                    </Grid>
                                </Grid>
                            </MyCardContent>
                        </form>
                    </Grid>
                </Grid>
            </MyCard>
            <MyCard>
                <Grid container direction="column" xs={12} sm={12} md={12} spacing={1}>
                    <Grid item xs={12} sm={12} md={12}>
                        <MyCardHeader title="Mã quà tặng cho khách hàng mới" />
                        <form>
                            <MyCardContent>
                                <Grid container spacing={3} direction="row" className={styles.contentPadding}>
                                    <Grid item container xs={12} sm={12} md={6} spacing={3}>
                                        <Grid item xs={12} sm={6} md={12}>
                                            <Typography>Quà tặng cho khách hàng mới</Typography>
                                            <MuiMultipleAuto
                                                options={promos}
                                                name="newbiePromos"
                                                placeholder="Chọn"
                                                register={register2}
                                                control={control2}
                                                errors={errors2}
                                                message="Vui lòng chọn"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Button
                                            disabled={customerLoading}
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSubmit2(onSubmit2)}
                                            style={{ margin: 8 }}
                                        >
                                            {customerLoading && <CircularProgress size={20} />}
                                            Áp dụng
                                        </Button>
                                    </Grid>
                                </Grid>
                            </MyCardContent>
                        </form>
                    </Grid>
                </Grid>
            </MyCard>
        </AppMarketing>
    );
}
