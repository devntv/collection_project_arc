import { APIClient } from "@thuocsi/nextjs-components/lib/utils";
import { sanitizeObject } from "utils/Object";
import { constURL } from "./constrant";

const PREFIX = constURL.PREFIX_PRODUCT;

class DealClient extends APIClient {
    constructor(ctx, data) {
        super(ctx, data);
    }

    getDealList({
        search,
        offset,
        limit,
        q,
        dealType,
        status,
        getTotal = false,
    }) {
        const data = {
            search,
            offset,
            limit,
            q,
            dealType,
            status,
            getTotal
        };
        sanitizeObject(data);
        if (data.q) data.q = JSON.stringify(data.q);
        return this.call("GET", `${PREFIX}/deal/list`, data)
    }

    getDealByCode({ q }) {
        return this.call(
            "GET",
            `${PREFIX}/deal`, {
            q
        }
        )
    }

    createDeal(data) {
        sanitizeObject(data);
        return this.callFromClient("POST", `${PREFIX}/deal`, data)
    }

    updateDeal(data) {
        sanitizeObject(data);
        return this.callFromClient("PUT", `${PREFIX}/deal`, data)
    }

    updateDealStatus({
        code,
        status,
    }) {
        return this.callFromClient(
            "PUT",
            `${PREFIX}/deal/status`,
            {
                code,
                status,
            }
        )
    }

    importDeal(data) {
        sanitizeObject(data);
        return this.callFromClient("POST", `${PREFIX}/deal/import`, data)
    }

    getImportDeal(q = "") {
        return this.call("GET", `${PREFIX}/import-result`, {
            q: JSON.stringify(q),
        })
    }

    getListImportDeal({ offset = 0, limit = 20, q = "" }) {
        return this.call("GET", `${PREFIX}/list-import-result`, {
            q: JSON.stringify(q),
            offset: offset,
            limit: limit,
            getTotal: true
        })
    }

    getListImportDetail({ offset = 0, limit = 0, q = "", isFailedOnly = false }) {
        return this.call("GET", `${PREFIX}/import-result-detail/list`, {
            isFailedOnly,
            q: JSON.stringify(q),
            offset: offset,
            limit: limit,
            getTotal: true
        })
    }
}

export function getDealClient(ctx, data) {
    return new DealClient(ctx, data);
}