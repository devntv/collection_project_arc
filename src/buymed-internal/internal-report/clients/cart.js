import { APIClient } from "lib/utils";
const URI = "/marketplace/order/v2/cart";
const URI_CART_ITEM = "/marketplace/order/v2/cart-item";

class CartClient extends APIClient {
	constructor(ctx, data) {
		super(ctx, data);
	}

	getCustomerCart(params) {
		return this.call("GET", `${URI}`, params);
	}

	getProductAmountInCart(params) {
		return this.call("GET", `${URI}`, params);
	}
}

export function getCartClient(ctx, data) {
	return new CartClient(ctx, data);
}
