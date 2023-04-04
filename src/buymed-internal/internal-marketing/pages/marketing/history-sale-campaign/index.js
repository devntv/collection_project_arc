import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import React, { useState } from 'react';
import Head from 'next/head';
import AppMarketing from 'pages/_layout';
import { MyCard, MyCardActions, MyCardHeader, MyCardContent } from "@thuocsi/nextjs-components/my-card/my-card";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import {
    Box,
    Button, Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Tabs, Tooltip, IconButton, Switch, Chip
} from "@material-ui/core";
import { useRouter } from "next/router";
import { formatDateTime, formatNumber } from "components/global";
import Link from "next/link";
import { getSaleCampaignClient } from "client/saleCampaign";
import { getOrderClient } from "client/order";
import { getCustomerClient } from "client/customer";
import { HistoryFilter } from "containers/history-sale-campaign/HistoryFilter";
import PhoneIcon from '@material-ui/icons/Phone';
import { getProductClient } from "client/product";
import { getSellerClient } from "client/seller";

function startDate(time) {
    const start = new Date(time);
    start.setHours(0, 0, 0, 0)
    return start.toISOString()
}

function endDate(time) {
    const end = new Date(time);
    end.setHours(23, 59, 59, 999);
    return end.toISOString()
}

export async function loadData(ctx) {
    const props = {
        filterData: {},
        data: [],
        count: {
            all: 0,
            bought: 0,
        },
        orderMap: {},
        customerMap: {},
        productMap: {},
        total: 0,
        sellerMap: {},
        campaignMap: {}
    };

    let data = { props };
    let query = ctx.query;
    let page = parseInt(query.page) || 0;
    let limit = parseInt(query.limit) || 20;
    let offset = page * limit;
    let q = JSON.parse(query.q ?? "{}");
    let tab = query.tab ?? ""

    const filterData = q;

    if((filterData.orderId || filterData.customerId) && query?.isFilter === "true") tab = "BOUGHT"

    if (filterData.createdTimeFrom) filterData.createdTimeFrom = startDate(filterData.createdTimeFrom)
    if (filterData.createdTimeTo) filterData.createdTimeTo = endDate(filterData.createdTimeTo)
    if (filterData.orderId) filterData.orderId = Number(filterData.orderId)
    if (filterData.customerId) filterData.customerId = Number(filterData.customerId)

    props.filterData = filterData;

    const resp = tab === "" ? await getSaleCampaignClient(ctx, data).getSaleCampaignProduct(filterData, offset, limit) : await getSaleCampaignClient(ctx, data).getHistorySaleCampaign(filterData, offset, limit)

    if (resp.status === "OK") {
        props.data = resp.data;
        props.total = resp.total ?? 0;
    } else {
        props.data = [];
        props.total = 0
    }

    if (tab === "") {
        props.count.all = props.total;
        const boughtResp = await getSaleCampaignClient(ctx, data).getHistorySaleCampaign(filterData, offset, limit)
        props.count.bought = boughtResp?.total ?? 0
    }
    else {
        props.count.bought = props.total;
        const allResp = await getSaleCampaignClient(ctx, data).getSaleCampaignProduct(filterData, offset, limit)
        props.count.all = allResp?.total ?? 0
    }

    const orderIds = []
    const customerIds = []
    const campaignCodes = []
    const skus = []
    const sellerCodes = []

    resp.data?.map(item => {
        if (item.orderId) orderIds.push(item.orderId)
        if (item.campaignCode) campaignCodes.push(item.campaignCode)
        if (item.sku) skus.push(item.sku)
        if(tab !== "BOUGHT" && item.sellerCode) sellerCodes.push(item.sellerCode)
    })
    //Map campaign
    const campaignResp = await getSaleCampaignClient(ctx, data).getSaleCampaignByCodes(campaignCodes)
    if (campaignResp.status === "OK") {
        campaignResp.data.map(item => {
            props.campaignMap[item.campaignCode] = item
        })
    }


    //Map product
    const productResp = await getProductClient(ctx, data).getProductListBySKUs(skus)
    if (productResp.status === "OK") {
        productResp.data?.map(item => {
            if(tab === "BOUGHT") sellerCodes.push(item.sku.sellerCode)
            
            props.productMap[item.sku?.code] = item
        })
    }

    const sellerResp = await getSellerClient(ctx, data).getSellerBySellerCodes(sellerCodes)
    if (sellerResp.status === "OK") {
        sellerResp.data?.map(item => {
            props.sellerMap[item.code] = item
        })
    }

    if (tab === "BOUGHT") {
        //Map order
        const orderResp = await getOrderClient(ctx, data).getOrderByOrderIds(orderIds)
        if (orderResp.status === "OK") {
            orderResp.data?.map(order => {
                customerIds.push(order.customerId)
                props.orderMap[order.orderId] = order
            })
        }

        //Map customer
        const customerResp = await getCustomerClient(ctx, data).getCustomerByIDs(customerIds)
        if (customerResp.status === "OK") {
            customerResp.data?.map(customer => {
                props.customerMap[customer.customerID] = customer
            })
        }
    }


    return data
}

