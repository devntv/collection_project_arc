/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import { withLogin } from 'HOC';
import { isValid } from 'clients';
import CatClient from 'clients/CatClientV2';
import Template from 'components/layout/Template';
import MV2ProductListing from 'components/organisms/Mobile/ProductListing';
import ProductListing from 'components/organisms/ProductListing';
import { PAGE_SIZE_30 } from 'constants/data';
import { useProduct } from 'context';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ProductServiceV2, doWithServerSide } from 'services';
import { getTitle } from 'utils/SEOUtils';
import useMobileV2 from 'zustand-lib/storeMobile';

const title = getTitle('Tất cả sản phẩm');

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async () => {
      const [catInfo, tabs] = await Promise.all([CatClient.loadManufacturerInfoBySlug(ctx), ProductServiceV2.getListTabs({ ctx })]);
      const currentTab = ctx.query.currentTab || '';
      const sort = ctx.query.sort || '';
      const page = Number(ctx.query.page) || 1;
      const slug = ctx.query.slug || '';
      const { q = null, text = null, tag = '', isAvailable = false } = ctx.query || {};
      const convertedIsAvailable = isAvailable === 'true';
      return {
        props: {
          catInfo,
          currentTab,
          page,
          sort,
          slug,
          tabs,
          tag,
          SEO_CONFIG: {
            title,
          },
          text: q || text || '',
          isAvailable: convertedIsAvailable || false,
        },
      };
    },
    {
      serverSideTranslations,
      namespaces: ['common'],
    },
  );
}

const ManufacturersDetail = ({
  catInfo = '',
  currentTab = '',
  page = '',
  sort = '',
  slug = '',
  isMobile,
  isAuthenticated,
  tabs = [],
  mobileProducts = [],
  mobileTotal = 0,
  text,
  isAvailable,
  tag,
}) => {
  const cat = 'manufacturers';
  const pageTitle = 'Sản phẩm';
  const router = useRouter();
  const { query = {} } = router || {};
  const { getSkuHistoryPerDay, getListViewed } = useProduct();
  const [productRes, setProductRes] = useState({ isLoading: true });
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  const [dataProduct, setDataProduct] = useState({
    keyword: text,
    totalPage: Math.ceil(mobileProducts / PAGE_SIZE_30) || 1,
    searchProduct: mobileProducts,
    numPage: page || 1,
    totalList: mobileTotal || 0,
  });
  const [mobileLoading, setMobileLoading] = useState({
    isFetching: false,
    loadingScroll: false,
    isHasMore: true,
    isSearching: false,
  });
  const skus = getListViewed();
  useEffect(() => {
    const loadData = async () => {
      getSkuHistoryPerDay({ skus });
    };
    loadData();
  }, []);

  if (catInfo) {
    query.manufacturer = catInfo[0]?.code || '';
  }
  // new mobile UI: loadData
  useEffect(() => {
    const loadData = async () => {
      setProductRes({ isLoading: true });

      if (isMobileV2) {
        let dataRes = [];
        dataRes = await ProductServiceV2.loadDataProductMobileClient({ query });
        if (isValid(dataRes)) {
          setDataProduct({
            ...dataProduct,
            searchProduct: dataRes?.data,
            totalPage: Math.ceil(dataRes?.total / PAGE_SIZE_30),
            numPage: page || 1,
            totalList: dataRes?.total,
          });
        } else {
          setDataProduct({ ...dataProduct, searchProduct: [], totalPage: 0, totalList: 0 });
        }
        setMobileLoading({ ...mobileLoading, isInitiating: false });
      } else {
        const dataRes = await ProductServiceV2.loadDataProductWeb({ query });
        setProductRes({ ...dataRes, isLoading: false });
      }
    };
    loadData();
  }, [sort, slug, text, tag, router.query, currentTab, page, isAvailable]);

  return (
    <Template title={title} isMobile={isMobile} pageName={cat} pageTitle={pageTitle}>
      {isMobileV2 ? (
        <MV2ProductListing
          currentTab={currentTab}
          catName={cat}
          isAuthenticated={isAuthenticated}
          isAvailable={isAvailable}
          mobileProducts={dataProduct}
          setMobileProducts={setDataProduct}
          isHideFilter
        />
      ) : (
        <ProductListing
          products={productRes?.data || []}
          total={productRes?.total || 0}
          currentTab={currentTab}
          page={page}
          sort={sort}
          catName={cat}
          slug={slug}
          tabs={tabs}
          name={catInfo && catInfo[0] && catInfo[0].name}
          isAuthenticated={isAuthenticated}
          isMobile={isMobile}
          tag={tag}
        />
      )}
    </Template>
  );
};
export default withLogin(ManufacturersDetail, false);
