import {APIClient} from "@thuocsi/nextjs-components/lib/utils";
import {constURL} from "../components/component/constant";


class HistoryLoyaltyClient extends APIClient {
    getHistoryLoyaltyList(query, limit, offset) {
        return this.callFromNextJS("GET", `${constURL.PREFIX_CUSTOMER}/history-loyalty/list`, {
            q: JSON.stringify(query),
            limit,
            getTotal: true,
            offset,
        });
    }
}

export function getHistoryLoyaltyClient(ctx, data) {
    return new HistoryLoyaltyClient(ctx, data);
}
