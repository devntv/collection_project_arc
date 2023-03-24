import { Badge, Box, Container, Grid, Tooltip, Typography } from '@material-ui/core';
import { TrackingActionClient } from 'clients';
import clsx from 'clsx';
import MostSearch from 'components-v2/atoms/MostSearch';
import SearchInput from 'components-v2/mocules/SearchInput';
import ToggleProfile from 'components-v2/mocules/ToggleProfile';
import { LinkComp } from 'components/atoms';
import { getTrackingData } from 'constants/data';
import { CARTV2_ICON } from 'constants/Images';
import { CART_URL, KHUYEN_MAI, KHUYEN_MAI_LOADING, PRODUCTS_LOADING_URL, PRODUCTS_URL, SELLERS, SELLERS_LOADING_URL } from 'constants/Paths';
import { useAuth, useCart, useSearch } from 'context';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import { gtag, ImageFallback, NotifyUtils } from 'utils';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import { getLinkProxy } from 'utils/ImageUtils';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from 'zustand-lib/storeGlobal';
import styles from './styles.module.css';

const getUrl = (url, redirectUrl) => {
  if (redirectUrl) {
    return redirectUrl;
  }
  return url;
};

const mapDataTestLink = {
  'Sản Phẩm': 'nav-products',
  'Hoạt Chất': 'nav-ingredients',
  'Đặt Hàng Nhanh': 'nav-quick-order',
  'Khuyến Mãi': 'nav-promotion',
  'Mã Giảm Giá': 'nav-sale-voucher',
  'Nhà Bán Hàng': 'nav-sellers',
};

