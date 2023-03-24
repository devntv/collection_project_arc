import { Container } from '@material-ui/core';
import { getData } from 'clients';
import clsx from 'clsx';
import SellerContainerMobile from 'components-v2/organisms/Mobile/store/SellerContainerMobile';
import NewPaginationV2 from 'components-v2/organisms/NewPaginationV2';
import Template from 'components/layout/Template';
import MV2StoreContainer from 'components/organisms/Mobile/StoreContainer';
import SellerContainerV2 from 'components/organisms/SellerContainerV2';
import StoreContainer from 'components/organisms/StoreContainer';
import { PAGE_SIZE_10 } from 'constants/data';
import { ENUM_SELLER_TYPE } from 'constants/data/mobile';
import { DUREX_SELLER_INFO, SANOFI_SELLER_INFO } from 'constants/flagship-store';
import { MOBILE_STORE_ICON, STORE_ICON } from 'constants/Images';
import { SELLERS } from 'constants/Paths';
import { useSetting } from 'context';
import { withLogin } from 'HOC';
import useTrackingTimeout from 'hooks/useTrackingTimeout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doWithServerSide, ProductServiceV2, SellerService } from 'services';
import { gtag } from 'utils';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import { getTitle } from 'utils/SEOUtils';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from './styles.module.css';

const title = getTitle('Danh sách nhà bán hàng');

