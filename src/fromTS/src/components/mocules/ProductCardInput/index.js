/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-else-return */
import { Box, CardActions, CardContent, Grid, IconButton, Tooltip, Typography } from '@material-ui/core';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { getFirst, isValid } from 'clients';
import clsx from 'clsx';
import { Button as CustomButton } from 'components/atoms';
import NewInputProduct from 'components/atoms/NewInputProduct';
import NewMinusButton from 'components/atoms/QuantityButton/NewMinusButton';
import NewPlusButton from 'components/atoms/QuantityButton/NewPlusButton';
import DealSectionNew from 'components/mocules/DealSectionNew';
import RemoveProductModal from 'components/organisms/RemoveProductModal';
import { IMPORTANT_PERCENT_MAX } from 'constants/data';
import { ERROR_CODE_CART } from 'constants/ErrorCart';
import { ICON_WISHLIST_DEL_V2 } from 'constants/Icons';
import { useAuth, useCart, useProduct } from 'context';
import useModal from 'hooks/useModal';
import { useCallback, useEffect, useState } from 'react';
import { calculateTimeLeft } from 'utils';
import { debounceFunc1000, debounceFunc400 } from 'utils/debounce';
import { formatCurrency, formatNumber } from 'utils/FormatNumber';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from './styles.module.css';

