import { Badge, Box, Container, Divider, Fade, IconButton, Menu, Tooltip, Typography } from '@material-ui/core';
import { AccountCircleOutlined, CreateOutlined, Done, WatchLater } from '@material-ui/icons';
import clsx from 'clsx';
import Button from 'components-v2/atoms/ButtonV2';
import SearchInput from 'components-v2/mocules/SearchInput';
import ToggleProfile from 'components-v2/mocules/ToggleProfile';
import { LinkComp } from 'components/atoms';
import { AvatarStatic } from 'components/atoms/ImageStatic';
import { ENUM_TRACKING_ACTION } from 'constants/Enums';
import {
  AVATARV2_ICON_IMAGE,
  BRAND_LOGO_SVG,
  CAREERV2_ICON,
  CARTV2_ICON,
  HOMEV2_ICON,
  NEWSV2_ICON,
  NOTICEV2_ICON,
  PHAN_HOI_ICON,
} from 'constants/Images';
import { CART_URL, MY_ACCOUNT, PATH_CAREER, PATH_NEWS } from 'constants/Paths';
import { useAuth, useCart, useNotify } from 'context';
import React, { memo } from 'react';
import { DOMAIN_FEEDBACK, DOMAIN_SELLER_CENTER } from 'sysconfig';
import { DateTimeUtils, gtag, Tracking } from 'utils';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from 'zustand-lib/storeGlobal';
import CountDownBar from './CountDownBar';
import styles from './styles.module.css';

const Logo = memo(() => (
  <LinkComp href="/" prefetch id="logo-thuocsi">
    <Box className={styles.logo}>
      <ImageFallbackStatic id="logo-thuocsi" href="/" src={BRAND_LOGO_SVG} width="127px" height="22px" quality={100} layout="fixed" />
    </Box>
  </LinkComp>
));

const SearchInputHeader = memo(() => <SearchInput className={styles.SearchInput} />);

const HeadericonRight = memo((props) => {
  const { isMobile } = props;
  const { notification, unread: unreadNotification, markAll, markReadByCode } = useNotify();
  const { totalQuantity } = useCart();
  const { reloadDataCustomer } = useAuth();
  const user = useStore((state) => state.user);
  const { accountID: accountId = '', customerID = '' } = user || {};
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget);
    reloadDataCustomer();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // TRACKING CART
  const handleTrackingCartPage = () => {
    const { href } = window.location;
    Tracking.trackingFunc(ENUM_TRACKING_ACTION.CLICK_GO_TO_CART_PAGE, {
      accountId,
      customerID,
      page: '/cart',
      currentPage: href,
      isMobile,
    });
  };

  return (
    <Box className={styles.headerIconLogged}>
      <Box className={styles.headerStatus}>
        <Menu
          id="simple-menu"
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          getContentAnchorEl={null}
          TransitionComponent={Fade}
          elevation={0}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          classes={{ paper: styles.notifyWrap }}
        >
          <Box className={styles.notifyWrap}>
            <Box className={styles.notifyContentTop}>
              <Box>
                <Typography className={styles.notifyTitle} variant="h5">
                  Thông báo
                </Typography>
                {unreadNotification === 0 && <Typography className={styles.notifyStatus}>Hiện tại bạn không có thông báo.</Typography>}
              </Box>
              {notification.length !== 0 && (
                <Box>
                  <IconButton className={styles.markAll} onClick={() => markAll()}>
                    <Done />
                  </IconButton>
                </Box>
              )}
            </Box>
            <Divider />
            {notification.length > 0 &&
              notification?.map((item) => (
                <LinkComp
                  key={uuidv4()}
                  onClick={() => markReadByCode(item.code)}
                  href={item.link}
                  className={item.isRead ? clsx(styles.notificationsItem, styles.read) : clsx(styles.notificationsItem, styles.unRead)}
                >
                  <Box className={styles.notifyIcon}>
                    <i className={`icomoon icon-loyalty + ${styles.icon}`} />
                  </Box>
                  <Box className={styles.notifyContent}>
                    <Box className={styles.notifyContentTitle}>{item.title}</Box>
                    <Box className={styles.notifyContentDescription}>{item.description}</Box>
                    <Typography className={styles.createdAt}>
                      <WatchLater style={{ marginRight: '4px' }} />
                      {DateTimeUtils.getTimeAgo(item.createdTime)}
                    </Typography>
                  </Box>
                  <Divider />
                </LinkComp>
              ))}
            {notification.length > 0 && (
              <Box style={{ padding: '8px' }}>
                <LinkComp className={styles.viewAll} href="/notifications" prefetch>
                  <Typography display="inline" className={styles.viewAllTitle}>
                    Xem tất cả
                  </Typography>
                </LinkComp>
              </Box>
            )}
          </Box>
        </Menu>
        <Tooltip title="Thông báo" arrow>
          <Badge
            color="secondary"
            badgeContent={unreadNotification}
            invisible={unreadNotification === 0}
            className={styles.badge}
            overlap="rectangular"
          >
            <Box className={styles.notice} onClick={handleClick}>
              <ImageFallbackStatic src={NOTICEV2_ICON} layout="fixed" width="21px" height="23px" />
            </Box>
          </Badge>
        </Tooltip>
        <LinkComp href={CART_URL} className={styles.cartLink} onClick={handleTrackingCartPage}>
          <Tooltip title="Giỏ hàng" arrow>
            <Badge
              badgeContent={totalQuantity}
              max={1000}
              // invisible={totalQuantity === 0}
              color="secondary"
              overlap="rectangular"
              data-test="cart-num"
            >
              <Box className={styles.cart} data-test="cart-link">
                <ImageFallbackStatic src={CARTV2_ICON} layout="fixed" width="22px" height="25px" />
              </Box>
            </Badge>
          </Tooltip>
        </LinkComp>
      </Box>
      <Box className={styles.profile}>
        <LinkComp href={MY_ACCOUNT}>
          <Tooltip title="Thông tin tài khoản" arrow>
            <Box className={styles.avatar}>
              <AvatarStatic src={AVATARV2_ICON_IMAGE} width={100} className={styles.avatarIcon} />
            </Box>
          </Tooltip>
        </LinkComp>
        {/* name of avatar when logged into web */}
        <Box className={styles.profile_name}>
          <Typography>{props.user?.name || ''}</Typography>
        </Box>
        <ToggleProfile point={props.point} level={props.level} />
      </Box>
    </Box>
  );
});

