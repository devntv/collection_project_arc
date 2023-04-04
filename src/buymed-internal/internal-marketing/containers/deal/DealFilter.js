import { Button, Grid, makeStyles, MenuItem, TextField, Typography } from "@material-ui/core";
import { MuiAutoFuzzy } from "@thuocsi/nextjs-components/muiauto-fuzzy/muiauto-fuzzy";
import MuiMultipleAuto from '@thuocsi/nextjs-components/muiauto/multiple';
import MuiSingleAuto from "@thuocsi/nextjs-components/muiauto/single";
import { MyCardActions } from "@thuocsi/nextjs-components/my-card/my-card";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { getDealClient } from "client/deal";
import { getProductClient } from "client/product";
import { getSellerClient } from "client/seller";
import { ExportCSV } from "components/export-cvs";
import { formatDateTime, formatDatetimeFormType, formatEllipsisText, formatNumber, isValid, parseQ } from "components/global";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useController, useForm } from "react-hook-form";
import { PricingType } from "view-model/deal";

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: "bold",
    },
    textField: {
        background: theme.palette.background.paper,
    },
    multipleAuto: {
        "& > div > .MuiAutocomplete-root": {
            background: theme.palette.background.paper,
        }
    }
}))

/**
 * @param {string} time 
 * @param {"SOD"|"EOD"|undefined} type 
 */
function getDefaultDatetime(time, type) {
    let value = moment(time || undefined);
    switch (type) {
        case "SOD":
            value = value.startOf("day");
            break;
        case "EOD":
            value = value.endOf("day");
            break;
    }
    return formatDatetimeFormType(value);
}

const defaultValue = {
    search: "",
    dealType: "",
    status: "",
    createdTimeFrom: null,
    createdTimeTo: null,
    startTimeFrom: null,
    startTimeTo: null,
    sellerCode: null,
    levelCodes: [],
    locationCodes: [],
    forSku: null,
}


