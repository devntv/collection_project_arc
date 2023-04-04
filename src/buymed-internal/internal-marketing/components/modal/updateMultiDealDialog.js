import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, IconButton, Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";


const errorCodeColor = {
    background: '#F44336',
    text: '#fff'
}


const ModalUpdateMultiDeal = ({
    children,
    name,
    title,
    open,
    onClose,
    onButtonCloseClick,
    onExcute,
    closeText = "Đóng",
    primaryText = "Lưu",
    variant = 'primary',
    showButtonConfirm = true,
    removeCloseOnExcute = false,
    disableButton = false,
    ...others
}) => {

    function handleClose(event, reason) {
        // Disabled outside click to close modal
        if(reason && reason === 'backdropClick') return;
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
            event.preventDefault()
        }
    }

    function handleExcuteWithoutClose(data){
        onExcute?.(data);
    }
    return (
        <Dialog open={open} scroll="body" fullWidth={true} onKeyDown={fnK} onClose={handleClose} disableEscapeKeyDown {...others}>
            <DialogTitle id={name + "-dialog-title"}>
                <Typography  variant="h6" color={variant}>{title}</Typography>
                {onClose ? (
                    <IconButton
                        disabled={disableButton}
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
                {showButtonConfirm && (
                    <Button 
                        style={
                            {
                                backgroundColor: variant === 'error' && errorCodeColor.background, 
                                color: variant === 'error' && errorCodeColor.text
                            }} 
                            autoFocus 
                            onClick={removeCloseOnExcute ? handleExcuteWithoutClose : handleExcute} 
                            color={variant}  
                            variant="contained"
                            disabled={disableButton}
                        >
                            {primaryText} 
                    </Button>)
                }
                 <Button onClick={handleBtnClose}  variant="contained"  disabled={disableButton}>{closeText}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalUpdateMultiDeal;
