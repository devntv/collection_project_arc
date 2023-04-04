import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Button, Grid, makeStyles, TextField, Typography, InputAdornment } from '@material-ui/core'
import { MyCardActions } from '@thuocsi/nextjs-components/my-card/my-card';
import { useRouter } from 'next/router';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: "bold",
    },
    textField: {
        background: theme.palette.background.paper,
    }
}))

const defaultValues = {
    campaignName: "", 
    processingTimeFrom: null,
    processingTimeTo: null,

};

export const SaleCampaignFilter = (props) => {
    const styles = useStyles();
    const router = useRouter();

    const { register, setValue, handleSubmit, watch } = useForm({
        defaultValues: {
            ...defaultValues,
            ...props.filterData,
        },
        mode: "onChange"
    })

    const applyFilter = async (formData) => {

        for (let key in formData) {
            if (!formData[key]) {
                delete formData[key]
            }
        }
        props.onFilterChange && props.onFilterChange(formData)
    }

    const handleReset = () => {
        router.push({
            pathname: "/marketing/sale-campaign",
            query: {
                q: JSON.stringify({}),
            }
        });
    }

    useEffect(() => {
        if (Object.keys(props.filterData).length === 0) {
            setValue("campaignName", "");
            setValue("processingTimeFrom", null);
            setValue("processingTimeTo", null);

        }
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
                                Tên CTKM
                            </Typography>
                            <TextField
                                className={styles.textField}
                                id="campaignName"
                                name="campaignName"
                                variant="outlined"
                                size="small"
                                type="text"
                                placeholder="Nhập tên CTKM"
                                fullWidth
                                inputRef={register()}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.target.value = e.target.value.trim()
                                        handleSubmit(applyFilter)
                                    }
                                }}
                                InputProps={{
                                    endAdornment: watch("campaignName") ? (
                                        <InputAdornment position="start">
                                            <ClearIcon 
                                                fontSize='small' 
                                                onClick={() => setValue("campaignName", "")} 
                                                style={{cursor: "pointer"}}
                                            />
                                        </InputAdornment>
                                    ) : null,
                                  }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                className={styles.title}
                                color="textPrimary"
                                gutterBottom
                            >
                                Thời gian diễn ra
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6} sm={6} md={6}>
                                    <TextField 
                                        name="processingTimeFrom" 
                                        className={styles.textField} 
                                        inputRef={register()} 
                                        variant="outlined"
                                        size="small" 
                                        type="date" 
                                        fullWidth  
                                        inputProps={{
                                            max: watch("processingTimeTo"),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={6} md={6}>
                                    <TextField 
                                        name="processingTimeTo" 
                                        className={styles.textField} 
                                        inputRef={register()} 
                                        variant="outlined"
                                        size="small" 
                                        type="date" 
                                        fullWidth
                                        inputProps={{
                                            min: watch("processingTimeFrom"),
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
                                    onClick={handleReset}
                                >
                                    Làm mới
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
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
