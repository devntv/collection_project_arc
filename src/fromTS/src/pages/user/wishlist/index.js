/* eslint-disable import/no-named-as-default-member */
import { Container } from '@material-ui/core';
import { LIMIT_DEFAULT, OFFSET_DEFAULT } from 'clients';
import WishlistV2 from 'components-v2/organisms/WishlistV2';
import Template from 'components/layout/Template';
import { InfoContainer } from 'components/organisms';
import { withLogin } from 'HOC';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { doWithServerSide } from 'services/SsrService';
import WishlistService from 'services/WishlistService';
import { getTitle } from 'utils/SEOUtils';
import useGetTagPromotion from 'zustand-lib/useGetTagPromotion';

const LIMIT_SEARCH = 1000;

const title = getTitle('Sản phẩm quan tâm');

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async (ctxCallback, user) => {
      const { offset = OFFSET_DEFAULT, limit = LIMIT_DEFAULT } = ctx.query;
      const [wishListWithInfo, wishlistDataSearch] = await Promise.all([
        WishlistService.getWishlistWithInfo({ ctx, customerID: user?.customerID, offset, limit }),
        WishlistService.getWishlistWithInfo({ ctx, customerID: user?.customerID, offset, limit: LIMIT_SEARCH }),
      ]);
      const { data = [], total = 0 } = wishListWithInfo || {};
      return {
        props: {
          data,
          pageSize: Math.ceil(total / LIMIT_DEFAULT),
          allData: wishlistDataSearch?.data || [], // limit 1000
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

const Dashboard = ({ user, isMobile, data = [], pageSize, allData = [] }) => {
  // const title = 'Sản phẩm quan tâm – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';

  const { getPromoLists } = useGetTagPromotion();

  useEffect(() => {
    const dataSku = [];
    data?.forEach((item) => dataSku.push(item?.sku));
    const controller = new AbortController();
    const { signal } = controller;
    getPromoLists({ skus: [...dataSku], getVoucherInfo: false, signal });

    return controller.abort();
  }, [data]);

  return (
    <Template title={title} isMobile={isMobile}>
      <div style={{ backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          <InfoContainer value={11} title="" subTitle="Sản phẩm quan tâm" point={user?.point} name={user?.name} isMobile={isMobile}>
            <WishlistV2 isMobile={isMobile} data={data} pageSize={pageSize} allData={allData} />
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
};

export default withLogin(Dashboard);
