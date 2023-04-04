import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    TextField
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useForm } from "react-hook-form";
import React from "react";

const ModalConfirm = ({
    open,
    label,
    onClose,
    onExcute,
    type
}) => {
    const { setValue, register, handleSubmit, errors } = useForm({
        mode: "onChange",
        defaultValues: { note: "" },
    });

    const fnK = (event) => {
        if (event.keyCode == 27) {
            onClose();
        }
    }

    return (
        <Dialog open={open} scroll="body" fullWidth={true} onKeyDown={fnK} onClose={onClose}>
            <DialogTitle id={"product-dialog-title"}>
                <Typography variant="h6" color="primary">Xác nhận</Typography>
                <IconButton
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: "1px",
                        right: "1px",
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <React.Fragment>
                    {label}
                    {type === "REJECTED" &&
                        <React.Fragment>
                            <br />
                            <br />
                            <TextField
                                name="note"
                                placeholder="Nhập lý do"
                                defaultValue=""
                                helperText={errors.note?.message}
                                InputLabelProps={{
                                    shrink: true,
                                    style: {
                                        color: "#353434",
                                        fontSize: "20px",
                                    },
                                }}
                                size="small"
                                fullWidth
                                error={!!errors.note}
                                required={type === "REJECTED"}
                                variant="outlined"
                                inputRef={register({
                                    validate: (value) => {
                                        if (value.trim().length == 0) {
                                            setValue("note", value.trim());
                                            return "Vui lòng nhập lý do để từ chối";
                                        }
                                    },
                                    required: "Vui lòng nhập lý do để từ chối",
                                    minLength: {
                                        value: 1,
                                        message: "Lý do phải có độ dài lớn hơn 1 kí tự",
                                    },
                                })}
                            />
                        </React.Fragment>
                    }
                </React.Fragment>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="contained">Đóng</Button>
                <Button autoFocus color="primary" variant="contained" onClick={handleSubmit(onExcute)}>
                    Đồng ý
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalConfirm;
