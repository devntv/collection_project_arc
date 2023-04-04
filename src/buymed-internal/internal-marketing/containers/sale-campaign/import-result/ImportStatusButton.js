import { Button } from "@material-ui/core";
import React from "react";
import { importStatusListLabel, importStatusColor } from "view-model/saleCampaign";

export const ImportStatusButton = ({ status }) => {
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
