import { settingsSliderBanner } from 'constants/data';
import { useDragDetection } from 'hooks';
import { memo, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { gtag } from 'utils';
import { ImageFallbackBanner } from 'utils/ImageFallback';
import { useStore } from 'zustand-lib/storeGlobal';
import styles from './styles.module.css';

// tracking là banner trang chủ
const checkCondition = ({ targetURL: link, imgURL: image, name: alt, isTracking = true, width = 2500 }) => {
  const ItemBox = (
    <div className={styles.banner_bg_img}>
      <div className={styles.banner_img2}>
        <ImageFallbackBanner src={image} fallbackSrc={image} layout="fill" objectFit="contain" quality={100} width={width} isUseLoaderCacheProxy />
      </div>
    </div>
  );
  if (link && link.length > 0) {
    return (
      <a
        alt={alt}
        title={alt}
        href={link}
        onClick={() => {
          if (isTracking) gtag.clickBanner({ link });
        }}
      >
        {ItemBox}
      </a>
    );
  }
  return ItemBox;
};

// in-use
const BannerSlider = ({ banners = [], isSeller = false }) => {
  const isTracking = !isSeller && true;

  const homeBanners = useStore((state) => state.banners);
  const [infoBanner] = useState(banners?.length > 0 ? banners : homeBanners);

  const { handleMouseDown, dragging } = useDragDetection();
  const ref = useRef({});
  const handleChildClick = (e) => {
    if (dragging) {
      e.preventDefault();
    }
  };

  const sliderItem = infoBanner?.map((item) => {
    let itemSeller = {};
    if (isSeller) {
      itemSeller = {
        targetURL: item?.link,
        imgURL: item?.images[0],
        name: '',
        isTracking,
      };
    }

    const itemSlider = checkCondition(isSeller ? itemSeller : item);
    return (
      <div key={`slider-${item.id || item.code}`} onMouseDownCapture={handleMouseDown} onClickCapture={handleChildClick}>
        {itemSlider}
      </div>
    );
  });

  return (
    <div>
      <Slider
        ref={ref}
        {...settingsSliderBanner}
        afterChange={(index) => {
          if (isTracking) {
            gtag.showBanner({ link: infoBanner[index]?.targetURL || '' });
          }
        }}
      >
        {sliderItem}
      </Slider>
    </div>
  );
};

export default memo(BannerSlider);
