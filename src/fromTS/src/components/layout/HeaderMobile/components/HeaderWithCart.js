import { Badge, IconButton } from '@material-ui/core';
import { NotificationsNoneOutlined, Search, ShoppingCart } from '@material-ui/icons';
import { LinkComp } from 'components/atoms';
import { ENUM_TRACKING_ACTION } from 'constants/Enums';
import { CART_URL, NOTIFICATIONS, QUICK_ORDER } from 'constants/Paths';
import { useAuth, useCart, useNotify } from 'context';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo } from 'react';
import { Tracking } from 'utils';
import styles from '../styles.module.css';

const HeaderWithCart = memo(({ isMobile }) => {
  const { totalQuantity } = useCart();
  const {
    user: { accountID: accountId = '', customerID = '' },
  } = useAuth();
  const router = useRouter();
  const { unread: unreadNotification } = useNotify();

  // tracking cart page mobile
  const handleClickCartPage = () => {
    Tracking.trackingFunc(ENUM_TRACKING_ACTION.CLICK_GO_TO_CART_PAGE, {
      accountId,
      customerID,
      page: '/cart',
      currentPage: window.location.href,
      isMobile,
    });
  };
  return (
    <div className={styles.headerWithCart}>
      <div className={styles.rSection}>
        <Link href={QUICK_ORDER} prefetch={false}>
          <IconButton className={styles.icon} aria-label="search">
            <Search />
          </IconButton>
        </Link>
        {router.pathname !== CART_URL && router.pathname !== NOTIFICATIONS && (
          <LinkComp className={styles.navBarRightLink} href={NOTIFICATIONS} prefetch={false}>
            <IconButton className={styles.notiIcon}>
              <Badge badgeContent={unreadNotification} invisible={unreadNotification === 0} color="secondary" overlap="rectangular">
                <NotificationsNoneOutlined className={styles.rIcon} />
              </Badge>
            </IconButton>
          </LinkComp>
        )}
        {router.pathname !== CART_URL && (
          <LinkComp className={styles.navBarRightLink} href={CART_URL} prefetch={false} onClick={handleClickCartPage}>
            <IconButton aria-label="cart">
              <Badge
                badgeContent={totalQuantity || 0}
                invisible={false}
                max={1000}
                color="secondary"
                className={styles.badgeCart}
                overlap="rectangular"
              >
                <ShoppingCart className={styles.rIcon} />
              </Badge>
            </IconButton>
          </LinkComp>
        )}
      </div>
    </div>
  );
});

export default HeaderWithCart;
