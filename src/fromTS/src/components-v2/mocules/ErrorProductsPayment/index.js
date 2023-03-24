import { Divider, Grid } from '@material-ui/core';
import { useCart } from 'context';
import { Fragment } from 'react';
import ErrProductCard from '../ErrProductCard';
import styles from './styles.module.css';

function ErrorProductsPayment() {
  const { errProducts = [] } = useCart();

  return (
    <div className={styles.container}>
      <Grid container direction="column" className={styles.content}>
        <Grid item container justifyContent="space-between" alignItems="center" style={{ width: '100%', padding: '0px 19px' }}>
          <span>Tổng cộng SP Lỗi</span>
          <span>{errProducts?.length || 0}</span>
        </Grid>
        <Grid item container direction="row" style={{ width: '100%', padding: '0px 19px', marginTop: '20px', maxHeight: '373px', overflowY: 'auto' }}>
          {errProducts.map((item) => (
            <Fragment key={item?.sku}>
              <ErrProductCard product={item} />
              <Divider style={{ width: '100%' }} />
            </Fragment>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default ErrorProductsPayment;
