import { Button } from "@material-ui/core";
import React from "react";
import {saleCampaignStatus , saleCampaignStatusColor } from "view-model/saleCampaign";

export const CampaignStatusButton = ({ campaign }) => {
    return (
        <Button
            size="small"
            variant="outlined"
            style={{ color: saleCampaignStatusColor[campaign.status], borderColor: saleCampaignStatusColor[campaign.status] }}
        >
            {saleCampaignStatus?.filter(item => item.value === campaign.status)[0]?.label ?? "Không xác định"}
        </Button>
    )
}