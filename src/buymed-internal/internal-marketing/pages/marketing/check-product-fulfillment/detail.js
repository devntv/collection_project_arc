import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import AppMarketing from "pages/_layout";
import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { getAccountClient } from "client/account";
import { TableContainer, TableBody, Table, TableHead, TableCell, TableRow, Tooltip, Tab, Grid, Typography, Chip, Button, FormHelperText } from "@material-ui/core";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import { ImportStatusButton } from "containers/sale-campaign/import-result/ImportStatusButton";
import { getSaleCampaignClient } from "client/saleCampaign";
import Link from "next/link";
import { formatNumber, formatShortDateTime, isValid, roundingNumber } from "components/global";
import { getProductClient } from "client/product";
import { formatTime } from "components/component/util";
import { ProductFulfillmentStatusButton } from "containers/sale-campaign/check-fulfillment/CheckFulfillmentStatusButton";
import { CheckFulfillmentDetailFilter } from "containers/sale-campaign/check-fulfillment/DetailCheckFulfillmentFilter";
import AuthorizationScreen from "components/authorization-screen";

export async function getServerSideProps(ctx) {
    return await doWithLoggedInUser(ctx, loadData);
}

export default function HistoryPage(props) {
    return renderWithLoggedInUser(props, render)
}

// load history of
async function loadData(ctx) {

    let props = {
        data: [],
        total: 0,
        filterData: {},
        account: {},
        info: {},
        campaignData: {},
        productMap: {},
    }
    let data = { props };
    let query = ctx.query;
    let code = query.code
    let page = parseInt(query.page) || 0;
    let limit = parseInt(query.limit) || 20;
    let offset = page * limit;
    let q = JSON.parse(query.q ?? "{}");

    const logResp = await getSaleCampaignClient(ctx, data).getListCheckProductFulfillmentLog(0, 20, {
        code
    })
    if (logResp.status === "OK") {
        props.info = logResp.data?.[0]
        const saleCampaignResp = await getSaleCampaignClient(ctx, data).getSaleCampaign({ campaignCode: props.info?.campaignCode || "" })
        if (saleCampaignResp.status === "OK" && saleCampaignResp.data) {
            props.campaignData = saleCampaignResp.data?.[0] || {}
        }
    }

    const resp = await getSaleCampaignClient(ctx, data).getDetailCheckProductFulfillmentLog(offset, limit, {
        ...q,
        checkFulfillmentCode: code
    })

    if (resp.status === "OK") {
        props.data = resp.data ?? []
        props.total = resp.total ?? 0
    }

    if (props.data.length > 0) {
        const skus = props.data.map(item => item.sku)
        const productResp = await getProductClient(ctx, data).getProductListBySKUs(skus)
        if (productResp.status === "OK") {
            productResp.data?.map(product => {
                props.productMap[product.sku?.code] = product.product ?? null
            })
        }
    }

    return data
}

let breadcrumb = [
    {
        name: "Trang chủ",
        link: "/marketing",
    },
    {
        name: "Lịch sử kiểm tra tỉ lệ fulfill",
        link: "/marketing/check-product-fulfillment"
    },
    {
        name: "Thông tin chi tiết",
    }
]

