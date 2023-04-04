import { IconButton, Grid, MenuItem, TextField, FormControl, FormControlLabel, Checkbox } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import MuiSingleAuto from '@thuocsi/nextjs-components/muiauto/single';
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';

export default function SkuDataItem(props) {
    const { skuItems = [], listUpdateStatus = [], handleChangeUpdateStatus, removeUpdateStatus, status, dealForm } = props
    const {
        errors,
        setValue,
        getValues,
        handleSubmit,
        clearErrors,
        setError,
        control,
        watch,
        register
    } = useForm({
        mode: "onChange",
        defaultValues: {
            skuItemCode: status.skuItemCode ?? null,
            nextStatus: status.nextStatus ?? "OUT_OF_STOCK",
        }
    });
    let id = status.id;
    let listItemCodes = listUpdateStatus.map(item => item.skuItemCode?.value)
    const nextStatusList = [
        { label: "Hết hàng", value: "OUT_OF_STOCK" },
        { label: "Ngưng bán", value: "SUSPENDED" },
        { label: "Tắt hiển thị", value: "OFF_SKU" },
        // { label: t("deal:stop_producing"), value: "STOP_PRODUCING" },
    ]

    useEffect(() => {
        if (dealForm.formState.isSubmitting && !getValues("skuItemCode")?.value) setError("skuItemCode", {
            message: "Vui lòng chọn sku."
        })
    }, [dealForm.formState.isSubmitting])

    return (
        <React.Fragment>
            <br />
            <Grid container spacing={2}>
                <Grid item xs={5} md={3}>
                    <MuiSingleAuto
                        name="skuItemCode"
                        label='Sku item'
                        placeholder="Chọn sku con"
                        options={skuItems}
                        control={control}
                        errors={errors}
                        onValueChange={(value) => {
                            handleChangeUpdateStatus({
                                ...status,
                                skuItemCode: value
                            }, id)
                        }}
                        filterOptions={(options) => {
                            return options.filter(item => (!listItemCodes.includes(item.value)))
                        }}
                        required
                    />
                </Grid>


                <Grid item xs={5} md={3}>
                    <Controller
                        control={control}
                        name="nextStatus"
                        render={({ onChange, ...props }) => (
                            <TextField
                                variant="outlined"
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={!!errors.nextStatus}
                                helperText={errors.nextStatus?.message}
                                fullWidth
                                select
                                label="Trạng thái"
                                onChange={(e) => {
                                    onChange(e.target?.value)
                                    handleChangeUpdateStatus({
                                        ...status,
                                        nextStatus: e.target?.value
                                    }, id)
                                }}
                                {...props}
                            >
                                {Object.values(nextStatusList).map((item) => (
                                    <MenuItem key={item.value}
                                        value={item.value}>{item.label}</MenuItem>
                                ))}
                            </TextField>

                        )}

                    />
                </Grid>

                <Grid item xs={2} md={1}>
                    <IconButton style={{
                        display: "flex",
                        alignItems: "center",
                        color: "red"
                    }} onClick={() => removeUpdateStatus(id)}>
                        <Delete fontSize='small' />
                    </IconButton>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
