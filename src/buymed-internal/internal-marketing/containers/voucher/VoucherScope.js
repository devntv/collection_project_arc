import { TextField, Typography, Grid, MenuItem, FormHelperText } from '@material-ui/core'
import MuiMultipleAuto from '@thuocsi/nextjs-components/muiauto/multiple'
import { MyCard, MyCardContent, MyCardHeader } from '@thuocsi/nextjs-components/my-card/my-card'
import { getAreaClient } from 'client/area'
import { getCustomerClient } from 'client/customer'
import { getMasterDataClient } from 'client/master-data'
import { CustomerApplyTypes } from 'components/promotion-voucher/constant'
import React from 'react'
import { useState, useEffect } from 'react'
import { customerScopeOpts } from 'view-model/customer'
import { Controller } from 'react-hook-form';

export async function getScopeData(ctx) {
    let levelOpts = []
    const levelResp = await getCustomerClient(ctx, {}).getLevel(JSON.stringify({ status: "ON" }))
    if (levelResp.status === "OK") {
        levelResp.data.forEach(item => {
            levelOpts.push({
                label: item.name ?? "",
                value: item.code ?? ""
            })
        })
    }

    let areaOpts = []
    const areaResp = await getAreaClient(ctx, {}).getListArea({ value: "" })
    if (areaResp.status === "OK") {
        areaResp.data?.forEach(item => {
            if (item.scope === "SALE_REGION") {
                areaOpts.push({
                    label: item.name ?? "",
                    value: item.code ?? ""
                })
            }
        })
    }

    const provinceResp = await getMasterDataClient(ctx, {}).getProvince(0, 100, "")
    if (provinceResp.status === "OK") {
        provinceResp.data?.forEach(item => {
            areaOpts.push({
                label: item.name ?? "",
                value: item.code ?? ""
            })
        })
    }


    return {
        areaOpts,
        levelOpts

    }
}

export function handleScope(data, levelOpts, areaOpts, customerScopeOpts) {
    if (data.scopes) {
        data.scopes?.forEach(item => {
            switch (item.type) {
                case "CUSTOMER_LEVEL":
                    //Customer level
                    if (item.quantityType == "ALL") {
                        data.customerLevelCodes = [{ value: "all", label: "Tất cả" }]
                    } else {
                        let arr = [];

                        levelOpts.forEach(level => {
                            if (item.customerLevelCodes.includes(level.value)) {
                                arr.push(level)
                            }
                        })

                        data.customerLevelCodes = arr
                    }
                    break;

                case "AREA":
                    //Area
                    if (item.quantityType == "ALL") {
                        data.areaCodes = [{ value: "all", label: "Tất cả" }]
                    } else {
                        let arr = [];

                        areaOpts.forEach(area => {
                            if (item.areaCodes?.includes(area.value)) {
                                arr.push(area)
                            }
                        })

                        data.areaCodes = arr
                    }
                    break;

                case "CUSTOMER_SCOPE":
                    //Area
                    if (item.quantityType == "ALL") {
                        data.customerScopes = [{ value: "all", label: "Tất cả" }]
                    } else {
                        let arr = [];

                        customerScopeOpts.forEach(area => {
                            if (item.customerScopes?.includes(area.value)) {
                                arr.push(area)
                            }
                        })

                        data.customerScopes = arr
                    }
                    break;

                default:
                    break;
            }
        })
    }
    return data
}

