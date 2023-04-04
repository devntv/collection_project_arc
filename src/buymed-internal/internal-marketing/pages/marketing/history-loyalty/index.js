import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";
import {Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Tooltip} from "@material-ui/core";
import PhoneIcon from '@material-ui/icons/Phone';
import {doWithLoggedInUser, renderWithLoggedInUser} from "@thuocsi/nextjs-components/lib/login";
import {MyCard, MyCardHeader} from "@thuocsi/nextjs-components/my-card/my-card";
import AppMarketing from "pages/_layout";
import {HistoryLoyaltyFilter} from "containers/history-loyalty/HistoryLoyaltyFilter";
import styles from './styple.module.css';
import {getHistoryLoyaltyClient} from "client/history-loyalty";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import {getCustomerClient} from "client/customer";
import {formatDateTime} from "components/global";
import React from "react";
import {getFirst} from "../../../components/global";
import Chip from "@material-ui/core/Chip";


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
        historyLoyalties: [],
        customerMap: {},
        message: "",
        count: {},
        total: 0
    }

    const data = {props};
    const {query} = ctx;
    const {q = '', page = 0, limit = 20} = query;
    const offset = page * limit;
    const filter = q !== '' ? JSON.parse(q) : {};
    if (filter.timeFrom) filter.timeFrom = startDate(filter.timeFrom)
    if (filter.timeTo) filter.timeTo = endDate(filter.timeTo)

    const historyLoyaltyClient = getHistoryLoyaltyClient(ctx, data);
    const customerClient = getCustomerClient(ctx, data);

    if (filter.customerPhone?.length > 0) {
        const customerRes = await customerClient.getCustomer(0, 0, {"phone": filter.customerPhone});
        const customerInfo = getFirst(customerRes);
        if (customerInfo && (filter.customerId === customerInfo.customerID || !filter.customerId)) {
            filter.customerId = customerInfo.customerID;
        } else {
            filter.customerId = -1;
        }
    }

    let types = ["", "INCREMENT", "DECREMENT"]

    let historyLoyaltyRes = await historyLoyaltyClient.getHistoryLoyaltyList(filter, limit, offset);
    if (historyLoyaltyRes.status === "OK") {
        props.historyLoyalties = historyLoyaltyRes.data
        props.total = historyLoyaltyRes.total
        const customerIds = [];
        historyLoyaltyRes.data?.forEach((data) => {
            customerIds.push(data.customerID)
        });

        const customerResp = await customerClient.getCustomerByIDs(customerIds);
        if (customerResp.status === "OK") {
            customerResp.data?.forEach((customer) => {
                props.customerMap[customer.customerID] = customer;
            })
        }
    }

    if (!filter.type) {
        props.count.all = historyLoyaltyRes?.total || 0
        types.splice(0, 1)
    } else {
        props.count[filter.type.toLowerCase()] = historyLoyaltyRes?.total || 0
        types.splice(types.indexOf(filter.type), 1)
    }
    const results = await Promise.all(types.map(type => {
        filter.type = type
        return historyLoyaltyClient.getHistoryLoyaltyList(filter)
    }))
    for (let i = 0; i < types.length; i++) {
        if (types[i] === "") {
            props.count.all = results[i]?.total || 0
        } else {
            props.count[types[i].toLowerCase()] = results[i]?.total || 0
        }
    }

    return data;
}

export async function getServerSideProps(ctx) {
    return await doWithLoggedInUser(ctx, (ctx) => {
        return loadData(ctx);
    });
}

function cleanData(data) {
    for (let key in data) {
        !data[key] && delete data[key]
    }
    return JSON.stringify(data)
}



