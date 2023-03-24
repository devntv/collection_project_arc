import { getData, ProductClientV2 } from 'clients';
import CacheUtils from 'utils/CacheUtils';

// mọck api
const KEY_CACHE = 'API_TABS';
export default async (req, res) => {
  const curDate = +new Date();
  const ctx = { req, res };

  let data = CacheUtils.getCacheValue(KEY_CACHE);
  let message = 'Query tabs successfully (web api) (cache)';
  if (!data) {
    const tabRes = await ProductClientV2.getTabs({ ctx });
    data = getData(tabRes);
    message = 'Query tabs successfully (web api) (not cache)';
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
