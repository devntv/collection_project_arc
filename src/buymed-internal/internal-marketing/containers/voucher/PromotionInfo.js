import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import Link from "next/link";
import { PromotionStatus } from 'containers/promotion/PromotionStatus'
import { defaultReward, rewardMap, rewards } from 'components/promotion-voucher/constant'
import { formatDateTime, formatEllipsisText, formatNumber } from 'components/global'
import { useEffect } from 'react'

const useStyles = makeStyles((theme) => ({
    fieldLabel: {
        fontWeight: "bold"
    },
    box: {
        // border: "1px solid #4F4F4F",
        // borderRadius: "3px",
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        padding: "12px 15px",

    }
}))


export default function PromotionInfo({ promotion }) {
    const styles = useStyles()

    const renderReward = () => {
        switch (promotion.rewardType) {
            case defaultReward.gift:
                return (
                    <>
                        <Grid item xs={6} md={5}>
                            <Typography className={styles.fieldLabel}>Sản phẩm tặng:</Typography>
                        </Grid>
                        <Grid item xs={6} md={7}>
                            {promotion?.listGifts?.map((item, index) => (
                                <Typography key={index}>
                                    - {item.sku?.name}: {item.quantity}
                                    <br />
                                </Typography>
                            ))}
                        </Grid>
                    </>
                )
            case defaultReward.percentage_on_product:
            case defaultReward.percentage:
                return <>
                    {promotion?.listGifts?.length > 0 && (
                        <>

                            <Grid item xs={6} md={5}>
                                <Typography className={styles.fieldLabel}>Sản phẩm khuyến mãi:</Typography>
                            </Grid>
                            <Grid item xs={6} md={7}>
                                {promotion?.listGifts?.map((item, index) => (
                                    <Typography key={index}>
                                        - {item.sku?.name}: {item.quantity}
                                        <br />
                                    </Typography>
                                ))}
                            </Grid>
                        </>
                    )}
                    <Grid item xs={6} md={5}>
                        <Typography className={styles.fieldLabel}>Phần trăm giảm giá:</Typography>
                    </Grid>
                    <Grid item xs={6} md={7}>
                        <Typography>{promotion.percentageDiscount}</Typography>
                    </Grid>

                    <Grid item xs={6} md={5}>
                        <Typography className={styles.fieldLabel}>Giá trị giảm tối đa:</Typography>
                    </Grid>
                    <Grid item xs={6} md={7}>
                        <Typography>{formatNumber(promotion.maxDiscount)}</Typography>
                    </Grid>
                </>
            case defaultReward.absolute:
            case defaultReward.absolute_on_product:
                return <>
                    {promotion?.listGifts?.length > 0 && (
                        <>

                            <Grid item xs={6} md={5}>
                                <Typography className={styles.fieldLabel}>Sản phẩm khuyến mãi:</Typography>
                            </Grid>
                            <Grid item xs={6} md={7}>
                                {promotion?.listGifts?.map((item, index) => (
                                    <Typography key={index}>
                                        - {item.sku?.name}: {item.quantity}
                                        <br />
                                    </Typography>
                                ))}
                            </Grid>
                        </>
                    )}
                    <Grid item xs={6} md={5}>
                        <Typography className={styles.fieldLabel}>Giá trị giảm giá tuyệt đối:</Typography>
                    </Grid>
                    <Grid item xs={6} md={7}>
                        <Typography>{formatNumber(formatNumber(promotion.absoluteDiscount))}</Typography>
                    </Grid>
                </>

            // case defaultReward.point:
            //     return "+ " + data?.pointValue + " điểm";

            default:
                return formatNumber(promotion?.absoluteDiscount)
        }
    }

    return (
        <Paper variant="outlined">
            <Grid item xs={12}>
                <Grid container item xs={12} className={styles.box}>

                    <Grid container spacing={1} item xs={6}>

                        <Grid item xs={6} md={5}>
                            <Typography className={styles.fieldLabel}>ID chương trình:</Typography>
                        </Grid>
                        <Grid item xs={6} md={7}>
                            <Typography>{promotion.promotionId ?? "-"}</Typography>
                        </Grid>

                        <Grid item xs={6} md={5}>
                            <Typography className={styles.fieldLabel}>Tên chương trình:</Typography>
                        </Grid>
                        <Grid item xs={6} md={7}>
                            {promotion.promotionId ? (
                                <Link href={`/marketing/promotion/edit?promotionId=${promotion.promotionId}`} prefetch={false}>
                                    <a target="_blank" prefetch={false} style={{
                                        color: "green",
                                        textDecoration: "unset",
                                    }}>
                                        <Typography>{promotion.promotionName}</Typography>
                                    </a>
                                </Link>
                            ) : "-"}


                        </Grid>

                        <Grid item xs={6} md={5}>
                            <Typography className={styles.fieldLabel}>Thời gian áp dụng:</Typography>
                        </Grid>
                        <Grid item xs={6} md={7}>
                            {promotion?.promotionId ? (
                                <Typography>Từ: {formatDateTime(promotion.startTime)}
                                    <br />
                                    Đến: {formatDateTime(promotion.endTime)}</Typography>
                            ) : <Typography>-</Typography>}

                        </Grid>


                        <Grid item xs={6} md={5}>
                            <Typography className={styles.fieldLabel}>Thời gian hiển thị:</Typography>
                        </Grid>
                        <Grid item xs={6} md={7}>
                            <Typography>{promotion.promotionId ? formatDateTime(promotion.publicTime) : "-"}</Typography>

                        </Grid>

                        <Grid item xs={6} md={5}>
                            <Typography className={styles.fieldLabel}>Trạng thái:</Typography>
                        </Grid>
                        <Grid item xs={6} md={7}>

                            {promotion.promotionId ? (
                                <PromotionStatus
                                    promotionStatus={promotion.status}
                                />
                            ) : "-"}

                        </Grid>

                    </Grid>

                    <Grid container spacing={1} item xs={6}>

                        <Grid item xs={6} md={5}>
                            <Typography className={styles.fieldLabel}>Nội dung mô tả:</Typography>
                        </Grid>
                        <Grid item xs={6} md={7}>
                            <Typography>{promotion.promotionId ? promotion.description : "-"}</Typography>
                        </Grid>

                        <Grid item xs={6} md={5}>
                            <Typography className={styles.fieldLabel}>Loại khuyến mãi:</Typography>
                        </Grid>
                        <Grid item xs={6} md={7}>
                            <Typography>{promotion.promotionId ? (rewardMap[promotion.rewardType] ?? "Tất cả") : "-"}</Typography>
                        </Grid>

                        {renderReward()}

                        <Grid item xs={6} md={5}>
                            <Typography className={styles.fieldLabel}>Điều kiện sử dụng:</Typography>
                        </Grid>
                        <Grid item xs={6} md={7}>
                            <div dangerouslySetInnerHTML={{ __html: formatEllipsisText(promotion.conditionDescription ?? "-") }}
                            />
                        </Grid>

                    </Grid>

                </Grid>
            </Grid>
        </Paper>




    )
}
