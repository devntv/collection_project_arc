import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import { MyCardActions } from '@thuocsi/nextjs-components/my-card/my-card';
import { ExportCSV } from "components/export-cvs/index"
import { useRouter } from 'next/router';
import { formatDateTime, isValid } from "components/global";
import { getSkuContractClient } from "client/skuContract";
import Authorization from '@thuocsi/nextjs-components/authorization/authorization';

export const StatusOption = {
    UPCOMING: "UPCOMING",
    PROCESSING: "PROCESSING",
    EXPIRED: "EXPIRED",
}

export const StatusOptionLabel = {
    [StatusOption.UPCOMING]: "Sắp diễn ra",
    [StatusOption.PROCESSING]: "Đang hoạt động",
    [StatusOption.EXPIRED]: "Đã hết hạn",
}

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
    startTime: null,
    endTime: null,

};

export const SkuContractFilter = (props) => {
    const styles = useStyles();
    const router = useRouter();
    const fileName = `Danh_Sach_Cai_Dat_Gia_Theo_Hop_Dong_${new Date().toLocaleString().replace(/[ :]/g, '_').replace(/[,]/g, '')}`;
    const [loading, setLoading] = useState(false)

    const { register, setValue, handleSubmit } = useForm({
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
            pathname: "/marketing/sku-contract",
            query: {
                q: JSON.stringify({}),
            }
        });
    }

    useEffect(() => {
        if (Object.keys(props.filterData).length === 0) {
            setValue("customerCode", "");
            setValue("productCode", "");
            setValue("contractNumber", "");
            setValue("startTime", null);
            setValue("endTime", null);
        }
    }, [props.filterData])

    const getData = (resp) => {
        return isValid(resp)
            ? resp.data?.map((item) => {
                return {
                    'ID': item.code,
                    'Mã hợp đồng': item.contractNumber,
                    'Mã khách hàng': item.customerID,
                    'Tên khách hàng': item.customerName,
                    'SL sản phẩm': item.quantity,
                    'Thời gian bắt đầu': formatDateTime(item.startTime),
                    'Thời gian kết thúc': formatDateTime(item.endTime),
                    'Trạng thái': StatusOptionLabel[item.status],
                    'Trạng thái hiển thị': item.isActive ? "Hiển thị" : "Không hiển thị"
                };
            })
            : [];
    };

    const csvData = async () => {
        setLoading(true);
        const limit = 100;
        let dataExport = [];
        const totalResult = await getSkuContractClient().exportSkuContract(0, 1, props.filterData)

        const totalPageSize = Math.ceil(totalResult?.total / limit);
        const requestGetAllData = [];
        for (let page = 0; page < totalPageSize; ++page) {
            requestGetAllData.push(getSkuContractClient().exportSkuContract(page * limit, limit, props.filterData));
        }

        const arrayResult = await Promise.all(requestGetAllData);

        arrayResult.forEach(res => {
            dataExport = dataExport.concat(getData(res))
        })

        setLoading(false);
        return dataExport;
    };

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
                                Khách hàng
                            </Typography>
                            <TextField
                                className={styles.textField}
                                id="customerCode"
                                name="customerCode"
                                variant="outlined"
                                size="small"
                                type="text"
                                placeholder="Nhập ID/tên khách hàng"
                                fullWidth
                                inputRef={register()}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSubmit(applyFilter)
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                className={styles.title}
                                color="textPrimary"
                                gutterBottom
                            >
                                Sản phẩm
                            </Typography>
                            <TextField
                                className={styles.textField}
                                id="productCode"
                                name="productCode"
                                variant="outlined"
                                size="small"
                                type="text"
                                placeholder="Nhập ID/tên sản phẩm"
                                fullWidth
                                inputRef={register()}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSubmit(applyFilter)
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                className={styles.title}
                                color="textPrimary"
                                gutterBottom
                            >
                                Hợp đồng
                            </Typography>
                            <TextField
                                className={styles.textField}
                                id="contractNumber"
                                name="contractNumber"
                                variant="outlined"
                                size="small"
                                type="text"
                                placeholder="Nhập ID hợp đồng"
                                fullWidth
                                inputRef={register()}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSubmit(applyFilter)
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                className={styles.title}
                                color="textPrimary"
                                gutterBottom
                            >
                                Thời gian áp dụng
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6} sm={6} md={6}>
                                    <TextField name="startTime" className={styles.textField} inputRef={register()} variant="outlined"
                                        size="small" type="date" fullWidth />
                                </Grid>
                                <Grid item xs={6} sm={6} md={6}>
                                    <TextField name="endTime" className={styles.textField} inputRef={register()} variant="outlined"
                                        size="small" type="date" fullWidth />
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
                                <Authorization requiredAPI="GET/marketplace/product/v2/export/sku-contract">
                                    <ExportCSV csvData={csvData} fileName={fileName} loading={loading} />
                                </Authorization>
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
