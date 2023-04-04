import { getChatClient } from "clients/chat";
import { getAccountClient } from "clients/account";
import { handleMessageMedia } from "utilities/handleMessage";
import { getConversationOnlineTime, isNotSeenAll } from "utilities/conversation";
import { AccountType, APIStatus } from "lib/common";
import { getAmountInCart, handleProductPrice } from "./ProductService";
import { CONVERSATION_STATUS } from "constants/chat";
const isUpdatingText = "Đang cập nhật";

export const BUZZ = "BUZZ";

export const conversationStatus = {
	[CONVERSATION_STATUS.WAIT_TO_PROCESS]: {
		status: CONVERSATION_STATUS.WAIT_TO_PROCESS,
		text: "Chờ xử lý",
		color: "#EE4D2D",
	},
	[CONVERSATION_STATUS.PROCESSING]: {
		status: CONVERSATION_STATUS.PROCESSING,
		text: "Đang xử lý",
		color: "#1A73B8",
	},
	[CONVERSATION_STATUS.WAIT_TO_COMPLETE]: {
		status: CONVERSATION_STATUS.WAIT_TO_COMPLETE,
		text: "Chờ hoàn tất",
		color: "#1DC3C3",
	},
	[CONVERSATION_STATUS.COMPLETED]: {
		status: CONVERSATION_STATUS.COMPLETED,
		text: "Hoàn tất",
		color: "#15A959",
	},
};

export const QUICK_MESSAGE_CODE = "/";

export const TAG_COMMAND_CODE = "@";

export const TAG_CODE = {
	SP: "@SP_",
	DH: "@DH_",
	HOTRO: "@HOTRO_",
	// MAKM:"@MAKM_",
	// CTKM:"@CTKM_",
};

export const TAG_LIST = [
	{
		code: TAG_CODE.SP,
		image: "/images/tags/medicine.png",
		title: "Tìm kiếm và tag một sản phẩm",
		guide: `${TAG_CODE.SP}<Tên sản phẩm>`,
	},
	{
		code: TAG_CODE.DH,
		image: "/images/tags/Vector.png",
		title: "Tìm kiếm và tag một đơn hàng của khách hàng",
		guide: `${TAG_CODE.DH}<Mã đơn hàng>`,
	},
	// {
	//     code: TAG_CODE.MAKM,
	//     image: "/images/tags/promo-code.png",
	//     title: "Tìm kiếm và tag một mã giảm giá",
	//     guide: `${TAG_CODE.MAKM}<Mã giảm giá>`,
	// },
	// {
	//     code: TAG_CODE.CTKM,
	//     image: "/images/tags/tag.png",
	//     title: "Tìm kiếm và tag chương trình khuyến mãi",
	//     guide: `${TAG_CODE.CTKM}<CT khuyến mãi>`,
	// },
	{
		code: TAG_CODE.HOTRO,
		image: "/images/tags/help.png",
		title: "Tìm kiếm và tag một phiếu hỗ trợ",
		guide: `${TAG_CODE.HOTRO}<Mã phiếu hỗ trợ>`,
	},
];

export const CONVERSATION_TYPE = {
	CUSTOMER_WITH_CS: "CUSTOMER_WITH_CS",
	GUEST_WITH_CS: "GUEST_WITH_CS",
	SELLER_WITH_SELLER_ADMIN: "SELLER_WITH_SELLER_ADMIN",
};

export const MESSAGE_TYPE = {
	GUEST_TO_CS: "GUEST_TO_CS",
	CS_TO_GUEST: "CS_TO_GUEST",
	CUSTOMER_TO_CS: "CUSTOMER_TO_CS",
	CS_TO_CUSTOMER: "CS_TO_CUSTOMER",
};

export const handleConversationOnline = async (conversation, ctx = null) => {
	const onlineStatusRes = await getUserOnlineStatus({
		...(ctx && { ctx }),
		data: [
			conversation.conversationType === CONVERSATION_TYPE.GUEST_WITH_CS
				? {
						userID: conversation.guestInfo.guestID,
						accountType: AccountType.GUEST,
				  }
				: {
						userID: conversation.customerID,
						accountType: AccountType.CUSTOMER,
				  },
		],
	});
	if (onlineStatusRes.status === APIStatus.OK) {
		conversation.lastActiveAt =
			onlineStatusRes.data[0].lastActiveAt || conversation.lastActiveAt || null;
	} else {
		conversation.lastActiveAt = conversation.lastActiveAt || null;
	}
	conversation.onlineStatus = getConversationOnlineTime(conversation);
};

