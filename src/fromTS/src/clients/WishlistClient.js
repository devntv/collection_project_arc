import { PRODUCT_API } from 'constants/APIUriV2';
import { GET, GET_ALL, POST, PUT } from './Clients';

export const getWishlistBySkus = async ({ ctx, skus = null }) => {
  const body = {
    skus,
  };
  return POST({
    url: PRODUCT_API.WISHLIST_LIST,
    body,
    ctx,
  });
};

export const getWishlist = async ({ ctx, sku = null, customerID, offset, limit }) => {
  const params = {
    q: JSON.stringify({ sku, customerID }),
    getTotal: true,
    offset,
    limit,
  };
  return GET({
    url: PRODUCT_API.WISHLIST,
    params,
    ctx,
  });
};

const getAllWishlist = async ({ customerID }) => {
  const params = { q: JSON.stringify({ customerID }) };
  return GET_ALL({
    url: PRODUCT_API.WISHLIST_LIST,
    params,
  });
};
const updateWishlist = async (sku) => POST({ url: PRODUCT_API.WISHLIST, body: { sku } });
const deleteItemWishlist = async (sku) => PUT({ url: PRODUCT_API.WISHLIST, body: { sku } });
const getListSkuByProductId = async ({ ctx, productIds }) => GET({ url: PRODUCT_API.SKUS_BY_ID, params: { productIds }, ctx });
export default { getWishlistBySkus, updateWishlist, deleteItemWishlist, getListSkuByProductId, getWishlist, getAllWishlist };
