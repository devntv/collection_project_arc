export const dateLabel = "common:time.day";
export const numberByDateLabel = "chat:createdConversationQty";
export const waitTimeLabel = "chat:avgProcessTime";
export const completedTimeLabel = "chat:avgCompleteTime";
export const ratingLabel = "chat:avgSellerRating";
export const ratingCountLabel = "chat:ratingQty";
export const CONVERSATION_STATUS = {
	WAIT_TO_PROCESS: "WAIT_TO_PROCESS",
	PROCESSING: "PROCESSING",
	WAIT_TO_COMPLETE: "WAIT_TO_COMPLETE",
	COMPLETED: "COMPLETED",
};

export const conversationStatusLabel = (t) => ({
	"": t("chat:conversationStatus.all"),
	[CONVERSATION_STATUS.WAIT_TO_PROCESS]: t("chat:conversationStatus.waitToProcess"),
	[CONVERSATION_STATUS.PROCESSING]: t("chat:conversationStatus.processing"),
	[CONVERSATION_STATUS.WAIT_TO_COMPLETE]: t("chat:conversationStatus.waitToComplete"),
	[CONVERSATION_STATUS.COMPLETED]: t("chat:conversationStatus.completed"),
});

export const CustomerTypeColor = {
	PURPLE: "PURPLE",
	BLUE: "BLUE",
	GREEN: "GREEN",
	YELLOW: "YELLOW",
	ORANGE: "ORANGE",
	RED: "RED",
	UNKNOWN: "UNKNOWN",
};
export const CustomerTypeText = (t) => ({
	[CustomerTypeColor.PURPLE]: t("chat:vip_debt"),
	[CustomerTypeColor.BLUE]: t("chat:vip"),
	[CustomerTypeColor.GREEN]: t("chat:ordinary"),
	[CustomerTypeColor.YELLOW]: t("chat:frequentlyComplain"),
	[CustomerTypeColor.ORANGE]: t("chat:codBanned"),
	[CustomerTypeColor.RED]: t("chat:permanentlyBanned"),
	[CustomerTypeColor.UNKNOWN]: t("chat:potential"),
});
