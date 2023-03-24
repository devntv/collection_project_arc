import { Button, Divider, Grid, IconButton, Tooltip, Typography } from '@material-ui/core';
import { LocalOffer } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import { Alert } from '@material-ui/lab';
import { CartClientV2, isValid } from 'clients';
import clsx from 'clsx';
import { useModal } from 'hooks';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { memo } from 'react';
import { gtag } from 'utils';
import { formatCurrency } from 'utils/FormatNumber';
import { isEmpty } from 'utils/ValidateUtils';
import styles from './styles.module.css';

const DynamicPromoListModalV2 = dynamic(() => import('../PromoListModalV2'), {
  ssr: false,
});

const PaymentButton = ({
  user = null,
  isUseInvalidVoucher = false,
  isOverWeightOrVolume = false,
  isSelectedProducts = false,
  isContinuePayment = false,
  handlePayment,
  isErrorCartItem = false,
  checkConditionTerms = false,
}) => {
  const isDisablePayment =
    !checkConditionTerms ||
    !isContinuePayment ||
    isErrorCartItem ||
    isSelectedProducts ||
    isErrorCartItem ||
    isOverWeightOrVolume ||
    isUseInvalidVoucher;

  return (
    <>
      {user?.isActive ? null : (
        <Alert severity="error" className={styles.text_err_payment}>
          Tạm thời chưa thanh toán được vì tài khoản chưa được kích hoạt. Quý khách vui lòng liên hệ bộ phận chăm sóc khách hàng qua số điện thoại
          <a href="tel:02873008840"> 028 7300 8840</a> để được hỗ trợ.
        </Alert>
      )}
      {user?.isQuest && (
        <Alert severity="error" className={styles.text_err_payment}>
          Đây là tài khoản dùng thử. Giỏ hàng sẽ không thể lưu và thanh toán được. Xin bạn vui lòng tạo tài khoản cá nhân để sử dụng tính năng này!
          Cảm ơn!
        </Alert>
      )}
      {isErrorCartItem && (
        <Alert severity="error" className={styles.text_err_payment}>
          Xin vui lòng kiểm tra lại thông tin giỏ hàng. Trong giỏ hàng của quý khách có sản phẩm không đủ điều kiện để thanh toán.
        </Alert>
      )}
      {isSelectedProducts && (
        <Alert severity="error" className={styles.text_err_payment}>
          Bạn chưa chọn sản phẩm để thanh toán, vui lòng chọn ít nhất 1 sản phẩm để tiến hành thanh toán
        </Alert>
      )}
      {isUseInvalidVoucher && (
        <Alert severity="error" className={styles.text_err_payment}>
          Đơn hàng không thể tiếp tục thanh toán do có mã giảm giá không hợp lệ.
        </Alert>
      )}
      <Button
        className={clsx(styles.btn_continue_payment, !isDisablePayment && styles.enable_bg)}
        onClick={handlePayment}
        disabled={isDisablePayment}
      >
        Thanh toán
      </Button>
    </>
  );
};

const InfoRow = ({ title = '', data = '' }) => (
  <div className={styles.info_row}>
    <span className={styles.info_title}> {title}</span>
    <span className={styles.info_result}>{data}</span>
  </div>
);

