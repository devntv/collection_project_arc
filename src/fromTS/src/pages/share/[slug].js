import { getData, getFirst, ProductClientV2 } from 'clients';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { doWithServerSide, ProductServiceV2, WebService } from 'services';
import { IS_WEB_SERVICE } from 'sysconfig';
import { StringUtils } from 'utils';
import { getProxyImageList } from 'utils/ImageUtils';
import page from '../product/[slug]';

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async (ctxCallback, user) => {
      const codeLocation = ctx.query || '79';
      const { resolvedUrl } = ctx || {};

      if (!user) {
        // neesu không có user ( chưa login -> thì sẽ gọi API lấy thông tin SP ko cần login )
        // mặc định locationCode sẽ là 79
        const productWithoutLoginRes = await ProductServiceV2.getDetailProductWithoutLogin({ ctx, provinceCode: codeLocation });
        const product = getFirst(productWithoutLoginRes);
        const nameTitle = StringUtils.titleCase(product?.name || '');
        if (product) product.name = nameTitle;
        const SEO_CONFIG = {
          title: nameTitle,
          description: nameTitle,
          ogTitle: nameTitle,
          ogDescription: nameTitle,
          ogImage: getProxyImageList(product?.imageUrls, 600)[0] || product?.defaultImage || '',
          ogImageAlt: nameTitle,
        };
        return {
          props: {
            product,
            SEO_CONFIG,
          },
        };
      }
      const getDataProductDetail = IS_WEB_SERVICE ? WebService.getDataProductDetail : ProductServiceV2.loadDataProductDetail;
      const [productRes] = await Promise.all([getDataProductDetail({ ctx })]);
      const product = getFirst(productRes);
      if (product) {
        if (product.isAvailable) {
          return {
            redirect: {
              // eslint-disable-next-line no-underscore-dangle
              // destination: `/product/${product.slug}`,
              destination: resolvedUrl.replace('/share', '/product'),
              permanent: false,
              query: ctx.query,
            },
          };
        }

        if (!product.isAvailable) {
          const skusRes = await ProductClientV2.getSkusByProductId({ productIds: [product.productId] });
          const listSku = getData(skusRes)?.filter(
            ({ sellerClass, isActive, slug_: slug }) => sellerClass === 'INTERNAL' && isActive && slug !== product.slug,
          );
          if (listSku?.length > 0) {
            const itemActive = listSku[0];
            return {
              redirect: {
                // eslint-disable-next-line no-underscore-dangle
                destination: resolvedUrl.replace(`/share/${product.slug}`, `/product/${itemActive.slug_}`),
                permanent: false,
                query: ctx.query,
              },
            };
          }
        }
      }

      const nameTitle = StringUtils.titleCase(product?.name || '');
      const SEO_CONFIG = {
        title: nameTitle,
        description: nameTitle,
        ogTitle: nameTitle,
        ogDescription: nameTitle,
        ogImage: getProxyImageList(product?.imageUrls, 300)[0] || product?.defaultImage || '',
        ogImageAlt: nameTitle,
      };
      return {
        props: {
          product,
          logs: [productRes],
          SEO_CONFIG,
        },
      };
    },
    {
      serverSideTranslations,
      namespaces: ['common'],
    },
  );
}

export default page;
