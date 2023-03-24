import SlugMobile from 'components-v2/organisms/pages/khuyenmai/MobileScreen/Slug';
import SlugPC from 'components-v2/organisms/pages/khuyenmai/PcScreen/slug';
import { Template } from 'components/layout';
import { withLogin } from 'HOC';
import useTrackingTimeout from 'hooks/useTrackingTimeout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { doWithServerSide } from 'services';
import NumberUtils from 'utils/NumberUtils';
import { getTitle } from 'utils/SEOUtils';
import useMobileV2 from 'zustand-lib/storeMobile';

const title = getTitle('Khuyến mãi');

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async () => {
      const { slug = '', page: pageQuery = 1, code = null } = ctx.query;
      const page = NumberUtils.covnertNumber(pageQuery, 1);

      return {
        props: {
          slug,
          page,
          code,
          SEO_CONFIG: {
            title,
          },
        },
      };
    },
    {
      serverSideTranslations,
      namespaces: ['common'],
    },
  );
}
const name = 'khuyenmai';
const PromotionCode = ({ isMobile, slug, page, code }) => {
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  // Tracking timing GA
  useTrackingTimeout('Promotion');

  // Scroll tracking GA
  // useScrollTracking('Promotion');

  return (
    <Template isMobile={isMobile} pageName={name}>
      {isMobileV2 ? <SlugMobile slug={slug} code={code} /> : <SlugPC slug={slug} page={page} code={code} />}
    </Template>
  );
};
export default withLogin(PromotionCode);
