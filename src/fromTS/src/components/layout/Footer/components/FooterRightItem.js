import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Typography } from '@material-ui/core';
import { Call, EmailOutlined } from '@material-ui/icons';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import { LINK_APPLESTORE, LINK_GOOGLEPLAY, LOGO_APPSTORE, LOGO_GOOGLEPLAY, LOGO_MOBILE } from 'constants/Images';
import React from 'react';
import { gtag } from 'utils';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import styles from '../styles.module.css';

const FooterRightItem = () => (
  <Grid xs={5} item>
    <div>
      <p className={styles.footer_header}>LIÊN HỆ</p>
      <div className={styles.email_wrap}>
        <div className={styles.icon_circle}>
          <EmailOutlined style={{ width: '20x', height: '20px' }} />
        </div>
        <LinkComp href="mailto:hotro@thuocsi.vn" prefetch={false} onClick={() => gtag.sendEmail()}>
          <Typography className={clsx(styles.contact, styles.divider, styles.alink)}>hotro@thuocsi.vn</Typography>
        </LinkComp>
        <a href="https://www.facebook.com/thuocsivn" className={styles.icon_fb} onClick={() => gtag.fanpage()}>
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
      </div>
      <div className={styles.phone_wrap}>
        <div>
          <div className={styles.icon_circle}>
            <Call
              style={{
                width: '22px',
                height: '22px',
              }}
            />
          </div>
        </div>
        <LinkComp href="tel:02873008840" onClick={() => gtag.callHotline()}>
          <Typography className={clsx(styles.contact, styles.alink)}>028 7300 8840</Typography>
        </LinkComp>
      </div>
    </div>
    <div>{/* <small>Từ T2 đến T6: 8:00 - 18:00</small> */}</div>
    <div className={styles.mb2}>
      <ImageFallbackStatic src={LOGO_MOBILE} width="445" height="445" />
    </div>

    <div className={styles.download_area}>
      <LinkComp href={LINK_APPLESTORE} target="_blank" onClick={() => gtag.downloadIos()}>
        <ImageFallbackStatic src={LOGO_APPSTORE} width="159" height="48" />
      </LinkComp>
      <LinkComp href={LINK_GOOGLEPLAY} target="_blank" onClick={() => gtag.downloadAndroid()}>
        <ImageFallbackStatic src={LOGO_GOOGLEPLAY} width="162" height="51" />
      </LinkComp>
    </div>
  </Grid>
);

export default React.memo(FooterRightItem);
