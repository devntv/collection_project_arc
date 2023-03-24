/* eslint-disable camelcase */
import Template from 'components/layout/Template';
import ProductListingLoading from 'components/organisms/ProductListing/loading';
import { PRODUCTS_URL } from 'constants/Paths';
import { withLogin } from 'HOC';
import useMobileDetect from 'hooks/useIsMobile';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doWithServerSide } from 'services';
import { screenOrientation } from 'utils';
import { getTitle } from 'utils/SEOUtils';
import useMobileV2 from 'zustand-lib/storeMobile';

const title = getTitle('Tất cả sản phẩm');

export async function getServerSideProps(ctx) {
  ctx.res.setHeader('Cache-Control', 'public, s-maxage=43200, stale-while-revalidate=60');
  return doWithServerSide(
    ctx,
    async () => ({
      props: {
        SEO_CONFIG: {
          title,
        },
      },
    }),
    {
      serverSideTranslations,
      namespaces: ['common'],
      inititalZustand: [],
      isGetUser: false,
    },
  );
}

// TODO: translate
const Products = () => {
  const { isMobile = false } = useMobileDetect();
  const router = useRouter();
  const { query } = router;
  const cat = 'products';
  const pageTitle = 'Sản phẩm';
  const [mobile, setMobile] = useState(isMobile);
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());

  useEffect(() => {
    router.replace({ pathname: PRODUCTS_URL, query });
  });

  const namePage = () => {
    const name = 'Tất cả sản phẩm';
    return name;
  };

  useEffect(() => {
    const landscape = screenOrientation(window);
    if (landscape) {
      setMobile(false);
    }
  }, []);

  useEffect(() => {
    const landscape = screenOrientation(window);
    window.addEventListener(
      'orientationchange',
      () => {
        if (landscape) {
          setMobile(true);
        } else {
          setMobile(false);
        }
      },
      false,
    );
  }, [mobile]);

  return (
    <Template isMobile={mobile} pageName={cat} pageTitle={pageTitle}>
      <ProductListingLoading products={[]} isLoading catName={cat} name={namePage()} isMobile={mobile} isPageProducts isMobileV2={isMobileV2} />
    </Template>
  );
};

export default withLogin(Products, false, { url: '/products?login=true' });
