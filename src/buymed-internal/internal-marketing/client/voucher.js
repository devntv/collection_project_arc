import { constURL } from "../components/component/constant";
import { APIClient } from "@thuocsi/nextjs-components/lib/utils";
import { sanitizeObject } from "utils/Object";
import { constURL as baseURL } from "client/constrant"

const URI = baseURL.PREFIX_PROMOTION;

class VoucherClient extends APIClient {
    constructor(ctx, data) {
        super(ctx, data)
    }

    createVoucher(data) {
        return this.callFromClient(
            "POST",
            `${constURL.PREFIX_PROMOTION}/voucher`, data
        )
    }

    updateVoucher(data) {
        return this.callFromClient(
            "PUT",
            `${constURL.PREFIX_PROMOTION}/voucher`, data
        )
    }

    updateVoucherStatus(voucherId, status) {
        return this.callFromClient(
            "PUT",
            `${constURL.PREFIX_PROMOTION}/voucher/status`, { voucherId, status }
        )
    }

    getVoucherById({ voucherId, voucherCode }) {
        return this.callFromNextJS(
            "GET",
            `${constURL.PREFIX_PROMOTION}/voucher`,
            { voucherId, voucherCode }
        )
    }

    getVoucherList({ search, q, limit, offset, getTotal = true, type = "", sortField = "", sortType = ""}) {
        const data = { search, q, limit, offset, getTotal, type, sortField, sortType };
        sanitizeObject(data);
        if (data.q) data.q = JSON.stringify(data.q);
        return this.call("GET", `${URI}/voucher`, data)
    }

    getVoucherCode(code, limit, offset, getTotal) {
        let q = JSON.stringify({ code })
        return this.callFromNextJS(
            "GET",
            `${constURL.PREFIX_PROMOTION}/voucher`,
            {
                q: q, limit, getTotal, offset
            }
        )
    }

    getVoucherFromClient(code, limit, offset, getTotal) {
        let q = JSON.stringify({ code })
        return this.callFromClient(
            "GET",
            `${constURL.PREFIX_PROMOTION}/voucher`,
            {
                q: q, limit, getTotal, offset
            }
        )
    }

    createGift(data) {
        return this.callFromClient(
            "POST",
            `${constURL.PREFIX_PROMOTION}/gift-setting`,
            data
        )
    }

    getGiftSetting() {
        return this.callFromNextJS(
            "GET",
            `${constURL.PREFIX_PROMOTION}/gift-setting`,
        )
    }

    getListVouchersByCodes(voucherCodes) {
        return this.callFromNextJS(
            "POST",
            `${constURL.PREFIX_PROMOTION}/voucher/list`,
            { voucherCodes }
        )
    }

    deleteAppliedCustomers(voucherId) {
        return this.callFromClient(
            "PUT",
            `${constURL.PREFIX_PROMOTION}/voucher/delete-applied-customers`, { voucherId }
        )
    }


    createUserVoucher(payload) {
        return this.callFromClient(
            "POST",
            `${constURL.PREFIX_PROMOTION}/user-voucher`, payload
        )
    }

    updateUserVoucher(payload) {
        return this.callFromClient(
            "PUT",
            `${constURL.PREFIX_PROMOTION}/user-voucher`, payload
        )
    }

    getUserVoucherList(limit = 20, offset = 0, q = {}, canUse = false, customerIds = []) {
        return this.call(
            "GET",
            `${constURL.PREFIX_PROMOTION}/user-voucher/list`, {
                limit,
                offset,
                q: JSON.stringify(q),
                getTotal: true,
                canUse,
                customerIds
            }
        )
    }

    getUserVoucherListByCustomerIds({customerIds = [], q = {}}) {
        return this.call(
            "GET",
            `${constURL.PREFIX_PROMOTION}/user-voucher/list`, {
                limit: 1000,
                customerIds,
                q: JSON.stringify(q)
            }
        )
    }



}

export function getVoucherClient(ctx, data) {
    return new VoucherClient(ctx, data)
}
