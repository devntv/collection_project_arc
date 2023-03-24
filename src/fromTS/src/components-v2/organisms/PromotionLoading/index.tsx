import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import clsx from 'clsx';
import BannerSkeleton from 'components-v2/mocules/BannerSkeleton';
import CarouselProductSkeleton from 'components-v2/mocules/CarouselProductSkeleton';
import Breadcrumbs from 'components/mocules/Breadcrumbs';
import { GridSkeletonProductHorizontal } from 'components/organisms';
import { KHUYEN_MAI_LOADING } from 'constants/Paths';
import { memo } from 'react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from './styles.module.css';

type PromotionLoadingProps = {
  isMobile: boolean;
};
interface mobileV2Props {
  isMobileV2: () => boolean;
}

const PromotionLoading: React.FC<PromotionLoadingProps> = ({ isMobile = false }) => {
  const defaultBreadscrumbs = [
    { name: 'Trang chủ', url: '/' },
    { name: 'Khuyến mãi', url: KHUYEN_MAI_LOADING },
  ];
  const isMobileV2 = useMobileV2((state: mobileV2Props) => state.isMobileV2());

  return (
    <Box className={isMobile ? styles.container_mobile : styles.container}>
      {!isMobileV2 && (
        <div className={isMobile ? styles.wrapper_breadcrums_mobile : styles.wrapper_breadcrums}>
          <Breadcrumbs breadcrumbs={defaultBreadscrumbs} />
        </div>
      )}

      {/* Banner */}
      <BannerSkeleton isMobile={isMobile} />
      {/* Carousel block */}
      <CarouselProductSkeleton isMobile={isMobile} />
      {/* Daily sales block */}
      <div className={styles.wrapper_daily_sales_loading}>
        <div className={styles.title_daily_loading}>
          <Skeleton variant="rect" width={isMobile ? 200 : 400} height={isMobile ? 40 : 50} />
        </div>
        <div className={clsx(styles.wrapper_slider_product_loading, styles.padding_none)}>
          <GridSkeletonProductHorizontal pages={isMobile ? 4 : 12} counts={isMobile ? 2 : 5} />
        </div>
      </div>
    </Box>
  );
};

export default memo(PromotionLoading);
