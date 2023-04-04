import {
  Box,
  Button,
  FormGroup,
  Paper,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  doWithLoggedInUser,
  renderWithLoggedInUser,
} from "@thuocsi/nextjs-components/lib/login";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import {
  MyCard,
  MyCardContent,
  MyCardHeader,
} from "@thuocsi/nextjs-components/my-card/my-card";
import Head from "next/head";
import { useRouter } from "next/router";
import AppMarketing from "pages/_layout";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./popup.module.css";
import ImageUploadField from "components/image-upload-field";
import LabelBox from "@thuocsi/nextjs-components/editor/label-box/index";
import { getPopupClient } from "client/popup";
import { getCommonClient } from "client/common";
import AuthorizationScreen from "components/authorization-screen";
import { formatErrorMessage } from "components/global";

export async function getServerSideProps(ctx) {
  return await doWithLoggedInUser(ctx, async () => { });
}

export default function NewPage(props) {
  return renderWithLoggedInUser(props, render);
}

function render() {
  const router = useRouter();

  const PopupStatus = [
    {
      value: "unactive",
      label: "Chưa kích hoạt"
    },
    {
      value: "active",
      label: "Đang chạy"
    },
  ]

  const PopupType = [
    {
      value: "image",
      label: "Hình ảnh"
    },
    {
      value: "video",
      label: "Video"
    }
  ]

  const PopupPosition = [
    {
      value: "center",
      label: "Giữa"
    },
    {
      value: "left",
      label: "Trái"
    },
    {
      value: "right",
      label: "Phải"
    }
  ]

  const {
    register,
    handleSubmit,
    control,
    errors,
    setValue,
  } = useForm({
    defaultValues: {
      imageUrl: "",
      type: PopupType[0].value,
      status: PopupStatus[0].value,
      position: PopupPosition[0].value,
    },
  });
  const { error } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [popupImage, setPopupImage] = useState([]);
  const [currentType, setCurrentType] = useState(PopupType[0].value);
  const [position] = useState(PopupPosition[0].value);
  const [currentStatus, setCurrentStatus] = useState(PopupStatus[0].value);
  const popupClient = getPopupClient();
  const commonClient = getCommonClient();

  async function createNewPopupMarketing(formData) {
    setLoading(true);
    let result = await popupClient.createPopup(formData);
    setLoading(false);
    if (result.status === "OK") {
      router.push(`/marketing/popup`);
    } else {
      error(formatErrorMessage(result));
    }
  }

  // func onSubmit used because useForm not working with some fields
  async function onSubmit(formData) {
    try {
      formData.name = formData?.name.trim().replace(/\s+/g, " ");
      await createNewPopupMarketing(formData);
    } catch (err) {
      setLoading(false);
      error(err.message || err.toString());
    }
  }

  async function uploadImage(img) {
    let res = await commonClient.uploadImage(img);
    return await res.data;
  }

  async function handleCropCallback(value) {
    try {
      setUploadingImage(true);
      let result = await uploadImage({
        data: value,
      });
      const image = result[0];
      setValue("imageUrl", image);
      setPopupImage([image]);
    } catch (err) {
      error(err.message || err.toString());
    }
    setUploadingImage(false);
  }

  const handleRemoveImage = () => {
    setValue("imageUrl", "");
    setPopupImage([]);
  };

  let breadcrumb = [
    {
      name: "Trang chủ",
      link: "/marketing",
    },
    {
      name: "Danh sách popup",
      link: "/marketing/popup",
    },
    {
      name: "Thêm mới popup",
    },
  ];


  useEffect(() => {
    register({ name: "imageUrl" });
  }, []);
  return (
    <AuthorizationScreen>
      <AppMarketing select="/marketing/popup" breadcrumb={breadcrumb}>
        <Head>
          <title>Thêm mới popup</title>
        </Head>
        <MyCard>
          <MyCardHeader title="Thêm mới popup" />
          <Box component={Paper} className={styles.form_50}>
            <FormGroup>
              <MyCardContent>
                <form>
                  <Grid
                    container
                    spacing={3}
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    className={styles.contentPadding}
                  >
                    <Grid item xs={12} md={12}>
                      <FormControl
                        className={styles.formControl}
                        size="small"
                        variant="outlined"
                        style={{ width: "100%" }}
                      >
                        <TextField
                          id="name"
                          name="name"
                          variant="outlined"
                          size="small"
                          label="Tên popup"
                          placeholder=""
                          helperText={errors.name?.message}
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          style={{ width: "100%" }}
                          error={!!errors.name}
                          inputRef={register({
                            required: "Vui lòng nhập tên popup",
                            maxLength: {
                              value: 250,
                              message: "Tên popup có độ dài tối đa 250 kí tự",
                            },
                            minLength: {
                              value: 2,
                              message: "Tên popup có độ dài tối thiểu 2 kí tự",
                            },
                            pattern: {
                              value: /^(?!.*[ ]{2})/,
                              message:
                                "Tên không hợp lệ (không được dư khoảng trắng).",
                            },
                          })}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl
                        className={styles.formControl}
                        size="small"
                        variant="outlined"
                        style={{ width: "100%" }}
                      >
                        <InputLabel id="type">Loại popup</InputLabel>
                        <Controller
                          name="type"
                          control={control}
                          rules={{ required: true }}
                          as={({ onChange, value }) => {
                            return (
                              <Select
                                value={currentType}
                                label="Loại popup"
                                onChange={(e) => {
                                  setCurrentType(e.target.value);
                                  onChange(e.target.value);
                                }}
                              >
                                {PopupType.map(({ label, value }) => (
                                  <MenuItem value={value} key={value}>
                                    {label}
                                  </MenuItem>
                                ))}
                              </Select>
                            );
                          }}
                          onChange={(val) => {
                            return val;
                          }}
                        />
                      </FormControl>
                    </Grid>
                    {currentType === "image" && (
                      <>
                        <Grid item xs={12} sm={12} md={12}>
                          <LabelBox label="Hình ảnh popup" padding={1}>
                            <ImageUploadField
                              title="Cập nhật hình ảnh popup"
                              images={popupImage}
                              handleCropCallback={handleCropCallback}
                              handleRemoveImage={handleRemoveImage}
                              hintText="Thêm hình ảnh"
                            />
                          </LabelBox>
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <TextField
                            id="url"
                            name="url"
                            label="Đường dẫn internal (ví dụ: /dat-hang-nhanh)"
                            variant="outlined"
                            size="small"
                            placeholder=""
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            style={{ width: "100%" }}
                            error={!!errors.url}
                            helperText={errors.url?.message}
                            inputRef={register({
                              pattern: {
                                value: /(^[/])/,
                                message:
                                  "Đường dẫn URL không hợp lệ",
                              },
                            })}
                          />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <TextField
                            id="redirectURL"
                            name="redirectURL"
                            label="Đường dẫn external (ví dụ: https://abc.com)"
                            variant="outlined"
                            size="small"
                            placeholder=""
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            style={{ width: "100%" }}
                            error={!!errors.redirectURL}
                            helperText={errors.redirectURL?.message}
                            inputRef={register({
                              pattern: {
                                value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
                                message: "Đường dẫn URL không hợp lệ",
                              },
                            })}
                          />
                        </Grid>
                      </>
                    )}
                    {currentType === "video" && (
                      <Grid item xs={12} md={12}>
                        <TextField
                          id="youTubeURL"
                          name="youTubeURL"
                          label="Youtube URL"
                          variant="outlined"
                          size="small"
                          placeholder=""
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          style={{ width: "100%" }}
                          error={!!errors.youTubeURL}
                          helperText={errors.youTubeURL?.message}
                          inputRef={register({
                            required: "Vui lòng nhập youtube url",
                            pattern: {
                              value: /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?$/,
                              message: "Đường dẫn URL youtube không hợp lệ",
                            },
                          })}
                        />
                      </Grid>
                    )}

                    <Grid item xs={12} md={12}>
                      <FormControl
                        className={styles.formControl}
                        size="small"
                        variant="outlined"
                        style={{ width: "100%" }}
                      >
                        <InputLabel id="position">Ví trị hiển thị</InputLabel>
                        <Controller
                          name="position"
                          control={control}
                          defaultValue={
                            PopupPosition ? PopupPosition[0].value : ""
                          }
                          rules={{ required: true }}
                          as={({ onChange, value }) => {
                            return (
                              <Select
                                value={position}
                                label="Ví trị hiển thị"
                                onChange={(e) => {
                                  setCurrentType(e.target.value);
                                  onChange(e.target.value);
                                }}
                              >
                                {PopupPosition.map(({ label, value }) => (
                                  <MenuItem value={value} key={value}>
                                    {label}
                                  </MenuItem>
                                ))}
                              </Select>
                            );
                          }}
                          onChange={(val) => {
                            return val;
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        id="description"
                        name="description"
                        label="Mô tả"
                        placeholder=""
                        margin="normal"
                        multiline
                        rows={7}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{ width: "100%" }}
                        inputRef={register}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl
                        className={styles.formControl}
                        size="small"
                        variant="outlined"
                        style={{ width: "100%" }}
                      >
                        <InputLabel id="status">Trạng thái</InputLabel>
                        <Controller
                          name="status"
                          control={control}
                          rules={{ required: true }}
                          as={({ onChange, value }) => {
                            return (
                              <Select
                                value={currentStatus}
                                label="Trạng thái"
                                onChange={(e) => {
                                  setCurrentStatus(e.target.value);
                                  onChange(e.target.value);
                                }}
                              >
                                {PopupStatus.map(({ label, value }) => (
                                  <MenuItem value={value} key={value}>
                                    {label}
                                  </MenuItem>
                                ))}
                              </Select>
                            );
                          }}
                          onChange={(val) => {
                            return val;
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Button
                      variant="contained"
                      type="reset"
                      onClick={handleSubmit(onSubmit)}
                      disabled={loading || uploadingImage}
                    >
                      Tạo popup
                    </Button>
                  </Grid>
                </form>
              </MyCardContent>
            </FormGroup>
          </Box>
        </MyCard>
      </AppMarketing>
    </AuthorizationScreen>
  );
}
