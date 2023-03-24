import { Box, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { memo } from 'react';

const ProductSliderBlockSkeleton = memo(() => (
  <div style={{ alignItems: 'center', margin: '30px' }}>
    <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
      <Grid item>
        <Box display="flex" alignItems="center">
          <Box marginRight="10px">
            <Skeleton variant="circle" animation="wave" width={72} height={72} />
          </Box>
          <Skeleton variant="rect" width={100} />
        </Box>
      </Grid>
      <Grid item>
        <Skeleton variant="rect" animation="wave" width={200} height={40} />
      </Grid>
    </Grid>
    <div style={{ margin: '30px 0' }}>
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <Skeleton variant="rect" animation="wave" width={230} height={450} />
        </Grid>
        <Grid item>
          <Skeleton variant="rect" animation="wave" width={230} height={450} />
        </Grid>
        <Grid item>
          <Skeleton variant="rect" animation="wave" width={230} height={450} />
        </Grid>
        <Grid item>
          <Skeleton variant="rect" animation="wave" width={230} height={450} />
        </Grid>
        <Grid item>
          <Skeleton variant="rect" animation="wave" width={230} height={450} />
        </Grid>
      </Grid>
    </div>
  </div>
));

export default ProductSliderBlockSkeleton;
