import { Button} from "@material-ui/core";
import React from "react";
import {sellerTicketStatus , ticketStatusColor } from "view-model/sellerTicket";

export const TicketStatusButton = ({ ticket }) => {
    return (
        <Button
            size="small"
            variant="outlined"
            disabled="true"
            style={{ color: ticketStatusColor[ticket.status], borderColor: ticketStatusColor[ticket.status] }}
        >
            {sellerTicketStatus?.filter(item => item.value === ticket.status)[0]?.label ?? "Không xác định"}
        </Button>
    )
}