import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Box } from "@material-ui/core";
import PhoneIcon from '@material-ui/icons/Phone';
import { doWithLoggedInUser, renderWithLoggedInUser } from "@thuocsi/nextjs-components/lib/login";
import { MyCard, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import AppMarketing from "pages/_layout";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import { getCustomerClient } from "client/customer";
import { formatDateTime, formatNumber } from "components/global";
import React from "react";
import { HistoryDealSearch } from "containers/history-deal/HistoryDealSearch";
import { getOrderClient } from "client/order";
import Chip from "@material-ui/core/Chip";
import styles from "pages/marketing/history-loyalty/styple.module.css";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getProductClient } from "client/product";
import AuthorizationScreen from "components/authorization-screen";


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
        historyDeal: [],
        customerMap: {},
        orderMap: {},
        message: "",
        count: 0,
        product: {},
    }
    const data = { props };

    const { query } = ctx;
    const { q = '', page = 0, limit = 20 } = query;
    const offset = page * limit;
    const filter = q !== '' ? JSON.parse(q) : {};
    if (filter.timeFrom) filter.timeFrom = startDate(filter.timeFrom)
    if (filter.timeTo) filter.timeTo = endDate(filter.timeTo);

    if (query?.dealCode) {
        const orderClient = getOrderClient(ctx, data);
        const orderItemHasDealResp = await orderClient.getOrderItemList({ q: JSON.stringify({ dealCode: query.dealCode }), offset, limit });
        if (orderItemHasDealResp.status !== "OK") return {
            props: {
                count: 0,
                historyDeal: null
            }
        }

        props.historyDeal = orderItemHasDealResp.data;
        props.count = orderItemHasDealResp.total;

        const customerIds = [];
        let productCode = orderItemHasDealResp.data[0].productCode;


        const orderIds = orderItemHasDealResp.data.map(item => (item.orderId));
        const orderList = await orderClient.getOrderByOrderIds(orderIds);
        if (orderList.status === "OK") {
            orderList.data.map(order => {
                props.orderMap[order.orderId] = order;
                customerIds.push(order.customerId)
            })
        }

        const customerClient = getCustomerClient(ctx, data);

        const listCustomer = await customerClient.getCustomerByIDs(customerIds);
        if (listCustomer.status === "OK") {
            listCustomer.data.map(cus => {
                props.customerMap[cus.customerID] = cus
            })
        }

        const productClient = getProductClient(ctx, data);
        const product = await productClient.getListProductByCodes([productCode]);
        if (product.status === "OK") props.product = product.data[0]

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
            link: "/marketing"
        },
        {
            name: "Danh sách deal",
            link: "/marketing/deal"
        },
        {
            name: "Lịch sử sử dụng deal",
        },
    ];
    const router = useRouter();
    const dealCode = router.query.dealCode || "";
    const page = +(router.query?.page || 0);
    const limit = +(router.query?.limit || 20);
    let count = props.count;
    const historyDeal = props.historyDeal || null;
    const { orderMap, customerMap } = props;

    const handlePageChange = async (event, page, rowsPerPage) => {
        await router.push({
            pathname: "/marketing/history-deal",
            query: {
                ...router.query,
                page: page,
                limit: rowsPerPage
            }
        });
    };

    return (
        <AppMarketing breadcrumb={breadcrumb}>
            <Head>
                <title>Lịch sử sử dụng deal</title>
            </Head>

            <AuthorizationScreen>
                <Box>
                    <HistoryDealSearch />
                </Box>
                {dealCode !== "" ? (
                    <React.Fragment>
                        <MyCard>
                            <MyCardHeader title={`Lịch sử dùng deal ${dealCode}`} small={true}>
                            </MyCardHeader>
                        </MyCard>
                        <MyCard>
                            <TableContainer>
                                <Table>
                                    <colgroup>
                                        <col width="5%" />
                                    </colgroup>
                                    <TableHead>

                                        <TableRow>
                                            <TableCell align="left">#</TableCell>
                                            {/* <TableCell align="left">Deal</TableCell> */}
                                            <TableCell align="center">Khách hàng</TableCell>
                                            <TableCell align="left">ID đơn hàng</TableCell>
                                            <TableCell align="left">Sản phẩm</TableCell>
                                            <TableCell align="left">SKU</TableCell>
                                            <TableCell align="left">Đơn giá</TableCell>
                                            <TableCell align="left">Số lượng</TableCell>

                                            <TableCell align="left">Tổng tiền
                                                <Tooltip title="Tổng tiền sản phẩm áp dụng deal trong đơn hàng">
                                                    <span><FontAwesomeIcon icon={faQuestionCircle} />
                                                    </span>
                                                </Tooltip>
                                            </TableCell>

                                            <TableCell align="left">Thời gian sử dụng</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {historyDeal?.map((data, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="left">{index + 1 + (page * limit)}</TableCell>
                                                {/* <TableCell></TableCell> */}
                                                <TableCell align="center">
                                                    <Link
                                                        href={`/crm/customer/detail?customerCode=${customerMap[orderMap[data.orderId]?.customerId]?.code}`}
                                                        prefetch={false}>
                                                        <Tooltip
                                                            title={`Nhấn để xem chi tiết khách hàng ${customerMap[orderMap[data.orderId]?.customerId]?.name}`}>
                                                            <a color="primary" className={styles.cartLink} >
                                                                {orderMap[data.orderId]?.customerId + " - " + customerMap[orderMap[data.orderId]?.customerId]?.name}
                                                            </a>
                                                        </Tooltip>
                                                    </Link>
                                                    {
                                                        customerMap[orderMap[data.orderId]?.customerId]?.phone && (
                                                            <p>
                                                                <Chip
                                                                    icon={<PhoneIcon />}
                                                                    label={props.customerMap[orderMap[data.orderId]?.customerId]?.phone}
                                                                />
                                                            </p>
                                                        )
                                                    }

                                                </TableCell>
                                                <TableCell align="left">
                                                    <Link
                                                        href={`/crm/order/detail?orderId=${data.orderId}&orderCode=${data.orderCode}`}
                                                        prefetch={false}>
                                                        <Tooltip
                                                            title={`Nhấn để xem chi tiết đơn hàng ${data.orderId}`}>
                                                            <a color="primary" className={styles.cartLink}>
                                                                {data.orderId}
                                                            </a>
                                                        </Tooltip>
                                                    </Link>
                                                </TableCell>

                                                <TableCell>{props.product?.name ?? "-"}</TableCell>

                                                <TableCell>{data.sku}</TableCell>

                                                <TableCell>{formatNumber(data.price)}</TableCell>

                                                <TableCell>{data.quantity}</TableCell>


                                                <TableCell>{formatNumber(data.totalPrice)}</TableCell>
                                                <TableCell>{formatDateTime(orderMap[data.orderId]?.createdTime) || "-"}</TableCell>
                                            </TableRow>
                                        ))}
                                        {!historyDeal && (
                                            <TableRow>
                                                <TableCell colSpan={8} align="left">Không tìm thấy thông tin</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                    <MyTablePagination
                                        labelUnit="lượt sử dụng"
                                        count={count}
                                        rowsPerPage={limit}
                                        page={page}
                                        onChangePage={handlePageChange}
                                    />
                                </Table>
                            </TableContainer>
                        </MyCard>

                    </React.Fragment>
                ) : <></>}
            </AuthorizationScreen>

        </AppMarketing>
    )
}

export default function CartPage(props) {
    return renderWithLoggedInUser(props, render);
}
