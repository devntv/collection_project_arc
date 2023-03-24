/* eslint-disable import/no-named-as-default-member */
import LinkComp from 'components/atoms/LinkComp';
import Template from 'components/layout/Template';

import { Button, Container, Grid } from '@material-ui/core';
import clsx from 'clsx';
import { withLogin } from 'HOC';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import NotifyService from 'services/NofifyService';
import { doWithServerSide } from 'services/SsrService';
import { DateTimeUtils } from 'utils';
import { getTitle } from 'utils/SEOUtils';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const title = getTitle('Trang thông báo');

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async () => {
      const [listNotifyRes] = await Promise.all([NotifyService.getNotifications({ ctx })]);
      return {
        props: {
          listNotify: listNotifyRes?.data || [],
          SEO_CONFIG: {
            title,
          },
        },
      };
    },
    {
      serverSideTranslations,
      namespaces: ['common'],
    },
  );
}

const Notifications = ({ listNotify, isMobile }) => {
  const pageName = 'notification';

  return (
    <Template pageName={pageName} isMobile={isMobile}>
      <div className={styles.notifyWrap}>
        <Container className={styles.wrapper} maxWidth="lg">
          <Grid className={styles.notifyTitle} container>
            <h3>Thông Báo của tôi</h3>
            <Button className={styles.btn}>Đánh dấu đọc tất cả</Button>
          </Grid>
          <div className={styles.notificationsList}>
            {listNotify &&
              listNotify.map(
                (item) =>
                  item && (
                    <LinkComp
                      key={uuidv4()}
                      className={item.isRead ? clsx(styles.notificationsItem, styles.read) : clsx(styles.notificationsItem, styles.unRead)}
                      href={item.link}
                    >
                      <div className={styles.notifyIcon}>
                        <i className={`icomoon icon-loyalty + ${styles.icon}`} />
                      </div>
                      <div className={styles.notifyContent}>
                        <div className={styles.notifyContentTitle}>{item.title}</div>
                        <div className={styles.notifyContentDescription}>{item.description}</div>
                        <small className={styles.createdAt}>{DateTimeUtils.getTimeAgo(item.createdTime)}</small>
                      </div>
                    </LinkComp>
                  ),
              )}
          </div>
        </Container>
      </div>
    </Template>
  );
};

export default withLogin(Notifications);
