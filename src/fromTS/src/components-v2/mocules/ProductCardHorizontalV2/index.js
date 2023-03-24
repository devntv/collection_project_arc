import { Card, CardActionArea } from '@material-ui/core';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import { ProductCardInput } from 'components/mocules';
import { getPathProductBySlug } from 'constants/Paths';
import useTrackingMonitor from 'hooks/useTrackingMonitor';
import { memo, useRef } from 'react';
import { ImageFallbackProductImage } from 'utils/ImageFallback';
import ProductCardContentV2 from '../ProductCardContentV2';
import styles from './styles.module.css';

const ProductCardHorizontalV2 = ({ product, isMobile, type, index, wishlist = false, handleDelete, link }) => {
  const searchInput = useRef([]);
  const { slug, name, isDeal, imagesProxy = [] } = product || {};

  const trackingRef = useRef(null);
  useTrackingMonitor(trackingRef, product, isMobile);

  if (isMobile) {
    return (
      <div data-test="row-product-card" ref={trackingRef}>
        <div className={styles.root_card_mobile}>
          <Card className={styles.product_card_mobile}>
            <div className={styles.product_content_mobile}>
              <ProductCardContentV2 page={type} cate {...product} isMobile={isMobile} link={link} />
              <ProductCardInput
                searchInput={searchInput}
                index={index}
                product={product}
                // onIncrement={onIncrement}
                type={type}
                row
                {...product}
                key={product?.sku}
                isMobile={isMobile}
                wishlist={wishlist}
                handleDelete={handleDelete}
              />
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.button_container} data-test="row-product-card" ref={trackingRef}>
      <div className={styles.root_card}>
        <Card className={clsx(styles.product_card, isDeal ? styles.isdeal : '')}>
          <div className={styles.product_image}>
            <CardActionArea>
              <LinkComp href={`${getPathProductBySlug(slug)}/loading`} prefetch={false} padding="0px">
                <ImageFallbackProductImage
                  src={imagesProxy[0] && `${imagesProxy[0]}`}
                  fallbackSrc={imagesProxy[0]}
                  alt={name && name}
                  width={100}
                  height={100}
                  quality={100}
                  title={name && name}
                  className={styles.image}
                  loading="lazy"
                />
              </LinkComp>
            </CardActionArea>
          </div>
          <ProductCardContentV2 page={type} cate {...product} isWishlist={wishlist} link={link} />
          <ProductCardInput
            searchInput={searchInput}
            index={index}
            product={product}
            // onIncrement={onIncrement}
            type={type}
            row
            {...product}
            key={product?.sku}
            wishlist={wishlist}
            handleDelete={handleDelete}
          />
        </Card>
      </div>
    </div>
  );
};

export default memo(ProductCardHorizontalV2);
