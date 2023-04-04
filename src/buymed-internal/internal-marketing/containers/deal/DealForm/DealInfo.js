import { Grid, MenuItem, TextField, FormHelperText } from "@material-ui/core";
import {
    MyCard,
    MyCardContent,
    MyCardHeader,
} from "@thuocsi/nextjs-components/my-card/my-card";
import { accentsTidy } from "components/global";
import { Controller, useFormContext, useController } from "react-hook-form";
import { DealType, DealTypeOptions, PricingType } from "view-model/deal";
import LabelBox from "@thuocsi/nextjs-components/editor/label-box";
import ImageUploadField from "components/direct-image-upload-field";
import { useState } from "react";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { actionErrorText } from "components/commonErrors";
import { getProductClient } from "client/product";

async function uploadImage(formData) {
    const productClient = getProductClient();
    return await productClient.uploadProductImage(formData);
}

function DealInfo({ isUpdate, isLateUpdate, deal }) {

    const dealForm = useFormContext();
    const toast = useToast();
    const { dealType } = dealForm.watch(["dealType"]);
    const [productImages, setProductImages] = useState(
        deal?.imageUrls ?? []
    );

    const DealTypeLabel = {
        [DealType.DEAL]: "Giảm giá",
        [DealType.COMBO]: "Combo",
    };

    const chargeDealFeeOption = [
        { label: "Thuốc sỉ", value: "MARKETPLACE" },
        { label: "Nhà bán hàng", value: "SELLER" },
        { label: "Thuốc sỉ lên deal cùng nhà bán hàng", value: "SELLER_MARKETPLACE" }
    ]

    const { field: chargeDealFeeField } = useController({
        control: dealForm.control,
        name: "chargeDealFee",
        defaultValue: deal?.chargeDealFee ?? "MARKETPLACE",
    });

    async function handleCropCallback(value) {
        try {
            let result = await uploadImage({
                data: value,
            });
            if (result.status === "OK" && result.data.length > 0) {
                const images = [...dealForm.getValues("imageUrls"), result.data?.[0]];
                dealForm.setValue("imageUrls", images, { shouldValidate: true, shouldDirty: true });
                setProductImages(images);
            } else {
                toast.error(result.message);
            }
        } catch (err) {
            console.log(err);
            toast.error(actionErrorText);
        }
    }

    const handleRemoveImage = (url) => {
        const images = [
            ...dealForm.getValues("imageUrls").filter((imgUrl) => imgUrl !== url),
        ];
        dealForm.setValue("imageUrls", images, { shouldValidate: true, shouldDirty: true });
        setProductImages(images);
    };

    return (
        <MyCard>
            <MyCardHeader title="Thông tin deal" small />
            <MyCardContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            name="name"
                            label="Tên deal"
                            variant="outlined"
                            size="small"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                readOnly: isLateUpdate,
                            }}
                            required
                            error={!!dealForm.errors.name}
                            helperText={dealForm.errors.name?.message}
                            inputRef={dealForm.register({
                                required: "Tên deal không được để trống.",
                                validate: {
                                    notTrimSpace: (value) => {
                                        if (/(^[\s])|([\s]$)|(\s\s)/.test(value)) return "Tên deal không được để trống."
                                    }
                                }
                            })}
                            onChange={(e) => {
                                const currentSlug = dealForm.getValues("slug");
                                const newSlug = accentsTidy(e.target.value);
                                if (!currentSlug || newSlug.indexOf(currentSlug) == 0) {
                                    dealForm.setValue("slug", newSlug, { shouldValidate: true, shouldDirty: true })
                                }
                            }}
                        />
                    </Grid>
                    {dealType === DealType.COMBO && (
                        <Grid item xs={12}>
                            <TextField
                                name="slug"
                                variant="outlined"
                                size="small"
                                label="ID tìm kiếm (slug)"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    readOnly: isLateUpdate,
                                }}
                                required
                                error={!!dealForm.errors.slug}
                                helperText={dealForm.errors.slug?.message}
                                inputRef={dealForm.register({
                                    required: "ID tìm kiếm không được để trống.",
                                    pattern: {
                                        value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                                        message: "Vui lòng nhập ID tìm kiếm chỉ bao gồm ký tự chữ, số và dấu '-'"
                                    }
                                })}
                            />
                        </Grid>
                    )}
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="dealType"
                            control={dealForm.control}
                            defaultValue={DealType.DEAL}
                            render={({ onChange, ...field }) => (
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    label="Loại deal"
                                    placeholder="Chọn loại deal"
                                    fullWidth
                                    select
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    SelectProps={{
                                        readOnly: true,
                                    }}
                                    {...field}
                                    onChange={(e) => {
                                        onChange(e);
                                        dealForm.setValue("skus", [], { shouldDirty: true });
                                        dealForm.setValue("pricingType", PricingType.ABSOLUTE, { shouldDirty: true });
                                    }}
                                >
                                    {DealTypeOptions.map(({ value, label }) => (
                                        <MenuItem key={value} value={value}>{DealTypeLabel[value]}</MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="chargeDealFee"
                            label="Bên chịu giá chênh lệch"
                            variant="outlined"
                            size="small"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            select
                            {...chargeDealFeeField}
                        >
                            {chargeDealFeeOption.map(({ label, value }) => (
                                <MenuItem
                                    key={value}
                                    value={value}
                                >
                                    {label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid container spacing={3} item>
                        <Grid item xs={12}>
                            <LabelBox
                                label="Hình ảnh sản phẩm"
                                padding={1}
                                minHeight={108}
                                {...(dealForm.errors.imageUrls
                                    ? { borderColor: "secondary.main" }
                                    : {})}
                            >
                                <ImageUploadField
                                    title="Thêm hình ảnh"
                                    images={productImages}
                                    handleUploadImage={handleCropCallback}
                                    handleRemoveImage={handleRemoveImage}
                                    disabled={isLateUpdate}
                                    required={dealType === DealType.COMBO}
                                />
                            </LabelBox>
                            <FormHelperText error={dealForm.errors.imageUrls}>
                                {dealForm.errors.imageUrls?.message}
                            </FormHelperText>
                        </Grid>
                    </Grid>
                </Grid>
            </MyCardContent>
        </MyCard>
    );
}

export default DealInfo;
