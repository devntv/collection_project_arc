import { FormControl, Grid, MenuItem, TextField, Radio, RadioGroup, FormControlLabel, FormLabel } from "@material-ui/core";
import {
    MyCard,
    MyCardContent,
    MyCardHeader,
} from "@thuocsi/nextjs-components/my-card/my-card";
import { accentsTidy } from "components/global";
import React from "react";
import { Controller, useFormContext, useController } from "react-hook-form";

function DealFee({ isUpdate, deal }) {
    const dealForm = useFormContext();
    const chargeDealFeeOption = [
        {label: "Thuốc sỉ", value: "MARKETPLACE"},
        {label: "Nhà bán hàng", value: "SELLER"},
        {label: "Thuốc sỉ lên deal cùng nhà bán hàng", value: "SELLER_MARKETPLACE"}
    ]

    const { field: chargeDealFeeField } = useController({
        control: dealForm.control,
        name: "chargeDealFee",
        defaultValue: deal?.pricingType ??"MARKETPLACE",
    });

    return (
        // <React.Fragment>
        //     {
        //         skus[0]?.sellerCode === "MEDX" || skus[0]?.sellerCode === "MEDX-HN" || skus[0]?.sellerCode === "MARKERTING" || skus?.length === 0 ?
        //             <></>
        //             : 
        <MyCard>

            <MyCardHeader title="Thông tin bên chịu phí" small />
            <MyCardContent>
                <Grid container spacing={3}>

                    <Grid item xs={12}>

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
                            inputRef={dealForm.register()}
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


                </Grid>
            </MyCardContent>
        </MyCard>
        //     }
        // </React.Fragment>

    );
}

export default DealFee;
