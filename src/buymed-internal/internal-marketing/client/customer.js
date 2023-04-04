import { APIClient } from "@thuocsi/nextjs-components/lib/utils";
import { sanitizeObject } from "utils/Object";
import { SOURCE } from "./constrant";
const URI = `/marketplace/customer/v1`;
// const URI = ``

class CustomerClient extends APIClient {
    constructor(ctx, data) {
        super(ctx, data);
    }

    getCustomer(offset, limit, q = {}) {
        return this.call("GET", `${URI}/account/list`, {
            q: JSON.stringify(q),
            offset: offset,
            limit: limit,
            getTotal: true,
        });
    }

    countCustomer(q) {
        return this.call("GET", `${URI}/account/list/count`, {
            q: JSON.stringify(q)
        });
    }

    getCustomerClient(q) {
        return this.callFromClient("GET", `${URI}/account/list`, {
            q: q,
            limit: 20,
            getTotal: true,
        });
    }

    getCustomerByFilter({
        query,
        limit = 0,
        offset = 0,
    }) {
        return this.call("GET", `${URI}/account/list`, {
            q: JSON.stringify(query),
            limit,
            offset,
            getTotal: true,
        })
    }

    createNote(data) {
        return this.call("POST", `${URI}/note`, data)
    }

    getNoteList(filterData, offset = 0, limit = 5) {
        return this.call("GET", `${URI}/note`, {
            q: JSON.stringify(filterData),
            offset,
            limit
        })
    }

    getCustomerByCustomerID(customerID) {
        return this.call("GET", `${URI}/account`, {
            customerID: customerID,
        });
    }

     getCustomerByCustomerIDFromClient(customerID) {
        return this.callFromClient("GET", `${URI}/account`, {
            customerID: customerID,
        });
    }

    getLevel(q = "") {
        return this.call("GET", `${URI}/level/list`, {
            q
        });
    }

    getListLevel(q) {
        return this.call("GET", `${URI}/level/list`, { q: JSON.stringify(q) });
    }

    getLevelByCodes(codes) {
        return this.call("POST", `${URI}/level/list`, { codes });
    }

    getLevelByIDs(ids) {
        return this.callFromClient("POST", `${URI}/level/list`, { ids });
    }

    getCustomerByIDs(ids) {
        return this.callFromNextJS("POST", `${URI}/account/list`, { ids });
    }

    getCustomerByAccountIDs(accountIDs) {
        return this.call("POST", `${URI}/account/list`, { accountIDs });
    }

    getCustomerFromClient(offset, limit, q) {
        return this.callFromClient("GET", `${URI}/account/list`, {
            q: q,
            offset: offset,
            limit: limit,
            getTotal: true,
        });
    }


    getCustomerByCustomerIDs(ids) {
        return this.call("POST", `${URI}/account/list`, { ids });
    }

    getCustomerByCustomerCode(customerCode) {
        return this.callFromNextJS("GET", `${URI}/account`, {
            customerCode: customerCode,
        });
    }

    createNewCustomer(data) {
        data.source = SOURCE.THUOCSI;
        return this.callFromClient("POST", `${URI}/account`, data);
    }

    updateCustomer(data) {
        return this.callFromClient("PUT", `${URI}/account`, data);
    }

    approveAccount(data) {
        return this.callFromClient("PUT", `${URI}/account/approve`, data);
    }

    activeAccount(data) {
        return this.callFromClient("PUT", `${URI}/account/active`, data);
    }

    lockAccount(data) {
        return this.callFromClient("PUT", `${URI}/account/lock`, data);
    }

    getCustomerNoteList({ customerCode, offset, limit, phone }) {
        return this.callFromNextJS("GET", `${URI}/note`, {
            q: JSON.stringify({ customerCode: customerCode, customerPhone: phone }),
            offset: offset,
            limit: limit,
        })
    }

    getCustomerNoteListFromClient({ customerCode, offset, limit, phone }) {
        return this.callFromClient("GET", `${URI}/note`, {
            q: JSON.stringify({ customerCode: customerCode, customerPhone: phone }),
            offset: offset,
            limit: limit
        })
    }

    getBankAccountList({ limit, offset, q, getTotal = true }) {
        const data = { limit, offset, q, getTotal };
        sanitizeObject(data);
        if (data.q) data.q = JSON.stringify(data.q);
        return this.call('GET', `${URI}/account/bank/list`, data);
    }

    createBankAccount(data) {
        sanitizeObject(data);
        return this.call('POST', `${URI}/account/bank`, data);
    }

    getListReference(customerCode){
        return this.call("GET", `${URI}/account/reference/list`, {
            customerCode
        })
    }

    getDetailCustomerByCustomerID(customerID) {
        return this.call("GET", `${URI}/account`, {
            customerID: customerID,
        });
    }

    getFriend(id){
        return this.call("GET", `${URI}/friend`, {
            q: JSON.stringify({friendCustomerId: id})
        })
    }

    getListFriend(code){
        return this.call("GET", `${URI}/friend/list`, {
            q: JSON.stringify({customerCode: code})
        })
    }

    getListCustomerBySearch(search) {
        return this.call('GET', `${URI}/account/list`,
            {
                q: JSON.stringify({ search }),
                limit: 20,
                offset: 0
            })
    }

    getListByCustomerIds(ids, search = "") {
        return this.callFromClient("POST", `${URI}/account/list`, { ids, search });
    }
    
}

export function getCustomerClient(ctx, data) {
    return new CustomerClient(ctx, data);
}
