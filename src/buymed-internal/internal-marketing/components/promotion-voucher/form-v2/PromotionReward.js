import React, { useEffect, useState } from "react";
import {
    Grid,
    makeStyles,
    TextField,
    FormGroup,
    Typography,
    MenuItem,
    FormHelperText
} from "@material-ui/core";
import {
    MyCard,
    MyCardContent,
    MyCardHeader,
} from "@thuocsi/nextjs-components/my-card/my-card";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { Controller } from "react-hook-form";
import { defaultPromotionRewardType, defaultReward, rewards } from "../constant";
import GiftSlot from "./GiftSlot";
import { getProductClient } from "client/product";
import { getSellerClient } from "client/seller";
import { SkuStatus, SkuStatusList } from "view-model/sku";
import MuiSingleAuto from "@thuocsi/nextjs-components/muiauto/single";
import { useIsFirstRender } from "utils/ReactFC";
import { uuidv4 } from "components/global";
import NumberFormat from "react-number-format";
import { NumberFormatCustom } from "containers/voucher/NumberFormatCustom";

export const textfieldProps = {
    InputLabelProps: {
        shrink: true,
        style: {
            color: "#353434",
            fontSize: "20px",
        },
    },
};

const PromotionReward = (props) => {

    const { useForm, disabled, setListGifts, listGifts = [], isEdit, promotionType, promotionRes } = props;

    const { errors, register, getValues, setValue, control, setError, clearErrors, formState: { isSubmitting } } = useForm;

    const firstRender = useIsFirstRender();
    const [rewardType, setRewardType] = useState(getValues("rewardType") ?? defaultReward.percentage)
    const [defaultOptions, setDefaultOptions] = useState([])

    const [rewardOpts, setRewardOpts] = useState([{ value: "ALL", label: "Tất cả" }, ...rewards])

    const defaultData = {
        sku: null,
        quantity: 1,
    }

    async function getListGift(search = "") {
        const client = getProductClient()
        const searchResp = await client.searchComponentFuzzy({
            type: "SKU",
            offset: 0,
            limit: 30,
            text: search,
            filter: {
                isActive: true,
                statusIn: SkuStatusList.filter(status => ![SkuStatus.OUT_OF_STOCK, SkuStatus.SUSPENDED].includes(status)),
                isCombo: false,
                sellerType: "INTERNAL"
            }
        });
        if (searchResp.status === "OK") {
            const newList = searchResp.data?.map(({ product, skuItem }) => ({
                value: skuItem.sku,
                code: skuItem.sku,
                label: `${skuItem.productID} - ${product.name} (${skuItem.sku})`
            }))
            const _newList = [...new Map(newList.map(item => [item["value"], item])).values()]

            if (search === "") setDefaultOptions(_newList)
            return _newList
        }
        return []
    }

    const handleRemoveGift = (indexValue) => {
        let newList = [...listGifts]?.filter((_, index) => index !== indexValue)
        setListGifts(newList)
    }

    const handleChangeGift = (index, value) => {
        let newList = [...listGifts]
        newList[index] = value
        setListGifts(newList)

    }

    const handleAddGift = (index) => {
        let newList = [...listGifts]
        newList.splice(index + 1, 0, {
            ...defaultData,
            code: uuidv4()
        })
        setListGifts(newList)
    }

    const handleChangeRewardType = (e) => {
        setRewardType(e.target?.value)
        setListGifts([{
            ...defaultData,
            code: uuidv4()
        }])
        setValue("absoluteDiscount", 0)
        setValue("percentageDiscount", 0)
        setValue("maxDiscount", 0)
    }

    useEffect(() => {
        switch (promotionType) {
            case defaultPromotionRewardType.GIFT:
                setRewardOpts(rewards.filter(item => item.value === promotionType))
                if (!firstRender || promotionType !== promotionRes?.promotionType) {
                    setValue("rewardType", promotionType)
                    setRewardType(promotionType)
                }
                break;
            case defaultPromotionRewardType.DISCOUNT:
                setRewardOpts([{ value: "ALL", label: "Tất cả" }, ...rewards.filter(item => item.value !== defaultPromotionRewardType.GIFT)])
                if (!firstRender || promotionType !== promotionRes?.promotionType) {
                    setValue("rewardType", defaultReward.all)
                    setRewardType(defaultReward.all)
                }
                break;

            default:
                setRewardOpts([{ value: "ALL", label: "Tất cả" }, ...rewards])
                if (!firstRender || promotionType !== promotionRes?.promotionType) {
                    setValue("rewardType", defaultReward.all)
                    setRewardType(defaultReward.all)
                }
                break;
        }

        if (isEdit && !(listGifts?.length > 0 && promotionType === defaultPromotionRewardType.GIFT))
            setListGifts([{
                ...defaultData,
                code: uuidv4()
            }])


    }, [promotionType])

    useEffect(() => {
        getListGift()
    }, [])

    useEffect(() => {
        setRewardType(getValues("rewardType"))
    }, [getValues("rewardType")])

    return (
        <MyCard>
            <FormGroup style={{ width: "100%" }}>
                <MyCardHeader
                    small={true}
                    title="CÀI ĐẶT KHUYẾN MÃI"
                ></MyCardHeader>
                <MyCardContent>

                    <Grid spacing={2} container>

                        <Grid item md={4} xs={12}>
                            <Typography>
                                Loại khuyến mãi <span style={{ color: "red" }}>*</span>
                            </Typography>

                            <Controller
                                control={control}
                                name="rewardType"
                                render={({ onChange, ...props }) => (
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        SelectProps={{
                                            readOnly: promotionType === "ALL" || promotionType === "GIFT"
                                        }}
                                        error={!!errors.rewardType}
                                        helperText={errors.rewardType?.message}
                                        fullWidth
                                        select
                                        onChange={(e) => {
                                            onChange(e.target?.value)
                                            handleChangeRewardType(e)
                                        }}
                                        {...props}
                                    >
                                        {Object.values(rewardOpts).map((item) => (
                                            <MenuItem key={item.value}
                                                value={item.value}>{item.label}</MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />

                            <FormHelperText>{promotionType === "ALL" && "Vui lòng chọn loại chương trình hoặc chọn loại khuyến mãi tại màn hình Tạo mã khuyến mãi (sau khi tạo chương trình)"}</FormHelperText>
                        </Grid>

                        {
                            promotionType !== "ALL" && (
                                <React.Fragment>
                                    {(rewardType === defaultReward.absolute_on_product || rewardType === defaultReward.percentage_on_product) && (
                                        <Grid item md={4} xs={12}>

                                            <Typography>
                                                Sản phẩm khuyến mãi <span style={{ color: "red" }}>*</span>
                                            </Typography>

                                            <MuiSingleAuto
                                                name="gift"
                                                fullWidth
                                                // disabled={disabled}
                                                style={{ background: "white" }}
                                                placeholder="Nhập tên sản phẩm"
                                                options={defaultOptions}
                                                control={control}
                                                errors={errors}
                                                required
                                                onFieldChange={getListGift}
                                                message={"Vui lòng chọn sản phẩm khuyến mãi"}
                                            />
                                        </Grid>
                                    )}

                                    {
                                        (rewardType === defaultReward.absolute || rewardType === defaultReward.absolute_on_product) && (

                                            <Grid item md={4} xs={12}>
                                                <Typography>
                                                    Giá trị giảm giá <span style={{ color: "red" }}>*</span>
                                                </Typography>

                                                <NumberFormatCustom
                                                    control={control}
                                                    name="absoluteDiscount"
                                                    validate={{
                                                        required: "Vui lòng nhập giá trị giảm",
                                                        validate: (value) => {
                                                            let newValue = Number(value)
                                                            if (newValue === 0) return "Giá trị nhập tối thiểu là 1,000"
                                                            if (isNaN(value) && value != null && value !== "") {
                                                                let data = value?.replace("đ", "")
                                                                data = data.replace(new RegExp(",", "g"), "")
                                                                newValue = Number(data)
                                                            }

                                                            if (newValue % 1 !== 0) return "Giá trị nhập phải là số nguyên"
                                                            else if (newValue < 1000) return "Giá trị nhập tối thiểu là 1,000"
                                                            else if (newValue > 1000000000) return "Giá trị nhập phải nhỏ hơn hoặc bằng 1,000,000,000"
                                                            else if (value != null && value !== "" && newValue === 0) return "Giá trị nhập phải lớn hơn 0"
                                                        },
                                                    }}
                                                    errors={errors}
                                                    onValueChange={(v) => {
                                                        setValue("absoluteDiscount", v.floatValue ?? 0)
                                                    }}
                                                />
                                            </Grid>
                                        )
                                    }

                                    {(rewardType === defaultReward.percentage || rewardType === defaultReward.percentage_on_product) && (
                                        <>
                                            {rewardType === defaultReward.percentage && (
                                                <Grid item md={4} />
                                            )}

                                            <Grid item md={4} />
                                            <Grid item md={4} xs={12}>
                                                <Typography>
                                                    Mức giảm giá <span style={{ color: "red" }}>*</span>
                                                </Typography>
                                                <TextField
                                                    type="number"
                                                    name="percentageDiscount"
                                                    placeholder="Nhập % giảm giá"
                                                    defaultValue=""
                                                    helperText={errors.percentageDiscount?.message}
                                                    // disabled={disabled}
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    error={!!errors.percentageDiscount}
                                                    required
                                                    inputRef={register({
                                                        required: "Mức giảm giá không được trống",
                                                        max: {
                                                            value: 100,
                                                            message: "Phần trăm giảm giá phải nhỏ hơn hoặc bằng 100",
                                                        },
                                                        min: {
                                                            value: 1,
                                                            message: "Phần trăm giảm giá tối thiểu là 1"
                                                        }
                                                    })}
                                                    onKeyDown={(e) => ['e', 'E', '+', '-', '.', ','].includes(e.key) && e.preventDefault()}

                                                />
                                            </Grid>

                                            <Grid item md={4} xs={12}>
                                                <Typography>
                                                    Giá trị giảm giá tối đa <span style={{ color: "red" }}>*</span>
                                                </Typography>

                                                <NumberFormatCustom
                                                    control={control}
                                                    name="maxDiscount"
                                                    validate={{
                                                        required: "Vui lòng nhập giá trị giảm tối đa",
                                                        validate: (value) => {
                                                            let newValue = Number(value)
                                                            if (newValue === 0) return "Giá trị nhập tối thiểu là 1,000"
                                                            if (isNaN(value) && value != null && value !== "") {
                                                                let data = value?.replace("đ", "")
                                                                data = data.replace(new RegExp(",", "g"), "")
                                                                newValue = Number(data)
                                                            }

                                                            if (newValue % 1 !== 0) return "Giá trị nhập phải là số nguyên"
                                                            else if (newValue < 1000) return "Giá trị nhập tối thiểu là 1,000"
                                                            else if (newValue > 1000000000) return "Giá trị nhập phải nhỏ hơn hoặc bằng 1,000,000,000"
                                                            else if (value != null && value !== "" && newValue === 0) return "Giá trị nhập phải lớn hơn 0"
                                                        },
                                                    }}
                                                    errors={errors}
                                                    onValueChange={(v) => {
                                                        setValue("maxDiscount", v.floatValue ?? 0)
                                                    }}
                                                />
                                            </Grid>

                                        </>
                                    )}

                                    {rewardType === defaultReward.point && (
                                        <Grid item xs={4}>
                                            <Typography>
                                                Số điểm tặng <span style={{ color: "red" }}>*</span>
                                            </Typography>
                                            <TextField
                                                type="number"
                                                name={"pointValue"}
                                                placeholder="Nhập số điểm tặng"
                                                defaultValue=""
                                                helperText={errors.pointValue?.message}
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                error={!!errors.pointValue}
                                                required
                                                inputRef={register({
                                                    required: "Vui lòng nhập số điểm tặng",
                                                    min: {
                                                        value: 1,
                                                        message: "Số điểm tặng tối thiếu 1",
                                                    },
                                                    maxLength: {
                                                        value: 10,
                                                        message: "Giá trị nhập không quá 10 ký tự",
                                                    },
                                                })}
                                            />
                                        </Grid>
                                    )}


                                    {rewardType === defaultReward.gift && (
                                        <>
                                            {listGifts?.length && listGifts.map((item, index) =>
                                            (<GiftSlot
                                                key={item.code}
                                                disabled={disabled}
                                                listGifts={listGifts}
                                                item={item}
                                                index={index}
                                                handleAddGift={handleAddGift}
                                                handleRemoveGift={handleRemoveGift}
                                                handleChangeGift={handleChangeGift}
                                                defaultOptions={defaultOptions}
                                                isSubmitting={isSubmitting}
                                                hookForm={useForm}
                                            />)
                                            )}

                                        </>

                                    )}

                                </React.Fragment>
                            )
                        }


                    </Grid>


                </MyCardContent>
            </FormGroup>
        </MyCard>
    );
};

export default PromotionReward;
