import React, { useMemo } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Stack from "@mui5/Stack/Stack";
import { makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import { CONVERSATION_STATUS } from "../../constants/chat";

const useStyles = makeStyles((theme) => ({
	tab: {
		color: "#6F6D6D",
		padding: "0",
		transition: "all 0.5s",
		"&.Mui-selected": {
			color: "#00B46E",
		},
		minHeight: 0,
		padding: "10px 1rem",
		borderBottom: "2px solid #00B46E00",
		width: "170px",
	},
	tabs: {
		width: "100%",
		overflowX: "auto",
		"& .MuiTabs-indicator": {
			backgroundColor: "#00B46E",
		},
		"& .MuiTabs-scroller::-webkit-scrollbar": {
			display: "block",
		},
		minHeight: 0,
	},
}));

const ConversationStatusTab = ({
	total,
	allTopic = true,
	currentStatus,
	setCurrentStatus,
	countWaitToProcess,
	countProcessing,
	countWaitToComplete,
	countCompleted,
}) => {
	const classes = useStyles();
	const tabs = useMemo(() => {
		return [
			{
				text: "Tất cả",
				key: "",
				counter: total,
			},
			{
				text: "Chờ xử lý",
				key: CONVERSATION_STATUS.WAIT_TO_PROCESS,
				counter: countWaitToProcess,
			},
			{
				text: "Đang xử lý",
				key: CONVERSATION_STATUS.PROCESSING,
				counter: countProcessing,
			},
			{
				text: "Chờ hoàn tất",
				key: CONVERSATION_STATUS.WAIT_TO_COMPLETE,
				counter: countWaitToComplete,
			},
			{
				text: "Hoàn tất",
				key: CONVERSATION_STATUS.COMPLETED,
				counter: countCompleted,
			},
		];
	});

	return (
		<Box>
			<Tabs
				className={classes.tabs}
				value={currentStatus}
				onChange={(e, value) => setCurrentStatus(value)}
			>
				{tabs.map((item) => {
					if (
						!allTopic &&
						(item.key == CONVERSATION_STATUS.WAIT_TO_COMPLETE ||
							item.key == CONVERSATION_STATUS.COMPLETED)
					) {
						return null;
					}
					return (
						<Tab
							key={item.key}
							className={classes.tab}
							value={item.key}
							label={`${item.text}(${item.counter})`}
							sx={{ textTransform: "uppercase", fontSize: "14px" }}
						></Tab>
					);
				})}
			</Tabs>
		</Box>
	);
};

export default ConversationStatusTab;
