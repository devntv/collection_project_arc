import React from "react";
import { Grid, Typography, FormGroup } from "@material-ui/core";
import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateTimePicker from "components/component/promotion/date-time-picker";
import moment from "moment";
import { formatDateTime } from "components/global";

export const textfieldProps = {
    InputLabelProps: {
        shrink: true,
        style: {
            color: "#353434",
            fontSize: "20px",
        },
    },
};

const TimePermissionSetting = (props) => {
    const { useForm, processing, disabled, isEdit, createdTime, isPublic } = props;

    const { errors, control, getValues, watch } = useForm;

    const formatTime = (datetime) => {
		return moment(datetime).format("yyyy-MM-DD")
	}

    return (
        <MyCard style={{ height: "calc(100% - 20px)" }}>
            <FormGroup style={{ width: "100%" }}>
                <MyCardHeader
                    small={true}
                    title="CÀI ĐẶT THỜI GIAN"
                ></MyCardHeader>
                <MyCardContent>
                    <Grid spacing={2} container>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>

                            <Grid item xs={12} sm={6} >
                                <Typography>
                                    Thời gian bắt đầu <span style={{ color: 'red' }}> *</span>
                                </Typography>
                                <DateTimePicker
                                    name="startTime"
                                    control={control}
                                    helperText={errors.startTime?.message}
                                    error={!!errors.startTime}
                                    disabled={disabled}
                                    placeholder="Chọn thời gian bắt đầu"
                                    validate={(value) => {
                                        if(disabled) return null
										if(value?.toString() === "Invalid Date") {
											return "Thời gian không hợp lệ"
										}
									}}
                                />
                                <Typography>
                                    <span style={{ fontStyle: "italic", fontSize: 12 }}>
                                        Tới thời gian này sẽ cho áp dụng chương trình
                                    </span>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <Typography>
                                    Thời gian kết thúc <span style={{ color: 'red' }}> *</span>
                                </Typography>
                                <DateTimePicker
                                    name="endTime"
                                    control={control}
                                    helperText={errors.endTime?.message}
                                    error={!!errors.endTime}
                                    disabled={disabled}
                                    placeholder="Chọn thời gian kết thúc"
                                    minDate={formatTime(watch("startTime"))}
                                    validate={(value) => {
                                        if(disabled) return null
										if(value?.toString() === "Invalid Date") {
											return "Thời gian không hợp lệ"
										} else if (new Date(value) <= new Date(watch("startTime"))) {
											return "Thời gian kết thúc phải lớn hơn thời gian bắt đầu"
										}

                                        if(processing && new Date(value) <= new Date()) return "Thời gian kết thúc phải lớn hơn thời điểm hiện tại"
									}}

                                />
                                <Typography>
                                    <span style={{ fontStyle: "italic", fontSize: 12 }}>
                                        Tới thời gian này sẽ kết thúc chương trình
                                    </span>
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} >
                                <Typography>
                                    Thời gian cho phép hiển thị <span style={{ color: 'red' }}> *</span>
                                </Typography>
                                <DateTimePicker
                                    name="publicTime"
                                    control={control}
                                    helperText={errors.publicTime?.message}
                                    error={!!errors.publicTime}
                                    disabled={disabled}
                                    placeholder="Chọn thời gian hiển thị"
                                    validate={(value) => {
                                        if(disabled) return null
										if(value?.toString() === "Invalid Date") {
											return "Thời gian không hợp lệ"
										}
                                        else if (new Date(value) > new Date(watch("startTime"))) {
											return "Thời gian hiển thị phải nhỏ hơn hoặc bằng thời gian bắt đầu"
										}
                                        // else if (!isEdit && new Date(value) <= new Date()) {
										// 	return "Thời gian hiển thị phải lớn hơn thời gian hiện tại"
										// }
                                        // else if (isEdit && new Date(value) <= new Date(createdTime)) {
										// 	return `Thời gian hiển thị phải lớn hơn thời gian tạo chương trình: ${formatDateTime(createdTime)}`
										// }
									}}
                                />
                                <Typography>
                                    <span style={{ fontStyle: "italic", fontSize: 12 }}>
                                        Tới thời gian này sẽ cho hiển thị chương trình
                                    </span>
                                </Typography>
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </Grid>
                </MyCardContent>
            </FormGroup>
        </MyCard>

    );
};

export default TimePermissionSetting;
