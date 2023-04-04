import cacheData from "memory-cache";
import getConfig from "next/config";
import queryString from "query-string";
import { getAccountClient } from "clients/account";
import { getOrderClient } from "clients/order";

const { publicRuntimeConfig } = getConfig();

import { getTicketClient } from "clients/ticket";
import { ASSIGNEE_PREFEX, AUTHOR_PREFIX, EXPIRED_CACHE, REASONS_PREFIX } from "config/cache";
import { AccountType, APIStatus } from "lib/common";
import { handleSkuInfo } from "utilities/tag";
import { searchProduct } from "./ProductService";

export const ticketStatus = {
	PENDING: "Chưa xử lý",
	IN_PROCESS: "Đang xử lý",
	REPLIED: "Đã phản hồi",
	DONE: "Đã xử lý",
	CANCELLED: "Đã hủy",
};

export const TICKET_STATUS = {
	PENDING: "PENDING",
	IN_PROCESS: "IN_PROCESS",
	REPLIED: "REPLIED",
	DONE: "DONE",
	CANCELLED: "CANCELLED",
};

export const TICKET_TYPE = {
	ORDER: "ORDER",
	PRODUCT: "PRODUCT",
	ACCOUNT: "ACCOUNT",
	PROBLEM: "PROBLEM",
	PROMOTION: "PROMOTION",
	OTHER: "Khác",
};

export const TICKET_DUE_TYPE = {
	IMMEDIATELY: "IMMEDIATELY",
	NOT_IMMEDIATELY: "NOT_IMMEDIATELY",
};

export const ticketDueType = {
	[TICKET_DUE_TYPE.IMMEDIATELY]: "Xử lý ngay",
	[TICKET_DUE_TYPE.NOT_IMMEDIATELY]: "Không xử lý ngay",
};

export const ticketType = {
	ORDER: "Đơn hàng",
	PRODUCT: "Sản phẩm",
	ACCOUNT: "Tài khoản",
	PROBLEM: "Vấn đề",
	COMMENT: "Bình luận",
	PROMOTION: "Khuyến mãi",
	OTHER: "Khác",
};

export const displayTicketReason = (ticket) => {
	if (ticket.reasonsInfo) {
		return ticket.reasonsInfo
			.map((item) => item.name)
			.filter((item) => item)
			.join(", ");
	}
	return null;
};

export const ticketUrl = (ticket, type = AccountType.EMPLOYEE) => {
	switch (type) {
		case AccountType.EMPLOYEE:
			return `${publicRuntimeConfig.INTERNAL_HOST}/cs/ticket/edit?code=${ticket.code}`;
		case AccountType.CUSTOMER:
			return `${publicRuntimeConfig.WEB_HOST}/users/my-ticket?id=${
				ticket.ticketId || ticket.ticketID
			}`;
		default:
			break;
	}
};

export const internalTicketUrl = (code) => {
	return `${publicRuntimeConfig.INTERNAL_HOST}/cs/ticket-internal/edit?code=${code}`;
};

export const createTicketUrl = (phone, type, orderId, sku, productID, source = "CHAT") => {
	const stringified = queryString.stringify({
		...(type && { type }),
		...(type && phone && type !== TICKET_TYPE.ORDER && { phoneNumber: phone }),
		...(type && orderId && type === TICKET_TYPE.ORDER && { orderId: orderId }),
		...(type && sku && type === TICKET_TYPE.PRODUCT && { sku: sku }),
		...(type && productID && type === TICKET_TYPE.PRODUCT && { productID: productID }),
		source: source,
	});
	return `${publicRuntimeConfig.INTERNAL_HOST}/cs/ticket/new-ticket?${stringified}`;
};

export const createSubTicketUrl = (parentCode, parentScope) => {
	const stringified = queryString.stringify({
		...(parentCode && { parentCode }),
		...(parentScope && { parentScope }),
	});
	return `${publicRuntimeConfig.INTERNAL_HOST}/cs/ticket-internal/new-ticket?${stringified}`;
};

