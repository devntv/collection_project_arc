import React from "react";
import { Button } from "@material-ui/core";

export const ImportStatusButton = ({ status }) => {

    const importStatusListLabel = {
        "DONE": "Đã hoàn thành",
        "IN_PROGRESS": "Đang xử lý"
    }

    const importStatusColor = {
        ['IN_PROGRESS']: 'blue',
        ['DONE']: 'green',
    }

    return (
        <Button
            size="small"
            variant="outlined"
            style={{ color: importStatusColor[status], borderColor: importStatusColor[status] }}
        >
            {importStatusListLabel[status] ?? "Không xác định"}
        </Button>
    )
}
