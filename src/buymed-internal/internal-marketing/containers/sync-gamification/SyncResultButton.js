import { Button } from "@material-ui/core";
import React from "react";
import { syncGamificationStatusColor, syncGamificationStatusMap } from "view-model/gamification";

export const SyncResultButton = ({ status }) => {
    return (
        <Button
            size="small"
            variant="outlined"
            style={{ color: syncGamificationStatusColor[status], borderColor: syncGamificationStatusColor[status] }}
        >
            {syncGamificationStatusMap[status] ?? "Không xác định"}
        </Button>
    )
}