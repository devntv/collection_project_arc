import { Button, Checkbox, FormControlLabel, Grid, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { CartClientV2, CustomerClient, getData, getFirst, isValid, isValidWithoutData } from 'clients';
import BotClient from 'clients/BotClient';
import clsx from 'clsx';
import LoadingBM from 'components-v2/atoms/LoadingBM';
import { LinkComp, Modal } from 'components/atoms';
import { CustomModal, NewInvoiceModal } from 'components/mocules';
import DeliveryInfoModalV2 from 'components/mocules/DeliveryInfoModalV2';
import { ARR_REMOVE_PRODUCT, CUSTOMER_TAG, PAYMENT_METHOD, TYPE_CUSTOMER_BY_COLOR } from 'constants/Enums';
import { ERROR_CART } from 'constants/ErrorCart';
import { BULK_ORDER, TERMS_URL, THANKYOU_URL } from 'constants/Paths';
import { useAuth, useCart, useProduct } from 'context';
import { useModal } from 'hooks';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useReducer, useState } from 'react';
import { CartService, CustomerService, PricingService } from 'services';
import AddressService from 'services/AddressService';
import { NotifyUtils } from 'utils';
import useBulkOrderProducts from 'zustand-lib/useBulkOrderProducts';
import BulkOrderCart from '../BulkOrderCart';
import BulkOrderList from '../BulkOrderList';
import Note from '../BulkOrderList/Note';
import DeliveryInfo from './DeliveryInfo';
import DeliveryMethodInfo from './DeliveryMethodInfo';
import InvoiceInfo from './InvoiceInfo';
import PaymentInfo from './PaymentInfo';
import styles from './styles.module.css';

const DynamicInvoiceForm = dynamic(() => import('components/mocules/NewOrderInvoiceForm/InvoiceForm'), {
  ssr: false,
});

const DEFAULT_BANK_PAYMENT_METHOD = 'PAYMENT_METHOD_BANK';
const DEFAULT_DELIVERY_METHOD = 'DELIVERY_PLATFORM_NORMAL';
const TEXT_ERR_PROVINCE =
  'Thanh toán không thành công chi tiết: thuocsi.vn chỉ nhận giao đến tỉnh có cùng địa chỉ đăng ký kinh doanh nghiệp của khách hàng. Vui lòng kiểm tra lại thông tin.';
const INITIAL_CART_STATE = {
  loadingState: false,
  address: null,
  invoice: null,
  selectedPayment: null,
  selectedDelivery: null,
  deliveries: [],
  invoices: [],
  payments: [],
  provinces: [],
  cartData: null,
};

const reducerCart = (state, action) => {
  switch (action.type) {
    case 'set_loading':
      return {
        ...state,
        loadingState: action.payload,
      };
    case 'set_cart_data':
      return {
        ...state,
        cartData: action.payload,
      };
    case 'set_address':
      return {
        ...state,
        address: action.payload,
      };
    case 'set_invoice':
      return {
        ...state,
        invoice: action.payload,
      };
    case 'set_invoices':
      return {
        ...state,
        invoices: action.payload,
      };
    case 'set_payments':
      return {
        ...state,
        payments: action.payload,
      };
    case 'set_selected_payment':
      return {
        ...state,
        selectedPayment: action.payload,
      };
    case 'set_selected_delivery':
      return {
        ...state,
        selectedDelivery: action.payload,
      };
    case 'set_deliveries':
      return {
        ...state,
        deliveries: action.payload,
      };
    case 'set_cart_state':
      return action.payload;
    default:
      return state;
  }
};

