import { Box, Grid, Typography } from '@material-ui/core';
import { CALL_ICON, LINK_REGISTER, SUPPORT_ICON, URL_LICENSE } from 'constants/Images';
import Link from 'next/link';
import { LINK_LICENSE } from 'sysconfig';
import { gtag } from 'utils';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import styles from '../styles.module.css';

const LeftFooter = () => (
  <Grid container>
    <Grid item className={styles.boxInfoLeft}>
      <Typography className={styles.titleItem}>Công ty TNHH Buymed</Typography>
      <Typography className={styles.bodyItemTT} style={{ marginTop: '13.5px' }}>
        Địa Chỉ:
      </Typography>
      <Typography className={styles.bodyItem}>28Bis Mạc Đĩnh Chi, Phường Đa Kao, Quận 1, Thành phố Hồ Chí Minh, Việt Nam</Typography>
      <Typography className={styles.bodyItemTT}>Số Chứng Nhận ĐKKD:</Typography>
      <Typography className={styles.bodyItem}>0314758651, Cấp Ngày 29/11/2017, Tại Sở Kế Hoạch Và Đầu Tư Thành Phố Hồ Chí Minh</Typography>
      <Typography className={styles.bodyItemTT}>Số Giấy Phép Sàn Thương Mại Điện Tử: </Typography>
      <Link href={LINK_LICENSE} prefetch={false}>
        <Typography className={styles.bodyItemLicense}>0314758651/KD-0368</Typography>
      </Link>
      <Box className={styles.license}>
        <Link href={LINK_REGISTER} passHref>
          <a href={LINK_REGISTER}>
            <ImageFallbackStatic src={URL_LICENSE} width="123px" height="47px" layout="fixed" />
          </a>
        </Link>
      </Box>
    </Grid>
    <Grid style={{ marginTop: '21.5px' }}>
      <Typography className={styles.titleItem}>Liên hệ</Typography>
      <Grid style={{ marginTop: '13.5px' }} container alignItems="center">
        <ImageFallbackStatic src={SUPPORT_ICON} width="18" height="18" className={styles.centerImg} layout="fixed" />
        &nbsp;
        <span className={styles.contactBody}>
          <Link href="mailto:hotro@thuocsi.vn" prefetch={false} onClick={() => gtag.sendEmail()}>
            hotro@thuocsi.vn
          </Link>
        </span>
      </Grid>
      <Grid style={{ marginTop: '9px' }} container alignItems="center">
        <ImageFallbackStatic src={CALL_ICON} width="18" height="18" className={styles.centerImg} layout="fixed" />
        &nbsp;
        <span className={styles.contactBody}>
          <Link href="tel:02873008840" onClick={() => gtag.callHotline()}>
            02 873 008 840
          </Link>
          <span className={styles.callTime}>&nbsp;(Từ T2 đến CN: 8h-20h)</span>
        </span>
      </Grid>
    </Grid>
  </Grid>
);
export default LeftFooter;
