import { getFirst, isValid } from 'clients';
import CartClientV2 from 'clients/CartClientV2';
import { isEmpty } from 'utils/ValidateUtils';
import { getProductInfoMapFromSkus } from './ProductServiceV2';

export const getCartInfo = async ({ ctx }) => CartClientV2.loadDataCart(ctx);

export const getInfoCartItem = async ({ ctx, data, getPrice = true }) => {
  if (isEmpty(data)) {
    return [];
  }
  const skus = data.reduce((accumulator, item) => {
    if (item?.sku) return [...accumulator, item.sku];
    return accumulator;
  }, []);

  if (skus.length === 0) {
    return [];
  }
  const mapInfoRes = await getProductInfoMapFromSkus({ ctx, skus, getPrice });
  const mapInfo = getFirst(mapInfoRes);

  // sort những item nào có lỗi sẽ hiện lên trước
  data.sort((a, b) => (a.errorCode && !b.errorCode ? -1 : 1));
  return data.map((item) => {
    // TODO: ẩn nhà cung cấp
    const {
      imagesProxy,
      volume,
      name,
      slug,
      deal = {},
      isDeal,
      isGift,
      productId,
      salePrice = 0,
      displayPrice = 0,
      dealPrice = 0,
      tags,
      seller,
      statusData,
      limitPerDay,
      maxQuantityPerDay,
      quantityPurchasedToday,
      messageLimitOrder,
      categoryCodes,
      campaign,
    } = mapInfo[item.sku] || {};

    // const salePrice = deal?.dealType === 'COMBO' || !deal ? item.price : item.salePrice;
    const disableAddTocart =
      item.errorCode === 'NOT_ACTIVE_SKU' ||
      item.errorCode === 'SUSPENDED_SKU' ||
      item.errorCode === 'OUT_OF_STOCK_SKU' ||
      item.errorCode === 'CART_ITEM_INVALID' ||
      item.errorCode === 'NOT_AVAILABLE_SKU' ||
      item.errorCode === 'NOT_FOUND_SKU' ||
      item.errorCode === 'NOT_FOUND_PRICE_SKU' ||
      item.errorCode === 'COMBO_INVALID' ||
      false;

    /*
    // nếu item (cart item ) là deal thì có thêm 1 field là  salePrice ( giá gốc )
    // nếu không là deal thì chỉ có price 
    nhưng khi hiển thị ở cartProductBuy lại chỉ check salePrice , nên nếu 
    Updaate chỗ này để nếu có saleprice thì lấy giá saleprice , còn nếu ko có thì lấy giá price theo cartItem 
    salePrice: item.salePrice || item.price,
*/
    const info = {
      ...item,
      salePrice,
      displayPrice,
      dealPrice,
      errorCode: item.errorCode || '',
      imagesProxy,
      volume,
      name,
      slug: slug?.toLowerCase() || slug,
      deal,
      isDeal,
      seller,
      isGift,
      disableAddTocart,
      productId, // for insider
      tags,
      statusData,
      limitPerDay,
      maxQuantityPerDay,
      quantityPurchasedToday,
      messageLimitOrder,
      categoryCodes,
      campaign,
    };

    return info;
  });
};

export const checkoutCart = async (body) => {
  await CartClientV2.updateCart({ body });
  return CartClientV2.checkout(body);
};

export const getCartInfoWithProduct = async ({ ctx }) => {
  const cartRs = await getCartInfo({ ctx });
  if (!isValid(cartRs)) {
    return cartRs;
  }
  const cartInfo = getFirst(cartRs);
  const { cartItems } = cartInfo;
  const listItems = await getInfoCartItem({ ctx, data: cartItems, getPrice: false });
  cartInfo.cartItems = listItems;
  return {
    ...cartRs,
    data: [cartInfo],
  };
};

const reOrder = async (body) => CartClientV2.reOrder(body);

// APO-08
// chọn / bỏ chọn 1 item
const selectCartItem = async ({ sku, skus, isSelected, cartNo, quantity, name }) =>
  CartClientV2.selectCartItem({ sku, skus, isSelected, cartNo, quantity, name });
const selectAllCartItem = async ({ cartNo }) => CartClientV2.selectCartItem({ isAppliedAll: true, isSelected: true, cartNo });
const unSelectAllCartItem = async ({ cartNo }) => CartClientV2.selectCartItem({ isAppliedAll: true, isSelected: false, cartNo });
const validateCart = async ({ ctx, body }) => CartClientV2.verifyPayment({ ctx, body });

export default {
  getInfoCartItem,
  checkoutCart,
  getCartInfoWithProduct,
  reOrder,
  selectCartItem,
  selectAllCartItem,
  unSelectAllCartItem,
  validateCart,
};
