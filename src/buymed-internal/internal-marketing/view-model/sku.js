export const BrandType = {
    LOCAL: 'LOCAL',
    FOREIGN: 'FOREIGN',
};

export const BranText = {
    [BrandType.LOCAL]: 'Trong nước',
    [BrandType.FOREIGN]: 'Ngoại nhập',
};

export const SellingPriceType = {
    FIXED_REVENUE: 'FIXED_REVENUE',
    FIXED_PRICE: 'FIXED_PRICE',
};

export const SellingPriceText = {
    [SellingPriceType.FIXED_PRICE]: 'Đảm bảo giá bán đến tay người mua',
    [SellingPriceType.FIXED_REVENUE]: 'Đảm bảo doanh thu của người bán',
};

export const SkuIsActive = {
    [true]: "Đang hoạt động",
    [false]: "Không hoạt động",
}

export const SkuType = {
    NORMAL: "NORMAL",
    COMBO: "COMBO",
    DEAL: "DEAL",
}

export const SkuStatus = {
    NORMAL: "NORMAL",
    LIMIT: "LIMIT",
    OUT_OF_STOCK: "OUT_OF_STOCK",
    SUSPENDED: "SUSPENDED",
    STOP_PRODUCING: "STOP_PRODUCING",
    NEAR_EXPIRATION: "NEAR_EXPIRATION",
    GIFT: "GIFT",
}

export const SkuStatusList = [SkuStatus.NORMAL, SkuStatus.LIMIT, SkuStatus.OUT_OF_STOCK, SkuStatus.SUSPENDED, SkuStatus.STOP_PRODUCING, SkuStatus.NEAR_EXPIRATION, SkuStatus.GIFT]

export const SkuStatusText = {
    [SkuStatus.NORMAL]: "Bình thường",
    [SkuStatus.LIMIT]: "Giới hạn",
    [SkuStatus.OUT_OF_STOCK]: "Hết hàng",
    [SkuStatus.SUSPENDED]: "Ngưng bán",
    [SkuStatus.STOP_PRODUCING]: "Ngưng sản xuất",
    [SkuStatus.NEAR_EXPIRATION]: "Gần hết hạn",
    [SkuStatus.GIFT]: "Quà tặng",
}