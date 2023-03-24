import { Card, CardContent, Chip, Grid } from '@material-ui/core';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import { MONITORING_COLLECTOR_TYPE } from 'constants/Enums';
import useTrackingMonitor from 'hooks/useTrackingMonitor';
import { useRouter } from 'next/router';
import { memo, useRef } from 'react';
import { DOMAIN_WEB_HOST } from 'sysconfig';
import { gtag } from 'utils';
import { ImageFallbackProductImage } from 'utils/ImageFallback';
import MonitorUtils from 'utils/MonitorUtils';
import useMobileV2 from 'zustand-lib/storeMobile';
import useSellers from 'zustand-lib/useSellers';
import FavoriteButton from '../FavoriteButton';
import ProductCardInput from '../ProductCardInput';
import ProductCardContentNew from '../ProductCartContentNew';
import styles from './styles.module.css';

// contain mobile v2 style
const ProductCardNew = ({
  product,
  type,
  tag,
  onIncrement,
  index,
  isMobile,
  isSellerList = false,
  isHalfProgress = false,
  isCampaignPage = false,
  isBestProduct = false,
  link,
  isLinkTagDeal,
}) => {
  const { isContractPrice = false, name, slug, discountPercent, defaultImage, tags } = product;
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  const searchInput = useRef([]);

  const router = useRouter();
  const getSellerByCode = useSellers((state) => state.getSellerByCode);
  const trackingRef = useRef(null);
  const moveToDetail = () => {
    if (isMobileV2) router.push(`/product/${slug || ''}/loading`);
  };

  useTrackingMonitor(trackingRef, product, isMobile);

  // udpate giá hợp đồng
  // let nameLabel = null;
  let nameLabel = '';
  if (isContractPrice) {
    nameLabel = 'Giá Hợp Đồng';
  } else if (discountPercent) {
    nameLabel = `- ${discountPercent}%`;
  }

  // promotion
  // const { getPromoLists } = useGetTagPromotion();
  // useEffect(() => {
  //   const controller = new AbortController();
  //   const { signal } = controller;
  //   getPromoLists({ skus: [product?.sku], getVoucherInfo: false, signal });

  //   return () => controller.abort();
  // }, []);

  return (
    <Grid onClick={moveToDetail} className={styles.container} ref={trackingRef}>
      <Card
        className={clsx(styles.product_card, isBestProduct && styles.product_card_bestProduct, {
          [styles.product_card_mv2]: isMobileV2,
        })}
      >
        <div>
          <div className={styles.icon_wrapper}>
            {nameLabel && (
              <Chip
                label={nameLabel}
                className={clsx(styles.product_tag, {
                  [styles.product_tag_mv2]: isMobileV2,
                  [styles.product_tab_contract]: isContractPrice,
                })}
              />
            )}
            {!isSellerList && <FavoriteButton product={product} isProductCard />}
          </div>
          <div className={styles.product_image}>
            <CardContent style={{ width: '100%', height: '160px', position: 'relative', transform: 'scale(0.85)' }}>
              <LinkComp
                href={`${DOMAIN_WEB_HOST}/product/${slug || ''}/loading`}
                prefetch={false}
                style={{ padding: '0px' }}
                data-test={`product-no-${index}`}
              >
                <ImageFallbackProductImage
                  src={defaultImage}
                  fallbackSrc={defaultImage}
                  alt={name && name}
                  title={name && name}
                  className={clsx([styles.image, isMobile && styles.image_mobile])}
                  layout="fill"
                  onClick={async () => {
                    const sellerInfo = await getSellerByCode({ code: product?.sellerCode, tags });
                    gtag.viewItemInPage({ product: { ...product, sellerInfo }, path: router.pathname });
                    MonitorUtils.sendSKUEvent(MONITORING_COLLECTOR_TYPE.SKU_DETAIL_VIEW, { ...product, sellerInfo }, router.pathname);
                  }}
                />
              </LinkComp>
            </CardContent>
          </div>
          {/* components tên, số lượng, hạn, tag */}
          <ProductCardContentNew
            tag={tag}
            row
            product={product}
            isMobile={isMobile}
            isSellerList={isSellerList}
            link={link}
            isLinkTagDeal={isLinkTagDeal}
          />
        </div>
        {/* components giá tiền, inputs, buttons */}
        <div>
          <ProductCardInput
            searchInput={searchInput}
            index={index}
            product={product}
            onIncrement={onIncrement}
            type={type}
            row
            isSellerList={isSellerList}
            isHalfProgress={isHalfProgress}
            isCampaignPage={isCampaignPage}
            {...product}
            key={product?.sku}
            isMobile={isMobile}
          />
        </div>
      </Card>
    </Grid>
  );
};

export default memo(ProductCardNew);
