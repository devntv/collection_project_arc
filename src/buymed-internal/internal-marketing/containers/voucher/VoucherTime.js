import { TextField, Typography, Grid } from '@material-ui/core'
import { MyCard, MyCardContent, MyCardHeader } from '@thuocsi/nextjs-components/my-card/my-card'
import React from 'react'
import { formatUTCTime } from 'utils/function'

export default function VoucherTime(props) {

    const {
        voucher,
        promotion,
        control,
        errors,
        setValue,
        getValues,
        register,
        isEdit
    } = props
    return (
        <MyCard style={{ height: "calc(100% - 20px)" }}>
            <MyCardHeader title="Cài đặt thời gian" style={{
                textTransform: "uppercase"
            }} small />

            <MyCardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography>
                            Thời gian bắt đầu <span style={{ color: "red" }}>*</span>
                        </Typography>

                        <TextField
                            id="startTime"
                            name="startTime"
                            helperText={errors.startTime?.message}
                            error={!!errors.startTime}
                            placeholder=""
                            // disabled={compareTime}
                            fullWidth
                            size="small"
                            variant="outlined"
                            type="datetime-local"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                            inputRef={register({
                                required: "Thời gian bắt đầu không được để trống"
                            })}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography>
                            Thời gian kết thúc <span style={{ color: "red" }}>*</span>
                        </Typography>

                        <TextField
                            id="endTime"
                            name="endTime"
                            helperText={errors.endTime?.message}
                            error={!!errors.endTime}
                            placeholder=""
                            // disabled={compareTime}
                            fullWidth
                            size="small"
                            variant="outlined"
                            type="datetime-local"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                            inputRef={register({
                                required: "Thời gian kết thúc không được để trống",
                                validate: (value) => {
                                    if (new Date(value) <= new Date(getValues("startTime"))) {
                                        return "Thời gian kết thúc phải lớn hơn thời gian bắt đầu"
                                    }
                                    return null
                                }
                            })}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography>
                            Thời gian hiển thị <span style={{ color: "red" }}>*</span>
                        </Typography>
                        <TextField
                            id="publicTime"
                            name="publicTime"
                            helperText={errors.publicTime?.message}
                            error={!!errors.publicTime}
                            placeholder=""
                            // disabled={compareTime}
                            fullWidth
                            size="small"
                            variant="outlined"
                            type="datetime-local"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                            inputRef={register({
                                required: "Vui lòng chọn thời gian hiển thị",
                                validate: (value) => {
                                    if (new Date(value) > new Date(getValues("startTime"))) {
                                        return "Thời gian hiển thị phải nhỏ hơn hoặc bằng thời gian bắt đầu"
                                    }
                                    return null
                                }
                            })}
                        />

                    </Grid>

                </Grid>
            </MyCardContent>
        </MyCard>
    )
}
