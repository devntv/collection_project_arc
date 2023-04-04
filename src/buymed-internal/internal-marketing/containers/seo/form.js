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

export default function FormData({ data = null, onSubmit }) {
    const router = useRouter();
    const toast = useToast();

    let { setValue, register, watch, handleSubmit, errors } = useForm({
        defaultValues: {
            url: data?.url ?? "",
            imageUrl: data?.imageUrl ?? "",
            title: data?.title ?? "",
            pageTitle: data?.pageTitle ?? "",
            description: data?.description ?? "",
            isActive: data?.isActive ?? false,
        },
    });

    const [thumbnailImage, setThumbnailImage] = useState(data?.imageUrl ?? "");

    const title = data ? "Cập nhật thumbnail" : "Tạo mới thumbnail";

    return (
        <MyCard>
            <MyCardHeader title={title} />
            <MyCardContent>
                <form
                    id="myForm"
                    onSubmit={handleSubmit(async (data) => {
                        if (!thumbnailImage) {
                            toast.error("Vui lòng chọn hình ảnh cho thumbnail");
                            return;
                        }

                        const dataSubmit = {
                            ...data,
                            imageUrl: thumbnailImage,
                        };

                        await onSubmit?.(dataSubmit);
                    })}
                >
                    <Grid container spacing={10}>
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <b>
                                        Công cụ cập nhật nội dung SEO cho trang,
                                        bao gồm:
                                    </b>
                                    <ul>
                                        <li>Tiêu đề trang</li>
                                        <li>Hình ảnh thumbnail</li>
                                        <li>Tiêu đề SEO</li>
                                        <li>Mô tả SEO</li>
                                    </ul>
                                </Grid>

                                <Grid item xs={12}>
                                    <b
                                        style={{
                                            marginBottom: 20,
                                            display: "inline-block",
                                        }}
                                    >
                                        Cập nhật nội dung SEO:
                                    </b>
                                    <TextField
                                        fullWidth
                                        label="Đường dẫn của trang"
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
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        fullWidth
                                        label="Tiêu đề trang"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        name="pageTitle"
                                        variant="outlined"
                                        multiline
                                        inputRef={register}
                                        helperText={errors.pageTitle?.message}
                                        error={!!errors.pageTitle}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        fullWidth
                                        label="Tiêu đề SEO"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        name="title"
                                        variant="outlined"
                                        multiline
                                        inputRef={register({
                                            validate: (value) => {
                                                if (value.trim().length == 0) {
                                                    setValue(
                                                        "title",
                                                        value.trim()
                                                    );
                                                    return "Tiêu đề SEO là bắt buộc";
                                                }
                                            },
                                            required: "Tiêu đề SEO là bắt buộc",
                                        })}
                                        helperText={errors.title?.message}
                                        error={!!errors.title}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <UploadImageFile
                                        label={
                                            "Chọn hình ảnh thumbnail (.PNG, .JPG, .JPEG)"
                                        }
                                        exts={["jpg", "png", "jpeg"]}
                                        name="imageUrl"
                                        register={register}
                                        onFileChanged={(file) =>
                                            setThumbnailImage(
                                                file?.publicUrl || ""
                                            )
                                        }
                                        currentFile={{
                                            name: data?.title ?? "",
                                            publicUrl: data?.imageUrl ?? "",
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={12}>
                                    <TextField
                                        fullWidth
                                        label="Mô tả SEO"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        name="description"
                                        variant="outlined"
                                        multiline
                                        inputRef={register}
                                        helperText={errors.description?.message}
                                        error={!!errors.description}
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
                            <b>
                                Sau khi nhấn "Lưu", click vào các link bên dưới
                                để cập nhật cache thumbnail và xem preview
                                thumbnail trên các nền tảng tương ứng:
                            </b>
                            <ul style={{ marginTop: 10 }}>
                                <li>
                                    <a
                                        href={`https://developers.zalo.me/tools/debug-sharing?q=${watch(
                                            "url"
                                        )}`}
                                        target="_blank"
                                    >
                                        ZALO
                                    </a>{" "}
                                    (nhấn vào nút "Kiểm tra")
                                </li>
                                <li>
                                    <a
                                        href={`https://developers.facebook.com/tools/debug/?q=${watch(
                                            "url"
                                        )}`}
                                        target="_blank"
                                    >
                                        FACEBOOK
                                    </a>{" "}
                                    (nhấn vào nút "Gỡ lỗi")
                                </li>
                                <li>
                                    <a
                                        href="https://telegram.me/webpagebot"
                                        target="_blank"
                                    >
                                        TELEGRAM
                                    </a>{" "}
                                    (gửi đường dẫn của trang cho webpage bot của
                                    Telegram)
                                </li>
                            </ul>
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
