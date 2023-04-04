import { getAnalyticsClient } from "client/integration-analytics";
import { APIStatus } from "lib/common";

export async function getOrderChartData(ctx, data) {
	// setup query
	let fromDate = new Date();
	fromDate.setMonth(fromDate.getMonth() - 1);
	fromDate.setHours(0);
	fromDate.setMinutes(0, 0, 0);
	let query = {
		orderCount: {
			metric: "ORDER_COUNT",
			span: "DAY",
			from: fromDate,
		},
		orderValue: {
			metric: "ORDER_VALUE",
			span: "DAY",
			from: fromDate,
		},
	};

	// call API
	let provinceCode = ctx.query.provinceCode;
	let client = getAnalyticsClient(ctx, data);
	let result;

	if (provinceCode) {
		query.orderCount.provinceCode = provinceCode;
		query.orderValue.provinceCode = provinceCode;
		result = await client.getAnalyticsProvinceMulti(query);
	} else {
		result = await client.getAnalyticsMulti(query);
	}

	// init response
	let orderCount = [];
	let orderValue = [];
	if (result.status !== APIStatus.OK || !result.data || !result.data[0]) {
		return { orderCount, orderValue };
	}

	// fill data from API
	function convert(item) {
		let d = new Date(item.time);
		d.setTime(d.getTime() + (d.getTimezoneOffset() + 420) * 60000);
		return {
			label: d.getDate() + "/" + (d.getMonth() + 1),
			value: item.value,
		};
	}

	let adata = result.data[0];
	orderCount = adata.orderCount.data.map(convert);
	orderValue = adata.orderValue.data.map(convert);

	// return
	return { orderCount, orderValue };
}
