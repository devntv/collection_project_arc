import { Checkbox, Divider, FormControlLabel, Paper, Tooltip, Typography } from '@material-ui/core';
import { LocalOfferOutlined } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import { Alert } from '@material-ui/lab';
import { CustomerClient, getFirst, isValid, isValidWithoutData } from 'clients';
import BotClient from 'clients/BotClient';
import clsx from 'clsx';
import ErrorProductsPayment from 'components-v2/mocules/ErrorProductsPayment';
import ModalListProduct from 'components-v2/mocules/ModalListProduct';
import { ButtonDefault, LinkComp } from 'components/atoms';
import CustomModal from 'components/mocules/CustomModal';
import { ARR_REMOVE_PRODUCT, BRAND_NAME, HTTP_STATUS, PAYMENT_METHOD, TYPE_CUSTOMER_BY_COLOR } from 'constants/Enums';
import { ERROR_CART, ERROR_CODE_CART, ERROR_PRODUCTS } from 'constants/ErrorCart';
import { GIFT_ICON2 } from 'constants/Images';
import { CART_URL, TERMS_URL, THANKYOU_URL } from 'constants/Paths';
import { useAuth, useCart, useProduct } from 'context';
import { useModal } from 'hooks';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { CartService } from 'services';
import AddressService from 'services/AddressService';
import { FEATURE_SHOW_BUTTON_VERIFY_CART } from 'sysconfig';
import { FormatNumber, gtag, NotifyUtils } from 'utils';
import { formatCurrency, formatNumber } from 'utils/FormatNumber';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import Insider from 'utils/Insider';
import { useStore } from 'zustand-lib/storeGlobal';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from './styles.module.css';
import validateForm from './validateForm';
import VerifyPaymentDiablog from './VerifyPaymentDiablog';

// chưa lên popup chan tag 7 ngay
// const isHaveTag7Ngay = (items, dataCustomer) => {
//   if (REGION_MB.indexOf(`${dataCustomer?.provinceCode}`) < 0) {
//     return false;
//   }
//   let result = false;
//   items
//     ?.filter((item) => item.isSelected)
//     .forEach((item) => {
//       const resultItem = item?.productTags?.find((tag) => tag === TAG_HANG_DAT_TRUOC) || false;
//       if (resultItem) result = resultItem;
//     });

//   return result;
// };
const ERROR_REDIRECT_TO_CART = [
  ERROR_CODE_CART.VOUCHER_CODE_INVALID,
  ERROR_CODE_CART.VOUCHER_NOT_MATCH,
  ERROR_CODE_CART.COMBO_INVALID,
  ERROR_CODE_CART.TYPE_INVALID,
  ERROR_CODE_CART.QUANTITY_INVALID,
  ERROR_CODE_CART.SKU_MISSING,
  ERROR_CODE_CART.SKU_NOT_FOUND,
  ERROR_CODE_CART.TOTAL_PRICE_NOT_MATCH,
];

