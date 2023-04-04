import { APIClient } from "@thuocsi/nextjs-components/lib/utils";
import moment from "moment";
import { sanitizeObject } from "utils/Object";
const URI = `/marketplace/order/v2`
const URIV2 = `/marketplace/order/v2`
// const URI = ``

class OrderClient extends APIClient {

    constructor(ctx, data) {
        super(ctx, data)
    }

    getOrder(offset, limit, q) {
        return this.callFromNextJS(
            "GET",
            `${URI}/order/list`,
            {
                q: q,
                offset: offset,
                limit: limit,
                // getTotal: true
            })
    }

    getOrderV2(filter, offset, limit, skuCode, sort) {

        // clone to new object to avoid modify raw value
        let obj = {}
        for (let key in filter) {
            obj[key] = filter[key]
        }
        if (obj.timeFrom && obj.timeFrom.indexOf("+") < 0) {
            obj.timeFrom = new Date(obj.timeFrom + "+07:00").toISOString()
        }
        if (obj.timeTo && obj.timeTo.indexOf("+") < 0) {
            obj.timeTo = new Date(obj.timeTo + "+07:00").toISOString()
        }
        let json = JSON.stringify(obj)

        return this.call(
            "GET",
            `${URIV2}/order/list`,
            {
                q: json,
                offset: offset,
                limit: limit,
                getTotal: true,
                skuCode,
                sort,
            })
    }

    getOrderDetailV2(data) {
        sanitizeObject(data);
        return this.call(
            "GET",
            `${URIV2}/order`,
            {
                q: JSON.stringify(data),
            })
    }

    getOrderItem(query) {
        sanitizeObject(query);
        return this.call(
            "GET",
            `${URIV2}/order-item/list?q=${JSON.stringify(query)}`
        )
    }

    getOrderItemList({ q = "", offset = 0, limit = 0, getTotal = true }) {
        return this.call(
            "GET", `${URIV2}/order-item/list`, {
            q: q,
            offset,
            limit,
            getTotal
        })
    }

    getOrderList({ q, offset, limit, getTotal = true, ids }) {
        const data = { q, offset, limit, getTotal, ids };
        sanitizeObject(data);
        if (data.q) {
            if (q.timeFrom) q.timeFrom = moment(q.timeFrom).toISOString();
            if (q.timeTo) q.timeTo = moment(q.timeTo).toISOString();
            data.q = JSON.stringify(data.q)
        }
        return this.call("GET", `${URIV2}/order/list`, data)
    }

    getOrderByOrderIds(ids) {
        return this.call("GET", `${URIV2}/order/list`, {
            ids: ids
        })
    }

    getOrderHasVoucher(query, limit, offset) {
        return this.call("GET", `${URI}/order/list`, {
            getTotal: true,
            hasVoucher: true,
            q: JSON.stringify(query),
            limit,
            offset,
        });
    }

}

export function getOrderClient(ctx, data) {
    return new OrderClient(ctx, data)
}
