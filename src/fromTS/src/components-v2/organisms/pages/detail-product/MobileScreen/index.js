/* eslint-disable import/no-named-as-default-member */
import { Box, Chip, Container, Divider, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import FormAddressLocation from 'components-v2/mocules/FormAddressLocation';
import { PromotionMobile } from 'components-v2/mocules/PromotionProduct';
import { LinkComp } from 'components/atoms';
import { ProductDetailTabsV2, PromotionDetailModal, SellerInfoProductDetail, TicketFormModal } from 'components/mocules';
import ProductDetailCardBuy from 'components/mocules/ProductDetailCardBuy';
import ProductIngredientRelated from 'components/mocules/ProductIngredientRelated';
import ProductsRecommendationTS from 'components/mocules/ProductsRecommendationTS';
import ProductSeller from 'components/mocules/ProductsSeller';
import TagComponent from 'components/mocules/TagComponent';
import { tabsProductDataV2 } from 'constants/data';
import { FLAGSHIP_LABEL, THUOCSI_LABEL, THUOCSI_RECOMMENDATION } from 'constants/Enums';
import { EYE_ICON, GIFT_ICON, KG_ICON, SHOPPING_CART_ICON } from 'constants/Images';
import { CATEGORIES } from 'constants/Paths';
import { useProduct } from 'context';
import { useEffect, useState } from 'react';
import { FormatNumber } from 'utils';
import { formatNumber } from 'utils/FormatNumber';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from 'zustand-lib/storeGlobal';
import useGetListPromoDetail from 'zustand-lib/useGetListPromoDetail';
import ImageProducts from '../ImageProducts';
import HeaderProduct from '../ImageProducts/HeaderProduct';
import FooterProductOrder from './FooterProductOrder';
import styles from './styles.module.css';

const DetailProductMobileScreen = ({
  isMobileV2,
  isMobile,
  product,
  sellerInfo,
  isDeal,
  deal,
  name,
  toggleModalInquiry,
  user,
  volume,
  categoryCodes,
  mapCategories,
  tags,
  statusData,
  expiredDate,
  totalView,
  handleChangeTab,
  orderedCount,
  weight,
  historyBySkus,
  tabValue,
  ingredients,
  coutriesName,
  hardcodeProduct,
  isShowModalProductInquiry,
  pageName,
  showModalLocation,
  handleCloseFormLocation,
  handleLocationCode,
  comboList,
  files,
  seller,
  listPromo,
}) => {
  // gift tag
  const { sku = '' } = product;
  const [promoList, setPromoList] = useState([]);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const { getProductBySkus } = useProduct();
  const { getPromoLists, getDataByPromoListsDetail } = useGetListPromoDetail();
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getPromoLists({ skus: [sku], getVoucherInfo: true, signal });
    return () => controller.abort();
  }, [sku]);

  const handleOpen = () => {
    setShowGiftModal(true);
  };
  const { data = [], loading = false, err = '' } = getDataByPromoListsDetail();
  const { vouchers: listsPromo = [], hasGift: isGiftTag = false } = data[0] || [];

  useEffect(() => {
    async function getListPromotionProduct() {
      const infoGift = listsPromo?.map((item) => item?.gifts).flat() || [];
      const mapProductGift = await getProductBySkus({ skus: infoGift?.map((item) => item?.sku) || [], getPrice: true });
      const listProductGift = infoGift?.map((item) => mapProductGift?.get(item.sku));
      if (listsPromo?.length > 0) {
        setPromoList(listProductGift);
      }
    }
    getListPromotionProduct();
  }, [listsPromo]);

  const ContentProductDetail = () => (
    <>
      {categoryCodes &&
        categoryCodes?.map(
          (item) =>
            mapCategories.get(item)?.name !== undefined && (
              <div style={{ display: 'flex', marginTop: '8px', marginBottom: '8px' }} key={uuidv4()}>
                <LinkComp className={clsx(styles.type, styles.type_mv2)} href={`${CATEGORIES}/${mapCategories.get(item)?.slug}`} style={{}}>
                  {mapCategories.get(item)?.name === undefined ? ' ' : mapCategories.get(item)?.name}
                </LinkComp>
              </div>
            ),
        )}
      <div className={styles.product_tags}>
        <TagComponent product={{ tags, statusData, expiredDate }} isMobile={isMobile} isProductCard={false} isSellerList={false} isPageDetail />
      </div>
      {(totalView > 0 || orderedCount > 0 || weight > 0) && (
        <div className={styles.warpperInfo}>
          {totalView > 0 && (
            <div className={styles.warpperInfoProduct}>
              <ImageFallbackStatic src={EYE_ICON} width={16} height={17} alt="cart_icon" />
              <Typography className={styles.nameDescNumber}>{totalView}</Typography> <Typography className={styles.nameDesc}> Lượt xem</Typography>
            </div>
          )}
          {orderedCount > 0 && (
            <div className={styles.warpperInfoProduct}>
              <ImageFallbackStatic src={SHOPPING_CART_ICON} width={16} height={17} alt="cart_icon" />
              <Typography className={styles.nameDescNumber}>{FormatNumber.formatNumber(orderedCount) || ''}</Typography>{' '}
              <Typography className={styles.nameDesc}> Lượt mua trong 24 giờ</Typography>
            </div>
          )}
          {weight > 0 && (
            <div className={styles.warpperInfoProduct}>
              <ImageFallbackStatic src={KG_ICON} width={16} height={17} alt="cart_icon" />
              <Typography className={styles.nameDescNumber}>{(weight / 1000).toFixed(3)}</Typography>{' '}
              <Typography className={styles.nameDesc}> kg</Typography>
            </div>
          )}
        </div>
      )}
      {(product?.isHappeningCampaign && product?.percentDealSold < 100 && (
        <Typography
          className={clsx(styles.text_danger, {
            [styles.text_danger_mv2]: isMobileV2,
          })}
        >
          Đặt tối đa {formatNumber(product?.availableProducts)} {product?.unit || 'sản phẩm'} với giá khuyến mãi
        </Typography>
      )) ||
        ''}
      {(product?.messageLimitOrder && <Typography className={styles.text_limit}>{product?.messageLimitOrder || ''}</Typography>) || ''}
    </>
  );

  const validateFeature = useStore((state) => state.validateFeature);

  return (
    <Container className={clsx(styles.container, styles.container_mv2)}>
      <Grid container style={{ overflowX: 'hidden' }}>
        <Grid container item md={9} className={clsx(styles.main, styles.main_mv2)}>
          <Grid item xs={12}>
            <ImageProducts images={product?.imagesProxy} title={product?.title} name={product?.name} />
          </Grid>
          <Grid item md={8} style={{ width: '100%' }}>
            <div className={clsx(styles.content, styles.content_mv2)}>
              <HeaderProduct
                isDeal={isDeal}
                deal={deal}
                volume={volume}
                user={user}
                product={product}
                isMobileV2={isMobileV2}
                sellerInfo={sellerInfo}
                name={name}
                toggleModalInquiry={toggleModalInquiry}
                isGiftTag={isGiftTag}
                loading={loading}
              />
              <ProductDetailCardBuy
                product={product || {}}
                isMobile={isMobile}
                key={`new-input-product-${product?.sku}`}
                historyBySkus={historyBySkus}
                isDetailMV2={isMobileV2}
              />
              <ContentProductDetail />
              {listPromo && listPromo.length > 0 && (
                <Box className={styles.gift}>
                  <ImageFallbackStatic src={GIFT_ICON} width={35} height={35} alt="gift_icon" />
                  <Typography style={{ marginLeft: 10 }}>Quà tặng</Typography>
                  <Typography
                    style={{ fontSize: 12, color: '#464BC2', marginLeft: 15, textDecoration: 'underline', cursor: 'pointer' }}
                    onClick={() => setShowGiftModal(true)}
                  >
                    Xem chi tiết
                  </Typography>
                </Box>
              )}
            </div>
          </Grid>
          {listsPromo?.length > 0 && (
            <div style={{ marginTop: '10px', width: '100%' }}>
              <PromotionMobile promoList={promoList} handleOpen={handleOpen} isMobile={isMobile} />
            </div>
          )}

          {user && (
            <Grid item style={{ width: '100%', margin: 0, padding: 20 }}>
              <Divider />
              <ProductDetailTabsV2
                handleChange={handleChangeTab}
                data={tabsProductDataV2}
                product={product}
                value={tabValue}
                ingredients={ingredients}
                coutriesName={coutriesName}
                comboList={comboList}
                files={files}
              />
            </Grid>
          )}
        </Grid>
        <Grid container item md={3} className={styles.rightSide}>
          {sellerInfo?.isStore && (
            <Chip
              label={sellerInfo?.isVip ? FLAGSHIP_LABEL : THUOCSI_LABEL}
              className={styles.chip}
              style={{ background: sellerInfo?.isVip ? '#b98f0f' : '#09884D' }}
            />
          )}
          {hardcodeProduct && (
            <div role="presentation" className={clsx(styles.wrapper, styles.sellerInfo, styles.wrapper_mv2)}>
              <SellerInfoProductDetail seller={seller} tags={tags} flagshipStoreInfo={hardcodeProduct} />
            </div>
          )}
          <div role="presentation" className={clsx(styles.wrapper, styles.sellerInfo, styles.wrapper_mv2)} data-test="product-seller">
            <SellerInfoProductDetail seller={seller} tags={tags} />
          </div>
          {/* gia kham thao */}
          {/* {otherProductSkus.length > 0 && <SuggestedSellerCard sellerCode={sellerCode} />} */}
          {/* Div cho insider tự chèn vào  */}
          <div id="insider-recommendation" />
        </Grid>
        {/* modal thac mac sp */}
        {isShowModalProductInquiry && user && (
          <Grid>
            <TicketFormModal
              name={name}
              user={user}
              product={product}
              productName={product.name}
              productId={product.productId}
              sku={product.sku}
              visible={isShowModalProductInquiry}
              onClose={toggleModalInquiry}
              ticketType="PRODUCT"
            />
          </Grid>
        )}
      </Grid>
      {/* sản phẩm cùng nhà bán hàng */}
      <ProductSeller product={product} pageName={pageName} sellerInfo={sellerInfo} />
      {/* cùng hoạt chất */}
      <ProductIngredientRelated product={product} pageName={pageName} />
      {validateFeature('RECOMMENDATION_TS') && (
        <ProductsRecommendationTS
          key="smart-recommendation-ts-all"
          title="Sản phẩm gợi ý"
          type={THUOCSI_RECOMMENDATION.ALL}
          pageName={pageName}
          value={[
            {
              type: THUOCSI_RECOMMENDATION.PURCHASE_TOGETHER,
              value: product.sku,
            },
            {
              type: THUOCSI_RECOMMENDATION.SAME_CATEGORY,
              value: categoryCodes || [],
            },
          ]}
        />
      )}

      {/* <ProductsRecommendation title="Sản phẩm gợi ý" type="RECOMMENDATION_MOST_VIEWED" pageName={pageName} /> */}
      {showModalLocation && (
        <FormAddressLocation
          open={showModalLocation}
          onClose={handleCloseFormLocation}
          showModalLocation={showModalLocation}
          handleLocationCode={handleLocationCode}
        />
      )}
      <PromotionDetailModal
        visible={showGiftModal}
        onClose={() => {
          setShowGiftModal(false);
        }}
        title="Quà tặng"
        listsPromo={listsPromo}
        loading={loading}
        err={err}
      />
      <FooterProductOrder product={product} />
    </Container>
  );
};
export default DetailProductMobileScreen;
