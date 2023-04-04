import { Button, Grid, makeStyles, MenuItem, TextField, Typography } from "@material-ui/core";
import { MyCardActions } from "@thuocsi/nextjs-components/my-card/my-card";
import { formatDatetimeFormType, parseQ } from "components/global";
import moment from "moment";
import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { useIsFirstRender } from "utils/ReactFC";
import { VoucherStatus } from "view-model/promotion";
import { getCustomerClient } from "client/customer";
import MuiSingleAuto from "@thuocsi/nextjs-components/muiauto/single";
import { formSetter } from 'utils/HookForm';

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: "bold",
    },
    textField: {
        background: theme.palette.background.paper,
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
    code: "",
    status: "",
    timeFrom: null,
    timeTo: null,
    customerId: null,
}

export const VoucherFilter = () => {

    const styles = useStyles();
    const router = useRouter();
    const firstRender = useIsFirstRender();

    const voucherStatusText = {
        [VoucherStatus.HIDE]: "Đã tắt",
        [VoucherStatus.WAITING]: "Đang đợi",
        [VoucherStatus.ACTIVE]: "Đang hoạt động",
        [VoucherStatus.EXPIRED]: "Đã hết hạn",
        [VoucherStatus.DELETED]: "Đã xóa",
    }

    const formDefaultValue = useMemo(() => {
        const data = {
            ...defaultValue,
            search: router.query.search || defaultValue.search,
            ...parseQ(router.query.q),
        };
        if (data.timeFrom) data.timeFrom = formatDatetimeFormType(data.timeFrom);
        if (data.timeTo) data.timeTo = formatDatetimeFormType(data.timeTo);
        if (data.customerId) {
            (async () => {
                const detail = await getCustomerClient().getCustomerByCustomerID(Number(parseQ(router.query.q)?.customerId));
                formSetter(
                    {
                        customerId:
                        {
                            value: detail?.data[0]?.customerID || 0,
                            label: (detail?.data[0]?.name || '') + ' - ' + (detail?.data[0]?.phone),
                        }
                    },
                    [
                        "customerId",
                    ],
                    setValue
                )
            })()
        }
        return data;
    }, [router.query.search, router.query.q]);

    const {
        control,
        register,
        handleSubmit,
        errors,
        formState: { isSubmitting },
        reset,
        watch,
        setValue,
    } = useForm({
        mode: "onChange",
        defaultValues: formDefaultValue,
    })
    const [listCustomer, setListCustomer] = useState([]);
    const { field: statusField } = useController({ control, name: "status" });
    const { timeFrom, timeTo } = watch(["timeFrom", "timeTo"]);

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (!firstRender) {
            reset(formDefaultValue);
        }
    }, [formDefaultValue]);

    const getData = async () => {
        const listCustomerDefaultReponse = await getCustomerClient().getCustomer(0, 20, {});
        if (listCustomerDefaultReponse && listCustomerDefaultReponse.status === "OK") {
            const options = listCustomerDefaultReponse?.data?.map(item => {
                return ({
                    value: item.customerID,
                    label: item.name + ' - ' + item.phone
                })
            })
            setListCustomer(options || [])
        }
    }

    const handleApplyFilter = async (formData) => {
        const { search, ...qData } = { ...formData };
        Object.keys(qData).forEach(key => {
            if (!qData[key]) delete qData[key];
        });
        if (qData.timeFrom) qData.timeFrom = moment(qData.timeFrom).toISOString();
        if (qData.timeTo) qData.timeTo = moment(qData.timeTo).toISOString();
        if (qData.customerId) qData.customerId = qData.customerId.value
        router?.push({
            pathname: router.pathname,
            query: {
                promotionId: router.query.promotionId,
                search: search?.trim(),
                q: JSON.stringify(qData),
            }
        });
    }

    const handleSearchCustomer = async (value) => {
        const listCustomerResponse = await getCustomerClient().getCustomerFromClient(0, 20, JSON.stringify({ search: value }));
        const options = listCustomerResponse?.data?.map(item => ({
            value: item.customerID,
            label: item.name + ' - ' + item.phone
        })
        ) || []
        return options
    };

    const handleReset = () => {
        reset();
        getData()
        router?.push({
            pathname: router.pathname,
            query: {
                promotionId: router.query.promotionId
            }
        });
    }

    return (
        <form onSubmit={handleSubmit(handleApplyFilter)}>
            <MyCardActions>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={4}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            Từ khóa
                        </Typography>
                        <TextField
                            name="search"
                            variant="outlined"
                            size="small"
                            placeholder="Nhập từ khóa"
                            fullWidth
                            InputProps={{
                                className: styles.textField
                            }}
                            inputRef={register({
                                setValueAs: (v) => v.trim()
                            })}
                        />
                    </Grid>
                    <Grid container item xs={12} md={6} lg={4}>
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
                                    id="timeFrom"
                                    name="timeFrom"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    type="datetime-local"
                                    InputProps={{
                                        className: styles.textField
                                    }}
                                    error={errors.timeFrom}
                                    helperText={errors.timeFrom?.message}
                                    inputRef={register({
                                        validate: (v) => {
                                            if (moment(v).isAfter(timeTo)) return "Thời gian tạo từ phải trước Thời gian tạo đến";
                                        }
                                    })}
                                    onFocus={(e) => {
                                        if (!e.target.value) {
                                            setValue(
                                                "timeFrom",
                                                getDefaultDatetime(e.target.value, "SOD"),
                                                { shouldDirty: true, shouldValidate: true }
                                            )
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="timeTo"
                                    name="timeTo"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    type="datetime-local"
                                    InputProps={{
                                        className: styles.textField
                                    }}
                                    error={errors.timeTo}
                                    helperText={errors.timeTo?.message}
                                    inputRef={register({
                                        validate: (v) => {
                                            if (moment(v).isBefore(timeFrom)) return "Thời gian tạo đến phải sau Thời gian tạo từ";
                                        }
                                    })}
                                    onFocus={(e) => {
                                        if (!e.target.value) {
                                            setValue(
                                                "timeTo",
                                                getDefaultDatetime(e.target.value, "EOD"),
                                                { shouldDirty: true, shouldValidate: true }
                                            )
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
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
                            <MenuItem value="">Tất cả</MenuItem>
                            {Object.values(VoucherStatus).map(value => (
                                <MenuItem key={value} value={value}>{voucherStatusText[value]}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            Khách hàng
                        </Typography>
                        <MuiSingleAuto
                            name="customerId"
                            placeholder='Chọn khách hàng'
                            options={listCustomer}
                            onFieldChange={handleSearchCustomer}
                            control={control}
                            errors={errors}
                            style={{
                                background: "white"
                            }}
                        />
                    </Grid>
                    <Grid item container xs={12} justify="flex-end" spacing={1}>
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