export const getCustomerTicket = async ({ ctx, params }) => {
	const client = getTicketClient(ctx, {});
	const newParams = { ...params };
	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}
	const res = await client.getCustomerTicket(newParams);
	return res;
};

export const getTicketReason = async ({ ctx, params }) => {
	const client = getTicketClient(ctx, {});
	const newParams = { ...params };
	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}
	const res = await client.getTicketReason(newParams);
	return res;
};

export const getAuthor = async (tickets, client) => {
	const n = tickets.length;
	let authorIDs = new Set();
	for (let i = 0; i < n; i++) {
		tickets[i].createdBy = tickets[i].createdBy || null;
		if (tickets[i].createdByAccountId) {
			const cache = cacheData.get(AUTHOR_PREFIX + tickets[i].createdByAccountId);
			if (!cache) {
				authorIDs.add(tickets[i].createdByAccountId);
			} else {
				tickets[i].createdBy = cache;
			}
		}
	}
	authorIDs = Array.from(authorIDs);
	if (authorIDs.length) {
		const authorRes = await client.getAccountInfoByID({
			accountIDs: [...authorIDs].join(","),
		});
		if (authorRes.status === APIStatus.OK) {
			const { data: authorData } = authorRes;
			authorData.forEach((item, index) => {
				cacheData.put(
					AUTHOR_PREFIX + item.accountId,
					{
						fullname: item.fullname,
						username: item.username,
						type: item.type,
						accountID: item.accountId,
					},
					EXPIRED_CACHE
				);
				for (let i = 0; i < n; i++) {
					if (tickets[i].createdByAccountId === item.accountId) {
						tickets[i].createdBy = {
							fullname: item.fullname,
							username: item.username,
							type: item.type,
							accountID: item.accountId,
						};
					}
				}
			});
		}
	}
};

export const getReasons = async (tickets, client) => {
	const n = tickets.length;
	let reasons = new Set();
	for (let i = 0; i < n; i++) {
		if (tickets[i].reasonCodes) {
			tickets[i].customerReasons = [];
			tickets[i].reasonCodes.forEach((item) => {
				const cache = cacheData.get(REASONS_PREFIX + item);
				if (!cache) {
					reasons.add(item);
				} else {
					tickets[i].customerReasons.push(cache);
				}
			});
		}
	}
	reasons = Array.from(reasons);
	if (reasons.length) {
		const reasonsRes = await client.getTicketReason({
			codes: reasons.join(","),
		});
		if (reasonsRes.status === APIStatus.OK) {
			const { data: reasonsData } = reasonsRes;
			reasonsData.forEach((item) => {
				cacheData.put(REASONS_PREFIX + item.code, item.name, EXPIRED_CACHE);
				for (let i = 0; i < n; i++) {
					if (tickets[i].reasonCodes) {
						if (!tickets[i].customerReasons) {
							tickets[i].customerReasons = [];
						}
						tickets[i].reasonCodes.forEach((reason) => {
							if (reason === item.code) {
								tickets[i].customerReasons.push(item.name);
							}
						});
					}
				}
			});
		}
	}
};

export const getTicketProduct = async (tickets, customerId, ctx) => {
	const n = tickets.length;
	for (let i = 0; i < n; i++) {
		if (tickets[i].type === TICKET_TYPE.PRODUCT) {
			if (tickets[i].sku) {
				const productRes = await searchProduct({
					ctx,
					data: {
						text: tickets[i].sku,
						filter: {
							...((tickets[i].customerProvinceCode ||
								tickets[i].customerProvinceCode === 0) && {
								locationCodes: [tickets[i].customerProvinceCode],
							}),
							statusIn: ["NORMAL", "LIMIT"],
							isActive: true,
						},
					},
				});
				if (productRes.status === APIStatus.OK && productRes.data[0]) {
					tickets[i].skuInfo = {
						...handleSkuInfo(productRes.data[0]),
						origin: productRes.data[0].origin,
					};
				}
			}
		}
	}
};

