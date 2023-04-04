import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, } from "@material-ui/core";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import { doWithLoggedInUser, renderWithLoggedInUser, } from "@thuocsi/nextjs-components/lib/login";
import { MyCard, MyCardHeader, } from "@thuocsi/nextjs-components/my-card/my-card";
import AppMarketing from "pages/_layout";
import Head from "next/head";
import { getHistoryVoucherClient } from "client/history-voucher";
import { HistoryVoucherFilter } from "containers/history-voucher/HistoryVoucherFilter";
import { getPromoClient } from "client/promo";
import TabNotUse from "containers/history-voucher/tabNotUse";
import TabHasVoucher from "containers/history-voucher/tabHasVoucher";
import { getCartClient } from "client/cart";
import { getOrderClient } from "client/order"
import { getProductClient } from "client/product";
import { getCustomerClient } from "client/customer";
import TabHasOrder from "containers/history-voucher/tabHasOrder";
import { getFirst } from "components/global";

function startDate(time) {
    const start = new Date(time);
    start.setHours(0, 0, 0, 0)
    start.setTime(start.getTime() - (7 * 60 * 60 * 1000))
    return start.toISOString()
}

function endDate(time) {
    const end = new Date(time);
    end.setHours(23, 59, 59, 999);
    end.setTime(end.getTime() - (7 * 60 * 60 * 1000))
    return end.toISOString()
}

async function handleOrderDiscountResult(list, context, data) {
    let skus = []
    let voucherResultMap = {}
    list?.forEach(order => {
        if (order.redeemApplyResult?.length > 0) {
            let result = order.redeemApplyResult.filter(item => item.canUse) || []
            if (result.length > 0) {
                let voucherMap = {}
                result.forEach(voucher => {
                    voucherMap[voucher.code] = voucher
                    voucher.gifts?.forEach(gift => {
                        skus.push(gift.sku)
                    })
                })
                voucherResultMap[order.orderId] = voucherMap
            }
        }
        return order
    })

    let mapSku = {}
    if (skus.length > 0) {
        const skuResp = await getProductClient(context, data).getProductListBySKUs(skus)
        if (skuResp.status === "OK") {
            skuResp.data?.forEach((item) => {
                mapSku[item.sku.code] = item
            })
        }
    }

    return { voucherResultMap, mapSku }


}

async function getListPromotion(list, context, data) {
    const promoClient = getPromoClient(context, data);
    const promotionMap = {};
    const listPromotionId = [];
    let skuList = []

    list?.forEach((item) => {
        if (item) {
            if (item.promotionId) listPromotionId.push(item.promotionId);
            if (item.rewards?.[0]?.gifts?.length > 0) {
                item.rewards?.[0]?.gifts?.map(gift => {
                    skuList.push(gift.sku)
                })
            }
        }
    });

    const promotionRes = await promoClient.getPromotionByIDs(listPromotionId);
    if (promotionRes.status === "OK") {
        promotionRes.data?.forEach((promo) => {
            promotionMap[promo.promotionId] = promo;
        });
    }

    const productClient = getProductClient(context, data);
    const productRes = await productClient.getProductListBySKUs([...new Set(skuList)]);

    const productMap = {}
    if (productRes.status === "OK") {
        productRes.data?.forEach(product => {
            productMap[product.sku.code] = product
        })
    }
    return { promotionMap, productMap };
}


async function getListCustomer(listId, context, data) {
    const customerClient = getCustomerClient(context, data);
    const customerMap = {};

    const customerRes = await customerClient.getCustomerByIDs(listId);
    if (customerRes.status === "OK") {
        customerRes.data?.forEach(customer => {
            customerMap[customer.customerID] = customer;
        })
    }
    return customerMap;
}

