/* eslint-disable camelcase */
import CatClient from 'clients/CatClient';
import Template from 'components/layout/Template';
import ProductListing from 'components/organisms/ProductListing';
import { useProduct } from 'context';
import { useEffect } from 'react';
import { doWithServerSide, ProductServiceV2 } from 'services';
import { getTitle } from 'utils/SEOUtils';

const title = getTitle('Tất cả sản phẩm');

// TODO: translate
export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const [productsRes, catInfo, brand, group, tabs] = await Promise.all([
      ProductServiceV2.loadProductWithCategory({ ctx }),
      CatClient.loadCategoryInfoBySlug(ctx),
      CatClient.loadBrand({ ctx, params: { limit: 20 } }),
      CatClient.loadGroup({ ctx, params: { limit: 20 } }),
      ProductServiceV2.getListTabs({ ctx }),
    ]);
    const currentTab = ctx.query.currentTab || '';
    const sortBy = ctx.query.sortBy || '';
    const page = Number(ctx.query.page) || 1;
    const slug = ctx.query.slug || '';
    const { data = [], total = 0 } = productsRes;

    return {
      props: {
        products: data,
        total,
        catInfo,
        currentTab,
        page,
        sortBy,
        brand,
        group,
        slug,
        tabs,
        SEO_CONFIG: {
          title,
        },
      },
    };
  });
}

export default function Products({
  user,
  products,
  catInfo = '',
  total,
  brand = [],
  group = [],
  tabs = [],
  currentTab = '',
  page = '',
  sortBy = '',
  slug = '',
  isMobile,
  isAuthenticated,
}) {
  const cat = 'categories';
  const pageTitle = 'Sản phẩm';
  const { getSkuHistoryPerDay, getListViewed } = useProduct();
  const skus = getListViewed();

  useEffect(() => {
    const loadData = async () => {
      getSkuHistoryPerDay({ skus });
    };
    loadData();
  }, []);

  return (
    <Template isMobile={isMobile} pageName={cat} pageTitle={pageTitle} point={user?.point || 0} balance={user?.balance || 0}>
      <ProductListing
        products={products}
        total={total}
        brand={brand}
        group={group}
        currentTab={currentTab}
        page={page}
        sortBy={sortBy}
        catName={cat}
        slug={slug}
        tabs={tabs}
        name={catInfo && catInfo[0] && catInfo[0].name}
        isAuthenticated={isAuthenticated}
        isMobile={isMobile}
      />
    </Template>
  );
}
