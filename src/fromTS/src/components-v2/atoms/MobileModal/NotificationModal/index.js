import { Box, Container, IconButton, Typography } from '@material-ui/core';
import { LocalOffer } from '@material-ui/icons';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import { useNotify } from 'context';
import { DateTimeUtils } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

export default function NotifyModal() {
  const { notification, markReadByCode } = useNotify();
  return (
    <Container style={{ marginBottom: '48px' }}>
      {notification && notification.length > 0 ? (
        notification.map((item) => (
          <LinkComp
            className={item.isRead ? clsx(styles.notificationsItem, styles.read) : clsx(styles.notificationsItem, styles.unRead)}
            onClick={() => markReadByCode(item.code)}
            key={uuidv4()}
            href={item.link}
          >
            <Box className={styles.notify_container}>
              <IconButton className={styles.notify_icon}>
                <LocalOffer />
              </IconButton>
              <Box className={styles.notiContainer_info}>
                <Typography variant="body1">{item.title}</Typography>
                <Typography variant="body2" style={{ display: 'flex', alignItems: 'center' }}>
                  <WatchLaterIcon style={{ marginRight: '4px' }} /> {DateTimeUtils.getTimeAgo(item.createdTime)}
                </Typography>
              </Box>
            </Box>
          </LinkComp>
        ))
      ) : (
        <Typography className={styles.notifyStatus}>Hiện tại bạn không có thông báo </Typography>
      )}
      {notification.length > 0 && (
        <div className={styles.viewAll_container}>
          <LinkComp className={styles.viewAll} href="/notifications" prefetch>
            <span>Xem tất cả</span>
          </LinkComp>
        </div>
      )}
    </Container>
  );
}
