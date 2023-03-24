import { LinkComp } from 'components/atoms';
import CustomSlider from 'components/organisms/CustomSlider';
import { settingsSliderBannerV2 } from 'constants/data';
import { getLinkCacheProxy } from 'utils/ImageUtils';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const SliderBannerSeller = ({ bannerImageUrls, isMobileV2 = false, w }) => (
  <div style={{ marginTop: !isMobileV2 && '38px' }}>
    <CustomSlider className={styles.slider} config={{ ...settingsSliderBannerV2, arrows: !isMobileV2 }}>
      {bannerImageUrls?.map((item) => (
        <div className={styles.banner_bg_img} key={uuidv4()}>
          {typeof item !== 'string' ? (
            <LinkComp href={item?.link || '/'}>
              <div
                style={{ backgroundImage: `url(${item?.images ? getLinkCacheProxy({ url: item?.images[0], w: w || 1200 }) : ''})` }}
                className={styles.banner_img}
              />
            </LinkComp>
          ) : (
            <div style={{ backgroundImage: `url(${getLinkCacheProxy({ url: item, w: w || 1200 })})` }} className={styles.banner_img} />
          )}
        </div>
      ))}
    </CustomSlider>
  </div>
);

export default SliderBannerSeller;
