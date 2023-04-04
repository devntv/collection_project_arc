import React from "react";
import { Grid, Typography, FormGroup, TextField } from "@material-ui/core";
import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import MuiMultipleAuto from "@thuocsi/nextjs-components/muiauto/multiple";
import { customerScopeOpts } from "view-model/customer";

export const textfieldProps = {
    InputLabelProps: {
        shrink: true,
        style: {
            color: "#353434",
            fontSize: "20px",
        },
    },
};

export function handleScope(data, levelOpts, areaOpts) {
    if (data.scopes) {
        let codes = []
        data.scopes?.forEach(item => {
            codes.push(item.type)
            switch (item.type) {
                case "CUSTOMER_LEVEL":
                    //Customer level
                    if (item.quantityType == "ALL") {
                        data.customerLevelCodes = [{ value: "all", label: "Tất cả" }]
                    } else {
                        let arr = [];

                        levelOpts.forEach(level => {
                            if (item.customerLevelCodes.includes(level.value)) {
                                arr.push(level)
                            }
                        })

                        data.customerLevelCodes = arr
                    }
                    break;

                case "AREA":
                    //Area
                    if (item.quantityType == "ALL") {
                        data.areaCodes = [{ value: "all", label: "Tất cả" }]
                    } else {
                        let arr = [];

                        areaOpts.forEach(area => {
                            if (item.areaCodes?.includes(area.value)) {
                                arr.push(area)
                            }
                        })

                        data.areaCodes = arr
                    }
                    break;
                case "CUSTOMER_SCOPE":
                    //Area
                    if (item.quantityType == "ALL") {
                        data.customerScopes = [{ value: "all", label: "Tất cả" }]
                    } else {
                        let arr = [];

                        customerScopeOpts.forEach(area => {
                            if (item.customerScopes?.includes(area.value)) {
                                arr.push(area)
                            }
                        })

                        data.customerScopes = arr
                    }
                    break;

                default:
                    break;
            }
        })

        if (!codes.includes("CUSTOMER_SCOPE")) data.customerScopes = [{ value: "all", label: "Tất cả" }]
    }
    return data
}

const PromotionScope = (props) => {
    const { useForm, disabled, levelOpts, areaOpts } = props;

    const { errors, getValues, watch, register, control, setValue } = useForm;

    const checkSelectedAll = (name, selected) => {
        if (selected.length > 1 && selected.find((item, index) => item.value === "all" && index === 0)) {
            setValue(name, selected.filter(item => item.value !== "all"))
        } else if (selected.find((item, index) => item.value === "all" && index !== 0)) {
            setValue(name, [{ value: "all", label: "Tất cả" }])
        } else if (selected.length === 0) {
            setValue(name, [{ value: "all", label: "Tất cả" }])
        }
        else setValue(name, selected)
    }

    return (
        <MyCard style={{ height: "calc(100% - 20px)" }}>
            <FormGroup style={{ width: "100%" }}>
                <MyCardHeader
                    small={true}
                    title="CÀI ĐẶT KHÁCH HÀNG"
                ></MyCardHeader>
                <MyCardContent>
                    <Grid spacing={2} container>
                        <Grid item xs={12} md={6} >
                            <Typography>
                                Cấp bậc khách hàng <span style={{ color: "red" }}>*</span>
                            </Typography>
                            <MuiMultipleAuto
                                options={[{ value: "all", label: "Tất cả" }, ...levelOpts]}
                                name="customerLevelCodes"
                                placeholder="Chọn"
                                control={control}
                                register={register}
                                errors={errors}
                                message="Vui lòng chọn"
                                onValueChange={(selected) => {
                                    checkSelectedAll("customerLevelCodes", selected)
                                }}
                            // disabled={disabled}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography>
                                Vai trò khách hàng <span style={{ color: "red" }}>*</span>
                            </Typography>
                            <MuiMultipleAuto
                                options={[{ value: "all", label: "Tất cả" }, ...customerScopeOpts]}
                                name="customerScopes"
                                placeholder="Chọn"
                                control={control}
                                register={register}
                                errors={errors}
                                message="Vui lòng chọn"
                                onValueChange={(selected) => {
                                    checkSelectedAll("customerScopes", selected)
                                }}
                            // disabled={disabled}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography>
                                Khu vực áp dụng <span style={{ color: "red" }}>*</span>
                            </Typography>
                            <MuiMultipleAuto
                                options={[{ value: "all", label: "Tất cả" }, ...areaOpts]}
                                name="areaCodes"
                                placeholder="Chọn"
                                control={control}
                                register={register}
                                errors={errors}
                                message="Vui lòng chọn"
                                onValueChange={(selected) => {
                                    checkSelectedAll("areaCodes", selected)
                                }}
                            // disabled={disabled}
                            />
                        </Grid>

                    </Grid>
                </MyCardContent>
            </FormGroup>
        </MyCard>

    );
};

export default PromotionScope;
