import { Container } from '@material-ui/core';
import LoyaltyContainerV2 from 'components-v2/organisms/LoyaltyContainerV2';
import Template from 'components/layout/Template';
import InfoContainer from 'components/organisms/InfoContainer';
import { withLogin } from 'HOC';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CustomerService, doWithServerSide } from 'services';
import { getTitle } from 'utils/SEOUtils';

const title = getTitle('Điểm tích lũy');

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async () => {
      const [Res] = await Promise.all([CustomerService.getListLoyalty({ ctx })]);

      return {
        props: {
          Res,
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

const MyLoyaltyPoint = ({ user, isMobile, Res }) => {
  const name = 'Điểm tích luỹ';

  return (
    <Template isMobile={isMobile} pageTitle={name}>
      <div style={{ backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          <InfoContainer value={8} subTitle="Điểm tích lũy" name={user?.name} isMobile={isMobile}>
            <LoyaltyContainerV2 loyaltys={Res} />
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
};
export default withLogin(MyLoyaltyPoint);
