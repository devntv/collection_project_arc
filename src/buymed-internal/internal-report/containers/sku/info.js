import {MyCard, MyCardContent, MyCardHeader} from "@thuocsi/nextjs-components/my-card/my-card";
import {Box} from "@material-ui/core";
import styles from "../../pages/report/sku/sku.module.css";
import React from "react";
import Link from "next/link";

export function SKUInfo({
                            sku = {
                                productID: 0,
                                code: "",
                                productName: "",
                                sellerName: "",
                                slug: ""
                            },
                            t = function (str) {
                                return str
                            }
                        }) {
    return <MyCard>
        <MyCardHeader small={true} title={t`sku:sku_info`}/>
        <MyCardContent>
            <Box className={styles.skuInfo}>
                <label>{t`sku:info.product_id`}</label> {sku?.productID}
            </Box>
            <Box className={styles.skuInfo}>
                <label>{t`sku:info.sku`}</label>
                <Link href={"https://thuocsi.vn/product/" + sku?.slug}>
                    <a target={"_blank"}>
                        {sku?.code}
                    </a>
                </Link>
            </Box>
            <Box className={styles.skuInfo}>
                <label>{t`sku:info.product_name`}</label> {sku?.productName}
            </Box>
            <Box className={styles.skuInfo}>
                <label>{t`sku:info.seller_name`}</label> {sku?.sellerName}
            </Box>
        </MyCardContent>
    </MyCard>
}

export function BriefAnalytics({children, t}) {
    return <MyCard>
        <MyCardHeader small={true} title={t`sku:brief_analytics`} style={ {backgroundColor: "#33aa55"} }/>
        <MyCardContent>
            {children}
        </MyCardContent>
    </MyCard>
}