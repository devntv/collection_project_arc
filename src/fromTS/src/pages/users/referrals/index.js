import { Box, Container } from '@material-ui/core';
import ReferralListV2 from 'components-v2/organisms/ReferralList';
import Template from 'components/layout/Template';
import InfoContainer from 'components/organisms/InfoContainer';
import { withLogin } from 'HOC';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { doWithServerSide } from 'services/SsrService';
import { getTitle } from 'utils/SEOUtils';
import useMobileV2 from 'zustand-lib/storeMobile';

const title = getTitle('Giới thiệu bạn bè');

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async () => ({
      props: {
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

const MyReferral = ({ user, isMobile }) => {
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());

  return (
    <Template isMobile={isMobile} overrideMV2Options={{ iconRightHeader: { home: true, cart: true } }}>
      <Box style={{ backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="lg" style={{ maxWidth: '1304px' }}>
          <InfoContainer value={5} title="Giới thiệu bạn bè" subTitle="giới thiệu bạn bè" name={user?.name} isMobileV2={isMobileV2}>
            <ReferralListV2 isMobile={isMobile} />
          </InfoContainer>
        </Container>
      </Box>
    </Template>
  );
};
export default withLogin(MyReferral);
