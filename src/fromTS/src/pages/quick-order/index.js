import QuickOrderListMobileScreen from 'components-v2/organisms/pages/quick-order/MobileScreen';
import QuickOderListPcScreen from 'components-v2/organisms/pages/quick-order/PcScreen';
import Template from 'components/layout/Template';
import { withLogin } from 'HOC';
import useTrackingTimeout from 'hooks/useTrackingTimeout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { doWithServerSide, ProductServiceV2 } from 'services';
import { getTitle } from 'utils/SEOUtils';
import useMobileV2 from 'zustand-lib/storeMobile';
import useGetTagPromotion from 'zustand-lib/useGetTagPromotion';

const title = getTitle('Đặt hàng nhanh');
const pageName = 'quick-order';

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async (_ctx, _user, initState) => {
      const { tabs } = initState || {};
      const text = ctx?.query?.q || ctx?.query?.text || '';
      const productRes = await ProductServiceV2.loadDataProduct({ ctx, isTotal: true, tabs });
      const page = Number(ctx.query.page) || 1;
      const { data = [], total = 0 } = productRes;
      return {
        props: {
          products: data,
          total,
          page,
          text,
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

const QuickOrderPage = ({ products = [], isMobile = false, page = '', total = 0, text = '' }) => {
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  // Tracking timing GA
  useTrackingTimeout('Quick order');

  // Scroll tracking GA
  // useScrollTracking('Quick order');

  // promo gift ctkm
  // const { searchProduct = [] } = dataProduct || {};

  const { getPromoLists } = useGetTagPromotion();
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getPromoLists({ getVoucherInfo: false, signal });

    return () => controller.abort();
  }, []);

  return (
    <Template isMobile={isMobile} pageName={pageName}>
      {isMobileV2 ? (
        <QuickOrderListMobileScreen text={text} />
      ) : (
        <QuickOderListPcScreen isMobile={isMobile} text={text} page={page} products={products} total={total} />
      )}
    </Template>
  );
};

export default withLogin(QuickOrderPage);
