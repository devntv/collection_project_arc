import { Box, Breadcrumbs, Container, Divider, Grid, Typography } from '@material-ui/core';
import { NavigateNext } from '@material-ui/icons';
import { getData, isValid } from 'clients';
import MInput from 'components-v2/atoms/Mobile/MInput';
import SliderMobile from 'components-v2/mocules/mobile/SliderMobile/Banner';
import SellerDetailHeader from 'components-v2/organisms/Mobile/store/SellerDetailHeader';
import SellerTabsMobile from 'components-v2/organisms/Mobile/store/SellerTabs';
import { LinkComp } from 'components/atoms';
import Template from 'components/layout/Template';
import ListProductSeller from 'components/mocules/ListProductSeller';
import MV2SliderProduct from 'components/mocules/Mobile/SliderProduct';
import ProductCardNew from 'components/mocules/ProductCardNew';
import SliderProduct from 'components/mocules/SliderProduct';
import MV2SellerProductListing from 'components/organisms/Mobile/SellerProductListing';
import SellerHeader from 'components/organisms/SellerHeader';
import SellerProductListing from 'components/organisms/SellerProductListing';
import SellerTabs from 'components/organisms/SellerTabs';
import SliderBannerSeller from 'components/organisms/SliderBannerSeller';
import { PAGE_SIZE_30 } from 'constants/data';
import { ENUM_PRODUCT_TYPE } from 'constants/data/mobile';
import { DEALS_ICON, LIKE_ICON_GREEN, SANPHAMMOI_ICON, SECTION_STORE_ICON } from 'constants/Images';
import { SEARCH_ICON } from 'constants/Images/mobile/Icons';
import { withLogin } from 'HOC';
import useTrackingTimeout from 'hooks/useTrackingTimeout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { doWithServerSide, ProductServiceV2, SellerService } from 'services';
import { DOMAIN } from 'sysconfig';
import { debounceFunc500 } from 'utils/debounce';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from './styles.module.css';

