import { Button, Grid, IconButton, InputAdornment, makeStyles, TextField, Typography } from '@material-ui/core';
import { MyCardActions } from '@thuocsi/nextjs-components/my-card/my-card';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getGamificationClient } from 'client/gamification';
import { ExportCSV } from "components/export-cvs/index"
import { formatNumber, isValid, formatDateTime, gamificationStatus, formatShortDateTime, gamificationTypeMap } from 'components/global';
import MuiSingleAuto from "@thuocsi/nextjs-components/muiauto/single";
import { Close } from '@material-ui/icons';
import { getSellerClient } from 'client/seller';

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
    search: "",
    createdTimeFrom: null,
    createdTimeTo: null,
    isActive: null,
    processingTimeFrom: null,
    processingTimeTo: null,
    sellerCode: null
};

export const GamificationFilter = (props) => {
    const styles = useStyles();
    const router = useRouter();
    const fileName = `Danh_Sach_Chuong_Trinh_Thuong_${new Date().toLocaleString().replace(/[ :]/g, '_').replace(/[,]/g, '')}`;
    const [loading, setLoading] = useState(false)
    const q = JSON.parse(props.router.query.q ?? "{}")
    const sellerOpts = [{label: "Thuocsi", value: "Thuocsi"}, ...props.sellerOptions]

    if (q?.isActive === true || q?.isActive === false) {
        q.isActive = gamificationStatus.find(item =>
            item.value == q?.isActive
        ) || null
    }

    if (q?.sellerCode) {
        q.sellerCode = sellerOpts?.find(item => item.value === q.sellerCode) || null
    }

    const filterForm = useForm({
        defaultValues: {
            ...defaultFormValues,
            ...q,
        },
        mode: "onChange"
    });

    const applyFilter = async (formData) => {

        formData.isActive = Object.keys(formData?.isActive || {}).length ? formData?.isActive.value : null
        formData.sellerCode = Object.keys(formData?.sellerCode || {}).length ? formData?.sellerCode.value : null

        for (let key in formData) {
            if (formData[key] === null || formData[key] === undefined || formData[key]?.length === 0) {
                delete formData[key]
            }
        }

        props.onFilterChange && props.onFilterChange(formData)
    }

    const handleReset = () => {
        router?.push({
            pathname: "/marketing/gamification",
            query: {
                q: JSON.stringify({}),
            }
        });
    }

    useEffect(() => {
        if (Object.keys(q).length === 0) {
            filterForm.setValue("search", "");
            filterForm.setValue("createdTimeFrom", null);
            filterForm.setValue("createdTimeTo", null);
            filterForm.setValue("isActive", null);
            filterForm.setValue("processingTimeFrom", null);
            filterForm.setValue("processingTimeTo", null);
            filterForm.setValue("sellerCode", null);
        }
    }, [props.filterData])

    const getData = (resp, mapSeller = {}) => {
        return isValid(resp)
            ? resp.data?.map((item) => {
                return {
                    'Mã': item.gamificationCode,
                    'Tên chương trình': item.name,
                    'Loại nhiệm vụ': gamificationTypeMap[item.details[0]?.condition?.type] ?? "Chương trình theo doanh số",
                    'Đơn vị tổ chức': item.sellerCode && item.sellerCode !== "" ? (mapSeller?.[item.sellerCode] || "Không xác định") : "Thuocsi",
                    'Số KH đã tham gia': `${formatNumber(item.numberOfJoinedCustomer ?? 0)}`,
                    'Số KH đã hoàn tất': formatNumber(item.numberOfCompletedCustomer ?? 0),
                    'Tiêu chí nhiệm vụ': formatNumber(item.details[0]?.condition?.target) || 0,
                    'Thời gian tạo': formatDateTime(item.createdTime),
                    'Thời gian hiển thị': formatDateTime(item.publicTime),
                    'Thời gian diễn ra': `Từ ${formatDateTime(item.startTime)} đến ${formatDateTime(item.endTime)}`,
                    'Trạng thái': item.isActive ? "Hiển thị" : "Không hiển thị"
                };
            })
            : [];
    };

    const csvData = async () => {
        setLoading(true);
        const limit = 100;
        let dataExport = [];
        const filterData = props.filterData
        const totalResult = await getGamificationClient().getListGamification(0, 1, filterData, filterData?.search || "")

        const totalPageSize = Math.ceil(totalResult?.total / limit);
        const requestGetAllData = [];
        for (let page = 0; page < totalPageSize; ++page) {
            requestGetAllData.push(getGamificationClient().getListGamification(page * limit, limit, filterData, filterData?.search || ""));
        }

        const arrayResult = await Promise.all(requestGetAllData);

        await Promise.all(
            arrayResult.map(async (res) => {
                const sellerCodes = []           
                res.data?.forEach(item => {
                    if(item.sellerCode && item.sellerCode!=="") sellerCodes.push(item.sellerCode)
                })
    
                const mapSeller = {}
                const sellerResp = await getSellerClient().getSellerBySellerCodesClient(sellerCodes)
                if (sellerResp.status === "OK") {
                    sellerResp.data?.forEach(seller => {
                        mapSeller[seller.code] = `${seller.code} - ${seller.name}`
                    })
                }
    
                dataExport = dataExport.concat(getData(res, mapSeller))
                return getData(res, mapSeller)
            })
        )
        

        setLoading(false);
        return dataExport;
    };

    const searchSeller = async (text="") => {
        const resp = await getSellerClient().getSellerByName(text)
        if(resp.status === "OK"){
            return resp.data?.map(seller => ({
                label: `${seller.code} - ${seller.name}`,
                value: seller.code
            }))
        }
        return []
    }

    return (
        <form onKeyPress={(e) => {
            if (e.key === "Enter") filterForm.handleSubmit(applyFilter)(e)
        }}>
            <MyCardActions>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Typography className={styles.title} color="textPrimary" gutterBottom>
                            Từ khóa
                        </Typography>
                        <TextField
                            name="search"
                            className={styles.textField}
                            inputRef={filterForm.register()}
                            variant="outlined"
                            size="small"
                            type="text"
                            fullWidth
                            placeholder="Nhập mã hoặc tên chương trình"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Typography className={styles.title} color="textPrimary" gutterBottom>
                            Trạng thái
                        </Typography>
                        <MuiSingleAuto
                            name="isActive"
                            control={filterForm.control}
                            errors={filterForm.errors}
                            options={gamificationStatus}
                            placeholder="Chọn trạng thái"
                            style={{ background: "white" }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Typography
                            className={styles.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            Thời gian tạo
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6} sm={6} md={6}>
                                <TextField
                                    name="createdTimeFrom"
                                    className={styles.textField}
                                    inputRef={filterForm.register()}
                                    variant="outlined"
                                    size="small"
                                    type="date"
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
                                    type="date"
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
                                    inputRef={filterForm.register()}
                                    variant="outlined"
                                    size="small"
                                    type="date"
                                    fullWidth
                                    inputProps={{ min: filterForm.watch("processingTimeTo") }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" className={styles.adornment}>
                                                {filterForm.getValues("processingTimeFrom") && (
                                                    <IconButton size="small" onClick={() => filterForm.setValue("processingTimeFrom", null)}>
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
                                    name="processingTimeTo"
                                    className={styles.textField}
                                    inputRef={filterForm.register()}
                                    variant="outlined"
                                    inputProps={{ min: filterForm.watch("processingTimeFrom") }}
                                    size="small"
                                    type="date"
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" className={styles.adornment}>
                                                {filterForm.getValues("processingTimeTo") && (
                                                    <IconButton size="small" onClick={() => filterForm.setValue("processingTimeTo", null)}>
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

                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Typography className={styles.title} color="textPrimary" gutterBottom>
                            Đơn vị tổ chức
                        </Typography>
                        <MuiSingleAuto
                            name="sellerCode"
                            control={filterForm.control}
                            errors={filterForm.errors}
                            options={sellerOpts}
                            placeholder="Chọn đơn vị tổ chức"
                            style={{ background: "white" }}
                            onFieldChange={searchSeller}
                        />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Grid container justifyContent="flex-end" spacing={1}>
                            <Grid item>
                                <ExportCSV csvData={csvData} fileName={fileName} loading={loading} />
                            </Grid>
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