const HeaderTop = memo(({ isAuthenticated }) => (
  <Box className={styles.headerTop}>
    <Container className={styles.headerTop_wrapper} style={{ maxWidth: '1352px' }}>
      <Box className={styles.headerTopLink}>
        <LinkComp
          name="Hỗ trợ"
          href={isAuthenticated ? '/users/my-ticket' : DOMAIN_FEEDBACK}
          target
          onClick={() => gtag.viewBlog()}
          className={styles.headerTopLink_content}
        >
          <ImageFallbackStatic src={PHAN_HOI_ICON} layout="fixed" width="16px" height="16px" />
          {/* <ContactSupport fontSize="small" style={{ fontSize: ' 16px', color: '#212b8d' }} /> */}
        </LinkComp>
      </Box>

      <Box className={styles.headerTopLink}>
        <LinkComp name="Tin tức" href={PATH_NEWS} target onClick={() => gtag.viewBlog()} className={styles.headerTopLink_content}>
          <ImageFallbackStatic src={NEWSV2_ICON} layout="fixed" width="12px" height="10px" />
        </LinkComp>
      </Box>

      <Box className={styles.headerTopLink}>
        <LinkComp name="Tuyển dụng" href={PATH_CAREER} target onClick={() => gtag.viewCareer()} className={styles.headerTopLink_content}>
          <ImageFallbackStatic src={CAREERV2_ICON} layout="fixed" width="14px" height="10px" />
        </LinkComp>
      </Box>

      <Box className={styles.headerTopLink}>
        <LinkComp
          name="Đăng ký bán hàng"
          href={DOMAIN_SELLER_CENTER}
          target
          onClick={() => gtag.viewSeller()}
          className={clsx(styles.headerTopLink_content, styles.iconTopSeller)}
        >
          <ImageFallbackStatic src={HOMEV2_ICON} layout="fixed" width="11px" height="11px" />
        </LinkComp>
      </Box>
    </Container>
  </Box>
));

const Header = memo(({ balance = 0, isMobile }) => {
  const { user, isAuthenticated, toggleLogin, toggleSignUp } = useAuth();
  // const getHostName = useStore((state) => state.getHostName);
  // const hostname = getHostName();
  return (
    <div>
      <HeaderTop isAuthenticated={isAuthenticated} />
      <Box className={styles.headerCenter}>
        <CountDownBar />
        <Container className={styles.headerCenter_wrapper} style={{ maxWidth: '1352px' }}>
          <Logo />
          {!isAuthenticated ? (
            <Box className={styles.headerCenter_Status}>
              <Button
                data-test="btn-signup"
                className={styles.buttonStyle}
                onClick={toggleSignUp}
                startIcon={<CreateOutlined />}
                hoverColor="#0cba69"
                disableRipple
              >
                Đăng Ký
              </Button>
              <Button
                data-test="btn-signin"
                className={styles.buttonStyle}
                onClick={toggleLogin}
                startIcon={<AccountCircleOutlined />}
                hoverColor="#0cba69"
                disableRipple
              >
                Đăng Nhập
              </Button>
            </Box>
          ) : (
            <>
              <SearchInputHeader />
              <HeadericonRight balance={balance} point={user?.point} level={user?.level} user={user} isMobile={isMobile} />
            </>
          )}
        </Container>
      </Box>
    </div>
  );
});

export default Header;
