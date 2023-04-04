import {
    APIClient
} from "@thuocsi/nextjs-components/lib/utils";
const URL = '/marketplace/order/v2/cart';


class CartClient extends APIClient {
    getCartListHasVoucher(query, limit, offset) {
        return this.call("GET", `${URL}/list`, {
            q: JSON.stringify(query),
            getTotal: true,
            hasVoucher: true,
            limit,
            offset
        });
    }

    deleteCartByAccountId(accountId){
        return this.call("DELETE", URL, {
            accountId
        })
    }

    selectCartItem({sku= "", isSelected = false, accountId}) {
        return this.call("PUT", `${URL}/select?accountId=${accountId}`, {
            sku,
            isSelected
        })
    }

    selectAllCartItem({isSelected = false, accountId}) {
        return this.call("PUT", `${URL}/select?accountId=${accountId}`, {
            isSelected,
            isAppliedAll: true
        })
    }
}

export function getCartClient(ctx, data) {
    return new CartClient(ctx, data);
}