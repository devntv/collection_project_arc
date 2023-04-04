import cacheData from "memory-cache";

import { getCartClient } from "clients/cart";
import { getProductClient } from "clients/product";
import { CART_PREFIX, CART_PRODUCT_PREFIX, EXPIRED_CACHE } from "config/cache";
import { APIStatus } from "lib/common";

export const getCustomerCart = async ({ ctx, params }) => {
	// const customerCart = cacheData.get(CART_PREFIX + params.accountId);
	// if(customerCart){
	//     return {
	//         status: APIStatus.OK,
	//         data: customerCart,
	//     }
	// }
	const client = getCartClient(ctx, {});
	const newParams = { ...params };
	const cartRes = await client.getCustomerCart(newParams);
	if (cartRes.status === APIStatus.OK) {
		const cartItems = cartRes.data[0].cartItems;
		const n = cartItems.length;
		const codes = new Set();
		for (let i = 0; i < n; i++) {
			const pro = cacheData.get(CART_PRODUCT_PREFIX + cartItems[i].productCode);
			if (pro) {
				cartItems[i].name = pro.name;
			} else {
				codes.add(cartItems[i].productCode);
			}
		}
		if ([...codes].length) {
			const prodNameRes = await getProductNameByCode({
				params: {
					codes: [...codes].join(","),
				},
			});
			if (prodNameRes.status === APIStatus.OK) {
				for (let i = 0; i < n; i++) {
					cartItems[i].name = cartItems[i].name || "";
					for (let j = 0; j < prodNameRes.data.length; j++) {
						if (cartItems[i].productCode === prodNameRes.data[j].code) {
							cartItems[i].name = prodNameRes.data[j].name;
							cacheData.put(
								CART_PRODUCT_PREFIX + cartItems[i].productCode,
								{ code: cartItems[i].productCode, name: res1.data[j].name },
								EXPIRED_CACHE
							);
						}
					}
				}
			}
		}
		// cacheData.put(CART_PREFIX + params.accountId, res.data, EXPIRED_CACHE);
	}
	return res;
};

export const getProductNameByCode = async ({ ctx, params }) => {
	const client = getProductClient(ctx, {});
	const newParams = { ...params };
	const res = await client.getProductNameByCode(newParams);

	return res;
};
