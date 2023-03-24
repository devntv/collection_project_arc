import { Button, Container, Paper, Typography } from '@material-ui/core';
import LinkComp from 'components/atoms/LinkComp';
import { BRAND_EMAIL_HELP, BRAND_NAME, BRAND_PHONE, BRAND_PHONE_DISPLAY, CUSTOMER_TAG } from 'constants/Enums';
import { BLOCK_ACCOUNT, CALL_ICON, LOGO_THUOCSI, MAIL_ICON } from 'constants/Images';
import { useAuth } from 'context/Auth/index';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { doWithServerSide } from 'services/SsrService';
import { gtag } from 'utils';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import styles from './styles.module.css';

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async (_ctx, user) => {
      // comment nếu muốn test thử
      if (user?.tags?.indexOf(CUSTOMER_TAG.BAN) === -1) {
        return {
          redirect: {
            destination: '/',
          },
        };
      }
      return {
        props: {},
      };
    },
    {
      serverSideTranslations,
      namespaces: ['common', 'about-us'],
    },
  );
}

const BlockAccount = () => {
  const { t } = useTranslation('about-us');
  const { t: tCommon } = useTranslation('common');
  const { logout } = useAuth();

  return (
    <Container className={styles.container} maxWidth="lg">
      <ImageFallbackStatic src={BLOCK_ACCOUNT} width="350" height="300" />
      <Paper className={styles.paper}>
        <ImageFallbackStatic src={LOGO_THUOCSI} width="300" height="100" />
        <Typography className={styles.text_lock}>{t('title').replace('{BRAND_NAME}', BRAND_NAME)}</Typography>
        <div className={styles.contact}>
          <ImageFallbackStatic src={MAIL_ICON} width="16" height="14" />
          <LinkComp href={`mailto:${BRAND_EMAIL_HELP}`} prefetch={false} className={styles.link} onClick={() => gtag.sendEmail()}>
            {BRAND_EMAIL_HELP}
          </LinkComp>
        </div>
        <div className={styles.contact}>
          <ImageFallbackStatic src={CALL_ICON} width="14" height="14" />
          <LinkComp href={`tel:${BRAND_PHONE}`} prefetch={false} className={styles.link} onClick={() => gtag.callHotline()}>
            {BRAND_PHONE_DISPLAY}
          </LinkComp>
          <span className={styles.text}>&nbsp;({t('time-working')})</span>
        </div>
        <Button className={styles.btn} onClick={logout}>
          {tCommon('logout')}
        </Button>
      </Paper>
    </Container>
  );
};

export default BlockAccount;
