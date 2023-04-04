import {
	Button,
	ButtonGroup,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	DialogTitle,
	Typography,
	DialogContent,
	DialogActions,
	Dialog,
	Tooltip,
} from "@material-ui/core";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import Head from "next/head";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import AppMarketing from "pages/_layout";
import {
	doWithLoggedInUser,
	renderWithLoggedInUser,
} from "@thuocsi/nextjs-components/lib/login";
import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import { getPromoClient } from "../../../client/promo";
import {
	displayPromotionType,
	displayPromotionTypeV2,
	formatTime,
	getPromotionOrganizer,
	limitText,
} from "../../../components/promotion-voucher/util";
import Switch from "@material-ui/core/Switch";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory, faList } from "@fortawesome/free-solid-svg-icons";
import {
	MyCard,
	MyCardContent,
	MyCardHeader,
	MyCardActions
} from "@thuocsi/nextjs-components/my-card/my-card";

import {
	defaultPromotionStatus,
	defaultPromotionType,
} from "components/promotion-voucher/constant";;
import CloseIcon from "@material-ui/icons/Close";
import { PromotionFilter } from "containers/promotion/PromotionFilterForm";
import { Edit as EditIcon } from "@material-ui/icons";
import Authorization from "@thuocsi/nextjs-components/authorization/authorization";
import { getVoucherClient } from "client/voucher";
import { formatEllipsisText, formatErrorMessage } from "components/global";
import AuthorizationScreen from "components/authorization-screen";
import { isAuthorizationAPI } from "utils/function";

export async function getServerSideProps(ctx) {
	return await doWithLoggedInUser(ctx, (ctx) => {
		return loadPromoData(ctx);
	});
}

export async function loadPromoData(ctx) {
	// Fetch data from external API
	let returnObject = { props: {} };
	let query = ctx.query;
	let page = query.page || 0;
	let limit = query.limit || 20;
	let offset = page * limit;

	const { q = "" } = query;
	const filter = q !== '' ? JSON.parse(q) : {};

	if (filter.status === "") delete filter.status;

	if (filter.voucherCode && filter.voucherCode !== "") {
		let voucherCode = filter.voucherCode
		const voucherResp = await getVoucherClient(ctx, {}).getListVouchersByCodes([voucherCode.toUpperCase()])
		if (voucherResp.status !== "OK") {
			return returnObject
		}
		if (!filter.promotionId || filter.promotionId === "") {
			filter.promotionId = voucherResp.data?.[0]?.promotionId
		}

		if (filter.promotionId && Number(filter.promotionId) !== voucherResp.data?.[0]?.promotionId) {
			return returnObject
		}
	}

	let _promotionClient = getPromoClient(ctx, {});
	let getPromotionResponse = await _promotionClient.getPromotionList(
		limit,
		offset,
		{ ...filter, promotionId: Number(filter.promotionId) },
		query.search
	);

	if (getPromotionResponse && getPromotionResponse.status === "OK") {

		returnObject.props.promotion = getPromotionResponse.data;
		returnObject.props.promotionCount = getPromotionResponse.total;


	}

	// Pass data to the page via props
	return returnObject;
}

export default function PromotionPage(props) {
	return renderWithLoggedInUser(props, render);
}

