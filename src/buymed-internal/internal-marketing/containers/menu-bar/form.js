import { Button, Grid, Switch, TextField } from "@material-ui/core";
import {
    MyCard,
    MyCardActions,
    MyCardContent,
    MyCardHeader,
} from "@thuocsi/nextjs-components/my-card/my-card";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import UploadImageFile from "containers/countdown-bar/uploadImageFile";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

const getURLwithProtocol = (url) => {
    if (url.startsWith("http")) {
        return url;
    }
    return `http://${url}`;
};

export default function FormData({ data = null, onSubmit, index, menuBar }) {
    const router = useRouter();
    const toast = useToast();

    let { setValue, register, watch, handleSubmit, errors } = useForm({
        defaultValues: {
            url: data?.url ?? "",
            iconUrl: data?.iconUrl ?? "",
            label: data?.label ?? "",
            isActive: data?.isActive ?? false,
        },
    });

    const [countdownBarImage, setCountdownBarImage] = useState(
        data?.iconUrl ?? ""
    );

    const title = data
        ? "Cập nhật tab cho danh sách menu"
        : "Thêm tab cho danh sách menu";

    return (
        <MyCard>
            <MyCardHeader title={title} />
            <MyCardContent>
                <form
                    id="myForm"
                    onSubmit={handleSubmit(async (newData) => {
                        if (!countdownBarImage) {
                            toast.error(
                                "Vui lòng chọn icon cho menu landing page"
                            );
                            return;
                        }
                        let dataSubmit = null;

                        if (!data) {
                            dataSubmit = {
                                items: [
                                    ...menuBar,
                                    {
                                        ...newData,
                                        iconUrl: countdownBarImage,
                                    },
                                ],
                            };
                        } else {
                            const newMenuBar = [...menuBar];
                            newMenuBar[index] = {
                                ...newData,
                                iconUrl: countdownBarImage,
                            };
                            dataSubmit = {
                                items: newMenuBar,
                            };
                        }

                        await onSubmit?.(dataSubmit);
                    })}
                >
                    <Grid container spacing={10}>
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <b>Hướng dẫn cài đặt:</b>
                                    <ul>
                                        <li>Tên tab menu landing page</li>
                                        <li>
                                            Chọn file icon menu (.PNG, .JPG,
                                            .JPEG, .GIF, .SVG)
                                        </li>
                                        <li>Điền đường dẫn của menu</li>
                                    </ul>
                                </Grid>

                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        fullWidth
                                        label="Tên tab menu landing page"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        name="label"
                                        variant="outlined"
                                        multiline
                                        inputRef={register({
                                            validate: (value) => {
                                                if (value.trim().length == 0) {
                                                    setValue(
                                                        "url",
                                                        value.trim()
                                                    );
                                                    return "Tên tab menu là bắt buộc";
                                                }
                                            },
                                            required:
                                                "Tên tab menu là bắt buộc",
                                        })}
                                        helperText={errors.label?.message}
                                        error={!!errors.label}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <UploadImageFile
                                        label={
                                            "Chọn hình ảnh icon (.PNG, .JPG, .JPEG, .GIF, .SVG)"
                                        }
                                        exts={[
                                            "jpg",
                                            "png",
                                            "jpeg",
                                            "gif",
                                            "svg",
                                        ]}
                                        name="iconUrl"
                                        register={register}
                                        onFileChanged={(file) =>
                                            setCountdownBarImage(
                                                file?.publicUrl || ""
                                            )
                                        }
                                        currentFile={{
                                            name: data?.label ?? "",
                                            publicUrl: data?.iconUrl ?? "",
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Đường dẫn (URL)"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        name="url"
                                        variant="outlined"
                                        multiline
                                        inputRef={register({
                                            validate: (value) => {
                                                if (value.trim().length == 0) {
                                                    setValue(
                                                        "url",
                                                        value.trim()
                                                    );
                                                    return "URL không được để trống";
                                                }
                                            },
                                            required: "URL không được để trống",
                                        })}
                                        helperText={errors.url?.message}
                                        error={!!errors.url}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    Trạng thái:{" "}
                                    <Switch
                                        name="isActive"
                                        inputRef={register}
                                        onChange={(e) =>
                                            setValue(
                                                "isActive",
                                                e.target.checked
                                            )
                                        }
                                        checked={watch("isActive")}
                                        color="primary"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <b>Xem trước hiển thị</b> <br />
                            {(watch("label") || countdownBarImage) && (
                                <a
                                    href={getURLwithProtocol(watch("url"))}
                                    target="_blank"
                                    style={{
                                        marginTop: 12,
                                        backgroundColor: "#0cba69",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: 7,
                                        textDecoration: "none",
                                        color: "#fff",
                                    }}
                                >
                                    {countdownBarImage && (
                                        <img
                                            src={countdownBarImage}
                                            alt="preview icon menu bar"
                                            style={{
                                                height: "20px",
                                                width: "20px",
                                                marginRight: 6,
                                            }}
                                        />
                                    )}

                                    <b>{watch("label")}</b>
                                </a>
                            )}
                        </Grid>
                    </Grid>
                </form>
            </MyCardContent>
            <MyCardActions>
                <Grid container justifyContent="flex-start" spacing={1}>
                    <Grid item>
                        <Button
                            variant="contained"
                            type="submit"
                            form="myForm"
                            color="primary"
                        >
                            Lưu
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="default"
                            onClick={() => {
                                router.back();
                            }}
                        >
                            Quay lại
                        </Button>
                    </Grid>
                </Grid>
            </MyCardActions>
        </MyCard>
    );
}
