import { Grid, TextField, FormGroup, Typography, Tooltip } from "@material-ui/core";
import { useState, useEffect } from "react";
import { rewards } from "../constant";
import { textfieldProps } from "./infomation-campaign";
import MuiSingleAuto from "@thuocsi/nextjs-components/muiauto/single";
import {
	MyCard,
	MyCardContent,
	MyCardHeader,
} from "@thuocsi/nextjs-components/my-card/my-card";
import PriceProductItem from './price-product-item'
import moment from "moment";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PriceAndProductSetting = (props) => {
	const {
		isEdit,
		useForm,
		listTime,
		handleChangeTimeSlot,
		reward,
		campaignType,
		status
	} = props;
	const { register, errors, control, setValue, getValues } = useForm;
	const [selectField, setSelectField] = useState("UNLIMIT")

	useEffect(() => {
		if (isEdit && getValues("saleType")) {
			setSelectField(getValues("saleType")?.value)
			let dataRewardLevel = 0
			if (getValues("saleType")?.value === "PERCENTAGE") {
				dataRewardLevel = reward.percentageDiscount
			} else if (getValues("saleType")?.value === "ABSOLUTE") {
				dataRewardLevel = reward.absoluteDiscount
			}
			setValue("rewardLevel", dataRewardLevel)
		}
	}, [getValues("saleType"), isEdit])

	return (
		<MyCard>
			<FormGroup style={{ width: "100%" }}>
				<MyCardHeader
					small={true}
					title="CÀI ĐẶT GIÁ VÀ SẢN PHẨM"
				></MyCardHeader>
				<MyCardContent>
					<Grid spacing={2} container>
						<Grid item xs={3}>
							<Typography>Cài đặt đồng loạt <span style={{ color: "red" }}>*</span> </Typography>
							<MuiSingleAuto
								id="saleType"
								name="saleType"
								// disabled={isEdit}
								placeholder="Chọn cài đặt đồng loạt"
								options={rewards || []}
								control={control}
								errors={errors}
								required
								message="Vui lòng chọn cài đặt đồng loạt"
								onValueChange={(selected) => {
									setSelectField(selected?.value)
									if (!selected?.value) setSelectField(rewards[0]?.value)
								}}
							/>
						</Grid>
						<Grid item xs={3}>
							<Typography>Tỉ lệ fulfill tối thiểu của sản phẩm (%) <Tooltip title="Sản phẩm phải đạt tỷ lệ fulfillment tối thiểu mới có thể tham gia chương trình">
								<span>
									<FontAwesomeIcon icon={faExclamationCircle} size="sm" />
								</span>
							</Tooltip> <span style={{ color: "red" }}>*</span> </Typography>
							<TextField
								name="fulfill"
								disabled={status === "EXPIRED"}
								placeholder="Nhập % fulfill tối thiểu"
								size="small"
								type="number"
								fullWidth
								required
								variant="outlined"
								error={!!errors.fulfill}
								inputRef={register({
									validate: (value) => {
										if (value.toString().indexOf(".") >= 0) {
											return "Vui lòng không nhập số thập phân."
										} else if (value > 100) {
											return "Tỉ lệ fulfill tối thiểu phải nhỏ hơn hoặc bằng 100";
										} else if (value < 0) {
											return "Tỉ lệ fulfill tối thiểu phải lớn hơn hoặc bằng 0";
										}
									},
									required: "Tỉ lệ fulfill tối thiểu không được để trống",
								})}
								helperText={errors.fulfill?.message}
								{...textfieldProps}
							/>
						</Grid>
						{selectField !== "UNLIMIT" && selectField !== "PRICE" &&
							<Grid item xs={3}>
								<Typography>
									Mức khuyến mãi <span style={{ color: "red" }}>*</span>
								</Typography>
								<TextField
									disabled={status === "EXPIRED"}
									name="rewardLevel"
									placeholder="Nhập mức khuyến mãi"
									helperText={errors.rewardLevel?.message}
									{...textfieldProps}
									size="small"
									type="number"
									fullWidth
									error={!!errors.rewardLevel}
									required
									variant="outlined"
									inputRef={register({
										validate: (value) => {
											if (selectField === "PERCENTAGE" && value > 100) {
												return "Phần trăm tối thiểu phải nhỏ hơn hoặc bằng 100";
											} else if (value < 0) {
												return "Mức khuyến mãi phải lớn hơn hoặc bằng 0";
											}
										},
										required: "Mức khuyến mãi không được để trống",
									})}
								/>
								{selectField !== "UNLIMIT" &&
									<Typography>
										<span style={{ fontStyle: "italic", fontSize: 14 }}>
											{selectField === "PERCENTAGE" ? "Nhập 5 có nghĩa là 5%" : "Đây là số tiền tối thiểu. Đơn vị giảm giá là vnđ"}
										</span>
									</Typography>
								}
							</Grid>
						}
					</Grid>
					<Grid >
						<Typography>{campaignType === "FLASH_SALE" ? "Khung giờ áp dụng" : "Sản phẩm áp dụng"}</Typography>
						<Typography>
							<span style={{ fontStyle: "italic", fontSize: 14 }}>
								{campaignType === "FLASH_SALE" ? "1 sản phẩm được tham gia nhiều khung giờ. " : ""}
								Nếu bán hết số lượng khuyến mãi trong thời gian chạy chương trình, sản phẩm sẽ quay lại giá thường
							</span>
						</Typography>
						<br />
						{listTime?.map((item, index) =>
							<Grid container key={index}>
								<Grid item xs={3}>
									<Typography>
										{item?.startTime && campaignType === "FLASH_SALE" ? moment(item?.startTime).format("DD-MM-yyyy") : ""}
										-
										{item?.endTime && campaignType === "FLASH_SALE" ? moment(item?.endTime).format("DD-MM-yyyy") : ""}
									</Typography>
								</Grid>
								<Grid item xs>
									{item.detail?.map((el, idx) =>
										<PriceProductItem
											isEdit={isEdit}
											index={index}
											idxItem={idx}
											timeItem={item}
											flashsaleTime={el}
											key={idx}
											handleChangeTimeSlot={handleChangeTimeSlot}
											status={status}
										/>
									)}
								</Grid>
							</Grid>
						)}
					</Grid>
				</MyCardContent>
			</FormGroup>
		</MyCard >
	);
};

export default PriceAndProductSetting;
