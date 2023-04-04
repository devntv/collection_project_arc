import { Backdrop, Button, CircularProgress, FormGroup, Grid, TextField } from '@material-ui/core';
import { doWithLoggedInUser, renderWithLoggedInUser } from '@thuocsi/nextjs-components/lib/login';
import MuiMultipleAuto from '@thuocsi/nextjs-components/muiauto/multiple';
import MuiSingleAuto from '@thuocsi/nextjs-components/muiauto/single';
import { MyCard, MyCardContent, MyCardHeader } from '@thuocsi/nextjs-components/my-card/my-card';
import { useToast } from '@thuocsi/nextjs-components/toast/useToast';
import { getPostClient } from 'client/post';
import { getProductClient } from 'client/product';
import { getRegionClient } from 'client/region';
import AuthorizationScreen from 'components/authorization-screen';
import ImageUploadField from 'components/direct-image-upload-field';
import { formatErrorMessage } from 'components/global';
import VideoUploader from 'components/video-uploader';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AppMarketing from 'pages/_layout';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getLinkEmbedYoutubeId } from '.';
import styles from './style.module.css';

export async function getServerSideProps(ctx) {
    return await doWithLoggedInUser(ctx, async (ctx) => {
        return loadData(ctx);
    });
}

export const nationWideCode = '00';
export const nationWideOption = {
    label: 'Toàn quốc',
    value: '00',
    code: '00',
};

export async function loadData(ctx) {
    let regionList = [];
    let provinceList = [];
    const regionClient = getRegionClient(ctx, {});
    const [resRegion, resProvince] = await Promise.all([regionClient.getListRegion(0, 1000), regionClient.getListProvince()]);
    if (resRegion.status === 'OK' && resRegion.data && resRegion.data.length > 0) {
        regionList = resRegion.data.map((region) => {
            return {
                label: region.name,
                value: region.regionID.toString(),
                regionID: region.regionID,
                code: region.code,
                provinceCodes: region.provinceCodes
            };
        });
    }

    if (resProvince.status === 'OK' && resProvince.data && resProvince.data.length > 0) {
        provinceList = resProvince.data
            .map((province) => {
                return {
                    label: province.name,
                    value: province.code.toString(),
                    code: province.code,
                    regionCode: province.regionCode
                };
            })
            .sort((a, b) => a.label > b.label);
    }

    const products = [];
    const productClient = getProductClient(ctx, {});
    const productRes = await productClient.getProductFromNextJS(0, 1);
    if (productRes.status === 'OK') {
        const promises = [];
        const limit = 100;
        const total = parseInt(productRes.total);
        for (let i = 0; i < total; i += limit) {
            promises.push(productClient.getProductFromNextJS(i, limit));
        }
        const responses = await Promise.all(promises);
        for (let i = 0; i < responses.length; i++) {
            if (responses[i].status === 'OK') {
                products.push(...responses[i].data);
            }
        }
    }

    return {
        props: {
            regionList,
            provinceList,
            products,
            isNew: true,
            isReadyOnly: false
        },
    };
}


export default function NewPage(props) {
    return renderWithLoggedInUser(props, PagePostData);
}

