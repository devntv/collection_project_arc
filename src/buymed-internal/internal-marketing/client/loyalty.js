import { constURL } from "../components/component/constant";
import { APIClient } from "@thuocsi/nextjs-components/lib/utils";
import { sanitizeObject } from "utils/Object";

class LoyaltyClient extends APIClient {
    constructor(ctx, data) {
        super(ctx, data);
    }

    createLoyalty(data) {
        return this.callFromClient("POST", `${constURL.PREFIX_CUSTOMER}/loyalty`, data);
    }

    updateLoyalty(data) {
        return this.callFromClient("PUT", `${constURL.PREFIX_CUSTOMER}/loyalty`, data);
    }

    getLoyaltyList(limit, offset, getTotal) {
        return this.callFromNextJS("GET", `${constURL.PREFIX_CUSTOMER}/loyalty/list`, {
            limit,
            getTotal,
            offset,
        });
    }

    getLoyaltyHistoryListByCustomer({getTotal, type, customerID, limit, offset}) {
        const data = { getTotal, type, customerID, limit, offset };
        sanitizeObject(data);
        return this.call("GET", `${constURL.PREFIX_CUSTOMER}/history-loyalty/list`, data);
    }

    getLoyaltyByCode(code) {
        return this.callFromNextJS("GET", `${constURL.PREFIX_CUSTOMER}/loyalty`, { code });
    }

    // getVoucherFromClient(code, limit, offset, getTotal) {
    //     let q = JSON.stringify({ code });
    //     return this.callFromClient("GET", `${constURL.PREFIX_PROMOTION}/voucher`, {
    //         q: q,
    //         limit,
    //         getTotal,
    //         offset,
    //     });
    // }
}

export function getLoyaltyClient(ctx, data) {
    return new LoyaltyClient(ctx, data);
}
