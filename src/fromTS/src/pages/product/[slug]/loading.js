/* eslint-disable camelcase */
import Template from 'components/layout/Template';
import ProductDetailListing from 'components/organisms/ProductDetailListing/loading';
import { withLogin } from 'HOC';
import useMobileDetect from 'hooks/useIsMobile';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doWithServerSide } from 'services';
import { screenOrientation } from 'utils';
import useMobileV2 from 'zustand-lib/storeMobile';

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async () => ({
      props: {},
    }),
    {
      serverSideTranslations,
      namespaces: ['common'],
      inititalZustand: [],
      isGetUser: false,
    },
  );
}

const ProductDetails = () => {
  const { isMobile = false } = useMobileDetect();
  const isMobileV2 = useMobileV2((state) => state.isMobileV2())
  const router = useRouter();
  const { slug } = router.query;
  const cat = 'products';

  const [mobile, setMobile] = useState(isMobile);

  useEffect(() => {
    router.replace({ pathname: `/product/${slug}` });
  });



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
    <Template title={slug} isMobile={mobile} pageName={cat} pageTitle={slug}>
      <ProductDetailListing isMobileV2={isMobileV2} isMobile={mobile} />
    </Template>
  );
};

export default withLogin(ProductDetails, false, { url: '/products?login=true' });
