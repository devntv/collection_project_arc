import { APIClient } from "@thuocsi/nextjs-components/lib/utils";
const prefix = "/marketplace/product/v2"
class Common extends APIClient {

    constructor(ctx, data) {
        super(ctx, data)
    }

    getDataWithSearchKey(offset, limit, q, urlQuery) {
        return this.callFromClient(
            "GET",
            `${prefix}${urlQuery}`, {
                q: q,
                offset: offset,
                limit: limit,
                getTotal: true
            })
    }

    uploadImage(data) {
        return this.callFromClient(
            "POST",
            `${prefix}/upload`, data)
    }
}

export function getCommonClient(ctx, data) {
    return new Common(ctx, data)
}