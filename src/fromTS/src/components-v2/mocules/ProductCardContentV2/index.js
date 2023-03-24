/* eslint-disable no-nested-ternary */
import { Box, CardContent, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import { SellerInfo } from 'components/mocules';
import TagComponent from 'components/mocules/TagComponent';
import { MAX_PRODUCT_QTY_DISPLAY } from 'constants/data';
import { FLAGSHIP_LABEL, LABEL_GIFT_TAG_PROMOTION } from 'constants/Enums';
import { getPathProductBySlug } from 'constants/Paths';
import { useSetting } from 'context';
import { useRouter } from 'next/router';
import { gtag } from 'utils';
import { ImageFallbackProductImage } from 'utils/ImageFallback';
import useGetTagPromotion from 'zustand-lib/useGetTagPromotion';
import useSellers from 'zustand-lib/useSellers';
import styles from './styles.module.css';

const ProductCardContentV2 = ({
  maxQuantity: productMaxQuantity,
  name = '',
  tags, // display in other pages
  volume,
  cate,
  categoryCodes = [],
  row,
  slug,
  className,
  isMobile = false,
  seller = '',
  isDeal = false,
  deal = null,
  // type: cartItemType,
  cart,
  statusData = {},
  isGift,
  requireGPPMessage = null,
  isCampaign,
  messageLimitOrder,
  maxQuantityPerDay,
  availableProducts = 0,
  quantityPurchasedToday,
  errorCode = null,
  sellerCode = null,
  isMobileV2 = false,
  page,
  lotDates = [],
  expiredDate,
  isWishlist = false, // wishlist v2
  imagesProxy = [],
  link,
  sku,
  skudId: productCode = '',
}) => {
  const isNearExpiration = lotDates?.find((item) => item?.isNearExpired === true);
  const { mapCategories = new Map(), mapSeller } = useSetting();
  const sellerInfo = mapSeller?.get(seller?.code || sellerCode) || null;
  const maxQtyDeal = deal?.maxQuantity - deal?.quantity || 0;
  // const percentDiscount = deal ? Math.round(100 - (dealPrice / salePrice) * 100) : null;
  const listMaxQuantity = [productMaxQuantity];
  const getSellerByCode = useSellers((state) => state.getSellerByCode);
  const router = useRouter();

  const { dataByPromoListsDetail, filterTagGift } = useGetTagPromotion();
  const isTagGift = filterTagGift(sku, dataByPromoListsDetail, productCode);
  const TagGift = () => (
    <span>
      <span className={styles.promoGift}>{LABEL_GIFT_TAG_PROMOTION}</span>
      <span style={{ fontWeight: 'bold' }}>&nbsp;-&nbsp;</span>
    </span>
  );

  // nếu có số theo ngày thì mới tính
  if (maxQuantityPerDay > 0) {
    listMaxQuantity.push(maxQuantityPerDay - quantityPurchasedToday);
  }

  // limit theo ngày ( tìm min ) , nếu < 0 thì set lại về 0
  let maxQuantityProduct = (isCampaign && availableProducts) || (isDeal && maxQtyDeal) || Math.min(...listMaxQuantity);
  if (maxQuantityProduct < 0) {
    maxQuantityProduct = 0;
  }

  return (
    <CardContent
      className={`${className}
      ${row ? styles.product_content : clsx(styles.product_content, styles.product_content_column)}`}
    >
      <div className={row ? styles.product_title_wrap : clsx(styles.product_title_wrap, styles.product_title_column_wrap, isMobile && styles.pl_50)}>
        <div className={clsx(styles.product_title, styles.align_center, isMobile && styles.pr_8)}>
          {((sellerInfo?.isVip && sellerInfo?.isStore) || tags?.includes('DUREX') || tags?.includes('SANOFI')) && (
            <>
              <span
                style={{
                  color: '#B98F0F',
                  fontSize: isMobileV2 ? '12px' : '16px',
                  fontFamily: 'googleSansMedium',
                  display: isTagGift ? 'none' : '',
                }}
              >
                {FLAGSHIP_LABEL}
              </span>
              <span style={{ display: isTagGift ? 'none' : '' }}>&nbsp; -&nbsp; </span>
            </>
          )}
          {isGift ? (
            <Typography
              className={clsx(styles.product_name, styles.giftlink, !isMobile && styles.flex_wrap, isMobileV2 && styles.product_name_mv2)}
              gutterBottom
              variant="h5"
              component="h2"
              data-test="product-content-name"
            >
              {isDeal && deal ? deal?.name : name || ''}
            </Typography>
          ) : (
            <LinkComp
              href={`/product/${slug || ''}/loading`}
              prefetch={false}
              padding="5px 0px 5px 0px"
              className={isMobileV2 ? styles.linkMobile : styles.link}
            >
              <Typography
                className={clsx(styles.product_name, !isMobile && styles.flex_wrap, isMobile && styles.product_name_mv2)}
                gutterBottom
                variant="h5"
                component="h2"
                onClick={async () => {
                  const sellerInfoZustand = await getSellerByCode({ code: sellerCode });
                  gtag.viewItemInPage({
                    product: {
                      name,
                      tags, // display in other pages
                      volume,
                      cate,
                      categoryCodes,
                      row,
                      slug,
                      className,
                      isMobile,
                      seller,
                      isDeal,
                      deal,
                      cart,
                      statusData,
                      isGift,
                      requireGPPMessage,
                      isCampaign,
                      messageLimitOrder,
                      maxQuantityPerDay,
                      availableProducts,
                      quantityPurchasedToday,
                      errorCode,
                      sellerCode,
                      sellerInfo: sellerInfoZustand,
                    },
                    path: router.pathname,
                  });
                }}
                data-test="product-content-name"
              >
                {isTagGift && <TagGift />}
                {isDeal && deal ? deal?.name : name || ''}
              </Typography>
            </LinkComp>
          )}
          {!isMobile && (
            <div className={clsx(styles.product_type, styles.muted, styles.align_center)}>
              <SellerInfo seller={seller} tags={tags} isProductCard isWishlist={isWishlist} />
            </div>
          )}
          {!isMobile && (
            <div className={clsx(styles.product_tags, styles.product_tags_column, styles.col_gap_5)}>
              <TagComponent
                product={{ tags, statusData, expiredDate: isNearExpiration?.expiredDate || expiredDate || '' }}
                isMobile={isMobile}
                isMobileV2={isMobileV2}
                page={page}
                isGift={isGift}
                link={link}
                isLinkTagDeal
              />
            </div>
          )}
        </div>
      </div>
      {isMobile && (
        <div className={styles.mobile_card_content}>
          <div className={styles.mobile_img}>
            <LinkComp href={`${getPathProductBySlug(slug)}/loading`} prefetch={false} padding="0px">
              <ImageFallbackProductImage
                src={imagesProxy[0] && `${imagesProxy[0]}`}
                fallbackSrc={imagesProxy[0]}
                alt={name && name}
                width={90}
                height={86}
                quality={100}
                title={name && name}
                className={styles.image}
                loading="lazy"
              />
            </LinkComp>
          </div>
          <div className={styles.mobile_info_content}>
            <div className={clsx(isMobileV2 ? styles.mobileProduct_type : styles.product_type, styles.muted)}>
              {cart && (
                <Typography variant="body2" color="textSecondary" component="p">
                  {volume || ''}
                </Typography>
              )}
              {!cart && <SellerInfo seller={seller} tags={tags} isProductCard isWishlist={isWishlist} />}
            </div>
            <div className={clsx(styles.product_tags_mobile, styles.product_tags_column, styles.col_gap_5)}>
              <TagComponent
                product={{ tags, statusData, expiredDate: isNearExpiration?.expiredDate || expiredDate || '' }}
                isMobile={isMobile}
                isMobileV2={isMobileV2}
                page={page}
                isGift={isGift}
                link={link}
                isLinkTagDeal
              />
            </div>
          </div>
        </div>
      )}
      {row === cate && categoryCodes && categoryCodes.length > 0 && mapCategories && (
        <Typography className={clsx(styles.product_category, styles.muted)} variant="body2" color="textSecondary" component="p">
          {/* Nhóm:&nbsp;
          {categoryCodes.map((item) => (
            <a key={uuidv4()} href={`/categories/${mapCategories?.get(item)?.slug}`}>
              {mapCategories?.get(item)?.name}
            </a>
          ))} */}
        </Typography>
      )}
      {errorCode !== 'MAX_QUANTITY' && maxQuantityPerDay > 0 && maxQuantityProduct < MAX_PRODUCT_QTY_DISPLAY && quantityPurchasedToday > 0 && (
        <Box className={styles.boxPerDay}>
          <Typography className={clsx(styles.product_category)} color="textSecondary" variant="body2" component="p">
            {`Bạn đã mua ${quantityPurchasedToday}/${maxQuantityPerDay || maxQuantityProduct} sản phẩm trong ngày `}
          </Typography>
        </Box>
      )}
    </CardContent>
  );
};

export default ProductCardContentV2;
