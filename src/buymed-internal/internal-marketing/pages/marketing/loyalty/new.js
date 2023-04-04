import React from "react";
import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";

import AppMarketing from "pages/_layout";
import { LoyaltyForm } from "containers/loyalty/LoyaltyForm";
import { getPromoClient } from "client/promo";
import { isValid } from "components/global";
import AuthorizationScreen from "components/authorization-screen";

async function loadLoyaltyData(ctx) {
    const props = {
        promos: [],
    };
    const promoClient = getPromoClient(ctx, {});
    const promoResp = await promoClient.getListPromotionByStatus("ACTIVE");
    if (isValid(promoResp))
        promoResp?.data?.forEach((promo) => {
            // if (!!promo.rewards?.[0]?.type) ;
            props.promos.push({
                promo,
                label: promo.promotionName,
                value: promo.promotionId,
            })
        })
    return {
        props,
    };
}

export function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, () => loadLoyaltyData(ctx));
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
            name: "Thêm đổi điểm"
        },
    ];
    return (
        <AuthorizationScreen>
            <AppMarketing breadcrumb={breadcrumb}>
                <LoyaltyForm {...props} />
            </AppMarketing>
        </AuthorizationScreen>
    );
};

export default function NewDealPage(props) {
    return renderWithLoggedInUser(props, render);
}
