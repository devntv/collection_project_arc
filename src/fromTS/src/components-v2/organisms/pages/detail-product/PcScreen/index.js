/* eslint-disable import/no-named-as-default-member */
import { Chip, Container, Divider, Fab, Grid, Tooltip, Typography } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { Skeleton } from '@material-ui/lab';
import clsx from 'clsx';
import FormAddressLocation from 'components-v2/mocules/FormAddressLocation';
import { PromotionMobile, TagGift } from 'components-v2/mocules/PromotionProduct';
import { LinkComp } from 'components/atoms';
import { MultiImageBoxV2, ProductDetailTabsV2, PromotionDetailModal, SellerInfoProductDetail, TicketFormModal } from 'components/mocules';
import Breadcrumbs from 'components/mocules/Breadcrumbs';
import FavoriteButton from 'components/mocules/FavoriteButton';
import ProductDetailCardBuy from 'components/mocules/ProductDetailCardBuy';
import ProductIngredientRelated from 'components/mocules/ProductIngredientRelated';
import ProductsRecommendation from 'components/mocules/ProductsRecommendation';
import ProductsRecommendationTS from 'components/mocules/ProductsRecommendationTS';
import ProductSeller from 'components/mocules/ProductsSeller';
import TagComponent from 'components/mocules/TagComponent';
import { FLAGSHIP_LABEL, INSIDER_RECOMMENDATION, THUOCSI_LABEL, THUOCSI_RECOMMENDATION } from 'constants/Enums';
import { EYE_ICON, KG_ICON_V2, SHOPPING_CART_ICON } from 'constants/Images';
import { CATEGORIES } from 'constants/Paths';
import { tabsProductDataV2 } from 'constants/data';
import { useProduct } from 'context';
import { useEffect, useState } from 'react';
import { SHOW_INSIDER_RECOMMEND } from 'sysconfig';
import { FormatNumber } from 'utils';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from 'zustand-lib/storeGlobal';
import useGetListPromoDetail from 'zustand-lib/useGetListPromoDetail';
import styles from './styles.module.css';

