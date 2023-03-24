import { Icon, IconButton, Toolbar } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import { AssignmentTurnedInOutlined, Whatshot } from '@material-ui/icons';
import LanguageIcon from '@material-ui/icons/Language';
import clsx from 'clsx';
import { PRODUCTS_LOADING_URL } from 'constants/Paths';
import { useAuth } from 'context';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Tracking } from 'utils';
import styles from '../styles.module.css';

const FooterWithToolBar = ({ isMobile }) => {
  const router = useRouter();
  const {
    user: { accountID: accountId = '', customerID = '' },
  } = useAuth();
  const handleTracking = (eventActionPath, page) => {
    Tracking.trackingFunc(eventActionPath, { accountId, customerID, page, currentPage: window.location.href, isMobile });
  };
  return (
    <Toolbar className={styles.footerToolbar}>
      <div
        className={clsx(styles.icon, router.pathname === '/products' && styles.active)}
        onClick={() => handleTracking('CLICK_GO_TO_PRODUCTS_PAGE', '/products')}
        role="presentation"
      >
        <Link href={PRODUCTS_LOADING_URL} prefetch={false}>
          <IconButton edge="start" color="inherit">
            <Icon className="icon-product" />
            <span className={styles.text}>Sản phẩm</span>
          </IconButton>
        </Link>
      </div>
      <div
        className={clsx(styles.icon, styles.promo, router.pathname === '/deals' && styles.active)}
        onClick={() => handleTracking('CLICK_GO_TO_CAMPAIGN_PAGE', '/khuyenmai')}
        role="presentation"
      >
        <Link href="/khuyenmai" prefetch={false}>
          <IconButton edge="start" color="inherit">
            <Whatshot />
            <span className={styles.text}>Khuyến mãi</span>
          </IconButton>
        </Link>
      </div>
      <div
        className={clsx(styles.icon_special, router.pathname === '/quick-order' && styles.active)}
        onClick={() => handleTracking('CLICK_GO_TO_QUICKORDER_PAGE', '/quick-order')}
        role="presentation"
      >
        <Link href="/quick-order" prefetch={false}>
          <div className={styles.qordericon}>
            <Fab aria-label="icon-quick-order" className={styles.fabButton}>
              <Icon className="icon-quick-order" />
            </Fab>
            <span className={styles.text}>Đặt nhanh</span>
          </div>
        </Link>
      </div>
      <div className={styles.grow} />
      <div className={clsx(styles.icon, router.pathname === '/my-order' && styles.active)}>
        <Link href="/my-order">
          <IconButton color="inherit">
            <AssignmentTurnedInOutlined />
            <span className={styles.text}>Đơn hàng</span>
          </IconButton>
        </Link>
      </div>
      <div className={clsx(styles.icon, router.pathname === '/discovery' && styles.active)}>
        <Link href="/discovery" as="/discovery">
          <IconButton color="inherit">
            <LanguageIcon />
            <span className={styles.text}>Khám phá</span>
          </IconButton>
        </Link>
      </div>
      {/* <div className={clsx(styles.icon, router.pathname === '/notifications' && styles.active)}>
        <Link href="/notifications" prefetch={false}>
          <IconButton edge="end" color="inherit">
            <Badge badgeContent=" " variant="dot" color="secondary">
              <NotificationsNoneOutlined />
            </Badge>
            <span className={styles.text}>Thông báo</span>
          </IconButton>
        </Link>
      </div> */}
    </Toolbar>
  );
};

export default React.memo(FooterWithToolBar);
