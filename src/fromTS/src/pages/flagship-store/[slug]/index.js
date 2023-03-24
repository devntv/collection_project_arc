import { Container, Divider } from '@material-ui/core';
import LandingPageSellerMobile from 'components-v2/organisms/Mobile/store/LandingPageSeller';
import SellerDetailHeader from 'components-v2/organisms/Mobile/store/SellerDetailHeader';
import SellerTabsMobile from 'components-v2/organisms/Mobile/store/SellerTabs';
import Template from 'components/layout/Template';
import LandingPageSeller from 'components/organisms/LandingPageSeller';
import SellerHeader from 'components/organisms/SellerHeader';
import SellerTabs from 'components/organisms/SellerTabs';
import useTrackingTimeout from 'hooks/useTrackingTimeout';
import { title } from 'process';
import { doWithServerSide, SellerService } from 'services';
import { DOMAIN } from 'sysconfig';
import useMobileV2 from 'zustand-lib/storeMobile';
// import { getProxyImageList } from 'utils/ImageUtils';
import styles from './styles.module.css';

// TODO:translate
export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const { query } = ctx;
    const { slug } = query;

    const flagshipStoreInfo = await SellerService.getStoreInfo({ ctx, slug });
    if (!flagshipStoreInfo || flagshipStoreInfo?.status === 'INACTIVE') {
      return {
        redirect: {
          destination: DOMAIN,
        },
      };
    }
    if (flagshipStoreInfo?.storeType !== 'FLAGSHIP') {
      return {
        redirect: {
          destination: `/seller/${slug}`,
        },
      };
    }
    const SEO_CONFIG = {
      title: flagshipStoreInfo?.name || '',
      // description: flagshipStoreInfo?.description.replace(/<\/?[^>]+(>|$)/g, '').replace(/\n{2,}\s*/g, '\n') || '', // clean html tags and new lines
      ogTitle: flagshipStoreInfo?.name || '',
      // ogDescription: flagshipStoreInfo?.description.replace(/<\/?[^>]+(>|$)/g, '').replace(/\n{2,}\s*/g, '\n') || '',
      // ogImage: getProxyImageList(flagshipStoreInfo?.logo, 300)[0] || '',
      // ogImageAlt: flagshipStoreInfo?.name || '',
    };

    return {
      props: {
        flagshipStoreInfo,
        slug,
        SEO_CONFIG,
      },
    };
  });
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

  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  // Tracking timing GA
  useTrackingTimeout('Sellers');

  // Scroll tracking GA
  // useScrollTracking('Sellers');

  if (isMobileV2) {
    return (
      <Template title={title} isMobile={isMobileV2} pageTitle={title}>
        <div className={styles.mobileHeader}>
          <Container maxWidth="lg" className={styles.mobileHeader_container}>
            <SellerDetailHeader sellerInfo={sellerInfo} isFlagship />
            <Divider />
            <SellerTabsMobile slug={slug} isFlagship />
          </Container>
        </div>
        <div className={styles.mobileContainer_wrapper}>
          <Container maxWidth="lg" className={styles.mobileHeader_container}>
            <LandingPageSellerMobile landingPageData={landingPageData} isMobileV2={isMobileV2} />
          </Container>
        </div>
      </Template>
    );
  }
  return (
    <Template title={name} isMobile={isMobile} pageTitle={name}>
      <div className={styles.container_header}>
        <Container maxWidth="lg">
          <SellerHeader sellerInfo={sellerInfo} isFlagship />
          <SellerTabs slug={slug} isFlagship />
        </Container>
      </div>
      <div className={styles.container}>
        <Container maxWidth="lg">
          <LandingPageSeller landingPageData={landingPageData} />
        </Container>
      </div>
    </Template>
  );
};
export default FlagshipStore;
