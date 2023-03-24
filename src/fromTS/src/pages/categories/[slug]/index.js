/* eslint-disable camelcase */
import CatClient from 'clients/CatClientV2';
import Template from 'components/layout/Template';
import ProductListing from 'components/organisms/ProductListing';
import { useProduct } from 'context';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { doWithServerSide, ProductServiceV2 } from 'services';
import { getTitle } from 'utils/SEOUtils';

const title = getTitle('Tất cả sản phẩm');

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async () => {
      const [productsRes, catInfo, tabs] = await Promise.all([
        ProductServiceV2.loadProductWithCategory({ ctx }),
        CatClient.loadCategoryInfoBySlug(ctx),
        ProductServiceV2.getListTabs({ ctx }),
      ]);
      const currentTab = ctx.query.currentTab || '';
      const sort = ctx.query.sort || '';
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
          sort,
          slug,
          tabs,
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

export default function Products({
  user,
  products,
  catInfo = '',
  total,
  tabs = [],
  currentTab = '',
  page = '',
  sort = '',
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
        currentTab={currentTab}
        page={page}
        sort={sort}
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
