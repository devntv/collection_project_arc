import React, { useEffect, useState, useCallback } from "react";
import {
	Grid,
	TextField,
	FormGroup,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
	IconButton,
	InputAdornment,
	FormHelperText
} from "@material-ui/core";
import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import MuiSingleAuto from "@thuocsi/nextjs-components/muiauto/single";
import { ExportCSV } from "components/export-cvs"
import { useForm } from "react-hook-form"
import { getProductClient } from "client/product";
import { getSkuContractClient } from "client/skuContract";
import SearchIcon from "@material-ui/icons/Search";
import { formatNumber, isValid } from "components/global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Save as SaveIcon } from "@material-ui/icons";
import ModalCustom from "@thuocsi/nextjs-components/simple-dialog/dialogs";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import { NumberFormatCustom } from 'components/custom-format'
import Authorization from '@thuocsi/nextjs-components/authorization/authorization';
import SkuItemInfo from "containers/marketing/sale-campaign/detail/SkuItemStatus";

const SkuContractDetail = (props) => {
	const toast = useToast();
	const {
		code,
		skuContractDetail,
		handleAddListDetail,
		handleChangeListDetail,
		handleRemovePrd,
		isEdit,
		priceMap,
		getDataProduct,
		dataPaging,
		status,
		customerInfo = {},
		areaMap,
	} = props
	const [productOptions, setProductOptions] = useState([])
	const [listProductFilter, setListProductFilter] = useState(skuContractDetail || [])
	const [searchTerm, setSearchTerm] = useState("")
	const [loading, setLoading] = useState(false)
	const [openModal, setOpenModal] = useState(false)
	const [selectedPrd, setSelectedPrd] = useState({})
	const skuContractClient = getSkuContractClient()
	const fileName = `Danh_Sach_San_Pham_Cai_Dat_Gia_Theo_Hop_Dong_${new Date().toLocaleString().replace(/[ :]/g, '_').replace(/[,]/g, '')}`;
	const { errors, control, register, setValue } = useForm({
		defaultValues: {
			productID: null
		},
		mode: "onChange"
	});

	useEffect(() => {
		if (customerInfo.provinceCode) searchProduct();
	}, [customerInfo.provinceCode]);

	useEffect(() => {
		setListProductFilter(skuContractDetail);
	}, [skuContractDetail]);

	const searchProduct = async (q = "") => {
		const prdResp = await getProductClient().getSkuMainList({ q: JSON.stringify({ status: "NORMAL" }), search: q, locationCodes: customerInfo?.provinceCode || "00", getSkuItemByLocation: false })
		if (prdResp.status !== 'OK') {
			setProductOptions([])
			return
		}
		const skus = prdResp.data?.map(e => e.code)
		const res = await getProductClient().getProductListBySKUs([... new Set(skus)]);
		const skuMap = {}
		if (res.status !== 'OK') {
			setProductOptions([])
			return
		}
		res.data?.forEach(e => {
			skuMap[e.sku?.code] = {
				imageUrls: e.product?.imageUrls ? e.product?.imageUrls[0] : "",
				name: e.product?.name,
			}
		})

		const listPrd = prdResp.data.map(e => {
			return ({
				label: e.productID + " - " + (skuMap[e.code]?.name || "") + " - " + e.sellerCode,
				value: e.productCode,
				imageUrls: skuMap[e.code]?.imageUrls,
				price: 0,
				productID: e.productID,
				productCode: e.productCode,
				productName: skuMap[e.code]?.name,
				sellerCode: e.sellerCode,
				sku: e.code,
				isNew: true,
				items: e.items || []
			})
		})
		setProductOptions(listPrd)
	}

	const getData = (resp, skuMap) => {
		return isValid(resp)
			? resp.data?.map((item) => {
				return {
					'Id sản phẩm': item.productID,
					'Sku': item.sku,
					'Danh sách sku con': skuMap[item.sku] ? skuMap[item.sku].map(el => `${el.itemCode}(${formatNumber((el.retailPriceValue) || 0)})`)?.join(",") : "-",
					'Giá hợp đồng': formatNumber(item.price || 0),
				};
			})
			: [];
	};

	const csvData = async () => {
		setLoading(true);
		const limit = 100;
		let dataExport = [];
		const skuMap = {}
		const totalResult = await getSkuContractClient().getListSkuContractDetail(code, searchTerm, 1, 0);

		const totalPageSize = Math.ceil(totalResult?.total / limit);
		for (let page = 0; page < totalPageSize; ++page) {
			const res = await getSkuContractClient().getListSkuContractDetail(code, searchTerm, limit, page * limit)
			const skus = res?.data?.map(e => e.sku)

			const resp = await getProductClient().getSkuMainList({ skuCodes: skus, offset: 0, limit: 1000 })
			resp?.data?.forEach(item => {
				skuMap[item.code] = item.items || []
			})
			dataExport = dataExport.concat(getData(res, skuMap))
		}

		setLoading(false);
		return dataExport;
	};

	const handleKeyPress = (e) => {
		if (e.keyCode == 13) {
			handleSubmit();
		}
	};
	const handleChangeValue = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleSubmit = async () => {
		if (isEdit) {
			getDataProduct(searchTerm)
			return
		}
		const arrayFilter = skuContractDetail.filter((item) =>
			item.productName.toLowerCase().includes(searchTerm?.toLowerCase()) ||
			item.productID.toString().toLowerCase().includes(searchTerm?.toLowerCase())
		)
		setListProductFilter(arrayFilter)
	};

	const getSkuContractDetailStyle = useCallback(({ sku, price }) => {
		if (!isEdit) return "none";
		const oldValue = priceMap[sku];
		if (oldValue === price || !price || price % 1 !== 0 || price >= 1000000000) return "none";
		return "block";
	}, [priceMap])

	const handleDeleteProduct = async () => {
		const res = await skuContractClient.deleteSkuContractDetail(selectedPrd.skuContractCode, selectedPrd.sku)
		if (res && res.status === "OK") {
			toast.success("Xoá sản phẩm thành công")
			getDataProduct()
			setSelectedPrd({})
			return
		}

		if (res && res.message) toast.error(res.message)
	}

	const handleAddProduct = async (data) => {
		const res = await skuContractClient.createSkuContractDetail({
			skuContractCode: code,
			sku: data.sku,
			price: data.price,
			sellerCode: data.sellerCode,
			productCode: data.productCode
		})
		if (res && res.status === "OK") {
			toast.success("Thêm sản phẩm thành công")
			getDataProduct()
			return
		}

		if (res && res.message) toast.error(res.message)
	}

	const handleUpdateProduct = async (data) => {
		const res = await skuContractClient.updateSkuContractDetail(data)
		if (res && res.status === "OK") {
			toast.success("Cập nhật giá sản phẩm thành công")
			getDataProduct(searchTerm)
			return
		}

		if (res && res.message) toast.error(res.message)
	}

	const handlePageChange = (_, page, rowsPerPage) => {
		getDataProduct(searchTerm, rowsPerPage, rowsPerPage * page)
	};

	const handleUrlSku = (sellerCode, code) => {
        let url = ""
        switch (sellerCode) {
            case "MEDX":
                url = `/internal-seller/MEDX/PUR_HCM/sku/edit?code=${code}`
                break;
            case "MEDX-HN":
                url = `/internal-seller/MEDX-HN/PUR_HN/sku/edit?code=${code}`
                break;
            default:
                url = `/seller/sku/edit?code=${code}`
                break;
        }
        return url
    }

	return (
		<MyCard>
			<FormGroup style={{ width: "100%" }}>
				<MyCardHeader small={true} title="DANH SÁCH SẢN PHẨM CÓ GIÁ HỢP ĐỒNG" />
				<MyCardContent>
					<Grid container item xs={12} justify="space-between">
						<Grid container item xs={10} spacing={2}>
							<Grid item xs={4}>
								<TextField
									placeholder="Tìm sản phẩm trong danh sách"
									variant="outlined"
									style={{ width: "100%" }}
									inputRef={register}
									onKeyDown={handleKeyPress}
									onChange={handleChangeValue}
									value={searchTerm}
									size="small"
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton onClick={handleSubmit}>
													<SearchIcon />
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
							</Grid>
						</Grid>
						<Grid container item xs justifyContent="flex-end">
							{isEdit && <ExportCSV csvData={csvData} fileName={fileName} loading={loading} />}
						</Grid>
						<TableContainer>
							<Table>
								<colgroup>
									<col width="5%" />
								</colgroup>
								<TableHead>
									<TableRow>
										<TableCell align="left">STT</TableCell>
										<TableCell align="left">Hình ảnh</TableCell>
										<TableCell align="left">Sản phẩm</TableCell>
										<TableCell align="left">Danh sách sku con</TableCell>
										<TableCell align="center">Giá hợp đồng<span style={{ color: "red" }}>*</span></TableCell>
										<TableCell align="center">Thao tác</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{listProductFilter?.length > 0 && listProductFilter.map((row, index) => (
										<TableRow key={index}>
											<TableCell align="left">
												{dataPaging?.offset ? ((dataPaging?.offset * dataPaging?.limit) + (index + 1)) : index + 1}
											</TableCell>
											<TableCell align="left">
												{row.imageUrls && <img src={row.imageUrls} alt={row.name} width={100} height={100} style={{ objectFit: "contain" }} />}
											</TableCell>
											<TableCell align="left">
												{row?.productName}
												<br />
												Sku: {row.sku}
												<br />
												ID: {row.productID}
											</TableCell>
											<TableCell align="left">
                                                {
                                                    row.items?.map(item => (
                                                        <React.Fragment key={item.itemCode}>
                                                            <SkuItemInfo status={item.status} label={item.itemCode} item={item} areaMap={areaMap} handleUrlSku={handleUrlSku} />
                                                        </React.Fragment>
                                                    ))
                                                }
                                            </TableCell>
											<TableCell align="center">
												<TextField
													className="removeMarginTopHelperText"
													disabled={(!row.isNew && status === "PROCESSING") || status === "EXPIRED"}
													error={row.price <= 0 || row.price % 1 !== 0 || row.price >= 1000000000}
													helperText={row.price <= 0 ? <span style={{ position: "absolute" }}>Vui lòng nhập giá theo hợp đồng</span> :
														(row.price % 1 !== 0 ? <span style={{ position: "absolute" }}>Giá theo hợp đồng chỉ được nhập số nguyên</span> : (
															row.price >= 1000000000 ? <span style={{ position: "absolute" }}>Giá theo hợp đồng phải nhỏ hơn 1,000,000,000</span> : "")
														)}
													placeholder="Nhập giá theo hợp đồng"
													variant="outlined"
													style={{ width: "100%" }}
													required
													onChange={(e) => {
														row.price = +e.target.value
														handleChangeListDetail(row, index)
													}}
													size="small"
													value={row.price}
													InputProps={{
														inputComponent: NumberFormatCustom,
														endAdornment: (
															<Authorization requiredAPI="PUT/marketplace/product/v2/sku-contract-detail">
																<IconButton
																	size="small"
																	color="primary"
																	style={{ display: getSkuContractDetailStyle({ sku: row.sku, price: row.price }) }}
																	onClick={() => {
																		if (row.isNew) {
																			handleAddProduct(row)
																			return
																		}
																		handleUpdateProduct({ skuContractCode: row.skuContractCode, sku: row.sku, price: row.price })
																	}}
																>
																	<SaveIcon fontSize="small" />
																</IconButton>
															</Authorization>
														)
													}}
												/>
											</TableCell>
											<TableCell align="center">
												<Tooltip title="Xóa sản phẩm">
													<Authorization requiredAPI="DELETE/marketplace/product/v2/sku-contract-detail">
														<IconButton disabled={props.status === "EXPIRED"} onClick={() => {
															setSearchTerm("")
															if (isEdit && !row.isNew) {
																setOpenModal(true);
																setSelectedPrd({ skuContractCode: row.skuContractCode, sku: row.sku, index })
																return
															}
															handleRemovePrd(index)
														}}
														>
															<FontAwesomeIcon icon={faTrash} style={{ color: "#777" }} size="sm" />
														</IconButton>
													</Authorization>
												</Tooltip>
											</TableCell>
										</TableRow>
									))}
									{skuContractDetail.length === 0 && (
										<TableRow>
											<TableCell colSpan={3} align="left">
												Không tìm thấy Sản phẩm nào
											</TableCell>
										</TableRow>
									)}
									<TableRow>
										<TableCell colSpan={3} align="left">
											{isEdit ?
												<Authorization requiredAPI="POST/marketplace/product/v2/create/sku-contract-detail">
													<MuiSingleAuto
														disabled={status === "EXPIRED"}
														name="productID"
														control={control}
														errors={errors}
														options={productOptions || []}
														placeholder="Thêm sản phẩm"
														onFieldChange={searchProduct}
														onValueChange={(selected) => {
															setSearchTerm("")
															if (skuContractDetail?.find(item => item.sku === selected?.sku)) {
																toast.error("Sản phẩm đã tồn tại. Vui lòng chọn sản phẩm khác")
																setValue("productID", "")
																return
															}
															if (selected) {
																setValue("productID", "")
																handleAddListDetail(selected)
															}
														}}
													/>
												</Authorization>
												:
												<>
													<MuiSingleAuto
														disabled={status === "EXPIRED" || !customerInfo.code}
														name="productID"
														control={control}
														errors={errors}
														options={productOptions || []}
														placeholder="Thêm sản phẩm"
														onFieldChange={searchProduct}
														onValueChange={(selected) => {
															setSearchTerm("")
															if (skuContractDetail?.find(item => item.sku === selected?.sku)) {
																toast.error("Sản phẩm đã tồn tại. Vui lòng chọn sản phẩm khác")
																setValue("productID", "")
																return
															}
															if (selected) {
																setValue("productID", "")
																handleAddListDetail(selected)
															}
														}}
													/>
													{!customerInfo.code && <FormHelperText>*Vui lòng chọn khách hàng</FormHelperText>}
												</>
											}
										</TableCell>
									</TableRow>
								</TableBody>
								<MyTablePagination
									labelUnit="sản phẩm"
									count={dataPaging.total}
									rowsPerPage={dataPaging.limit}
									page={dataPaging.offset}
									onChangePage={handlePageChange}
								/>
							</Table>
						</TableContainer>
					</Grid>
					<ModalCustom
						open={openModal}
						title="Thông báo"
						primaryText="Xóa"
						onClose={() => {
							setSelectedPrd({})
							setOpenModal()
						}}
						onExcute={handleDeleteProduct}
					>
						Bạn có chắc muốn&nbsp;<strong>xóa</strong>&nbsp;sản phẩm này không?
					</ModalCustom>
				</MyCardContent>
			</FormGroup>
		</MyCard >
	);
};

export default SkuContractDetail;
