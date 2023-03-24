/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable camelcase */

import { Grid, Paper } from '@material-ui/core';
import { CartClientV2, CustomerClient, getData, getFirst, isValid } from 'clients';
import ErrProductsWarningCard from 'components-v2/mocules/ErrProductsWarningCard';
import Template from 'components/layout/Template';
import { CartNote, CheckoutSticky, DeliveryInfoForm, DeliveryMethod, InvoiceCheckout, PaymentMethod } from 'components/mocules';
import LoadingScreen from 'components/organisms/LoadingScreen';
import ManageAddressModal from 'components/organisms/ManageAddressModal';
import { ADDRESS_CHANGE_TYPE, CUSTOMER_TAG, PAYMENT_METHOD } from 'constants/Enums';
import { CART_URL, QUICK_ORDER } from 'constants/Paths';
import { useCart, useSetting } from 'context';
import { useModal } from 'hooks';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { CartService, doWithServerSide, PricingService } from 'services';
import AddressService from 'services/AddressService';
import { gtag, NotifyUtils, screenOrientation } from 'utils';
import useSellers from 'zustand-lib/useSellers';
import styles from './styles.module.css';

export async function getServerSideProps(ctx) {
  try {
    return doWithServerSide(
      ctx,
      async (ctxCallback, user) => {
        const { districtCode, provinceCode, tags = null, debt } = user || {};
        const [cartRes, paymentMethods, deliveryMethods, invoiceInfoRes, provinces, deliveryLimitation] = await Promise.all([
          CartService.getCartInfoWithProduct({ ctx }),
          PricingService.getListPaymentMethod({ ctx, params: {} }),
          PricingService.getListDeliveryMethod({ ctx, params: {} }),
          CustomerClient.getListInvoiceInfo({ ctx }),
          AddressService.getProvinces(ctx),
          CartClientV2.getDeliveryLimitation({ ctx }),
        ]);

        let addressDefault = null;
        let cart = getFirst(cartRes);

        const { paymentMethod = '', deliveryMethod, customerShippingAddress = '' } = cart || {};
        // dieu kien su dung voucher
        if (!cart?.customerAddressCode) {
          const addressListRes = await CustomerClient.getListAddress({ ctx });
          if (isValid(addressListRes)) {
            const addresses = getData(addressListRes);
            addressDefault = addresses.find((address) => address?.isDefault);
          }
        }

        // convert payment methods
        const regionCodeCustomer = provinces?.find((item) => item.value === provinceCode)?.regionCode || null;
        let newPaymentMethods = paymentMethods
          ?.map((item) => {
            // TODO: feature-debt
            // ko cho hiện payment credit nếu khách ko có debt ( công nợ )
            if (item.code === PAYMENT_METHOD.CREDIT && !debt?.isActive) {
              return null;
            }
            const { mapLocationFee } = item || {};
            const defaultValue = mapLocationFee['00'] || null;
            const percentValue =
              mapLocationFee[districtCode] || mapLocationFee[provinceCode] || mapLocationFee[regionCodeCustomer] || defaultValue || null;
            const isBlockCodAccount = tags?.indexOf(CUSTOMER_TAG.BLOCK_COD) >= 0;
            return {
              ...item,
              isDisable: percentValue === null || (isBlockCodAccount && item?.code === PAYMENT_METHOD.COD),
              defaultValue,
              subTitle: (percentValue && percentValue > 0 && item?.subTitle?.replace('{percentage}', percentValue || 0)) || '',
              errorMessage: isBlockCodAccount && item?.code === PAYMENT_METHOD.COD && 'Tài khoản đã bị chặn thanh toán bằng tiền mặt khi nhận hàng',
            };
          })
          .filter((item) => item);

        // TODO: feature-debt
        if (debt?.isActive) {
          // newPaymentMethods = newPaymentMethods?.sort((item) => (item.code === PAYMENT_METHOD.CREDIT ? -1 : 0)) || [];
          newPaymentMethods = newPaymentMethods?.filter((item) => item.code === PAYMENT_METHOD.CREDIT) || [];
        }

        let cartUpdate = {
          isUpdate: false,
        };

        const paymentMethodsActive = newPaymentMethods?.filter((item) => !item.isDisable) || [];
        const paymentMethodDefault = paymentMethodsActive?.find((item) => item.isDefault && !item.isDisable) || paymentMethodsActive[0] || null;
        const deliveryMethodDefault =
          (deliveryMethods?.length > 0 && (deliveryMethods?.find((item) => item.isDefault) || deliveryMethods[0])) || null;
        // update for first
        if (cart) {
          // update nếu chưa có giá trị default

          if (!cart.customerEmail && user.email) {
            cartUpdate.customerEmail = user.email;
            cartUpdate.isUpdate = true;
          }

          if (!customerShippingAddress) {
            // update address for first  time

            if (addressDefault) {
              cartUpdate = {
                customerName: addressDefault?.name || null,
                customerPhone: addressDefault?.phone || null,
                customerShippingAddress: addressDefault?.address || null,
                customerDistrictCode: addressDefault?.districtCode || null,
                customerProvinceCode: addressDefault?.provinceCode || null,
                customerWardCode: addressDefault?.wardCode || null,
                customerAddressCode: addressDefault?.code || null,

                isUpdate: true,
              };
            } else {
              cartUpdate = {
                customerName: user.name || null,
                customerPhone: user.phone || null,
                customerShippingAddress: user.address || null,
                customerDistrictCode: user.districtCode || null,
                customerProvinceCode: user.provinceCode || null,
                customerWardCode: user.wardCode || null,
                isUpdate: true,
              };
            }
          }

          if (!cart?.customerRegionCode) {
            cartUpdate.customerRegionCode =
              provinces?.find((item) => item.value === cartUpdate.customerProvinceCode || cart.customerProvinceCode || '')?.regionCode || '';
            cartUpdate.isUpdate = true;
          }

          if (!paymentMethod && paymentMethodDefault) {
            cartUpdate.paymentMethod = paymentMethodDefault?.code;
            cartUpdate.isUpdate = true;
          }

          if (!deliveryMethod && deliveryMethodDefault) {
            cartUpdate.deliveryMethod = deliveryMethodDefault?.code;
            cartUpdate.isUpdate = true;
          }

          // update invoice
          if (!cart.invoice || (cart.invoice?.invoiceRequest && (!cart.invoice?.taxCode || !cart.invoice?.companyName))) {
            const invoiceDefault = getFirst(invoiceInfoRes, null);
            if (invoiceDefault) {
              cartUpdate.invoice = {
                ...invoiceDefault,
                invoiceRequest: true,
              };
              cartUpdate.isUpdate = true;
            }
          }

          if (cartUpdate && cartUpdate.isUpdate) {
            const resultUpdate = await CartClientV2.updateCart({
              body: cartUpdate,
              ctx,
            });

            if (isValid(resultUpdate)) {
              const newCartRes = await CartService.getCartInfoWithProduct({ ctx });
              cart = getFirst(newCartRes);
            }
          }
        }
        const { data: deliveryLimitData = null } = deliveryLimitation || {};
        return {
          props: {
            cart,
            paymentMethods: newPaymentMethods,
            deliveryMethods,
            addressDefault,
            invoices: getData(invoiceInfoRes),
            cartUpdate,
            provinces,
            deliveryMethodDefault,
            paymentMethodDefault,
            deliveryLimitData,
            SEO_CONFIG: {
              title: 'Thanh toán – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn',
            },
          },
        };
      },
      {
        serverSideTranslations,
        namespaces: ['common'],
      },
    );
  } catch (error) {
    return {
      props: {},
    };
  }
}

