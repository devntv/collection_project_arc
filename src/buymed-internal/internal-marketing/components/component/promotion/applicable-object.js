import React, { useEffect, useState } from "react";
import {
	Grid,
	Typography,
	FormGroup,
} from "@material-ui/core";
import {
	MyCard,
	MyCardContent,
	MyCardHeader,
} from "@thuocsi/nextjs-components/my-card/my-card";
import MuiMultipleAuto from "@thuocsi/nextjs-components/muiauto/multiple";
import { scopes } from "components/global"
import { getAreaClient } from "client/area";
import { getSellerClient } from "client/seller";
import MuiMultipleCustomAuto from "components/MuiMultipleCustom";

const ApplicableObject = (props) => {
	const { useForm, status } = props;
	const { register, control, errors, setValue, getValues } = useForm
	const [listRegion, setListRegion] = useState([])
	const [listSeller, setListSeller] = useState([])

	const [defaultSeller, setDefaultSeller] = useState([])
	const [defaultRegion, setDefaultRegion] = useState([])
	const [defaultScope, setDefaultScope] = useState([])

	const isUpdate = status === "PROCESSING"

	useEffect(() => {
		getDataArea()
		// if (status === "PROCESSING" && getValues("customerScopes")?.length > 0) {
		// 	const data = getValues("customerScopes") ?? []
		// 	const opts = scopes.filter(scope => data.includes(scope.value) && scope.value!=="all") ?? []
		// 	setDefaultScope(opts)
		// }
	}, [])

	const getDefaultSeller = async (codes) => {
		let opts = []
		const sellerResp = await getSellerClient().getSellerBySellerCodes(codes)
		if (sellerResp.status === "OK") {
			sellerResp.data?.forEach(seller => {
				opts.push({
					value: seller.code,
					label: seller.name,
				})
			})
		}
		setDefaultSeller(opts)
	}

	// useEffect(() => {
	// 	if (status === "PROCESSING" && listSeller?.length > 0 && getValues("sellerCodes")?.length > 0) {
	// 		const codes = getValues("sellerCodes")?.map(item => item.value)
	// 		if (codes.length > 0) getDefaultSeller(codes)
	// 	}
	// }, [listSeller])

	// useEffect(() => {
	// 	if (status === "PROCESSING" && listRegion?.length > 0 && getValues("regions")?.length > 0) {
	// 		const codes = getValues("regions")
	// 		const opts = listRegion.filter(region => {
	// 			if(!!codes.includes(region.value) && region.value!=="all") return region
	// 		}) ?? []
	// 		setDefaultRegion(opts)

	// 	}
	// }, [listRegion])

	const searchSeller = async (text) => {
        let newList = []
        const res = await getSellerClient().getSellerClient(0, 50, JSON.stringify({ search: text }))
        if (res.status === "OK") {
             res.data?.forEach(item => {
				newList.push({
					label: item.name,
					value: item.code
				})
			 })
        }
        return newList
    }

	const getDataArea = async () => {
		const res = await getAreaClient().getListArea();
		const arr = [{ value: "all", label: "Tất cả" }]
		if (res?.status == "OK") {
			res?.data?.forEach((area) =>
				arr.push({
					value: area.code,
					label: area.name,
				})
			);
		}
		setListRegion(arr)

		const resSeller = await getSellerClient().getListSeller(0, 50, {});
		const arrSeller = [{ value: "all", label: "Tất cả" }]
		if (resSeller?.status == "OK") {
			resSeller?.data?.forEach((seller) =>
				arrSeller.push({
					value: seller.code,
					label: seller.name,
				})
			);
		}
		setListSeller(arrSeller)
	}

	const checkSelectedAll = (name, selected) => {
		if (selected.length > 1 && selected.find((item, index) => item.value === "all" && index === 0)) {
			setValue(name, selected.filter(item => item.value !== "all"))
		} else if (selected.find((item, index) => item.value === "all" && index !== 0)) {
			setValue(name, [{ value: "all", label: "Tất cả" }])
		} else setValue(name, selected)
	}

	return (
		<MyCard>
			<FormGroup style={{ width: "100%" }}>
				<MyCardHeader
					small={true}
					title="ĐỐI TƯỢNG ÁP DỤNG"
				></MyCardHeader>
				<MyCardContent>
					<Grid spacing={2} container>
						<Grid item xs={6} sm={12} md={6} lg={6}>
							<Typography>
								Nhà bán hàng
							</Typography>
							<MuiMultipleCustomAuto
								disabled={status === "EXPIRED"}
								disabledDelete={isUpdate}
								options={listSeller}
								name="sellerCodes"
								placeholder="Chọn"
								control={control}
								register={register}
								errors={errors}
								message="Vui lòng chọn"
								onFieldChange={searchSeller}
								onValueChange={(selected) => {
									checkSelectedAll("sellerCodes", selected)
								}}
								defaultValues={defaultSeller}
								defaultValuesMap={defaultSeller?.map(item => item.value ?? null)}
							/>
							<Typography>
								<span style={{ fontStyle: "italic", fontSize: 14 }}>
									Chỉ nhà bán hàng này mới được tham gia chương trình
								</span>
							</Typography>
						</Grid>
						<Grid item xs={6}></Grid>
						<Grid item xs={6} sm={12} md={6} lg={6}>
							<Typography>
								Vai trò khách hàng
							</Typography>
							<MuiMultipleCustomAuto
								disabled={status === "EXPIRED"}
								disabledDelete={isUpdate}
								options={scopes}
								name="customerScopes"
								placeholder="Chọn"
								control={control}
								register={register}
								errors={errors}
								message="Vui lòng chọn"
								onValueChange={(selected) => {
									checkSelectedAll("customerScopes", selected)
								}}
								defaultValues={defaultScope}
								defaultValuesMap={defaultScope?.map(item => item.value ?? null)}
							/>
							<Typography>
								<span style={{ fontStyle: "italic", fontSize: 14 }}>
									Chỉ khách hàng này mới nhìn thấy chương trình
								</span>
							</Typography>
						</Grid>
						<Grid item xs={6} sm={12} md={6} lg={6}>
							<Typography>
								Khu vực áp dụng của khách hàng
							</Typography>
							<MuiMultipleCustomAuto
								disabled={status === "EXPIRED"}
								disabledDelete={isUpdate}
								options={listRegion}
								name="regions"
								placeholder="Chọn"
								control={control}
								register={register}
								errors={errors}
								message="Vui lòng chọn"
								onValueChange={(selected) => {
									checkSelectedAll("regions", selected)
								}}
								defaultValues={defaultRegion}
								defaultValuesMap={defaultRegion?.map(item => item.value ?? null)}
							/>
							<Typography>
								<span style={{ fontStyle: "italic", fontSize: 14 }}>
									Chỉ khách hàng này mới nhìn thấy chương trình
								</span>
							</Typography>
						</Grid>
					</Grid>
				</MyCardContent>
			</FormGroup>
		</MyCard>
	);
};

export default ApplicableObject;
