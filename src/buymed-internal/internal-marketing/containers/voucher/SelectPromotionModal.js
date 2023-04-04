import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Grid, makeStyles, DialogActions, FormHelperText, CircularProgress, TextField } from "@material-ui/core";
import { useToast } from '@thuocsi/nextjs-components/toast/useToast';
import { getPromoClient } from 'client/promo';
import { defaultPromotionStatus, defaultReward } from 'components/promotion-voucher/constant';
import PromotionInfo from './PromotionInfo';
import { useForm } from 'react-hook-form';
import { Autocomplete } from '@material-ui/lab';
import { handleReward } from './VoucherReward';
import ModalCustom from '@thuocsi/nextjs-components/simple-dialog/dialogs';
import useDebounce from 'components/useDebounce';


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(3),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        paddingTop: "5px",
        width: "100%"
    },
}))(MuiDialogContent);

export default function SelectPromotionModal({
    open,
    onClose,
    promotion = {},
    handleChangePromotion,
    listPromotionDefault = [],
    isEdit,
    voucher = {}
}) {

    const [selectedItem, setSelectedItem] = useState(promotion)
    const [options, setOptions] = useState(listPromotionDefault)
    const [isLoading, setIsLoading] = useState(false)
    const [q, setQ] = useState("");
    const debouncedSearch = useDebounce(q?.trim(), 300);
    const [openModal, setOpenModal] = useState(false)
    const toast = useToast()

    const { setValue, register, control, getValues, errors } = useForm({
        defaultValues: {
            promotion: promotion
        }
    })
    const handleOnSubmit = () => {
        if (promotion.promotionId !== selectedItem.promotionId) {
            if (isEdit && selectedItem.promotionId !== promotion.promotionId && selectedItem.promotionId) {
                setOpenModal(true)
            } else {
                handleChangePromotion(selectedItem)
                onClose()
            }
        } else {
            onClose()
        }
    }

    const handleClose = () => {
        setSelectedItem(promotion)
        setOptions(listPromotionDefault)
        onClose()
    }


    const searchPromotion = async (search = "") => {
        try {
            let listData = []
            const resp = await getPromoClient().getPromotionFromClient(search, 5, 0, true, [
                defaultPromotionStatus.ACTIVE,
                defaultPromotionStatus.WAITING,
            ])
            if (resp.status === "OK") {
                resp.data?.forEach((item) => {
                    listData.push(({ ...item, label: item.promotionName, value: item.promotionId }))
                })
            }
            return listData
        } catch (e) {
            toast.error(e.message);
        }
    }

    const getDetailPromotion = async (item) => {
        setIsLoading(true)
        try {
            if (item?.value) {
                let data = await handleReward(null, item)
                setSelectedItem(data)
            } else {
                setSelectedItem({})
            }
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false)
    }

    useEffect(() => {
        register("promotion")
        setSelectedItem(promotion)
        setValue("promotion", promotion)
    }, [promotion])

    useEffect(() => {
        if(debouncedSearch.length >0 && debouncedSearch !== q?.trim()){
            // TODO debouce val cache before will recall when use effect
            return
        }

        if (debouncedSearch && q?.trim().length > 0) {
            searchPromotion(debouncedSearch).then((results) => {
                setOptions(results)
            })
        } else {
            setOptions(listPromotionDefault)
        }
    }, [debouncedSearch, q])

    return (
        <Dialog onClose={(event, reason) => {
            if (reason !== 'backdropClick') {
                handleClose();
            }
        }} aria-labelledby="customized-dialog-title" open={open} fullWidth maxWidth="md">
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                CHỌN CHƯƠNG TRÌNH KHUYẾN MÃI ÁP DỤNG
            </DialogTitle>

            <DialogContent dividers>

                <Grid container style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <Grid item xs={12}>
                        <Autocomplete
                            size="small"
                            value={selectedItem}
                            options={options}
                            getOptionLabel={(option) => (option.label ? option.label : "")}
                            noOptionsText="Không tìm thấy kết quả phù hợp"
                            onInputChange={(e, newInputChange) => {
                                setQ(newInputChange)
                            }}
                            onChange={(e, newValue) => {
                                setSelectedItem({})
                                if (newValue) {
                                    getDetailPromotion(newValue)
                                }
                            }}
                            fullWidth
                            renderInput={(params) => <TextField
                                {...params}
                                placeholder="Chọn chương trình khuyến mãi"
                                variant="outlined"
                            />}
                        />
                        <FormHelperText> *Nhập tên chương trình khuyến mãi để tìm kiếm</FormHelperText>
                    </Grid>
                </Grid>

                <PromotionInfo promotion={selectedItem} />
            </DialogContent>

            <DialogActions>
                <Button variant="contained" color="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button style={{ width: "100px" }} variant="contained" color="primary" disabled={isLoading} onClick={handleOnSubmit}>

                    {isLoading ? <CircularProgress size={25} /> : "Áp dụng"}

                </Button>

            </DialogActions>


            <ModalCustom
                open={openModal}
                title="Thông báo"
                primaryText="Đồng ý"
                closeText='Trở lại'
                onClose={() => {
                    setOpenModal(false)
                }}
                onExcute={() => {
                    handleChangePromotion(selectedItem)
                    onClose()
                }}
            >
                Bạn có chắc muốn đổi qua sử dụng nội dung của chương trình <strong>{selectedItem.promotionName}</strong> không?
            </ModalCustom>


        </Dialog>
    );
}