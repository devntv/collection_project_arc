import { CART_API } from 'constants/APIUriV2';
import { GET, POST, PUT } from './Clients';

const getCartItemList = ({ ctx, params = { onlyQuantity: true } }) => GET({ ctx, url: CART_API.CART_ITEM_LIST, params });

const convertBody = (body = {}) => ({ ...body, source: 'thuocsi-web' });

const loadDataCart = async (ctx) => GET({ url: CART_API.CART_INFO, ctx });

const checkout = async (body) => PUT({ url: '/marketplace/order/v2/cart/checkout', body: convertBody(body) });

const updateCart = async ({ body, ctx }) => PUT({ url: CART_API.CART_INFO, ctx, body: convertBody(body) });

const updateCartItem = async (data) => {
  const body = {
    sku: data.product.sku,
    type: data?.product?.type || null,
    isDeal: data?.product?.isDeal,
    name: data?.product?.name,
    price: data?.product?.deal?.price || data?.product?.salePrice || 0,
    quantity: data.q,
    cartNo: data?.cartNo,
    page: data?.page,
    searchKey: data?.searchKey,
    sellerID: data?.sellerID || null,
    sellerCode: data?.product?.sellerCode || null,
    productId: data?.product?.productId || null,
    eventSource: data?.eventSource || '',
    eventScreen: data?.eventScreen || ''
  };
  return POST({ url: CART_API.CART_ADD, body: convertBody(body) });
};

// { sku, quantity, isImportant }
const updateCartItemImportant = async (body) => PUT({ url: CART_API.CART_ITEM, body: convertBody(body) });

const removeCartItem = (body) => PUT({ url: CART_API.CART_REMOVE, body: convertBody(body) });

const updateRedeemCode = (redeemCode) => {
  const body = { redeemCode };
  return PUT({
    url: CART_API.CART_UPDATE_REDEEM_CODE,
    body: convertBody(body),
  });
};

const updateDeliveryMethod = (body) => PUT({ url: CART_API.DELIVERY_METHOD_UPDATE, body: convertBody(body) });

const updatePaymentMethod = (body) => PUT({ url: CART_API.PAYMENT_METHOD_UPDATE, body: convertBody(body) });

const updateNote = (note) => {
  const body = { note };
  return PUT({ url: CART_API.CART_INFO, body: convertBody(body) });
};

const reOrder = async (body) => POST({ url: CART_API.RE_ORDER, body });
const confirmChangePrice = async (body) => POST({ url: CART_API.CONFIRM, body });

const getDeliveryLimitation = ({ ctx }) => GET({ ctx, url: CART_API.DELIVERY_LIMITATION });

// APO-08 : tính năng đặt 1 môt giỏ hàng
// select / un-select item
// body : { isSelected, sku , isAppliedAll  }
// isSelected : true / false là có chọn hay không
// nếu theo sku thì có field sku
// nếu select all thì => isAppliedAll : true , isSelected: true
// nếu un-select all thì => isAppliedAll : false , isSelected: true
// https://buymed.atlassian.net/browse/APO-41

// chọn từng item
const selectCartItem = async ({ sku, skus, isSelected, isAppliedAll, cartNo, name, quantity }) =>
  PUT({ url: CART_API.SELECT_ITEM, body: { isSelected, sku, skus, isAppliedAll, cartNo, name, quantity } });
// verrify gior hangf
const verifyPayment = async ({ ctx, body = {} }) => POST({ ctx, url: CART_API.VERIFY_CART, body: convertBody(body) });
export default {
  loadDataCart,
  updateCartItem,
  removeCartItem,
  updateRedeemCode,
  updateNote,
  updateCartItemImportant,
  updateDeliveryMethod,
  updatePaymentMethod,
  checkout,
  updateCart,
  reOrder,
  confirmChangePrice,
  getDeliveryLimitation,
  selectCartItem,
  getCartItemList,
  verifyPayment,
};
