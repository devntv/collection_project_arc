import React, { createContext, useState, useEffect } from "react";
import { Status } from "lib/common";

import { CONVERSATION_TYPE } from "services/ChatService";
import {
	checkConversationIssueTime,
	isDraftConversation,
	isSameMember,
} from "utilities/conversation";
import { ACTION, PERMISSION } from "utilities/permission";
import { convertToLocalPhone } from "utilities/phone";
import { CONVERSATION_STATUS } from "constants/chat";
export const PermissionContext = createContext();

const PermissionProvider = ({ chatPermission, children, user }) => {
	const [userPermission, setUserPermission] = useState({
		permissions: [],
		actions: [],
	});

	const hasPermissionToDo = (action) => {
		return userPermission.actions.includes(action);
	};

	const hasPermission = (permission) => {
		return userPermission.permissions.includes(permission);
	};

	const isMyConversation = (conversation) => {
		try {
			return user.type === "CUSTOMER" || conversation.customerSupportID === user.accountID;
		} catch (error) {
			return false;
		}
	};

	const isNoAssigneeConversation = (conversation) => {
		return !conversation.customerSupportID || checkConversationIssueTime(conversation);
	};

	const isOtherPeopleConversation = (conversation) => {
		return !isMyConversation(conversation) && !isNoAssigneeConversation(conversation);
	};

	const isVisibleConversation = (conversation, filter) => {
		if (isDraftConversation(conversation)) {
			return false;
		}
		if (user.type !== "CUSTOMER") {
			if (conversation.isPinned) {
				return true;
			}
			if (!filter.status || filter.status.toLowerCase() === "all") {
			} else {
				if (
					(conversation.conversationStatus || "").toLowerCase() !==
					filter.status.toLowerCase()
				) {
					return false;
				}
			}
			if (conversation.conversationType === CONVERSATION_TYPE.GUEST_WITH_CS) {
				const info = conversation.guestInfo;
				if (
					info &&
					info.phoneNumber &&
					!convertToLocalPhone(info.phoneNumber).includes(filter.text || "")
				) {
					return false;
				}
			} else {
				const info = conversation.customerInfo;
				if (
					info &&
					info.phone &&
					!convertToLocalPhone(info.phone).includes(filter.text || "")
				) {
					return false;
				}
			}
			if (isMyConversation(conversation) || isNoAssigneeConversation(conversation)) {
				return (
					conversation.conversationStatus === CONVERSATION_STATUS.WAIT_TO_PROCESS ||
					conversation.conversationStatus === CONVERSATION_STATUS.PROCESSING ||
					filter.showAllStatus
				);
			} else if (!filter.onlyMe) {
				if (
					hasPermission(PERMISSION.VIEW_CHAT_WITHOUT_ASSIGNEE) ||
					hasPermission(PERMISSION.SUPPORT_CHAT_WITHOUT_ASSIGNEE)
				) {
					return (
						conversation.conversationStatus === CONVERSATION_STATUS.WAIT_TO_PROCESS ||
						conversation.conversationStatus === CONVERSATION_STATUS.PROCESSING ||
						filter.showAllStatus
					);
				}
			}
			return false;
		}
		return true;
	};

	const isAccessableConversation = (conversation) => {
		if (
			hasPermission(PERMISSION.VIEW_CHAT_WITHOUT_ASSIGNEE) ||
			hasPermission(PERMISSION.SUPPORT_CHAT_WITHOUT_ASSIGNEE)
		) {
			return true;
		}
		return isMyConversation(conversation) || isNoAssigneeConversation(conversation);
		// return false;
	};

	const isReadOnlyConversation = (conversation) => {
		if (user.type !== "CUSTOMER") {
			return (
				!hasPermission(PERMISSION.SUPPORT_CHAT_WITHOUT_ASSIGNEE) &&
				!(
					(isNoAssigneeConversation(conversation) || isMyConversation(conversation)) &&
					hasPermissionToDo(ACTION.WORK_WITH_MY_CHAT)
				)
			);
		}
		return false;
	};

	const doWithMyConversation = (conversation, callback) => {
		if (conversation && conversation.conversationID && callback) {
			if (isMyConversation(conversation)) {
				callback(conversation);
			}
		}
	};

	const doWithJoinedConversation = (conversation, callback) => {
		if (conversation && conversation.conversationID && callback) {
			const members = conversation.members;
			const n = members.length;
			for (let i = 0; i < n; i++) {
				if (
					isSameMember(members[i], { userID: user.accountID, accountType: user.type }) &&
					members[i].status === Status.ACTIVATED
				) {
					callback(conversation);
				}
			}
		}
	};

	const isJoinedConversation = (conversation) => {
		if (conversation && conversation.conversationID) {
			const members = conversation.members;
			const n = members.length;
			for (let i = 0; i < n; i++) {
				if (
					isSameMember(members[i], { userID: user.accountID, accountType: user.type }) &&
					members[i].status === Status.ACTIVATED
				) {
					return true;
				}
			}
		}
		return false;
	};

	useEffect(() => {
		if (chatPermission) {
			const permissions = chatPermission.permissions || [];
			const actions = chatPermission.actions || [];
			setUserPermission((prev) => {
				const result = { ...prev };
				result.permissions = permissions.map((item) => PERMISSION[item]);
				result.actions = actions.map((item) => ACTION[item.code]);
				return result;
			});
		}
	}, [chatPermission]);

	return (
		<PermissionContext.Provider
			value={{
				userPermission,
				hasPermissionToDo,
				hasPermission,
				isMyConversation,
				isNoAssigneeConversation,
				isVisibleConversation,
				isOtherPeopleConversation,
				isReadOnlyConversation,
				doWithMyConversation,
				doWithJoinedConversation,
				isJoinedConversation,
				isAccessableConversation,
			}}
		>
			{children}
		</PermissionContext.Provider>
	);
};

export default PermissionProvider;
