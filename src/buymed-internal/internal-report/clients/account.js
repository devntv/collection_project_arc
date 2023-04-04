import { APIClient } from "lib/utils";
import queryString from "query-string";

const URI = "/core/account/v1";
const URI_CUSTOMER = "/marketplace/customer/v1";
const URI_VIDEO = "/integration/video/v1";

let customerCache = [];

class AccountClient extends APIClient {
	constructor(ctx, data) {
		super(ctx, data);
		this.customerCache = customerCache;
	}
	async login(data) {
		const res = await this.makeRequest("POST", "/api/login", data);
		return res;
	}

	async logout() {
		const res = await this.call("PUT", `${URI}/logout`);
		return res;
	}

	async getInfo(type) {
		if (type == "EMPLOYEE") {
			const res = await this.call("GET", `${URI}/me`);
			return res;
		} else if (type == "CUSTOMER") {
			const res = await this.call("GET", `${URI_CUSTOMER}/me`);
			return res;
		} else {
			const res = await this.call("GET", `${URI}/me`);
			return res;
		}
	}

	getMe() {
		return this.call("GET", `${URI}/me`);
	}

	async getZoomInfo() {
		const res = await this.call("POST", `${URI_VIDEO}/zoom/my-user-id`);
		return res;
	}

	async getListCustomer(params) {
		const stringified = queryString.stringify(params);
		if (this.customerCache[stringified]) {
			const data = this.customerCache[stringified];
			const now = new Date();
			if (Math.abs(now - data.createdAt) <= 600000) {
				return this.customerCache[stringified].value;
			}
		}
		const result = await this.call("GET", `${URI_CUSTOMER}/account/list?${stringified}`);
		if (result.status === "OK") {
			this.customerCache[stringified] = {
				value: result,
				createdAt: new Date(),
			};
		}
		return result;
	}

	async getUserById(params) {
		const stringified = queryString.stringify(params);
		const res = await this.call("GET", `${URI}/account/list?${stringified}`);
		return res;
	}

	getAccounts(accountIDs) {
		return this.call("GET", `${URI}/account/list`, {
			accountIDs: accountIDs.join(",")
		})
	}

	getAccountInfoByID(params) {
		const stringified = queryString.stringify(params);
		return this.call("GET", `${URI}/account/list?${stringified}`);
	}
	async getListEmployee(params) {
		const stringified = queryString.stringify(params);
		return this.call("GET", `${URI}/account/list?${stringified}`);
	}

	getCustomerById(params) {
		const stringified = queryString.stringify(params);
		return this.call("GET", `${URI_CUSTOMER}/account?${stringified}`);
	}

	getListCustomerSupport(params) {
		const stringified = queryString.stringify(params);
		return this.call("GET", `${URI}/employee/all-v2?${stringified}`);
	}
	getListAccountByIds(params) {
		return this.call("GET", `${URI}/account/list?accountIDs=${params.join(',')}`)
	}
	getListEmployeeByDepartment(departmentCode) {
		return this.call('GET', `${URI}/employee/by-department`, {
			departmentCode,
			offset: 0,
			limit: 200,
			getTotal: true,
		});
	}
	
	getEmployeeV2(filter) {
		return this.call("GET", `${URI}/employee/all-v2`, filter)
	}
}

export function getAccountClient(ctx, data) {
	return new AccountClient(ctx, data);
}
