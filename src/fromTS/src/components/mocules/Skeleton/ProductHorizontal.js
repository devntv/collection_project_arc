import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { memo } from 'react';

const ProductHorizontalSkeleton = memo(() => (
  <div style={{ alignItems: 'center' }}>
    <Skeleton variant="rect" height={220} />
    <div style={{ paddingTop: '4px' }}>
      <Skeleton />
      <Skeleton width="70%" />
      <Skeleton width="50%" />
    </div>
    <div style={{ paddingTop: '40px' }}>
      <Skeleton width="25%" />
    </div>
    <div style={{ paddingTop: '8px', alignItems: 'center', display: 'flex' }}>
      <div style={{ marginRight: '8px' }}>
        <Skeleton animation="wave" variant="circle" width={25} height={25} />
      </div>
      <Skeleton width="100%" height={35}>
        <Typography>.</Typography>
      </Skeleton>
      <div style={{ marginLeft: '8px' }}>
        <Skeleton animation="wave" variant="circle" width={25} height={25} />
      </div>
    </div>
  </div>
));

export default ProductHorizontalSkeleton;
