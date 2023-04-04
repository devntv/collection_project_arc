import { Grid, TextField, Typography, Switch, Checkbox, FormControlLabel, FormControl, makeStyles } from "@material-ui/core"
import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card"
import moment from "moment";
import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form"
import { formSetter } from "utils/HookForm";
import { useIsFirstRender } from "utils/ReactFC";
import { DealValidation, DealStatus } from "view-model/deal"

function DealTime({ isUpdate, defaultValues }) {
    const isFirstRender = useIsFirstRender();
    const dealForm = useFormContext();
    const { startTime, endTime, readyTime } = dealForm.watch(["startTime", "endTime", "readyTime"]);

    useEffect(() => {
        if (!isFirstRender && !isUpdate) {
            formSetter(
                defaultValues,
                ["startTime", "endTime", "readyTime"],
                (name, val) => dealForm.setValue(name, val, { shouldDirty: true })
            );
        }
    }, [defaultValues]);

    return (
        <MyCard>
            <MyCardHeader title="Cài đặt thời gian" small />
            <MyCardContent>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="startTime"
                            variant="outlined"
                            size="small"
                            label="Thời gian bắt đầu"
                            type="datetime-local"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                            error={!!dealForm.errors.startTime}
                            helperText={dealForm.errors.startTime?.message ?? "Tới thời gian này sẽ áp dụng cho deal"}
                            inputRef={dealForm.register({
                                ...DealValidation.startTime,
                                validate: (data) => {
                                    if (readyTime && moment(data).isBefore(readyTime)) {
                                        return "Thời gian bắt đầu phải sau thời gian hiển thị"
                                    }
                                    if (moment(endTime).isBefore(moment(data))) {
                                        return "Thời gian kết thúc phải lớn hơn thời gian bắt đầu"
                                    }
                                }
                            })}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="endTime"
                            variant="outlined"
                            size="small"
                            label="Thời gian kết thúc"
                            type="datetime-local"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                            error={!!dealForm.errors.endTime}
                            helperText={dealForm.errors.endTime?.message ?? "Tới thời gian này sẽ kết thúc deal"}
                            inputRef={dealForm.register(DealValidation.endTime)}
                            onChange={(event) => {
                                if (moment(startTime).isBefore(event.target.value)) {
                                    dealForm.clearErrors('startTime')
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="readyTime"
                            variant="outlined"
                            size="small"
                            label="Thời gian cho phép hiển thị"
                            type="datetime-local"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={!!dealForm.errors.readyTime}
                            helperText={dealForm.errors.readyTime?.message ?? "Tới thời gian này sẽ cho hiển thị trên app/web thuocsi"}
                            inputRef={dealForm.register(DealValidation.readyTime)}
                            onChange={(event) => {
                                if (moment(event.target.value).isBefore(startTime)) {
                                    dealForm.clearErrors('startTime')
                                }
                            }}
                            onFocus={() => {
                                if (!readyTime) dealForm.setValue("readyTime", startTime, { shouldDirty: true })
                            }}
                        />
                    </Grid>
                    {isUpdate && (
                        <React.Fragment>
                            <Grid item xs={12} md={6}>
                                <Grid container alignItems="center" style={{ marginBottom: 4 }}>
                                    <Typography variant="body2" style={{ fontWeight: "bold", marginRight: 10, textTransform: "uppercase" }}>Trạng thái</Typography>
                                    <Controller
                                        name="status"
                                        control={dealForm.control}
                                        render={(props) => (
                                            <Switch
                                                {...props}
                                                color="primary"
                                                onChange={(e) => props.onChange(e.target.checked ? DealStatus.ACTIVE : DealStatus.INACTIVE)}
                                                checked={props.value === DealStatus.ACTIVE}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid container alignItems="center">
                                    <Typography variant="body2" style={{ opacity: 0, marginRight: 10, textTransform: "uppercase" }}>Trạng thái</Typography>
                                    <Typography variant="caption" style={{ marginLeft: 10, color: "rgba(0, 0, 0, 0.54)" }}>
                                        {dealForm.watch("status") === DealStatus.ACTIVE ? "Đang bán" : "Tạm ngưng bán"}
                                    </Typography>
                                </Grid>
                            </Grid>

                        </React.Fragment>

                    )}

                </Grid>
            </MyCardContent>
        </MyCard>
    )
}

export default DealTime
