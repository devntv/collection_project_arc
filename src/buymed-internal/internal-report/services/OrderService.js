import { getOrderClient } from "../clients/order";
import getConfig from 'next/config';
import { getBillByOrderID } from "./BillService";
import { APIStatus } from "../lib/common";
import { getDistrictByCode, getProvinceByCode, getWardByCode } from "./MasterDataService";
import { getDeliveryPlatform, getPaymentMethod } from "./CmsService";
const { publicRuntimeConfig } = getConfig();
export const orderStatus = {
    "WAIT_TO_CONFIRM": "Chờ xác nhận",
    "CONFIRMED": "Đã xác nhận",
    "CANCEL": "Đã hủy",
    "PROCESSING": "Đang xử lý",
    "WAIT_TO_PACK": "Chờ đóng gói",
    "WAIT_TO_DELIVER": "Chờ giao hàng",
    "COMPLETED": "Đã hoàn tất",
    "DELIVERING": "Đang giao hàng",
    "RETURNED": "Đã trả hàng",
    "DELIVERED": "Đã giao",
    "RESERVING": "RESERVING",
    "REVERTING": "REVERTING"
}

export const orderPaymentMethod = {
    "PAYMENT_METHOD_BANK": "Chuyển khoản",
    "PAYMENT_METHOD_BANK_1": "Chuyển khoản",
    "PAYMENT_METHOD_COD": "Tiền mặt",
    "PAYMENT_METHOD_NORMAL": "Tiền mặt khi nhận hàng",
}

export const deliveryMethod = {
    "DELIVERY_PLATFORM_NORMAL": "Giao hàng tiêu chuẩn",
    "DELIVERY_PLATFORM_QUICK": "Giao siêu tốc",
}

export const orderUrl = (order, type = "EMPLOYEE") => {
    switch (type) {
        case "EMPLOYEE":
            return `${publicRuntimeConfig.INTERNAL_HOST}/crm/order/detail?orderCode=${order.orderCode}&orderId=${order.orderId || order.orderID}`;
        case 'CUSTOMER':
            return `${publicRuntimeConfig.WEB_HOST}/my-order/${order.orderId || order.orderID}`;
        default:
            break;
    }
}

export const getCustomerOrder = async ({ ctx, params }) => {
    const client = getOrderClient(ctx, {});
    const newParams = { ...params };
    try {
        JSON.parse(newParams.q);
    } catch {
        delete newParams.q;
    }
    const res = await client.getCustomerOrder(newParams);
    return res;
}

export const searchCustomerOrderById = async ({ ctx, params, customerID, accountID, getAddress }) => {
    const client = getOrderClient(ctx, {});
    const res = await client.searchCustomerOrderById({
        ...params,
        offset: params.offset || (params.page - 1) * params.limit || 0,
        limit: params.limit
    });
    // if(res.status === APIStatus.OK){
    //     const n = res.data.length;
    //     for(let i = 0 ; i < n; i++){
    //         if(res.data[i].paymentMethod){
    //             const paymentRes = await getPaymentMethod({ctx, code:res.data[i].paymentMethod})
    //             res.data[i].paymentMethod = paymentRes;
    //         }
    //         if(res.data[i].deliveryMethod){
    //             const deliveryRes = await getDeliveryPlatform({ctx, code:res.data[i].deliveryMethod})
    //             res.data[i].deliveryMethod = deliveryRes;
    //         }
    //     }
    // }
    if(getAddress){
        if(res.status === APIStatus.OK){
            const data = res.data;
            const n = res.data.length;
            for(let i = 0 ; i < n; i++){
                res.data[i] = await getOrderDetail(res.data[i], ctx, true)
                // const detailAddress = res.data[i].detailAddress || {}
                // res.data[i].customerShippingAddress = `${res.data[i].customerShippingAddress}, ${Object.keys(detailAddress).map(key => detailAddress[key]).join(", ")}`
            }
        }
    }
    return res;
}

export const getOrderDetail = async (order, ctx, addressOnly = false) => {
    const result = {...order, detailAddress: {}};
    if(!addressOnly){
        const res = await getBillByOrderID({
            ctx,
            params: {
                q:JSON.stringify({
                    orderId: order.orderId || order.orderID
                })
            }
        });
        if(res.status === APIStatus.OK){
            result.bill = {
                billCode: res.data[0].billCode,
                status: res.data[0].status,
            }
        };
    }
    
    const provinceRes = await getProvinceByCode({
        params:{
            code:result.customerProvinceCode
        },
        ctx,
    })
    if(provinceRes.status === APIStatus.OK){
        result.detailAddress.province = provinceRes.data[0].name
    }

    const districtRes = await getDistrictByCode({
        params:{
            code:order.customerDistrictCode
        },
        ctx,
    })
    if(districtRes.status === APIStatus.OK){
        result.detailAddress.district = districtRes.data[0].name
    }

    const wardRes = await getWardByCode({
        params:{
            wardCode:order.customerWardCode
        },
        ctx,
    })
    if(wardRes.status === APIStatus.OK){
        result.detailAddress.ward = wardRes.data[0].name
    }

    
    return result;
}

export const getDisplayAddress = (order) => {
    if(order.detailAddress){
        return `${order.detailAddress.ward || ""}, ${order.detailAddress.district || ""}, ${order.detailAddress.province || ""}`
    }
}