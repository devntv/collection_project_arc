import { AppBar, Container } from '@material-ui/core';

import { ButtonHeader } from 'components/atoms';
import { CART_URL, CHECKOUT_URL, HELP_CENTER, PRODUCT, QUICK_ORDER } from 'constants/Paths';
import { useAuth } from 'context';
import useMobileDetect from 'hooks/useIsMobile';
import { useRouter } from 'next/router';
import React from 'react';
import { screenOrientation } from 'utils';
import FooterWithAddToCart from './components/FooterWithAddToCart';
import FooterWithCart from './components/FooterWithCart';
import FooterWithToolBar from './components/FooterWithToolBar';
import styles from './styles.module.css';

const FooterComp = ({ product }) => {
  const { isMobile = false } = useMobileDetect();
  const [mobile, setMobile] = React.useState(isMobile);

  React.useEffect(() => {
    const landscape = screenOrientation(window);
    if (landscape) {
      setMobile(false);
    }
  }, []);
  React.useEffect(() => {
    const landscape = screenOrientation(window);
    window.addEventListener(
      'orientationchange',
      () => {
        if (landscape) {
          setMobile(true);
        } else {
          setMobile(false);
        }
      },
      false,
    );
  }, [mobile]);

  const { isAuthenticated, toggleLogin, toggleSignUp } = useAuth();
  const router = useRouter();

  return (
    <>
      {router.pathname !== HELP_CENTER && (
        <footer className={styles.bottom_bar}>
          <div className={styles.global_style}>
            <Container maxWidth="lg">
              {!isAuthenticated ? (
                <div className={styles.div_buttons}>
                  <ButtonHeader variant="contained" backgroundColor="#0E1983" onClick={() => router.push(HELP_CENTER)}>
                    Hỗ trợ
                  </ButtonHeader>
                  <ButtonHeader variant="contained" color="#000" btnType="warning" onClick={toggleLogin}>
                    Đăng nhập
                  </ButtonHeader>
                  <ButtonHeader variant="contained" btnType="primary" onClick={toggleSignUp}>
                    Đăng ký
                  </ButtonHeader>
                  {/* <ButtonHeader className={styles.custombtn} variant="contained" btnType="primary" onClick={toggleRegisterGuest}>
                Dùng thử
              </ButtonHeader> */}
                </div>
              ) : (
                <AppBar position="fixed" className={styles.appBar}>
                  {(router.pathname === QUICK_ORDER || router.pathname === CART_URL) && <FooterWithCart isMobile={isMobile} />}
                  {router.pathname === PRODUCT && <FooterWithAddToCart product={product} />}
                  {router.pathname !== QUICK_ORDER &&
                    router.pathname !== CART_URL &&
                    router.pathname !== PRODUCT &&
                    router.pathname !== CHECKOUT_URL && <FooterWithToolBar isMobile={isMobile} />}
                </AppBar>
              )}
            </Container>
          </div>
        </footer>
      )}
    </>
  );
};

export default React.memo(FooterComp);
