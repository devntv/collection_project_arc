import { getData, getFirst, isValid } from 'clients';
import { getAnalyticsCustomer, getAnalyticsSkuRes } from 'clients/AnalyticsClient';
import { getProductInfoMapFromSkus } from './ProductServiceV2';

export const getAnalyticsOrderByCustomer = async ({ ctx, from = null, to = null, customerCode }) => {
  const analyticsRes = await getAnalyticsCustomer({ ctx, customerCode, from, to });

  if (!isValid(analyticsRes)) {
    return analyticsRes;
  }
  const topProduct = getData(analyticsRes);
  const skus = topProduct.map((item) => item.sku);

  const mapSeller = {};
  const mapManufacturer = {};

  const productMapRes = await getProductInfoMapFromSkus({ ctx, skus });
  const mapProduct = getFirst(productMapRes);
  if (mapProduct) {
    topProduct.map((item) => {
      const { totalValue = 0, orderedQuantity = 0 } = item || {};
      const info = mapProduct[item?.sku] || {};

      const { sellerCode = null, manufacturerCode = null } = info || {};

      // seller
      if (sellerCode) {
        const sellerInfo = mapSeller[sellerCode] || { sellerCode, totalPrice: 0, totalQuantity: 0 };
        sellerInfo.totalPrice += totalValue;
        sellerInfo.totalQuantity += orderedQuantity;
        mapSeller[sellerCode] = sellerInfo;
      }

      if (manufacturerCode && manufacturerCode.length > 0) {
        const manufacturerInfo = mapManufacturer[manufacturerCode] || { manufacturerCode, totalPrice: 0, totalQuantity: 0 };
        manufacturerInfo.totalPrice += totalValue;
        manufacturerInfo.totalQuantity += orderedQuantity;
        mapManufacturer[manufacturerCode] = manufacturerInfo;
      }

      return {
        ...item,
        info,
      };
    });
  }

  const topManufacturer = Object.values(mapManufacturer);
  const topSeller = Object.values(mapSeller);
  return { ...analyticsRes, mapProduct, topProduct, topManufacturer, topSeller };
};

const getAnalyticsProductBySku = async ({ sku, timeSpan = null, fromTime = null, toTime = null }) => {
  const analyticsRes = await getAnalyticsSkuRes({ sku, timeSpan, fromTime, toTime });
  return analyticsRes;
};

export default { getAnalyticsOrderByCustomer, getAnalyticsProductBySku };