export const DealFilter = (props) => {

    const styles = useStyles();
    const router = useRouter();
    const q = router?.query?.q ? JSON.parse(router?.query?.q) : {}

    const [loading, setLoading] = React.useState(false);
    const fileName = `Danh_Sach_Deal_${new Date().toLocaleString().replace(/[ :]/g, '_').replace(/[,]/g, '')}`;
    const toast = useToast();
    const { selectedRowData, setActionUpdateMulti, setOpenMultiUpdateDialog } = props;

    const getDataByCode = (name, codes) => {
        let dataMap = props.areaMap
        if (name === "levelCodes") {
            dataMap = props.levelMap
        }

        const levels = []
        if (!codes.length) return
        codes.forEach(element => {
            if (dataMap[element]) {
                levels.push({
                    value: element,
                    label: dataMap[element],
                })
            }
        });
        return levels
    }

    const dealForm = useForm({
        mode: "onChange",
        defaultValues: defaultValue,
    })


    const {
        control,
        register,
        handleSubmit,
        errors,
        formState: { isSubmitting },
        reset,
        watch,
        setValue,
    } = dealForm
    const { field: dealTypeField } = useController({ control, name: "dealType" });
    const { field: statusField } = useController({ control, name: "status" });
    const {
        createdTimeFrom,
        createdTimeTo,
        startTimeFrom,
        startTimeTo,
    } = watch([
        "createdTimeFrom",
        "createdTimeTo",
        "startTimeFrom",
        "startTimeTo"
    ]);

    const handleApplyFilter = async (formData) => {
        const data = { ...formData };
        Object.keys(data).forEach(key => {
            if (!data[key]) delete data[key];
            else if ((key === "levelCodes" || key === "locationCodes") && data[key]?.length == 0) delete data[key];
        });
        if (data.forSku?.value) data.forSku = data.forSku?.value;
        if (data.createdTimeFrom) data.createdTimeFrom = moment(data.createdTimeFrom).toISOString();
        if (data.createdTimeTo) data.createdTimeTo = moment(data.createdTimeTo).toISOString();
        if (data.startTimeFrom) data.startTimeFrom = moment(data.startTimeFrom).toISOString();
        if (data.startTimeTo) data.startTimeTo = moment(data.startTimeTo).toISOString();
        if (data.sellerCode?.value && data.sellerCode?.value !== "") data.sellerCode = data.sellerCode?.value
        if (data.levelCodes?.length) data.levelCodes = data.levelCodes.map(item => item.value) || []
        if (data.locationCodes?.length) data.locationCodes = data.locationCodes.map(item => item.value) || []
        
        router?.push({
            pathname: "/marketing/deal",
            query: {
                q: JSON.stringify({
                    ...data
                })
            }
        });
    }

    const handleReset = () => {
        reset();
        router?.push({
            pathname: "/marketing/deal"
        });
    }


    const DealStatus = [
        { label: "Đang hoạt động", value: "ACTIVE" },
        { label: "Không hoạt động", value: "INACTIVE" },
    ]

    const DealType = [
        { label: "Khuyến mãi", value: "DEAL" }
    ]

    const getPriceData = (item) => {
        if (item.pricingType === PricingType.ABSOLUTE || item.pricingType === undefined) return formatNumber(item.price ?? 0)

        if (item.pricingType === PricingType.PERCENTAGE) return `Giảm ${formatNumber(item.discountPercent ?? 0)}%`
    }

    const getData = (resp, seller = {}, product = {}) => {
        return isValid(resp)
            ? resp.data?.map((item) => {
                let skuCode = item.skus?.length > 0 ? item.skus[0].sku : ""
                const dealItem = {}
                dealItem["Nhà bán hàng"] = `${seller[item?.sellerCode]?.name} - ${item?.sellerCode}`
                dealItem["Tên deal"] = item.name
                dealItem["Khu vực áp dụng"] = item.areaCodes?.map(item => props.areaMap[item] ?? item).join(", ")
                dealItem["Đã bán"] = item.quantity
                dealItem["Số lượng"] = item.maxQuantity
                dealItem["Sku"] = item.skus ? item.skus[0].sku : ""
                dealItem["Tên sản phẩm"] = skuCode !== "" ? product[skuCode] : ""
                dealItem["Giá"] = getPriceData(item)
                dealItem["Thời gian áp dụng"] = `Từ ${formatDateTime(item.startTime)} Đến  ${formatDateTime(item.endTime)}`
                dealItem["Thời gian tạo"] = formatDateTime(item.createdTime)
                dealItem["Cập nhật mới nhất"] = formatDateTime(item.lastUpdatedTime)
                dealItem["Thời gian hiển thị"] = formatDateTime(item.readyTime)
                dealItem["Trạng thái"] = item.status === "ACTIVE" ? "Đang hoạt động" : "Không hoạt động"
                return dealItem;
            })
            : [];
    };

    const csvData = async () => {
        setLoading(true);
        const limit = 100;
        const filter = parseQ(router?.query?.q || "{}")
        let dataExport = [];
        const totalResult = await getDealClient().getDealList({ search: "", q: filter, limit: 1, offset: 0, getTotal: true });

        let totalDeals = totalResult?.total || 0
        const totalPageSize = Math.ceil(totalDeals / limit);
        const requestGetAllData = [];

        for (let page = 0; page < totalPageSize; ++page) {
            requestGetAllData.push(
                getDealClient().getDealList({ search: filter.search, q: filter, limit, offset: page * limit, getTotal: true })
            );
        }

        const arrayResult = await Promise.all(requestGetAllData);
        await Promise.all(
            arrayResult.map(async (res) => {
                let sellerCodes = {}
                let skuCodes = {}   
                res?.data?.forEach((item) => {
                    let skuCode = item.skus?.[0]?.sku || null
                    if (item.sellerCode && !sellerCodes[item.sellerCode]) sellerCodes[item.sellerCode] = {}
                    if (skuCode && !skuCodes[skuCode]) skuCodes[skuCode] = {}
                })

                const sellerResp = await getSellerClient().getSellerBySellerCodes(Object.keys(sellerCodes));
                const sellerMap = await sellerResp?.data?.reduce((acc, seller) => {
                    acc[seller.code] = seller;
                    return acc
                }, {}) || {};

                const productMap = {}
                const productResp = await getProductClient().getProductListBySKUs(Object.keys(skuCodes))
                if (productResp.status === "OK") {
                    productResp.data?.forEach(({product, sku}) => {
                        productMap[sku.code] = product.name
                    })
                }
                dataExport = dataExport.concat(getData(res, sellerMap, productMap))
                return getData(res, sellerMap, productMap)
            })
        )

        setLoading(false);
        return dataExport;
    };

    const getSellerBySellerCode = async (code) => {
        try {
            const sellerResp = await getSellerClient().getSellerBySellerCodesClient([code])
            if (sellerResp.status === "OK" && sellerResp.data?.[0]) {
                const _seller = sellerResp.data?.[0] || {}
                setValue("sellerCode", {
                    label: `${formatEllipsisText(_seller?.name || "", 60)} - ${_seller?.code || ""}`,
                    value: _seller?.code || ""
                })
            }
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        const data = { ...defaultValue, ...parseQ(router.query.q), };
        if (data.sellerCode && data.sellerCode !== "") getSellerBySellerCode(data.sellerCode)
        
        if (data.search) setValue("search", data.search)
        if (data.dealType) setValue("dealType", data.dealType)
        if (data.status) setValue("status", data.status)
        if (data.createdTimeFrom) setValue("createdTimeFrom", formatDatetimeFormType(data.createdTimeFrom))
        if (data.createdTimeTo) setValue("createdTimeTo", formatDatetimeFormType(data.createdTimeTo))
        if (data.startTimeFrom) setValue("startTimeFrom", formatDatetimeFormType(data.startTimeFrom))
        if (data.startTimeTo) setValue("startTimeTo", formatDatetimeFormType(data.startTimeTo))
        if (data.levelCodes && data.levelCodes.length) {
            setValue("levelCodes", getDataByCode("levelCodes", data.levelCodes))
        }
        if (data.locationCodes && data.locationCodes.length) {
            setValue("locationCodes", getDataByCode("locationCodes", data.locationCodes))
        }

        if (data.forSku && data.forSku !== dealForm.getValues("forSku")?.value) setValue("forSku", {
            value: data.forSku
        })

    }, [router.query.q])

    const onValueChanged = (name, seletedOptions) => {
        let codeAll = "00"
        if (name === "levelCodes") {
            codeAll = "ALL"
        }
        const itemAll = [{ value: codeAll, label: "Tất cả" }];
        let options = seletedOptions;

        if (seletedOptions.length > 1 && seletedOptions.find((item, index) => item.value === codeAll && index === 0)) {
            setValue(name, seletedOptions.filter(item => item.value !== codeAll))
            return
        } else if (seletedOptions.find((item, index) => item.value === codeAll && index !== 0)) {
            setValue(name, itemAll)
            return
        }
        setValue(name, options);
    }

    return (
        <form onSubmit={handleSubmit(handleApplyFilter)}>
            <MyCardActions>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            Tìm kiếm deal
                        </Typography>
                        <TextField
                            name="search"
                            variant="outlined"
                            size="small"
                            placeholder="Nhập tên deal"
                            fullWidth
                            InputProps={{
                                className: styles.textField
                            }}
                            inputRef={register({
                                setValueAs: (v) => v.trim()
                            })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            Loại deal
                        </Typography>
                        <TextField
                            name="dealType"
                            variant="outlined"
                            size="small"
                            placeholder="Chọn loại deal"
                            fullWidth
                            select
                            InputProps={{
                                className: styles.textField
                            }}
                            SelectProps={{
                                displayEmpty: true,
                            }}
                            {...dealTypeField}
                        >
                            <MenuItem value="">Tất cả loại deal</MenuItem>
                            {DealType.map(({ value, label }) => (
                                <MenuItem key={value} value={value}>{label}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            Trạng thái
                        </Typography>
                        <TextField
                            name="status"
                            variant="outlined"
                            size="small"
                            placeholder="Chọn trạng thái"
                            fullWidth
                            select
                            InputProps={{
                                className: styles.textField
                            }}
                            SelectProps={{
                                displayEmpty: true,
                            }}
                            {...statusField}
                        >
                            <MenuItem value="">Tất cả trạng thái</MenuItem>
                            {DealStatus.map(({ value, label }) => (
                                <MenuItem key={value} value={value}>{label}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            Sản phẩm
                        </Typography>
                        {/* <Autocomplete
                            size="small"
                            className={styles.textField}
                            value={product}
                            options={skuOptions}
                            getOptionLabel={(option) => (option.label ? option.label : "")}
                            noOptionsText={t`deal:product_not_found`}
                            onInputChange={(e, newInputChange) => {
                                handleSearchSkus(newInputChange)
                            }}
                            onChange={(e, newValue) => {
                                setProduct(newValue);
                                setValue("forSku", newValue?.value)
                            }}
                            fullWidth
                            renderInput={(params) => <TextField {...params} placeholder={t`deal:product_placeholder`} variant="outlined" />}
                        /> */}

                        <MuiAutoFuzzy
                            style={{background: "white"}}
                            componentType="MUI_SINGLE"
                            type="SKU"
                            name="forSku"
                            placeholder="Nhập ID/SKU/Tên sản phẩm"
                            labelFormatOption="ID-NAME-SKU"
                            filterForm={dealForm}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            Nhà bán hàng
                        </Typography>

                        <MuiSingleAuto
                            name="sellerCode"
                            control={control}
                            errors={errors}
                            options={props.sellerOpts}
                            placeholder="Nhập mã hoặc tên nhà bán hàng"
                            style={{ background: "white" }}
                        />
                    </Grid>


                    
                    <Grid container item xs={12} sm={6} md={4} lg={4}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            Thời gian áp dụng
                        </Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="startTimeFrom"
                                    name="startTimeFrom"
                                    variant="outlined"
                                    size="small"
                                    placeholder="Thời gian áp dụng từ"
                                    fullWidth
                                    type="datetime-local"
                                    InputProps={{
                                        className: styles.textField
                                    }}
                                    error={errors.startTimeFrom}
                                    helperText={errors.startTimeFrom?.message}
                                    inputRef={register({
                                        validate: (v) => {
                                            if (moment(v).isAfter(startTimeTo))
                                                return "Thời gian áp dụng từ phải trước Thời gian áp dụng đến"
                                        }
                                    })}
                                    onFocus={(e) => {
                                        if (!e.target.value) {
                                            setValue(
                                                "startTimeFrom",
                                                getDefaultDatetime(e.target.value, "SOD"),
                                                { shouldDirty: true, shouldValidate: true }
                                            )
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="startTimeTo"
                                    name="startTimeTo"
                                    variant="outlined"
                                    size="small"
                                    placeholder="Thời gian áp dụng đến"
                                    fullWidth
                                    type="datetime-local"
                                    InputProps={{
                                        className: styles.textField
                                    }}
                                    error={errors.startTimeTo}
                                    helperText={errors.startTimeTo?.message}
                                    inputRef={register({
                                        validate: (v) => {
                                            if (moment(v).isBefore(startTimeFrom))
                                                return "Thời gian áp dụng đến phải sau Thời gian áp dụng từ"
                                        }
                                    })}
                                    onFocus={(e) => {
                                        if (!e.target.value) {
                                            setValue(
                                                "startTimeTo",
                                                getDefaultDatetime(e.target.value, "EOD"),
                                                { shouldDirty: true, shouldValidate: true }
                                            )
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container item xs={12} sm={6} md={4} lg={4}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            Thời gian tạo
                        </Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="createdTimeFrom"
                                    name="createdTimeFrom"
                                    variant="outlined"
                                    size="small"
                                    placeholder="Thời gian tạo từ"
                                    fullWidth
                                    type="datetime-local"
                                    InputProps={{
                                        className: styles.textField
                                    }}
                                    error={errors.createdTimeFrom}
                                    helperText={errors.createdTimeFrom?.message}
                                    inputRef={register({
                                        validate: (v) => {
                                            if (moment(v).isAfter(createdTimeTo))
                                                return "Thời gian tạo từ phải trước Thời gian tạo đến"
                                        }
                                    })}
                                    onFocus={(e) => {
                                        if (!e.target.value) {
                                            setValue(
                                                "createdTimeFrom",
                                                getDefaultDatetime(e.target.value, "SOD"),
                                                { shouldDirty: true, shouldValidate: true }
                                            )
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="createdTimeTo"
                                    name="createdTimeTo"
                                    variant="outlined"
                                    size="small"
                                    placeholder="Thời gian tạo đến"
                                    fullWidth
                                    type="datetime-local"
                                    InputProps={{
                                        className: styles.textField
                                    }}
                                    error={errors.createdTimeTo}
                                    helperText={errors.createdTimeTo?.message}
                                    inputRef={register({
                                        validate: (v) => {
                                            if (moment(v).isBefore(createdTimeFrom))
                                                return "Thời gian tạo đến phải sau Thời gian tạo từ"
                                        }
                                    })}
                                    onFocus={(e) => {
                                        if (!e.target.value) {
                                            setValue(
                                                "createdTimeTo",
                                                getDefaultDatetime(e.target.value, "EOD"),
                                                { shouldDirty: true, shouldValidate: true }
                                            )
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={4} className={styles.multipleAuto}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            Đối tượng khách hàng áp dụng
                        </Typography>
                        <MuiMultipleAuto
                            options={props.levelOptions}
                            name='levelCodes'
                            placeholder="Chọn"
                            register={register}
                            control={control}
                            errors={errors}
                            onValueChange={(selected) => onValueChanged('levelCodes', selected)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} className={styles.multipleAuto}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            Khu vực áp dụng
                        </Typography>
                        <MuiMultipleAuto
                            options={props.areaOptions}
                            name='locationCodes'
                            placeholder="Chọn"
                            register={register}
                            control={control}
                            errors={errors}
                            onValueChange={(selected) => onValueChanged('locationCodes', selected)}
                        />
                    </Grid>
                    <Grid item container xs={12} justify="flex-end" spacing={1}>
                        {selectedRowData.length > 0 && (
                            <Grid item  style={{gap: '8px', display: 'flex'}}>
                                <Button 
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        setActionUpdateMulti(DealStatus[0].value); setOpenMultiUpdateDialog(true)
                                    }}
                                >
                                    Bật Deal đã chọn
                                </Button>
                                <Button  
                                    variant="contained"
                                    style={{background: '#ff0000', color: '#fff'}}
                                    onClick={() => {
                                        setActionUpdateMulti(DealStatus[1].value); setOpenMultiUpdateDialog(true)
                                    }}
                                >
                                    Tắt Deal đã chọn
                                </Button>
                            </Grid>
                        )}
                        <Grid item>
                            <ExportCSV csvData={csvData} fileName={fileName} loading={loading} color={"primary"} text={"Xuất file"} />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="default"
                                disabled={isSubmitting}
                                onClick={handleReset}
                            >
                                Làm mới
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Áp dụng
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </MyCardActions>
        </form>
    )
}