import React, { useRef, useState } from "react";
import {
    Box,
    CircularProgress,
    createStyles,
    Grid,
    IconButton,
    Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { AddAPhoto } from "@material-ui/icons";
import Image from "next/image";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";

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

export default function DirectImageUploadField({
    images = [],
    title,
    handleUploadImage,
    handleRemoveImage,
    required,
    maxFileSize = 5,
}) {
    const inputRef = useRef();
    const toast = useToast();
    const [loading, setLoading] = useState(false);

    function handleFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            const fileReader = new FileReader();
            fileReader.onloadend = async () => {
                if (fileReader.result.length > maxFileSize * 1333000) {
                    toast.error(`Kích thước file không được quá ${maxFileSize}MB. Vui lòng thử lại sau.`);
                    return
                }
                setLoading(true);
                await handleUploadImage?.(fileReader.result);
                setLoading(false);
            };
            fileReader.readAsDataURL(e.target.files[0]);
            inputRef.current.value = null;
        }
    }

    return (
        <Box pt={1}>
            <Grid container spacing={1}>
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
                        style={!loading ? styles.addButton : undefined}
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
                        onClick={() => {
                            if (!loading) inputRef.current.click();
                        }}
                    >
                        <input
                            ref={inputRef}
                            style={{ display: "none" }}
                            id="upload-photo"
                            onChange={handleFile}
                            name="upload-photo"
                            type="file"
                            disabled={loading}
                        />
                        <Box padding={0.5}>
                            {loading ? (
                                <CircularProgress size={16} color="primary" />
                            ) : (
                                <AddAPhoto width={30} height={30} />
                            )}
                        </Box>
                        <Typography variant="caption" align="center">
                            {title || "Cập nhật hình ảnh"}
                        </Typography>
                        <Typography variant="caption" align="center">
                            {required ? "(Bắt buộc)" : `(Không bắt buộc)`}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
