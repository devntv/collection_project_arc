import { BottomNavigation, BottomNavigationAction, Container } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { ButtonHeader } from 'components/atoms';
import {
  ICON_MOBILE_ICON_CART,
  ICON_MOBILE_ICON_COUPON,
  ICON_MOBILE_ICON_DISCOVERY,
  ICON_MOBILE_ICON_HOME,
  ICON_MOBILE_ICON_STORE,
} from 'constants/Images/mobile/Icons';
import { HELP_CENTER } from 'constants/Paths';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useState } from 'react';
import { gtag } from 'utils';
import styles from './styles.module.css';

const CustomBottomBtnNav = withStyles({
  root: {
    padding: '0px',
    '& .MuiBottomNavigationAction-label': {
      fontSize: '9px',
      position: 'absolute',
      bottom: '0',
    },
  },
  selected: {
    padding: '0!important',
  },
})(BottomNavigationAction);

const NavbarFooter = memo(() => {
  const router = useRouter();

  const resValue = router.asPath.split('/');

  const [activeTab, setActiveTab] = useState(resValue);

  const handleChange = (newValue) => {
    setActiveTab(newValue);
  };

  const CustomBottomNavbar = withStyles({
    root: {
      height: '51px',
      zIndex: 1100,
      backgroundColor: 'transparent',
    },
  })(BottomNavigation);
  const dataItems = [
    { label: 'Trang Chủ', value: 'home', url: '/', icon: <ICON_MOBILE_ICON_HOME /> },
    { label: 'Khám Phá', value: 'discovery', url: '/discovery', icon: <ICON_MOBILE_ICON_DISCOVERY /> },
    { label: 'Đặt Nhanh', value: 'quick-order', url: '/quick-order', icon: <ICON_MOBILE_ICON_CART /> },
    { label: 'Nhà Bán Hàng', value: 'sellers', url: '/sellers/loading', icon: <ICON_MOBILE_ICON_STORE /> },
    { label: 'Khuyến Mãi', value: 'khuyenmai', url: '/khuyenmai/loading', icon: <ICON_MOBILE_ICON_COUPON /> },
  ];

  return (
    <CustomBottomNavbar className={styles.bottomNavbar} showLabels value={activeTab} onChange={handleChange}>
      {dataItems.map((item) => (
        <Link href={item.url} passHref key={`mobil-item-${item.value}`} prefetch>
          <CustomBottomBtnNav
            onClick={() => gtag.clickMenubar({ name: item.label, url: item.url })}
            label={item.label}
            value={item.value}
            className={clsx(
              activeTab[1] === (item.value === 'home' ? '' : item.value) && styles.changeColor,
              item.value === 'quick-order' && styles.quickOrder,
            )}
            icon={item.value === 'quick-order' ? <div className={clsx(styles.mainIcon)}>{item.icon}</div> : <div>{item.icon}</div>}
            showLabel
          />
        </Link>
      ))}
    </CustomBottomNavbar>
  );
});

const FooterMobile = memo(({ isAuthenticated, toggleSignUp, toggleLogin }) => {
  const router = useRouter();

  return (
    <>
      {router.pathname !== HELP_CENTER && (
        <footer className={isAuthenticated ? styles.footerMobile : styles.bottom_bar} style={{ maxWidth: '100vw' }}>
          <Container className={styles.footerMobile_container} maxWidth="lg">
            {isAuthenticated ? (
              <NavbarFooter />
            ) : (
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
              </div>
            )}
          </Container>
        </footer>
      )}
    </>
  );
});

export default FooterMobile;
