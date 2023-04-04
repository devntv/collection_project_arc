import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import React, { useState } from 'react';
import Head from 'next/head';
import AppCS from 'pages/_layout';
import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import {
    Button,
    Grid,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Chip,
    LinearProgress,
    Typography,
    FormHelperText
} from "@material-ui/core";
import styles from './gamification.module.css';
import { formatNumber, formatDateTime, gamificationResultStatusColor, gamificationResultStatus, formatEllipsisText } from "components/global";
import { useRouter } from "next/router";
import { getGamificationClient } from "client/gamification";
import { getCustomerClient } from "client/customer";
import PhoneIcon from '@material-ui/icons/Phone';
import Link from "next/link";
import { GamificationResultFilter } from "containers/gamification/GamificationResultFilter";
import NotFound from "@thuocsi/nextjs-components/not-found/not-found";


function LinearProgressWithLabel(props) {

    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <Tooltip title={`${formatNumber(props.row.value)} / ${(formatNumber(props.row.detail?.condition?.target || 1))}`} placement="bottom-start">
                    <a style={{ cursor: "pointer" }}>
                        <LinearProgress variant="determinate" {...props} />
                    </a>
                </Tooltip>
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2">{`${Math.round(
                    props.value || 0,
                )}%`}</Typography>
            </Box>
        </Box >
    );
}

const StatusButton = ({ status }) => {
    return (
        <Button
            size="small"
            variant="outlined"
            style={{ color: gamificationResultStatusColor[status], borderColor: gamificationResultStatusColor[status] }}
        >
            {gamificationResultStatus[status] ?? "Không xác định"}
        </Button>
    )
}

export async function loadData(ctx) {
    const props = {
        data: {},
        err: {},
        total: 0,
        customers: [],
        customerMap: {},
        customerOptions: [],
        b: {}
    };

    let code = ctx.query.code;

    const page = parseInt(ctx.query.page) || 0;
    const limit = parseInt(ctx.query.limit) || 20;
    const offset = page * limit;
    const q = JSON.parse(ctx.query.q ?? "{}");
    const filterData = q;
    props.filterData = filterData;

    const optionResp = await getCustomerClient(ctx, {}).getCustomer(0, 20, {})

    if (optionResp.status === "OK") {
        props.customerOptions = optionResp.data.map(({ accountID, name, customerID }) => ({
            label: customerID + " - " + name,
            value: accountID ?? 0
        }))
    }

    const gamificationClient = getGamificationClient(ctx, {})
    const resp = await gamificationClient.getGamification({}, code);
    if (resp.status === "OK") {
        props.data = resp.data?.[0] || {};
    } else {
        props.err = resp?.message
        return { props }
    }

    const resultResp = await gamificationClient.getListGamificationResult(offset, limit, {
        ...q,
        gamificationCode: code
    })

    if (resultResp.status === "OK" && resultResp.data) {
        props.customers = resultResp.data
        props.total = resultResp.total
        const accountIds = resultResp.data.map(item => (item.account_id))

        const customerResp = await getCustomerClient(ctx, {}).getCustomerByAccountIDs(accountIds);
        if (customerResp.status === "OK") {
            customerResp.data.map(item => {
                props.customerMap[item.accountID] = item
            })
        }
    }


    return { props }
}

function InfoLine({ label, val, type }) {
    return (
        <Box className={styles.infoLine}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{val}</span>
        </Box>
    )
}
export async function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, (cbCtx) => loadData(cbCtx));
}

const GamificationDetailPage = (props) => {

    const { customerMap, customerOptions, customers, err } = props
    const data = props.data || {};
    const router = useRouter()

    const page = +(router.query?.page || 0);
    const limit = +(router.query?.limit || 20);
    const total = props.total || 0;

    const handlePageChange = (_, page, rowsPerPage) => {
        router.push({
            pathname: "/marketing/gamification/detail",
            query: {
                ...router.query,
                limit: rowsPerPage,
                page,
            },
        });
    };

    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing"
        },
        {
            name: "Danh sách chương trình thưởng",
            link: "/marketing/gamification"
        },
        {
            name: "Danh sách khách hàng tham gia chương trình",
        },
    ]

    if (err.message) {
        return (
            <NotFound linkLabel={"Danh sách chương trình thưởng"} linkAddress={"/marketing/gamification"}>

            </NotFound>
        )
    }
    return (
        <AppCS select="/marketing/gamification" breadcrumb={breadcrumb}>
            <Head>
                <title>{'Thông tin chương trình'}</title>
            </Head>
            <MyCard>

                <MyCardHeader title={`Chương trình thưởng #${formatEllipsisText(data.name)}`}></MyCardHeader>
                <MyCardContent>
                    <Grid container>

                        <Grid item xs={6}  >
                            <InfoLine label="Tên chương trình" val={data.name} />
                            <InfoLine label="Loại chương trình" val={"Chương trình theo doanh số"} />
                            <InfoLine label="Thời gian hiển thị" val={`${formatDateTime(data.publicTime)} `} />
                            <InfoLine label="Thời gian áp dụng" val={`${formatDateTime(data.startTime)} - ${formatDateTime(data.endTime)}`} />
                            <InfoLine label="Ngày trả thưởng" val={`+ ${formatNumber(data.numberOfDayCalResult ?? 0)}`} />
                        </Grid>

                        <Grid item xs={6}  >
                            <InfoLine label="Số lượng khách hàng tham gia" val={formatNumber(data.numberOfJoinedCustomer ?? 0)} />
                            <InfoLine label="Số lượng khách hàng hoàn tất" val={formatNumber(data.numberOfCompletedCustomer ?? 0)} />
                            <InfoLine label="Doanh số yêu cầu" val={`${formatNumber(data.details?.[0]?.condition.target || 0)} VND`} />
                            <Box className={styles.infoLine}>
                                <span className={styles.label}>Phần thưởng</span>
                                <div dangerouslySetInnerHTML={{ __html: formatEllipsisText(data.details?.[0]?.reward.description ?? "", 500) }} className={styles.value} />
                            </Box>
                        </Grid>
                    </Grid>
                </MyCardContent>
            </MyCard>
            <MyCard>
                <MyCardHeader title={'Danh sách khách hàng tham gia chương trình'}>
                </MyCardHeader>
                <GamificationResultFilter customerOptions={customerOptions} gamification={data} />
            </MyCard>
            <MyCard>
                <TableContainer>
                    <Table>
                        <colgroup>
                            <col width="5%" />
                            <col width="18%" />
                            <col width="10%" />
                            <col width="15%" />
                            <col width="15%" />
                            <col/>
                        </colgroup>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">STT</TableCell>
                                <TableCell align="center">Khách hàng</TableCell>

                                <TableCell align="left">Tổng doanh số</TableCell>

                                <TableCell align="left">Doanh số cần đạt</TableCell>

                                <TableCell align="center">Tiến độ</TableCell>

                                {/* <TableCell align="center">Thời gian tham gia</TableCell>

                                <TableCell align="center">Thời gian hoàn tất</TableCell> */}
                                <TableCell align="center">Trạng thái</TableCell>
                                <TableCell align="left">Ghi chú</TableCell>

                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {customers && customers.length > 0 ? (
                                customers.map((row, index) => {
                                    let value = Math.floor((row.value / (row.detail?.condition?.target || 1)) * 100)
                                    value > 100 ? value = 100 : value = value
                                    return (
                                        <TableRow key={row.code}>
                                            <TableCell component="th" scope="row">
                                                {page * limit + index + 1}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Link
                                                    href={`/crm/customer/detail?customerCode=${customerMap[row.account_id]?.code}`}
                                                    prefetch={false}>
                                                    <Tooltip
                                                        title={`Nhấn để xem chi tiết khách hàng ${customerMap[row.account_id]?.name || ""}`}>
                                                        <a color="primary" className={styles.cartLink}>
                                                            {customerMap[row.account_id]?.customerID + " - " + (customerMap[row.account_id]?.name || "")}
                                                        </a>
                                                    </Tooltip>
                                                </Link>
                                                <br />


                                                <Chip
                                                    icon={<PhoneIcon />}
                                                    label={customerMap[row.account_id]?.phone || ""}
                                                />
                                            </TableCell>


                                            <TableCell align="left">
                                                {formatNumber(row.value) || 0}
                                            </TableCell>

                                            <TableCell align="left">
                                                {formatNumber(data.details?.[0]?.condition?.target || 0)}
                                            </TableCell>


                                            <TableCell align="center">
                                                <LinearProgressWithLabel color="primary" value={value || 0} row={row}/>
                                            </TableCell>


                                            {/* <TableCell align="center">
                                            {formatDateTime(row.createdTime)}
                                        </TableCell>

                                        <TableCell align="center">
                                            {row.completedTime ? formatDateTime(row.completedTime) : " - "}
                                        </TableCell> */}

                                            <TableCell align="center">
                                                <StatusButton status={row.status} />     
                                            </TableCell>

                                            <TableCell align="left">
                                                {((value === 100 && row.status === "IN_PROGRESS") || (value < 100 && row.status === "COMPLETED")) ? <Typography>Chương trình có thay đổi.
                                                    <br />
                                                    Vui lòng cập nhật kết quả trả thưởng</Typography> : " - "}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} align="left">
                                        Không có khách hàng
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>

                        <MyTablePagination
                            labelUnit="khách hàng"
                            count={total}
                            rowsPerPage={limit}
                            page={page}
                            onChangePage={handlePageChange}
                        />
                    </Table>

                </TableContainer>
            </MyCard >

        </AppCS >
    )
};

export default function GamificationDetail(props) {
    return renderWithLoggedInUser(props, GamificationDetailPage);
}
