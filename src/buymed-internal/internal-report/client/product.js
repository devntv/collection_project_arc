import {APIClient} from "@thuocsi/nextjs-components/lib/utils";

const URI = `/marketplace/product/v2`;

// const URI = ``

class ProductClient extends APIClient {
    constructor(ctx, data) {
        super(ctx, data);
    }

    getProductByCodes(codes){
        return this.call( "GET",`${URI}/product/list`, {
            codes,
            limit: 100,
        })
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
