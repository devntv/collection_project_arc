import React from "react";

import Box from "@material-ui/core/Box";
import { conversationStatus } from "../../services/ChatService";
import { conversationStatusLabel } from "constants/chat";
import useTranslation from "next-translate/useTranslation";

const MessageStatus = ({ status }) => {
	const { t } = useTranslation("common");
	return (
		<Box
			sx={{
				background: conversationStatus[status].color,
				textAlign: "center",
				padding: ".2rem .5rem",
				borderRadius: "6px",
				color: "white",
				fontSize: "14px",
				minWidth: "80px",
			}}
		>
			{conversationStatusLabel(t)[status]}
		</Box>
	);
};

export default MessageStatus;