async function getListHistoryVoucherByCode(listCode, context, data, limit) {
    const historyVoucherClient = getHistoryVoucherClient(context, data);

    let props = {
        historyVoucher: [],
        count: 0,
        promotionMap: [],
        productMap: [],
    }

    const historyVoucherRes = await historyVoucherClient.getHistoryVoucherByIDs(listCode);
    const historyVoucherList = {};

    if (historyVoucherRes.status === "OK") {
        let code = [];
        historyVoucherRes.data?.forEach(voucher => {
            historyVoucherList[voucher.code] = voucher;
            code.push(voucher.code)
        })

        props.count = historyVoucherRes.total;
        const promotion = await getListPromotion(historyVoucherRes.data, context, data);
        props.promotionMap = promotion.promotionMap;
        props.productMap = promotion.productMap;
        props.historyVoucher = historyVoucherList;
    }

    return { props }

}

export async function loadData(context) {
    const props = {
        historyVoucherNotUse: [],
        historyVoucherHasCart: {},
        historyVoucherHasOrder: {},
        promotionMap: {},
        productMap: {},
        count: {
            notUse: 0,
            hasOrder: 0,
            hasCart: 0,
        },
        cartMap: [],
        orderMap: [],
        customerMap: {},
        orderDiscountMap: {}
    };
    const data = { props };
    const { query } = context;

    const { q = '', page = 0, limit = 20 } = query;
    const filter = q !== '' ? JSON.parse(q) : {};
    const offset = page * limit;
    if (filter.timeFrom) filter.timeFrom = startDate(filter.timeFrom)
    if (filter.timeTo) filter.timeTo = endDate(filter.timeTo)

    const historyVoucherClient = getHistoryVoucherClient(context, data);

    let types = ["", "hasCart", "hasOrder"];

    const customerClient = getCustomerClient(context, data);
    if (filter.customerPhone?.length > 0) {
        const customerRes = await customerClient.getCustomer(0, 0, { "phone": filter.customerPhone });
        const customerInfo = getFirst(customerRes);
        if (customerInfo && (filter.customerId === customerInfo.customerID || !filter.customerId)) {
            filter.customerId = customerInfo.customerID;
            delete filter.customerPhone
        } else {
            if (!filter.customerId) filter.customerId = -1;
        }
    }

    await Promise.all(types.map(async type => {
        if (type === "hasCart") {

            let filterCart = { ...filter }
            if (filter.timeFrom) delete filterCart.timeFrom;
            if (filter.timeTo) delete filterCart.timeTo;
            if (filter.code) filterCart = { ...filter, redeemCode: [`${filter.code}`] }

            // if(filter.orderId) filterCart.cartId = filter.orderId;

            let limitCart = limit;
            let offsetCart = offset;

            if (query.type === "hasOrder" || query.type === "") { limitCart = 20; offsetCart = 0 }


            const cartClient = getCartClient(context, data);
            let cartHasVoucherRes = await cartClient.getCartListHasVoucher(filterCart, limitCart, offsetCart);

            if (cartHasVoucherRes.status === "OK") {

                const listVoucherCode = [];
                const listCustomerId = [];
                props.cartMap = cartHasVoucherRes.data;
                props.count.hasCart = cartHasVoucherRes.total;

                if (query.type === "hasCart") {

                    cartHasVoucherRes.data?.forEach(data => {
                        if (data.redeemCode) {
                            data.redeemCode?.forEach(item => {
                                listVoucherCode.push(item);
                            })
                        }
                        listCustomerId.push(data.customerId);
                    })

                    const list = [...new Set(listVoucherCode)]

                    const res = await getListHistoryVoucherByCode(list, context, data);
                    props.historyVoucherHasCart = res.props.historyVoucher;
                    props.promotionMap = res.props.promotionMap;
                    props.productMap = res.props.productMap;
                    props.customerMap = await getListCustomer(listCustomerId, context, data)
                }
            }

        }

        if (type === "hasOrder") {

            let filterOrder = { ...filter }
            if (filter.code) filterOrder = { ...filter, redeemCode: [`${filter.code}`] }

            let limitOrder = limit;
            let offsetOrder = offset;

            if (query.type === "hasCart" || query.type === "") { limitOrder = 20; offsetOrder = 0 }

            const orderClient = getOrderClient(context, data);

            let orderHasVoucherRes = await orderClient.getOrderHasVoucher(filterOrder, limitOrder, offsetOrder);

            if (orderHasVoucherRes.status === "OK") {

                const listVoucherCode = [];
                const listCustomerId = [];
                props.orderMap = orderHasVoucherRes.data.filter(order => {
                    return order.redeemCode
                });
                props.count.hasOrder = orderHasVoucherRes.total;
                if (orderHasVoucherRes.total < limit) props.count.hasOrder = props.orderMap.length;

                if (query.type === "hasOrder") {
                    orderHasVoucherRes.data?.forEach(data => {
                        if (data.redeemCode) {
                            data.redeemCode?.forEach(item => {
                                listVoucherCode.push(item);
                            })
                        }
                        listCustomerId.push(data.customerId);
                    })

                    const list = [...new Set(listVoucherCode)]

                    const res = await getListHistoryVoucherByCode(list, context, data);
                    props.historyVoucherHasOrder = res.props.historyVoucher;
                    props.promotionMap = res.props.promotionMap;
                    props.productMap = res.props.productMap;
                    props.customerMap = await getListCustomer(listCustomerId, context, data);

                    const result = await handleOrderDiscountResult(props.orderMap, context, data)
                    props.orderDiscountMap = result.voucherResultMap
                    props.productMap = { ...props.productMap, ...result.mapSku }
                }
            }
        }
        if (type === "") {

            let newFilter = { ...filter };
            if (filter.timeFrom) delete newFilter.timeFrom;
            if (filter.timeTo) delete newFilter.timeTo;

            let newlimit = limit;
            let newOffset = offset;
            if (query.type === "hasOrder" || query.type === "hasCart") { newlimit = 20; newOffset = 0 }

            let historyVoucherRes =
                await historyVoucherClient.getHistoryVoucherList({ ...newFilter }, newlimit, newOffset, "NOT_USED");

            if (historyVoucherRes.status === "OK" && historyVoucherRes?.data?.length > 0) {
                let voucherData = historyVoucherRes.data
                props.historyVoucherNotUse = voucherData;
                props.count.notUse = historyVoucherRes.total;
                if (query.type !== "hasOrder" && query.type !== "hasCart") {
                    const promotion = await getListPromotion(voucherData, context, data);
                    props.productMap = promotion.productMap;
                    props.promotionMap = promotion.promotionMap;
                }

            }

        }
    }))

    return { props };
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
    // console.log(props)
    const router = useRouter();
    const page = +(router.query?.page || 0);
    const limit = +(router.query?.limit || 20);

    const { historyVoucherNotUse, historyVoucherHasCart, historyVoucherHasOrder, cartMap, orderMap, count, promotionMap, productMap, customerMap, orderDiscountMap } = props;
    const [valueTab, setValueTab] = useState(0);

    let q = JSON.parse(router.query.q || "{}");

    const [mcount, setCount] = useState(0)


    useEffect(() => {
        switch (router.query?.type) {
            case "hasOrder":
                setCount(count.hasOrder);
                setValueTab(2)
                break;
            case "hasCart":
                setCount(count.hasCart);
                setValueTab(1)
                break;
            default:
                setCount(count.notUse)
                setValueTab(0)
                break;
        }
    }, [router.query])


    const handleTabChange = async (tab, type) => {

        const q = router.query.q || "{}";
        let query = JSON.parse(q);

        router.push({
            pathname: `/marketing/history-voucher`,
            query: {
                q: cleanData(query),
                type,
            }
        }).then()
    };

    const handlePageChange = async (event, page, rowsPerPage) => {
        await router.push({
            pathname: "/marketing/history-voucher",
            query: {
                ...router.query,
                page: page,
                limit: rowsPerPage,
            },
        });
    };

    const breadcrumb = [
        {
            name: "Trang chủ",
            link: "/marketing",
        },
        {
            name: "Danh sách lịch sử dùng mã khuyến mãi của khách hàng",
        },
    ];

    // useEffect(() => {

    // }, [])

    return (
        <AppMarketing breadcrumb={breadcrumb}>
            <Head>
                <title>Danh sách lịch sử dùng mã khuyến mãi của khách hàng</title>
            </Head>
            <MyCard>
                <MyCardHeader
                    title="Lịch sử dùng mã khuyến mãi của khách hàng"
                // small={true}
                ></MyCardHeader>
                <HistoryVoucherFilter />
            </MyCard>

            <Tabs
                value={valueTab}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
            >
                <Tab
                    index={0}
                    label={`Chưa sử dụng (${count.notUse || 0})`}
                    onClick={() => handleTabChange(0, "")}
                />
                <Tab
                    index={1}
                    label={`Đang trong giỏ hàng (${count.hasCart || 0})`}
                    onClick={() => handleTabChange(1, "hasCart")}
                />
                <Tab
                    index={2}
                    label={`Đã sử dụng (${count.hasOrder || 0})`}
                    onClick={() => handleTabChange(2, "hasOrder")}
                />
            </Tabs>

            <MyCard>
                <TableContainer>
                    <Table>
                        <colgroup>
                            <col width="5%" />
                            {valueTab === 1 && (
                                <>
                                    <col width="25%" />
                                    <col width="20%" />
                                    <col width="25%" />
                                    <col width="25%" />
                                </>
                            )}
                            {valueTab === 2 && (
                                <>
                                    <col width="20%" />
                                    <col width="15%" />
                                    <col width="10%" />
                                    <col width="25%" />
                                    <col width="25%" />
                                </>
                            )}
                        </colgroup>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">STT</TableCell>
                                {valueTab !== 0 ? (
                                    <React.Fragment>
                                        <TableCell align="left">Khách hàng</TableCell>
                                        <TableCell align="left">Đơn hàng</TableCell>
                                        {valueTab === 2 && <TableCell align="left">Ngày sử dụng</TableCell>}
                                        <TableCell align="left">Thông tin khuyến mãi 1</TableCell>
                                        <TableCell align="left">Thông tin khuyến mãi 2</TableCell>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <TableCell align="left">Tên chương trình</TableCell>
                                        <TableCell align="left">Mã khuyến mãi</TableCell>
                                        <TableCell align="left">Loại mã</TableCell>
                                        <TableCell align="left">Giá trị khuyến mãi</TableCell>
                                        <TableCell align="left">Hạn sử dụng</TableCell>
                                        <TableCell align="left" width="150px">Trạng thái mã</TableCell>
                                        <TableCell align="left" width="150px">Trạng thái CT</TableCell>
                                    </React.Fragment>
                                )}
                            </TableRow>
                        </TableHead>


                        <TableBody>
                            {valueTab === 0 && (<TabNotUse historyVoucher={historyVoucherNotUse} productMap={productMap} promotionMap={promotionMap} page={page} limit={limit} />)}
                            {valueTab === 1 && (<TabHasVoucher historyVoucher={historyVoucherHasCart} promotionMap={promotionMap} page={page} productMap={productMap} limit={limit} cartMap={cartMap} customerMap={customerMap} />)}
                            {valueTab === 2 && (<TabHasOrder historyVoucher={historyVoucherHasOrder} productMap={productMap} promotionMap={promotionMap} page={page} limit={limit} orderMap={orderMap} customerMap={customerMap} orderDiscountMap={orderDiscountMap} />)}
                        </TableBody>

                        <MyTablePagination
                            labelUnit="lịch sử dùng mã khuyến mãi"
                            count={mcount}
                            rowsPerPage={limit}
                            page={page}
                            onChangePage={handlePageChange}
                        />
                    </Table>
                </TableContainer>
            </MyCard>
        </AppMarketing>
    );
}

export default function HistoryVoucherPage(props) {
    return renderWithLoggedInUser(props, render);
}