export const handleListConversationOnline = async (listConversation, ctx = null) => {
	const ids = [];
	listConversation.forEach((item) => {
		if (item.customerID) {
			ids.push({
				userID: item.customerID,
				accountType: AccountType.CUSTOMER,
			});
		}
		if (item.guestInfo && item.guestInfo.guestID) {
			ids.push({
				userID: item.guestInfo.guestID,
				accountType: AccountType.GUEST,
			});
		}
	});
	const onlineStatusRes = await getUserOnlineStatus({
		...(ctx && { ctx }),
		data: [...ids],
	});
	const n = listConversation.length;
	if (onlineStatusRes.status === APIStatus.OK) {
		for (let i = 0; i < n; i++) {
			const m = onlineStatusRes.data.length;
			listConversation[i].lastActiveAt = listConversation[i].lastActiveAt || null;
			for (let j = 0; j < m; j++) {
				if (
					(listConversation[i].conversationType === CONVERSATION_TYPE.CUSTOMER_WITH_CS &&
						listConversation[i].customerID === onlineStatusRes.data[j].userID) ||
					(listConversation[i].conversationType === CONVERSATION_TYPE.GUEST_WITH_CS &&
						listConversation[i].guestInfo.guestID === onlineStatusRes.data[j].userID)
				) {
					listConversation[i].lastActiveAt =
						onlineStatusRes.data[j].lastActiveAt ||
						listConversation[i].lastActiveAt ||
						null;
					break;
				}
			}
		}
	} else {
		for (let i = 0; i < n; i++) {
			listConversation[i].lastActiveAt = null;
		}
	}
	for (let i = 0; i < n; i++) {
		listConversation[i].onlineStatus = getConversationOnlineTime(listConversation[i]);
	}
};

export async function getListConversation({ ctx, params }) {
	const client = getChatClient(ctx, {});

	const newParams = { ...params };

	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}

	newParams.offset =
		!params.page || params.page <= 1 ? 0 : (params.page - 1) * (params.limit || 5);
	newParams.getTotal = true;

	const res = await client.getListConversation(newParams);
	return {
		data: res,
		pagination: {
			page: Number.parseInt(newParams.page) || 1,
			limit: Number.parseInt(newParams.limit) || 5,
			total: res?.total || 0,
		},
	};
}

export async function getMessageInTheConversation({ ctx, params }) {
	const client = getChatClient(ctx, {});

	const newParams = { ...params };

	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}
	newParams.offset =
		!params.page || params.page <= 1 ? 0 : (params.page - 1) * (params.limit || 5);
	newParams.getTotal = false;
	const res = await client.getMessageInTheConversation(newParams);
	return res;
}

export async function sendMessageInTheConversation({ ctx, params }) {
	const client = getChatClient(ctx, {});
	const newParams = { ...params };
	newParams.type = newParams.type || "TEXT";
	const res = await client.sendMessage(newParams);
	return res;
}

export async function sendMessageFromCSToCustomer({ ctx, params }) {
	const client = getChatClient(ctx, {});
	const newParams = { ...params };
	newParams.type = newParams.type || "TEXT";
	const res = await client.sendMessageFromCSToCustomer(newParams);
	return res;
}

export async function sendMessageFromCSToGuest({ ctx, params }) {
	const client = getChatClient(ctx, {});
	const newParams = { ...params };
	newParams.type = newParams.type || "TEXT";
	const res = await client.sendMessageFromCSToGuest(newParams);
	return res;
}

export async function sendMessageFromCustomerToCS({ ctx, params }) {
	const client = getChatClient(ctx, {});
	const newParams = { ...params };
	newParams.type = newParams.type || "TEXT";
	const res = await client.sendMessageFromCustomerToCS(newParams);
	return res;
}

