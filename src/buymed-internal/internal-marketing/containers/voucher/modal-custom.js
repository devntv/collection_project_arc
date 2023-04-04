import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const ModalCustom = ({
    children,
    name,
    title,
    open,
    onClose,
    onButtonCloseClick,
    onExcute,
    closeText,
    primaryText,
    variant = 'primary',
    ...others
}) => {

    if (!closeText) closeText = "Đóng"
    if (!primaryText) closeText = "Đồng ý"

    function handleClose() {
        onClose?.(false);
    }

    function handleBtnClose() {
        onClose?.(false);
        onButtonCloseClick?.();
    }

    function handleExcute(data) {
        onExcute?.(data);
        onClose?.(false);
    }

    function fnK(event) {
        if (event.keyCode == 27) {
            onClose?.(false);
        }
    }

    return (
        <Dialog open={open} scroll="body" fullWidth={true} onKeyDown={fnK} onClose={handleClose} {...others}>
            <DialogTitle id={name + "-dialog-title"}>
                <Typography variant="h6" color={variant}>{title}</Typography>
                {onClose ? (
                    <IconButton
                        onClick={handleClose}
                        style={{
                            position: "absolute",
                            top: "1px",
                            right: "1px",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
            <DialogContent dividers>{children}</DialogContent>
            <DialogActions>
                <Button onClick={handleBtnClose}  variant="contained">{closeText}</Button>
                <Button autoFocus onClick={handleExcute} color="primary"  variant="contained">
                    {primaryText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalCustom;
