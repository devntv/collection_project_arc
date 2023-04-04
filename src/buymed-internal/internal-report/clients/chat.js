import { APIClient } from "lib/utils";
import queryString from "query-string";
const URI_CHAT = "/integration/chat/v1";

class ChatClient extends APIClient {
	constructor(ctx, data) {
		super(ctx, data);
	}
	getListConversation(params) {
		const stringified = queryString.stringify(params);
		const res = this.call("GET", `${URI_CHAT}/conversation/list?${stringified}`);
		return res;
	}
	getMessageInTheConversation(params) {
		return this.call("POST", `${URI_CHAT}/message/list`, params);
	}

	getMessageInTheConversationScrollDown(data) {
		return this.call("POST", `${URI_CHAT}/message/list-scroll-down`, data);
	}

	sendMessage(params) {
		return this.call("POST", `${URI_CHAT}/message/create`, params);
	}

	sendMessageFromCSToCustomer(params) {
		return this.call("POST", `${URI_CHAT}/message/cs-to-customer `, params);
	}

	sendMessageFromCustomerToCS(params) {
		return this.call("POST", `${URI_CHAT}/message/customer-to-cs`, params);
	}

	sendMessageFromCSToGuest(data) {
		return this.call("POST", `${URI_CHAT}/message/cs-to-guest`, data);
	}

	getConversationById(params) {
		return this.call("POST", `${URI_CHAT}/conversation/one`, params);
	}

	pingToStayInConnect(params) {
		return this.call("POST", `${URI_CHAT}/ping`, params);
	}

	createConversation(params) {
		return this.call("POST", `${URI_CHAT}/conversation/create`, params);
	}

	handleSeenMessage(params) {
		return this.call("POST", `${URI_CHAT}/conversation/seen`, params);
	}

	getMessageById(params) {
		return this.call("POST", `${URI_CHAT}/message/one`, params);
	}
	createMemberInConversation(data) {
		return this.call("POST", `${URI_CHAT}/member/create`, data);
	}

	getConversationResource(data) {
		return this.call("POST", `${URI_CHAT}/conversation/resource`, data);
	}

	removeMemberInconversation(data) {
		return this.call("POST", `${URI_CHAT}/member/remove`, data);
	}

	getListConversationCS(data) {
		return this.call("POST", `${URI_CHAT}/conversation/list-for-cs`, data);
	}

	getListConversationSeller(data) {
		return this.call("POST", `${URI_CHAT}/something`, data);
	}

	getListConversationCustomer(data) {
		return this.call("POST", `${URI_CHAT}/conversation/list-for-customer`, data);
	}

	updateConversationStatusToWaitToComplete(data) {
		return this.call("POST", `${URI_CHAT}/topic/transfer-to-wait-to-complete`, data);
	}

	pinConversation(conversationID) {
		return this.call("POST", `${URI_CHAT}/conversation/pin`, {
			conversationID,
		});
	}
	unpinConversation(conversationID) {
		return this.call("POST", `${URI_CHAT}/conversation/un-pin`, {
			conversationID,
		});
	}

	reactMessage(data) {
		return this.call("POST", `${URI_CHAT}/message/react`, data);
	}

	unReactMessage(data) {
		return this.call("POST", `${URI_CHAT}/message/un-react`, data);
	}

	getUserOnlineStatus(data) {
		return this.call("POST", `${URI_CHAT}/user/online/list`, data);
	}

	getRatingStatus(conversationID) {
		return this.call("POST", `${URI_CHAT}/topic/rating-status`, {
			conversationID,
		});
	}

	sendRating(data) {
		return this.call("POST", `${URI_CHAT}/topic/rating`, data);
	}

	getConversationTag(params) {
		return this.call("POST", `${URI_CHAT}/conversation/tag/list`, params);
	}

	forwardConversation(data) {
		return this.call("PUT", `${URI_CHAT}/conversation/cs/transfer`, data);
	}

	findMessageByDate(data) {
		return this.call("POST", `${URI_CHAT}/message/date`, data);
	}

	searchMessage(data) {
		return this.call("POST", `${URI_CHAT}/message/search`, data);
	}

	getListManageConversationTopic(data) {
		return this.call("POST", `${URI_CHAT}/conversation/management-for-cs`, data);
	}

	getCountTopicStatus(data) {
		return this.call("POST", `${URI_CHAT}/topic/count-status`, data);
	}

	getMemberByID(data) {
		return this.call("POST", `${URI_CHAT}/member/one`, data);
	}

	getFirstMessageOfTopic(data) {
		return this.call("POST", `${URI_CHAT}/message/first-by-topic`, data);
	}

	getChatConfiguration() {
		return this.call("POST", `${URI_CHAT}/configuration/list`);
	}

	updateChatConfiguration(data) {
		return this.call("PUT", `${URI_CHAT}/configuration`, data);
	}

	getListNumberByDate(data) {
		return this.call("POST", `${URI_CHAT}/report/number-topic-by-date/list`, data);
	}

	getEmployeeChatPermission(data) {
		return this.call("POST", `${URI_CHAT}/permission/user/list`, data);
	}

	updateUserChatPermission(data) {
		return this.call("POST", `${URI_CHAT}/permission/user/upsert`, data);
	}

	getChatHistory(data) {
		return this.call("POST", `${URI_CHAT}/topic/history`, data);
	}

	getGuestInfo(data) {
		return this.call("POST", `${URI_CHAT}/guest/one`, data);
	}

	createDraftConversation(data) {
		return this.call("POST", `${URI_CHAT}/conversation/draft`, data);
	}

	getConversationByCustomer(data) {
		return this.call("POST", `${URI_CHAT}/conversation/belong-to-customer`, data);
	}

	integrateSearchProduct(data) {
		return this.call("POST", `${URI_CHAT}/search/fuzzy`, data);
	}

	integrateSearchTicket(data) {
		return this.call("POST", `${URI_CHAT}/search/ticket`, data);
	}

	getRatingChartData(data) {
		return this.call("POST", `${URI_CHAT}/report/average-rating`, data);
	}

	getListRatingByDate(data) {
		return this.call("POST", `${URI_CHAT}/report/number-rating-by-date/list`, data);
	}

	searchQuickMessage(data) {
		return this.call("POST", `${URI_CHAT}/quick-message/list`, data);
	}

	createQuickMessage(data) {
		return this.call("POST", `${URI_CHAT}/quick-message/create`, data);
	}

	updateQuickMessage(data) {
		return this.call("POST", `${URI_CHAT}/quick-message/update`, data);
	}
	searchQuickMessage(data) {
		return this.call("POST", `${URI_CHAT}/quick-message/list`, data);
	}
}

export function getChatClient(ctx, data) {
	return new ChatClient(ctx, data);
}
