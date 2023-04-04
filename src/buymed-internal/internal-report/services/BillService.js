import { getBillClient } from "../clients/bill"

export const BillStatus = {
    WAIT_TO_PROCESS: "Chờ xử lý",
    WAIT_TO_PAYMENT: "Chờ thanh toán",
    DONE: "Hoàn tất",
    CANCEL: "Hủy"
}

export const getBillByOrderID = async ({ ctx, params }) => {
    const client = getBillClient(ctx);
    const res = await client.getBillByOrderID(params);
    return res;
}