import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Grid, Icon, Switch, Tooltip, Typography } from '@material-ui/core';
import { LiveHelp } from '@material-ui/icons';
import clsx from 'clsx';
import NewCustomModal from 'components/mocules/NewCustomModal';
import { getTrackingData } from 'constants/data';
import {
  FEEDBACK_WHITE,
  LOGOUT_ICON_WHITE_IMG,
  ORDER_WHITE,
  POINTS_WHITE,
  QR_WHITE,
  REFER_WHITE,
  REWARDS_WHITE,
  STATISTICAL_WHITE,
  TRUCK_WHITE,
  USER_WHITE,
  VIEWED_WHITE,
  VOUCHER_WHITE,
  WISHLIST_WHITE,
} from 'constants/Icons';
import { FACEBOOK_ICON, LINKED_ICON, LINK_REGISTER, LOGO_FOOTER_REGISTER, TIKTOK_ICON, ZALO_ICON } from 'constants/Images';
import {
  PATH_TS_FACEBOOK,
  PATH_TS_LINKED,
  PATH_TS_TIKTOK,
  PATH_TS_ZALO,
  PRODUCTS_URL,
  THUOCSI_SUPPORT,
  THUOCSI_SUPPORT_SELLER,
  USER_PROMO_CODES_URL,
} from 'constants/Paths';
import { useAuth, useCart } from 'context';
import { useModal } from 'hooks';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo } from 'react';
import { gtag, Tracking } from 'utils';
import { formatFloatNumber } from 'utils/FormatNumber';
import ImageFallback, { ImageFallbackStatic } from 'utils/ImageFallback';
import { getLinkProxy } from 'utils/ImageUtils';
import { checkTrialSelected } from 'utils/transVersion';
import { useStore } from 'zustand-lib/storeGlobal';
import useMobileV2 from 'zustand-lib/storeMobile';
import { LinkComp } from '../../atoms';
import styles from './styles.module.css';

