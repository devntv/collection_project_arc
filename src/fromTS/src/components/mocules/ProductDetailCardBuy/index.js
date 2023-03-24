import { Box, Grid, LinearProgress, Typography } from '@material-ui/core';
import { getFirst, isValid } from 'clients';
import clsx from 'clsx';
import { PromotionPC } from 'components-v2/mocules/PromotionProduct';
import { LinkComp, MinusButtonV2, PlusButtonV2 } from 'components/atoms';
import NewInputProduct from 'components/atoms/NewInputProduct';
import { CountdownTimerDetail } from 'components/mocules';
import FeedbackPriceFormModal from 'components/mocules/FeedbackPriceFormModal';
import { LEVEL_CUSTOMER } from 'constants/Enums';
import { DOLLAR_ICON, MONEY_ICON_V2 } from 'constants/Icons';
import { useAuth, useCart } from 'context';
import useModal from 'hooks/useModal';
import { useCallback, useRef, useState } from 'react';
import { calculateTimeLeft, debounce, FormatDate } from 'utils';
import { convertLargeNumb, formatCurrency, formatFloatNumber, formatNumber } from 'utils/FormatNumber';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import useMobileV2 from 'zustand-lib/storeMobile';
import FeedbackPrice from '../FeedbackPrice';
import PointOfProduct from '../PointOfProduct';
import styles from './styles.module.css';

