import { Container } from '@material-ui/core';
import Template from 'components/layout/Template';
import InfoContainer from 'components/organisms/InfoContainer';
import PromoList from 'components/organisms/PromoList';
import { withLogin } from 'HOC';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { doWithServerSide, PromoService } from 'services';
import { getTitle } from 'utils/SEOUtils';

const title = getTitle('Mã giảm giá của tôi');

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async () => {
      const [vouchers] = await Promise.all([PromoService.getMyVoucher({ ctx })]);
      return {
        props: {
          promos: vouchers,
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

const MyReferral = ({ user, promos = [], isMobile }) => {
  const name = 'Mã giảm giá của tôi';
  return (
    <Template isMobile={isMobile} pageTitle={name}>
      <div style={{ backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          <InfoContainer isMobile={isMobile} value={6} title="Mã giảm giá của tôi" subTitle="Mã giảm giá của tôi" name={user?.name}>
            <PromoList promos={promos} />
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
};
export default withLogin(MyReferral);
