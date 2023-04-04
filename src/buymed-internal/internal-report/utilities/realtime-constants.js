// hardcode for realtime page

export const TIME_TO_ASYNC = 60 // unit: second

export const LIMIT_PER_PAGE = 20;

export const INTERNAL_SELLERS = ["MEDX", "MEDX_E"];

export const RANGE_CHART = 14 // last 14 days

export const CATE_MANAGEMENTS = [
    { label: "Brand Generic", value: "BRAND_GENERIC" },
    { label: "Generic", value: "GENERIC" },
    { label: "Brandname", value: "BRANDNAME" },
    { label: "Portfolio", value: "PORTFOLIO" },
    { label: "Market Place", value: "MARKET_PLACE" },
];

export const CONFIRM_STATUS = [
    {
        name: 'Tất cả',
        value: ''
    },
    {
        name: 'Chờ duyệt',
        value: 'WAIT_TO_CONFIRM'
    },
    {
        name: 'Đã duyệt',
        value: 'CONFIRMED'
    },
    {
        name: 'Huỷ',
        value: 'CANCEL'
    }
];

export const REGIONS = [
    {
        label: 'Miền Bắc',
        value: 'MIENBAC'
    },
    {
        label: 'Miền Nam',
        value: 'MIENNAM'
    }
];

export const WAREHOUSE_CODES = {
    MIENNAM: 'BD',
    MIENBAC: 'HN'
};

export const RATIO_PER_HOUR = {
    7: 229,
    8: 432,
    9: 799,
    10: 1194,
    11: 973,
    12: 783,
    13: 657,
    14: 670,
    15: 802,
    16: 748,
    17: 513,
    18: 373,
    19: 307,
    20: 283,
    21: 425,
    22: 340,
    23: 281,
    24: 191
}

export const SORT_OPTIONS = {
    PERCENT: {
        NAME: "PERCENT",
        ASC: "forecast_diff_percent_end_day_by_current_ASC",
        DESC: "forecast_diff_percent_end_day_by_current_DESC", // default
    },
    AMOUNT: {
        NAME: "AMOUNT",
        ASC: "forecast_diff_amount_end_day_by_current_ASC",
        DESC: "forecast_diff_amount_end_day_by_current_DESC",
    }
}

export const REGION_LIST = {
    MIENNAM: {
        label: "Miền Nam",
        value: "MIENNAM",
    },
    MIENBAC: {
        label: "Miền Bắc",
        value: "MIENBAC",
    }
}

export const PURCHASER_CODE = {
    MIENNAM: 'PUR_HCM',
    MIENBAC: 'PUR_HN'
}

export const MarkFluctuation = {
    amountGMV: 10000,
    percentGMV: 20,
    percentWrongPrice: 20,
}



export const ratioGMVForeCast = () => {
    const currentHour = new Date().getHours()
    const arrHours = Object.keys(RATIO_PER_HOUR)

    if (currentHour > arrHours[arrHours.length - 1] || currentHour < arrHours[0]) return -1 // hours don't have GMV
    const amountHourNoAvailable = 6
    const ratioCurrentHour = new Date().getMinutes() / 60
    const totalGmv = Object.values(RATIO_PER_HOUR).reduce((prev, current) => prev + current, 0)
    const gmvAtThisTime = Object.values(RATIO_PER_HOUR).slice(0, (currentHour) - amountHourNoAvailable).reduce((prev, current) => prev + current, 0) + (RATIO_PER_HOUR[currentHour + 1] * ratioCurrentHour)
    return gmvAtThisTime / totalGmv
}

export const calForeCastGMV = (gmvToday = 0) => {
    const ratio = ratioGMVForeCast()
    if (!ratio)
        gmvToday
    return gmvToday / ratio
}
