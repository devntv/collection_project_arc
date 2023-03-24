import { ProductClientV2 } from 'clients';
import CacheUtils from 'utils/CacheUtils';

// mọck api
const KEY_CACHE = 'API_MANUFACTUERS';
export default async (req, res) => {
  const curDate = +new Date();
  const ctx = { req, res };

  let data = CacheUtils.getCacheValue(KEY_CACHE);
  let message = 'Query manufactuers successfully (web api) (cache)';
  if (!data) {
    data = await ProductClientV2.loadDataManufacturer(ctx);
    data = data?.map(({ code, name, slug, id, shortName }) => ({ code, name, slug, id, shortName }));
    message = 'Query manufactuers successfully (web api) (not cache)';
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