export async function getConversationById({ ctx, params, t }) {
	const client = getChatClient(ctx, {});
	const newParams = { ...params };
	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}
	newParams.conversationID = params.conversationID;
	const res = await client.getConversationById(newParams);
	if (res.status === APIStatus.OK) {
		await handleConversationOnline(t, res.data[0], ctx);
	}
	return res;
}

export async function pingToStayInConnect({ ctx, params }) {
	const client = getChatClient(ctx, {});
	const res = await client.pingToStayInConnect(params);
	return res;
}

export async function createNewConversation({ ctx, params }) {
	const client = getChatClient(ctx, {});
	const res = await client.createConversation(params);
	return res;
}

export async function handleSeenMessage({ ctx, params }) {
	const client = getChatClient(ctx, {});
	const res = await client.handleSeenMessage(params);
	return res;
}

export async function getMessageById({ ctx, params }) {
	const client = getChatClient(ctx, {});
	const res = await client.getMessageById(params);
	return res;
}
export async function getListEmployee({ ctx, params }) {
	const client = getAccountClient(ctx, {});
	const newParams = { ...params };

	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}

	newParams.getTotal = params.getTotal || true;
	const res = await client.getListEmployee(newParams);
	return {
		data: res,
		pagination: {
			page: Number.parseInt(newParams.page) || 1,
			limit: Number.parseInt(newParams.limit) || 5,
			total: res?.total || 0,
		},
	};
}
export async function getListCustomerSupport({ ctx, params }) {
	const client = getAccountClient(ctx, {});
	const newParams = { ...params };

	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}

	newParams.getTotal = params.getTotal || true;
	const res = await client.getListCustomerSupport(newParams);
	return {
		data: res,
		pagination: {
			page: Number.parseInt(newParams.page) || 1,
			limit: Number.parseInt(newParams.limit) || 5,
			total: res?.total || 0,
		},
	};
}
export async function createMemberInConversation({ ctx, data }) {
	const client = getChatClient(ctx, {});
	const res = await client.createMemberInConversation(data);
	return res;
}

export async function getConversationResource({ ctx, params }) {
	const client = getChatClient(ctx, {});
	const res = await client.getConversationResource(params);
	return res;
}

export async function removeMemberInConversation({ ctx, data }) {
	const client = getChatClient(ctx, {});
	const res = await client.removeMemberInconversation(data);
	return res;
}

export async function getListConversationCS({ ctx, params }) {
	const client = getChatClient(ctx, {});

	const newParams = { ...params };
	newParams.offset = 0;
	const res = await client.getListConversationCS(newParams);
	if (res.status === APIStatus.OK) {
		await handleListConversationOnline(res.data, ctx);
	}
	return {
		data: res,
		pagination: {
			page: Number.parseInt(newParams.page) || 1,
			limit: Number.parseInt(newParams.limit) || 5,
			total: res?.total || 0,
		},
	};
}

export async function getListConversationSeller({ ctx, params }) {
	const client = getChatClient(ctx, {});

	const newParams = { ...params };

	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}

	newParams.offset =
		!params.page || params.page <= 1 ? 0 : (params.page - 1) * (params.limit || 5);
	newParams.getTotal = true;

	const res = await client.getListConversationSeller(newParams);
	return {
		data: res,
		pagination: {
			page: Number.parseInt(newParams.page) || 1,
			limit: Number.parseInt(newParams.limit) || 5,
			total: res?.total || 0,
		},
	};
}

export async function getListConversationCustomer({ ctx, params }) {
	const client = getChatClient(ctx, {});

	const newParams = { ...params };

	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}

	// newParams.offset =
	// 	!params.page || params.page <= 1 ? 0 : (params.page - 1) * (params.limit || 5);
	// newParams.getTotal = true;
	newParams.offset = 0;
	newParams.limit = 1000;

	const res = await client.getListConversationCustomer(newParams);
	if (res.status === APIStatus.OK) {
		res?.data?.forEach((item) => {
			item.customerSupportAvatar =
				item.conversationType === "CUSTOMER_WITH_CS"
					? "/images/chat/thuoc-si-logo.png"
					: "/images/chat/seller-logo.png";
		});
	}
	return {
		data: res,
		pagination: {
			page: Number.parseInt(newParams.page) || 1,
			limit: Number.parseInt(newParams.limit) || 5,
			total: res?.total || 0,
		},
	};
}

