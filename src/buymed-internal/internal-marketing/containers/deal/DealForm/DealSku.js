import {
    Button,
    Grid,
    Hidden,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Box,
    CircularProgress,
    Tooltip,
    MenuItem,
    FormControl,
    FormControlLabel,
    Checkbox,
    makeStyles
} from "@material-ui/core";
import { Controller, useController, useForm, useFormContext } from "react-hook-form";
import {
    MyCard,
    MyCardContent,
    MyCardHeader,
} from "@thuocsi/nextjs-components/my-card/my-card";
import { getProductClient } from "client/product";
import { SkuType } from "view-model/sku";
import { unknownErrorText } from "components/commonErrors";
import { DealType, DealValidation, SkuStatus, SkuStatusLabel } from "view-model/deal";
import { formatNumber } from "components/global";
import React, { useEffect, useState } from "react";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { AddCircleOutline, Delete as DeleteIcon } from "@material-ui/icons";
import MuiMultipleAuto from "@thuocsi/nextjs-components/muiauto/multiple";
import { getMasterDataClient } from "client/master-data";
import MuiSingleAuto from "components/MuiSingleCustom/custom-single";
import styles from './detail.module.css'
import clsx from "clsx"
import SkuDataItem from "./SkuDataItem";
import { v4 as uuidv4 } from 'uuid';
import { useIsFirstRender } from "utils/ReactFC";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const defaultValuesSkuForm = {
    pricing: null,
    quantity: 1,
};

function InfoLine({ label, val, isActive, type, skuInfo }) {
    return <Box className={styles.infoLine}>
        {type === "code" &&
            <Tooltip title={
                <React.Fragment>
                    <span>
                        Hiển thị: {skuInfo.isActive ? "Bật" : "Tắt"}
                    </span>
                    <br />
                    <span>
                        Trạng thái: {SkuStatusLabel[skuInfo.status] ?? "Không xác định"}
                    </span>
                </React.Fragment>
            }>
                <span className={clsx(styles.circle, isActive ? styles.active : isActive === false ? styles.inactive : styles.normal)}></span>
            </Tooltip>
        }
        <span className={type === "code" ? styles.title : styles.label}>{label}</span>
        {type === "location" ?
            <Tooltip title={val}>
                <span className={styles.valueLocation}>{val}</span>
            </Tooltip>
            :
            type !== "code" ? <span className={styles.value}>{val}</span> : ""
        }
    </Box>
}

const useStyles = makeStyles({
    label: {
        "& span.MuiFormControlLabel-label.Mui-disabled": {
            color: "black"
        }
    },
});

