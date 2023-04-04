import { Button } from "@material-ui/core";
import React from "react";
import { checkFulfillmentStatusColor, checkFulfillmentStatusMap } from "view-model/saleCampaign";

export const CheckFulfillmentStatusButton = ({ status }) => {
    return (
        <Button
            size="small"
            variant="outlined"
            style={{ color: checkFulfillmentStatusColor[status], borderColor: checkFulfillmentStatusColor[status] }}
        >
            {checkFulfillmentStatusMap[status] ?? "Không xác định"}
        </Button>
    )
}

export const ProductFulfillmentStatusButton = ({ status }) => {
    const color = {
        ['SUCCESS']: 'green',
        ['FAIL']: 'red',
    }

    const statusMap = {
        ['SUCCESS']: "Hoàn tất",
        ['FAIL']: 'Thất bại',
    }
    
    return (
        <Button
            size="small"
            variant="outlined"
            style={{ color: color[status], borderColor: color[status] }}
        >
            {statusMap[status] ?? "Không xác định"}
        </Button>
    )
}