import { Box, CircularProgress, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { ProductCardVertical } from 'components-v2/mocules/mobile/CardProduct';
import ProductPreview from 'components-v2/mocules/mobile/SliderMobile/ProductPreview';
import { LinkComp } from 'components/atoms';
import { MAP_BTN_TITLE_BY_REDIRECT_URL, settingsBestProduct, settingsProduct } from 'constants/data';
import { DOUBLE_ARROW_ICON, SAME_INGREDIENT, SAME_STORE } from 'constants/Images';
import useOnScreen from 'hooks/useOnScreen';
import { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { gtag } from 'utils';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from './styles.module.css';

const SliderProduct = ({
  children,
  name,
  redirect,
  viewMore,
  page = null,
  icon,
  iconWidth,
  iconHeight,
  isBestProducts = false,
  loading = false,
  type = '',
  products, // props using for mobile v2
}) => {
  const ref = useRef(null);
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  const TITLE_ICON = name === 'Sản phẩm cùng nhà bán hàng' ? SAME_STORE : SAME_INGREDIENT;
  const SlideItems = products?.map((item) => <ProductCardVertical {...item} />);

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
    <Paper
      ref={wrapperRef}
      className={clsx(styles.wrapper, isBestProducts && styles.bestProductsWrapper, {
        [styles.wrapper_mv2]: isMobileV2,
      })}
    >
      <Box
        className={clsx(styles.icon_name, isBestProducts && styles.bestProducts, {
          [styles.icon_name_mv2]: isMobileV2,
        })}
      >
        {icon && <ImageFallbackStatic src={icon} width={iconWidth || 40} height={iconHeight || 40} alt="icon" />}
        <Typography
          className={clsx(styles.name, isBestProducts && styles.bestProductsName, {
            [styles.name_mv2]: isMobileV2,
          })}
          variant="h5"
        >
          {isMobileV2 && <ImageFallbackStatic width={24} height={24} src={TITLE_ICON} />} {name}
        </Typography>
        {isBestProducts && (
          <Box className={styles.bestProducts_view_more}>
            <a href={`${redirect}`}>
              <span>Xem tất cả</span>
              <ImageFallbackStatic src={DOUBLE_ARROW_ICON} width={12} height={12} alt="icon" />
            </a>
          </Box>
        )}
      </Box>
      {isBestProducts &&
        (isMobileV2 ? (
          <ProductPreview slideItems={SlideItems} appendSettings={{ initialSlide: SlideItems?.length < 3 ? 0 : 1 }} />
        ) : (
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
        ))}

      {!isBestProducts &&
        (isMobileV2 ? (
          <ProductPreview slideItems={SlideItems} appendSettings={{ infinite: SlideItems?.length > 4 }} />
        ) : (
          <Slider ref={ref} {...settingsProduct} infinite={children.length > 4} autoplay={visible}>
            {children}
          </Slider>
        ))}

      {viewMore && !isBestProducts && (
        <Box
          className={clsx(styles.view_more, {
            [styles.view_more_mv2]: isMobileV2,
          })}
          onClick={() => {
            if (type === 'SAME_MANUFACTURER') {
              gtag.clickViewAllProductSameManufacturer();
            }

            if (type === 'SAME_INGREDIENT') {
              gtag.clickViewAllProductSameIngredient();
            }
          }}
        >
          <LinkComp href={`${redirect}`} color="#0E1983" name="Xem tất cả" />
        </Box>
      )}
    </Paper>
  ) : (
    <>
      {(loading || children?.length > 0) && (
        <div className={styles.wrapper_media} ref={wrapperRef}>
          <div className={styles.wrapper_media_container}>
            <div className={styles.SliderProductWrap}>
              <h2 className={clsx(styles.title, styles.megaSale_name)}>
                {icon}
                <Typography variant="body" component="span">
                  {name}
                </Typography>
              </h2>
              {loading ? (
                <Box className={styles.progress}>
                  <CircularProgress size={50} thickness={4} />
                </Box>
              ) : (
                <>
                  <Slider ref={ref} {...settingsProduct} infinite={children.length > 5} autoplay={visible}>
                    {children}
                  </Slider>
                  {viewMore && (
                    <div className={styles.seeAllWrapper}>
                      <LinkComp href={`${redirect}`} color="#fff" className={styles.seeAll}>
                        {MAP_BTN_TITLE_BY_REDIRECT_URL[redirect] || 'Xem tất cả'}
                      </LinkComp>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SliderProduct;
