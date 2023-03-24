import { Box, CircularProgress, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';
import ProductPreview from 'components-v2/mocules/mobile/SliderMobile/ProductPreview';
import { LinkComp } from 'components/atoms';
import { swiperSettings } from 'constants/data';
import { ProductCardVertical } from 'components-v2/mocules/mobile/CardProduct';
import SliderMobile from 'components-v2/mocules/mobile/SliderMobile';
import { gtag } from 'utils';
import { ImageFallbackStatic } from 'utils/ImageFallback';

import styles from './styles.module.css';

const MV2SliderProduct = ({
  name,
  redirect,
  viewMore,
  page = null,
  icon,
  isBestProducts = false,
  loading = false,
  type = '',
  products, // props using for mobile v2
  isMobileSeller = false,
}) => {
  const SlideItems = products?.map((item) => <ProductCardVertical key={`slide-item-${item.slug}`} {...item} />);

  return page === 'PRD_DETAIL' ? (
    <Paper className={clsx(styles.wrapper, isBestProducts && styles.bestProductsWrapper)}>
      <div className={clsx(styles.icon_name, isBestProducts && styles.bestProducts)}>
        {icon && <ImageFallbackStatic src={icon} width={25} height={25} alt="icon" />}
        <Typography className={clsx(styles.name, isBestProducts && styles.bestProductsName)} variant="h5">
          {name}
        </Typography>
      </div>
      {isBestProducts && (
        <SliderMobile
          slideItems={SlideItems}
          options={{
            ...swiperSettings,
            pagination: false,
            centeredSlides: SlideItems?.length >= 3,
            slidesPerView: SlideItems?.length >= 3 ? 2 : 1,
            slidesPerGroup: 1,
          }}
          isBestProducts
        />
      )}

      {!isBestProducts && <ProductPreview slideItems={SlideItems} isMobileSeller={isMobileSeller} />}

      {viewMore && (
        <Box
          className={clsx(styles.view_more, styles.view_more_mv2)}
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
      {(loading || SlideItems?.length > 0) && (
        <div className={styles.wrapper_media}>
          <div className={styles.wrapper_media_container}>
            <div className={styles.SliderProductWrap}>
              <h2 className={styles.title}>{name}</h2>
              {loading ? (
                <Box className={styles.progress}>
                  <CircularProgress size={50} thickness={4} />
                </Box>
              ) : (
                <>
                  <SliderMobile options={swiperSettings} slideItems={SlideItems} />
                  {viewMore && (
                    <LinkComp href={`${redirect}`} color="#fff" className={styles.seeAll}>
                      Xem tất cả
                    </LinkComp>
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

export default MV2SliderProduct;
