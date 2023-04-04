import { Box, createStyles, Grid, IconButton, Typography } from '@material-ui/core';
import { AddAPhoto, Close } from '@material-ui/icons';
import ModalCropperVideo from 'components/cropper-video';
import React, { useRef, useState } from 'react';

const styles = createStyles({
    videoContainer: {
        position: 'relative',
        marginRight: 8,
    },
    removeButton: {
        position: 'absolute',
        top: -4,
        right: -4,
    },
    addButton: {
        cursor: 'pointer',
    },
});

export default function VideoUploader({
    videos = [],
    limit,
    title = 'Cập nhật video',
    buttonText = 'Tải lên',
    handleCropVideo,
    handleCropCallback,
    handleRemoveVideo,
    required = false
}) {
    const [addProductImageModalOpen, setAddProductVideoModalOpen] = useState(false);
    const imageRef = useRef(null);

    return (
        <Box pt={1}>
            <Grid container spacing={1}>
                <ModalCropperVideo
                    open={addProductImageModalOpen}
                    onClose={() => setAddProductVideoModalOpen(false)}
                    title={title}
                    text={buttonText}
                    handleCrop={(...props) => {
                        handleCropVideo?.(...props);
                        setAddProductVideoModalOpen(false);
                    }}
                    myRef={imageRef}
                    callback={(...props) => {
                        handleCropCallback(...props);
                        setAddProductVideoModalOpen(false);
                    }}
                />
                {videos.map((url, i) => (
                    <Grid key={`gr_${i}`} item style={styles.videoContainer}>
                        <video src={url} width={100} height={100} objectFit="contain" />
                        <IconButton
                            style={styles.removeButton}
                            size="small"
                            color="secondary"
                            onClick={() => {
                                handleRemoveVideo?.(url);
                            }}
                        >
                            <Close fontSize="small" />
                        </IconButton>
                    </Grid>
                ))}
                <Grid item>
                    <Box
                        style={styles.addButton}
                        border={2}
                        borderColor="grey.500"
                        borderRadius={6}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="flex-end"
                        color="grey.500"
                        height={100}
                        width={100}
                        onClick={() => setAddProductVideoModalOpen(true)}
                    >
                        <Box padding={0.5}>
                            <AddAPhoto width={30} height={30} />
                        </Box>
                        <Typography variant="caption" align="center">
                            Thêm video
                        </Typography>
                        <Typography variant="caption" align="center">
                            {required ? `(Bắt buộc)` : `(Không bắt buộc)`}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
