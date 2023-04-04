import { GUEST_PREFIX, WAIT_TO_PROCESS_TIMEOUT } from "../config/chat";
import { AccountType, APIStatus, Status } from "../lib/common";
import { getCustomerById, getUserById } from "../services/AccountService";
import { CONVERSATION_TYPE, MESSAGE_TYPE } from "../services/ChatService";
import { ddmmyyyy, diffMins, isGreaterThan, isLessThan } from "./datetime";
import { convertToLocalPhone } from "./phone";
import { CONVERSATION_STATUS } from "../constants/chat";

export const getAvatarByName = (fullName) => {
  let subName = "";
  if (fullName) {
    if (fullName.split(" ").length > 1) {
      subName = `${fullName.split(" ")[0].slice(0, 1).toUpperCase()}${fullName
        .split(" ")
        [fullName.split(" ").length - 1].slice(0, 1)
        .toUpperCase()}`;
    } else {
      subName = `${fullName.split(" ")[0].slice(0, 1).toUpperCase()}${fullName
        .split(" ")[0]
        .slice(0, 1)
        .toUpperCase()}`;
    }
  }
  return subName;
  // try {
  //     const nameSplit = name.split(" ");
  //     if (nameSplit.length > 1) {
  //         return ((nameSplit[0][0] || "") + (nameSplit[1][0] || "")).toUpperCase();
  //     }
  //     else {
  //         return nameSplit[0][0].toUpperCase();
  //     }
  // } catch (error) {
  //     return "";
  // }
};

export const getConversationDisplayName = (conversation) => {
  try {
    return getCustomerFullname(conversation);
  } catch (error) {
    return "";
  }
};

export const handleMemberDictionary = async (
  listConversation,
  oldDic = {},
  context = null
) => {
  const memberDictionary = { ...oldDic };
  const n = listConversation.length;
  let ids = new Set();
  for (let i = 0; i < n; i++) {
    const customer = listConversation[i].customerInfo;
    if (customer && customer.accountID) {
      memberDictionary[customer.accountID] = {
        fullname: customer.name || "",
        username: customer.phone || "",
        accountID: customer.accountID,
        phone: customer.phone || "",
        type: "CUSTOMER",
      };
    }
    if (listConversation[i].guestInfo) {
      const guest = listConversation[i].guestInfo;
      memberDictionary[GUEST_PREFIX + guest.guestID] = {
        fullname: guest.fullName || "",
        username: guest.phoneNumber || "",
        accountID: GUEST_PREFIX + guest.guestID,
        phone: guest.phoneNumber || "",
        type: "CUSTOMER",
      };
    }
    const m = listConversation[i].members.length;
    for (let j = 0; j < m; j++) {
      if (listConversation[i].members[j].accountType === AccountType.EMPLOYEE) {
        if (memberDictionary[listConversation[i].members[j].userID]) {
        } else {
          ids.add(listConversation[i].members[j].userID);
        }
      }
    }
  }
  if (ids.size > 0) {
    const userRes = await getUserById(context, {
      accountIDs: [...ids].join(","),
    });
    if (userRes.status === APIStatus.OK) {
      const n = userRes.data.length;
      for (let i = 0; i < n; i++) {
        const account = userRes.data[i];
        if (account.type === "CUSTOMER") {
          const customerRes = await getCustomerById({
            ctx: context,
            params: {
              accountID: account.accountId,
            },
          });
          if (customerRes.status === APIStatus.OK) {
            memberDictionary[account.accountId] = {
              fullname: customerRes.data[0].name || "",
              username: customerRes.data[0].phone || "",
              accountID: account.accountId,
              phone: customerRes.data[0].phone || "",
              type: "CUSTOMER",
            };
          }
        } else if (account.type === "EMPLOYEE") {
          memberDictionary[account.accountId] = {
            fullname: account.fullname || "",
            username: account.username || "",
            accountID: account.accountId,
            type: account.type,
          };
        } else if (account.type === "SELLER") {
          memberDictionary[account.accountId] = {
            ffullname: account.fullname || "",
            username: account.username || "",
            accountID: account.accountId,
            type: account.type,
          };
        }
      }
    }
    return memberDictionary;
  }
  return memberDictionary;
};

export const sortConversationListByLastMessage = (conversations) => {
  const copy = [...conversations];
  copy.sort((a, b) => {
    if (a.lastMessage && b.lastMessage) {
      return b.lastMessage.messageID - a.lastMessage.messageID;
    } else {
      if (a.lastMessage) {
        return 1;
      }
      if (b.lastMessage) {
        return -1;
      }
    }
  });
  return copy;
};

export const sortConversationListByStatus = (conversations, status) => {
  const notPins = conversations.filter(
    (conversation) => !conversation.isPinned
  );
  const newList = notPins.filter(
    (conversation) => conversation.conversationStatus === status
  );
  const sortedList = sortConversationListByLastMessage(newList);
  return sortedList;
};

