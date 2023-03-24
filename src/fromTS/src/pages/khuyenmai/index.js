import { Box, Grid, Typography } from '@material-ui/core';
import { getData, PromoClient } from 'clients';
import clsx from 'clsx';
import Container from 'components-v2/atoms/Mobile/Container';
import GroupProductBlock from 'components-v2/organisms/Mobile/Home/GroupProductBlock';
import PromotionBanner from 'components-v2/organisms/pages/khuyenmai/mobile/Banner';
import { LinkComp } from 'components/atoms';
import Template from 'components/layout/Template';
import Breadcrumbs from 'components/mocules/Breadcrumbs';
import ProductCardNew from 'components/mocules/ProductCardNew';
import CampaignBlock from 'components/organisms/CampaignBlock';
import { DAILY_PROMOTION_ICON } from 'constants/Images/mobile';
import { KHUYEN_MAI, KHUYEN_MAI_LOADING } from 'constants/Paths';
import useTrackingTimeout from 'hooks/useTrackingTimeout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { doWithServerSide, ProductServiceV2 } from 'services';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { getLinkTagDeal, gtag, ImageFallback } from 'utils';
import { getTitle } from 'utils/SEOUtils';
import useMobileV2 from 'zustand-lib/storeMobile';

import useGetTagPromotion from 'zustand-lib/useGetTagPromotion';
import styles from './styles.module.css';

/**
 * Page khuyen mai  + mobile v2
 * August 11, 2022
 * https://buymed.atlassian.net/browse/APO-706
 */

const title = getTitle('Khuyến mãi');

const DynamicBannerSlider = dynamic(() => import('components/organisms/BannerSlider'));

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async () => {
      const { query = {} } = ctx;
      const campaignRes = await PromoClient.getActiveCampaign({ ctx });
      return {
        props: {
          query,
          campaignData: getData(campaignRes),
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

const PromotionPage = ({ isMobile, query = {}, campaignData }) => {
  const name = 'khuyenmai';
  const defaultBreadscrumbs = [
    { name: 'Trang chủ', url: '/' },
    { name: 'Khuyến mãi', url: KHUYEN_MAI_LOADING },
  ];

  const isMobileV2 = useMobileV2((state) => state.isMobileV2());

  // const [loading, setIsLoading] = useState(false);
  // promotion data
  const [campaigns] = useState(campaignData);
  const [deals, setDeals] = useState([]);

  const BannerV1 = () => (
    <div className={styles.wrapper_slider}>
      <DynamicBannerSlider
        banners={campaigns
          ?.filter((item) => item.status === 'PROCESSING')
          .map((item) => ({
            key: item.campaignCode,
            targetURL: `${KHUYEN_MAI}/${item?.slug}`,
            imgURL: item?.banner,
            name: item?.name || '',
            width: 1200,
          }))}
      />
    </div>
  );

  // fetch data
  useEffect(async () => {
    let isFetch = true;
    // setIsLoading(true);
    if (isFetch) {
      const [dailyDealRes] = await Promise.all([ProductServiceV2.getDealsClient({ query, limit: 20 })]);
      // const [campaignRes, dailyDealRes] = await Promise.all([PromoClient.getActiveCampaignClient(), ProductServiceV2.getDealsClient({ query })]);
      // const products = getData(dailyDealRes)?.filter((item) => {
      //   if (item?.isDeal) return { ...item };
      //   return null;
      // });
      const products = getData(dailyDealRes);
      const dailyCampaignData = {
        products,
        slug: 'deals',
        campaignType: 'DAILY_DEAL',
      };

      // const campainsData = getData(campaignRes);
      // setCampaigns(campainsData);
      setDeals(dailyCampaignData?.products.slice(0, 20) || []);
      // setIsLoading(false);
    }

    return () => {
      isFetch = false;
    };
  }, []);

  const { getPromoLists } = useGetTagPromotion();
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getPromoLists({ getVoucherInfo: false, signal });

    return () => controller.abort();
  }, []);

  // Tracking timing GA
  useTrackingTimeout('Promotion');

  // Scroll tracking GA
  // useScrollTracking('Promotion');

  // lấy danh sách campaign FLASH SALE && MEGA DAY && DAILY SALE
  const fashSaleCampaign = campaigns?.filter((campaign) => campaign?.campaignType === 'FLASH_SALE' && campaign?.status === 'PROCESSING');
  const megaDayCampaign = campaigns?.filter((campaign) => campaign?.campaignType === 'NORMAL' && campaign?.status === 'PROCESSING');
  return (
    <Template isMobile={isMobile} pageName={name} showTopSearchMV2>
      <Box className={clsx(isMobileV2 ? styles.container_mv2 : styles.container)}>
        {!isMobileV2 && (
          <div className={styles.wrapper_breadcrums}>
            <Breadcrumbs breadcrumbs={defaultBreadscrumbs} />
          </div>
        )}
        {isMobileV2 ? (
          <Container
            styleContainer={{
              marginBottom: '20px',
            }}
          >
            <PromotionBanner />
          </Container>
        ) : (
          <BannerV1 />
        )}

        <div id="insider-minibanner" />

        {fashSaleCampaign?.map((campaign) => (
          <CampaignBlock isMobile={isMobile} isCampaignPage campaign={campaign} key={`campaign-flash-sale-${campaign?.campaignCode}`} />
        ))}

        {megaDayCampaign?.map((campaign) => (
          <CampaignBlock isMobile={isMobile} isCampaignPage campaign={campaign} key={`campaign-mega-day-${campaign?.campaignCode}`} />
        ))}

        {isMobileV2 ? (
          <div style={{ marginTop: '15px' }}>
            <GroupProductBlock
              icon={<ImageFallback src={DAILY_PROMOTION_ICON} width={24} height={24} />}
              name="Khuyến mãi hằng ngày"
              type="DEALS"
              redirectUrl="/deals"
            />
          </div>
        ) : (
          <>
            {deals && deals.length > 0 && (
              <Grid container spacing={2} style={{ marginTop: '15px' }}>
                <Grid item xs={12}>
                  <Typography className={styles.deals} variant="h5">
                    Khuyến mãi hằng ngày
                  </Typography>
                </Grid>
                {deals?.map(
                  (item) =>
                    item && (
                      <Grid item xs={6} sm={4} md={3} lg={3} xl={2} key={`item-product-${item.slug}`} className={styles.customGrid}>
                        <ProductCardNew product={item} isHalfProgress isLinkTagDeal link={getLinkTagDeal(item)} />
                      </Grid>
                    ),
                )}
                <Grid item xs={12}>
                  {deals.length > 5 && (
                    <Box
                      style={{ display: 'flex', justifyContent: 'center', paddingBottom: '90px' }}
                      onClick={() => {
                        gtag.clickViewAllPromotion('Khuyến mãi hằng ngày');
                      }}
                    >
                      <LinkComp name="Xem tất cả" href="/deals" className={styles.see_more} />
                    </Box>
                  )}
                </Grid>
              </Grid>
            )}
          </>
        )}
      </Box>
    </Template>
  );
};

export default PromotionPage;