export function formatNumber(num) {
	return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

async function updatePromotion(promotionId, status) {
	return getPromoClient().updatePromotion({ promotionId, status });
}

let breadcrumb = [
	{
		name: "Trang chủ",
		link: "/marketing"
	},
	{
		name: "Danh sách chương trình",
	},
]

function render(props) {
	const toast = useToast();
	// console.log(props)
	let router = useRouter();
	let hasPermission = isAuthorizationAPI(["PUT/marketplace/promotion/v1/promotion"])


	let [openModal, setOpenModal] = useState({
		open: false,
		promotionId: 0,
		promotionName: "",
		promotionStatus: "",
		checked: false,
	});

	const rowsPerPage = +(router.query.perPage || 20);
	const page = +(router.query.page || 0);

	const [typePromotion, setTypePromotion] = useState(
		router.query.type || defaultPromotionType.PROMOTION
	);

	const handleChangePage = (event, newPage, rowsPerPage) => {
		router.push({
			pathname: "/marketing/promotion",
			query: {
				...router.query,
				limit: rowsPerPage,
				page: newPage,
				perPage: rowsPerPage,
				offset: newPage * rowsPerPage,
			},
		});
	};

	const handleActivePromotion = async () => {
		let { checked, promotionId } = openModal;
		if (checked) {
			let promotionResponse = await updatePromotion(
				promotionId,
				defaultPromotionStatus.ACTIVE
			);
			if (!promotionResponse || promotionResponse.status !== "OK") {
				setOpenModal({ ...openModal, open: false });
				return toast.error(formatErrorMessage(promotionResponse));
			} else {
				props.promotion.forEach((d) => {
					if (d.promotionId === promotionId) {
						return (d.status = defaultPromotionStatus.ACTIVE);
					}
				});
				setOpenModal({ ...openModal, open: false });
				return toast.success("Cập nhật chương trình khuyến mãi thành công");
			}
		} else {
			let promotionResponse = await updatePromotion(
				promotionId,
				defaultPromotionStatus.HIDE
			);
			if (!promotionResponse || promotionResponse.status !== "OK") {
				setOpenModal({ ...openModal, open: false });
				return toast.error(formatErrorMessage(promotionResponse));
			} else {
				props.promotion.forEach((d) => {
					if (d.promotionId === promotionId) {
						return (d.status = defaultPromotionStatus.HIDE);
					}
				});
				setOpenModal({ ...openModal, open: false });
				return toast.success("Cập nhật chương trình khuyến mãi thành công");
			}
		}
	};

	const handleConfirm = (promotionId, checked, open, promotionName, status) => {
		setOpenModal({
			open: open,
			promotionName: promotionName,
			promotionId: promotionId,
			checked: checked,
			promotionStatus: status,
		});
	};

	return (
		<AuthorizationScreen>
			<AppMarketing select="/marketing/promotion" breadcrumb={breadcrumb}>
				<Head>
					<title>Danh sách chương trình khuyến mãi</title>
				</Head>
				<MyCard>
					<MyCardHeader title="Danh sách chương trình khuyến mãi">
						<Authorization requiredAPI="POST/marketplace/promotion/v1/promotion">
							<Link
								href={`/marketing/promotion/${typePromotion === defaultPromotionType.PROMOTION
									? "new"
									: "new-voucher"
									}`}
							>
								<Button variant="contained" color="primary">
									Thêm mới
								</Button>
							</Link>
						</Authorization>
					</MyCardHeader>


					<PromotionFilter />

				</MyCard>

				<MyCard>
					<MyCardContent>
						<TableContainer component={Paper}>
							<Table size="small" aria-label="a dense table">
								<colgroup>
									<col />
									<col />
									<col width="25%" />
								</colgroup>
								<TableHead>
									<TableRow>
										<TableCell align="left">ID CHƯƠNG TRÌNH</TableCell>
										<TableCell align="left">CHƯƠNG TRÌNH KHUYẾN MÃI</TableCell>
										<TableCell align="left">NỘI DUNG MÔ TẢ</TableCell>
										<TableCell align="left">LOẠI CHƯƠNG TRÌNH</TableCell>
										<TableCell align="left">THỜI GIAN ÁP DỤNG</TableCell>
										<TableCell align="center">THAO TÁC</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{props.promotion?.length > 0 ? (
										props.promotion.map((row, index) => (
											<TableRow key={row.promotionId}>
												<TableCell align="left">{row.promotionId}</TableCell>
												<TableCell align="left">
													{limitText(row.promotionName, 50)}
												</TableCell>
												<TableCell align="left">
													<Tooltip title={row.description}>
														<span>
															{formatEllipsisText(row.description, 100)}
														</span>
													</Tooltip>
												</TableCell>
												<TableCell align="left">
													{displayPromotionTypeV2(row.promotionType, row)}
												</TableCell>
												<TableCell align="left">
													<div>Từ : {formatTime(row.startTime)}</div>
													<div>Đến : {formatTime(row.endTime)}</div>
												</TableCell>

												<TableCell align="center">

													<div style={{
														display: "flex",
														justifyContent: "center",
														alignItems: "center"
													}}>
														<Tooltip title={row.status === "ACTIVE" ? "Nhấn để tắt hiển thị chương trình khuyến mãi" : "Nhấn để bật hiển thị chương trình khuyến mãi"}>
															<Switch
																onChange={(event) => {
																	handleConfirm(
																		row.promotionId,
																		event.target.checked,
																		true,
																		row.promotionName,
																		row.status
																	);
																}}
																checked={row.status === "ACTIVE" ? true : false}
																color="primary"
																disabled={!hasPermission}
															/>
														</Tooltip>

														<Authorization requiredScreen="/marketing/detail-promotion">
															<Link href={`/marketing/promotion/detail?promotionId=${row.promotionId}`}>
																<Tooltip title="Xem danh sách mã khuyến mãi">
																	<IconButton>
																		<FontAwesomeIcon icon={faList} style={{ color: "#777" }} size="sm" />
																	</IconButton>
																</Tooltip>
															</Link>
														</Authorization>

														<Authorization requiredAPI="PUT/marketplace/promotion/v1/promotion">
															<Link href={`/marketing/promotion/edit?promotionId=${row.promotionId}`}>
																<Tooltip title="Cập nhật thông tin">
																	<IconButton>
																		<EditIcon fontSize="small" />
																	</IconButton>
																</Tooltip>
															</Link>
														</Authorization>

														<Authorization requiredScreen="/marketing/history-promotion">
															<Link href={`/marketing/promotion/history?promotionId=${row.promotionId}`}>
																<a>
																	<Tooltip title="Xem lịch sử thao tác">
																		<IconButton>
																			<FontAwesomeIcon icon={faHistory} style={{ color: "#777" }} size="sm" />
																		</IconButton>
																	</Tooltip>
																</a>
															</Link>
														</Authorization>
													</div>

												</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell align="left">
												Không tìm thấy chương trình khuyến mãi
											</TableCell>
										</TableRow>
									)}
								</TableBody>
								{props.promotionCount > 0 && (
									<MyTablePagination
										labelUnit={"khuyến mãi"}
										count={props.promotionCount}
										rowsPerPage={rowsPerPage}
										page={page}
										onChangePage={handleChangePage}
									/>
								)}
							</Table>
						</TableContainer>
						<Dialog open={openModal.open} scroll="body" fullWidth={true}>
							<DialogTitle
								id={"modal" + "-dialog-title"}
								onClose={() => setOpenModal({ ...openModal, open: false })}
							>
								<Typography variant="h6">Thông báo</Typography>
								<IconButton
									aria-label="close"
									onClick={() => setOpenModal({ ...openModal, open: false })}
									style={{ position: "absolute", top: "1px", right: "1px" }}
								>
									<CloseIcon />
								</IconButton>
							</DialogTitle>
							<DialogContent dividers>
								{openModal.promotionStatus == defaultPromotionStatus.EXPIRED ? (
									<b>Chương trình khuyến mãi đã hết hạn</b>
								) : (
									<div>
										Bạn có muốn thay đổi trạng thái chương trình này không?
									</div>
								)}
							</DialogContent>
							<DialogActions>
								<Button
									onClick={() => setOpenModal({ ...openModal, open: false })}
									variant={"contained"}
								>
									Thoát
								</Button>
								{openModal.promotionStatus != defaultPromotionStatus.EXPIRED && (
									<Button
										autoFocus
										color="primary"
										variant={"contained"}
										onClick={handleActivePromotion}
									>
										Đồng ý
									</Button>
								)}
							</DialogActions>
						</Dialog>
					</MyCardContent>
				</MyCard>
			</AppMarketing>
		</AuthorizationScreen>
	);
}
