import React from "react";
import Head from "next/head";
import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login"

import AppMarketing from "pages/_layout";
import DealForm from "containers/deal/DealForm/index";
import { getDealClient } from "client/deal";
import { getMasterDataClient } from 'client/master-data';
import { getAreaClient } from 'client/area';
import { unknownErrorText } from "components/commonErrors";
import { getProductClient } from "client/product";
import { DealType } from "view-model/deal";
import { SkuType } from "view-model/sku";
import { formatNumber } from "components/global";
import { v4 as uuidv4 } from 'uuid';
import NotFound from "@thuocsi/nextjs-components/not-found/not-found";
import AuthorizationScreen from "components/authorization-screen";

async function loadDealData(ctx) {
    const dealCode = ctx.query.dealCode;
    const props = {
        skuOptions: [],
        deal: null,
        message: "",
        areaMap: {},
        regionMap: {}
    };

    if (!dealCode) {
        props.message = "Không tìm thấy kết quả phù hợp.";
        return { props };
    }
    const dealClient = getDealClient(ctx, {});
    const dealResp = await dealClient.getDealByCode({ q: JSON.stringify({ code: dealCode }) });
    if (dealResp.status !== "OK") {
        if (dealResp.status === "NOT_FOUND") {
            props.message = "Không tìm thấy kết quả phù hợp.";
        } else {
            props.message = dealResp.message ?? unknownErrorText;
        }
        return { props };
    }
    props.deal = dealResp.data[0];

    const productClient = getProductClient(ctx, {});
    const listSkus = []

    const comboSku = props.deal?.skus?.[0]?.sku;
    if (
        comboSku &&
        props.deal.dealType === DealType.COMBO &&
        (props.deal?.skus?.length ?? 0) === 1
    ) {
        const skuResp = await productClient.getSku({ q: JSON.stringify({ code: comboSku }) });
        // Re-check sku type
        if (skuResp.data?.[0]?.type === SkuType.COMBO) {
            props.deal.comboLocationCodes = skuResp.data?.[0]?.locationCodes;
            props.deal.skus = skuResp.data?.[0]?.skus ?? [];
        }
    }
    props.deal?.skus?.forEach(item => {
        listSkus.push(item.sku)
    })

    const SkuIsActive = {
        [true]: "Đang hoạt động",
        [false]: "Không hoạt động",
    }

    const productResp = await productClient.getProductListByFilter({ skus: listSkus, getProduct: true })
    if (productResp.status === "OK") {
        props.productInfo = productResp.data
        productResp.data?.forEach(({ product, sku }) => {
            const { code, isActive, retailPriceValue } = sku;
            let label = product.name ?? sku.productCode;
            label += ` - ${code} - ${SkuIsActive[isActive]}`;
            // label += ` - ${formatNumber(retailPriceValue)}`;
            if (props.deal.skus.length) {
                props.deal.skus[0].label = label
                props.deal.skus[0].skuItems = sku.skuItems || []
            }
        })
    }

    const skusResp = await productClient.getSkuMainList({ q: JSON.stringify({ code: listSkus[0] }), offset: 0, limit: 10 })
    if (skusResp.status === "OK") {
        let skuItemCodes = []
        const getSkuItems = skusResp.data?.map(async (sku) => {
            if (sku?.skuItems?.length) {
                sku?.skuItems.forEach(element => {
                    skuItemCodes.push(element.itemCode)
                });
            }

            const respItem = await productClient.getSkuItemList({ itemCodes: skuItemCodes })

            if (respItem.status === "OK") {
                const skuItemMap = {}
                respItem.data?.forEach(element => {
                    skuItemMap[element.itemCode] = element.retailPriceValue || 0
                });

                sku.skuItems = sku.skuItems?.map(element => {
                    if (skuItemMap[element.itemCode]) {
                        element.retailPriceValue = skuItemMap[element.itemCode] || 0
                    }
                    return element
                });
            }
            if (props.deal.skus.length) {
                props.deal.skus[0].skuItems = sku.skuItems || []
            }
            return sku
        })

        await Promise.all(getSkuItems)
    }

    if (!props.deal.customerLevelCodes || !props.deal.customerLevelCodes.length) {
        props.deal.customerLevelCodes = ['ALL'];
    }
    if (!props.deal.areaCodes || !props.deal.areaCodes.length || (props.deal.areaCodes.length && props.deal.areaCodes.find(item => item === "00"))) {
        props.deal.areaCodes = ['ALL'];
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


    if (props.deal.autoUpdateDataSku?.length > 0) props.deal.autoUpdateDataSku = props.deal.autoUpdateDataSku?.map((item) => {
        let newItem = {
            id: uuidv4(),
            nextStatus: item.nextStatus ?? "",
            skuItemCode: {
                label: item.skuItemCode,
                value: item.skuItemCode
            },
        }

        if (item.isInActive) newItem.nextStatus = "OFF_SKU"
        return newItem
    })

    return {
        props,
    }
}

export function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, async () => {
        return await loadDealData(ctx)
    })
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
            name: "Cập nhật deal"
        }
    ]
    return (

        <AppMarketing breadcrumb={breadcrumb}>
            <Head>
                <title>Cập nhật deal</title>
            </Head>
            <AuthorizationScreen>
                {!props.deal?.code || props.deal?.code === "" ? (
                    <NotFound linkAddress={"/marketing/deal"}
                        linkLabel="Danh sách deal" />
                ) : <DealForm {...props} isUpdate />}
            </AuthorizationScreen>
        </AppMarketing>
    )
}

export default function NewDealPage(props) {
    return renderWithLoggedInUser(props, render);
}