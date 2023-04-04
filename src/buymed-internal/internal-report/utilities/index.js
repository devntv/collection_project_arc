import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();


export const getPathNestRoutes = (router) => {
    const asPathWithoutQuery = router.asPath.split("?")[0];
    return asPathWithoutQuery.split("/").filter(v => v.length > 0);
}

export const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
  
export const uuid = () => {
    return Math.floor(Math.random() * Date.now()).toString(); 
}

export function getImageProxy(url) {
    return url ? encodeURI(url.replace(/\s/g, '%20')).replace(`storage.googleapis.com`,'img-proxy.thuocsi.vn') : url;
  }

export const isNil = (value) => {
    return value === null || value === undefined
}

export const isDevelopment = () => {
    if(publicRuntimeConfig.INTERNAL_HOST === "https://internal.v2-stg.thuocsi.vn" || publicRuntimeConfig.INTERNAL_HOST === "https://internal.v2-dev.thuocsi.vn"){
        return true;
    }
}

export const isDirectAccess = (req = {}) => {
    const headers = req.headers || {}
    return !headers.referer
}