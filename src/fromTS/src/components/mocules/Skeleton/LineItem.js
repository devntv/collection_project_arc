import React, { memo } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';

const LineItemSkeleton = memo(() => (
  <div style={{ alignItems: 'center' }}>
    <Skeleton width="100%" height={24}>
      <Typography>.</Typography>
    </Skeleton>
  </div>
));

export default LineItemSkeleton;
