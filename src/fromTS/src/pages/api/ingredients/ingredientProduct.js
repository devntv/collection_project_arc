import IngredientClient from 'clients/IngredientClient';
import CacheUtils from 'utils/CacheUtils';

// mọck api

const KEY_CACHE = 'API_INGREDIENT_PRODUCT';

export default async (req, res) => {
  const curDate = +new Date();

  const { isCache = 'true' } = req?.query || {};

  let data = null;
  let message = 'Query ingredientProduct successfully (web api)';

  // lấy cache
  if (isCache) {
    data = CacheUtils.getCacheValue(KEY_CACHE);
    message = 'Query ingredientProduct successfully (web api) (cache)';
  }

  if (!data) {
    // miss cache
    const result = await IngredientClient.getAllIngredientProduct();
    data =
      result?.map(({ code, name, ingredientId }) => ({
        code,
        name,
        ingredientId,
      })) || [];
    message = 'Query ingredientProduct successfully (web api) (not cache)';
    CacheUtils.setCacheKey(KEY_CACHE, data, 3600);
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
