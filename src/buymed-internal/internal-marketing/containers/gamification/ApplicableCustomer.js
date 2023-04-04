import React, { useEffect, useState } from "react";
import { Grid, Typography, FormGroup } from "@material-ui/core";
import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import MuiMultipleAuto from "@thuocsi/nextjs-components/muiauto/multiple";
import { scopes } from "components/global"
import { getCustomerClient } from "client/customer"
import RichTextField from "@thuocsi/nextjs-components/editor/rich-text-field/index";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const ApplicableCustomer = (props) => {
	const { useForm, processing, disabled } = props;
	const { register, control, errors, setValue, getValues } = useForm
	const [customerList, setCustomerList] = useState([])

	useEffect(() => {
		getCustomer()
	}, [])

	const getCustomer = async () => {
		const res = await getCustomerClient().getCustomer(0, 20, {});
		const arr = [{ value: "all", label: "Tất cả" }]
		if (res?.status === "OK") {
			res?.data?.forEach((customer) =>
				arr.push({
					value: customer.customerID,
					label: customer.name,
				})
			);
		}
		setCustomerList(arr)
	}

	const checkSelectedAll = (name, selected) => {
		if (selected.length > 1 && selected.find((item, index) => item.value === "all" && index === 0)) {
			setValue(name, selected.filter(item => item.value !== "all"))
		} else if (selected.find((item, index) => item.value === "all" && index !== 0)) {
			setValue(name, [{ value: "all", label: "Tất cả" }])
		} else setValue(name, selected)
	}

	const searchCustomer = async (search) => {
		const res = await getCustomerClient().getCustomer(0, 20, { search });
		const arr = [{ value: "all", label: "Tất cả" }]
		if (res?.status === "OK") {
			res?.data?.forEach((customer) =>
				arr.push({
					value: customer.customerID,
					label: customer.name,
				})
			);
		}
		return arr
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
						<Grid item xs={12} >
							<Typography>
								Khách hàng
							</Typography>
							<MuiMultipleAuto
								options={customerList}
								name="customerIDs"
								placeholder="Chọn"
								control={control}
								register={register}
								errors={errors}
								message="Vui lòng chọn"
								onValueChange={(selected) => {
									checkSelectedAll("customerIDs", selected)
								}}
								onFieldChange={searchCustomer}
								disabled={disabled}
							/>
							<Typography>
								<span style={{ fontStyle: "italic", fontSize: 14 }}>
									Chỉ khách hàng này mới được tham gia chương trình
								</span>
							</Typography>
						</Grid>

						<Grid item xs={12} >
							<Typography>
								Vai trò khách hàng
							</Typography>
							<MuiMultipleAuto
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
								disabled={disabled}
							/>
							<Typography>
								<span style={{ fontStyle: "italic", fontSize: 14 }}>
									Chỉ khách hàng này mới nhìn thấy chương trình
								</span>
							</Typography>
						</Grid>

						<Grid item xs={12}>
							<Typography>
								Nội dung mô tả
							</Typography>

							<RichTextField
								name="conditionDescription"
								getValue={getValues}
								setValue={setValue}
							/>
						</Grid>
					</Grid>
				</MyCardContent>
			</FormGroup>
		</MyCard>
	);
};

export default ApplicableCustomer;
