import { Box, Drawer, Fab, Grid, IconButton } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { Close, Menu } from '@material-ui/icons';
import clsx from 'clsx';
import { ButtonHeader, LinkComp } from 'components/atoms';
import { SideBar } from 'components/organisms';
import { BRAND_LOGO_SVG } from 'constants/Images';
import { CART_URL, PRODUCT, QUICK_ORDER } from 'constants/Paths';
import { useAuth } from 'context';

import { useRouter } from 'next/router';
import { memo, useState } from 'react';
import { isPrd } from 'sysconfig';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import useMobileV2 from 'zustand-lib/storeMobile';
import HeaderWithCart from './components/HeaderWithCart';
import HeaderWithSearchTool from './components/HeaderWithSearchTool';
import styles from './styles.module.css';

const LinkLogo = memo(() => (
  <LinkComp href="/">
    <ImageFallbackStatic className={styles.logo} href="/" src={BRAND_LOGO_SVG} width="127px" height="22px" layout="fixed" />
  </LinkComp>
));

const HeaderMobile = memo(({ title = '', isMobile }) => {
  const { isAuthenticated, toggleLogin } = useAuth();
  const handleChangeUI = useMobileV2((state) => state.toggleBeta);

  const beta = useMobileV2((state) => state.beta);
  const [openDrawer, setOpenDrawer] = useState(false);

  const router = useRouter();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpenDrawer(open);
  };
  return (
    <div className={styles.login_wrapper}>
      <div
        className={clsx(
          styles.login,
          isAuthenticated && styles.logged,
          router.pathname === QUICK_ORDER ? styles.search_tool_wrapper : '',
          router.pathname === CART_URL ? styles.cart_wrapper : '',
          router.pathname === CART_URL ? styles.cart_wrapper : '',
          router.pathname === PRODUCT ? styles.cart_wrapper : '',
        )}
      >
        {!isAuthenticated ? (
          <>
            <Box display="flex" alignItems="center">
              <LinkLogo />
              {!isPrd && (
                <Box component="div">
                  <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>
                      <Switch checked={beta} onChange={handleChangeUI} name="checkedMobileNew" />
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
            <div className={styles.div_buttons}>
              <ButtonHeader id="loginMobile" variant="contained" btnType="warning" onClick={toggleLogin}>
                Đăng nhập
              </ButtonHeader>
            </div>
          </>
        ) : (
          <>
            <div className={styles.lSection}>
              <IconButton onClick={toggleDrawer(true)} aria-label="menu">
                <Menu />
              </IconButton>
              {router.asPath.includes(QUICK_ORDER) && <span className={styles.text}>{title && title}</span>}
            </div>
            <div className={styles.rSection}>
              {router.pathname === QUICK_ORDER ? <HeaderWithSearchTool /> : <HeaderWithCart isMobile={isMobile} />}
            </div>
            <Drawer className={styles.mobileSidebar_container} anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
              <div className={styles.drawer}>
                <Fab size="small" color="secondary" aria-label="close" onClick={toggleDrawer(false)}>
                  <Close />
                </Fab>
                <SideBar isMobile={isMobile} />
              </div>
            </Drawer>
          </>
        )}
      </div>
    </div>
  );
});

export default HeaderMobile;
