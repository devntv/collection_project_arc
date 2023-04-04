import React from 'react';
import { TableCell, TableRow, Tooltip, } from "@material-ui/core";
import Link from "next/link";
import styles from "pages/marketing/history-voucher/styple.module.css";
import { formatDateTime, formatNumber } from "components/global";
import { promoDetail, StatusButton } from './PromoDetail';

export default function TabNotUse(props) {
    const { historyVoucher, promotionMap, page, limit, productMap } = props;

    return (
        <>
            {historyVoucher.length > 0 &&
                historyVoucher.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>{index + 1 + page * limit}</TableCell>
                        <TableCell>
                            {item.promotionId ? (
                                <Link
                                    href={`/marketing/promotion/edit?promotionId=${item.promotionId}`}
                                    prefetch={false}
                                >
                                    <a color="primary" target="_blank" prefetch={false} className={styles.cartLink}>
                                        {promotionMap[item.promotionId]?.promotionName || "-"}
                                    </a>
                                </Link>
                            ) : "-"}
                        </TableCell>

                        <TableCell>
                            
                            <Link
                                href={`/marketing/voucher/edit?voucherId=${item.voucherId}`}
                                prefetch={false}
                            >
                                <a target="_blank" color="primary" className={styles.cartLink}>
                                    {item.code}
                                </a>
                            </Link>
                            
                        </TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>
                            {promoDetail(item?.rewards?.[0], productMap)}
                        </TableCell>

                        <TableCell>
                            Từ:
                            {formatDateTime(item.startTime)}
                            <br />
                            Đến:
                            {formatDateTime(item.endTime)}
                        </TableCell>

                        <TableCell>
                            <StatusButton status={item.status} />
                        </TableCell>

                        <TableCell>
                            {item?.promotionId ? (
                                <StatusButton status={promotionMap[item?.promotionId]?.status} />
                            ) : "-"}
                        </TableCell>
                    </TableRow>
                ))}


            {historyVoucher?.length === 0 && (
                <TableRow>
                    <TableCell colSpan={7} align="left">Không tìm thấy thông tin</TableCell>
                </TableRow>
            )}

        </>
    )
}
