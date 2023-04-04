import { Button, Grid, Typography, makeStyles, TextField } from '@material-ui/core';
import { MyCardActions } from '@thuocsi/nextjs-components/my-card/my-card';
import { parseQ } from 'components/global';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import MuiSingleAuto from "@thuocsi/nextjs-components/muiauto/single";
import { getProductClient } from 'client/product';

const defaultFormValues = {
    isValid: "",
    sku: ""
};

const resultOpts = [
    { label: "Đạt yêu cầu", value: true },
    { label: "Không đạt yêu cầu", value: false },
]

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: "bold",
    },
    textField: {
        background: "white"
    }
}))

export const CheckFulfillmentDetailFilter = () => {
    const router = useRouter();
    const styles = useStyles();
    const [productOptions, setProductOptions] = useState([]);

    const defaultFilterValues = parseQ(router.query.q);

    const filterForm = useForm({
        defaultValues: {
            ...defaultFormValues,
            ...defaultFilterValues,
        },
        mode: "onChange"
    });

    const searchProduct = async (q = "") => {
        let listMapProductSku = {};

        const productClient = getProductClient();
        const skusResp = await productClient.getSkuList({
            search: q,
            limit: 20,
            offset: 0,
        });

        const skus = skusResp.data?.map(item => item.code) || []

        const productResp = await productClient.getProductListByFilterFromClient({
            skus,
            getProduct: true
        });

        if (productResp.status === "OK") {
            productResp.data?.forEach((prd) => {
                if (prd && prd.product) {
                    listMapProductSku[prd.product.code] = prd.product || {};
                }
            });
        }

        // Map data to options
        let lstOptions = [];
        skusResp.data?.forEach(
            ({ code, productCode, sellerCode, isActive, retailPriceValue }) => {
                if (listMapProductSku[productCode] && code) {
                    let label = `${code} - ${listMapProductSku[productCode]?.name ?? ""}`;
                    lstOptions.push({
                        value: code ?? "",
                        label,
                    });
                }

            }
        );
        setProductOptions(lstOptions)
    };


    useEffect(() => {
        searchProduct("")
    }, [])

    useEffect(() => {
        const q = router?.query?.q ? JSON.parse(router.query.q) : {}
        if (q.isValid !== null && q.isValid !== "") {
            filterForm.setValue("isValid", resultOpts.filter(({ value }) => value === q.isValid)?.[0] || null)
        }

        if (q?.sku) {
            const getProduct = async () => {
                const resp = await getProductClient().getProductListBySKUs([q?.sku])
                if (resp?.data?.[0]) {
                    let sku = resp.data[0] ?? {}
                    filterForm.setValue("sku", {
                        label: `${sku.sku?.code || ""} - ${sku.product?.name || ""}`,
                        value: sku.sku?.code || "",
                    })
                }
            }
            getProduct()
        }

    }, [router.query.q]);

    const applyFilter = async (formData) => {
        Object.keys(formData).forEach(key => {
            if (!formData[key]) delete formData[key]
        });

        if (formData.isValid) formData.isValid = formData.isValid.value
        if (formData.sku) formData.sku = formData.sku.value

        router.push({
            query: {
                ...router.query,
                page: 0,
                q: JSON.stringify(formData),
            }
        });
    }

    const handleReset = () => {
        filterForm.reset();
        router.push({
            pathname: "/marketing/check-product-fulfillment/detail",
            query: {
                code: router.query?.code,
            }
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
                            Sku
                        </Typography>

                        <MuiSingleAuto
                            name="sku"
                            control={filterForm.control}
                            errors={filterForm.errors}
                            options={productOptions || []}
                            placeholder="Tìm kiếm Sku"
                            onFieldChange={searchProduct}
                            style={{ background: "white" }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            Kết quả
                        </Typography>

                        <MuiSingleAuto
                            name="isValid"
                            control={filterForm.control}
                            errors={filterForm.errors}
                            options={resultOpts}
                            placeholder="Tất cả"
                            style={{ background: "white" }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container justifyContent="flex-end" spacing={1}>
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