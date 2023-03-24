import { Box, CircularProgress, Container, Grid, Typography } from '@material-ui/core';
import { getData } from 'clients';
import { LinkComp } from 'components/atoms';
import Template from 'components/layout/Template';
import ListProductSeller from 'components/mocules/ListProductSeller';
import ProductCardNew from 'components/mocules/ProductCardNew';
import SliderProductCustom from 'components/mocules/SliderProductCustom';
import SellerHeader from 'components/organisms/SellerHeader';
import SellerTabsV2 from 'components/organisms/SellerTabsV2';
import SliderBannerSellerV2 from 'components/organisms/SliderBannerSellerV2';
import { DUREX_INFO, FLAGSHIP_STORE_TAGS } from 'constants/flagship-store';
import { withLogin } from 'HOC';
import useTrackingTimeout from 'hooks/useTrackingTimeout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doWithServerSide, ProductServiceV2 } from 'services';
import { useStore } from 'zustand-lib/storeGlobal';
import styles from './styles.module.css';

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async () => {
      const { query } = ctx;
      const { slug = 'durex', type = '' } = query;

      const flagshipStoreInfo = DUREX_INFO;

      return {
        props: {
          slug,
          flagshipStoreInfo,
          type,
        },
      };
    },
    {
      serverSideTranslations,
      namespaces: ['common'],
    },
  );
}

const ListProduct = ({ isMobile, slug = '', type = '', flagshipStoreInfo = {} }) => {
  const router = useRouter();
  const { asPath } = router;
  const isFlagShipStorePage = asPath.includes('flagship-store');
  let cat = '/list-product';
  if (isFlagShipStorePage) {
    cat = `/flagship-store/${slug}/list-product`;
  }
  const { name = null, logo = [], numberProductDisplay = 0, banners = [] } = flagshipStoreInfo || {};

  const imagesBannerCustom = banners.filter((item) => item?.type === 'BANNER_PRODUCT') || [];

  const sellerInfo = {
    name,
    imageStoreUrls: logo,
    numberProductDisplay,
  };

  const [customProducts, setCustomProducts] = useState([]);
  const [customBlocks, setCustomBlocks] = useState([]);

  const [loading, setLoading] = useState(false);

  const listTags = useStore((state) => state.tags);

  useEffect(() => {
    const getDataCustom = async () => {
      setLoading(true);

      const allProducts = [];
      const tagNamesMap = {};
      listTags.forEach((item) => {
        tagNamesMap[item.code] = item.name;
      });

      const productBlocks = await Promise.all(
        flagshipStoreInfo?.tags.map((tag, index) =>
          ProductServiceV2.loadProductWithFilter({ filter: { tag: tag.code }, limit: 9999 }).then((res) => {
            const dataMapQuantity = getData(res);

            if (FLAGSHIP_STORE_TAGS.includes(tag.code)) {
              allProducts.push(...dataMapQuantity);
              return {
                code: tag.code,
              };
            }

            return {
              code: tag.code,
              name: tagNamesMap[tag.code] || `${slug} Category ${index + 1}`,
              data: dataMapQuantity,
              type: tag.type,
              backgroundColor: tag.backgroundColor || '#fff',
              titleColor: tag.titleColor || '#000',
              backgroundTitleColor: tag.backgroundTitleColor || '#fff',
              titleBanner: tag.titleBanner || '',
            };
          }),
        ),
      );

      setCustomProducts(allProducts);
      setCustomBlocks(productBlocks.filter((item) => !FLAGSHIP_STORE_TAGS.includes(item.code)));

      setLoading(false);
    };

    getDataCustom();
  }, [type]);

  // Tracking timing GA
  useTrackingTimeout('Sellers');

  // Scroll tracking GA
  // useScrollTracking('Sellers');

  return (
    <Template title={name} isMobile={isMobile} pageTitle={name}>
      <div className={styles.container_header}>
        <Container maxWidth="lg">
          <SellerHeader sellerInfo={{ ...sellerInfo, numberProductDisplay: customProducts.length || 0 }} isFlagship />
          <SellerTabsV2 slug={slug} isFlagship isCustom />
        </Container>
      </div>
      <div className={styles.container}>
        <Container maxWidth="lg">
          <Grid item xs={12} lg={12}>
            <SliderBannerSellerV2 bannerImageUrls={imagesBannerCustom} w={2100} />
          </Grid>
          {loading ? (
            <div className={styles.loadingBlock}>
              <CircularProgress size={40} thickness={4} style={{ color: flagshipStoreInfo.primaryColor }} />
            </div>
          ) : (
            <>
              {type ? (
                <div style={{ marginTop: '50px' }}>
                  <Typography style={{ fontSize: '28px', fontFamily: 'googlesansmedium', color: flagshipStoreInfo.primaryColor }}>
                    Tất cả sản phẩm
                  </Typography>
                  <ListProductSeller products={customProducts} />
                </div>
              ) : (
                <>
                  <Box style={{ marginTop: '30px' }}>
                    {customBlocks &&
                      customBlocks.length > 0 &&
                      customBlocks.map((item) => (
                        <SliderProductCustom
                          name={item?.name}
                          key={`flagship-${item.name}`}
                          viewMore={!isMobile && item?.data.length >= 6}
                          redirect={`/products?tag=${item?.code}`}
                          page="PRD_DETAIL"
                          isBestProducts={item?.type === 'fav'}
                          backgroundColor={item?.backgroundColor}
                          backgroundTitleColor={item?.backgroundTitleColor}
                          titleColor={item?.titleColor}
                          titleBanner={item?.titleBanner}
                        >
                          {item?.data &&
                            item?.data.length > 0 &&
                            item.data.map((ele) => (
                              <ProductCardNew isBestProduct={item?.type === 'fav'} product={ele} key={`item-product-${ele.slug}`} tag category />
                            ))}
                        </SliderProductCustom>
                      ))}
                  </Box>
                  {customProducts && customProducts.length > 0 && (
                    <>
                      <Typography style={{ fontSize: '28px', fontFamily: 'googlesansmedium', color: flagshipStoreInfo.primaryColor }}>
                        Tất cả sản phẩm
                      </Typography>
                      <ListProductSeller products={customProducts.length <= 5 ? customProducts : customProducts.slice(0, 5)} />
                      {customProducts.length > 5 && (
                        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '90px' }}>
                          <LinkComp
                            name="Xem thêm"
                            href={`${cat}?type=all-product`}
                            className={styles.see_more_custom}
                            style={{ border: `1px solid ${flagshipStoreInfo.primaryColor}`, color: flagshipStoreInfo.primaryColor }}
                          />
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </Container>
      </div>
    </Template>
  );
};
export default withLogin(ListProduct);
