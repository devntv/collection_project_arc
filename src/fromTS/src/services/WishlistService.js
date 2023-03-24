import { CartClientV2, getData, getFirst, isValid, WishlistClient } from 'clients';
import { convertArrayToMap } from 'utils/ArrUtils';
import { isEmpty } from 'utils/ValidateUtils';
import { getProductInfoMapFromSkus } from './ProductServiceV2';

export const getWishlistWithInfo = async ({ ctx, customerID, offset, limit }) => {
  const wishlistRes = await WishlistClient.getWishlist({ ctx, customerID, offset, limit });
  const wishlist = getData(wishlistRes);
  const { total = 0 } = wishlistRes;
  const skus = wishlist.map((item) => item?.sku);
  const mapProductWishlistRes = await getProductInfoMapFromSkus({ ctx, skus });
  const mapProductWishlist = getFirst(mapProductWishlistRes);
  let listWishlist = wishlist.map(({ sku }) => mapProductWishlist?.[sku]);

  let cartObject = new Map();

  const cartRes = await CartClientV2.loadDataCart(ctx);
  if (isValid(cartRes)) {
    const cart = cartRes.data[0];
    if (cart && !isEmpty(cart.cartItems)) {
      cartObject = convertArrayToMap(cart.cartItems, 'sku');
    }
  }

  listWishlist = listWishlist.map((item) => ({
    ...item,
    quantity: cartObject.get(item?.sku)?.quantity || 0,
  }));

  const ids = [];
  const skusMain = [];
  listWishlist.forEach((item) => {
    if (item?.errorMessage) {
      ids.push(item.productId);
      skusMain.push(item?.sku);
    }
  });

  const allSkuResult = await WishlistClient.getListSkuByProductId({ ctx, productIds: ids.join() });
  const allSku = getData(allSkuResult);
  const otherSkus = allSku.filter((n) => !skusMain.includes(n));

  if (otherSkus.length > 0) {
    const mapOtherSkuRes = await getProductInfoMapFromSkus({ ctx, skus: otherSkus });
    const mapOtherSku = getFirst(mapOtherSkuRes);
    const listOtherSku = otherSkus.map((item) => mapOtherSku?.[item]).filter((item) => item !== undefined && item !== null);
    listOtherSku.forEach((item, index) => {
      if (item?.errorMessage) {
        listOtherSku.splice(index, 1);
      }
    });

    if (listOtherSku.length > 0) {
      listOtherSku.sort((a, b) => a.productId.localeCompare(b.productId) || b.displayPrice - a.displayPrice);
      const listAvailable = [];
      listOtherSku.forEach(({ productId }) => {
        const index = listAvailable.findIndex((item) => item.productId === productId);
        if (index === -1) {
          listAvailable.push(listOtherSku[index]);
        }
      });

      listAvailable.forEach(({ productId }) => {
        const index1 = listWishlist.findIndex((item) => item.productId === productId);
        const index2 = listOtherSku.findIndex((item) => item.productId === productId);
        listWishlist.splice(index1, 1);
        listWishlist.push(listOtherSku[index2]);
      });
    }
  }

  return { data: listWishlist, total };
};
export default { getWishlistWithInfo };