export async function getConversationInUrl(ctx, conversationID, t) {
	if (!conversationID) return null;
	const res = await getConversationById({
		ctx,
		params: {
			conversationID,
		},
		t,
	});
	return res;
}

export async function getConversation(
	context,
	conversationID,
	messagePagi,
	resourcePagi,
	tagPagi,
	user
) {
	const res = await getConversationInUrl(context, conversationID);
	const newConversation = (res && res.data && res.data[0]) || null;
	if (newConversation) {
		// if (newConversation.lastMessage && !hasSeen(newConversation, {
		// 	...user.account,
		// 	accountID: user.account.accountId
		// })) {
		// 	const seenRes = await handleSeenMessage({
		// 		ctx: context,
		// 		params: {
		// 			conversationID: newConversation.conversationID,
		// 			lastMessageSeen: newConversation.lastMessage.messageID,
		// 			sessionID: `${new Date().getTime()}`,
		// 		}
		// 	});
		// 	if (seenRes.status === APIStatus.OK) {
		// 		const m = newConversation.members.length;
		// 		for (let i = 0; i < m; i++) {
		// 			newConversation.seenMessageOrder = seenRes.data[0].seenMessageOrder
		// 			if (isSameMember(newConversation.members[i], seenRes.data[0])) {
		// 				newConversation.members[i] = { ...seenRes.data[0] };
		// 				break;
		// 			}
		// 		}
		// 	}
		// }
		const m = newConversation.members.length;
		const flag = isNotSeenAll(newConversation, {
			accountID: user.account.accountId,
			accountType: AccountType.EMPLOYEE,
		});
		if (flag) {
			return {
				data: [],
				newConversation,
				resource: [],
				tags: [],
				topicIDs: [],
			};
		}
		const res1 = await getMessageInTheConversation({
			ctx: context,
			params: {
				lastMessageID: newConversation.lastMessageID,
				conversationID: newConversation.conversationID,
				limit: messagePagi.limit,
				page: messagePagi.page++,
			},
		});
		const topicIDSet = new Set();
		if (res1.status === APIStatus.OK) {
			const n = res1.data.length;
			for (let i = 0; i < n; i++) {
				await getReplyFor(res1.data[i], res1.data, context);
				if (res1.data[i].URLMedia) {
					res1.data[i].media = {
						url: res1.data[i].URLMedia,
						type: res1.data[i].type.toLowerCase(),
						name: res1.data[i].fileName || "",
					};
				}
				handleMessageMedia(res1.data[i]);
				if (res1.data[i].topicID === 0 || res1.data[i].topicID) {
					topicIDSet.add(res1.data[i].topicID);
				}
			}
		}

		const res3 = await getConversationResource({
			ctx: context,
			params: {
				limit: 1000,
				getTotal: true,
				conversationID: conversationID,
				topicIDs: [...topicIDSet],
			},
		});

		const res4 =
			newConversation.conversationType !== CONVERSATION_TYPE.GUEST_WITH_CS
				? await getConversationTag({
						ctx: context,
						data: {
							...tagPagi,
							getTotal: true,
							conversationID: conversationID,
							topicIDs: [...topicIDSet],
						},
				  })
				: {};

		return {
			data: res1.data || [],
			newConversation,
			resource: res3.data || [],
			tags: res4.data || [],
			topicIDs: [...topicIDSet],
		};
	}
}

export const updateConversationStatusToWaitToComplete = async ({ ctx, data }) => {
	const client = getChatClient(ctx, {});
	const res = await client.updateConversationStatusToWaitToComplete(data);
	return res;
};

export const pinConversation = async ({ ctx, conversationID }) => {
	const client = getChatClient(ctx, {});
	const res = await client.pinConversation(conversationID);
	return res;
};

export const unpinConversation = async ({ ctx, conversationID }) => {
	const client = getChatClient(ctx, {});
	const res = await client.unpinConversation(conversationID);
	return res;
};

export const reactMessage = async ({ ctx, data }) => {
	const client = getChatClient(ctx, {});
	const res = await client.reactMessage(data);
	return res;
};

