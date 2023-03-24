import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import { settingsStore } from 'constants/data';
import { BRAND_NAME, MOBILE_FLAGSHIP_LABEL } from 'constants/Enums';
import { FLAGSHIP_STORE_SLUGS } from 'constants/flagship-store';
import { STORE_IMAGE_DEFAULT } from 'constants/Images';
import { useSetting } from 'context';
import { useRef } from 'react';
import Slider from 'react-slick';
import { gtag } from 'utils';
import { formatNumber } from 'utils/FormatNumber';
import { ImageFallbackStoreImage } from 'utils/ImageFallback';
import { getProxyImageList } from 'utils/ImageUtils';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const StoreList = ({ sellers, loading, isMobileV2 = false }) => {
  const { getNameSeller } = useSetting();
  const ref = useRef(null);
  const infoSeller = (seller) => {
    if (FLAGSHIP_STORE_SLUGS.includes(seller.slug)) {
      const { name, slug } = seller;
      const { logo, numberProducts } = seller?.sellerStore || {};
      return {
        name,
        link: `/flagship-store/${slug}`,
        logo: logo || STORE_IMAGE_DEFAULT,
        numberProducts,
        isStore: true,
        isVip: true,
      };
    }

    const sellerInfo = getNameSeller({ seller: { code: seller?.code } });
    const { logo = [], numberProducts } = seller?.sellerStore || {};
    const { linkStore = '', linkSeller = '', name, isStore, isVip } = sellerInfo || {};
    return { name: name || seller?.name, link: linkStore || linkSeller, logo, numberProducts, isStore, isVip };
  };
  return (
    <>
      <Slider
        ref={ref}
        {...settingsStore}
        className={clsx(
          styles.slider,
          'section-outstanding__slider',
          'storeSlider',
          isMobileV2 && styles.mobileSlider,
          loading && styles.mobileLoadingSlider,
        )}
        infinite={sellers.length > 4}
        arrows={!isMobileV2}
        slidesToScroll={1}
        centerMode={loading ? true : !!(isMobileV2 && sellers.length > 1)}
      >
        {loading &&
          isMobileV2 &&
          Array.from({ length: 4 }, (e, idx) => (
            <div className={styles.mobileBannerSkeleton_container} key={idx}>
              <div className={styles.mobileBannerCard} style={{ padding: 0, background: 'none', border: 'none', justifyContent: 'left' }}>
                <Skeleton style={{ width: 'calc(100% - 25px)' }} height={100} variant="rect" />
              </div>
            </div>
          ))}
        {loading &&
          !isMobileV2 &&
          [{}, {}, {}, {}].map(() => (
            <div className={styles.storeCardWrapper} key={uuidv4()}>
              <div className={styles.storeCard} style={{ padding: 0, background: 'none', border: 'none', justifyContent: 'center' }}>
                <Skeleton style={{ width: 'calc(100% - 10px)' }} height={100} variant="rect" />
              </div>
            </div>
          ))}

        {sellers &&
          !loading &&
          sellers.length > 0 &&
          sellers.map((item) => {
            const { name, link, logo, numberProducts, isStore = false, isVip = false } = infoSeller(item);
            return (
              <LinkComp href={link} className={styles.storeCardWrapper} key={uuidv4()}>
                <Box
                  className={styles.storeCard}
                  onClick={() => {
                    if (isVip) {
                      gtag.clickFlagshipStoreNameID(name, item?.code);
                    } else {
                      gtag.clickSellerNameID(name, item?.code);
                    }
                  }}
                >
                  {isStore &&
                    (isVip ? (
                      <span className={clsx(styles.flagshipTag, isMobileV2 && styles.mobileFlagship_tag)}>
                        {isMobileV2 ? MOBILE_FLAGSHIP_LABEL : 'Hàng hãng'}
                      </span>
                    ) : (
                      <span className={styles.storeTag}>{BRAND_NAME} Store</span>
                    ))}

                  <div className={styles.storeLogoWrapper}>
                    <ImageFallbackStoreImage src={logo?.length > 0 && getProxyImageList(logo, 400)[0]} layout="fill" className={styles.storeLogo} />
                  </div>
                  <div className={styles.storeDetail}>
                    <Typography variant="h6" className={styles.storeName}>
                      {name}
                    </Typography>
                    {numberProducts > 0 && (
                      <Typography variant="body2" className={styles.storeProductQuantity}>
                        {formatNumber(numberProducts)} sản phẩm
                      </Typography>
                    )}
                  </div>
                </Box>
              </LinkComp>
            );
          })}
      </Slider>
    </>
  );
};

export default StoreList;
