import {
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Switch,
	Tooltip,
	IconButton,
	DialogContentText
} from "@material-ui/core";
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
} from "@material-ui/icons";
import {
	MyCard,
	MyCardHeader,
} from "@thuocsi/nextjs-components/my-card/my-card";
import {
	doWithLoggedInUser,
	renderWithLoggedInUser,
} from "@thuocsi/nextjs-components/lib/login";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import { getBannerClient } from "client/banner";
import Head from "next/head";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import AppMarketing from "pages/_layout";
import React, { useEffect, useState } from "react";
import { formatErrorMessage, formatUrlSearch } from "components/global";
import ModalCustom from "@thuocsi/nextjs-components/simple-dialog/dialogs";
import { formatTime } from "components/common-global";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import AuthorizationScreen from "components/authorization-screen";
import Authorization from "@thuocsi/nextjs-components/authorization/authorization";
import { isAuthorizationAPI } from "utils/function";

export async function getServerSideProps(ctx) {
	return await doWithLoggedInUser(ctx, (ctx) => {
		return loadBannerData(ctx);
	});
}

export async function loadBannerData(ctx) {
	let data = {
		props: {
			data: [],
			count: 0,
		}
	};
	let query = ctx.query;
	let q = typeof query.q === "undefined" ? "" : query.q;
	let page = query.page || 0;
	let limit = query.limit || 20;
	let offset = page * limit;

	let bannerClient = getBannerClient(ctx, data);
	let resp = await bannerClient.getListBanner(offset, limit, q);
	if (resp.status !== "OK") {
		data.props.message = "Not found"
		return data
	}

	data.props.data = resp.data
	data.props.count = resp.total || 0
	data.props.offset = offset
	data.props.limit = limit

	// Pass data to the page via props
	return data
}

export default function CollectionPage(props) {
	return renderWithLoggedInUser(props, render);
}


