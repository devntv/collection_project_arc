import { APIClient } from "lib/utils";

const URI = "/accounting/invoice/v1";

class AccountingClient extends APIClient {
	constructor(ctx, data) {
		super(ctx, data);
	}
	getOrderInvoice(params) {
		return this.call("GET", `${URI}/order`, params);
	}
}

export function getAccountingClient(ctx, data) {
	return new AccountingClient(ctx, data);
}
