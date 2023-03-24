import { Box, Grid, Typography } from '@material-ui/core';
import { getData, PromoClient } from 'clients';
import PromotionLoading from 'components-v2/organisms/PromotionLoading';
import { LinkComp } from 'components/atoms';
import Breadcrumbs from 'components/mocules/Breadcrumbs';
import ProductCardNew from 'components/mocules/ProductCardNew';
import CampaignBlock from 'components/organisms/CampaignBlock';
import { KHUYEN_MAI, KHUYEN_MAI_LOADING } from 'constants/Paths';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { ProductServiceV2 } from 'services';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styles from './styles.module.css';

const DynamicBannerSlider = dynamic(() => import('components/organisms/BannerSlider'));

const PcScreen = () => {
  const { query = {} } = useRouter();

  const defaultBreadscrumbs = [
    { name: 'Trang chủ', url: '/' },
    { name: 'Khuyến mãi', url: KHUYEN_MAI_LOADING },
  ];

  const [loading, setIsLoading] = useState(false);
  // promotion data
  const [campaigns, setCampaigns] = useState([]);
  const [deals, setDeals] = useState([]);

  // fetch data
  useEffect(async () => {
    let isFetch = true;
    setIsLoading(true);
    if (isFetch) {
      const [campaignRes, dailyDealRes] = await Promise.all([PromoClient.getActiveCampaignClient(), ProductServiceV2.getDealsClient({ query })]);
      const products = getData(dailyDealRes)?.filter((item) => {
        if (item?.isDeal) return { ...item };
        return null;
      });

      const dailyCampaignData = {
        products,
        slug: 'deals',
        campaignType: 'DAILY_DEAL',
      };

      const campaignData = getData(campaignRes);
      setCampaigns(campaignData);
      setDeals(dailyCampaignData?.products.slice(0, 20) || []);
      setIsLoading(false);
    }

    return () => {
      isFetch = false;
    };
  }, []);

  // lấy danh sách campaign FLASH SALE && MEGA DAY && DAILY SALE
  const fashSaleCampaign = campaigns?.filter((campaign) => campaign?.campaignType === 'FLASH_SALE' && campaign?.status === 'PROCESSING');
  const megaDayCampaign = campaigns?.filter((campaign) => campaign?.campaignType === 'NORMAL' && campaign?.status === 'PROCESSING');
  return (
    <>
      {loading ? (
        <PromotionLoading isMobile={isMobile} />
      ) : (
        <Box className={styles.container}>
          <div className={styles.wrapper_breadcrums}>
            <Breadcrumbs breadcrumbs={defaultBreadscrumbs} />
          </div>

          <div className={styles.wrapper_slider}>
            <DynamicBannerSlider
              banners={campaigns
                ?.filter((item) => item.status === 'PROCESSING')
                .map((item) => ({
                  key: item.campaignCode,
                  targetURL: `${KHUYEN_MAI}/${item?.slug}`,
                  imgURL: item?.banner,
                  name: item?.name || '',
                }))}
            />
          </div>

          <div id="insider-minibanner" />

          {fashSaleCampaign?.map((campaign) => (
            <CampaignBlock isMobile={isMobile} isCampaignPage campaign={campaign} key={`campaign-flash-sale-${campaign?.campaignCode}`} />
          ))}

          {megaDayCampaign?.map((campaign) => (
            <CampaignBlock isMobile={isMobile} isCampaignPage campaign={campaign} key={`campaign-mega-day-${campaign?.campaignCode}`} />
          ))}

          {deals && deals.length > 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography className={styles.deals} variant="h5">
                  Khuyến mãi hằng ngày
                </Typography>
              </Grid>
              {deals?.map(
                (item) =>
                  item && (
                    <Grid item xs={6} sm={4} md={3} lg={3} xl={2} key={`item-product-${item.slug}`} className={styles.customGrid}>
                      <ProductCardNew product={item} isHalfProgress />
                    </Grid>
                  ),
              )}
              <Grid item xs={12}>
                {deals.length > 5 && (
                  <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '90px' }}>
                    <LinkComp name="Xem tất cả" href="/deals" className={styles.see_more} />
                  </div>
                )}
              </Grid>
            </Grid>
          )}
        </Box>
      )}
    </>
  );
};

export default PcScreen;