function BulkOrderCart({
  isContinuePayment = true,
  totalQuantitySelected = 0,
  checkConditionTerms = false,
  subPrice = 0,
  totalPrice = 0,
  handleSubmitPayment,
  redeemCode = [],
  price = 0,
  user = null,
  cartNo = null,
  reloadDataCart,
  redeemApplyResult = [],
  deliveryMethodFee = 0,
  discount = 0,
  paymentMethodFee = 0,
  isErrorCartItem = false,
  isOverWeightOrVolume = false,
  isSelectedProducts = false,
  selectedDelivery = null,
  selectedPayment = null,
}) {
  const router = useRouter();
  const currentPage = router.asPath;

  const { accountID = null, customerID = null } = user || {};
  const isEmptyRedeemCode = isEmpty(redeemCode);
  const [firstRedeem] = redeemApplyResult;
  const { code: redeemText = '', canUse = false, message: messageApplyVoucherCode = '' } = firstRedeem || {};
  // const descriptionRewards = promoInfo?.rewardsVi?.map((reward) => reward?.message || '') || [];

  const [showPopupPromo, togglePopupPromo] = useModal(false);

  const handleChangePromo = async (code = null, name = null) => {
    togglePopupPromo();
    const res = await CartClientV2.updateRedeemCode([code], cartNo);

    if (isValid(res)) {
      gtag.selectPromotion([{ id: code, name }]);
    }
    await reloadDataCart({
      cartRes: res,
      successMessage: 'Thêm mã giảm giá thành công',
      errorMessage: 'Thêm mã giảm giá thất bại',
      isReloadData: true,
    });
  };

  const handleRemoveRedeemCode = async () => {
    const res = await CartClientV2.updateRedeemCode([], cartNo);
    await reloadDataCart({
      cartRes: res,
      successMessage: 'Xoá mã giảm giá thành công',
      errorMessage: 'Xoá mã giảm giá thất bại',
      isReloadData: true,
    });
  };

  const isNewTotalPrice = !isEmptyRedeemCode && canUse && subPrice < price;

  const renderPromotionText = () => {
    if (discount > 0) {
      return <Typography className={styles.text_discount}>Giảm {formatCurrency(discount)}</Typography>;
    }

    if (!canUse && !isEmptyRedeemCode) {
      return <Typography className={styles.text_discount}>{messageApplyVoucherCode}</Typography>;
    }

    return null;
  };

  return (
    <>
      <div className={styles.bulk_order_cart_container}>
        <div className={styles.info_cart}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography className={styles.title_text}>Giỏ hàng</Typography>
          </Grid>
          <InfoRow title="Tổng số lượng" data={totalQuantitySelected} />
          <InfoRow title={selectedDelivery ? selectedDelivery?.name : 'Phí vận chuyển'} data={formatCurrency(deliveryMethodFee)} />
          <InfoRow title={selectedPayment ? selectedPayment?.name : 'Phí thanh toán'} data={formatCurrency(paymentMethodFee)} />
          {/* TODO: chưa có công nợ */}
          {/* <InfoRow title="Công nợ" data={0} /> */}
          <Divider className={styles.divider} />
          <div className={styles.info_row}>
            <span className={styles.info_title}>Tổng cộng</span>
            {isNewTotalPrice && <span className={styles.total_text}>{formatCurrency(Math.max(totalPrice, 0))}</span>}
            <span className={isNewTotalPrice ? styles.old_price_text : styles.total_text}>
              {formatCurrency(Math.max(isNewTotalPrice ? price : totalPrice, 0))}
            </span>
          </div>
          <Divider className={styles.divider} />
          <Grid container direction="row" alignItems="center" justifyContent="space-between" style={{ height: '30px' }}>
            <Grid item xs={8} container style={{ columnGap: '5px' }}>
              <LocalOffer className={styles.icon_promo} />
              <Tooltip title="Thay đổi mã giảm giá">
                <Typography
                  className={styles.text_use_promo}
                  onClick={() => {
                    if (isContinuePayment) {
                      togglePopupPromo();
                    }
                  }}
                >
                  {!isEmptyRedeemCode ? redeemText : 'Dùng mã giảm giá'}
                </Typography>
              </Tooltip>
            </Grid>
            {!isEmptyRedeemCode && (
              <Tooltip title="Xoá mã giảm giá">
                <IconButton style={{ padding: 0 }} onClick={handleRemoveRedeemCode}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
          {redeemText && renderPromotionText()}
          <Divider className={styles.divider} />
          <PaymentButton
            user={user}
            isContinuePayment
            handlePayment={handleSubmitPayment}
            isErrorCartItem={isErrorCartItem}
            isOverWeightOrVolume={isOverWeightOrVolume}
            isUseInvalidVoucher={!canUse && !isEmptyRedeemCode}
            isSelectedProducts={isSelectedProducts}
            checkConditionTerms={checkConditionTerms}
          />
        </div>
      </div>
      {showPopupPromo && (
        <DynamicPromoListModalV2
          visible={showPopupPromo}
          onClose={togglePopupPromo}
          handleChangePromo={handleChangePromo}
          redeemCode={redeemCode}
          subPrice={price}
          accountId={accountID}
          customerID={customerID}
          currentPage={currentPage}
        />
      )}
    </>
  );
}

export default memo(BulkOrderCart);