function DealSku(props) {
    const classes = useStyles();

    const { isLateUpdate, isUpdate, deal, areaMap, searchSkus = [] } = props;
    const toast = useToast();
    const dealForm = useFormContext();

    useController({ control: dealForm.control, name: "sellerCode" });
    const { dealType, sellerCode: dealSellerCode, skus, areaCodes } = dealForm.watch([
        "dealType",
        "sellerCode",
        "skus",
        "imageUrls",
        "areaCodes"
    ]);
    useController({
        name: "imageUrls",
        control: dealForm.control,
        rules: dealType === DealType.COMBO ? DealValidation.imageUrls.combo : {},
        defaultValue: props.defaultValues.imageUrls,
    });

    const isFirstRender = useIsFirstRender()
    const [listUpdateStatus, setListUpdateStatus] = useState(isUpdate ? (deal?.autoUpdateDataSku || []) : [])
    const [provinces, setProvinces] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [skuItems, setSkuItems] = useState(isUpdate ? (deal.skus.length && deal.skus[0].skuItems?.length ? deal.skus[0].skuItems : []) : []);
    const [skuItemOpts, setSkuItemOpts] = useState([])

    const [skuOptions, setSkuOptions] = useState(props.skuOptions ?? []);
    const [skuOptionMap, setSkuOptionMap] = useState(
        props.deal?.skus?.reduce((acc, cur) => {
            acc[cur.sku] = true;
            return acc;
        }, {}) ?? {}
    );
    const skuForm = useForm({
        defaultValues:
            isUpdate && props.deal.dealType === DealType.DEAL
                ? {
                    pricing: {
                        value: props.deal.skus[0].sku,
                        label: props.deal.skus[0].label,
                        sku: props.deal.skus[0],
                        sellerCode: props.deal.skus[0].sellerCode,
                    },
                    quantity: props.deal.skus[0].quantity,
                }
                : defaultValuesSkuForm,
        mode: "onChange",
    });

    useEffect(() => {
        (async () => {
            const provinceResp = await getMasterDataClient().getProvinceFromClient(0, 1000, "", false)
            const provincesMap = provinceResp.data?.reduce((acc, { code, name }) => {
                acc[code] = { value: code, label: name };
                return acc;
            }, {}) ?? {};
            provincesMap["00"] = { label: "Toàn quốc", value: "00" };
            let comboLocations = dealForm.getValues("comboLocationCodes") ?? ["00"];
            comboLocations = comboLocations?.map(code => provincesMap[code] ?? { code, label: code }) ?? [];
            dealForm.setValue("comboLocationCodes", comboLocations, { shouldDirty: false, shouldValidate: false });
            setProvinces(Object.values(provincesMap));
        })()
    }, [])
    useEffect(() => {
        if (dealType === DealType.COMBO) {
            setSkuOptions(
                props.skuOptions?.filter(({ sku }) => sku.type !== SkuType.COMBO) ?? []
            );
        } else {
            setSkuOptions(props.skuOptions ?? []);
        }
    }, [dealType, props.skuOptions]);

    useEffect(() => {
        if (dealForm.formState.isSubmitting) {
            if (!skuForm.getValues("pricing")?.value) skuForm.setValue("pricing", skuForm.getValues("pricing"), {
                shouldValidate: true
            })
        }
    }, [dealForm.formState.isSubmitting])

    const handleSearchSkus = async (text = "") => {
        if (text !== "") {
            try {
                const areaValues = areaCodes?.map(item => item.value) || []
                if (areaValues.length === 0 || areaValues?.find(item => item === "ALL")) {
                    return await searchSkus(text, dealType === DealType.COMBO, "")
                }
                return await searchSkus(text, dealType === DealType.COMBO, areaValues);
            } catch (e) {
                toast.error(e.message);
            }
        }
        return skuOptions
    };

    const handleAddSku = async (formData) => {
        try {
            console.log(formData)
            setIsLoading(true)
            if (formData.pricing?.skuItems?.length) {
                const skuItemCodes = formData.pricing.skuItems.map(item => item.itemCode)
                const respItem = await getProductClient().getSkuItemList({ itemCodes: skuItemCodes })

                if (respItem.status === "OK") {
                    const skuItemMap = {}
                    respItem.data?.forEach(element => {
                        skuItemMap[element.itemCode] = element.retailPriceValue || 0
                    });
                    formData.pricing.skuItems = formData.pricing.skuItems?.map(element => {
                        if (skuItemMap[element.itemCode]) {
                            element.retailPriceValue = skuItemMap[element.itemCode] || 0
                        }
                        return element
                    });
                }
            }

            setSkuItems(formData.pricing?.skuItems || [])

            const {
                pricing: { value: sku, label, sellerCode, product },
                quantity,
            } = formData;
            if (dealType === DealType.COMBO) {
                if (!dealSellerCode) {
                    dealForm.setValue("sellerCode", sellerCode, { shouldDirty: true });
                } else {
                    if (sellerCode !== dealSellerCode)
                        throw new Error("Vui lòng chọn sản phẩm cùng nhà bán hàng");
                }
                dealForm.setValue("skus", [...skus, { sku, label, sellerCode, quantity, skuItems: formData.pricing.skuItems || [] }], { shouldDirty: true });
                skuForm.reset({
                    pricing: null,
                    quantity: 0,
                });
                setSkuOptionMap({ ...skuOptionMap, [sku]: true });
                // Remove the option in Autocomplete
                setSkuOptions(skuOptions.filter((option) => option.sku !== sku));
            } else {
                dealForm.setValue("skus", [{ sku, label, sellerCode, quantity: 1, skuItems: formData.pricing.skuItems || [] }], { shouldDirty: true });
                setSkuOptionMap({ [sku]: true });
                dealForm.setValue("name", product?.name, { shouldValidate: true, shouldDirty: true });
            }
            setIsLoading(false)
        } catch (e) {
            toast.error(e.message || unknownErrorText);
            setIsLoading(false)
        }
    };

    const handleChangeSku = async (sku) => {
        setListUpdateStatus([])
        if (!sku?.value) {
            setSkuItems([])
            dealForm.setValue("skus", []);
            return
        }
        handleAddSku(skuForm.getValues())
    }

    const handleRemoveSku = async (sku) => {
        setListUpdateStatus([])
        const arr = [...skus];
        const idx = arr.findIndex((item) => item.sku === sku);
        const deleted = arr.splice(idx, 1)?.[0] ?? {};
        dealForm.setValue("skus", arr, { shouldDirty: true });
        if (arr.length === 0)
            dealForm.setValue("sellerCode", null, { shouldDirty: true });
        if (dealType === DealType.COMBO) {
            setSkuOptionMap({ ...skuOptionMap, [sku]: false });
        } else {
            setSkuOptionMap({ [sku]: false });
        }
        // Re-add the option in Autocomplete
        setSkuOptions([
            ...skuOptions,
            {
                label: deleted.label,
                sellerCode: deleted.sellerCode,
                sku: deleted.sku,
                value: deleted.sku,
            },
        ]);
    };

    const addUpdateStatus = () => {
        setListUpdateStatus([...listUpdateStatus, { id: uuidv4(), skuItemCode: null, nextStatus: "OUT_OF_STOCK" }])
    }

    const removeUpdateStatus = (id) => {
        const temp = listUpdateStatus.filter((item) => item.id !== id) ?? []
        setListUpdateStatus([...temp])
    }

    const handleChangeUpdateStatus = (data, id) => {
        const newList = [...listUpdateStatus];
        let indexFound = newList.findIndex(item => item.id === id);
        if (indexFound !== -1) {
            newList[indexFound] = data;
        }
        setListUpdateStatus(newList)
    }

    useEffect(() => {
        if (isUpdate) {
            setSkuItems(deal.skus.length && deal.skus[0].skuItems?.length ? deal.skus[0].skuItems : [])
        }
    }, [deal])

    useEffect(() => {
        setSkuItemOpts(skuItems?.map(item => ({ label: item.itemCode, value: item.itemCode })))
    }, [skuItems])

    useEffect(() => {
        if (!dealForm.getValues("autoUpdateDataSku")) dealForm.register("autoUpdateDataSku")
        if (!isFirstRender) dealForm.setValue("autoUpdateDataSku", listUpdateStatus, {
            shouldDirty: true
        })
    }, [listUpdateStatus])

    return (
        <MyCard>
            <MyCardHeader title="Cài đặt sản phẩm" small />
            <MyCardContent>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        {dealType === DealType.COMBO && (
                            <Grid item xs={12} md={6}>
                                <MuiMultipleAuto
                                    name="comboLocationCodes"
                                    label="Chọn nơi bán"
                                    control={dealForm.control}
                                    errors={dealForm.errors}
                                    options={provinces}
                                    disabled={isUpdate}
                                />
                            </Grid>
                        )}
                        <Grid container spacing={3} item>
                            {dealType === DealType.COMBO && (
                                <Table size="small">
                                    <colgroup>
                                        <col width="70%" />
                                        <col width="20%" />
                                        <col width="10%" />
                                    </colgroup>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>sku</TableCell>
                                            <TableCell align="center">Số lượng</TableCell>
                                            <Hidden xsUp={isUpdate}>
                                                <TableCell align="center">Thao tác</TableCell>
                                            </Hidden>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {skus?.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <b>{item.sku}</b> - {item.label}
                                                </TableCell>
                                                <TableCell align="center">{item.quantity}</TableCell>
                                                <Hidden xsUp={isUpdate}>
                                                    <TableCell align="center">
                                                        <IconButton
                                                            onClick={() => handleRemoveSku(item.sku)}
                                                            disabled={isLateUpdate}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </Hidden>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter>
                                        <Hidden xsUp={isUpdate}>
                                            <TableRow style={{ verticalAlign: "top" }}>
                                                <TableCell>
                                                    <MuiSingleAuto
                                                        name="pricing"
                                                        options={skuOptions}
                                                        placeholder="Tìm kiếm SKU"
                                                        required
                                                        control={skuForm.control}
                                                        errors={skuForm.errors}
                                                        message={skuForm.errors.pricing?.message}
                                                        onFieldChange={handleSearchSkus}
                                                        disabled={isLateUpdate}

                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        name="quantity"
                                                        variant="outlined"
                                                        size="small"
                                                        type="number"
                                                        fullWidth
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        InputProps={{
                                                            readOnly: isLateUpdate,
                                                        }}
                                                        inputProps={{
                                                            min: 1,
                                                        }}
                                                        required
                                                        error={!!skuForm.errors.quantity}
                                                        helperText={skuForm.errors.quantity?.message}
                                                        inputRef={skuForm.register({
                                                            ...DealValidation.skus.quantity,
                                                            valueAsNumber: true,
                                                        })}
                                                    />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={skuForm.handleSubmit(handleAddSku)}
                                                    >
                                                        Thêm
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </Hidden>
                                    </TableFooter>
                                </Table>
                            )}
                        </Grid>

                        <Grid container spacing={3} item>
                            <Grid item xs={12}>
                                {dealType === DealType.DEAL && (
                                    <React.Fragment>
                                        <Grid container item xs={12} spacing={3}>
                                            <Grid item xs={6}>
                                                <br />
                                                <MuiSingleAuto
                                                    name="pricing"
                                                    options={skuOptions}
                                                    label="sku"
                                                    placeholder="Tìm kiếm SKU"
                                                    required
                                                    control={skuForm.control}
                                                    errors={skuForm.errors}
                                                    onFieldChange={handleSearchSkus}
                                                    onValueChange={handleChangeSku}
                                                    disabled={isUpdate}
                                                    fullWidth
                                                    message="Vui lòng chọn sku."
                                                    onFieldDisabled={(item) => !item.isActive}
                                                />
                                            </Grid>
                                        </Grid>
                                        <br />

                                        {skuForm.getValues("pricing") && skuItems.length ? <Typography>Danh sách sku con:</Typography> : ""}
                                        <Grid container item xs={12} spacing={3}>
                                            {isLoading ?
                                                <Grid container justifyContent="center" xs={12}>
                                                    <CircularProgress />
                                                </Grid>
                                                :
                                                skuForm.getValues("pricing") && skuItems.length ?
                                                    skuItems.map((row) =>
                                                        <Grid container item sm={12} md={6} lg={3}>
                                                            <MyCard style={{ width: "100%" }}>
                                                                <MyCardContent>
                                                                    <InfoLine type="code" label={row.itemCode} val="" isActive={(row.status === SkuStatus.NORMAL || row.status === SkuStatus.LIMIT) && row.isActive} skuInfo={row}></InfoLine>
                                                                    <InfoLine label="Giá" val={formatNumber(row.retailPriceValue || 0)}></InfoLine>
                                                                    <InfoLine type="location" label="Khu vực áp dụng" val={row.locationCodes && row.locationCodes?.map(location => areaMap[location] ?? "")?.join(",")}></InfoLine>
                                                                </MyCardContent>
                                                            </MyCard>
                                                        </Grid>
                                                    )
                                                    : ""}
                                        </Grid>

                                        {skuItems.length > 0 && (
                                            <React.Fragment>
                                                <Grid container item xs={12} spacing={3}>
                                                    <Grid item xs={12} md={3} style={{ marginBottom: "5px" }}>
                                                        <FormControl>
                                                            <FormControlLabel
                                                                inputRef={dealForm.register}
                                                                control={
                                                                    <Checkbox
                                                                        name="autoUpdateSku"
                                                                        color="primary"
                                                                        id="autoUpdateSku"
                                                                        checked={dealForm.watch("autoUpdateSku")}
                                                                        onChange={(e) => {
                                                                            dealForm.setValue("autoUpdateSku", e.target.checked);
                                                                        }}
                                                                        inputProps={{ "aria-label": "primary checkbox" }}
                                                                    />
                                                                }
                                                                label={<React.Fragment>

                                                                    Tự động cập nhật SKU <Tooltip title="Chỉ cập nhật với các sku con được cài đặt">
                                                                        <span>
                                                                            <FontAwesomeIcon
                                                                                icon={faExclamationCircle}
                                                                                fontSize={6}
                                                                                style={{ marginLeft: "5px" }}
                                                                            />
                                                                        </span>
                                                                    </Tooltip>
                                                                </React.Fragment>

                                                                }
                                                            />
                                                        </FormControl>
                                                    </Grid>


                                                    {dealForm.watch("autoOffSku") && (
                                                        <Grid item xs={12} md={3}>
                                                            <FormControl>
                                                                <FormControlLabel
                                                                    inputRef={dealForm.register}
                                                                    className={classes.label}
                                                                    control={
                                                                        <Checkbox
                                                                            name="autoOffSku"
                                                                            color="primary"
                                                                            id="autoOffSku"
                                                                            checked={dealForm.watch("autoOffSku")}
                                                                            disabled={true}
                                                                            inputProps={{
                                                                                "aria-label": "primary checkbox",
                                                                            }}
                                                                        />
                                                                    }
                                                                    label="Tự động tắt SKU"
                                                                />
                                                            </FormControl>
                                                        </Grid>
                                                    )}
                                                </Grid>

                                                {
                                                    !!dealForm.getValues("autoUpdateSku") && (
                                                        <React.Fragment>
                                                            <Typography>Cài đặt trạng thái sku con sau khi hết deal: </Typography>
                                                            {listUpdateStatus?.length > 0 && listUpdateStatus?.map((item, index) => {
                                                                return <SkuDataItem
                                                                    key={item.id}
                                                                    index={index}
                                                                    status={listUpdateStatus[index]}
                                                                    skuItems={skuItemOpts}
                                                                    listUpdateStatus={listUpdateStatus}
                                                                    removeUpdateStatus={removeUpdateStatus}
                                                                    handleChangeUpdateStatus={handleChangeUpdateStatus}
                                                                    dealForm={dealForm}
                                                                />
                                                            })}
                                                            {listUpdateStatus.length < skuItems.length && (
                                                                <div onClick={addUpdateStatus} style={{ display: "flex", alignItems: "center", width: "fit-content", cursor: "pointer", marginTop: "5px" }}>
                                                                    <AddCircleOutline fontSize="small" color="primary" />
                                                                    <p style={{ fontWeight: "bold", fontSize: 12, margin: 0, marginLeft: 5, color: "#00b46e" }}>Thêm cài đặt</p>
                                                                </div>
                                                            )}
                                                        </React.Fragment>
                                                    )
                                                }

                                            </React.Fragment>
                                        )}

                                    </React.Fragment>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </MyCardContent>
        </MyCard>
    );
}

export default DealSku;
