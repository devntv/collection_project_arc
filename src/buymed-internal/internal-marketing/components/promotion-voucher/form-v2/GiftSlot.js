import { Typography, Grid, TextField, Button } from '@material-ui/core'
import MuiSingleAuto from '@thuocsi/nextjs-components/muiauto/single'
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from 'react'
import { getProductClient } from 'client/product';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core'
import { SkuStatus, SkuStatusList } from 'view-model/sku';
import MuiSingleCustom from 'components/MuiSingleCustom';

export default function GiftSlot(props) {

    const {
        disabled,
        listGifts,
        item,
        index,
        handleAddGift,
        handleRemoveGift,
        handleChangeGift,
        isSubmitting,
        defaultOptions = [],
        hookForm
    } = props

    const [listProduct, setListProduct] = useState(defaultOptions)
    const [selectedCodes, setSelectedCodes] = useState([])

    async function searchGiftList(text = "") {
        const client = getProductClient()
        const searchResp = await client.searchComponentFuzzy({
            type: "SKU",
            offset: 0,
            limit: 30,
            text,
            filter: {
                isActive: true,
                statusIn: SkuStatusList.filter(status => ![SkuStatus.OUT_OF_STOCK, SkuStatus.SUSPENDED].includes(status)),
                isCombo: false,
                sellerType: "INTERNAL"
            }
        });
        if (searchResp.status === "OK") {
            const newList = searchResp.data?.map(({ product, skuItem }) => ({
                value: skuItem.sku,
                code: skuItem.sku,
                label: `${skuItem.productID} - ${product.name} (${skuItem.sku})`
            }))
            const _newList = [...new Map(newList.map(item => [item["value"], item])).values()]
            
            return _newList?.filter(({ value }) => selectedCodes.indexOf(value) === -1)
        }
        return []
    }


    const { control, errors, register, getValues, setValue, handleSubmit, clearErrors } = hookForm

    let code = item.code

    useEffect(() => {
        setListProduct(defaultOptions)
    }, [defaultOptions])

    useEffect(() => {
        let newListCodes = []
        listGifts?.forEach(item => {
            if (item.sku?.value) newListCodes.push(item.sku?.value)
        })

        setSelectedCodes(newListCodes)

        let newList = [...defaultOptions]?.filter(({ value }) => newListCodes.indexOf(value) === -1)
        setListProduct(newList)

    }, [listGifts])

    useEffect(() => {
        setValue(`gifts[${code}][sku]`, item.sku)
        setValue(`gifts[${code}][quantity]`, item.quantity)
    }, [item])

    return (
        <Grid item container spacing={2} xs={12}>
            <Grid item md={4} xs={12}>
                <Typography>
                    Sản phẩm tặng <span style={{ color: "red" }}>*</span>
                </Typography>

                <MuiSingleCustom
                    name={`gifts[${code}][sku]`}
                    fullWidth
                    // disabled={disabled}
                    filterOptions={(x) => x}
                    style={{ background: "white" }}
                    placeholder="Nhập tên sản phẩm"
                    options={listProduct}
                    control={control}
                    errors={errors}
                    required
                    onFieldChange={searchGiftList}
                    message={"Vui lòng chọn sản phẩm tặng"}
                    onValueChange={(value) => {
                        handleChangeGift(index, { ...item, sku: value })
                    }}
                />
            </Grid>

            <Grid item md={2} xs={12}>
                <Typography>
                    Số lượng tặng <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                    name={`gifts[${code}][quantity]`}
                    placeholder="Nhập số lượng tặng"
                    size="small"
                    type="number"
                    min={1}
                    variant="outlined"
                    defaultValue=""
                    helperText={!!errors[`gifts`] && errors[`gifts`][code]?.quantity?.message}
                    InputProps={{
                        // readOnly: disabled,
                        min: 1
                    }}
                    fullWidth
                    error={!!errors[`gifts`] && errors[`gifts`][code]?.quantity}
                    inputRef={register({
                        required: "Vui lòng nhập số lượng tặng",
                        validate: (value) => {
                            if (value.toString().indexOf(".") >= 0) {
                                return "Vui lòng không nhập số thập phân."
                            }
                        },
                        min: {
                            value: 1,
                            message: "Số lượng tặng tối thiểu là 1"
                        },
                        max: {
                            value: 1000000,
                            message: "Số lượng tặng phải nhỏ hơn hoặc bằng 1,000,000",
                        }
                    })}
                    onChange={(e) => {
                        handleChangeGift(index, { ...item, quantity: e.target?.value })
                    }}
                    onKeyDown={(e) => ['e', 'E', '+', '-', ',', '.'].includes(e.key) && e.preventDefault()}
                />
            </Grid>

            <Grid item md={2} xs={12}>
                {/* {!disabled && ( */}
                <Grid container spacing={2} alignItems="center" style={{
                    marginTop: 60
                }}>
                    {
                        listGifts.length !== 1 && (
                            <IconButton onClick={() => {
                                handleRemoveGift(index)
                            }} color="secondary" style={{ height: "fit-content", marginLeft: 8 }}>
                                <RemoveIcon fontSize='12px' />
                            </IconButton>
                        )
                    }

                    {index === (listGifts.length - 1) && (
                        <IconButton onClick={() => handleAddGift(index)} color="primary" style={{ height: "fit-content", marginLeft: 8 }}>
                            <AddIcon fontSize='12px' />
                        </IconButton>
                    )}
                </Grid>
                {/* )} */}

            </Grid>

        </Grid>
    )
}
