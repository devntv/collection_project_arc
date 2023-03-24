import { GET } from 'clients';
import { INSIDER_API } from 'constants/APIUri';
import MockService from 'services/MockService';
import CacheUtils from 'utils/CacheUtils';

// mọck api
const KEY_CACHE = 'INSIDER_DATA';
export default async (req, res) => {
  const curDate = +new Date();

  let data = CacheUtils.getCacheValue(KEY_CACHE);
  let message = 'Query tabs successfully (web api) (cache)';

  const { userId = '', type, details } = req.query;

  if (!data) {
    const insiderSetting = await MockService.getInsiderSetting();
    if (!insiderSetting) data = [];
    else {
      const insiderRes = await GET({ url: INSIDER_API[type], params: { userId, details }, ctx: { req, res } });
      data = insiderRes?.data || [];
    }
    message = 'Query tabs successfully (web api) (not cache)';
    CacheUtils.setCacheKey(KEY_CACHE, data, 30);
  }

  res.statusCode = 200;
  res.json({
    status: 'OK',
    data,
    message,
    time: new Date() - curDate,
  });
};
