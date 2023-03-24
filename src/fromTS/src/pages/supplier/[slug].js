/* eslint-disable import/no-named-as-default-member */
/* eslint-disable camelcase */
import { CatClient, isValid } from 'clients';
import Template from 'components/layout/Template';
import ProductListing from 'components/organisms/ProductListing';
import { NOT_FOUND_URL } from 'constants/Paths';
import Image from 'next/image';
import ProductService from 'services/ProductService';
import { doWithServerSide } from 'services/SsrService';
import SupplierService from 'services/SupplierService';

import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid } from '@material-ui/core';
import { LOGO_PHARMACY } from 'constants/Images';
import { withLogin } from 'HOC';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getTitle } from 'utils/SEOUtils';
import styles from './styles.module.css';

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async () => {
      const [productsRes, brand, group, tabs, supplierRes] = await Promise.all([
        ProductService.loadDataProduct({ ctx }),
        CatClient.loadBrand({ ctx, params: { limit: 20 } }),
        CatClient.loadGroup({ ctx, params: { limit: 20 } }),
        ProductService.getListTabs({ ctx }),
        SupplierService.getInfoSupplier({ ctx }),
      ]);
      if (!isValid(supplierRes)) {
        return {
          redirect: {
            destination: NOT_FOUND_URL,
          },
        };
      }

      const currentTab = ctx.query.currentTab || '';
      const sortBy = ctx.query.sortBy || '';
      const page = Number(ctx.query.page) || 1;
      const slug = ctx.query.slug || '';

      const { data = [], total = 0 } = productsRes;

      return {
        props: {
          products: data,
          total,
          currentTab,
          page,
          sortBy,
          brand,
          group,
          slug,
          tabs,
          supplier: supplierRes.data[0],
        },
      };
    },
    {
      serverSideTranslations,
      namespaces: ['common'],
    },
  );
}

const Supplier = ({
  products,
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
  supplier,
}) => {
  const title = getTitle(supplier.name);
  const cat = 'supplier';
  return (
    <Template title={title} isMobile={isMobile}>
      <Grid className={styles.supplierWrapper} container>
        <Grid container item className={styles.container}>
          <div className={styles.logoPharma}>
            <Image src={LOGO_PHARMACY} width="215px" height="200px" />
          </div>
          <div style={{ width: '70%' }}>
            <h1 className={styles.supplierName}>{supplier?.name}</h1>
            <div className={styles.supplierRating}>
              <div className={styles.rating}>
                <div className={styles.ratingBase}>
                  <FontAwesomeIcon className={styles.star} icon={faStar} />
                  <FontAwesomeIcon className={styles.star} icon={faStar} />
                  <FontAwesomeIcon className={styles.star} icon={faStar} />
                  <FontAwesomeIcon className={styles.star} icon={faStar} />
                  <FontAwesomeIcon className={styles.star} icon={faStar} />
                </div>
                {supplier.rating && (
                  <div className={styles.ratingStars} style={{ width: `${(supplier.rating / 5) * 100}%` }}>
                    <FontAwesomeIcon className={styles.star} icon={faStar} />
                    <FontAwesomeIcon className={styles.star} icon={faStar} />
                    <FontAwesomeIcon className={styles.star} icon={faStar} />
                    <FontAwesomeIcon className={styles.star} icon={faStar} />
                    <FontAwesomeIcon className={styles.star} icon={faStar} />
                  </div>
                )}
              </div>
            </div>
            {supplier.createdTime && <span className={styles.supplierYear}>Thành viên từ: {new Date(supplier.createdTime).getFullYear()}</span>}
          </div>
        </Grid>
      </Grid>
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
        isAuthenticated={isAuthenticated}
      />
    </Template>
  );
};

export default withLogin(Supplier, false);
