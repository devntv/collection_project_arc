import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Typography,
    Tooltip,
    MenuItem
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import InfoProduct from "./InfoProduct"
import MuiSingleAuto from "@thuocsi/nextjs-components/muiauto/single";
import { getProductClient } from 'client/product'
import MuiMultipleAuto from "@thuocsi/nextjs-components/muiauto/multiple";
import { getSaleCampaignClient } from "client/saleCampaign"
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { formatShortDateTime, formatNumber, SKUStatusText, activeMap } from "components/global";
import router from "next/router";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import MuiSingleCustom from 'components/MuiSingleCustom'
import { rewards, chargeFeeOption } from "components/component/constant";

export default function DialogAddProduct({ data, isOpen, onClose, mapListTime, areaMap }) {
    const toast = useToast();
    const [listProduct, setListProduct] = useState([])
    const [ids, setIds] = useState([])
    const [selectField, setSelectField] = useState(data.saleType === "UNLIMIT" ? "PERCENTAGE" : data.saleType)
    const [selectedProduct, setSelectedProduct] = useState({})

    const convertDataFlashsale = () => {
        let arr = []
        data?.flashSaleTimes?.forEach(item => {
            arr = arr.concat(item?.detail?.map(el => {
                return {
                    value: el.ref,
                    label: (mapListTime[el.code] || el.code) + " - " + formatShortDateTime(item.startTime) + " - " + formatShortDateTime(item.endTime),
                    productIDs: el.productIDs
                }
            }))
        })
        return arr
    }

    const { register, handleSubmit, errors, setValue, watch, control } = useForm({
        mode: "onChange",
        defaultValues: {
            flashSaleTimeRefs: [],
            saleType: data.saleType === "UNLIMIT" ? {
                value: "PERCENTAGE",
                label: "Theo phần trăm",
            } : rewards.find(item => item.value === data.saleType),
            absoluteDiscount: null,
            percentageDiscount: null,
            maxQuantityPerOrder: 0,
            chargeFee: "MARKETPLACE"
        },
    });

    useEffect(() => {
        if (!watch("flashSaleTimeRefs") || !watch("flashSaleTimeRefs")?.length) {
            setIds([])
            setListProduct([])
            return
        }
        let listIds = []
        const mapId = {}
        let number = 0
        watch("flashSaleTimeRefs").forEach(element => {
            if (element.productIDs?.length === 0) number += 1
            listIds = listIds.concat(element.productIDs)
        });

        listIds?.forEach(item => {
            let count = 0
            if (!mapId[item]) count = number + 1
            else count = mapId[item]?.count + 1
            mapId[item] = {
                value: item,
                count
            }
        })

        const flashSaleTime = listIds?.filter(item => {
            if (mapId[item]?.value === item && mapId[item]?.count === watch("flashSaleTimeRefs")?.length) {
                return item
            }
        })

        setIds(flashSaleTime)
        searchSku("", flashSaleTime)
    }, [watch("flashSaleTimeRefs")])

    const searchSku = async (search = "", ids = []) => {
        if (!ids.length && watch("flashSaleTimeRefs")?.find(item => item.productIDs?.length)) {
            setListProduct([])
            return
        }
        const resPrd = ids.length ? await getProductClient().searchProductByIds(ids, search)
            : await getProductClient().getListProduct(0, 100, search)

        let productCodes = []
        let mapProduct = {}
        if (resPrd.status === 'OK') {
            resPrd?.data?.forEach(e => {
                mapProduct[e.code] = e
                productCodes.push(e.code)
            })
        }

        const resSku = await getProductClient().getSkuMainList({
            sellerCodes: "MEDX,MEDX-HN",
            productCodes,
            offset: 0,
            limit: 50
        })

        if (Object.keys(mapProduct).length === 0) {
            setListProduct([])
            return
        }
        const arr = []

        resSku?.data?.forEach(e => {
            let status = ""
            if (!e.isActive) {
                status = activeMap[e.isActive];
            } else if (e.status === "OUT_OF_STOCK" || e.status === "SUSPENDED" || e.status === "GIFT" || e.status === "STOP_PRODUCING") {
                status = SKUStatusText[e.status]
            }
            arr.push({
                label: `${mapProduct[e.productCode]?.productID || ""} - ${e.sellerCode} - ${mapProduct[e.productCode]?.name || ""} ${status ? ` - ${status}` : ""}`,
                value: e.code,
                data: {
                    ...e,
                    ...mapProduct[e.productCode],
                    sku: e.code
                }
            })
        })

        setListProduct(arr)
    }

    const onSubmit = async (formData) => {
        const productStatus = formData?.sku?.data?.status

        formData.sku = formData?.sku?.data?.sku
        formData.flashSaleTimeRefs = formData?.flashSaleTimeRefs?.map(item => item.value)
        formData.maxQuantityPerOrder = +formData?.maxQuantityPerOrder
        if (formData.saleType?.value === "PERCENTAGE") {
            formData.percentageDiscount = +formData?.percentageDiscount || 0
            delete formData.campaignPrice
            delete formData.absoluteDiscount
        } else if (formData.saleType?.value === "ABSOLUTE") {
            formData.absoluteDiscount = +formData?.absoluteDiscount || 0
            delete formData.campaignPrice
            delete formData.percentageDiscount
        } else {
            formData.campaignPrice = +formData?.campaignPrice || 0
            delete formData.absoluteDiscount
            delete formData.percentageDiscount
        }
        formData.quantity = +formData?.quantity
        formData.campaignID = data.campaignID
        formData.campaignCode = data.campaignCode
        formData.saleType = formData.saleType?.value

        const res = await getSaleCampaignClient().createCampaignProduct(formData)
        if (res.status === "OK") {
            toast.success("Thêm sản phẩm thành công")
            setTimeout(() => {
                router.reload()
            }, 1000);
            onClose();
            return
        }

        if (res && res.message) toast.error(res.message)
    }

    return (
        <Dialog onClose={(event, reason) => {
            if (reason !== 'backdropClick') {
                onClose();
            }
        }} aria-labelledby="customized-dialog-title" open={isOpen} fullWidth maxWidth="md">
            <DialogTitle>Thêm sản phẩm vào chương trình KM</DialogTitle>
            <DialogContent dividers>
                <form>
                    <Grid container spacing={6}>
                        {data?.campaignType === "FLASH_SALE" &&
                            <Grid item sm={6}>
                                <Typography color="textPrimary" gutterBottom  >
                                    <strong>Khung giờ bán</strong> <span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <MuiMultipleAuto
                                    options={convertDataFlashsale() || []}
                                    name="flashSaleTimeRefs"
                                    placeholder="Chọn"
                                    control={control}
                                    register={register}
                                    errors={errors}
                                    message="Vui lòng chọn khung giờ bán"
                                    required
                                    onValueChange={() => {
                                        setValue("sku", null)
                                    }}
                                />
                            </Grid>
                        }
                        <Grid item sm={6}>
                            <Typography color="textPrimary" gutterBottom  >
                                <strong>Sản phẩm</strong> <span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <MuiSingleCustom
                                name="sku"
                                fullWidth
                                style={{ background: "white" }}
                                placeholder="Nhập tên sản phẩm"
                                options={listProduct}
                                control={control}
                                errors={errors}
                                disabled={data?.campaignType === "FLASH_SALE" && (!watch("flashSaleTimeRefs") || !watch("flashSaleTimeRefs")?.length)}
                                onFieldChange={(value) => {
                                    return searchSku(value, ids)
                                }}
                                required
                                message="Vui lòng chọn sản phẩm"
                                onValueChange={(value) => {
                                    setValue("sku", value)
                                }}
                                onFieldDisabled={(item) => !item.data.isActive || item.data.status === "OUT_OF_STOCK" || item.data.status === "SUSPENDED" || item.data.status === "GIFT" || item.data.status === "STOP_PRODUCING"}
                            />
                        </Grid>
                    </Grid>
                    {watch("sku")?.data &&
                        <Grid container spacing={3}>
                            <InfoProduct product={watch("sku")?.data} size={12} areaMap={areaMap}></InfoProduct>
                        </Grid>
                    }
                    <Grid container spacing={6}>
                        <Grid item sm={6}>
                            <Typography color="textPrimary" gutterBottom  >
                                <strong>Hình thức khuyến mãi</strong> <span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <MuiSingleAuto
                                id="saleType"
                                name="saleType"
                                placeholder="Chọn hình thức khuyến mãi"
                                options={rewards.filter(item => item.value !== "UNLIMIT")}
                                disabled={data?.saleType !== "UNLIMIT"}
                                control={control}
                                errors={errors}
                                message="Vui lòng chọn hình thức khuyến mãi"
                                onValueChange={(selected) => {
                                    setSelectField(selected?.value)
                                }}
                            />
                        </Grid>

                        <Grid item sm={6}>
                            <Typography color="textPrimary" gutterBottom  >
                                <strong>Bên chịu giá chênh lệch</strong>
                            </Typography>
                            <Controller
                                name="chargeFee"
                                control={control}
                                render={({ onChange, ...field }) => (
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        placeholder="Chọn bên chịu phí"
                                        fullWidth
                                        select
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={onChange}
                                        {...field}
                                    >
                                        {chargeFeeOption.filter(item => item.value !== "SELLER").map(({ value, label }) => (
                                            <MenuItem key={value} value={value}>{label}</MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </Grid>

                    </Grid>

                    <Grid container spacing={6}>
                        {selectField === "PERCENTAGE" ?
                            <Grid item sm={6}>
                                <Typography color="textPrimary" gutterBottom  >
                                    <strong>% Giảm</strong> <span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    fullWidth
                                    id="percentageDiscount"
                                    name="percentageDiscount"
                                    variant="outlined"
                                    size="small"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    type="number"
                                    placeholder="Nhập % giảm"
                                    error={!!errors.percentageDiscount}
                                    helperText={errors.percentageDiscount?.message}
                                    required={selectField === "PERCENTAGE"}
                                    inputRef={register({
                                        validate: (value) => {
                                            setValue("percentageDiscount", value);
                                            if (value > 100) {
                                                return `Phần trăm khuyến mãi phải nhỏ hơn hoặc bằng 100%`;
                                            } else if (value < (data?.reward?.percentageDiscount)) {
                                                return `Phần trăm khuyến mãi phải lớn hơn hoặc bằng ${data?.reward?.percentageDiscount}`;
                                            } else if (value <= 0) {
                                                return "Phần trăm khuyến mãi phải lớn hơn 0";
                                            }
                                        },
                                        required: "Phần trăm khuyến mãi không được để trống",
                                    })}
                                />
                                {data?.reward?.percentageDiscount ?
                                    <Typography>
                                        <span style={{ fontStyle: "italic", fontSize: 14 }}>
                                            {`Phần trăm khuyến mãi phải lớn hơn hoặc bằng ${data?.reward?.percentageDiscount || 0}`}
                                        </span>
                                    </Typography>
                                    : ""
                                }
                            </Grid>
                            : ""}
                        {selectField === "ABSOLUTE" ?
                            <Grid item sm={6}>
                                <Typography color="textPrimary" gutterBottom  >
                                    <strong>Giá trị giảm</strong> <span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    fullWidth
                                    id="absoluteDiscount"
                                    name="absoluteDiscount"
                                    variant="outlined"
                                    size="small"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    type="number"
                                    placeholder="Nhập giá trị giảm"
                                    error={!!errors.absoluteDiscount}
                                    helperText={errors.absoluteDiscount?.message}
                                    required={selectField === "ABSOLUTE"}
                                    inputRef={register({
                                        validate: (value) => {
                                            setValue("absoluteDiscount", value);
                                            if (value < (data?.reward?.absoluteDiscount || 0)) {
                                                return `Giá trị giảm phải lớn hơn hoặc bằng ${formatNumber(data?.reward?.absoluteDiscount) || 0}`;
                                            } else if (value <= 0) {
                                                return "Giá trị giảm phải lớn hơn 0";
                                            }
                                        },
                                        required: "Giá trị giảm không được để trống",
                                    })}
                                />
                                {data?.reward?.absoluteDiscount ?
                                    <Typography>
                                        <span style={{ fontStyle: "italic", fontSize: 14 }}>
                                            {`Giá trị giảm phải lớn hơn hoặc bằng ${formatNumber(data?.reward?.absoluteDiscount) || 0}`}
                                        </span>
                                    </Typography>
                                    : ""
                                }
                            </Grid>
                            : ""}

                        {selectField === "PRICE" ?
                            <Grid item sm={6}>
                                <Typography color="textPrimary" gutterBottom  >
                                    <strong>Giá sản phẩm sau KM</strong> <span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    fullWidth
                                    id="campaignPrice"
                                    name="campaignPrice"
                                    variant="outlined"
                                    size="small"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    type="number"
                                    placeholder="Nhập giá trị sản phẩm sau khuyến mãi"
                                    error={!!errors.campaignPrice}
                                    helperText={errors.campaignPrice?.message}
                                    required={selectField === "PRICE"}
                                    inputRef={register({
                                        validate: (value) => {
                                            setValue("campaignPrice", value);
                                            if (value <= 0) {
                                                return "Giá sản phẩm phải lớn hơn 0";
                                            } else if (value > 1000000000000) {
                                                return "Giá sản phẩm phải không được lớn hơn 1,000,000,000"
                                            }
                                        },
                                        required: "Giá sản phẩm không được để trống",
                                    })}
                                />
                            </Grid>
                            : ""}

                        <Grid item sm={6}>
                            <Typography color="textPrimary" gutterBottom  >
                                <strong>Số lượng bán ra</strong> <span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <TextField
                                fullWidth
                                id="quantity"
                                name="quantity"
                                variant="outlined"
                                size="small"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={!!errors.quantity}
                                helperText={errors.quantity?.message}
                                placeholder="Nhập số lượng bán ra"
                                required
                                inputRef={register({
                                    required: "Số lượng bán ra không được để trống",
                                    min: {
                                        value: 1,
                                        message: "Số lượng bán ra phải lớn hơn 0"
                                    }
                                })}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={6}>
                        <Grid item sm={6}>
                            <Typography color="textPrimary" gutterBottom style={{ display: "flex" }}>
                                <strong>Giới hạn mua</strong> <span style={{ color: 'red' }}>*</span>
                                <Tooltip title={"Số lượng sản phẩm tối đa trên một đơn hàng. Nếu nhập 0 thì tương ứng với 100,000"}>
                                    <HelpOutlineIcon style={{ marginLeft: 8 }} />
                                </Tooltip>
                            </Typography>
                            <TextField
                                fullWidth
                                id="maxQuantityPerOrder"
                                name="maxQuantityPerOrder"
                                variant="outlined"
                                size="small"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                placeholder="Nhập giới hạn mua"
                                required
                                error={!!errors.maxQuantityPerOrder}
                                helperText={errors.maxQuantityPerOrder?.message}
                                inputRef={register({
                                    required: "Giới hạn mua không được để trống",
                                })}
                            />
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="default" onClick={() => onClose()}>
                    Đóng
                </Button>
                <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                    Đồng ý
                </Button>
            </DialogActions>
        </Dialog>
    )
}