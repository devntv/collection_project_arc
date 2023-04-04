export const sellerTicketStatus = [
    {label: "Chờ duyệt", value: "WAIT_APPROVE"},
    {label: "Đã duyệt", value: "APPROVED"},
    {label: "Từ chối", value: "REJECTED"},
]


export const ticketStatusColor = {
    ["WAIT_APPROVE"]: 'blue',
    ['APPROVED']: 'green',
    ['REJECTED']: 'red',
}