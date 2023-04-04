import { getReportClient } from "../clients/report";


export async function getWaitTimeChartData({ ctx, params }) {
	const client = getReportClient(ctx, {});

	const newParams = { ...params };

	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}

	const res = await client.getWaitTimeChartData(newParams);

	return {
		data: res,
	};
}

export async function getNumberByDateChartData({ ctx, params }) {
	const client = getReportClient(ctx, {});

	const newParams = { ...params };

	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}

	const res = await client.getNumberByDateChartData(newParams);

	return {
		data: res,
	};
}

export async function getNumberByCSChartData({ ctx, params }) {
	
	const client = getReportClient(ctx, {});

	const newParams = { ...params };

	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}

	const res = await client.getNumberByCSChartData(newParams);

	return {
		data: res,
	};
}

export async function getNumberByHourChartData({ ctx, params }) {
	const client = getReportClient(ctx, {});

	const newParams = { ...params };

	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}

	const res = await client.getNumberByHourChartData(newParams);

	return {
		data: res,
	};
}

export async function getCompletedTimeChartData({ ctx, params }) {
	const client = getReportClient(ctx, {});

	const newParams = { ...params };

	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}

	const res = await client.getCompletedTimeChartData(newParams);

	return {
		data: res,
	};
}

export async function getRatingChartData({ ctx, params }) {
	const client = getReportClient(ctx, {});

	const newParams = { ...params };

	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}

	const res = await client.getRatingChartData(newParams);

	return {
		data: res,
	};
}

export async function getCountAverageRating({ ctx, params }) {
	const client = getReportClient(ctx, {});

	const newParams = { ...params };

	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}

	const res = await client.getCountAverageRating(newParams);

	return {
		data: res,
	};
}

export async function getCountAverageCompletedTopic({ ctx, params }) {
	const client = getReportClient(ctx, {});

	const newParams = { ...params };

	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}

	const res = await client.getCountAverageCompletedTopic(newParams);

	return {
		data: res,
	};
}

export async function getCountAverageProcessingTopic({ ctx, params }) {
	const client = getReportClient(ctx, {});

	const newParams = { ...params };

	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}

	const res = await client.getCountAverageProcessingTopic(newParams);

	return {
		data: res,
	};
}

export async function getLastUpdateReport({ ctx, params }) {
	const client = getReportClient(ctx, {});

	const res = await client.getLastUpdateReport(params);

	return {
		data: res,
	};
}

export async function getNumberRatingByDate({ ctx, params }) {
	const client = getReportClient(ctx, {});

	const res = await client.getNumberRatingByDate(params);

	return {
		data: res,
	};
}

export async function getNumberByDateSellerWithSAChartData({ ctx, params }) {
	const client = getReportClient(ctx, {});

	const newParams = { ...params };

	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}

	const res = await client.getNumberByDateSellerWithSAChartData(newParams);

	return {
		data: res,
	};
}

export async function getWaitTimeSellerWithSAChartData({ ctx, params }) {
	const client = getReportClient(ctx, {});

	const newParams = { ...params };

	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}

	const res = await client.getWaitTimeSellerWithSAChartData(newParams);

	return {
		data: res,
	};
}

export async function getRatingSellerWithSAChartData({ ctx, params }) {
	const client = getReportClient(ctx, {});

	const newParams = { ...params };

	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}

	const res = await client.getRatingSellerWithSAChartData(newParams);

	return {
		data: res,
	};
}

export async function getCompletedTimeSellerWithSAChartData({ ctx, params }) {
	const client = getReportClient(ctx, {});

	const newParams = { ...params };

	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}

	const res = await client.getCompletedTimeSellerWithSAChartData(newParams);

	return {
		data: res,
	};
}

export async function getLastUpdateReportSellerWithSA({ ctx, params }) {
	const client = getReportClient(ctx, {});

	const res = await client.getLastUpdateReportSellerWithSA(params);

	return {
		data: res,
	};
}

export async function getCountAverageProcessingTopicSellerWithSA({ ctx, params }) {
	const client = getReportClient(ctx, {});

	const newParams = { ...params };

	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}

	const res = await client.getCountAverageProcessingTopicSellerWithSA(newParams);

	return {
		data: res,
	};
}

export async function getCountAverageCompletedTopicSellerWithSA({ ctx, params }) {
	const client = getReportClient(ctx, {});

	const newParams = { ...params };

	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}

	const res = await client.getCountAverageCompletedTopicSellerWithSA(newParams);

	return {
		data: res,
	};
}