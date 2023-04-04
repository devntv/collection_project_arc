import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { getFormattedDate } from "../../lib/DateTimeUtil";
import { getLastUpdateReport } from "../../services/ReportService";
import { APIStatus } from "../../lib/common";
import Trans from "next-translate/Trans";

export const SCHEDULE_TOPIC = {
	COUNT_TOPIC_BY_HOUR: "COUNT_TOPIC_BY_HOUR",
	COUNT_COMPLETED_TOPIC: "COUNT_COMPLETED_TOPIC",
	COUNT_TOPIC_AND_GET_WAIT_TO_PROCESS_TIME_BY_HOUR:
		"COUNT_TOPIC_AND_GET_WAIT_TO_PROCESS_TIME_BY_HOUR",
	UPDATE_WORKING_SESSION: "UPDATE_WORKING_SESSION",
	COUNT_RATING_BY_HOUR: "COUNT_RATING_BY_HOUR",

	COUNT_TOPIC_AND_GET_WAIT_TO_PROCESS_TIME_BY_HOUR_SELLER_WITH_SA:
		"COUNT_TOPIC_AND_GET_WAIT_TO_PROCESS_TIME_BY_HOUR_SELLER_WITH_SA",
	COUNT_TOPIC_BY_HOUR_SELLER_WITH_SA: "COUNT_TOPIC_BY_HOUR_SELLER_WITH_SA",
	COUNT_COMPLETED_TOPIC_SELLER_WITH_SA: "COUNT_COMPLETED_TOPIC_SELLER_WITH_SA",
	COUNT_RATING_BY_HOUR_SELLER_WITH_SA: "COUNT_RATING_BY_HOUR_SELLER_WITH_SA",
};

function LastUpdate({ topic = SCHEDULE_TOPIC.COUNT_TOPIC_BY_HOUR }) {
	const [updatedTime, setUpdatedTime] = useState("");

	const getLastUpdateFunc = async (topic) => {
		const res = await getLastUpdateReport({ params: { topic } });
		if (res.data?.status == APIStatus.OK) {
			setUpdatedTime(
				getFormattedDate(new Date(res.data?.data[0]?.createdTime), "DD/MM/YYYY HH:mm")
			);
		}
	};

	useEffect(() => {
		getLastUpdateFunc(topic);
	}, []);

	return (
		<Box>
			<Trans
				i18nKey="chat:updatedTimeNote"
				components={[<strong />, <strong />]}
				values={{
					updatedTime,
				}}
			/>
		</Box>
	);
}

export default LastUpdate;
