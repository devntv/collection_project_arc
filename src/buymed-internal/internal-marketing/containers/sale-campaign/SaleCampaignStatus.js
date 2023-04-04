import { Button } from "@material-ui/core";
import React from "react";

export const SaleCampaignStatus = {
    NEW: "NEW",
    UPCOMING: "UPCOMING",
    PROCESSING: "PROCESSING",
    EXPIRED: "EXPIRED",
    DELETED: "DELETED",
}

export const SaleCampaignStatusLabel = {
    [SaleCampaignStatus.NEW]: "Mới",
    [SaleCampaignStatus.UPCOMING]: "Sắp diễn ra",
    [SaleCampaignStatus.PROCESSING]: "Đang diễn ra",
    [SaleCampaignStatus.EXPIRED]: "Đã kết thúc",
    [SaleCampaignStatus.DELETED]: "Đã xoá",
}

export const SaleCampaignStatusColor = {
    [SaleCampaignStatus.NEW]: "blue",
    [SaleCampaignStatus.EXPIRED]: "gray",
    [SaleCampaignStatus.DELETED]: "red",
    [SaleCampaignStatus.UPCOMING]: "blue",
    [SaleCampaignStatus.PROCESSING]: "green",
}

export const CampaignProductStatus = {
    NORMAL: "NORMAL",
    CANCELLED: "CANCELLED",
    SUSPENDED: "SUSPENDED"
}

export const CampaignProductStatusLabel = {
    [CampaignProductStatus.NORMAL]: "Đang bán",
    [CampaignProductStatus.CANCELLED]: "Đã hủy",
    [CampaignProductStatus.SUSPENDED]: "Tạm ngưng bán"
}

export const CampaignProductStatusColor = {
    [CampaignProductStatus.NORMAL]: "green",
    [CampaignProductStatus.CANCELLED]: "red",
    [CampaignProductStatus.SUSPENDED]: "#bb5555",
}

export const StatusOption = {
    UPCOMING: "UPCOMING",
    PROCESSING: "PROCESSING",
    EXPIRED: "EXPIRED",
}

export const StatusOptionLabel = {
    [StatusOption.UPCOMING]: "Sắp diễn ra",
    [StatusOption.PROCESSING]: "Đang diễn ra",
    [StatusOption.EXPIRED]: "Đã kết thúc",
}

export const SaleCampaignButton = ({ status }) => {
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

export const CampaignProductButton = ( {status, isErrorStatus} ) => {
    let newStatus = status
    if (status !== CampaignProductStatus.CANCELLED && isErrorStatus) newStatus = CampaignProductStatus.SUSPENDED
    return (
        <Button
            size="small"
            variant="outlined"
            style={{ color: CampaignProductStatusColor[newStatus] ?? "green", borderColor: CampaignProductStatusColor[newStatus] ?? "green"}}
            disabled={true}
            title={newStatus}
        >
            {CampaignProductStatusLabel[newStatus] ?? "Đang bán"}
        </Button>
    )
}