import { faEdit, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Backdrop,
	Button,
	ButtonGroup,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	Paper,
	Switch,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Authorization from '@thuocsi/nextjs-components/authorization/authorization';
import { doWithLoggedInUser, renderWithLoggedInUser } from '@thuocsi/nextjs-components/lib/login';
import { MyCard, MyCardHeader } from '@thuocsi/nextjs-components/my-card/my-card';
import MyTablePagination from '@thuocsi/nextjs-components/my-pagination/my-pagination';
import { useToast } from '@thuocsi/nextjs-components/toast/useToast';
import { getPostClient } from 'client/post';
import AuthorizationScreen from 'components/authorization-screen';
import { formatTime } from 'components/common-global';
import { formatErrorMessage, formatMessageError, formatUrlSearch } from 'components/global';
import Head from 'next/head';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import AppMarketing from 'pages/_layout';
import React, { useEffect, useState } from 'react';
import { isAuthorizationAPI } from 'utils/function';
import styles from './style.module.css';

export async function getServerSideProps(ctx) {
	return await doWithLoggedInUser(ctx, (ctx) => {
		return loadPosts(ctx);
	});
}

export const getLinkEmbedYoutubeId = (link) => {
	// console.log('linkId ', link);
	let youtubeId = '';
	if (link.startsWith('https://www.youtube.com/watch')) {
		//get params
		youtubeId = link?.split('?v=')[1];
		return 'https://www.youtube.com/embed/' + youtubeId;
	} else if (link.startsWith('https://www.youtube.com/embed')) {
		return link;
	}
	return '';
};

export async function loadPosts(ctx) {
	let data = { props: {} };

	let query = ctx.query;
	let q = typeof query.q === 'undefined' ? '' : query.q;
	let page = query.page || 0;
	let limit = query.limit || 20;
	let offset = page * limit;

	let _client = getPostClient(ctx, {});
	const response = await _client.getListPost(offset, limit, q);
	if (response.status !== 'OK') {
		return { props: { postData: [], count: 0, message: response.message } };
	}
	data.props.postData = response.data.map((item) => ({ ...item, isEnabled: item.isEnabled === null ? true : item.isEnabled }));
	data.props.count = response.total;
	return data;
}

export default function PostPage(props) {
	return renderWithLoggedInUser(props, (props) => {
		const postClient = getPostClient();
		const title = "Danh sách bài đăng";

		let router = useRouter();

		const [search, setSearch] = useState('');
		const [data, setData] = useState({ ...props });
		const [loading, setLoading] = useState(false);
		const { error, success } = useToast();

		const APIs = ["DELETE/marketplace/social/v1/post", "PUT/marketplace/social/v1/post"]
		const isAuthorization = isAuthorizationAPI(APIs)

		useEffect(() => {
			setData(props);
			setSearch(formatUrlSearch(q));
		}, [props]);

		let page = parseInt(router.query.page) || 0;
		let limit = parseInt(router.query.limit) || 20;
		let q = router.query.q || '';

		async function handleChange(e) {
			const value = e.target.value;
			setSearch(value);
		}

		async function onSearch() {
			q = formatUrlSearch(search);
			router.push(`?q=${q}`);
		}

		function onClearTextSearch() {
			setSearch('');
			Router.push(`/marketing/post`);
		}

		const breadcrumb = [
			{
				name: "Trang chủ",
				link: '/marketing',
			},
			{
				name: title,
			},
		];

		let [openModal, setOpenModal] = useState({
			post: null,
			open: false,
		});

		const handleConfirmDelete = (post, open) => {
			setOpenModal({
				post: post,
				open: open,
			});
		};

		const handleChangeEnablePost = (data) => {
			postClient.updateEnablePost(data);
			Router.push(`/marketing/post`);
		};

		const deletePost = async (post) => {
			setLoading(true);
			const response = await postClient.deletePost(post.id);
			if (response.status === 'OK') {
				const newPostData = data.postData.filter((item) => item !== post);
				setOpenModal({ post: null, open: false });
				success("Xóa bài đăng thành công")
				setTimeout(() => {
					setData({
						...data,
						postData: newPostData,
					});
					setLoading(false);
				}, 3000);
			} else {
				error(formatErrorMessage(response))
				setOpenModal({ post: null, open: false });
				setLoading(false);
			}
		};

		return (

			<AuthorizationScreen>
				<AppMarketing select="/marketing/post" breadcrumb={breadcrumb}>
					<Head>
						<title>{title}</title>
					</Head>
					<Backdrop open={loading} style={{ zIndex: 888 }}>
						<CircularProgress color="inherit" />
					</Backdrop>
					<MyCard>
						<MyCardHeader title={title}>
							<Authorization requiredAPI="POST/marketplace/social/v1/post">
								<Link href="/marketing/post/new">
									<ButtonGroup color="primary" aria-label="contained primary button group" className={styles.rightGroup}>
										<Button variant="contained" color="primary">
											<FontAwesomeIcon icon={faPlus} style={{ marginRight: 8 }} />
											Thêm bài đăng
										</Button>
									</ButtonGroup>
								</Link>
							</Authorization>
						</MyCardHeader>
						{/* <MyCardContent>
						<div className={styles.grid}>
							<Grid container spacing={3} direction="row" justify="space-between" alignItems="center">
								<Grid item xs={6} md={4} sm={4}>
									<Paper className={styles.search}>
										<InputBase
											id="q"
											name="q"
											className={styles.input}
											value={search}
											autoComplete="off"
											onChange={handleChange}
											inputRef={register}
											onKeyPress={(event) => {
												if (event.key === "Enter") {
													onSearch();
												}
											}}
											placeholder="Nhập tên để tìm kiếm bài đăng"
											inputProps={{ "aria-label": "Tìm kiếm danh mục" }}
										/>
										<IconButton className={styles.iconButton} aria-label="clear-text-search"
											onClick={onClearTextSearch}>
											<ClearIcon />
										</IconButton>

										<IconButton className={styles.iconButton} aria-label="search" onClick={onSearch}>
											<SearchIcon />
										</IconButton>
									</Paper>
								</Grid>
								<Grid item item xs={6} md={4} sm={4}></Grid>
							</Grid>
						</div>
					</MyCardContent> */}
					</MyCard>
					<TableContainer component={Paper}>
						<Table size="small" aria-label="a dense table">
							<TableHead>
								<TableRow>
									<TableCell align="left">#</TableCell>
									<TableCell align="left">Tên</TableCell>
									<TableCell align="left">Nội dung</TableCell>
									<TableCell align="left">Sản phẩm</TableCell>
									<TableCell align="right">Thời gian tạo</TableCell>
									<TableCell align="center">Hiển thị</TableCell>
									{isAuthorization && (<TableCell align="center">Thao tác</TableCell>)}
								</TableRow>
							</TableHead>
							{data.postData && data.postData.length ? (
								<>
									<TableBody>
										{data.postData.map((row, i) => (
											<TableRow key={i}>
												<TableCell>
													{row.contentType === 'IMAGE' && row?.images && row?.images[0] && (
														<img src={row?.images[0] || ''} width={50} heigh={50} />
													)}
													{row.contentType === 'VIDEO' && row?.thumbnail && row.video && (
														<video className="video" style={{ width: '100px', height: '100px' }} poster={row.thumbnail} controls>
															<source src={row.video} type="video/mp4" />
														</video>
													)}

													{row.contentType === 'VIDEO' && row?.ytbEmbeddedUrl && (
														<iframe
															width="100"
															height="100"
															src={getLinkEmbedYoutubeId(row?.ytbEmbeddedUrl)}
															frameborder="0"
															allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
															allowfullscreen
														></iframe>
													)}
												</TableCell>
												<TableCell align="left">{row.title}</TableCell>
												<TableCell align="left" className={styles.overflowWrap}>
													{row.contentType === 'VIDEO' ? "Video" : "Hình ảnh"}
												</TableCell>
												<TableCell align="left" className={styles.overflowWrap}>
													{row.products.map((p, index) => {
														return <p key={`${row.id}-${p.sku}`}>{p.label}</p>;
													})}
												</TableCell>
												<TableCell align="right">{formatTime(row.createdTime)}</TableCell>
												<TableCell align="center">
													<FormControlLabel
														control={
															<Switch
																checked={row?.isEnabled}
																onChange={(e) =>
																	handleChangeEnablePost({
																		...row,
																		isEnabled: !row?.isEnabled,
																	})
																}
																color="primary"
																disabled={!props.loggedInUserInfo?.apis?.includes("ALL/") && !props.loggedInUserInfo?.apis?.includes("PUT/marketplace/social/v1/post")}
															/>
														}
													/>
												</TableCell>
												{isAuthorization && (
													<TableCell align="center">
														{/* <Tooltip title="Xoá sản phẩm này">
												<IconButton
													style={{ border: "1px solid #ddd", margin: "2px" }}
													onClick={() => window.open("http://thuocsi.vn/product/" + row.productID)}>
													<FontAwesomeIcon icon={faEye} size="xs" />
												</IconButton>
											</Tooltip> */}
														<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

															<Authorization requiredAPI="PUT/marketplace/social/v1/post">
																<Tooltip title="Cập nhật bài đăng">
																	<IconButton
																		style={{ border: '1px solid #ddd', marginRight: '5px' }}
																		onClick={async () => {
																			router.push('post/edit?id=' + row.id);
																		}}
																	>
																		<FontAwesomeIcon icon={faEdit} size="xs" />
																	</IconButton>
																</Tooltip>
															</Authorization>

															<Authorization requiredAPI="DELETE/marketplace/social/v1/post">
																<Tooltip title={`Xóa bài đăng ${row.title}`}>
																	<IconButton
																		style={{ border: '1px solid #ddd', fontSize: '0.9rem' }}
																		onClick={async () => handleConfirmDelete(row, true)}
																	>
																		<FontAwesomeIcon icon={faTrashAlt} size="xs" />
																	</IconButton>
																</Tooltip>
															</Authorization>
														</div>
													</TableCell>
												)}
											</TableRow>
										))}
									</TableBody>

									{typeof data.count !== undefined && data.count !== null && (
										<MyTablePagination
											labelUnit="bài đăng"
											count={data.count}
											rowsPerPage={limit}
											page={page}
											onChangePage={(event, page, rowsPerPage) => {
												Router.push(`/marketing/post?page=${page}&limit=${rowsPerPage}&q=${search}`);
											}}
										/>
									)}
								</>
							) : (
								<TableBody>
									<TableRow>
										<TableCell colSpan={3} align="left">
											Không tìm thấy thông tin bài đăng
										</TableCell>
									</TableRow>
								</TableBody>
							)}
						</Table>
					</TableContainer>

					<Dialog open={openModal.open} scroll="body" fullWidth={true}>
						<DialogTitle id={'modal' + '-dialog-title'} onClose={() => setOpenModal({ post: null, open: false })}>
							{`Xóa bài đăng ${openModal.post?.title}`}
							<IconButton
								aria-label="close"
								onClick={() => setOpenModal({ post: null, open: false })}
								style={{ position: 'absolute', top: '1px', right: '1px' }}
							>
								<CloseIcon />
							</IconButton>
						</DialogTitle>
						<DialogContent dividers>
							<div>Bạn có chắc muốn xóa bài đăng này?</div>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => setOpenModal({ post: null, open: false })} variant={'contained'}>
								Hủy
							</Button>
							<Button
								autoFocus
								color="primary"
								variant={'contained'}
								onClick={async () => {
									await deletePost(openModal.post);
								}}
							>
								Xác nhận
							</Button>
						</DialogActions>
					</Dialog>
				</AppMarketing>
			</AuthorizationScreen>
		);
	});
}
