import { getData, SellerClient } from 'clients';
import CacheUtils from 'utils/CacheUtils';

// mọck api

const KEY_CACHE = 'API_SELLER_STORE_ACTIVE';

export default async (req, res) => {
  const curDate = +new Date();
  const ctx = { req, res };

  // lấy cache
  let data = CacheUtils.getCacheValue(KEY_CACHE);
  let message = 'Query seller successfully (web api) (cache)';
  if (!data) {
    // miss cache
    const result = await SellerClient.getAllStoreActive({ ctx });
    data =
      getData(result)?.map(({ sellerCode }) => ({
        sellerCode,
      })) || [];
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
