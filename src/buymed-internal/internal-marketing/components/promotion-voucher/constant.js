export const constURL = {
  PREFIX_PRODUCT: `/marketplace/product/v2`,
  PREFIX_MASTER: `/core/master-data/v1`,
  PREFIX_PRICING: `/marketplace/pricing/v2`,
  PREFIX_PROMOTION: `/marketplace/promotion/v1`,
  PREFIX_CUSTOMER: `/marketplace/customer/v1`,
  PREFIX_INVOICE: `/accounting/invoice/v1`,
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

export const defaultScope = {
  customerLevel: "CUSTOMER_LEVEL",
  area: "AREA",
  customerScope: "CUSTOMER_SCOPE"
};

export const defaultCondition = {
  productCategory: "PRODUCT_CATEGORY",
  producer: "PRODUCER",
  ingredient: "INGREDIENT",
  productTag: "PRODUCT_TAG",
  product: "PRODUCT",
  noRule: "NO_RULE",
  order: "ORDER_VALUE",
  customer: "CUSTOMER_HISTORY"
};

export const defaultCombinationCondition = {
  or: "OR",
  and: "AND"
}
export const combinationConditionValue = {
  [defaultCombinationCondition.and]: "andConditions",
  [defaultCombinationCondition.or]: "orConditions"
}
export const defaultReward = {
  percentage: "PERCENTAGE",
  absolute: "ABSOLUTE",
  gift: "GIFT",
  point: "POINT",
  all: "ALL",
  percentage_on_product: "PERCENTAGE_ON_PRODUCT",
  absolute_on_product: "ABSOLUTE_ON_PRODUCT",
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
  // {
  //   value: "NO_RULE",
  //   label: "Không điều kiện",
  // },
  {
    value: "PRODUCT_TAG",
    label: "Theo tag sản phẩm",
  },
  {
    value: "PRODUCT",
    label: "Theo sản phẩm",
  },
  {
    value: "ORDER_VALUE",
    label: "Theo đơn hàng",
  },
  {
    value: "CUSTOMER_HISTORY",
    label: "Theo khách hàng",
  },
  // {
  //   value: "PRODUCT_CATEGORY",
  //   label: "Theo danh mục sản phẩm",
  // },
  // {
  //   value: "INGREDIENT",
  //   label: "Theo hoạt chất",
  // },
  // {
  //   value: "PRODUCER",
  //   label: "Theo nhà sản xuất",
  // },
];

export const conditionMap = {
  "PRODUCT_TAG": "Theo tag sản phẩm",
  "PRODUCT": "Theo sản phẩm",
  "ORDER_VALUE": "Theo đơn hàng",
  "CUSTOMER_HISTORY": "Theo khách hàng",
};

export const conditionLabel = {
  [defaultCondition.product]: "Sản phẩm",
  [defaultCondition.productTag]: "Tag sản phẩm",
  [defaultCondition.productCategory]: "Danh mục sản phẩm",
  [defaultCondition.producer]: "Nhà sản xuất",
  [defaultCondition.ingredient]: "Hoạt chất",
}

export const conditionFieldName = {
  [defaultCondition.product]: "productId",
  [defaultCondition.productTag]: "tagCode",
  [defaultCondition.productCategory]: "categoryCode",
  [defaultCondition.producer]: "producerCode",
  [defaultCondition.ingredient]: "ingredientCode",
}

export const combinationCondition = [
  {
    value: "OR",
    label: "OR - Chỉ cần thỏa ít nhất 1 điều kiện",
  },
  {
    value: "AND",
    label: "AND - Phải đáp ứng tất cả các điều kiện",
  },
]

export const rewards = [
  {
    value: "PERCENTAGE",
    label: "Giảm giá theo %",
  },
  {
    value: "ABSOLUTE",
    label: "Giảm giá tuyệt đối",
  },
  {
    value: "GIFT",
    label: "Quà tặng",
  },
  // {
  //   value: "PERCENTAGE_ON_PRODUCT",
  //   label: "Trên sản phẩm: Giảm giá theo %",
  // },
  // {
  //   value: "ABSOLUTE_ON_PRODUCT",
  //   label: "Trên sản phẩm: Giảm giá tuyệt đối",
  // },
  // {
  //   value: "POINT",
  //   label: "Điểm thành viên (loyalty)",
  // },
];

export const rewardMap = {
  "ABSOLUTE": "Giảm giá tuyệt đối",
  "PERCENTAGE": "Giảm giá theo %",
  "ABSOLUTE_ON_PRODUCT": "Trên sản phẩm: Giảm giá tuyệt đối",
  "PERCENTAGE_ON_PRODUCT": "Trên sản phẩm: Giảm giá theo %",
  "GIFT": "Quà tặng",
  "POINT": "Điểm"
}

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


export const defaultPromotionRewardType = {
  ALL: "ALL",
  GIFT: "GIFT",
  DISCOUNT: "DISCOUNT",
};

export const promotionRewardTypes = [
  {
    value: defaultPromotionRewardType.GIFT,
    label: "Chương trình quà tặng"
  },
  {
    value: defaultPromotionRewardType.DISCOUNT,
    label: "Chương trình giảm giá"
  }
]

export const promotionRewardTypeLabel = {
  [defaultPromotionRewardType.GIFT]: "Chương trình quà tặng",
  [defaultPromotionRewardType.DISCOUNT]: "Chương trình giảm giá"
}


export const UserPromotionStatusValue = {
  ACTIVE: "ACTIVE",
  USED: "USED",
  DELETED: "DELETED",
  INACTIVE: "INACTIVE",
}

export const UserPromotionStatusColor = {
  ACTIVE: "blue",
  USED: "green",
  DELETED: "red",
  INACTIVE: "orange",
}

export const UserPromotionStatusLabel = {
  [UserPromotionStatusValue.ACTIVE]: "Chưa sử dụng",
  [UserPromotionStatusValue.USED]: "Đã sử dụng",
  [UserPromotionStatusValue.DELETED]: "Đã xóa",
  [UserPromotionStatusValue.INACTIVE]: "Không được sử dụng"
}

export const UserPromotionStatusOpts = [
  {
    value: UserPromotionStatusValue.ACTIVE,
    label: UserPromotionStatusLabel.ACTIVE
  },
  {
    value: UserPromotionStatusValue.USED,
    label: UserPromotionStatusLabel.USED
  },
  {
    value: UserPromotionStatusValue.DELETED,
    label: UserPromotionStatusLabel.DELETED
  },
]

export const CalculationType = {
  ORIGIN_PRICE: "ORIGIN_PRICE",
  PRICE_AFTER_PROMO: "PRICE_AFTER_PROMO"
}

export const CalculationTypeLabel = {
  [CalculationType.ORIGIN_PRICE]: "Giá trị gốc",
  [CalculationType.PRICE_AFTER_PROMO]: "Giá trị sau KM trước được áp dụng"
}

export const CalculationTypeOpts = [
  {
    value: CalculationType.ORIGIN_PRICE,
    label: CalculationTypeLabel.ORIGIN_PRICE
  },
  {
    value: CalculationType.PRICE_AFTER_PROMO,
    label: CalculationTypeLabel.PRICE_AFTER_PROMO
  }
]

export const ApplyTypeOpts = [
  {
    value: "AUTO",
    label: "Tự động",
  },
  {
    value: "MANUAL",
    label: "Thủ công",
  },
];


export const CustomerApplyTypes = [
  {
    value: "ALL",
    label: "Áp dụng với mọi KH đủ điều kiện"
  },
  {
    value: "MANY",
    label: "Chỉ áp dụng với KH được chỉ định"
  },
]