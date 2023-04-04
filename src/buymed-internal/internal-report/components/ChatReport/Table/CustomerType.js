import { CustomerTypeColor, CustomerTypeText } from "constants/chat";
import useTranslation from "next-translate/useTranslation";
import TableCell from "@material-ui/core/TableCell";
import React from "react";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";

const CustomerType = ({ index, item, topic, classes }) => {
	const { t } = useTranslation("chat");
	return (
		<TableCell align="left" tabIndex={index} key={`${item.id}-${topic.topicID}`}>
			<Box sx={{ fontWeight: 600, fontSize: "14px" }}>
				{topic.conversationType != "GUEST_WITH_CS"
					? topic.customerInfo?.phone
					: topic.guestInfo?.phoneNumber.replace("+84", "0")}
				{topic.conversationType == "GUEST_WITH_CS" ? (
					<Box
						sx={{
							display: "inline-block",
							marginLeft: "10px",
							border: "1px solid rgb(255, 221, 0)",
							color: "#ffdd00",
							borderRadius: "5px",
							fontSize: "12px",
							padding: "2px",
						}}
					>
						GUEST
					</Box>
				) : (
					""
				)}
			</Box>
			<Box sx={{ fontWeight: 400 }}>
				{topic.conversationType == "GUEST_WITH_CS" ? (
					<Link classes={{ root: classes.hyperlink }}>
						{topic.guestInfo?.guestID} - {topic.guestInfo?.fullName}
					</Link>
				) : (
					<Link
						rel="noopener noreferrer"
						target="_blank"
						classes={{ root: classes.hyperlink }}
						href={`${publicRuntimeConfig.INTERNAL_HOST}/crm/customer/detail?customerCode=${topic.customerInfo?.code}&customerId=${topic.customerInfo?.customerID}`}
					>
						{topic.customerInfo?.accountID} - {topic.customerInfo?.name}
					</Link>
				)}
			</Box>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
				}}
			>
				{topic.customerInfo?.color == "BLUE" ? (
					<Box
						component="img"
						src="/images/icon/vip.png"
						sx={{
							width: "20px",
							height: "20px",
							display: "inline-block",
							marginRight: "6px",
						}}
					/>
				) : (
					<Box
						component="img"
						src="/images/icon/normal.png"
						sx={{
							width: "20px",
							height: "20px",
							display: "inline-block",
							marginRight: "6px",
						}}
					/>
				)}
				<span
					style={{
						fontSize: "14px",
						color: "#BEBDBD",
					}}
				>
					<span
						style={{
							fontSize: "14px",
							fontWeight: 400,
							color: "#BEBDBD",
						}}
					>
						{topic.conversationType == "GUEST_WITH_CS"
							? CustomerTypeText(t)[CustomerTypeColor.UNKNOWN]
							: CustomerTypeText(t)[topic.customerInfo?.color]}
					</span>
				</span>
			</Box>
		</TableCell>
	);
};

export default CustomerType;
