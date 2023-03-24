import { GET } from 'clients';
import { MARKETING_API } from 'constants/APIUri';
import CacheUtils from 'utils/CacheUtils';
// import { formatCurrency } from 'utils/FormatNumber';
// mọck api
let KEY_CACHE = 'API_SAN_PHAM_MOI';

export default async (req, res) => {
  const curDate = +new Date();
  const { isMienBac = 'false', q } = req.query;

  KEY_CACHE += isMienBac === 'true' ? '_MIEN_BAC' : '_MIEN_NAM';

  let data = CacheUtils.getCacheValue(KEY_CACHE);
  const message = 'Query new products successfully (web api) (cache)';
  if (!data) {
    const productFileRes = await GET({ url: MARKETING_API.PRODUCT_FILE, params: { q }, ctx: { req, res } });
    const dataProductFile =
      productFileRes?.data?.[0]?.files.find(
        (file) => file.region === (isMienBac === 'true' ? 'MIEN_BAC' : 'MIEN_NAM') && file.extension === 'xlsx',
      ) || {};

    const pdfProductFile =
      productFileRes?.data?.[0]?.files.find((file) => file.region === (isMienBac === 'true' ? 'MIEN_BAC' : 'MIEN_NAM') && file.extension === 'pdf') ||
      {};

    data = {
      dataProductFile,
      pdfProductFile,
    };

    CacheUtils.setCacheKey(KEY_CACHE, data);
    res.statusCode = 200;
    res.json({
      status: 'OK',
      data,
      KEY_CACHE,
      message,
      isMienBac,
      time: new Date() - curDate,
    });
  } else {
    res.statusCode = 200;
    res.json({
      status: 'OK',
      data,
      isMienBac,
      message,
      time: new Date() - curDate,
    });
  }
};