const ProductCardInput = ({
  maxQuantity: productMaxQuantity,
  not_support_delivery: noSupportDelivery,
  salePrice = 0,
  displayPrice = 0,
  isDeal = false,
  deal = {},
  row,
  type,
  searchInput,
  cart, // is Page cart ( reload data with product info)
  productId,
  name,
  product,
  isMobile,
  cartItems,
  scrollTo,
  errorCode = null, // error code only show on cart item
  errorMessage = null,
  status,
  errorMessageProduct = null,
  index,
  currentPrice,
  wishlist = false, // is page wishlist
  handleDelete,
  // unit,
  isCampaign = false,
  productType,
  isHappeningCampaign = false, // is flash sale happening or not
  campaign,
  availableProducts,
  salePriceFormated,
  displayPriceFormated,
  isSellerList = false, // is belong to seller list ui
  isHalfProgress = false, // a half linear progress in a line,
  percentDealSold = 0,
  isCampaignPage = false, // để tránh hiển thị ??? price ở các trang khác campaign
  messageLimitOrder,
  sku,
  discountPercent = 0,
  isContractPrice,
}) => {
  const { updateCartItem, removeCartItem, mapQuantity, validate200Item } = useCart();
  const { isAuthenticated, toggleLogin } = useAuth();
  const beta = useMobileV2((state) => state.beta);
  const { getInfoProductPerDay, getProductError } = useProduct();

  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  const [isShowModalRemove, toggleRemove] = useModal();
  const [isFocus, setIsFocus] = useState(false);
  const [inputElement, setInputElement] = useState();
  const [value, setValue] = useState(product.quantity || 0);

  const { soldQuantity = 0 } = campaign || {};
  const maxQuantityProduct = (isCampaign && availableProducts) || (isDeal && availableProducts) || productMaxQuantity;
  const percentDeal = ((deal?.quantity || 0) / deal?.maxQuantity) * 100;
  const outOfStock = deal?.maxQuantity === (deal?.quantity || 0) || false;
  const timeLeft = calculateTimeLeft(deal?.startTime) || calculateTimeLeft(campaign?.campaign?.startTime) || {};
  const dealReady = Object.keys(timeLeft).length === 0 || false;
  const outOfDate = (deal && deal.endTime && new Date(deal.endTime) < new Date()) || false;

  const importantList = cartItems?.filter((item) => item.isSelected && item.isImportant);
  const historyBySku = getInfoProductPerDay();
  const { errorRequiredCertificate = false, errorRequiredCertificateMessage } = getProductError({ product });

  useEffect(() => {
    setInputElement(Object.values(searchInput.current)[0]);
  }, []);

  const canDeleteProduct = () => {
    const quantityAfterDel = cartItems.length - 1;
    let importantQuantity = importantList.length;
    const importantQuantityMax = Math.floor(quantityAfterDel * IMPORTANT_PERCENT_MAX);

    if (product.isImportant) importantQuantity -= 1;

    return !(importantQuantity > importantQuantityMax);
  };

  const updateCart = async (q, isReload = true) => {
    if (!q) {
      return;
    }
    const response = await updateCartItem({ product, q: parseFloat(q) }, isReload, cart);
    if (isValid(response)) {
      const { quantity: quantityResponse = null } = getFirst(response, {});
      if (quantityResponse !== null) {
        setValue(quantityResponse);
      }
    } else {
      setValue(0);
    }
  };

  const handleRemove = async () => {
    if (!cart) {
      await removeCartItem(product, true);
      inputElement.value = 0;
      setValue(0);
      toggleRemove();
      return;
    }

    if (canDeleteProduct()) {
      await removeCartItem(product, cart);
      inputElement.value = 0;
      setValue(0);
      scrollTo(window.pageYOffset);
      return;
    }

    toggleRemove();
  };

  const handleCancle = () => {
    toggleRemove();
    inputElement.value = value;
    if (value === 0) {
      updateCart(1);
      setValue(1);
    }
  };

  const handleCart = (val, updateType) => {
    if (updateType === 'remove') {
      toggleRemove();
    }
    if (updateType === 'update') {
      updateCart(val);
    }
  };

  const handleClickInput = (e) => {
    e.stopPropagation();
  };

  const handler = useCallback((val, updateType) => {
    if (isMobile) {
      debounceFunc1000(() => handleCart(val, updateType));
    } else {
      debounceFunc400(() => handleCart(val, updateType));
    }
  }, []);

  const handleDecrease = (e) => {
    e.stopPropagation();
    if (inputElement.value < 1) return;
    const q = parseInt(inputElement.value, 10) - 1;
    if (q < 1) {
      handler(product, 'remove');
      return;
    }
    inputElement.value = q;
    setValue(q);
    handler(q, 'update');
  };

  const handleIncrease = (e) => {
    e.stopPropagation();
    if (validate200Item(product?.sku)) {
      const q = parseInt(inputElement.value, 10) + 1;
      inputElement.value = q;
      setValue(q);
      handler(q, 'update');
    }
  };

  const handleInputChange = (e) => {
    try {
      const val = e?.currentTarget?.value.replace(/[^\d]/g, '');
      Object.values(searchInput.current)[0].value = Math.min(maxQuantityProduct, val);
    } catch (error) {
      console.error('Error : ', error);
    }
  };

  const handleOnBlur = (e) => {
    setIsFocus(false);
    if (validate200Item(product?.sku)) {
      const val = e?.currentTarget?.value || value;
      if (/^\d+$/.test(val) && +val >= 0) {
        let curValue = parseFloat(val || 0);
        curValue = Math.min(maxQuantityProduct, curValue);
        if (curValue === value) return;
        // nếu value là 0 thì sẽ remove && quanity trong cartItems
        // TODO: nếu onblur 0 , rồi nhấn vào nút - cho kế bên
        if (curValue === 0 && mapQuantity?.get(product?.sku) > 0) {
          handler(product, 'remove');
          return;
        }
        setValue(curValue);
        if (curValue || curValue !== 0) handler(+curValue, 'update');
      }
    } else {
      setValue(0);
      Object.values(searchInput.current)[0].value = 0;
    }
  };

  const handleOnKeyDown = (e) => {
    const positionEl = Number(Object.keys(searchInput.current)[0]);
    const inputs = document?.querySelectorAll("[class*='product_action'] input");
    if (e.keyCode === 13) {
      handleOnBlur(e);
      (inputs?.[positionEl] || inputs?.[positionEl + 1])?.focus();
    }
    if (e.keyCode === 9) {
      e.preventDefault();
      inputs?.[positionEl + 1]?.focus();
    }
  };

  const checkProductAvailable = () => status === 'OUT_OF_STOCK' || status === 'SUSPENDED' || outOfStock || outOfDate;

  if (errorMessageProduct || !product.salePrice || product.status === 'STOP_SELLING' || product.salePrice === 0) {
    if (wishlist) {
      return (
        <div className={isMobile ? styles.wishlist_err_wrapper_mobile : styles.wishlist_err_wrapper}>
          <Typography className={row ? clsx(styles.text_danger, styles.text_center) : clsx(styles.text_danger_column, styles.text_danger)}>
            {errorMessageProduct || errorMessage || 'Đang cập nhật giá'}
          </Typography>
          <CardActions className={clsx(isMobile ? styles.btn_del_m_wrapper : styles.product_action_column, !isMobile && styles.p_0)}>
            {isMobile ? (
              <Typography className={styles.btn_del_text} onClick={handleDelete}>
                Xoá
              </Typography>
            ) : (
              <Tooltip title="Xoá sản phẩm khỏi danh sách yêu thích ">
                <IconButton className={styles.remove_icon} onClick={handleDelete}>
                  <ICON_WISHLIST_DEL_V2 className={styles.icon} />
                </IconButton>
              </Tooltip>
            )}
          </CardActions>
        </div>
      );
    }

    return (
      <>
        <div className={row ? styles.price_wrapper : clsx(styles.price_wrapper, styles.price_wrapper_column)} />
        <Typography
          className={row ? clsx(styles.text_danger, styles.text_center, styles.text_padding) : clsx(styles.text_danger_column, styles.text_danger)}
        >
          {errorMessageProduct || errorMessage || 'Đang cập nhật giá'}
        </Typography>
      </>
    );
  }
  let hidenPrice = campaign?.salePriceLabel;
  if (isCampaign && campaign?.isValid === false) {
    const lengthSalePriceLabel = campaign?.salePriceLabel?.length;
    if (lengthSalePriceLabel > 3)
      hidenPrice = `${campaign?.salePriceLabel?.slice(0, lengthSalePriceLabel - 3)}.${campaign?.salePriceLabel?.slice(lengthSalePriceLabel - 3)}`;
  }
  const ContractPrice = () => <Box className={styles.contractLabel}>Giá hợp đồng</Box>;
  function GetPrice() {
    // wishlist page v2
    if (wishlist) {
      // khuyến mãi
      if ((isDeal && deal) || (isCampaign && percentDealSold < 100)) {
        return (
          <>
            <Grid
              container
              spacing={1}
              alignItems="center"
              className={clsx(styles.display_wishlist_price_wrapper, isMobile && styles.wrap, {
                [styles.displayPrice_wrapper_mv2]: isMobileV2,
              })}
            >
              <div>
                {isContractPrice && <ContractPrice />}
                <span className={clsx(isMobile ? styles.discount_percent_v2 : styles.discount_percent, discountPercent === 0 && styles.hidden)}>
                  {`-${discountPercent}%`}
                </span>
                <span className={clsx(styles.sale_price, isMobile && styles.fs_12, salePriceFormated === displayPriceFormated && styles.hidden)}>
                  {salePriceFormated}
                </span>
              </div>
              <Grid item style={{ padding: '0', width: isMobile && !beta ? '100%' : 'auto' }}>
                <Typography className={clsx(styles.display_price, isMobile && styles.fs_12)}>{displayPriceFormated}</Typography>
              </Grid>
            </Grid>
          </>
        );
      }

      return (
        <div className={row ? styles.price_wrapper : clsx(styles.price_wrapper, styles.price_wrapper_column)}>
          <Grid
            container
            alignItems="stretch"
            className={clsx(
              styles.wishlist_price_wrapper,
              isMobile && styles.wrap,
              {
                [styles.displayPrice_wrapper_mv2]: isMobileV2,
              },
              !isMobile && styles.pt_55,
            )}
          >
            <Grid item style={{ paddingLeft: '0', width: isMobile && !beta ? '100%' : 'auto' }}>
              {isContractPrice && <ContractPrice />}
              <Typography
                className={clsx(styles.display_price, {
                  [styles.display_price_mv2]: isMobileV2,
                })}
              >
                {displayPriceFormated}
              </Typography>
            </Grid>
            <Grid item>
              {errorCode === ERROR_CODE_CART.CHANGED_PRICE && currentPrice > displayPrice && <TrendingDownIcon className={styles.down} />}
              {errorCode === ERROR_CODE_CART.CHANGED_PRICE && currentPrice < displayPrice && <TrendingUpIcon className={styles.up} />}
            </Grid>
          </Grid>
          {isDeal && deal && (
            <Grid item style={{ width: isMobile && !beta ? '100%' : 'auto' }}>
              <Typography
                className={clsx(styles.sale_price, {
                  [styles.sale_price_mv2]: isMobileV2,
                })}
              >
                {salePriceFormated}
              </Typography>
            </Grid>
          )}
        </div>
      );
    }

    if (isSellerList) {
      return (
        <>
          <div className={styles.salePrice_wrapper}>
            {isHappeningCampaign && salePrice && percentDealSold < 100 && (
              <Typography
                className={clsx(styles.sale_price, {
                  [styles.sale_price_mv2]: isMobileV2,
                })}
              >
                {salePriceFormated}
              </Typography>
            )}
            {!isHappeningCampaign && displayPrice && (
              <Typography
                className={clsx(styles.sale_price, {
                  [styles.sale_price_mv2]: isMobileV2,
                })}
              >
                {displayPriceFormated}
              </Typography>
            )}
          </div>
          <Grid
            container
            spacing={2}
            alignItems="center"
            className={clsx(styles.displayPrice_wrapper, {
              [styles.displayPrice_wrapper_mv2]: isMobileV2,
            })}
          >
            <Grid item style={{ padding: '0' }}>
              <Typography
                className={clsx(styles.display_price, {
                  [styles.display_price_mv2]: isMobileV2,
                })}
              >
                {((((productType === 'FLASH_SALE' && isHappeningCampaign) || productType === 'MEGA_DAY') && percentDealSold < 100) ||
                  (!isHappeningCampaign && !isCampaignPage)) &&
                  displayPriceFormated}
                {((productType === 'FLASH_SALE' && isHappeningCampaign) || productType === 'MEGA_DAY') &&
                  percentDealSold === 100 &&
                  salePriceFormated}
              </Typography>
            </Grid>
          </Grid>
        </>
      );
    }
    if (isCampaign && percentDealSold < 100) {
      return (
        <>
          <Grid
            container
            spacing={2}
            alignItems="center"
            className={clsx(styles.displayPrice_wrapper, isMobile && styles.wrap, {
              [styles.displayPrice_wrapper_mv2]: isMobileV2,
            })}
          >
            <Grid item style={{ padding: '0', width: isMobile && !beta ? '100%' : 'auto' }}>
              <Typography
                className={clsx(styles.display_price, {
                  [styles.display_price_mv2]: isMobileV2,
                })}
              >
                {((((productType === 'FLASH_SALE' && isHappeningCampaign) || productType === 'MEGA_DAY') && percentDealSold < 100) ||
                  (!isHappeningCampaign && !isCampaignPage)) &&
                  displayPriceFormated}
                {((productType === 'FLASH_SALE' && isHappeningCampaign) || productType === 'MEGA_DAY') &&
                  percentDealSold === 100 &&
                  salePriceFormated}
                {!isHappeningCampaign && isCampaignPage && `${hidenPrice}đ`}
              </Typography>
            </Grid>
            {!isHappeningCampaign && isCampaignPage && displayPrice && (
              <Grid item style={{ padding: '0', paddingLeft: '10px', width: isMobile && !beta ? '100%' : 'auto' }}>
                <Typography
                  className={clsx(styles.sale_price, {
                    [styles.sale_price_mv2]: isMobileV2,
                  })}
                >
                  {displayPriceFormated}
                </Typography>
              </Grid>
            )}
            {isHappeningCampaign && salePrice && percentDealSold < 100 && (
              <Grid item style={{ padding: '0', paddingLeft: '10px', width: isMobile && !beta ? '100%' : 'auto' }}>
                <Typography
                  className={clsx(styles.sale_price, {
                    [styles.sale_price_mv2]: isMobileV2,
                  })}
                >
                  {salePriceFormated}
                </Typography>
              </Grid>
            )}
          </Grid>
        </>
      );
    } else if (isDeal && deal) {
      return (
        <>
          <Grid
            container
            spacing={1}
            alignItems="center"
            className={clsx(styles.displayPrice_wrapper, isMobile && styles.wrap, {
              [styles.displayPrice_wrapper_mv2]: isMobileV2,
            })}
          >
            <Grid item style={{ padding: '0', width: isMobile && !beta ? '100%' : 'auto' }}>
              <Typography
                className={clsx(styles.display_price, {
                  [styles.display_price_mv2]: isMobileV2,
                })}
              >
                {displayPriceFormated}
              </Typography>
            </Grid>
            <Grid item style={{ padding: '0', paddingLeft: '10px', width: isMobile && !beta ? '100%' : 'auto' }}>
              <Typography
                className={clsx(styles.sale_price, {
                  [styles.sale_price_mv2]: isMobileV2,
                })}
              >
                {salePriceFormated}
              </Typography>
            </Grid>
          </Grid>
        </>
      );
    }

    return (
      <div className={row ? styles.price_wrapper : clsx(styles.price_wrapper, styles.price_wrapper_column)}>
        <Grid
          container
          alignItems="stretch"
          className={clsx(
            styles.displayPrice_wrapper,
            isMobile && styles.wrap,
            {
              [styles.displayPrice_wrapper_mv2]: isMobileV2,
            },
            wishlist && styles.pt_55,
          )}
        >
          <Grid item style={{ paddingLeft: '0', width: isMobile && !beta ? '100%' : 'auto' }}>
            <Typography
              className={clsx(styles.display_price, {
                [styles.display_price_mv2]: isMobileV2,
              })}
            >
              {displayPriceFormated}
            </Typography>
          </Grid>
          <Grid item>
            {errorCode === ERROR_CODE_CART.CHANGED_PRICE && currentPrice > displayPrice && <TrendingDownIcon className={styles.down} />}
            {errorCode === ERROR_CODE_CART.CHANGED_PRICE && currentPrice < displayPrice && <TrendingUpIcon className={styles.up} />}
          </Grid>
        </Grid>
        {isDeal && deal && (
          <Grid item style={{ width: isMobile && !beta ? '100%' : 'auto' }}>
            <Typography
              className={clsx(styles.sale_price, {
                [styles.sale_price_mv2]: isMobileV2,
              })}
            >
              {salePriceFormated}
            </Typography>
          </Grid>
        )}
      </div>
    );
  }
  function OrderMaximumProduct() {
    const data = [];
    if (
      (isCampaign && isHappeningCampaign && percentDealSold < 100) ||
      (isCampaign && productType === 'MEGA_DAY' && isHappeningCampaign && percentDealSold < 100)
    ) {
      data.push(
        <Typography className={row ? styles.text_desc : clsx(styles.text_danger_column, styles.text_desc)}>
          {/* Đặt tối đa {formatNumber(availableProducts)} {unit || 'sản phẩm'} với giá khuyến mãi */}
        </Typography>,
      );
    } else if (isHappeningCampaign && percentDealSold === 100 && isCampaignPage) {
      data.push(
        <Typography className={styles.text_danger}>Bạn đã bỏ lỡ giá khuyến mãi {formatCurrency(campaign?.retailPriceValue) || ''}</Typography>,
      );
    } else if (isHappeningCampaign && productType === 'NORMAL' && percentDealSold === 100 && isCampaignPage) {
      data.push(<Typography className={styles.text_danger}>Bạn đã bỏ lỡ giá khuyến mãi {formatCurrency(displayPrice) || ''}</Typography>);
    }
    if (messageLimitOrder) {
      data.push(<Typography className={row ? styles.text_desc : clsx(styles.text_danger_column, styles.text_desc)}>{messageLimitOrder}</Typography>);
    }
    if (data.length === 0) return <div className={styles.text_danger}> </div>;
    return <>{data}</>;
  }

  const checkAndRenderQuantityProduct = () => {
    let text = '';
    historyBySku?.forEach((item) => {
      if (item?.sku === sku) {
        text = item?.quantity > 0 && `Bạn đã mua ${formatNumber(item?.quantity)} / ${formatNumber(item?.limitQuantity)} sản phẩm trong ngày`;
      }
      if (item?.quantity > item?.limitQuantity) {
        text = '';
      }
    });
    return text;
  };

  const handleOnFocus = (e) => {
    e.preventDefault();
    setIsFocus(true);
  };

  // wishlist page v2
  if (wishlist) {
    return (
      <CardContent className={clsx(isMobile ? styles.card_wishlist_mobile_wrapper : styles.card_wishlist_wrapper)}>
        {errorRequiredCertificate ? (
          <>
            <div style={{ marginBottom: '' }}>
              <div style={{ marginBottom: '' }} />
              <Typography style={{ textAlign: 'center' }} className={clsx(styles.text_danger)}>
                {errorRequiredCertificateMessage}
              </Typography>
            </div>
            <Tooltip title="Xoá sản phẩm khỏi danh sách yêu thích">
              <IconButton className={styles.remove_icon} onClick={handleDelete}>
                <ICON_WISHLIST_DEL_V2 className={styles.icon} />
              </IconButton>
            </Tooltip>
          </>
        ) : noSupportDelivery ? (
          <div style={{ marginBottom: '16px' }}>
            <div style={{ marginBottom: '16px' }} className={row ? styles.price_wrapper : clsx(styles.price_wrapper, styles.price_wrapper_column)}>
              <Typography className={styles.deal_price}>{formatCurrency(salePrice)}</Typography>
            </div>
            <Typography style={{ textAlign: 'center' }} className={clsx(styles.text_danger, styles.center)}>
              Chưa hỗ trợ giao tỉnh
            </Typography>
          </div>
        ) : (
          <div className={styles.wishlist_input_container}>
            {isAuthenticated ? (
              <>
                {!isSellerList && errorCode === ERROR_CODE_CART.CHANGED_PRICE && (
                  <Typography className={row ? styles.text_danger : clsx(styles.text_change_price, styles.text_danger)}>
                    Sản phẩm thay đổi giá. Giá cũ {formatCurrency(currentPrice)}
                  </Typography>
                )}
                {messageLimitOrder && !isMobile && <Typography className={styles.text_desc_wishlist}>{messageLimitOrder}</Typography>}
                {checkAndRenderQuantityProduct() &&
                  !isMobile(<Typography className={styles.text_quantity_wishlist}>{checkAndRenderQuantityProduct()}</Typography>)}
                <div className={clsx(styles.wishlist_price, isMobile && styles.ml_10)}>
                  <GetPrice />
                </div>
                {(isDeal && (
                  <CardActions className={isMobile ? styles.product_action_mobile : clsx(styles.product_action, styles.product_action_column)}>
                    {messageLimitOrder && isMobile && <Typography className={styles.text_desc_wishlist_mobile}>{messageLimitOrder}</Typography>}
                    <div className={clsx(styles.input_wishlist, isMobile && styles.mh_28)}>
                      <NewMinusButton disabled={!dealReady} onClick={handleDecrease} className={isFocus && styles.border_focus_left} />
                      <NewInputProduct
                        product={product}
                        id={`${productId}`}
                        onChange={handleInputChange}
                        onBlur={handleOnBlur}
                        searchInput={(el) => {
                          searchInput.current[index] = el; // eslint-disable-line no-param-reassign
                        }}
                        onClick={handleClickInput}
                        onKeyDown={handleOnKeyDown}
                        type={type}
                        defaultValue={value}
                        name={name}
                        className={clsx(value > 0 && styles.has_item, isFocus && styles.border_focus_input)}
                        disabled={checkProductAvailable() || !dealReady}
                        onFocus={handleOnFocus}
                      />
                      <NewPlusButton
                        disabled={checkProductAvailable() || !dealReady || (maxQuantityProduct && value >= maxQuantityProduct)}
                        onClick={(e) => handleIncrease(e)}
                        className={isFocus && styles.border_focus_right}
                      />
                    </div>
                    {checkAndRenderQuantityProduct() && isMobile && (
                      <Typography className={styles.text_quantity_wishlist_mobile}>{checkAndRenderQuantityProduct()}</Typography>
                    )}
                  </CardActions>
                )) ||
                  (isCampaign && availableProducts > 0 && (
                    <CardActions className={isMobile ? styles.product_action_mobile : clsx(styles.product_action, styles.product_action_column)}>
                      {messageLimitOrder && isMobile && <Typography className={styles.text_desc_wishlist_mobile}>{messageLimitOrder}</Typography>}
                      <div className={clsx(styles.input_wishlist, isMobile && styles.mh_28)}>
                        <NewMinusButton disabled={!dealReady} onClick={handleDecrease} className={isFocus && styles.border_focus_left} />
                        <NewInputProduct
                          product={product}
                          id={`${productId}`}
                          onChange={handleInputChange}
                          onClick={handleClickInput}
                          onBlur={handleOnBlur}
                          searchInput={(el) => {
                            searchInput.current[index] = el; // eslint-disable-line no-param-reassign
                          }}
                          onKeyDown={handleOnKeyDown}
                          type={type}
                          defaultValue={value}
                          name={name}
                          className={clsx(value > 0 && styles.has_item, isFocus && styles.border_focus_input)}
                          disabled={checkProductAvailable() || !dealReady}
                          onFocus={handleOnFocus}
                        />
                        <NewPlusButton
                          disabled={checkProductAvailable() || !dealReady || (availableProducts && value >= availableProducts)}
                          onClick={() => handleIncrease()}
                          className={isFocus && styles.border_focus_right}
                        />
                      </div>
                      {checkAndRenderQuantityProduct() && isMobile && (
                        <Typography className={styles.text_quantity_wishlist_mobile}>{checkAndRenderQuantityProduct()}</Typography>
                      )}
                    </CardActions>
                  )) || (
                    <CardActions className={isMobile ? styles.product_action_mobile : clsx(styles.product_action, styles.product_action_column)}>
                      {messageLimitOrder && isMobile && <Typography className={styles.text_desc_wishlist_mobile}>{messageLimitOrder}</Typography>}
                      <div className={clsx(styles.input_wishlist, isMobile && styles.mh_28)}>
                        <NewMinusButton disabled={checkProductAvailable()} onClick={handleDecrease} className={isFocus && styles.border_focus_left} />
                        <NewInputProduct
                          product={product}
                          id={`${productId}`}
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          onKeyDown={handleOnKeyDown}
                          searchInput={(el) => {
                            searchInput.current[index] = el; // eslint-disable-line no-param-reassign
                          }}
                          defaultValue={value}
                          name={name}
                          className={clsx(value > 0 && styles.has_item, isFocus && styles.border_focus_input)}
                          disabled={checkProductAvailable()}
                          onFocus={handleOnFocus}
                        />
                        <NewPlusButton
                          disabled={checkProductAvailable() || (maxQuantityProduct && value >= maxQuantityProduct)}
                          onClick={(e) => handleIncrease(e)}
                          className={isFocus && styles.border_focus_right}
                        />
                      </div>
                      {checkAndRenderQuantityProduct() && isMobile && (
                        <Typography className={styles.text_quantity_wishlist_mobile}>{checkAndRenderQuantityProduct()}</Typography>
                      )}
                    </CardActions>
                  )}
                {isMobile ? (
                  <div className={styles.btn_del_m_wrapper}>
                    <Typography className={styles.btn_del_text} onClick={handleDelete}>
                      Xoá
                    </Typography>
                  </div>
                ) : (
                  <Tooltip title="Xoá sản phẩm khỏi danh sách yêu thích">
                    <IconButton className={styles.remove_icon} onClick={handleDelete}>
                      <ICON_WISHLIST_DEL_V2 className={styles.icon} />
                    </IconButton>
                  </Tooltip>
                )}
              </>
            ) : (
              <div className={styles.view_signin_btn}>
                <CustomButton color="#fff" backgroundColor="#00b46e" className={styles.signin_btn} onClick={toggleLogin}>
                  Đăng nhập để xem giá
                </CustomButton>
              </div>
            )}
          </div>
        )}
        {isShowModalRemove && <RemoveProductModal product={product} visible={isShowModalRemove} onClose={handleCancle} onRemove={handleRemove} />}
      </CardContent>
    );
  }

  return (
    <CardContent className={clsx(styles.card_wrapper, isMobileV2 && styles.card_wrapper_mv2)}>
      {!isSellerList && isHalfProgress && (isDeal || (isDeal && isHappeningCampaign && percentDealSold === 100)) && (
        <div className={styles.deal_wrapper}>
          <DealSectionNew
            dealStartTime={deal?.startTime}
            dealEndDay={deal?.endTime}
            dealReady={dealReady}
            maxQuantity={deal?.maxQuantity}
            totalSold={deal?.quantity || 0}
            percentDealSold={percentDeal || 0} // fix tạm percentDealSold ở product service
          />
        </div>
      )}
      {noSupportDelivery ? (
        <div style={{ marginBottom: '16px' }}>
          <div style={{ marginBottom: '16px' }} className={row ? styles.price_wrapper : clsx(styles.price_wrapper, styles.price_wrapper_column)}>
            <Typography className={styles.deal_price}>{formatCurrency(salePrice)}</Typography>
          </div>
          <Typography style={{ textAlign: 'center' }} className={clsx(styles.text_danger, styles.center)}>
            Chưa hỗ trợ giao tỉnh
          </Typography>
        </div>
      ) : (
        <>
          {isAuthenticated ? (
            <>
              {/* {!isSellerList && <OrderMaximumProduct />} */}
              {!isSellerList && errorCode === ERROR_CODE_CART.CHANGED_PRICE && (
                <Typography className={row ? styles.text_danger : clsx(styles.text_change_price, styles.text_danger)}>
                  Sản phẩm thay đổi giá. Giá cũ {formatCurrency(currentPrice)}
                </Typography>
              )}
              {!isSellerList && ((isHappeningCampaign && percentDealSold < 100) || (isHappeningCampaign && isDeal && availableProducts > 0)) && (
                <div className={styles.campaign_deal_container}>
                  <DealSectionNew
                    dealReady={productType === 'NORMAL' ? dealReady : isHappeningCampaign}
                    isHappeningCampaign={isHappeningCampaign}
                    dealStartTime={campaign?.campaign?.startTime}
                    dealEndDay={campaign?.campaign?.endTime}
                    totalSold={soldQuantity || 0}
                    percentDealSold={percentDealSold}
                  />
                </div>
              )}
              <GetPrice />
              {!isSellerList && <OrderMaximumProduct />}
              {!isSellerList &&
                ((isDeal && (
                  <CardActions className={row ? styles.product_action : clsx(styles.product_action, styles.product_action_column)}>
                    <div className={styles.input_container}>
                      <NewMinusButton disabled={!dealReady} onClick={handleDecrease} className={isFocus && styles.border_focus_left} />
                      <NewInputProduct
                        product={product}
                        id={`key-product-id-${productId}`}
                        // không dùng onChange trong ô input nữa, vì đang gõ ( số bị lên xuống thất thường , lưu lại nhiều log trên server)
                        onChange={handleInputChange}
                        onBlur={handleOnBlur}
                        searchInput={(el) => {
                          searchInput.current[index] = el; // eslint-disable-line no-param-reassign
                        }}
                        onClick={handleClickInput}
                        onKeyDown={handleOnKeyDown}
                        type={type}
                        defaultValue={value}
                        name={name}
                        className={clsx(value > 0 && styles.has_item, isFocus && styles.border_focus_input)}
                        disabled={checkProductAvailable() || !dealReady}
                        onFocus={handleOnFocus}
                      />
                      <NewPlusButton
                        disabled={checkProductAvailable() || !dealReady || (maxQuantityProduct && value >= maxQuantityProduct)}
                        onClick={(e) => handleIncrease(e)}
                        className={isFocus && styles.border_focus_right}
                      />
                    </div>
                  </CardActions>
                )) ||
                  (isCampaign && availableProducts > 0 && (
                    <CardActions className={row ? styles.product_action : clsx(styles.product_action, styles.product_action_column)}>
                      <div className={styles.input_container}>
                        <NewMinusButton disabled={!dealReady} onClick={handleDecrease} className={isFocus && styles.border_focus_left} />
                        <NewInputProduct
                          product={product}
                          id={`key-product-id-${productId}`}
                          // không dùng onChange trong ô input nữa, vì đang gõ ( số bị lên xuống thất thường , lưu lại nhiều log trên server)
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          searchInput={(el) => {
                            searchInput.current[index] = el; // eslint-disable-line no-param-reassign
                          }}
                          onClick={handleClickInput}
                          onKeyDown={handleOnKeyDown}
                          type={type}
                          defaultValue={value}
                          name={name}
                          className={clsx(value > 0 && styles.has_item, isFocus && styles.border_focus_input)}
                          disabled={checkProductAvailable() || !dealReady}
                          onFocus={handleOnFocus}
                        />
                        <NewPlusButton
                          disabled={checkProductAvailable() || !dealReady || (availableProducts && value >= availableProducts)}
                          onClick={(e) => handleIncrease(e)}
                          className={isFocus && styles.border_focus_right}
                        />
                      </div>
                    </CardActions>
                  )) || (
                    <CardActions className={row ? styles.product_action : clsx(styles.product_action, styles.product_action_column)}>
                      <div className={styles.input_container}>
                        <NewMinusButton disabled={checkProductAvailable()} onClick={handleDecrease} className={isFocus && styles.border_focus_left} />
                        <NewInputProduct
                          product={product}
                          id={`key-product-id-${productId}`}
                          // không dùng onChange trong ô input nữa, vì đang gõ ( số bị lên xuống thất thường , lưu lại nhiều log trên server)
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          onKeyDown={handleOnKeyDown}
                          onClick={handleClickInput}
                          searchInput={(el) => {
                            searchInput.current[index] = el; // eslint-disable-line no-param-reassign
                          }}
                          defaultValue={value}
                          name={name}
                          className={clsx(value > 0 && styles.has_item, isFocus && styles.border_focus_input)}
                          disabled={checkProductAvailable()}
                          onFocus={handleOnFocus}
                        />
                        <NewPlusButton
                          disabled={checkProductAvailable() || (maxQuantityProduct && value >= maxQuantityProduct)}
                          onClick={(e) => handleIncrease(e)}
                          className={isFocus && styles.border_focus_right}
                        />
                      </div>
                    </CardActions>
                  ))}
              {!isSellerList && (
                <Typography className={row ? styles.text_desc : clsx(styles.text_danger_column, styles.text_desc)}>
                  {checkAndRenderQuantityProduct()}
                </Typography>
              )}
            </>
          ) : (
            <div className={styles.view_signin_btn}>
              <CustomButton color="#fff" backgroundColor="#00b46e" className={styles.signin_btn} onClick={toggleLogin}>
                Đăng nhập để xem giá
              </CustomButton>
            </div>
          )}
        </>
      )}

      {isShowModalRemove && <RemoveProductModal product={product} visible={isShowModalRemove} onClose={handleCancle} onRemove={handleRemove} />}
    </CardContent>
  );
};
export default ProductCardInput;
