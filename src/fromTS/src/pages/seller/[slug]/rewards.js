import { Box, Container, Divider, Paper, Typography } from '@material-ui/core';
import HeaderWrapper from 'components-v2/organisms/pages/seller/[slug]/HeaderWrapper';
import Template from 'components/layout/Template';
import RewardItemStore from 'components/mocules/RewardItemStore';
import SellerHeader from 'components/organisms/SellerHeader';
import SellerTabs from 'components/organisms/SellerTabs';
import SliderBannerSeller from 'components/organisms/SliderBannerSeller';
import { withLogin } from 'HOC';
import useTrackingTimeout from 'hooks/useTrackingTimeout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import { doWithServerSide, RewardsService, SellerService } from 'services';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from './styles.module.css';

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async () => {
      const { query } = ctx;
      const { slug } = query;
      const storeInfo = await SellerService.getStoreInfo({ ctx, slug });
      if (!storeInfo) {
        return {
          redirect: {
            destination: '/',
          },
        };
      }
      return {
        props: {
          storeInfo,
          slug,
        },
      };
    },
    {
      serverSideTranslations,
      namespaces: ['common'],
    },
  );
}

const ListProduct = ({ isMobile, storeInfo = {}, slug }) => {
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());

  const { sellerCode = '', name = null, logo = null, numberProductDisplay } = storeInfo;
  const [info, setInfo] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      const result = await RewardsService.getRewardsBySeller({ sellerCode });
      setInfo(result);
    };
    loadData();
  }, []);
  const sellerInfo = {
    name,
    imageStoreUrls: logo,
    numberProductDisplay,
    sellerCode,
  };
  const title = `Thuocsi ${name}`;

  // Tracking timing GA
  useTrackingTimeout('Sellers');

  // Scroll tracking GA
  // useScrollTracking('Sellers');

  if (isMobileV2) {
    const banners = storeInfo?.banners ? storeInfo?.banners.slice(0, 5) : [];
    return (
      <Template title={title} isMobile={isMobile} pageTitle={title}>
        <HeaderWrapper sellerInfo={sellerInfo} slug={slug} info={info} isMobileV2={isMobileV2} infoBanner={banners}>
          <Paper style={{ padding: '30px 20px', boxShadow: 'none' }}>
            <Typography style={{ fontFamily: 'googlesansregular' }}>Chúng tôi chưa có chương trình trả thưởng nào trong thời điểm này</Typography>
          </Paper>
        </HeaderWrapper>
      </Template>
    );
  }

  return (
    <Template title={title} isMobile={isMobile} pageTitle={title}>
      <div className={styles.container}>
        <Container maxWidth="lg" className={isMobile ? styles.containerMobile : ''}>
          <SellerHeader sellerInfo={sellerInfo} />
          <Divider />
          <SellerTabs slug={slug} />
          {info?.banners && info?.banners.length > 0 && <SliderBannerSeller bannerImageUrls={info?.banners.slice(0, 5)} w={2100} />}
          {info?.data && info?.data.length > 0 ? (
            info.data.map((item) => (
              <Box style={{ padding: '25px 0' }} key={`key-${item?.gamificationCode}`}>
                <RewardItemStore reward={item} />
              </Box>
            ))
          ) : (
            <Paper style={{ padding: '30px 20px', marginTop: '30px', boxShadow: 'none' }}>
              <Typography style={{ fontFamily: 'googlesansregular' }}>Chúng tôi chưa có chương trình trả thưởng nào trong thời điểm này</Typography>
            </Paper>
          )}
        </Container>
      </div>
    </Template>
  );
};
export default withLogin(ListProduct);
