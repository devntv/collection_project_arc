import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Tooltip, CircularProgress, Button, Typography, Chip } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { formatDateTime, formatNumber } from "components/global";
import Link from "next/link";
import styles from "./voucher.module.css";
import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import { useForm } from "react-hook-form";
import MuiSingleAuto from "@thuocsi/nextjs-components/muiauto/single";
import { getCustomerClient } from "client/customer";
import { defaultReward, UserPromotionStatusValue } from "components/promotion-voucher/constant";
import PhoneIcon from '@material-ui/icons/Phone';
import { getVoucherClient } from "client/voucher";
import MyTablePagination from "@thuocsi/nextjs-components/my-pagination/my-pagination";
import { getOrderClient } from "client/order";
import { getProductClient } from "client/product";

export function CustomerUsedTable({ code, promotion, voucher, listCustomerDefault, handleSearchCustomer }) {
    const [page, setPage] = useState(0)
    const [total, setTotal] = useState(0)
    const [limit, setLimit] = useState(5)
    const [isLoading, setIsLoading] = useState(false)
    const [count, setCount] = useState(0)
    const [countMap, setCountMap] = useState({})
    const [data, setData] = useState([])
    const [skuMap, setSkuMap] = useState({})
    const [customerMap, setCustomerMap] = useState({})

    const { control, errors, getValues, handleSubmit } = useForm({
        defaultValues: {
            customer: null
        }
    })

    const getData = async (customerId = null, _limit = limit, _page = page, isDefault = false) => {
        setIsLoading(true)
        const orderHasVoucherRes = await getOrderClient().getOrderHasVoucher(
            {
                redeemCode: [code],
                customerId
            },
            _limit,
            _page * _limit);
        let mapCount = {}
        let mapCustomer = {}
        let customerIds = []
        let skus = []
        let orderList = orderHasVoucherRes?.data?.map(order => {
            customerIds.push(order.customerId)
            if (order.redeemApplyResult?.length > 0) {
                let result = order.redeemApplyResult.filter(item => item.code === code && item.canUse)?.[0] || {}
                order.discountValue = result.discountValue ?? 0
                if (result.gifts?.length > 0) {
                    order.listGifts = result.gifts
                    result.gifts?.forEach(gift => {
                        skus.push(gift.sku)
                    })
                }
            }
            return order
        })
        if (customerIds.length > 0) {
            const resp = await getVoucherClient().getUserVoucherListByCustomerIds({
                customerIds, q: {
                    voucherCode: code
                }
            })
            if (resp.status === "OK") {
                resp.data?.forEach((item) => {
                    mapCount[item.customerId] = item.amount
                })
            }

            const customerResp = await getCustomerClient().getCustomerByCustomerIDs(customerIds)
            if (customerResp.status === "OK") {
                customerResp.data?.forEach((item) => {
                    mapCustomer[item.customerID] = item
                    
                })
            }
        }
        setData(orderList || [])
        setTotal(orderHasVoucherRes?.total || 0)
        if (isDefault) setCount(orderHasVoucherRes?.total || 0)
        setCountMap(mapCount)
        setCustomerMap(mapCustomer)
        setIsLoading(false)
        let mapSku = {}
        if (skus.length > 0) {
            const skuResp = await getProductClient().getProductListBySKUs(skus)
            if (skuResp.status === "OK") {
                skuResp.data?.forEach(({ sku, product }) => {
                    mapSku[sku.code] = {
                        name: product.name,
                        sku: sku.code,
                        productId: product.productID,
                        productCode: product.productCode
                    }
                })
            }
        }
        setSkuMap(mapSku)
    }

    const onSubmit = (formData) => {
        setPage(0)
        if (formData.customer) {
            getData(formData.customer.value, limit, 0)
        } else getData(null, limit, 0)
    }

    useEffect(() => {
        getData(null, limit, page, true)
    }, [])

    const handleChangePage = (page, rowsPerPage) => {
        setPage(page)
        setLimit(rowsPerPage)
        getData(getValues("customer")?.value || null, rowsPerPage, page)
    }

    const promoDetail = (voucherInfo) => {
        switch (voucherInfo.rewardType) {
            case defaultReward.gift:
                return (
                    <>
                        Tặng:
                        <br />
                        {voucherInfo?.listGifts?.map((item, index) => (
                            <span key={index}>
                                - {item.sku?.code} - {item.sku?.name}: {item.quantity}
                                <br />
                            </span>
                        ))}
                    </>
                )
            case defaultReward.percentage_on_product:
            case defaultReward.percentage:
                return <>
                    Giảm: {voucherInfo?.percentageDiscount}%
                    <br />
                    Giảm tối đa: {formatNumber(voucherInfo.maxDiscount ?? 0)}
                    {voucherInfo?.listGifts?.length > 0 && (
                        <React.Fragment>
                            <br />
                            Sản phẩm khuyến mãi:&nbsp;
                            {voucherInfo?.listGifts?.map((item, index) => (
                                <span key={index}>
                                    {item.sku?.code} - {item.sku?.name}
                                    <br />
                                </span>
                            ))}
                        </React.Fragment>
                    )}
                </>
            case defaultReward.absolute:
            case defaultReward.absolute_on_product:
                return <>
                    Giảm giá tuyệt đối: {formatNumber(voucherInfo?.absoluteDiscount)}
                    <br />
                    {voucherInfo?.listGifts?.length > 0 && (
                        <React.Fragment>
                            <br />
                            Sản phẩm khuyến mãi:&nbsp;
                            {voucherInfo?.listGifts?.map((item, index) => (
                                <span key={index}>
                                    {item.sku?.code} - {item.sku?.name}
                                    <br />
                                </span>
                            ))}
                        </React.Fragment>
                    )}
                </>

            // case defaultReward.point:
            //     return "+ " + voucherInfo?.pointValue + " điểm";

            default:
                return formatNumber(voucherInfo?.absoluteDiscount)
        }
    }

    const handlePromotion = (order) => {
        if (order.discountValue || order.listGifts?.length > 0) {
            if (order.discountValue) {
                return `Giảm ${formatNumber(order.discountValue)}`
            }
            else if (order.listGifts?.length > 0) {
                return (<>
                    Tặng:
                    <br />
                    {order?.listGifts?.map((item, index) => (
                        <span key={index}>
                            - {item.sku} - {skuMap[item.sku]?.name}: {item.quantity}
                            <br />
                        </span>
                    ))}
                </>)
            }
        }
        else {
            return promoDetail(voucher)
        }
    }

    return (

        <MyCard>
            <MyCardHeader
                title="Lịch sử dùng mã"
                style={{ alignItems: 'center', textTransform: "uppercase" }}
                small>

            </MyCardHeader>

            <MyCardContent>
                <Grid container>
                    {
                        count > 0 && (
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography>
                                    Tìm kiếm khách hàng trong danh sách
                                </Typography>

                                <MuiSingleAuto
                                    id="customer"
                                    options={listCustomerDefault}
                                    name="customer"
                                    onFieldChange={handleSearchCustomer}
                                    placeholder="Nhập ID/tên/số điện thoại khách hàng để tìm kiếm"
                                    control={control}
                                    errors={errors}
                                    message="Vui lòng chọn khách hàng"
                                    onValueChange={handleSubmit(onSubmit)}
                                />
                            </Grid>
                        )
                    }

                    <Grid item xs={12}>
                        <TableContainer style={{ marginTop: "20px" }}>
                            <Table small>
                                <colgroup>
                                    <col width="5%" />
                                    <col width="20%" />
                                    <col />
                                    <col />
                                    <col />
                                </colgroup>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">STT</TableCell>
                                        <TableCell align="center">Khách hàng</TableCell>
                                        <TableCell align="left">Đơn hàng</TableCell>
                                        <TableCell align="left">Giá trị khuyến mãi</TableCell>
                                        <TableCell align="left">Số lần đã sử dụng</TableCell>
                                        <TableCell align="left">Thời gian đặt hàng</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {isLoading ? (
                                        <TableRow>
                                            <TableCell colSpan={8} align="center">
                                                <CircularProgress />
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        <React.Fragment>
                                            {data.length > 0 ? data.map((item, index) =>
                                                <TableRow key={index}>
                                                    <TableCell align="left">
                                                        {index + 1 + (page * limit)}
                                                    </TableCell>
                                                    <TableCell align="center">

                                                        <Tooltip
                                                            title={`Nhấn để xem chi tiết khách hàng ${customerMap[item.customerId]?.name || ""}`}>
                                                            <Link
                                                                href={`/crm/customer/detail?customerCode=${customerMap[item.customerId]?.code || ""}`}
                                                                prefetch={false}>
                                                                <a target="_blank" prefetch={false} color="primary" className={styles.cartLink}>
                                                                    {item?.customerId + " - " + (customerMap[item.customerId]?.name || "")}
                                                                </a>
                                                            </Link>
                                                        </Tooltip>

                                                        <br />

                                                        <Chip
                                                            icon={<PhoneIcon />}
                                                            label={customerMap[item.customerId]?.phone || ""}
                                                        />
                                                    </TableCell>

                                                    <TableCell>
                                                        <Link
                                                            href={`/crm/order/detail?orderId=${item.orderId}`}
                                                            prefetch={false}>
                                                            <a color="primary" target="_blank" prefetch={false} className={styles.cartLink}>
                                                                <span style={{ color: "black" }}>ID đơn hàng: </span> {item.orderId}
                                                            </a>
                                                        </Link>

                                                        <br />
                                                        Tổng giá trị: {formatNumber(item.totalPrice)}
                                                        <br />
                                                        Số sản phẩm: {item.totalItem}
                                                    </TableCell>

                                                    <TableCell align="left">
                                                        {handlePromotion(item)}

                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {countMap[item.customerId] ?? 0}
                                                    </TableCell>

                                                    <TableCell>
                                                        {formatDateTime(item.createdTime)}
                                                    </TableCell>

                                                </TableRow>
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={8} align="center">Không tìm thấy thông tin</TableCell>
                                                </TableRow>
                                            )}

                                        </React.Fragment>
                                    )}
                                </TableBody>
                                <MyTablePagination
                                    labelUnit="đơn hàng"
                                    count={total}
                                    rowsPerPage={limit}
                                    page={page}
                                    onChangePage={(e, page, rowsPerPage) => {
                                        handleChangePage(page, rowsPerPage)
                                    }}
                                />
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </MyCardContent>

        </MyCard>
    )
}
