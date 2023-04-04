import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core';
import { useToast } from '@thuocsi/nextjs-components/toast/useToast';
import 'cropperjs/dist/cropper.css';
import React, { useState } from 'react';
import styles from './cropper.module.css';

export const CropperError = {
    fileTooLarge: 'FILE_TOO_LARGE',
};

const useStyles = makeStyles({
    cropper: {
        maxWidth: '90vw',
        maxHeight: 'calc( 100vh - 256px )',
    },
});

/**
 * @param {object} props
 * @param {number} props.maxfileSize unit: MB (ex. 2 -> 2MB)
 */
const ModalCropperVideo = ({ open, onClose, callback, title, text, myRef, maxfileSize = 20 }) => {
    const style = useStyles();
    const { error } = useToast();
    const [videoInfo, setVideo] = useState('');
    const [cropper, setCropper] = useState(null);

    function handleFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                setVideo(fileReader.result);
            };
            fileReader.readAsDataURL(e.target.files[0]);
        }
    }

    function getCropData() {
        if (typeof cropper !== 'undefined') {
            const base64 = cropper.getCroppedCanvas().toDataURL();
            if (base64.length / 1000000 > maxfileSize) throw new Error(CropperError.fileTooLarge);
            callback(base64);
        }
    }

    function handleClose() {
        setVideo('');
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
                error("Kích thước video quá lớn");
            }
        }
    }

    return (
        <div>
            <Dialog open={open} scroll="body" className={styles.croperWidth} fullWidth={true}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {title}
                </DialogTitle>
                <DialogContent dividers>
                    <label htmlFor="upload-video" style={{ marginBottom: 5 }}>
                        <input
                            style={{ display: 'none' }}
                            id="upload-video"
                            onChange={handleFile}
                            name="upload-video"
                            type="file"
                            accept={'video/mp4'}
                        />
                        <Button color="secondary" variant="contained" component="span">
                            <span>{videoInfo == '' ? "Chọn video" : "Chọn video khác"}</span>
                        </Button>
                    </label>

                    <div className={styles.cropperMarginTop}>{videoInfo !== '' && <video src={videoInfo} width="100%" height="auto" controls />}</div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleBtnClose}>Đóng</Button>
                    <Button autoFocus onClick={() => callback(videoInfo)} color="primary">
                        {text}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ModalCropperVideo;
