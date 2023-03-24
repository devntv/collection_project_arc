/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import { isValid } from 'clients';
import CatClientV2 from 'clients/CatClientV2';
import Template from 'components/layout/Template';
import MV2ProductListing from 'components/organisms/Mobile/ProductListing';
import ProductListing from 'components/organisms/ProductListing';
import ProductListingLoading from 'components/organisms/ProductListing/loading';
import { PAGE_SIZE_30 } from 'constants/data';
import { withLogin } from 'HOC';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doWithServerSide, ProductServiceV2 } from 'services';
import { NotifyUtils, screenOrientation } from 'utils';
import { useStore } from 'zustand-lib/storeGlobal';
import useMobileV2 from 'zustand-lib/storeMobile';

const title = 'Tất cả sản phẩm – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async () => {
      const tagInfo = await CatClientV2.loadTagInfoBySlug(ctx);
      const { q = null, text = null, currentTab = '', sort = '', slug = '', tag = '', isAvailable = false } = ctx.query || {};
      const page = Number(ctx.query.page) || 1;
      const convertedIsAvailable = isAvailable === 'true';
      return {
        props: {
          currentTab,
          page,
          sort,
          slug,
          text: q || text,
          tag,
          isAvailable: convertedIsAvailable || false,
          SEO_CONFIG: {
            title,
          },
          tagInfo,
        },
      };
    },
    {
      serverSideTranslations,
      namespaces: ['common'],
    },
  );
}

const Products = ({ currentTab = '', page = '', sort = '', slug = '', tag, text, isMobile, isAuthenticated, isAvailable, tagInfo = '', user }) => {
  const tabs = useStore((state) => state.tabs);
  const cat = 'tag';
  const pageTitle = 'Sản phẩm';
  const [mobile, setMobile] = useState(isMobile);
  const [productRes, setProductRes] = useState({ isLoading: true });
  const router = useRouter();
  const { query = {} } = router || {};
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  const [dataProduct, setDataProduct] = useState({
    keyword: text,
    totalPage: 1,
    searchProduct: [],
    numPage: page || 1,
    totalList: 0,
  });
  const { provinceCode } = user || {};

  if (tagInfo) {
    if (tagInfo?.[0]?.code === 'DOCQUYENGIATOT') {
      query.provinceCode = provinceCode;
    }
    query.tag = tagInfo?.[0]?.code;
  }

  // load data
  useEffect(() => {
    const loadData = async () => {
      setProductRes({ isLoading: true });

      // const tagDetailResult = await CatClientV2.loadTagDetail({ params: { q: JSON.stringify({ slug }) } });
      if (!tagInfo?.[0]) {
        NotifyUtils.error('Không tìm thấy thông tin tag');
        router.push('/products');
        return;
      }
      const tagDetail = tagInfo?.[0]?.code;

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
        setProductRes({ isLoading: false });
      } else {
        // if (currentTabObj) {
        //   query[currentTabObj.type.toLowerCase()] = currentTabObj.value;
        // }
        const dataRes = await ProductServiceV2.loadDataProductWeb({ query });
        // setIsLoading(false);
        setProductRes({ ...dataRes, isLoading: false, tag: tagDetail });
      }
    };
    loadData();
  }, [currentTab, page, sort, slug, text, tag, isAvailable]);

  const namePage = (val) => {
    let name = 'Tất cả sản phẩm';
    if (productRes?.tag) {
      if (productRes.tag === 'DOCQUYENGIATOT') {
        return name;
      }
      return `${productRes.tag.name}`;
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
    <Template title={title} isMobile={mobile} pageName={cat} pageTitle={pageTitle}>
      {productRes.isLoading ? (
        <ProductListingLoading
          products={[]}
          isLoading
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
          isMobileV2={isMobileV2}
          isHideFilter
        />
      ) : isMobileV2 ? (
        <MV2ProductListing
          currentTab={currentTab}
          catName={cat}
          tag={tag}
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
          text={text}
          tag={tag}
          name={namePage(currentTab)}
          isAuthenticated={isAuthenticated}
          isMobile={mobile}
          isPageProducts
          isAvailable={isAvailable}
          isRedirectTab
        />
      )}
    </Template>
  );
};

export default withLogin(Products, false, { url: '/products?login=true' });
