import { APIClient } from "../lib/utils"
const URI_EQUIPMENT = '/integration/ems/v1'
const URI_ACCOUNT = "/core/account/v1";

import queryString from "query-string";

class EquipmentClient extends APIClient {
    constructor(ctx, data) {
        super(ctx, data)
    }

    getSupplierList = async (params) => {
        return this.call("POST", `${URI_EQUIPMENT}/supplier/list`, params);
    }

    updateSupplier = async (params) => {
        return this.call("PUT", `${URI_EQUIPMENT}/supplier`, params);
    }

    createSupplier = async (params) => {
        return this.call("POST", `${URI_EQUIPMENT}/supplier`, params);
    }

    getDeviceTypeList = async (params) => {
        return this.call("POST", `${URI_EQUIPMENT}/device-type/list`, params);
    }

    updateDeviceType = async (params) => {
        return this.call("PUT", `${URI_EQUIPMENT}/device-type`, params);
    }

    createDeviceType = async (params) => {
        return this.call("POST", `${URI_EQUIPMENT}/device-type`, params);
    }

    getTrademarkList = async (params) => {
        return this.call("POST", `${URI_EQUIPMENT}/trademark/list`, params);
    }

    updateTrademark = async (params) => {
        return this.call("PUT", `${URI_EQUIPMENT}/trademark`, params);
    }

    createTrademark = async (params) => {
        return this.call("POST", `${URI_EQUIPMENT}/trademark`, params);
    }

    getSetting = async (params) => {
        return this.call("GET", `${URI_EQUIPMENT}/setting/all`, params);
    }

    getListEmployee = async (params) => {
		const stringified = queryString.stringify(params);
		return this.call("GET", `${URI_ACCOUNT}/account/list?${stringified}`);
	}

    getDeviceList = async (params) => {
        return this.call("POST", `${URI_EQUIPMENT}/device/list`, params);
    }

    createDevice = async (params) => {
        return this.call("POST", `${URI_EQUIPMENT}/device`, params);
    }

    updateDevice = async (params) => {
        return this.call("PUT", `${URI_EQUIPMENT}/device`, params);
    }

    getUserById =  async (params) => {
        const stringified = queryString.stringify(params);
        const res = await this.call("GET", `${URI_ACCOUNT}/employee-info?${stringified}`)
        return res;
    }

    allocateDevice = async (params) => {
        return this.call("POST", `${URI_EQUIPMENT}/device/allocate`, params);
    }

    revokeDevice = async (params) => {
        return this.call("POST", `${URI_EQUIPMENT}/device/revoke`, params);
    }
}

export function getEquipmentClient(ctx, data) {
    return new EquipmentClient(ctx, data)
}