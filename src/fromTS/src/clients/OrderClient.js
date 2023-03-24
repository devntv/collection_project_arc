import { BUYER_SERVICE_API, ORDER_API } from 'constants/APIUriV2';
import { ENUM_ORDER_STATUS } from 'constants/Enums';
import { DELETE, GET, GET_ALL, LIMIT_DEFAULT, OFFSET_DEFAULT, POST, PUT } from './Clients';

async function getOrders({ offset = OFFSET_DEFAULT, limit = LIMIT_DEFAULT, status, ctx, q, ids = null }) {
  const url = `${ORDER_API.MY_ORDER_LIST}`;
  const params = {
    offset,
    limit,
    getTotal: true,
    status,
    q,
    ids,
  };
  return GET({ url, ctx, params });
}
export async function getAllOrders({ status, ctx }) {
  const url = `${ORDER_API.MY_ORDER_LIST}`;
  const params = {
    getTotal: true,
  };
  if (status !== ENUM_ORDER_STATUS.ALL) params.status = status;
  return GET_ALL({ url, ctx, params });
}

export const deleteOrder = async ({ orderId }) => {
  const url = ORDER_API.REVERT;
  const params = { orderId };
  return DELETE({ url, params });
};

async function getOrderById({ ctx, id = 0 }) {
  const url = ORDER_API.ORDER_INFO;
  const params = {
    q: JSON.stringify({ orderId: id }),
  };
  return GET({ url, ctx, params });
}
async function getOrderByIdWithoutLogin({ ctx, id }) {
  const url = ORDER_API.ORDER_INFO;
  const params = {
    q: JSON.stringify({ orderId: Number(id) }),
  };
  return GET({ url, ctx, params, isBasic: true, isAuth: false });
}
async function getProductByOrderCode({ orderCode = '', ctx }) {
  const url = `${ORDER_API.ORDER_ITEM_LIST}`;

  const params = {
    q: JSON.stringify({ orderCode }),
  };
  return GET_ALL({ url, params, ctx });
}

async function getInvoicesByOrderId({ ctx, orderId }) {
  const url = '/accounting/invoice/v1/order/order-invoice/lite';
  const params = {
    orderId,
  };
  return GET({ url, ctx, params });
}
async function delayDelivery(orderId) {
  const url = '/marketplace/order/v2/order/delay-delivery';
  const body = {
    orderId,
  };
  return PUT({ url, body });
}

// yêu cầu giữ đơn
// async function cancelOrder(orderId) {
//   const url = '/marketplace/order/v2/order/status';
//   const body = {
//     orderId,
//     status: 'CANCEL',
//   };
//   return PUT({ url, body });
//   return result;
// }

// huỷ đơn
const cancelOrder = async (orderId) => {
  const url = '/marketplace/order/v2/order/cancel';
  const body = {
    orderId,
  };
  return PUT({ url, body });
};

// https://api.v2-stg.thuocsi.vn/marketplace/order/v2/order/summation?info=LAST_ORDER,TOTAL_ORDER&customerId=1060
async function getLastOrder({ customerId }) {
  const url = '/marketplace/order/v2/order/summation?info=LAST_ORDER,TOTAL_ORDER';
  const params = { customerId };
  return GET({ url, params });
}
// search Order
async function getOrderID(orderId) {
  const url = ORDER_API.SEARCH_ORDER_ID;
  return GET({ url, params: { q: JSON.stringify({ orderId: +orderId }) } });
}

const searchOrder = async (params) => {
  const url = ORDER_API.MY_ORDER_LIST;
  return GET({ url, params });
};

const searchOrderwithDate = async ({ timeFrom, timeTo, offset, limit }) => {
  const url = ORDER_API.MY_ORDER_LIST;
  const params = {
    getTotal: true,
    q: JSON.stringify({ timeFrom, timeTo }),
    offset,
    limit,
  };
  return GET({ url, params });
};

const getByStatusOrder = async ({ offset = OFFSET_DEFAULT, limit = LIMIT_DEFAULT, status, timeFrom, timeTo, skuCodes, orderId }) => {
  const url = ORDER_API.MY_ORDER_LIST;
  const params = {
    offset,
    limit,
    skuCodes,
    q: JSON.stringify({ status, timeFrom, timeTo, orderId: +orderId }),
    getTotal: true,
  };
  return GET({ url, params });
};
export async function getAllOrdersSearch() {
  const url = `${ORDER_API.ORDER_ITEM_LIST}`;
  const params = {
    getTotal: true,
  };
  return GET({ url, params });
}
export async function searchOrderwithName({ skuCodes }) {
  const url = `${ORDER_API.MY_ORDER_LIST}`;
  const params = {
    skuCodes,
    getTotal: true,
  };
  return GET({ url, params });
}
export async function searchOrdersByName({ skuCodes, offset = OFFSET_DEFAULT, limit = LIMIT_DEFAULT }) {
  const url = `${ORDER_API.MY_ORDER_LIST}`;
  const params = {
    skuCodes,
    getTotal: true,
    offset,
    limit,
  };
  return GET({ url, params });
}

async function waitMoreOrder({ orderId, action }) {
  const url = '/marketplace/order/v2/order/hold-order';
  const body = {
    orderId,
    action,
  };
  return POST({ url, body });
}

async function getHoldOrderConfig({ signal }) {
  const url = '/marketplace/order/v2/order/hold-order-config';
  return GET({ url, signal });
}

async function getStatusWareHouse({ adminId, signal }) {
  const url = '/warehouse/core/v1/sale-orders';
  return GET({ url, params: { adminId }, signal });
}

async function getVouchers({ ctx, scope = '' }) {
  const url = `/marketplace/order/v2/voucher/active`;
  const params = {
    getValidate: true,
    getTotal: true,
    scope,
  };
  return GET_ALL({ url, ctx, params });
}

async function getInvoiceFee({ ctx, orderId }) {
  const body = {
    q: { orderId: Number(orderId) },
  };
  return POST({ url: BUYER_SERVICE_API, ctx, body });
}

export default {
  getOrders,
  getOrderById,
  getOrderByIdWithoutLogin,
  getProductByOrderCode,
  deleteOrder,
  getAllOrders,
  getInvoicesByOrderId,
  delayDelivery,
  cancelOrder,
  getLastOrder,
  getOrderID,
  searchOrderwithDate,
  getByStatusOrder,
  getAllOrdersSearch,
  searchOrderwithName,
  searchOrdersByName,
  waitMoreOrder,
  getHoldOrderConfig,
  getStatusWareHouse,
  searchOrder,
  getVouchers,
  getInvoiceFee,
};
