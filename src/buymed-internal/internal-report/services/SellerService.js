import cacheData from "memory-cache";

import { getProductClient } from "../clients/product"
import { EXPIRED_CACHE, SELLER_PREFIX } from "../config/cache";
import { APIStatus } from "../lib/common";
export const getSellerData = async ({ctx, params}) => {
    const client = getProductClient(ctx);
    const {sellerCode} = params || {};
    if(sellerCode){
        const sellerCache = cacheData.get(SELLER_PREFIX + sellerCode);
        if(!sellerCache){
            const res = await client.getOneSeller(params);
            if(res.status === APIStatus.OK){
                cacheData.put(SELLER_PREFIX + sellerCode, res.data[0], EXPIRED_CACHE);
            }
            return res;
        }
        else{
            return {
                status: APIStatus.OK,
                data:[sellerCache]
            }
        }
    }
    const res = await client.getOneSeller(params);
    return res;
}