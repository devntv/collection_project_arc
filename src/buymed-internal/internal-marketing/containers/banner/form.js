import {
  Box,
  Button,
  ButtonGroup,
  CardContent,
  FormHelperText,
  FormGroup,
  Paper,
  TextField,
  Grid,
  Typography,
  Card,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {
  MyCard,
  MyCardContent,
  MyCardHeader,
} from "@thuocsi/nextjs-components/my-card/my-card";
import { validateSpace } from "utils/validation"
import { getBannerClient } from "client/banner";
import { getCommonClient } from "client/common";
import stylesGlobal from "components/css-global.module.css";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import AppMarketing from "pages/_layout";
import React, { useState, useRef, useEffect } from "react";
import { Controller, useForm, useController } from "react-hook-form";
import LabelBox from "@thuocsi/nextjs-components/editor/label-box/index";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import DirectImageUploadField from "components/direct-image-upload-field";
import NotFound from "@thuocsi/nextjs-components/not-found/not-found";
import { formatErrorMessage } from "components/global";

const useStyles = makeStyles({
  root: {
    '& .MuiFormLabel-root': {
      color: 'red',
    }
  }
})

export async function loadData(ctx) { }

export default function RenderForm(props) {

  if (props?.isUpdate === true && !props.banner?._id) {
    return (
      <AppMarketing select="/marketing/banner">
        <Head>
          <title>{props.isUpdate ? "Cập nhật" : "Thêm banner"}</title>
        </Head>
        <NotFound />
      </AppMarketing>
    );
  }
  const classes = useStyles()
  let editObject = props.isUpdate ? props.banner : {};
  const [loading, setLoading] = useState(false);
  const [] = useState({});

  const [uploadingImage, setUploadingImage] = useState(false);

  const router = useRouter();
  const { imgURL } = props.banner || {};
  const imgURLs = imgURL ? [imgURL] : [];
  const { register, handleSubmit, errors, setValue, getValues, control, clearErrors } = useForm({
    defaultValues: { ...editObject },
  });
  useController({
    name: "imgURLs",
    control: control,
    rules: {
      validate: (value) => {
        if (value.length == 0) return "Vui lòng chọn ảnh"



      },
    },
    defaultValue: imgURLs
  })

  const breadcrumb = [
    {
      name: "Trang chủ",
      link: "/marketing",
    },
    {
      name: "Danh sách banner",
      link: "/marketing/banner",
    },
    {
      name: props.isUpdate ? "Cập nhật banner" : "Thêm banner"
    },
  ];

  const commonClient = getCommonClient();
  const [bannerImages, setBannerImages] = useState(imgURLs);

  const { error, success } = useToast();

  const onSubmit = async (formData) => {
    if (!formData.imgURLs || formData.imgURLs.length === 0) {
      error("Hình ảnh không thể để trống");
      return;
    }
    const data = {
      ...formData,
      id: props.banner?._id || "",
      imgURL: formData.imgURLs[0],
    };
    const bannerClient = getBannerClient();
    if (props.isUpdate) {
      setLoading(true);
      const result = await bannerClient.updateBanner(data);
      setLoading(false);
      if (result && result.status && result.status === "OK") {
        success("Upload thành công");
      } else {
        error(formatErrorMessage(result));
      }
    } else {
      setLoading(true);
      const result = await bannerClient.createNewBanner(data);
      setLoading(false);
      if (result && result.status && result.status === "OK") {
        success("Tạo mới banner thành công");
        router.push(`/marketing/banner`);
      } else {
        error(formatErrorMessage(result));
      }
    }
  };
  async function uploadImage(formData) {
    const res = await commonClient.uploadImage(formData);
    return res;
  }
  const handleRemoveImage = (url) => {
    setUploadingImage(true);
    setValue("imgURLs", []);
    setBannerImages([]);
    setUploadingImage(false);
  };

  async function handleCropCallback(data) {
    setUploadingImage(true);
    try {
      const result = await uploadImage({
        data,
      });
      if (result.status !== "OK" || !result.data || result.data.length === 0)
        throw new Error(formatErrorMessage(result));
      const images = result.data;
      setValue("imgURLs", images);
      setBannerImages(images);
    } catch (err) {
      error(err.message || err.toString());
    }
    setUploadingImage(false);
  }

  useEffect(() => {
    if (bannerImages.length > 0) {
      clearErrors('imgURLs')
    }
  }, [bannerImages]);

  return (
    <AppMarketing
      select="/marketing/banner"
      breadcrumb={breadcrumb}
    >
      <Head>
        <title>{props.isUpdate ? "Cập nhật banner" : "Thêm banner"}</title>
      </Head>
      <MyCard>
        <MyCardHeader
          title={props.isUpdate ? `Banner #${props.banner?.code || ""} ` : "Thêm banner"}
        />
        <Box
          component={Paper}
          display="block"
          style={{ backgroundColor: "#F9FAFB" }}
        >
          <FormGroup>
            <MyCardContent>
              <form noValidate style={{ margin: "10px" }}>
                <Box>
                  <Card
                    style={{
                      border: "none",
                      boxShadow: "none",
                      borderRadius: "unset",
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        component="h6"
                        style={{ marginBottom: "10px", fontSize: 18 }}
                      >
                        Thông tin banner
                      </Typography>

                      <Grid style={{ marginTop: "10px" }} spacing={3} container>
                        <Grid item xs={6} sm={6}>
                          <TextField
                            id="name"
                            name="name"
                            variant="outlined"
                            size="small"
                            label="Tên banner"
                            placeholder=""
                            helperText={errors.name?.message}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            style={{ width: "100%" }}
                            error={!!errors.name}
                            required
                            inputRef={register({
                              required: "Tên banner không thể để trống",
                              maxLength: {
                                value: 250,
                                message:
                                  "Tên banner có độ dài tối đa 250 kí tự",
                              },
                              minLength: {
                                value: 6,
                                message:
                                  "Tên banner có độ dài tối thiểu 6 kí tự",
                              },
                              pattern: {
                                value: /^(?!.*[ ]{2})/,
                                message:
                                  "Tên không hợp lệ (không được dư khoảng trắng).",
                              },
                              validate: (val) => validateSpace(val)
                            })}
                          />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                          <TextField
                            id="targetURL"
                            name="targetURL"
                            variant="outlined"
                            size="small"
                            label="Đường dẫn đích (ví dụ:https://abc.com/asd)"
                            placeholder=""
                            helperText={errors.targetURL?.message}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            style={{ width: "100%" }}
                            error={!!errors.targetURL}
                            required
                            inputRef={register({
                              required: "Đường dẫn đích không thể để trống",
                              pattern: {
                                value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
                                message: "Đường dẫn không hợp lệ",
                              },
                            })}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            id="description"
                            name="description"
                            label="Mô tả"
                            placeholder=""
                            multiline
                            rows={6}
                            variant="outlined"
                            size="small"
                            style={{ width: "100%" }}
                            helperText={errors.description?.message}
                            error={!!errors.description}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputRef={register({
                              validate: (val) => validateSpace(val)
                            })}
                          />
                        </Grid>
                        <Grid item xs={6} className={errors.imgURLs ? classes.root : null}>
                          <LabelBox label={"Hình ảnh banner *"} borderColor={errors.imgURLs ? 'red' : null} padding={2}>
                            <DirectImageUploadField
                              title="Cập nhật hình ảnh banner"
                              images={bannerImages}
                              handleUploadImage={handleCropCallback}
                              handleRemoveImage={handleRemoveImage}
                              required
                            />
                          </LabelBox>
                          <FormHelperText error={errors.imgURLs}>{errors.imgURLs?.message}</FormHelperText>
                        </Grid>
                      </Grid>
                      <Box style={{ marginTop: "10px" }}>
                        {props.isUpdate ?
                          <Link href={`/marketing/banner`}>
                            <ButtonGroup
                              color="primary"
                              aria-label="contained primary button group"
                            >
                              <Button variant="contained" color="default">
                                Quay lại
                              </Button>
                            </ButtonGroup>
                          </Link>
                          : null
                        }
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleSubmit(onSubmit)}
                          style={{ margin: 8 }}
                        >
                          {loading && <CircularProgress size={20} />}
                          Lưu
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </form>
            </MyCardContent>
          </FormGroup>
        </Box>
      </MyCard>
    </AppMarketing>
  );
}
