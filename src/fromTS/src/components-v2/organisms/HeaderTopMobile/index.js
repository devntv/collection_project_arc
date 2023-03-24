import { Badge, Box, Container, Divider, Fade, IconButton, Menu, Tooltip, Typography } from '@material-ui/core';
import { ContactSupport, Done, WatchLater } from '@material-ui/icons';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import { BRAND_LOGO_SVG, CAREERV2_ICON, HOMEV2_ICON, NEWSV2_ICON, NOTICEV2_ICON } from 'constants/Images';
import { PATH_CAREER, PATH_NEWS } from 'constants/Paths';
import { useNotify } from 'context';
import Image from 'next/image';
import React from 'react';
import { DOMAIN_FEEDBACK, DOMAIN_SELLER_CENTER } from 'sysconfig';
import { DateTimeUtils, gtag } from 'utils';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const Logo = React.memo(() => (
  <LinkComp href="/" prefetch>
    <Box className={styles.logo}>
      <ImageFallbackStatic href="/" src={BRAND_LOGO_SVG} width="127px" height="22px" />
    </Box>
  </LinkComp>
));

function HeaderTopMobile() {
  const { notification, unread: unreadNotification, markAll, markReadByCode } = useNotify();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box className={styles.headerTop}>
        <Container className={styles.headerTop_wrapper} style={{ maxWidth: '1304px' }}>
          <Box className={styles.headerTopLink}>
            <LinkComp name="Hỗ trợ" href={DOMAIN_FEEDBACK} target onClick={() => gtag.viewBlog()} className={styles.headerTopLink_content}>
              {/* <Image src={NEWSV2_ICON} width="12px" height="10px" /> */}
              <ContactSupport fontSize="small" style={{ fontSize: ' 16px', color: '#212b8d' }} />
            </LinkComp>
          </Box>

          <Box className={styles.headerTopLink}>
            <LinkComp name="Tin tức" href={PATH_NEWS} target onClick={() => gtag.viewBlog()} className={styles.headerTopLink_content}>
              <ImageFallbackStatic src={NEWSV2_ICON} width="12px" height="10px" />
            </LinkComp>
          </Box>

          <Box className={styles.headerTopLink}>
            <LinkComp name="Tuyển dụng" href={PATH_CAREER} target onClick={() => gtag.viewCareer()} className={styles.headerTopLink_content}>
              <ImageFallbackStatic src={CAREERV2_ICON} width="14px" height="10px" />
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
              <Image src={HOMEV2_ICON} width="11px" height="11px" />
            </LinkComp>
          </Box>
        </Container>
      </Box>
      {/* middle header */}
      <Box className={styles.headerIconLogged}>
        <Logo />
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
                <ImageFallbackStatic src={NOTICEV2_ICON} width="21px" height="23px" />
              </Box>
            </Badge>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
}

export default HeaderTopMobile;
