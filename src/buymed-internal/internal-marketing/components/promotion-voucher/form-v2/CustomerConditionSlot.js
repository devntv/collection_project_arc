import { Typography, Grid, TextField, IconButton, InputAdornment, FormControl, RadioGroup, FormControlLabel, Radio, Tooltip } from '@material-ui/core'
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from 'react'
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { defaultCondition } from '../constant';

export default function CustomerConditionSlot(props) {

    const {
        disabled,
        listCustomerConditions,
        item,
        index,
        handleAddConditionItem,
        handleRemoveConditionItem,
        handleChangeConditionItem,
        isSubmitting,
        hookForm
    } = props

    const { control, errors, register, getValues, setValue } = hookForm

    let code = item.code;

    let minDayNoOrder = `customerCondition[${code}][minDayNoOrder]`
    let minOrderCount = `customerCondition[${code}][minOrderCount]`
    let maxOrderCount = `customerCondition[${code}][maxOrderCount]`

    useEffect(() => {
        setValue(minDayNoOrder, item.minDayNoOrder)
        setValue(minOrderCount, item.minOrderCount)
        setValue(maxOrderCount, item.maxOrderCount)
    }, [item])


    return (
        <Grid item container spacing={1} xs={12}>

            <Grid item style={{
                minWidth: "132px"
            }}>

                <Grid container spacing={2} alignItems="center" style={{
                    marginTop: 24
                }}>
                    <Grid item>
                        <Typography>Điều kiện {index + 1}:</Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item md={3} xs={12}>
                <Typography>
                    Số ngày không đặt hàng
                </Typography>

                <TextField
                    type="number"
                    name={minDayNoOrder}
                    // placeholder={"0"}
                    fullWidth
                    InputProps={{
                        endAdornment: <InputAdornment position="end">Ngày</InputAdornment>,
                    }}
                    variant="outlined"
                    size="small"
                    helperText={errors[`customerCondition`] && errors[`customerCondition`][code]?.minDayNoOrder?.message}
                    error={errors[`customerCondition`] && errors[`customerCondition`][code]?.minDayNoOrder}
                    inputRef={register({
                        validate: (value) => {
                            if(value !== ""){
                                if (value.toString().indexOf(".") >= 0) {
                                    return "Vui lòng không nhập số thập phân."
                                }
                                if (value <= 0) {
                                    return "Số ngày phải lớn hơn 0";
                                }
    
                                if (value > 1000000) {
                                    return "Số ngày phải nhỏ hơn hoặc bằng 1,000,000";
                                }
                            }
                        },
                    })}
                    onKeyDown={(e) => ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault()}
                    onChange={(e) => {
                        handleChangeConditionItem(index, {
                            ...item,
                            minDayNoOrder: e.target?.value === "" ? null : +e.target?.value,
                        }, defaultCondition.customer)
                    }}
                />
            </Grid>

            <Grid item md={3} xs={12}>
                <Typography>
                    Số đơn hàng tối thiểu
                </Typography>

                <TextField
                    type="number"
                    name={minOrderCount}
                    // placeholder={"0"}
                    fullWidth
                    helperText={errors[`customerCondition`] && errors[`customerCondition`][code]?.minOrderCount?.message}
                    error={errors[`customerCondition`] && errors[`customerCondition`][code]?.minOrderCount}
                    variant="outlined"
                    size="small"
                    inputRef={register({
                        validate: (value) => {
                            if (value.toString().indexOf(".") >= 0) {
                                return "Vui lòng không nhập số thập phân."
                            }

                            if (value < 0) {
                                return "Số đơn hàng tối thiểu không được âm";
                            }

                            if (value > 1000000) {
                                return "Số đơn hàng phải nhỏ hơn hoặc bằng 1,000,000";
                            }
                        }
                    })}
                    onKeyDown={(e) => ['e', 'E', '+', '-', ','].includes(e.key) && e.preventDefault()}
                    onChange={(e) => {
                        let value = e.target?.value || ""
                        handleChangeConditionItem(index, {
                            ...item,
                            minOrderCount: value === "" ? null : +value
                        }, defaultCondition.customer)

                    }}
                />
            </Grid>

            <Grid item md={3} xs={12}>
                <Typography>
                    Số đơn hàng tối đa
                </Typography>

                <TextField
                    type="number"
                    name={maxOrderCount}
                    // placeholder={"0"}
                    fullWidth
                    helperText={errors[`customerCondition`] && errors[`customerCondition`][code]?.maxOrderCount?.message}
                    error={errors[`customerCondition`] && errors[`customerCondition`][code]?.maxOrderCount}
                    variant="outlined"
                    size="small"
                    inputRef={register({
                        validate: (value) => {
                            if (value.toString().indexOf(".") >= 0) {
                                return "Vui lòng không nhập số thập phân."
                            }

                            if (value < 0) {
                                return "Số đơn hàng tối đa không được âm";
                            }
                            if (!!value && !!getValues([`customerCondition`][code]?.minOrderCount)) {
                                const valuesOf = getValues()
                                if (parseInt(valuesOf[`customerCondition`][code]?.minOrderCount) > parseInt(value)) {
                                    return "Số đơn hàng tối đa không được nhỏ hơn số đơn hàng tối thiểu"
                                }
                            }

                            if (value > 1000000) {
                                return "Số đơn hàng phải nhỏ hơn hoặc bằng 1,000,000";
                            }

                        }
                    })}
                    onKeyDown={(e) => ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault()}
                    onChange={(e) => {
                        handleChangeConditionItem(index, {
                            ...item,
                            maxOrderCount: e.target?.value === "" ? null : +e.target?.value
                        }, defaultCondition.customer)
                    }}
                />

            </Grid>

            <Grid item>
                {/* {!disabled && ( */}
                <Grid container spacing={2} alignItems="center" style={{
                    marginTop: 20
                }}>
                    {
                        listCustomerConditions.length !== 1 && (
                            <IconButton onClick={() => {
                                handleRemoveConditionItem(index, defaultCondition.customer)
                            }} color="secondary" style={{ height: "fit-content", marginLeft: 8 }}>
                                <RemoveIcon style={{ fontSize: "22px" }} />
                            </IconButton>
                        )
                    }


                    {index === (listCustomerConditions.length - 1) && (
                        <IconButton onClick={() => handleAddConditionItem(index, defaultCondition.customer)} color="primary" style={{ height: "fit-content", marginLeft: 8 }}>
                            <AddIcon style={{ fontSize: "22px" }} />
                        </IconButton>
                    )}
                </Grid>
                {/* )} */}
            </Grid>

        </Grid>
    )
}
