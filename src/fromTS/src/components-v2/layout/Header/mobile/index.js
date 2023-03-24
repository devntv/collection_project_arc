import { Container, Grid, IconButton, Switch, Typography } from '@material-ui/core';
import clsx from 'clsx';
import MobileModal from 'components-v2/atoms/MobileModal';
// import MobileButtonFollow from 'components-v2/mocules/ButtonFollow';
import { ButtonHeader, LinkComp } from 'components/atoms';
import { BRAND_NAME } from 'constants/Enums';
import { BRAND_LOGO_SVG } from 'constants/Images';
import { ICON_MOBILE_ICON_BACK } from 'constants/Images/mobile/Icons';
import {
  DISCOVERY,
  HOME_PAGE,
  INGREDIENT,
  KHUYEN_MAI,
  KHUYEN_MAI_LOADING,
  MY_ACCOUNT,
  // PRODUCTS_URL,
  QUICK_ORDER,
  SELLERS,
  SELLERS_LOADING_URL,
} from 'constants/Paths';
import { useAuth } from 'context';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { memo, useState } from 'react';
import { routeHandler } from 'utils';
import { checkNewUser } from 'utils/transVersion';
import useMobileV2 from 'zustand-lib/storeMobile';
import HeaderIconButton from './HeaderIconButton';
import styles from './styles.module.css';

const LinkLogo = memo(() => (
  <LinkComp href="/">
    <Image className={styles.logo} href="/" src={BRAND_LOGO_SVG} width="127px" height="22px" />
  </LinkComp>
));

const ROUTES_BACK_HARDCODE = [
  {
    pathname: '/flagship-store/[slug]/list-product',
    backTo: SELLERS,
  },
  {
    pathname: '/flagship-store/[slug]/flagship-rewards',
    backTo: SELLERS,
  },
  {
    pathname: '/flagship-store/[slug]',
    backTo: SELLERS,
  },
];

const HeaderIconRight = memo(({ renderRightIcons }) => {
  // const router = useRouter();

  const [isSearch, setSearch] = useState(false);
  const { user, isAuthenticated, toggleLogin } = useAuth();
  // temporary hide for demo
  // const mobileProductScrolling = useMobileV2((state) => state.mobileProductScrolling);
  // const handleChangeDisplayProduct = useMobileV2((state) => state.toggleMobileProductScrolling);
  // const isProduct = router.pathname === PRODUCTS_URL;

  return (
    <>
      {isAuthenticated ? (
        <>
          {user && (
            <div className={styles.rightIcon}>
              {/* Temporary hide for demo */}
              {/* {isProduct && (
            <Box className={styles.mobileDisplay_switcher} sx={{ display: 'flex', alignItems: 'center' }}>
              <Switch checked={mobileProductScrolling} onChange={handleChangeDisplayProduct} name="checkedMobileDisplayPaging" color="primary" />
              <Typography>InfiniteScroll</Typography>
            </Box>
          )} */}
              {/* render list icon right on header */}
              <HeaderIconButton {...renderRightIcons} />
            </div>
          )}
          <MobileModal isShowModal={isSearch} setShowModal={setSearch} isSearch />
        </>
      ) : (
        <ButtonHeader id="loginMobile" variant="contained" btnType="warning" onClick={toggleLogin}>
          Đăng nhập
        </ButtonHeader>
      )}
    </>
  );
});