export const unReactMessage = async ({ ctx, data }) => {
	const client = getChatClient(ctx, {});
	const res = await client.unReactMessage(data);
	return res;
};

export const getUserOnlineStatus = async ({ ctx, data }) => {
	const client = getChatClient(ctx, {});
	const res = await client.getUserOnlineStatus(data);
	return res;
};

export const getRatingStatus = async (ctx, conversationID) => {
	const client = getChatClient(ctx, {});
	const res = await client.getRatingStatus(conversationID);
	return res;
};

export const sendRating = async (ctx, data) => {
	const client = getChatClient(ctx, {});
	const res = await client.sendRating(data);
	return res;
};

export const getConversationTag = async ({ ctx, data }) => {
	const client = getChatClient(ctx, {});
	const res = await client.getConversationTag({
		offset: 0,
		limit: 1000,
		...data,
	});
	return res;
};

export const forwardConversation = async ({ ctx, data }) => {
	const client = getChatClient(ctx, {});
	const res = await client.forwardConversation(data);
	return res;
};

export const findMessageByDate = async ({ ctx, data }) => {
	const client = getChatClient(ctx, {});
	const res = await client.findMessageByDate(data);
	return res;
};

export const getMessageScrollDown = async ({ ctx, data }) => {
	const client = getChatClient(ctx, {});
	const res = await client.getMessageInTheConversationScrollDown(data);
	return res;
};

export const searchMessage = async ({ ctx, data }) => {
	const client = getChatClient(ctx, {});
	const res = await client.searchMessage(data);
	return res;
};

export async function getListManageConversationTopic({ ctx, params }) {
	const client = getChatClient(ctx, {});
	const newParams = { ...params };

	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}

	const res = await client.getListManageConversationTopic(newParams);

	return {
		data: res,
		pagination: {
			// page: Number.parseInt(newParams.page) || 1,
			// limit: Number.parseInt(newParams.limit) || 5,
			total: res?.total || 0,
		},
	};
}

export async function getCountTopicStatus({ ctx, params }) {
	const client = getChatClient(ctx, {});
	const res = await client.getCountTopicStatus(params);
	return {
		data: res,
	};
}

export const getMemberByID = async ({ ctx, data }) => {
	const client = getChatClient(ctx, {});
	const res = await client.getMemberByID(data);
	return res;
};
export const getFirstMessageOfTopic = async ({ ctx, data }) => {
	const client = getChatClient(ctx, {});
	const res = await client.getFirstMessageOfTopic(data);
	return res;
};

export const getChatConfiguration = async function (ctx) {
	const client = getChatClient(ctx, {});
	const res = await client.getChatConfiguration();
	return res;
};

export const updateChatConfiguration = async function ({ ctx, data }) {
	const client = getChatClient(ctx, {});
	const res = await client.updateChatConfiguration(data);
	return res;
};

export async function getListNumberByDate({ ctx, params }) {
	const client = getChatClient(ctx, {});

	const newParams = {
		...params,
		getTotal: true,
	};

	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}

	const res = await client.getListNumberByDate(newParams);

	return {
		data: res,
	};
}

export const getEmployeeChatPermission = async ({ ctx, data }) => {
	const client = getChatClient(ctx);
	const res = await client.getEmployeeChatPermission(data);
	return res;
};

export const updateUserChatPermission = async ({ ctx, data }) => {
	const client = getChatClient(ctx);
	const res = await client.updateUserChatPermission(data);
	return res;
};

export const getReplyFor = async (message, listMessage = [], context = null) => {
	if (message.replyFor) {
		let found = false;
		for (let i = 0; i < listMessage.length && !found; i++) {
			if (listMessage[i].messageID === message.replyFor) {
				message.replyForMessage = {
					...listMessage[i],
				};
				found = true;
			}
		}
		if (!found) {
			const replyFor = await getMessageById({
				...(context && { ctx: context }),
				params: {
					messageID: message.replyFor,
				},
			});
			if (replyFor.status === APIStatus.OK) {
				message.replyForMessage = replyFor.data[0];
			}
		}
	}
};

