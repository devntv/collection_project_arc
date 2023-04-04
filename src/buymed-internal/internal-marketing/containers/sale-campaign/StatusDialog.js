import React, { useState, useEffect } from "react";
import { Grid, Typography, TextField, MenuItem } from "@material-ui/core";
import ModalCustom from "@thuocsi/nextjs-components/simple-dialog/dialogs";
import { StatusOptionLabel, StatusOption } from "./SaleCampaignStatus";

const StatusDialog = ({ open, onClose, saleCampaign, onUpdate }) => {

    const [status, setStatus] = useState(saleCampaign?.status);

    useEffect(() => {
        setStatus(saleCampaign?.status)
    }, [saleCampaign])

    return (
        <ModalCustom
            title="Cập nhật trạng thái chương trình khuyến mãi"
            {...{ open, onClose }}
            onExcute={() => onUpdate(status)}
        >
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Typography style={{ fontWeight: "bold" }}>Trạng thái</Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        select
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        {Object.values(StatusOption).map(status => (
                            <MenuItem key={status} value={status}>{StatusOptionLabel[status]}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
        </ModalCustom>
    );
};

export default StatusDialog;
