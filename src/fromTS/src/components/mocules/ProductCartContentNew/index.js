/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable camelcase */
import { CardContent, Grid, Tooltip, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import { FLAGSHIP_LABEL, LABEL_GIFT_TAG_PROMOTION, MONITORING_COLLECTOR_TYPE } from 'constants/Enums';
import { PRODUCTS_LOADING_URL } from 'constants/Paths';
import { useSetting } from 'context';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { TAG_NEW } from 'sysconfig';
import { gtag } from 'utils';
import MonitorUtils from 'utils/MonitorUtils';
import useMobileV2 from 'zustand-lib/storeMobile';
import useGetTagPromotion from 'zustand-lib/useGetTagPromotion';
import useSellers from 'zustand-lib/useSellers';
import { SellerInfo } from '..';
import PointOfProduct from '../PointOfProduct';
import TagComponent from '../TagComponent';
import styles from './styles.module.css';

const ProductCardContentNew = ({ row, product, isMobile = false, isSellerList, className = '', link, isLinkTagDeal }) => {
  const {
    name = '',
    isNew,
    point,
    pointMultiplier,
    tags,
    volume,
    slug,
    seller,
    isDeal = false,
    deal = null,
    statusData = {},
    sellerCode,
    isGift,
    expiredDate = '',
    lotDates = [],
    sku = '',
    skuId: productCode = '',
  } = product;

  const isNearExpiration = lotDates?.find((item) => item?.isNearExpired === true) || {};
  const { getNameSeller } = useSetting();
  const sellerInfo = getNameSeller({ seller });
  const { isVip = null, isStore = false } = sellerInfo || {};

  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  // tag gifts promotion
  const { dataByPromoListsDetail, filterTagGift } = useGetTagPromotion();
  // productCardContent use productCode and productCardContentNew use skuId
  const isTagGift = filterTagGift(sku, dataByPromoListsDetail, productCode);

  const router = useRouter();

  const getSellerByCode = useSellers((state) => state.getSellerByCode);
  // const shortTagNameList = tags?.filter((item) => item !== 'NEAR_EXPIRATION' && item !== 'HOADONNHANH' && item !== 'W80T' && item !== 'BANCHAY');
  const SellerVip = () => (
    <span className={clsx(isTagGift ? styles.prioritizedGiftTag : '')}>
      <span style={{ color: '#B98F0F', fontSize: '14px', fontFamily: 'googleSansMedium' }}>{FLAGSHIP_LABEL}</span>
      <span style={{ fontSize: '14px', color: '#000' }}> - </span>
    </span>
  );
  const isTagGiftByPromotion = () =>
    isTagGift ? (
      <span className={styles.giftPromo}>
        <span style={{ fontFamily: 'ggsm' }}>{LABEL_GIFT_TAG_PROMOTION}</span>
        <span style={{ color: 'black' }}> - </span>
      </span>
    ) : (
      ''
    );

  return (
    <CardContent
      className={clsx(className, styles.product_content, {
        [styles.product_content_column]: !row,
      })}
    >
      {/* {!isSellerList && (point || pointMultiplier) && (
        <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={1} className={styles.reward_points_wrapper}>
          <Grid item className={styles.reward_points}>
            <Typography>+{point || pointMultiplier}</Typography>
          </Grid>
          <Grid item className={styles.reward_text}>
            <Typography>Điểm tích luỹ</Typography>
          </Grid>
        </Grid>
      )} */}
      <Grid
        container
        direction="row"
        alignItems="center"
        className={clsx(styles.wrapPlusPoint, {
          [styles.wrapPlusPoint_mv2]: isMobileV2,
        })}
      >
        {!isSellerList && point > 0 && <PointOfProduct point={point} pointMultiplier={pointMultiplier} />}
      </Grid>
      <div className={styles.product_title}>
        {isGift ? (
          <>
            {((isVip && isStore) || tags?.indexOf('DUREX') >= 0 || tags?.indexOf('SANOFI') >= 0) && <SellerVip />}
            <Typography
              className={clsx(styles.product_name, styles.giftlink, {
                [styles.product_name_mv2]: isMobileV2,
              })}
              gutterBottom
              variant="h5"
              component="h2"
            >
              {isDeal && deal ? deal?.name : name}
            </Typography>
          </>
        ) : (
          <Typography
            style={{ lineHeight: '1.2' }}
            onClick={async () => {
              const sellerInfoData = await getSellerByCode({ code: sellerCode, tags });
              gtag.viewItemInPage({
                product: { ...product, sellerInfoData },
                path: router.pathname,
              });
              MonitorUtils.sendSKUEvent(MONITORING_COLLECTOR_TYPE.SKU_DETAIL_VIEW, { ...product, sellerInfoData }, router.pathname);
            }}
          >
            {isNew && !isVip && !isTagGift && (
              <Link href={`${PRODUCTS_LOADING_URL}?tag=${TAG_NEW}`} prefetch={false}>
                <a>
                  <span className={styles.new_tag}>Mới </span> <span className={styles.dash_tag}> - </span>
                </a>
              </Link>
            )}

            <span>
              {((isVip && isStore) || tags?.indexOf('DUREX') >= 0 || tags?.indexOf('SANOFI') >= 0) && <SellerVip />}
              <LinkComp href={`/product/${slug || ''}/loading`} prefetch={false} style={{ paddingLeft: '0', display: 'inline' }}>
                <Tooltip title={isDeal && deal ? deal?.name : name}>
                  <span
                    className={clsx(styles.product_name, {
                      [styles.product_name_mv2]: isMobileV2,
                    })}
                  >
                    {isTagGiftByPromotion()} {isDeal && deal ? deal?.name : name}
                  </span>
                </Tooltip>
              </LinkComp>
            </span>
          </Typography>
        )}
      </div>
      {!isSellerList && (
        <Tooltip title={volume}>
          <Typography className={styles.product_volume} variant="body2" color="textSecondary" component="p">
            {`${volume} `}
          </Typography>
        </Tooltip>
      )}
      {!isSellerList && (
        <div className={styles.seller_wrapper}>
          <SellerInfo seller={seller} tags={tags} isProductCard />
        </div>
      )}

      <div
        className={clsx(styles.product_tags, styles.product_tags_column, {
          [styles.product_tag_mv2]: isMobileV2,
        })}
      >
        <TagComponent
          product={{ tags, statusData, expiredDate: isNearExpiration?.expiredDate || expiredDate || '' }}
          isMobile={isMobile}
          isMobileV2={isMobileV2}
          isProductCard
          isGift={isGift}
          link={link}
          isLinkTagDeal={isLinkTagDeal}
        />
      </div>
    </CardContent>
  );
};
export default ProductCardContentNew;
