import { Grid } from '@material-ui/core';
import ProductCardNew from 'components/mocules/ProductCardNew';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const PromotionProduct = ({ products = [] }) => {
  const cloneProducts = JSON.parse(JSON.stringify(products));
  cloneProducts?.map((product) => {
    const item = product;
    item.isDeal = product?.deal && product?.deal?.status === 'ACTIVE' && true;
    return item;
  });
  return (
    <>
      {cloneProducts.length > 0 ? (
        <main className={styles.product_listing}>
          <div className={styles.product_grid_wrapper}>
            <Grid container spacing={1}>
              {cloneProducts.map((item) => (
                <Grid key={uuidv4()} item xs={4} sm={4} md={3} lg={2} xl={2} className={styles.customGrid}>
                  <ProductCardNew isHalfProgress key={`products-${uuidv4()}`} product={item} value={item.quantity || 0} category />
                </Grid>
              ))}
            </Grid>
          </div>
        </main>
      ) : (
        <p className={styles.noData}>Không có sản phẩm khuyến mãi</p>
      )}
    </>
  );
};
export default PromotionProduct;