function render(props) {
	let router = useRouter();
	let q = router.query.q || "";
	const [search, setSearch] = useState(formatUrlSearch(q));
	let page = parseInt(router.query.page) || 0;
	let limit = parseInt(router.query.limit) || 20;
	const { error, success } = useToast();
	const [rows, setRows] = useState(props.data);
	useEffect(() => {
		setRows(props.data)
		setCount(props.count || 0)
	}, [props])
	let breadcrumb = [
		{
			name: "Trang chủ",
			link: "/marketing",
		},
		{
			name: "Danh sách banner",
		},
	];

	const APIs = ["PUT/marketplace/marketing/v1/banner", "DELETE/marketplace/marketing/v1/banner"]
	const isAuthorization = isAuthorizationAPI(APIs)

	const [openModal, setOpenModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [currentStatus, setCurrentStatus] = useState({});

	const [currentDel, setCurrentDel] = useState({});
	const updateStatus = async () => {
		try {
			let _client = getBannerClient();
			const { id = "", isVisible } = currentStatus;
			if (!isVisible) {
				const res = await _client.updateBannerVisible(id);
				if (res.status === "OK") {
					rows.filter((row) => row._id === id)[0].isVisible = !isVisible
						? true
						: false;
					success("Cập nhật thành công");
				} else {
					error(formatErrorMessage(res));
				}
			} else {
				const res = await _client.updateBannerInvisible(id);
				if (res.status === "OK") {
					rows.filter((row) => row._id === id)[0].isVisible = !isVisible
						? true
						: false;
					success("Cập nhật thành công");
				} else {
					error(formatErrorMessage(res));
				}
			}
		} catch (err) {
			error(err ?? unknownErrorText);
		}
	};



	const handleChangeVisible = (id, isVisible, name) => {
		setOpenModal(true);
		setCurrentStatus({
			id,
			isVisible,
			name
		});
	};
	function searchCollection() {
		let q = formatUrlSearch(search);
		Router.push(`/marketing/banner?q=${q}`);
	}

	async function handleChange(event) {
		const target = event.target;
		const value = target.value;
		setSearch(value);
	}

	function onSearch() {
		try {
			searchCollection();
		} catch (error) {
			console.log(error);
		}
	}
	const RenderRow = ({ data, index }) => {
		return (
			<TableRow>
				<TableCell align="center" component="th" scope="row">
					{(page * limit) + index + 1}
				</TableCell>
				<TableCell component="th" scope="row">
					{data.name}
				</TableCell>
				<TableCell align="left">
					<img
						src={data.imgURL}
						title="image"
						alt="image"
						width={120}
						height={70}
					/>
				</TableCell>
				<TableCell align="left">
					<Switch
						color="primary"
						onChange={() =>
							handleChangeVisible(data._id, data.isVisible, data.name)
						}
						checked={data.isVisible}
						name="checked"
						inputProps={{ "aria-label": "secondary checkbox" }}
						disabled={!props.loggedInUserInfo?.apis?.includes("ALL/") && !props.loggedInUserInfo?.apis?.includes("PUT/marketplace/marketing/v1/update-banner-status")}
					/>
				</TableCell>

				<TableCell style={{ overflowWrap: "anywhere" }} align="left">{data.description}</TableCell>
				<TableCell align="left">{formatTime(data.createdTime)}</TableCell>
				{isAuthorization && (
					<TableCell align="center">
						<div style={{ display: "flex", justifyContent: "center" }}>
							<Authorization requiredAPI="PUT/marketplace/marketing/v1/banner">
								<Link href={`/marketing/banner/edit?bannerID=${data._id}`}>
									<a>
										<Tooltip title={"Cập nhật thông tin"}>
											<IconButton>
												<EditIcon fontSize="small" />
											</IconButton>
										</Tooltip>
									</a>
								</Link>
							</Authorization>

							<Authorization requiredAPI="DELETE/marketplace/marketing/v1/banner">
								<IconButton
									onClick={() => {
										setDeleteModal(true);
										setCurrentDel({
											id: data._id,
											name: data.name
										});
									}}
								>
									<DeleteIcon fontSize="small" />
								</IconButton>
							</Authorization>
						</div>
					</TableCell>
				)}
			</TableRow>
		);
	};
	const [count, setCount] = useState(props.count || 0);

	async function reloadBanner() {
		let bannerClient = getBannerClient();
		let resp = await bannerClient.getListBannerClient(
			props.offset,
			props.limit,
			''
		);
		if (resp.status === "OK") {
			success("Cập nhật danh sách banner thành công");
			setRows(resp.data);
			setCount(resp.total);
		} else {
			if (resp.status === "NOT_FOUND") {
				setRows([]);
				setCount(0);
			}
			else error(formatErrorMessage(resp));
		}
	}

	async function deleteBanner() {
		let bannerClient = getBannerClient();

		let resp = await bannerClient.deleteBannerById(currentDel.id);
		if (resp.status === "OK") {
			success(`Xoá banner thành công`);
			reloadBanner();
		} else {
			error(formatErrorMessage(resp));
		}
	}
	return (
		<AuthorizationScreen>
			<AppMarketing select="/marketing/banner" breadcrumb={breadcrumb}>
				<Head>
					<title>Danh sách banner</title>
				</Head>
				<MyCard>
					<MyCardHeader title={"Danh sách banner"}>
						<div style={{ display: "flex", justifyContent: "end" }}>
							<Authorization requiredAPI="POST/marketplace/marketing/v1/banner">
								<Link href="/marketing/banner/new">
									<Button
										variant="contained"
										color="primary"
										style={{ marginRight: 8 }}
									>
										<FontAwesomeIcon icon={faPlus} style={{ marginRight: 8 }} /> Thêm
									</Button>
								</Link>
							</Authorization>

							<Authorization requiredScreen="/marketing/available-banner">
								<Link href="/marketing/banner/available">
									<Button variant="contained" color="primary">
										Danh sách hiển thị
									</Button>
								</Link>
							</Authorization>
						</div>

					</MyCardHeader>

					<TableContainer component={Paper} >
						<Table size="small" aria-label="a dense table" style={{ padding: "15px !important" }}>
							<colgroup>
								<col width="5%"></col>
								<col width="10%"></col>
								<col width="20%"></col>
								<col width="10%"></col>
								<col width="30%"></col>
								<col width="10%"></col>
								{isAuthorization && (<col width="15%"></col>)}
							</colgroup>
							<TableHead>
								<TableRow>
									<TableCell align="center">STT</TableCell>
									<TableCell align="left">Tên banner</TableCell>
									<TableCell align="left">Hình ảnh</TableCell>
									<TableCell align="left">Trạng thái</TableCell>
									<TableCell align="left">Mô tả</TableCell>
									<TableCell align="left">Ngày tạo</TableCell>
									{isAuthorization && (
										<TableCell align="center">Thao tác</TableCell>
									)}

								</TableRow>
							</TableHead>
							{rows?.length > 0 ? (
								<TableBody>
									{rows.map((row, index) => (
										<RenderRow key={row._id} data={row} index={index} />
									))}
								</TableBody>
							) : (
								<TableBody>
									<TableRow>
										<TableCell colSpan={3} align="left">
											Không tìm thấy thông tin banner
										</TableCell>
									</TableRow>
								</TableBody>
							)}
							<MyTablePagination
								labelUnit="banner"
								count={count}
								rowsPerPage={parseInt(limit)}
								page={parseInt(page)}
								onChangePage={(event, page, rowsPerPage) => {
									router.push(`/marketing/banner?page=${page}&limit=${rowsPerPage}`);
								}}
							/>
						</Table>
					</TableContainer>
					<ModalCustom
						open={openModal}
						onClose={() => setOpenModal(false)}
						onExcute={() => updateStatus()}
						title="Thay đổi trạng thái hiển thị"
						primaryText="Có"
						closeText="Không"
					>
						<DialogContentText>{`Bạn có muốn ${currentStatus.isVisible ? "ẩn" : "hiển thị"} banner?`}</DialogContentText>
					</ModalCustom>

					<ModalCustom
						open={deleteModal}
						onClose={() => {
							setDeleteModal(false);
						}}
						onExcute={() => deleteBanner()}
						title="Xóa banner"
						primaryText="Xóa"
					>
						<DialogContentText>Bạn có muốn xóa banner <strong>{currentDel.name}</strong></DialogContentText>
					</ModalCustom>
				</MyCard>
			</AppMarketing>
		</AuthorizationScreen>
	);
}
