import CatClientV2 from 'clients/CatClientV2';
import CacheUtils from 'utils/CacheUtils';

// mọck api
const KEY_CACHE = 'API_CATEGORIES';
export default async (req, res) => {
  const curDate = +new Date();
  const ctx = { req, res };

  let data = CacheUtils.getCacheValue(KEY_CACHE);
  let message = 'Query categories successfully (web api) (cache)';
  if (!data) {
    data = await CatClientV2.loadGroup({ ctx, params: { getCache: true, limit: 1000 } });

    const efficacyData = await CatClientV2.loadEfficacyList({ ctx, params: { getCache: true, limit: 1000 } });
    const efficacyCombinedDataRes = await CatClientV2.loadEfficacyCombinedList({ ctx, params: { getCache: true, limit: 1000 } });

    const efficacyCombinedData =
      efficacyCombinedDataRes
        ?.filter((item) => item?.isActive)
        ?.map(({ code, name, slug, relatedCategoryCodes = [], relatedEfficacyCodes = [], relatedSellerCategoryCodes = [] }) => ({
          code,
          name,
          slug,
          relatedCategoryCodes,
          relatedEfficacyCodes,
          relatedSellerCategoryCodes,
        })) || [];

    data = data
      ?.filter((item) => item?.isActive)
      ?.map(({ code, name, slug }) => {
        const subEfficacies =
          efficacyData
            ?.filter((efficacy) => efficacy.categoryCode === code)
            // eslint-disable-next-line no-shadow
            ?.map(({ code, name, slug, categoryCode }) => ({ code, name, slug, categoryCode }))
            ?.concat(efficacyCombinedData.filter((item) => item.relatedCategoryCodes?.includes(code))) || [];

        return { code, name, slug, subEfficacies };
      });

    message = 'Query categories successfully (web api) (not cache)';
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
