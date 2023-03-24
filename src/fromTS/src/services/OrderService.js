import { getData, getFirst, isValid, isValidWithoutData, OrderClient } from 'clients';
import { ENUM_ORDER_STATUS, ENUM_ORDER_TYPE, HTTP_STATUS } from 'constants/Enums';
import { DateTimeUtils } from 'utils';
import AddressService from './AddressService';
import { getDetailDeliveryMethod, getDetailPaymentMethod } from './PricingService';
import { getProductInfoMapFromSkus } from './ProductServiceV2';

export const deleteOrder = async ({ orderId }) => {
  const res = await OrderClient.deleteOrder({ orderId });
  return res;
};

const getOrderCountInWeek = async ({ ctx }) => {
  const res = await OrderClient.getOrders({ ctx, limit: 7 });
  if (!isValid(res)) {
    return 0;
  }
  const orders = getData(res) || [];
  const firstDateOfWeek = DateTimeUtils.getFirstDateOfWeek();
  return orders?.filter((item) => item.status !== 'CANCEL' && new Date(item.createdTime) > firstDateOfWeek)?.length || 0;
};

const startDate = 1626282000000;

const getOrderCountInWeekStartDate = async ({ ctx }) => {
  const res = await OrderClient.getOrders({ ctx, limit: 7 });
  if (!isValid(res)) {
    return 0;
  }
  const orders = getData(res) || [];
  const newDate = new Date();
  const firstDateOfWeek = Math.max(newDate.getTime() - 7 * 24 * 3600000, startDate);
  const firstDateCal = new Date(firstDateOfWeek);
  firstDateCal.setHours(0, 0, 0, 0);
  return orders?.filter((item) => item.status !== 'CANCEL' && new Date(item.createdTime) > firstDateCal)?.length || 0;
};

const MINUTES_30 = 1800000;

async function getInfoOrderItem({ orderItems = [], ctx }) {
  const skus = orderItems.reduce((accumulator, item) => {
    if (item?.sku) return [...accumulator, item.sku];
    return accumulator;
  }, []);
  if (skus.length === 0) {
    return {
      status: HTTP_STATUS.Forbidden,
      message: 'Dữ liệu không đủ',
    };
  }
  return getProductInfoMapFromSkus({ skus, ctx });
}
export const getOrderById = async ({ ctx, orderId }) => {
  const orderRes = await OrderClient.getOrderById({ id: Number(orderId), ctx });
  return orderRes;
};

// get order detail ( page order detail )
export const getOrderDetail = async ({ ctx, orderId, customerLevel, locationCode, getCombo = true }) => {
  const orderRes = await OrderClient.getOrderById({ id: Number(orderId), ctx });
  if (!isValid(orderRes)) {
    return orderRes;
  }

  const order = getFirst(orderRes, {});
  const {
    orderCode = '',
    deliveryMethod,
    paymentMethod,
    status,
    createdTime,
    customerProvinceCode,
    customerDistrictCode,
    customerWardCode,
    customerShippingAddress,
    redeemCode = null,
    redeemApplyResult = null,
    totalDiscount = null,
    orderItems = [],
  } = order;

  if (redeemCode?.length > 0 && !redeemApplyResult) {
    const convertRedeem = [];
    if (totalDiscount > 0) {
      convertRedeem.push({
        code: redeemCode[0],
        discountValue: totalDiscount,
        canUse: true,
      });
    } else {
      const skuGift = orderItems?.find((item) => item?.type === 'GIFT')?.sku;
      // Thuy29Dec2022: cần convert vì ko migrate cho đơn hàng cũ
      if (skuGift) {
        convertRedeem.push({
          code: redeemCode[0],
          gifts: [{ sku: skuGift, quantity: 1 }],
          canUse: true,
        });
      }
    }

    order.redeemApplyResult = convertRedeem;
  }
  const masterAddress = await AddressService.getMasterAddressString({
    ctx,
    provinceCode: customerProvinceCode,
    districtCode: customerDistrictCode,
    wardCode: customerWardCode,
  });

  order.masterAddress = `${customerShippingAddress}, ${masterAddress}`;
  // logic check update
  // order can edit if status === wait to confirm && 30 minutes
  order.canEdit = status === ENUM_ORDER_STATUS.WAIT_TO_CONFIRM && +new Date() - +new Date(createdTime) <= MINUTES_30;

  const [productsRes, paymentRes, deliveryRes] = await Promise.all([
    OrderClient.getProductByOrderCode({ orderCode, ctx }),
    getDetailPaymentMethod({ ctx, paymentMethodCode: paymentMethod }),
    getDetailDeliveryMethod({ ctx, deliveryPlatformCode: deliveryMethod }),
  ]);

  // if (status === ENUM_ORDER_STATUS.COMPLETED || status === ENUM_ORDER_STATUS.DELIVERED ) {
  const invoiceRes = await OrderClient.getInvoicesByOrderId({ ctx, orderId });
  if (isValid(invoiceRes)) {
    const invoiceData = getFirst(invoiceRes);
    order.invoices = invoiceData?.invoices || [];
  }
  // }
  order.invoiceInfo = getFirst(invoiceRes);

  // get info payment info , deliver info
  const paymentInfo = getFirst(paymentRes);
  const deliveryInfo = getFirst(deliveryRes);
  order.paymentMethodName = paymentInfo?.name;
  order.deliveryMethodName = deliveryInfo?.name || null;

  orderRes.data = [order];

  if (!isValidWithoutData(productsRes)) {
    return orderRes;
  }

  const products = getData(productsRes, []);

  // check can edit :  order have item combo or deal can't edit
  order.canEdit =
    order.canEdit &&
    products.filter(
      (item) => item && (item.type === ENUM_ORDER_TYPE.DEAL || item.type === ENUM_ORDER_TYPE.COMBO || item.type === ENUM_ORDER_TYPE.CAMPAIGN),
    ).length === 0;
  const orderItemInfoRes = await getInfoOrderItem({
    orderItems: products,
    ctx,
  });
  order.products = products;

  // get infor product combo from subSku
  let comboProductsInfo = {};
  if (getCombo) {
    const getProductInfoBySubSkus = async () =>
      Promise.all(
        products.map(async (product) => {
          const { subItems = [] } = product;
          let comboList = [];
          const skuArr = subItems.reduce((pV, cV) => pV.concat(cV.sku), []);
          const comboListInfo = await getProductInfoMapFromSkus({ ctx, skus: skuArr, customerLevel, locationCode });

          if (isValid(comboListInfo)) {
            const mapProductCombo = getFirst(comboListInfo, {});
            comboList = subItems?.map((item) => ({ ...mapProductCombo[item?.sku], ...item })) || null;
          }

          return comboList;
        }),
      );

    comboProductsInfo = await getProductInfoBySubSkus();
  }

  if (isValid(orderItemInfoRes)) {
    const orderItemInfoMap = orderItemInfoRes.data[0];
    order.products = order.products.map((product, key) => ({
      comboList: comboProductsInfo[key] || null,
      productInfo: orderItemInfoMap[product?.sku] || {},
      campaign: orderItemInfoMap[product?.sku]?.campaign || {},
      ...product,
    }));
  }
  orderRes.data = [order];
  return orderRes;
};