function render(props) {
    
    const router = useRouter()
    const page = +(router.query?.page || 0);
    const limit = +(router.query?.limit || 20);
    const { total, account, info, productMap, campaignData, data } = props

    const handlePageChange = async (event, page, rowsPerPage) => {
        await router.push({
            pathname: "/marketing/check-product-fulfillment/detail",
            query: {
                ...router.query,
                page: page,
                limit: rowsPerPage
            }
        });
    };


    return (

        <AuthorizationScreen>
            <AppMarketing breadcrumb={breadcrumb}>
                <Head>
                    <title>Thông tin chi tiết</title>
                </Head>
                <MyCard>
                    <MyCardHeader title={`Thông tin chi tiết kiểm tra #${router.query?.code || ""}`}>

                    </MyCardHeader>
                    {info?.code && (
                        <MyCardContent>
                            <Grid container spacing={2} >
                                <Grid item md={3}>
                                    {campaignData?.banner && (
                                        <img src={campaignData.banner} alt={campaignData.campaignName} width={300} height={150} style={{ objectFit: "contain" }} />
                                    )}
                                </Grid>

                                <Grid item container md={9} spacing={2}>
                                    <Grid item xs={12} md={2}>
                                        <Typography style={{ fontWeight: "bold" }}>
                                            Mã - Tên chương trình:
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} md={10}>
                                        <Link
                                            href={`/marketing/sale-campaign/edit?code=${campaignData?.campaignCode || ""}`}
                                            prefetch={false}>
                                            <a style={{
                                                textDecoration: "none",
                                                cursor: "pointer",
                                                color: "green",
                                                fontSize: "16px"
                                            }}>
                                                <Tooltip
                                                    title={`Nhấn để xem chi tiết CTKM: ${campaignData?.campaignName || ""}`}>
                                                    <span>
                                                        {campaignData?.campaignCode} - {campaignData?.campaignName || " - "}
                                                    </span>


                                                </Tooltip>
                                            </a>

                                        </Link>
                                    </Grid>

                                    <Grid item xs={12} md={2}>
                                        <Typography style={{ fontWeight: "bold" }}>
                                            Tỉ lệ fulfill tối thiểu:
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} md={10}>
                                        <Typography>
                                            {info.campaignFulfill ?? "0"}%
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} md={2}>
                                        <Typography style={{ fontWeight: "bold" }}>
                                            Thời gian kiểm tra:
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} md={10}>
                                        <Typography>
                                            {formatTime(info?.startTime || null)}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} md={2}>
                                        <Typography style={{ fontWeight: "bold" }}>
                                            Số sản phẩm đạt yêu cầu:
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} md={10}>
                                        <Typography>
                                            {info.status === "IN_PROGRESS" ? (<>Đang cập nhật</>) : (
                                                <>
                                                    {formatNumber(info.numberOfActiveCampaignProduct ?? 0)}/{formatNumber(info.total ?? 0)}
                                                </>
                                            )}

                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} md={2}>
                                        <Typography style={{ fontWeight: "bold" }}>
                                            Trạng thái:
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} md={10}>
                                        <ImportStatusButton status={info.status} />
                                    </Grid>
                                </Grid>

                            </Grid>
                        </MyCardContent>
                    )}

                </MyCard>

                <MyCard>
                    <MyCardHeader title={`Danh sách sản phẩm kiểm tra`} />

                    <CheckFulfillmentDetailFilter />

                    <TableContainer>
                        <Table>
                            <colgroup>
                                <col width="5%" />
                                <col />
                                <col />
                                <col />
                                <col width="10%" />
                            </colgroup>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">STT</TableCell>
                                    <TableCell align="left">SKU</TableCell>
                                    <TableCell align="left">Hình ảnh</TableCell>
                                    <TableCell align="left">Sản phẩm</TableCell>
                                    <TableCell align="left">Tỉ lệ fulfill</TableCell>
                                    <TableCell align="left">Trạng thái kiểm tra</TableCell>
                                    <TableCell align="left">Kết quả</TableCell>
                                    <TableCell align="left">Lý do</TableCell>

                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {data?.length > 0 && data?.map((row, index) => {
                                    row.failReason = row.failReason?.replace("\n", "") || "-"
                                    return (
                                    <TableRow>
                                        <TableCell>{page * limit + index + 1}</TableCell>
                                        <TableCell>{row.sku ?? "-"}</TableCell>
                                        <TableCell>
                                            {
                                                productMap[row.sku]?.imageUrls && productMap[row.sku]?.imageUrls?.length > 0 ? (
                                                    <img src={productMap[row.sku]?.imageUrls[0]} width={70} height={70} style={{ objectFit: "contain" }} />
                                                ) : "-"}
                                        </TableCell>
                                        <TableCell align="left" style={{ maxWidth: "250px" }}>
                                            {productMap[row?.sku] ? (
                                                <Link
                                                    href={`/cms/product/edit?productCode=${productMap[row?.sku]?.code}`}
                                                    prefetch={false}>
                                                    <a style={{
                                                        textDecoration: "none",
                                                        cursor: "pointer",
                                                        color: "green"
                                                    }}>
                                                        <Tooltip
                                                            title={`Nhấn để xem chi tiết sản phẩm: ${productMap[row?.sku]?.name}`}>
                                                            <span>
                                                                {productMap[row?.sku]?.name || "-"}
                                                            </span>


                                                        </Tooltip>
                                                    </a>

                                                </Link>
                                            ) : "-"}
                                        </TableCell>
                                        <TableCell>{row.fulfill ? `${roundingNumber(row.fulfill)}%` : "-"}</TableCell>
                                        <TableCell>
                                            <ProductFulfillmentStatusButton status={row.status} />
                                        </TableCell>
                                        <TableCell>

                                            {row.isValid ? <span style={{ color: "green", fontWeight: "bold" }}>
                                                Đạt yêu cầu
                                            </span> : (
                                                <span style={{ color: "red", fontWeight: "bold" }}>
                                                    Không đạt yêu cầu
                                                </span>
                                            )}
                                        </TableCell>

                                        <TableCell style={{ maxWidth: "300px" }}>
                                            {row.failReason}
                                        </TableCell>

                                    </TableRow>
                                )})}

                                {data?.length === 0 && (
                                    <TableRow >
                                        <TableCell colSpan={3} align="left">{info.status === "IN_PROCESS" ? "Đang kiểm tra tỉ lệ fulfill của các sản phẩm. Vui lòng đợi trong giây lát." : "Không tìm thấy thông tin danh sách sản phẩm"}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>

                            <MyTablePagination
                                labelUnit="sản phẩm"
                                count={total}
                                rowsPerPage={limit}
                                page={page}
                                onChangePage={handlePageChange}
                            />

                        </Table>
                    </TableContainer>

                </MyCard>

            </AppMarketing >
        </AuthorizationScreen>
    )
}