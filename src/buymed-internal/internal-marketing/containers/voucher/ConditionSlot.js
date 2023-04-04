import { Typography, Grid, TextField, IconButton, FormHelperText } from '@material-ui/core'
import { Controller, useForm } from "react-hook-form";
import React, { useState, useEffect } from 'react'
import { getProductClient } from 'client/product';
import { getSellerClient } from 'client/seller';
import { conditionLabel, defaultCondition } from 'components/promotion-voucher/constant';
import { getTagClient } from 'client/tag';
import MuiSingleCustom from 'components/MuiSingleCustom';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import NumberFormat from 'react-number-format';
import { NumberFormatCustom } from './NumberFormatCustom';

export default function ConditionSlot(props) {

    const {
        disabled,
        listConditionItem,
        item,
        index,
        handleAddConditionItem,
        handleRemoveConditionItem,
        handleChangeConditionItem,
        conditionType,
        defaultListSellers = [],
        defaultOptions = [],
        fieldName = "",
        hookForm,
        voucherType
    } = props

    const [options, setOptions] = useState(defaultOptions)
    const [sellerOpts, setSellerOpts] = useState(defaultListSellers)
    const [isDuplicate, setIsDuplicate] = useState(false)

    const { control, errors, register, getValues, setValue, handleSubmit, unregister, clearErrors } = hookForm

    let code = item.code

    let type = conditionType === defaultCondition.product ? "productCondition" : "tagCondition"

    let conditionName = `${type}[${code}][${fieldName}]`
    let sellerCode = `${type}[${code}][sellerCode]`
    let minQuantity = `${type}[${code}][minQuantity]`
    let minTotalPrice = `${type}[${code}][minTotalPrice]`

    useEffect(() => {

        conditionType === defaultCondition.product ? setValue(conditionName, item.productId) : setValue(conditionName, item.tagCode)
        setValue(sellerCode, item.sellerCode)
        setValue(minQuantity, item.minQuantity)
        setValue(minTotalPrice, item.minTotalPrice)
        register(conditionName)
        register(sellerCode)
    }, [item])


    function shallowEqual(object1, object2) {

        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);

        if (keys1.length !== keys2.length) {
            return false;
        }
        for (let key of keys1) {
            if (key === "minQuantity" || key === "minTotalPrice") {
                if (Number(object1[key] ?? 0) !== Number(object2[key] ?? 0)) {
                    return false;
                }
            }
            else if (key !== "code") {
                if (object1[key]?.value !== object2[key]?.value) {
                    return false;
                }
            }

        }
        return true;
    }

    const checkDuplicateCondition = (_item) => {
        let flag = false
        listConditionItem.filter((_mItem, _index) => _index !== index)?.forEach((condition) => {
            if (shallowEqual(condition, _item)) {
                flag = true
            }
        })
        setIsDuplicate(flag)
    }

    const searchSeller = async (text) => {
        let newList = []
        const res = await getSellerClient().getSellerClient(0, 50, JSON.stringify({ search: text }), "ACTIVE")
        if (res.status === "OK") {
            newList = res.data?.map(item => ({
                label: `${item.code} - ${item.name}`,
                value: item.code
            }))
        }
        // setSellerOpts(newList)
        return newList
    }

    const searchTag = async (text) => {
        let newList = []
        const res = await getTagClient().getListTagClient(0, 50, "", text)
        if (res.status === "OK") {
            newList = res.data?.map(item => ({
                label: item.name,
                value: item.code
            }))
        }
        // setOptions(newList)
        return newList
    }

    const searchProduct = async (text) => {
        const productClient = getProductClient();
        const productResp = await productClient.searchComponentFuzzy({
            type: "PRODUCT",
            offset: 0,
            limit: 20,
            text,
            filter: {
                isCombo: false
            }
        });
        let newList = []
        if (productResp.status == "OK") {
            newList = productResp.data?.map(({ product }) => ({
                value: product.productID,
                label: product.productID + " - " + product.name,
                productCode: product.code
            }));
        }
        // setOptions(newList)
        return newList
    }

    const handleSearchCondition = async (text) => {
        switch (conditionType) {
            case defaultCondition.productTag:
                return searchTag(text)
            case defaultCondition.product:
                return searchProduct(text)
            default:
                return []
        }
    }

    useEffect(() => {
        checkDuplicateCondition(item)
    }, [listConditionItem])

    useEffect(() => {
        setSellerOpts(defaultListSellers)
    }, [defaultListSellers])

    useEffect(() => {
        setOptions(defaultOptions)
    }, [defaultOptions])

    useEffect(() => {
        if (voucherType !== "GIFT") clearErrors(sellerCode)
    }, [voucherType])


    return (
        <Grid item container spacing={1} xs={12}>
            <Grid item style={{
                minWidth: "132px"
            }}>

                <Grid container spacing={2} alignItems="center" style={{
                    marginTop: 24
                }}>
                    <Grid item>
                        {isDuplicate && getValues(`${fieldName}`)?.value ? (
                            <Typography style={{ color: "red" }}>Điều kiện {index + 1}:</Typography>
                        ) : (<Typography>Điều kiện {index + 1}:</Typography>)}

                    </Grid>
                </Grid>
            </Grid>

            <Grid item md={3} xs={12}>
                <Typography>
                    Nhà bán hàng {voucherType === "GIFT" && (<span style={{ color: "red" }}>*</span>)} 
                </Typography>

                <MuiSingleCustom
                    name={sellerCode}
                    fullWidth
                    style={{ background: "#fcfcfc" }}
                    placeholder={voucherType !== "GIFT" ? "Tất cả" : "Chọn"}
                    options={sellerOpts}
                    control={control}
                    errors={errors}
                    onFieldChange={searchSeller}
                    register={register}
                    required={voucherType === "GIFT"}
                    // disabled={disabled}
                    message={"Vui lòng chọn nhà bán hàng"}
                    onValueChange={(value) => {
                        handleChangeConditionItem(index, { ...item, sellerCode: value }, conditionType)
                    }}
                />
            </Grid>

            <Grid item md={3} xs={12}>
                <Typography>
                    {conditionLabel[conditionType]} <span style={{ color: "red" }}>*</span>
                </Typography>
                <MuiSingleCustom
                    name={conditionName}
                    fullWidth
                    style={{ background: "#fcfcfc" }}
                    placeholder="Chọn"
                    options={options}
                    control={control}
                    errors={errors}
                    register={register}
                    // disabled={disabled}
                    required
                    onFieldChange={handleSearchCondition}
                    message={"Vui lòng chọn"}
                    onValueChange={(value) => {
                        // setValue(conditionName, value)
                        handleChangeConditionItem(index, { ...item, [`${fieldName}`]: value }, conditionType)
                    }}
                />
            </Grid>

            <Grid item md={2} xs={12}>
                <Typography>
                    Số lượng yêu cầu  <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                    name={minQuantity}
                    placeholder="Nhập số lượng yêu cầu"
                    size="small"
                    type="number"
                    min={1}
                    variant="outlined"
                    defaultValue=""
                    InputProps={{
                        min: 1
                    }}
                    // disabled={disabled}
                    fullWidth
                    error={errors[`${type}`] && errors[`${type}`][code]?.minQuantity}
                    helperText={errors[`${type}`] && errors[`${type}`][code]?.minQuantity?.message}
                    inputRef={register({
                        required: "Vui lòng nhập số lượng yêu cầu",
                        validate: (value) => {
                            if (value.toString().indexOf(".") >= 0) {
                                return "Vui lòng không nhập số thập phân."
                            }
                        },
                        min: {
                            value: 1,
                            message: "Số lượng yêu cầu tối thiểu là 1"
                        },
                        max: {
                            value: 1000000,
                            message: "Số lượng yêu cầu phải nhỏ hơn hoặc bằng 1,000,000",
                        }
                    })}
                    onChange={(e) => {
                        handleChangeConditionItem(index, { ...item, minQuantity: +e.target?.value || null }, conditionType)
                    }}
                    onKeyDown={(e) => ['e', 'E', '+', '-', '.', ','].includes(e.key) && e.preventDefault()}
                />
            </Grid>



            <Grid item md={2} xs={12}>
                <Typography>
                    Giá trị yêu cầu
                </Typography>

                <NumberFormatCustom
                    control={control}
                    name={minTotalPrice}
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
                        },
                    }}
                    errors={errors}
                    onValueChange={(v) => {
                        //value without dollar signe
                        handleChangeConditionItem(index, {
                            ...item,
                            minTotalPrice: v.floatValue ?? 0
                        }, conditionType)
                    }}
                />
            </Grid>

            <Grid item>
                {/* {!disabled && ( */}
                <Grid container spacing={2} alignItems="center" style={{
                    marginTop: 20
                }}>
                    {
                        listConditionItem.length !== 1 && (
                            <IconButton onClick={() => {
                                handleRemoveConditionItem(index, conditionType)
                            }} color="secondary" style={{ height: "fit-content", marginLeft: 5 }}>
                                <RemoveIcon style={{ fontSize: "22px" }} />
                            </IconButton>
                        )
                    }


                    {index === (listConditionItem.length - 1) && (
                        <IconButton onClick={() => handleAddConditionItem(index, conditionType)} color="primary" style={{ height: "fit-content", marginLeft: 2 }}>
                            <AddIcon style={{ fontSize: "22px" }} />
                        </IconButton>
                    )}


                </Grid>
                {/* )} */}
            </Grid>

            {isDuplicate && getValues(conditionName)?.value && (
                <>
                    <Grid item style={{
                        minWidth: "132px"
                    }}></Grid>

                    <Grid item md={10} xs={12}>
                        <FormHelperText error >Điều kiện bị trùng lặp</FormHelperText>
                    </Grid>
                </>

            )}

        </Grid>
    )
}
