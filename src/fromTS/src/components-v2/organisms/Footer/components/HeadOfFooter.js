import { Box, Grid, Typography } from '@material-ui/core';
import { LinkComp } from 'components/atoms';
import { APPSTORE, BRAND_LOGO_SVG, GOOGLEPLAY, LINK_APPLESTORE, LINK_GOOGLEPLAY } from 'constants/Images';
import { gtag } from 'utils';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import styles from '../styles.module.css';

const HeadOfFooter = () => (
  <Grid justifyContent="space-between" container style={{ marginTop: '29px' }}>
    <Grid xs={12} sm={6} lg={8} item>
      <Grid style={{ maxWidth: '175px' }} className={styles.logo}>
        <LinkComp href="/">
          <ImageFallbackStatic src={BRAND_LOGO_SVG} width="127px" height="22px" />
        </LinkComp>
      </Grid>
      <Grid style={{ marginTop: '8px', maxWidth: '409px' }} className={styles.about}>
        <LinkComp href="/">
          <span className={styles.thuocsi}>
            <Typography href="/"> thuocsi.vn </Typography>
          </span>
          &nbsp;
          <Typography className={styles.thuocsidefinition}>Là website thuộc sở hữu của công ty TNHH Buymed.</Typography>
        </LinkComp>
      </Grid>
    </Grid>
    <Grid sm={6} lg={4} item className={styles.app}>
      <Box style={{ float: 'right', paddingRight: '6px' }}>
        <Typography className={styles.taiAppTai}>Tải App tại</Typography>
      </Box>
      <br />
      <Box style={{ float: 'right' }}>
        <Grid justifyContent="space-between" container style={{ marginTop: '8px' }}>
          <LinkComp href={LINK_APPLESTORE} target="_blank" onClick={() => gtag.downloadIos()}>
            <ImageFallbackStatic src={APPSTORE} width="107.67" height="32" />
          </LinkComp>
          <LinkComp href={LINK_GOOGLEPLAY} target="_blank" onClick={() => gtag.downloadAndroid()}>
            <ImageFallbackStatic src={GOOGLEPLAY} width="107.33" height="32" />
          </LinkComp>
        </Grid>
      </Box>
    </Grid>
  </Grid>
);
export default HeadOfFooter;
