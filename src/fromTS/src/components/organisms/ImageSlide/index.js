import { settingsSliderBanner } from 'constants/data';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { ImageFallbackProductImage } from 'utils/ImageFallback';
import styles from './styles.module.css';

export default function ImageSlide({ images = [] }) {
  return (
    <Slider {...settingsSliderBanner} className={styles.slider}>
      {images.map((image, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className={styles.item}
        >
          <ImageFallbackProductImage
            src={image && `${image}`}
            fallbackSrc={image}
            quality={100}
            width={400}
            height={400}
            loading="eager"
            className={styles.image}
          />
        </div>
      ))}
    </Slider>
  );
}
