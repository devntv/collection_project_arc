import { APIClient } from "@thuocsi/nextjs-components/lib/utils";
import { constURL } from "../components/component/constant";

class PromoClient extends APIClient {
    constructor(ctx, data) {
        super(ctx, data);
    }

    createPromotion(data) {
        return this.callFromClient("POST", `${constURL.PREFIX_PROMOTION}/promotion`, data);
    }

    updatePromotion(data) {
        return this.callFromClient("PUT", `${constURL.PREFIX_PROMOTION}/promotion`, data);
    }

    updateStatusPromotion(data) {
        return this.callFromClient("PUT", `${constURL.PREFIX_PROMOTION}/promotion/status`, data);
    }

    getPromotionByID(promotionId) {
        return this.call("GET", `${constURL.PREFIX_PROMOTION}/promotion`, { promotionId });
    }

    getPromotionByIDs(promotionIds){
        return this.call("GET", `${constURL.PREFIX_PROMOTION}/promotion/list`, {
            promotionIds,

        })
    }

    getPromotionListByIDsFromClient(promotionIDs) {
        let q = JSON.stringify({ listIds: promotionIDs });
        return this.callFromClient("GET", `${constURL.PREFIX_PROMOTION}/promotion`, { q });
    }

    getPromotionByIDFromClient(promotionId) {
        return this.callFromClient("GET", `${constURL.PREFIX_PROMOTION}/promotion`, { promotionId });
    }

    getPromotion(promotionName, limit, offset, getTotal, listStatus, listIds) {
        let q = JSON.stringify({ promotionName, listStatus, listIds });
        return this.call("GET", `${constURL.PREFIX_PROMOTION}/promotion`, {
            q: q,
            limit,
            getTotal,
            offset,
        });
    }

    getPromotionList(limit, offset, query, search = "") {
        let q = JSON.stringify({...query});
        return this.callFromNextJS("GET", `${constURL.PREFIX_PROMOTION}/promotion/list`, {
            q: q,
            search,
            limit,
            getTotal: true,
            offset,
        });
    }


    getPromotionFromClient(promotionName, limit, offset, getTotal, listStatus) {
        let q = JSON.stringify({ promotionName, listStatus });
        return this.callFromClient("GET", `${constURL.PREFIX_PROMOTION}/promotion`, {
            q: q,
            limit,
            getTotal,
            offset,
        });
    }
    getListPromotionByStatus(status) {
        let q = JSON.stringify({ status });
        return this.callFromNextJS("GET", `${constURL.PREFIX_PROMOTION}/promotion`, {
            q: q,
            offset: 0,
            limit: 1000,
        });
    }

    copyPromotion(promotionId) {
        return this.callFromClient("POST", `${constURL.PREFIX_PROMOTION}/promotion/promotion-copy`, { 
            promotionId 
        });
    }

    // TODO
}

export function getPromoClient(ctx, data) {
    return new PromoClient(ctx, data);
}
