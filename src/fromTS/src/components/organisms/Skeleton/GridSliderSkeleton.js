import { Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import ProductSliderBlockSkeleton from 'components/mocules/Skeleton/ProductSliderBlock';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './style.module.css';

const GridSliderSkeleton = ({ counts = [], hasPagingBottom = false, pages = 1 }) => {
  const rows = [];
  let num = pages > 12 ? 13 : pages;
  if (num < 3) num = 3;
  const page = [];
  for (let i = 0; i < counts; i += 1) {
    rows.push(
      <Grid style={{ marginBottom: '30px' }} key={uuidv4()} item>
        <ProductSliderBlockSkeleton />
      </Grid>,
    );
  }
  for (let i = 0; i < num; i += 1) {
    page.push(<Skeleton key={uuidv4()} variant="circle" width={32} height={32} />);
  }
  return (
    <div>
      <Grid container justifyContent="flex-start" alignItems="stretch" direction="column" spacing={2} style={{ marginTop: '30px' }}>
        {rows}
      </Grid>
      {hasPagingBottom && <div className={styles.pagingSkeleton}>{page}</div>}
    </div>
  );
};

export default GridSliderSkeleton;
