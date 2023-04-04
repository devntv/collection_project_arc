import React from "react";
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
import TimeSlot from './time-slot'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateTimePicker from './date-time-picker'
import moment from "moment";

export const textfieldProps = {
	InputLabelProps: {
		shrink: true,
		style: {
			color: "#353434",
			fontSize: "20px",
		},
	},
};

const TimeSetting = (props) => {
	const {
		isEdit,
		disabled,
		useForm,
		campaignType,
		handleChangeTimeSlot,
		handleAddTimeSlot,
		handleRemoveTimeSlot,
		listTime,
		status,
		defaultTime
	} = props;

	const { errors, control, watch } = useForm;

	const formatDatetime = (datetime) => {
		return moment(datetime).format("yyyy-MM-DD")
	}

	return (
		<MyCard>
			<FormGroup style={{ width: "100%" }}>
				<MyCardHeader
					small={true}
					title="CÀI ĐẶT THỜI GIAN"
				></MyCardHeader>
				<MyCardContent>
					<Grid spacing={2} container>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<Grid item xs={3} sm={6} md={3} lg={3}>
								<Typography>
									Thời gian cho phép đăng ký <span style={{ color: 'red' }}> *</span>
								</Typography>
								<DateTimePicker
									disabled={status === "EXPIRED"}
									name="registrationStartTime"
									control={control}
									helperText={errors.registrationStartTime?.message}
									error={!!errors.registrationStartTime}
									placeholder="Chọn thời gian cho phép đăng ký"
									validate={(value) => {
										if(value?.toString() === "Invalid Date") {
											return "Thời gian không hợp lệ"
										}
									}}
								/>
							</Grid>
							<Grid item xs={3} sm={6} md={3} lg={3}>
								<Typography>
									Thời gian kết thúc đăng ký <span style={{ color: 'red' }}> *</span>
								</Typography>
								<DateTimePicker
									disabled={status === "EXPIRED"}
									name="registrationEndTime"
									control={control}
									helperText={errors.registrationEndTime?.message}
									minDate={formatDatetime(watch("registrationStartTime"))}
									error={!!errors.registrationEndTime}
									placeholder="Chọn thời gian kết thúc đăng ký"
									validate={(value) => {
										if(value?.toString() === "Invalid Date") {
											return "Thời gian không hợp lệ"
										} else if (new Date(value) < new Date(watch("registrationStartTime"))) {
											return "Thời gian kết thúc đăng ký phải lớn hơn thời gian cho phép đăng ký"
										} else if (new Date(value) > new Date(watch("endTime"))) {
											return "Thời gian kết thúc đăng ký phải nhỏ hơn thời gian kết thúc chương trình"
										} 
									}}
								/>
							</Grid>
							<Grid item xs={3} sm={6} md={3} lg={3}>
								<Typography>
									Thời gian bắt đầu chương trình <span style={{ color: 'red' }}> *</span>
								</Typography>
								<DateTimePicker
									disabled={status === "EXPIRED"}
									name="startTime"
									control={control}
									helperText={errors.startTime?.message}
									error={!!errors.startTime}
									placeholder="Chọn thời gian bắt đầu chương trình"
									validate={(value) => {
										if(value?.toString() === "Invalid Date") {
											return "Thời gian không hợp lệ"
										}
									}}
								/>
							</Grid>
							<Grid item xs={3} sm={6} md={3} lg={3}>
								<Typography>
									Thời gian kết thúc chương trình <span style={{ color: 'red' }}> *</span>
								</Typography>
								<DateTimePicker
									disabled={status === "EXPIRED"}
									name="endTime"
									control={control}
									helperText={errors.endTime?.message}
									error={!!errors.endTime}
									placeholder="Chọn thời gian kết thúc chương trình"
									minDate={formatDatetime(watch("startTime"))}
									validate={(value) => {
										if(value?.toString() === "Invalid Date") {
											return "Thời gian không hợp lệ"
										} else if (new Date(value) < new Date(watch("startTime"))) {
											return "Thời gian kết thúc chương trình phải lớn hơn thời gian bắt đầu"
										} else if (new Date(value) < new Date(watch("registrationEndTime"))) {
											return "Thời gian kết thúc chương trình phải lớn hơn thời gian kết thúc đăng ký"
										}
									}}
								/>
							</Grid>
						</MuiPickersUtilsProvider>
					</Grid>
					{campaignType === "FLASH_SALE" &&
						<Grid container>
							<Grid item xs={12}>
								<Grid>
									<Typography>
										Khung giờ áp dụng
										<span style={{ color: 'red' }}> *</span>
									</Typography>
									{listTime?.length ? listTime.map((item, index) =>
										<TimeSlot
											key={index}
											isEdit={isEdit}
											disabled={disabled}
											useForm={useForm}
											listTime={listTime}
											item={item}
											index={index}
											campaignType={campaignType}
											handleChangeTimeSlot={handleChangeTimeSlot}
											handleAddTimeSlot={handleAddTimeSlot}
											handleRemoveTimeSlot={handleRemoveTimeSlot}
											status={status}
											defaultTime={defaultTime}
										/>
									) : ""}
								</Grid>
							</Grid>
						</Grid>
					}
				</MyCardContent>
			</FormGroup>
		</MyCard>

	);
};

export default TimeSetting;
