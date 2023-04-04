import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import { registerTranslatorMap } from "@thuocsi/nextjs-components/my-activity/value-translator";
import AppMarketing from "pages/_layout";
import { getActivities, MyActivity } from "@thuocsi/nextjs-components/my-activity/my-activity";
import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import Head from "next/head";
import React from "react";
import NotFound from "@thuocsi/nextjs-components/not-found/not-found";
import { getPromoClient } from "client/promo";
import { getCustomerClient } from "client/customer";
import { getAreaClient } from "client/area";
import { getSellerClient } from "client/seller";
import { getProductClient } from "client/product";
import { formatDateTime, formatNumber } from "components/global";
import { promotions, promotionTypes, conditions, rewards, defaultCombinationCondition, promotionRewardTypes } from "components/promotion-voucher/constant"
import { getMasterDataClient } from "client/master-data";
import { getTagClient } from "client/tag";
import AuthorizationScreen from "components/authorization-screen";
import { CustomerScopeLabel } from "view-model/customer";

export async function getServerSideProps(ctx) {
    return await doWithLoggedInUser(ctx, loadData);
}

export default function HistoryPage(props) {
    return renderWithLoggedInUser(props, render)
}

// load history of
async function loadData(ctx) {

    let query = ctx.query
    let props = {
        promotionId: query.promotionId
    }, data = { props }

    if (!query.promotionId) {
        props.promotion = false
        return data
    }

    let promoResult = await getPromoClient(ctx, data).getPromotionByID(query.promotionId)

    if (promoResult.status !== "OK") {
        props.promotion = false
        return data
    }

    props.promotion = promoResult.data[0]

    // register values translator
    let dict = {
        promotionType: function (value) {
            return promotionRewardTypes?.filter(item => item.value === value)[0]?.label || "Tất cả"
        },
        promotionOrganizer: function (value) {
            return promotions?.filter(item => item.value === value)[0]?.label || ""
        },
        status: function (value) {
            return value === "ACTIVE" ? "Đang hoạt động" : "Ngưng hoạt động"
        },
        scopes: async function (value) {
            const result = await Promise.all(JSON.parse(value)?.map(async (item) => {
                if (item.type === "CUSTOMER_LEVEL") {
                    if (item.quantityType === "ALL") return "Đối tượng: Tất cả"
                    const resp = await getCustomerClient(ctx, {}).getLevel();
                    const arr = []
                    if (resp.status === "OK") {
                        item?.customerLevelCodes.map((code) => {
                            const level = resp.data?.find((v) => v.code == code)
                            if (level) {
                                arr.unshift(level.name)
                            }
                        });
                        return `Đối tượng: ${arr?.toString()}`
                    }

                }

                if (item.type === "CUSTOMER_SCOPE") {
                    if (item.quantityType === "ALL") return "Vai trò khách hàng: Tất cả"
                    let arr = []
                    item?.customerScopes.map((code) => {
                        const scope = CustomerScopeLabel[code]
                        if (scope) {
                            arr.unshift(scope)
                        }
                    });
                    return `Vai trò: ${arr?.toString()}`

                }

                if (item.quantityType === "ALL") return "Khu vực: Tất cả"
                const areaResp = await getAreaClient(ctx, {}).getListAreaByCodes(item?.areaCodes);
                let area = ""
                if (areaResp.status === "OK") {
                    area = areaResp?.data?.map(element => element.name)?.toString()
                }
                const resProvince = await getMasterDataClient(ctx, {}).getProvince(0, 100, "", "");
                const arr = []
                if (resProvince.status === "OK") {
                    item?.areaCodes.map((code) => {
                        const province = resProvince.data?.find((v) => v.code == code)
                        if (province) {
                            arr.unshift(province.name)
                        }
                    });
                    area = area !== "" ? area + "," + arr?.toString() : arr?.toString()


                }

                return `Khu vực: ${area}`
            }))
            return result?.join("\n") || ""
        },
        andConditions: async function (defaultValue) {
            let value = JSON.parse(defaultValue ?? "{}")
            let _condition = ``
            if (value?.["CUSTOMER_HISTORY"]) {
                let combinationType = ""
                if (value?.["CUSTOMER_HISTORY"]?.andConditions?.length > 0) {
                    combinationType = "andConditions"
                    _condition += `Loại điều kiện: theo khách hàng
                    \nLoại kết hợp: AND
                    
                    `
                } else if (value?.["CUSTOMER_HISTORY"]?.orConditions?.length > 0){
                    combinationType = "orConditions"
                    _condition += `Loại điều kiện: theo khách hàng
                    \nLoại kết hợp: OR
                    
                    `
                } else {
                    _condition = "-"
                }

                value?.["CUSTOMER_HISTORY"]?.[combinationType]?.forEach((item, index) => {
                    _condition += `\nSố ngày không đặt hàng: ${item.minDayNoOrder || 0}
                    \nSố đơn hàng tối thiểu: ${item.minOrderCount || 0}
                    \nSố đơn hàng tối đa: ${item.maxOrderCount || 0}
                    \n _____________________________
                    `
                })
            }

            if (value?.["ORDER_VALUE"]) {
                let combinationType = ""
                if (value?.["ORDER_VALUE"]?.andConditions?.length > 0) {
                    combinationType = "andConditions"
                    _condition += `${_condition === `` ? `` : "\n"}Loại điều kiện: theo đơn hàng
                    \nLoại kết hợp: AND
                    
                    `
                } else if (value?.["ORDER_VALUE"]?.orConditions?.length > 0){  
                    combinationType = "orConditions"
                    _condition += `${_condition === `` ? `` : "\n"}Loại điều kiện: theo đơn hàng
                    \nLoại kết hợp: OR
                    
                    `
                } else {
                    _condition += "-"
                }

                value?.["ORDER_VALUE"]?.[combinationType]?.forEach((item) => {
                    _condition += `\nGiá trị nhỏ nhất của đơn hàng: ${formatNumber(item?.orderMinTotalPrice || 0)}
                    \n _____________________________
                    `
                })
            }

            if (value?.["PRODUCT"]) {
                let combinationType = ""
                if (value?.["PRODUCT"]?.andConditions?.length > 0) {
                    combinationType = "andConditions"
                    _condition += `${_condition === `` ? `` : "\n"}Loại điều kiện: theo sản phẩm
                    \nLoại kết hợp: AND
                    
                    `
                } else if (value?.["PRODUCT"]?.orConditions?.length > 0)  {
                    combinationType = "orConditions"
                    _condition += `${_condition === `` ? `` : "\n"}Loại điều kiện: theo sản phẩm
                    \nLoại kết hợp: OR
                    
                    `
                } else {
                    _condition += "-"
                }

                let sellerCodes = []
                let productIds = []
                value?.["PRODUCT"]?.[combinationType]?.forEach(condition => {
                    if (condition.sellerCode) sellerCodes.push(condition.sellerCode)
                    if (condition.productId) productIds.push(condition.productId)
                })

                let sellerMap = {}
                const sellerResp = await getSellerClient(ctx, {}).getSellerBySellerCodes(sellerCodes)
                if (sellerResp.status === "OK") {
                    sellerResp.data?.forEach(seller => {
                        sellerMap[seller.code] = `${seller.code} - ${seller.name}`

                    })
                }

                let productMap = {}
                const productResp = await getProductClient(ctx, {}).getListProductByIds(productIds)
                if (productResp.status === "OK") {
                    productResp.data?.forEach(product => {
                        productMap[product.code] = product.name
                    })
                }

                value?.["PRODUCT"]?.[combinationType]?.forEach(condition => {
                    _condition += `\nNhà bán hàng: ${condition.sellerCode ? sellerMap[condition.sellerCode] : "Tất cả"}
                    \nTên sản phẩm: ${productMap[condition.productCode]}
                    \nSố lượng yêu cầu: ${condition.minQuantity ?? 0}
                    \nGiá trị tối thiểu: ${formatNumber(condition.minTotalPrice ?? 0)}
                    \n _____________________________
                    `
                })

            }

            if (value?.["PRODUCT_TAG"]) {
                let combinationType = ""
                if (value?.["PRODUCT_TAG"]?.andConditions?.length > 0) {
                    combinationType = "andConditions"
                    _condition += `${_condition === `` ? `` : "\n"}Loại điều kiện: theo tag sản phẩm
                    \nLoại kết hợp: AND
                    
                    `
                } else if (value?.["PRODUCT_TAG"]?.orConditions?.length > 0) {
                    combinationType = "orConditions"
                    _condition += `${_condition === `` ? `` : "\n"}Loại điều kiện: theo tag sản phẩm
                    \nLoại kết hợp: OR
                    `
                } else {
                    _condition += "-"
                }

                let sellerCodes = []
                let tagCodes = []
                value?.["PRODUCT_TAG"]?.[combinationType]?.forEach(condition => {
                    if (condition.tagSellerCode) sellerCodes.push(condition.tagSellerCode)
                    if (condition.tagCode) tagCodes.push(condition.tagCode)
                })

                let sellerMap = {}
                const sellerResp = await getSellerClient(ctx, {}).getSellerBySellerCodes(sellerCodes)
                if (sellerResp.status === "OK") {
                    sellerResp.data?.forEach(seller => {
                        sellerMap[seller.code] = `${seller.code} - ${seller.name}`

                    })
                }

                let tagMap = {}
                const tagResp = await getTagClient(ctx, {}).getTagByTagCodes(tagCodes)
                if (tagResp.status === "OK") {
                    tagResp.data?.forEach(tag => {
                        tagMap[tag.code] = tag.name
                    })
                }

                value?.["PRODUCT_TAG"]?.[combinationType]?.forEach(condition => {
                    _condition += `\nNhà bán hàng: ${condition.tagSellerCode ? sellerMap[condition.tagSellerCode] : "Tất cả"}
                    \nTên tag: ${tagMap[condition.tagCode]}
                    \nSố lượng yêu cầu: ${condition.tagMinQuantity ?? 0}
                    \nGiá trị tối thiểu: ${formatNumber(condition.tagMinTotalPrice ?? 0)} 
                    \n _____________________________         
                    `
                })

            }

            if (Object.keys(value).length === 0 || _condition?.includes("--")) {
                _condition = "-"
            }
            return _condition
        },
        rewards: async function (value) {
            const result = await Promise.all(JSON.parse(value)?.map(async (item) => {
                let str = `Loại điều kiện áp dụng: ${rewards?.filter(el => el.value === item.type)[0]?.label || ""}`
                if (item.type === "PERCENTAGE") {
                    str += `\nGiá trị giảm giá theo %: ${item.percentageDiscount}
                        \nGiá trị giảm tối đa: ${formatNumber(item.maxDiscount)} `
                } else if (item.type === "ABSOLUTE") {
                    str += `\nGiá trị giảm tuyệt đối: ${formatNumber(item.absoluteDiscount)} `
                } else if (item.type === "POINT") {
                    str += `\nSố điểm tặng: ${item.pointValue} `
                } 
                if (item.gifts?.length > 0) {
                    await Promise.all(item.gifts?.map(async (element) => {
                        let textPrd = ""
                        if (element.sku) {
                            const productResp = await getProductClient(ctx, {}).getProductListBySKUs([element.sku]);
                            textPrd = productResp?.data[0]?.product?.name || ""
                        }
    
                        if (item.type === "GIFT") str += `\nSản phẩm tặng kèm: ${textPrd}
                        \nSố lượng được tặng: ${element.quantity} `
                        else {
                            str += `\nSản phẩm khuyến mãi: ${textPrd}`
                        }
                        
                        return str
                    }))
                }
                return str
            }))
            return result?.join("\n") || "-"
        },
        publicTime: formatDateTime,
        startTime: formatDateTime,
        endTime: formatDateTime
    }
    registerTranslatorMap({
        "create-promotion": dict,
        "update-promotion": dict,
        "copy-promotion": dict,
        "update-promotion-status": dict
    })

    props.activities = await getActivities(ctx, data, {
        target: "promotion",
        primaryKey: query.promotionId
    })

    return data
}

function render({ promotion, activities }) {

    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing"
        },
        {
            name: "Danh sách chương trình",
            link: "/marketing/promotion"
        },
        {
            name: "Lịch sử cập nhật chương trình",
        },
    ]

    if (!promotion) {
        return <AppMarketing breadcrumb={breadcrumb}>
            <NotFound />
        </AppMarketing>
    }

    return (
        <AuthorizationScreen>
            <AppMarketing breadcrumb={breadcrumb}>
                <Head>
                    <title>{"Lịch sử cập nhật chương trình"} {promotion.promotionId}</title>
                </Head>
                <MyCard>
                    <MyCardHeader title={`Khuyến mãi #${promotion.promotionId} - ${promotion.promotionName}`} />
                    <MyCardContent>
                        <MyActivity
                            data={activities.data}
                            message={"Không tìm thấy lịch sử cập nhật chương trình"}
                        >
                        </MyActivity>
                    </MyCardContent>
                </MyCard>
            </AppMarketing>
        </AuthorizationScreen >

    )
}