import { Tooltip, TableCell, TableRow, IconButton, Checkbox, Chip } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import UserPromotionStatusButton from './UserPromotionStatusButton'
import DeleteIcon from '@material-ui/icons/Delete';
import styles from "./voucher.module.css";
import { UserPromotionStatusValue } from 'components/promotion-voucher/constant';
import { Done } from '@material-ui/icons';
import { formatNumber } from 'components/global';
import PhoneIcon from '@material-ui/icons/Phone';

export default function ApplicableCustomerItem({
    isChooseAll,
    setIds,
    ids,
    user,
    handleUpdateCustomer,
    voucher,
    available = true,
    isViewOnly
}) {

    const [isChecked, setIsChecked] = useState(isChooseAll)

    useEffect(() => {
        setIsChecked(isChooseAll)
    }, [isChooseAll])

    useEffect(() => {
        if (ids.indexOf(user.customerId) !== -1) setIsChecked(true)
    }, [ids])

    return (
        <TableRow key={user.customerId}>
            <TableCell align="left">
                <Checkbox
                    checked={isChecked}
                    onChange={(e) => {
                        setIsChecked(e.target.checked)
                        if (e.target.checked === true) {
                            setIds([...ids, user.customerId])
                        }
                        else {
                            let list = ids.filter(item => item !== user.customerId)
                            setIds(list)
                        }
                    }}>
                </Checkbox>

            </TableCell>

            <TableCell align="center">
                <Link
                    href={`/crm/customer/detail?customerCode=${user.code}&customerId=${user.customerId}`}
                    prefetch={false}>
                    <a target="_blank" prefetch={false} color="primary" className={styles.cartLink}>
                        {user?.customerId + " - " + (user?.name || "")}
                    </a>
                </Link>
                <br />

                <Chip
                    icon={<PhoneIcon />}
                    label={user.phone || ""}
                />
            </TableCell>

            {available && (
                <>
                    <TableCell align="left">
                        {user.amount ?? "0"}
                    </TableCell>

                    <TableCell align="left">
                        {voucher.maxUsagePerCustomer === 0 ? "Không giới hạn" : formatNumber(voucher.maxUsagePerCustomer)}
                    </TableCell>
                </>
            )}

            {available && (
                <TableCell align="left">
                    <UserPromotionStatusButton status={user.status} />
                </TableCell>
            )}

            <TableCell>
                {!isViewOnly && (
                    <Tooltip title="Xóa khách hàng">
                        <IconButton
                            aria-label="delete"
                            disabled={user.status === UserPromotionStatusValue.DELETED}
                            onClick={() => handleUpdateCustomer(user.customerId, UserPromotionStatusValue.DELETED)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                )}

            </TableCell>
        </TableRow>
    )
}
