import { Button, Collapse, Container, Grid, Paper, Typography } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SliderMobile from 'components-v2/mocules/mobile/SliderMobile/Banner';
import CustomerSellerCardV2 from 'components/mocules/CustomerSellerCardV2';
import CustomSlider from 'components/organisms/CustomSlider';
import { settingsCustomerSeller } from 'constants/data';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styles from './styles.module.css';

const ReactPlayerDynamic = dynamic(() => import('react-player'));

const LandingPageSellerMobile = ({ landingPageData, isMobileV2 = false }) => {
  const { banners = [], videoIntroduces = '', description = '', feedbacks = [] } = landingPageData || {};

  const [seeMore, setSeeMore] = useState(false);
  const [height, setHeight] = useState(0);
  const ref = useRef(null);
  const bannerSlider = banners?.filter((item) => item?.type === 'SLIDER') || [];
  const contentBanner = banners?.filter((item) => item?.type === 'BANNER_CONTENT') || [];
  const formatBannerSlider = bannerSlider?.map((obj) => ({
    url: obj.images[0],
    alt: obj.name,
    target: obj.link,
    id: obj.bannerID,
  }));
  const formatContentBanner = contentBanner?.map((obj) => ({
    url: obj.images[0],
    alt: obj.name,
    target: obj.link,
    id: obj.bannerID,
  }));
  // catch display desc
  const regex = /(<([^>]+)>)/gi;
  const descriptions = description.replace(regex, '');

  useEffect(() => {
    setHeight(ref?.current?.clientHeight || 0);
  });
  return (
    <div className={styles.wrap}>
      <div>
        <Container maxWidth="lg" className={styles.container}>
          {bannerSlider?.length > 0 && (
            <Grid style={{ padding: '20px 15px' }} container>
              <Grid item xs={12} lg={12}>
                <SliderMobile banners={formatBannerSlider} />
              </Grid>
            </Grid>
          )}

          {descriptions && (
            <div className={styles.descriptionWrapper}>
              <Collapse in={seeMore} collapsedSize="90px">
                <Paper ref={ref} className={styles.generalInfo}>
                  <Typography className={styles.titleIntro}>Giới thiệu chung</Typography>
                  <div
                    className={!seeMore && styles.infoLess}
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                  />
                </Paper>
              </Collapse>
              <div className={styles.warpperBtnCollapse}>
                {height > 60 && (
                  <Button
                    className={styles.btnCollapse}
                    endIcon={seeMore ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    onClick={() => setSeeMore(!seeMore)}
                  >
                    {seeMore ? 'Ẩn' : 'Xem thêm'}
                  </Button>
                )}
              </div>
            </div>
          )}

          <Grid style={{ padding: contentBanner?.length > 0 && '20px 15px' }} container>
            {contentBanner?.length > 0 && (
              <Grid item xs={12} lg={12}>
                <SliderMobile banners={formatContentBanner} />
              </Grid>
            )}
          </Grid>

          {videoIntroduces && <ReactPlayerDynamic url={videoIntroduces} controls width="100%" height={480} className={styles.video} />}

          {feedbacks?.length > 0 && (
            <Paper className={styles.customer}>
              <Container style={{ padding: '20px 15px' }}>
                <Typography className={styles.titleCustomer}>Khách hàng nói gì về chúng tôi</Typography>
                <CustomSlider
                  className={styles.slider}
                  config={{
                    ...settingsCustomerSeller,
                    arrows: false,
                    infinite: true,
                    dots: true,
                    dotsClass: 'banner-slider-dots',
                    appendDots: (dots) => <div>{dots}</div>,
                  }}
                >
                  {feedbacks?.map((item) => {
                    if (!item.content) return null;
                    return <CustomerSellerCardV2 key={item.code} info={item} isMobileV2={isMobileV2} />;
                  })}
                </CustomSlider>
              </Container>
            </Paper>
          )}
        </Container>
      </div>
    </div>
  );
};

export default LandingPageSellerMobile;
