import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { getFormattedDate } from "../../lib/DateTimeUtil";
import { getLastUpdateReportSellerWithSA } from "../../services/ReportService";
import { APIStatus } from "../../lib/common";
import { SCHEDULE_TOPIC } from "./LastUpdate";
import Trans from "next-translate/Trans";

function LastUpdateSellerWithSA({ topic = SCHEDULE_TOPIC.COUNT_TOPIC_BY_HOUR_SELLER_WITH_SA }) {
	const [updatedTime, setUpdatedTime] = useState("");

	const getLastUpdateFunc = async (topic) => {
		const res = await getLastUpdateReportSellerWithSA({ params: { topic } });
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

export default LastUpdateSellerWithSA;
