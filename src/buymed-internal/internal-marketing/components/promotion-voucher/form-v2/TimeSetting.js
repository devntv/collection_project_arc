import React from "react";
import { Grid, Typography, FormGroup, TextField } from "@material-ui/core";
import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import { formatUTCTime } from "components/promotion-voucher/util";

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
    const { useForm, disabled, isEdit } = props;

    const { errors, getValues, watch, register } = useForm;

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
                                <TextField
                                    name="startTime"
                                    id="startTime"
                                    placeholder=""
                                    helperText={errors.startTime?.message}
                                    size="small"
                                    variant="outlined"
                                    InputProps={{
                                        // readOnly: disabled,
                                    }}
                                    type="datetime-local"
                                    fullWidth
                                    error={!!errors.startTime}
                                    required
                                    inputRef={register({
                                        min: {
                                            value: isEdit ? null : formatUTCTime(new Date()),
                                            message: "Thời gian bắt đầu phải lớn hơn thời gian hiện tại",
                                        },
                                        required: "Vui lòng chọn thời gian bắt đầu",
                                    })}
                                />
                                <Typography>
                                    <span style={{ fontStyle: "italic", fontSize: 12 }}>
                                        Đến thời gian này sẽ cho áp dụng chương trình
                                    </span>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <Typography>
                                    Thời gian kết thúc <span style={{ color: 'red' }}> *</span>
                                </Typography>
                                <TextField
                                    name="endTime"
                                    placeholder=""
                                    type="datetime-local"
                                    helperText={errors.endTime?.message}
                                    error={!!errors.endTime}
                                    size="small"
                                    variant="outlined"
                                    {...textfieldProps}
                                    InputProps={{
                                    //   readOnly: disabled,
                                    }}
                                    fullWidth
                                    required
                                    inputRef={register({
                                        required: "Vui lòng chọn thời gian kết thúc",
                                        validate: (value) => {
                                            if (new Date(value) <= new Date(getValues("startTime"))) {
                                                return "Thời gian kết thúc phải lớn hơn thời gian bắt đầu"
                                            }
                                            else return null
                                        }
                                    })}
                                />
                                <Typography>
                                    <span style={{ fontStyle: "italic", fontSize: 12 }}>
                                        Đến thời gian này sẽ kết thúc chương trình
                                    </span>
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} >
                                <Typography>
                                    Thời gian cho phép hiển thị
                                </Typography>
                                <TextField
                                    name="publicTime"
                                    placeholder=""
                                    type="datetime-local"
                                    helperText={errors.publicTime?.message}
                                    error={!!errors.publicTime}
                                    size="small"
                                    variant="outlined"
                                    InputProps={{
                                        // readOnly: disabled,
                                    }}
                                    fullWidth
                                    inputRef={register({
                                        required: "Vui lòng chọn thời gian hiển thị",
                                        min: {
                                            value: isEdit ? null : formatUTCTime(new Date()),
                                            message: "Thời gian hiển thị phải lớn hơn hoặc bằng thời gian hiện tại",
                                        },
                                        max: {
                                            value: getValues("startTime"),
                                            message: "Thời gian hiển thị phải nhỏ hơn hoặc bằng thời gian bắt đầu",
                                        },
                                    })}
                                />
                                <Typography>
                                    <span style={{ fontStyle: "italic", fontSize: 12 }}>
                                        Đến thời gian này sẽ cho hiển thị chương trình
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