const CheckoutPage = ({
  user = {},
  isMobile,
  cart,
  paymentMethods = [],
  deliveryMethods = [],
  invoices = [],
  provinces,
  deliveryMethodDefault = null,
  paymentMethodDefault = null,
  cartUpdate,
  deliveryLimitData,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [manageAddressModalOpen, manageAddressModalToggle] = useModal();
  const [mobile, setMobile] = useState(isMobile);
  const getSellerByCode = useSellers((state) => state.getSellerByCode);
  const getSellerByCodeSync = useSellers((state) => state.getSellerByCodeSync);
  const { getRegionByProvinceCode } = useSetting();

  const { cartItems = [] } = cart || {};
  // validate user isActive
  if (!user?.isActive) {
    NotifyUtils.info('Tài khoản chưa được kích hoạt');
    router.push(CART_URL);
    return <LoadingScreen />;
  }

  if (user.isQuest) {
    NotifyUtils.info('Bạn đang sử dụng tài khoản dùng thử, vui lòng tạo tài khoản để có thể thanh toán đơn hàng.');
    router.push(CART_URL);
    return <LoadingScreen />;
  }

  if (!cart) {
    NotifyUtils.info('Vui lòng đặt hàng trước khi thanh toán');
    router.push(QUICK_ORDER);
    return <LoadingScreen />;
  }

  const {
    itemCount = 0,
    totalPrice = 0,
    updateDeliveryMethod,
    updatePaymentMethod,
    paymentMethod,
    deliveryMethod,
    customerName = cart.customerName,
    customerPhone,
    // customerEmail = cart.customerEmail,
    customerProvinceCode,
    customerRegionCode,
    customerDistrictCode,
    customerWardCode,
    customerShippingAddress,
    customerAddressCode,
    updateInvoice,
    updateDeliveryInfo,
    updateCartInfo,
    updateCart,
  } = useCart();

  // reload when update data
  // nếu cart có thay đổi -> thì useCart cần update lại cho đồng bộ
  useEffect(() => {
    if (cartUpdate?.isUpdate) {
      updateCart();
    }
  }, []);

  useEffect(() => {
    const landscape = screenOrientation(window);
    if (landscape) {
      setMobile(false);
    }
  }, []);

  useEffect(() => {
    const landscape = screenOrientation(window);
    window.addEventListener(
      'orientationchange',
      () => {
        if (landscape) {
          setMobile(true);
        } else {
          setMobile(false);
        }
      },
      false,
    );
  }, [mobile]);

  // FB event tracking initiateCheckout
  useEffect(async () => {
    // fbpixel.initiateCheckout();
    await Promise.all(cart?.cartItems?.map((prd) => getSellerByCode({ code: prd?.sellerCode })));
    const GATrackCart = { ...cart };
    GATrackCart.cartItems = cart?.cartItems?.map((prd) => ({ ...prd, sellerInfo: getSellerByCodeSync({ code: prd?.sellerCode }) })) || [];
    gtag.beginCheckout(GATrackCart);
  }, []);

  // Xử lý ngày tháng
  const [isSaveInfo, setIsSaveInfo] = React.useState(true);

  const title = `${itemCount} Sản phẩm trong giỏ hàng nhé!`;

  const [value, setValue] = useState({
    customerName: customerName || cart.customerName || '',
    customerPhone: customerPhone || cart.customerPhone || '',
    customerEmail: user.email || '',
    customerShippingAddress: customerShippingAddress || cart.customerShippingAddress || '',
    customerDistrictCode: customerDistrictCode || cart.customerDistrictCode || '0',
    customerProvinceCode: customerProvinceCode || cart.customerProvinceCode || '0',
    customerWardCode: customerWardCode || cart.customerWardCode || '0',
    customerAddressCode: customerAddressCode || cart.customerAddressCode || '',
    customerRegionCode: customerRegionCode || cart.customerRegionCode || '',
  });

  const { invoice: invoiceCustomer = {} } = cart;

  const [invoice, setInvoice] = useState({
    invoiceRequest: invoiceCustomer?.invoiceRequest || false,
    companyName: invoiceCustomer?.companyName || '',
    companyAddress: invoiceCustomer?.companyAddress || '',
    taxCode: invoiceCustomer?.taxCode || '',
    isSaveInvoiceInfo: false,
    isUseCustom: false,
    email: user.email,
  });

  const handleChangeInvoice = (key, newValue) => {
    const newdataInvoice = { ...invoice, [key]: newValue };
    newdataInvoice.taxCode = newdataInvoice?.taxCode || '';
    setInvoice(newdataInvoice);
    updateInvoice({
      invoice: newdataInvoice,
    });
  };

  const handleSetAllInvoice = (newdataInvoice) => {
    setInvoice(newdataInvoice);
    // eslint-disable-next-line no-param-reassign
    newdataInvoice.taxCode = newdataInvoice?.taxCode || '';

    // eslint-disable-next-line no-param-reassign
    newdataInvoice.email = user.email || '';
    updateInvoice({
      invoice: newdataInvoice,
    });
  };

  const [totalWard, setTotalWard] = useState();

  const [error, setError] = useState({
    name: false,
    phone: false,
    address: false,
  });

  const dataCustomer = {
    paymentMethods,
    paymentMethod: paymentMethod || cart.paymentMethod || null,
    deliveryMethods,
    deliveryMethod: deliveryMethod || cart.deliveryMethod || deliveryMethodDefault?.code || null,
    totalWard,
    ordersCount: user.ordersCount || 0,
  };

  // update info for logs
  const handlePaymentChange = (event) => {
    const paymentValue = event.target.value;
    updatePaymentMethod({
      paymentMethod: paymentValue,
      ...value,
      info: paymentMethods.find((item) => item.code === paymentValue), // for logs
    });
  };

  const handleDeliveryChange = (event) => {
    const deliveryMethodValue = event.target.value;
    updateDeliveryMethod({
      deliveryMethod: deliveryMethodValue,
      ...value,
      // for logs
      info: deliveryMethods.find((item) => item.code === deliveryMethod),
    });
  };

  const handleSetValue = (key, val) => {
    setValue({ ...value, [key]: val });
  };

  const handleSetError = (key, val) => {
    setError({ ...value, [key]: val });
  };

  const handleChangeCheckbox = (event) => {
    setIsSaveInfo(event.target.checked);
  };
  const [currentAddress, setCurrentAddress] = useState({
    changeType: ADDRESS_CHANGE_TYPE.ASSIGNED,
    province: value.customerProvinceCode,
    district: value.customerDistrictCode,
    ward: value.customerWardCode,
  });

  const handleSetCurrentAddress = (addressinfo) => {
    setCurrentAddress(addressinfo);

    const newData = {
      ...value,
      customerRegionCode: getRegionByProvinceCode(addressinfo?.province),
      customerDistrictCode: addressinfo.district,
      customerProvinceCode: addressinfo.province,
      customerWardCode: addressinfo.ward,
    };
    setValue(newData);
    // update
    updateCartInfo(newData);
  };
  const handleLoadDataSelect = (data) => {
    const newData = { ...value, ...data, customerRegionCode: getRegionByProvinceCode(data?.customerProvinceCode) };
    setValue(newData);
    updateDeliveryInfo(newData);
    setCurrentAddress({
      changeType: ADDRESS_CHANGE_TYPE.ASSIGNED,
      province: data.customerProvinceCode,
      district: data.customerDistrictCode,
      ward: data.customerWardCode,
    });
  };

  const handleLoading = (val) => {
    setIsLoading(val);
  };

  useEffect(() => {
    if (customerAddressCode) {
      setValue({
        ...value,
        customerName,
        customerPhone,
        customerShippingAddress,
        customerDistrictCode,
        customerProvinceCode,
        customerWardCode,
        customerAddressCode,
        customerRegionCode,
      });
      setCurrentAddress({
        changeType: ADDRESS_CHANGE_TYPE.ASSIGNED,
        province: customerProvinceCode,
        district: customerDistrictCode,
        ward: customerWardCode,
      });
    }
  }, [customerAddressCode]);

  return (
    <Template
      title={title}
      pageTitle={title}
      isMobile={mobile}
      point={user?.point || 0}
      balance={user?.balance || 0}
      overrideMV2Options={{ title: 'Thông tin đơn hàng' }}
    >
      <div className={styles.wrapper_gray}>
        <div className={styles.payment_wrapper}>
          <Grid spacing={4} container>
            <Grid item xs={12} md={8}>
              {/* <CheckoutAddressList /> */}
              <ErrProductsWarningCard isMobile={isMobile} />
              <DeliveryInfoForm
                {...error}
                {...value}
                setError={setError}
                isChecked={isSaveInfo}
                handleSetValue={handleSetValue}
                handleChangeCheckbox={handleChangeCheckbox}
                setTotalWard={setTotalWard}
                manageAddressModalToggle={manageAddressModalToggle}
                currentAddress={currentAddress}
                handleSetCurrentAddress={handleSetCurrentAddress}
              />
              <InvoiceCheckout
                invoiceInfoList={invoices}
                invoice={invoice}
                handleChangeInvoice={handleChangeInvoice}
                handleSetAllInvoice={handleSetAllInvoice}
              />
              <DeliveryMethod
                totalPrice={totalPrice}
                deliveryMethods={deliveryMethods}
                addressSelect={value}
                selectedValue={deliveryMethod}
                productItems={cartItems}
                handleChange={handleDeliveryChange}
                provinces={provinces}
                getRegionByProvinceCode={getRegionByProvinceCode}
              />
              <PaymentMethod
                paymentMethods={paymentMethods}
                selectedValue={paymentMethod}
                handleChange={handlePaymentChange}
                paymentMethodDefault={paymentMethodDefault}
                user={user}
              />
              <Paper className={styles.root} elevation={4}>
                <h4>Ghi chú khác</h4>
                <p>
                  Trường hợp không tìm được thuốc mong muốn, Quý khách vui lòng điền yêu cầu bên dưới. Chúng tôi sẽ liên hệ mua thuốc và báo giá sớm
                  nhất có thể
                </p>
                <CartNote />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <CheckoutSticky
                onSetError={handleSetError}
                onLoading={handleLoading}
                cart={cart}
                data={value}
                dataCustomer={dataCustomer}
                selectedValue={paymentMethod}
                isMobile={mobile}
                isSaveInfo={isSaveInfo}
                user={user}
                invoice={invoice}
                invoices={invoices}
                currentAddress={currentAddress}
                deliveryLimitData={deliveryLimitData}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      {isLoading && (
        <div className={styles.overlay}>
          <LoadingScreen />
        </div>
      )}
      <ManageAddressModal
        visible={manageAddressModalOpen}
        onClose={manageAddressModalToggle}
        handleLoadDataSelect={handleLoadDataSelect}
        selectAddressCode={value.customerAddressCode}
      />
    </Template>
  );
};
export default CheckoutPage;
