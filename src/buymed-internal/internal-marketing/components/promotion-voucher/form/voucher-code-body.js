import {
    Button,
    ButtonGroup,
    FormControlLabel,
    Grid,
    IconButton,
    Table,
    TableBody,
    Paper,
    TableCell,
    TableRow,
    TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import cssStyle from "./promotion.module.css";
import React, { useEffect, useState, useCallback } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { getPromoClient } from "../../../client/promo";
import { getCustomerClient } from "../../../client/customer";
import MuiSingleAuto from "@thuocsi/nextjs-components/muiauto/single";
import { Controller, FormProvider, useFormContext } from "react-hook-form";
import { Gif } from "@material-ui/icons";
import {
    displayPromotionReward,
    displayPromotionType,
    formatTime,
    formatUTCTime,
    getPromotionOrganizer,
} from "components/promotion-voucher/util";
import Tooltip from "@material-ui/core/Tooltip";
import { getAreaClient } from "../../../client/area";
import { defaultPromotionScope, defaultPromotionStatus } from "components/promotion-voucher/constant";
import Switch from "@material-ui/core/Switch";
import WarningIcon from "@material-ui/icons/Warning";
import Link from "next/link";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { getMasterDataClient } from "client/master-data";

const useStyles = makeStyles((theme) => ({
    root: {
        " .MuiTextField-root": {
            margin: theme.spacing(1),
        },
    },
    ".MuiInputBase-input": {
        fontWeight: "bold",
    },
    tag: {
        "& .MuiChip-root": {
            display: "none"
        }
    }
}));

export async function searchPromotion(promotionName) {
    return getPromoClient().getPromotionFromClient(
        promotionName,
        5,
        0,
        false,
        [defaultPromotionStatus.ACTIVE, defaultPromotionStatus.WAITING]
    );
}

export async function searchCustomer(customerName) {
    return getCustomerClient().getCustomerFromClient(0, 10, JSON.stringify({ search: customerName }));
}

export async function getRegionByCodes(codes) {
    return await getAreaClient().getListAreaByCodes(codes);
}

export async function getListProvinceClient() {
    return getMasterDataClient().getProvinceFromClient(0, 100, "", true);
}

export async function getCustomers() {
    return await getCustomerClient().getLevel();
}

export default function VoucherCodeBody(props) {
    const router = useRouter();
    const classes = useStyles();

    const {
        errors,
        onChangePromotion,
        dataProps,
        listPromotionDefault,
        handleChangeType,
        appliedCustomers,
        promotion,
        control,
        voucher,
        setValue,
        showPromotionPublic,
        defaultStatus,
        listCustomerDefault,
        edit,
        compareTime,
        onChangeCustomer,
        getValue,
        register,
    } = props;

    let customer =
        appliedCustomers?.length > 0 ? appliedCustomers : listCustomerDefault;

    const [showAutoComplete, setShowAutoComplete] = useState(false);
    const [listPromotionSearch, setListPromotionSearch] = useState(
        listPromotionDefault || []
    );
    const [listSeletedCustomer, setListSelectedCustomer] = useState([])
    const [listCustomer, setListCustomer] = useState(customer);
    const hasError = typeof errors[`promotionName`] !== "undefined";
    const [promotionPublic, setPromotionPublic] = useState(promotion[0] || null);
    const [listCustomerPromotion, setListCustomerPromotion] = useState([]);
    const [listRegions, setListRegions] = useState([]);

    const [active, setActive] = useState(defaultStatus ? defaultStatus : false);

    const switchActive = async () => {
        setActive(!active);
        setValue("status", !active);
    };

    useEffect(() => {
        setListSelectedCustomer(dataProps.customerIds)
    }, [dataProps.customerIds])

    useEffect(() => {
        setActive(defaultStatus ? defaultStatus : false);
    }, [defaultStatus]);

    useEffect(() => {
        if (!showPromotionPublic) {
            setPromotionPublic({});
        }
        if (promotion.length > 0) {
            promotion[0].scopes.forEach(async (scope) => {
                switch (scope.type) {
                    case defaultPromotionScope.CUSTOMER:
                        let level = await getCustomers();
                        if (level && level.status === "OK") {
                            let listCustomerPromotion = [];
                            level.data.forEach((l) => {
                                if (scope.customerLevelCodes?.includes(l.code)) {
                                    listCustomerPromotion.push(l);
                                }
                            });
                            setListCustomerPromotion(listCustomerPromotion);
                        } else {
                            setListCustomerPromotion([]);
                        }
                        break;
                    case defaultPromotionScope.AREA:
                        let region = await getRegionByCodes(scope.areaCodes);
                        const resProvince = await getListProvinceClient()
                        const arr = []
                        if (resProvince && resProvince.status === "OK") {
                            scope.areaCodes?.map((code) => {
                                const province = resProvince.data?.find((v) => v.code == code)
                                if (province) {
                                    arr.push(province)
                                }
                            });
                        }
                        const data = (region?.data || []).concat(arr)
                        setListRegions(data);
                }
            });
        }
    }, []);

    const handleSearchPromotion = async (value) => {
        let listPromationResponse = await searchPromotion(value);
        if (listPromationResponse && listPromationResponse.status === "OK") {
            setListPromotionSearch(listPromationResponse.data);
            return listPromationResponse.data.map((item) => {
                return { label: item.promotionName, value: item.promotionId };
            });
        } else {
            setListPromotionSearch(listPromotionDefault);
            return listPromotionDefault.map((item) => {
                return { label: item.promotionName, value: item.promotionId };
            });
        }
    };
    const handleSearchCustomer = async (e) => {
        let listCustomerResponse = await searchCustomer(e.target.value);
        //let listCustomerResponse = await getCustomerClient().getCustomerByFilter({ query: { search: value }, limit: 10, offset: 0 });
        if (listCustomerResponse && listCustomerResponse.status === "OK") {
            let listCustomer = [];
            listCustomerResponse.data.forEach((cusResponse) => {
                if (
                    !dataProps.customerIds.some((id) => id === cusResponse.customerID)
                ) {
                    listCustomer.push(cusResponse);
                }
            });
            setListCustomer(listCustomer);
        } else {
            setListCustomer([]);
        }
    };

    const validateUnicode = (value) => {
        let result = false;
        for (let i = 0; i < value.length; i++) {
            if (value.charCodeAt(i) > 127 && i > 0) {
                result = true;
            }
        }
        return result;
    };

    const validateNumber = (number, message) => {
        if (number < 0) {
            return message;
        }
    };

    const handleChangePromotion = async (object) => {
        let promotion = {};
        if (object?.value) {
            listPromotionSearch.forEach((promo) => {
                if (promo.promotionId === object.value) {
                    return (promotion = promo);
                }
            });
        }
        if (promotion && promotion.scopes?.length > 0) {
            for (const scope of promotion.scopes) {
                switch (scope.type) {
                    case defaultPromotionScope.CUSTOMER:
                        let level = await getCustomers();
                        if (level && level.status === "OK") {
                            let listCustomerPromotion = [];
                            level.data.forEach((l) => {
                                if (scope.customerLevelCodes?.includes(l.code)) {
                                    listCustomerPromotion.push(l);
                                }
                            });
                            setListCustomerPromotion(listCustomerPromotion);
                        } else {
                            setListCustomerPromotion([]);
                        }
                        break;
                    case defaultPromotionScope.AREA:
                        let region = await getRegionByCodes(scope.areaCodes);
                        const resProvince = await getListProvinceClient()
                        const arr = []
                        if (resProvince && resProvince.status === "OK") {
                            scope.areaCodes?.map((code) => {
                                const province = resProvince.data?.find((v) => v.code == code)
                                if (province) {
                                    arr.push(province)
                                }
                            });
                        }
                        const data = (region?.data || []).concat(arr)
                        setListRegions(data);
                }
            }
        }

        router
            .push({
                pathname: router.pathname,
                query: { ...router.query, promotionId: promotion.promotionId || "" },
            })
            .then(() => {
                setValue("startTime", formatUTCTime(promotion.startTime), {
                    shouldValidate: true,
                });
                setValue("endTime", formatUTCTime(promotion.endTime), {
                    shouldValidate: true,
                });
                setValue("publicTime", formatUTCTime(promotion.publicTime), {
                    shouldValidate: true,
                });
                setPromotionPublic(promotion);
            });
    };

    return (
        <Grid item container justify={"space-between"}>
            <Grid item container xs={10} spacing={3}>
                <Grid item xs={6}>
                    <h5 className={cssStyle.titleLabel}>
                        Mã khuyến mãi<span style={{ color: "red" }}> *</span>
                    </h5>
                    <TextField
                        id="code"
                        name="code"
                        disabled={edit}
                        helperText={errors.code?.message}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={!!errors.code}
                        placeholder="Nhập mã khuyến mãi"
                        style={{ width: "100%" }}
                        required
                        onChange={(e) => {
                            let a = e.target.value.replace(/\s/g, "");
                            setValue("code", a.trim().toUpperCase());
                        }}
                        inputRef={register({
                            validate: {
                                required: (val) => {
                                    if (validateUnicode(val)) {
                                        return "Mã khuyến mãi không được chứa kí tự có dấu";
                                    }
                                    return val.trim().length > 0;
                                },
                            },
                            required: "Mã khuyến mãi không được để trống",
                        })}
                    />
                </Grid>
                <Grid
                    item
                    xs={6}
                    className={cssStyle.marginLineAutocompletePromotion}
                >
                    <h5 className={cssStyle.titleLabel}>
                        Chương trình khuyến mãi áp dụng
                        <span style={{ color: "red" }}> *</span>
                    </h5>
                    <MuiSingleAuto
                        id="promotionId"
                        options={listPromotionSearch.map((item) => {
                            return { label: item.promotionName, value: item.promotionId };
                        })}
                        name="promotionId"
                        variant="standard"
                        onFieldChange={handleSearchPromotion}
                        placeholder="Chọn chương trình khuyến mãi áp dụng"
                        control={control}
                        disabled={compareTime}
                        onValueChange={handleChangePromotion}
                        errors={errors}
                        message="Vui lòng chọn chương trình khuyến mãi áp dụng"
                        required={true}
                    />
                </Grid>
                <Grid item xs={6}>
                    <h5 className={cssStyle.titleLabel}>
                        Thời gian bắt đầu <span style={{ color: "red" }}> *</span>
                    </h5>
                    <TextField
                        id="startTime"
                        name="startTime"
                        helperText={errors.startTime?.message}
                        error={!!errors.startTime}
                        placeholder=""
                        // disabled={compareTime}
                        fullWidth
                        type="datetime-local"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        inputRef={register({
                            required: "Thời gian bắt đầu không được để trống",
                        })}
                    />
                </Grid>
                <Grid item xs={6}>
                    <h5 className={cssStyle.titleLabel}>
                        Thời gian kết thúc <span style={{ color: "red" }}> *</span>
                    </h5>
                    <TextField
                        id="endTime"
                        name="endTime"
                        helperText={errors.endTime?.message}
                        error={!!errors.endTime}
                        placeholder=""
                        // disabled={compareTime}
                        fullWidth
                        type="datetime-local"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        inputRef={register({
                            required: "Thời gian kết thúc không được để trống",
                        })}
                    />
                </Grid>
                <Grid item xs={6}>
                    <h5 className={cssStyle.titleLabel}>
                        Thời gian cho phép hiển thị{" "}
                        <span style={{ color: "red" }}> *</span>
                        <Tooltip title="Tới thời gian này sẽ cho hiển thị trên app/web thuocsi">
                            <span>
                                <FontAwesomeIcon
                                    icon={faExclamationCircle}
                                    style={{ marginLeft: "6px" }}
                                />
                            </span>
                        </Tooltip>
                    </h5>
                    <TextField
                        id="publicTime"
                        name="publicTime"
                        helperText={errors.publicTime?.message}
                        error={!!errors.publicTime}
                        placeholder=""
                        // disabled={compareTime}
                        type="datetime-local"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        style={{ width: "100%" }}
                        inputRef={register({
                            required: "Thời gian cho hiển thị không được để trống",
                        })}
                    />
                </Grid>
                <Grid item xs={6}>
                    <h5 className={cssStyle.titleLabel}>
                        Tổng số lần sử dụng toàn hệ thống
                        <Tooltip title="Nhập = 0 là không giới hạn">
                            <span>
                                <FontAwesomeIcon
                                    icon={faExclamationCircle}
                                    style={{ marginLeft: "6px" }}
                                />
                            </span>
                        </Tooltip>
                    </h5>
                    <TextField
                        id="maxUsage"
                        name="maxUsage"
                        type="number"
                        InputProps={{
                            className: classes[".MuiInputBase-input"],
                        }}
                        helperText={errors.maxUsage?.message}
                        error={!!errors.maxUsage}
                        defaultValue={0}
                        // disabled={compareTime}
                        placeholder="Tổng số lần sử dụng toàn hệ thống"
                        style={{ width: "100%", fontWeight: "normal" }}
                        inputRef={register({
                            required: "Tổng số lần sử dụng toàn hệ thống không được để trống",
                            maxLength: {
                                value: 6,
                                message: "Tổng số lần sử dụng không được vượt quá 999999",
                            },
                            validate: (value) =>
                                validateNumber(
                                    value,
                                    "Tổng số lần sử dụng toàn hệ thống không được âm"
                                ),
                        })}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <h5 className={cssStyle.titleLabel}>
                        Số lần áp dụng tối đa cho mỗi khách hàng
                        <Tooltip title="Nhập = 0 là không giới hạn">
                            <span>
                                <FontAwesomeIcon
                                    icon={faExclamationCircle}
                                    style={{ marginLeft: "6px" }}
                                />
                            </span>
                        </Tooltip>
                    </h5>
                    <TextField
                        id="maxUsagePerCustomer"
                        name="maxUsagePerCustomer"
                        type="number"
                        InputProps={{
                            className: classes[".MuiInputBase-input"],
                        }}
                        // disabled={compareTime}
                        helperText={errors.maxUsagePerCustomer?.message}
                        error={!!errors.maxUsagePerCustomer}
                        defaultValue={0}
                        placeholder="Số lần áp dụng tối đa cho mỗi khách hàng"
                        style={{ width: "100%", fontWeight: "normal" }}
                        inputRef={register({
                            required: "Số lần áp dụng tối đa cho mỗi khách hàng không được để trống",
                            maxLength: {
                                value: 6,
                                message: "Số lần áp dụng tối đa cho mỗi khách hàng không được vượt quá 999999",
                            },
                            validate: (value) =>
                                validateNumber(
                                    value,
                                    "Số lần áp dụng tối đa cho mỗi khách hàng không được âm"
                                ),
                        })}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <h5 className={cssStyle.titleLabel}>Loại mã</h5>
                    <Select
                        id="type"
                        name="type"
                        placeholder="Chọn loại mã"
                        value={dataProps.type}
                        // disabled={compareTime}
                        onChange={(event) => handleChangeType(event.target.value)}
                        labelId="select-type"
                        style={{ width: "100%" }}
                    >
                        <MenuItem value="PUBLIC">
                            <div style={{ fontSize: 16, fontWeight: "bold" }}>Public</div>
                        </MenuItem>
                        <MenuItem value="PRIVATE">
                            <div style={{ fontSize: 16, fontWeight: "bold" }}>Private</div>
                        </MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={6}>
                    <h5 className={cssStyle.titleLabel}>
                        Tìm kiếm khách hàng
                        <Tooltip
                            title="Nếu chọn từ danh sách, thì chỉ có khách hàng thuộc danh sách bên dưới mới được xài khuyến mãi">
                            <span>
                                <FontAwesomeIcon
                                    icon={faExclamationCircle}
                                    style={{ marginLeft: "6px" }}
                                />
                            </span>
                        </Tooltip>
                    </h5>
                    <Autocomplete
                        fullWidth
                        multiple
                        noOptionsText="Không tìm thấy khách hàng nào"
                        id="appliedCustomers"
                        name="appliedCustomers"
                        options={listCustomer.map(customer => customer)}
                        getOptionLabel={(option) => option.name}
                        defaultValue={appliedCustomers}
                        filterSelectedOptions
                        loadingText="Không tìm thấy danh sách khách hàng được sử dụng"
                        onOpen={() => {
                            setListCustomer(listCustomer)
                            setShowAutoComplete(true);
                        }}
                        onClose={() => {
                        }}
                        filterOptions={option => option}
                        renderInput={(params) => {
                            return <TextField
                                {...params}
                                name="appliedCustomers"
                                className={classes.tag}
                                placeholder="ID khách hàng, tên khách hàng, số điện thoại"
                                required
                                onChange={(e) => handleSearchCustomer(e)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Backspace') {
                                        event.stopPropagation();
                                    }
                                }}
                            />
                        }}
                        onChange={(e, value, reason) => {
                            onChangeCustomer(e, value)
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <h5 className={cssStyle.titleLabel}>Trạng thái</h5>
                    <Controller
                        name="status"
                        defaultValue={active}
                        control={control}
                        render={(props) => (
                            <FormControlLabel
                                // disabled={
                                //     voucher &&
                                //     voucher?.status == defaultPromotionStatus.EXPIRED
                                // }
                                control={
                                    <Switch
                                        color="primary"
                                        checked={active}
                                        onChange={switchActive}
                                        name="gilad"
                                    />
                                }
                                label={active ? "Đang hoạt động" : "Ngừng hoạt động"}
                            />
                        )}
                    />
                </Grid>
            </Grid>
            {promotionPublic?.promotionId && (
                <Grid
                    item
                    xs={2}
                    style={{ background: "#f6f6f6", borderRadius: "1rem" }}
                    container
                    direction={"column"}
                >
                    <div style={{ padding: "1rem 1rem 1rem 2rem" }}>
                        <Grid className={cssStyle.marginLinePromotion}>
                            <span>Tên chương trình</span>
                            <div className={cssStyle.textInfoPromotion}>
                                <Link href={`/marketing/promotion/edit?promotionId=${promotionPublic.promotionId}`} prefetch={false}>
                                    <a target="_blank" prefetch={false} className={cssStyle.actionLink}>
                                        {promotionPublic.promotionName}
                                    </a>
                                </Link>
                            </div>
                        </Grid>
                        <Grid className={cssStyle.marginLinePromotion}>
                            <span>Bên tổ chức</span>
                            <div className={cssStyle.textInfoPromotion}>
                                {getPromotionOrganizer(promotionPublic.promotionOrganizer)}
                            </div>
                        </Grid>
                        <Grid className={cssStyle.marginLinePromotion}>
                            <span>Thời gian áp dụng</span>
                            <div className={cssStyle.textInfoPromotion}>
                                {formatTime(promotionPublic.startTime) +
                                    " - " +
                                    formatTime(promotionPublic.endTime)}
                            </div>
                        </Grid>
                        {listCustomerPromotion?.length > 0 && (
                            <Grid className={cssStyle.marginLinePromotion}>
                                <span>Áp dụng cho đối tượng khách hàng</span>
                                {listCustomerPromotion.map((row, index) => (
                                    <Grid key={index}>
                                        <div className={cssStyle.textInfoPromotion}>
                                            {row.name}
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                        <Grid className={cssStyle.marginLinePromotion}>
                            <span>Khu vực áp dụng</span>
                            {listRegions?.length > 0 ?
                                listRegions.map((row, index) => (
                                    <Grid key={index}>
                                        <div className={cssStyle.textInfoPromotion}>
                                            {row.name}
                                        </div>
                                    </Grid>
                                ))
                                :
                                <Grid>
                                    <div className={cssStyle.textInfoPromotion}>
                                        Toàn quốc
                                    </div>
                                </Grid>
                            }
                        </Grid>
                        {promotionPublic["conditions"]?.["type"] && (
                            <Grid className={cssStyle.marginLinePromotion}>
                                <span>Loại khuyến mãi</span>
                                <div className={cssStyle.textInfoPromotion}>
                                    {displayPromotionReward(promotionPublic.rule.type)}
                                </div>
                            </Grid>
                        )}
                    </div>
                </Grid>
            )}
        </Grid>
    );
}
