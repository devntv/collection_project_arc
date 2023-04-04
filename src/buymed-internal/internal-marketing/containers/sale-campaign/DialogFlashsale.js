import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell
} from "@material-ui/core";

export default function DialogFlashsale({ data, isOpen, onClose }) {

    return (
        <Dialog onClose={() => {
                onClose();
        }} aria-labelledby="customized-dialog-title" open={isOpen} fullWidth maxWidth="md">
            <DialogTitle>Danh sách khung giờ khuyến mãi</DialogTitle>
            <DialogContent dividers>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Mã khung giờ</TableCell>
                            <TableCell align="left">Khung giờ</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data?.map(item => (
                            <TableRow key={item.value}>
                                <TableCell align="left">{item.value}</TableCell>
                                <TableCell align="left">{item.label}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="default" onClick={() => onClose()}>
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    )
}