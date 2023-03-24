import { Container } from '@material-ui/core';
import Template from 'components/layout/Template';
import LandingPageSellerV2 from 'components/organisms/LandingPageSellerV2';
import SellerHeader from 'components/organisms/SellerHeader';
import SellerTabsV2 from 'components/organisms/SellerTabsV2';
import { DUREX_INFO } from 'constants/flagship-store';
import useTrackingTimeout from 'hooks/useTrackingTimeout';
import { useEffect, useState } from 'react';
import { doWithServerSide, ProductServiceV2 } from 'services';
// import { getProxyImageList } from 'utils/ImageUtils';
import styles from './styles.module.css';

// TODO: translate
export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => ({
    props: {
      flagshipStoreInfo: DUREX_INFO,
      slug: 'durex',
      SEO_CONFIG: {
        title: DUREX_INFO.name,
        ogTitle: DUREX_INFO.name,
      },
    },
  }));
}

const FlagshipStore = ({ isMobile, flagshipStoreInfo = {}, slug }) => {
  const {
    name = null,
    logo = [],
    numberProductDisplay = 0,
    banners = [],
    description = '',
    videoIntroduces = [],
    landingPages = [],
    feedbacks = [],
  } = flagshipStoreInfo || {};

  const sellerInfo = {
    name,
    imageStoreUrls: logo,
    numberProductDisplay,
  };

  const landingPageData = {
    banners,
    description,
    videoIntroduces: videoIntroduces[0],
    landingPages,
    feedbacks,
    ...flagshipStoreInfo,
  };

  const [numberProducts, setNumberProducts] = useState(0);

  useEffect(() => {
    const getNumberProducts = async () => {
      const res = await ProductServiceV2.loadProductWithFilter({ filter: { tag: 'DUREX' }, limit: 1 });
      setNumberProducts(res.total);
    };

    getNumberProducts();
  }, []);

  // Tracking timing GA
  useTrackingTimeout('Sellers');

  // Scroll tracking GA
  // useScrollTracking('Sellers');

  return (
    <Template title={name} isMobile={isMobile} pageTitle={name}>
      <div className={styles.container_header}>
        <Container maxWidth="lg">
          <SellerHeader sellerInfo={{ ...sellerInfo, numberProductDisplay: numberProducts || 0 }} isFlagship />
          <SellerTabsV2 slug={slug} isFlagship isCustom />
        </Container>
      </div>
      <div className={styles.container}>
        <LandingPageSellerV2 landingPageData={landingPageData} />
      </div>
    </Template>
  );
};
export default FlagshipStore;