export const getOrders = async ({ ctx, status, offset, limit, q }) => {
  const orderRes = await OrderClient.getOrders({ status, ctx, offset, limit, q });
  if (!isValid(orderRes)) return orderRes;
  const orderListData = getData(orderRes);
  const orders = await Promise.all(
    orderListData.map(async (order) => {
      const { createdTime, status: orderStatus, orderCode, orderId } = order;
      // let invoices = [];
      let invoiceInfo = {};
      //  if (orderStatus === ENUM_ORDER_STATUS.COMPLETED) {
      const invoiceRes = await OrderClient.getInvoicesByOrderId({ ctx, orderId });
      let canEdit = orderStatus === ENUM_ORDER_STATUS.WAIT_TO_CONFIRM && +new Date() - +new Date(createdTime) <= MINUTES_30;
      const productRes = await OrderClient.getProductByOrderCode({ orderCode, ctx });
      const products = productRes.data;

      if (!isValid(invoiceRes)) return { ...order, invoiceInfo, products };
      //  const invoiceData = getFirst(invoiceRes);
      // invoices = invoiceData?.invoices || [];
      invoiceInfo = getFirst(invoiceRes);
      //  }
      if (!canEdit) return { ...order, canEdit, invoiceInfo, products };

      if (!isValid(productRes)) return { ...order, canEdit, products };
      canEdit = products.filter((item) => item && item.type !== ENUM_ORDER_TYPE.NORMAL).length === 0;
      return { ...order, canEdit, invoiceInfo, products };
    }),
  );
  orderRes.data = orders;
  return orderRes;
};

export const getAllOrders = async ({ ctx, status }) => {
  const orderRes = await OrderClient.getAllOrders({ status, ctx });
  if (!isValid(orderRes)) return orderRes;
  const orderListData = getData(orderRes);
  const orders = await Promise.all(
    orderListData.map(async (order) => {
      const { orderCode } = order;
      const productRes = await OrderClient.getProductByOrderCode({ orderCode, ctx });
      if (!isValid(productRes)) return { ...order };
      const productsInfo = productRes.data;
      return { ...order, productsInfo };
    }),
  );
  orderRes.data = orders;
  return orderRes;
};

export const getOrderInvoiceFee = async ({ ctx, orderId }) => {
  const res = await OrderClient.getInvoiceFee({ ctx, orderId });
  const data = getData(res);
  return data;
};

export default {
  deleteOrder,
  getOrderDetail,
  getOrders,
  getInfoOrderItem,
  getOrderCountInWeek,
  getOrderCountInWeekStartDate,
  getOrderById,
  getOrderInvoiceFee,
};
