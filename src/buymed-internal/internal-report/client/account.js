import {APIClient} from "@thuocsi/nextjs-components/lib/utils";

const URI = `/core/account/v1`;

// const URI = ``

class AccountClient extends APIClient {
    constructor(ctx, data) {
        super(ctx, data);
    }

    // REMOVE
    getAccounts(accountIDs) {
        return this.call("GET", `${URI}/account/list`, {
            accountIDs: accountIDs.join(",")
        })
    }


}

export function getAccountClient(ctx, data) {
    return new AccountClient(ctx, data);
}
