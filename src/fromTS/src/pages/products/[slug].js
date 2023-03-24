import { getFirst, WishlistClient } from 'clients';
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
      const wishlistRes = await WishlistClient.getWishlist({ ctx, customerID: user.customerID, sku: product.sku });
      const nameTitle = StringUtils.titleCase(product?.name || '');
      if (product) product.name = nameTitle;
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
          wishlistRes,
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
