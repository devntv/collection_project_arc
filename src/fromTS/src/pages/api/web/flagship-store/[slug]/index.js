import { getData } from 'clients';
import { DUREX_SELLER_INFO, SANOFI_SELLER_INFO } from 'constants/flagship-store';
import { ProductServiceV2 } from 'services';

export default async (req, res) => {
  const curDate = +new Date();
  const { loadProductFuzzy } = ProductServiceV2;
  const data = [];
  let message = 'Get data hardcode seller failed';
  const { slug = '' } = req.query;
  req.headers.isAuthorizationClient = true;

  if (['durex', 'sanofi'].includes(slug)) {
    const ctx = { req, res };
    let seller = {};

    if (slug === 'durex') {
      seller = { ...DUREX_SELLER_INFO };
    }

    if (slug === 'sanofi') {
      seller = { ...SANOFI_SELLER_INFO };
    }

    const [productsRes, favProductsRes] = await Promise.all([
      loadProductFuzzy({ filter: { tag: slug.toUpperCase() }, limit: 1, ctx, isUseRawData: true }),
      loadProductFuzzy({ filter: { tag: seller?.favTag || slug.toUpperCase() }, limit: 3, ctx, isUseRawData: true }),
    ]);

    seller.sellerStore.numberProducts = productsRes?.total || 0;
    seller.product.topProducts = getData(favProductsRes);

    data.push(seller);

    message = 'Get data hardcode successfully';
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
