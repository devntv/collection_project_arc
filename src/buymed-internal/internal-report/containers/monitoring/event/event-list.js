import styles from "./event.module.css";
import {
	Box,
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
} from "@material-ui/core";
import { displayDate } from "components/utils";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import { getMonitoringAnalyticsClient } from "client/monitoring-analytics";
import { accountType, provinceList } from "components/master-data";
import { faDownload, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { APIStatus } from "lib/common";

function EventAccountInfo({ id, type }) {
	return (
		<>
			#{id} <br /> {accountType[type]}
		</>
	);
}

function EventUserInfo({ eventData }) {
	let type = eventData.accountType;
	let userMetadata = eventData.userMetadata || {};
	let infoComponent = "";
	let province = provinceList.filter((p) => p.code === userMetadata.LOCATION)[0];
	if (eventData.customerID) {
		infoComponent = (
			<Box>
				<Box>
					<Tooltip title={"Nhấn để xem chi tiết khách hàng " + eventData.customerID}>
						<a
							href={`/crm/customer/detail?customerId=${eventData.customerID}`}
							target="_blank"
							className={styles.userLink}
						>
							{accountType[type]} #{eventData.customerID}
						</a>
					</Tooltip>
				</Box>
				{userMetadata.NAME ? (
					<Box>
						<Tooltip title={"Tên KH"}>
							<span>{userMetadata.NAME}</span>
						</Tooltip>
					</Box>
				) : (
					""
				)}
				{userMetadata.PHONE ? (
					<Box>
						<Tooltip title={"SĐT KH"}>
							<span>{userMetadata.PHONE}</span>
						</Tooltip>
					</Box>
				) : (
					""
				)}
				{userMetadata.ADDRESS ? (
					<Box>
						<Tooltip title={"Địa chỉ KH"}>
							<span>{userMetadata.ADDRESS}</span>
						</Tooltip>
					</Box>
				) : (
					""
				)}
				{province ? (
					<Box>
						<Tooltip title={"Tỉnh"}>
							<b>{province.name}</b>
						</Tooltip>
					</Box>
				) : (
					""
				)}
			</Box>
		);
	} else if (eventData.sellerID) {
		infoComponent = (
			<Box>
				{accountType[type]} #{eventData.sellerID}
				<br />
				<br />
				{province ? (
					<Tooltip title={"Tỉnh"}>
						<b>{province.name}</b>
					</Tooltip>
				) : (
					""
				)}
			</Box>
		);
	}
	return <>{infoComponent}</>;
}

function EventDeviceInfo({ uaMetadata, t }) {
	if (!uaMetadata) {
		return <></>;
	}
	return (
		<>
			<Tooltip title={t`monitoring:template.platform`}>
				<span>{uaMetadata.PLATFORM}</span>
			</Tooltip>
			<br />
			<Tooltip title={t`monitoring:template.os`}>
				<span>{uaMetadata.OS}</span>
			</Tooltip>
			<br />
			<Tooltip title={t`monitoring:template.os_version`}>
				<span>{uaMetadata.OS_VERSION}</span>
			</Tooltip>
			<br />
			<Tooltip title={t`monitoring:template.client`}>
				<span>{uaMetadata.CLIENT}</span>
			</Tooltip>
			<br />
			<Tooltip title={t`monitoring:template.client_version`}>
				<span>{uaMetadata.CLIENT_VERSION}</span>
			</Tooltip>
			<br />
		</>
	);
}

function EventActionInfo({ resultStatus, resultErrorCode, metadata, t }) {
	let arr = [];
	for (let key in metadata) {
		if (metadata.hasOwnProperty(key)) {
			arr.push({
				key: key,
				value: metadata[key],
			});
		}
	}
	return (
		<>
			<Box>
				<Tooltip title={t`monitoring:event.result_status`}>
					<b style={{ color: resultStatus === APIStatus.OK ? "green" : "red" }}>
						{resultStatus}
					</b>
				</Tooltip>
			</Box>
			<Box>{resultStatus !== APIStatus.OK ? resultErrorCode : ""}</Box>
			<Box>
				{arr.length
					? arr.map((item) => (
							<Box>
								{item.key}: <b style={{ color: "#555" }}>{item.value}</b>
							</Box>
					  ))
					: ""}
			</Box>
		</>
	);
}

export function EventList({ eventFilter, total, t }) {
	let [loading, setLoading] = React.useState(true);
	let [data, setData] = React.useState([]);
	let [page, setPage] = React.useState(0);
	let [offset, setOffset] = React.useState(0);
	let client = getMonitoringAnalyticsClient();

	let loadData = async function (nextPage) {
		let pageResult;
		if (eventFilter.reportID) {
			pageResult = await client.getEventPageOfReport(eventFilter.reportID, nextPage);
		} else {
			pageResult = await client.getEventPageOfReport(eventFilter.code, nextPage);
		}
		if (pageResult && pageResult.status === APIStatus.OK) {
			setOffset(nextPage * 100);
			setPage(nextPage);
			setData(pageResult.data);
		} else {
			setLoading(false);
		}
	};

	React.useEffect(() => {
		loadData(0);
	}, []);

	const handlePageChange = (event, nextPage, rowsPerPage) => {
		loadData(nextPage);
	};

	return (
		<Box>
			<Box className={styles.eventListAction}>
				<Tooltip title={t`monitoring:event.download_raw_data`}>
					<Button color="primary" variant={"contained"}>
						<FontAwesomeIcon icon={faDownload} />
					</Button>
				</Tooltip>
			</Box>
			<TableContainer component={Paper}>
				<Table size="small" aria-label="a dense table">
					<TableHead className={styles.tableHead}>
						<TableRow>
							<TableCell>#</TableCell>
							<TableCell>{t`monitoring:time`}</TableCell>
							<TableCell>{t`monitoring:event.account`}</TableCell>
							<TableCell>
								{t`monitoring:event.user_info`}
								<Tooltip title={t(`monitoring:event.user_info_tip`)}>
									<Box
										style={{
											marginLeft: 5,
											display: "inline-block",
											color: "red",
										}}
									>
										<FontAwesomeIcon icon={faInfoCircle} />
									</Box>
								</Tooltip>
							</TableCell>
							<TableCell>{t`monitoring:event.device_info`}</TableCell>
							<TableCell>{t`monitoring:event.action_info`}</TableCell>
						</TableRow>
					</TableHead>
					{data && data.length > 0 ? (
						<>
							<TableBody>
								{data.map((row, i) => (
									<TableRow key={offset + i + 1}>
										<TableCell>{offset + i + 1}</TableCell>
										<TableCell>{displayDate(row.createdTime, "-")}</TableCell>
										<TableCell>
											<EventAccountInfo
												type={row.accountType}
												id={row.accountID}
											/>
										</TableCell>
										<TableCell>
											<EventUserInfo eventData={row} />
										</TableCell>
										<TableCell>
											<EventDeviceInfo uaMetadata={row.uaMetadata} t={t} />
										</TableCell>
										<TableCell>
											<EventActionInfo
												metadata={row.metadata}
												resultStatus={row.resultStatus}
												resultErrorCode={row.resultErrorCode || ""}
												t={t}
											/>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							<MyTablePagination
								labelUnit={t`common:action`}
								count={total}
								rowsPerPage={100}
								page={page}
								onChangePage={handlePageChange}
							/>
						</>
					) : (
						<TableBody>
							<TableRow>
								<TableCell
									colSpan="100%"
									align="left"
									style={{ padding: 20, textAlign: "center", fontSize: "120%" }}
								>
									{loading ? t(`common:loading`) : t(`common:not_found`)}
								</TableCell>
							</TableRow>
						</TableBody>
					)}
				</Table>
			</TableContainer>
		</Box>
	);
}
