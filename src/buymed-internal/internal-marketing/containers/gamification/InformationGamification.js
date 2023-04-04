import React from "react";
import { Typography, Grid, TextField, FormGroup } from "@material-ui/core";
import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import RichTextField from "@thuocsi/nextjs-components/editor/rich-text-field";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { useRouter } from "next/router";

export const textfieldProps = {
    InputLabelProps: {
        shrink: false,
        style: {
            color: "#353434",
            fontSize: "20px",
        },
    },
};

const InformationGamification = (props) => {
    const { isEdit, useForm, disabled, processing } = props;
    const { errors, register, setValue, getValues } = useForm;

    const router = useRouter()
    
    return (
        <MyCard>
            <FormGroup style={{ width: "100%" }}>
                <MyCardHeader
                    small={true}
                    title="THÔNG TIN CHƯƠNG TRÌNH"
                ></MyCardHeader>
                <MyCardContent>
                    <Grid container item xs={12} justify="space-between" spacing={4} alignItems="flex-start">

                        <Grid container item xs={6} spacing={2}>
                            {
                                isEdit && (
                                    <Grid item xs={12}>
                                        <Typography>
                                            Mã chương trình: &nbsp;<strong>{router.query?.code || ""}</strong>
                                        </Typography>
                                    </Grid>
                                )
                            }
                            <Grid container item xs>
                                <Grid item xs={12}>
                                    <Typography>
                                        Tên chương trình<span style={{ color: 'red' }}> *</span>
                                    </Typography>
                                    <TextField
                                        name="name"
                                        placeholder="Nhập tên chương trình"
                                        defaultValue=""
                                        helperText={errors.name?.message}
                                        {...textfieldProps}
                                        size="small"
                                        InputProps={{
                                            readOnly: processing || disabled,
                                        }}
                                        fullWidth
                                        error={!!errors.name}
                                        required
                                        variant="outlined"
                                        inputRef={register({
                                            validate: (value) => {
                                                if (value.trim().length == 0) {
                                                    setValue("name", value.trim());
                                                    return "Tên chương trình không được để trống";
                                                }
                                            },
                                            required: "Tên chương trình không được để trống",
                                            maxLength: {
                                                value: 250,
                                                message: "Tên chương trình không được vượt quá 250 kí tự",
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

                            </Grid>
                        </Grid>

                        <Grid container item xs={6} spacing={2}>
                            <Grid item xs={12}>
                                <Typography>
                                    Nội dung mô tả
                                </Typography>

                                <RichTextField
                                    name="description"
                                    getValue={getValues}
                                    setValue={setValue}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </MyCardContent>
            </FormGroup>
        </MyCard >
    );
};

export default InformationGamification;
