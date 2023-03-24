import { Box, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { memo } from 'react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styles from './styles.module.css';

const SliderProductBlock = memo(() => (
  <div className={styles.sliderProductBlockWrapper}>
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Skeleton variant="rect" animation="wave" className={styles.titleSliderProduct} />
        </Box>
      </Grid>
    </Grid>
    <div style={{ marginTop: 40 }}>
      <div className={styles.sliderWrapper}>
        <Skeleton variant="rect" animation="wave" className={styles.productCardSkeleton} />
        <Skeleton variant="rect" animation="wave" className={styles.productCardSkeleton} />
        <Skeleton variant="rect" animation="wave" className={styles.productCardSkeleton} />
        <Skeleton variant="rect" animation="wave" className={styles.productCardSkeleton} />
        <Skeleton variant="rect" animation="wave" className={styles.productCardSkeleton} />
      </div>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Grid item>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Skeleton variant="rect" animation="wave" className={styles.buttonSliderProductSkeleton} />
          </Box>
        </Grid>
      </Grid>
    </div>
  </div>
));

export default SliderProductBlock;
