import { APIClient } from "../lib/utils"
const URI = '/marketplace/order/v2'
class OrderClient extends APIClient {
    constructor(ctx, data) {
        super(ctx, data)
    }

    getCustomerOrder(params) {
        return this.call("GET", `${URI}/order/list`, params);
    }

    searchCustomerOrderById(params) {
        return this.call("GET", `${URI}/order/search`, params);
    }
}

export function getOrderClient(ctx, data) {
    return new OrderClient(ctx, data)
}