const SideBar = ({ isMobile }) => {
  const router = useRouter();
  const { logout } = useAuth();
  const user = useStore((state) => state.user);
  const availableDebtBalanceFormated = useStore((state) => state.getAvailableDebtBalance({ isFormated: true, isCurrency: false }));
  const { accountID: accountId = '', customerID = '' } = user || {};
  // const accountingBalance = debt?.accountingBalance || 0;
  const { clearCart } = useCart();
  const [showPoupLogout, toggleLogout] = useModal(false);
  const handleChangeUI = useMobileV2((state) => state.toggleBeta);
  const beta = useMobileV2((state) => state.beta);

  const handleLogout = () => {
    logout(() => {}, { clearAll: true });
    clearCart();
  };
  const getActivePage = () => {
    if (router.pathname === '/products' || router.pathname === '/categories/[slug]' || router.pathname === '/manufacturers/[slug]') {
      return PRODUCTS_URL;
    }
    return router.pathname;
  };

  // TODO: check lại redirectUrl
  const getUrl = (url, redirectUrl) => {
    if (redirectUrl) {
      return redirectUrl;
    }
    return url;
  };

  const handleTrackingSideBarMobile = (tracking) => {
    Tracking.trackingFunc(tracking.action, {
      page: tracking.trackingPath,
      accountId,
      customerID,
      currentPage: window.location.href,
      isMobile,
    });
  };

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

  return (
    <nav className={styles.sidebar_content}>
      <div className={styles.sidebar__user}>
        <div className={styles.sidebar__user_wallet}>
          <Tooltip title="Hạn mức công nợ còn lại mà khách hàng có thể sử dụng.">
            <Typography>Hạn mức (đ)</Typography>
          </Tooltip>
          <div className={styles.sidebar__user_wallet_amount}>{availableDebtBalanceFormated || 0}</div>
        </div>
        <div className={styles.sidebar__user_avatar}>
          <Image className="header_user_avatar_image" src="/images/avatar/user_avatar_default.svg" width={64} height={64} />
        </div>

        <div className={styles.sidebar__user_bonus_point}>
          Điểm thưởng
          <div className={styles.sidebar__user_bonus_point_amount}>{formatFloatNumber(user?.point) || 0}</div>
        </div>
      </div>
      <div className={styles.sidebar__user_name}>
        <b>{user?.name || ''}</b>
      </div>
      <hr className={styles.hr} />
      <ul className={styles.items}>
        <li key="home">
          <LinkComp className={clsx(styles.sidebar__item_link, getActivePage() === '/' && styles.active)} name="Trang chủ" href="/" color="white">
            <Icon className="icon-home" />
          </LinkComp>
        </li>
        {menuBarRender.map((item) => (
          <li key={item.id}>
            <LinkComp
              className={clsx(styles.sidebar__item_linkHome, item.url === getActivePage() && styles.activeHome)}
              name={item.name}
              href={getUrl(item.url, item.redirectUrl)} // TODO: check lại redirectUrl
              color="white"
              target={item.eventPage && '_blank'}
              onClick={() => {
                handleTrackingSideBarMobile(item.tracking);
                gtag.clickMenubar(item);
              }}
            >
              {/* {!item.icon && <Icon className={clsx(item.classAwesome, styles.iconClass)} />} */}
              {/* {item.icon && item.icon}
              {item.iconUrl && <Image src={item.iconUrl} height="20px" width="20px" />} */}
              {item?.icon && (
                <Box className={styles.menuIcons}>
                  {item.icon.startsWith('/') ? (
                    <ImageFallbackStatic width={20} height={20} src={item.icon} alt={item.name} />
                  ) : (
                    <ImageFallback width={20} height={20} src={item.icon} alt={item.name} />
                  )}
                </Box>
              )}
              {item.isNew && <div className={styles.badge}>Mới</div>}
            </LinkComp>
          </li>
        ))}
      </ul>
      <hr className={styles.hr} />
      <ul className={styles.items}>
        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, router.pathname === '/my-account' && styles.active)}
            name="Thông tin tài khoản"
            href="/my-account"
            color="white"
          >
            <USER_WHITE className={styles.navIcon} />
          </LinkComp>
        </li>
        {/* {user.level !== 'LEVEL_BLACKLIST' && FEATURE_LEVEL && (
          <li>
            <LinkComp
              className={clsx(styles.sidebar__item_link, router.pathname === '/user/level' && styles.active)}
              name="Thông tin cấp bậc"
              href="/user/level"
              color="white"
            >
              <LEVEL_WHITE className={styles.navIcon} />
            </LinkComp>
          </li>
        )} */}
        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, router.pathname === '/users/loyalty_points' && styles.active)}
            name="Điểm tích lũy"
            href="/users/loyalty_points"
            color="white"
          >
            <POINTS_WHITE className={styles.navIcon} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, router.pathname === '/my-order' && styles.active)}
            name="Đơn hàng của tôi"
            href="/my-order"
            color="white"
          >
            <ORDER_WHITE className={styles.navIcon} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, router.pathname === '/productviewed' && styles.active)}
            name="Sản phẩm đã xem"
            href="/productviewed"
            color="white"
          >
            <VIEWED_WHITE className={styles.navIcon} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, router.pathname === '/user/dashboard' && styles.active)}
            name="Thống kê"
            href="/user/dashboard"
            color="white"
          >
            <STATISTICAL_WHITE className={styles.navIcon} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, router.pathname === '/users/referrals' && styles.active)}
            name="Giới thiệu bạn bè"
            href="/users/referrals"
            color="white"
          >
            <REFER_WHITE className={styles.navIcon} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, router.pathname === USER_PROMO_CODES_URL && styles.active)}
            name="Mã giảm giá của tôi"
            href={USER_PROMO_CODES_URL}
            color="white"
          >
            <VOUCHER_WHITE className={styles.navIcon} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, router.pathname === '/users/my-ticket' && styles.active)}
            name="Phản hồi của tôi"
            href="/users/my-ticket"
            color="white"
          >
            <FEEDBACK_WHITE className={styles.navIcon} />
          </LinkComp>
        </li>

        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, router.pathname === '/tracking-order' && styles.active)}
            name="Tra cứu vận đơn"
            href="/tracking-order"
            color="white"
          >
            <TRUCK_WHITE
              className={styles.navIcon}
              onClick={() => {
                gtag.clickTrackingOrder();
              }}
            />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, router.pathname === '/qr' && styles.active)}
            name="Tra cứu mã QR"
            href="/qr"
            color="white"
          >
            <QR_WHITE className={styles.navIcon} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, router.pathname === '/user/wishlist' && styles.active)}
            name="Sản phẩm quan tâm"
            href="/user/wishlist"
            color="white"
          >
            <WISHLIST_WHITE className={styles.navIcon} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, router?.pathname?.indexOf('/users/rewards') >= 0 && styles.active)}
            name="Chương trình trả thưởng"
            href="/users/rewards"
            color="white"
          >
            <REWARDS_WHITE className={styles.navIcon} />
          </LinkComp>
        </li>
        <li>
          <div onClick={toggleLogout} role="presentation" className={styles.sidebar__item_link}>
            {/* <FontAwesomeIcon className={styles.navIcon} icon={faSignOutAlt} /> */}
            <LOGOUT_ICON_WHITE_IMG />
            <p className="MuiTypography-root MuiTypography-body2">Đăng xuất</p>
          </div>
        </li>
      </ul>
      <hr className={styles.hr} />
      {(process.env.NEXT_PUBLIC_ENV !== 'prd' || checkTrialSelected(user)) && (
        <>
          <ul className={styles.items}>
            <li>
              <Box component="div">
                <Grid component="label" container alignItems="center" spacing={1}>
                  <Grid item>
                    <Switch checked={beta} onChange={handleChangeUI} name="checkedMobileNew" />
                  </Grid>
                  <Grid item>
                    <Typography className={styles.beta} component="div">
                      Giao diện mới
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </li>
          </ul>
          <hr className={styles.hr} />
        </>
      )}

      <h4 className={styles.sidebar__header}>Liên hệ</h4>
      <ul className={styles.items}>
        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, router.pathname === '/customer-support' && styles.active)}
            name="Hỗ trợ khách hàng"
            href="/customer-support"
            color="white"
          >
            <FontAwesomeIcon style={{ marginRight: '20px' }} className={styles.navIcon} icon={faInfoCircle} />
          </LinkComp>
        </li>
        {/* <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, router.pathname === '/faq' && styles.active)}
            name="Câu hỏi thường gặp"
            href="/faq"
            color="white"
          >
            <Icon className={`icon-help ${styles.navIcon}`} />
          </LinkComp>
        </li> */}
        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, router.pathname === '/faq' && styles.active)}
            name="Câu hỏi nhà thuốc"
            href={THUOCSI_SUPPORT}
            color="white"
          >
            <Icon className={`icon-help ${styles.navIcon}`} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, router.pathname === '/faq-seller' && styles.active)}
            name="Câu hỏi người bán hàng"
            href={THUOCSI_SUPPORT_SELLER}
            color="white"
          >
            <LiveHelp className={`icon-help ${styles.navIcon}`} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, router.pathname === '/customer-support' && styles.active)}
            name="hotro@thuocsi.vn"
            href="mailto:hotro@thuocsi.vn"
            color="white"
          >
            <Icon className={`icon-mail ${styles.navIcon}`} />
          </LinkComp>
        </li>
        {/* <li>
          <LinkComp
            className={clsx(
              styles.sidebar__item_link,
              router.pathname === '/contact_us' && styles.active,
            )}
            name="02 873 008 840"
            href="tel:02873008840"
            color="white"
          >
            <Icon className={`icon-phone ${styles.navIcon}`} />
          </LinkComp>
        </li> */}
      </ul>
      <hr className={styles.hr} />
      <h4 className={styles.sidebar__header}>Kết nối với chúng tôi</h4>
      <ul className={styles.items}>
        <Box className={styles.TitleConnect}>
          <Box className={styles.connectIcon}>
            <Link href={PATH_TS_FACEBOOK} passHref>
              <a href={PATH_TS_FACEBOOK}>
                <ImageFallbackStatic src={FACEBOOK_ICON} height="20px" width="20px" alt="facebook-connect" />
              </a>
            </Link>
          </Box>
          <Box className={styles.connectIcon}>
            <Link href={PATH_TS_ZALO} passHref>
              <a href={PATH_TS_ZALO}>
                <ImageFallbackStatic src={ZALO_ICON} height="20px" width="20px" alt="zalo-connect" />
              </a>
            </Link>
          </Box>
          <Box className={styles.connectIcon}>
            <Link href={PATH_TS_LINKED} passHref>
              <a href={PATH_TS_LINKED}>
                <ImageFallbackStatic src={LINKED_ICON} height="20px" width="20px" alt="linked-connect" />
              </a>
            </Link>
          </Box>
          <Box className={styles.connectIcon}>
            <Link href={PATH_TS_TIKTOK} passHref>
              <a href={PATH_TS_TIKTOK}>
                <ImageFallbackStatic src={TIKTOK_ICON} height="20px" width="20px" alt="tiktok-connect" />
              </a>
            </Link>
          </Box>
        </Box>
      </ul>
      <div className={styles.contact_more}>
        {/* <div className={styles.open_hours}>Từ T2 đến T6: 8:00 - 18:00</div> */}
        {/* <a className={styles.fb} href="https://www.facebook.com/thuocsivn/" rel="noreferrer" target="_blank">
          <Facebook fontSize="large" />
        </a> */}
        <a href={LINK_REGISTER} target="_blank" rel="noreferrer">
          <div className={styles.mt2}>
            <ImageFallbackStatic src={LOGO_FOOTER_REGISTER} width="133" height="49" />
          </div>
        </a>
      </div>
      <NewCustomModal
        visible={showPoupLogout}
        onClose={toggleLogout}
        title="Xin xác nhận"
        content="Bạn có chắc muốn đăng xuất?"
        btnOk="Có"
        onClickOk={handleLogout}
        btnOnClose="Không"
      />
    </nav>
  );
};

export default memo(SideBar);
