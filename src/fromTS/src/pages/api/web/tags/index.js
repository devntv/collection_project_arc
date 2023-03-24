import { getData, ProductClientV2 } from 'clients';
import CacheUtils from 'utils/CacheUtils';

// mọck api
const KEY_CACHE = 'API_TAGS';
export default async (req, res) => {
  const curDate = +new Date();
  const ctx = { req, res };

  let data = CacheUtils.getCacheValue(KEY_CACHE);
  let message = 'Query tags successfully (web api) (cache)';
  if (!data) {
    const tagsRes = await ProductClientV2.getSettingTags({ ctx });
    data = getData(tagsRes)?.map(({ code, name, slug, textColor, preIcon, nameAsTooltip, style, visible }) => ({
      code,
      name,
      slug,
      textColor,
      preIcon,
      nameAsTooltip,
      style,
      visible,
    }));
    message = 'Query tags successfully (web api) (not cache)';
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
