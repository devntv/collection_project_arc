import { getAccountClient } from "../clients/account";

export async function getMe(ctx, data) {
    const client = getAccountClient(ctx, data)
    return await client.getMe()
}

export async function getUserById(ctx, data){
    const newParams = { ...data };
	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}
    const client = getAccountClient(ctx, {});

    const res = await client.getUserById(newParams);
    return res;
}

export async function getAccountInfoByID({ ctx, params }) {
	const client = getAccountClient(ctx, {});
	const newParams = { ...params };

	const res = await client.getAccountInfoByID(newParams);
	return res;
}

export const getCustomerById = async ({ctx, params}) => {
	const client = getAccountClient(ctx, {});
	const newParams = { ...params };

	const res = await client.getCustomerById(newParams);
	return res;
}