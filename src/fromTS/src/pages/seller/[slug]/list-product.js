import { Container, Divider, Grid, Typography } from '@material-ui/core';
import ListProductMobileScreen from 'components-v2/organisms/pages/seller/[slug]/MobileScreen/list-product';
import Template from 'components/layout/Template';
import BannerSlider from 'components/organisms/BannerSlider';
import SellerHeader from 'components/organisms/SellerHeader';
import SellerProductListing from 'components/organisms/SellerProductListing';
import SellerTabs from 'components/organisms/SellerTabs';
import { PAGE_SIZE_30 } from 'constants/data';
import { BRAND_NAME } from 'constants/Enums';
import { withLogin } from 'HOC';
import useTrackingTimeout from 'hooks/useTrackingTimeout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { isDesktop } from 'react-device-detect';
import { doWithServerSide, ProductServiceV2, SellerService } from 'services';
import { DOMAIN_FLAGSHIP_STORE } from 'sysconfig';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from './styles.module.css';

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async () => {
      const { query } = ctx;
      const { slug, search = null, currentTab = '', sort = '', section = '' } = query;
      const page = Number(ctx.query.page) || 1;
      const storeInfo = await SellerService.getStoreInfo({ ctx, slug });
      const { sections = [] } = storeInfo || {};
      const isValidSection = sections.find((item) => item?.code === section);

      if (!storeInfo || storeInfo?.status === 'INACTIVE' || (!isValidSection && section !== '')) {
        return {
          redirect: {
            destination: '/',
          },
        };
      }
      if (storeInfo?.storeType === 'FLAGSHIP') {
        return {
          redirect: {
            destination: DOMAIN_FLAGSHIP_STORE.replace('{seller}', slug) || `/flagship-store/${slug}`,
          },
        };
      }
      const { sellerCode = '', banners = [] } = storeInfo;

      const [listProduct, tabs] = await Promise.all([
        ProductServiceV2.loadProductWithSeller({
          ctx,
          code: sellerCode,
          offset: (page - 1) * PAGE_SIZE_30,
          text: search,
        }),
        ProductServiceV2.getListTabs({ ctx }),
      ]);
      const { data = [], total = 0 } = listProduct;

      return {
        props: {
          storeInfo,
          products: data,
          total,
          currentTab,
          page,
          sort,
          tabs,
          search,
          slug,
          infoBanner: banners.length > 0 ? banners.slice(0, 5) : [],
        },
      };
    },
    {
      serverSideTranslations,
      namespaces: ['common'],
    },
  );
}

const ListProduct = ({
  isMobile,
  storeInfo = {},
  products,
  total,
  tabs = [],
  currentTab = '',
  page = '',
  sort = '',
  search,
  isAuthenticated,
  slug,
  infoBanner,
}) => {
  const { name = null, logo = null, description: infoStore, sections, numberProductDisplay, sellerCode } = storeInfo || {};
  const sellerInfo = {
    name,
    imageStoreUrls: logo,
    numberProductDisplay,
    sellerCode,
  };
  const title = `${BRAND_NAME} ${name}`;
  const router = useRouter();
  const { query } = router;
  const { section } = query;
  const cat = `seller/${slug}/list-product`;
  const beta = useMobileV2((state) => state.beta);
  const isMobileV2 = !isDesktop && beta;
  const getNamePage = (val) => {
    let namePage = 'Tất cả sản phẩm';
    if (search) {
      return `Đang tìm từ khoá: “${search}”`;
    }
    if (val) {
      const currentTabs = tabs?.filter((tab) => tab.value === val) || [];
      namePage = currentTabs[0] ? currentTabs[0]?.name : name;
    }
    if (section) {
      namePage = sections?.find(({ code }) => code === section)?.name || '';
    }
    return namePage;
  };
  const regex = /(<([^>]+)>)/gi;
  const info = infoStore ? infoStore.replace(regex, '') : '';

  // Tracking timing GA
  useTrackingTimeout('Sellers');

  // Scroll tracking GA
  // useScrollTracking('Sellers');

  if (isMobileV2) {
    return <ListProductMobileScreen sellerInfo={sellerInfo} />;
  }

  return (
    <Template title={title} isMobile={isMobile} pageTitle={title}>
      <div className={styles.container}>
        <Container maxWidth="lg" className={isMobile ? styles.containerMobile : ''}>
          <SellerHeader sellerInfo={sellerInfo} />
          <Divider />
          <SellerTabs slug={slug} />

          <Grid container spacing={2}>
            {info.length > 0 && infoBanner.length > 0 ? (
              <>
                <Grid item xs={12} lg={infoStore ? 7 : 12}>
                  <BannerSlider banners={infoBanner} isSeller />
                </Grid>
                <Grid item xs={12} lg={5}>
                  <div className={styles.infoWrap}>
                    <Typography variant="h6" component="h6" className={styles.name}>
                      {name}
                    </Typography>
                    <div style={{ overflow: 'auto', height: '200px' }}>
                      <div dangerouslySetInnerHTML={{ __html: infoStore }} />
                    </div>
                  </div>
                </Grid>
              </>
            ) : (
              <>
                {infoBanner?.length > 0 && (
                  <Grid item xs={12}>
                    <BannerSlider banners={infoBanner} isSeller />
                  </Grid>
                )}
                {info.length > 0 && (
                  <Grid item xs={12}>
                    <div className={styles.infoWrap}>
                      <Typography variant="h6" component="h6" className={styles.name}>
                        {name}
                      </Typography>
                      <div dangerouslySetInnerHTML={{ __html: infoStore }} />
                    </div>
                  </Grid>
                )}
              </>
            )}
          </Grid>
          <SellerProductListing
            products={products}
            total={total}
            currentTab={currentTab}
            page={page}
            sort={sort}
            catName={cat}
            tabs={tabs}
            searchText={search}
            name={getNamePage(currentTab)}
            isAuthenticated={isAuthenticated}
            isMobile={isMobile}
            section={section}
            queryUrl={query}
          />
        </Container>
      </div>
    </Template>
  );
};
export default withLogin(ListProduct);
