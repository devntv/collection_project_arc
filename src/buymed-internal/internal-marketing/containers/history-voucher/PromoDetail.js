import React from 'react';
import { Button, Tooltip, Typography } from "@material-ui/core";
import { defaultReward } from 'components/promotion-voucher/constant';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Link from "next/link";
import styles from "pages/marketing/history-voucher/styple.module.css";
import { formatDateTime, formatNumber } from "components/global";

export const promoDetail = (data, productMap) => {
    switch (data?.type) {
        case defaultReward.gift:
            return (
                <>
                    {data?.gifts?.map((item, index) => (
                        <span key={index}>
                            {productMap?.[item.sku]?.product.name}: {item.quantity}
                            <br />
                        </span>
                    ))}
                </>
            )
        case defaultReward.percentage_on_product:
        case defaultReward.percentage:
            return (
                <>
                    Giảm: {data?.percentageDiscount}%
                    <br />
                    Giảm giá tối đa: {formatNumber(data?.maxDiscount)}
                    {data?.gifts?.length > 0 && (
                        <React.Fragment>
                            <br />
                            Sản phẩm khuyến mãi:&nbsp;
                            {data?.gifts?.map((item, index) => (
                                <span key={index}>
                                    {productMap[item.sku]?.product.name}
                                    <br />
                                </span>
                            ))}
                        </React.Fragment>
                    )}
                    <br />
                </>
            );
        case defaultReward.absolute:
        case defaultReward.absolute_on_product:
            return <>
                Giảm giá tuyệt đối: {formatNumber(data?.absoluteDiscount)}
                {data?.gifts?.length > 0 && (
                    <React.Fragment>
                        <br />
                        Sản phẩm khuyến mãi:&nbsp;
                        {data?.gifts?.map((item, index) => (
                            <span key={index}>
                                {productMap[item.sku]?.product.name}
                                <br />
                            </span>
                        ))}
                    </React.Fragment>
                )}
                <br />
            </>

        case defaultReward.point:
            return <>
                {" + " + data?.pointValue + " điểm"}
                <br />
            </>
        default:
            return <br />
    }
}

const handleVoucherResult = (voucherInfo = {}, productMap = {}, voucherResult = {}) => {

    if (voucherResult.discountValue || voucherResult?.gifts?.length > 0) {
        if (voucherResult.discountValue) {
            return <>
                {` Giảm ${formatNumber(voucherResult.discountValue)}`}
                <br />
            </>
        }
        else if (voucherResult.gifts?.length > 0) {
            return (<>
                <br />
                {voucherResult?.gifts?.map((item, index) => (
                    <span key={index}>
                        {productMap?.[item.sku]?.product.name}: {item.quantity}
                        <br />
                    </span>
                ))}
            </>)
        }
    } else {
        return <>
            <br />
            {promoDetail(voucherInfo, productMap)}
        </>
    }
}

export const handleVoucherRewardInOrder = (voucherInfo, productMap = {}, promotionMap = {}, voucherResult = {}) => {
    let isActive = voucherInfo.status === "ACTIVE"

    return (
        <React.Fragment>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Tooltip title={<React.Fragment>
                    <span>
                        Trạng thái mã: {voucherInfo.status === "ACTIVE" ? "Đang mở" : "Đã tắt"}
                    </span>
                </React.Fragment>}>
                    <FiberManualRecordIcon style={{ color: `${isActive ? "green" : "red"}`, paddingRight: "5px", cursor: "pointer" }} />
                </Tooltip>
                <Link
                    href={`/marketing/voucher/edit?voucherId=${voucherInfo?.voucherId}`}
                    prefetch={false}
                >
                    <a color="primary" target="_blank" prefetch={false} className={styles.cartLink}>
                        <span><strong>{voucherInfo.code}</strong></span>
                    </a>
                </Link>

            </div>

            <span>
                <strong>Chương trình</strong>:&nbsp;
                {
                    voucherInfo?.promotionId ? (
                        <Link
                            href={`/marketing/promotion/edit?promotionId=${voucherInfo?.promotionId}`}
                            prefetch={false}
                        >
                            <a color="primary" target="_blank" prefetch={false} className={styles.cartLink}>
                                {promotionMap[voucherInfo?.promotionId]?.promotionName || "-"}
                            </a>
                        </Link>
                    ) : " - "
                }
            </span>

            <br />
            <span>
                <strong>Loại mã</strong>: {voucherInfo?.type}
            </span>

            <br />
            <span>
                <strong>Khuyến mãi {!!voucherResult.code && "trong đơn hàng"}</strong>:
                {handleVoucherResult(voucherInfo?.rewards?.[0], productMap, voucherResult)}
            </span>

            <span>
                <strong>Hạn sử dụng</strong>: <br />
                Từ: {formatDateTime(voucherInfo?.startTime)}
                <br />
                Đến: {formatDateTime(voucherInfo?.endTime)}
            </span>
        </React.Fragment>
    )
}

export const StatusButton = ({ status }) => {
    let color = ""
    status === "ACTIVE" ? color = "green" : color = "red";
    return (
        <Button
            size="small"
            variant="outlined"
            style={{ color: color, borderColor: color }}
        // disabled={true}
        >
            {status === "ACTIVE" ? "Đang mở" : "Đã tắt"}
        </Button>
    )
}