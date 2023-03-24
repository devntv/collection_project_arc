import { Container, Paper, Typography } from '@material-ui/core';
import CustomerSellerCardV2 from 'components/mocules/CustomerSellerCardV2';
import CustomSlider from 'components/organisms/CustomSlider';
import { settingsCustomerSeller } from 'constants/data';
import dynamic from 'next/dynamic';
import { v4 as uuidv4 } from 'uuid';
import SliderBannerSellerV2 from '../SliderBannerSellerV2';
import styles from './styles.module.css';

const ReactPlayerDynamic = dynamic(() => import('react-player'), { ssr: false });

const LandingPageSellerV2 = ({ landingPageData }) => {
  const {
    banners = [],
    videoIntroduces = '',
    description = '',
    feedbacks = [],
    titleColor,
    backgroundColor,
    borderAvatarColor,
    thumbnail = '',
  } = landingPageData || {};
  const bannerSlider = banners?.filter((item) => item?.type === 'SLIDER') || [];
  const contentBanner = banners?.filter((item) => item?.type === 'BANNER_CONTENT') || [];
  return (
    <div className={styles.wrap}>
      <div className={styles.bannerWrapper}>
        {bannerSlider?.length > 0 && <SliderBannerSellerV2 bannerImageUrls={bannerSlider} isFullScreen w={2100} />}
      </div>

      <Container maxWidth="lg" className={styles.container}>
        {description && (
          <Paper className={styles.generalInfo}>
            <Typography className={styles.titleIntro}>Giới thiệu chung</Typography>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          </Paper>
        )}

        {contentBanner?.length > 0 && (
          <div style={{ marginTop: '60px' }}>
            <SliderBannerSellerV2 bannerImageUrls={contentBanner} w={2100} />
          </div>
        )}

        {videoIntroduces[0] && (
          <div style={{ marginTop: '60px' }}>
            <ReactPlayerDynamic
              url={videoIntroduces}
              controls
              width="100%"
              height={480}
              className={styles.video}
              style={{ backgroundColor: titleColor, backgroundImage: `url(${thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
          </div>
        )}
      </Container>

      {feedbacks?.length > 0 && (
        <Paper className={styles.customer} style={{ background: backgroundColor }}>
          <Container>
            <Typography className={styles.titleCustomer} style={{ color: titleColor }}>
              Khách hàng nói gì về chúng tôi
            </Typography>
            <CustomSlider className={styles.slider} config={{ ...settingsCustomerSeller, arrows: false, infinite: true }}>
              {feedbacks?.map((item) => (
                <CustomerSellerCardV2 info={item} borderAvatarColor={borderAvatarColor} key={uuidv4()} />
              ))}
            </CustomSlider>
          </Container>
        </Paper>
      )}
    </div>
  );
};

export default LandingPageSellerV2;
