import AddressService from 'services/AddressService';
import CacheUtils from 'utils/CacheUtils';

// mọck api
const KEY_CACHE = 'API_MASTER_DATA_COUNTRY';
export default async (req, res) => {
  const curDate = +new Date();
  const ctx = { req, res };

  let data = CacheUtils.getCacheValue(KEY_CACHE);
  let message = 'Query country successfully (web api) (cache)';
  if (!data) {
    data = await AddressService.getAllCountries({ ctx });
    message = 'Query country successfully (web api) (not cache)';
    CacheUtils.setCacheKey(KEY_CACHE, data);
  }

  res.statusCode = 200;
  res.json({
    status: 'OK',
    data,
    message,
    time: new Date() - curDate,
  });
};
