import { Typography, Grid, TextField, IconButton, Tooltip } from '@material-ui/core'
import { Controller, useForm } from "react-hook-form";
import React, { useState, useEffect } from 'react'
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { defaultCondition } from '../constant';
import NumberFormat from 'react-number-format';
import { NumberFormatCustom } from 'containers/voucher/NumberFormatCustom';

export default function OrderConditionSlot(props) {

    const {
        disabled,
        listOrderConditions,
        item,
        index,
        // handleAddConditionItem,
        handleRemoveConditionItem,
        handleChangeConditionItem,
        isSubmitting,
        hookForm
    } = props

    const { control, errors, register, getValues, setValue, clearErrors } = hookForm

    let code = item.code

    useEffect(() => {
        setValue(`orderCondition[${code}][minTotalPrice]`, item.minTotalPrice)
    }, [item])

    return (
        <Grid item container spacing={1} xs={12}>

            <Grid item md={3} xs={12}>
                <Typography>
                    Giá trị nhỏ nhất của đơn hàng
                </Typography>
                <NumberFormatCustom
                    control={control}
                    name={`orderCondition[${code}][minTotalPrice]`}
                    validate={{
                        validate: (value) => {
                            let newValue = Number(value)
                            if (isNaN(value) && value !== "" && value != null) {
                                let data = value?.replace("đ", "")
                                data = data.replace(new RegExp(",", "g"), "")
                                newValue = Number(data)
                            }

                            if (newValue % 1 !== 0) return "Giá trị nhập phải là số nguyên"
                            else if (newValue > 1000000000) return "Giá trị nhập phải nhỏ hơn hoặc bằng 1,000,000,000"
                            else if (value !== "" && value != null && newValue < 1000) return "Giá trị nhập tối thiểu là 1,000"
                        },
                    }}
                    errors={errors}
                    onValueChange={(v) => {
                        //value without dollar signe
                        let value = v?.floatValue ? v.floatValue : null
                        handleChangeConditionItem(index, {
                            ...item,
                            minTotalPrice: value
                        }, defaultCondition.order)
                    }}

                />

            </Grid>

            <Grid item>
                {/* {!disabled && (
                    
                )} */}

                <Grid container spacing={2} alignItems="center" style={{
                    marginTop: 20
                }}>
                    {
                        listOrderConditions.length !== 1 && (
                            <IconButton onClick={() => {
                                handleRemoveConditionItem(index, defaultCondition.order)
                                clearErrors()
                            }} color="secondary" style={{ height: "fit-content", marginLeft: 8 }}>
                                <RemoveIcon style={{ fontSize: "22px" }} />
                            </IconButton>
                        )
                    }

                    {/* <IconButton onClick={() => handleAddConditionItem(index, defaultCondition.order)} color="primary" style={{ height: "fit-content", marginLeft: 8 }}>
                        <AddIcon fontSize='12' />
                    </IconButton> */}
                </Grid>
            </Grid>

        </Grid>
    )
}
