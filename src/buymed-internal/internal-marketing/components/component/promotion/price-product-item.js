import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { getProductClient } from "client/product";
import { getCategoryClient } from "client/category";
import { listTimeSlot } from '../constant'
import { useForm } from "react-hook-form";
import MuiMultipleCustomAuto from "components/MuiMultipleCustom";

const PriceProductItem = (props) => {

	const { index, idxItem, timeItem, flashsaleTime, handleChangeTimeSlot, isEdit, status } = props;
	const [productOptions, setProductOptions] = useState([]);
	const [categoryOptions, setCategoryOptions] = useState([]);

	const [defaultCategories, setDefaultCategories] = useState([])
	const [defaultProductIds, setDefaultProductIds] = useState([])
	const [defaultData, setDefaultData] = useState({})
	const mapTimeSlot = {}
	listTimeSlot?.forEach(el => {
		mapTimeSlot[el.value] = el.label
	})
	const { errors, control, setValue, register, watch, getValues } = useForm({
		mode: "onChange",
		defaultValues: {
			productIDs: [{ value: "all", label: "Tất cả" }],
			categoryCodes: [{ value: "all", label: "Tất cả" }],
		}
	})

	const isDisabled = status === "EXPIRED"
	useEffect(() => {
		if (isEdit && flashsaleTime) {
			getDataCategory()
			getDataProduct()
		}
	}, [flashsaleTime, isEdit])


	useEffect(() => {
		searchCategory();
		if (isEdit && status === "PROCESSING" && flashsaleTime?.categoryCodes?.length) {
			(async function () {
				const categoryResp = await getCategoryClient().getListCategoryByCodesClient(flashsaleTime.categoryCodes ?? []);
				const data = categoryResp?.data?.map(item => {
					return {
						label: item.code + " - " + item.name,
						value: item.code,
					}
				}) || [{ value: "all", label: "Tất cả" }]
				setDefaultCategories(data)
			})()
		}

		if (isEdit && status === "PROCESSING" && flashsaleTime?.productIDs?.length) {
			(async function () {
				const productResp = await getProductClient().getListProductByIds(flashsaleTime.productIDs);
				const data = productResp?.data?.map(item => {
					return {
						label: item.productID + " - " + item.name,
						value: item.productID,
						productID: item.productID,
						productName: item.name,
					}
				}) || [{ value: "all", label: "Tất cả" }]
				setDefaultProductIds(data)
			})()
		}
		setDefaultData(flashsaleTime)
	}, []);

	useEffect(() => {
		searchProduct("");
	}, [watch("categoryCodes")]);

	const getDataCategory = async () => {
		const data = [{ value: "all", label: "Tất cả" }]
		if (!flashsaleTime?.categoryCodes?.length || flashsaleTime?.categoryCodes?.find(item => item.value === "all")) {
			setValue("categoryCodes", data)
			return
		}
		const categoryResp = await getCategoryClient().getListCategoryByCodesClient(flashsaleTime.categoryCodes);
		setValue("categoryCodes", categoryResp?.data?.map(item => {
			return {
				label: item.code + " - " + item.name,
				value: item.code,
			}
		}) || data)
	}

	const getDataProduct = async () => {
		const data = [{ value: "all", label: "Tất cả" }]
		if (!flashsaleTime?.productIDs?.length || flashsaleTime?.productIDs?.find(item => item.value === "all")) {
			setValue("productIDs", data)
			return
		}
		const productResp = await getProductClient().getListProductByIds(flashsaleTime.productIDs);
		setValue("productIDs", productResp?.data?.map(item => {
			return {
				label: item.productID + " - " + item.name,
				value: item.productID,
				productID: item.productID,
				productName: item.name,
			}
		}) || data)
	}

	const getCampaignFlashSaleTime = async (type, value) => {
		const campaignFlashSaleTime = timeItem.detail
		const arrProductBefore = campaignFlashSaleTime.slice(0, idxItem)
		const arrProductAfter = campaignFlashSaleTime.slice(idxItem + 1)
		const itemCurrent = { ...flashsaleTime }

		if (type === "category") {
			itemCurrent.categoryCodes = value
			if (value?.length && value.find(item => item !== "all")) {
				const mapCategory = {}
				value?.forEach(element => {
					mapCategory[element] = element
				});
				if (itemCurrent.productIDs?.length) {
					const productResp = await getProductClient().getListProductByIds(itemCurrent.productIDs);
					const array = []
					const arrInfo = []
					productResp?.data?.forEach(element => {
						if (element.categoryCodes && (element.categoryCodes?.some(item => value.indexOf(item) >= 0))) {
							array.push(element.productID)
							arrInfo.push({
								label: element.productID + " - " + element.name,
								value: element.productID,
								productID: element.productID,
								productName: element.name,
							})
						}
					})
					setValue("productIDs", arrInfo.length ? arrInfo : [{ value: "all", label: "Tất cả" }])
					itemCurrent.productIDs = array
				}
			}
		} else itemCurrent.productIDs = value

		return arrProductBefore.concat(itemCurrent, arrProductAfter)
	}

	const searchCategory = async (q = "") => {
		const categoryResp = await getCategoryClient().getListCategoryFromClient(0, 10, JSON.stringify({}), q);
		const arr = [{ value: "all", label: "Tất cả" }]
		categoryResp?.data?.forEach?.(({ code, name }) => {
			arr.push({
				label: code + " - " + name,
				value: code,
			})
		})
		setCategoryOptions(arr);
	};

	const searchProduct = async (q = "") => {
		let categoryCodes = ""
		if (!watch("categoryCodes") || watch("categoryCodes")?.find(item => item.value === "all")) categoryCodes = ""
		else categoryCodes = watch("categoryCodes")?.map(item => item.value).toString()

		const productClient = getProductClient();
		const productResp = await productClient.getProductListFromClient({
			search: q,
			limit: 10,
			offset: 0,
			categoryCodes
		});
		const arr = [{ value: "all", label: "Tất cả" }]
		productResp?.data?.forEach?.(({ productID, name }) => {
			arr.push({
				label: productID + " - " + name,
				value: productID,
				productID: productID,
				productName: name,
			})
		})
		setProductOptions(arr);
	};

	const checkAll = (name, selected) => {
		if (selected.length > 1 && selected.find((item, idx) => item.value === "all" && idx === 0)) {
			setValue(name, selected.filter(item => item.value !== "all"))
			selected = selected.filter(item => item.value !== "all")
		} else if (selected.find((item, idx) => item.value === "all" && idx !== 0)) {
			setValue(name, [{ value: "all", label: "Tất cả" }])
			selected = [{ value: "all", label: "Tất cả" }]
		} else setValue(name, selected)
		return selected
	}

	return (
		<Grid container style={{ marginBottom: 10 }}>
			<Grid item xs={3}>
				<Typography>
					{flashsaleTime?.name || mapTimeSlot[flashsaleTime?.code] || "-"}
				</Typography>
			</Grid>
			<Grid container item xs spacing={2}>
				<Grid item xs={6}>
					<MuiMultipleCustomAuto
						disabled={isDisabled || (status === "PROCESSING" && defaultData.categoryCodes?.length === 0)}
						disabledDelete={status === "PROCESSING"}
						options={categoryOptions || []}
						name="categoryCodes"
						placeholder="Chọn danh mục"
						control={control}
						register={register}
						errors={errors}
						onFieldChange={searchCategory}
						onValueChange={async (selected) => {
							const categoryCodes = checkAll("categoryCodes", selected)?.map(item => item.value)
							const detail = await getCampaignFlashSaleTime("category", categoryCodes)
							handleChangeTimeSlot(index, {
								...timeItem,
								detail
							})
						}}
						defaultValues={defaultCategories}
						defaultValuesMap={defaultCategories?.map(item => item.value ?? null)}
					/>
				</Grid>
				<Grid item xs={6}>
					<MuiMultipleCustomAuto
						disabled={isDisabled || (status === "PROCESSING" && defaultData.productIDs?.length === 0)}
						disabledDelete={status === "PROCESSING"}
						options={productOptions || []}
						name="productIDs"
						placeholder="Chọn sản phẩm"
						control={control}
						register={register}
						errors={errors}
						onFieldChange={searchProduct}
						onValueChange={async (selected) => {
							const productIDs = checkAll("productIDs", selected)?.map(item => item.value)
							const detail = await getCampaignFlashSaleTime("product", productIDs)
							handleChangeTimeSlot(index, {
								...timeItem,
								detail
							})
						}}
						defaultValues={defaultProductIds}
						defaultValuesMap={defaultProductIds?.map(item => item.value ?? null)}
					/>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default PriceProductItem;
