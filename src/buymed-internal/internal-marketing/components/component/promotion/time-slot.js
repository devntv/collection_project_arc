import React, { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DatePicker from './date-picker'
import moment from "moment";
import { useForm } from "react-hook-form";
import { listTimeSlot } from '../constant'
import MuiMultipleCustomAuto from "components/MuiMultipleCustom";

export const textfieldProps = {
	InputLabelProps: {
		shrink: true,
		style: {
			color: "#353434",
			fontSize: "20px",
		},
	},
};

const TimeSlot = (props) => {
	const {
		isEdit,
		listTime,
		item,
		index,
		handleChangeTimeSlot,
		handleAddTimeSlot,
		handleRemoveTimeSlot,
		status,
		defaultTime
	} = props


	const [detail, setDetail] = useState([])
	const [defaultValue, setDefaultValue] = useState(item)

	const isUpdate = defaultTime.filter(time => time.code === defaultValue.code)?.length > 0 ? true : false

	const defaultData = () => {
		const mapTimeSlot = {}
		listTimeSlot?.forEach(el => {
			mapTimeSlot[el.value] = el.label
		})

		return item.detail?.map(el => {
			return { value: el.code, label: mapTimeSlot[el.code] }
		}) || [{ value: "0600-1159", label: "6h00 - 11h59" }]
	}

	const { register, control, errors, watch, setValue } = useForm({
		mode: "onChange",
		defaultValues: {
			startTime: item.startTime,
			endTime: item.endTime,
			code: defaultData()
		},
	});

	const formatDatetime = (datetime) => {
		return moment(datetime).format("yyyy-MM-DD")
	}

	useEffect(() => {
		setDetail(defaultData())
		setDefaultValue(item)
	}, [])

	useEffect(() => {
		setValue("startTime", item.startTime)
		setValue("endTime", item.endTime)
		setValue("code", defaultData())
	}, [listTime])

	return (
		<Grid container spacing={2}>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<Grid item xs={3} sm={6} md={3} lg={3}>
					<Typography>
						Thời gian bắt đầu khung giờ <span style={{ color: 'red' }}> *</span>
					</Typography>
					<DatePicker
						name="startTime"
						control={control}
						helperText={errors.startTime?.message}
						error={!!errors.startTime}
						disabled={(isEdit && formatDatetime(new Date()) > props.useForm.watch("endTime") || status === "EXPIRED" || (status === "PROCESSING" && isUpdate))}
						minDate={formatDatetime(props.useForm.watch("startTime"))}
						maxDate={formatDatetime(watch("endTime"))}
						handleChange={(value) => {
							handleChangeTimeSlot(index, {
								...item,
								startTime: value || null,
							})
						}}
						placeholder="Chọn thời gian bắt đầu khung giờ"
						validate={(value) => {
							if(value?.toString() === "Invalid Date") {
								return "Thời gian không hợp lệ"
							} else if (new Date(value) < new Date(props.useForm.watch("startTime"))) {
								return "Thời gian bắt đầu khung giờ phải lớn hơn thời gian bắt đầu chương trình"
							} else if (new Date(value) > new Date(watch("endTime"))) {
								return "Thời gian bắt đầu khung giờ phải nhỏ hơn thời gian kết thúc khung giờ"
							} 
						}}
					/>
				</Grid>
				<Grid item xs={3} sm={6} md={3} lg={3}>
					<Typography>
						Thời gian kết thúc khung giờ <span style={{ color: 'red' }}> *</span>
					</Typography>
					<DatePicker
						name="endTime"
						control={control}
						helperText={errors.endTime?.message}
						error={!!errors.endTime}
						disabled={(isEdit && formatDatetime(new Date()) > props.useForm.watch("endTime")) || status === "EXPIRED"}
						maxDate={formatDatetime(props.useForm.watch("endTime"))}
						minDate={formatDatetime(watch("startTime"))}
						handleChange={(value) => {
							handleChangeTimeSlot(index, {
								...item,
								endTime: value || null,
							})
						}}
						placeholder="Chọn thời gian kết thúc khung giờ"
						validate={(value) => {
							if(value?.toString() === "Invalid Date") {
								return "Thời gian không hợp lệ"
							} else if (new Date(value) < new Date(watch("startTime"))) {
								return "Thời gian kết thúc khung giờ phải lớn hơn thời gian bắt đầu khung giờ"
							} else if (new Date(value) > new Date(props.useForm.watch("endTime"))) {
								return "Thời gian kết thúc khung giờ phải nhỏ hơn thời gian kết thúc chương trình"
							} 
						}}
					/>
				</Grid>
			</MuiPickersUtilsProvider>
			<Grid item xs={4} sm={6} md={4} lg={4}>
				<Typography>
					Khung giờ áp dụng
				</Typography>
				<MuiMultipleCustomAuto
					disabled={status === "EXPIRED"}
					disabledDelete = {status === "PROCESSING" && isUpdate}
					options={listTimeSlot}
					name="code"
					placeholder="Chọn"
					control={control}
					register={register}
					errors={errors}
					message="Vui lòng chọn"
					required
					defaultValues={detail}
					defaultValuesMap={detail?.map(item => item.value ?? null)}
					onValueChange={(value) => {
						const timeMap = {}
						listTime[index]?.detail?.forEach(element => {
							timeMap[element.code] = element
						})

						value = value?.map(el => {
							return {
								code: el?.value,
								categoryCodes: timeMap[el?.value]?.categoryCodes || ["all"],
								productIDs: timeMap[el?.value]?.productIDs || ["all"]
							}
						})

						handleChangeTimeSlot(index, {
							startTime: formatDatetime(watch("startTime")),
							endTime: formatDatetime(watch("endTime")),
							detail: value
						})
					}}
				/>
			</Grid>
			<div>
				<Grid container alignItems="center" spacing={2}>
					{listTime?.length !== 1 && (!isUpdate || status !== "PROCESSING") &&
						<Button disabled={status === "EXPIRED"} onClick={() => handleRemoveTimeSlot(index)} variant="contained" color="default" style={{ height: "fit-content", marginTop: 42, marginLeft: 8 }}>
							<RemoveRoundedIcon style={{ marginRight: 8 }} />
							Xóa
						</Button>
					}
					<Button disabled={status === "EXPIRED"} variant="contained" color="primary" onClick={handleAddTimeSlot} style={{ height: "fit-content", marginLeft: 8, marginTop: 42 }} >
						<FontAwesomeIcon icon={faPlus} style={{ marginRight: 8 }} />
						Thêm
					</Button>
				</Grid>
			</div>
		</Grid>
	);
};

export default TimeSlot;
