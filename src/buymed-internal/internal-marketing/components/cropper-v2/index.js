import React, { useState, useRef, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles,
} from "@material-ui/core";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";
import styles from "./cropper.module.css";

export const CropperError = {
    fileTooLarge: "FILE_TOO_LARGE",
};

const useStyles = makeStyles({
    cropper: {
        maxWidth: "90vw",
        maxHeight: "calc( 100vh - 256px )",
    }
})

/**
 * @param {object} props
 * @param {number} props.maxfileSize unit: MB (ex. 2 -> 2MB)
 */
const ModalCropperV2 = ({
    open,
    onClose,
    callback,
    title,
    text,
    myRef,
    maxfileSize = 1,
}) => {
    const style = useStyles();
    const { error } = useToast();
    const [image, setImage] = useState("");
    const [cropper, setCropper] = useState(null);

    function handleFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            // alert(e.target.files[0].size)
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                setImage(fileReader.result);
            };
            fileReader.readAsDataURL(e.target.files[0]);
        }
    }

    function getCropData() {
        if (typeof cropper !== "undefined") {
            const base64 = cropper.getCroppedCanvas().toDataURL();
            if (base64.length / 1000000 > maxfileSize)
                throw new Error(CropperError.fileTooLarge);
            callback(base64);
        }
    }

    function handleClose() {
        setImage("");
        setCropper(null);
    }

    function handleBtnClose() {
        onClose(false);
        handleClose();
    }

    function handleBtnAction() {
        try {
            getCropData();
            onClose(false);
            handleClose();
        } catch (e) {
            if (e.message === CropperError.fileTooLarge) {
                error("Kích thước hình quá lớn");
            }
        }
    }

    return (
        <div>
            <Dialog
                open={open}
                scroll="body"
                className={styles.croperWidth}
                fullWidth={true}
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {title}
                </DialogTitle>
                <DialogContent dividers>
                    <label htmlFor="upload-photo" style={{ marginBottom: 5 }}>
                        <input
                            style={{ display: "none" }}
                            id="upload-photo"
                            onChange={handleFile}
                            name="upload-photo"
                            type="file"
                        />
                        <Button
                            color="secondary"
                            variant="contained"
                            component="span"
                        >
                            <span>
                                {image == "" ? "Chọn hình ảnh" : "Chọn hình ảnh khác"}
                            </span>
                        </Button>
                    </label>

                    <div className={styles.cropperMarginTop}>
                        <Cropper
                            className={style.cropper}
                            initialAspectRatio={1}
                            preview=".img-preview"
                            src={image}
                            viewMode={2}
                            guides={true}
                            minCropBoxHeight={100}
                            minCropBoxWidth={100}
                            background={false}
                            responsive={true}
                            autoCropArea={1}
                            checkOrientation={false}
                            scalable={true}
                            onInitialized={(instance) => {
                                setCropper(instance);
                            }}
                            ref={myRef}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleBtnClose}>Đóng</Button>
                    <Button autoFocus onClick={handleBtnAction} color="primary">
                        {text}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ModalCropperV2;