export const sortConversationList = (conversations) => {
  const pins = conversations.filter((conversation) => conversation.isPinned);

  const sortedWaitToProcessing = sortConversationListByStatus(
    conversations,
    CONVERSATION_STATUS.WAIT_TO_PROCESS
  );
  const sortedProcessing = sortConversationListByStatus(
    conversations,
    CONVERSATION_STATUS.PROCESSING
  );
  const sortedWaiToComplete = sortConversationListByStatus(
    conversations,
    CONVERSATION_STATUS.WAIT_TO_COMPLETE
  );
  const sortedComplete = sortConversationListByStatus(
    conversations,
    CONVERSATION_STATUS.COMPLETED
  );

  const copy = [
    ...pins,
    ...sortedProcessing,
    ...sortedWaitToProcessing,
    ...sortedWaiToComplete,
    ...sortedComplete,
  ];
  return copy;
};

export const handleConversationUnReadMessage = (conversation) => {
  let result = 0;
  if (conversation.seenMessageOrder && conversation.seenMessageOrder > 0) {
    result = conversation.totalMessage - conversation.seenMessageOrder;
  }

  result = result > 0 ? result : 0;
  conversation.unreadMessage = result;
  return result;
};

export const isOtherPeopleConversation = (conversation, user) => {
  if (user && conversation) {
    if (user.type === "EMPLOYEE" && conversation.conversationID) {
      if (
        !conversation.customerSupportID ||
        conversation.customerSupportID === user.accountID
      ) {
        return false;
      } else if (checkConversationIssueTime(conversation)) {
        return false;
      } else {
        return true;
      }
    } else if (user.type === "SELLER") {
      return true;
    } else if (user.type === "CUSTOMER") {
      return false;
    }
  }
  return true;
};

export const getConversationOnlineTime = (conversation) => {
  if (conversation.lastActiveAt) {
    const date = new Date(conversation.lastActiveAt);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000 / 60);
    if (diff < 2) {
      return {
        online: true,
        message: "Đang trực tuyến",
      };
    } else {
      if (diff < 60) {
        return {
          online: false,
          message: `Truy cập ${diff} phút trước`,
        };
      }
      const hour = Math.floor(diff / 60);
      if (hour < 72) {
        return {
          online: false,
          message: `Truy cập ${hour} giờ trước`,
        };
      }
      return {
        online: false,
        message: `Truy cập ${ddmmyyyy(date)}`,
      };
    }
  }
  return {
    online: false,
    message: "Không trực tuyến",
  };
};

export const checkConversationIssueTime = (conversation) => {
  return (
    conversation.issueTime &&
    conversation.conversationStatus === CONVERSATION_STATUS.WAIT_TO_PROCESS &&
    (new Date().getTime() - new Date(conversation.issueTime).getTime()) /
      1000 >=
      WAIT_TO_PROCESS_TIMEOUT
  );
};

export const hasSeen = (conversation, user) => {
  if (!conversation.lastMessage) {
    return true;
  }
  const members = conversation.members;
  for (let i = 0; i < members.length; i++) {
    if (
      isSameMember(members[i], {
        userID: user.accountID,
        accountType: user.type,
      })
    ) {
      if (
        members[i].seenMessageOrder >= conversation.lastMessage.messageOrder
      ) {
        return true;
      }
    }
  }
  return false;
};

export const hasSeenMessage = (conversation, message, user) => {
  if (!message) {
    return true;
  }
  const members = conversation.members;
  for (let i = 0; i < members.length; i++) {
    if (
      isSameMember(members[i], {
        userID: user.accountID,
        accountType: user.type,
      })
    ) {
      if (members[i].seenMessageOrder >= message.messageOrder) {
        return true;
      }
    }
  }
  return false;
};

export const isNewForList = (listMessage, message) => {
  if (listMessage && listMessage.length) {
    return (
      message.messageOrder -
        listMessage[listMessage.length - 1].messageOrder ===
      1
    );
  }
  return true;
};

export const isAtBottomOfConversation = (conversation, listMessage) => {
  if (listMessage && conversation && listMessage.length) {
    const message = conversation.lastMessage;
    return (
      listMessage[listMessage.length - 1].status === "RAW" ||
      listMessage[listMessage.length - 1].status === "ERROR" ||
      message.messageOrder === listMessage[listMessage.length - 1].messageOrder
    );
  }
  return true;
};

export const getCustomerID = (conversation) => {
  if (conversation.conversationType === CONVERSATION_TYPE.GUEST_WITH_CS) {
    return GUEST_PREFIX + (conversation.guestInfo || {}).guestID;
  } else {
    return (conversation.customerInfo || {}).accountID;
  }
};

export const getCustomerFullname = (conversation, withPrefix = true) => {
  if (conversation.conversationType === CONVERSATION_TYPE.GUEST_WITH_CS) {
    const guest = conversation.guestInfo || {};
    if (withPrefix) {
      return (
        <>
          <div
            style={{
              border: "1px solid rgb(255, 221, 0)",
              color: "rgb(255, 221, 0)",
              borderRadius: "5px",
              padding: "0 2px",
              marginRight: "4px",
              display: "inline-block",
              fontSize: ".8rem",
            }}
          >
            GUEST
          </div>
          {guest.fullName}
        </>
      );
    }
    return guest.fullName;
  } else {
    const customer = conversation.customerInfo || {};
    if (withPrefix) {
      return customer.accountID + " - " + customer.name;
    }
    return customer.name;
  }
};

