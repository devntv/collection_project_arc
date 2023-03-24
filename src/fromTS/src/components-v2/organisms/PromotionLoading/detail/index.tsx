import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import BannerSkeleton from 'components-v2/mocules/BannerSkeleton';
import { GridSkeletonProductHorizontal } from 'components/organisms';
import { memo } from 'react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styles from '../styles.module.css';

type PromotionDetailLoadingProps = {
  isMobile: boolean;
};
const PromotionDetailLoading: React.FC<PromotionDetailLoadingProps> = ({ isMobile = false }) => (
  <Box className={isMobile ? styles.container_mobile : styles.container}>
    <div className={isMobile ? styles.wrapper_breadcrums_mobile : styles.wrapper_breadcrums}>
      {isMobile ? <Skeleton variant="rect" height={40} /> : <Skeleton variant="rect" width={350} height={40} />}
    </div>
    {/* Title sales */}
    {isMobile ? (
      <>
        <div className={styles.title_detail_left_mobile_loading}>
          <Skeleton variant="circle" width={40} height={40} />
          <Skeleton variant="rect" width={150} height={40} />
        </div>
        <div className={styles.sales_time_loading} style={{ marginTop: '20px' }}>
          <Skeleton variant="rect" width={140} height={50} style={{ borderRadius: '8px' }} />
          <Skeleton variant="rect" width={140} height={50} style={{ borderRadius: '8px' }} />
          <Skeleton variant="rect" width={140} height={50} style={{ borderRadius: '8px' }} />
        </div>
      </>
    ) : (
      <div className={styles.title_detail_loading} style={{ marginTop: '20px' }}>
        <div className={styles.title_detail_left_loading}>
          <Skeleton variant="circle" width={50} height={50} />
          <Skeleton variant="rect" width={300} height={50} />
        </div>
        <div className={styles.sales_time_loading}>
          <Skeleton variant="rect" width={140} height={50} style={{ borderRadius: '8px' }} />
          <Skeleton variant="rect" width={140} height={50} style={{ borderRadius: '8px' }} />
          <Skeleton variant="rect" width={140} height={50} style={{ borderRadius: '8px' }} />
        </div>
      </div>
    )}
    {/* Banner */}
    <BannerSkeleton isMobile={isMobile} />
    {/* Product listing block */}
    <div className={isMobile ? styles.wrapper_product_mobile_loading : styles.wrapper_product_loading}>
      <GridSkeletonProductHorizontal pages={isMobile ? 4 : 12} counts={isMobile ? 4 : 12} hasPagingBottom />
    </div>
  </Box>
);

export default memo(PromotionDetailLoading);
