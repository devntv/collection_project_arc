import React, { useEffect, useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import { Box, Button, Grid, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core'
import { MyCardActions } from '@thuocsi/nextjs-components/my-card/my-card';
import { useRouter } from 'next/router';
import MuiSingleAuto from '@thuocsi/nextjs-components/muiauto/single';
import { getProductClient } from 'client/product';

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: "bold",
    },
    textField: {
        background: theme.palette.background.paper,
    }
}))

const defaultValues = {
    orderId: "",
    createdTimeFrom: null,
    createdTimeTo: null,
    customerId: "",
    campaignCode: "",
    sku: null,

};

export const HistoryFilter = (props) => {
    const styles = useStyles();
    const router = useRouter();

    const { register, reset, setValue, getValues, handleSubmit, control, errors } = useForm({
        defaultValues: {
            ...defaultValues,
            ...props.filterData,
        },
        mode: "onChange"
    })

    const applyFilter = async (formData) => {

        formData.sku = formData.sku?.value;
        for (let key in formData){
            if (!formData[key]){
                delete formData[key]
            }
        }
        props.onFilterChange && props.onFilterChange(formData)
    }

    const handleReset = () => {
        router.push({
            pathname: "/marketing/history-sale-campaign",
            query: {
                q: JSON.stringify({}),

            }
        });
    }

    useEffect(() => {
        if (Object.keys(props.filterData).length === 0) {
            setValue("orderId", "");
            setValue("campaignCode", "");
            setValue("createdTimeFrom", null);
            setValue("createdTimeTo", null);
            setValue("customerId", "")
            setValue("sku", null);

        }


        if (props.filterData?.sku) {
            (async function(){
                const productResp = await getProductClient().getProductListBySKUs([props.filterData?.sku])
                if(productResp.status === "OK" && productResp.data[0]){
                    setValue("sku", {
                        value: productResp.data[0]?.sku.code,
                        label: productResp.data[0]?.product.name + " - " + productResp.data[0]?.sku.sellerCode,
                    })
                }
            })()
            
        }
    }, [props.filterData])


    const searchSku = async (text) => {
        
        const productClient = getProductClient();
        const productResp = await productClient.getProductList({ search: text });
    
        const productMap = productResp.data?.reduce((acc, cur) => {
            acc[cur.code] = cur;
            return acc;
        }, {}) ?? {};
        const skuResp = await productClient.getSkuMainList({ productCodes: Object.keys(productMap) })
    
        return skuResp.data?.map((sku) => ({
            value: sku.code,
            label: `${productMap[sku.productCode]?.name} - ${sku.sellerCode}`,
        })) ?? [];
    }


    return (
        <Box style={{
            display: props.open ? "block" : "none"
        }}>
            <form onKeyPress={(e) => {
                if (e.key === "Enter") handleSubmit(applyFilter)(e)
            }}>
                <MyCardActions>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                className={styles.title}
                                color="textPrimary"
                                gutterBottom
                            >
                                Mã chương trình khuyến mãi
                            </Typography>
                            <TextField
                                className={styles.textField}
                                id="campaignCode"
                                name="campaignCode"
                                variant="outlined"
                                size="small"
                                type="text"
                                placeholder="Nhập mã chương trình khuyến mãi"
                                fullWidth
                                inputRef={register()}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSubmit(applyFilter)
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                className={styles.title}
                                color="textPrimary"
                                gutterBottom
                            >
                                ID Đơn hàng
                            </Typography>
                            <TextField
                                className={styles.textField}
                                id="orderId"
                                name="orderId"
                                variant="outlined"
                                size="small"
                                type="text"
                                placeholder="Nhập id đơn hàng"
                                fullWidth
                                inputRef={register()}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSubmit(applyFilter)
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                className={styles.title}
                                color="textPrimary"
                                gutterBottom
                            >
                                ID Khách hàng
                            </Typography>
                            <TextField
                                className={styles.textField}
                                id="customerId"
                                name="customerId"
                                variant="outlined"
                                size="small"
                                type="text"
                                placeholder="Nhập id khách hàng"
                                fullWidth
                                inputRef={register()}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSubmit(applyFilter)
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                className={styles.title}
                                color="textPrimary"
                                gutterBottom
                            >
                                Sản phẩm
                            </Typography>
                            <MuiSingleAuto
                            name='sku'
                            control={control}
                            errors={errors}
                            style={{
                                background: "white"
                            }}
                            options={[]}
                            onFieldChange={searchSku}
                            placeholder='Nhập tên sản phẩm'
                            
                            />

                        </Grid>

                        {/* <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                className={styles.title}
                                color="textPrimary"
                                gutterBottom
                            >
                                Thời gian sử dụng
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6} sm={6} md={6}>
                                    <TextField name="createdTimeFrom" className={styles.textField} inputRef={register()} variant="outlined"
                                        size="small" type="date" fullWidth />
                                </Grid>
                                <Grid item xs={6} sm={6} md={6}>
                                    <TextField name="createdTimeTo" className={styles.textField} inputRef={register()} variant="outlined"
                                        size="small" type="date" fullWidth />
                                </Grid>
                            </Grid>
                        </Grid> */}



                        <Grid item container xs={12} justifyContent="flex-end" spacing={2}>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="default"
                                    // disabled={formState.isSubmitting}
                                    onClick={handleReset}
                                >
                                    Làm mới
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    // disabled={formState.isSubmitting}
                                    onClick={handleSubmit(applyFilter)}
                                >
                                    Áp dụng
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </MyCardActions>
            </form>
        </Box>
    )
}
