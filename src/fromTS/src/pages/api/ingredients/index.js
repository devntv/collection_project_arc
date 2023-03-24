// import { getData } from 'clients';
import IngredientClient from 'clients/IngredientClient';
import CacheUtils from 'utils/CacheUtils';
import { changeAlias } from 'utils/StringUtils';

// mọck api

const KEY_CACHE = 'API_INGREDIENT';
export default async (req, res) => {
  const curDate = +new Date();
  const ctx = { req, res };

  const { isCache = 'true' } = req?.query || {};

  let data = null;
  let message = 'Query ingredients successfully (web api)';

  // lấy cache
  if (isCache === 'true') {
    data = CacheUtils.getCacheValue(KEY_CACHE);
    message = 'Query ingredients successfully (web api) (cache)';
  }

  if (!data) {
    // miss cache
    const result = await IngredientClient.loadDataIngredientClient({ ctx });
    data =
      result?.map(({ code, name, slug, isMedicine = false }) => ({
        unsignedKey: changeAlias(name),
        code,
        name,
        slug,
        isMedicine,
      })) || [];
    message = 'Query ingredients successfully (web api) (not cache)';
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
