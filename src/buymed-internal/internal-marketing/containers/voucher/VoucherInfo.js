import { TextField, Typography, Grid, MenuItem, FormControlLabel, Switch, Tooltip } from '@material-ui/core'
import { MyCard, MyCardContent, MyCardHeader } from '@thuocsi/nextjs-components/my-card/my-card'
import { defaultPromotionRewardType, defaultPromotionStatus, defaultReward, promotionRewardTypes } from "components/promotion-voucher/constant";
import { getPromoClient } from 'client/promo'
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form';
import SelectPromotionModal from './SelectPromotionModal';
import MuiSingleAuto from 'components/MuiSingleCustom';
import { handleCondition } from './VoucherCondition';
import Loader from '@thuocsi/nextjs-components/loader/loader';

export async function searchPromotion(promotionName, limit = 10, offset = 0) {
    return getPromoClient().getPromotionFromClient(
        promotionName,
        limit,
        offset,
        false,
        [defaultPromotionStatus.ACTIVE, defaultPromotionStatus.WAITING]
    );
}

const validateUnicode = (value) => {
    let result = false;
    for (let i = 0; i < value.length; i++) {
        if (value.charCodeAt(i) > 127 && i > 0) {
            result = true;
        }
    }
    return result;
};


export default function VoucherInfo(props) {

    const {
        voucher,
        promotion,
        control,
        errors,
        setValue,
        getValues,
        register,
        isEdit,
        listPromotionDefault,
        handleResetPromotionData,
        setVoucherType,
        handleApplyPromotionData,
        handlePromotionScope,
        setPromotion,
        handleVoucherType
    } = props

    const [openModalSelect, setOpenModalSelect] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSearchPromotion = async (value) => {
        let listPromationResponse = await searchPromotion(value);
        if (listPromationResponse && listPromationResponse.status === "OK") {
            return listPromationResponse.data.map((item) => {
                return { ...item, label: item.promotionName, value: item.promotionId };
            });
        }
        return []
    };

    const handleChangePromotion = async (object) => {
        if (object?.value) {
            setIsLoading(true)
            let data = handlePromotionScope(object)
            if (data.promotionType === "VOUCHERCODE") {
                if (data.rewardType === defaultReward.gift) data.promotionType = defaultPromotionRewardType.GIFT
                else if (data.rewardType === defaultReward.absolute || data.rewardType === defaultReward.percentage) data.promotionType = defaultPromotionRewardType.DISCOUNT
                else {
                    data.promotionType = defaultPromotionRewardType.ALL
                }
            }
            data = await handleCondition(null, data)
            setValue("promotionId", data)
            setPromotion(data)
            handleApplyPromotionData(data)
            setIsLoading(false)
        } else {
            if (!isEdit) {
                handleResetPromotionData()
            }
            setPromotion({})
            setValue("promotionId", {})
        }
    };

    return (
        <MyCard>
            <MyCardHeader title="Thông tin chung" style={{
                textTransform: "uppercase"
            }} small />

            <MyCardContent>
                <Loader show={isLoading} />
                <Grid container spacing={2} direction="row">
                    <Grid item xs={12} sm={6}>
                        <Typography>
                            Mã khuyến mãi <span style={{ color: "red" }}>*</span>
                        </Typography>
                        <TextField
                            id="code"
                            name="code"
                            disabled={isEdit}
                            helperText={errors.code?.message}
                            InputProps={{
                                shrink: true,
                            }}
                            error={!!errors.code}
                            placeholder="Nhập mã khuyến mãi"
                            fullWidth
                            size="small"
                            variant="outlined"
                            required
                            onChange={(e) => {
                                let a = e.target.value.replace(/\s/g, "");
                                setValue("code", a.trim().toUpperCase());
                            }}
                            inputRef={register({
                                validate: {
                                    required: (val) => {
                                        if (validateUnicode(val)) {
                                            return "Mã khuyến mãi không được chứa kí tự có dấu";
                                        }
                                        return val.trim().length > 0;
                                    },
                                },
                                required: "Mã khuyến mãi không được để trống",
                            })}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography>
                            Chương trình khuyến mãi áp dụng
                        </Typography>
                        <div style={{ width: "100%" }} onClick={() => {
                            setOpenModalSelect(true)
                        }}>
                            <MuiSingleAuto
                                id="promotionId"
                                options={[]}
                                name="promotionId"
                                placeholder="Chọn chương trình khuyến mãi áp dụng"
                                control={control}
                                errors={errors}
                                message="Vui lòng chọn chương trình khuyến mãi áp dụng"
                                disableClearable={true}
                                disabled={true}
                                isReadOnly={true}
                            />
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography>
                            Tên mã khuyến mãi
                            <span style={{ color: "red" }}>*</span>
                        </Typography>
                        <TextField
                            id="displayName"
                            name="displayName"
                            helperText={errors.displayName?.message}
                            InputProps={{
                                shrink: true,
                            }}
                            error={!!errors.displayName}
                            placeholder="Nhập tên mã khuyến mãi"
                            fullWidth
                            size="small"
                            variant="outlined"
                            required
                            inputRef={register({
                                validate: (value) => {
                                    if (value.trim().length == 0) {
                                        setValue("displayName", value.trim());
                                        return "Tên mã khuyến mãi không được để trống";
                                    }
                                },
                                required: "Tên mã khuyến mãi không được để trống",
                                maxLength: {
                                    value: 250,
                                    message: "Tên mã khuyến mãi không được vượt quá 250 kí tự",
                                },
                                minLength: {
                                    value: 1,
                                    message: "Tên phải có độ dài lớn hơn 1 kí tự",
                                },
                                pattern: {
                                    value: /^(?!.*[ ]{2})/,
                                    message: "Tên không hợp lệ (không được dư khoảng trắng)."
                                },
                            })}
                        />
                    </Grid>


                    <Grid item md={6} xs={12}>
                        <Typography>
                            Loại mã giảm giá <span style={{ color: "red" }}>*</span>
                        </Typography>

                        <Controller
                            control={control}
                            name="voucherType"
                            render={({ onChange, ...props }) => (
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    InputProps={{
                                        shrink: true,
                                    }}
                                    SelectProps={{
                                        // readOnly: isEdit || (promotion.promotionType && promotion?.promotionType !== "ALL")
                                    }}
                                    error={!!errors.voucherType}
                                    helperText={errors.voucherType?.message}
                                    fullWidth
                                    select
                                    onChange={(e) => {
                                        onChange(e.target?.value)
                                        setVoucherType?.(e.target?.value)
                                        handleVoucherType(e.target?.value)
                                    }}
                                    {...props}
                                >
                                    {Object.values([...promotionRewardTypes]).map((item) => (
                                        <MenuItem key={item.value}
                                            value={item.value}>{item.label}</MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>

                </Grid>

                <SelectPromotionModal
                    open={openModalSelect}
                    onClose={() => setOpenModalSelect(false)}
                    handleChangePromotion={handleChangePromotion}
                    promotion={promotion}
                    listPromotionDefault={listPromotionDefault}
                    isEdit={isEdit}
                    voucher={voucher}
                />
            </MyCardContent>
        </MyCard>
    )
}
