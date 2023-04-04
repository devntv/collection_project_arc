import { APIClient } from "../lib/utils"
const URI_CUSTOMER = '/marketplace/customer/v1'
import queryString from "query-string";

class CustomerClient extends APIClient {
    constructor(ctx, data) {
        super(ctx, data)
    }

    getMe() {
        return this.call("GET", `${URI_CUSTOMER}/me`)
    }
    
    getCustomerNote(params){
		const stringified = queryString.stringify(params);
		return this.call("GET", `${URI_CUSTOMER}/note?${stringified}`);
	}
    
    createNote(data){
		return this.call("POST", `${URI_CUSTOMER}/note`, data);
    }

    searchCustomer(params){
        const stringified = queryString.stringify(params);
		return this.call("GET", `${URI_CUSTOMER}/account/list?${stringified}`);
    }

    getLevelList(params){
        return this.call("GET", `${URI_CUSTOMER}/level/list`);
    }
}

export function getCustomerClient(ctx, data) {
    return new CustomerClient(ctx, data)
}