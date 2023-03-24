/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import { isValid } from 'clients';
import Template from 'components/layout/Template';
import MV2ProductListing from 'components/organisms/Mobile/ProductListing';
import ProductListing from 'components/organisms/ProductListing';
import { PAGE_SIZE } from 'constants/data';
import { useAuth, useSetting } from 'context';
import { withLogin } from 'HOC';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doWithServerSide, ProductServiceV2 } from 'services';
import { screenOrientation } from 'utils';
import { getTitle } from 'utils/SEOUtils';
import { useStore } from 'zustand-lib/storeGlobal';
import useMobileV2 from 'zustand-lib/storeMobile';

const title = getTitle('Tất cả sản phẩm');

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async (_ctx, _user, state) => {
      const {
        q = null,
        text = null,
        currentTab = '',
        sort = '',
        slug = '',
        tag = '',
        isAvailable = false,
        category = '',
        manufacturer = '',
      } = ctx.query || {};

      const { tabs } = state || {};

      const convertedIsAvailable = isAvailable === 'true';

      const dataRes = await ProductServiceV2.loadDataProduct({ ctx, limit: 12, tabs });

      return {
        props: {
          currentTab,
          sort,
          slug,
          text: q || text || '',
          tag,
          isAvailable: convertedIsAvailable || false,
          category,
          manufacturer,
          productsRes: dataRes,
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

const Products = ({ currentTab = '', sort = '', slug = '', tag, text, isMobile, isAvailable, category = '', manufacturer = '', productsRes }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const page = +router?.query?.page || 1;
  const tabs = useStore((state) => state.tabs);
  const { categories, topManufacturers } = useSetting();
  const cat = 'products';
  const pageTitle = 'Sản phẩm';
  const [mobile, setMobile] = useState(isMobile);
  const [productRes, setProductRes] = useState({ ...productsRes, isLoading: false });
  const mobileProductScrolling = useMobileV2((state) => state.mobileProductScrolling);

  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  // const skus = getListViewed();
  const [dataProduct, setDataProduct] = useState({
    keyword: text,
    totalPage: 1,
    searchProduct: [],
    numPage: page || 1,
    totalList: 0,
  });

  // load data
  useEffect(() => {
    const loadData = async () => {
      const { query = {} } = router || {};

      const currentTabObj = tabs?.find((tab) => tab.slug === (query?.currentTab || '')) || null;
      if (currentTabObj) {
        query[currentTabObj.type.toLowerCase()] = currentTabObj.value;
      }

      // new mobile UI
      if (isMobileV2) {
        setProductRes({ isLoading: true });
        let dataRes = [];
        const currentDrugCategory = categories?.find((drugCategory) => drugCategory.code === query?.category) || null;
        const currentManufacturer = topManufacturers?.find((manufactor) => manufactor.code === query?.manufacturer) || null;
        if (currentDrugCategory) {
          query.category = currentDrugCategory.code;
        }
        if (currentManufacturer) {
          query.manufacturer = currentManufacturer.code;
        }
        dataRes = await ProductServiceV2.loadDataProductMobileClient({ page: mobileProductScrolling ? 1 : +page || 1, query, tabs });
        if (isValid(dataRes)) {
          setDataProduct({
            ...dataProduct,
            searchProduct: dataRes?.data,
            totalPage: Math.ceil(dataRes?.total / PAGE_SIZE),
            numPage: mobileProductScrolling ? 1 : +page || 1,
            totalList: dataRes?.total,
          });
        } else {
          setDataProduct({ ...dataProduct, searchProduct: [], totalPage: 0, totalList: 0 });
        }
        setProductRes({ isLoading: false });
      } else {
        const dataRes = await ProductServiceV2.loadDataProductWeb({ query });
        setProductRes({ ...dataRes, isLoading: false });
      }
    };
    loadData();
  }, [currentTab, page, sort, slug, text, tag, isAvailable, category, manufacturer, mobileProductScrolling, router.query]);

  useEffect(() => {
    // TODO: mobileProductScrolling ? Scroll : Paging
    if (isMobileV2) {
      router.replace({
        query: {
          ...router.query,
          page: mobileProductScrolling ? 1 : page,
        },
      });
    }
  }, [isMobileV2, mobileProductScrolling]);

  const namePage = (val) => {
    let name = 'Tất cả sản phẩm';
    if (text) {
      return `Đang tìm từ khoá: “${text}”`;
    }
    if (val) {
      const currentTabs = tabs?.filter((tab) => tab?.slug === val) || [];
      name = currentTabs[0] ? currentTabs[0]?.name : name;
    }
    return name;
  };

  // xoay màn hình && mobile
  useEffect(() => {
    const landscape = screenOrientation(window);
    if (landscape) {
      setMobile(false);
    }
  }, []);

  useEffect(() => {
    const landscape = screenOrientation(window);
    window.addEventListener(
      'orientationchange',
      () => {
        if (landscape) {
          setMobile(true);
        } else {
          setMobile(false);
        }
      },
      false,
    );
  }, [mobile]);
  // xoay màn hình

  return (
    <Template overrideMV2Options={{ title: pageTitle }} isMobile={mobile} pageName={cat} pageTitle={pageTitle}>
      {isMobileV2 ? (
        <MV2ProductListing
          currentTab={currentTab}
          catName={cat}
          tag={tag}
          isAuthenticated={isAuthenticated}
          isAvailable={isAvailable}
          mobileProducts={dataProduct}
          setMobileProducts={setDataProduct}
          currentDrugCategory={category}
          currentManufacturer={manufacturer}
          isInit={productRes.isLoading}
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
          text={text}
          tag={tag}
          name={namePage(currentTab)}
          isAuthenticated={isAuthenticated}
          isMobile={mobile}
          isPageProducts
          isAvailable={isAvailable}
        />
      )}
    </Template>
  );
};

export default withLogin(Products, false, { url: '/products?login=true' });
