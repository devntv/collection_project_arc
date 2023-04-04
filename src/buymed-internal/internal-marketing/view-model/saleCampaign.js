export const saleCampaignStatus = [
    {label: "Sắp diễn ra", value: "WAITING"},
    {label: "Đang diễn ra", value: "ACTIVE"},
    {label: "Đã kết thúc", value: 'EXPIRED' },
]


export const saleCampaignStatusColor = {
    ['WAITING']: 'blue',
    ['ACTIVE']: 'green',
    ['EXPIRED']: 'red',
}

export const importStatusListLabel = {
    "DONE": "Đã hoàn thành",
    "IN_PROGRESS": "Đang xử lý"
}

export const importStatusColor = {
    ['IN_PROGRESS']: 'blue',
    ['DONE']: 'green',
    ['CANCEL']: 'red',
}

export const checkFulfillmentStatusColor = {
    ['IN_PROCESS']: 'blue',
    ['DONE']: 'green',
    ['FAIL']: 'red',
}

export const checkFulfillmentStatusMap = {
    "IN_PROCESS": 'Đang tiến hành',
    "DONE": "Hoàn tất", 
    "FAIL": "Thất bại"
}

export const checkFulfillmentStatus = [
    {label: "Đang tiến hành", value: "IN_PROCESS"},
    {label: "Hoàn tất", value: "DONE"},
    {label: "Thất bại", value: "FAIL"},
]