const styleBoxLoading = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '2rem',
};
const TEXT_DEFAULT = '';

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async () => {
      const { query } = ctx;
      const { slug = '', search = null, currentTab = '', sort = '', type = '', section = '' } = query;

      const page = Number(ctx.query.page) || 1;

      const flagshipStoreInfo = await SellerService.getStoreInfo({ ctx, slug });
      const { sections = [] } = flagshipStoreInfo || {};
      const isValidSection = sections.find((item) => item?.code === section);
      if (!flagshipStoreInfo || flagshipStoreInfo?.status === 'INACTIVE' || (!isValidSection && section !== '')) {
        return {
          redirect: {
            destination: DOMAIN,
          },
        };
      }
      if (flagshipStoreInfo?.storeType !== 'FLAGSHIP') {
        return {
          redirect: {
            destination: `/seller/${slug}`,
          },
        };
      }
      const { favSkus = [], newSkus = [], sellerCode = '' } = flagshipStoreInfo || {};

      const [favProductsRes, newProductRes, dealsBySellerRes, tabs] = await Promise.all([
        ProductServiceV2.getProductInfoFromSkusForSeller({ ctx, skus: favSkus }),
        ProductServiceV2.getProductInfoFromSkusForSeller({ ctx, skus: newSkus }),
        ProductServiceV2.getDeals({ ctx, sellerCode }),
        ProductServiceV2.getListTabs({ ctx }),
      ]);
      const blocks = [];
      let dealsBySeller = [];
      let listNewProduct = [];
      let listFavProducts = [];
      if (isValid(favProductsRes)) {
        listFavProducts = getData(favProductsRes).filter((item) => item?.isActive === true); // fitler những sản phẩm ko bị tắt hiển thị trên web
        if (listFavProducts && listFavProducts.length > 0) {
          blocks.push({
            name: 'Sản phẩm nổi bật',
            data: listFavProducts,
            type: 'fav',
            icon: LIKE_ICON_GREEN,
            iconWidth: '40px',
            iconHeight: '40px',
          });
        }
      }

      if (isValid(dealsBySellerRes)) {
        dealsBySeller = getData(dealsBySellerRes);
        if (dealsBySeller && dealsBySeller.length > 0) {
          blocks.push({
            name: 'Sản phẩm khuyến mãi',
            data: dealsBySeller,
            type: 'khuyenmai',
            icon: DEALS_ICON,
            iconWidth: '30px',
            iconHeight: '40px',
          });
        }
      }
      if (isValid(newProductRes)) {
        listNewProduct = getData(newProductRes).filter((item) => item?.isActive === true); // fitler những sản phẩm ko bị tắt hiển thị trên web
        if (listNewProduct && listNewProduct.length > 0) {
          blocks.push({
            name: 'Sản phẩm mới',
            data: listNewProduct,
            type: 'new',
            icon: SANPHAMMOI_ICON,
            iconWidth: '40px',
            iconHeight: '40px',
          });
        }
      }

      const { total: totalDeal = 0 } = dealsBySellerRes;
      return {
        props: {
          blocks,
          currentTab,
          page,
          sort,
          search,
          slug,
          type,
          flagshipStoreInfo,
          tabs,
          dealsBySeller,
          listFavProducts,
          listNewProduct,
          totalDeal,
          query,
          sellerCode,
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
  currentTab = '',
  page = '',
  sort = '',
  search = '',
  isAuthenticated,
  slug = '',
  type = '',
  flagshipStoreInfo = {},
  sellerCode,
  tabs = [],
  blocks = [],
  dealsBySeller = [],
  listFavProducts = [],
  listNewProduct = [],
  totalDeal = 0,
}) => {
  const router = useRouter();
  const { asPath, query } = router;
  const { section } = query;
  const isFlagShipStorePage = asPath.includes('flagship-store');
  let cat = '/list-product';
  if (isFlagShipStorePage) {
    cat = `/flagship-store/${slug}/list-product`;
  }
  const { name = null, logo = [], numberProductDisplay = 0, banners = [], sections = null, newSkus = [], favSkus = [] } = flagshipStoreInfo || {};
  const imagesBanner = banners.filter((item) => item?.type === 'SLIDER') || [];

  const formatBannerSlider = imagesBanner?.map((obj) => ({
    url: obj.images[0],
    alt: obj.name,
    target: obj.link,
    id: obj.bannerID,
  }));
  const [dataSections, setDataSections] = useState([]);
  const [listPrdSection, setListPrdSection] = useState({});
  const [allProduct, setAllProduct] = useState([]);
  const [numPrd, setNumPrd] = useState(0);
  const [displayQuery, setDisplayQuery] = useState(TEXT_DEFAULT);
  const [searchQuery, setSearchQuery] = useState(TEXT_DEFAULT);
  const [listProductQuery, setListProductQuery] = useState([]);
  const [mobileFetching, setMobileFetching] = useState(false);
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  const loadDataSection = async () => {
    if (sections && !query?.type) {
      if (!query?.section) {
        const allSctionInfo = await Promise.all(
          sections.map(async ({ code, name: nameSection }) => {
            const productRes = await ProductServiceV2.loadProductWithFilter({
              filter: { sectionStore: code },
            });
            return {
              data: getData(productRes),
              code,
              nameSection,
            };
          }),
        );
        setDataSections(allSctionInfo?.filter((item) => item?.data?.length > 0) || []);
      } else if (query?.section) {
        const listProductRes = await ProductServiceV2.loadProductWithFilter({
          offset: (page - 1) * PAGE_SIZE_30,
          filter: { sectionStore: query?.section },
        });
        if (isValid(listProductRes)) {
          const { total: totalPrd = 0, data = [] } = listProductRes;
          setListPrdSection({ totalPrd, data });
        } else {
          router.push('/');
        }
      }
    }
    if (!query?.type || type === 'all-product') {
      const allProductRes = await ProductServiceV2.loadProductWithSeller({
        code: sellerCode,
        offset: (page - 1) * PAGE_SIZE_30,
        text: search,
      });
      setAllProduct(getData(allProductRes));
      setNumPrd(allProductRes?.total || 0);
    }
  };
  useEffect(() => {
    loadDataSection();
  }, [section, page, type]);

  // Tracking timing GA
  useTrackingTimeout('Sellers');

  // Scroll tracking GA
  // useScrollTracking('Sellers');

  const sellerInfo = {
    name,
    imageStoreUrls: logo,
    numberProductDisplay,
  };

  const getNamePage = (val) => {
    let namePage = 'Tất cả sản phẩm';
    if (search) {
      return `Đang tìm từ khoá: “${search}”`;
    }
    if (val) {
      const currentTabs = tabs?.filter((tab) => tab.value === val) || [];
      namePage = currentTabs[0] ? currentTabs[0]?.name : name;
    }
    return namePage;
  };

  const listProduct = () => {
    if (type === ENUM_PRODUCT_TYPE.KHUYENMAI) return dealsBySeller;
    if (type === ENUM_PRODUCT_TYPE.NEW) return listNewProduct;
    return listFavProducts;
  };
  const subLink = (t) => blocks.find((item) => item?.type === t)?.name || 'Tất cả';
  const mobileFetchData = useCallback(async (keywords) => {
    setMobileFetching(true);
    let res = {};
    if (!keywords || keywords.length === 0) {
      if (type) {
        res = listProduct();
      } else {
        res = allProduct;
      }
    } else {
      res = await ProductServiceV2.getStoreProductClient({ query, sellerCode, keywords, isDeal: type && type === ENUM_PRODUCT_TYPE.KHUYENMAI });
    }
    if (isValid(res)) {
      switch (query.type) {
        case ENUM_PRODUCT_TYPE.NEW:
          setListProductQuery(getData(res).filter((item) => newSkus.includes(item.sku)));
          break;
        case ENUM_PRODUCT_TYPE.FAV:
          setListProductQuery(getData(res).filter((item) => favSkus.includes(item.sku)));
          break;
        default:
          setListProductQuery(getData(res));
          break;
      }
    } else {
      setListProductQuery(getData(res));
    }
    setMobileFetching(false);
  });

  const handleChangeSearchBox = useCallback((event) => {
    const { value } = event.target;
    setDisplayQuery(value);
    debounceFunc500(() => {
      setSearchQuery(value);
      mobileFetchData(value);
    });
  });

  const handleClear = useCallback(() => {
    setDisplayQuery('');
    setSearchQuery('');
    mobileFetchData('');
  });
  // New mobile UI
  if (isMobileV2) {
    const isShowHeader = query?.section || type || search;
    return (
      <Template title={name} isMobile={isMobile} pageTitle={name}>
        <div className={styles.mobileListProduct_container}>
          {!isShowHeader && (
            <>
              <SellerDetailHeader sellerInfo={sellerInfo} isFlagship />
              <Divider style={{ backgroundColor: '#E9E9E9' }} />
              <SellerTabsMobile slug={slug} isFlagship />
              <Grid style={{ padding: imagesBanner.length > 0 && '20px 15px 0px' }} container>
                {imagesBanner.length > 0 && formatBannerSlider.length > 0 && (
                  <Grid item xs={12} lg={12}>
                    <SliderMobile banners={formatBannerSlider} />
                  </Grid>
                )}
              </Grid>
            </>
          )}
          {type || search || query?.section ? (
            <Box sx={{ padding: '0 15px' }}>
              <div className={styles.mobile_searchInput}>
                {type !== ENUM_PRODUCT_TYPE.KHUYENMAI && (
                  <MInput
                    value={displayQuery}
                    leftIcon={SEARCH_ICON}
                    placeholder="Tìm kiếm..."
                    onChange={handleChangeSearchBox}
                    onClear={handleClear}
                  />
                )}
              </div>
              {mobileFetching ? (
                <Box sx={styleBoxLoading}>
                  <div className={styles.mobileLoader}>Đang tải...</div>
                </Box>
              ) : (
                <MV2SellerProductListing
                  products={
                    searchQuery
                      ? listProductQuery
                      : (query?.type === 'all-product' && allProduct) || (!query?.section && listProduct()) || listPrdSection?.data
                  }
                  total={
                    searchQuery
                      ? listProductQuery.length
                      : (type === 'khuyenmai' && totalDeal) || (type === 'all-product' && numPrd) || (query?.section && listPrdSection?.totalPrd) || 0
                  }
                  currentTab={currentTab}
                  page={page}
                  sort={sort}
                  catName={cat}
                  tabs={tabs}
                  searchText={search}
                  name={getNamePage(currentTab)}
                  isAuthenticated={isAuthenticated}
                  isMobile={isMobile}
                  isFlagship
                  type={type}
                  section={section}
                  isMobileV2={isMobileV2}
                  keywords={searchQuery}
                  isHideTitle
                />
              )}
            </Box>
          ) : (
            <>
              <Box style={{ marginTop: '30px' }}>
                {blocks &&
                  blocks.length > 0 &&
                  blocks.map((item) => (
                    <MV2SliderProduct
                      iconWidth={item.iconWidth}
                      iconHeight={item.iconHeight}
                      icon={item?.icon}
                      name={item?.name}
                      key={`flagship-${item.name}`}
                      viewMore={!(isMobileV2 && item?.data.length < 6)}
                      redirect={`${cat}?type=${item?.type}`}
                      page="PRD_DETAIL"
                      isBestProducts={item?.type === 'fav'}
                      products={item?.data || []}
                      isMobileSeller
                    />
                  ))}
              </Box>

              <Box style={{ marginTop: '30px' }}>
                {dataSections &&
                  dataSections.length > 0 &&
                  dataSections.map((item) => (
                    <MV2SliderProduct
                      iconWidth="34px"
                      iconHeight="35px"
                      icon={SECTION_STORE_ICON}
                      name={item?.nameSection}
                      key={`flagship-${item?.nameSection}`}
                      viewMore
                      redirect={`${cat}?section=${item?.code}`}
                      page="PRD_DETAIL"
                      isBestProducts={item?.type === 'fav'}
                      products={item?.data || []}
                      isMobileSeller
                    />
                  ))}
              </Box>
              {allProduct && allProduct.length > 0 && (
                <Box className={styles.mobileProduct_listing_container}>
                  <Typography className={styles.mobileTitle_allProduct}>Tất cả sản phẩm</Typography>
                  <ListProductSeller products={allProduct} isMobileV2={isMobileV2} />
                  {allProduct.length > 5 && (
                    <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '40px' }}>
                      <LinkComp name="Xem tất cả" href={`${cat}?type=all-product`} className={styles.see_more} />
                    </div>
                  )}
                </Box>
              )}
            </>
          )}
        </div>
      </Template>
    );
  }

  return (
    <Template title={name} isMobile={isMobile} pageTitle={name}>
      <div className={styles.container_header}>
        <Container maxWidth="lg">
          <SellerHeader sellerInfo={sellerInfo} isFlagship />
          <SellerTabs slug={slug} isFlagship />
        </Container>
      </div>
      <div className={styles.container}>
        <Container maxWidth="lg">
          <Grid item xs={12} lg={12}>
            <SliderBannerSeller bannerImageUrls={imagesBanner} w={2100} />
          </Grid>
          {type || search || query?.section ? (
            <>
              <Box className={styles.wrapDirect}>
                <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
                  <Link href={cat}>Danh sách sản phẩm</Link>
                  <Link href={`${cat}/${type || search}`} className={styles.endPath}>
                    {(type && subLink(type)) ||
                      (section && sections.find(({ code }) => code === section)?.name) ||
                      (search && `Sản phẩm cho từ khoá "${search}"`) ||
                      ' '}
                  </Link>
                </Breadcrumbs>
              </Box>
              <SellerProductListing
                products={(query?.type === 'all-product' && allProduct) || (!query?.section && listProduct()) || listPrdSection?.data}
                total={(type === 'khuyenmai' && totalDeal) || (type === 'all-product' && numPrd) || (query?.section && listPrdSection?.totalPrd) || 0}
                currentTab={currentTab}
                page={page}
                sort={sort}
                catName={cat}
                tabs={tabs}
                searchText={search}
                name={getNamePage(currentTab)}
                isAuthenticated={isAuthenticated}
                isMobile={isMobile}
                isFlagship
                type={type}
                section={section}
                queryUrl={query}
              />
            </>
          ) : (
            <>
              <Box style={{ marginTop: '30px' }}>
                {blocks &&
                  blocks.length > 0 &&
                  blocks.map((item) => (
                    <SliderProduct
                      iconWidth={item.iconWidth}
                      iconHeight={item.iconHeight}
                      icon={item?.icon}
                      name={item?.name}
                      key={`flagship-${item.name}`}
                      viewMore={!(!isMobile && item?.data.length < 6)}
                      redirect={`${cat}?type=${item?.type}`}
                      page="PRD_DETAIL"
                      isBestProducts={item?.type === 'fav'}
                    >
                      {item?.data &&
                        item?.data.length > 0 &&
                        item.data.map((ele) => (
                          <ProductCardNew isBestProduct={item?.type === 'fav'} product={ele} key={`item-product-${ele.slug}`} tag category />
                        ))}
                    </SliderProduct>
                  ))}
              </Box>
              <Box style={{ marginTop: '30px' }}>
                {dataSections &&
                  dataSections.length > 0 &&
                  dataSections?.map((item) => (
                    <SliderProduct
                      iconWidth="34px"
                      iconHeight="35px"
                      icon={SECTION_STORE_ICON}
                      name={item?.nameSection}
                      key={`flagship-${item?.nameSection}`}
                      viewMore
                      redirect={`${cat}?section=${item?.code}`}
                      page="PRD_DETAIL"
                      isBestProducts={item?.type === 'fav'}
                    >
                      {item?.data?.map((ele) => (
                        <ProductCardNew isBestProduct={item?.type === 'fav'} product={ele} key={`item-product-${ele.slug}`} tag category />
                      ))}
                    </SliderProduct>
                  ))}
              </Box>
              {allProduct && allProduct.length > 0 && (
                <>
                  <Typography style={{ fontSize: '28px', fontFamily: 'googlesansmedium' }}>Tất cả sản phẩm</Typography>
                  <ListProductSeller products={allProduct} />
                  {allProduct.length > 5 && (
                    <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '90px' }}>
                      <LinkComp name="Xem tất cả" href={`${cat}?type=all-product`} className={styles.see_more} />
                    </div>
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
