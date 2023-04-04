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

const defaultFormValues = {};

export const HistoryVoucherFilter = () => {
    const router = useRouter();
    const styles = useStyles();
    const defaultFilterValues = parseQ(router.query.q);

    const filterForm = useForm({
        defaultValues: {
            ...defaultFormValues,
            ...defaultFilterValues,
            // type: "PUBLIC"
        },
        mode: "onChange"
    });

    // const typeController = useController({
    //     name: "type",
    //     control: filterForm.control,
    //     defaultValue: "PUBLIC",
    // })
    // const {ref: typeRef, ...typeProps} = typeController.field;
    // const [type, setType] = useState([{
    //     value:"PUBLIC",
    //     label :"PUBLIC"
    // }])


    useEffect(() => {
        (async () => {
            formSetter(
                {
                    ...defaultFilterValues,

                },
                [
                    "usageTotal",
                    "code",
                    "timeFrom",
                    "timeTo",
                    "orderId",
                    "customerPhone",
                    "customerId",
                ],
                filterForm.setValue
            )
        })()
    }, [router.query.q])

    const applyFilter = async (formData) => {
        Object.keys(formData).forEach(key => {
            if (!formData[key]) delete formData[key]
        });

        if (Object.keys(formData).length === 0) {
            await router?.push({
                pathname: "/marketing/history-voucher",
                query: {
                    limit: router?.query?.limit || 20,
                    page: 0,
                }
            });
        }
        else if (formData.usageTotal > 0) {
            await router?.push({
                pathname: "/marketing/history-voucher",
                query: {
                    ...router.query,
                    page: 0,
                    q: JSON.stringify(formData),
                    type: "hasOrder",
                }


            });
        }
        else {
            await router?.push({
                pathname: "/marketing/history-voucher",
                query: {
                    ...router.query,
                    page: 0,
                    q: JSON.stringify(formData),
                    type: router.query.type,
                }
            });
        }
    }

    const handleReset = () => {
        filterForm.reset();
        router?.push({
            pathname: "/marketing/history-voucher"
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
                            ID khách hàng
                        </Typography>
                        <TextField
                            className={styles.textField}
                            id="customerId"
                            name="customerId"
                            variant="outlined"
                            size="small"
                            placeholder="Nhập id khách hàng"
                            fullWidth
                            inputRef={filterForm.register({
                                valueAsNumber: true
                            })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            Số điện thoại
                        </Typography>
                        <TextField
                            className={styles.textField}
                            id="customerPhone"
                            name="customerPhone"
                            variant="outlined"
                            size="small"
                            placeholder="Nhập số điện thoại khách hàng"
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

                    {/* <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            Số lượng đã dùng
                        </Typography>
                        <TextField
                            className={styles.textField}
                            id="usageTotal"
                            name="usageTotal"
                            variant="outlined"
                            size="small"
                            placeholder="Nhập số lượng đã dùng"
                            fullWidth
                            inputRef={filterForm.register({
                                valueAsNumber: true
                            })}
                        />
                    </Grid> */}

                    {/* <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            Loại
                        </Typography>
                        <Grid container spacing={1}>
                            <TextField
                                className={styles.select}
                                id="type"
                                name="type"
                                variant="outlined"
                                size="small"
                                fullWidth
                                select
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                {...typeProps}
                                inputRef={typeRef}
                            >
                                {type?.map(item => (
                                    <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                ))}
                                <MenuItem value="PUBLIC" key="PUBLIC">PUBLIC</MenuItem>


                               
                            </TextField>
                        </Grid>
                       
                    </Grid> */}



                    <Grid item xs={12} sm={6} md={4}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            Mã khuyến mãi
                        </Typography>
                        <TextField
                            className={styles.textField}
                            id="code"
                            name="code"
                            variant="outlined"
                            size="small"
                            placeholder="Nhập mã khuyến mãi"
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
                            Thời gian KH sử dụng
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6} sm={6} md={6}>
                                <TextField className={styles.textField} name="timeFrom" inputRef={filterForm.register} variant="outlined"
                                    size="small" type="date" fullWidth />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                                <TextField className={styles.textField} name="timeTo" inputRef={filterForm.register} variant="outlined"
                                    size="small" type="date" fullWidth />
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