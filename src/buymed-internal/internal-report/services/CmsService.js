import { getCmsClient } from "../clients/cms"
import cacheData from "memory-cache";
import { CMS_DELIVERY_REFIX, CMS_PAYMENT_REFIX, EXPIRED_CACHE } from "../config/cache";
import { APIStatus } from "../lib/common";

export const getDeliveryPlatform = async ({ctx, code}) => {
    const client = getCmsClient(ctx);
    const deliveryCache = cacheData.get(CMS_DELIVERY_REFIX);
    if(deliveryCache){
        if(code){
            return deliveryCache[code]
        }
        return deliveryCache
    }
    const res = await client.getDeliveryPlatform();
    if(res.status === APIStatus.OK){
        const dic = {};
        res.data.forEach(item => {
            dic[item.code] = item.name;
        })
        cacheData.put(CMS_DELIVERY_REFIX, dic, EXPIRED_CACHE);
        if(code){
            return dic[code]
        }
        else{
            return dic;
        }
    }
    return {}
}

export const getPaymentMethod = async ({ctx, code}) => {
    const client = getCmsClient(ctx);
    const deliveryCache = cacheData.get(CMS_PAYMENT_REFIX);
    if(deliveryCache){
        if(code){
            return deliveryCache[code]
        }
        return deliveryCache
    }
    const res = await client.getPaymentMethod();
    if(res.status === APIStatus.OK){
        const dic = {};
        res.data.forEach(item => {
            dic[item.code] = item.name;
        })
        cacheData.put(CMS_PAYMENT_REFIX, dic, EXPIRED_CACHE);
        if(code){
            return dic[code]
        }
        else{
            return dic;
        }
    }
    return {}
}