const ProductDetailCardBuy = ({
  product,
  isMobile,
  historyBySkus = {},
  isDetailMV2 = false,
  loading = false,
  listsPromo = [],
  handleOpen,
  promoList: listPromoProduct = [],
}) => {
  const {
    salePrice,
    // dealPrice,
    displayPrice,
    salePriceFormated,
    dealPriceFormated,
    displayPriceFormated,
    maxQuantity,
    // countryOfManufacture,
    isDeal,
    deal,
    errorMessageProduct,
    requireGPPMessage = null,
    isGift,
    unit,
    nextPrice = 0,
    productId,
    sku,
    isHappeningCampaign,
    availableProducts,
    percentDealSold,
    discountPercent,
    productType,
    isContractPrice,
    nextLevel = '',
    point = null,
    pointMultiplier = null,
    campaign,
    messageLimitOrder,
  } = product;

  const [quantity, setQuantity] = useState(product.quantity || 0);

  const searchInput = useRef(null);
  const curTime = new Date();
  const dealEndCampaign =
    productType === 'MEGA_DAY'
      ? campaign?.campaign?.endTime
      : campaign?.flashSaleTime?.find((item) => new Date(item.startTime) < curTime && new Date(item.endTime) > curTime)?.endTime;
  const outOfStockDeal = deal?.maxQuantity === (deal?.quantity || 0) || false;
  const { isAuthenticated } = useAuth();
  const { mapQuantity, removeCartItem, updateCartItem } = useCart();
  const { toggleLogin, toggleSignUp } = useAuth();
  const [isShowModalHighPrice, toggleModalHighPrice] = useModal();
  const isDisableAddToCart = maxQuantity && quantity >= maxQuantity;
  const [focus, setFocus] = useState(false);

  const beta = useMobileV2((state) => state.beta);
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());

  const updateCart = async (q, isReload = true) => {
    if (q === quantity && quantity === maxQuantity) {
      return;
    }
    const response = await updateCartItem({ product, q: parseFloat(q) }, isReload);
    if (isValid(response)) {
      const { quantity: quantityResponse = null } = getFirst(response, {});
      if (quantityResponse !== null) setQuantity(quantityResponse);
    } else {
      setQuantity(0);
    }
  };

  const handleCart = (val, updateType) => {
    if (updateType === 'remove') {
      removeCartItem(val, true);
      setQuantity(0);
    }
    if (updateType === 'update') {
      updateCart(val);
    }
  };

  const handler = useCallback(
    debounce((val, updateType) => handleCart(val, updateType), 300),
    [product],
  );
  const handleDecrease = () => {
    const q = quantity - 1;
    if (q < 0) return;
    searchInput.current.value = q;
    setQuantity(q);
    if (q === 0) {
      handler(product, 'remove');
    } else {
      handler(q, 'update');
    }
  };

  const handleIncrease = () => {
    const q = quantity + 1;
    searchInput.current.value = q;
    setQuantity(q);
    handler(q, 'update');
  };

  const handleInputChange = (e) => {
    try {
      const val = e?.currentTarget?.value.replace(/[^\d]/g, '');
      searchInput.current.value = Math.min(maxQuantity, val);
    } catch (error) {
      console.error('Error : ', error);
    }
  };
  const handleOnBlur = (e) => {
    setFocus(false);
    const val = e?.currentTarget?.value || quantity;
    if (/^\d+$/.test(val) && +val >= 0) {
      const curValue = Math.min(parseFloat(val || 0), maxQuantity);
      if (curValue === quantity) return;
      setQuantity(curValue);
      if (curValue === 0) {
        // nếu dang là 0 , mà nhấn thêm 0 nữa thì ko cần xoá
        if (quantity === 0) return;
        handler(product, 'remove');
      } else {
        handler(+curValue, 'update');
      }
    }
  };

  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleOnBlur(e);
    }
  };

  const onlyNumberKey = (e) => {
    // Only ASCII charactar in that range allowed
    // Chỉ cho phép nhập số
    const ASCIICode = e.which ? e.which : e.keyCode;
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false;
    return true;
  };
  // TODO: cần check lại
  const quantityPointMobile = mapQuantity?.get(product?.sku) || 0; // quantity update realtime sử dụng cho mobile v1
  const startDate = FormatDate.formatDate(deal?.startTime) || null;
  // const percentDiscount = deal ? Math.round(100 - (dealPrice / salePrice) * 100) : null;
  const { soldQuantity = 0 } = campaign || {};
  const timeLeft = calculateTimeLeft(deal?.startTime) || {};
  const dealReady = Object.keys(timeLeft).length === 0 || false;
  // tính điểm tích luy cho desktop
  const pointByPrice = pointMultiplier ? (displayPrice * quantity * pointMultiplier) / 100000 : (displayPrice * quantity) / 100000;
  const pointByPriceFormated = formatFloatNumber(pointByPrice);

  // tính điểm tích lũy cho mobile
  const pointByPriceMobile = pointMultiplier
    ? (displayPrice * quantityPointMobile * pointMultiplier) / 100000
    : (displayPrice * quantityPointMobile) / 100000;
  const pointByPriceFormatedMobile = formatFloatNumber(pointByPriceMobile);

  const renderCondition = () => {
    if (!dealReady) {
      return 'Sắp mở bán';
    }
    if (percentDealSold < 75) {
      return (isDeal && `Đã bán ${deal?.quantity || 0}`) || `Đã bán ${soldQuantity || 0}`;
    }
    if (percentDealSold === 100) {
      return <span className={styles.out_stock}>Đã hết hàng</span>;
    }
    return <span className={styles.out_stock}>Sắp hết hàng</span>;
  };

  if (isGift) return null;
  if (errorMessageProduct)
    return (
      <Typography
        textalign="center"
        className={clsx(styles.text_danger, styles.center, {
          [styles.text_danger_mv2]: isMobileV2,
        })}
      >
        {errorMessageProduct || 'Đang cập nhật giá'}
      </Typography>
    );

  const checkAndRenderQuantityProduct = () => {
    let text = '';

    if (historyBySkus[sku]?.limitQuantity > 0 && historyBySkus[sku]?.quantity > 0) {
      text = `Bạn đã mua ${formatNumber(historyBySkus[sku]?.quantity)} / ${formatNumber(historyBySkus[sku]?.limitQuantity)} sản phẩm trong ngày.`;
    }
    if (historyBySkus[sku]?.limitQuantity < historyBySkus[sku]?.quantity) {
      text = `Bạn đã đặt quá số lượng cho phép trong ngày`;
    }

    return text;
  };

  const handleOnFocus = (e) => {
    e.preventDefault();
    setFocus(true);
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          {(isHappeningCampaign && percentDealSold < 100 && (
            <div
              className={clsx(styles.deal_section, {
                [styles.deal_section_mv2]: isMobileV2,
              })}
            >
              <div className={styles.process_wrapper}>
                <LinearProgress
                  classes={{
                    root: clsx(styles.root_process, {
                      [styles.root_process_mv2]: isMobileV2,
                    }),
                    barColorPrimary: styles.bar_background,
                    colorPrimary: styles.blur_background,
                  }}
                  variant="determinate"
                  value={percentDealSold}
                />
                <Typography
                  className={clsx(styles.process_content, {
                    [styles.process_content_mv2]: isMobileV2,
                  })}
                >
                  {renderCondition()}
                </Typography>
              </div>
              <CountdownTimerDetail className={styles.count_down} dealEndDay={dealEndCampaign || ''} />
            </div>
          )) ||
            (isDeal && deal && (
              <div
                className={clsx(styles.deal_section, {
                  [styles.deal_section_mv2]: isMobileV2,
                })}
              >
                <div className={styles.process_wrapper}>
                  <LinearProgress
                    classes={{
                      root: clsx(styles.root_process, {
                        [styles.root_process_mv2]: isMobileV2,
                      }),
                      barColorPrimary: styles.bar_background,
                      colorPrimary: styles.blur_background,
                    }}
                    variant="determinate"
                    value={((deal?.quantity || 0) / deal?.maxQuantity) * 100}
                  />
                  <Typography
                    className={clsx(styles.process_content, {
                      [styles.process_content_mv2]: isMobileV2,
                    })}
                  >
                    {renderCondition()}
                  </Typography>
                </div>
                {dealReady ? (
                  <CountdownTimerDetail className={styles.count_down} dealEndDay={deal.endTime} />
                ) : (
                  startDate && <div className={styles.count_down}>{startDate}</div>
                )}
              </div>
            ))}

          <div
            className={clsx(styles.price_info, {
              [styles.price_info_mv2]: isMobileV2,
            })}
            data-test="product-price"
          >
            {isContractPrice && <p className={styles.contractLabel}>Giá Hợp Đồng</p>}
            <div className={styles.product_price_group}>
              <div className={styles.product_price}>
                {(isDeal && deal && (
                  <div className={styles.warpperDealPrice}>
                    <div className={clsx(styles.deal_price, isDetailMV2 && styles.deal_price_mv2)}>{dealPriceFormated}</div>
                    <div className={styles.warpperOldPrice}>
                      <div className={styles.old_price}>{salePriceFormated}</div>
                      <div className={clsx(styles.percentDiscount, discountPercent === 0 && styles.hiddenPercent)}>-{discountPercent}%</div>
                    </div>
                  </div>
                )) ||
                  (isHappeningCampaign && percentDealSold < 100 && (
                    <div className={styles.warpperDealPrice}>
                      <div className={clsx(styles.deal_price, isDetailMV2 && styles.deal_price_mv2)}>{displayPriceFormated}</div>
                      <div className={styles.warpperOldPrice}>
                        <div className={styles.old_price}>{salePriceFormated}</div>
                        <div className={clsx(styles.percentDiscount, discountPercent === 0 && styles.hiddenPercent)}>-{discountPercent}%</div>
                      </div>
                    </div>
                  )) ||
                  (isHappeningCampaign && percentDealSold === 100 && (
                    <span className={clsx(styles.deal_price, isDetailMV2 && styles.deal_price_mv2)}>{salePriceFormated}</span>
                  )) ||
                  (!isHappeningCampaign && (
                    <span className={clsx(styles.deal_price, isDetailMV2 && styles.deal_price_mv2)}>{displayPriceFormated}</span>
                  )) || (
                    <>
                      <span className={clsx(styles.deal_price, isDetailMV2 && styles.deal_price_mv2)}>{formatCurrency(salePrice)}</span>
                    </>
                  )}
                {isMobile && !beta && (
                  <Box className={styles.plusPoints}>
                    {(point > 0 && quantityPointMobile) > 0 && (
                      <Typography>{`${formatNumber(convertLargeNumb(quantityPointMobile * point * (pointMultiplier || 1)))} điểm `}</Typography>
                    )}
                    {!point && pointByPriceMobile > 0 && <Typography>{`${formatNumber(pointByPriceFormatedMobile)} điểm `}</Typography>}
                  </Box>
                )}
              </div>
              <FeedbackPrice sku={sku} productId={productId} isDetailMV2={isMobileV2} />
            </div>
          </div>

          <Box
            className={clsx(styles.warpperInfoBenefit, {
              [styles.warpperInfoBenefit_mv2]: isMobileV2,
            })}
          >
            {nextPrice > 0 && (
              <Box className={styles.next_price}>
                <ImageFallbackStatic src={MONEY_ICON_V2} width={16} height={16} />
                Bạn sẽ mua được giá <span>{formatCurrency(nextPrice)}</span> khi đạt cấp bậc{' '}
                <a href="/users/loyalty_points">
                  <b className={styles.nextLevel}>{LEVEL_CUSTOMER[nextLevel]}</b>
                </a>
              </Box>
            )}
            {point > 0 && pointMultiplier !== null && (
              <Grid container direction="row" alignItems="center" className={styles.wrapPlusPoint}>
                <ImageFallbackStatic src={DOLLAR_ICON} width={16} height={16} />
                <Typography className={clsx(styles.descPoint, isDetailMV2 && styles.descPoint_mv2)}>
                  Khách mua và nhận hàng thành công 1 sản phẩm sẽ nhận
                </Typography>
                <PointOfProduct point={point} pointMultiplier={pointMultiplier} isDetailMV2={isMobileV2} />
              </Grid>
            )}
            {/* gift promotion */}
            {!isMobile && <PromotionPC loading={loading} listsPromo={listsPromo} handleOpen={handleOpen} listPromoProduct={listPromoProduct} />}
            {/* require GPP */}
            {requireGPPMessage && (
              <Typography
                className={clsx(styles.text_danger, {
                  [styles.text_danger_mv2]: isMobileV2,
                })}
              >
                {requireGPPMessage}
              </Typography>
            )}
          </Box>
          <Box
            className={clsx(styles.warpperAddProduct, {
              [styles.warpperAddProduct_mv2]: isMobileV2,
            })}
          >
            {!isMobileV2 &&
              ((isHappeningCampaign && percentDealSold < 100 && (
                <Typography
                  className={clsx(styles.text_danger, {
                    [styles.text_danger_mv2]: isMobileV2,
                  })}
                >
                  Đặt tối đa {formatNumber(availableProducts)} {unit || 'sản phẩm'} với giá khuyến mãi
                </Typography>
              )) ||
                '')}
            {/* chỉ hiện ở PC -> mobile nằm cột khác */}
            {!isMobileV2 && messageLimitOrder && (
              <Typography className={styles.text_limit}>
                {/* Đặt tối đa {maxQuantityPerDay} {unit || 'sản phẩm'} /ngày */}
                {messageLimitOrder || ''}
              </Typography>
            )}
            {!isMobile && (
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
                <div className={styles.product_action} data-test="product-btn-action">
                  <MinusButtonV2
                    disabled={outOfStockDeal || (isDeal && !dealReady)}
                    className={clsx(styles.minus, focus && styles.border_left)}
                    onClick={handleDecrease}
                    data-test="product-btn-minus"
                  />
                  <NewInputProduct
                    product={product}
                    id={product.sku}
                    className={clsx(styles.input_product, focus && styles.border_focus_input, quantity > 0 && styles.bold_text)}
                    onChange={handleInputChange}
                    onBlur={handleOnBlur}
                    onKeyDown={handleOnKeyDown}
                    searchInput={searchInput}
                    defaultValue={quantity}
                    onkeypress={onlyNumberKey}
                    disabled={outOfStockDeal || (isDeal && !dealReady)}
                    onFocus={handleOnFocus}
                    data-test="product-input"
                  />
                  <PlusButtonV2
                    disabled={(isDeal && !dealReady) || outOfStockDeal || isDisableAddToCart}
                    className={clsx(styles.plus, focus && styles.border_right)}
                    onClick={() => handleIncrease()}
                    data-test="product-btn-plus"
                  />
                  {/* cộng điểm tích lũy cho PC */}
                  <Box className={styles.plusPoints}>
                    {(point > 0 && quantity) > 0 && (
                      <Typography>{`${formatNumber(convertLargeNumb(quantity * point * (pointMultiplier || 1)))} điểm `}</Typography>
                    )}
                    {!point && pointByPrice > 0 && <Typography>{`${formatNumber(pointByPriceFormated)} điểm `}</Typography>}
                  </Box>
                </div>
              </div>
            )}
            <Box marginTop="8px">
              {(
                <Typography
                  className={clsx(historyBySkus[sku]?.limitQuantity < historyBySkus[sku]?.quantity ? styles.text_danger : styles.textQuantityPerDay, {
                    [styles.text_danger_mv2]: isMobileV2,
                  })}
                >
                  {checkAndRenderQuantityProduct()}
                </Typography>
              ) || null}
            </Box>
          </Box>

          {isShowModalHighPrice && (
            <FeedbackPriceFormModal productId={product.productId} sku={product.sku} visible={isShowModalHighPrice} onClose={toggleModalHighPrice} />
          )}
        </>
      ) : (
        // <CustomButton backgroundColor="#e1a006" className={styles.signin_btn} onClick={toggleLogin}>
        //   Đăng nhập để xem giá
        // </CustomButton>
        <Grid
          container
          style={{ background: '#F7F8FB', maxWidth: '400', borderRadius: '5px', padding: '5px', fontSize: '14px' }}
          alignItems="center"
          data-test="text-login-to-view-product"
        >
          Vui Lòng{' '}
          <LinkComp style={{ marginLeft: '2px', color: '#0E1983', cursor: 'pointer', fontSize: '14px' }} href="#" onClick={toggleLogin}>
            Đăng Nhập
          </LinkComp>
          /
          <LinkComp style={{ marginRight: '2px', color: '#0E1983', cursor: 'pointer', fontSize: '14px' }} href="#" onClick={toggleSignUp}>
            Đăng Ký
          </LinkComp>{' '}
          Để Xem Chi Tiết Hơn Về Sản Phẩm
        </Grid>
      )}
    </>
  );
};

export default ProductDetailCardBuy;
