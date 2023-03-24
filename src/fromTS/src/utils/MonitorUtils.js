// import MonitorClient from "clients/MonitorClient"

import { isValid } from 'clients';
import MonitorClient from 'clients/MonitorClient';
import { SCREEN_TO_ENUM_TRACKING_SOURCE_MAP, SOURCE_TO_ENUM_TRACKING_SOURCE_MAP } from 'constants/data';
import { ENUM_TRACKING_SOURCE, MONITORING_COLLECTOR_TYPE } from 'constants/Enums';

const convertProduct = (product) => {
  const { sellerInfo = {}, sku = '', productId = '' } = product;
  const { sellerID = '' } = sellerInfo || {};

  return {
    sku,
    seller_id: sellerID.toString(),
    product_id: productId.toString(),
  };
};

export const mapSourceToEnum = (product = {}, path = '') => {
  if (product?.isSameCategoryProduct) return ENUM_TRACKING_SOURCE.SAME_CATEGORY;
  if (product?.isRecommended) return ENUM_TRACKING_SOURCE.RECOMMENDATION;
  if (product?.isRecommendedByTS) return ENUM_TRACKING_SOURCE.RECOMMENDATION_TS;
  // if (product?.isExclusive) return ENUM_TRACKING_SOURCE.EXCLUSIVE; // temporary hide, wait to create new source tracking for this product line

  return SOURCE_TO_ENUM_TRACKING_SOURCE_MAP[path] || '';
};

export const mapScreenToEnum = (product = {}, path = '') => {
  if (product?.isSameCategoryProduct) return ENUM_TRACKING_SOURCE.SAME_CATEGORY;

  return SCREEN_TO_ENUM_TRACKING_SOURCE_MAP[path] || '';
};

// document: https://buymed.atlassian.net/wiki/spaces/V2U/pages/549847093/collector
// TODO: use path -> source :  quick-order, product-list, promotion, seller-home, recommendation, same-category, whislist
const sendSKUEvent = async (event, product, path = '') => {
  const convertedProduct = convertProduct(product);
  const metadata = {
    ...convertedProduct,
    source: mapSourceToEnum(product, path),
    screen: mapScreenToEnum(product, path),
  };

  if (!path) delete metadata?.source;

  if (event === MONITORING_COLLECTOR_TYPE.SKU_IMPRESSION) {
    const productSentArray = JSON.parse(localStorage?.getItem('collectorProductSentArray') || '[]')?.filter(
      (item) => Date.now() - item?.lastTimeSend < 60000,
    );
    const productIndex = productSentArray?.findIndex((prd) => prd?.productId === convertedProduct?.product_id);

    // Mỗi sản phẩm với một user chỉ gửi một lần/phút

    if (productIndex === -1) {
      const res = await MonitorClient.collectEvent(event, metadata);
      if (isValid(res)) {
        const info = {
          lastTimeSend: Date.now(),
          productId: convertedProduct?.product_id || '',
        };
        productSentArray.push(info);

        try {
          localStorage.setItem('collectorProductSentArray', JSON.stringify(productSentArray));
        } catch (error) {
          window.localStorage.removeItem('collectorProductSentArray');
        }
      }
      return res;
    }
  }

  const res = await MonitorClient.collectEvent(event, metadata);
  return res;
};

const sendLoginEvent = async (event, metadata) => {
  const res = await MonitorClient.collectEvent(event, metadata);
  return res;
};

export default {
  sendSKUEvent,
  sendLoginEvent,
};
