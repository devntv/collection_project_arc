
import React, { useEffect, useState } from "react";
import { TableCell, TableRow, Tooltip, Checkbox, Grid, Button, Chip } from "@material-ui/core";
import { formatDateTime, formatNumber } from "components/global";
import { TicketStatusButton } from "./TicketStatusButton";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useRouter } from "next/router";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import Link from "next/link";

export default function SellerTicketItem(props) {
    const {
        isChooseAll,
        setIsChooseAll,
        setCodes,
        codes,
        ticketCodes,
        row,
        sellerMap,
        campaignMap,
        productMap,
        accountMap,
        getTimeFlashsale,
        handleApprove,
        handleReject,
        filterData
    } = props
    const [isChecked, setIsChecked] = useState(isChooseAll)
    const router = useRouter()
    const toast = useToast()

    useEffect(() => {
        if (codes?.findIndex(item => item.ticketCode === row.ticketCode) === -1) {
            setIsChecked(false)
            return
        }
        setIsChecked(true)
    }, [codes, router])

    const getPrice = () => {
        if (row.saleType === "PRICE") {
            return formatNumber(row.campaignPrice || 0)
        } else if (row.saleType === "ABSOLUTE") {
            return formatNumber((row.price - row.absoluteDiscount) || 0)
        }
        let discount = row.maxDiscount || 0
        let priceDiscount = (row.price * row.percentageDiscount / 100)
        if (!discount || priceDiscount < discount) {
            discount = priceDiscount
        }
        return formatNumber((row.price - discount) || 0)
    }

    return (
        <TableRow key={row.ticketID}>
            {/* {filterData?.status !== "APPROVED" && filterData?.status !== "REJECTED" &&
                <TableCell align="center">
                    {row.status === "WAIT_APPROVE" &&
                        <Checkbox
                            checked={isChecked}
                            onChange={(e) => {
                                // if (row.status !== "WAIT_APPROVE") {
                                //     toast.error(`Yêu cầu này đã ${row.status === "APPROVED" ? "được duyệt" : "bị từ chối"}`);
                                //     return
                                // }
                                setIsChecked(e.target.checked)
                                if (e.target.checked === true) {
                                    const listData = [...codes, {
                                        ...row,
                                        ticketCode: row.ticketCode,
                                        ticketID: row.ticketID,
                                        sellerCode: row.sellerCode,
                                        status: row.status,
                                    }] || []
                                    setCodes(listData)
                                    if (listData.length === ticketCodes?.length) setIsChooseAll(e.target.checked)
                                }
                                else {
                                    let list = codes.filter(item => item.ticketCode !== row.ticketCode)
                                    setCodes(list)
                                    setIsChooseAll(e.target.checked)
                                }
                            }}>
                        </Checkbox>
                    }
                </TableCell>
            } */}
            <TableCell align="left">{row.ticketID}</TableCell>
            <TableCell align="left">
                {campaignMap[row.campaignID]?.banner && (
                    <img src={campaignMap[row.campaignID]?.banner} width={130} style={{ objectFit: "contain" }} height={70} />
                )}
            </TableCell>
            <TableCell align="left">
                <Link
                    href={`/marketing/sale-campaign/edit?code=${campaignMap[row.campaignID]?.campaignCode}`}
                    prefetch={false}>
                    <a target="_blank" prefetch={false} color="primary" style={{
                        textDecoration: "none",
                        cursor: "pointer",
                        color: "green",
                        fontWeight: "bold"
                    }}>
                        {campaignMap[row.campaignID]?.campaignName}
                    </a>
                </Link>
            </TableCell>
            <TableCell align="left">
                <span title={`Sản phẩm ${row.productID} ${productMap[row.productID] || "Chưa xác định"}`}>
                    {productMap[row.productID] || "Chưa xác định"}
                </span>
                <br />
                <span title={`Nhà bán hàng ${row.sellerCode} ${sellerMap[row.sellerCode] ? sellerMap[row.sellerCode].label : "Chưa xác định"}`}>
                    Nhà bán hàng: {sellerMap[row.sellerCode] ? sellerMap[row.sellerCode].label : "Chưa xác định"}
                </span>
                <br />
                Sku: <Link
                    href={`/seller/sku/edit?code=${row.sku}`}
                    prefetch={false}>
                    <a target="_blank" prefetch={false} color="primary" style={{
                        textDecoration: "none",
                        cursor: "pointer",
                        color: "green",
                        fontWeight: "bold"
                    }}>
                        {row.sku}
                    </a>
                </Link>
                
                <br />
                ID sp:{row.productID}
                <br/>
                Bên chịu phí: {row?.chargeFee || " - "}
            </TableCell>
            <TableCell align="right">{formatNumber(row.price ?? 0)}</TableCell>
            <TableCell align="center">{getPrice()}</TableCell>
            <TableCell align="center">
                {row.saleType === "ABSOLUTE" ? formatNumber(row.absoluteDiscount ?? 0) :
                    (row.percentageDiscount ? (row.percentageDiscount + "%") : " - ")
                }
            </TableCell>
            <TableCell align="center">
                {row.saleType === "PERCENTAGE" && row.percentageDiscount && row.maxDiscount ?
                    formatNumber(row.maxDiscount)
                    : "-"
                }
            </TableCell>
            <TableCell align="left">
                {row.quantity ?? "0"}
                <br />
                {row.maxQuantityPerOrder && row.maxQuantityPerOrder > 0 ? formatNumber(row.maxQuantityPerOrder ?? 0) : "Không giới hạn"}</TableCell>
            <TableCell align="left">
                {formatDateTime(row.createdTime)}
            </TableCell>
            <TableCell align="left">
                {row.approvedTime ? (
                    <>
                        {row.approvedTime ? formatDateTime(row.approvedTime) : " - "}
                        <br />
                        {accountMap[row.updatedBy] ?? "-"}
                    </>
                ) : row.rejectedTime ? (
                    <>
                        {row.rejectedTime ? formatDateTime(row.rejectedTime) : " - "}
                        <br />
                        {accountMap[row.updatedBy] ?? "-"}
                    </>
                ) : " - "}
            </TableCell>
            <TableCell align="left">
                {getTimeFlashsale(campaignMap[row.campaignID], row.flashSaleTimes)?.map(item =>
                    item?.time ?
                        <Tooltip title={item?.dateTime}>
                            <Chip style={{ margin: '3px', borderRadius: '16px' }} size="small" label={item?.time || "Không xác định"} />
                        </Tooltip>
                        :
                        <Chip style={{ margin: '3px', borderRadius: '16px' }} size="small" label={item?.time || "Không xác định"} />
                )}
            </TableCell>
            <TableCell align="left">
                <span style={{ display: "flex", alignItems: "center" }}>
                    <TicketStatusButton ticket={{ status: row.status }} />
                    {row.status === "REJECTED" && row?.note &&
                        <Tooltip title={row?.note}>
                            <HelpOutlineIcon style={{ marginLeft: 8 }} />
                        </Tooltip>
                    }
                </span>
            </TableCell>
            <TableCell align="center" width={215}>
                {row.status !== "APPROVED" && row.status !== "REJECTED" && (
                    <Grid container justifyContent="space-between" spacing={1}>
                        <Grid item xs>
                            <Button style={{ width: 90 }} variant="contained" color="primary" onClick={() => handleApprove(row)}>Duyệt</Button>
                        </Grid>
                        <Grid item xs>
                            <Button style={{ width: 90 }} variant="contained" color="secondary" onClick={() => handleReject(row)}>Từ chối</Button>
                        </Grid>
                    </Grid>
                )}
            </TableCell>
        </TableRow>
    )
}
