import { Container, Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { LIMIT_DEFAULT, OFFSET_DEFAULT } from 'clients';
import Template from 'components/layout/Template';
import { InfoContainer, ProductCardHorizontal } from 'components/organisms';
import { withLogin } from 'HOC';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import RecentProductsService from 'services/RecentProductsService';
import { doWithServerSide } from 'services/SsrService';
import { getLinkTagDeal } from 'utils';
import { getTitle } from 'utils/SEOUtils';
import useGetTagPromotion from 'zustand-lib/useGetTagPromotion';

const title = getTitle('Sản phẩm đã xem');

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async (ctxCallback, user) => {
      const { offset = OFFSET_DEFAULT, limit = LIMIT_DEFAULT } = ctx.query;
      const recentProductsWithInfo = await RecentProductsService.getRecentProductsWithInfo({ ctx, customerID: user?.customerID, offset, limit });

      const { data = [], total = 0 } = recentProductsWithInfo || {};

      return {
        props: {
          data,
          pageSize: Math.ceil(total / LIMIT_DEFAULT),
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

function ViewedProductList({ user, isMobile, data = [], pageSize }) {
  const router = useRouter();
  const { offset = 0 } = router?.query || {};
  const limit = LIMIT_DEFAULT;
  const [numPage, setNumpage] = useState((+offset + limit) / limit);

  const handleChangePage = (_, page) => {
    const offsetByPage = (page - 1) * limit;
    setNumpage(page);
    router.push({
      pathname: router.pathname,
      query: {
        offset: offsetByPage,
        limit,
      },
    });
  };

  const [listData, setListData] = useState([]);

  useEffect(() => {
    setListData(data);
  }, [data]);

  const { getPromoLists } = useGetTagPromotion();
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getPromoLists({ getVoucherInfo: false, signal });

    return () => controller.abort();
  }, []);

  return (
    <Template pageTitle="Sản phẩm đã xem" isMobile={isMobile}>
      <div style={{ backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          <InfoContainer
            value={12}
            title="Danh sách sản phẩm bạn đã xem"
            subTitle="Sản phẩm đã xem"
            point={user?.point}
            name={user?.name}
            isMobile={isMobile}
          >
            {listData.map((item) => (
              <ProductCardHorizontal key={item.sku} product={item} isMobile={isMobile} type="quick-order" index={1} link={getLinkTagDeal(item)} />
            ))}
            <Grid item xs={12}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination defaultPage={numPage} count={pageSize} onChange={handleChangePage} page={numPage} />
              </div>
            </Grid>
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
}

export default withLogin(ViewedProductList);
