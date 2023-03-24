import { PRODUCT_API } from 'constants/APIUriV2';
import { GET } from './Clients';

const getRecentProducts = async ({ ctx, sku = null, customerID, offset, limit }) => {
  const params = {
    q: JSON.stringify({ sku, customerID }),
    getTotal: true,
    offset,
    limit,
  };
  return GET({
    url: PRODUCT_API.RECENT_PRODUCTS,
    params,
    ctx,
  });
};

const getListSkuByProductId = async ({ ctx, productIds }) => GET({ url: PRODUCT_API.SKUS_BY_ID, params: { productIds }, ctx });

export default {
  getRecentProducts,
  getListSkuByProductId,
};
