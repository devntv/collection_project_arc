/* eslint-disable arrow-body-style */

import { Box, Container, Divider, Grid, Typography } from '@material-ui/core';
import { LinkComp } from 'components/atoms';
import { BRAND_LOGO_SVG, GOOGLEPLAY, LINK_APPLESTORE, LINK_GOOGLEPLAY, PHONEFRAME, URL_APPSTORE, URL_NEW_LOGO } from 'constants/Images';
import { gtag } from 'utils';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import LeftFooter from './components/LeftFooter';
import MiddleFooter from './components/MiddleFooter';
import styles from './styles.module.css';

// eslint-disable-next-line import/prefer-default-export
function Footer() {
  return (
    <Box style={{ background: '#ffffff' }}>
      <Box className={styles.footer}>
        <Container style={{ maxWidth: '1304px', paddingTop: '2px' }}>
          <Grid justifyContent="space-between" container style={{ marginTop: '29px' }}>
            <Grid xs={12} sm={9} lg={9} md={9} item>
              <Grid style={{ maxWidth: '175px' }} className={styles.logo}>
                <LinkComp href="/">
                  <ImageFallbackStatic src={BRAND_LOGO_SVG} width="127px" height="22px" layout="fixed" />
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

              <Grid display="flex" justifyContent="space-between" spacing={1} container style={{ marginTop: '38px', padding: '0px 4px' }}>
                <Grid xs={12} sm={4} lg={4} item>
                  <LeftFooter />
                </Grid>
                <Grid xs={12} sm={8} lg={8} item>
                  <MiddleFooter />
                </Grid>
              </Grid>
              <br />
            </Grid>
            <Grid sm={3} lg={3} md={3} item className={styles.app}>
              <Box>
                <Typography className={styles.taiAppTai}>Tải App tại</Typography>
              </Box>
              <Box>
                <Grid justifyContent="center" container style={{ marginTop: '8px', width: '100%' }}>
                  <LinkComp href={LINK_APPLESTORE} target="_blank" onClick={() => gtag.downloadIos()}>
                    <ImageFallbackStatic src={URL_APPSTORE} width="107.67" height="32" quality={75} layout="fixed" />
                  </LinkComp>
                  <LinkComp href={LINK_GOOGLEPLAY} target="_blank" onClick={() => gtag.downloadAndroid()}>
                    <ImageFallbackStatic src={GOOGLEPLAY} width="107.33" height="32" layout="fixed" />
                  </LinkComp>
                </Grid>
                <div className={styles.phoneScreen}>
                  <ImageFallbackStatic src={PHONEFRAME} width="150.71" height="304.17" alt="phone frame" layout="fixed" />
                  <div className={styles.newLogo}>
                    <ImageFallbackStatic src={URL_NEW_LOGO} width={95} height={19} alt="Thuocsi Logo New" layout="fixed" />
                  </div>
                </div>
              </Box>
            </Grid>

            <Grid item xs={12} lg={12} md={12} sm={12} container style={{ width: '100%' }}>
              <Grid item container display="flex" justifyContent="space-between" spacing={1} style={{ width: '100%' }}>
                <Divider />
                <Grid className={styles.license}>
                  <Typography className={styles.endOfFooter}>© Bản quyền thuộc Công Ty TNHH Buymed - 2021</Typography>
                </Grid>
                <Divider style={{ marginTop: '40px', backgroundColor: 'white' }} />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
export default Footer;
