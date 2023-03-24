/* eslint-disable no-unused-vars */
import { Divider, Grid, Typography } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import clsx from 'clsx';
import ButtonV2 from 'components-v2/atoms/ButtonV2';
import { EditOrderButton } from 'components/mocules';
import { BRAND_NAME, ENUMS_PAYMENT_METHOD, PAYMENT_METHOD_NAME, PAYMENT_METHOD_NAME_SHORT } from 'constants/Enums';
import { GIFT_NEW_GREEN, ORDER_SUCCESS_THANKYOU } from 'constants/Images';
import { MY_ORDER_URL } from 'constants/Paths';
import Router from 'next/router';
import { memo } from 'react';
import { DateTimeUtils } from 'utils';
import { formatCurrency } from 'utils/FormatNumber';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import styles from './styles.module.css';

const WatchOrderButton = ({ handleClick }) => (
  <ButtonV2 className={styles.watch_order_button} onClick={handleClick} hover hoverColor="#fff">
    Chi tiết đơn hàng
  </ButtonV2>
);

const ThankYouContainer = ({
  orderId = 0,
  deliveryDate,
  canEdit = false,
  totalPrice,
  redeemCode,
  paymentMethod,
  isMobile,
  companyName,
  transaction,
  redeemApplyResult = [],
}) => {
  const handleWatchOrder = () => {
    Router.push(`${MY_ORDER_URL}/${orderId}`);
  };
  // todo : không có delivery date thì off
  const deliveryDateStr = DateTimeUtils.getFormattedWithDate(new Date(deliveryDate)).toLowerCase();
  const deliveryDateFormat = deliveryDateStr.charAt(0).toUpperCase() + deliveryDateStr.slice(1);

  // auto apply voucher
  const filterRedeemCodeApply = redeemApplyResult?.filter((item) => !item.autoApply);

  const InforAutoVoucherApply = () => {
    const [giftAutoData] = redeemApplyResult?.filter(({ autoApply }) => autoApply === true) || [];
    const countGifts = giftAutoData?.gifts?.reduce((curr, prev) => curr + prev?.quantity, 0);
    return (
      <div className={styles.info_order_line}>
        <Typography className={clsx(styles.info_order_line_left, giftAutoData ? styles.auto_apply_code : styles.notCode)}>Tự động áp dụng</Typography>
        <div className={clsx(styles.info_order_line_right, styles.detail, styles.autoApplyVouycher_wrap)}>
          {giftAutoData?.gifts ? (
            <div className={styles.giftsInfo}>
              x{countGifts || 1} <ImageFallbackStatic src={GIFT_NEW_GREEN} alt="gift_icon" height="19" width="19" />
            </div>
          ) : (
            <Typography className={giftAutoData ? styles.auto_apply_code : styles.notCode}>-{formatCurrency(giftAutoData?.discountValue)}</Typography>
          )}
        </div>
      </div>
    );
  };

  return (
    <Grid className={styles.container}>
      <Grid className={styles.iconDiv}>
        <ImageFallbackStatic src={ORDER_SUCCESS_THANKYOU} alt="order_success" width="342" height="300" />
      </Grid>
      <Typography className={styles.order_success_title}>Đặt Hàng Thành Công!</Typography>
      <Typography className={styles.title}>
        Cảm ơn bạn đã đặt hàng bằng hình thức {PAYMENT_METHOD_NAME_SHORT[paymentMethod]?.toLowerCase() || ''} tại thuocsi.vn!
      </Typography>
      <Typography variant="h5" className={styles.noteBin}>
        {BRAND_NAME} có thể giao đơn của bạn bằng bin nhựa và thu hồi bin trong vòng 3-5 ngày
      </Typography>
      {deliveryDate && (
        <Grid container className={styles.wrapInfo}>
          <Grid className={styles.info}>
            <Grid className="info_wrapper">
              <Grid className={styles.info_order_line}>
                <Typography className={styles.info_order_line_left}>Dự kiến Giao hàng</Typography>
                <Typography className={clsx(styles.info_order_line_right, styles.detail)}>{deliveryDateFormat}</Typography>
              </Grid>
              <div className={styles.info_order_line}>
                <Typography className={styles.info_order_line_left}>Mã đơn</Typography>
                <Typography className={clsx(styles.info_order_line_right, styles.detail)}>{orderId}</Typography>
              </div>
              {redeemApplyResult?.length > 0 && <InforAutoVoucherApply />}
              <div className={styles.info_order_line}>
                <Typography className={styles.info_order_line_left}>Mã giảm giá</Typography>
                {redeemCode && redeemCode.length > 0 && filterRedeemCodeApply?.length > 0 ? (
                  <div className={styles.info_order_line_right}>
                    <div className={styles.redeem}>
                      <LocalOfferOutlinedIcon />
                      <Typography>{filterRedeemCodeApply[0]?.code}</Typography>
                    </div>
                  </div>
                ) : (
                  <Typography className={clsx(styles.info_order_line_right, styles.detail)}>Không sử dụng</Typography>
                )}
              </div>
              {paymentMethod === ENUMS_PAYMENT_METHOD.PAYMENT_METHOD_CREDIT && (
                <div className={styles.info_order_line}>
                  <Typography className={styles.info_order_line_left}>Hạn mức ban đầu</Typography>
                  <Typography className={clsx(styles.totalPrice, styles.info_order_line_right)}>
                    {formatCurrency((transaction?.balance || 0) + (transaction?.amount || 0))}
                  </Typography>
                </div>
              )}
              <div className={styles.info_order_line}>
                <Typography className={styles.info_order_line_left}>Thanh toán</Typography>
                <Typography className={clsx(styles.totalPrice, styles.info_order_line_right)}>{formatCurrency(totalPrice)}</Typography>
              </div>
              {paymentMethod === ENUMS_PAYMENT_METHOD.PAYMENT_METHOD_CREDIT && (
                <div className={styles.info_order_line}>
                  <Typography className={styles.info_order_line_left}>Hạn mức còn lại (tạm tính)</Typography>
                  <Typography className={clsx(styles.totalPrice, styles.info_order_line_right)}>
                    {formatCurrency(transaction?.balance || 0)}
                  </Typography>
                </div>
              )}
              <div className={styles.info_order_line}>
                <Typography className={styles.info_order_line_left}>Hình thức thanh toán</Typography>
                <Typography className={clsx(styles.info_order_line_right, styles.detailMethod)}>{PAYMENT_METHOD_NAME[paymentMethod]}</Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
      )}
      {paymentMethod === ENUMS_PAYMENT_METHOD.PAYMENT_METHOD_BANK && (
        <Grid container className={!isMobile && styles.wrapSendBank}>
          <Grid className={styles.wrapInfoBank}>
            <Grid xs={12} item className={styles.titlePriceBank}>
              <Typography>
                Quý khách vui lòng chuyển khoản số tiền <span className={styles.infoSentBank}>{formatCurrency(totalPrice)}</span>
              </Typography>
              <Typography>
                theo cú pháp:{' '}
                <span className={styles.infoSentBank}>
                  {orderId} - {companyName || 'tên nhà thuốc'}
                </span>{' '}
                để đơn được xác nhận.
              </Typography>
              <Grid item xs={12} className={styles.wrapDivider}>
                <Divider className={styles.divider} />
              </Grid>
            </Grid>

            <Grid className={styles.wrapInfoBanking}>
              <Grid className={styles.bank_info} icon={false}>
                <Grid className={styles.info_order_line}>
                  <Typography className={styles.info_order_line_left}>Chủ tài khoản</Typography>
                  <Typography className={clsx(styles.info_order_line_right, styles.detail)}>Công Ty TNHH Buymed</Typography>
                </Grid>

                <Grid className={styles.info_order_line}>
                  <Typography className={styles.info_order_line_left}>Số tài khoản</Typography>
                  <Typography className={clsx(styles.info_order_line_right, styles.detail)}>1913 45430 30020</Typography>
                </Grid>

                <Grid className={styles.info_order_line}>
                  <Typography className={styles.info_order_line_left}>Ngân hàng</Typography>
                  <Typography className={clsx(styles.info_order_line_right, styles.detail)}>Techcombank - Chi nhánh Bắc Hải</Typography>
                </Grid>

                <Grid className={styles.info_order_line}>
                  <Typography className={styles.info_order_line_left}>Nội dung</Typography>
                  <Typography className={clsx(styles.info_order_line_right, styles.detail)}>Mã đơn hàng - Tên nhà thuốc</Typography>
                </Grid>

                <Grid className={styles.info_order_line}>
                  <Typography className={styles.info_order_line_left} />
                  <Typography className={clsx(styles.info_order_line_right, styles.detail)}>
                    <span className={styles.example}>Mẫu</span>{' '}
                    <span className={styles.exampleContent}>
                      {orderId} - {companyName || 'Thuocsi'}
                    </span>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} className={styles.wrapDividerBottom}>
              <Divider className={styles.dividerBottom} />
            </Grid>
            <Grid item className={styles.afterBanking} xs={12}>
              <Typography>
                Sau khi chuyển khoản, quý khách vui lòng gửi lại hình ảnh cho nhân viên tư vấn hoặc fanpage{' '}
                <span className={styles.tsText}>thuocsi.vn</span>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid container className={styles.wrapNote}>
        {canEdit && (
          <div className={styles.note}>
            <ErrorOutlineIcon style={{ color: '#D4323B' }} />
            <Typography style={{ marginLeft: '10px' }}>
              Quý khách có 30 phút để chỉnh sửa đơn hàng và được hỗ trợ hủy đơn trong vòng 12 giờ kể từ lúc đặt hàng.
            </Typography>
          </div>
        )}
      </Grid>

      <Grid className={styles.btnGroup} container>
        <div className={styles.btnEdit}>
          <EditOrderButton orderId={orderId} canEdit={canEdit} />
        </div>
        <div className={styles.btnWatch}>
          <WatchOrderButton handleClick={handleWatchOrder} />
        </div>
      </Grid>
    </Grid>
  );
};

export default memo(ThankYouContainer);
