import {
  getPurchasedProducts,
  getPurchasedProviders,
  getWishProducts,
} from 'clients/StatisticClient';

export const getPurchasedProductList = async ({ ctx, params }) => {
  const productsRes = await getPurchasedProducts({ ctx, params });
  return productsRes;
};
export const getPurchasedProviderList = async ({ ctx, params }) => {
  const productsRes = await getPurchasedProviders({ ctx, params });
  return productsRes;
};
export const getWishList = async ({ ctx }) => {
  const productsRes = await getWishProducts({ ctx });
  return productsRes;
};
export default { getPurchasedProductList, getPurchasedProviderList, getWishList };
