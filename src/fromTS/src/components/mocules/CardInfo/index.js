import { Button, Divider, Grid, IconButton, Tooltip, Typography } from '@material-ui/core';
import { LocalOfferOutlined } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { CartClientV2, isValid } from 'clients';
import clsx from 'clsx';
import ErrorProductsPayment from 'components-v2/mocules/ErrorProductsPayment';
import PromoListModalV2 from 'components-v2/mocules/PromoListModalV2';
import { ButtonDefault, LinkComp } from 'components/atoms';
import { ENUM_TRACKING_ACTION } from 'constants/Enums';
import { DELETE_VOUCHER_ICON, GIFT_ICON2 } from 'constants/Images';
import { CART_URL, CHECKOUT_URL, QUICK_ORDER } from 'constants/Paths';
import { useAuth, useCart } from 'context';
import { useModal } from 'hooks';
import Router, { useRouter } from 'next/router';
import { Tracking, gtag } from 'utils';
import { formatCurrency } from 'utils/FormatNumber';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import { isEmpty } from 'utils/ValidateUtils';
import { useStore } from 'zustand-lib/storeGlobal';
import styles from './style.module.css';

const DeleteIconButton = (props) => (
  <Tooltip title="Xoá mã giảm giá">
    <IconButton {...props} style={{ padding: 0, marginLeft: 10 }} data-test="btn-del-promo">
      <ImageFallbackStatic src={DELETE_VOUCHER_ICON} alt="icon del voucher" height="17" width="19" className={styles.icon_del} />
    </IconButton>
  </Tooltip>
);
const handleToCheckout = () => {
  Router.push(CHECKOUT_URL);
};

const PaymentButton = ({
  user,
  isErrorCartItem,
  isErrorImportant,
  offPayment = false,
  isOverWeightOrVolume,
  totalSellectProduct,
  isUseInvalidVoucher,
}) => (
  <>
    <ButtonDefault
      disabled={
        isErrorCartItem ||
        isErrorImportant ||
        !user?.isActive ||
        (user.guestId && user.guestId > 0) ||
        offPayment ||
        isOverWeightOrVolume ||
        totalSellectProduct.length === 0 ||
        isUseInvalidVoucher
      }
      className={clsx('payment_button', styles.continue_btn)}
      onClick={handleToCheckout}
      data-test="btn-continue-payment"
    >
      TIẾP TỤC THANH TOÁN
    </ButtonDefault>
  </>
);