export const ACTIVITY_TYPE = {
	ACCEPT_TOPIC: {
		key: "ACCEPT_TOPIC",
		content: "Tiếp nhận phản hồi",
	},
	TRANSFER_CS: {
		key: "TRANSFER_CS",
		content: "Chuyến tiếp",
	},
	COMPLETE_TOPIC_BY_RATING: {
		key: "COMPLETE_TOPIC_BY_RATING",
		content: "Hoàn tất cuộc hội thoại",
	},
	COMPLETE_TOPIC_BY_SYSTEM: {
		key: "COMPLETE_TOPIC_BY_SYSTEM",
		content: "Hoàn tất cuộc hội thoại bởi hệ thống",
	},
	CREATE_TOPIC: {
		key: "CREATE_TOPIC",
		content: "Khởi tạo hội thoại",
	},
	TAG_PRODUCT: {
		key: "TAG_PRODUCT",
		content: "Tag sản phẩm",
	},
	TAG_ORDER: {
		key: "TAG_ORDER",
		content: "Tag đơn hàng",
	},
	TAG_TICKET: {
		key: "TAG_TICKET",
		content: "Tag phiếu hỗ trợ",
	},
	RATING_TOPIC: {
		key: "RATING_TOPIC",
		content: "Khách hàng đánh giá",
	},
	TRANSFER_TOPIC_TO_WAIT_TO_COMPLETE: {
		key: "TRANSFER_TOPIC_TO_WAIT_TO_COMPLETE",
		content: "Chuyển trạng thái cuộc hội thoại sang chờ hoàn tất",
	},
};

export const getHistory = async ({ ctx, data }) => {
	const client = getChatClient(ctx);
	const res = await client.getChatHistory(data);
	return res;
};

export const getGuestInfo = async ({ ctx, data }) => {
	const client = getChatClient(ctx);
	const res = await client.getGuestInfo(data);
	return res;
};

export const createDraftConversation = async ({ ctx, data }) => {
	const client = getChatClient(ctx);
	const res = await client.createDraftConversation(data);
	return res;
};

export const getConversationByCustomer = async ({ ctx, data }) => {
	const client = getChatClient(ctx);
	const res = await client.getConversationByCustomer(data);
	return res;
};

export const integrateSearchProduct = async ({ ctx, data, accountID }) => {
	const client = getChatClient(ctx);
	const res = await client.integrateSearchProduct({
		...data,
		offset: data.offset || (data.page && data.limit ? (data.page - 1) * data.limit : 0),
	});
	if (res.status === APIStatus.OK) {
		const data = res.data;
		const n = data.length;
		for (let i = 0; i < n; i++) {
			data[i].moreInfo = {
				seller: isUpdatingText,
				manufacturer: isUpdatingText,
			};
			data[i].displayPrice = handleProductPrice(data[i], true);
			if (data[i].sku) {
				data[i].skuItem = data[i].sku;
			} else if (data[i].skuItem) {
				data[i].sku = data[i].skuItem;
			}
		}
		// if(customerID){
		//     await getPrice(data, client, customerID)
		// }
		if (accountID) {
			await getAmountInCart(data, accountID);
		}
		// await getSeller(data, getProductClient(ctx))
		// await getManufacturer(data, getProductClient(ctx));
	}
	return res;
};

export const integrateSearchTicket = async ({ ctx, params }) => {
	const client = getChatClient(ctx);
	const res = await client.integrateSearchTicket(params);
	return res;
};

export async function getRatingChartData({ ctx, params }) {
	const client = getChatClient(ctx, {});

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

export async function getListRatingByDate({ ctx, params }) {
	const client = getChatClient(ctx, {});

	const newParams = {
		...params,
		getTotal: true,
	};

	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}

	const res = await client.getListRatingByDate(newParams);

	return {
		data: res,
	};
}
export const searchQuickMessage = async ({ ctx, data }) => {
	const client = getChatClient(ctx);
	const res = await client.searchQuickMessage(data);
	return res;
};

export const createQuickMessage = async ({ ctx, data }) => {
	const client = getChatClient(ctx);
	const res = await client.createQuickMessage(data);
	return res;
};

export const updateQuickMessage = async ({ ctx, data }) => {
	const client = getChatClient(ctx);
	const res = await client.updateQuickMessage(data);
	return res;
};
