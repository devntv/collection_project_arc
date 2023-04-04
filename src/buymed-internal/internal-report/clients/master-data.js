import { APIClient } from "../lib/utils";

const URI = "/core/master-data/v1";
class MasterDataClient extends APIClient {
	constructor(ctx, data) {
		super(ctx, data);
	}
	getProvinces({ offset, limit = 20, getTotal = false, q, codes }) {
		return this.call("GET", `${URI}/province/list`, { offset, limit, getTotal, q, codes });
	}
	getProvinceByCode(params) {
		return this.call("GET", `${URI}/province`, params);
	}
	getDistrictByCode(params) {
		return this.call("GET", `${URI}/district`, params);
	}
	getWardByCode(params) {
		return this.call("GET", `${URI}/ward`, params);
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
}

export function getMasterDataClient(ctx, data) {
	return new MasterDataClient(ctx, data);
}
