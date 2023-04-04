import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    TextField,
    CircularProgress
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const ModalLoading = ({
    open,
    onClose,
}) => {

    return (
        <Dialog open={open} scroll="body" fullWidth={true} onClose={onClose}>
            <DialogTitle id={"product-dialog-title"}>
                <Typography variant="h6" color="primary">Thông báo</Typography>
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
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20px"
                }}>
                    <CircularProgress color="primary" size={100} />
                </div>

                <Typography>Đang tiến hành kiểm tra các sản phẩm trong chương trình KM. Vui lòng đợi trong giây lát.</Typography>
            </DialogContent>
        </Dialog>
    );
};

export default ModalLoading;
