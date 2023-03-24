import { Grid } from '@material-ui/core';
import { useEffect } from 'react';
import { getLinkTagDeal } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import useGetTagPromotion from 'zustand-lib/useGetTagPromotion';
import ProductCardNew from '../ProductCardNew';
import styles from './styles.module.css';

const ListProductSeller = ({ products = [], isMobileV2 = false }) => {
  const { getPromoLists } = useGetTagPromotion();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getPromoLists({ getVoucherInfo: false, signal });

    return () => controller.abort();
  }, []);

  if (isMobileV2) {
    return (
      <div className={styles.mobileProduct_grid_wrapper}>
        <Grid container spacing={1}>
          {products?.map((item) => (
            <Grid key={`grid-product-${item.slug}`} item xs={6} sm={4} md={3} lg={3} xl={2} className={styles.customGrid}>
              <ProductCardNew product={item} key={`item-product-${item.slug}`} link={getLinkTagDeal(item)} isLinkTagDeal />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
  return (
    <div className={styles.product_listing}>
      <div className={styles.product_grid_wrapper}>
        <Grid container spacing={1}>
          {products?.map((item) => (
            <Grid key={uuidv4()} item xs={6} sm={4} md={3} lg={3} xl={2} className={styles.customGrid}>
              <ProductCardNew product={item} key={`item-product-${item.slug}`} link={getLinkTagDeal(item)} isLinkTagDeal />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default ListProductSeller;
