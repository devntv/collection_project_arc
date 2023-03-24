import { getData, SupplierClient } from 'clients';
import CacheUtils from 'utils/CacheUtils';
import SellerUtils from 'utils/SellerUtils';

// mọck api
// move short name ra ngoài
const KEY_CACHE = 'API_SELLER_STORE';
export default async (req, res) => {
  const curDate = +new Date();
  const ctx = { req, res };

  let data = CacheUtils.getCacheValue(KEY_CACHE);
  let message = 'Query seller successfully (web api) (cache)';
  if (!data) {
    const result = await SupplierClient.getAll({ ctx });
    data = getData(result)?.map(SellerUtils.convertSeller) || [];
    message = 'Query seller successfully (web api) (not cache)';
    CacheUtils.setCacheKey(KEY_CACHE, data);
  }

  res.statusCode = 200;
  res.setHeader('Cache-Control', 'public, s-maxage=43200, stale-while-revalidate=300');
  res.json({
    status: 'OK',
    data,
    message,
    time: new Date() - curDate,
  });
};
