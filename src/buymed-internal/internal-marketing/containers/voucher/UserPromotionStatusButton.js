import { Button } from '@material-ui/core'
import { UserPromotionStatusColor, UserPromotionStatusLabel, UserPromotionStatusValue } from 'components/promotion-voucher/constant'
import React from 'react'

export default function UserPromotionStatusButton({status}) {
    return (
        <Button
            size="small"
            variant="outlined"
            style={{ color: UserPromotionStatusColor[status], borderColor: UserPromotionStatusColor[status]}}
            disabled={true}
            title={status}
        >
            {UserPromotionStatusLabel[status] ?? "Không xác định"}
        </Button>
    )
}
