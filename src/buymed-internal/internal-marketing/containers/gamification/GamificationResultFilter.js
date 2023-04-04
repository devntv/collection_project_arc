import { Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { MyCardActions } from '@thuocsi/nextjs-components/my-card/my-card';
import { formatDateTime, parseQ, isValid } from 'components/global';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import MuiSingleAuto from "@thuocsi/nextjs-components/muiauto/single";
import { getCustomerClient } from 'client/customer';
import { ExportCSV } from 'components/export-cvs';
import { getGamificationClient } from 'client/gamification';
import {getMasterDataClient} from "../../client/master-data";
import {APIStatus} from "@thuocsi/nextjs-components/lib/common";


const defaultFormValues = {
    account_id: null,
    status: null,
    orderID: null,
};

const statusOptions = [
    { label: "Đã hoàn tất", value: "COMPLETED" },
    { label: "Đang tiến hành", value: "IN_PROGRESS" }
]
export const GamificationResultFilter = ({ customerOptions, gamification }) => {
    const router = useRouter();
    const defaultFilterValues = parseQ(router.query.q);

    const fileName = `Danh_Sach_Khach_Hang_Tham_Gia_${new Date().toLocaleString().replace(/[ :]/g, '_').replace(/[,]/g, '')}`;
    const [loading, setLoading] = useState(false)

    const filterForm = useForm({
        defaultValues: {
            ...defaultFormValues,
            ...defaultFilterValues,
        },
        mode: "onChange"
    });

    useEffect(() => {
        const q = router?.query?.q ? JSON.parse(router.query.q) : {}
        if (q?.account_id) {
            const getCustomer = async () => {
                const resp = await getCustomerClient().getCustomerByAccountIDs([q?.account_id])
                if (resp?.data) {
                    filterForm.setValue("account_id", {
                        label: resp.data[0].customerID + " - " + resp.data[0].name,
                        value: resp.data[0].accountID,
                    })
                }
            }
            getCustomer()
        }

        if (q?.status) {
            filterForm.setValue("status", statusOptions.filter(item => item.value === q?.status)[0] ?? null)
        }
    }, [router.query.q]);

    const applyFilter = async (formData) => {

        if (formData.account_id) formData.account_id = Number(formData.account_id.value)
        if (formData.status) formData.status = formData.status?.value || null
        if (formData.orderID) formData.orderID = Number(formData.orderID)

        Object.keys(formData).forEach(key => {
            if (!formData[key]) delete formData[key]
        });

        router?.push({
            query: {
                ...router.query,
                q: JSON.stringify(formData),
            }
        });
    }

    const handleReset = () => {
        filterForm.reset();
        router?.push({
            pathname: "/marketing/gamification/detail",
            query: {
                code: router.query.code
            }
        });
    }

    const searchCustomer = async (text) => {
        const customerClient = getCustomerClient()
        const customerResp = await customerClient.getListCustomerBySearch(text)
        if (customerResp.status === "OK") {
            const tmpData = []
            customerResp?.data?.map(({ accountID, name, customerID }) => {
                tmpData.push({
                    label: customerID + " - " + name,
                    value: accountID ?? 0
                })
            })

            return tmpData
        }
        return []
    }

    const getData = (resp, customerMap = {}, provinceMap = {}) => {
        return isValid(resp)
            ? resp.data?.map((item, index) => {

                let value = Math.floor((item.value / (item.detail?.condition?.target || 1)) * 100)
                value > 100 ? value = 100 : value = value
                let customer = customerMap[item.account_id]
                return {
                    'ID Khách hàng': customer?.customerID || " - ",
                    'Tên khách hàng': customer?.name || " - ",
                    'Số điện thoại': customer?.phone || " - ",
                    'Tỉnh / Thành phố': provinceMap[customer?.provinceCode] || " - ",
                    'Tổng doanh thu': item.value || 0,
                    'Tiến độ': `${value || 0}%`,
                    'Thời gian tham gia': formatDateTime(item.createdTime),
                    'Thời gian hoàn thành': formatDateTime(item.completedTime),
                    'Trạng thái': statusOptions.filter(status => status.value === item?.status)[0]?.label || "Không xác định"
                };
            })
            : [];
    };

    const csvData = async () => {
        setLoading(true);
        const limit = 100;
        let dataExport = [];
        const filterData = router?.query?.q ? JSON.parse(router.query.q) : {}
        const totalResult = await getGamificationClient().getListGamificationResult(0, 1, {...filterData, gamificationCode: gamification.gamificationCode})

        const totalPageSize = Math.ceil(totalResult?.total / limit);
        const requestGetAllData = [];
        for (let page = 0; page < totalPageSize; ++page) {
            requestGetAllData.push(getGamificationClient().getListGamificationResult(page * limit, limit, {...filterData, gamificationCode: gamification.gamificationCode}));
        }

        const arrayResult = await Promise.all(requestGetAllData);
        let provinceMap = {}
        const provinceResp = await getMasterDataClient().getProvince(0, 100, '', [] )
        if (provinceResp.status === APIStatus.OK) {
            provinceResp.data.forEach(item => {
                provinceMap[item.code] = item.name
            })
        }

        await Promise.all(arrayResult.map(async (res) => {
            const accountIds = []
            const customerMap = {}
            res?.data?.forEach((item) => {
                if (item.account_id) accountIds.push(item.account_id);
            });

            const customerResp = await getCustomerClient().getCustomerByAccountIDs(accountIds);
            if (customerResp.status === "OK") {
                customerResp.data.map(item => {
                    customerMap[item.accountID] = item
                })
            }

            dataExport = dataExport.concat(getData(res, customerMap, provinceMap))
            return getData(res, customerMap, provinceMap)
        }))

        setLoading(false);
        return dataExport;
    };

    return (
        <form onKeyPress={(e) => {
            if (e.key === "Enter") filterForm.handleSubmit(applyFilter)(e)
        }}>
            <MyCardActions>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Typography gutterBottom>
                            Khách hàng
                        </Typography>
                        <MuiSingleAuto
                            name="account_id"
                            control={filterForm.control}
                            errors={filterForm.errors}
                            options={customerOptions || []}
                            placeholder="Nhập tên hoặc id khách hàng"
                            onFieldChange={searchCustomer}
                            style={{ background: "white" }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Typography gutterBottom>
                            ID Đơn hàng
                        </Typography>
                        <TextField
                            fullWidth
                            name='orderID'
                            variant="outlined"
                            size='small'
                            inputRef={filterForm.register()}
                            placeholder='Nhập ID đơn hàng'
                            style={{ background: "white" }}
                            type='number'

                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Typography gutterBottom>
                            Trạng thái
                        </Typography>

                        <MuiSingleAuto
                            name="status"
                            control={filterForm.control}
                            errors={filterForm.errors}
                            options={statusOptions}
                            placeholder="Tất cả"
                            style={{ background: "white" }}
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