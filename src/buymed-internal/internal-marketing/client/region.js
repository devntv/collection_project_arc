import {APIClient} from "@thuocsi/nextjs-components/lib/utils";

const prefix = `/core/master-data/v1`

class RegionClient extends APIClient {
    
    constructor(ctx, data) {
        super(ctx, data)
    }
    
    getListRegion(offset, limit, q) {
        let data = {
            offset: offset,
            limit: limit,
            getTotal: true
        }
        if (typeof (q) !== "undefined" && q !== null) {
            data.q = q
        }
        return this.call("GET", `${prefix}/region/list`, data)
    }
    
    getRegionsByMultiCode(data) {
        return this.callFromNextJS(
            "POST",
            `${prefix}/region/list`, {
                codes: data
            });
    }
    
    getRegionByRegionCode(regionCode) {
        return this.callFromNextJS(
            "GET",
            `${prefix}/region`, {
                regionCode: regionCode,
            }
        )
    }
    
    getListProvince(offset = 0, limit = 1000, q) {
        let data = {
            offset: offset,
            limit: limit,
            getTotal: true,
        }
        if (typeof (q) !== "undefined" && q !== null) {
            data.q = q
        }
        return this.callFromNextJS("GET", `${prefix}/province/list`, data)
    }
    
    createRegion(body) {
        return this.callFromClient(
            "POST",
            `${prefix}/region`,
            body
        )
    }
    
    updateRegion(data) {
        return this.callFromClient(
            "PUT",
            `${prefix}/region`,
            data
        )
    }
    
}

export function getRegionClient(ctx, data) {
    return new RegionClient(ctx, data)
}