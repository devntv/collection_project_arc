/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from 'clsx';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './styles.module.css';
// Import Swiper styles

export default ({ slideItems, options, ...restProps }) => {
  const { isMobileSeller = false, isBestProducts = false } = restProps;
  const swiperRef = useRef(null);
  const handleNext = () => {
    swiperRef?.current.swiper.slideNext();
  };
  const handlePrev = () => {
    swiperRef?.current.swiper.slidePrev();
  };
  return (
    <Swiper
      // install Swiper modules
      {...options}
      ref={swiperRef}
      className={clsx(
        styles.mobileGroupProduct_block,
        isMobileSeller && styles.mobileProductSeller_block,
        isBestProducts && styles.mobileBestProdSeller_block,
      )}
    >
      {slideItems.length > 0 && slideItems.map((SlideItem) => <SwiperSlide key={SlideItem.key}>{SlideItem}</SwiperSlide>)}
      {options?.navigation && (
        <>
          <div className={clsx(styles.customSwiper_prev, 'swiper-button-prev')} onClick={handlePrev}>
            {options.navigation.prevEl}
          </div>
          <div className={clsx(styles.customSwiper_next, 'swiper-button-next')} onClick={handleNext}>
            {options.navigation.nextEl}
          </div>
        </>
      )}
    </Swiper>
  );
};
