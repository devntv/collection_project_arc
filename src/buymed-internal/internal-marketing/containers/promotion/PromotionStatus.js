import { Button } from '@material-ui/core';
import React from 'react';

export const PromotionStatus = ({ promotionStatus }) => {

    const status = {
        HIDE: "HIDE",
        ACTIVE: "ACTIVE",
        EXPIRED: "EXPIRED",
    }

    const statusLabel = {
        [status.HIDE]: "Đã ẩn",
        [status.ACTIVE]: "Đang hoạt động",
        [status.EXPIRED]: "Đã hết hạn"
    }

    const statusColor = {
        [status.HIDE]: "gray",
        [status.ACTIVE]: "green",
        [status.EXPIRED]: "red",
    }

    return (
        <Button
            size="small"
            variant="outlined"
            style={{ color: statusColor[promotionStatus], borderColor: statusColor[promotionStatus] }}
        >
            {statusLabel[promotionStatus] ?? "Không xác định"}
        </Button>
    )
}