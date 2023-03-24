import { ProductClientV2 } from 'clients';
import { TopManufacturer } from 'constants/manufacturer';
import CacheUtils from 'utils/CacheUtils';

// mọck api
const KEY_CACHE = 'API_TOP_MANUFACTUERS';
export default async (req, res) => {
  const curDate = +new Date();
  const ctx = { req, res };

  let data = CacheUtils.getCacheValue(KEY_CACHE);
  let message = 'Query top manufactuers successfully (web api) (cache)';
  if (!data) {
    // lấy danh sách nhà sản xuất
    const dataManufacturer = await ProductClientV2.loadDataManufacturer(ctx);

    // filter top
    data = dataManufacturer?.filter((item) => TopManufacturer.indexOf(item?.code) >= 0);
    if (data.length === 0) {
      data = dataManufacturer?.slice(0, 20);
    }
    data = data?.map(({ code, name, slug, id, shortName }) => ({ code, name, slug, id, shortName }));
    message = 'Query top manufactuers successfully (web api) (not cache)';
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
