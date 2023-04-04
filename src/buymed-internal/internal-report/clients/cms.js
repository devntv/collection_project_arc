import { APIClient } from "lib/utils";
import queryString from "query-string";

const URI = "/marketplace/pricing/v2";

class CmsClient extends APIClient {
	constructor(ctx, data) {
		super(ctx, data);
	}

	getPaymentMethod(params) {
		return this.call("GET", `${URI}/payment-method/list`, params);
	}

	getDeliveryPlatform(params) {
		return this.call("GET", `${URI}/delivery-platform/list`, params);
	}
}

export function getCmsClient(ctx, data) {
	return new CmsClient(ctx, data);
}
