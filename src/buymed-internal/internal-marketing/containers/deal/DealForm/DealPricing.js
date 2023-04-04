import { useController, useFormContext } from "react-hook-form";
import {
    MyCard,
    MyCardContent,
    MyCardHeader,
} from "@thuocsi/nextjs-components/my-card/my-card";
import { Grid, MenuItem, TextField } from "@material-ui/core";
import { DealType, DealValidation, PricingType, PricingTypeOptions } from "view-model/deal";

function DealPricing(props) {

    const dealForm = useFormContext();
    const { field: pricingTypeField } = useController({
        control: dealForm.control,
        name: "pricingType",
        defaultValue: props.deal?.pricingType ?? PricingType.ABSOLUTE,
    });
    const { dealType, pricingType } = dealForm.watch(["dealType", "pricingType"]);

    const PricingTypeLabel = {
        [PricingType.ABSOLUTE]: "Giảm giá tuyệt đối",
        [PricingType.PERCENTAGE]: "Giảm giá theo %",
    }

    return (
        <MyCard>
            <MyCardHeader title="Cài đặt giá" small />
            <MyCardContent>
                <Grid container spacing={3}>
                    <Grid container spacing={3} item>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="maxQuantity"
                                variant="outlined"
                                size="small"
                                label="Số lượng bán ra"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                type="number"
                                inputProps={{
                                    min: 0,
                                }}
                                error={!!dealForm.errors.maxQuantity}
                                helperText={dealForm.errors.maxQuantity?.message}
                                inputRef={dealForm.register(DealValidation.maxQuantity)}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="pricingType"
                            variant="outlined"
                            size="small"
                            label="Loại giảm giá"
                            type="number"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            select
                            required
                            {...pricingTypeField}
                        >
                            {PricingTypeOptions.map(({ label, value }) => (
                                <MenuItem
                                    key={value}
                                    value={value}
                                    disabled={dealType === DealType.COMBO && value === PricingType.PERCENTAGE}
                                >
                                    {PricingTypeLabel[value]}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    {(pricingType === PricingType.ABSOLUTE) && (
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="price"
                                variant="outlined"
                                size="small"
                                label="Giá"
                                type="number"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    min: 1,
                                }}
                                required
                                error={!!dealForm.errors.price}
                                helperText={
                                    dealForm.errors.price?.message ??
                                    "Giá bán ra hiển thị trên website"
                                }
                                inputRef={dealForm.register(DealValidation.price)}
                            />
                        </Grid>
                    )}
                    {(pricingType === PricingType.PERCENTAGE) && (
                        <>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="discountPercent"
                                    variant="outlined"
                                    size="small"
                                    label="Phần trăm giảm giá"
                                    type="number"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        min: 0,
                                    }}
                                    required
                                    error={!!dealForm.errors.discountPercent}
                                    helperText={dealForm.errors.discountPercent?.message}
                                    inputRef={dealForm.register(DealValidation.discountPercent)}
                                />
                            </Grid>
                            <Grid item xs={6}> 
                                <TextField
                                    name="maxDiscountValue"
                                    variant="outlined"
                                    size="small"
                                    required
                                    label="Giảm giá tối đa"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    type="number"
                                    inputProps={{
                                        min: 1,
                                    }}
                                    error={!!dealForm.errors.maxDiscountValue}
                                    helperText={dealForm.errors.maxDiscountValue?.message ?? "Nhập = 0 là không giới hạn"}
                                    inputRef={dealForm.register(DealValidation.maxDiscountValue)}
                                />
                            </Grid>
                        </>
                    )}
                </Grid>
            </MyCardContent>
        </MyCard>
    );
}

export default DealPricing;
