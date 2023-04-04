import { MyCard, MyCardContent } from "@thuocsi/nextjs-components/my-card/my-card";
import {
	Box,
	IconButton,
	Paper,
	Tab,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tabs,
	Tooltip,
	Typography,
} from "@material-ui/core";
import { displayDate } from "components/utils";
import { AnalyticsChart, AnalyticsPie } from "./chart";
import { FlexContainer, FlexContent } from "../../common/flex";
import styles from "./report.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { VietnameseMap } from "../../map/vn";
import { accountType, provinceList } from "components/master-data";
import { EventList } from "../event/event-list";
import { getMonitoringAnalyticsClient } from "client/monitoring-analytics";
import { APIStatus } from "lib/common";

function getTimeLabel(time, span) {
	let d = new Date(time);
	let s = d.getMonth() + 1;
	switch (span) {
		case "DAY":
			s = d.getDate() + "/" + s;
			break;
		case "HOUR":
			s = d.getHours() + " " + d.getDate() + "/" + s;
	}
	return s;
}

function GroupAnalytics({ groupAnalytics, title, t, filter, groupType }) {
	let data = groupAnalytics.data;
	let total = 0,
		totalUser = 0;
	data.forEach((d) => {
		total += d.value;
		totalUser += d.userCount;
	});
	data.forEach((d) => {
		d.ratio = Number((d.value * 100.0) / total).toFixed(2);
		d.userRatio = Number((d.userCount * 100.0) / totalUser).toFixed(2);
	});

	let className = styles.groupTitle;
	switch (groupType) {
		case "BASIC":
			className += " " + styles.groupBasic;
			break;
		case "CLASSIFICATION":
			className += " " + styles.groupClassification;
			break;
		case "CUSTOMER":
			className += " " + styles.groupUser;
			break;
	}
	return (
		<Box className={styles.analyticsGroup}>
			<Typography className={className}>{title}</Typography>
			<FlexContainer>
				<FlexContent className={styles.small}>
					<AnalyticsPie data={data} t={t} />
				</FlexContent>
				<FlexContent className={styles.large}>
					<Box className={styles.analyticsTableContainer}>
						<table className={styles.analyticsTable}>
							<thead>
								<tr>
									<th width="30%">{title}</th>
									<th
										width="20%"
										style={{ textAlign: "right" }}
									>{t`monitoring:action_count`}</th>
									<th width="10%" />
									<th
										width="20%"
										style={{ textAlign: "right" }}
									>{t`monitoring:user_count`}</th>
									<th width="10%" />
									<th width="10%" />
								</tr>
							</thead>
							<tbody>
								{data.map((row) => {
									return (
										<tr key={row.label}>
											<td>{row.label}</td>
											<td align="right">{row.value}</td>
											<td className={styles.ratioNumber}>{row.ratio} %</td>
											<td align="right">{row.userCount}</td>
											<td className={styles.ratioNumber}>
												{row.userRatio} %
											</td>
											<td>
												<Tooltip
													title={t`monitoring:report.view_action_list`}
												>
													<IconButton className={styles.reportAction}>
														<Link
															href={`/report/monitoring/event?filter=${JSON.stringify(
																filter
															)}`}
														>
															<a>
																<FontAwesomeIcon icon={faSearch} />
															</a>
														</Link>
													</IconButton>
												</Tooltip>
												<Tooltip
													title={t`monitoring:report.new_with_filter`}
												>
													<IconButton className={styles.reportAction}>
														<Link
															href={`/report/monitoring/event?filter=${JSON.stringify(
																filter
															)}`}
														>
															<a>
																<FontAwesomeIcon icon={faPlus} />
															</a>
														</Link>
													</IconButton>
												</Tooltip>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</Box>
				</FlexContent>
			</FlexContainer>
		</Box>
	);
}

function LocationAnalytics({ locationAnalytics, lang, t }) {
	let data = locationAnalytics.data;
	let max = 0,
		total = 0,
		totalUser = 0;
	locationAnalytics.data.forEach((p) => {
		if (p.value > max) {
			max = p.value;
		}
		total += p.value;
		totalUser += p.userCount;
	});
	locationAnalytics.max = max;

	// console.log("location", locationAnalytics)
	return (
		<Box className={styles.analyticsGroup}>
			<Typography className={styles.groupTitle + " " + styles.groupUser}>
				Thống kê theo địa lý
			</Typography>
			<FlexContainer>
				<FlexContent className={styles.small + " " + styles.padding75}>
					{lang === "vi" ? <VietnameseMap mapData={locationAnalytics} /> : ""}
				</FlexContent>
				<FlexContent className={styles.large}>
					<Box className={styles.analyticsTableContainer}>
						<table className={styles.analyticsTable}>
							<thead>
								<tr>
									<th width="30%">{t`monitoring:location`}</th>
									<th
										width="20%"
										style={{ textAlign: "right" }}
									>{t`monitoring:action_count`}</th>
									<th width="10%"></th>
									<th
										width="20%"
										style={{ textAlign: "right" }}
									>{t`monitoring:user_count`}</th>
									<th width="10%"></th>
									<th width="10%" />
								</tr>
							</thead>
							<tbody>
								{data && data.length
									? data.map((row) => {
											return (
												<tr key={row.label}>
													<td>
														{
															provinceList.filter(
																(p) => p.code === row.label
															)[0].name
														}
													</td>
													<td align={"right"}>{row.value}</td>
													<td className={styles.ratioNumber}>
														{Number(
															(row.value * 100.0) / total
														).toFixed(1)}{" "}
														%
													</td>
													<td align={"right"}>{row.userCount}</td>
													<td className={styles.ratioNumber}>
														{Number(
															(row.userCount * 100.0) / totalUser
														).toFixed(1)}{" "}
														%
													</td>
													<td>
														<Tooltip
															title={t`monitoring:report.view_action_list`}
														>
															<IconButton
																className={styles.reportAction}
															>
																<Link
																	href={`/report/monitoring/event?filter=`}
																>
																	<a>
																		<FontAwesomeIcon
																			icon={faSearch}
																		/>
																	</a>
																</Link>
															</IconButton>
														</Tooltip>
														<Tooltip
															title={t`monitoring:report.new_with_filter`}
														>
															<IconButton
																className={styles.reportAction}
															>
																<Link
																	href={`/report/monitoring/event?filter=`}
																>
																	<a>
																		<FontAwesomeIcon
																			icon={faPlus}
																		/>
																	</a>
																</Link>
															</IconButton>
														</Tooltip>
													</td>
												</tr>
											);
									  })
									: ""}
							</tbody>
						</table>
					</Box>
				</FlexContent>
			</FlexContainer>
		</Box>
	);
}

function UserAnalytics({ userAnalytics, t }) {
	let data = userAnalytics.data;

	return (
		<Box className={styles.analyticsGroup}>
			<Typography className={styles.groupTitle + " " + styles.groupUser}>
				Danh sách người dùng
			</Typography>
			<Box className={styles.analyticsTableContainer}>
				<TableContainer>
					<Table size={"small"}>
						<TableHead>
							<TableRow>
								<TableCell width="20%">Người dùng</TableCell>
								<TableCell width="20%">Thông tin</TableCell>
								<TableCell width="30%">{t`monitoring:action_count`}</TableCell>
								<TableCell width="10%">
									<Tooltip title={t`monitoring:report.download_user_list`}>
										<IconButton className={styles.reportAction}>
											<FontAwesomeIcon icon={faDownload} />
										</IconButton>
									</Tooltip>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((row) => {
								let infoComponent = <></>;
								if (row.info?.customerID) {
									infoComponent = (
										<Box>
											<Tooltip
												title={
													"Nhấn để xem chi tiết khách hàng " +
													row.customerID
												}
											>
												<a
													href={`/crm/customer/detail?customerCode=${row.info.code}&customerId=${row.customerID}`}
													target="_blank"
													className={styles.userLink}
												>
													{accountType[row.accountType]} #
													{row.info.customerID}
												</a>
											</Tooltip>
											<br />
											<Tooltip title={"Tên"}>
												<span>{row.info.name}</span>
											</Tooltip>
											<br />
											<Tooltip title={"SĐT"}>
												<span>{row.info.phone}</span>
											</Tooltip>
											<br />
											<Tooltip title={"Địa chỉ"}>
												<span>{row.info.address}</span>
											</Tooltip>
											<br />
											<Tooltip title={"Tỉnh"}>
												<b>
													{
														provinceList.filter(
															(p) => p.code === row.info.provinceCode
														)[0].name
													}
												</b>
											</Tooltip>
										</Box>
									);
								} else if (row.info?.sellerID) {
									infoComponent = (
										<Box>
											{row.info.sellerID} - {row.info.name}
											<br />
											{row.info.address}
										</Box>
									);
								}

								return (
									<TableRow key={row.customerID}>
										<TableCell>
											{row.accountID}
											<br />
											{row.accountName}
										</TableCell>
										<TableCell>{infoComponent} </TableCell>
										<TableCell>{row.value}</TableCell>
										<TableCell>
											<Tooltip
												title={
													"Xem danh sách chi tiết thao tác của người dùng này"
												}
											>
												<IconButton className={styles.reportAction}>
													<Link href={`/report/monitoring/event?filter=`}>
														<a>
															<FontAwesomeIcon icon={faSearch} />
														</a>
													</Link>
												</IconButton>
											</Tooltip>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Box>
	);
}

function ReportAnalytics({ report, reportAnalytics, t, lang }) {
	let standardMap = {},
		userCountMap = {};
	if (reportAnalytics && reportAnalytics.standardAnalytics?.length) {
		reportAnalytics.standardAnalytics.forEach((a) => {
			let label = getTimeLabel(a.time, report.span);
			standardMap[label] = a.value;
			userCountMap[label] = a.userCount;
		});
	}

	let data = [];
	let current = new Date(report.from),
		end = new Date(report.to);
	let lastValue;
	while (+current <= +end) {
		let label = getTimeLabel(current, report.span);
		let currentValue = {
			time: current,
			label: label,
			value: standardMap[label] || 0,
			userCount: userCountMap[label] || 0,
		};

		if (lastValue) {
			if (lastValue.value === 0) {
				currentValue.diff = currentValue.value > 0 ? Number(100).toFixed(2) : 0;
				currentValue.userDiff = currentValue.userCount > 0 ? Number(100).toFixed(2) : 0;
			} else {
				currentValue.diff = Number(
					((currentValue.value - lastValue.value) * 100) / lastValue.value
				).toFixed(2);
				currentValue.userDiff = Number(
					((currentValue.userCount - lastValue.userCount) * 100) / lastValue.userCount
				).toFixed(2);
			}
		}

		data.push(currentValue);
		switch (report.span) {
			case "DAY":
				current.setDate(current.getDate() + 1);
				break;
			case "HOUR":
				current.setHours(current.getHours() + 1);
				break;
			case "MONTH":
				current.setMonth(current.getMonth() + 1);
				break;
		}
		lastValue = currentValue;
	}

	let convertToChartData = function (a) {
		if (!a || !a.length) {
			return { total: 0, data: [] };
		}
		return {
			total: a[0].total,
			data: a[0].data.map((item) => ({
				label: item.metadataValue,
				value: item.value,
				userCount: item.userCount,
			})),
		};
	};

	let platformData = convertToChartData(
		reportAnalytics.groupAnalytics.filter(
			(e) => e.groupType === "BASIC" && e.metadataKey === "PLATFORM"
		)
	);
	let osData = convertToChartData(
		reportAnalytics.groupAnalytics.filter(
			(e) => e.groupType === "BASIC" && e.metadataKey === "OS"
		)
	);
	let osVersionData = convertToChartData(
		reportAnalytics.groupAnalytics.filter(
			(e) => e.groupType === "BASIC" && e.metadataKey === "OS_VERSION"
		)
	);
	let clientData = convertToChartData(
		reportAnalytics.groupAnalytics.filter(
			(e) => e.groupType === "BASIC" && e.metadataKey === "CLIENT"
		)
	);
	let clientVersionData = convertToChartData(
		reportAnalytics.groupAnalytics.filter(
			(e) => e.groupType === "BASIC" && e.metadataKey === "CLIENT_VERSION"
		)
	);
	let locationAnalytics = convertToChartData(
		reportAnalytics.groupAnalytics.filter(
			(e) => e.groupType === "USER" && e.metadataKey === "LOCATION"
		)
	);
	let statusData = convertToChartData(
		reportAnalytics.groupAnalytics.filter(
			(e) => e.groupType === "BASIC" && e.metadataKey === "STATUS"
		)
	);
	let classification = [],
		customer = [];
	if (report.reportTemplate?.classifiedKeys) {
	}

	return (
		<MyCard>
			<MyCardContent>
				{/* Standard Analytics */}
				<FlexContainer>
					<FlexContent className={styles.large}>
						<AnalyticsChart data={data} span={report.span} t={t} title={"Hello"} />
					</FlexContent>
					<FlexContent className={styles.small}>
						<Box className={styles.analyticsTableContainer}>
							<table className={styles.analyticsTable}>
								<thead>
									<tr>
										<th width="30%">{t`monitoring:time`}</th>
										<th
											width="20%"
											style={{ textAlign: "right" }}
										>{t`monitoring:action_count`}</th>
										<th width="10%" />
										<th
											width="20%"
											style={{ textAlign: "right" }}
										>{t`monitoring:user_count`}</th>
										<th width="10%" />
										<th width="10%" />
									</tr>
								</thead>
								<tbody>
									{data.map((row) => {
										let color = "#000";
										if (row.diff) {
											if (row.diff > 0) {
												color = "green";
											} else {
												color = "red";
											}
										}
										return (
											<tr key={row.label}>
												<td>{row.label}</td>
												<td align="right">{row.value}</td>
												<td style={{ color: color }}>
													{row.diff === 0 || !row.diff
														? "-"
														: row.diff > 0
														? "+" + row.diff + "%"
														: row.diff + "%"}
												</td>
												<td align="right">{row.userCount}</td>
												<td style={{ color: color }}>
													{row.userDiff === 0 || !row.userDiff
														? "-"
														: row.userDiff > 0
														? "+" + row.userDiff + "%"
														: row.userDiff + "%"}
												</td>
												<td>
													{row.value ? (
														<Tooltip
															title={
																"Tạo báo cáo mới chỉ riêng trong thời gian này"
															}
														>
															<IconButton
																className={styles.reportAction}
															>
																<Link
																	href={`/report/monitoring/new-report?time=${JSON.stringify(
																		row.time
																	)}`}
																>
																	<a>
																		<FontAwesomeIcon
																			icon={faPlus}
																		/>
																	</a>
																</Link>
															</IconButton>
														</Tooltip>
													) : (
														""
													)}
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</Box>
					</FlexContent>
				</FlexContainer>

				{/* Groups Analytics */}
				<GroupAnalytics
					title={t`monitoring:template.platform`}
					groupAnalytics={platformData}
					t={t}
					groupType={"BASIC"}
				/>
				<GroupAnalytics
					title={t`monitoring:template.os`}
					groupAnalytics={osData}
					t={t}
					groupType={"BASIC"}
				/>
				<GroupAnalytics
					title={t`monitoring:template.os_version`}
					groupAnalytics={osVersionData}
					t={t}
					groupType={"BASIC"}
				/>
				<GroupAnalytics
					title={t`monitoring:template.client`}
					groupAnalytics={clientData}
					t={t}
					groupType={"BASIC"}
				/>
				<GroupAnalytics
					title={t`monitoring:template.client_version`}
					groupAnalytics={clientVersionData}
					t={t}
					groupType={"BASIC"}
				/>
				<GroupAnalytics
					title={t`monitoring:report.action_status`}
					groupAnalytics={statusData}
					t={t}
					groupType={"BASIC"}
				/>

				<LocationAnalytics locationAnalytics={locationAnalytics} lang={lang} t={t} />
				<UserAnalytics userAnalytics={reportAnalytics.userAnalytics} t={t} />
			</MyCardContent>
		</MyCard>
	);
}

function ReportBasicInfo({ report, t }) {
	function getRowListFromObject(filter) {
		return filter
			? Object.keys(filter).map((key) => {
					let operator = filter[key].operator;
					let value = filter[key].value;
					if (value === "ALL") {
						value = t`common:all`;
					}
					return (
						<TableRow key={key}>
							<TableCell>{key}</TableCell>
							<TableCell>
								{operator} {value}
							</TableCell>
						</TableRow>
					);
			  })
			: "";
	}

	return (
		<MyCard>
			<MyCardContent>
				<FlexContainer className={styles.infoTable}>
					<FlexContent>
						<TableContainer component={Paper}>
							<Table size="small">
								<TableHead className={styles.tableHead}>
									<TableRow>
										<TableCell
											colSpan={"100%"}
										>{t`monitoring:report.basic_info`}</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow>
										<TableCell>{t`common:created_time`}</TableCell>
										<TableCell>
											{displayDate(report.createdTime, "-")}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>{t`monitoring:report.requested_by`}</TableCell>
										<TableCell>
											{report.requestedBy} - {report.requestedByName}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</FlexContent>
				</FlexContainer>

				<FlexContainer className={styles.infoTable}>
					<FlexContent>
						<TableContainer component={Paper}>
							<Table size="small">
								<TableHead className={styles.tableHead}>
									<TableRow>
										<TableCell
											colSpan={"100%"}
										>{t`monitoring:report.filter`}</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow>
										<TableCell>{t`common:action`}</TableCell>
										<TableCell>{report.reportTemplate.eventCode}</TableCell>
									</TableRow>

									{getRowListFromObject(report.reportTemplate.filter)}
									{getRowListFromObject(report.reportTemplate.uaFilter)}
									{getRowListFromObject(report.reportTemplate.customerFilter)}
								</TableBody>
							</Table>
						</TableContainer>
					</FlexContent>
				</FlexContainer>
			</MyCardContent>
		</MyCard>
	);
}

function ReportEventList({ reportID, t }) {
	let [total, setTotal] = React.useState(0);
	React.useEffect(() => {
		(async function () {
			let client = getMonitoringAnalyticsClient();
			let result = await client.getResultOfReport(reportID);

			if (result && result.status === APIStatus.OK) {
				setTotal(result.data[0].progressCurrent);
			}
		})();
	});

	return (
		<MyCard>
			<EventList eventFilter={{ reportID }} total={total} t={t} />
		</MyCard>
	);
}

function ReportShortInfo({ report, t }) {
	return (
		<MyCard>
			<MyCardContent>
				<Box>
					{t`monitoring:report.detail`} <b>#{report.reportID}</b>
				</Box>
				<Box>
					{t`common:from`} <b>{displayDate(report.from, "-")}</b> {t`common:to`}
					<b>{displayDate(report.to, "-")}</b>
				</Box>
				<Box>
					{t`common:group_by`} <b>{t(`common:time.${report.span?.toLowerCase()}`)}</b>
				</Box>
			</MyCardContent>
		</MyCard>
	);
}

export function TrackingReport({ report, reportAnalytics, t, lang }) {
	let [selectedTab, setSelectedTab] = React.useState("result");
	let onTabChange = function (_, option) {
		window.location.hash = "#" + option;
		setSelectedTab(option);
	};

	React.useEffect(() => {
		let w = typeof window != "undefined" ? window : {};
		setSelectedTab(
			"#basic-info" === w?.location?.hash
				? "basic-info"
				: "#event-list" === w?.location?.hash
				? "event-list"
				: "result"
		);
	}, []);

	return (
		<>
			<ReportShortInfo report={report} t={t} />
			<Tabs
				onChange={onTabChange}
				value={selectedTab}
				textColor="primary"
				indicatorColor="primary"
			>
				<Tab
					label={t("monitoring:report.basic_info")}
					key="basic-info"
					value="basic-info"
				/>
				<Tab label={t("monitoring:report.analytics")} key="result" value="result" />
				<Tab label={t`monitoring:report.event_list`} key="event-list" value="event-list" />
			</Tabs>

			{selectedTab === "basic-info" ? (
				<ReportBasicInfo report={report} t={t} />
			) : selectedTab === "event-list" ? (
				<ReportEventList reportID={report.reportID} t={t} />
			) : (
				<ReportAnalytics
					report={report}
					reportAnalytics={reportAnalytics}
					t={t}
					lang={lang}
				/>
			)}
		</>
	);
}
