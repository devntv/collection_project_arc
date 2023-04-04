import React from "react";
import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import { isValid, getFirst } from "components/global";
import AppMarketing from "pages/_layout";
import { LoyaltyForm } from "containers/loyalty/LoyaltyForm";
import { getLoyaltyClient } from "client/loyalty";
import { getPromoClient } from "client/promo";
import NotFound from "@thuocsi/nextjs-components/not-found/not-found";
import AuthorizationScreen from "components/authorization-screen";

async function loadDealData(ctx) {
    const { code } = ctx.query;
    const props = {
        promos: [],
        loyalty: {},
    };
    const promoClient = getPromoClient(ctx, {});
    const loyaltyClient = getLoyaltyClient(ctx, props);

    const [loyaltyResp, promoResp] = await Promise.all([
        loyaltyClient.getLoyaltyByCode(code),
        promoClient.getListPromotionByStatus("ACTIVE"),
    ]);

    if (isValid(loyaltyResp)) {
        let loyalty = getFirst(loyaltyResp);
        const promoResp = await promoClient.getPromotionByID(loyalty.promotionId);
        const promo = getFirst(promoResp);
        loyalty.promo = {
            promo,
            label: promo.promotionName,
            value: promo.promotionId,
        };
        props.loyalty = loyalty;
    }
    if (isValid(promoResp))
        promoResp?.data?.forEach((promo) => {
            // if (!!promo.rewards?.[0]?.type) 
            props.promos.push({
                promo,
                label: promo.promotionName,
                value: promo.promotionId,
            })
        })
    props.code = code;
    return {
        props,
    };
}

export function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, async () => {
        return await loadDealData(ctx);
    });
}


const render = (props) => {

    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing",
        },
        {
            name: "Danh sách đổi điểm",
            link: "/marketing/loyalty",
        },
        {
            name: "Cập nhật đổi điểm",
        },
    ];
    return (
        <AuthorizationScreen>
            <AppMarketing breadcrumb={breadcrumb}>
                {!props.loyalty?.code || props.loyalty?.code === "" ? (
                    <NotFound />
                ) : <LoyaltyForm {...props} isUpdate />}
            </AppMarketing>
        </AuthorizationScreen>
    );
};

export default function NewDealPage(props) {
    return renderWithLoggedInUser(props, render);
}
