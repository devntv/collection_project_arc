/* eslint-disable no-nested-ternary */
import { Box, CardContent, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import { MAX_PRODUCT_QTY_DISPLAY } from 'constants/data';
import { FLAGSHIP_LABEL, LABEL_GIFT_TAG_PROMOTION, MONITORING_COLLECTOR_TYPE } from 'constants/Enums';
import { useCart, useSetting } from 'context';
import { useRouter } from 'next/router';
import { FormatNumber, gtag } from 'utils';
import MonitorUtils from 'utils/MonitorUtils';
import useGetTagPromotion from 'zustand-lib/useGetTagPromotion';
import useSellers from 'zustand-lib/useSellers';
import SellerInfo from '../SellerInfo';
import TagComponent from '../TagComponent';
import styles from './styles.module.css';

const ProductCardContent = ({ page, cate, cart, className, row, isMobile, isMobileV2, product, link, isLinkTagDeal, mobileV2Horizontal = false }) => {
  const {
    maxQuantity: productMaxQuantity,
    name = '',
    // productTags, // display in the cart
    tags, // display in other pages
    volume,
    categoryCodes = [],
    slug,
    seller = '',
    isDeal = false,
    deal = null,
    type: cartItemType,
    statusData = {},
    isGift,
    requireGPPMessage = null,
    isCampaign,
    messageLimitOrder,
    maxQuantityPerDay,
    availableProducts = 0,
    quantityPurchasedToday,
    errorCode = null,
    errorMessage = null,
    sellerCode = null,
    lotDates = [],
    expiredDate,
    isNearOutOfStock = false,
    sku,
    skuId = '',
    productCode = '',
  } = product;

  const isNearExpiration = lotDates?.find((item) => item?.isNearExpired === true);
  const { mapSeller } = useSetting();
  const { getErrorCart } = useCart();
  const sellerInfo = mapSeller?.get(seller?.code || sellerCode) || null;
  const maxQtyDeal = deal?.maxQuantity - deal?.quantity || 0;
  // const percentDiscount = deal ? Math.round(100 - (dealPrice / salePrice) * 100) : null;
  const listMaxQuantity = [productMaxQuantity];
  const getSellerByCode = useSellers((state) => state.getSellerByCode);
  const router = useRouter();

  // nếu có số theo ngày thì mới tính
  if (maxQuantityPerDay > 0) {
    listMaxQuantity.push(maxQuantityPerDay - quantityPurchasedToday);
  }

  // limit theo ngày ( tìm min ) , nếu < 0 thì set lại về 0
  let maxQuantityProduct = (isCampaign && availableProducts) || (isDeal && maxQtyDeal) || Math.min(...listMaxQuantity);
  if (maxQuantityProduct < 0) {
    maxQuantityProduct = 0;
  }

  // tags promo gift
  const {
    dataByPromoListsDetail,
    filterTagGift,
    // promotionLists: { loading = false },
  } = useGetTagPromotion();
  // productCardContent use productCode and productCardContentNew use skuId
  const isTagGift = filterTagGift(sku, dataByPromoListsDetail, skuId || productCode);

  const TagGiftComp = () => (
    <span>
      <span className={styles.giftPromo}>{LABEL_GIFT_TAG_PROMOTION}</span>
      <span> - </span>
    </span>
  );

  return (
    <CardContent
      className={`${className}
      ${row ? styles.product_content : clsx(styles.product_content, styles.product_content_column)}`}
    >
      <div className={row ? styles.product_title_wrap : clsx(styles.product_title_wrap, styles.product_title_column_wrap)}>
        <div className={styles.product_title}>
          {isTagGift && <TagGiftComp />}
          {((sellerInfo?.isVip && sellerInfo?.isStore) || tags?.includes('DUREX') || tags?.includes('SANOFI')) && (
            <>
              <span
                style={{ color: '#B98F0F', fontSize: isMobileV2 ? '12px' : '16px', fontFamily: 'googleSansMedium' }}
                className={clsx(isTagGift ? styles.prioritizedPromo : '')}
              >
                {FLAGSHIP_LABEL}
              </span>
              <span style={{ display: isTagGift ? 'none' : '' }}>&nbsp; -&nbsp; </span>
            </>
          )}
          {/* {isGift ? (
            <Typography
              className={clsx(
                styles.product_name,
                styles.giftlink,
                !isMobile && styles.flex_wrap,
                isMobileV2 && styles.product_name_mv2,
                mobileV2Horizontal && styles.product_name_mv2_horizontal,
              )}
              gutterBottom
              variant="h5"
              component="h2"
              data-test="product-content-name"
            >
              {isDeal && deal ? deal?.name : name || ''}
            </Typography>
          ) : ( */}
          <LinkComp
            href={`/product/${slug || ''}/loading`}
            prefetch={false}
            padding="5px 0px 5px 0px"
            className={isMobileV2 ? styles.linkMobile : styles.link}
          >
            <Typography
              className={clsx(
                styles.product_name,
                !isMobile && styles.flex_wrap,
                isMobileV2 && styles.product_name_mv2,
                mobileV2Horizontal && styles.product_name_mv2_horizontal,
              )}
              gutterBottom
              variant="h5"
              component="h2"
              onClick={async () => {
                const sellerInfoGA = await getSellerByCode({ code: sellerCode, tags });
                gtag.viewItemInPage({
                  product: { ...product, sellerInfo: sellerInfoGA },
                  path: router.pathname,
                });
                MonitorUtils.sendSKUEvent(MONITORING_COLLECTOR_TYPE.SKU_DETAIL_VIEW, { ...product, sellerInfo: sellerInfoGA }, router.pathname);
              }}
              data-test="product-content-name"
            >
              {isDeal && deal ? deal?.name : name || ''}
            </Typography>
          </LinkComp>
          {/* )} */}
          {isMobile && (
            <div className={clsx(isMobileV2 ? styles.mobileProduct_type : styles.product_type, styles.muted)}>
              {cart && (
                <Typography variant="body2" color="textSecondary" component="p">
                  {volume || ''}
                </Typography>
              )}
              {!cart && <SellerInfo seller={seller} tags={tags} isProductCard />}
            </div>
          )}
          <div className={clsx(styles.product_tags, styles.product_tags_column)}>
            {/* {isDeal && percentDiscount > 0 && (
              <Link href="/deals" prefetch={false}>
                <div className={styles.discount_flag}>
                  <span className={styles.discount_flag_text}>Khuyến mãi</span>
                </div>
              </Link>
            )} */}
            {/* {productTags?.map((item) => (
              <TagType key={uuidv4()} item={item} exp={statusData?.date || null} />
            ))} */}
            <TagComponent
              product={{ tags, statusData, expiredDate: isNearExpiration?.expiredDate || expiredDate || '' }}
              isMobile={isMobile}
              isMobileV2={isMobileV2}
              page={page}
              isGift={isGift}
              link={link}
              isLinkTagDeal={isLinkTagDeal}
            />
            {/* {tags?.map((item) => (
              <TagType key={uuidv4()} item={item} exp={statusData?.date || null} />
            ))} */}
            {/* {tags?.map((tag) => {
              if (tag === 'DEAL') return null;
              return <TagType key={uuidv4()} item={tag} exp={statusData?.date || null} />;
            })} */}
          </div>
        </div>
        {!isMobile && (
          <div className={row ? clsx(styles.product_type, styles.muted) : clsx(styles.product_type, styles.muted, styles.align_center)}>
            {cart && (
              <Typography variant="body2" color="textSecondary" component="p">
                {volume || ''}
              </Typography>
            )}
            {!cart && <SellerInfo seller={seller} tags={tags} isProductCard />}
          </div>
        )}
      </div>
      {row === cate && categoryCodes && categoryCodes.length > 0 && (
        <Typography className={clsx(styles.product_category, styles.muted)} variant="body2" color="textSecondary" component="p">
          {/* Nhóm:&nbsp;
          {categoryCodes.map((item) => (
            <a key={uuidv4()} href={`/categories/${mapCategories?.get(item)?.slug}`}>
              {mapCategories?.get(item)?.name}
            </a>
          ))} */}
        </Typography>
      )}
      {/* require GPP  dư vì đã có ở product cart content */}
      {requireGPPMessage && (
        <Typography className={clsx(styles.product_category)} variant="body2" color="error" component="p">
          {requireGPPMessage}
        </Typography>
      )}
      {cart && (cartItemType === 'DEAL' || cartItemType === 'COMBO') && maxQtyDeal > 0 && (
        <div className={row ? styles.product_title_wrap : clsx(styles.product_title_wrap, styles.product_title_column_wrap)}>
          <Typography className={clsx(styles.product_category)} variant="body2" color="error" component="p">
            Chỉ còn <strong>{FormatNumber.formatNumber(maxQtyDeal)}</strong> sản phẩm. Hãy mau thanh toán để được hưởng ưu đãi
          </Typography>
        </div>
      )}
      {cart && messageLimitOrder && !isGift ? (
        <Box className={styles.boxPerDay}>
          <Typography className={clsx(styles.product_category)} color="textSecondary" variant="body2" component="p">
            {/* Đặt tối đa {formatNumber(maxQuantityProduct)} {unit || 'sản phẩm'} */}
            {messageLimitOrder || ''}
          </Typography>
        </Box>
      ) : null}
      {cart && isNearOutOfStock && (
        <div className={row ? styles.product_title_wrap : clsx(styles.product_title_wrap, styles.product_title_column_wrap)}>
          <Typography className={clsx(styles.product_category)} variant="body2" color="error" component="p">
            Chỉ còn lại {FormatNumber.formatNumber(statusData?.quantity)} sản phẩm
          </Typography>
        </div>
      )}
      {cart && errorCode && (
        <div className={row ? styles.product_title_wrap : clsx(styles.product_title_wrap, styles.product_title_column_wrap)}>
          <Typography className={clsx(styles.product_category)} variant="body2" color="error" component="p">
            {errorCode === 'MAX_QUANTITY' && !isNearOutOfStock
              ? maxQuantityProduct === 0
                ? `Bạn đã đặt quá số lượng cho phép trong ngày, vui lòng quay lại vào ngày mai`
                : quantityPurchasedToday === 0
                ? isDeal
                  ? ''
                  : ` Chỉ có ${maxQuantityProduct} sản phẩm vui lòng cập nhật lại số lượng`
                : `Bạn đã mua ${quantityPurchasedToday}/${maxQuantityPerDay}. Chỉ còn ${maxQuantityProduct} sản phẩm vui lòng cập nhật lại số lượng`
              : getErrorCart({ errorCode, errorMessage })}
          </Typography>
        </div>
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

export default ProductCardContent;
