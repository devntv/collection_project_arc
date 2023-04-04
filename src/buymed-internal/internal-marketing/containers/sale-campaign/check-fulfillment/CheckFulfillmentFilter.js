import { Button, Grid, IconButton, InputAdornment, makeStyles, TextField, Typography } from '@material-ui/core';
import { MyCardActions } from '@thuocsi/nextjs-components/my-card/my-card';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import MuiSingleAuto from "@thuocsi/nextjs-components/muiauto/single";
import { getSaleCampaignClient } from 'client/saleCampaign';
import { Close } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: "bold",
    },
    textField: {
        background: theme.palette.background.paper,
    },
    adornment: {
        position: "absolute",
        right: "40px"
    }
}))

const defaultFormValues = {
    campaignCode: null,
    status: null,
    createdTimeFrom: null,
    createdTimeTo: null,
};

const statusList = [
    { label: "Hoàn tất", value: "DONE" },
    { label: "Đang tiến hành", value: "IN_PROGRESS" }
]

export const CheckFulfillmentFilter = (props) => {
    const styles = useStyles();
    const router = useRouter();

    const q = JSON.parse(router.query.q ?? "{}")

    const filterForm = useForm({
        defaultValues: {
            ...defaultFormValues,
            ...q,
        },
        mode: "onChange"
    });

    const applyFilter = async (formData) => {

        formData.status = formData.status?.value ?? null;
        formData.campaignCode = formData.campaignCode?.value ?? null

        for (let key in formData) {
            if (formData[key] === null || formData[key] === undefined || formData[key]?.length === 0) {
                delete formData[key]
            }
        }

        props.onFilterChange && props.onFilterChange(formData)
    }

    const handleReset = () => {
        router?.push({
            pathname: "/marketing/check-product-fulfillment",
            query: {
                q: JSON.stringify({}),
            }
        });
    }

    const searchSaleCampaign = async (text = "") => {
        const resp = await getSaleCampaignClient().getListSaleCampaign(0, 10, { campaignName: text.trim() })
        if (resp.status === "OK") {
            const tmpData = resp.data?.map(item => ({
                label: item?.campaignName || "",
                value: item?.campaignCode || ""
            }))
            return tmpData
        }
        return []

    }

    const getSaleCampaign = async (campaignCode) => {
        const resp = await getSaleCampaignClient().getSaleCampaign({ campaignCode })
        if (resp.status === "OK" && resp.data) {
            filterForm.setValue("campaignCode", {
                label: resp.data?.[0]?.campaignName || "",
                value: resp.data?.[0]?.campaignCode || ""
            })
        }
    }

    useEffect(() => {
        if (Object.keys(q).length === 0) {
            filterForm.setValue("campaignCode", null)
            filterForm.setValue("status", null);
            filterForm.setValue("createdTimeFrom", null);
            filterForm.setValue("createdTimeTo", null);
        }
        if (!!props.filterData?.campaignCode) getSaleCampaign(props.filterData.campaignCode)
    }, [props.filterData])

    return (
        <form onKeyPress={(e) => {
            if (e.key === "Enter") filterForm.handleSubmit(applyFilter)(e)
        }}>
            <MyCardActions>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            Chương trình khuyến mãi
                        </Typography>
                        <MuiSingleAuto
                            fullWidth
                            style={{ background: "white" }}
                            name="campaignCode"
                            placeholder="Chọn CTKM"
                            options={props.saleCampaignOpts ?? []}
                            control={filterForm.control}
                            errors={filterForm.errors}
                            onFieldChange={searchSaleCampaign}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Typography className={styles.title} color="textPrimary" gutterBottom>
                            Trạng thái
                        </Typography>
                        <MuiSingleAuto
                            name="status"
                            control={filterForm.control}
                            errors={filterForm.errors}
                            options={statusList}
                            placeholder="Chọn trạng thái"
                            style={{ background: "white" }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            Thời gian chạy
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6} sm={6} md={6}>
                                <TextField
                                    name="createdTimeFrom"
                                    className={styles.textField}
                                    inputRef={filterForm.register()}
                                    variant="outlined"
                                    size="small"
                                    type="datetime-local"
                                    fullWidth
                                    inputProps={{ max: filterForm.watch("createdTimeTo") }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" className={styles.adornment}>
                                                {filterForm.getValues("createdTimeFrom") && (
                                                    <IconButton size="small" onClick={() => filterForm.setValue("createdTimeFrom", null)}>
                                                        <Close color='action' fontSize='small' />
                                                    </IconButton>
                                                )}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                                <TextField
                                    name="createdTimeTo"
                                    className={styles.textField}
                                    inputRef={filterForm.register()}
                                    variant="outlined"
                                    size="small"
                                    type="datetime-local"
                                    fullWidth
                                    inputProps={{ min: filterForm.watch("createdTimeFrom") }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" className={styles.adornment}>
                                                {filterForm.getValues("createdTimeTo") && (
                                                    <IconButton size="small" onClick={() => filterForm.setValue("createdTimeTo", null)}>
                                                        <Close color='action' fontSize='small' />
                                                    </IconButton>
                                                )}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container justifyContent="flex-end" spacing={1}>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="default"
                                    disabled={filterForm.formState.isSubmitting}
                                    onClick={handleReset}
                                >
                                    Làm mới
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={filterForm.formState.isSubmitting}
                                    onClick={filterForm.handleSubmit(applyFilter)}
                                >
                                    Áp dụng
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </MyCardActions>
        </form>
    )
}