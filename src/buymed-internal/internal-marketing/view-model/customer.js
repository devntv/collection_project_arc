

export const CustomerScope = {
    PHARMACY: "PHARMACY",
    CLINIC: "CLINIC",
    DRUGSTORE: "DRUGSTORE",
    HOSPITAL: "HOSPITAL",
    PHARMA_COMPANY: "PHARMA_COMPANY",
    DENTISTRY: "DENTISTRY",
    BEAUTY_SALON: "BEAUTY_SALON",
    HEALTH_CENTER: "HEALTH_CENTER",
}


export const CustomerScopeLabel = {
    [CustomerScope.PHARMACY]: "Nhà thuốc",
    [CustomerScope.CLINIC]: "Phòng khám",
    [CustomerScope.DRUGSTORE]: "Quầy thuốc",
    [CustomerScope.HOSPITAL]: "Bệnh viện",
    [CustomerScope.PHARMA_COMPANY]: "Công ty dược phẩm",
    [CustomerScope.DENTISTRY]: "Nha khoa",
    [CustomerScope.BEAUTY_SALON]: "Thẩm mỹ viện",
    [CustomerScope.HEALTH_CENTER]: "Trung tâm y tế",
}

export const customerScopeOpts = [
    {
        value: CustomerScope.PHARMACY,
        label: "Nhà thuốc"
    },
    {
        value: CustomerScope.CLINIC,
        label: "Phòng khám"
    },
    {
        value: CustomerScope.DRUGSTORE,
        label: "Quầy thuốc"
    },
    {
        value: CustomerScope.HOSPITAL,
        label: "Bệnh viện"
    },
    {
        value: CustomerScope.PHARMA_COMPANY,
        label: "Công ty dược phẩm"
    },
    {
        value: CustomerScope.DENTISTRY,
        label: "Nha khoa"
    },
    {
        value: CustomerScope.BEAUTY_SALON,
        label: "Thẩm mỹ viện"
    },
    {
        value: CustomerScope.HEALTH_CENTER,
        label: "Trung tâm y tế"
    }
]