function Navbar({ isMobile }) {
  const { isAuthenticated, toggleLogin, user } = useAuth();
  const { isFocus } = useSearch();
  const [scrollSticky, setScrollSticky] = useState(false);
  const router = useRouter();
  const { totalQuantity } = useCart();
  // console.log('fix', fix NFTS CHECKOUT WINDOW);
  const hashtagTopSearch = useStore((state) => state.hashtagTopSearch);
  const menuBar = useStore((state) => state.menuBar);

  let menuBarRender = [];

  if (menuBar?.length > 0) {
    menuBarRender = menuBar.map((item, index) => {
      const { iconUrl, label, url } = item;
      return {
        id: index,
        name: label,
        icon: getLinkProxy(iconUrl),
        url,
        isNew: false,
        prefetch: false,
        width: '20px',
        height: '20px',
        eventPage: false,
        tracking: getTrackingData(url),
      };
    });
  }

  const getActivePage = () => {
    const { pathname } = router || {};
    if (pathname === '/products' || pathname === '/categories/[slug]' || pathname === '/manufacturers/[slug]' || pathname === PRODUCTS_LOADING_URL) {
      return PRODUCTS_URL;
    }
    if (pathname === SELLERS_LOADING_URL) {
      return SELLERS;
    }
    if (pathname === KHUYEN_MAI_LOADING) {
      return KHUYEN_MAI;
    }
    return router.pathname;
  };

  const handleTracking = async (tracking) => {
    const { account: { accountId = '' } = {}, customerID = '' } = user || {};
    TrackingActionClient.tracking({
      page: tracking.trackingPath,
      accountId,
      customerID,
      eventAction: tracking.action,
      currentPage: window.location.href,
      isMobile,
    });
  };
  const handleCheck = (e, tracking) => {
    if (!isAuthenticated) {
      e.preventDefault();
      NotifyUtils.error('Bạn cần đăng nhập để vào trang này');
      setTimeout(() => {
        toggleLogin();
      }, 300);
    }
    handleTracking(tracking);
    // setClick(false);
  };

  useEffect(() => {
    const scrollChangeSticky = () => {
      // TODO: do có banner của insider nên + thêm 50
      if (window.scrollY >= 150) {
        setScrollSticky(true);
      } else {
        setScrollSticky(false);
      }
    };
    window.addEventListener('scroll', scrollChangeSticky);
    return () => window.removeEventListener('scroll', scrollChangeSticky);
  }, []);

  // MOCK DATA

  useEffect(() => {
    gtag.displayTopSearch();
  }, []);

  const checkShowAnimate = () => {
    if (!(isFocus && scrollSticky)) {
      return null;
    }
    if (isFocus && scrollSticky) {
      return styles.animateSearch;
    }
    return styles.notFocusAnimate;
  };

  // check first time sticky navbar
  const [flagStickySearch, setFlagStickySearch] = useState(false);
  useEffect(() => {
    if (isFocus && scrollSticky) {
      setFlagStickySearch(true);
    }
    if (!scrollSticky) {
      setFlagStickySearch(false);
    }
  }, [isFocus, scrollSticky]);

  const Cart = ({ className }) => (
    <Box>
      <LinkComp href={CART_URL} className={clsx(styles.cartLink, className)}>
        <Badge
          badgeContent={totalQuantity}
          max={1000}
          // invisible={totalQuantity === 0}
          color="secondary"
          overlap="rectangular"
          data-test="cart-num"
        >
          <Tooltip title="Giỏ hàng" arrow>
            <Box className={styles.cart} data-test="cart-link">
              <ImageFallbackStatic src={CARTV2_ICON} width="20px" height="24px" layout="fixed" />
            </Box>
          </Tooltip>
        </Badge>
      </LinkComp>
    </Box>
  );

  const TopSearch = () => {
    if (!hashtagTopSearch || hashtagTopSearch?.length === 0) return <></>;

    return (
      <Box style={{ width: '100%', backgroundColor: '#ffffff' }}>
        <Container style={{ maxWidth: '1304px', backgroundColor: '#ffffff', paddingLeft: '0px' }}>
          <Box className={styles.mostSearchWrap}>
            <Box>
              <Typography>Tìm kiếm nhiều nhất</Typography>
            </Box>
            <Box className={styles.mostSearchTab}>
              {hashtagTopSearch?.map((tag) => (
                <MostSearch onClick={() => gtag.clickTopSearch(tag)} key={tag.code} link={tag.url}>
                  {tag.hashtag}
                </MostSearch>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    );
  };

  return (
    <>
      <Box className={clsx(styles.nav, scrollSticky && styles.sticky)}>
        <Container style={{ maxWidth: '1352px' }} className={styles.wrap}>
          <Box className={clsx(styles.WrapmenuFocus)}>
            <Grid
              container
              className={clsx(styles.menu, !scrollSticky && styles.h40)}
              alignContent="space-between"
              style={{ width: isFocus && scrollSticky ? '30%' : '100%', transition: 'width 1s' }}
            >
              {scrollSticky ? (
                <>
                  {menuBarRender?.map((element) => (
                    <Grid item key={uuidv4()} data-test={element.dataTest} style={{ height: '100%' }}>
                      <LinkComp
                        className={clsx(
                          styles.link,
                          element.url === getActivePage(element.url) && styles.active,
                          flagStickySearch && !isFocus && styles.labelShowAnimate,
                        )}
                        prefetch={element.prefetch || false}
                        name={isFocus ? '' : element.name}
                        href={getUrl(element.url, element.redirectUrl)} // TODO: check lại redirectUrl
                        color="white"
                        target={element.redirectUrl && '_blank'}
                        key={uuidv4()}
                        onClick={(e) => {
                          handleCheck(e, element.tracking);
                          gtag.clickMenubar(element);
                        }}
                        data-test={`${mapDataTestLink[element?.name] || null}`}
                      >
                        {/* {element.isNew && <span className={styles.badge}>Mới</span>} */}
                        {element?.icon && (
                          <Box className={styles.menuIcons}>
                            {element.icon.startsWith('/') ? (
                              <ImageFallbackStatic
                                width={element.width || '20px'}
                                height={element.height || '20px'}
                                src={element.icon}
                                alt={element.name}
                                layout="fixed"
                              />
                            ) : (
                              <ImageFallback
                                width={element.width || '20px'}
                                height={element.height || '20px'}
                                src={element.icon}
                                alt={element.name}
                                layout="fixed"
                              />
                            )}
                          </Box>
                        )}
                      </LinkComp>
                    </Grid>
                  ))}
                </>
              ) : (
                <>
                  {menuBarRender?.map((element) => (
                    <Grid item key={uuidv4()} data-test={element.dataTest} style={{ height: '100%' }}>
                      <LinkComp
                        className={clsx(styles.link, element.url === getActivePage(element.url) && styles.active)}
                        prefetch={element.prefetch || false}
                        name={element.name}
                        href={getUrl(element.url, element.redirectUrl)}
                        color="white"
                        target={element.redirectUrl && '_blank'}
                        key={uuidv4()}
                        onClick={(e) => {
                          handleCheck(e, element.tracking);
                          gtag.clickMenubar(element);
                        }}
                        // data-test={`${mapDataTestLink[element?.name] || null}`}
                      >
                        {element?.icon && (
                          <Box className={styles.menuIcons}>
                            {element.icon.startsWith('/') ? (
                              <ImageFallbackStatic
                                width={element.width || '20px'}
                                height={element.height || '20px'}
                                src={element.icon}
                                alt={element.name}
                                layout="fixed"
                              />
                            ) : (
                              <ImageFallback
                                width={element.width || '20px'}
                                height={element.height || '20px'}
                                src={element.icon}
                                alt={element.name}
                                layout="fixed"
                              />
                            )}
                          </Box>
                        )}
                      </LinkComp>
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
            {/* off top search for prd */}
            {/* SEARCH PRODUCT */}
            {isAuthenticated && setScrollSticky && (
              <Box
                className={clsx(styles.wrapSticky, checkShowAnimate())}
                style={{ width: scrollSticky && isFocus ? '75%' : '25%', transition: 'width 1s' }}
              >
                <SearchInput
                  className={clsx(styles.SearchInput, isFocus && scrollSticky && styles.scaleSearchInput)}
                  classCustom={styles.hiddenWidth}
                  scrollSticky={scrollSticky}
                />
                <Box className={styles.wrapStickRight}>
                  <Cart className={styles.cartSticky} />
                  <ToggleProfile
                    point={user?.point}
                    balance={user?.balance}
                    level={user?.level}
                    className={styles.profileSticky}
                    classCustom={styles.customProfile}
                  />
                </Box>
              </Box>
            )}
          </Box>
        </Container>
        <TopSearch />
      </Box>
    </>
  );
}
export default memo(Navbar);
