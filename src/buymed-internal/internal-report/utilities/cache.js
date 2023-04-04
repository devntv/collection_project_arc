import cacheData from "memory-cache";

export const callAPIWithCache = async (caller, key) => {
    const value = cacheData.get(key);
    if(value){
        return value;
    }
    else{
        const hours = 24;
        const res = await caller();
        cacheData.put(key, res, hours * 1000 * 60 * 60);
        return res;
    }
}
