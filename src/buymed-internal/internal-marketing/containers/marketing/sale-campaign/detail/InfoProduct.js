import { Grid, makeStyles, Typography, Box, Tooltip } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { formatNumber, SKUStatusText } from "components/global";
import { getSellerClient } from "client/seller";
import { getProductClient } from 'client/product';
import { MyCard, MyCardContent } from '@thuocsi/nextjs-components/my-card/my-card';
import styles from './detail.module.css'
import { SkuStatus } from 'view-model/sku';
import clsx from "clsx"

const useStyles = makeStyles(() => ({
    fieldLabel: {
        fontWeight: "bold"
    },
    box: {
        padding: '10px',
        border: "1px solid #4F4F4F",
        borderRadius: "3px",
        width: "100%"

    },
    grid: {
        paddingBottom: "0px!important",
    }
}))

export function InfoLine({ label, val, isActive, type }) {
    return <Box className={styles.infoLine}>
        <span className={clsx(styles.circle, isActive ? styles.active : isActive === false ? styles.inactive : styles.normal)}></span>
        <span className={type === "code" ? styles.title : styles.label}>{label}</span>
        {type === "location" ?
            <Tooltip title={val}>
                <span className={styles.valueLocation}>{val}</span>
            </Tooltip>
            :
            type !== "code" ? <span className={styles.value}>{val}</span> : ""
        }
    </Box>
}

export function getFirstImage(val) {
    if (val && val.length > 0) {
        return val[0];
    }
    return `/default.png`;
}

export default function InfoProduct({ product, size, areaMap }) {
    const styles = useStyles()
    const [seller, setSeller] = useState("")
    const [skuItems, setSkuItems] = useState([])

    const getSkuItems = (product) => {
        if (product) {
            setSkuItems(product.items)
            return
        }
        setSkuItems([])
    }

    useEffect(() => {
        const getSeller = async () => {
            const res = await getSellerClient().getSellerBySellerCodes([product.sellerCode])
            setSeller(res?.data[0]?.name || "")
        }
        getSeller()
        getSkuItems(product)
    }, [product])

    return (
        <React.Fragment>

            <Grid item xs={12} sm={size} >

                <Grid container item xs={12} className={styles.box} alignItems="center" spacing={2}>
                    <Grid container spacing={1} item xs={3} justifyContent="center">
                        <Grid item>
                            <img src={product.imageUrls ? product.imageUrls[0] : ""} title="image" alt="image" width={100} height={100} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} item xs={9}>
                        <Grid item xs={6} md={3}>
                            <Typography className={styles.fieldLabel}>Tên sản phẩm</Typography>
                        </Grid>
                        <Grid item xs={6} md={9}>
                            <Typography style={{ color: "green" }}>{product.name}</Typography>
                        </Grid>

                        <Grid item xs={6} md={3}>
                            <Typography className={styles.fieldLabel}>Nhà bán hàng</Typography>
                        </Grid>
                        <Grid item xs={6} md={9}>
                            <Typography>{seller}</Typography>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Typography className={styles.fieldLabel}>Trạng thái</Typography>
                        </Grid>
                        <Grid item xs={6} md={9}>
                            <Typography>{SKUStatusText[product.status]}</Typography>
                        </Grid>

                    </Grid>


                    <Grid item xs={12} className={styles.grid}>
                        <Typography className={styles.fieldLabel}>Danh sách sku con:</Typography>
                    </Grid>

                    {
                        skuItems.length > 0 ?
                            skuItems.map((row) =>
                                <Grid item sm={12} md={6}>
                                    <MyCard style={{ width: "100%", marginBottom: "0px" }}>
                                        <MyCardContent>
                                            <InfoLine type="code" label={row.itemCode} val="" isActive={(row.status === SkuStatus.NORMAL || row.status === SkuStatus.LIMIT) && row.isActive}></InfoLine>
                                            <InfoLine label="Giá" val={formatNumber(row.retailPriceValue || 0)}></InfoLine>
                                            <InfoLine type="location" label="Khu vực áp dụng" val={row.locationCodes && row.locationCodes?.map(location => areaMap[location] ?? "")?.join(",")}></InfoLine>
                                        </MyCardContent>
                                    </MyCard>
                                </Grid>
                            )
                            : ""
                    }

                </Grid>
            </Grid>
        </React.Fragment>
    )
}
