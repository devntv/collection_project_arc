import { FormCommonValidator } from "utils/HookForm";

export const DealType = {
    DEAL: "DEAL",
    COMBO: "COMBO",
};

export const DealTypeLabel = {
    [DealType.DEAL]: "Khuyến mãi",
    [DealType.COMBO]: "Combo",
};

export const DealTypeOptions = Object.keys(DealType).map((key) => ({
    value: DealType[key],
    label: DealTypeLabel[DealType[key]],
}));

export const DealStatus = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
};

export const DealStatusLabel = {
    [DealStatus.ACTIVE]: "Đang hoạt động",
    [DealStatus.INACTIVE]: "Không hoạt động",
};

export const DealStatusOptions = Object.keys(DealStatus).map((key) => ({
    value: DealStatus[key],
    label: DealStatusLabel[DealStatus[key]],
}));

export const DealFlashSaleLabel = {
    [true]: "Bật flash sale",
    [false]: "Tắt flash sale",
};

export const PricingType = {
    PERCENTAGE: "PERCENTAGE",
    ABSOLUTE: "ABSOLUTE",
}

export const PricingTypeLabel = {
    [PricingType.ABSOLUTE]: "Giảm giá tuyệt đối",
    [PricingType.PERCENTAGE]: "Giảm giá theo %",
}

export const PricingTypeOptions = Object.keys(PricingType).map((key) => ({
    value: PricingType[key],
    label: PricingTypeLabel[PricingType[key]],
}));

export const DealValidation = {
    startTime: {
        required: "Thời gian bắt đầu không được để trống.",
    },
    endTime: {
        required: "Thời gian kết thúc không được để trống.",
    },
    readyTime: {
    },
    name: {
        required: "Tên deal không được để trống.",
        validate: {
            notTrimSpace: (value) => {
                if (/(^[\s])|([\s]$)|(\s\s)/.test(value)) return "Tên deal không được dư khoảng trắng"
            }
        }
    },
    slug: {
        required: "ID tìm kiếm không được để trống.",
        pattern: {
            value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            message: "Vui lòng nhập ID tìm kiếm chỉ bao gồm ký tự chữ, số và dấu '-'"
        }
    },
    maxQuantity: {
        required: "Số lượng được phép bán không được để trống.",
        min: {
            value: 1,
            message: "Số lượng được phép bán không được nhỏ hơn 1.",
        },
        max: {
            value: 100000,
            message: "Số lượng được phép bán không được lớn hơn 100,000.",
        },
        validate: {
            noDecimal: FormCommonValidator.noDecimal,
        },
        valueAsNumber: true,
    },
    price: {
        required: "Giá không được để trống.",
        min: {
            value: 1,
            message: "Giá không được nhỏ hơn 1.",
        },
        max: {
            value: 1000000000,
            message: "Giá không được lớn hơn 1,000,000,000.",
        },
        validate: {
            noDecimal: FormCommonValidator.noDecimal,
        },
        valueAsNumber: true
    },
    discountPercent: {
        required: "Phần trăm giảm giá không được để trống.",
        min: {
            value: 0.00001,
            message: "Phần trăm giảm giá phải lớn hơn 0.",
        },
        max: {
            value: 100,
            message: "Phần trăm giảm giá phải nhỏ hơn 100%.",
        },
        valueAsNumber: true
    },
    maxDiscountValue: {
        required: "Giảm giá tối đa không được để trống.",
        min: {
            value: 0,
            message: "Giảm giá tối đa không được nhỏ hơn 0.",
        },
        max: {
            value: 1000000000,
            message: "Giảm giá tối đa không được lớn hơn 1,000,000,000.",
        },
        validate: {
            noDecimal: FormCommonValidator.noDecimal,
        },
        valueAsNumber: true
    },
    skus: {
        select: {
            required: "Vui lòng chọn sku.",
        },
        quantity: {
            required: "Số lượng không được để trống.",
            min: {
                value: 1,
                message: "Số lượng không được nhỏ hơn 1.",
            },
            max: {
                value: 1000000000,
                message: "Số lượng không được lớn hơn 1,000,000,000.",
            },
            validate: {
                noDecimal: FormCommonValidator.noDecimal,
            }
        },
    },
    imageUrls: {
        combo: {
            required: "Vui lòng chọn hình ảnh sản phẩm.",
            validate: (value) => {
                if (Array.isArray(value) && value.length < 1) {
                    return "Combo phải có tối thiểu 1 hình ảnh sản phẩm.";
                }
            }
        }
    }
}

export const SkuStatus = {
    NORMAL: "NORMAL",
    OUT_OF_STOCK: "OUT_OF_STOCK",
    SUSPENDED: "SUSPENDED",
    STOP_PRODUCING: "STOP_PRODUCING",
    LIMIT: "LIMIT",
    GIFT: "GIFT",
};

export const SkuStatusLabel = {
    [SkuStatus.NORMAL]: "Đang bán",
    [SkuStatus.OUT_OF_STOCK]: "Tạm hết hàng",
    [SkuStatus.SUSPENDED]: "Tạm ngưng bán",
    [SkuStatus.STOP_PRODUCING]: "Ngưng sản xuất",
    [SkuStatus.LIMIT]: "Có giới hạn",
    [SkuStatus.GIFT]: "Quà tặng",
};