import { APIClient } from "@thuocsi/nextjs-components/lib/utils";

let apiPrefix = "/core/account/v1";

class AccountClient extends APIClient {
    constructor(ctx, data) {
        super(ctx, data);
    }

    getAccount(search, offset, limit, accountIDs="") {
        return this.callFromNextJS("GET", `${apiPrefix}/account/list`, {
            q: JSON.stringify({
                type: "CUSTOMER",
            }),
            search: search,
            accountIDs,
            offset: offset,
            limit: limit,
            getTotal: true,
        });
    }

    getAccountByUsername(username) {
        return this.callFromNextJS("GET", `/core/account/v1/account`, {
            type: "CUSTOMER",
            username: username,
            getUserRole: true,
        });
    }

    getAccountByIds(ids) {
        return this.call("GET", `${apiPrefix}/account/list`, {
            accountIDs: ids
        });
    }

    clientGetListEmployee(offset, limit, q) {
        return this.callFromClient('GET', `${apiPrefix}/employee/all`, {
            search: q,
            offset,
            limit,
            getTotal: true,
        });
    }

    getListEmployee(offset, limit, q) {
        return this.call('GET', `${apiPrefix}/employee/all`, {
            q: JSON.stringify(q),
            offset,
            limit,
            getTotal: true,
        });
    }
}

export function getAccountClient(ctx, data) {
    return new AccountClient(ctx, data);
}
