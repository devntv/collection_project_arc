import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Button, Grid, makeStyles, MenuItem, TextField, Typography, InputAdornment, IconButton } from '@material-ui/core'
import { MyCardActions } from '@thuocsi/nextjs-components/my-card/my-card';
import MuiSingleAuto from "@thuocsi/nextjs-components/muiauto/single";
import { useRouter } from 'next/router';
import { getAccountClient } from 'client/account';
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

const defaultValues = {
    createdBy: null,
    createdTimeFrom: null,
    createdTimeTo: null,
    status: null,
    code: "",
    campaignCode: null
};

const statusList = [
    { label: "Đã hoàn thành", value: "DONE" },
    { label: "Đang xử lý", value: "IN_PROGRESS" }
]

export const ImportResultFilter = (props) => {
    const styles = useStyles();
    const router = useRouter();

    const q = JSON.parse(router.query.q ?? "{}")

    const { register, reset, setValue, handleSubmit, control, errors, watch, getValues } = useForm({
        defaultValues: {
            ...defaultValues,
            ...q,
            status: statusList.filter(item => item.value === props.filterData?.status || "")[0] ?? {}
        },
        mode: "onChange"
    })

    const applyFilter = async (formData) => {

        formData.createdBy = formData.createdBy?.value ?? null;
        formData.status = formData.status?.value ?? null;
        formData.campaignCode = formData.campaignCode?.value ?? null

        for (let key in formData) {
            if (!formData[key] || formData[key]?.length === 0) {
                delete formData[key]
            }
        }
        props.onFilterChange && props.onFilterChange(formData)
    }

    const handleReset = () => {
        router.push({
            pathname: "/marketing/import-result-sale-campaign",
            query: {
                q: JSON.stringify({}),
            }
        });
    }

    const searchEmployee = async (text = "") => {
        const resp = await getAccountClient().clientGetListEmployee(0, 20, text)
        if (resp.status === "OK") {
            const tmpData = resp.data?.map(item => ({
                label: item?.username || "",
                value: item?.accountId || 0
            }))
            return tmpData
        }
        return []

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

    const getAccount = async (accountId) => {
        const res = await getAccountClient().getAccountByIds([accountId])
        if (res.status === "OK" && res.data) {
            setValue("createdBy", {
                label: res.data[0]?.username ?? "",
                value: res.data[0]?.accountId
            })
        }
    }

    const getSaleCampaign = async (campaignCode) => {
        const resp = await getSaleCampaignClient().getSaleCampaign({ campaignCode })
        if (resp.status === "OK" && resp.data) {
            setValue("campaignCode", {
                label: resp.data?.[0]?.campaignName || "",
                value: resp.data?.[0]?.campaignCode || ""
            })
        }
    }

    useEffect(() => {
        if (Object.keys(props.filterData).length === 0) {
            setValue("createdBy", null);
            setValue("createdTimeFrom", null);
            setValue("createdTimeTo", null);
            setValue("status", null);
            setValue("code", ""),
            setValue("campaignCode", null)
        }

        if (!!props.filterData?.createdBy) getAccount(props.filterData?.createdBy || 0)
        if (!!props.filterData?.campaignCode) getSaleCampaign(props.filterData.campaignCode)

    }, [props.filterData])

    return (
        <Box style={{
            display: props.open ? "block" : "none"
        }}>
            <form onKeyPress={(e) => {
                if (e.key === "Enter") handleSubmit(applyFilter)(e)
            }}>
                <MyCardActions>
                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                className={styles.title}
                                color="textPrimary"
                                gutterBottom
                            >
                                Mã import
                            </Typography>
                            <TextField
                                className={styles.textField}
                                id="code"
                                name="code"
                                variant="outlined"
                                size="small"
                                placeholder="Nhập mã import"
                                fullWidth
                                inputRef={register()}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
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
                                control={control}
                                errors={errors}
                                onFieldChange={searchSaleCampaign}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                className={styles.title}
                                color="textPrimary"
                                gutterBottom
                            >
                                Người tạo
                            </Typography>
                            <MuiSingleAuto
                                fullWidth
                                style={{ background: "white" }}
                                name="createdBy"
                                placeholder="Chọn người tạo"
                                options={props.employeeOpts ?? []}
                                control={control}
                                errors={errors}
                                onFieldChange={searchEmployee}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                className={styles.title}
                                color="textPrimary"
                                gutterBottom
                            >
                                Trạng thái
                            </Typography>
                            <MuiSingleAuto
                                fullWidth
                                style={{ background: "white" }}
                                name="status"
                                placeholder="Tất cả trạng thái"
                                options={statusList}
                                control={control}
                                errors={errors}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>

                            <Typography
                                className={styles.title}
                                color="textPrimary"
                                gutterBottom
                            >
                                Ngày tạo
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6} sm={6} md={6}>
                                    <TextField
                                        name="createdTimeFrom"
                                        className={styles.textField}
                                        inputRef={register()}
                                        variant="outlined"
                                        size="small"
                                        type="date"
                                        fullWidth
                                        inputProps={{ max: watch("createdTimeTo") }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end" className={styles.adornment}>
                                                    {!!getValues("createdTimeFrom") && (
                                                        <IconButton size="small" onClick={() => setValue("createdTimeFrom", null)}>
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
                                        inputRef={register()}
                                        variant="outlined"
                                        size="small"
                                        type="date"
                                        fullWidth
                                        inputProps={{ min: watch("createdTimeFrom") }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end" className={styles.adornment}>
                                                    {!!getValues("createdTimeTo") && (
                                                        <IconButton size="small" onClick={() => setValue("createdTimeTo", null)}>
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


                        <Grid item container xs={12} justifyContent="flex-end" spacing={2}>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="default"
                                    // disabled={formState.isSubmitting}
                                    onClick={handleReset}
                                >
                                    Làm mới
                                </Button>
                            </Grid>

                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    // disabled={formState.isSubmitting}
                                    onClick={handleSubmit(applyFilter)}
                                >
                                    Áp dụng
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </MyCardActions>
            </form>
        </Box>
    )
}
