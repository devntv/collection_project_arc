/* eslint-disable camelcase */
import { getData, isValid } from 'clients';
import CatClientV2 from 'clients/CatClientV2';
import Template from 'components/layout/Template';
import ProductListing from 'components/organisms/ProductListing';
import ProductListingLoading from 'components/organisms/ProductListing/loading';
import { withLogin } from 'HOC';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doWithServerSide, ProductServiceV2 } from 'services';
import { NotifyUtils, screenOrientation } from 'utils';
import { getTitle } from 'utils/SEOUtils';
import { useStore } from 'zustand-lib/storeGlobal';

const title = getTitle('Tất cả sản phẩm');

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
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
      },
    };
  });
}

const Products = ({ currentTab = '', page = '', sort = '', slug = '', tag, text, isMobile, isAuthenticated, isAvailable }) => {
  // const { tabs } = useSetting();
  const tabs = useStore((state) => state.tabs);
  const cat = 'tab';
  const pageTitle = 'Sản phẩm';
  const [mobile, setMobile] = useState(isMobile);
  const [productRes, setProductRes] = useState({ isLoading: true });
  const router = useRouter();

  // load data
  useEffect(() => {
    const loadData = async () => {
      setProductRes({ isLoading: true });
      let detail = tabs?.find((item) => item.slug === slug);
      const { query = {} } = router || {};
      if (!detail) {
        const detailResult = await CatClientV2.loadTabDetail({ params: { q: JSON.stringify({ slug }) } });
        if (!isValid(detailResult)) {
          NotifyUtils.error('Không tìm thấy thông tin tab');
          router.push('/products');
          return;
        }
        detail = getData(detailResult)?.find((item) => item.slug === slug);
      }

      // }
      const filter = {};
      filter[detail?.type?.toLowerCase()] = detail?.value;
      const dataRes = await ProductServiceV2.loadDataProductWeb({ query, filter });

      // setIsLoading(false);
      setProductRes({ ...dataRes, isLoading: false, tag: detail });
    };
    loadData();
  }, [currentTab, page, sort, slug, text, tag, isAvailable]);

  const namePage = (slugTab) => {
    let name = 'Tất cả sản phẩm';
    if (productRes?.tag) {
      return `${productRes.tag.name}`;
    }
    if (slug) {
      const currentTabs = tabs?.filter((tab) => tab?.slug === slugTab) || [];
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
    <Template isMobile={mobile} pageName={cat} pageTitle={pageTitle}>
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
          name={namePage(slug)}
          isAuthenticated={isAuthenticated}
          isMobile={mobile}
          isPageProducts
          isAvailable={isAvailable}
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
          name={namePage(slug)}
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
