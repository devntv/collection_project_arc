import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import React from 'react'
import AppCMS from "pages/_layout";
import { getProductClient } from "client/product"
import Head from "next/head"
import { MyCard, MyCardHeader, MyCardContent } from "@thuocsi/nextjs-components/my-card/my-card"
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination
} from "@material-ui/core"
import moment from "moment"
import { useRouter } from 'next/router'

function render({ data, total, errorMessage= "" }) {
    const router = useRouter()
    const { query } = router
    const { page = 0, limit = 20, code = "" } = query
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
            link: "/marketing/sku-point/list-import"
        },
        {
            name: "Lịch sử import",
        }
    ]
    function handleError(item) {
        if (item?.errorCode) {
            switch (item.errorCode) {
                case "NOT_FOUND":
                    return "Không tìm thấy mã SKU"
                default:
                    return item?.message || ""
            }
        }
    }
    const handlePageChange = (event, newPage) => {
        router.push(`/marketing/sku-point/detail-import?code=${code}&page=${newPage}&limit=${limit}`)
    }
    const handleRowsPerPageChange = (value) => {
        router.push(`/marketing/sku-point/detail-import?code=${code}&page=0&limit=${value}`)
    }
    return (
        <AppCMS select="/marketing/sku-point/detail-import" breadcrumb={breadcrumb}>
            <Head>
                <title>Lịch sử import SKU point</title>
            </Head>
            <MyCard>
                <MyCardHeader title={"Lịch sử import SKU point"} ></MyCardHeader>
                <MyCardContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Mã SKU</TableCell>
                                    <TableCell align="left">Người cài đặt</TableCell>
                                    <TableCell align="center">Điểm tích luỹ</TableCell>
                                    <TableCell align="center">Hệ số nhân</TableCell>
                                    <TableCell align="center">Kết quả</TableCell>
                                    <TableCell align="center">Thời gian</TableCell>
                                    <TableCell align="left">Lỗi</TableCell>
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
                                                <TableCell align="left">{item.skuCode}</TableCell>
                                                <TableCell align="left">{item.accountFullname || item.accountID}</TableCell>
                                                <TableCell align="center">{item.point === 0 ? "-" : item.point}</TableCell>
                                                <TableCell align="center">{item.pointMultiplier === 0 ? "-" : item.pointMultiplier}</TableCell>
                                                <TableCell align="center">{item.isSuccess ? (
                                                    <span style={{ color: "green", fontWeight: "bold" }}>
                                                        Thành công
                                                    </span>
                                                ) : (
                                                    <span style={{ color: "red", fontWeight: "bold" }}>
                                                        Thất bại
                                                    </span>
                                                )
                                                }</TableCell>
                                                <TableCell align="center">{moment(item.createdTime).format("DD-MM-yyyy HH:mm")}</TableCell>
                                                <TableCell align="left">{handleError(item)}</TableCell>
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
        let errorMessage = ""
        const { page = 0, limit = 20, code = "" } = ctx.query
        const productClient = getProductClient(ctx, { props: {} })
        const resp = await productClient.getHistorySkuPointImportDetail({
            offset: page * limit,
            limit: limit,
            getTotal: true,
            code: code
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