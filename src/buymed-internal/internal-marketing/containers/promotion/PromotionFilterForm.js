import { Button, Grid, makeStyles, TextField, Typography, MenuItem } from '@material-ui/core';
import { MyCardActions } from '@thuocsi/nextjs-components/my-card/my-card';
import { parseQ } from 'components/global';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm, useController } from 'react-hook-form';
import { formSetter } from 'utils/HookForm';

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: "bold",
    },
    textField: {
        background: theme.palette.background.paper,
    },
    select: {
        marginTop: "5px",
        background: theme.palette.background.paper,
    }
}))

const defaultV = {
    promotionId: 0,
    search: "",
    timeFrom: null,
    timeTo: null,
    status: "ALL",
    voucherCode: ""
};



export const PromotionFilter = () => {
    const router = useRouter();
    const styles = useStyles();

    let defaultValues = parseQ(router.query.q) || {};
    if (!defaultValues.status) defaultValues.status = "ALL"
    if (router.query.search) defaultValues.search = router.query.search

    const filterForm = useForm({
        defaultValues: {
            ...defaultV,
            ...defaultValues
        },
        mode: "onChange"
    });

    useEffect(() => {
        filterForm.register({ name: "status" })
    }, [])

    useEffect(() => {

        formSetter(
            {
                ...defaultValues,

            },
            [
                "search",
                "promotionId",
                "status",
                "voucherCode"
            ],
            filterForm.setValue
        )

    }, [router.query.q])

    const statusController = useController({
        name: "status",
        control: filterForm.control,
        defaultValue: defaultValues.status ?? "ALL"
    })
    const { ref: statusRef, ...statusProps } = statusController.field;
    const [status] = useState(
        [{
            value: "HIDE",
            label: "Đã ẩn"
        },
        {
            value: "ACTIVE",
            label: "Đang hoạt động"
        },
        {
            value: "EXPIRED",
            label: "Đã hết hạn"
        }])


    const applyFilter = async (formData) => {
        let search = ""
        if (formData.search) search = formData.search.trim()
        if (formData.voucherCode) formData.voucherCode = formData.voucherCode.trim()
        Object.keys(formData).forEach(key => {
            if (!formData[key] || key === "search") delete formData[key]
        });

        if (formData.status === "ALL") {
            await router?.push({
                pathname: "/marketing/promotion",
                query: {
                    q: JSON.stringify({ ...formData, status: "" }),
                    limit: 20,
                    offset: 0,
                    search
                }
            });

        }
        else {
            await router?.push({
                pathname: "/marketing/promotion",
                query: {
                    q: JSON.stringify(formData),
                    limit: 20,
                    offset: 0,
                    search
                }
            });
        }
    }

    const handleReset = () => {
        filterForm.reset();
        router?.push({
            pathname: "/marketing/promotion"
        });
    }

    return (
        <form onKeyPress={(e) => {
            if (e.key === "Enter") filterForm.handleSubmit(applyFilter)(e)
        }}>
            <MyCardActions>
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={6} md={4}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            Từ khóa
                        </Typography>
                        <TextField
                            className={styles.textField}
                            id="search"
                            name="search"
                            variant="outlined"
                            size="small"
                            placeholder="Nhập từ khóa"
                            fullWidth
                            inputRef={filterForm.register}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            ID chương trình
                        </Typography>
                        <TextField
                            className={styles.textField}
                            id="promotionId"
                            name="promotionId"
                            variant="outlined"
                            type="number"
                            size="small"
                            placeholder="Nhập ID chương trình"
                            fullWidth
                            InputProps={{
                                inputProps: {
                                    min: 1,
                                }
                            }}
                            inputRef={filterForm.register}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            Mã voucher
                        </Typography>
                        <TextField
                            className={styles.textField}
                            id="voucherCode"
                            name="voucherCode"
                            variant="outlined"
                            size="small"
                            placeholder="Nhập mã voucher"
                            fullWidth
                            inputRef={filterForm.register}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            Trạng thái
                        </Typography>
                        <Grid container spacing={1}>
                            <TextField
                                className={styles.select}
                                id="status"
                                name="status"
                                variant="outlined"
                                size="small"
                                fullWidth
                                select
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                {...statusProps}
                                inputRef={statusRef}

                            >
                                <MenuItem key="ALL" value="ALL">Tất cả</MenuItem>
                                {status?.map(item => (
                                    <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                    </Grid>

                    <Grid item xs={12}>
                        <Grid container justify="flex-end" spacing={1}>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="default"
                                    disabled={filterForm.formState.isSubmitting}
                                    onClick={handleReset}
                                >
                                    Làm mới
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={filterForm.formState.isSubmitting}
                                    onClick={filterForm.handleSubmit(applyFilter)}
                                >
                                    Áp dụng
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </MyCardActions>
        </form>
    )


}