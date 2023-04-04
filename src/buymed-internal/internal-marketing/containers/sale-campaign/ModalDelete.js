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
import { getSaleCampaignClient } from "client/saleCampaign";
import { useRouter } from "next/router";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";

const ModalDelete = ({
    open,
    onClose,
    onExcute,
    saleCampaignStatus,
    selectedPrd,
}) => {
    const router = useRouter()
    const toast = useToast()
    const { setValue, register, handleSubmit, errors } = useForm({
        mode: "onChange",
        defaultValues: { cancelReason: "" },
    });

    const fnK = (event) => {
        if (event.keyCode == 27) {
            onClose();
        }
    }

    const onSubmitDelete = async (data) => {
        const res = await getSaleCampaignClient().updateCampaignProduct({
            campaignProductID: selectedPrd.campaignProductID,
            cancelReason: data?.cancelReason,
            status: "CANCELLED",
        })
        if (res && res.status === "OK") {
            toast.success("Hủy sản phẩm thành công")
            onClose();
            router.push({
                pathname: "/marketing/detail-sale-campaign",
                query: {
                    ...router.query,
                }
            });
            return
        }

        if (res && res.message) toast.error(res.message)
    }

    return (
        <Dialog open={open} scroll="body" fullWidth={true} onKeyDown={fnK} onClose={onClose}>
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
                {saleCampaignStatus === "PROCESSING" ?
                    <React.Fragment>
                        Chương trình này đang diễn ra. Bạn có chắc muốn&nbsp;<strong>hủy</strong>&nbsp;sản phẩm này không?
                        <br />
                        <br />
                        <TextField
                            name="cancelReason"
                            placeholder="Nhập lý do"
                            defaultValue=""
                            helperText={errors.cancelReason?.message}
                            InputLabelProps={{
                                shrink: true,
                                style: {
                                    color: "#353434",
                                    fontSize: "20px",
                                },
                            }}
                            size="small"
                            fullWidth
                            error={!!errors.cancelReason}
                            required
                            variant="outlined"
                            inputRef={register({
                                validate: (value) => {
                                    if (value.trim().length == 0) {
                                        setValue("cancelReason", value.trim());
                                        return "Vui lòng nhập lý do để hủy";
                                    }
                                },
                                required: "Vui lòng nhập lý do để hủy",
                                minLength: {
                                    value: 1,
                                    message: "Lý do phải có độ dài lớn hơn 1 kí tự",
                                },
                            })}
                        />
                    </React.Fragment>
                    :
                    <React.Fragment> Bạn có chắc muốn&nbsp;<strong>xóa</strong>&nbsp;sản phẩm này không?</React.Fragment>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="contained">Đóng</Button>
                <Button autoFocus color="primary" variant="contained" onClick={ 
                    saleCampaignStatus === "PROCESSING" ? handleSubmit(onSubmitDelete) : onExcute
                }>
                    {saleCampaignStatus === "PROCESSING" ? "Hủy" : "Xoá"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalDelete;
