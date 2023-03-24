import { Box, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import { settingsBestProduct, settingsProduct } from 'constants/data';
import { TITLE_IMAGE_RESPONSIVE_STEP } from 'constants/flagship-store';
import useOnScreen from 'hooks/useOnScreen';
import { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { WEB_HOST } from 'sysconfig';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import styles from './styles.module.css';

const SliderProductCustom = ({
  children,
  name,
  redirect,
  viewMore,
  page = null,
  isBestProducts = false,
  titleColor = '',
  backgroundColor = '',
  backgroundTitleColor = '',
  titleBanner = '',
  bannerHeight = 90,
}) => {
  const ref = useRef(null);

  const getResponsiveTitleImageUrl = (widths, imageUrl) => {
    const imageUrlWithoutHost = imageUrl.replace(WEB_HOST, '');

    const url = imageUrlWithoutHost.split('.')[0];
    const type = imageUrlWithoutHost.split('.')[1];

    // eslint-disable-next-line no-restricted-syntax
    for (const width of widths) {
      if (width + 150 >= window.innerWidth) {
        return `${url}${width}.${type}`;
      }
    }

    return `${url}.${type}`;
  };

  const wrapperRef = useRef(null);

  const visible = useOnScreen(wrapperRef);

  useEffect(() => {
    if (ref?.current)
      if (visible) {
        ref.current.slickPlay();
      } else {
        ref.current.slickPause();
      }
  }, [visible]);

  return page === 'PRD_DETAIL' ? (
    <Paper className={clsx(styles.wrapper, isBestProducts && styles.bestProductsWrapper)} style={{ background: backgroundColor }} ref={wrapperRef}>
      {titleBanner ? (
        <Box className={styles.titleBanner} style={{ height: `${bannerHeight}px` }}>
          <ImageFallbackStatic
            src={getResponsiveTitleImageUrl(TITLE_IMAGE_RESPONSIVE_STEP, titleBanner)}
            layout="fill"
            priority
            quality={100}
            q={100}
            fallbackSrc={getResponsiveTitleImageUrl(TITLE_IMAGE_RESPONSIVE_STEP, titleBanner)}
          />
        </Box>
      ) : (
        <Box
          className={clsx(
            styles.icon_name,
            isBestProducts && styles.bestProducts,
            backgroundTitleColor === 'transparent' && styles.bestProductsNonePadding,
          )}
          style={{ backgroundColor: backgroundTitleColor }}
        >
          <Typography
            variant="h5"
            className={clsx(
              styles.name,
              isBestProducts && styles.bestProductsName,
              backgroundTitleColor === 'transparent' && styles.bestProductsName,
            )}
            style={{ color: titleColor }}
          >
            {name}
          </Typography>
        </Box>
      )}

      {isBestProducts && children.length > 0 && (
        <Slider
          ref={ref}
          {...settingsBestProduct}
          slidesToShow={children.length < 3 ? children.length : 3}
          initialSlide={children.length < 3 ? 0 : 1}
          centerMode={children.length >= 3}
          autoplay={visible}
        >
          {children}
        </Slider>
      )}

      {!isBestProducts && children.length > 0 && (
        <Slider ref={ref} {...settingsProduct} infinite={children.length > 5} autoplay={visible}>
          {children}
        </Slider>
      )}

      {viewMore && !isBestProducts && (
        <Box className={styles.view_more}>
          <LinkComp href={`${redirect}`} color={titleColor} name="Xem tất cả" />
        </Box>
      )}

      {!children && (
        <p style={{ color: titleColor }} className={styles.isUpdatingText}>
          Danh sách sản phẩm đang được cập nhật.
        </p>
      )}
    </Paper>
  ) : (
    <div className={styles.wrapper_media} ref={wrapperRef}>
      <div className={styles.wrapper_media_container}>
        <div className={styles.SliderProductCustomWrap}>
          <h2 className={styles.title}>{name}</h2>
          <Slider ref={ref} {...settingsProduct} autoplay={visible}>
            {children}
          </Slider>
          {viewMore && (
            <LinkComp href={`${redirect}`} color="#fff" className={styles.seeAll}>
              Xem tất cả
            </LinkComp>
          )}
        </div>
      </div>
    </div>
  );
};

export default SliderProductCustom;
