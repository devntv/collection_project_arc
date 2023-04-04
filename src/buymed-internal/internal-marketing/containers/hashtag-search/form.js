import DateFnsUtils from "@date-io/date-fns";
import {
    Box,
    Button,
    Grid,
    makeStyles,
    Switch,
    TextField,
    Typography,
} from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
    MyCard,
    MyCardActions,
    MyCardContent,
    MyCardHeader,
} from "@thuocsi/nextjs-components/my-card/my-card";
import DateTimePicker from "components/component/promotion/date-time-picker";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
export default function FormData({ data = {}, onSubmit, type = "new" }) {
    let styles = useStyles();
    const router = useRouter();

    let {
        setValue,
        register,
        watch,
        handleSubmit,
        control,
        errors,
    } = useForm({
        defaultValues: {
            hashtag: data.hashtag ?? null,
            url: data.url ?? null,
            startDisplayTime: data.startDisplayTime ?? null,
            endDisplayTime: data.endDisplayTime ?? null,
            isActive: data.isActive ?? false,
        },
    });
    const title = type === "new" ? "Tạo hashtag mới" : "Cập nhật hashtag";

    useEffect(() => {
        if (type === "edit" && !Object.keys(data).length) {
            router.push("/marketing/hashtag-search");
        }
    }, []);

    return (
        <MyCard>
            <MyCardHeader title={title} />
            <MyCardContent>
                <form
                    id="myForm"
                    onSubmit={handleSubmit(async (data) => {
                        await onSubmit?.(data);
                    })}
                >
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} lg={9}>
                                    <TextField
                                        fullWidth
                                        label="Tên hashtag"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        name="hashtag"
                                        variant="outlined"
                                        inputRef={register({
                                            validate: (value) => {
                                                if (value.trim().length == 0) {
                                                    setValue(
                                                        "hashtag",
                                                        value.trim()
                                                    );
                                                    return "Hashtag không được để trống";
                                                }
                                            },
                                            required:
                                                "Hashtag không được để trống",
                                        })}
                                        helperText={errors.hashtag?.message}
                                        error={!!errors.hashtag}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={9}>
                                    <TextField
                                        fullWidth
                                        name="url"
                                        label="Đường dẫn của hashtag"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
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
                                <Grid item xs={12} lg={9}>
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
                                                        if (value?.toString() ==="Invalid Date") {
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
                                                        if (value?.toString() === "Invalid Date") {
                                                            return "Thời gian không hợp lệ";
                                                        }
                                                        if (new Date(value) < new Date(watch("startDisplayTime"))) {
                                                            return "Thời gian kết thúc hiển thị phải lớn hơn thời gian bắt đầu hiển thị";
                                                        }
                                                        if (new Date() > new Date(value)) {
                                                            return "Thời gian kết thúc hiển thị phải lớn hơn thời gian hiện tại"; 
                                                        }
                                                    }}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} lg={9}>
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
                                        checked={watch().isActive}
                                        color="primary"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <span className={styles.previewTitle}>
                                Xem trước hiển thị
                            </span>
                            {watch("hashtag") && (
                                <Box className={styles.previewTag}>
                                    {watch("hashtag")}
                                </Box>
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
