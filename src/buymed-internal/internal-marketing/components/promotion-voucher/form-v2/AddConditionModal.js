import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    TextField,
    MenuItem,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Controller, useForm } from "react-hook-form";
import { conditions } from "../constant";
import React, { useEffect, useState } from "react";

const AddConditionModal = ({
    open,
    onClose,
    onExcute,
    selectedConditionType = [],
}) => {

    const [options, setOptions] = useState(conditions)
   
    const { control, errors, setValue } = useForm({
        mode: "onChange",
        defaultValues: {
            conditionType: options[0]?.value,
        },
    });

    const [conditionType, setConditionType] = useState(options[0]?.value)

    function handleClose() {
        onClose(false);
    }

    function handleBtnClose() {
        onClose(false);
        handleClose();
    }

    function handleExcute() {
        onExcute(conditionType);
    }

    function fnK(event) {
        if (event.keyCode == 27) {
            onClose(false);
        }
    }

    useEffect(() => {
        let newOptions = [...conditions].filter(item => !selectedConditionType.includes(item.value))
        setOptions(newOptions)
        setConditionType(newOptions[0]?.value)
    }, [selectedConditionType])

    useEffect(() => {
        setValue("conditionType", options[0]?.value)
    }, [options])

    return (
        <div>
            <Dialog open={open} scroll="body" fullWidth={true} onKeyDown={fnK}>
                <DialogTitle id={"add-condition-dialog-title"} onClose={handleClose}>
                    <Typography variant="h6">Thêm loại điều kiện áp dụng</Typography>
                    {onClose ? (
                        <IconButton
                            aria-label="close"
                            onClick={handleBtnClose}
                            style={{ position: "absolute", top: "1px", right: "1px" }}
                        >
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                </DialogTitle>
                <DialogContent dividers>
                    <Typography>
                        Loại điều kiện <span style={{ color: "red" }}>*</span>
                    </Typography>

                    <Controller
                        control={control}
                        name="conditionType"
                        render={({ onChange, ...props }) => (
                            <TextField
                                variant="outlined"
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={!!errors.conditionType}
                                helperText={errors.conditionType?.message}
                                fullWidth
                                select
                                onChange={(e) => {
                                    onChange(e.target?.value)
                                    setConditionType(e.target?.value)
                                }}
                                placeholder="Chọn loại điều kiện"
                                {...props}
                            >
                                {options.map((item) => (
                                    <MenuItem key={item.value}
                                        value={item.value}>{item.label}</MenuItem>
                                ))}
                            </TextField>
                        )}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleBtnClose}>Hủy</Button>
                    <Button autoFocus onClick={handleExcute} color="primary">
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddConditionModal;