const LeftContent = ({ isBottomNavigation, router, pageTitle, handleChangeUI, beta, user }) => {
  const handleBackRouting = () => {
    const routes = ROUTES_BACK_HARDCODE.filter((route) => route.pathname === router.pathname);
    // handle hard code back
    if (routes.length === 1) {
      router.replace(routes[0].backTo);
      return;
    }
    router.back();
  };

  if (!isBottomNavigation) {
    return (
      <div className={styles.containerLeftContent}>
        <IconButton onClick={handleBackRouting} classes={{ root: styles.btnBack }}>
          <ICON_MOBILE_ICON_BACK width={20} height={20} />
        </IconButton>
        <div>
          <h4 className={clsx(styles.titleHeader, pageTitle.includes(BRAND_NAME) && styles.lowercase)}>{pageTitle}</h4>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex' }}>
      <LinkLogo />
      {!checkNewUser(user?.account?.createdTime) && (
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>
              <Switch checked={beta} onChange={handleChangeUI} name="checkedMobileNew" color="primary" />
            </Grid>
          </Grid>
        </Typography>
      )}
    </div>
  );
};

const HomeHeader = memo(({ pageTitle, renderRightIcons, CustomRightHeader, offIconRight, user }) => {
  const handleChangeUI = useMobileV2((state) => state.toggleBeta);
  const beta = useMobileV2((state) => state.beta);
  const router = useRouter();
  const listPageShowIcon = [HOME_PAGE, KHUYEN_MAI, DISCOVERY, KHUYEN_MAI_LOADING, SELLERS_LOADING_URL, MY_ACCOUNT];
  const isBottomNavigation = routeHandler.isBottomNavigation(router);
  const isShowAccount = listPageShowIcon.includes(router.pathname);

  return (
    <div className={styles.headerContainer}>
      <div style={{ flex: 1 }}>
        <LeftContent
          isBottomNavigation={isBottomNavigation}
          router={router}
          pageTitle={pageTitle}
          handleChangeUI={handleChangeUI}
          beta={beta}
          user={user}
        />
      </div>

      <div className={styles.rightContent}>
        {!CustomRightHeader && !offIconRight && <HeaderIconRight isAccount={isShowAccount} renderRightIcons={renderRightIcons} />}
        {CustomRightHeader && CustomRightHeader}
      </div>
    </div>
  );
});

// main component
const HeaderMobile = memo(({ title, renderRightIcons, CustomRightHeader, offIconRight, isAuthenticated, user }) => {
  const { pathname, query } = useRouter();
  const isChatPage = pathname === '/conversations';
  const MappingPageTitle = () => {
    if (pathname === SELLERS || pathname === SELLERS_LOADING_URL) {
      if (query.type === 'flagship') {
        return 'Hàng hãng';
      }
      if (query.type === 'all') {
        return 'Danh sách nhà bán hàng';
      }

      return 'Nhà Bán Hàng';
    }
    if (pathname === QUICK_ORDER) {
      return 'Đặt Hàng Nhanh';
    }
    if (pathname === '/tracking-order') {
      return 'Tra Cứu Vận Đơn';
    }
    if (pathname === '/user/dashboard') {
      return 'Thống Kê Đơn Hàng';
    }
    if (pathname === '/users/referrals') {
      return 'Giới Thiệu Bạn Bè';
    }
    if (pathname === '/user/wishlist') {
      return 'Sản Phẩm Quan Tâm';
    }
    if (pathname === '/qr') {
      return 'Tra Cứu Thông Tin Sản Phẩm';
    }
    if (pathname === '/users/my-ticket') {
      return 'Phản Hồi Của Tôi';
    }
    if (pathname === '/users/rewards') {
      return 'Chương trình trả thưởng';
    }
    if (pathname === '/khuyenmai/[slug]') {
      return 'Khuyến mãi';
    }
    if (pathname === '/product/[slug]/loading') {
      return 'Sản Phẩm';
    }
    if (
      pathname === '/seller/[slug]' ||
      pathname === '/flagship-store/sanofi' ||
      pathname === '/flagship-store/durex' ||
      pathname === '/flagship-store/sanofi/list-product' ||
      pathname === '/flagship-store/durex/list-product' ||
      pathname === '/flagship-store/[slug]/list-product' ||
      pathname === '/seller/[slug]/list-product' ||
      pathname === '/flagship-store/[slug]' ||
      pathname === '/flagship-store/[slug]/flagship-rewards'
    ) {
      switch (query.type) {
        case 'khuyenmai':
          return 'Sản phẩm khuyến mãi';
        case 'new':
          return 'Sản phẩm mới';
        case 'fav':
          return 'Sản phẩm nổi bật';
        case 'all-product':
          return 'Danh sách sản phẩm';
        default:
          return 'Thông tin cửa hàng';
      }
    }
    if (pathname === INGREDIENT) {
      return 'Hoạt chất';
    }

    return title;
  };
  const RenderHeader = () => (
    <HomeHeader
      pageTitle={MappingPageTitle()}
      renderRightIcons={renderRightIcons}
      CustomRightHeader={CustomRightHeader}
      offIconRight={offIconRight}
      isAuthenticated={isAuthenticated}
      user={user}
    />
  );
  return (
    <div id="mobileHeader_wrapper" className={clsx(styles.headerMobile, isChatPage && styles.removeBoxShadow)}>
      <Container className={styles.headerTop_wrapper}>{RenderHeader()}</Container>
    </div>
  );
});

export default HeaderMobile;
