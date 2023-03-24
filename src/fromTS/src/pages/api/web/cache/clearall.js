import CacheUtils from 'utils/CacheUtils';

// flush all cache
export default async (req, res) => {
  const curDate = +new Date();

  const data = CacheUtils.flushAllCache();

  res.statusCode = 200;
  res.json({
    status: 'OK',
    data,
    time: new Date() - curDate,
  });
};