const DetailProductPcScreen = ({
  isMobile,
  breadscrumbs,
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
  manufacturerInfo,
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
  link = '',
}) => {
  const validateFeature = useStore((state) => state.validateFeature);
  const { sku = '' } = product;
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [promoList, setPromoList] = useState([]);
  const { getProductBySkus } = useProduct();
  const { getPromoLists, getDataByPromoListsDetail } = useGetListPromoDetail();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getPromoLists({ skus: [sku], getVoucherInfo: true, signal });
    return () => controller.abort();
  }, [sku]);

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

  const handleOpen = () => {
    setShowGiftModal(true);
  };

  const TitleProduct = () => {
    if (loading)
      return (
        <span>
          <Skeleton width={260} height={30} />
        </span>
      );
    return (
      <Typography className="titleProduct" style={{ display: 'inline' }} data-test="product-title">
        <TagGift loading={loading} isGiftTag={isGiftTag} className={styles.promoGift} />
        {(isDeal && deal?.name) || name}
      </Typography>
    );
  };

  return (
    <Container className={styles.container}>
      <div style={{ padding: isMobile ? '0px 36px' : '0px' }} data-test="product-breadcrumb">
        <Breadcrumbs breadcrumbs={breadscrumbs} />
      </div>
      <Grid container style={{ margin: '24px 0', overflowX: 'hidden' }}>
        <Grid container item md={9} className={styles.main}>
          <Grid item md={4}>
            <div className={styles.wrapperLeft} data-test="product-img">
              <MultiImageBoxV2 isMobile={isMobile} images={product?.imagesProxy} title={product?.title} imageName={product?.name} />
            </div>
          </Grid>
          <Grid item md={8} style={{ width: '100%' }}>
            <div className={styles.content}>
              <div className={styles.wrapperNameProduct}>
                <div>
                  {sellerInfo?.isVip && sellerInfo?.isStore && (
                    <>
                      <span style={{ color: '#B98F0F', fontSize: '22px', fontFamily: 'googleSansMedium', display: isGiftTag ? 'none' : '' }}>
                        {FLAGSHIP_LABEL}
                      </span>
                      <span style={{ display: isGiftTag ? 'none' : '', fontWeight: 'bold', fontSize: '22px' }}>&nbsp; -&nbsp; </span>
                    </>
                  )}
                  <TitleProduct />
                </div>
                <div className={styles.wishlist}>
                  {user && (
                    <Tooltip title="Thắc mắc về sản phẩm ">
                      <Fab className={styles.icon} size="small" aria-label="onpenModalInquiry" onClick={toggleModalInquiry}>
                        <HelpOutlineIcon style={{ fontSize: 24, color: '#AFAFAF' }} />
                      </Fab>
                    </Tooltip>
                  )}
                  {/* tách client side */}
                  <FavoriteButton user={user} product={product} />
                </div>
              </div>
              <Typography className={styles.capacity}>{volume} </Typography>

              {categoryCodes &&
                categoryCodes?.map(
                  (item) =>
                    mapCategories.get(item)?.name !== undefined && (
                      <div style={{ display: 'flex', marginTop: '8px' }} key={uuidv4()}>
                        <LinkComp className={styles.type} href={`${CATEGORIES}/${mapCategories.get(item)?.slug}`} removeStyles>
                          {mapCategories.get(item)?.name === undefined ? ' ' : mapCategories.get(item)?.name}
                        </LinkComp>
                      </div>
                    ),
                )}
              <div className={styles.product_tags}>
                <TagComponent
                  product={{ tags, statusData, expiredDate }}
                  isMobile={isMobile}
                  isProductCard={false}
                  isSellerList={false}
                  isPageDetail
                  isGift={product?.isGift}
                  link={link}
                  isLinkTagDeal
                />
              </div>
              {(totalView > 0 || orderedCount > 0 || weight > 0) && (
                <div className={styles.warpperInfo}>
                  {totalView > 0 && (
                    <div className={styles.warpperInfoProduct}>
                      <ImageFallbackStatic src={EYE_ICON} width={16} height={17} alt="cart_icon" />
                      <Typography className={styles.nameDescNumber}>{totalView}</Typography>{' '}
                      <Typography className={styles.nameDesc}> Lượt xem</Typography>
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
                      <ImageFallbackStatic src={KG_ICON_V2} width={16} height={16} alt="cart_icon" />
                      <Typography className={styles.nameDescNumber}>{(weight / 1000).toFixed(3)}</Typography>{' '}
                      <Typography className={styles.nameDescVal}> Kg</Typography>
                    </div>
                  )}
                </div>
              )}
              <ProductDetailCardBuy
                loading={loading}
                listsPromo={listsPromo}
                handleOpen={handleOpen}
                promoList={promoList}
                product={product || {}}
                isMobile={isMobile}
                key={`new-input-product-${product?.sku}`}
                historyBySkus={historyBySkus}
              />
            </div>
          </Grid>
          {/* promotion Mobile */}
          {isMobile && listsPromo?.length > 0 && (
            <PromotionMobile loading={loading} promoList={promoList} handleOpen={handleOpen} isMobile={isMobile} />
          )}
          {user && (
            <Grid item style={{ width: '100%', margin: 24 }}>
              <Divider />
              <ProductDetailTabsV2
                handleChange={handleChangeTab}
                data={tabsProductDataV2}
                product={product}
                value={tabValue}
                ingredients={ingredients}
                manufacturerInfo={manufacturerInfo}
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
            <div role="presentation" className={clsx(styles.wrapper, styles.sellerInfo)}>
              <SellerInfoProductDetail seller={seller} tags={tags} flagshipStoreInfo={hardcodeProduct} />
            </div>
          )}
          <div role="presentation" className={clsx(styles.wrapper, styles.sellerInfo)} data-test="product-seller">
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
      {/* Smart recommendation ts */}
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
          skuNotIn={[product.sku]}
        />
      )}
      <ProductSeller product={product} pageName={pageName} sellerInfo={sellerInfo} />
      <ProductIngredientRelated product={product} pageName={pageName} />
      {/* Smart recommendation ts */}
      {/* <ProductsRecommendationTS
    key="smart-recommendation-ts-purchase-together"
    title="Sản phẩm mua chung"
    type={THUOCSI_RECOMMENDATION.PURCHASE_TOGETHER}
    pageName={pageName}
    value={product.sku}
  /> */}
      {/* Smart recommendation ts - category */}
      {/* {categoryCodes?.length > 0 && (
    <ProductsRecommendationTS
      key="smart-recommendation-ts-category"
      title="Sản phẩm gợi ý của cùng danh mục"
      type={THUOCSI_RECOMMENDATION.SAME_CATEGORY}
      pageName={pageName}
      value={categoryCodes}
    />
  )} */}

      {SHOW_INSIDER_RECOMMEND && <ProductsRecommendation title="Sản phẩm gợi ý" type={INSIDER_RECOMMENDATION.MOST_VIEWED} pageName={pageName} />}
      {SHOW_INSIDER_RECOMMEND && <ProductsRecommendation title="Dành riêng cho bạn" type={INSIDER_RECOMMENDATION.USER_BASED} pageName={pageName} />}
      {showModalLocation && (
        <FormAddressLocation
          open={showModalLocation}
          onClose={handleCloseFormLocation}
          showModalLocation={showModalLocation}
          handleLocationCode={handleLocationCode}
        />
      )}

      <PromotionDetailModal
        className={styles.promoTionWrap}
        visible={showGiftModal}
        onClose={() => {
          setShowGiftModal(false);
        }}
        title={isMobile ? 'Quà Tặng' : 'Khuyến mãi quà tặng'}
        listsPromo={listsPromo}
        loading={loading}
        err={err}
      />
    </Container>
  );
};

export default DetailProductPcScreen;
