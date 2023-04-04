import React from "react";
import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login"
import Head from "next/head";

import AppMarketing from "pages/_layout";
import DealForm from "containers/deal/DealForm/index";
import { getProductClient } from "client/product";
import { getMasterDataClient } from 'client/master-data';
import { getAreaClient } from 'client/area';
import { formatNumber } from "components/global";
import { getSellerClient } from "client/seller";
import AuthorizationScreen from "components/authorization-screen";

async function loadDealData(ctx) {
    const props = {
        skuOptions: [],
        areaMap: {},
        regionMap: {},
    };
    const productClient = getProductClient(ctx, {});
    const skusResp = await productClient.getSkuMainList({ offset: 0, limit: 10 })
    if (skusResp.status !== "OK" || skusResp.data.length == 0) {
        return { props }
    }

    const SkuIsActive = {
        [true]: "Đang hoạt động",
        [false]: "Không hoạt động",
    }

    const skuMap = {}
    const listSkus = skusResp.data?.map(item => {
        skuMap[item.code] = item.skuItems ?? []
        return item.code
    }) || []
    const productsResp = await productClient.getProductListByFilter({ skus: listSkus, getProduct: true })
    if (productsResp.status == "OK") {
        // Get all sellers
        const sellerMap = {};
        productsResp.data?.forEach(({ sku: { sellerCode } }) => {
            if (sellerCode && !sellerMap[sellerCode]) sellerMap[sellerCode] = {};
        })
        const sellerClient = getSellerClient(ctx, {});
        const selerResp = await sellerClient.getSellerBySellerCodes(Object.keys(sellerMap));
        selerResp.data?.forEach((seller) => {
            sellerMap[seller.code] = seller;
        })

        const lstOptions = []
        productsResp?.data.forEach(({ sku, product }) => {
            if (sku.code && product?.name && sku?.sellerCode) {
                const label = `${product.name ?? sku.productCode} - ${sku.code} - ${SkuIsActive[sku.isActive]}`
                lstOptions.push({
                    value: sku.code,
                    sku: sku,
                    sellerCode: sku.sellerCode,
                    product,
                    label,
                    isActive: sku.isActive,
                    skuItems: skuMap[sku.code] ?? []
                })
            }
        })
        props.skuOptions = lstOptions
    }

    props.areaMap["00"] = "Tất cả"
    const resArea = await getAreaClient(ctx, {}).getListArea();
    if (resArea.status == "OK") {
        resArea.data?.forEach(element => {
            props.regionMap[element.code] = element.provinceCodes ?? []
            props.areaMap[element.code] = element.name ?? ""
        });
    }
    const resProvince = await getMasterDataClient(ctx, {}).getProvince(0, 100, '', [], true);
    if (resProvince.status == "OK") {
        resProvince.data?.forEach(element => {
            props.areaMap[element.code] = element.name ?? ""
        });
    }

    return {
        props,
    }
}

export function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, () => loadDealData(ctx))
}


const render = props => {

    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing",
        },
        {
            name: "Danh sách deal",
            link: "/marketing/deal",
        },
        {
            name: 'Thêm deal'
        }
    ]
    return (
        <AppMarketing breadcrumb={breadcrumb}>
            <Head>
                <title>Thêm deal</title>
            </Head>
            <AuthorizationScreen>
                <DealForm {...props} />
            </AuthorizationScreen>
        </AppMarketing>
    )
}

export default function NewDealPage(props) {
    return renderWithLoggedInUser(props, render);
}