import { Box } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import NewCustomModal from 'components/mocules/NewCustomModal';
import { MENUS_SUPPORT, MENUS_USER_INFO, MENUS_UTIL } from 'constants/data/mobile';
import {
  ICON_MOBILE_ICON_RANK_DIAMOND,
  ICON_MOBILE_ICON_RANK_GOLD,
  ICON_MOBILE_ICON_RANK_PLATIUM,
  ICON_MOBILE_ICON_RANK_SILVER,
  ICON_MOBILE_ICON_TS_POINT,
  ICON_MOBILE_ICON_WALLET,
} from 'constants/Icons';
import { FACEBOOK_ICON, LINKED_ICON, LINK_REGISTER, TIKTOK_ICON, URL_LICENSE, ZALO_ICON } from 'constants/Images';
import { SIGN_OUT_ICON } from 'constants/Images/mobile';
import { PATH_TS_FACEBOOK, PATH_TS_LINKED, PATH_TS_TIKTOK, PATH_TS_ZALO } from 'constants/Paths';
import { useAuth, useCart } from 'context';
import { useModal } from 'hooks';
import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency, formatFloatNumber } from 'utils/FormatNumber';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import { checkTrialSelected } from 'utils/transVersion';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from './styles.module.css';

const ListContentAccountV2 = ({ user }) => {
  const [showPoupLogout, toggleLogout] = useModal(false);
  const { clearCart } = useCart();
  const { logout } = useAuth();
  const removeCookies = useMobileV2((state) => state.removeCookies);
  const renderUserLevel = () => {
    let levelName = '';
    let levelIcon = '';
    switch (user?.level) {
      case 'LEVEL_SILVER':
        levelName = 'Thành viên bạc';
        levelIcon = <ICON_MOBILE_ICON_RANK_SILVER />;
        break;
      case 'LEVEL_GOLD':
        levelName = 'Thành viên vàng';
        levelIcon = <ICON_MOBILE_ICON_RANK_GOLD />;
        break;
      case 'LEVEL_PLATIUM':
        levelName = 'Thành viên bạch kim';
        levelIcon = <ICON_MOBILE_ICON_RANK_PLATIUM />;
        break;
      case 'LEVEL_DIAMOND':
        levelName = 'Thành viên kim cương';
        levelIcon = <ICON_MOBILE_ICON_RANK_DIAMOND />;
        break;
      default:
        break;
    }
    return (
      <Box display="flex" alignItems="center" gridGap={4}>
        <span style={{ width: 16, height: 16 }}>{levelIcon}</span>
        {levelName}
      </Box>
    );
  };
  const ItemMenu = ({ name, href = '', srcIcon }) => (
    <li>
      <LinkComp className={clsx(styles.sidebar__item_link)} name={name} href={href} color="black">
        <ImageFallbackStatic src={srcIcon} width="24" height="24" />
        <ChevronRightIcon className={styles.iconArrow_right} />
      </LinkComp>
    </li>
  );
  const handleLogout = () => {
    logout(() => {}, { clearAll: true });
    clearCart();
    if (!checkTrialSelected(user)) {
      removeCookies();
    }
  };
  return (
    <div className={styles.modalContent_container}>
      <nav className={styles.sidebar_content}>
        <Box style={{ margin: '15px', borderRadius: '12px' }} bgcolor="white">
          <div className={styles.sidebar__user_container}>
            <div className={styles.sidebar__user_avatar}>
              <Image className="header_user_avatar_image" src="/images/avatar/user_avatar_default.svg" width={64} height={64} />
            </div>
            <div className={styles.sidebar__user_name}>{user?.name || ''}</div>
            <div className={styles.sidebar__user_tier}>{renderUserLevel()}</div>
          </div>
          <div className={styles.sidebar__point_container}>
            <div className={styles.sidebar_user_waller}>
              <>
                <ICON_MOBILE_ICON_WALLET />
                <Tooltip title="Hạn mức công nợ còn lại mà khách hàng có thể sử dụng." enterTouchDelay={0}>
                  <span className={styles.unit}>{formatCurrency(user?.debt?.balance)}</span>
                </Tooltip>
              </>
            </div>
            <div className={styles.divine_line} />
            <div className={styles.sidebar_user_bonus_point}>
              <ICON_MOBILE_ICON_TS_POINT />
              <span className={styles.unit}>{formatFloatNumber(user?.point) || 0}</span>
            </div>
          </div>
        </Box>
        <ul className={styles.items}>
          <h4 className={styles.sidebar__header}>Thông Tin Tài Khoản</h4>
          {MENUS_USER_INFO.map((item) => (
            <ItemMenu key={item?.href} name={item?.name} href={item?.href} srcIcon={item?.srcIcon} />
          ))}
        </ul>
        <ul className={styles.items}>
          <h4 className={styles.sidebar__header}>Tiện ích</h4>
          {MENUS_UTIL.map((item) => (
            <ItemMenu key={item?.href} name={item?.name} href={item?.href} srcIcon={item?.srcIcon} />
          ))}
        </ul>
        <ul className={styles.items}>
          <h4 className={styles.sidebar__header}>Hỗ trợ</h4>
          {MENUS_SUPPORT.map((item) => (
            <ItemMenu key={item?.href} name={item?.name} href={item?.href} srcIcon={item?.srcIcon} />
          ))}
          <li>
            <div onClick={toggleLogout} role="presentation" className={styles.sidebar__item_link}>
              <ImageFallbackStatic src={SIGN_OUT_ICON} width="24" height="24" />
              <p className="MuiTypography-root MuiTypography-body2">Đăng xuất</p>
            </div>
          </li>
        </ul>
        <ul className={styles.items}>
          <h4 className={styles.sidebar__header}>Kết Nối Với Chúng Tôi</h4>
          <Box className={styles.boxConnect}>
            <Box className={styles.connectIcon}>
              <Link href={PATH_TS_FACEBOOK} passHref>
                <a href={PATH_TS_FACEBOOK} target="_blank" rel="noreferrer">
                  <ImageFallbackStatic src={FACEBOOK_ICON} layout="fixed" height="20px" width="20px" alt="facebook-connect" />
                </a>
              </Link>
            </Box>
            <Box className={styles.connectIcon}>
              <Link href={PATH_TS_ZALO} passHref>
                <a href={PATH_TS_ZALO} target="_blank" rel="noreferrer">
                  <ImageFallbackStatic src={ZALO_ICON} layout="fixed" height="20px" width="20px" alt="zalo-connect" />
                </a>
              </Link>
            </Box>
            <Box className={styles.connectIcon}>
              <Link href={PATH_TS_LINKED} passHref>
                <a href={PATH_TS_LINKED} target="_blank" rel="noreferrer">
                  <ImageFallbackStatic src={LINKED_ICON} layout="fixed" height="20px" width="20px" alt="linked-connect" />
                </a>
              </Link>
            </Box>
            <Box className={styles.connectIcon}>
              <Link href={PATH_TS_TIKTOK} passHref>
                <a href={PATH_TS_TIKTOK} target="_blank" rel="noreferrer">
                  <ImageFallbackStatic src={TIKTOK_ICON} layout="fixed" height="20px" width="20px" alt="tiktok-connect" />
                </a>
              </Link>
            </Box>
            <Box className={styles.license}>
              <Link href={LINK_REGISTER} passHref>
                <a href={LINK_REGISTER}>
                  <ImageFallbackStatic src={URL_LICENSE} width="123px" height="47px" layout="fixed" />
                </a>
              </Link>
            </Box>
          </Box>
        </ul>

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
    </div>
  );
};
export default ListContentAccountV2;
