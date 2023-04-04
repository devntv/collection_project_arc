export const handleSkuInfo = (item) => {
	if(!item){
		return {
			name: "",
			productID: "",
			sku: "",
			price: {
				originalPrice: -1, //Giá gốc
				currentPrice: -1, //Giá sau giảm giá
				percentageDiscount: -1, //Phần trăm giảm giá
			},
			nextPrice: -1, //Giá khi thăng hạng
			tagTime: new Date(),
			tags: [], //danh sách tag của sản phẩm,
			amountInCart: -1, //Số lượng trong giỏ hàng
			volume: "", //Cách thức đóng gói
			manufacturer: "", //Nhà sản xuất
			seller: "",//Nhà bán hàng,
			slug: "",
			imageUrls: [],
			productCode: "",
			lotDates:[],
			status: "",
			type: "",
			statusData: {},
		}
	}
	const { product, skuItem, displayPrice, moreInfo, nextPriceLevel, deal, campaign } = item;
	const sellerInfo = skuItem.sellerInfo || {};
	return { 
		name: product.name,
		productID: product.productID,
		sku: skuItem.sku,
		price: {
			originalPrice: displayPrice ? displayPrice.originalPrice : 0, //Giá gốc
			currentPrice: displayPrice ? displayPrice.currentPrice : 0, //Giá sau giảm giá
			percentageDiscount: displayPrice? displayPrice.percentageDiscount: 0, //Phần trăm giảm giá
		},
		nextPrice: nextPriceLevel ? (nextPriceLevel.price || 0) : 0, //Giá khi thăng hạng
		tagTime: new Date(),
		tags: skuItem.tags, //danh sách tag của sản phẩm,
		amountInCart: moreInfo.amountInCart || -1, //Số lượng trong giỏ hàng
		volume: product.volume, //Cách thức đóng gói
		manufacturer: moreInfo.manufacturer, //Nhà sản xuất
		seller: moreInfo.seller,//Nhà bán hàng,
		slug: skuItem.slug || product.slug,
		imageUrls: product.imageUrls,
		productCode: product.code,
		sellerInfo: handleSellerInfo(sellerInfo),
		lotDates: skuItem.lotDates,
		status: skuItem.status || "",
		type: skuItem.type || "",
		statusData: skuItem.statusData,
		...(campaign && {campaignCode: campaign.campaignCode}),
		...(deal && {dealCode: deal.code}),
		...(campaign && {campaign}),
		...(deal && {deal}),
		isActive: skuItem.isActive
	}
}

export const handleSellerInfo = (sellerInfo) => {
	if(sellerInfo){
		return {
			name: sellerInfo.name || "",
			code: sellerInfo.code,
			sellerType: sellerInfo.sellerType,
			sellerClass: sellerInfo.sellerClass,
			sellerID: sellerInfo.sellerID,
		}
	}
	return {
		name: "",
		code: "",
		sellerType: "",
		sellerClass: "",
		sellerID: 0,
	}

}