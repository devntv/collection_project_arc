import { EXTRA_CATEGORY } from 'constants/Category';
import CacheUtils from 'utils/CacheUtils';

// mọck api
const KEY_CACHE = 'API_CATEGORIES_EXTRA';
export default async (req, res) => {
  const curDate = +new Date();

  let data = CacheUtils.getCacheValue(KEY_CACHE);
  let message = 'Query extra categories successfully (web api) (cache)';
  if (!data) {
    data = EXTRA_CATEGORY;
    message = 'Query extra categories successfully (web api) (not cache)';
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