export function PagePostData({ post, isNew = true, skuList = [], provinceList = [], products = [], locationInPost = [], regionList = [] }) {

    if (!isNew && !post.id){
        return <NotFound/>
      }

      
    const title = isNew ? "Thêm bài đăng" : "Cập nhật bài đăng";
    const breadcrumb = [
        {
            name: "Trang chủ",
            link: '/marketing',
        },
        {
            name: "Danh sách bài đăng",
            link: '/marketing/post',
        },
        {
            name: title,
        },
    ];

    const contentOptions = [
        {
            label: "Hình ảnh",
            value: 'IMAGE',
        },
        {
            label: "Video",
            value: 'VIDEO',
        },
    ];

    const { error, warn } = useToast();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const _client = getPostClient();
    const productClient = getProductClient();

    const [isDeal, setIsDeal] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [youtubeLink, setYoutubeLink] = useState(post?.ytbEmbeddedUrl || '');
    const [images, setImages] = useState(post?.images ?? []);
    const [videos, setVideos] = useState((post?.video && [post.video]) ?? []);
    const [thumbnail, setThumbnail] = useState((post?.thumbnail && [post.thumbnail]) ?? []);
    const [productOptions, setProductOptions] = useState(skuList);

    const formhook = useForm({
        defaultValues: {
            name: post?.title ?? '',
            ytbEmbeddedUrl: post?.ytbEmbeddedUrl || '',
            provinces: locationInPost ?? [],
            products: post?.products[0] ?? {},
            contentType: post?.contentType ? contentOptions.find((item) => item.value === post?.contentType) : contentOptions[0],
            images: post?.images ?? [],
            thumbnail: post?.thumbnail ?? [],
        },
        mode: 'all',
    });

    useEffect(() => {
        formhook.register({ name: 'images' });
        formhook.register({ name: 'thumbnail' });
    }, []);

    async function createNewPost(formData) {
        const { name, ytbEmbeddedUrl } = formData;
        const namePost = name.trim().replace(/\s+/g, ' ');
        const locationCodes = [];
        for (let i = 0; i < formData.provinces.length; i++) {
            locationCodes.push(formData.provinces[i].code);
        }
        const data = {
            title: namePost,
            products: [
                {
                    sku: formData.products.value,
                    label: formData.products.label,
                    name: formData.products.name,
                },
            ],
            ytbEmbeddedUrl,
            isDeal: isDeal,
            isEnabled: true,
            locationCodes: locationCodes,
            contentType: formData.contentType.value,
            images: formData.contentType.value === 'IMAGE' ? images : null,
            video: formData.contentType.value === 'VIDEO' && videos.length > 0 ? videos[0] : null,
            thumbnail: formData.contentType.value === 'VIDEO' && thumbnail.length > 0 ? thumbnail[0] : null,
        };

        const result = await _client.createNewPost(data);
        setLoading(false);
        if (result && result.status === 'OK') {
            // formhook.reset();
            router.push(`/marketing/post`);
        } else {
            if (result?.errorCode === 'POST_TITLE_EXISTED') {
                error("Bài đăng đã tồn tại");
                return;
            }
            error(formatErrorMessage(result));
        }
    }

    async function updatePost(formData) {
        const { ytbEmbeddedUrl, name } = formData;
        const namePost = name.trim().replace(/\s+/g, ' ');
        const locationCodes = [];
        for (let i = 0; i < formData.provinces.length; i++) {
            locationCodes.push(formData.provinces[i].code);
        }
        const data = {
            id: post?.id,
            title: namePost,
            products: [
                {
                    sku: formData.products.value || formData.products.sku,
                    label: formData.products.label,
                    name: formData.products.name,
                },
            ],
            ytbEmbeddedUrl,
            isDeal: isDeal,
            isEnabled: post?.isEnabled,
            locationCodes: locationCodes,
            contentType: formData.contentType.value,
            images: formData.contentType.value === 'IMAGE' ? images : null,
            video: formData.contentType.value === 'VIDEO' && videos.length > 0 ? videos[0] : null,
            thumbnail: formData.contentType.value === 'VIDEO' && thumbnail.length > 0 ? thumbnail[0] : null,
        };

        const result = await _client.updatePost(data);
        setLoading(false);
        if (result && result.status === 'OK') {
            router.push(`/marketing/post`);
        } else {
            if (result?.errorCode === 'POST_TITLE_EXISTED') {
                error("Bài đăng đã tồn tại");
                return;
            }
            error(formatErrorMessage(result));
        }
    }

    // func onSubmit used because useForm not working with some fields
    async function onSubmit(formData) {
        try {
            const { contentType, ytbEmbeddedUrl } = formData;
            if (contentType.value === 'IMAGE' && images.length == 0) {
                warn("Vui lòng chọn hình ảnh");
                return;
            } else if (contentType.value === 'VIDEO') {
                if (videos.length == 0 && ytbEmbeddedUrl.length === 0) {
                    warn("Vui lòng tải video hoặc link");
                    return;
                }

                if (ytbEmbeddedUrl.length > 0 && !ytbEmbeddedUrl.startsWith('https://www.youtube.com/')) {
                    warn("Vui lòng nhập link bắt đầu từ https://www.youtube.com/");
                    return;
                }
                if (thumbnail.length == 0) {
                    warn("Vui lòng chọn hình đại diện cho bài đăng");
                    return;
                }
            }

            setLoading(true);
            if (isNew) {
                await createNewPost(formData);
            } else {
                await updatePost(formData);
            }
        } catch (err) {
            setLoading(false);
            error(err.message || err.toString());
        }
    }

    const filterProvinces = (regionCode) => {
        return provinceList.filter((province) => province.regionCode === regionCode);
    };

    const onChangeSelectedProvinces = (data) => {
        if (typeof data === 'undefined' || !data) {
            // setProvinceOptions([])
            // setSelectedProvinces([])
            setProductOptions([]);
        } else {
            // setSelectedProvinces(data)
            setLoading(true);
            const locationCodes = [];
            data.forEach((p) => {
                // add province code
                locationCodes.push(p.code);
                // add region code
                regionList
                    .filter((item) => item?.provinceCodes?.indexOf(p.code) >= 0)
                    .forEach((item) => {
                        locationCodes.push(item.code);
                    });
            });
            locationCodes.push(nationWideCode);
            getSkuList(locationCodes).then((r) => {
                setLoading(false);
            });
        }
    };

    const getSkuList = async (locationCodes) => {
        let skuList = [];
        const response = await productClient.getSkuFromClient({ limit: 1, locationCodes });
        if (response.status === 'OK') {
            const promises = [];
            const total = parseInt(response.total);
            for (let i = 0; i < total; i += 1000) {
                promises.push(productClient.getSkuFromClient({ offset: i, locationCodes: locationCodes }));
            }
            const responses = await Promise.all([...promises]);
            for (let i = 0; i < responses.length; i++) {
                if (responses[i].status === 'OK') {
                    skuList.push(...responses[i].data);
                }
            }
        }

        for (let i = 0; i < skuList.length; i++) {
            const product = products.filter((product) => product.code === skuList[i].productCode);
            if (product && product.length > 0) {
                skuList[i].name = product[0].name;
                skuList[i].label = `${skuList[i].code} - ${skuList[i].name}`;
                skuList[i].value = skuList[i].code;
            }
        }
        setProductOptions(skuList);
        return skuList;
    };

    async function uploadImage(formData) {
        let productClient = getProductClient();
        return await productClient.uploadImageFromClient(formData);
    }

    async function handleCropCallback(value) {
        setUploading(true);
        let result = await uploadImage({
            data: value,
        });
        setUploading(false);
        if (result) {
            if (result.status == 'OK') {
                const images = [...formhook.getValues('images'), result.data[0]];
                setImages(images);
                formhook.setValue('images', images);
            } else {
                error(result.errorCode + ' ' + result.message);
            }
        } else {
            error("Thao tác thất bại, vui lòng kiểm tra lại");
        }
    }

    const handleRemoveImage = (url) => {
        setUploading(true);
        const images = [...formhook.getValues('images')?.filter((imgUrl) => imgUrl !== url)];
        formhook.setValue('images', images);
        setImages(images);
        setUploading(false);
    };

    async function handleCropCallbackVideo(value) {
        try {
            setUploading(true);
            let result = await productClient.uploadVideoFromClient({
                data: value,
            });
            if (result.status === 'OK') {
                setVideos([...videos, ...result.data]);
            }
        } catch (err) {
            error(err.message || err.toString());
        }
        setUploading(false);
    }

    const handleRemoveVideo = (url) => {
        setUploading(true);
        const newVideos = [...videos.filter((videoUrl) => videoUrl !== url)];
        setVideos(newVideos);
        setUploading(false);
    };

    async function handleCropCallbackThumbnail(value) {
        setUploading(true);
        let result = await uploadImage({
            data: value,
        });
        setUploading(false);
        if (result) {
            if (result.status == 'OK') {
                const thumbnail = [result.data[0]];
                setThumbnail(thumbnail);
                formhook.setValue('thumbnail', thumbnail);
            } else {
                error(result.errorCode + ' ' + result.message);
            }
        } else {
            error("Thao tác thất bại, vui lòng kiểm tra lại");
        }
    }

    const handleRemoveThumbnail = (url) => {
        setUploading(true);;
        formhook.setValue('thumbnail', []);
        setThumbnail([]);
        setUploading(false);
    };

    return (
        <AuthorizationScreen>
            <AppMarketing select="/marketing/post" breadcrumb={breadcrumb}>
                <Head>
                    <title>{title}</title>
                </Head>
                <MyCard>
                    <MyCardHeader title={title} />
                    <MyCardContent>
                        <form>
                            <FormGroup>
                                <Grid container justify="space-between">
                                    <Grid
                                        container
                                        spacing={3}
                                        item
                                        xs={6}
                                        md={6}
                                        sm={6}
                                        direction="row"
                                        justify="space-between"
                                        alignItems="center"
                                        className={styles.contentPadding}
                                    >
                                        <Grid
                                            item
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            style={{
                                                width: 'calc(100%)',
                                            }}
                                        >
                                            <TextField
                                                name="name"
                                                label="Tên"
                                                placeholder=""
                                                autoComplete="off"
                                                variant="outlined"
                                                size="small"
                                                margin="normal"
                                                style={{
                                                    width: 'calc(100%)',
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                required
                                                helperText={formhook.errors?.name?.message}
                                                error={!!formhook.errors?.name}
                                                inputRef={formhook.register({
                                                    required: "Vui lòng nhập tên",
                                                    maxLength: {
                                                        value: 250,
                                                        message: "Tên bài đăng có độ dài tối đa 250 kí tự",
                                                    },
                                                    minLength: {
                                                        value: 1,
                                                        message: "Tên bài đăng có độ dài tối thiểu 1 kí tự",
                                                    },
                                                    pattern: {
                                                        value: /^(?!.*[ ]{2})/,
                                                        message: "Tên không hợp lệ (không được dư khoảng trắng)",
                                                    },
                                                })}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            style={{
                                                width: 'calc(100%)',
                                            }}
                                        >
                                            <MuiMultipleAuto
                                                name="provinces"
                                                options={[nationWideOption, ...provinceList]}
                                                label="Tỉnh/thành phố"
                                                required={true}
                                                control={formhook.control}
                                                errors={formhook.errors}
                                                message="Vui lòng nhập tỉnh/thành phố"
                                                onValueChange={onChangeSelectedProvinces}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6}></Grid>
                                        <Grid
                                            item
                                            style={{
                                                width: 'calc(100%)',
                                            }}
                                        >
                                            <MuiSingleAuto
                                                name="products"
                                                options={productOptions}
                                                label="Sản phẩm"
                                                required={true}
                                                control={formhook.control}
                                                errors={formhook.errors}
                                                message="Vui lòng chọn sản phẩm"
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            style={{
                                                width: 'calc(100%)',
                                                height: '65px',
                                            }}
                                        >
                                            <MuiSingleAuto
                                                name="contentType"
                                                options={contentOptions}
                                                label="Nội dung"
                                                placeholder="Chọn"
                                                control={formhook.control}
                                                errors={!!formhook.errors?.type}
                                                message="Vui lòng chọn nội dung"
                                            // onValueChange={onChangeContentType}
                                            />
                                        </Grid>

                                        {formhook.watch('contentType').value === 'VIDEO' && (
                                            <Grid item xs={12} sm={12} md={12}>
                                                <Grid item>
                                                    <TextField
                                                        name="ytbEmbeddedUrl"
                                                        label="Link Youtube (bắt đầu từ https://www.youtube.com/ )"
                                                        variant="outlined"
                                                        size="small"
                                                        margin="normal"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        fullWidth
                                                        inputRef={formhook.register({})}
                                                        onChange={(e) => {
                                                            setYoutubeLink(e?.target?.value);
                                                        }}
                                                    />
                                                </Grid>

                                                <Grid item className={styles.media_content}>
                                                    <span style={{ color: 'grey' }}>*{`Chọn file hình ảnh có loại: ` + '.jpg, .png, jpeg'}</span>
                                                    <ImageUploadField
                                                        required={true}
                                                        hintText="Hình ảnh đại diện"
                                                        title="Cập nhật ảnh đại diện"
                                                        images={thumbnail || []}
                                                        handleUploadImage={handleCropCallbackThumbnail}
                                                        handleRemoveImage={handleRemoveThumbnail}
                                                    />
                                                </Grid>
                                                <Grid itemclassName={styles.media_content}>
                                                    <VideoUploader
                                                        id={'video'}
                                                        name="Video"
                                                        style={{ margin: 12 }}
                                                        required={true}
                                                        title="Cập nhật video"
                                                        videos={videos}
                                                        handleCropCallback={handleCropCallbackVideo}
                                                        handleRemoveVideo={handleRemoveVideo}
                                                    />
                                                </Grid>
                                            </Grid>
                                        )}

                                        {formhook.watch('contentType').value === 'IMAGE' && (
                                            <Grid item className={styles.media_content}>
                                                <span style={{ color: 'grey' }}>*{`Chọn file hình ảnh có loại: ` + '.jpg, .png, jpeg'}</span>
                                                <ImageUploadField
                                                    title="Cập nhật hình ảnh sản phẩm"
                                                    images={images || []}
                                                    required={true}
                                                    handleUploadImage={handleCropCallback}
                                                    handleRemoveImage={handleRemoveImage}
                                                />
                                            </Grid>
                                        )}

                                        <Grid item xs={12} sm={12} md={12}>
                                            {/*<Button variant="contained" type="reset" style={{marginLeft: 12}}*/}
                                            {/*        disabled={loading}>*/}
                                            {/*	Làm mới*/}
                                            {/*</Button>*/}
                                            <Button
                                                variant="contained"
                                                style={{ marginLeft: 12 }}
                                                disabled={loading}
                                                onClick={() => {
                                                    formhook.reset();
                                                }}
                                            >
                                                Làm mới
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                style={{ marginLeft: 12 }}
                                                onClick={formhook.handleSubmit(onSubmit)}
                                                disabled={loading || uploading}
                                            >
                                                Lưu
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6}>
                                        <Grid item className={styles.media_content}>
                                            {youtubeLink && (
                                                <iframe
                                                    width="500"
                                                    height="300"
                                                    src={getLinkEmbedYoutubeId(youtubeLink)}
                                                    title="YouTube video player"
                                                    frameborder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowfullscreen
                                                ></iframe>
                                            )}
                                            {videos && videos[0] && (
                                                <video style={{ width: '500px', height: '300px' }} poster={(thumbnail && thumbnail[0]) || ''} controls>
                                                    <source src={videos[0]} type="video/mp4" />
                                                </video>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </FormGroup>
                        </form>
                        <Backdrop open={loading} style={{ zIndex: 888 }}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </MyCardContent>
                </MyCard>
            </AppMarketing>
        </AuthorizationScreen>
    );
}
