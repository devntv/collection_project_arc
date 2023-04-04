import {APIClient} from "@thuocsi/nextjs-components/lib/utils";

const URI = `/seller/core/v1`;

// const URI = ``

class SellerClient extends APIClient {
    constructor(ctx, data) {
        super(ctx, data);
    }

    getSellersByCodes(codes){
        return this.call( "GET",`${URI}/account/list`,{
            sellerCodes: codes.join(","),
            limit: 50,
        })
    }

}

export function getSellerClient(ctx, data) {
    return new SellerClient(ctx, data);
}
