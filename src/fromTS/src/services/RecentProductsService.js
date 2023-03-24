import { CartClientV2, getData, getFirst, isValid } from 'clients';
import RecentProductsClient from 'clients/RecentProductsClient';
import { convertArrayToMap } from 'utils/ArrUtils';
import { isEmpty } from 'utils/ValidateUtils';
import { getProductInfoMapFromSkus } from './ProductServiceV2';

const getRecentProductsWithInfo = async ({ ctx, customerID, offset, limit }) => {
  const recentProductsRes = await RecentProductsClient.getRecentProducts({ ctx, customerID, offset, limit });
  const recentProducts = getData(recentProductsRes);
  const { total = 0 } = recentProductsRes;
  const skus = recentProducts.map((item) => item.skuCode);
  const mapProductRecentProductsRes = await getProductInfoMapFromSkus({ ctx, skus });
  const mapProductRecentProducts = getFirst(mapProductRecentProductsRes);

  let listRecentProducts = recentProducts.map(({ skuCode }) => mapProductRecentProducts?.[skuCode] && mapProductRecentProducts?.[skuCode]);

  let cartObject = new Map();

  const cartRes = await CartClientV2.loadDataCart(ctx);
  if (isValid(cartRes)) {
    const cart = cartRes.data[0];
    if (cart && !isEmpty(cart.cartItems)) {
      cartObject = convertArrayToMap(cart.cartItems, 'sku');
    }
  }

  listRecentProducts = listRecentProducts.map((item) => ({
    ...item,
    quantity: cartObject.get(item.sku)?.quantity || 0,
  }));

  const ids = [];
  const skusMain = [];
  listRecentProducts.forEach((item) => {
    if (item && item?.errorMessage) {
      ids.push(item.productId);
      skusMain.push(item.sku);
    }
  });

  const allSkuResult = await RecentProductsClient.getListSkuByProductId({ ctx, productIds: ids.join() });
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
        const index1 = listRecentProducts.findIndex((item) => item.productId === productId);
        const index2 = listOtherSku.findIndex((item) => item.productId === productId);
        listRecentProducts.splice(index1, 1);
        listRecentProducts.push(listOtherSku[index2]);
      });
    }
  }
  return { data: listRecentProducts, total };
};
export default { getRecentProductsWithInfo };
