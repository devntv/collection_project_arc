export const VoucherStatus = {
    HIDE: "HIDE",
    WAITING: "WAITING",
    ACTIVE: "ACTIVE",
    EXPIRED: "EXPIRED",
    DELETED: "DELETED",
}

export const VoucherStatusText = {
    [VoucherStatus.HIDE]: "Đã tắt",
    [VoucherStatus.WAITING]: "Đang đợi",
    [VoucherStatus.ACTIVE]: "Đang hoạt động",
    [VoucherStatus.EXPIRED]: "Hết hạn",
    [VoucherStatus.DELETED]: "Đã xóa",
}


export const VoucherCustomerStatus = {
    NORMAL: "NORMAL",
    CANCELLED: "CANCELLED",
}

export const VoucherCustomerStatusLabel = {
    [VoucherCustomerStatus.NORMAL]: "Được sử dụng",
    [VoucherCustomerStatus.CANCELLED]: "Đã xóa",
}

export const VoucherCustomerStatusColor = {
    [VoucherCustomerStatus.NORMAL]: "green",
    [VoucherCustomerStatus.CANCELLED]: "red",
}
