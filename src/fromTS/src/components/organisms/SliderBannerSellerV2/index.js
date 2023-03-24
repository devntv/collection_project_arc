import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import CustomSlider from 'components/organisms/CustomSlider';
import { settingsSliderBannerV2 } from 'constants/data';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const SliderBannerSellerV2 = ({ bannerImageUrls, isFullScreen = false }) => (
  <div style={{ marginTop: '38px' }}>
    <CustomSlider className={clsx(styles.slider, isFullScreen && styles.sliderFullScreen)} config={settingsSliderBannerV2}>
      {bannerImageUrls?.map((item) => (
        <div className={styles.banner_bg_img} key={uuidv4()}>
          {typeof item !== 'string' ? (
            <LinkComp href={item?.link || '/'}>
              <ImageFallbackStatic
                src={item?.images[0]}
                className={styles.banner_img}
                layout="fill"
                priority
                fallbackSrc={item?.images[0]}
                quality={100}
              />
            </LinkComp>
          ) : (
            <ImageFallbackStatic src={item} className={styles.banner_img} layout="fill" priority fallbackSrc={item} q={100} quality={100} />
          )}
        </div>
      ))}
    </CustomSlider>
  </div>
);

export default SliderBannerSellerV2;
