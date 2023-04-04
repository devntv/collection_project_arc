import { APIClient } from "lib/utils";

const URI = "/accounting/core/v1/bill";

class BillClient extends APIClient {
	constructor(ctx, data) {
		super(ctx, data);
	}

	getBillByOrderID(params) {
		return this.call("GET", `${URI}`, params);
	}
}

export function getBillClient(ctx, data) {
	return new BillClient(ctx, data);
}
