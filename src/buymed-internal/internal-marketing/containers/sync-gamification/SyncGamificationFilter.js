import { Button, Grid, IconButton, InputAdornment, makeStyles, TextField, Typography } from '@material-ui/core';
import { MyCardActions } from '@thuocsi/nextjs-components/my-card/my-card';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import MuiSingleAuto from "@thuocsi/nextjs-components/muiauto/single";
import { syncGamificationStatus } from 'view-model/gamification';

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
    gamificationCode: "",
    status: null,
};

export const SyncGamificationFilter = (props) => {
    const styles = useStyles();
    const router = useRouter();

    const q = JSON.parse(props.router.query.q ?? "{}")

    const filterForm = useForm({
        defaultValues: {
            ...defaultFormValues,
            ...q,
        },
        mode: "onChange"
    });

    const applyFilter = async (formData) => {

        formData.status = Object.keys(formData?.status || {}).length ? formData?.status.value : null
        formData.gamificationCode = formData?.gamificationCode?.trim() || null

        for (let key in formData) {
            if (formData[key] === null || formData[key] === undefined || formData[key]?.length === 0) {
                delete formData[key]
            }
        }

        props.onFilterChange && props.onFilterChange(formData)
    }

    const handleReset = () => {
        router?.push({
            pathname: "/marketing/sync-gamification",
            query: {
                q: JSON.stringify({}),
            }
        });
    }

    useEffect(() => {
        if (Object.keys(q).length === 0) {
            filterForm.setValue("gamificationCode", "");
            filterForm.setValue("status", null);
        }
    }, [props.filterData])

    return (
        <form onKeyPress={(e) => {
            if (e.key === "Enter") filterForm.handleSubmit(applyFilter)(e)
        }}>
            <MyCardActions>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Typography className={styles.title} color="textPrimary" gutterBottom>
                            Mã chương trình
                        </Typography>
                        <TextField
                            name="gamificationCode"
                            className={styles.textField}
                            inputRef={filterForm.register()}
                            variant="outlined"
                            size="small"
                            type="text"
                            fullWidth
                            placeholder="Nhập mã chương trình"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Typography className={styles.title} color="textPrimary" gutterBottom>
                            Trạng thái
                        </Typography>
                        <MuiSingleAuto
                            name="status"
                            control={filterForm.control}
                            errors={filterForm.errors}
                            options={syncGamificationStatus}
                            placeholder="Chọn trạng thái"
                            style={{ background: "white" }}
                        />
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