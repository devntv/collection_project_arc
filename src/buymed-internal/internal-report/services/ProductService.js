import cacheData from "memory-cache";
import getConfig from "next/config";

import { getProductClient } from "clients/product";
import { MANUFACTURE_PREFIX, SELLER_PREFIX, EXPIRED_CACHE } from "config/cache";
import { APIStatus } from "lib/common";
import { isNil } from "utilities";
import { getCustomerCart } from "./CartService";

const isUpdatingText = "Đang cập nhật";

export const DEAL_STATUS = {
	ACTIVE: "ACTIVE",
	INACTIVE: "INACTIVE",
};

export const getSeller = async (products, client) => {
	const n = products.length;
	let sellerCodes = new Set();
	for (let i = 0; i < n; i++) {
		if (products[i].skuItem.sellerCode) {
			const sellerCache = cacheData.get(SELLER_PREFIX + products[i].skuItem.sellerCode);
			if (!sellerCache) {
				sellerCodes.add(products[i].skuItem.sellerCode);
			} else {
				products[i].moreInfo.seller = sellerCache.name;
			}
		}
	}
	sellerCodes = Array.from(sellerCodes);
	if (sellerCodes.length) {
		const sellerRes = await client.getSeller({
			sellerCodes: sellerCodes.join(","),
		});
		if (sellerRes.status === APIStatus.OK) {
			const { data: sellerData } = sellerRes;
			sellerData.forEach((item, index) => {
				cacheData.put(SELLER_PREFIX + item.code, item, EXPIRED_CACHE);
				for (let i = 0; i < n; i++) {
					if (products[i].skuItem.sellerCode === item.code) {
						products[i].moreInfo.seller = item.name;
						products[i].moreInfo.sellerType = item.sellerType;
					}
				}
			});
		}
	}
};

const isInUseDeal = (deal) => {
	return deal.canUse;
	const d = new Date();
	if (!deal.endTime) {
		return false;
	}
	const end = new Date(deal.endTime);
	if (!deal.readyTime && !deal.startTime) {
		return false;
	}
	const ready = new Date(deal.readyTime || deal.startTime);
	return (
		deal.status === DEAL_STATUS.ACTIVE &&
		d.getTime() <= end.getTime() &&
		d.getTime() >= ready.getTime()
	);
};
const findDiscountPercent = (salePrice, displayPrice) => {
	if (salePrice === displayPrice || displayPrice > salePrice) return 0;
	let percentDiscountProduct = ((salePrice - displayPrice) / salePrice) * 100;
	if (percentDiscountProduct > 100) percentDiscountProduct = 100;
	return Math.floor(percentDiscountProduct);
};

export const handleProductPrice = (product) => {
	const price = {};
	if (product.sku) {
		price.originalPrice =
			product.sku.retailPriceValue || product.sku.purchasePrice || product.sku.rawPrice;
	} else if (product.skuItem) {
		price.originalPrice =
			product.skuItem.retailPriceValue ||
			product.skuItem.purchasePrice ||
			product.skuItem.rawPrice;
	} else {
		price.originalPrice = 0;
	}
	price.currentPrice = price.originalPrice;
	price.percentageDiscount = 0;
	if (product.campaign && product.campaign.isActive && product.campaign.isValid) {
		price.originalPrice = product.campaign.price;
		price.currentPrice = product.campaign.retailPriceValue;
		// price.percentageDiscount = product.campaign.percentageDiscount || (Math.round((price.originalPrice - price.currentPrice)/price.originalPrice * 100));
	}
	if (product.deal && isInUseDeal(product.deal)) {
		price.currentPrice = product.deal.price;
		if (product.deal.name) {
			product.product.name = product.deal.name;
		}
		if (product.deal.imageUrls && product.deal.imageUrls.length) {
			product.product.imageUrls = product.deal.imageUrls;
		}
		// price.percentageDiscount = product.deal.percentageDiscount || (Math.round((price.originalPrice - price.currentPrice)/price.originalPrice * 100));
	}
	price.percentageDiscount = findDiscountPercent(price.originalPrice, price.currentPrice);
	return price;
};

const getPrice = async (products, client, customerID) => {
	const n = products.length;
	for (let i = 0; i < n; i++) {
		const product = products[i];
		const res = await client.getProductDetail({
			employeeViewCustomerID: customerID,
			q: product.skuItem.slug,
		});
		let price = {};
		if (res.status === APIStatus.OK) {
			const product = res.data[0];
			price = handleProductPrice(product);
		}
		products[i].displayPrice = price;
	}
};

