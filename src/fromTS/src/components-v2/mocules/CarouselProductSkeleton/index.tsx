import { Skeleton } from '@material-ui/lab';
import { GridSkeletonProductHorizontal } from 'components/organisms';
import { memo } from 'react';
import styles from './styles.module.css';

type CarouselProductSkeletonProps = {
  isMobile: boolean;
};

const CarouselProductSkeleton: React.FC<CarouselProductSkeletonProps> = ({ isMobile = false }) => (
  <>
    {isMobile ? (
      <div className={styles.wrapper_carousel_loading}>
        <div className={styles.title_loading}>
          <div className={styles.title_left_loading}>
            <Skeleton variant="circle" width={40} height={40} />
            <Skeleton variant="rect" width={100} height={40} />
          </div>
          <Skeleton variant="rect" width={100} height={40} />
        </div>
        <div className={styles.wrapper_slider_product_loading}>
          <GridSkeletonProductHorizontal pages={isMobile ? 4 : 12} counts={2} />
        </div>
        <div className={styles.wrapper_btn_loading}>
          <Skeleton variant="rect" width={125} height={30} />
        </div>
      </div>
    ) : (
      <div className={styles.wrapper_carousel_loading}>
        <div className={styles.title_loading}>
          <div className={styles.title_left_loading}>
            <Skeleton variant="circle" width={50} height={50} />
            <Skeleton variant="rect" width={400} height={50} />
          </div>
          <Skeleton variant="rect" width={150} height={50} />
        </div>
        <div className={styles.wrapper_slider_product_loading}>
          <GridSkeletonProductHorizontal pages={isMobile ? 4 : 12} counts={5} />
        </div>
        <div className={styles.wrapper_btn_loading}>
          <Skeleton variant="rect" width={125} height={40} />
        </div>
      </div>
    )}
  </>
);

export default memo(CarouselProductSkeleton);
