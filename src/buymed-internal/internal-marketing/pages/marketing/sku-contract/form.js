import { Button, FormGroup, ButtonGroup, Grid, Typography, TextField } from "@material-ui/core";
import Head from "next/head";
import AppMarketing from "pages/_layout";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import MuiSingleAuto from "@thuocsi/nextjs-components/muiauto/single";
import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import moment from "moment";
import SkuContractDetail from "containers/sku-contract/SkuContractDetail"
import UploadFile from "containers/sku-contract/UploadFile"
import { useRouter } from "next/router";
import { getSkuContractClient } from "client/skuContract";
import { getCustomerClient } from 'client/customer'
import { formatUTCTime } from 'components/component/util'
import { formatDatetimeFormType } from "components/global";
import { getProductClient } from "client/product";
import Authorization from '@thuocsi/nextjs-components/authorization/authorization';
import { getMasterDataClient } from "client/master-data";
import { getAreaClient } from "client/area";

export const textfieldProps = {
	InputLabelProps: {
		shrink: false,
		style: {
			color: "#353434",
			fontSize: "20px",
		},
	},
};

const SaleCampaignForm = (props, type) => {
	const edit = type === "edit";
	const toast = useToast();
	const router = useRouter();
	const { skuContractRes, uploadToken } = props;

	const {
		customerID,
		contractNumber,
		startTime,
		endTime,
		documentFiles,
		code,
		status
	} = skuContractRes || {
		customerID: "",
		contractNumber: "",
		startTime: formatDatetimeFormType(moment().add(1, "days")),
		endTime: formatDatetimeFormType(moment().add(1, "months")),
		code: "",
		documentFiles: [],
		status: ""
	};

	const form = useForm({
		mode: "onChange",
		defaultValues: {
			customerID: edit ? {
				label: customerID + " - " + skuContractRes?.customerName,
				value: customerID,
				customerID: customerID,
				name: skuContractRes?.customerName,
			} : customerID,
			contractNumber,
			startTime: formatUTCTime(startTime),
			endTime: formatUTCTime(endTime),
			documentFiles,
		},
	});

	const { getValues, handleSubmit, register, control, errors } = form;
	const disabled = edit && new Date() >= new Date(startTime);
	const [isLoading, setIsLoading] = useState(false);
	const [customerOption, setCustomerOption] = useState([])
	const [skuContractDetail, setSkuContractDetail] = useState([])
	const [priceMap, setPriceMap] = useState({})
	const [dataPaging, setDataPaging] = useState({
		limit: 20,
		offset: 0,
		total: 0
	})
	const [customerInfo, setCustomerInfo] = useState({})
	const [customerAddress, setCustomerAddress] = useState("")
    const [areaMap, setAreaMap] = useState({})

	useEffect(() => {
		searchCustomer()
		getAreaMap()
		if (edit) {
			getAddressInfo(customerID, edit)
		}
	}, [])

	useEffect(() => {
		if (edit && customerInfo.provinceCode) {
			getDataProduct()
		}
	}, [customerInfo])

	const getDataProduct = async (search = "", limit = 20, offset = 0) => {
		let skuContractDetailRes = await getSkuContractClient().getListSkuContractDetail(code, search, limit, offset);
		if (!skuContractDetailRes?.data?.length) {
			setDataPaging({
				limit,
				offset: offset / limit,
				total: skuContractDetailRes?.total || 0
			})
			setSkuContractDetail([])
			return
		}

		const skuMap = {}
		const skuCodes = []

		skuContractDetailRes?.data?.forEach(item => {
			skuMap[item.sku] = {
				price: item.price,
				skuContractCode: item.skuContractCode,
				sku: item.sku,
			}
			skuCodes.push(item.sku)
		})

		const prdResp = await getProductClient().getSkuMainList({ skuCodes, offset: 0, limit: 1000 })
		if (prdResp.status === "OK") {
			prdResp.data?.forEach(e => {
				skuMap[e.code].items = e.items || []
			})
		}
		
		const res = await getProductClient().getProductListBySKUs([... new Set(skuCodes)]);

		const price = {}
		if (res.status !== 'OK') {
			return
		}
		res.data?.forEach(e => {
			skuMap[e.sku?.code] = {
				...skuMap[e.sku?.code],
				imageUrls: e.product?.imageUrls ? e.product?.imageUrls[0] : "",
				name: e.product?.name,
			}
		})

		const listPrd = res.data?.map(({ sku, product }) => {
			price[sku.code] = skuMap[sku.code]?.price || 0
			return ({
				label: product.productID + " - " + (product?.name || "") + " - " + sku.sellerCode,
				value: product.productCode,
				imageUrls: product.imageUrls ? product.imageUrls[0] : "",
				price: skuMap[sku.code]?.price || 0,
				productID: product.productID,
				productCode: product.productCode,
				productName: product?.name,
				sellerCode: sku.sellerCode,
				sku: sku.code,
				skuContractCode: skuMap[sku.code]?.skuContractCode,
				items: skuMap[sku.code]?.items || []
			})
		})


		setPriceMap(price)
		setSkuContractDetail(listPrd)
		setDataPaging({
			limit,
			offset: offset / limit,
			total: skuContractDetailRes?.total || 0
		})

	}

	const convertData = (value) => {
		const formData = {
			customerID: value.customerID?.customerID,
			customerPhone: value.customerID?.phone,
			customerName: value.customerID?.name,
			startTime: new Date(value.startTime || getValues("startTime")).toISOString(),
			endTime: new Date(value.endTime).toISOString(),
			contractNumber: value.contractNumber,
			documentFiles: value.documentFiles,
		}

		if (edit) {
			formData.code = code
			return formData
		}

		formData.skuContractDetail = skuContractDetail?.map(item => {
			return {
				sku: item.sku,
				price: item.price,
				sellerCode: item.sellerCode,
				productCode: item.productCode
			}
		}) || []

		return formData
	}

	const onSubmitCreate = async (value) => {
		if (!skuContractDetail.length) {
			toast.error("Vui lòng chọn sản phẩm")
			return
		}
		let flag = false

		for (const val of skuContractDetail) {
			if (!val || val.price === 0) {
				toast.error("Vui lòng nhập giá hợp đồng")
				flag = true
				return
			} else if (val.price % 1 !== 0) {
				toast.error("Giá theo hợp đồng chỉ được nhập số nguyên")
				flag = true
				return
			} else if (val.price >= 1000000000) {
				toast.error("Giá theo hợp đồng phải nhỏ hơn 1,000,000,000")
				flag = true
				return
			}
		}

		if (flag) return

		setIsLoading(true);
		const res = await getSkuContractClient().createSkuContract(convertData(value))
		if (res && res.status === "OK") {
			toast.success("Tạo Cài đặt giá hợp đồng thành công")
			router.push(`/marketing/edit-sku-contract?code=${res?.data[0]?.code}`);
			setIsLoading(false);
			return
		}

		if (res && res.message) toast.error(res.message)
		setIsLoading(false);
	};

	const onSubmitUpdate = async (value) => {
		setIsLoading(true);
		const res = await getSkuContractClient().updateSkuContract(convertData(value))
		if (res && res.status === "OK") {
			toast.success("Cập nhật Cài đặt giá hợp đồng thành công")
			setTimeout(() => {
				router.reload()
			}, 2000);
			setIsLoading(false);
			return
		}

		if (res && res.message) toast.error(res.message)
		setIsLoading(false);
	};

	const breadcrumb = [
		{
			name: "Trang chủ",
			link: "/marketing"
		},
		{
			name: "Danh sách Cài đặt giá theo hợp đồng",
			link: "/marketing/sku-contract"
		},
		{
			name: edit ? "Chỉnh sửa Cài đặt giá theo hợp đồng" : "Tạo Cài đặt giá theo hợp đồng",
		},
	]

	const searchCustomer = async (value = "") => {
		const customerClient = getCustomerClient();
		const customerResp = await customerClient.getListCustomerBySearch(value);
		const arr = customerResp?.data?.map?.((customer) => {
			return {
				...customer,
				label: customer.customerID + " - " + customer.name,
				value: customer.customerID,
			}
		}) || []
		setCustomerOption(arr);
	}

	const getAreaMap = async () => {
        let area = {}
        area["00"] = "Tất cả"
        const resArea = await getAreaClient().getListArea();
        if (resArea.status == "OK") {
            resArea.data?.forEach(element => {
                area[element.code] = element.name ?? ""
            });
        }
        const resProvince = await getMasterDataClient().getProvince(0, 100, '', [], true);
        if (resProvince.status == "OK") {
            resProvince.data?.forEach(element => {
                area[element.code] = element.name ?? ""
            });
        }
        setAreaMap(area)
    }

	const handleAddListDetail = (data) => {
		if (edit) {
			setPriceMap({
				...priceMap,
				[data?.productID]: 0
			})
		}

		const array = skuContractDetail.concat({ ...data, price: 0 })
		setSkuContractDetail(array)
	}

	const handleChangeListDetail = (data, index) => {
		const arrayBefore = skuContractDetail.slice(0, index)
		const arrayAfter = skuContractDetail.slice(index + 1)
		const array = arrayBefore.concat(data, arrayAfter)
		setSkuContractDetail(array)
	}

	const handleRemovePrd = (index) => {
		const array = skuContractDetail.filter((item, idx) => idx !== index)
		setSkuContractDetail(array)
	}

	const getAddressInfo = async (value, isEdit = false) => {
		let item = value ?? {}

		if (!isEdit) setCustomerInfo(item)

		if (isEdit && value) {
			const customerResp = await getCustomerClient().getCustomerByCustomerID(value)
			if (customerResp.status !== "OK" || customerResp.data.length === 0) {
				setCustomerInfo({})
				setCustomerAddress("")
				return
			}

			item = customerResp?.data[0] || {}
			setCustomerInfo(item)
		}

		if (item.customerID) {

			let info = item.address ?? ""

			if (item.wardCode && item.wardCode !== "") {
				let wardResp = await getMasterDataClient().getWardByWardCode(item.wardCode);
				if (wardResp.data && wardResp.status === "OK") {
					item.wardName = wardResp.data[0].name ?? ""
					if (wardResp.data[0]?.name) info += `, ${wardResp.data[0].name ?? ""}`
				}
			}

			let districtResp = await getMasterDataClient().getDistrictByDistrictCode(item.districtCode);
			if (districtResp.data && districtResp.status === "OK" && item.districtCode && item.districtCode !== "") {
				item.districtName = districtResp.data[0].name ?? ""
				if (districtResp.data[0]?.name) info += `, ${districtResp.data[0].name ?? ""}`
			}

			let provinceResult = await getMasterDataClient().getProvinceByProvinceCode(item.provinceCode)
			if (provinceResult && provinceResult.status == "OK") {
				item.provinceName = provinceResult.data[0].name
				if (provinceResult.data[0]?.name) {
					info === "" ? info += `${provinceResult.data[0].name ?? ""}` : info += `, ${provinceResult.data[0].name ?? ""}`
				}
			}

			item.infoAddress = info
		}

		setCustomerAddress(item.infoAddress)
	}

	return (
		<AppMarketing select="/marketing/sale-campaign" breadcrumb={breadcrumb}>
			<Head>
				<title>{edit ? "Chỉnh sửa Cài đặt giá theo hợp đồng" : "Tạo Cài đặt giá theo hợp đồng"}</title>
			</Head>
			<MyCard>
				<MyCardHeader title="CHI TIẾT HỢP ĐỒNG KHÁCH HÀNG">
				</MyCardHeader>
			</MyCard>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<MyCard style={{ height: "calc(100% - 20px)" }}>
						<FormGroup style={{ width: "100%" }}>
							<MyCardHeader small={true} title="THÔNG TIN KHÁCH HÀNG" />
							<MyCardContent>
								<Grid container item xs={12} justifyContent="space-between" spacing={2}>
									<Grid item xs={12}>
										<Typography> Khách hàng <span style={{ color: 'red' }}> *</span> </Typography>
										<MuiSingleAuto
											disabled={edit || status === "EXPIRED"}
											required
											message="Vui lòng chọn khách hàng"
											id="customerID"
											name="customerID"
											control={control}
											errors={errors}
											options={customerOption}
											placeholder="ID khách hàng - Tên khách hàng"
											onFieldChange={searchCustomer}
											onValueChange={getAddressInfo}
										/>
									</Grid>

									<Grid item xs={12}>
										<Typography> Địa chỉ khách hàng: {customerAddress ?? ""}</Typography>
									</Grid>

									<UploadFile useForm={form} uploadToken={uploadToken} documentFiles={documentFiles} status={status} />
								</Grid>
							</MyCardContent>
						</FormGroup>
					</MyCard>
				</Grid>
				<Grid item xs={6}>
					<MyCard style={{ height: "calc(100% - 20px)" }}>
						<FormGroup style={{ width: "100%" }}>
							<MyCardHeader small={true} title="THÔNG TIN HỢP ĐỒNG" />
							<MyCardContent>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<Typography> Mã hợp đồng </Typography>
										<TextField
											disabled={status === "EXPIRED"}
											id="contractNumber"
											name="contractNumber"
											placeholder="Nhập mã hợp đồng"
											defaultValue=""
											helperText={errors.contractNumber?.message}
											{...textfieldProps}
											size="small"
											fullWidth
											error={!!errors.contractNumber}
											variant="outlined"
											inputRef={register}
										/>
									</Grid>
									<Grid container item spacing={2} alignItems="flex-start" justifyContent="space-between" >
										<Grid item xs={6}>
											<Typography> Thời gian bắt đầu <span style={{ color: 'red' }}> *</span> </Typography>
											<TextField
												disabled={status === "PROCESSING" || status === "EXPIRED"}
												id="startTime"
												name="startTime"
												variant="outlined"
												size="small"
												placeholder=""
												helperText={errors.startTime?.message}
												{...textfieldProps}
												type="datetime-local"
												fullWidth
												error={!!errors.startTime}
												required
												inputRef={register({
													min: {
														value: disabled ? null : formatUTCTime(new Date()),
														message: "Thời gian bắt đầu phải lớn hơn thời gian hiện tại",
													},
													required: "Vui lòng chọn thời gian bắt đầu",
												})}
											/>
											<Typography style={{ color: "gray", fontSize: 12 }}> Thời gian bắt đầu hợp đồng </Typography>
										</Grid>
										<Grid item xs={6}>
											<Typography> Thời gian kết thúc <span style={{ color: 'red' }}> *</span> </Typography>
											<TextField
												disabled={status === "EXPIRED"}
												id="endTime"
												name="endTime"
												variant="outlined"
												size="small"
												placeholder=""
												type="datetime-local"
												helperText={errors.endTime?.message}
												error={!!errors.endTime}
												{...textfieldProps}
												fullWidth
												required
												inputRef={register({
													required: "Vui lòng chọn thời gian kết thúc",
													min: {
														value: getValues("startTime"),
														message: "Thời gian kết thúc phải lớn hơn thời gian bắt đầu",
													},
												})}
											/>
											<Typography style={{ color: "gray", fontSize: 12 }}> Thời gian kết thúc hợp đồng </Typography>
										</Grid>
									</Grid>
								</Grid>
							</MyCardContent>
						</FormGroup>
					</MyCard>
				</Grid>
			</Grid>
			<Authorization requiredAPI="PUT/marketplace/product/v2/sku-contract">
				{edit &&
					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit(onSubmitUpdate)}
						style={{ marginBottom: 20, marginRight: 8 }}
						disabled={isLoading || status === "EXPIRED"}
					>
						Lưu
					</Button>
				}
			</Authorization>
			<SkuContractDetail
				skuContractDetail={skuContractDetail}
				handleAddListDetail={handleAddListDetail}
				handleChangeListDetail={handleChangeListDetail}
				handleRemovePrd={handleRemovePrd}
				isEdit={edit}
				priceMap={priceMap}
				code={code}
				getDataProduct={getDataProduct}
				dataPaging={dataPaging}
				status={status}
				customerInfo={customerInfo}
				areaMap={areaMap}
			/>
			<ButtonGroup>
				<Button
					variant="contained"
					style={{ margin: 8 }}
					onClick={() => router.push("/marketing/sku-contract")}
				>
					Quay lại
				</Button>
				{!edit &&
					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit(onSubmitCreate)}
						style={{ marginTop: 8, marginBottom: 8, marginRight: 8 }}
						disabled={isLoading}
					>
						Lưu
					</Button>
				}
			</ButtonGroup>
		</AppMarketing>
	);
};

export default SaleCampaignForm;
