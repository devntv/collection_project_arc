import readXlsxFile from 'read-excel-file/node';
import CacheUtils from 'utils/CacheUtils';
// import { formatCurrency } from 'utils/FormatNumber';
// mọck api
let KEY_CACHE = 'API_SAN_PHAM_THAY_THE';
const createData = (data) => ({
  name: data[0],
  volume: data[1],
  // price: data?.type === 'header' || data?.type === 'headerTitle' ? data?.dataRows[2] : formatCurrency(data[2]),
  price: data[2],
  // vol: data[3],
  link: data[3] || '',
});
export default async (req, res) => {
  const curDate = +new Date();
  const { isMienBac = 'false' } = req.query;

  KEY_CACHE += isMienBac ? '_MIEN_BAC' : '_MIEN_NAM';
  // KEY_CACHE += '_';
  const fileName = `public/static/files/san_pham_thay_the_${isMienBac === 'true' ? 'mien_bac' : 'mien_nam'}.xlsx`;
  let data = CacheUtils.getCacheValue(KEY_CACHE);
  let message = 'Query alternative products successfully (web api) (cache)';
  if (!data) {
    readXlsxFile(fileName).then((rows = null) => {
      message = 'Query alternative products successfully (web api) (not cache)';
      // data = rows?.filter((items) => items && items[items.length - 1]) || [];
      data = rows?.map((row) => {
        const count = row?.length - row?.filter((r) => r === null).length;
        if (row?.length - count >= 5) {
          return { dataRows: createData(row), type: 'headerTitle' };
        }
        if (row.length - count >= 3) {
          return { dataRows: createData(row), type: 'header' };
        }
        return { dataRows: createData(row), type: 'data' };
      });
      CacheUtils.setCacheKey(KEY_CACHE, data);
      res.statusCode = 200;
      res.json({
        status: 'OK',
        data,
        fileName,
        KEY_CACHE,
        message,
        isMienBac,
        time: new Date() - curDate,
      });
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
