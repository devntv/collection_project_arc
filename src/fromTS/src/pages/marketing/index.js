import { Box, Grid, Typography } from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { LinkComp } from 'components/atoms';
import { DOWNLOAD_APP_ICON, FACEBOOK_ICON, LINKEDIN_ICON, TIKTOK_ICON, ZALO_ICON } from 'constants/Icons';
import { BRAND_LOGO_SVG, CARTV2_ICON, FEEDBACK_ICON, ORDER_ICON_MENU, POINTS_ICON, QUEST_REWARDS_ICON } from 'constants/Images';
import Link from 'next/link';
import { memo } from 'react';
import { ImageFallbackStatic, ImageFallbackStoreImage } from 'utils/ImageFallback';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const Logo = memo(() => (
  <LinkComp href="/" id="logo-thuocsi">
    <Box>
      <ImageFallbackStoreImage id="logo-thuocsi" href="/" src={BRAND_LOGO_SVG} width="200px" height="50px" quality={100} />
    </Box>
  </LinkComp>
));

const tabs = [
  { label: 'Đặt hàng nhanh', icon: CARTV2_ICON, link: '/quick-order', enable: true },
  { label: 'Tra cứu đơn hàng', icon: ORDER_ICON_MENU, link: '/my-order', enable: true },
  { label: 'Phản hồi đơn hàng', icon: FEEDBACK_ICON, link: '/users/my-ticket', enable: true },
  { label: 'Điểm tích luỹ', icon: POINTS_ICON, link: '/users/loyalty_points', enable: true },
  { label: 'Chương trình trả thưởng', icon: QUEST_REWARDS_ICON, link: '/users/rewards', enable: true },
  { label: 'Tải app thuocsi.vn', icon: DOWNLOAD_APP_ICON, link: '/app', enable: true },
];

const socials = [
  { icon: FACEBOOK_ICON, link: 'https://www.facebook.com/thuocsivn/' },
  { icon: ZALO_ICON, link: 'https://zalo.me/thuocsivn' },
  { icon: TIKTOK_ICON, link: 'https://www.tiktok.com/@thuocsi.vietnam?' },
  { icon: LINKEDIN_ICON, link: 'https://www.linkedin.com/company/thuocsivn/' },
];

const LandingPage = () => {
  // const { host } = window.location;
  const BANNER_IMAGE = `/images/marketing/banner.webp`;
  const BANNER_URL = 'https://thuocsihotro.helpwise.help/articles/223940-tich-du-doanh-so-nhan-qua-mua-trang';
  const BANNER_TITLE = 'Tích đủ doanh số, nhận quà mùa trăng đoàn viên cùng thuocsi.vn!​';

  return (
    <Box className={styles.root}>
      <Box className={styles.container}>
        <Box className={styles.logo} style={{ marginBottom: 20 }}>
          <Logo />
        </Box>

        <Box className={styles.slider}>
          <a href={BANNER_URL} target="_blank" rel="noreferrer">
            <ImageFallbackStatic src={BANNER_IMAGE} layout="fill" />
          </a>
        </Box>
        <Typography variant="h6" className={styles.sliderTitle}>
          {BANNER_TITLE}
        </Typography>
        <Box className={styles.infoContainer}>
          <Box className={styles.infoBlock}>
            {tabs.map((tag) => (
              <Box className={styles.row} key={uuidv4()}>
                <Box className={styles.icon}>
                  <Link href={tag.link}>
                    <ImageFallbackStatic src={tag.icon} layout="fill" />
                  </Link>
                </Box>

                <Link href={tag.link}>
                  <Box className={styles.link}>{tag.label}</Box>
                </Link>
              </Box>
            ))}
          </Box>

          <Box className={styles.infoBlock}>
            <Typography variant="h6" className={styles.title}>
              Truy cập vào các kênh truyền thông chính của{' '}
              <a href="https://thuocsi.vn" style={{ color: 'rgb(12, 186, 105)' }}>
                thuocsi.vn
              </a>{' '}
              để cập nhật tin tức
            </Typography>
            <Box className={styles.socialBlock}>
              {socials.map((social) => (
                <Box key={uuidv4()}>
                  <a href={social.link} className={styles.socialIcon} target="_blank" rel="noreferrer">
                    <ImageFallbackStatic src={social.icon} layout="fill" />
                  </a>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box className={styles.footer}>
          <Grid container spacing={2}>
            <Grid item xs={12} style={{ marginBottom: 15 }}>
              <Box className={styles.logo}>
                <Logo />
              </Box>
              <b style={{ fontSize: 14 }}>
                {' '}
                <a href="https://thuocsi.vn" style={{ color: 'rgb(12, 186, 105)' }}>
                  thuocsi.vn
                </a>{' '}
                là website thuộc sở hữu của công ty TNHH Buymed
              </b>
            </Grid>
            <Grid item xs={12} md={8}>
              <p>
                <b>Công Ty TNHH Buymed</b>
              </p>
              <p>
                Địa Chỉ: <b>28bis Mạc Đĩnh Chi, Phường Đa Kao, Quận 1, TP.HCM</b>
              </p>
              <p>
                Số Chứng Nhận Đăng Ký Kinh Doanh: <b>0314758651, Cấp Ngày 29/11/2017</b>
              </p>
              <p>
                Số Giấy Phép Sàn Thương Mại Điện Tử: <b>0314758651/KD-0368</b>
              </p>
            </Grid>
            <Grid item xs={12} md={4}>
              <p>
                <b style={{ color: 'rgb(12, 186, 105)' }}>LIÊN HỆ</b>
              </p>
              <a href="mailto:hotro@thuocsi.vn">
                <p className={styles.row}>
                  <MailOutlineIcon style={{ marginRight: 5 }} /> <b>hotro@thuocsi.vn</b>
                </p>
              </a>
              <a href="tel:02873008840">
                <p className={styles.row}>
                  <CallIcon style={{ marginRight: 5 }} /> <b>028 7300 8840</b>
                </p>
              </a>
              <p>
                <b>Từ T2 đến T6: 8:00 - 18:00</b>
              </p>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
