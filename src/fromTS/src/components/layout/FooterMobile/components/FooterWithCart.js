import { Button, IconButton, Typography } from '@material-ui/core';
// import { LocalOfferOutlined } from '@material-ui/icons';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { CartClientV2 } from 'clients';
import PromoListV2Mobile from 'components-v2/mocules/PromoListV2Mobile';
import { ENUM_TRACKING_ACTION } from 'constants/Enums';
import { DELETE_VOUCHER_ICON, GIFT_ICON2 } from 'constants/Images';
import { CART_URL, CHECKOUT_URL } from 'constants/Paths';
import { useAuth, useCart } from 'context';
import { useModal } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FormatNumber, Tracking, gtag } from 'utils';
import { formatCurrency } from 'utils/FormatNumber';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import { isEmpty } from 'utils/ValidateUtils';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from '../styles.module.css';

const DeleteIconButton = (props) => (
  <IconButton {...props} style={{ padding: 0, marginLeft: 10 }}>
    <ImageFallbackStatic src={DELETE_VOUCHER_ICON} alt="delete voucher" height="17" width="19" />
  </IconButton>
);
const FooterWithCart = ({ isMobile }) => {
  const {
    totalQuantity = 0,
    totalQuantitySelected = 0,
    updateCart,
    redeemCode,
    subPrice,
    cartNo,
    price,
    isErrorCartItem,
    isErrorImportant,
    redeemApplyResult,
    // promoInfo,
    isOverWeightOrVolume,
    totalPriceAllItem = 0,
    // totalPrice = 0, ccm,zmc,mc,.xz,x.z/Ls,almdlmf ccm,zmc,mc,.xz,x.z/Ls,almdlmf
    // discount = 0,
    havingItemSelected,
    handleScrollToGiftRow
  } = useCart();
  const isRedeemCode = redeemCode?.length > 0;
  const beta = useMobileV2((state) => state.beta);
  const { user } = useAuth();
  const { accountID: accountId = '', customerID = '' } = user || {};
  const router = useRouter();
  // const isPageCart = router.pathname === CART_URL;
  // const [promoVisible, setPromoVisible] = useModal(false);
  const [showPopupPromo, togglePopupPromo] = useModal(false);
  const redeemRs = redeemApplyResult && redeemApplyResult?.find((item) => !item?.autoApply);
  const redeemAuto = redeemApplyResult?.find((item) => item.autoApply);
  const { code, canUse: isCanApplyVoucherCode = false, discountValue: discountValueManual = 0, gifts: giftsManual = null } = redeemRs || {};
  const totalGiftManual = (giftsManual?.length > 0 && giftsManual.reduce((a, b) => a + b.quantity, 0)) || 0;
  const { discountValue: discountValueAuto = 0, gifts: giftsAuto = null } = redeemAuto || {};
  const totalGiftAuto = (giftsAuto?.length > 0 && giftsAuto.reduce((a, b) => a + b.quantity, 0)) || 0;

  const redeemText = code || '';
  // const descriptionRewards = promoInfo?.rewardsVi.map((reward) => reward?.message || '');
  const redeemManualList = redeemApplyResult?.filter((item) => !item?.autoApply);
  const isEmptyRedeemCode = isEmpty(redeemManualList);

  const isQuickOrder = router.pathname !== CART_URL && router.pathname !== CHECKOUT_URL;
  // check price quick order
  const priceDisplayQuickOrder = isQuickOrder
    ? FormatNumber.formatCurrency(Math.max(totalPriceAllItem, 0))
    : FormatNumber.formatCurrency(Math.max(subPrice, 0));

  const handleSetPromoVisible = () => {
    togglePopupPromo();
    Tracking.trackingFunc(ENUM_TRACKING_ACTION.CLICK_OPEN_VOUCHER_POPUP_ON_CART_PAGE, {
      accountId,
      customerID,
      page: '/cart',
      currentPage: window.location.href,
      isMobile,
    });
  };

  const handleRemoveRedeemCode = async () => {
    const res = await CartClientV2.updateRedeemCode([], cartNo);
    updateCart({ cartRes: res, successMessage: 'Xoá mã giảm giá thành công' });
  };

  const handleChangePromo = async (value) => {
    togglePopupPromo();
    const res = await CartClientV2.updateRedeemCode([value], cartNo);
    updateCart({ cartRes: res, successMessage: 'Thêm mã giảm giá thành công' });
    Tracking.trackingFunc(ENUM_TRACKING_ACTION.CLICK_APPLY_VOUCHER_ON_CART_PAGE, {
      accountId,
      customerID,
      page: '/cart',
      currentPage: window.location.href,
      isMobile,
    });
  };

  const DisplayPrice = () => {
    if (isRedeemCode && price !== subPrice && !isQuickOrder)
      return (
        <div className={styles.discount}>
          <div className={styles.price}>{FormatNumber.formatCurrency(price)}</div>
          <div className={styles.total}>{FormatNumber.formatCurrency(subPrice)}</div>
        </div>
      );
    // isPageCart ? totalPrice nếu trang cart có sellected thì lấy field totalPrice chỉ tính giá các sản phẩm đã sellected
    return <div className={styles.total}>{priceDisplayQuickOrder}</div>;
  };

  const DisplayPriceMobile = () => (
    <>
      {!isQuickOrder && isRedeemCode && price !== subPrice && <div className={styles.priceM}>{FormatNumber.formatCurrency(price)}</div>}
      <div className={styles.price_and_quantity}>
        <div className={styles.display_quantity}>Tổng SL ({isQuickOrder ? totalQuantity : totalQuantitySelected} sản phẩm) </div>
        <div className={styles.display_price_containerM}>
          <div className={styles.display_price}>{priceDisplayQuickOrder}</div>
        </div>
      </div>
    </>
  );
  const checkRenderDisplayPrice = () => {
    if (beta) {
      return <DisplayPriceMobile />;
    }
    return <DisplayPrice />;
  };

  return (
    <>
      {router.pathname === CART_URL && (
        <div className={styles.promo_wrapper}>
          <div>
            {(discountValueAuto > 0 || giftsAuto) && (
              <div className={styles.promo_box}>
                <div>
                  <Typography style={{ fontFamily: 'ggsr', padding: 0, fontSize: 14 }}>Tự động áp dụng</Typography>
                </div>
                <>
                  {discountValueAuto > 0 ? (
                    <Typography className={styles.number}>{formatCurrency(-discountValueAuto)}</Typography>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', cursor: "pointer" }} onClick={handleScrollToGiftRow} role="button">
                      <Typography style={{ marginRight: '5px', fontFamily: 'ggsr', fontSize: 14 }}>x{totalGiftAuto}</Typography>
                      <ImageFallbackStatic src={GIFT_ICON2} alt="icon del voucher" height="19" width="19" />
                    </div>
                  )}
                </>
              </div>
            )}

            <div className={styles.promo_box}>
              <div className={styles.left_c}>
                {/* <LocalOfferOutlined fontSize="small" style={{ color: '#09884D' }} className={styles.icon_promo} /> */}
                <Typography
                  onClick={() => {
                    handleSetPromoVisible();
                    if (isEmptyRedeemCode) {
                      gtag.clickUsePromoCode();
                    }
                  }}
                  style={{ fontSize: 14, maxWidth: '250px', lineBreak: 'anywhere' }}
                  className={!isCanApplyVoucherCode && !isEmptyRedeemCode ? styles.textLineThrought : ''}
                >
                  {!isEmptyRedeemCode ? redeemText : 'Dùng mã giảm giá'}
                </Typography>
                {!isEmptyRedeemCode ? <DeleteIconButton onClick={handleRemoveRedeemCode} /> : <div />}
              </div>
              {!isEmptyRedeemCode ? (
                <>
                  {(discountValueManual > 0 && (
                    <Typography style={{ fontFamily: 'ggsr', fontSize: 14 }}>{`- ${formatCurrency(discountValueManual)}`}</Typography>
                  )) ||
                    (giftsManual?.length > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleScrollToGiftRow} role="button">
                        <Typography style={{ marginRight: '5px', fontFamily: 'ggsr', fontSize: 14 }}>x{totalGiftManual}</Typography>
                        <ImageFallbackStatic src={GIFT_ICON2} alt="icon del voucher" height="19" width="19" />
                      </div>
                    )) ||
                    null}
                </>
              ) : (
                <NavigateNextIcon
                  onClick={() => {
                    handleSetPromoVisible();
                    if (isEmptyRedeemCode) {
                      gtag.clickUsePromoCode();
                    }
                  }}
                  style={{ color: '#09884D' }}
                />
              )}
            </div>
            {/* <PromoListModalV2
              visible={promoVisible}
              onClose={handleSetPromoVisible}
              handleChangePromo={handleChangePromo}
              redeemCode={redeemCode}
              subPrice={subPrice}
              isMobile={isMobile}
            /> */}
            <PromoListV2Mobile
              visible={showPopupPromo}
              onClose={togglePopupPromo}
              handleChangePromo={handleChangePromo}
              redeemCode={redeemCode}
              subPrice={price}
              currentPage={window.location.href}
              isMobile={isMobile}
            />
          </div>
        </div>
      )}

      <div className={beta ? styles.fwc_wrapperM : styles.fwc_wrapper}>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }} className={beta && styles.dflex_direction}>
          <div style={{ flexGrow: 1 }} className={beta && styles.priceMobile}>
            {checkRenderDisplayPrice()}
          </div>
          <>
            {router.pathname === CHECKOUT_URL && (
              <Link href="/checkout" prefetch={false}>
                <Button
                  classes={{
                    label: styles.label,
                    outlined: styles.outlined,
                    root: beta ? styles.btn_checkoutMobile : styles.btn_checkout,
                  }}
                  className={styles.disabled}
                  variant="outlined"
                  disabled={user.isQuest || isOverWeightOrVolume}
                >
                  Thanh toán
                </Button>
              </Link>
            )}
            {/* card page */}
            {router.pathname === CART_URL && (
              <Link href="/checkout" prefetch={false}>
                <Button
                  classes={{
                    label: styles.label,
                    outlined: styles.outlined,
                    root: beta ? styles.btn_checkoutMobile : styles.btn_checkout,
                    disabled: beta && styles.btn_disabledMobile,
                  }}
                  variant="outlined"
                  disabled={
                    user.isQuest ||
                    isErrorCartItem ||
                    isOverWeightOrVolume ||
                    isErrorImportant ||
                    (!isCanApplyVoucherCode && !isEmptyRedeemCode) ||
                    !havingItemSelected
                  }
                >
                  Tiếp tục
                </Button>
              </Link>
            )}
            {/* quick order page */}
            {isQuickOrder && (
              <Link href="/cart" prefetch={false}>
                <Button
                  classes={{
                    label: styles.label,
                    outlined: beta ? styles.outlinedMobile : styles.outlined,
                    root: beta ? styles.btn_checkoutMobile : styles.root,
                    disabled: beta && styles.btn_disabledMobile,
                  }}
                  variant="outlined"
                  disabled={totalQuantity === 0}
                >
                  {beta ? 'Xem Giỏ Hàng' : `Giỏ hàng (${totalQuantity}) `}
                </Button>
              </Link>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default React.memo(FooterWithCart);
