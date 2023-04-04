import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import React from 'react'
import AppCMS from "pages/_layout";
import { getProductClient } from "client/product"
import Head from "next/head"
import { MyCard, MyCardHeader, MyCardContent } from "@thuocsi/nextjs-components/my-card/my-card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    Button,
    Paper
} from "@material-ui/core"
import moment from "moment"
import router, { useRouter } from 'next/router'
import { DetailsRounded } from "@material-ui/icons";
import Authorization from "@thuocsi/nextjs-components/authorization/authorization"

function render({ data, total, errorMessage="" }) {
    const router = useRouter()
    const { query } = router
    const { page = 0, limit = 20 } = query
    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing"
        },
        {
            name: "Cài đặt điểm",
            link: "/marketing/sku-point"
        },
        {
            name: "Lịch sử các phiên import",
        }
    ]
    const gotoDetail = (code = "") => {
        router.push(`/marketing/sku-point/detail-import?code=${code}`)
    }
    const handlePageChange = (event, newPage) => {
        router.push(`/marketing/sku-point/list-import?page=${newPage}&limit=${limit}`)
    }
    const handleRowsPerPageChange = (value) => {
        router.push(`/marketing/sku-point/list-import?page=0&limit=${value}`)
    }
    return (
            <AppCMS select="/marketing/sku-point/list-import" breadcrumb={breadcrumb}>
                <Head>
                    <title>Lịch sử các lần import SKU point</title>
                </Head>
                <MyCard>
                    <MyCardHeader title={"Lịch sử các lần import SKU point"} ></MyCardHeader>
                    <MyCardContent>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">STT</TableCell>
                                        <TableCell align="left">Code</TableCell>
                                        <TableCell align="left">Người cài đặt</TableCell>
                                        <TableCell align="center">Số SKU import</TableCell>
                                        <TableCell align="center">Số SKU import thành công</TableCell>
                                        <TableCell align="center">Trạng thái</TableCell>
                                        <TableCell align="center">Thời gian</TableCell>
                                        <TableCell align="center">Thao tác</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        data.length === 0 && <TableRow><TableCell>{errorMessage || "Không có dữ liệu"}</TableCell></TableRow>
                                    }
                                    {
                                        data.map((item, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell align="left">{page * limit + index + 1}</TableCell>
                                                    <TableCell align="left">{item.code}</TableCell>
                                                    <TableCell align="left">{item.accountFullname || item.accountID}</TableCell>
                                                    <TableCell align="center">{item.total}</TableCell>
                                                    <TableCell align="center">{item.status === "PROCESSING" ? "-" : item.totalSuccess || 0}</TableCell>
                                                    <TableCell align="center"><ImportStatus status={item.status} /></TableCell>
                                                    <TableCell align="center">{moment(item.createdTime).format("DD-MM-yyyy HH:mm")}</TableCell>
                                                    <TableCell align="center">
                                                        <Authorization requiredAPI="GET/marketplace/product/v2/sku/point/detail-import">
                                                            <IconButton disabled={false} variant="contained" onClick={async () => await gotoDetail(item.code)}> <FontAwesomeIcon icon={faEye} size="sm" /></IconButton >
                                                        </Authorization>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            labelRowsPerPage="Hiển thị mỗi trang"
                            labelDisplayedRows={({ from, to, count }) => `Từ ${from} đến ${to} trong ${count} kết quả`}
                            rowsPerPageOptions={[20, 50, 100]}
                            component="div"
                            count={total}
                            rowsPerPage={Number(limit)}
                            page={Number(page)}
                            onPageChange={(event, newPage) => handlePageChange(event, newPage)}
                            onRowsPerPageChange={(event) => handleRowsPerPageChange(event.target.value)}
                        />
                    </MyCardContent>
                </MyCard>
            </AppCMS >
    )
}

export default function HistoryImportpage(props) {
    return renderWithLoggedInUser(props, render);
}
export async function getServerSideProps(ctx) {
    return await doWithLoggedInUser(ctx, async (ctx) => {
        let errorMessage = "Không có dữ liệu"
        const { page = 0, limit = 20 } = ctx.query
        const productClient = getProductClient(ctx, { props: {} })
        const resp = await productClient.getHistorySkuPointImportList({
            offset: page * limit,
            limit: limit,
            getTotal: true
        })
        let data = []
        let total = 0
        if (resp?.status === "OK") {
            data = resp?.data
            total = resp?.total || 0
        } else if (resp?.status === "FORBIDDEN") {
            errorMessage = resp?.message
        }
        return {
            props: {
                data: data,
                total: total,
                errorMessage: errorMessage
            }
        };
    });
}

const statusMap = {
    DONE: {
        value: "DONE",
        label: "Đã hoàn thành",
        color: "green"
    },
    PROCESSING: {
        value: "PROCESSING",
        label: "Đang xử lý",
        color: "red"
    },
}

const ImportStatus = ({ status }) => {
    return (
        <Button
            disabled
            size="small"
            variant="outlined"
            style={{ color: statusMap?.[status]?.color, borderColor: statusMap?.[status]?.color }}
        >
            {statusMap?.[status]?.label}
        </Button>
    )
}