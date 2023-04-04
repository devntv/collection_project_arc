import { getAnalyticsClient } from "client/integration-analytics";
import { APIStatus } from "lib/common";

export async function getCustomerChartData(ctx, data) {
	// setup query
	let fromDate = new Date();
	fromDate.setMonth(fromDate.getMonth() - 1);
	let query = {
		registration: {
			metric: "CUSTOMER_REGISTRATION",
			span: "DAY",
			from: fromDate,
		},
		activation: {
			metric: "CUSTOMER_ACTIVATION",
			span: "DAY",
			from: fromDate,
		},
		placeOrder: {
			metric: "PLACE_ORDER_CUSTOMER",
			span: "DAY",
			from: fromDate,
		},
	};

	// call API
	let client = getAnalyticsClient(ctx, data);
	let result = await client.getAnalyticsMulti(query);

	// init response
	let registration = [];
	let activation = [];
	let activeAccount = [];
	let placeOrder = [];
	if (result.status !== APIStatus.OK || !result.data || !result.data[0]) {
		return { registration, activation, activeAccount, placeOrder };
	}

	// fill data from API
	function convert(item) {
		let d = new Date(item.time);
		d.setTime(d.getTime() + (d.getTimezoneOffset() + 420) * 60000);
		return {
			time: item.time,
			label: d.getDate() + "/" + (d.getMonth() + 1),
			value: item.value,
		};
	}
	let adata = result.data[0];
	registration = adata.registration.data.map(convert);
	activation = adata.activation.data.map(convert);
	placeOrder = adata.placeOrder.data.map(convert);

	// return
	return { registration, activation, placeOrder };
}
