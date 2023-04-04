import { getMasterDataClient } from "../clients/master-data";
import { APIStatus } from "../lib/common";
import { getData, pushData } from "../utilities/localStorage";

const PROVINCE_PREFIX = "province";
const DISTRICT_PREFIX = "district";
const WARD_PREFIX = "ward";

export const getProvinces = async (ctx, params) => {
	const client = getMasterDataClient(ctx, {});
	const res = await client.getProvinces({ limit: 1000, ...params });
	return res.status === APIStatus.OK ? res.data : [];
};

export const getProvinceByCode = async ({ ctx, params }) => {
	const client = getMasterDataClient(ctx, {});
	const newParams = { ...params };
	const { code } = newParams;
	const data = getData(PROVINCE_PREFIX + code);
	if (!data) {
		const res = await client.getProvinceByCode(newParams);
		if (res.status === APIStatus.OK) {
			pushData(PROVINCE_PREFIX + code, res.data[0].name);
		}
		return res;
	}
	return {
		status: APIStatus.OK,
		data: [
			{
				code: code,
				name: data,
			},
		],
	};
};

export const getDistrictByCode = async ({ ctx, params }) => {
	const client = getMasterDataClient(ctx, {});
	const newParams = { ...params };
	const { code } = newParams;
	const data = getData(DISTRICT_PREFIX + code);
	if (!data) {
		const res = await client.getDistrictByCode(newParams);
		if (res.status === APIStatus.OK) {
			pushData(DISTRICT_PREFIX + code, res.data[0].name);
		}
		return res;
	}
	return {
		status: APIStatus.OK,
		data: [
			{
				code: code,
				name: data,
			},
		],
	};
};

export const getWardByCode = async ({ ctx, params }) => {
	const client = getMasterDataClient(ctx, {});
	const newParams = { ...params };
	const { wardCode: code } = newParams;
	const data = getData(WARD_PREFIX + code);
	if (!data) {
		const res = await client.getWardByCode(newParams);
		if (res.status === APIStatus.OK) {
			pushData(WARD_PREFIX + code, res.data[0].name);
		}
		return res;
	}
	return {
		status: APIStatus.OK,
		data: [
			{
				code: code,
				name: data,
			},
		],
	};
};
