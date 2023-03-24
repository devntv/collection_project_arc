import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { ProductCardVertical } from 'components-v2/mocules/mobile/CardProduct';
import ProductPreview from 'components-v2/mocules/mobile/SliderMobile/ProductPreview';
import { LinkComp } from 'components/atoms';
import ProductCardNew from 'components/mocules/ProductCardNew';
import { settingsNewProducts } from 'constants/data';
import useOnScreen from 'hooks/useOnScreen';
import { memo, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { gtag } from 'utils';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from './styles.module.css';

const ProductSliderBlock = ({ link, products, isAbleToSeeAll, isCampaignPage = false, isHalfProgress = false, dailyStyle }) => {
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());

  const wrapperRef = useRef(null);
  const ref = useRef(null);

  const visible = useOnScreen(wrapperRef);

  useEffect(() => {
    if (ref?.current)
      if (visible) {
        ref.current.slickPlay();
      } else {
        ref.current.slickPause();
      }
  }, [visible]);

  if (isMobileV2) {
    const ProductComponents = products.map((prd) => <ProductCardVertical key={`product-item-${prd.slug}`} isCampaignPage {...prd} />);
    return (
      <>
        <ProductPreview slideItems={ProductComponents} />
        <Box
          className={styles.wrapper_see_all}
          style={{ dailyStyle }}
          onClick={() => {
            gtag.clickViewAllPromotion(link);
          }}
        >
          <LinkComp
            href={link}
            className={clsx(styles.see_all, {
              [styles.sell_all_mv2]: isMobileV2,
            })}
          >
            Xem tất cả
          </LinkComp>
        </Box>
      </>
    );
  }

  return (
    <div className={isAbleToSeeAll ? styles.wrapper_product_slider : styles.disabled} ref={wrapperRef}>
      {products?.length > 0 ? (
        <Slider {...settingsNewProducts} ref={ref} autoplay={visible}>
          {products?.map((item) => (
            <ProductCardNew
              product={item}
              key={`item-product-${item.slug}`}
              isCampaignPage={isCampaignPage}
              isHalfProgress={isHalfProgress}
              link={link}
              isLinkTagDeal
            />
          ))}
        </Slider>
      ) : (
        <Typography className={styles.notification_text}>Sản phẩm khuyến mãi đang cập nhật</Typography>
      )}
      <Box
        className={styles.wrapper_see_all}
        style={{ dailyStyle }}
        onClick={() => {
          gtag.clickViewAllPromotion(link);
        }}
      >
        {products?.length > 0 && (
          <LinkComp href={link} className={clsx(isMobileV2 ? styles.sell_all_mv2 : styles.see_all)}>
            Xem tất cả
          </LinkComp>
        )}
      </Box>
    </div>
  );
};
export default memo(ProductSliderBlock);
