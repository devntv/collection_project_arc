import React from "react";
import {
    Grid,
    TextField,
    FormGroup,
    Typography,
    FormHelperText,
    MenuItem,
} from "@material-ui/core";
import {
    MyCard,
    MyCardContent,
    MyCardHeader,
} from "@thuocsi/nextjs-components/my-card/my-card";
import { Controller } from "react-hook-form";
import { promotions, promotionTypes } from "components/component/constant";
import { promotionRewardTypes } from "../constant";

export const textfieldProps = {
    InputLabelProps: {
        shrink: true,
        style: {
            color: "#353434",
            fontSize: "20px",
        },
    },
};

const PromotionInfo = (props) => {

    const { useForm, disabled, isEdit, handleResetCondition, setPromotionType, handleChangePromotionType } = props;

    const { errors, register, getValues, setValue, control, formState: { isSubmitted } } = useForm;

    return (
        <MyCard>
            <FormGroup style={{ width: "100%" }}>
                <MyCardHeader
                    small={true}
                    title="THÔNG TIN CHƯƠNG TRÌNH"
                ></MyCardHeader>
                <MyCardContent>

                    <Grid container item sm={12} spacing={4} style={{
                        justifyContent: "space-between",
                        alignItems: "flex-start"
                    }}>

                        <Grid container item md={6} xs={12} spacing={2}>
                            <Grid item xs={12}>
                                <Typography>
                                    Tên chương trình <span style={{ color: "red" }}>*</span>
                                </Typography>
                                <TextField
                                    name="promotionName"
                                    placeholder="Nhập tên chương trình"
                                    size="small"
                                    variant="outlined"
                                    defaultValue=""
                                    helperText={errors.promotionName?.message}
                                    {...textfieldProps}
                                    InputProps={{
                                        // readOnly: disabled,
                                    }}
                                    fullWidth
                                    error={!!errors.promotionName}
                                    required
                                    inputRef={register({
                                        validate: (value) => {
                                            if (value.trim().length == 0) {
                                                setValue("promotionName", value.trim());
                                                return "Tên khuyến mãi không được để trống";
                                            }
                                        },
                                        required: "Tên khuyến mãi không được để trống",
                                        maxLength: {
                                            value: 250,
                                            message: "Tên khuyến mãi không được vượt quá 250 kí tự",
                                        },
                                        minLength: {
                                            value: 6,
                                            message: "Tên khuyến mãi phải có độ dài lớn hơn 6 kí tự",
                                        },
                                        pattern: {
                                            value: /^(?!.*[ ]{2})/,
                                            message: "Tên không hợp lệ (không được dư khoảng trắng)."
                                        },
                                    })}
                                />
                            </Grid>


                            <Grid item xs={12}>
                                <Typography>
                                    Nội dung khuyến mãi <span style={{ color: 'red' }}> *</span>
                                </Typography>

                                <TextField
                                    name="description"
                                    size="small"
                                    // multiline
                                    // rows={4}
                                    placeholder="Nhập nội dung khuyến mãi"
                                    defaultValue=""
                                    variant="outlined"
                                    helperText={errors.description?.message}
                                    fullWidth
                                    error={!!errors.description}
                                    inputRef={register({
                                        validate: (value) => {
                                            if (value.trim().length == 0) {
                                                setValue("description", value.trim());
                                                return "Nội dung khuyến mãi không được để trống";
                                            }
                                        },
                                        required: "Nội dung khuyến mãi không được để trống",
                                        maxLength: {
                                            value: 250,
                                            message: "Nội dung khuyến mãi không được vượt quá 250 kí tự",
                                        },
                                    })}
                                />
                                <Typography>
                                    <span style={{ fontStyle: "italic", fontSize: 12 }}>
                                        Nội dung khuyến mãi đang được dùng để hiển thị như tên chương trình trên website và app
                                    </span>
                                </Typography>
                            </Grid>


                            {/* <Grid item md={6} xs={12}>
                                <Typography>
                                    Hình thức áp dụng <span style={{ color: "red" }}>*</span>
                                </Typography>

                                <Controller
                                    control={control}
                                    name="promotionType"
                                    as={
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            SelectProps={{
                                                // readOnly: disabled
                                            }}
                                            error={!!errors.promotionType}
                                            helperText={errors.promotionType?.message}
                                            fullWidth
                                            select
                                        >
                                            {Object.values(promotionTypes).map((item) => (
                                                <MenuItem key={item.value}
                                                    value={item.value}>{item.label}</MenuItem>
                                            ))}
                                        </TextField>
                                    }
                                />

                            </Grid> */}
                        </Grid>


                        <Grid container item md={6} xs={12} spacing={2}>

                            <Grid item md={12} xs={12}>
                                <Typography>
                                    Loại chương trình <span style={{ color: "red" }}>*</span>
                                </Typography>

                                <Controller
                                    control={control}
                                    name="promotionType"
                                    render={({ onChange, ...props }) => (
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            SelectProps={{
                                                // readOnly: isEdit
                                            }}
                                            error={!!errors.promotionType}
                                            helperText={errors.promotionType?.message}
                                            fullWidth
                                            select
                                            onChange={(e) => {
                                                onChange(e.target?.value)
                                                setPromotionType(e.target?.value)
                                                handleChangePromotionType(e.target?.value)
                                            }}
                                            {...props}
                                        >
                                            {Object.values([{ label: "Tất cả", value: "ALL" }, ...promotionRewardTypes]).map((item) => (
                                                <MenuItem key={item.value}
                                                    value={item.value}>{item.label}</MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />
                                <Typography>
                                    <span style={{ fontStyle: "italic", fontSize: 12, color: `${getValues("promotionType") === "ALL" ? "black" : "white"}` }}>
                                        {"Vui lòng chọn loại chương trình hoặc chọn loại khuyến mãi tại màn hình Tạo mã khuyến mãi (sau khi tạo chương trình)"}
                                    </span>
                                </Typography>
                            </Grid>


                        </Grid>
                    </Grid>
                </MyCardContent>
            </FormGroup>
        </MyCard>
    );
};

export default PromotionInfo;
