import { Container, Grid } from '@material-ui/core';
import { LinkComp } from 'components/atoms';
import { memo } from 'react';
// import { LOGO_FOOTER_NEW } from 'constants/Images';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import StoreIcon from '@material-ui/icons/Store';
import { DOMAIN_SELLER_CENTER } from 'sysconfig';
import styles from './styles.module.css';

const LinkLogo = memo(() => (
  <LinkComp href="/" className={styles.logo}>
    {/* <Image src={LOGO_FOOTER_NEW} width="126" height="35" /> */}
  </LinkComp>
));
const Header = () => (
  <Container maxWidth="lg">
    <Grid container className={styles.nav_wrap}>
      <Grid md={6} item className={styles.logo}>
        <LinkLogo />
      </Grid>
      <Grid item md={6} className={styles.right_nav}>
        <div>
          <LinkComp
            className={styles.link}
            name="thuocsi.vn"
            href="/"
            color="#586189"
          >
            <HomeOutlinedIcon fontSize="small" className={styles.icon_link} />
          </LinkComp>
        </div>
        <div>
          <LinkComp
            className={styles.link}
            name="Đăng ký bán hàng"
            href={DOMAIN_SELLER_CENTER}
            color="#586189"
          >
            <StoreIcon fontSize="small" className={styles.icon_link} />
          </LinkComp>
        </div>
        {/* <div role="button" className={styles.signup} aria-hidden="true" onClick={toggleSignUp}>
            <div className={styles.login}>
              <CreateOutlinedIcon fontSize="small" className={styles.icon_link} />
              <span>Đăng ký</span>
            </div>
          </div>
          <div className={classes.text}>
            <ButtonHeader variant="contained" btnType="primary" color="white" onClick={toggleLogin}>
              <div className={styles.login}>
                <PersonOutlineIcon fontSize="small" className={styles.icon_link} />
                <span>Đăng nhập</span>
              </div>
            </ButtonHeader>
          </div> */}
      </Grid>
    </Grid>
  </Container>
);
export default Header;
