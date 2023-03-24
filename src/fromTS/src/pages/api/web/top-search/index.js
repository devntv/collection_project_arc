import { GET } from 'clients';
import { MARKETING_API } from 'constants/APIUri';
import CacheUtils from 'utils/CacheUtils';

// mọck api
const KEY_CACHE = 'API_TOP_SEARCH';
export default async (req, res) => {
  const curDate = +new Date();

  let data = CacheUtils.getCacheValue(KEY_CACHE);
  let message = 'Query top search successfully (web api) (cache)';
  if (!data) {
    const topSearchRes = await GET({ url: MARKETING_API.HASHTAG_TOP_SEARCH, ctx: { req, res } });
    data =
      topSearchRes?.data
        ?.sort((hashtag1, hashtag2) => hashtag1.ordinalNumber - hashtag2.ordinalNumber)
        .filter((item) => {
          const startDisplayTime = new Date(item.startDisplayTime);
          const endDisplayTime = new Date(item.endDisplayTime);
          const currentTime = new Date();
          const isActive = item?.isActive;

          return isActive && currentTime >= startDisplayTime && currentTime <= endDisplayTime;
        }) || [];

    message = 'Query top search successfully (web api) (not cache)';
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
