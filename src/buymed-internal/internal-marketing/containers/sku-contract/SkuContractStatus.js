import { Button } from "@material-ui/core";
import React from "react";

export const SaleCampaignStatus = {
    UPCOMING: "UPCOMING",
    PROCESSING: "PROCESSING",
    EXPIRED: "EXPIRED",
}

export const SaleCampaignStatusLabel = {
    [SaleCampaignStatus.UPCOMING]: "Sắp diễn ra",
    [SaleCampaignStatus.PROCESSING]: "Đang diễn ra",
    [SaleCampaignStatus.EXPIRED]: "Đã kết thúc",
}

export const SaleCampaignStatusColor = {
    [SaleCampaignStatus.EXPIRED]: "gray",
    [SaleCampaignStatus.UPCOMING]: "blue",
    [SaleCampaignStatus.PROCESSING]: "green",
}

export const SaleCampaignButton = ( {status} ) => {
    return (
        <Button
            size="small"
            variant="outlined"
            style={{ color: SaleCampaignStatusColor[status], borderColor: SaleCampaignStatusColor[status] }}
            disabled={status === SaleCampaignStatus.DELETED || status === SaleCampaignStatus.EXPIRED}
            title={status}
        >
            {SaleCampaignStatusLabel[status] ?? "Không xác định"}
        </Button>
    )
}