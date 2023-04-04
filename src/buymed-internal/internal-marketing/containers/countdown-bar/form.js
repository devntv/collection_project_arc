import DateFnsUtils from "@date-io/date-fns";
import {
    Button,
    Grid,
    MenuItem,
    Switch,
    TextField,
    Tooltip,
    Typography,
} from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
    MyCard,
    MyCardActions,
    MyCardContent,
    MyCardHeader,
} from "@thuocsi/nextjs-components/my-card/my-card";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { getFileManagerClient } from "client/file-manager";
import DateTimePicker from "components/component/promotion/date-time-picker";
import ColorPicker from "material-ui-color-picker";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UploadImageFile from "./uploadImageFile";

const getURLwithProtocol = (url) => {
    if (url.startsWith("http")) {
        return url;
    }
    return `http://${url}`;
};

export default function FormData({ data = null, onSubmit }) {
    const router = useRouter();
    const [token, setToken] = useState(null);
    const toast = useToast();

    useEffect(() => {
        (async function () {
            let tokenRs = await getFileManagerClient().getToken();
            if (tokenRs.status == "OK") {
                setToken(tokenRs.message);
            }
        })();
    }, []);

    let {
        setValue,
        register,
        watch,
        handleSubmit,
        getValues,
        control,
        errors,
    } = useForm({
        defaultValues: {
            name: data?.name ?? "",
            type: data?.type ?? "WEBSITE",
            imageType: data?.imageType ?? "FULL",
            backgroundColor: data?.backgroundColor ?? "#fff",
            url: data?.url ?? "",
            imageUrl: data?.imageUrl ?? "",
            startDisplayTime: data?.startDisplayTime ?? null,
            endDisplayTime: data?.endDisplayTime ?? null,
            isActive: data?.isActive ?? false,
        },
    });

    const [countdownBarImage, setCountdownBarImage] = useState(
        data?.imageUrl ?? ""
    );

    const title = !data ? "Tạo countdown bar mới" : "Cập nhật countdown bar";

    const types = [
        {
            value: "WEBSITE",
            label: "Website",
        },
        // chưa có api cho mobile
        // {
        //     value: "mobile",
        //     label: "Mobile",
        // },
    ];

    const imageTypes = [
        {
            value: "FULL",
            label: "Full",
        },

        {
            value: "HALF",
            label: "Half",
        },
    ];

    return (
        <MyCard>
            <MyCardHeader title={title} />
            <MyCardContent>
                <form
                    id="myForm"
                    onSubmit={handleSubmit(async (data) => {
                        const dataSubmit = {
                            ...data,
                            imageUrl: countdownBarImage,
                        };

                        if (!dataSubmit?.imageUrl) {
                            toast.error("Vui lòng chọn ảnh cho countdown bar");
                            return;
                        }
                        await onSubmit?.(dataSubmit);
                    })}
                >
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={5}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <b>Hướng dẫn cài đặt:</b>
                                    <ul>
                                        <li>
                                            Chọn file hình ảnh countdown bar
                                            (.PNG, .JPG, .JPEG, .GIF, .SVG)
                                        </li>
                                        <li>Điền đường dẫn của hình ảnh</li>
                                        <li>
                                            Chọn mã màu của nền countdown bar
                                        </li>
                                        <li>
                                            Chọn thời gian hiển thị countdown
                                            bar
                                        </li>
                                        <li>Kích thước hình ảnh: 1904x75px</li>
                                    </ul>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Tên countdown bar"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        name="name"
                                        variant="outlined"
                                        multiline
                                        inputRef={register({
                                            validate: (value) => {
                                                if (value.trim().length == 0) {
                                                    setValue(
                                                        "url",
                                                        value.trim()
                                                    );
                                                    return "Tên countdown bar là bắt buộc";
                                                }
                                            },
                                            required:
                                                "Tên countdown bar là bắt buộc",
                                        })}
                                        helperText={errors.name?.message}
                                        error={!!errors.name}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <Tooltip title="Hiện tại chỉ hỗ trợ chức năng Countdown bar cho web">
                                        <TextField
                                            label="Tùy chọn cài đặt"
                                            name="type"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            select
                                            disabled
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            helperText={errors.type?.message}
                                            error={!!errors.type}
                                            defaultValue={watch("type")}
                                            {...register("type")}
                                        >
                                            {types?.map((item) => (
                                                <MenuItem
                                                    key={item.value}
                                                    value={item.value}
                                                >
                                                    {item.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        label="Tùy chọn cài đặt"
                                        name="imageType"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        select
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        helperText={errors.imageType?.message}
                                        error={!!errors.imageType}
                                        defaultValue={watch("imageType")}
                                        {...register("imageType")}
                                        onChange={(e) => {
                                            setValue(
                                                "imageType",
                                                e.target.value
                                            );
                                        }}
                                    >
                                        {imageTypes?.map((item) => (
                                            <MenuItem
                                                key={item.value}
                                                value={item.value}
                                            >
                                                {item.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <UploadImageFile
                                        label={"Chọn file hình ảnh"}
                                        exts={[
                                            "jpg",
                                            "png",
                                            "jpeg",
                                            "gif",
                                            "svg",
                                        ]}
                                        name="img"
                                        register={register}
                                        uploadToken={token}
                                        onFileChanged={(file) =>
                                            setCountdownBarImage(
                                                file?.publicUrl || ""
                                            )
                                        }
                                        currentFile={{
                                            name: data?.name ?? "",
                                            publicUrl: data?.imageUrl ?? "",
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <ColorPicker
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        fullWidth
                                        label="Chọn màu nền"
                                        name="backgroundColor"
                                        inputRef={register({
                                            required: "Vui lòng chọn màu nền",
                                        })}
                                        defaultValue={getValues(
                                            "backgroundColor"
                                        )}
                                        value={watch("backgroundColor")}
                                        onChange={(color) => {
                                            setValue("backgroundColor", color);
                                        }}
                                        setValue={(color) =>
                                            setValue("backgroundColor", color)
                                        }
                                        helperText={
                                            errors.backgroundColor?.message
                                        }
                                        error={!!errors.backgroundColor}
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
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <MuiPickersUtilsProvider
                                                utils={DateFnsUtils}
                                            >
                                                <Typography>
                                                    Thời gian bắt đầu hiển thị
                                                </Typography>
                                                <DateTimePicker
                                                    label="Thời gian bắt đầu hiển thị"
                                                    control={control}
                                                    name="startDisplayTime"
                                                    inputRef={register}
                                                    helperText={
                                                        errors.startDisplayTime
                                                            ?.message
                                                    }
                                                    error={
                                                        !!errors.startDisplayTime
                                                    }
                                                    placeholder="Chọn thời gian bắt đầu hiển thị"
                                                    validate={(value) => {
                                                        if (
                                                            value?.toString() ===
                                                            "Invalid Date"
                                                        ) {
                                                            return "Thời gian không hợp lệ";
                                                        }
                                                    }}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <MuiPickersUtilsProvider
                                                utils={DateFnsUtils}
                                            >
                                                <Typography>
                                                    Thời gian kết thúc hiển thị
                                                </Typography>
                                                <DateTimePicker
                                                    label="Thời gian kết thúc hiển thị"
                                                    control={control}
                                                    name="endDisplayTime"
                                                    inputRef={register}
                                                    helperText={
                                                        errors.endDisplayTime
                                                            ?.message
                                                    }
                                                    minDate={
                                                        new Date(
                                                            watch(
                                                                "startDisplayTime"
                                                            )
                                                        )
                                                    }
                                                    error={
                                                        !!errors.endDisplayTime
                                                    }
                                                    placeholder="Chọn thời gian kết thúc hiển thị"
                                                    validate={(value) => {
                                                        if (
                                                            value?.toString() ===
                                                            "Invalid Date"
                                                        ) {
                                                            return "Thời gian không hợp lệ";
                                                        }
                                                        if (
                                                            new Date(value) <
                                                            new Date(
                                                                watch(
                                                                    "startDisplayTime"
                                                                )
                                                            )
                                                        ) {
                                                            return "Thời gian kết thúc hiển thị phải lớn hơn thời gian bắt đầu hiển thị";
                                                        }
                                                        if (
                                                            new Date() >
                                                            new Date(value)
                                                        ) {
                                                            return "Thời gian kết thúc hiển thị phải lớn hơn thời gian hiện tại";
                                                        }
                                                    }}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </Grid>
                                    </Grid>
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
                        <Grid item xs={12} md={7}>
                            <b>Xem trước hiển thị:</b>
                            <a
                                href={getURLwithProtocol(watch("url"))}
                                target="_blank"
                            >
                                <div
                                    style={{
                                        backgroundColor:
                                            watch("backgroundColor"),
                                        height: 45,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width:
                                            watch("imageType") === "FULL"
                                                ? "100%"
                                                : "50%",
                                    }}
                                >
                                    {countdownBarImage && (
                                        <img
                                            src={countdownBarImage}
                                            alt="preview countdown bar"
                                            style={{
                                                height: "100%",
                                                width:
                                                    watch("imageType") ===
                                                    "FULL"
                                                        ? "80%"
                                                        : "90%",
                                            }}
                                        />
                                    )}
                                </div>
                            </a>
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
