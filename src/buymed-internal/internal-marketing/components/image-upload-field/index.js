import React, { useState, useRef } from "react";
import {
    Box,
    createStyles,
    Fab,
    Grid,
    IconButton,
    Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { AddAPhoto } from "@material-ui/icons";
import Image from "next/image";
import ModalCropper from "components/cropper-v2";

const styles = createStyles({
    imageContainer: {
        position: "relative",
        marginRight: 8,
    },
    removeButton: {
        position: "absolute",
        top: -4,
        right: -4,
    },
    addButton: {
        cursor: "pointer",
    },
});

export default function ImageUploadField({
    images = [],
    hintText,
    title,
    buttonText,
    handleCropImage,
    handleCropCallback,
    handleRemoveImage,
    limit = 5,
    required = false,
}) {

    const [addProductImageModalOpen, setAddProductImageModalOpen] = useState(
        false
    );

    const imageRef = useRef(null);

    return (
        <Box pt={1}>
            <Grid container spacing={1}>
                <ModalCropper
                    open={addProductImageModalOpen}
                    onClose={() => setAddProductImageModalOpen(false)}
                    title={title || "Cập nhật hình ảnh"}
                    text={buttonText || "Tải lên"}
                    handleCrop={(...props) => {
                        handleCropImage?.(...props);
                        setAddProductImageModalOpen(false);
                    }}
                    myRef={imageRef}
                    callback={(...props) => {
                        handleCropCallback(...props);
                        setAddProductImageModalOpen(false);
                    }}
                />
                {images.map((url, i) => (
                    <Grid key={`gr_${i}`} item style={styles.imageContainer}>
                        <Image src={url} unoptimized width={100} height={100} objectFit="contain" />
                        <IconButton
                            style={styles.removeButton}
                            size="small"
                            color="secondary"
                            onClick={() => {
                                handleRemoveImage?.(url);
                            }}
                        >
                            <Close fontSize="small" />
                        </IconButton>
                    </Grid>
                ))}
                <Grid item>
                    <Box
                        visibility={images?.length >= limit ? 'hidden' : 'visible'}
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
                        onClick={() => setAddProductImageModalOpen(true)}
                    >
                        <Box padding={0.5}>
                            <AddAPhoto width={30} height={30} />
                        </Box>
                        <Typography variant="caption" align="center">
                            {hintText || "Thêm hình ảnh"}
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
