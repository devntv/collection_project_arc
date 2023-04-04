import React, { useEffect, useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import { Box, Button, Grid, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core'
import { MyCardActions } from '@thuocsi/nextjs-components/my-card/my-card';
import { useRouter } from 'next/router';
import MuiSingleAuto from "@thuocsi/nextjs-components/muiauto/single";
import { getProductClient } from 'client/product';
import { getSellerClient } from 'client/seller';
import { getSaleCampaignClient } from 'client/saleCampaign';

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: "bold",
    },
    textField: {
        background: theme.palette.background.paper,
    }
}))

const defaultValues = {
    campaignID: null,
    sellerCode: null,
    sku: null,

};

export const SellerTicketFilter = (props) => {
    const styles = useStyles();
    const router = useRouter();

    const { register, reset, setValue, getValues, handleSubmit, control, errors } = useForm({
        defaultValues: {
            ...defaultValues,
            ...props.filterData,
            sellerCode: props.sellerOpts?.filter(item => item.value === props.filterData?.sellerCode)[0] ?? {},
            sku: props.productOpts?.filter(item => item.value === props.filterData?.sku)[0] ?? {},
            campaignID: props.campaignOpts?.filter(item => item.value === props.filterData?.campaignID)[0] ?? {},
        },
        mode: "onChange"
    })

    const applyFilter = async (formData) => {

        formData.sellerCode = formData.sellerCode?.value ?? null;
        formData.sku = formData.sku?.value ?? null;
        formData.campaignID = formData.campaignID?.value ?? null;
        for (let key in formData) {
            if (!formData[key]) {
                delete formData[key]
            }
        }
        props.onFilterChange && props.onFilterChange(formData)
    }

    const handleReset = () => {
        router.push({
            pathname: "/marketing/seller-ticket",
            query: {
                q: JSON.stringify({}),
            }
        });
    }

    useEffect(() => {
        if (Object.keys(props.filterData).length === 0) {
            setValue("campaignID", "");
            setValue("sellerCode", null);
            setValue("sku", null);
        }
    }, [router.query])


    const handleSearchProduct = async(text) => {

        const productClient = getProductClient({});
        let listProductCodes = []
        let listMapProductSku = {}
        const productResp = await productClient.getProductListFromClient({
            offset: 0,
            limit: 10,
            search: text,
        })

        if (productResp.status == "OK") {
            productResp.data?.forEach((product) => {
                listProductCodes.push(product.code)
                listMapProductSku[product.code] = product
            })
        }

        if (listProductCodes.length > 0) {
            let skusResp = await productClient.getSkuList({
                q: "",
                productCodes: listProductCodes
            })
            if (skusResp.status !== "OK") {
                if (skusResp.status === "NOT_FOUND") {
                    return [];
                } else {
                    toast.error(skusResp.message ?? unknownErrorText);
                }
                return [];
            }

            // Map data to options
            let listSellerCode = [];
            skusResp.data?.map(({ sellerCode }) => {
                if (sellerCode) listSellerCode.push(sellerCode)
            })

            const sellerClient = getSellerClient();
            const sellerResp = await sellerClient.getSellerBySellerCodes([...new Set(listSellerCode)]);
            const sellerMap = await sellerResp?.data?.reduce((acc, seller) => {
                acc[seller.code] = seller;
                return acc
            }, {}) || {};

            let lstOptions = []

            skusResp.data?.forEach((item) => {
                let label = item.productID + " - " + listMapProductSku[item.productCode]?.name ?? item.code;
                if (item.sellerCode && sellerMap[item.sellerCode]?.name) {
                    label += ` - ${sellerMap[item.sellerCode]?.name || ""}`
                }
                else { return; }
                if (item.code) {
                    lstOptions.push({
                        sellerCode: item.sellerCode,
                        sellerId: sellerMap[item.sellerCode]?.sellerID ?? null,
                        value: item.code ?? "",
                        label,
                    })
                }
            })
            console.log(lstOptions)
            return lstOptions;
        }

        return [];
    }


    const handleSearchSeller = async(text) => {
        const sellerClient = getSellerClient()
        const resp = await sellerClient.getSellerByName(text)
        if(resp.status==="OK"){
            const listOption = resp.data?.map(item => ({
                label:  (item.sellerID ?? "0") + " - " + (item.name ?? "") ,
                value: item.code ?? ""
            })) ?? []
            return listOption
        }
        return []
    }

    const handleSearchCampaign = async(text) => {
        const campaignClient = getSaleCampaignClient()
        const resp = await campaignClient.getListSaleCampaign(0, 20, {campaignName: text})
        if(resp.status==="OK"){
            const listOption = resp.data?.map(item => ({
                label: item.campaignName ?? "",
                value: item.campaignID ?? ""
            })) ?? []
            return listOption
        }
        return []
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
                                Tên CTKM
                            </Typography>
                            <MuiSingleAuto
                                name="campaignID"
                                fullWidth
                                style={{ background: "white" }}
                                placeholder="Nhập tên CTKM"
                                options={props.campaignOpts || []}
                                control={control}
                                errors={errors}
                                onFieldChange={handleSearchCampaign}
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
                                name="sku"
                                fullWidth
                                style={{ background: "white" }}
                                placeholder="Nhập tên sản phẩm"
                                options={props.productOpts || []}
                                control={control}
                                errors={errors}
                                onFieldChange={handleSearchProduct}

                            />


                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                className={styles.title}
                                color="textPrimary"
                                gutterBottom
                            >
                                Nhà bán hàng
                            </Typography>
                            <MuiSingleAuto
                                name="sellerCode"
                                fullWidth
                                style={{ background: "white" }}
                                placeholder="Nhập tên nhà bán hàng"
                                options={props.sellerOpts || []}
                                control={control}
                                errors={errors}
                                onFieldChange={handleSearchSeller}

                            />


                        </Grid>



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