// comp thanh toán , sticky
const CheckoutSticky = ({
  data,
  dataCustomer,
  onSetError,
  isMobile,
  onLoading,
  isSaveInfo,
  user,
  invoice,
  invoices = [],
  cart,
  currentAddress,
  deliveryLimitData, // savedInfo,
}) => {
  const {
    redeemCode = [],
    price = 0,
    totalPrice = 0,
    deliveryMethodFee = 0,
    paymentMethodFee = 0,
    totalItemSelected = 0,
    // discount = 0,
    updateCart,
    redeemApplyResult = [],
    cartNo,
    extraFee = null,
    extraFeeNote = null,
    isOverWeightOrVolume,
    cartItems,
    // subPrice = 0,
    errProducts = [],
    removeCartItem,
    selectCartItem,
    removeImportant,
  } = useCart();
  const redeemRs = redeemApplyResult && redeemApplyResult?.find((item) => !item?.autoApply && item?.canUse === true);
  const autoRedeemRs = redeemApplyResult && redeemApplyResult?.find((item) => item?.autoApply && item?.canUse === true);
  const { code, discountValue: discountValueManual = 0, gifts: giftsManual = null } = redeemRs || {};
  const { discountValue: discountValueAuto = 0, gifts: giftsAuto = null } = autoRedeemRs || {};
  const totalGiftManual = (giftsManual?.length > 0 && giftsManual.reduce((a, b) => a + b.quantity, 0)) || 0;
  const totalGiftAuto = (giftsAuto?.length > 0 && giftsAuto.reduce((a, b) => a + b.quantity, 0)) || 0;

  const getSellerByCode = useStore((state) => state.getSellerByCode);

  const { handleRedCustomer } = useAuth();
  // TODO: feature-debt
  const debt = useStore((state) => state.getDebt());
  // const availableBalanceFormated = useStore((state) => state.getAvailableDebtBalance({ isFormated: true }));
  const { beta } = useMobileV2();
  const { clearMapProduct } = useProduct();
  // const { user } = useAuth();
  const needToBuy = () => {
    if (extraFee) {
      if (data.customerProvinceCode === '79' || data.customerProvinceCode === '01') return 1500000 - price;
      return 2000000 - price;
    }
    return 0;
  };

  // kiem tra loi truoc khi thanh toan
  // const [verifyNotice, setVerifyNotice] = useState(false);

  // doing: chỗ này là togggle popup
  const [showModal] = useModal();
  const router = useRouter();
  const [showConfirmModal, toggleConfirm] = useModal(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [checkCondition, setCheckCondition] = useState({
    checked: true,
  });
  const deliveryData = dataCustomer.deliveryMethods.filter((item) => item.code === dataCustomer.deliveryMethod) || [];

  const subTitleDelivery = deliveryData?.[0]?.subTitle || null;
  const paymentData = dataCustomer.paymentMethods.filter((item) => item.code === dataCustomer.paymentMethod) || [];
  const subTitlePayment = paymentData?.[0]?.subTitle || null;

  const GreenCheckbox = React.memo((props) => <Checkbox classes={{ root: styles.checkbox }} color="default" {...props} />);

  const { district, province, ward } = currentAddress || {};
  let deliveryLimitMessage = '';
  let deliveryLimitCheck = false;

  const handleCheckCondition = (event) => {
    setCheckCondition({ ...checkCondition, [event.target.name]: event.target.checked });
  };

  const GreenCheckBoxElement = (
    <GreenCheckbox checked={checkCondition.checked} onChange={handleCheckCondition} name="checked" data-test="checkbox-checkout-terms-of-use" />
  );
  const LabelConfirm = (
    <span className={styles.check_agree_txt}>
      Tôi đồng ý với
      <LinkComp href={TERMS_URL} color="#00b46e" target>
        &nbsp;Điều khoản sử dụng
      </LinkComp>
    </span>
  );

  // const offPayment = user?.settings?.isDisablePayment;

  const validateSubmit = (formData) => {
    try {
      validateForm(formData, onSetError);
      return true;
    } catch (error) {
      NotifyUtils.error(error.message);
      return false;
    }
  };
  const handleVerify = async () => {
    onLoading(true);
    const formValue = {
      ...data,
      ...dataCustomer,
      invoice: {
        ...invoice,
        email: data.customerEmail || dataCustomer.customerEmail,
      },
      cartNo,
    };
    Object.keys(formValue).forEach((key) => {
      if (typeof formValue[key] === 'string') formValue[key] = formValue[key].trim();
    });
    if (!validateSubmit(formValue)) {
      onLoading(false);
      return;
    }
    if (!checkCondition.checked) {
      onLoading(false);
      NotifyUtils.error(`Bạn chưa chấp nhận điều khoản sử dụng`);
      return;
    }

    // validate provinces

    const districts = await AddressService.getDistrictsByProvince(formValue.customerProvinceCode);
    if (!districts) {
      NotifyUtils.error('Không tìm thấy thông tin quận phường, F5 để thử lại');
      onLoading(false);
      return;
    }

    const isExistDistrict = districts.find((item) => item.value === formValue.customerDistrictCode);

    if (!isExistDistrict) {
      NotifyUtils.error('Không tìm thấy thông tin quận phường, F5 để thử lại');
      onLoading(false);
      return;
    }
    // Validate
    const dataValidate = {
      ...formValue,
      totalPrice,
      voucherCode: redeemCode[0],
      skus: cartItems?.filter((item) => item.isSelected || item.type === 'GIFT')?.map(({ sku, quantity, type }) => ({ sku, type, quantity })) || [],
    };

    const validateRs = await CartService.validateCart({ body: dataValidate });

    NotifyUtils.success(JSON.stringify(validateRs));
    BotClient.sendMesageBotOrderVn({ message: `Test validate - ${user?.phone || ''} : ${JSON.stringify(validateRs || {})}` });
    onLoading(false);
  };

  const handleSubmit = async () => {
    onLoading(true);
    clearMapProduct();
    const formValue = {
      ...data,
      ...dataCustomer,
      invoice: {
        ...invoice,
        email: data.customerEmail || dataCustomer.customerEmail,
      },
      cartNo,
    };
    Object.keys(formValue).forEach((key) => {
      if (typeof formValue[key] === 'string') formValue[key] = formValue[key].trim();
    });
    if (!validateSubmit(formValue)) {
      onLoading(false);
      return;
    }
    if (!checkCondition.checked) {
      onLoading(false);
      NotifyUtils.error(`Bạn chưa chấp nhận điều khoản sử dụng`);
      return;
    }

    // validate provinces

    const districts = await AddressService.getDistrictsByProvince(formValue.customerProvinceCode);
    if (!districts) {
      NotifyUtils.error('Không tìm thấy thông tin quận phường, F5 để thử lại');
      onLoading(false);
      return;
    }

    const isExistDistrict = districts.find((item) => item.value === formValue.customerDistrictCode);

    if (!isExistDistrict) {
      NotifyUtils.error('Không tìm thấy thông tin quận phường, F5 để thử lại');
      onLoading(false);
      return;
    }
    // Validate
    const dataValidate = {
      ...formValue,
      totalPrice,
      voucherCode: redeemCode[0],
      skus: cartItems?.filter((item) => item.isSelected || item.type === 'GIFT')?.map(({ sku, quantity, type }) => ({ sku, type, quantity })) || [],
    };

    const validateRs = await CartService.validateCart({ body: dataValidate });
    if (!isValidWithoutData(validateRs)) {
      // nếu voucher, giỏ hàng lỗi sẽ tự động redirect về giỏ Hàng
      // APO-1559
      if (ERROR_REDIRECT_TO_CART.includes(validateRs?.errorCode)) {
        router.replace(CART_URL);
        NotifyUtils.error(ERROR_CART[validateRs?.errorCode] || validateRs?.message || 'Đã có lỗi khi thanh toán, vui lòng kiểm tra lại giỏ hàng');
        return;
      }
      if (validateRs?.errorCode === TYPE_CUSTOMER_BY_COLOR.LOCKED_CUSTOMER && handleRedCustomer()) {
        return;
      }
      // APO-1559
      // gom những error code về sản phẩm thành 1 thông báo
      if (ERROR_PRODUCTS.includes(validateRs?.errorCode)) {
        NotifyUtils.error('Đơn hàng có sản phẩm lỗi thanh toán. Kiểm tra lại danh sách lỗi phía dưới.');
        onLoading(false);
        await updateCart();
        return;
      }
      NotifyUtils.error(ERROR_CART[validateRs?.errorCode] || validateRs?.message || 'Đã có lỗi khi thanh toán, vui lòng kiểm tra lại giỏ hàng');
      onLoading(false);
      BotClient.sendMesageBotOrderVn({ message: `TS validate error - ${user?.phone || ''}: ${JSON.stringify(validateRs || {})}` });
      return;
    }

    if (
      invoices &&
      invoices.length < 10 &&
      invoice &&
      invoice.invoiceRequest &&
      invoices.findIndex((item) => item.code === invoice.code) === -1 &&
      invoices.filter(
        ({ taxCode, companyName, companyAddress }) =>
          taxCode === invoice.taxCode && companyName === invoice.companyName && companyAddress === invoice.companyAddress,
      )?.length === 0
    ) {
      await CustomerClient.createInvoiceInfo({ body: invoice });
    }

    const response = await CartService.checkoutCart(formValue);

    if (isValid(response)) {
      // TODO: insider
      Insider.confirmation();
      // FB event tracking purchase
      const dataOrder = getFirst(response);
      if (dataOrder) {
        // fbpixel.purchase({
        //   value: dataOrder.totalPrice,
        //   num_items: dataOrder.totalQuantity,
        // });

        // gtag
        const GATrackCart = { ...cart };
        GATrackCart.cartItems = cart?.cartItems?.map((prd) => ({ ...prd, sellerInfo: getSellerByCode(prd?.sellerCode) })) || [];
        gtag.purchase(GATrackCart);
      }

      if (isSaveInfo) {
        const address = {
          code: formValue.customerAddressCode,
          name: formValue.customerName,
          phone: formValue.customerPhone,
          email: formValue.customerEmail,
          address: formValue.customerShippingAddress,
          provinceCode: formValue.customerProvinceCode,
          districtCode: formValue.customerDistrictCode,
          wardCode: formValue.customerWardCode,
          regionCode: formValue.customerRegionCode,
        };
        if (!formValue.customerAddressCode) {
          const addressResp = await CustomerClient.createAddress({ body: address });
          if (!isValid(addressResp)) NotifyUtils.error('Lưu thông tin địa chỉ không thành công');
        } else {
          const resp = await CustomerClient.updateAddress({ body: address });
          if (isValid(resp)) NotifyUtils.success('Lưu thông tin địa chỉ thành công');
          else if (resp && resp.status === HTTP_STATUS.NotFound) {
            const addressResp = await CustomerClient.createAddress({ body: address });
            if (isValid(addressResp)) NotifyUtils.success('Lưu thông tin địa chỉ thành công');
            else NotifyUtils.error('Lưu thông tin địa chỉ không thành công');
          } else {
            NotifyUtils.error('Lưu thông tin địa chỉ không thành công');
          }
        }
      }

      const { orderId } = response.data[0];
      setTimeout(() => {
        updateCart();
      }, 1000);
      // clear products
      clearMapProduct();
      if (formValue.paymentMethod === PAYMENT_METHOD.CREDIT) {
        setTimeout(() => {
          router.push(`${THANKYOU_URL}/${orderId}`);
        }, 2000);
      } else {
        router.push(`${THANKYOU_URL}/${orderId}`);
      }

      //
      // clearCart();
      // clear voucer
    } else {
      if (response?.errorCode === TYPE_CUSTOMER_BY_COLOR.LOCKED_CUSTOMER && handleRedCustomer()) {
        return;
      }
      onLoading(false);
      BotClient.sendMesageBotOrderVn({ message: `TS checkout error - ${user?.phone}: ${JSON.stringify(response || {})}` });
      NotifyUtils.error(`Thanh toán không thành công chi tiết : ${response.message || 'Lỗi hệ thống'}`);
      setErrorMessage(`Thanh toán không thành công chi tiết : ${response.message || 'Lỗi hệ thống'}`);
      updateCart();
    }
  };

  if (deliveryLimitData) {
    deliveryLimitData?.forEach((item) => {
      if (item?.wardCodes?.indexOf(ward) >= 0 || item?.districtCodes?.indexOf(district) >= 0 || item?.provinceCodes?.indexOf(province) >= 0) {
        deliveryLimitMessage = item?.message;
        deliveryLimitCheck = true;
      }
    });
  }

  const DisplayPrice = () => <div className={styles.total}>{FormatNumber.formatCurrency(Math.max(Math.max(totalPrice, 0), 0))}</div>;
  const DisplayPriceMobileNew = () => (
    <div className={styles.totalM}>
      <span>Tổng tiền</span>
      <p>{FormatNumber.formatCurrency(Math.max(totalPrice, 0))}</p>
    </div>
  );

  // del err items in cart
  const [openErrItems, toggleErrItems] = useModal();
  const handleDeleteErrProducts = async () => {
    try {
      await errProducts?.forEach(async (item) => {
        if (ARR_REMOVE_PRODUCT.indexOf(item?.errorCode) >= 0) {
          removeCartItem(item);
        }
        if (item?.errorCode === 'MAX_QUANTITY') {
          if (item?.isImportant) {
            await removeImportant(item);
          }
          selectCartItem({
            ...item,
            isSelected: !item.isSelected,
          });
        }
      });
      NotifyUtils.success('Xoá tất cả sản phẩm lỗi thành công');
      toggleErrItems();
    } catch (error) {
      NotifyUtils.error(error.message || 'Xoá tất cả sản phẩm lỗi thất bại');
    }
    router.reload();
  };

  return (
    <div className={styles.checkout_sticky}>
      <div className={styles.checkout_title}>
        <h1>
          Đơn Hàng <small>({formatNumber(totalItemSelected)} sản phẩm)</small>
        </h1>
        <ButtonDefault onClick={() => router.push('/cart')} className={styles.btn} title="Sửa đơn hàng" data-test="btn-checkout-edit">
          Sửa
        </ButtonDefault>
      </div>
      <Paper className={styles.root} elevation={4}>
        <div className={styles.d_flex}>
          <div className={styles.checkout_label}>Tạm tính</div>
          <div className={styles.checkout_content}>{formatCurrency(price)}</div>
        </div>
        {/* // TODO: feature-debt */}
        {debt?.isActive && (
          <div className={styles.d_flex}>
            <div className={styles.checkout_label}>Hạn mức còn lại (tạm tính)</div>
            <div className={styles.checkout_content}>{debt.balanceFormated}</div>
          </div>
        )}
        <div className={styles.d_flex}>
          <div className={styles.checkout_label}>
            <div className={styles.checkout_label_first}>{deliveryData?.[0]?.name || 'Phí vận chuyển'}</div>
            {subTitleDelivery && <div className={styles.checkout_label_second}>{subTitleDelivery}</div>}
          </div>
          <div className={styles.checkout_content}>{formatCurrency(deliveryMethodFee)}</div>
        </div>
        <div className={styles.d_flex}>
          <div className={styles.checkout_label}>
            <div className={styles.checkout_label_first}>{paymentData?.[0]?.name || 'Phí thanh toán'}</div>
            {subTitlePayment && <div className={styles.checkout_label_second}>{subTitlePayment}</div>}
          </div>
          <div className={styles.checkout_content}>{paymentData?.[0]?.code !== PAYMENT_METHOD.CREDIT && formatCurrency(paymentMethodFee)}</div>
        </div>

        {extraFee && (
          <div className={styles.d_flex}>
            <div className={styles.checkout_label}>
              <div className={styles.checkout_label_first}>Phụ phí</div>
              {extraFeeNote && <div className={styles.checkout_label_second}>{extraFeeNote}</div>}
            </div>
            <div className={styles.checkout_content}>{formatCurrency(extraFee)}</div>
          </div>
        )}
        {(redeemRs || autoRedeemRs) && (
          <div>
            <Divider style={{ margin: 'auto', width: '90%' }} />
            <Typography style={{ padding: '8px 16px', fontFamily: 'ggsm', fontSize: 14 }}>Ưu đãi</Typography>
            {autoRedeemRs && (
              <div className={styles.d_flex} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography style={{ color: '#000', fontSize: '14px' }}>Tự động áp dụng</Typography>
                {discountValueAuto > 0 && <Typography className={styles.checkout_content}>-{formatCurrency(discountValueAuto)}</Typography>}
                {giftsAuto?.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography style={{ fontFamily: 'ggsm', marginRight: 5, color: '#000' }}>x{totalGiftAuto}</Typography>
                    <ImageFallbackStatic src={GIFT_ICON2} alt="icon gift" height="19" width="19" />
                  </div>
                )}
              </div>
            )}
            {redeemRs && (
              <div className={clsx(styles.d_flex, styles.checkout_promo_code)}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <LocalOfferOutlined fontSize="small" />
                  <span style={{ color: '#000', marginLeft: '4px', fontSize: '14px' }}>Mã {code}</span>
                </div>
                {discountValueManual > 0 && <div className={styles.checkout_content}>{`-${formatCurrency(discountValueManual)}`}</div>}
                {giftsManual?.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography style={{ fontFamily: 'ggsm', marginRight: 5, color: '#000' }}>x{totalGiftManual}</Typography>
                    <ImageFallbackStatic src={GIFT_ICON2} alt="icon gift" height="19" width="19" />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        <Divider style={{ margin: 'auto', width: '90%' }} />

        <div style={{ margin: '12px 0' }} className={styles.d_flex}>
          <div className={styles.checkout_label} style={{ fontSize: 16 }}>
            Tổng tiền
          </div>
          <div className={styles.total}>{formatCurrency(Math.max(0, totalPrice))}</div>
        </div>
        <Divider style={{ margin: 'auto', width: '90%' }} />

        <div>
          <p style={{ padding: '8px 16px', color: '#000' }}>
            Vui lòng kiểm tra kỹ thông tin giao hàng, hình thức thanh toán và nhấn nút "Thanh Toán" để hoàn tất đặt hàng.
          </p>

          <div className={styles.condition}>
            <FormControlLabel style={{ padding: '8px 16px' }} control={GreenCheckBoxElement} label={LabelConfirm} />
            <div className={styles.list_note}>
              <p>1. {BRAND_NAME} được phép hủy đơn của bạn nếu giá thị trường biến động lớn hơn 5% giá trị đơn hàng.</p>
              <p>2. Số lượng sản phẩm khi giao có thể không đảm bảo đúng nhu cầu ban đầu tùy thuộc vào nhà cung cấp.</p>
            </div>
          </div>
        </div>
        {!isMobile && (
          <div style={{ padding: '0 16px', color: '#000' }}>
            <Tooltip title={checkCondition.checked && 'Vui lòng đồng ý với điều khoản sử dụng trước khi thanh toán'}>
              <ButtonDefault
                disabled={!checkCondition.checked || deliveryLimitCheck || isOverWeightOrVolume || (debt && debt.debtBalance <= 0)}
                className={clsx('payment_button', styles.continue_btn)}
                onClick={extraFee ? toggleConfirm : handleSubmit}
                data-test="btn-checkout-payment"
              >
                THANH TOÁN
              </ButtonDefault>
            </Tooltip>
          </div>
        )}
      </Paper>

      <div className={styles.text_right}>
        {/* {userAuth?.settings?.isDisplayNotiTopBar && (
          <div className={styles.condition}>
            <Alert severity="error" style={{ marginTop: '10px', borderRadius: '8px' }}>
              {userAuth?.settings?.content}
            </Alert>
          </div>
        )} */}
        <VerifyPaymentDiablog visible={showModal} />
        {errorMessage && (
          <div className={styles.condition}>
            <Alert severity="error" style={{ marginTop: '10px', borderRadius: '8px' }}>
              {errorMessage}
            </Alert>
          </div>
        )}
        {deliveryLimitMessage && (
          <div className={styles.condition}>
            <Alert severity="error" style={{ marginTop: '10px', borderRadius: '8px' }}>
              {deliveryLimitMessage}
            </Alert>
          </div>
        )}

        {/* // TODO: feature-debt */}
        {debt?.balance <= 0 && (
          <div className={styles.condition}>
            <Alert severity="error" style={{ marginTop: '10px', borderRadius: '8px' }}>
              {debt?.balanceMessageError}
            </Alert>
          </div>
        )}

        {FEATURE_SHOW_BUTTON_VERIFY_CART && (
          <ButtonDefault btnType="success" className={styles.checkout_btn} onClick={handleVerify}>
            Kiểm tra
          </ButtonDefault>
        )}

        {isMobile && (
          <div className={clsx(styles.sticky_checkout_bar_mobile, beta && styles.sticky_checkout_bar_mobileNew)}>
            <div className={styles.fwc_container}>
              <div className={styles.flex_price}>{beta ? <DisplayPriceMobileNew /> : <DisplayPrice />}</div>
              <div>
                {/* /// TODO: feature-debt */}
                <ButtonDefault
                  disabled={!checkCondition.checked || user.isQuest || deliveryLimitCheck || isOverWeightOrVolume || (debt && debt.balance <= 0)}
                  btnType={beta ? 'primary' : 'warning'}
                  onClick={extraFee ? toggleConfirm : handleSubmit}
                  classes={{
                    label: styles.label,
                    outlined: styles.outlined,
                    root: beta ? styles.mobileRoot_btn : styles.root_btn,
                  }}
                >
                  Thanh toán
                </ButtonDefault>
              </div>
            </div>
          </div>
        )}
      </div>
      {errProducts?.length > 0 && !isMobile && (
        <div className={styles.card_err_container}>
          <Typography className={styles.text_err_notification}>
            Trong đơn hàng của quý khách có sản phẩm không đủ điều kiện để thanh toán.
            <b className={styles.delete_text} role="presentation" onClick={toggleErrItems}>
              <DeleteIcon fontSize="small" /> Nhấn vào đây để xoá hết sản phẩm lỗi.
            </b>
          </Typography>
          <ErrorProductsPayment />
        </div>
      )}
      {openErrItems && (
        <ModalListProduct
          products={errProducts}
          isShowPopupConfirm={openErrItems}
          handleClosePopup={toggleErrItems}
          handleClick={handleDeleteErrProducts}
          title="Xin xác nhận"
          content={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <>
              <Typography className={styles.text_content_modal} style={{ fontWeight: '700', marginTop: '15px' }}>
                Xoá tất cả sản phẩm không đủ điều kiện để thanh toán
              </Typography>
              <Typography className={styles.text_content_modal} style={{ marginTop: '20px' }}>
                Lưu ý: Sản phẩm vượt quá số lượng giới hạn sẽ được trả lại vào giỏ hàng, xin vui lòng kiểm tra lại.
              </Typography>
            </>
          }
        />
      )}
      <CustomModal
        visible={showConfirmModal}
        onClose={toggleConfirm}
        title="Xin xác nhận"
        btnOk="Xác nhận"
        onClickOk={handleSubmit}
        btnOnClose="Xem lại giỏ hàng"
      >
        {extraFee && (
          <>
            <Typography>
              Với đơn hàng dưới 1.5 triệu đồng (TP HCM và Hà Nội) hoặc dưới 2 triệu đồng (các tỉnh khác) sẽ bị phụ phí
              <b> {formatCurrency(50000)}</b>.
            </Typography>
            <Typography>
              Bạn còn cần <b>{formatCurrency(needToBuy())}</b> để được không bị tính phụ phí. Bạn muốn tiếp tục chứ?
            </Typography>
          </>
        )}
        {/* {isHaveTag7Ngay(cartItems, user) && (
          <>
            <Typography>Đơn hàng có sản phẩm Đặt trước 7 ngày. Bạn chắc chắn muốn xác nhận thanh toán cho đơn hàng này?</Typography>
          </>
        )} */}
      </CustomModal>
    </div>
  );
};

export default CheckoutSticky;
