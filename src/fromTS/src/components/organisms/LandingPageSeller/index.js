import { Button, Container, Paper, Typography } from '@material-ui/core';
import CustomerSellerCard from 'components/mocules/CustomerSellerCard';
import CustomSlider from 'components/organisms/CustomSlider';
import { settingsCustomerSeller } from 'constants/data';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import SliderBannerSeller from '../SliderBannerSeller';
import styles from './styles.module.css';

const ReactPlayerDynamic = dynamic(() => import('react-player'), { ssr: false });

const LandingPageSeller = ({ landingPageData }) => {
  const { banners = [], videoIntroduces = '', description = '', feedbacks = [] } = landingPageData || {};
  const [seeMore, setSeeMore] = useState(false);
  const bannerSlider = banners?.filter((item) => item?.type === 'SLIDER') || [];
  const contentBanner = banners?.filter((item) => item?.type === 'BANNER_CONTENT') || [];
  // split theo </
  const descriptions = description.split('</');
  // 100 px ~ 5 dòng
  const isShowMore = descriptions?.length > 4;
  return (
    <div className={styles.wrap}>
      <div>
        <Container maxWidth="lg" className={styles.container}>
          {bannerSlider?.length > 0 && <SliderBannerSeller bannerImageUrls={bannerSlider} w={2100} />}
          {description && (
            <Paper className={styles.generalInfo}>
              <Typography className={styles.titleIntro}>Giới thiệu chung</Typography>
              <div
                className={!seeMore && styles.infoLess}
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
              {isShowMore && (
                <div className={styles.seeMore}>
                  <Button className={styles.seeMoreBtn} onClick={() => setSeeMore(!seeMore)}>
                    {seeMore ? 'Thu gọn' : 'Xem thêm'}
                  </Button>
                </div>
              )}
            </Paper>
          )}
          {contentBanner?.length > 0 && (
            <div style={{ marginTop: '28px' }}>
              <SliderBannerSeller bannerImageUrls={contentBanner} w={2100} />
            </div>
          )}

          {videoIntroduces && (
            <div style={{ marginTop: '28px' }}>
              <ReactPlayerDynamic url={videoIntroduces} controls width="100%" height={480} className={styles.video} />
            </div>
          )}
          {feedbacks?.length > 0 && (
            <Paper className={styles.customer}>
              <Typography className={styles.titleCustomer}>Khách hàng nói gì về chúng tôi</Typography>
              <CustomSlider className={styles.slider} config={settingsCustomerSeller}>
                {feedbacks?.map((item) => (
                  <CustomerSellerCard info={item} />
                ))}
              </CustomSlider>
            </Paper>
          )}
        </Container>
      </div>
    </div>
  );
};

export default LandingPageSeller;
