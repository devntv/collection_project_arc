import React from 'react';
import { TableCell, TableRow, Tooltip, Button } from "@material-ui/core";
import Link from "next/link";
import styles from "pages/marketing/history-voucher/styple.module.css";
import { formatDateTime, formatNumber } from "components/global";
import Chip from "@material-ui/core/Chip";
import PhoneIcon from '@material-ui/icons/Phone';
import { handleVoucherRewardInOrder, promoDetail, StatusButton } from './PromoDetail';

export default function TabHasVoucher(props) {
    const { historyVoucher, promotionMap, page, limit, cartMap, productMap, customerMap } = props;

    return (
        <>

            {cartMap?.length > 0 &&
                cartMap.map((item, index) => {
                    return (
                        <TableRow key={index}>
                            <TableCell>{index + 1 + page * limit}</TableCell>
                            <TableCell>
                                <Link
                                    href={`/crm/customer/detail?customerCode=${item.customerCode}`}
                                    prefetch={false}>
                                    <Tooltip
                                        title={`Nhấn để xem chi tiết khách hàng ${customerMap[item.customerId]?.name || ""}`}>
                                        <a color="primary" className={styles.cartLink}>
                                            {item.customerId + " - " + (customerMap[item.customerId]?.name || "")}
                                        </a>
                                    </Tooltip>
                                </Link>
                                <br />


                                <Chip
                                    icon={<PhoneIcon />}
                                    label={customerMap[item.customerId]?.phone || ""}
                                />

                            </TableCell>

                            <TableCell>
                                <Link
                                    href={`/crm/customer/order?phone=${customerMap[item.customerId]?.phone || ""}`}
                                    prefetch={false}>
                                    <a color="primary" target="_blank" prefetch={false} className={styles.cartLink}>
                                        <span style={{ color: "black" }}>ID giỏ hàng: </span> {item.cartId}
                                    </a>
                                </Link>

                                <br />
                                Tổng giá trị: {formatNumber(item.subPrice)}
                                <br />
                                Số sản phẩm: {item.totalItem}
                            </TableCell>

                            {
                                item.redeemCode?.map((voucher, index) => {
                                    let voucherInfo = historyVoucher[voucher] ?? {}
                                    return (
                                        <TableCell key={index}>
                                            {handleVoucherRewardInOrder(voucherInfo, productMap, promotionMap)}
                                        </TableCell>
                                    )
                                })
                            }

                            {item.redeemCode?.length <= 1 && <TableCell>-</TableCell>}

                        </TableRow>
                    )
                })}

            {cartMap?.length === 0 && (
                <TableRow>
                    <TableCell colSpan={7} align="left">Không tìm thấy thông tin</TableCell>
                </TableRow>
            )}

        </>
    )
}
