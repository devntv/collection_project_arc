import { Button, Grid } from '@material-ui/core';
import { MyCardActions } from '@thuocsi/nextjs-components/my-card/my-card';
import { parseQ } from 'components/global';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import MuiSingleAuto from "@thuocsi/nextjs-components/muiauto/single";
import { getProductClient } from "client/product";
import { getSellerClient } from "client/seller";

const defaultFormValues = {
    productID: "",
    sellerCode: ""
};

export const Filter = () => {
    const router = useRouter();
    const defaultFilterValues = parseQ(router.query.q);
    const [productOptions, setProductOptions] = useState([]);
    const [sellerOptions, setSellerOptions] = useState([]);

    const filterForm = useForm({
        defaultValues: {
            ...defaultFormValues,
            ...defaultFilterValues,
        },
        mode: "onChange"
    });

    useEffect(() => {
        searchProduct();
        searchSeller();
    }, []);

    useEffect(() => {
        const q = router?.query?.q ? JSON.parse(router.query.q) : {}
        if (q?.productID) {
            const getProduct = async () => {
                const resp = await getProductClient().getListProductByIds([q?.productID])
                if (resp?.data) {
                    filterForm.setValue("productID", {
                        label: resp.data[0].productID + " - " + resp.data[0].name,
                        value: resp.data[0].productID,
                        productID: resp.data[0].productID,
                        productName: resp.data[0].name
                    })
                }
            }
            getProduct()
        }
        if (q?.sellerCode) {
            const getSeller = async () => {
                const resp = await getSellerClient().getSellerBySellerCodes([q?.sellerCode])
                if (resp?.data) {
                    filterForm.setValue("sellerCode", {
                        label: resp.data[0].sellerID + " - " + resp.data[0].name,
                        value: resp.data[0].code
                    })
                }
            }
            getSeller()
        }
    }, [router.query.q]);

    const applyFilter = async (formData) => {
        Object.keys(formData).forEach(key => {
            if (!formData[key]) delete formData[key]
        });

        if (formData.productID) formData.productID = Number(formData.productID.value)
        if (formData.sellerCode) formData.sellerCode = formData.sellerCode.value

        router?.push({
            query: {
                ...router.query,
                page: 0,
                q: JSON.stringify(formData),
            }
        });
    }

    const handleReset = () => {
        filterForm.reset();
        router?.push({
            pathname: "/marketing/detail-sale-campaign",
            query: {
                code: router.query?.code,
            }
        });
    }

    const searchProduct = async (q = "") => {
        const productClient = getProductClient();
        const productResp = await productClient.getProductListFromClient({
            search: q,
            limit: 10,
            offset: 0,
        });
        setProductOptions(productResp?.data?.map?.(({ productID, name }) => {
            return ({
                label: productID + " - " + name,
                value: productID,
                productID: productID,
                productName: name,
            })
        }) || [])
    };

    const searchSeller = async (text = "") => {
        const sellerClient = getSellerClient();
        const resp = await sellerClient.getListSeller(0, 20, {}, text)
        setSellerOptions(resp?.data?.map?.(item => {
            return ({
                label: item.sellerID + " - " + item.name,
                value: item.code
            })
        }) || [])
    };

    return (
        <form onKeyPress={(e) => {
            if (e.key === "Enter") filterForm.handleSubmit(applyFilter)(e)
        }}>
            <MyCardActions>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <MuiSingleAuto
                            name="productID"
                            control={filterForm.control}
                            errors={filterForm.errors}
                            options={productOptions || []}
                            placeholder="Chọn sản phẩm"
                            onFieldChange={searchProduct}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <MuiSingleAuto
                            name="sellerCode"
                            control={filterForm.control}
                            errors={filterForm.errors}
                            options={sellerOptions || []}
                            placeholder="Chọn nhà bán hàng"
                            onFieldChange={searchSeller}
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