const CardInfo = ({ cart, promo, className, user, isMobile }) => {
  const {
    totalQuantity = 0,
    price,
    reloadDataCart,
    redeemCode,
    // promoInfo,
    redeemApplyResult,
    cartNo,
    subPrice = 0,
    isErrorCartItem = false,
    isErrorImportant = false,
    isOverWeightOrVolume,
    messageOverWeightOrVolume,
    // totalItemSelected = 0,
    totalQuantitySelected = 0,
    totalPriceAllItem = 0,
    cartItems: products = [],
    errProducts = [],
    handleScrollToGiftRow
    // totalPrice = 0,
  } = useCart();

  const {
    user: { accountID = '', customerID = '' },
  } = useAuth();

  // TODO: feature-debt
  const debt = useStore((state) => state.getDebt());
  // const availableDebtBalanceFormated = useStore((state) => state.getAvailableDebtBalance({ isFormated: true }));

  const router = useRouter();
  // isPageCart ? totalPrice nếu trang cart có sellected thì lấy field totalPrice chỉ tính giá các sản phẩm đã sellected
  const isPageCart = router.pathname === '/cart';
  const currentPage = window.location.href;
  const [showPopupPromo, togglePopupPromo] = useModal(false);
  const handleSetPromoVisible = () => {
    togglePopupPromo();
    gtag.viewPromotion();

    // TRACKING ACTION
    Tracking.trackingFunc(ENUM_TRACKING_ACTION.CLICK_OPEN_VOUCHER_POPUP_ON_CART_PAGE, {
      accountId: accountID,
      customerID,
      page: '/cart',
      currentPage,
      isMobile,
    });
  };

  const handleRemoveRedeemCode = async () => {
    const res = await CartClientV2.updateRedeemCode([], cartNo);
    reloadDataCart({
      cartRes: res,
      successMessage: 'Xoá mã giảm giá thành công',
      errorMessage: 'Xoá mã giảm giá thất bại',
      isReloadData: true,
    });
  };

  const handleChangePromo = async (code, name = null) => {
    togglePopupPromo();
    const res = await CartClientV2.updateRedeemCode([code], cartNo);
    if (isValid(res)) {
      gtag.selectPromotion([{ id: code, name }]);
    }
    reloadDataCart({
      cartRes: res,
      successMessage: 'Thêm mã giảm giá thành công',
      errorMessage: 'Thêm mã giảm giá thất bại',
      isReloadData: true,
    });
  };
  // khi không có sp dc chọn thì check điều kiện apply
  const totalSellectProduct = products.map((product) => product.isSelected).filter(Boolean);
  // useEffect(() => {
  //   async function removePromoNotSellectAll() {
  //     await CartClientV2.updateRedeemCode([], cartNo);
  //     reloadDataCart({
  //       isReloadData: true,
  //     });
  //   }
  //   if (isSellectProduct.length === 0) removePromoNotSellectAll();
  // }, [isSellectProduct.length]);
  const redeemRs = redeemApplyResult && redeemApplyResult?.find((item) => !item?.autoApply);
  const autoRedeemRs = redeemApplyResult && redeemApplyResult?.find((item) => item?.autoApply && item?.canUse === true);
  const {
    code: redeemText = '',
    canUse: isCanApplyVoucherCode = false,
    discountValue: discountValueManual = 0,
    gifts: giftsManual = null,
    message: messageApplyVoucherCode,
  } = redeemRs || {};
  const totalGiftManual = (giftsManual?.length > 0 && giftsManual.reduce((a, b) => a + b.quantity, 0)) || 0;
  const { discountValue: discountValueAuto = 0, gifts: giftsAuto = null } = autoRedeemRs || {};
  const listRedeemManual = redeemApplyResult?.filter((item) => !item?.autoApply);
  const isEmptyRedeemCode = isEmpty(listRedeemManual);
  const totalGiftAuto = (giftsAuto?.length > 0 && giftsAuto.reduce((a, b) => a + b.quantity, 0)) || 0;

  // fix page quickorder bug price -> hidden text discount
  const pageQuickOrder = '/quick-order';

  const isErrorCart =
    !user?.isActive ||
    user?.isQuest ||
    isErrorCartItem ||
    isErrorImportant ||
    totalSellectProduct.length === 0 ||
    (!isCanApplyVoucherCode && !isEmptyRedeemCode);

  return (
    <div className={className}>
      <Grid className={clsx(styles.container)} container>
        <Grid container item>
          <Grid xs={12} container alignItems="center" justifyContent="space-between" direction="row" item style={{ padding: '10px 0 0 0' }}>
            <Typography className={styles.text}>Số lượng</Typography>
            <Typography className={styles.number} data-test="cart-items-num">
              {isPageCart ? totalQuantitySelected : totalQuantity}
            </Typography>
          </Grid>
          {router.pathname !== pageQuickOrder && (
            <>
              <Grid xs={12} direction="row" container alignItems="center" justifyContent="space-between" item style={{ paddingTop: '13px' }}>
                <Typography className={styles.text}>Tạm tính</Typography>
                <Typography className={styles.number}>{formatCurrency(Math.max(price, 0))}</Typography>
              </Grid>
              <Divider style={{ width: '100%', marginTop: '13px' }} />
            </>
          )}
          {debt?.isActive && router.pathname !== pageQuickOrder && (
            <Grid
              xs={12}
              container
              alignItems="center"
              justifyContent="space-between"
              direction="row"
              className={clsx(styles.wrapper, styles.text_center, styles.quantity_border)}
              item
            >
              <Typography className={styles.text}>Hạn mức còn lại (tạm tính)</Typography>
              <Typography className={clsx(styles.number, styles.price)}>{debt?.balanceFormated}</Typography>
            </Grid>
          )}
        </Grid>
        {promo && (
          <Grid container style={{ width: '100%', padding: '13px 0' }}>
            <Typography className={styles.text}>Ưu đãi</Typography>
            {(discountValueAuto > 0 || giftsAuto) && (
              <Grid item style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', padding: '10px 0' }}>
                <Typography className={styles.text_auto}>Tự động áp dụng</Typography>
                {discountValueAuto > 0 ? (
                  <Typography className={styles.numberDiscount}>-{formatCurrency(discountValueAuto)}</Typography>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', cursor: "pointer" }} onClick={handleScrollToGiftRow} role="button">
                    <Typography style={{ marginRight: '5px', fontFamily: 'ggsm', fontSize: '14px' }}>x{totalGiftAuto}</Typography>
                    <ImageFallbackStatic src={GIFT_ICON2} alt="icon del voucher" height="19" width="19" />
                  </div>
                )}
              </Grid>
            )}
            <Grid item style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', padding: '10px 0' }}>
              <div className={styles.promo_left}>
                {isEmptyRedeemCode ? (
                  <>
                    <LocalOfferOutlined fontSize="small" style={{ color: '#09884D' }} className={styles.icon_promo} />
                    <Typography className={styles.text} style={{ color: '#09884D' }}>
                      Mã giảm giá & quà tặng
                    </Typography>
                  </>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <LocalOfferOutlined
                      fontSize="small"
                      style={{ color: isCanApplyVoucherCode ? '#09884D' : '#919aa3' }}
                      className={styles.icon_promo}
                    />
                    <Tooltip title="Thay đổi mã giảm giá">
                      <Typography
                        className={styles.text}
                        style={{ color: isCanApplyVoucherCode ? '#09884D' : '#919aa3', textDecoration: !isCanApplyVoucherCode && 'line-through' }}
                        onClick={() => {
                          handleSetPromoVisible();
                          if (isEmptyRedeemCode) {
                            gtag.clickUsePromoCode();
                          }
                        }}
                        data-test="cart-use-promotion"
                      >
                        {redeemText}
                      </Typography>
                    </Tooltip>
                    <DeleteIconButton onClick={handleRemoveRedeemCode} />
                  </div>
                )}
              </div>
              {isEmptyRedeemCode ? (
                <Button
                  onClick={() => {
                    handleSetPromoVisible();
                    if (isEmptyRedeemCode) {
                      gtag.clickUsePromoCode();
                    }
                  }}
                  className={styles.button}
                >
                  Dùng mã
                </Button>
              ) : (
                (discountValueManual > 0 && (
                  <Typography className={styles.numberDiscount}>{`- ${formatCurrency(discountValueManual)}`}</Typography>
                )) ||
                (giftsManual?.length > 0 && (
                  <Tooltip title="Xem quà tặng"> 
                    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleScrollToGiftRow} role="button"> 
                      <Typography style={{ marginRight: '5px', fontFamily: 'ggsm', fontSize: '14px' }}>x{totalGiftManual}</Typography>
                      <ImageFallbackStatic src={GIFT_ICON2} alt="icon voucher" height="19" width="19" />
                    </div>
                  </Tooltip>
                )) ||
                null
              )}
            </Grid>
            {!isCanApplyVoucherCode && !isEmptyRedeemCode && (
              <Typography style={{ fontSize: 'small' }}>
                <i>{messageApplyVoucherCode}</i>
              </Typography>
            )}
          </Grid>
        )}
        {router.pathname !== pageQuickOrder && <Divider style={{ width: '100%' }} />}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', padding: '13px 0' }}>
          <Typography className={styles.text_totalPrice}>Tổng tiền</Typography>
          <Typography className={styles.numberTotalPrice}> {formatCurrency(isPageCart ? Math.max(subPrice, 0) : totalPriceAllItem)}</Typography>
        </div>

        <Grid xs={12} container item style={{ padding: '10px 0' }}>
          {cart ? (
            <PaymentButton
              user={user}
              isErrorCartItem={isErrorCartItem}
              isErrorImportant={isErrorImportant}
              isOverWeightOrVolume={isOverWeightOrVolume}
              totalSellectProduct={totalSellectProduct}
              isUseInvalidVoucher={!isCanApplyVoucherCode && !isEmptyRedeemCode}
            />
          ) : (
            <LinkComp href="/cart" className={styles.btn} title="Qua lại trang giỏ hàng">
              XEM GIỎ HÀNG
            </LinkComp>
          )}
        </Grid>
        {/* <PromoListModal
          visible={showPopupPromo}
          onClose={togglePopupPromo}
          handleChangePromo={handleChangePromo}
          redeemCode={redeemCode}
          subPrice={price}
        /> */}
        {cart && (
          <PromoListModalV2
            visible={showPopupPromo}
            onClose={togglePopupPromo}
            handleChangePromo={handleChangePromo}
            redeemCode={redeemCode}
            subPrice={price}
            isMobile={isMobile}
            accountId={accountID}
            customerID={customerID}
            currentPage={currentPage}
            redeemApplyResult={redeemApplyResult}
          />
        )}
      </Grid>
      {router.pathname === CART_URL && (
        <Grid className={styles.wrapper} xs={12} container item data-test="cart-continue-order">
          <LinkComp className={clsx(styles.counpon_button, styles.quick_link)} name="< Tiếp tục đặt hàng" href={QUICK_ORDER} color="#00b46e" />
        </Grid>
      )}
      {isOverWeightOrVolume && <Alert severity="error">{messageOverWeightOrVolume}</Alert>}
      {isErrorCart && cart && (
        <>
          <Alert severity="error" className={styles.text_err_notification}>
            Xin vui lòng kiểm tra lại thông tin giỏ hàng:
            <ul>
              {!user?.isActive && (
                <li>
                  Tạm thời chưa thanh toán được vì tài khoản chưa được kích hoạt. Quý khách vui lòng liên hệ bộ phận chăm sóc khách hàng qua số điện
                  thoại
                  <a href="tel:02873008840"> 028 7300 8840</a> để được hỗ trợ.
                </li>
              )}
              {user?.isQuest && (
                <li>
                  Đây là tài khoản dùng thử. Giỏ hàng sẽ không thể lưu và thanh toán được. Xin bạn vui lòng tạo tài khoản cá nhân để sử dụng tính năng
                  này! Cảm ơn!
                </li>
              )}
              {isErrorCartItem && (
                <li>Xin vui lòng kiểm tra lại thông tin giỏ hàng. Trong giỏ hàng của quý khách có sản phẩm không đủ điều kiện để thanh toán.</li>
              )}
              {isErrorImportant && <li>Số lượng sản phẩm quan trọng không đúng. Vui lòng kiểm tra lại giỏ hàng.</li>}
              {totalSellectProduct.length === 0 && (
                <li>Bạn chưa chọn sản phẩm để thanh toán, vui lòng chọn ít nhất 1 sản phẩm để tiến hành thanh toán</li>
              )}
              {!isCanApplyVoucherCode && !isEmptyRedeemCode && <li>Đơn hàng không thể tiếp tục thanh toán do có mã giảm giá không hợp lệ.</li>}
            </ul>
          </Alert>
          {errProducts?.length > 0 && <ErrorProductsPayment />}
        </>
      )}
    </div>
  );
};

export default CardInfo;
