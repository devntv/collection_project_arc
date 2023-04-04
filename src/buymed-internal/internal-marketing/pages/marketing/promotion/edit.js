import {
	doWithLoggedInUser,
	renderWithLoggedInUser,
} from "@thuocsi/nextjs-components/lib/login";
import { getPromoClient } from "../../../client/promo";
import { getAccountClient } from "../../../client/account";
import PromotionForm from "./form-v2";
import { handleReward } from "containers/voucher/VoucherReward";
import { handleCondition } from "containers/voucher/VoucherCondition";
import { getScopeData } from "containers/voucher/VoucherScope";
import { handleScope } from "components/promotion-voucher/form-v2/PromotionScope";
import { defaultPromotionRewardType, defaultReward } from "components/promotion-voucher/constant";

export async function getServerSideProps(ctx) {
	return await doWithLoggedInUser(ctx, async (ctx) => {
		return await loadDataBefore(ctx);
	});
}

export async function loadDataBefore(ctx) {
	let returnObject = {
		props: {
			promotionRes: null,
			createdBy: null,
			levelOpts: [],
			areaOpts: []
		},
	};
	let promotionId = ctx.query?.promotionId || null;

	if (!promotionId || promotionId === "" || promotionId === "undefined") {
		return returnObject
	}

	let { levelOpts, areaOpts } = await getScopeData(ctx)
    returnObject.props.levelOpts = levelOpts
    returnObject.props.areaOpts = areaOpts

	let _promotionClient = getPromoClient(ctx, {});
	let promotionRes = await _promotionClient.getPromotionByID(promotionId);

	if (promotionRes && promotionRes.status === "OK") {
		let data = promotionRes.data[0];

		if (promotionRes.data[0]?.createdBy) {
			let accountRes = await getAccountClient(ctx, {}).getAccountByIds(promotionRes.data[0]?.createdBy);
			if (accountRes.status === "OK" && accountRes.data) returnObject.props.createdBy = accountRes?.data?.[0]?.accountId + " - " + accountRes?.data?.[0]?.fullname;
		}

		data.rewardType = "ALL"

		data = await handleReward(ctx, data)
		data = await handleCondition(ctx, data)
		data = handleScope(data, returnObject.props.levelOpts, returnObject.props.areaOpts)

		if (data.promotionType === "VOUCHERCODE") {
			if (data.rewardType === defaultReward.gift) data.promotionType = defaultPromotionRewardType.GIFT
			else if (data.rewardType === defaultReward.absolute || data.rewardType === defaultReward.percentage) data.promotionType = defaultPromotionRewardType.DISCOUNT
			else {
				data.promotionType = defaultPromotionRewardType.ALL
			}
		}

		returnObject.props.promotionRes = data;

	}
	return returnObject;
}

export default function NewPage(props) {
	return renderWithLoggedInUser(props, render);
}

function render(props) {
	return PromotionForm(props, "edit");
}
