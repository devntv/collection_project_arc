import React from 'react';
import { TableCell, TableRow, Tooltip, Button, Tab, Typography } from "@material-ui/core";
import Link from "next/link";
import styles from "pages/marketing/history-voucher/styple.module.css";
import { formatDateTime, formatNumber } from "components/global";
import Chip from "@material-ui/core/Chip";
import PhoneIcon from '@material-ui/icons/Phone';
import { handleVoucherRewardInOrder, promoDetail, StatusButton } from './PromoDetail';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

export default function TabHasOrder(props) {
    const { historyVoucher, promotionMap, page, limit, orderMap, productMap, customerMap, orderDiscountMap } = props;

    return (
        <>
            {orderMap?.length > 0 &&
                orderMap.map((item, index) => {
                    return (
                        <TableRow key={index}>
                            <TableCell>{index + 1 + page * limit}</TableCell>
                            <TableCell>
                                <Link
                                    href={`/crm/customer/detail?customerCode=${item.customerCode}`}
                                    prefetch={false}>
                                    <a color="primary" target="_blank" prefetch={false} className={styles.cartLink}>
                                        {item.customerId + " - " + (customerMap[item.customerId]?.name || "")}
                                    </a>
                                </Link>
                                <br />


                                <Chip
                                    icon={<PhoneIcon />}
                                    label={customerMap[item.customerId]?.phone || ""}
                                />
                            </TableCell>

                            <TableCell>
                                <Link
                                    href={`/crm/order/detail?orderId=${item.orderId}`}
                                    prefetch={false}>
                                    <a color="primary" target="_blank" prefetch={false} className={styles.cartLink}>
                                        <span style={{ color: "black" }}>ID đơn hàng: </span> {item.orderId}
                                    </a>
                                </Link>

                                <br />
                                Tổng giá trị: {formatNumber(item.totalPrice)}
                                <br />
                                Số sản phẩm: {item.totalItem}
                            </TableCell>

                            <TableCell>
                                {formatDateTime(item.createdTime)}
                            </TableCell>

                            {
                                item.redeemCode?.map((voucher, index) => {
                                    let voucherInfo = historyVoucher[voucher] ?? {}
                                    let voucherResult = orderDiscountMap?.[item.orderId]?.[voucherInfo.code] || {}
                                    return (
                                        <TableCell key={index}>
                                            {handleVoucherRewardInOrder(voucherInfo, productMap, promotionMap, voucherResult)}
                                        </TableCell>
                                    )
                                })
                            }


                            {item.redeemCode?.length <= 1 && <TableCell>-</TableCell>}

                        </TableRow>
                    )
                })}

            {orderMap?.length === 0 && (
                <TableRow>
                    <TableCell colSpan={7} align="left">Không tìm thấy thông tin</TableCell>
                </TableRow>
            )}

        </>
    )
}
