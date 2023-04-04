import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Chip, CircularProgress, makeStyles } from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";
import PublishIcon from "@material-ui/icons/Publish";
import LabelBox from "@thuocsi/nextjs-components/editor/label-box/index";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { getFileManagerClient } from "client/file-manager";
import { useEffect, useState } from "react";

let useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: "bold",
    },
    textField: {
        background: theme.palette.background.paper,
    },
    adornment: {
        position: "absolute",
        right: "40px",
    },
    previewTitle: {
        color: "#595959",
    },
    previewTag: {
        padding: "4px 8px",
        background: "#f2f4fd",
        borderRadius: 16,
        color: "#0e1983",
        fontSize: 14,
        margin: "10px 0",
        textAlign: "center",
        minHeight: 20,
        maxWidth: 150,
        wordBreak: "break-word",
    },
}));

export default function UploadImageFile({
    label,
    exts,
    onFileChanged = () => {},
    currentFile = {},
}) {
    const classes = useStyles();
    const [token, setToken] = useState(null);
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(currentFile);
    let fileManagerClient = getFileManagerClient();

    useEffect(() => {
        getTokenUpload();
    }, []);
    async function getTokenUpload() {
        let tokenRs = await getFileManagerClient().getToken();
        if (tokenRs.status == "OK") {
            setToken(tokenRs.message);
            return tokenRs.message;
        }
        return "";
    }
    async function handleFileChange(event) {
        event?.preventDefault();
        let fileObj = event.target.files[0];
        let newFile = {};
        let reader = new FileReader();
        reader.onloadend = async () => {
            setLoading(true);
            let uploadRs = await fileManagerClient.uploadImage({
                data: reader.result,
                fileName: fileObj.name,
                refType: "COUNTDOWN_BAR_MARKETING",
                token: token,
            });

            if (uploadRs.status == "OK") {
                newFile = {
                    publicUrl: uploadRs?.data?.[0],
                    name: fileObj.name,
                };
                onFileChanged?.(newFile);
                setFile(newFile);
            } else if (
                uploadRs.status == "UNAUTHORIZED" &&
                uploadRs.errorCode == "SESSION_EPXIRED"
            ) {
                let newToken = await getTokenUpload();
                let uploadRs = await fileManagerClient.uploadImage({
                    data: reader.result,
                    fileName: fileObj.name,
                    refType: "COUNTDOWN_BAR_MARKETING",
                    token: newToken,
                });
                if (uploadRs.status == "OK") {
                    newFile = {
                        publicUrl: uploadRs?.data?.[0],
                        name: fileObj.name,
                    };
                    onFileChanged?.(newFile);
                    setFile(newFile);
                }
            } else {
                toast.error(uploadRs?.message);
            }
            setLoading(false);
        };
        reader.readAsDataURL(fileObj);
    }

    return (
        <LabelBox label={label} padding={1}>
            {file?.name ? (
                <>
                    <Chip
                        className={classes.chip}
                        icon={<FileCopy fontSize="small" />}
                        label={file?.name}
                    />
                    &nbsp;&nbsp;
                    <FontAwesomeIcon
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => {
                            setFile(null);
                            onFileChanged?.({
                                publicUrl: "",
                            });
                        }}
                        icon={faTrash}
                    />
                </>
            ) : (
                <label htmlFor="imageUpload" style={{ fontSize: "11px" }}>
                    <input
                        hidden
                        id="imageUpload"
                        onChange={handleFileChange}
                        type="file"
                        accept={`${exts?.map((ext) => `.${ext}`)?.join(", ")}`}
                    />
                    <Button
                        variant="contained"
                        component="span"
                        style={{ marginBottom: "5px" }}
                    >
                        {loading ? (
                            <CircularProgress color="inherit" size={12} />
                        ) : (
                            <PublishIcon fontSize="inherit" />
                        )}
                        <span style={{ marginLeft: 3 }}>Chọn file</span>
                    </Button>
                </label>
            )}
        </LabelBox>
    );
}