export async function getServerSideProps(ctx) {
    return doWithLoggedInUser(ctx, (cbCtx) => loadData(cbCtx));
}

function cleanData(data) {
    for (let key in data) {
        !data[key] && delete data[key]
    }
    return JSON.stringify(data)
}


function HistorySaleCampaignPage(props) {
    // console.log(props)
    const { customerMap, orderMap, campaignMap, productMap, sellerMap } = props
    let router = useRouter();
    const q = JSON.parse(router.query.q || "{}")
    const page = +(router.query?.page || 0);
    const limit = +(router.query?.limit || 20);
    const count = props.count || {};

    const total = props.total || 0;
    const data = props.data || [];

    let valueTab = 0

    switch (router.query.tab) {
        case "":
            valueTab = 0;
            break;
        case "BOUGHT":
            valueTab = 1;
            break;
    }
    
    if((q?.orderId || q?.customerId) && router.query.isFilter == "true") valueTab = 1

    const handlePageChange = (_, page, rowsPerPage) => {
        router.push({
            pathname: "/marketing/history-sale-campaign",
            query: {
                ...router.query,
                limit: rowsPerPage,
                page,
            },
        });
    };

    const handleTabChange = (index, value = {}) => {

        try {
            const tab = value.status

            router.push({
                pathname: `/marketing/history-sale-campaign`,
                query: {
                    ...router.query,
                    tab,
                    isFilter: false
                }
            }).then()
        } catch (error) {
            console.log(error)
        }
    };


    const handleApplyFilter = async (data) => {

        router.push({
            pathname: "/marketing/history-sale-campaign",
            query: {
                ...router.query,
                q: JSON.stringify(data),
                page: 0,
                limit: limit,
                isFilter: true,
            }
        });
    };

    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing"
        },
        {
            name: "Lịch sử tham gia chương trình khuyến mãi",
        }
    ]

    return (
        <AppMarketing select="/marketing/history-sale-campaign" breadcrumb={breadcrumb}>
            <Head>
                <title>Lịch sử tham gia chương trình khuyến mãi</title>
            </Head>

            <MyCard>

                <MyCardHeader title={"Lịch sử tham gia chương trình khuyến mãi"} />

                <HistoryFilter
                    open={true}
                    onFilterChange={handleApplyFilter}
                    filterData={props.filterData}
                    router={router}

                />

            </MyCard>


            <Tabs
                value={valueTab}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
            >
                <Tab
                    index={0}
                    label={`Tất cả (${count.all || "0"}) `}
                    onClick={() => handleTabChange(0, { status: "" })}
                />
                <Tab
                    index={1}
                    label={`Đã mua (${count.bought || "0"}) `}
                    onClick={() => handleTabChange(1, { status: "BOUGHT" })}
                />
            </Tabs>


            <MyCard>
                <TableContainer>
                    <Table>
                        <colgroup>
                            <col width="5%" />
                        </colgroup>

                        <TableHead>
                            <TableRow>
                                <TableCell align="left"> STT</TableCell>
                                <TableCell align="left"> Banner</TableCell>
                                <TableCell align="left"> Tên CTKM</TableCell>

                                <TableCell align="left"> Hình ảnh</TableCell>
                                <TableCell align="left"> SKU</TableCell>
                                <TableCell align="left"> Sản phẩm</TableCell>


                                <TableCell align="left"> Nhà bán hàng</TableCell>
                                {valueTab === 1 && (
                                    <>
                                        <TableCell align="center">ID ĐƠN HÀNG/ KHÁCH HÀNG</TableCell>

                                        <TableCell align="left">SỐ LƯỢNG</TableCell>

                                        <TableCell align="left">THỜI GIAN</TableCell>
                                    </>
                                )}


                                {valueTab === 0 && (
                                    <>
                                        <TableCell align="left">Đã bán/Số lượng</TableCell>
                                    </>
                                )}




                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data?.length > 0 && data.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell align="left"> {page * limit + index + 1}
                                    </TableCell>
                                    <TableCell align="left">
                                        {campaignMap[row.campaignCode]?.banner && (
                                            <img src={campaignMap[row.campaignCode]?.banner} alt={campaignMap[row.campaignCode]?.campaignName} width={130}
                                                height={70} />
                                        )}


                                    </TableCell>

                                    <TableCell align="left"> {campaignMap[row.campaignCode]?.campaignName ?? " - "}
                                    </TableCell>

                                    <TableCell align="left">{productMap[row.sku]?.product?.imageUrls[0] && (
                                        <img src={productMap[row.sku]?.product?.imageUrls[0]} alt={productMap[row.sku]?.product?.name} width={70}
                                            height={70} />
                                    )}</TableCell>

                                    <TableCell align="left">{row.sku ?? ""}</TableCell>

                                    <TableCell align="left">
                                        <Link
                                            href={`/cms/product/edit?productCode=${productMap[row.sku]?.product?.code || ""}`}
                                            prefetch={false}>
                                            <Tooltip
                                                title={`Nhấn để xem chi tiết sản phẩm ${productMap[row.sku]?.product?.name||  ""}`}>
                                                <a color="primary" style={{
                                                    textDecoration: "none !important",
                                                    cursor: "pointer",
                                                    color: "green"
                                                }}>
                                                    {productMap[row.sku]?.product?.productID || ""} - {productMap[row.sku]?.product?.name ?? " Không xác định "}
                                                </a>
                                            </Tooltip>
                                        </Link>

                                        </TableCell>

                                    {valueTab === 0 && (
                                        <TableCell align="left">{sellerMap[row.sellerCode]?.name ?? " - "}</TableCell>
                                    )}

                                    {valueTab === 1 && (
                                        <TableCell align="left">{sellerMap[productMap[row.sku]?.sku.sellerCode]?.name ?? " - "}</TableCell>
                                    )}

                                    {valueTab === 1 && (
                                        <>
                                            <TableCell align="center">
                                                <Link
                                                    href={`/crm/order/detail?orderId=${row.orderId}`}
                                                    prefetch={false}>
                                                    <Tooltip
                                                        title={`Nhấn để xem chi tiết đơn hàng ${row.orderId ?? ""}`}>
                                                        <a color="primary" style={{
                                                            textDecoration: "none !important",
                                                            cursor: "pointer",
                                                            color: "#00b46e"
                                                        }}>
                                                            {row.orderId ?? ""}
                                                        </a>
                                                    </Tooltip>
                                                </Link>
                                                <br />

                                                <Link
                                                    href={`/crm/customer/detail?customerCode=${customerMap[row.customerId]?.code}`}
                                                    prefetch={false}>
                                                    <Tooltip
                                                        title={`Nhấn để xem chi tiết khách hàng ${customerMap[row.customerId]?.name || ""}`}>
                                                        <a color="primary" style={{
                                                            textDecoration: "none !important",
                                                            cursor: "pointer",
                                                            color: "#00b46e"
                                                        }}>
                                                            {(row.customerId ?? "") + " - " + (customerMap[row.customerId]?.name || "NAME")}
                                                        </a>
                                                    </Tooltip>
                                                </Link>
                                                <br />


                                                <Chip
                                                    icon={<PhoneIcon />}
                                                    label={customerMap[row.customerId]?.phone || "0909090"}
                                                />

                                            </TableCell>

                                            <TableCell align="left">{row.quantity}</TableCell>
                                            <TableCell align="left">
                                                {formatDateTime(orderMap[row.orderId]?.createdTime)}
                                            </TableCell>
                                        </>
                                    )}


                                    {valueTab === 0 && (
                                        <>
                                            <TableCell align="left">
                                                {formatNumber(row.soldQuantity) || 0} / {formatNumber(row.quantity) || 0}
                                            </TableCell>
                                        </>
                                    )}


                                </TableRow>
                            ))}


                            {data.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} align="left">
                                        Không tìm thấy lịch sử tham gia chương trình khuyến mãi
                                    </TableCell>
                                </TableRow>

                            )}
                        </TableBody>
                        <MyTablePagination
                            labelUnit="lịch sử"
                            count={valueTab === 0 ? count.all : count.bought}
                            rowsPerPage={limit}
                            page={page}
                            onChangePage={handlePageChange}
                        />


                    </Table>


                </TableContainer>
            </MyCard>

        </AppMarketing>
    )

};

export default function HistorySaleCampaign(props) {
    return renderWithLoggedInUser(props, HistorySaleCampaignPage);
}
