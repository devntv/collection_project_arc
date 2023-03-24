import MockService from 'services/MockService';

export default async (req, res) => {
  const curDate = +new Date();
  const countries = await MockService.getListCountries();
  const message = 'Query country successfully (web api) (cache)';

  res.statusCode = 200;
  res.setHeader('Cache-Control', 'public, s-maxage=43200, stale-while-revalidate=300');
  res.json({
    status: 'OK',
    data: countries,
    message,
    time: new Date() - curDate,
  });
};
