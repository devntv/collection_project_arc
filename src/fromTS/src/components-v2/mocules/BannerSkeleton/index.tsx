import { Skeleton } from '@material-ui/lab';
import { settingsSliderBanner } from 'constants/data';
import { memo } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styles from './styles.module.css';

type BannerSkeletonProps = {
  isMobile: boolean;
};

const BannerSkeleton: React.FC<BannerSkeletonProps> = ({ isMobile = false }) => (
  <>
    {isMobile ? (
      <div className={styles.wrapper_slider}>
        <Slider {...settingsSliderBanner}>
          <Skeleton variant="rect" width={1256} height={416} />
          <Skeleton variant="rect" width={1256} height={416} />
        </Slider>
      </div>
    ) : (
      <div className={styles.wrapper_slider}>
        <Slider {...settingsSliderBanner}>
          <Skeleton variant="rect" width={1256} height={416} />
          <Skeleton variant="rect" width={1256} height={416} />
        </Slider>
      </div>
    )}
  </>
);

export default memo(BannerSkeleton);