export const getTicketOrder = async (tickets, client, ctx) => {
	const n = tickets.length;
	for (let i = 0; i < n; i++) {
		if (tickets[i].type === TICKET_TYPE.ORDER) {
			if (tickets[i].orderId) {
				const orderRes = await client.getCustomerOrder({
					q: JSON.stringify({
						orderId: tickets[i].orderId,
					}),
				});
				if (orderRes.status === APIStatus.OK) {
					// if(orderRes.data[0].paymentMethod){
					//     const paymentRes = await getPaymentMethod({ctx, code:orderRes.data[0].paymentMethod})
					//     orderRes.data[0].paymentMethod = paymentRes;
					// }
					// if(orderRes.data[0].deliveryMethod){
					//     const deliveryRes = await getDeliveryPlatform({ctx, code:orderRes.data[0].deliveryMethod})
					//     orderRes.data[0].deliveryMethod = deliveryRes;
					// }
					tickets[i].orderInfo = orderRes.data[0];
				}
			}
		}
	}
};

export const getAssignee = async (tickets, client) => {
	const n = tickets.length;
	let authorIDs = new Set();
	for (let i = 0; i < n; i++) {
		tickets[i].assignee = null;
		if (tickets[i].assignedAccountId) {
			const cache = cacheData.get(ASSIGNEE_PREFEX + tickets[i].assignedAccountId);
			if (!cache) {
				authorIDs.add(tickets[i].assignedAccountId);
			} else {
				tickets[i].assignee = cache;
			}
		}
	}
	authorIDs = Array.from(authorIDs);
	if (authorIDs.length) {
		const assigneeRes = await client.getAccountInfoByID({
			accountIDs: [...authorIDs].join(","),
		});
		if (assigneeRes.status === APIStatus.OK) {
			const { data: assigneeData } = assigneeRes;
			assigneeData.forEach((item, index) => {
				cacheData.put(
					ASSIGNEE_PREFEX + item.accountId,
					{
						fullname: item.fullname,
						username: item.username,
						type: item.type,
						accountID: item.accountId,
					},
					EXPIRED_CACHE
				);
				for (let i = 0; i < n; i++) {
					if (tickets[i].assignedAccountId === item.accountId) {
						tickets[i].assignee = {
							fullname: item.fullname,
							username: item.username,
							type: item.type,
							accountID: item.accountId,
						};
					}
				}
			});
		}
	}
};

export const searchCustomerTicket = async ({ ctx, params }) => {
	const client = getTicketClient(ctx, {});
	const newParams = { ...params };
	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}
	const res = await client.searchTicketByID(newParams);
	if (res.status === APIStatus.OK) {
		const customerId = newParams.customerId;
		await getAuthor(res.data, getAccountClient(ctx, {}));
		await getReasons(res.data, client);
		await getTicketOrder(res.data, getOrderClient(ctx, {}), ctx);
		await getTicketProduct(res.data, customerId, ctx);
		await getAssignee(res.data, getAccountClient(ctx, {}));
	}
	return res;
};

export const searchCustomerTicketList = async ({ ctx, params }) => {
	const client = getTicketClient(ctx, {});
	const newParams = { ...params };
	try {
		JSON.parse(newParams.q);
	} catch {
		delete newParams.q;
	}
	const res = await client.searchTicketByID(newParams);
	if (res.status === APIStatus.OK) {
		await getAuthor(res.data, getAccountClient(ctx, {}));
		await getReasons(res.data, client);
		await getTicketProduct(res.data, newParams.customerId);
		await getAssignee(res.data, getAccountClient(ctx, {}));
	}
	return res;
};

export const getTicketDetail = async (ticket, customerId, ctx) => {
	const list = [ticket];
	await getTicketOrder(list, getOrderClient(ctx, {}));
	await getTicketProduct(list, customerId, ctx);
	return list[0];
};
