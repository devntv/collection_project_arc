import { APIClient } from "@thuocsi/nextjs-components/lib/utils";
const URI = `/core/master-data/v1`
// const URI = ``

class MasterDataClient extends APIClient {

    constructor(ctx, data) {
        super(ctx, data)
    }

    getProvince(offset, limit, q, codes, getTotal = true) {
        return this.call(
            "GET",
            `${URI}/province/list`,
            {
                q: q,
                codes,
                offset: offset,
                limit: limit,
                getTotal,
            })
    }

    getProvinceFromClient(offset, limit, q, getTotal = true) {
        return this.callFromClient(
            "GET",
            `${URI}/province/list`,
            {
                q: q,
                offset: offset,
                limit: limit,
                getTotal,
            })
    }

    getDistrictByProvinceCode(provinceCode) {
        return this.callFromClient(
            "GET",
            `${URI}/district`,
            {
                provinceCode: provinceCode
            })
    }

    getDistrictByProvinceCodeFromNextJs(provinceCode) {
        return this.callFromNextJS(
            "GET",
            `${URI}/district`,
            {
                provinceCode: provinceCode
            })
    }

    getWard(wardCodes = "", limit) {
        return this.call(
            "GET",
            `${URI}/ward/list`,
            {
                wardCodes,
                limit,
            })
    }


    getWardByDistrictCode(districtCode) {
        return this.callFromClient(
            "GET",
            `${URI}/administrative/list`,
            {
                districtCode: districtCode
            })
    }

    getWardByDistrictCodeFromNextJS(districtCode) {
        return this.callFromNextJS(
            "GET",
            `${URI}/administrative/list`,
            {
                districtCode: districtCode
            })
    }

    getProvinceByProvinceCode(provinceCode) {
        return this.call(
            "GET",
            `${URI}/province`,
            {
                code: provinceCode
            })
    }

    getDistrictList(offset, limit, q, codes, getTotal = true) {
        return this.call(
            "GET",
            `${URI}/district/list`,
            {
                q,
                codes,
                offset,
                limit,
                getTotal
            })
    }

    getDistrictByDistrictCode(districtCode) {
        return this.call(
            "GET",
            `${URI}/district`,
            {
                code: districtCode
            })
    }

    getWardByWardCode(wardCode) {
        return this.call(
            "GET",
            `${URI}/administrative/list`,
            {
                wardCode: wardCode
            })
    }

    getWardByWardCodeFromClient(wardCode) {
        return this.callFromClient(
            "GET",
            `${URI}/administrative/list`,
            {
                wardCode: wardCode
            })
    }

    getRegion(offset, limit, q, getTotal = true) {
        return this.call(
            "GET",
            `${URI}/region/list`,
            {
                q: q,
                offset: offset,
                limit: limit,
                getTotal,
            })
    }

    
    getListBank(q = "", offset = 0, limit = 100) {
        return this.callFromClient("GET", `${URI}/bank/list`, {
            q, offset, limit
        })
    }

    getListBankBranch(q = "", bankId, offset = 0, limit = 20) {
        return this.callFromClient("GET", `${URI}/bank-branch/list`, {
            q, bankId, offset, limit
        })
    }
}

export function getMasterDataClient(ctx, data) {
    return new MasterDataClient(ctx, data)
}
