import React from 'react'
import styles from './detail.module.css'
import { SkuStatus, SkuStatusText } from 'view-model/sku';
import clsx from "clsx"
import { Box, Tooltip, Typography } from '@material-ui/core';
import { formatNumber } from 'components/global';
import Link from "next/link";

export default function SkuItemInfo({ status, item, areaMap, handleUrlSku }) {
    let isActive = (status === SkuStatus.NORMAL || status === SkuStatus.LIMIT) && item.isActive
    let locations = item.locationCodes && item.locationCodes?.map(location => areaMap[location] ?? "")?.join(", ")
    let url = handleUrlSku(item.sellerCode, item.sellerClass === "INTERNAL" ? item.itemCode : item.code)

    return (
        <React.Fragment>
            <Tooltip title={<React.Fragment>
                <span>
                    Hiển thị: {item.isActive ? "Bật" : "Tắt"}
                </span>
                <br />
                <span>
                    Trạng thái: {SkuStatusText[status] ?? "Không xác định"}
                </span>
                <br />
                <span>
                    Khu vực áp dụng: {locations}
                </span>

            </React.Fragment>}>
                <Box className={styles.skuItemInfo}>
                    <span className={clsx(styles.circle, isActive ? styles.active : isActive === false ? styles.inactive : styles.normal)}></span>

                    <Link
                        href={url}
                        prefetch={false}>
                        <a target="_blank" prefetch={false} color="primary" style={{
                            textDecoration: "none",
                            cursor: "pointer",
                            color: "green",
                            fontWeight: "bold"
                        }}>
                            {item.itemCode}
                        </a>
                    </Link>

                </Box>
            </Tooltip>

            <span>Giá: {formatNumber(item.retailPriceValue || 0)}</span>
        </React.Fragment>

    )
}
