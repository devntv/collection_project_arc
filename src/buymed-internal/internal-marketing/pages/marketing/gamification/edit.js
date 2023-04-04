import {
	doWithLoggedInUser,
	renderWithLoggedInUser,
} from "@thuocsi/nextjs-components/lib/login";
import { getGamificationClient } from "client/gamification";
import { getCustomerClient } from "client/customer";
import { scopes, gamificationType } from "components/global";
import GamificationForm from "./form";

export async function getServerSideProps(ctx) {
	return await doWithLoggedInUser(ctx, async (ctx) => {
		return await loadDataBefore(ctx);
	});
}

export async function loadDataBefore(ctx) {
	const code = ctx.query.code;
	const data = {
		props: {
			gamificationRes: null
		},
	};

	const gamificationClient = getGamificationClient(ctx, {});
	const gamificationClientRes = await gamificationClient.getGamification({}, code);
	
	if (gamificationClientRes && gamificationClientRes.status === "OK") {
		const gamificationRes = gamificationClientRes.data ? gamificationClientRes.data[0] : {};
		const objScopes = {}
		let customerScopes = [{ value: "all", label: "Tất cả" }]
		if (gamificationRes?.scope?.customerScopes?.toString()) {
			gamificationRes?.scope?.customerScopes?.forEach(element => {
				objScopes[element] = element
			});
			customerScopes = scopes.filter(item => objScopes[item.value] === item.value) ?? []
		}

		let customerIDs = [{ value: "all", label: "Tất cả" }]

		if(gamificationRes.scope?.customerIDs?.length) {
			const resCustomer = await getCustomerClient(ctx, {}).getCustomerByIDs(gamificationRes.scope?.customerIDs);
			customerIDs = resCustomer?.data?.map((customer) => {
				return {
					value: customer.customerID,
					label: customer.name,
				}
			}) || [{ value: "all", label: "Tất cả" }];
		}

		let status = ""
		if(new Date() >= new Date(gamificationRes?.endTime)) status = "EXPIRED"
		else if(new Date() >= new Date(gamificationRes?.startTime) && new Date() < new Date(gamificationRes?.endTime)) status = "PROCESSING"
		else if (new Date() < new Date(gamificationRes.startTime)) status = "UPCOMING"

		data.props.gamificationRes = {
			gamificationCode: gamificationRes.gamificationCode ?? "",
			name: gamificationRes.name ?? "",
			description: gamificationRes.description ?? null,
			startTime: gamificationRes.startTime ?? null,
			endTime: gamificationRes.endTime ?? null, 
			publicTime: gamificationRes.publicTime ?? null,
			customerIDs,
			customerScopes,
			conditionDescription: gamificationRes.scope?.description || "",
			type: gamificationRes.details?.[0]?.condition?.type || "TOTAL_ORDER_PRICE",
			target: gamificationRes.details?.[0]?.condition?.target || 0,
			reward: gamificationRes.details?.[0]?.reward?.description || "",
			detailDescription: gamificationRes.details?.[0]?.condition?.description || "",
			gamificationDetailCode: gamificationRes.details?.[0]?.gamificationDetailCode || "",
			status,
			createdTime: gamificationRes.createdTime ?? null,
			numberOfDayCalResult: gamificationRes?.numberOfDayCalResult || 0,
			sellerCode: gamificationRes?.sellerCode || ""
		}
	}

	return data;
}

export default function NewPage(props) {
	return renderWithLoggedInUser(props, render);
}

function render(props) {
	return GamificationForm(props, "edit");
}
