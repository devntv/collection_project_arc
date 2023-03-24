import { Box, Container, Divider, Grid, Paper, Typography } from '@material-ui/core';
import SliderMobile from 'components-v2/mocules/mobile/SliderMobile/Banner';
import SellerDetailHeader from 'components-v2/organisms/Mobile/store/SellerDetailHeader';
import SellerTabsMobile from 'components-v2/organisms/Mobile/store/SellerTabs';
import Template from 'components/layout/Template';
import MV2RewardItemStore from 'components/mocules/Mobile/RewardItemStore';
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
          SEO_CONFIG: {
            title: `Chương trình trả thưởng${storeInfo?.name ? ` - ${storeInfo?.name}` : ''}`,
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

const ListProduct = ({ isMobile, storeInfo = {}, slug }) => {
  const { sellerCode = '' } = storeInfo;
  const [info, setInfo] = useState(null);
  const [loadingReward, setLoadingReward] = useState(false);
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  useEffect(() => {
    const loadData = async () => {
      setLoadingReward(true);
      const result = await RewardsService.getRewardsBySeller({ sellerCode });
      setInfo(result);
      setLoadingReward(false);
    };
    loadData();
  }, []);
  const { name = '', logo = null, numberProductDisplay = 0 } = storeInfo || {};
  const sellerInfo = {
    name,
    imageStoreUrls: logo,
    numberProductDisplay,
  };
  const formatBannerSlider = info?.data.map((obj) => ({
    url: obj.imageUrls[0],
    alt: obj.name,
    target: '',
  }));
  const title = `Chương trình trả thưởng - ${name}`;

  // Tracking timing GA
  useTrackingTimeout('Sellers');

  // Scroll tracking GA
  // useScrollTracking('Sellers');

  if (isMobileV2) {
    return (
      <Template title={title} isMobile={isMobile} pageTitle={title}>
        <div className={styles.mobileHeader}>
          <Container maxWidth="lg" className={styles.mobileHeader_container}>
            <SellerDetailHeader sellerInfo={sellerInfo} isFlagship />
            <Divider />
            <SellerTabsMobile slug={slug} isFlagship />
          </Container>
        </div>
        <div className={styles.mobileContainer_wrapper}>
          <Container maxWidth="lg" className={styles.mobileContainer}>
            {loadingReward ? (
              <Typography className={styles.loaderContainer}>Đang tải...</Typography>
            ) : (
              <>
                {info?.banners && info?.banners.length > 0 && (
                  <Grid style={{ padding: info?.banners.length > 0 && '20px 15px' }} container>
                    <Grid item xs={12} lg={12}>
                      <SliderMobile banners={formatBannerSlider} />
                    </Grid>
                  </Grid>
                )}
                {info?.data && info?.data.length > 0 ? (
                  info.data.map((item) => (
                    <Box style={{ padding: '12px 0 0' }} key={`key-${item?.gamificationCode}`}>
                      <MV2RewardItemStore reward={item} isMobileV2={isMobileV2} />
                    </Box>
                  ))
                ) : (
                  <Paper style={{ padding: '30px 20px', marginTop: '30px', boxShadow: 'none' }}>
                    <Typography style={{ fontFamily: 'googlesansregular' }}>
                      Chúng tôi chưa có chương trình trả thưởng nào trong thời điểm này
                    </Typography>
                  </Paper>
                )}
              </>
            )}
          </Container>
        </div>
      </Template>
    );
  }

  return (
    <Template title={title} isMobile={isMobile} pageTitle={title}>
      <div className={styles.container_header}>
        <Container maxWidth="lg">
          <SellerHeader sellerInfo={sellerInfo} isFlagship />
          <SellerTabs slug={slug} isFlagship />
        </Container>
      </div>
      <div className={styles.container}>
        <Container maxWidth="lg">
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
