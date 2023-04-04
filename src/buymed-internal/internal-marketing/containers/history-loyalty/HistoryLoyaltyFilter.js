import {Button, Grid, makeStyles, TextField, Typography} from '@material-ui/core';
import {MyCardActions} from '@thuocsi/nextjs-components/my-card/my-card';
import {getProductClient} from 'client/product';
import {parseQ} from 'components/global';
import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {formSetter} from 'utils/HookForm';

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: "bold",
    },
    textField: {
        background: theme.palette.background.paper,
    }
}))

const defaultFormValues = {};
export const HistoryLoyaltyFilter = () => {
    const router = useRouter();
    const styles = useStyles();
    const defaultFilterValues = parseQ(router.query.q);
    const filterForm = useForm({
        defaultValues: {
            ...defaultFormValues,
            ...defaultFilterValues,
        },
        mode: "onChange"
    });

    useEffect(() => {
        (async () => {
            formSetter(
                {
                    ...defaultFilterValues,
                },
                [
                    "customerId",
                    "customerPhone",
                    "orderId",
                    "saleOrderCode",
                    "voucherCode",
                    "timeFrom",
                    "timeTo",
                ],
                filterForm.setValue
            )
        })()
    }, [router.query.q])

    const applyFilter = async (formData) => {
        Object.keys(formData).forEach(key => {
            if (!formData[key]) delete formData[key]
        });

        await router?.push({
            pathname: "/marketing/history-loyalty",
            query: {
                q: JSON.stringify(formData)
            }
        });
    }

    const handleReset = () => {
        filterForm.reset();
        router?.push({
            pathname: "/marketing/history-loyalty"
        });
    }
    return (
        <form onKeyPress={(e) => {
            if (e.key === "Enter") filterForm.handleSubmit(applyFilter)(e)
        }}>
            <MyCardActions>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            Mã khách hàng
                        </Typography>
                        <TextField
                            className={styles.textField}
                            id="customerId"
                            name="customerId"
                            variant="outlined"
                            size="small"
                            placeholder="Nhập mã khách hàng"
                            fullWidth
                            inputRef={filterForm.register({
                                valueAsNumber: true
                            })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            Số điện thoại KH
                        </Typography>
                        <TextField
                            className={styles.textField}
                            id="customerPhone"
                            name="customerPhone"
                            variant="outlined"
                            size="small"
                            placeholder="Nhập số điện thoại KH"
                            fullWidth
                            inputRef={filterForm.register}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            ID đơn hàng
                        </Typography>
                        <TextField
                            className={styles.textField}
                            id="orderId"
                            name="orderId"
                            variant="outlined"
                            size="small"
                            placeholder="Nhập ID đơn hàng"
                            fullWidth
                            inputRef={filterForm.register({
                                valueAsNumber: true
                            })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            Mã SO
                        </Typography>
                        <TextField
                            className={styles.textField}
                            id="saleOrderCode"
                            name="saleOrderCode"
                            variant="outlined"
                            size="small"
                            placeholder="Nhập mã SO"
                            fullWidth
                            inputRef={filterForm.register}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            Mã khuyến mãi
                        </Typography>
                        <TextField
                            className={styles.textField}
                            id="voucherCode"
                            name="voucherCode"
                            variant="outlined"
                            size="small"
                            placeholder="Nhập mã khuyến mãi"
                            fullWidth
                            inputRef={filterForm.register}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            Thời gian thực hiện
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6} sm={6} md={6}>
                                <TextField name="timeFrom" inputRef={filterForm.register} variant="outlined"
                                           size="small" type="date" fullWidth/>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                                <TextField name="timeTo" inputRef={filterForm.register} variant="outlined"
                                           size="small" type="date" fullWidth/>
                            </Grid>
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