const getSellersWithCustomSellers = async ({ customSeller, ctx }) => {
  const { slug } = customSeller;

  let seller = {};

  if (slug === 'durex') {
    seller = { ...DUREX_SELLER_INFO };
  }

  if (slug === 'sanofi') {
    seller = { ...SANOFI_SELLER_INFO };
  }

  const [productsRes, favProductsRes] = await Promise.all([
    ProductServiceV2.loadProductFuzzy({ ctx, filter: { tag: slug.toUpperCase() }, limit: 1 }),
    ProductServiceV2.loadProductFuzzy({ ctx, filter: { tag: seller?.favTag || slug.toUpperCase() }, limit: 3 }),
  ]);

  seller.sellerStore.numberProducts = productsRes?.total || 0;

  seller.product.topProducts = getData(favProductsRes);

  return seller;
};

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async () => {
      const { query } = ctx;
      const { search = '', type = '', page = 1 } = query;

      const [sellerResult, flgSellers, durex, sanofi] = await Promise.all([
        SellerService.getListSearchStore({
          ctx,
          body: {
            text: search,
            offset: (page - 1) * PAGE_SIZE_10,
            limit: PAGE_SIZE_10,
            sort: {
              revenue: -1,
            },
          },
          isBasic: true,
        }),
        SellerService.getSearchStoreByName({
          ctx,
          params: {
            getStoreInfo: true,
            q: JSON.stringify({
              isVip: true, // only get store isVip
            }),
            offset: 0,
            getTotal: true,
          },
        }),
        getSellersWithCustomSellers({ customSeller: DUREX_SELLER_INFO, ctx }),
        getSellersWithCustomSellers({ customSeller: SANOFI_SELLER_INFO, ctx }),
      ]);

      return {
        props: {
          flgSellers: flgSellers?.sellerMapTopProduct || [],
          sellers: sellerResult?.sellerMapTopProduct || [],
          total: sellerResult?.total || 0,
          search,
          type,
          durex,
          sanofi,
          page: parseInt(page, 10),
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

const pageName = 'sellers';
const storeIcon = <ImageFallbackStatic src={STORE_ICON} alt="icon flash sale" height="40" width="40" className={styles.icon_img} />;
const mobileStoreIcon = <ImageFallbackStatic src={MOBILE_STORE_ICON} alt="icon mobile store" height="24" width="24" className={styles.icon_img} />;

const Sellers = ({ flgSellers = [], sellers = [], total, search, type, page, isMobile, durex, sanofi }) => {
  const { getNameSeller } = useSetting();

  // convert flagship store
  const flagshipSellers = flgSellers
    .map((seller) => {
      const { product = null } = seller;
      const { topProducts = [] } = product;
      // check topProducts for display to region user
      if (topProducts?.length > 0) {
        const sellerInfo = getNameSeller({ seller: { code: seller?.code } });
        // return sellerInfo?.isVip && sellerInfo?.isStore;
        const { logo = [], numberProducts } = seller?.sellerStore || {};
        const { linkStore = '', linkSeller = '', name, isStore, isVip } = sellerInfo || {};
        if (isStore && isVip) {
          return {
            ...seller,
            ...sellerInfo,
            name: name || seller?.name,
            link: isStore ? linkStore : linkSeller,
            logo,
            numberProducts,
            isStore,
            isVip,
          };
        }
      }
      return null;
    })
    .filter(Boolean);

  const pages = Math.ceil(total / PAGE_SIZE_10);
  const defaultBreadscrumbs = [
    { name: 'Trang chủ', url: '/' },
    { name: 'Danh sách nhà bán hàng', url: `${SELLERS}` },
  ];
  const allSellersBreadscrumbs = [
    { name: 'Trang chủ', url: '/' },
    { name: 'Danh sách nhà bán hàng', url: `${SELLERS}` },
    { name: 'Tất cả nhà bán hàng', url: `${SELLERS}?type=all` },
  ];
  const flagshipStoreBreadscrumbs = [
    { name: 'Trang chủ', url: '/' },
    { name: 'Danh sách nhà bán hàng', url: `${SELLERS}` },
    { name: 'Hàng hãng', url: `${SELLERS}?type=flagship` },
  ];

  if (search) {
    allSellersBreadscrumbs.push({ name: search, url: `${SELLERS}?search=${search}` });
  }

  const router = useRouter();
  const customSellerArr = [durex, sanofi, ...flagshipSellers];
  const [sellerSearchBreadcrumbs, setSellerSearchBreadcrumbs] = useState([]);
  // const { filterProductByTag } = useProduct();
  const [loading] = useState(false);
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());

  // const getSellersWithCustomSellers = async (customSeller) => {
  //   const { slug } = customSeller;

  //   let seller = {};

  //   if (slug === 'durex') {
  //     seller = { ...DUREX_SELLER_INFO };
  //   }

  //   if (slug === 'sanofi') {
  //     seller = { ...SANOFI_SELLER_INFO };
  //   }

  //   const [productsRes, favProductsRes] = await Promise.all([
  //     filterProductByTag({ filter: { tag: slug.toUpperCase() }, limit: 1 }),
  //     filterProductByTag({ filter: { tag: seller?.favTag || slug.toUpperCase() }, limit: 3 }),
  //   ]);

  //   seller.sellerStore.numberProducts = productsRes?.total || 0;

  //   seller.product.topProducts = getData(favProductsRes);

  //   return seller;
  // };

  const handleChangePage = (event, value) => {
    event.preventDefault();
    if (page === value) return;

    router.push({
      ...router,
      query: {
        ...router.query,
        page: value,
      },
    });
  };

  useEffect(() => {
    // const getDataCustomSellers = async () => {
    //   setLoading(true);
    //   const customSellers = await Promise.all([getSellersWithCustomSellers(DUREX_SELLER_INFO), getSellersWithCustomSellers(SANOFI_SELLER_INFO)]);
    //   flagshipSellers = [...customSellers, ...flagshipSellers];
    //   setCustomSellerArr(flagshipSellers);
    //   setLoading(false);
    // };

    // getDataCustomSellers();
    if (search) {
      const breadcrumbs = defaultBreadscrumbs;
      const newBreadScrumbItem = { name: `Tìm kiếm: ${search}`, url: `${router?.asPath}` };
      breadcrumbs.push(newBreadScrumbItem);
      setSellerSearchBreadcrumbs(breadcrumbs);
    }

    if (router.asPath === SELLERS || !search) {
      setSellerSearchBreadcrumbs([]);
    }
  }, [search, type]);

  // Tracking timing GA
  useTrackingTimeout('Sellers');

  // Scroll tracking GA
  // useScrollTracking('Sellers');

  // render new laytout mobile
  if (isMobileV2) {
    if (type === ENUM_SELLER_TYPE.ALL) {
      return (
        <Template pageTitle={title} pageName={pageName} isMobile={isMobileV2} showTopSearchMV2>
          <div className={styles.mobileSellers}>
            <Container maxWidth="lg" className={styles.container}>
              <SellerContainerMobile sellers={sellers} total={total} breadcrumbs={sellerSearchBreadcrumbs} search={search} loading={loading} />
              <div style={{ marginTop: '20px' }}>
                <NewPaginationV2 key={page} totalPage={pages} curPage={page} handleChange={handleChangePage} isMobile={isMobile} />
              </div>
            </Container>
          </div>
        </Template>
      );
    }
    if (type === ENUM_SELLER_TYPE.FLAGSHIP) {
      return (
        <Template pageTitle={title} pageName={pageName} isMobile={isMobileV2} showTopSearchMV2>
          <div className={styles.mobileSellers}>
            <Container maxWidth="lg" className={styles.container}>
              <SellerContainerMobile sellers={customSellerArr} total={customSellerArr.length} icon={mobileStoreIcon} />
            </Container>
          </div>
        </Template>
      );
    }
    return (
      <Template pageTitle={title} pageName={pageName} isMobile={isMobile} showTopSearchMV2>
        {!search && (
          <div className={clsx(styles.mobileSellers)}>
            <Container maxWidth="lg" className={clsx(styles.container, isMobileV2 && styles.mobileContainer)}>
              <MV2StoreContainer
                sellers={customSellerArr}
                total={customSellerArr.length}
                icon={mobileStoreIcon}
                title="Hàng hãng"
                redirectUrl="/sellers?type=flagship"
                isMobileV2={isMobileV2}
              />
            </Container>
          </div>
        )}
        <div className={styles.mobileSellers_all}>
          <Container maxWidth="lg" className={styles.container}>
            <SellerContainerMobile
              sellers={sellers}
              total={total}
              title="Danh sách nhà bán hàng"
              breadcrumbs={sellerSearchBreadcrumbs}
              search={search}
              loading={loading}
            />
            {total > 0 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0 20px 0' }}>
                <button
                  className={styles.seeMoreBtn}
                  onClick={() => {
                    router.push({
                      ...router,
                      query: {
                        ...router.query,
                        type: 'all',
                      },
                    });
                  }}
                >
                  Xem tất cả
                </button>
              </div>
            )}
            {total === 0 && search && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
                <button
                  className={styles.seeMoreBtn}
                  onClick={() => {
                    router.push(`/${SELLERS}`);
                  }}
                >
                  Về trang nhà bán hàng
                </button>
              </div>
            )}
          </Container>
        </div>
      </Template>
    );
  }
  if (type === ENUM_SELLER_TYPE.FLAGSHIP) {
    return (
      <Template pageTitle={title} pageName={pageName} isMobile={isMobile} showTopSearchMV2>
        <div className={styles.sellers} style={{ padding: '40px 0' }}>
          <Container maxWidth="lg" className={styles.container}>
            <SellerContainerV2
              sellers={customSellerArr}
              total={customSellerArr.length}
              title="Hàng hãng"
              icon={storeIcon}
              breadcrumbs={flagshipStoreBreadscrumbs}
              type={ENUM_SELLER_TYPE.FLAGSHIP}
            />
          </Container>
        </div>
      </Template>
    );
  }

  if (type === 'all') {
    return (
      <Template pageTitle={title} pageName={pageName} isMobile={isMobile} showTopSearchMV2>
        <div className={styles.sellers}>
          <Container maxWidth="lg" className={styles.container}>
            <SellerContainerV2 sellers={sellers} total={total} title="Tất cả nhà bán hàng" breadcrumbs={allSellersBreadscrumbs} search={search} />
            <div style={{ marginTop: '20px' }}>
              <NewPaginationV2 key={page} totalPage={pages} curPage={page} handleChange={handleChangePage} isMobile={isMobile} />
            </div>
          </Container>
        </div>
      </Template>
    );
  }

  return (
    <Template pageTitle={title} pageName={pageName} isMobile={isMobile} showTopSearchMV2>
      {!search && (
        <div className={clsx(styles.sellers, styles.customSellers)}>
          <Container maxWidth="lg" className={styles.container}>
            <StoreContainer
              sellers={customSellerArr}
              total={customSellerArr.length}
              icon={storeIcon}
              title="Hàng hãng"
              redirectUrl="/sellers?type=flagship"
              isMobileV2={isMobileV2}
            />
          </Container>
        </div>
      )}
      <div className={styles.sellers}>
        <Container maxWidth="lg" className={styles.container}>
          <SellerContainerV2 sellers={sellers} total={total} title="Danh sách nhà bán hàng" breadcrumbs={sellerSearchBreadcrumbs} search={search} />
          {total > 10 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0 20px 0' }}>
              <button
                className={styles.seeMoreBtn}
                onClick={() => {
                  gtag.clickViewAllSellers();

                  router.push({
                    ...router,
                    query: {
                      ...router.query,
                      type: 'all',
                    },
                  });
                }}
              >
                Xem tất cả
              </button>
            </div>
          )}
          {total === 0 && search && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
              <button
                className={styles.seeMoreBtn}
                onClick={() => {
                  router.push(`/${SELLERS}`);
                }}
              >
                Về trang nhà bán hàng
              </button>
            </div>
          )}
        </Container>
      </div>
    </Template>
  );
};

export default withLogin(Sellers);