function BulkOrderCartContent({ user = null }) {
  const router = useRouter();
  const [openDelivery, setOpenDelivery] = useState(true);
  const [openInvoice, setOpenInvoice] = useState(true);
  const { handleRedCustomer } = useAuth();
  const {
    cartItems = [],
    totalQuantitySelected = 0,
    totalQuantity = 0,
    subPrice = 0,
    cartNo,
    updateInvoice,
    totalPrice = 0,
    redeemCode = [],
    price = 0,
    reloadDataCart,
    redeemApplyResult = [],
    promoInfo = null,
    discount = 0,
    updateDeliveryMethod,
    updatePaymentMethod,
    totalItemSelected = 0,
    totalItem = 0,
    isSelectedAll = true,
    selectAllCartItem,
    unselectAllCartItem,
    removeCartItem,
    updateCart,
    selectCartItem,
    updateCartItem,
    note,
    isErrorCartItem = false,
    isOverWeightOrVolume = false,
    isItemInArrayRemove = false,
    paymentMethodFee = 0,
    deliveryMethodFee = 0,
    updateCartInfo,
  } = useCart();
  const { clearMapProduct } = useProduct();
  const [cartState, dispatch] = useReducer(reducerCart, INITIAL_CART_STATE);
  const { loadingState, cartData, address, invoice, invoices, payments, selectedPayment, selectedDelivery, deliveries, provinces } = cartState;
  // data for checkout
  const addressSelect = {
    customerDistrictCode: cartData?.customerDistrictCode || address?.districtCode || null,
    customerProvinceCode: cartData?.provinceCode || null,
    customerWardCode: cartData?.customerWardCode || address?.wardCode || null,
  };
  const customerProvinceCode = cartData?.provinceCode || null;
  const customerRegionCode = provinces?.find((item) => item.value === customerProvinceCode)?.regionCode || '';
  const dataUser = {
    customerName: cartData?.customerName || user?.name || '',
    customerPhone: cartData?.customerPhone || user?.phone || '',
    customerEmail: user?.email || '',
    customerShippingAddress: cartData?.customerShippingAddress || address?.address || '',
    customerDistrictCode: cartData?.customerDistrictCode || address?.districtCode || '0',
    customerProvinceCode,
    customerWardCode: cartData?.customerWardCode || address?.wardCode || '0',
    customerAddressCode: cartData?.customerAddressCode || address?.code || '',
    customerRegionCode,
  };
  const dataPayment = {
    paymentMethod: selectedPayment?.code || cartData?.paymentMethod || DEFAULT_BANK_PAYMENT_METHOD,
    deliveryMethod: selectedDelivery?.code || cartData?.deliveryMethod || DEFAULT_DELIVERY_METHOD,
    ordersCount: user?.ordersCount || 0,
  };
  // checkbox agree terms
  const [checkConditionTerms, setCheckConditionTerms] = useState(true);
  const LabelConfirm = (
    <span className={styles.check_agree_txt}>
      Tôi đồng ý với
      <LinkComp href={TERMS_URL} color="#00b46e" target className={styles.terms_link}>
        &nbsp;Điều khoản sử dụng
      </LinkComp>
    </span>
  );

  const handleChangeInvoice = (key, newValue) => {
    const newdataInvoice = { ...invoice, [key]: newValue };
    newdataInvoice.taxCode = newdataInvoice?.taxCode || '';
    dispatch({
      type: 'set_invoice',
      payload: newdataInvoice,
    });
    updateInvoice({
      invoice: newdataInvoice,
    });
  };

  const handleSetAllInvoice = (newdataInvoice) => {
    dispatch({
      type: 'set_invoice',
      payload: newdataInvoice,
    });
    const editDataInvoice = newdataInvoice;
    editDataInvoice.email = user.email || '';
    updateInvoice({
      invoice: editDataInvoice,
    });
  };

  const handleChangePayment = (e) => {
    const paymentCode = e.target.value;
    dispatch({
      type: 'set_selected_payment',
      payload: payments.find((item) => item.code === paymentCode) || null,
    });
    updatePaymentMethod({
      paymentMethod: paymentCode,
      ...dataUser,
      // for logs
      info: payments.find((item) => item.code === paymentCode), // for logs
    });
  };

  const handleChangeDeliveryMethod = (e) => {
    const deliveryCode = e.target.value || null;
    if (deliveryCode) {
      dispatch({
        type: 'set_selected_delivery',
        payload: deliveries?.find((item) => item?.code === deliveryCode) || null,
      });
      updateDeliveryMethod({
        deliveryMethod: deliveryCode,
        ...dataUser,
        // for logs
        info: deliveries.find((item) => item.code === deliveryCode),
      });
    }
  };

  const loadInvoices = async () => {
    const invoiceInfoRes = await CustomerClient.getListInvoiceInfo({});
    const invoiceList = getData(invoiceInfoRes);
    dispatch({
      type: 'set_invoices',
      payload: invoiceList,
    });
    const selectedInvoice = invoiceList?.find((item) => item?.code === invoice?.code) || null;

    if (selectedInvoice) {
      dispatch({
        type: 'set_invoice',
        payload: selectedInvoice,
      });
    }
  };

  const loadData = useCallback(async () => {
    // TODO: need to refactor this
    dispatch({
      type: 'set_loading',
      payload: true,
    });
    const [cartRes, addressList, invoiceInfoList, paymentMethods, provinceList, deliveryMethods] = await Promise.all([
      CartService.getCartInfoWithProduct({}),
      CustomerService.getListAddress({}),
      CustomerClient.getListInvoiceInfo({}),
      PricingService.getListPaymentMethod({ params: {} }),
      AddressService.getProvinces(),
      PricingService.getListDeliveryMethod({ params: {} }),
    ]);
    const defaultAddress = addressList?.find((addr) => addr?.isDefault) || null;
    const invoiceDefault = getFirst(invoiceInfoList, null);
    // convert payment methods
    const { districtCode = null, provinceCode = null, tags = null } = user;
    const regionCodeCustomer = provinceList?.find((item) => item.value === provinceCode)?.regionCode || '';
    const newPaymentMethods = paymentMethods?.map((item) => {
      const { mapLocationFee } = item || {};
      const defaultValue = mapLocationFee['00'] || null;
      const percentValue = mapLocationFee[districtCode] || mapLocationFee[provinceCode] || mapLocationFee[regionCodeCustomer] || defaultValue || null;

      const isBlockCodAccount = tags?.indexOf(CUSTOMER_TAG.BLOCK_COD) >= 0;
      return {
        ...item,
        isDisable: percentValue === null || (isBlockCodAccount && item?.code === PAYMENT_METHOD.COD),
        defaultValue,
        subTitle: (percentValue && percentValue > 0 && item?.subTitle?.replace('{percentage}', percentValue || 0)) || '',
        errorMessage: isBlockCodAccount && item?.code === PAYMENT_METHOD.COD && 'Tài khoản đã bị chặn thanh toán bằng tiền mặt khi nhận hàng',
      };
    });
    const paymentMethodsActive = newPaymentMethods?.filter((item) => !item.isDisable) || [];
    const paymentMethodDefault = paymentMethodsActive?.find((item) => item.isDefault && !item.isDisable) || paymentMethodsActive[0] || null;

    const deliveryMethodDefault = (deliveryMethods?.length > 0 && (deliveryMethods?.find((item) => item.isDefault) || deliveryMethods[0])) || null;
    let cart = {};
    cart = getFirst(cartRes);
    const cartUpdate = { ...cart };
    let isUpdate = false;
    // update cart if dont have default value
    if (!cartUpdate?.customerEmail && user?.email) {
      cartUpdate.cartUpdate = user.email;
      isUpdate = true;
    }
    if (!cartUpdate?.customerShippingAddress) {
      isUpdate = true;
      cartUpdate.customerName = defaultAddress ? defaultAddress?.name : user?.name || null;
      cartUpdate.customerPhone = defaultAddress ? defaultAddress?.phone : user?.phone || null;
      cartUpdate.customerShippingAddress = defaultAddress ? defaultAddress?.address : user?.address || null;
      cartUpdate.customerDistrictCode = defaultAddress ? defaultAddress?.districtCode : user?.districtCode || null;
      cartUpdate.customerProvinceCode = defaultAddress ? defaultAddress?.provinceCode : user?.provinceCode || null;
      cartUpdate.customerWardCode = defaultAddress ? defaultAddress?.wardCode : user?.wardCode || null;
      cartUpdate.customerAddressCode = defaultAddress?.code || null;
    } else {
      defaultAddress.name = cartUpdate?.customerName || null;
      defaultAddress.phone = cartUpdate?.customerPhone || null;
      defaultAddress.address = cartUpdate?.customerShippingAddress || null;
      defaultAddress.districtCode = cartUpdate?.customerDistrictCode || null;
      defaultAddress.provinceCode = cartUpdate?.customerProvinceCode || null;
      defaultAddress.wardCode = cartUpdate?.customerWardCode || null;
      defaultAddress.code = cartUpdate?.customerAddressCode || null;
    }

    if (!cartUpdate?.customerRegionCode) {
      isUpdate = true;
      cartUpdate.customerRegionCode = regionCodeCustomer;
    }
    if (!cartUpdate?.paymentMethod && paymentMethodDefault) {
      isUpdate = true;
      cartUpdate.paymentMethod = paymentMethodDefault?.code || null;
    }
    if (!cartUpdate?.deliveryMethod && deliveryMethodDefault) {
      isUpdate = true;
      cartUpdate.deliveryMethod = deliveryMethodDefault?.code || null;
    }
    if (!cartUpdate.invoice || (cartUpdate.invoice?.invoiceRequest && (!cartUpdate.invoice?.taxCode || !cartUpdate.invoice?.companyName))) {
      isUpdate = true;
      if (invoiceDefault) {
        cartUpdate.invoice = {
          ...invoiceDefault,
          invoiceRequest: true,
        };
      }
    }
    // update cart
    if (isUpdate) {
      const resultUpdate = await CartClientV2.updateCart({
        body: cartUpdate,
      });
      if (isValid(resultUpdate)) {
        const newCartRes = await CartService.getCartInfoWithProduct({});
        cart = getFirst(newCartRes);
      }
    }

    const cartStateData = {
      cartData: cart,
      address: defaultAddress,
      invoice: invoiceDefault,
      invoices: getData(invoiceInfoList),
      payments: newPaymentMethods,
      selectedPayment: newPaymentMethods?.find((item) => item?.code === cart?.paymentMethod) || paymentMethodDefault,
      deliveries: deliveryMethods,
      selectedDelivery: deliveryMethods?.find((item) => item?.code === cart?.deliveryMethod) || deliveryMethodDefault,
      provinces: provinceList,
    };

    dispatch({
      type: 'set_cart_state',
      payload: cartStateData,
    });
    dispatch({
      type: 'set_loading',
      payload: false,
    });
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  // update price format, data of products in cart
  useEffect(() => {
    clearMapProduct();
    updateCart();
  }, []);

  const handleUpdateAddress = async (newVal) => {
    const newRegionCode = provinces?.find((item) => item.value === newVal?.provinceCode)?.regionCode || '';
    const bodyRequest = {
      customerName: newVal?.name || address?.name,
      customerPhone: newVal?.phone || address?.phone,
      customerShippingAddress: newVal?.address || address?.address,
      customerDistrictCode: newVal?.districtCode || address?.districtCode,
      customerProvinceCode: newVal?.provinceCode || address?.provinceCode,
      customerWardCode: newVal?.wardCode || address?.wardCode,
      customerAddressCode: newVal?.code || address?.code,
      customerRegionCode: newRegionCode,
    };
    await updateCartInfo(bodyRequest);
    NotifyUtils.success('Cập nhật thông tin địa chỉ thành công');
    dispatch({
      type: 'set_address',
      payload: newVal,
    });
    // if change province => reload data
    if (newVal?.provinceCode === cartData?.customerProvinceCode) {
      const newCartData = {
        ...cartData,
        ...bodyRequest,
      };
      dispatch({
        type: 'set_cart_data',
        payload: newCartData,
      });
    } else {
      loadData();
    }
  };

  const revalidateBodyRequestCheckout = async (data) => {
    const bodyRequest = { ...data };
    Object.keys(bodyRequest).forEach((key) => {
      if (typeof bodyRequest[key] === 'string') bodyRequest[key] = bodyRequest[key]?.trim();
    });
    const districts = await AddressService.getDistrictsByProvince(bodyRequest.customerProvinceCode);

    if (!districts) {
      NotifyUtils.error(TEXT_ERR_PROVINCE);
      return false;
    }
    const isExistDistrict = districts.find((item) => item.value === bodyRequest.customerDistrictCode);

    if (!isExistDistrict) {
      NotifyUtils.error(TEXT_ERR_PROVINCE);
      return false;
    }
    const dataValidate = {
      ...bodyRequest,
      totalPrice,
      voucherCode: redeemCode[0],
      skus: cartItems?.filter((item) => item.isSelected || item.type === 'GIFT')?.map(({ sku, quantity, type }) => ({ sku, type, quantity })) || [],
    };

    const validateRs = await CartService.validateCart({ body: dataValidate });
    if (!isValidWithoutData(validateRs)) {
      if (validateRs?.errorCode === TYPE_CUSTOMER_BY_COLOR.LOCKED_CUSTOMER && handleRedCustomer()) {
        return false;
      }
      NotifyUtils.error(ERROR_CART[validateRs?.errorCode] || validateRs?.message || 'Đã có lỗi khi thanh toán, vui lòng kiểm tra lại giỏ hàng');
      BotClient.sendMesageBotOrderVn({ message: `TS validate error - ${user?.phone || ''}: ${JSON.stringify(validateRs || {})}` });
      return false;
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

    return true;
  };

  const handleSubmitPayment = async () => {
    // TODO: chờ tính năng công nợ
    if (!checkConditionTerms) {
      NotifyUtils.error(`Bạn chưa chấp nhận điều khoản sử dụng`);
      dispatch({
        type: 'set_loading',
        payload: false,
      });
      return;
    }
    dispatch({
      type: 'set_loading',
      payload: true,
    });
    clearMapProduct();

    const bodyRequest = {
      ...dataUser,
      ...dataPayment,
      invoice: {
        ...invoice,
        email: dataUser?.customerEmail,
      },
      cartNo,
    };
    const isValidBody = await revalidateBodyRequestCheckout(bodyRequest);
    if (!isValidBody) {
      router.reload();
      return;
    }
    const response = await CartService.checkoutCart(bodyRequest);

    if (!isValid(response)) {
      let errMessage = '';
      if (response?.errorCode === TYPE_CUSTOMER_BY_COLOR.LOCKED_CUSTOMER && handleRedCustomer()) {
        return;
      }
      if (response?.errorCode === 'CART_WARD_AND_PROVINCE_INVALID') {
        errMessage = TEXT_ERR_PROVINCE;
      }
      BotClient.sendMesageBotOrderVn({ message: `TS checkout error - ${user?.phone}: ${JSON.stringify(response || {})}` });
      NotifyUtils.error(errMessage || `Thanh toán không thành công chi tiết : ${response.message || 'Lỗi hệ thống'}`);
      router.reload();
    } else {
      const { orderId } = response.data[0];
      NotifyUtils.success('Thanh toán thành công');
      setTimeout(() => {
        updateCart();
      }, 1000);
      clearMapProduct();
      router.push(`${THANKYOU_URL}/${orderId}`);
    }
  };

  //
  const [openConfirmDelErrItems, toggleConfirmDelErrItems] = useModal();
  const handleDeleteErrorItems = () => {
    toggleConfirmDelErrItems();
  };

  const deleteErrorItems = async () => {
    try {
      await cartItems?.forEach((item) => {
        if (ARR_REMOVE_PRODUCT.indexOf(item?.errorCode) >= 0) {
          removeCartItem(item);
        }
      });
      await updateCart();
      NotifyUtils.success('Xoá tất cả sản phẩm lỗi thành công');
    } catch (error) {
      NotifyUtils.error('Xoá tất cả sản phẩm lỗi thất bại');
    }
    toggleConfirmDelErrItems();
  };

  // new modal invoice
  const [check, setCheck] = useState(false);
  const [step, setStep] = useState(1);
  const [invoiceRes, setInvoiceRes] = useState(invoice);

  const getValueInvoice = (value) => {
    setInvoiceRes(value);
  };
  const getStepInvoiceAdd = (value) => {
    setStep(value + 1);
  };

  const getStepInvoiceSubtract = (value) => {
    setStep(value - 1);
  };

  // modal
  const [openEditInvoice, toggleEditInvoice] = useModal();
  const [openErrProducts, toggleErrProducts] = useModal();
  const [openEditDelivery, toggleEditDelivery] = useModal();
  // toggle
  const [openPayment, togglePayment] = useModal(true);
  const [openDeliveryMethod, toggleDelivery] = useModal(true);

  const { products = [] } = useBulkOrderProducts((state) => state);
  const skusProducts = cartItems.map((item) => item?.sku) || [];
  const notAddToCartProducts = products?.filter((item) => !skusProducts.includes(item?.sku)) || [];

  const handleEditDelivery = () => {
    toggleEditDelivery();
  };

  if (loadingState) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <LoadingBM />
      </Grid>
    );
  }

  return (
    <div className={styles.content}>
      <div className={styles.left_content}>
        {notAddToCartProducts.length > 0 && (
          <Button className={styles.btn_view_err_list} onClick={toggleErrProducts}>
            Xem danh sách sản phẩm lỗi
          </Button>
        )}
        <BulkOrderList
          cartItems={cartItems}
          totalItemSelected={totalItemSelected}
          totalItem={totalItem}
          isSelectedAll={isSelectedAll}
          selectAllCartItem={selectAllCartItem}
          unselectAllCartItem={unselectAllCartItem}
          removeCartItem={removeCartItem}
          updateCart={updateCart}
          selectCartItem={selectCartItem}
          updateCartItem={updateCartItem}
          cartNo={cartNo}
          note={note}
          isItemInArrayRemove={isItemInArrayRemove}
          handleDeleteErrorItems={handleDeleteErrorItems}
        />
      </div>
      <div className={styles.right_content}>
        <div className={styles.container}>
          <BulkOrderCart
            totalQuantitySelected={totalQuantitySelected}
            totalQuantity={totalQuantity}
            subPrice={subPrice}
            handleSubmitPayment={handleSubmitPayment}
            user={user}
            redeemCode={redeemCode}
            price={price}
            cartNo={cartNo}
            reloadDataCart={reloadDataCart}
            redeemApplyResult={redeemApplyResult}
            promoInfo={promoInfo}
            discount={discount}
            totalPrice={totalPrice}
            isContinuePayment={cartItems?.length > 0}
            isErrorCartItem={isErrorCartItem}
            isOverWeightOrVolume={isOverWeightOrVolume}
            isSelectedProducts={totalItemSelected === 0}
            paymentMethodFee={paymentMethodFee}
            selectedPayment={selectedPayment}
            selectedDelivery={selectedDelivery}
            deliveryMethodFee={deliveryMethodFee}
            checkConditionTerms={checkConditionTerms}
          />
          <Typography className={styles.btn_text_back} onClick={() => router.push(BULK_ORDER)}>{`< Quay lại`}</Typography>
          {/* Điều khoản */}
          <Grid container direction="column" alignItems="flex-start">
            <p style={{ fontFamily: 'ggsr', fontSize: '13px' }}>
              Vui lòng kiểm tra kỹ thông tin giao hàng, hình thức thanh toán và nhấn nút "Thanh Toán" để hoàn tất đặt hàng.
            </p>
            <div style={{ textAlign: 'left' }}>
              <FormControlLabel
                control={
                  // eslint-disable-next-line react/jsx-wrap-multilines
                  <Checkbox
                    classes={{ root: styles.green_checkbox }}
                    color="default"
                    checked={checkConditionTerms}
                    onChange={() => setCheckConditionTerms((prev) => !prev)}
                    name="checked"
                  />
                }
                label={LabelConfirm}
                style={{ width: '100%' }}
              />
              <div className={styles.list_note}>
                <p>1. thuocsi.vn được phép hủy đơn của bạn nếu giá thị trường biến động lớn hơn 5% giá trị đơn hàng.</p>
                <p>2. Số lượng sản phẩm khi giao có thể không đảm bảo đúng nhu cầu ban đầu tùy thuộc vào nhà cung cấp.</p>
              </div>
            </div>
          </Grid>
          {cartItems?.length > 0 && (
            <>
              <DeliveryInfo
                address={address}
                user={user}
                open={openDelivery}
                toggle={() => setOpenDelivery((prev) => !prev)}
                handleEdit={handleEditDelivery}
              />
              <InvoiceInfo
                invoice={invoice}
                user={user}
                open={openInvoice}
                toggle={() => setOpenInvoice((prev) => !prev)}
                editInvoice={toggleEditInvoice}
              />
              <DeliveryMethodInfo
                addressSelect={addressSelect}
                open={openDeliveryMethod}
                toggle={toggleDelivery}
                totalPrice={totalPrice}
                selectedMethod={selectedDelivery}
                deliveries={deliveries}
                provinces={provinces}
                productItems={cartItems}
                handleChange={handleChangeDeliveryMethod}
              />
              <PaymentInfo
                selectedPayment={selectedPayment}
                payments={payments}
                user={user}
                open={openPayment}
                toggle={togglePayment}
                handleChange={handleChangePayment}
              />
              <Note note={note} />
            </>
          )}
          {openEditInvoice && (
            <NewInvoiceModal
              width="652px"
              visible={openEditInvoice}
              onClose={toggleEditInvoice}
              customerEmail={user?.email}
              setCheck={setCheck}
              check={check}
              step={step}
              getStepInvoiceSubtract={getStepInvoiceSubtract}
              title="Thông tin xuất hóa đơn"
            >
              <DynamicInvoiceForm
                invoice={invoice}
                customerEmail={user?.email}
                getValueInvoice={getValueInvoice}
                step={step}
                setStep={setStep}
                getStepInvoiceAdd={getStepInvoiceAdd}
                invoiceRes={invoiceRes}
                listInvoiceInfo={invoices}
                toggleOpenModalInvoice={toggleEditInvoice}
                check={check}
                setCheck={setCheck}
                handleChangeInvoice={handleChangeInvoice}
                handleSetAllInvoice={handleSetAllInvoice}
                handleReloadInvoices={loadInvoices}
              />
            </NewInvoiceModal>
          )}
          {openConfirmDelErrItems && (
            <CustomModal
              visible={openConfirmDelErrItems}
              onClose={toggleConfirmDelErrItems}
              title="Xin xác nhận"
              btnOk="Đồng ý"
              onClickOk={deleteErrorItems}
              btnOnClose="Xem lại"
            >
              <Typography>Xóa tất cả các sản phẩm không đủ điều kiện để thanh toán.</Typography>
            </CustomModal>
          )}
        </div>
      </div>
      {openErrProducts && (
        <Modal open={openErrProducts} onClose={toggleErrProducts}>
          <Grid container direction="column" justifyContent="center" alignItems="center" className={styles.modal_wrapper}>
            <IconButton onClick={toggleErrProducts} className={styles.close_ic}>
              <CloseIcon />
            </IconButton>
            <Typography className={styles.modal_title}>
              Danh sách sản phẩm không thêm vào giỏ hàng ({notAddToCartProducts?.length} sản phẩm lỗi)
            </Typography>
            <Grid
              container
              direction="column"
              alignItems="flex-start"
              style={{ marginTop: '10px' }}
              className={clsx(notAddToCartProducts?.length > 15 && styles.modal_scroll)}
            >
              <ul>
                {notAddToCartProducts.length > 0 &&
                  notAddToCartProducts.map((item, idx) => (
                    <li key={item?.sku}>
                      <Typography className={styles.text_err_prd}>
                        {idx + 1} - {item?.name || item?.itemName || ''} - {item?.errsku || item?.sku || ''}
                      </Typography>
                    </li>
                  ))}
              </ul>
            </Grid>
          </Grid>
        </Modal>
      )}
      {openEditDelivery && (
        <DeliveryInfoModalV2
          onClose={toggleEditDelivery}
          visible={openEditDelivery}
          address={address}
          isNewHandle
          handleUpdate={handleUpdateAddress}
        />
      )}
    </div>
  );
}

export default memo(BulkOrderCartContent);
