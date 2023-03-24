import { Box } from '@material-ui/core';
import { SellerInfo } from 'components/mocules';
import { MISSING_IMAGE } from 'constants/Images';
import { formatCurrency } from 'utils/FormatNumber';
import { getLinkCacheProxyProduct } from 'utils/ImageUtils';
import useChat from 'zustand-lib/useChat';
import styles from '../styles.module.css';

const ProductItem = ({ product }) => {
  // tạm ẩn tag
  // const { tags = [], statusData = {}, lotDates = [], slug = '', isGift } = product?.sku;
  // const isNearExpiration = lotDates?.find((item) => item?.isNearExpired === true) || {};
  // const link = getPathProductBySlugWithDomain(slug);
  const { isWebView } = useChat((state) => state);
  return (
    <Box className={styles.box}>
      <div className={styles.boxImg}>
        {product.product.imageUrls && (product.product.imageUrls || []).length > 0 ? (
          <img alt={product.product.name} src={getLinkCacheProxyProduct(product.product.imageUrls[0])} />
        ) : (
          <img alt={product.product.name} src={MISSING_IMAGE} />
        )}
      </div>
      <div className={styles.boxRight}>
        <div className={styles.titleProduct}>{product.product.name}</div>
        {product.sku?.sellerInfo && (
          <SellerInfo seller={product.sku?.sellerInfo} tags={product.sku?.tags} isProductCard isChat isWebView={isWebView} />
        )}
        <Box className={styles.priceProduct}>
          <span>{formatCurrency(product.displayPrice?.currentPrice)} </span>
          {product.displayPrice?.currentPrice < product.displayPrice?.originalPrice && (
            <>
              <span className={styles.originalPrice}>{formatCurrency(product.displayPrice?.originalPrice)}</span>
              {!!product.displayPrice?.percentageDiscount && (
                <span className={styles.percentageDiscount}> -{product.displayPrice?.percentageDiscount}%</span>
              )}
            </>
          )}
        </Box>
        {/* <div className={clsx(styles.product_tags, styles.product_tags_column)}>
          <TagComponent
            product={{ tags, statusData, expiredDate: isNearExpiration?.expiredDate || '' }}
            isMobile
            isMobileV2
            isProductCard
            isGift={isGift}
            link={link}
            isLinkTagDeal
            isChatMobile
          />
        </div> */}
      </div>
    </Box>
  );
};

export default ProductItem;
