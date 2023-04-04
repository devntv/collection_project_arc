import {getAccountClient} from '../clients/account'
import {getCustomerClient} from '../clients/customer'
import { APIStatus } from '../lib/common'
import cacheData from "memory-cache";
import { CUSTOMER_LEVEL_CACHE } from '../config/cache';

//customer.scope
export const customerScope = {
    "PHARMACY": "Nhà thuốc",
    "CLINIC":"Phòng khám",
    "DRUGSTORE": "Quầy thuốc",
    "HOSPITAL":"Bệnh viện",
    "PHARMA_COMPANY":"Công ty dược phẩm",
    "DENTISTRY":"Nha khoa",
    "BEAUTY_SALON":"Thẩm mỹ viện",
    "HEALTH_CENTER":"Trung tâm y tế",
}

//customer.color
export const customerColor = {
    "BLUE":"Khách hàng VIP",
    "PURPLE":"Khách hàng VIP - Công nợ",
    "GREEN":"Khách hàng bình thường",
    "ORANGE":"Chặn OCD",
    "RED":"Khóa vĩnh viễn",
    "YELLOW":"Thường xuyên khiếu nại"
}

//customer.status
export const customerStatus = {
    "ACTIVE":"Đang hoạt động",
    "DELETED":"Đã xóa",
    "INACTIVE":"Chưa kích hoạt",
}

export const customerBussinessInfor = {
    "licenses": "Giấy phép kinh doanh",
    "pharmacyEligibilityLicense": "Giấy chứng nhận đủ điều kiện kinh doanh dược",
    "gpp": "GPP/GDP/GSP",
    "examinationAndTreatmentLicense": "Giấy phép hoạt động khám chữa bệnh",
}

//Ngày đăng kí: customer.createdTime
//Ngày duyệt: customer.confirmedTime
//Người phụ trách: customer.supporterAccountId

export const getCustomerBussinessInfor = (customer) => {
    return ["licenses", "pharmacyEligibilityLicense", "gpp","examinationAndTreatmentLicense"].map((item) => {
        if(!customer){
            return {
                name: customerBussinessInfor[item],
                file: [],
            }
        }
        const info = item === "licenses" ? customer.licenseInfo : customer[`${item}Info`];
        if(info){
            return {
                name: customerBussinessInfor[item],
                file: customer[item] || [],
                number: info.number,
                date: info.date,
                place: info.place,
                placeName: info.placeName,
            }
        }
        return {
            name: customerBussinessInfor[item],
            file: customer[item] || [],
        }
    })
}

export async function getListCustomer(params) {
    const client = getAccountClient()
    const newParams = { ...params };
    
    newParams.offset = !params.page || params.page <= 1 ? 0 : (params.page - 1) * (params.limit || 50);
    newParams.getTotal = params.getTotal || true

    const res = await client.getListCustomer(newParams)
    return { 
        data: res,
        pagination: {
            page: Number.parseInt(newParams.page) || 1,
            limit: Number.parseInt(newParams.limit) || 5,
            total: res?.total || 0,
        }
    }
}

export async function getMe(ctx, data) {
    console.log("call get me in customer")
    const client = getCustomerClient(ctx, data)
    return await client.getMe()
}

export const getCustomerNote = async ({ctx, data}) => { 
    const client = getCustomerClient(ctx, {})
    return await client.getCustomerNote(data);
}

export const createNote = async ({ctx, data}) => {
    const client = getCustomerClient(ctx, {})
    return await client.createNote(data);
}

export const searchCustomer = async ({ctx, data}) => {
    const client = getCustomerClient(ctx, {})
    return await client.searchCustomer(data);
}

export const getCustomerLevelList = async ({ctx, code}) => {
    const client = getCustomerClient(ctx, {})
    const cache = cacheData.get(CUSTOMER_LEVEL_CACHE);
    if(cache){
        if(code){
            return cache[code]
        }
        else{
            return cache;
        }
    }
    else{
        const res = await client.getLevelList();
        if(res.status === APIStatus.OK){
            const result = {}
            res.data.forEach(item => {
                result[item.code] = item.name;
            });
            cacheData.put(CUSTOMER_LEVEL_CACHE, result)
            if(code){
                return result[code]
            }
            else{
                return result;
            }
        }
    }
    
}

export const scopeConverster = () => {

}