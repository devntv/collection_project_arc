import * as React from "react";
import getConfig from "next/config";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { CustomerInfo } from "@thuocsi/profile-customer";
import Paper from "@material-ui/core/Paper";
import {
	Button,
	Checkbox,
	FormControlLabel,
	Link,
	Modal,
	Switch,
	Tooltip,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { createTheme, ThemeProvider } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { useEffect } from "react";
import { getFormattedDate } from "lib/DateTimeUtil";
import { EmployeeInfo } from "@thuocsi/profile";
import LoadingBars from "../Loading/LoadingBars";
import { useState } from "react";
import MessageStatus from "../MessageStatus/MessageStatus";
import { CONVERSATION_TYPE } from "services/ChatService";
import useTranslation from "next-translate/useTranslation";
import { CONVERSATION_STATUS } from "constants/chat";
import CustomerType from "components/ChatReport/Table/CustomerType";

const { publicRuntimeConfig } = getConfig();

const hrefStyle = `
  a {
    text-decoration: none !important;
  }
`;

function EnhancedTableHead({
	canTransfer,
	order,
	changeOrder,
	columns,
	headCells,
	onCheckBoxAll,
	isCheckAll,
}) {
	return (
		<TableHead style={{ borderCollapse: "separate", backgroundColor: "#f5f5f5" }}>
			<TableRow>
				{headCells.map((headCell, index) => {
					if (headCell.id == "check-box") {
						return (
							<TableCell key={index} sx={{ padding: "6px 16px" }}>
								<Checkbox
									disabled={!canTransfer}
									color="success"
									checked={isCheckAll()}
									onChange={(e) => {
										onCheckBoxAll(e);
									}}
									align={"center"}
									sx={{ width: "100%" }}
								/>
							</TableCell>
						);
					} else {
						return (
							!columns?.includes(index) && (
								<TableCell
									key={index}
									align={headCell.align || "left"}
									tabIndex={0}
									style={{
										padding: "6px 16px",
										fontSize: "14px",
										position: "relative",
										fontWeight: 700,
										// "&:after": {
										//   content: '""',
										//   position: "absolute",
										//   width: 0,
										//   height: "20px",
										//   borderRight: "solid 2px #e0e0e0",
										//   top: "50%",
										//   transform: "translateY(-50%)",
										//   left: 0
										// }
									}}
								>
									{headCell.haveSort ? (
										<TableSortLabel
											direction={order}
											onClick={changeOrder}
											style={{
												"& > svg": {
													fontSize: "30px",
													opacity: "1 !important",
												},
												color: "rgba(0, 0, 0, 0.87) !important",
												"&:hover": { opacity: 0.5 },
											}}
											IconComponent={ArrowDropUpIcon}
										>
											{headCell.label.toUpperCase()}
										</TableSortLabel>
									) : (
										<>{headCell.label.toUpperCase()}</>
									)}
								</TableCell>
							)
						);
					}
				})}
			</TableRow>
		</TableHead>
	);
}

const useStyles = makeStyles({
	status: {
		height: "26px",
		borderRadius: "6px",
		width: "100px",
		color: "white",
		fontWeight: "600px",
		fontSize: "14px",
		textAlign: "center",
		margin: "auto",
		lineHeight: "24px",
		"&.processing": {
			backgroundColor: "#1A73B8",
		},
		"&.completed": {
			backgroundColor: "#15A959",
		},
		"&.waitProcess": {
			backgroundColor: "#EE4D2D",
		},
		"&.waitComplete": {
			backgroundColor: "#1DC3C3",
		},
	},
	pagination: {
		flexWrap: "nowrap",
	},
	hyperlink: {
		textDecoration: "none !important",
		color: "#00b46e",
	},
	modal: {
		"& > div": {
			backgroundColor: "rgba(255, 255, 255, 0.5) !important",
			outline: "none",
		},
	},
});
const theme = createTheme({
	palette: {
		success: {
			main: "#15A959",
		},
		green: "#15A959",
	},
});

export default function ConversationsTable({
	setCanTransfer,
	canTransfer,
	rowsPerPageOptions,
	listTopics,
	totalTopic,
	page,
	rowsPerPage,
	setPage,
	setRowsPerPage,
	setListTopics,
	loading,
	headCells,
	transferEmployeeList,
	setTransferEmployeeList,
	loggedInUserInfo,
	lang,
}) {
	const { t } = useTranslation();
	const classes = useStyles();
	const [order, setOrder] = React.useState("asc");
	const [isSorted, setIsSorted] = React.useState(true);
	const [selected, setSelected] = React.useState([]);
	const [columns, setColumns] = useState([]);
	const [columnFilterOpen, setColumnFilterOpen] = useState(false);

	useEffect(() => {
		if (order == "asc") {
			setListTopics(listTopics.sort((a, b) => b.sortField - a.sortField));
			setIsSorted(!isSorted);
		} else {
			setListTopics(listTopics.sort((a, b) => a.sortField - b.sortField));
			setIsSorted(!isSorted);
		}
	}, [order]);

	const toggleOrder = () => {
		if (order == "asc") {
			setOrder("desc");
		} else {
			setOrder("asc");
		}
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage + 1);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(1);
	};

	const onCheckBoxChange = (e, conversationID) => {
		if (e.target.checked) {
			transferEmployeeList.push(conversationID);
			setTransferEmployeeList(transferEmployeeList);
		} else {
			let index = transferEmployeeList.indexOf(conversationID);
			if (index !== -1) {
				transferEmployeeList.splice(index, 1);
				setTransferEmployeeList(transferEmployeeList);
			}
		}
	};

	const onCheckBoxAll = (e) => {
		if (e.target.checked) {
			listTopics.forEach((item) => {
				if (item.conversationStatus == CONVERSATION_STATUS.PROCESSING) {
					if (!transferEmployeeList.includes(item.conversationID)) {
						transferEmployeeList.push(parseInt(item.conversationID));
					}
				}
			});
			setTransferEmployeeList(transferEmployeeList);
		} else {
			listTopics.forEach((item2) => {
				transferEmployeeList.forEach((item, index) => {
					if (item == item2.conversationID) {
						transferEmployeeList.splice(index, 1);
					}
				});
			});
			setTransferEmployeeList(transferEmployeeList);
		}
	};

	const isCheckAll = () => {
		let count = 0;
		let processCount = 0;
		listTopics.forEach((item) => {
			if (item.conversationStatus == CONVERSATION_STATUS.PROCESSING) {
				processCount++;
			}
		});
		listTopics.forEach((item) => {
			if (item.conversationStatus == CONVERSATION_STATUS.PROCESSING) {
				transferEmployeeList.forEach((item2) => {
					if (item2 == item.conversationID) {
						count++;
					}
				});
			}
		});
		if (count >= processCount) {
			return true;
		} else {
			return false;
		}
	};

	const handleCloseColumnFilter = () => {
		setColumnFilterOpen(false);
	};

	useEffect(() => {
		window.addEventListener("click", handleCloseColumnFilter);
		return () => {
			window.removeEventListener("click", handleCloseColumnFilter);
		};
	}, []);

	useEffect(() => {
		if (isCheckAll() && transferEmployeeList?.length == 0) {
			setCanTransfer(false);
		}
	}, [listTopics]);

	const isSelected = (name) => selected.indexOf(name) !== -1;
	// Avoid a layout jump when reaching the last page with empty rows.
	return (
		<ThemeProvider theme={theme}>
			<style>{hrefStyle}</style>
			<Box
				sx={{
					width: "100%",
					"& td": { fontSize: "14px" },
					borderRadius: "4px",
				}}
			>
				<Paper
					sx={{
						position: "relative",
						display: "flex",
						flexDirection: "column",
						width: "100%",
					}}
				>
					{/* <Button sx={{color: "#15A959", display: "flex", gap: "5px", width: "fit-content", paddingLeft: "13px", margin: "3px"}} onClick={(e)=>{handleColumnFilterClick(e)}}>
            <ViewWeekIcon />
            Cột
          </Button> */}
					<TableContainer>
						<Table
							sx={{ minWidth: 750, borderCollapse: "unset" }}
							aria-labelledby="tableTitle"
						>
							<EnhancedTableHead
								canTransfer={canTransfer}
								columns={columns}
								order={order}
								changeOrder={toggleOrder}
								headCells={headCells}
								onCheckBoxAll={onCheckBoxAll}
								isCheckAll={isCheckAll}
							/>
							{listTopics && listTopics.length > 0 && (
								<TableBody
									sx={{
										borderCollapse: "unset",
										border: "none",
										"& > tr > th": {
											display: columns.includes(0) ? "none" : "table-cell",
										},
										"& > tr > td:nth-of-type(1)": {
											display: columns.includes(1) ? "none" : "table-cell",
										},
										"& > tr > td:nth-of-type(2)": {
											display: columns.includes(2) ? "none" : "table-cell",
										},
										"& > tr > td:nth-of-type(3)": {
											display: columns.includes(3) ? "none" : "table-cell",
										},
										"& > tr > td:nth-of-type(4)": {
											display: columns.includes(4) ? "none" : "table-cell",
										},
										"& > tr > td:nth-of-type(5)": {
											display: columns.includes(5) ? "none" : "table-cell",
										},
										"& > tr > td:nth-of-type(6)": {
											display: columns.includes(6) ? "none" : "table-cell",
										},
										"& > tr > td:nth-of-type(7)": {
											display: columns.includes(7) ? "none" : "table-cell",
										},
										"& > tr > td:nth-of-type(8)": {
											display: columns.includes(8) ? "none" : "table-cell",
										},
									}}
								>
									{listTopics.map((topic, index) => {
										const isItemSelected = isSelected(topic.topicID);
										const labelId = `enhanced-table-checkbox-${index}`;

										return (
											<TableRow
												tabIndex={-1}
												key={index}
												sx={{
													padding: "0 14px",
													"& > td:focus, & > th:focus": {
														outline: "solid #00b46e 1px",
														outlineOffset: "-1px",
													},
												}}
											>
												{headCells.map((item) => {
													switch (item.id) {
														case "check-box":
															return <Box></Box>;
														case "id-column":
															return (
																<TableCell
																	component="th"
																	id={labelId}
																	scope="row"
																	tabIndex={0}
																	key={`${item.id}-${topic.topicID}`}
																>
																	<Link
																		classes={{
																			root: classes.hyperlink,
																		}}
																		rel="noopener noreferrer"
																		target="_blank"
																		href={`${publicRuntimeConfig.INTERNAL_HOST}/cs/chat?conversation=${topic.conversationID}&topic=${topic.topicID}`}
																	>
																		{topic?.topicID}
																	</Link>
																</TableCell>
															);
														case "customer-info":
															return (
																<CustomerType
																	index={index}
																	item={item}
																	topic={topic}
																	classes={classes}
																/>
															);
														case "customer-support":
															return (
																<TableCell
																	style={{ whiteSpace: "nowrap" }}
																	tabIndex={index}
																	align="left"
																	key={`${item.id}-${topic.topicID}`}
																>
																	{topic?.customerSupportID && (
																		<EmployeeInfo
																			accountID={
																				topic.customerSupportID
																			}
																			language={lang}
																		>
																			<span
																				style={{
																					color: "#00b46e",
																				}}
																			>
																				{
																					topic.customerSupportName
																				}
																			</span>
																		</EmployeeInfo>
																	)}
																</TableCell>
															);
														case "created-time":
															return (
																<TableCell
																	key={`${item.id}-${topic.topicID}`}
																	style={{
																		fontWeight:
																			"400 !important",
																		whiteSpace: "nowrap",
																	}}
																	tabIndex={index}
																	align="left"
																>
																	{topic?.createdTime &&
																		getFormattedDate(
																			new Date(
																				topic.createdTime
																			),
																			"DD/MM/YYYY HH:mm"
																		)}
																</TableCell>
															);
														case "approval-time":
															return (
																<TableCell
																	key={`${item.id}-${topic.topicID}`}
																	style={{
																		fontWeight:
																			"400 !important",
																	}}
																	tabIndex={index}
																	align="left"
																>
																	{topic?.approvalTime &&
																		getFormattedDate(
																			new Date(
																				topic.approvalTime
																			),
																			"DD/MM/YYYY HH:mm"
																		)}
																</TableCell>
															);
														case "completed-time":
															return (
																<TableCell
																	key={`${item.id}-${topic.topicID}`}
																	style={{
																		fontWeight:
																			"400 !important",
																	}}
																	tabIndex={index}
																	align="left"
																>
																	{topic?.completedTime &&
																		getFormattedDate(
																			new Date(
																				topic.completedTime
																			),
																			"DD/MM/YYYY HH:mm"
																		)}
																</TableCell>
															);
														case "status":
															return (
																<TableCell
																	key={`${item.id}-${topic.topicID}`}
																	tabIndex={index}
																	align="left"
																>
																	{topic?.conversationStatus ==
																		CONVERSATION_STATUS.COMPLETED && (
																		<Box
																			sx={{
																				textAlign: "center",
																				width: "100px",
																				margin: "auto",
																			}}
																		>
																			{Array.apply(
																				null,
																				Array(topic.rating)
																			).map(
																				(item2, index2) => (
																					<StarIcon
																						key={index2}
																						style={{
																							fontSize:
																								"15px !important",
																							color: "#fee060",
																						}}
																					/>
																				)
																			)}
																			{Array.apply(
																				null,
																				Array(
																					5 - topic.rating
																				)
																			).map(
																				(item2, index2) => (
																					<StarBorderIcon
																						key={index2}
																						style={{
																							fontSize:
																								"15px !important",
																							color: "#fee060",
																						}}
																					/>
																				)
																			)}
																		</Box>
																	)}
																	<Box
																		sx={{
																			maxWidth: "100px",
																			margin: "auto",
																		}}
																	>
																		<MessageStatus
																			status={
																				topic.conversationStatus ||
																				CONVERSATION_STATUS.PROCESSING
																			}
																		/>
																	</Box>
																	{topic?.conversationStatus ==
																		CONVERSATION_STATUS.COMPLETED && (
																		<Box
																			sx={{
																				fontSize: "12px",
																				textAlign: "center",
																				marginTop: "5px",
																			}}
																		>
																			{getFormattedDate(
																				new Date(
																					topic.completedTime
																				),
																				"DD/MM/YYYY HH:mm"
																			) || "12/12/2012 12:12"}
																		</Box>
																	)}
																</TableCell>
															);
														case "short-status":
															return (
																<TableCell
																	key={`${item.id}-${topic.topicID}`}
																	tabIndex={index}
																	align="center"
																>
																	<Box
																		sx={{
																			maxWidth: "100px",
																			margin: "auto",
																		}}
																	>
																		<MessageStatus
																			status={
																				topic.status ||
																				CONVERSATION_STATUS.PROCESSING
																			}
																		/>
																	</Box>
																</TableCell>
															);
														case "tag-list":
															return (
																<TableCell
																	key={`${item.id}-${topic.topicID}`}
																	tabIndex={index}
																	align="left"
																>
																	{topic.taggedItems &&
																	topic.taggedItems?.length >
																		0 ? (
																		topic.taggedItems.map(
																			(tagItem, tagIndex) => {
																				return (
																					<React.Fragment
																						key={
																							tagIndex
																						}
																					>
																						{tagItem.type ==
																							"ORDER" && (
																							<React.Fragment>
																								<Link
																									rel="noopener noreferrer"
																									target="_blank"
																									sx={{
																										color: "#00b46e",
																										textDecoration:
																											"none",
																										cursor: "pointer",
																										display:
																											"block",
																										margin: "5px 0",
																										whiteSpace:
																											"nowrap",
																										width: "150px",
																										overflow:
																											"hidden",
																										textOverflow:
																											"ellipsis",
																									}}
																									href={`${publicRuntimeConfig.INTERNAL_HOST}/crm/order/detail?orderCode=${tagItem.orderInfo?.orderCode}&orderId=${tagItem.orderInfo?.orderID}`}
																								>
																									ĐH
																									-{" "}
																									{
																										tagItem.resource
																									}
																								</Link>
																							</React.Fragment>
																						)}
																						{tagItem.type ==
																							"PRODUCT" && (
																							<Tooltip
																								title={
																									tagItem
																										?.skuInfo
																										?.name
																								}
																							>
																								<Link
																									rel="noopener noreferrer"
																									target="_blank"
																									sx={{
																										color: "#00b46e",
																										textDecoration:
																											"none",
																										cursor: "pointer",
																										display:
																											"block",
																										margin: "5px 0",
																										whiteSpace:
																											"nowrap",
																										width: "150px",
																										overflow:
																											"hidden",
																										textOverflow:
																											"ellipsis",
																									}}
																									href={`${publicRuntimeConfig.INTERNAL_HOST}/cms/product/edit?productCode=${tagItem.skuInfo?.productCode}`}
																								>
																									SP
																									-{" "}
																									{
																										tagItem.resource
																									}
																								</Link>
																							</Tooltip>
																						)}
																						{tagItem.type ==
																							"PROMOTION" && (
																							<React.Fragment>
																								<Link
																									rel="noopener noreferrer"
																									target="_blank"
																									sx={{
																										color: "#00b46e",
																										textDecoration:
																											"none",
																										cursor: "pointer",
																										display:
																											"block",
																										margin: "5px 0",
																										whiteSpace:
																											"nowrap",
																										width: "150px",
																										overflow:
																											"hidden",
																										textOverflow:
																											"ellipsis",
																									}}
																								>
																									MAKM
																									-{" "}
																									{
																										tagItem.resource
																									}
																								</Link>
																							</React.Fragment>
																						)}
																						{tagItem?.type ==
																							"TICKET" && (
																							<React.Fragment>
																								<Link
																									rel="noopener noreferrer"
																									target="_blank"
																									sx={{
																										color: "#00b46e",
																										textDecoration:
																											"none",
																										cursor: "pointer",
																										display:
																											"block",
																										margin: "5px 0",
																										whiteSpace:
																											"nowrap",
																										width: "150px",
																										overflow:
																											"hidden",
																										textOverflow:
																											"ellipsis",
																									}}
																									href={`${publicRuntimeConfig.INTERNAL_HOST}/cs/ticket/edit?code=${tagItem.ticketInfo?.code}`}
																								>
																									HOTRO
																									-{" "}
																									{
																										tagItem.resource
																									}
																								</Link>
																							</React.Fragment>
																						)}
																					</React.Fragment>
																				);
																			}
																		)
																	) : (
																		<></>
																	)}
																</TableCell>
															);
														case "action":
															return <Box></Box>;
														case "customer-info-short":
															const nonPermissionChildrenShort = (
																<Tooltip
																	title={`${t(
																		"chat:tooltip.customerInfo"
																	)} ${
																		topic.customer?.name ||
																		topic.customerInfo?.name
																	}`}
																>
																	<a
																		href={`${
																			publicRuntimeConfig.INTERNAL_HOST
																		}/crm/customer/detail?customerCode=${
																			topic.customer?.code ||
																			topic.customerInfo?.code
																		}&customerId=${
																			topic.customer
																				?.customerID ||
																			topic.customerInfo
																				?.customerID
																		}`}
																		style={{
																			textDecoration: "none",
																			color: "#00b46e",
																		}}
																		target="_blank"
																		rel="noreferrer"
																	>
																		<strong>
																			{topic.customer
																				?.phone ||
																				topic.customerInfo
																					?.phone}
																		</strong>{" "}
																		-{" "}
																		{topic.customer
																			?.accountID ||
																			topic.customerInfo
																				?.accountID}{" "}
																		-{" "}
																		{topic.customer?.name ||
																			topic.customerInfo
																				?.name}
																	</a>
																</Tooltip>
															);
															return (
																<TableCell
																	style={{ whiteSpace: "nowrap" }}
																	key={`${item.id}-${topic.topicID}`}
																	tabIndex={index}
																	align="left"
																>
																	{topic.conversationType ==
																	CONVERSATION_TYPE.GUEST_WITH_CS ? (
																		<Link
																			classes={{
																				root: classes.hyperlink,
																			}}
																		>
																			<strong>
																				{topic.guestInfo?.phoneNumber.replace(
																					"+84",
																					"0"
																				)}
																			</strong>{" "}
																			-{" "}
																			{
																				topic.guestInfo
																					?.guestID
																			}{" "}
																			-{" "}
																			{
																				topic.guestInfo
																					?.fullName
																			}
																			<Box
																				sx={{
																					display:
																						"inline-block",
																					marginLeft:
																						"10px",
																					border: "1px solid rgb(255, 221, 0)",
																					color: "#ffdd00",
																					borderRadius:
																						"5px",
																					fontSize:
																						"12px",
																					padding: "2px",
																				}}
																			>
																				GUEST
																			</Box>
																		</Link>
																	) : (
																		// <Link classes={{root: classes.hyperlink}} rel="noopener noreferrer" target="_blank" href={`${publicRuntimeConfig.INTERNAL_HOST}/crm/customer/detail?customerCode=${topic.customer?.code || topic.customerInfo?.code}&customerId=${topic.customer?.customerID || topic.customerInfo?.customerID}`}><strong>{topic.customer?.phone || topic.customerInfo?.phone}</strong> - {topic.customer?.accountID || topic.customerInfo?.accountID} - {topic.customer?.name || topic.customerInfo?.name}</Link>}
																		<CustomerInfo
																			loggedInUserInfo={
																				loggedInUserInfo
																			}
																			accountID={
																				topic.customer
																					?.accountID ||
																				topic.customerInfo
																					?.accountID
																			}
																			nonPermissionChildren={
																				nonPermissionChildrenShort
																			}
																			language={lang}
																		>
																			<strong>
																				{topic.customer
																					?.phone ||
																					topic
																						.customerInfo
																						?.phone}
																			</strong>{" "}
																			-{" "}
																			{topic.customer
																				?.accountID ||
																				topic.customerInfo
																					?.accountID}{" "}
																			-{" "}
																			{topic.customer?.name ||
																				topic.customerInfo
																					?.name}
																		</CustomerInfo>
																	)}
																</TableCell>
															);
														case "region":
															return (
																<TableCell
																	style={{ whiteSpace: "nowrap" }}
																	key={`${item.id}-${topic.topicID}`}
																	tabIndex={index}
																	align="left"
																>
																	{topic?.region ||
																		topic?.customerRegionName}
																</TableCell>
															);
														case "wait-time":
															return (
																<TableCell
																	key={`${item.id}-${topic.topicID}`}
																	tabIndex={index}
																	align="left"
																>
																	{topic?.waitTime}
																</TableCell>
															);

														case "time-frame":
															return (
																<TableCell
																	key={`${item.id}-${topic.topicID}`}
																	tabIndex={index}
																	align="left"
																>
																	{topic?.timeFrame}
																</TableCell>
															);
														case "rating":
															return (
																<TableCell
																	key={`${item.id}-${topic.topicID}`}
																	tabIndex={index}
																	align="left"
																>
																	{topic?.rating}
																</TableCell>
															);

														case "rating-comment":
															return (
																<TableCell
																	style={{ maxWidth: "500px" }}
																	key={`${item.id}-${topic.topicID}`}
																	tabIndex={index}
																	align="left"
																>
																	{topic?.feedback}
																</TableCell>
															);

														default:
															break;
													}
												})}
											</TableRow>
										);
									})}
								</TableBody>
							)}
						</Table>
					</TableContainer>
					{listTopics?.length === 0 && (
						<Box
							sx={{
								fontSize: "22px",
								fontWeight: 400,
								textAlign: "center",
								margin: "50px 0",
							}}
						>
							{t("common:not_found")}
						</Box>
					)}
					{loading && (
						<Modal
							className={classes.modal}
							style={{
								"& > div": {
									backgroundColor: "rgba(255, 255, 255, 0.5) !important",
									outline: "none",
								},
							}}
							open
						>
							<Box
								sx={{
									display: "flex",
									marginTop: "250px",
									justifyContent: "center",
								}}
							>
								<LoadingBars size="100px" color="#00b46e" />
							</Box>
						</Modal>
					)}
					<TablePagination
						style={{
							position: "relative",
						}}
						rowsPerPageOptions={rowsPerPageOptions}
						component="div"
						count={totalTopic}
						rowsPerPage={rowsPerPage}
						page={page - 1}
						ActionsComponent={(props) => {
							return (
								<Pagination
									classes={{
										ul: classes.pagination,
									}}
									count={Math.ceil(props.count / rowsPerPage)}
									defaultPage={page}
									onChange={(e, page) => {
										setPage(page);
									}}
								/>
							);
						}}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
						labelRowsPerPage={t("common:rowsPerPage")}
						labelDisplayedRows={({ from, to, count }) => {
							return (
								<span>
									{t("common:from")} <strong>{from}</strong> {t("common:to")}{" "}
									<strong>{to}</strong> {t("common:in")} <strong>{count}</strong>
								</span>
							);
						}}
					/>
				</Paper>
			</Box>
		</ThemeProvider>
	);
}