export default function VoucherScope(props) {

    const {
        voucher,
        promotion,
        control,
        errors,
        setValue,
        getValues,
        clearErrors,
        register,
        isEdit,
        levelOpts = [],
        areaOpts = []
    } = props

    const defaultLevelOpts = [{ value: "all", label: "Tất cả" }, ...levelOpts]
    const defaultAreaOpts = [{ value: "all", label: "Tất cả" }, ...areaOpts]
    const defautlScopeOpts = [{ value: "all", label: "Tất cả" }, ...customerScopeOpts]


    const [levelOptions, setLevelOptions] = useState(defaultLevelOpts)
    const [areaOptions, setAreaOptions] = useState(defaultAreaOpts)
    const [scopeOptions, setScopeOptions] = useState(defautlScopeOpts)

    const checkSelectedAll = (name, selected) => {
        
        if (selected.length > 1 && selected.find((item, index) => item.value === "all" && index === 0)) {
            setValue(name, selected.filter(item => item.value !== "all"))
        } else if (selected.find((item, index) => item.value === "all" && index !== 0)) {
            setValue(name, [{ value: "all", label: "Tất cả" }])
        } else if (selected.length === 0) {
            setValue(name, [{ value: "all", label: "Tất cả" }])
        }
        else setValue(name, selected)
    }

    useEffect(() => {
        if (promotion.promotionId) {
            promotion.scopes?.forEach(item => {
                switch (item.type) {
                    case "CUSTOMER_LEVEL":
                        if (item.quantityType !== "ALL") {
                            setLevelOptions(defaultLevelOpts.filter(level => item.customerLevelCodes?.includes(level.value)))
                        }
                        break;

                    case "AREA":
                        if (item.quantityType !== "ALL") {
                            setAreaOptions(defaultAreaOpts.filter(area => item.areaCodes?.includes(area.value)))
                        }
                        break;

                    case "CUSTOMER_SCOPE":
                        if (item.quantityType !== "ALL") {
                            setScopeOptions(defautlScopeOpts.filter(scope => item.customerScopes?.includes(scope.value)))
                        }
                        break;

                    default:
                        break;
                }
            })
        } else {
            setLevelOptions(defaultLevelOpts)
            setAreaOptions(defaultAreaOpts)
            setScopeOptions(defautlScopeOpts)
        }
    }, [promotion])

    return (
        <MyCard style={{ height: "calc(100% - 20px)" }}>
            <MyCardHeader title="Cài đặt khách hàng" style={{
                textTransform: "uppercase"
            }} small />

            <MyCardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={6}>
                        <Typography>
                            Cấp bậc khách hàng <span style={{ color: "red" }}>*</span>
                        </Typography>

                        <MuiMultipleAuto
                            options={levelOptions}
                            name="customerLevelCodes"
                            placeholder="Chọn"
                            control={control}
                            register={register}
                            errors={errors}
                            message="Vui lòng chọn"
                            onValueChange={(selected) => {
                                if (levelOptions.length === defaultLevelOpts.length) checkSelectedAll("customerLevelCodes", selected)
                            }}
                            required={levelOptions.length !== defaultLevelOpts.length}
                        />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <Typography>
                            Vai trò khách hàng <span style={{ color: "red" }}>*</span>
                        </Typography>
                        <MuiMultipleAuto
                            options={scopeOptions}
                            name="customerScopes"
                            placeholder="Chọn"
                            control={control}
                            register={register}
                            errors={errors}
                            message="Vui lòng chọn"
                            onValueChange={(selected) => {
                                if (scopeOptions.length === defautlScopeOpts.length) checkSelectedAll("customerScopes", selected)
                            }}
                            required={scopeOptions.length !== defautlScopeOpts.length}
                        // disabled={disabled}
                        />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <Typography>
                            Khu vực áp dụng <span style={{ color: "red" }}>*</span>
                        </Typography>
                        <MuiMultipleAuto
                            options={areaOptions}
                            name="areaCodes"
                            placeholder="Chọn"
                            control={control}
                            register={register}
                            errors={errors}
                            message="Vui lòng chọn"
                            onValueChange={(selected) => {
                                if (areaOptions.length === defaultAreaOpts.length) checkSelectedAll("areaCodes", selected)
                            }}
                            required={areaOptions.length !== defaultAreaOpts.length}
                        // disabled={disabled}
                        />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <Typography>
                            Lựa chọn cài đặt <span style={{ color: "red" }}>*</span>
                        </Typography>

                        <Controller
                            control={control}
                            name="customerApplyType"
                            render={({ onChange, ...props }) => (
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    InputProps={{
                                        shrink: true,
                                        // readOnly: (isEdit && voucher.customerApplyType === "MANY")
                                    }}
                                    error={!!errors.customerApplyType}
                                    helperText={errors.customerApplyType?.message}
                                    fullWidth
                                    select
                                    onChange={(e) => {
                                        onChange(e.target?.value)
                                    }}
                                    {...props}
                                >
                                    {CustomerApplyTypes.map((item) => (
                                        <MenuItem key={item.value}
                                            value={item.value}>{item.label}</MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                        {getValues("customerApplyType") === "MANY" && (!isEdit || voucher.customerApplyType === "ALL") && (
                            <FormHelperText>Vui lòng cài đặt khách hàng được sử dụng sau khi lưu thông tin mã</FormHelperText>
                        )}
                        
                    </Grid>

                </Grid>
            </MyCardContent>
        </MyCard>
    )
}
