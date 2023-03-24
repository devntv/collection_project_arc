import { Container, Typography } from '@material-ui/core';
import { getFirst } from 'clients';
import Template from 'components/layout/Template';
import RewardItemDetail from 'components/mocules/RewardItem/indexDetail';
import InfoContainer from 'components/organisms/InfoContainer';
import { withLogin } from 'HOC';
import useTrackingTimeout from 'hooks/useTrackingTimeout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doWithServerSide, RewardsService } from 'services';
import { getTitle } from 'utils/SEOUtils';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from './styles.module.css';

const title = getTitle('Chương trình trả thưởng');

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

const RewardItem = ({ user, isMobile }) => {
  const router = useRouter();
  const { slug } = router.query || {};
  const [data, setData] = useState(null);
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());

  useEffect(() => {
    const loadData = async () => {
      const result = await RewardsService.getRewardDetailById(slug);
      setData(getFirst(result));
    };

    if (isMobileV2) {
      // mobile v2 ko có url chi tiết => redirect
      router.push('/users/rewards');
    }

    loadData();
  }, []);

  if (['20', '21', '22'].includes(slug)) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTrackingTimeout('My account');
  }

  return (
    <Template isMobile={isMobile}>
      <div style={{ backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          <InfoContainer value={13} title="" subTitle="Danh sách trả thưởng" name={user?.name}>
            <Typography onClick={() => router.back()} className={styles.page_detail_title}>
              &#60;&#60; Quay lại Chương trình trả thưởng
            </Typography>
            {data && <RewardItemDetail reward={data} isMobile={isMobile} />}
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
};
export default withLogin(RewardItem);
