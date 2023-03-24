/* eslint-disable camelcase */
import { Container } from '@material-ui/core';
import clsx from 'clsx';
import SellerContainerMobile from 'components-v2/organisms/Mobile/store/SellerContainerMobile';
import Template from 'components/layout/Template';
import MV2StoreContainer from 'components/organisms/Mobile/StoreContainer';
import SellerContainerV2 from 'components/organisms/SellerContainerV2';
import StoreContainer from 'components/organisms/StoreContainer';
import { SELLERS } from 'constants/Paths';
import { withLogin } from 'HOC';
import useMobileDetect from 'hooks/useIsMobile';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doWithServerSide } from 'services';
import { screenOrientation } from 'utils';
import { getTitle } from 'utils/SEOUtils';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from './styles.module.css';

const title = getTitle('Tất cả nhà bán hàng');

export async function getServerSideProps(ctx) {
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
    },
  );
}

// TODO: translate
const SellersLoading = () => {
  const { isMobile = false } = useMobileDetect();
  const router = useRouter();
  const { query } = router;
  const pageTitle = 'Danh sách nhà bán hàng';
  const [mobile, setMobile] = useState(isMobile);
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());

  useEffect(() => {
    router.replace({ pathname: SELLERS, query });
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

  if (isMobileV2) {
    return (
      <Template pageTitle={pageTitle} pageName="sellers" isMobile={mobile}>
        <div className={clsx(styles.mobileSellers, styles.mobileCustomSellers)}>
          <Container maxWidth="lg" className={styles.mobileContainer}>
            <MV2StoreContainer sellers={[{}]} loading isMobileV2={isMobileV2} />
          </Container>
        </div>
        <div className={styles.mobileSellers}>
          <Container maxWidth="lg" className={styles.mobileContainer}>
            <SellerContainerMobile sellers={[{}]} total={0} title="Danh sách nhà bán hàng" breadcrumbs={[]} search="" loading />
          </Container>
        </div>
      </Template>
    );
  }

  return (
    <Template pageTitle={pageTitle} pageName="sellers" isMobile={mobile}>
      <div className={clsx(styles.sellers, styles.customSellers)}>
        <Container maxWidth="lg" className={styles.container}>
          <StoreContainer sellers={[{}]} loading />
        </Container>
      </div>
      <div className={styles.sellers}>
        <Container maxWidth="lg" className={styles.container}>
          <SellerContainerV2 sellers={[{}]} total={0} title="Danh sách nhà bán hàng" breadcrumbs={[]} search="" loading />
        </Container>
      </div>
    </Template>
  );
};

export default withLogin(SellersLoading, false, { url: '/sellers?login=true' });
