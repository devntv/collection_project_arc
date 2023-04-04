import React, { useEffect, useState } from "react";
import { Typography, Grid, TextField, FormGroup, MenuItem, FormHelperText } from "@material-ui/core";
import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import RichTextField from "@thuocsi/nextjs-components/editor/rich-text-field/index";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { formatNumber, gamificationType } from "components/global"
import { Controller } from "react-hook-form";
import TextEditorField from "components/TextEditor";

export const textfieldProps = {
    InputLabelProps: {
        shrink: false,
        style: {
            color: "#353434",
            fontSize: "20px",
        },
    },
};

const DetailGamification = (props) => {
    const { useForm, disabled, processing } = props;
    const { errors, register, setValue, getValues, control, formState: { isSubmitted } } = useForm;
    const [isError, setIsError] = useState(false)
    const [price, setPrice] = useState(getValues("target"))
    const [reward, setReward] = useState(getValues("reward"))

    useEffect(() => {
        setPrice(getValues("target"))
    }, [getValues("target")])

    useEffect(() => {
        let data = reward ?? ""
        data = data.replace(new RegExp('&nbsp;', 'g'), "")
        data = data.replace(new RegExp('<p><br></p>', 'g'), "")
        data = data.replace(new RegExp('\n', 'g'), "")

        if ((data === "<p></p>" || data === "") && isSubmitted) { 
            setIsError(true) 
        }
        else setIsError(false)

    }, [reward, isSubmitted])

    return (
        <MyCard>
            <FormGroup style={{ width: "100%" }}>
                <MyCardHeader
                    small={true}
                    title="Chi tiết chương trình"
                ></MyCardHeader>
                <MyCardContent>
                    <Grid container item xs={12} justify="space-between" spacing={2}>

                        <Grid item xs={6}>
                            <Typography>
                                Loại chương trình <span style={{ color: 'red' }}> *</span>
                            </Typography>

                            <Controller
                                control={control}
                                name="type"
                                as={
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        SelectProps={{
                                            readOnly: processing || disabled
                                        }}
                                        error={!!errors.type}
                                        helperText={errors.type?.message}
                                        fullWidth
                                        select
                                    >
                                        {Object.values(gamificationType).map((item) => (
                                            <MenuItem key={item.value}
                                                value={item.value}>{item.label}</MenuItem>
                                        ))}
                                    </TextField>
                                }
                            />
                        </Grid>


                        <Grid item xs={6}>
                            <Typography>
                                Ngày trả thưởng
                            </Typography>


                            <TextField
                                name="numberOfDayCalResult"
                                placeholder="Nhập ngày trả thưởng"
                                defaultValue=""
                                helperText={errors.numberOfDayCalResult?.message}
                                {...textfieldProps}
                                size="small"
                                InputProps={{
                                    readOnly: disabled,
                                }}
                                fullWidth
                                error={!!errors.numberOfDayCalResult}
                                // required
                                type="number"
                                variant="outlined"
                                inputRef={register({
                                    // required: "Doanh số yêu cầu không được để trống",
                                    validate: (value) => {

                                        if (value < 0) {
                                            return "Ngày trả thưởng phải lớn hơn hoặc bằng 0";
                                        }
                                        else if (value > 100000) {
                                            return "Ngày trả thưởng phải phải nhỏ hơn hoặc bằng 100,000";
                                        }
                                        else if (!Number.isInteger(Number(value))) {
                                            return "Ngày trả thưởng phải là số nguyên"
                                        }
                                    },

                                })}
                            />
                            <Typography>
                                <span style={{ fontStyle: "italic", fontSize: 14 }}>
                                    Thời gian trả thưởng = Từ ngày kết thúc + ngày trả thưởng
                                </span>
                            </Typography>

                        </Grid>

                        <Grid item xs={6}>
                            <Typography>
                                Doanh số yêu cầu <span style={{ color: 'red' }}> *</span>
                            </Typography>
                            <TextField
                                name="target"
                                placeholder="Nhập doanh số yêu cầu"
                                defaultValue=""
                                helperText={errors.target?.message}
                                {...textfieldProps}
                                size="small"
                                InputProps={{
                                    readOnly: disabled,
                                }}
                                fullWidth
                                error={!!errors.target}
                                required
                                type="number"
                                variant="outlined"
                                inputRef={register({
                                    required: "Doanh số yêu cầu không được để trống",
                                    validate: (value) => {
                                        if (value <= 0) {
                                            setValue("target", 0);
                                            return "Doanh số yêu cầu phải lớn hơn 0";
                                        }
                                        else if (!Number.isInteger(Number(value))) {
                                            return "Doanh số yêu cầu phải là số nguyên"
                                        }
                                    },
                                    max: {
                                        value: 100000000000,
                                        message: "Doanh số yêu cầu tối đa 100,000,000,000",
                                    }

                                })}
                                onChange={(e) => {
                                    if (e.target.value !== "") setPrice(+e.target.value)
                                }}
                            />
                            <FormHelperText style={{ marginLeft: "15px" }}>{price ? formatNumber(price) : ""}</FormHelperText>
                        </Grid>


                        <Grid item xs={6} />

                        <Grid item xs={6}>
                            <Typography>
                                Nội dung mô tả
                            </Typography>

                            <RichTextField
                                name="detailDescription"
                                getValue={getValues}
                                setValue={setValue}
                                disabled={processing || disabled}
                            />

                            <Typography>
                                <span style={{ fontStyle: "italic", fontSize: 14 }}>
                                    Số tiền doanh thu đạt mức 5,000,000 thì sẽ được giảm giá 200,000...
                                </span>
                            </Typography>
                        </Grid>


                        <Grid item xs={6}>
                            <Typography>
                                Phần thưởng <span style={{ color: 'red' }}> *</span>
                            </Typography>

                            {/* {disabled || processing ? (
                                <TextEditorField
                                    name="reward"
                                    getValue={getValues}
                                    setValue={setValue}
                                />
                            ) : ( */}
                            <RichTextField
                                name="reward"
                                getValue={getValues}
                                setValue={setValue}
                                error={isError}
                                onValueChange={(e) => {
                                    setReward(e)
                                }}
                            />
                            <FormHelperText error>
                                {isError ? "Vui lòng nhập phần thưởng" : ""}
                            </FormHelperText>
                            {/* )} */}

                        </Grid>

                    </Grid>


                </MyCardContent>
            </FormGroup>
        </MyCard >
    );
};

export default DetailGamification;
