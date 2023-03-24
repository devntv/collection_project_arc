import { Container } from '@material-ui/core';
import { getData, PromoClient } from 'clients';
import MyPromoListV2 from 'components-v2/organisms/MyPromoListV2';
import Template from 'components/layout/Template';
import InfoContainer from 'components/organisms/InfoContainer';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { doWithServerSide } from 'services';

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async () => {
      const [vouchers] = await Promise.all([PromoClient.getMyVoucher({ ctx })]);
      return {
        props: {
          promos: getData(vouchers) || [],
        },
      };
    },
    {
      serverSideTranslations,
      namespaces: ['common'],
    },
  );
}

function myVoucher({ user, promos = [], isMobile }) {
  const title = 'Mã giảm giá của tôi – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  const name = 'Mã giảm giá của tôi';
  return (
    <Template title={title} isMobile={isMobile} pageTitle={name}>
      <Container style={{ padding: '0px' }}>
        <InfoContainer isMobile={isMobile} value={6} subTitle="Mã giảm giá của tôi" name={user?.name}>
          <MyPromoListV2 promos={promos} isMobile={isMobile} />
        </InfoContainer>
      </Container>
    </Template>
  );
}

export default myVoucher;
