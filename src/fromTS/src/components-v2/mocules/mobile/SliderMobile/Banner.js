import { Skeleton } from '@material-ui/lab';
import { LinkComp } from 'components/atoms';
import { swiperSettings } from 'constants/data';
import PropTypes from 'prop-types';
import { gtag, ImageFallback } from 'utils';
import { ImageFallbackBanner } from 'utils/ImageFallback';
import Slider from './index';
import styles from './styles.module.css';

export default function Banner({ banners = [], insider = false, priority = false }) {
  if (banners.length === 0) {
    return <Skeleton variant="rect" width="100%" height={250} style={{ borderRadius: '12px', marginTop: '20px' }} />;
  }

  const SlideItems = banners.map((banner) => (
    <LinkComp
      removeStyles
      href={banner?.target}
      key={`item-banner-${banner.url}`}
      className={styles.wrapper_slide}
      onClick={() => gtag.clickBanner({ link: banner?.target })}
    >
      {insider ? (
        <ImageFallback src={banner?.url} layout="responsive" width="750" height="400" objectFit="contain" />
      ) : (
        <ImageFallbackBanner
          className={styles.wrapper_slide_image}
          src={banner?.url}
          fallbackSrc={banner?.url}
          layout="responsive"
          width="750"
          height="400"
          objectFit="contain"
          alt={banner?.alt}
          isUseLoaderCacheProxy
          priority={!!priority}
        />
      )}
    </LinkComp>
  ));

  return <Slider options={swiperSettings} slideItems={SlideItems} />;
}
Banner.propTypes = {
  banners: PropTypes.arrayOf(PropTypes.object),
};
