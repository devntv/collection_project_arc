import { Avatar, Grid, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { useSetting } from 'context';
import React from 'react';
import styles from './styles.module.css';

function SellerInfoProduct({ seller, tags, products }) {
  const { getNameSeller } = useSetting();
  const { sellerName } = getNameSeller({ seller, tags });

  return (
    <Grid container xs={12} item className={styles.wrapContaineInfo}>
      <Grid item xs={10} className={styles.wrapAvatarInfo} container alignItems="center">
        <Avatar>
          <PersonIcon />
        </Avatar>
        <Typography>{sellerName}</Typography>
      </Grid>
      <Grid item xs={2} container justifyContent="flex-end" className={styles.totalProduct}>
        <Typography>{products?.length} sản phẩm</Typography>
      </Grid>
    </Grid>
  );
}

export default SellerInfoProduct;
