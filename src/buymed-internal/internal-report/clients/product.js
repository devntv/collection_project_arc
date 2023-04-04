import { APIClient } from "../lib/utils";
import queryString from "query-string";
const URI = "/marketplace/product/v2";
const URI_SELLER = "/seller/core/v1"
class ProductClient extends APIClient {
    searchProduct(params) {
        return this.call("POST", `${URI}/search-component/fuzzy`, params);
    }

    getSeller(params) {
        return this.call("GET", `${URI_SELLER}/account/list`, params);
    }

    getOneSeller(params) {
        return this.call("GET", `${URI_SELLER}/account`, params);
    }

    getManufacturer(params) {
        return this.call("GET", `${URI}/manufacturer/list`, params);
    }

    getProductDetail(params) {
        return this.call("GET", `${URI}/product/detail`, params);
    }
    getProductNameByCode(params) {
        return this.call("GET", `${URI}/product/list`, params);
    }
    // /marketplace/product/v2/tag/list
    getTags(params) {
        return this.call("GET", `${URI}/tag/list`, params);
    }
    getProductList(params) {
        return this.call("POST", `${URI}/product/list`, params)
    }

    getSingleSku(sku){
        return this.call( "GET",`${URI}/sku`, {
            q:JSON.stringify({code:sku})
        })
    }

}

export function getProductClient(ctx, data) {
    return new ProductClient(ctx, data);
}