export const getCustomerPhone = (conversation) => {
  if (conversation.conversationType === CONVERSATION_TYPE.GUEST_WITH_CS) {
    return convertToLocalPhone((conversation.guestInfo || {}).phoneNumber);
  } else {
    return (conversation.customerInfo || {}).phone;
  }
};

export const isMemberMessage = (member, message) => {
  if (message.messageType === MESSAGE_TYPE.GUEST_TO_CS) {
    return (
      message.senderID === member.userID &&
      member.accountType === AccountType.GUEST
    );
  }
  return message.senderID === member.userID;
};

export const isMyMessage = (user, message) => {
  return isMemberMessage(
    {
      userID: user.accountID,
      accountType: AccountType.EMPLOYEE,
    },
    message
  );
};

export const isSameSenderMessage = (message1, message2) => {
  return (
    message1.messageType === message2.messageType &&
    message1.senderID === message2.senderID
  );
};

export const isSameMember = (member1, member2) => {
  return (
    member1.accountType === member2.accountType &&
    member1.userID === member2.userID
  );
};

export const isOtherMessage = (user, message) => {
  return !isMyMessage(user, message);
};

export const isMostPreviousMessage = (previousMessage) => {
  return !previousMessage;
};

export const isLastestMessage = (nextMessage) => {
  return !nextMessage;
};

export const isFirstOfDateMessage = (message, previousMessage) => {
  if (isMostPreviousMessage(previousMessage)) {
    return true;
  }
  return isGreaterThan(
    new Date(message.createdTime),
    new Date(previousMessage.createdTime)
  );
};

export const isLastOfDateMessage = (message, nextMessage) => {
  if (isLastestMessage(nextMessage)) {
    return false;
  }
  return isLessThan(
    new Date(message.createdTime),
    new Date(nextMessage.createdTime)
  );
};

export const fiveMinutesAway = (message, previousMessage) => {
  if (isFirstOfDateMessage(message, previousMessage)) {
    return false;
  }
  if (diffMins(message.createdTime, previousMessage.createdTime) >= 5) {
    return true;
  }
  return false;
};

export const isFirstOfTopicMessage = (message, previousMessage) => {
  if (!previousMessage) {
    return false;
  }
  if (message.topicID && previousMessage.topicID) {
    return message.topicID > previousMessage.topicID;
  }
  return false;
};

export const isLastOfTopicMessage = (message, nextMessage) => {
  if (!nextMessage) {
    return false;
  }
  if (message.topicID && nextMessage.topicID) {
    return message.topicID < nextMessage.topicID;
  }
  return false;
};

export const isFirstOfGroupMessage = (user, message, previousMessage) => {
  if (message.status === "RAW") {
    return false;
  }

  if (isOtherMessage(user, message)) {
    return (
      isMostPreviousMessage(previousMessage) ||
      !isSameSenderMessage(previousMessage, message) ||
      isFirstOfDateMessage(message, previousMessage) ||
      isFirstOfTopicMessage(message, previousMessage) ||
      fiveMinutesAway(message, previousMessage)
    );
  }
  return false;
};

export const isLastOfGroupMessage = (user, message, nextMessage) => {
  return (
    !nextMessage ||
    (nextMessage && !isSameSenderMessage(message, nextMessage)) ||
    isLastOfDateMessage(message, nextMessage) ||
    isLastOfTopicMessage(message, nextMessage) ||
    fiveMinutesAway(nextMessage, message)
  );
};

export const isDraftConversation = (conversation) => {
  return !!(
    !conversation.lastMessage ||
    !conversation.lastMessage.messageID ||
    (conversation.referenceToConversationID &&
      conversation.referenceToConversationID !== conversation.conversationID)
  );
};

export const isSameCustomerConversation = (conversation1, conversation2) => {
  return (
    conversation1.customerInfo &&
    conversation2.customerInfo &&
    conversation1.customerInfo.accountID ===
      conversation2.customerInfo.accountID &&
    conversation1.conversationType === conversation2.conversationType
  );
};
export const getLastSeenMessageID = (conversation, { userID, accountType }) => {
  const m = conversation.members.length;
  let lastMessageSeenID = null;
  for (let i = 0; i < m; i++) {
    if (isSameMember(conversation.members[i], { userID, accountType })) {
      if (conversation.members[i].status === Status.ACTIVATED) {
        lastMessageSeenID = conversation.members[i].lastMessageSeen;
        break;
      }
    }
  }
  return lastMessageSeenID;
};

export const isNotSeenAll = (conversation, user) => {
  const lastMessageSeenID = getLastSeenMessageID(conversation, {
    userID: user.accountID,
    accountType: AccountType.EMPLOYEE,
  });
  return (
    !!(lastMessageSeenID === 0 || lastMessageSeenID) &&
    !isDraftConversation(conversation) &&
    lastMessageSeenID !== conversation.lastMessage.messageID
  );
};