function render(props) {

    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/crm"
        },
        {
            name: "Danh sách lịch sử điểm tích luỹ",
        },
    ];
    const router = useRouter();
    const page = +(router.query?.page || 0);
    const limit = +(router.query?.limit || 20);
    let count = props.count;
    let q = JSON.parse(router.query.q || "{}");
    let valueTab = 0

    switch (q.type) {
        case "INCREMENT":
            valueTab = 1
            break
        case "DECREMENT":
            valueTab = 2
            break
    }

    const handlePageChange = async (event, page, rowsPerPage) => {
        await router.push({
            pathname: "/marketing/history-loyalty",
            query: {
                ...router.query,
                page: page,
                limit: rowsPerPage
            }
        });
    };

    const handleTabChange = (tab, obj = {}) => {
        try {
            const q = router.query.q || "{}"
            let query = JSON.parse(q)
            for (let k in obj) {
                query[k] = obj[k]
            }

            router.push({
                pathname: `/marketing/history-loyalty`,
                query: {
                    q: cleanData(query),
                }
            }).then()
        } catch (error) {
        }
    };

    return (
        <AppMarketing breadcrumb={breadcrumb}>
            <Head>
                <title>Danh sách lịch sử điểm tích luỹ</title>
            </Head>
            <MyCard>
                <MyCardHeader title="Danh sách lịch sử điểm tích luỹ">
                </MyCardHeader>
                <HistoryLoyaltyFilter/>
            </MyCard>
            <Tabs
                value={valueTab}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
            >
                <Tab label={`Tất cả (${count?.all || 0})`}
                     onClick={() => handleTabChange(0, {type: ""})}
                />
                <Tab label={`Nhận điểm (${count?.increment || 0})`}
                     onClick={() => handleTabChange(1, {type: "INCREMENT"})}
                />
                <Tab label={`Đổi điểm (${count?.decrement || 0})`}
                     onClick={() => handleTabChange(2, {type: "DECREMENT"})}
                />
            </Tabs>
            <MyCard>
                <TableContainer>
                    <Table>
                        <colgroup>
                            <col width="5%"/>
                            <col width="20%"/>
                        </colgroup>
                        <TableHead>

                            <TableRow>
                                <TableCell align="left">STT</TableCell>
                                <TableCell align="center">Khách hàng</TableCell>
                                <TableCell align="left">Điểm</TableCell>
                                {
                                    (valueTab === 0) && (
                                        <TableCell align="left">Loại</TableCell>
                                    )
                                }
                                {
                                    (valueTab === 0 || valueTab === 1) && (
                                        <TableCell align="left">Đơn hàng</TableCell>
                                    )
                                }
                                {
                                    (valueTab === 0 || valueTab === 2) && (
                                        <TableCell align="left">Nội dung</TableCell>
                                    )
                                }
                                <TableCell align="left">Ngày thực hiện</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.historyLoyalties?.map((data, index) => (
                                <TableRow key={data.code}>
                                    <TableCell align="left">{index + 1 + (page * limit)}</TableCell>
                                    <TableCell align="center">
                                        <Link
                                            href={`/crm/customer/detail?customerCode=${props.customerMap[data.customerID]?.code}`}
                                            prefetch={false}>
                                            <Tooltip
                                                title={`Nhấn để xem chi tiết khách hàng ${props.customerMap[data.customerID]?.name}`}>
                                                <a color="primary" className={styles.cartLink}>
                                                    {data.customerID + " - " + props.customerMap[data.customerID]?.name}
                                                </a>
                                            </Tooltip>
                                        </Link>
                                        {
                                            props.customerMap[data.customerID]?.phone && (
                                                <p>
                                                    <Chip
                                                        icon={<PhoneIcon/>}
                                                        label={props.customerMap[data.customerID]?.phone}
                                                    />
                                                </p>
                                            )
                                        }

                                    </TableCell>
                                    <TableCell align="left">
                                        {
                                            data.point > 0 ? (
                                                <span style={{color: "green"}}>
                                                    {"+" + data.point}
                                                </span>
                                            ) : (
                                                <span style={{color: "red"}}>
                                                    {data.point}
                                                </span>
                                            )
                                        }
                                    </TableCell>
                                    {
                                        (valueTab === 0) && (
                                            <TableCell align="left">
                                                {data.type === "INCREMENT" ? "Nhận điểm" : "Đổi điểm"}
                                            </TableCell>
                                        )
                                    }
                                    {
                                        (valueTab === 1 || valueTab === 0) && (
                                            <TableCell align="left">
                                                <Link href={`/crm/order/detail?orderId=${data.orderId}`}
                                                      prefetch={false}>
                                                    <Tooltip title={`Nhấn để xem chi tiết đơn hàng ${data.orderId}`}>
                                                        <a color="primary" className={styles.cartLink}>
                                                            {data.orderId ? (data.orderId + "" + (data.saleOrderCode !== undefined ? (" - " + data.saleOrderCode) : "")) : "-"}
                                                        </a>
                                                    </Tooltip>
                                                </Link>

                                            </TableCell>
                                        )
                                    }
                                    {
                                        (valueTab === 2 || valueTab === 0) && (
                                            <TableCell align="left">
                                                {data.type === "DECREMENT" && data.reason === "RESET" ? 
                                                    "Hệ thống cập nhật điểm tích lũy của khách hàng"
                                                    :
                                                    <Link href={`/marketing/promotion/edit?promotionId=${data.promotionId}`}
                                                        prefetch={false}>
                                                        <Tooltip
                                                            title="Nhấn để xem chi tiết chương trình khuyến mãi">
                                                            <a color="primary" className={styles.cartLink}>
                                                                {data.voucherCode || "-"}
                                                            </a>
                                                        </Tooltip>
                                                    </Link>
                                                }
                                            </TableCell>
                                        )
                                    }
                                    <TableCell>{formatDateTime(data.createdTime) || "-"}</TableCell>
                                </TableRow>
                            ))}
                            {!props.historyLoyalties && (
                                <TableRow>
                                    <TableCell colSpan={7} align="left">Không tìm thấy thông tin</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        <MyTablePagination
                            labelUnit="lịch sử điểm"
                            count={props.total}
                            rowsPerPage={limit}
                            page={page}
                            onChangePage={handlePageChange}
                        />
                    </Table>
                </TableContainer>
            </MyCard>
        </AppMarketing>
    )
}

export default function CartPage(props) {
    return renderWithLoggedInUser(props, render);
}
