import { Container, Paper } from '@material-ui/core';
import Template from 'components/layout/Template';
import AccountInfoTabs from 'components/mocules/AccountInfoTabs';
import { InfoContainer } from 'components/organisms';
import { tabsAccountInfo } from 'constants/data';
import { withLogin } from 'HOC';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { doWithServerSide } from 'services/SsrService';
import { getTitle } from 'utils/SEOUtils';
import styles from './styles.module.css';

const title = getTitle('Cập nhật hồ sơ');

export async function getServerSideProps(ctx) {
  const id = ctx.query;
  return doWithServerSide(
    ctx,
    async () => ({
      props: {
        id,
        SEO_CONFIG: {
          title,
        },
      },
    }),
    {
      serverSideTranslations,
      namespaces: ['common'],
    },
  );
}

const MyAccount = ({ user, isMobile }) => (
  <Template pageTitle="Thông tin tài khoản" isMobile={isMobile}>
    <div style={{ backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <InfoContainer value={1} title="Cập nhật hồ sơ" subTitle="Hồ sơ của tôi" point={user?.point} name={user?.name} isMobile={isMobile}>
          <Paper className={styles.wrapper}>
            <AccountInfoTabs tabList={tabsAccountInfo} isMobile={isMobile} />
          </Paper>
        </InfoContainer>
      </Container>
    </div>
  </Template>
);

export default withLogin(MyAccount);