export const getManufacturer = async (products, client) => {
	const n = products.length;
	let manufacturerCodes = new Set();
	for (let i = 0; i < n; i++) {
		if (products[i].product.manufacturerCode) {
			const manufacturerCache = cacheData.get(
				MANUFACTURE_PREFIX + products[i].product.manufacturerCode
			);
			if (!manufacturerCache) {
				manufacturerCodes.add(products[i].product.manufacturerCode);
			} else {
				products[i].moreInfo.manufacturer = manufacturerCache.name;
			}
		}
	}
	manufacturerCodes = Array.from(manufacturerCodes);
	if (manufacturerCodes.length) {
		const manufacturerRes = await client.getManufacturer({
			codes: manufacturerCodes.join(","),
		});
		if (manufacturerRes.status === APIStatus.OK) {
			const { data: manufacturerData } = manufacturerRes;
			manufacturerData.forEach((item, index) => {
				cacheData.put(MANUFACTURE_PREFIX + item.code, item, EXPIRED_CACHE);
				for (let i = 0; i < n; i++) {
					if (products[i].product.manufacturerCode === item.code) {
						products[i].moreInfo.manufacturer = item.name;
					}
				}
			});
		}
	}
};

export const getAmountInCart = async (products, accountID) => {
	const n = products.length;
	let cartItems = null;
	const res = await getCustomerCart({
		params: {
			accountId: accountID,
		},
	});
	if (res.status === APIStatus.OK) {
		cartItems = res.data[0].cartItems || [];
	}
	if (cartItems) {
		for (let j = 0; j < cartItems.length; j++) {
			for (let i = 0; i < n; i++) {
				const product = products[i];
				product.moreInfo.amountInCart = -1;
				if (product.skuItem.sku === cartItems[j].sku) {
					product.moreInfo.amountInCart = cartItems[j].quantity;
				}
			}
		}
	}
};

export const searchProduct = async ({ ctx, data, customerID, accountID }) => {
	const client = getProductClient(ctx, {});
	const res = await client.searchProduct({
		...data,
		offset: data.offset || (data.page && data.limit ? (data.page - 1) * data.limit : 0),
	});

	//call other API to get all infomation
	if (res.status === APIStatus.OK) {
		const data = res.data;
		const n = data.length;
		for (let i = 0; i < n; i++) {
			data[i].moreInfo = {
				seller: isUpdatingText,
				manufacturer: isUpdatingText,
			};
		}
		if (customerID) {
			await getPrice(data, client, customerID);
		}
		if (accountID) {
			await getAmountInCart(data, accountID);
		}
		await getSeller(data, client);
		await getManufacturer(data, client);
	}
	return res;
};

export const getProductByCode = async ({ ctx, data, customerID, accountID }) => {
	return await searchProduct({
		ctx,
		customerID,
		data,
		accountID,
	});
};

export const getProductBySlug = async ({ ctx, data, customerID, accountID }) => {
	const client = getProductClient(ctx, {});
	const res = await client.getProductDetail({
		employeeViewCustomerID: customerID,
		q: data.slug,
	});
	const price = {};
	if (res.status === APIStatus.OK) {
		res.data[0].moreInfo = {
			seller: isUpdatingText,
			manufacturer: isUpdatingText,
		};
		res.data[0].skuItem = res.data[0].sku;
		await getSeller(res.data, client);
		await getManufacturer(res.data, client);
		const product = { ...res.data[0] };
		const price = handleProductPrice(product);
		// price.originalPrice = product.sku.retailPriceValue || product.sku.purchasePrice || product.sku.rawPrice;
		// price.currentPrice = price.originalPrice;
		// price.percentageDiscount = 0;
		// if(product.campaign){
		//     price.currentPrice = product.campaign.retailPriceValue || product.campaign.price;
		//     price.percentageDiscount = product.campaign.percentageDiscount;
		// }
		// if(product.deal){
		//     price.currentPrice = product.deal.retailPriceValue || product.deal.price;
		//     price.percentageDiscount = product.campaign.percentageDiscount || (Math.round((price.originalPrice - price.currentPrice)/price.originalPrice * 100));
		// }
		res.data[0].displayPrice = price;
	}
	return res;
};

export async function getProductForFilter({ ctx, params }) {
	const client = getProductClient(ctx, {});

	const newParams = { ...params };

	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}

	const res = await client.searchProduct(newParams);

	return {
		data: res,
	};
}

export const getTags = async ({ ctx }) => {
	const client = getProductClient(ctx, {});
	const res = await client.getTags({
		offset: 0,
		limit: 1,
		getTotal: true,
		total: true,
	});

	if (res.status === APIStatus.OK) {
		const { total = 0 } = res || {};
		const getAllTags = [];
		let data = [];
		for (let i = 0; i < total; i += 50) {
			getAllTags.push(client.getTags({ offset: i, limit: 50 }));
		}
		const resTags = await Promise.all(getAllTags);
		resTags.map((resTagItem) => {
			if (resTagItem?.status === APIStatus.OK) {
				data = data.concat(resTagItem?.data || []);
			}
		});

		return data;
	}
	return [];
};
