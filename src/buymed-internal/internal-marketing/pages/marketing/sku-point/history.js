import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login"
import { getProductClient } from "client/product"
import AppMarketing from 'pages/_layout'
import Head from "next/head"
import { MyCard, MyCardHeader, MyCardContent } from "@thuocsi/nextjs-components/my-card/my-card"
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core"
import React from "react"
import moment from "moment"


function SkuPointHistoryRender({ code, logs, errorMessage= "" }) {
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
            name: "Lịch sử"
        }
    ]

    return (
        <AppMarketing select="/marketing/sku-point/history" breadcrumb={breadcrumb}>
            <Head>
                <title>Lịch sử cài đặt điểm</title>
            </Head>
            <MyCard>
                <MyCardHeader title={`LỊCH SỬ CÀI ĐẶT ĐIỂM #${code}`} />
            </MyCard>
            <MyCard>
                <MyCardContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Mã SKU</TableCell>
                                    <TableCell align="left">Người cài đặt</TableCell>
                                    <TableCell align="center">Điểm tích luỹ</TableCell>
                                    <TableCell align="center">Hệ số nhân</TableCell>
                                    <TableCell align="center">Hành động</TableCell>
                                    <TableCell align="center">Kết quả</TableCell>
                                    <TableCell align="center">Thời gian</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    logs.length === 0 && <TableRow><TableCell>{errorMessage || "Không có dữ liệu"}</TableCell></TableRow>
                                }
                                {
                                    logs.map((item, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell align="left">{item.skuCode}</TableCell>
                                                <TableCell align="left">{item.accountFullname || item.accountID}</TableCell>
                                                <TableCell align="center">{item.point === 0 ? " - " : item.point}</TableCell>
                                                <TableCell align="center">{item.pointMultiplier === 0 ? "-" : item.pointMultiplier}</TableCell>
                                                <TableCell align="center">{item.action || ""}</TableCell>
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
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </MyCardContent>
            </MyCard>
        </AppMarketing>
    )
}
export async function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, async () => {
        let errorMessage = "Không có dữ liệu"
        const productClient = getProductClient(ctx, { props: {} })
        const { code = "" } = ctx.query
        let logs = []
        if (!!code) {
            const logResp = await productClient.getHistorySkuPoint(code)
            if (logResp.status === "OK") {
                logs = logResp.data
            } else if (logResp?.status === "FORBIDDEN") {
                errorMessage = logResp?.message
            }
        }
        return {
            props: {
                code,
                logs,
                errorMessage
            }
        }
    });
}
export default function SkuPointHistory(props) {
    return renderWithLoggedInUser(props, SkuPointHistoryRender);
}
