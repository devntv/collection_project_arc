import { Container } from '@material-ui/core';
import { CustomerClient, getData } from 'clients';
import HeadingLoyaltyV2 from 'components-v2/organisms/HeadingLoyaltyV2';
import Template from 'components/layout/Template';
import InfoContainer from 'components/organisms/InfoContainer';
import LoyaltyContainer from 'components/organisms/LoyaltyContainer';
import { withLogin } from 'HOC';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CustomerService, doWithServerSide, UserService } from 'services';
import { getTitle } from 'utils/SEOUtils';

const title = getTitle('Điểm tích lũy');

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async () => {
      const { query } = ctx;
      const { type = '', from = '', to = '', offset = 0 } = query;
      const [loyaltys, levelRes, accountInfo] = await Promise.all([
        CustomerService.getListLoyalty({ ctx }),
        CustomerClient.getLevelList({ ctx }),
        UserService.getAccount(ctx),
      ]);

      const customerDatas = getData(accountInfo);
      const levelDatas = getData(levelRes)
        ?.filter((item) => item?.status === 'ON' && item?.code !== 'LEVEL_BLACKLIST' && item?.code !== 'LEVEL_GUEST')
        .sort((a, b) => a.point - b.point);
      return {
        props: {
          loyaltys,
          type,
          from,
          to,
          offset,
          customerDatas,
          levelDatas,
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

const MyLoyaltyPoint = ({ user, isMobile, loyaltys = [], customerDatas = [], levelDatas = [], type, from, to, offset }) => {
  const name = 'Điểm tích luỹ';

  return (
    <Template isMobile={isMobile} pageTitle={name}>
      <div style={{ backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          <InfoContainer value={8} subTitle="Điểm tích lũy" name={user?.name} isMobile={isMobile}>
            <HeadingLoyaltyV2 loyaltys={loyaltys} point={user?.point} levelDatas={levelDatas} customerDatas={customerDatas} isMobile={isMobile} />
            <LoyaltyContainer loyaltys={loyaltys} point={user?.point} type={type} from={from} to={to} offset={offset} isMobile={isMobile} />
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
};
export default withLogin(MyLoyaltyPoint);
