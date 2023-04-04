import {
    APIClient
} from "@thuocsi/nextjs-components/lib/utils";
import {
    constURL
} from "../components/component/constant";



class HistoryVoucherClient extends APIClient {
    getHistoryVoucherList(query, limit, offset, type = "") {
        return this.call("GET", `${constURL.PREFIX_PROMOTION}/voucher/history/list`, {
            q: JSON.stringify(query),
            getTotal: true,
            limit,
            offset,
            type
        });
    }

    getHistoryVoucherByIDs(codes, query) {
      
        return this.call("GET", `${constURL.PREFIX_PROMOTION}/voucher/list`, {
            voucherCodes: codes,
            q: JSON.stringify(query),
            getTotal: true,
            // offset,
        })
    }
}

export function getHistoryVoucherClient(ctx, data) {
    return new HistoryVoucherClient(ctx, data);
}