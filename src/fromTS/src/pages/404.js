import { Button, Container, Grid, Typography } from '@material-ui/core';
import BotClient from 'clients/BotClient';
import { BRAND_NAME } from 'constants/Enums';
import { ICON_404_MAIL, ICON_404_PHONE, IMAGE_404, LOGO_THUOCSI_404 } from 'constants/Images';
import { MY_ORDER_URL, PRODUCTS_URL } from 'constants/Paths';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { gtag } from 'utils';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import styles from '../styles/error.module.css';

const BtnBack = ({ router = {} }) => {
  let btnName = 'QUAY LẠI TRANG CHỦ';
  let url = '/';

  if (router?.asPath.includes(PRODUCTS_URL) || router?.query?.errProduct) {
    btnName = 'QUAY LẠI DANH SÁCH SẢN PHẨM';
    url = PRODUCTS_URL;
  } else if (router?.asPath.includes(MY_ORDER_URL) || router?.query?.errOrder) {
    btnName = 'QUAY LẠI DANH SÁCH ĐƠN HÀNG';
    url = MY_ORDER_URL;
  }
  return (
    <Button variant="contained" className={styles.btnBack} onClick={() => router?.push(url)}>
      {btnName}
    </Button>
  );
};
// TODO: translate
const Error404 = (props) => {
  const { isMobile = false } = props;
  const router = useRouter();
  const customerId = Cookies.get('customerId');

  const getErrUrl = () => {
    const { query = {}, asPath = '' } = router;
    const { errProduct = '', errOrder = '' } = query;
    const hostnameUrl = window?.location?.hostname?.toString() || 'thuocsi.vn';

    if (errProduct) {
      return `https://${hostnameUrl}/product/${errProduct}`;
    }
    if (errOrder) {
      return `https://${hostnameUrl}${MY_ORDER_URL}/${errOrder}`;
    }
    if (asPath) {
      return `https://${hostnameUrl}${asPath}`;
    }
    return '/';
  };

  useEffect(() => {
    const url = getErrUrl();
    BotClient.sendMesageError({ message: JSON.stringify({ ...props, url, statusCode: 404, customerId }) });
  }, []);

  return (
    <Container className={styles.pageError}>
      {isMobile ? (
        <Grid container justifyContet="center">
          <Grid align="center" item xs={12}>
            <ImageFallbackStatic src={IMAGE_404} width={360} height={164} />
          </Grid>
          <Grid item container spacing={0} xs={12} className={styles.errorInfoMobile}>
            <Grid align="center" item xs={12} style={{ height: '35px', marginTop: '24px' }}>
              <ImageFallbackStatic src={LOGO_THUOCSI_404} width={200} height={35} />
            </Grid>
            <Grid item xs={12}>
              <Typography align="center" className={styles.weightBold} style={{ padding: '2px' }}>
                Lỗi không tìm thấy trang, vui lòng liên hệ <span style={{ textTransform: 'lowercase' }}>{BRAND_NAME}</span> để được Hỗ trợ
              </Typography>
              <Typography align="center" className={styles.urlError} style={{ marginTop: '8px' }}>
                {getErrUrl()}
              </Typography>
            </Grid>
            <Grid align="center" item xs={12}>
              <Grid item container direction="row" justifyContent="center" alignItems="center">
                <ImageFallbackStatic src={ICON_404_MAIL} width="16" height="15" className={styles.centerImg} />
                &nbsp;
                <span className={styles.contactBody}>
                  <Link href="mailto:hotro@thuocsi.vn" prefetch={false} onClick={() => gtag.sendEmail()}>
                    hotro@thuocsi.vn
                  </Link>
                </span>
              </Grid>
              <Grid item container direction="row" justifyContent="center" alignItems="center" style={{ marginTop: '12px' }}>
                <ImageFallbackStatic src={ICON_404_PHONE} width="14" height="14" className={styles.centerImg} />
                &nbsp;
                <span className={styles.contactBody}>
                  <Link href="tel:02873008840" onClick={() => gtag.callHotline()}>
                    02 873 008 840
                  </Link>
                  <span className={styles.callTime}>&nbsp;(Từ T2 đến CN: 8h-20h)</span>
                </span>
              </Grid>
            </Grid>
            <Grid align="center" item xs={12}>
              <BtnBack router={router} />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container justifyContent="center" style={{ width: '1120px' }}>
          <Grid align="center" item xs={12}>
            <ImageFallbackStatic src={IMAGE_404} width={524} height={240} />
          </Grid>
          <Grid item container spacing={0} xs={12} className={styles.errorInfo}>
            <Grid align="center" item xs={12} style={{ height: '35px', marginTop: '24px' }}>
              <ImageFallbackStatic src={LOGO_THUOCSI_404} width={200} height={35} />
            </Grid>
            <Grid item xs={12}>
              <Typography align="center" className={styles.weightBold}>
                Lỗi không tìm thấy trang, vui lòng liên hệ <span style={{ textTransform: 'lowercase' }}>{BRAND_NAME}</span> để được Hỗ trợ
              </Typography>
              <Typography align="center" className={styles.urlError} style={{ marginTop: '8px' }}>
                {getErrUrl()}
              </Typography>
            </Grid>
            <Grid align="center" item xs={12}>
              <Grid item container direction="row" justifyContent="center" alignItems="center">
                <ImageFallbackStatic src={ICON_404_MAIL} width="16" height="15" className={styles.centerImg} />
                &nbsp;
                <span className={styles.contactBody}>
                  <Link href="mailto:hotro@thuocsi.vn" prefetch={false} onClick={() => gtag.sendEmail()}>
                    hotro@thuocsi.vn
                  </Link>
                </span>
              </Grid>
              <Grid item container direction="row" justifyContent="center" alignItems="center" style={{ marginTop: '12px' }}>
                <ImageFallbackStatic src={ICON_404_PHONE} width="14" height="14" className={styles.centerImg} />
                &nbsp;
                <span className={styles.contactBody}>
                  <Link href="tel:02873008840" onClick={() => gtag.callHotline()}>
                    02 873 008 840
                  </Link>
                  <span className={styles.callTime}>&nbsp;(Từ T2 đến CN: 8h-20h)</span>
                </span>
              </Grid>
            </Grid>
            <Grid align="center" item xs={12}>
              <BtnBack router={router} />
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};
export default Error404;
