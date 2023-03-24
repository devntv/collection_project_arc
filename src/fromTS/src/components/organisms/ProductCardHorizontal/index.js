import { Card, CardActionArea } from '@material-ui/core';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import ProductCardContent from 'components/mocules/ProductCardContent';
import { MONITORING_COLLECTOR_TYPE } from 'constants/Enums';
import { getPathProductBySlug } from 'constants/Paths';
import useTrackingMonitor from 'hooks/useTrackingMonitor';
import { useRouter } from 'next/router';
import { memo, useRef } from 'react';
import { gtag } from 'utils';
import { ImageFallbackProductImage } from 'utils/ImageFallback';
import MonitorUtils from 'utils/MonitorUtils';
import useSellers from 'zustand-lib/useSellers';
import ProductCardBuy from '../ProductCardBuy';
import styles from './styles.module.css';

// style cho mobile v1 && v2

const ProductCardHorizontal = ({ product, isMobile, type, index, wishlist = false, handleDelete, link }) => {
  const searchInput = useRef([]);
  const { slug, name, isDeal, defaultImage } = product || {};
  const router = useRouter();
  const getSellerByCode = useSellers((state) => state.getSellerByCode);

  const trackingRef = useRef(null);
  useTrackingMonitor(trackingRef, product, isMobile);
  return (
    <div className={styles.button_container} data-test="row-product-card" ref={trackingRef}>
      <div className={styles.root_card}>
        <Card className={clsx(styles.product_card, isDeal ? styles.isdeal : '')}>
          <div className={styles.product_image}>
            <CardActionArea>
              <LinkComp href={`${getPathProductBySlug(slug)}/loading`} prefetch={false} padding="0px">
                {/* <CardMedia
                  component="img"
                  alt={name && name}
                  height="50"
                  width="50"
                  image={`${(imagesProxy && imagesProxy[0]) || MISSING_IMAGE}?size=50`}
                  title={name && name}
                /> */}
                <ImageFallbackProductImage
                  src={defaultImage}
                  alt={name && name}
                  width={100}
                  height={100}
                  quality={100}
                  title={name && name}
                  className={styles.image}
                  loading="lazy"
                  onClick={async () => {
                    const sellerInfo = await getSellerByCode({ code: product?.sellerCode });
                    gtag.viewItemInPage({ product: { ...product, sellerInfo }, path: router.pathname });
                    MonitorUtils.sendSKUEvent(MONITORING_COLLECTOR_TYPE.SKU_DETAIL_VIEW, { ...product, sellerInfo }, router.pathname);
                  }}
                />
              </LinkComp>
            </CardActionArea>
          </div>
          {isMobile ? (
            <div className={styles.rightBox}>
              <ProductCardContent page={type} tag cate product={product} isMobile={isMobile} link={link} isLinkTagDeal />
              <ProductCardBuy
                searchInput={searchInput}
                index={index}
                {...product}
                product={product}
                type={type}
                wishlist={wishlist}
                handleDelete={handleDelete}
              />
            </div>
          ) : (
            <>
              <ProductCardContent page={type} tag cate product={product} link={link} isLinkTagDeal />
              <ProductCardBuy
                searchInput={searchInput}
                index={index}
                {...product}
                product={product}
                type={type}
                wishlist={wishlist}
                handleDelete={handleDelete}
              />
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default memo(ProductCardHorizontal);
