import { GET, getData } from './Clients';

export async function getPurchasedProducts({ ctx, from = null, to = null }) {
  const url = '/statistic/purchased-product';
  const params = {
    from,
    to,
  };
  const result = await GET({ url, mock: true, ctx, params });
  return getData(result);
}
export async function getPurchasedProviders({ ctx, from = null, to = null }) {
  const url = '/statistic/purchased-provider';
  const params = {
    from,
    to,
  };
  const result = await GET({ url, mock: true, ctx, params });
  return getData(result);
}
export async function getWishProducts({ ctx }) {
  const url = '/statistic/wish-list';
  const result = await GET({ url, mock: true, ctx });
  return getData(result);
}
export default { getPurchasedProducts, getPurchasedProviders, getWishProducts };
