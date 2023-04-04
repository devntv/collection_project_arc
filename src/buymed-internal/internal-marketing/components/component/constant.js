export const constURL = {
  PREFIX_PRODUCT: `/marketplace/product/v2`,
  PREFIX_MASTER: `/core/master-data/v1`,
  PREFIX_PRICING: `/marketplace/pricing/v2`,
  PREFIX_PROMOTION: `/marketplace/promotion/v1`,
  PREFIX_CUSTOMER: `/marketplace/customer/v1`,
  PREFIX_INVOICE: `/accounting/invoice/v1`,
  PREFIX_MARKETING: `/marketplace/marketing/v1`,
};

export const queryParamGetProductGift = "GIFT";

export const defaultPromotionType = {
  COMBO: "COMBO",
  VOUCHER_CODE: "VOUCHERCODE",
  FREESHIP: " FREESHIP",
  PROMOTION: "PROMOTOTION",
};

export const defaultPromotionScope = {
  GLOBAL: "GLOBAL",
  SELLER: "SELLER",
  CATEGORY: "CATEGORY",
  PRODUCT: "PRODUCT",
  SKU: "SKU",
  AREA: "AREA",
  CUSTOMER: "CUSTOMER_LEVEL",
};

export const defaultPromotionStatus = {
  WAITING: "WAITING",
  ACTIVE: "ACTIVE",
  FULL: "FULL",
  HIDE: "HIDE",
  EXPIRED: "EXPIRED",
  DELETED: "DELETED",
};

export const defaultRulePromotion = {
  MIN_QUANTITY: "MIN_QUANTITY",
  MIN_ORDER_VALUE: "MIN_ORDER_VALUE",
};

export const defaultTypeConditionsRule = {
  DISCOUNT_ORDER_VALUE: "VALUE",
  GIFT: "GIFT",
  PRODUCT_GIFT: "PRODUCT_GIFT",
  DISCOUNT_PERCENT: "PERCENT",
};

export const defaultTypeProduct = {
  ALL: "ALL",
  MANY: "MANY",
};

export const defaultUseTypePromotion = {
  ALONE: "ALONE",
  MANY: "MANY",
};

export const defaultNameRulesValue = {
  priceMinValue: "priceMinValue",
  priceMinValuePercent: "priceMinValuePercent",
  priceMaxDiscountValue: "priceMaxDiscountValue",
  percentValue: "percentValue",
  priceDiscountValue: "priceDiscountValue",
  gift: "gift",
  productGift: "productGift",
};

export const defaultNameRulesQuantity = {
  priceMinValue: "minQuantity",
  priceMinValuePercent: "quantityMinValuePercent",
  priceMaxDiscountValue: "quantityMaxDiscountValue",
  percentValue: "quantityPercentValue",
  priceDiscountValue: "quantityDiscountValue",
  gift: "quantityGift",
  productGift: "quantityProductGift",
};

export const defaultConditionInfo = {
  percent: "percent",
  maxDiscountValue: "maxDiscountValue",
  minOrderValue: "minOrderValue",
  minQuantity: "minQuantity",
  discountValue: "discountValue",
  products: "products",
};

// export const defaultScope = {
//   customerLevel: "CUSTOMER_LEVEL",
//   area: "AREA",
// };

export const defaultScope = {
  sellerCodes: "SELLERCODES",
	customerScopes: "CUSTOMERSCOPES",
	regions: "REGIONS",
};

export const defaultCondition = {
  productCategory: "PRODUCT_CATEGORY",
  producer: "PRODUCER",
  ingredient: "INGREDIENT",
  productTag: "PRODUCT_TAG",
  product: "PRODUCT",
  noRule: "NO_RULE",
};

// export const defaultReward = {
//   percentage: "PERCENTAGE",
//   absolute: "ABSOLUTE",
//   gift: "GIFT",
//   point: "POINT",
// };

export const defaultReward = {
  percentageDiscount: "percentageDiscount",
  absoluteDiscount: "absoluteDiscount",
  maxDiscount: "maxDiscount",
};

export const defaultPromotion = {
  MARKETPLACE: "MARKETPLACE",
  SELLER: "SELLER",
  COORPORATE: "COORPORATE",
};

export const scopes = [
  {
    value: "",
    label: "Chọn loại phạm vi",
  },
  {
    value: "PRODUCT",
    label: "Theo sản phẩm",
  },
  {
    value: "AREA",
    label: "Theo khu vực",
  },
];

export const conditions = [
  {
    value: "PRODUCT_TAG",
    label: "Theo tag sản phẩm",
  },
  {
    value: "PRODUCT",
    label: "Theo sản phẩm",
  },
  {
    value: "PRODUCT_CATEGORY",
    label: "Theo danh mục sản phẩm",
  },
  {
    value: "INGREDIENT",
    label: "Theo hoạt chất",
  },
  {
    value: "PRODUCER",
    label: "Theo nhà sản xuất",
  },
  {
    value: "NO_RULE",
    label: "Không điều kiện",
  },
];

// export const rewards = [
//   {
//     value: "",
//     label: "Chọn loại khuyến mãi",
//   },
//   {
//     value: "PERCENTAGE",
//     label: "Giảm giá theo %",
//   },
//   {
//     value: "ABSOLUTE",
//     label: "Giảm giá tuyệt đối",
//   },
//   {
//     value: "GIFT",
//     label: "Quà tặng",
//   },
//   {
//     value: "POINT",
//     label: "Điểm thành viên (loyalty)",
//   },
// ];

export const rewards = [
  {
    value: "UNLIMIT",
    label: "Không giới hạn",
  },
  {
    value: "PERCENTAGE",
    label: "Theo phần trăm",
  },
  {
    value: "ABSOLUTE",
    label: "Theo giá trị giảm",
  },
  {
    value: "PRICE",
    label: "Theo giá sản phẩm",
  },
];

export const promotions = [
  {
    value: defaultPromotion.MARKETPLACE,
    label: "Chương trình riêng của sàn",
  },
  {
    value: defaultPromotion.COORPORATE,
    label: "Chương trình hợp tác của 2 bên",
  },
];

export const promotionTypes = [
  {
    value: defaultPromotionType.VOUCHER_CODE,
    label: "Thông qua mã khuyến mãi",
  },
  {
    value: defaultPromotionType.COMBO,
    label: "Tự động áp dụng",
  },
];

export const listTimeSlot = [
	{
		value: "0600-1159",
		label: "6h00 - 11h59"
	},
	{
		value: "1200-1759",
		label: "12h00 - 17h59",
	},
	{
		value: "1800-2400",
		label: "18h00 - 24h00",
	},
]

export const WEB_THUOCSI_HOST = process.env.NEXT_PUBLIC_WEB_THUOCSI_HOST;


export const chargeFeeOption = [
  { label: "Thuốc sỉ", value: "MARKETPLACE" },
  { label: "Nhà bán hàng", value: "SELLER" }
]

export const internalSellerCodes = ["MEDX", "MARKETING", "MEDX_E", "MEDX-HN"]