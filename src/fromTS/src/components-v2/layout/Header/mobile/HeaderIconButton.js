import { Avatar, Grid, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import MobileBadge from 'components-v2/atoms/MobileBadge';
import MobileModal from 'components-v2/atoms/MobileModal';
// import MobileButtonFollow from 'components-v2/mocules/ButtonFollow';
import { AVATARV2_ICON_IMAGE, CARTV2_ICON, NOTICEV2_ICON } from 'constants/Images';
import { ICON_MOBILE_ICON_HOME, ICON_MOBILE_ICON_SEARCH } from 'constants/Images/mobile/Icons';
import { ACCOUNT, CART_URL, HOME_PAGE, QUICK_ORDER } from 'constants/Paths';
import { useCart, useNotify } from 'context';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { ImageFallbackStatic } from 'utils/ImageFallback';

import styles from './styles.module.css';

// const isSellers = [
//   SELLERS,
//   SELLERS_LOADING_URL,
//   // '/seller/[slug]',
//   // '/seller/[slug]/list-product',
//   '/flagship-store/[slug]',
//   '/flagship-store/sanofi/list-product',
//   '/flagship-store/durex/list-product',
//   '/flagship-store/[slug]/list-product',
//   '/flagship-store/[slug]/flagship-rewards',
// ];

const NoPaddingIconBtn = withStyles({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
  },
})(IconButton);

export const defaultOptionsTab = { iconRightHeader: { cart: true, home: true } }; // default options cho các tab có nút back

export const NotifiCation = () => {
  const { unread: unreadNotification } = useNotify();
  const [isShowNoti, setShowNoti] = useState(false);
  const handleCloseModal = useCallback((e) => {
    e.stopPropagation();
    setShowNoti(false);
  }, []);

  return (
    <MobileBadge quantity={unreadNotification} onClick={() => setShowNoti(true)}>
      <MobileModal isShowModal={isShowNoti} closeModal={handleCloseModal} title="Thông Báo" isNotify />
      <div className={styles.notice}>
        <ImageFallbackStatic src={NOTICEV2_ICON} width="21px" height="23px" layout="fixed" />
      </div>
    </MobileBadge>
  );
};

export const Cart = () => {
  const { totalQuantity } = useCart();
  const router = useRouter();
  const handleClickShowCart = () => {
    router.push(CART_URL);
  };
  return (
    <MobileBadge quantity={totalQuantity || 0} handleOnClick={handleClickShowCart}>
      <div className={styles.cart}>
        <ImageFallbackStatic src={CARTV2_ICON} width="22px" height="25px" layout="fixed" />
      </div>
    </MobileBadge>
  );
};

// const Search = () => (
//   <Grid>
//     <NoPaddingIconBtn onClick={() => setSearch(!isSearch)}>
//       <ICON_MOBILE_ICON_SEARCH />
//     </NoPaddingIconBtn>
//     {/* <MobileButtonFollow /> */}
//   </Grid>
// );

export const UserInfo = () => {
  const router = useRouter();
  const handleClickShowAccount = () => {
    router.push(ACCOUNT);
  };
  return (
    <MobileBadge className={styles.badge} isAvartar handleOnClick={handleClickShowAccount}>
      <div className={styles.profile}>
        <div className={styles.avatar}>
          <Avatar src={AVATARV2_ICON_IMAGE} className={styles.avatarIcon} />
        </div>
      </div>
    </MobileBadge>
  );
};

export const SearchToQuickOrder = () => {
  const router = useRouter();
  const handleClickGoToQuickOrder = () => {
    router.push(QUICK_ORDER);
  };
  return (
    <Grid className={styles.mobileHeaderButton_textAlign} onClick={handleClickGoToQuickOrder}>
      <NoPaddingIconBtn>
        <ICON_MOBILE_ICON_SEARCH />
      </NoPaddingIconBtn>
    </Grid>
  );
};

export const Home = () => {
  const router = useRouter();
  const moveToHome = () => {
    router.push(HOME_PAGE);
  };
  return (
    <MobileBadge className={clsx(styles.badge, styles.greenIcon)} onClick={moveToHome}>
      <ICON_MOBILE_ICON_HOME />
    </MobileBadge>
  );
};

const ICONS_WITH_KEYS = {
  notify: <NotifiCation />,
  cart: <Cart />,
  userinfo: <UserInfo />,
  toQuickOrder: <SearchToQuickOrder />,
  home: <Home />,
};

const HeaderIconButton = (listIconRender) => (
  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
    {Object.keys(listIconRender).map((key) => {
      // eslint-disable-next-line react/destructuring-assignment
      const isRender = listIconRender[key];
      // eslint-disable-next-line react/no-array-index-key
      return <React.Fragment key={key}>{isRender ? ICONS_WITH_KEYS[key] : <></>}</React.Fragment>;
    })}
  </div>
);

export default HeaderIconButton;
