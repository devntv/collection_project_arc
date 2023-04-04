import { getEquipmentClient } from "../clients/equipment";

export const getDeviceList = async (ctx, params) => {
	const client = getEquipmentClient(ctx, {});
    const newParams = { ...params };
    const res = await client.getDeviceList(newParams);

    return res;
}

export const getDeviceTypeList = async (ctx, params) => {
    const client = getEquipmentClient(ctx, {});
    const newParams = { ...params };
    const res = await client.getDeviceTypeList(newParams);

    return res;
}

export const getSupplierList = async (ctx, params) => {
    const client = getEquipmentClient(ctx, {});
    const newParams = { ...params };
    const res = await client.getSupplierList(newParams);

    return res;
}

export const getTrademarkList = async (ctx, params) => {
    const client = getEquipmentClient(ctx, {});
    const newParams = { ...params };
    const res = await client.getTrademarkList(newParams);

    return res;
}

export async function getListEmployee({ ctx, params }) {
	const client = getEquipmentClient(ctx, {});
	const newParams = { ...params };

	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}

    const res = await client.getUserById(newParams);
    return res;
}

export async function getUserById(ctx, data){
    const newParams = { ...data };
	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}
    const client = getEquipmentClient(ctx, {});

    const res = await client.getUserById(newParams);
    return res;
}
