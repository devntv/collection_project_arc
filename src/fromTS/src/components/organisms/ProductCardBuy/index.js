/* eslint-disable no-nested-ternary */
import { Box, CardActions, Checkbox, Grid, IconButton, Tooltip, Typography } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { Close, Delete } from '@material-ui/icons';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { getFirst, isValid } from 'clients';
import clsx from 'clsx';
import MobileInputProduct from 'components-v2/atoms/MobileInputProduct';
import MobileMinusButton from 'components-v2/atoms/MobileMinusButton';
import MobilePlusButton from 'components-v2/atoms/MobilePlusButton';
import { Button as CustomButton, InputProduct, MinusButton, PlusButton } from 'components/atoms';
import NewInputProduct from 'components/atoms/NewInputProduct';
import NewMinusButton from 'components/atoms/QuantityButton/NewMinusButton';
import NewPlusButton from 'components/atoms/QuantityButton/NewPlusButton';
import { CustomModal } from 'components/mocules';
import DealSection from 'components/mocules/DealSection';
import { palette } from 'constants/Colors';
import { ERROR_CODE_CART } from 'constants/ErrorCart';
import { ICON_WISHLIST_DEL_V2 } from 'constants/Icons';
import { GIFT_ICON2 } from 'constants/Images';
import { useAuth, useCart, useProduct } from 'context';
import useModal from 'hooks/useModal';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { calculateTimeLeft } from 'utils';
import { debounceFunc1000, debounceFunc400 } from 'utils/debounce';
import { formatCurrency, formatNumber } from 'utils/FormatNumber';
import ErrorQuantityCartModal from '../ErrorQuantityCartModal';
import RemoveProductModal from '../RemoveProductModal';
import styles from './styles.module.css';

const IMPORTANT_PERCENT_MAX = 20 / 100;

const CustomCheckbox = withStyles({
  root: {
    '&$checked': {
      color: palette.warning.main,
    },
    marginRight: '-7px !important',
  },
  checked: {},
})(React.forwardRef((props, ref) => <Checkbox color="default" ref={ref} {...props} />));
// thiếu forwardRef*

const GreenCheckbox = withStyles({
  root: {
    color: '#DCDBDB',
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const ContractPrice = () => <Box className={styles.contractLabel}>Giá hợp đồng</Box>;

const ProductCardBuy = ({
  maxQuantity: productMaxQuantity,
  not_support_delivery: noSupportDelivery,
  salePrice = 0,
  displayPrice = 0,
  // dealPrice,
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
  isGift,
  disableAddTocart = false,
  index,
  currentPrice,
  wishlist = false, // is page wishlist
  handleDelete,
  handleChangeCheckbox,
  availableProducts = 0,
  isCampaign,
  discountPercent = 0,
  isContractPrice,
  isSelected = false,
  messageLimitOrder,
  isMobileV2 = false,
  isBulkOrder = false, // new ui for bulk order (đặt hàng sll và luồng bệnh viện)
  // errorMessageProduct = 'Sản phẩm không áp dụng ở khu vực của bạn',
  // errorMessage = ' Sản phẩm không áp dụng ở khu vực của bạn',
}) => {
  const { unit, maxQuantityPerDay = 0, quantityPurchasedToday = 0, sku } = product || {};

  const maxQtyDeal = deal?.maxQuantity - deal?.quantity || 0;

  const listMaxQuantity = [productMaxQuantity];

  // nếu có số theo ngày thì mới tính
  if (maxQuantityPerDay > 0) {
    listMaxQuantity.push(maxQuantityPerDay - quantityPurchasedToday);
  }

  // limit theo ngày ( tìm min ) , nếu < 0 thì set lại về 0
  let maxQuantityProduct = (isCampaign && availableProducts) || (isDeal && maxQtyDeal) || Math.min(...listMaxQuantity);
  if (maxQuantityProduct < 0) {
    maxQuantityProduct = 0;
  }

  const outOfStock = deal?.maxQuantity === (deal?.quantity || 0) || false;
  const timeLeft = calculateTimeLeft(deal?.startTime) || {};
  const dealReady = Object.keys(timeLeft).length === 0 || false;
  const outOfDate = (deal && deal.endTime && new Date(deal.endTime) < new Date()) || false;
  const [value, setValue] = useState(product?.quantity || 0);
  const { isAuthenticated, toggleLogin } = useAuth();
  const [isShowModalWarning, toggleWarning] = useModal();
  const [isShowModalErrorQuantity, toggleErrorQuantity] = useModal();
  const [isShowModalRemove, toggleRemove] = useModal();
  const [inputElement, setInputElement] = useState();
  const { updateCartItem, removeCartItem, mapQuantity, importantList = [], validate200Item } = useCart();
  const { getInfoProductPerDay, getProductError } = useProduct();
  const historyBySku = getInfoProductPerDay();
  const { errorRequiredCertificate = false, errorRequiredCertificateMessage } = getProductError({ product });
  const [isFocus, setIsFocus] = useState(false); // style border

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
  useEffect(() => {
    setInputElement(Object.values(searchInput.current)[0]);
  }, []);

  const removeProductOutCart = () => {
    if (product?.errorCode === 'CHANGED_PRICE') {
      toggleRemove();
    } else if (product?.errorCode) {
      removeCartItem(product, cart || isBulkOrder || false);
    } else {
      toggleRemove();
    }
  };

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
      if (quantityResponse !== null) setValue(quantityResponse);
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
    toggleWarning();
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
    if (updateType === 'remove' && val === 0) {
      toggleRemove();
    }
    if (updateType === 'update') {
      updateCart(val);
    }
    if (updateType === 'edit' && val === 0) {
      toggleRemove();
      setValue((currValue) => currValue);
      updateCart(val);
    }
  };

  const handler = useCallback((val, updateType) => {
    if (isMobile) {
      debounceFunc1000(() => handleCart(val, updateType));
    } else {
      debounceFunc400(() => handleCart(val, updateType));
    }
  }, []);

  const handleDecrease = () => {
    if (inputElement.value < 1) return;
    const q = parseInt(inputElement.value, 10) - 1;
    if (q < 1) {
      handler(q, 'remove');
      return;
    }
    inputElement.value = q;
    setValue(q);
    handler(q, 'update');
  };

  const handleIncrease = () => {
    if (!validate200Item(product.sku)) {
      return;
    }
    const q = parseInt(inputElement.value, 10) + 1;
    inputElement.value = q;
    setValue(q);
    handler(q, 'update');
  };

  const handleInputChange = (e) => {
    try {
      const val = e?.currentTarget?.value?.replace(/[^\d]/g, '');
      Object.values(searchInput.current)[0].value = Math.min(maxQuantityProduct, val);
    } catch (error) {
      console.error('Error : ', error);
    }
    // if (/^\d+$/.test(val) || !val) {
    //   let curValue = parseFloat(val || 0);
    //   curValue = Math.min(maxQuantityProduct, curValue);
    //   Object.values(searchInput.current)[0].value = curValue;
    // }
  };

  const handleOnBlur = (e) => {
    setIsFocus(false);
    if (!validate200Item(product?.sku)) {
      Object.values(searchInput.current)[0].value = 0;
      return;
    }
    const val = e?.currentTarget?.value || value;
    if (/^\d+$/.test(val) && +val >= 0) {
      let curValue = parseFloat(val || 0);
      curValue = Math.min(maxQuantityProduct, curValue);
      if (curValue === value) return;
      // nếu value là 0 thì sẽ remove && quanity trong cartItems
      // TODO: nếu onblur 0 , rồi nhấn vào nút - cho kế bên
      inputElement.value = curValue;
      if (curValue === 0 && mapQuantity?.get(product?.sku) > 0) {
        handler(curValue, 'edit');
        return;
      }
      // setValue(curValue);
      if (curValue || curValue !== 0) handler(+curValue, 'update');
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

  const handleOnFocus = (e) => {
    e.preventDefault();
    setIsFocus(true);
  };

  if (isGift) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className={row ? styles.gift : clsx(styles.price_wrapper, styles.price_wrapper_column)}>
          <span className={styles.gift_quantity}>x{formatNumber(product.quantity || 0)}</span>
        </div>
        <CardActions
          className={
            row ? clsx(styles.product_action) : clsx(styles.product_action, styles.product_action_column, isMobileV2 && styles.product_action_mv2)
          }
        >
          <Image src={GIFT_ICON2} width="19" height="19" />
          <span className={styles.gift_label}>Quà tặng</span>
        </CardActions>
      </div>
    );
  }
  const checkProductAvailable = () => status === 'OUT_OF_STOCK' || status === 'SUSPENDED' || outOfStock || outOfDate;

  // remove product modal bị loop ,
  // TODO:
  if (
    errorRequiredCertificate ||
    errorMessageProduct ||
    !product?.salePrice ||
    product.status === 'STOP_SELLING' ||
    product?.salePrice === 0 ||
    (cart && disableAddTocart)
  ) {
    if (isBulkOrder) {
      return (
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={6}>
            <Typography className={styles.text_danger}>{errorMessageProduct || errorMessage || 'Đang cập nhật giá'}</Typography>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end" style={{ width: '100%' }}>
            <Tooltip title="Xoá sản phẩm">
              <IconButton className={styles.remove_icon} onClick={removeProductOutCart} data-test="btn-del-product">
                <ICON_WISHLIST_DEL_V2 className={styles.icon} />
              </IconButton>
            </Tooltip>
            <GreenCheckbox className={styles.checkbox_del} onChange={handleChangeCheckbox} value={productId} checked={isSelected} />
            {isShowModalRemove && <RemoveProductModal product={product} visible={isShowModalRemove} onClose={handleCancle} onRemove={handleRemove} />}
          </Grid>
        </Grid>
      );
    }

    return (
      <>
        <div
          className={
            row ? clsx(styles.price_wrapper) : clsx(styles.price_wrapper, isMobileV2 ? styles.price_wrapper_mv2 : styles.price_wrapper_column)
          }
        />
        <CardActions
          className={
            row ? clsx(styles.product_action) : clsx(styles.product_action, styles.product_action_column, isMobileV2 && styles.product_action_mv2)
          }
        >
          {cart && (
            <>
              <Tooltip title="Xoá sản phẩm">
                <IconButton className={styles.remove_icon} onClick={removeProductOutCart} data-test="btn-del-product">
                  {isMobile ? <Close className={styles.icon} /> : <Delete className={styles.icon} />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Chọn sản phẩm">
                <CustomCheckbox onChange={handleChangeCheckbox} value={productId} checked={isSelected} data-test="checkebox-cart-product" />
              </Tooltip>
              {isShowModalRemove && (
                <RemoveProductModal product={product} visible={isShowModalRemove} onClose={handleCancle} onRemove={handleRemove} />
              )}
            </>
          )}
          {wishlist && (
            <Tooltip title="Xoá sản phẩm khỏi danh sách yêu thích">
              <IconButton className={styles.remove_wishlist_icon} onClick={handleDelete} data-test="btn-del-wishlist">
                <Delete className={styles.icon} />
              </IconButton>
            </Tooltip>
          )}
        </CardActions>
        {/* fix bug duplicate error message https://buymed.atlassian.net/browse/APO-904 */}
        {!cart && (
          <Typography className={row ? styles.text_danger : clsx(styles.text_danger_column, styles.text_danger)}>
            {errorRequiredCertificate ? errorRequiredCertificateMessage : errorMessageProduct || errorMessage || 'Đang cập nhật giá'}
          </Typography>
        )}
      </>
    );
  }

  function GetPrice() {
    if (isCampaign && availableProducts > 0) {
      return (
        <div
          className={
            row ? clsx(styles.price_wrapper) : clsx(styles.price_wrapper, isMobileV2 ? styles.price_wrapper_mv2 : styles.price_wrapper_column)
          }
        >
          {isMobileV2 ? (
            <>
              <Box className={styles.mobileDisplayPrice_container}>
                {isContractPrice && <ContractPrice />}
                <Typography className={clsx(styles.deal_price, isMobileV2 && styles.deal_price_mv2)}>{formatCurrency(displayPrice)}</Typography>
                <Typography>
                  <span
                    className={clsx(
                      styles.discount_percent,
                      isMobileV2 && styles.discount_percent_mv2,
                      discountPercent === 0 && styles.hiddenPercent,
                    )}
                  >
                    {`- ${discountPercent}%`}
                  </span>
                  <span className={clsx(styles.old_price, isMobileV2 && styles.old_price_mv2)} data-test="old-price-text">
                    {formatCurrency(salePrice)}
                  </span>
                </Typography>
              </Box>
            </>
          ) : (
            <>
              {isContractPrice && <ContractPrice />}
              <Typography className={clsx(styles.deal_price, isMobileV2 && styles.deal_price_mv2)}>{formatCurrency(displayPrice)}</Typography>
              <Typography>
                <span
                  className={clsx(styles.discount_percent, isMobileV2 && styles.discount_percent_mv2, discountPercent === 0 && styles.hiddenPercent)}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {`- ${discountPercent}%`}
                </span>
                <span className={clsx(styles.old_price, isMobileV2 && styles.old_price_mv2)} data-test="old-price-text">
                  {formatCurrency(salePrice)}
                </span>
              </Typography>
            </>
          )}

          {/* <Typography className={styles.old_price}>{formatCurrency(salePrice)}</Typography> */}
        </div>
      );
    }
    if (!cart && isDeal && deal) {
      return (
        <div
          className={
            row ? clsx(styles.price_wrapper) : clsx(styles.price_wrapper, isMobileV2 ? styles.price_wrapper_mv2 : styles.price_wrapper_column)
          }
        >
          {isMobileV2 ? (
            <>
              <Box className={styles.mobileDisplayPrice_container}>
                {isContractPrice && <ContractPrice />}
                <Typography className={clsx(styles.deal_price, isMobileV2 && styles.deal_price_mv2)}>{formatCurrency(deal?.price)}</Typography>
                {discountPercent !== 0 && (
                  <Typography>
                    <span
                      className={clsx(
                        styles.discount_percent,
                        isMobileV2 && styles.discount_percent_mv2,
                        discountPercent === 0 && styles.hiddenPercent,
                      )}
                    >
                      {`- ${discountPercent}%`}
                    </span>
                    <span className={clsx(styles.old_price, isMobileV2 && styles.old_price_mv2)} data-test="old-price-text">
                      {' '}
                      {formatCurrency(product?.salePrice)}
                    </span>
                  </Typography>
                )}
              </Box>
            </>
          ) : (
            <>
              {/* Lấy giá từ ProductServiceV2 */}
              {isContractPrice && <ContractPrice />}
              <Typography className={clsx(styles.deal_price, isMobileV2 && styles.deal_price_mv2)}>{formatCurrency(deal?.price)}</Typography>
              <Typography>
                <span
                  className={clsx(styles.discount_percent, isMobileV2 && styles.discount_percent_mv2, discountPercent === 0 && styles.hiddenPercent)}
                >
                  {`- ${discountPercent}%`}
                </span>
                <span className={clsx(styles.old_price, isMobileV2 && styles.old_price_mv2)} data-test="old-price-text">
                  {' '}
                  {formatCurrency(product?.salePrice)}
                </span>
              </Typography>
            </>
          )}
        </div>
      );
    }
    return (
      <div
        className={row ? clsx(styles.price_wrapper) : clsx(styles.price_wrapper, isMobileV2 ? styles.price_wrapper_mv2 : styles.price_wrapper_column)}
      >
        {isMobileV2 ? (
          <>
            <Box className={styles.mobileDisplayPrice_container}>
              {isContractPrice && <ContractPrice />}
              <div className={styles.price_icon}>
                <Typography className={clsx(styles.deal_price, isMobileV2 && styles.deal_price_mv2)}>{formatCurrency(displayPrice)}</Typography>
                {errorCode === ERROR_CODE_CART.CHANGED_PRICE && currentPrice > displayPrice && <TrendingDownIcon className={styles.down} />}
                {errorCode === ERROR_CODE_CART.CHANGED_PRICE && currentPrice < displayPrice && <TrendingUpIcon className={styles.up} />}
              </div>
              {isDeal && deal && (
                <Typography className={clsx(styles.old_price, isMobileV2 && styles.old_price_mv2)} data-test="old-price-text">
                  {formatCurrency(salePrice)}
                </Typography>
              )}
            </Box>
          </>
        ) : (
          <>
            {isContractPrice && <ContractPrice />}
            <div className={styles.price_icon}>
              <Typography className={clsx(styles.deal_price, isMobileV2 && styles.deal_price_mv2)}>{formatCurrency(displayPrice)}</Typography>
              {errorCode === ERROR_CODE_CART.CHANGED_PRICE && currentPrice > displayPrice && <TrendingDownIcon className={styles.down} />}
              {errorCode === ERROR_CODE_CART.CHANGED_PRICE && currentPrice < displayPrice && <TrendingUpIcon className={styles.up} />}
            </div>
            {/* {errorCode === ERROR_CODE_CART.CHANGED_PRICE && <Typography className={styles.old_price}>{formatCurrency(currentPrice)}</Typography>} */}
            {isDeal && deal && (
              <div>
                {discountPercent > 0 && (
                  <span className={clsx(styles.discount_percent, isMobileV2 && styles.discount_percent_mv2)}>{`-${discountPercent}%`}</span>
                )}
                <span className={clsx(styles.old_price, isMobileV2 && styles.old_price_mv2)} data-test="old-price-text">
                  {formatCurrency(salePrice)}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
  const ActionOrderMV2 = () => (
    <Grid className={styles.wrapper_action_order_mv2}>
      <MobileMinusButton
        disabled={(dealReady && !dealReady) || value <= 0 || checkProductAvailable()}
        rootClass={styles.height32}
        onClick={handleDecrease}
      />
      <MobileInputProduct
        rootClass={styles.styleRootInput}
        type="number"
        className={styles.input_action_mv2}
        product={product}
        id={productId}
        // không dùng onChange trong ô input nữa, vì đang gõ ( số bị lên xuống thất thường , lưu lại nhiều log trên server)
        onChange={handleInputChange}
        onBlur={handleOnBlur}
        searchInput={(el) => {
          searchInput.current[index] = el; // eslint-disable-line no-param-reassign
        }}
        onKeyDown={handleOnKeyDown}
        defaultValue={value}
        name={name}
        disabled={checkProductAvailable() || !dealReady}
      />
      <MobilePlusButton
        disabled={checkProductAvailable() || !!(maxQuantityProduct && value >= maxQuantityProduct)}
        rootClass={styles.height32}
        onClick={handleIncrease}
      />
    </Grid>
  );

  // ui cho đặt hàng sll và luồng bệnh viện - APO-1115
  if (isBulkOrder && isAuthenticated) {
    return (
      <>
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
          <Grid container justifyContent="space-between" alignItems="center" className={styles.bulk_order_input_container}>
            <Grid item xs={4} className={styles.text_bulk_order_price}>
              {errorCode === ERROR_CODE_CART.CHANGED_PRICE && (
                <Typography className={clsx(styles.text_change_price, styles.text_danger)}>
                  Sản phẩm thay đổi giá. Giá cũ {formatCurrency(currentPrice)}
                </Typography>
              )}
              <GetPrice />
            </Grid>
            <Grid item xs={5} className={styles.bulk_order_input_card_container}>
              <Box className={styles.bulk_order_input_card}>
                <NewMinusButton onClick={handleDecrease} disabled={checkProductAvailable()} className={isFocus && styles.border_focus_left} />
                <NewInputProduct
                  product={product}
                  id={`${product?.productId}`}
                  onChange={handleInputChange}
                  onBlur={handleOnBlur}
                  searchInput={(el) => {
                    searchInput.current[index] = el; // eslint-disable-line no-param-reassign
                  }}
                  onKeyDown={handleOnKeyDown}
                  type={product?.type}
                  defaultValue={value}
                  name={name}
                  className={clsx(value > 0 && styles.has_item, isFocus && styles.border_focus_input)}
                  disabled={checkProductAvailable()}
                  onFocus={handleOnFocus}
                />
                <NewPlusButton
                  onClick={handleIncrease}
                  disabled={checkProductAvailable() || !!(maxQuantityProduct && value >= maxQuantityProduct)}
                  className={isFocus && styles.border_focus_right}
                />
              </Box>
            </Grid>
            <Grid item xs={3} container justifyContent="flex-end" alignItems="center" style={{ columnGap: '0px' }}>
              <Tooltip title="Xoá sản phẩm">
                <IconButton className={styles.remove_icon} onClick={removeProductOutCart}>
                  <ICON_WISHLIST_DEL_V2 className={styles.icon} />
                </IconButton>
              </Tooltip>
              <GreenCheckbox
                className={styles.checkbox_del}
                name="checkedDel"
                color="primary"
                onChange={handleChangeCheckbox}
                value={productId}
                checked={isSelected}
              />
              {isShowModalRemove && (
                <RemoveProductModal product={product} visible={isShowModalRemove} onClose={handleCancle} onRemove={handleRemove} />
              )}
            </Grid>
          </Grid>
        )}
        {isShowModalErrorQuantity && <ErrorQuantityCartModal product={product} visible={isShowModalErrorQuantity} onClose={toggleErrorQuantity} />}
      </>
    );
  }

  return (
    <>
      {isDeal && row && (
        <DealSection
          dealStartTime={deal?.startTime}
          dealEndDay={deal?.endTime}
          dealReady={dealReady}
          maxQuantity={deal?.maxQuantity}
          totalSold={deal?.quantity || 0}
          total={deal.maxQuantity}
        />
      )}
      {noSupportDelivery && row ? (
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
              {/* {requireGPPMessage && (
                <Typography className={row ? styles.text_danger : clsx(styles.text_danger_column, styles.text_danger)}>
                  {requireGPPMessage} 2
                </Typography>
              )} */}
              {/* {!isCampaign &&
              cartItemType !== ENUM_ORDER_TYPE.DEAL &&
              cartItemType !== ENUM_ORDER_TYPE.COMBO &&
              !cart &&
              ((maxQuantityProduct && maxQuantityProduct < MAX_PRODUCT_QTY_DISPLAY) || maxQuantityPerDay > 0) ? (
                <Typography color="textSecondary" className={row ? styles.text_danger : clsx(styles.text_danger_column_quickOrder, styles.text_desc)}>
                  {messageLimitOrder || ''}
                </Typography>
              ) : null} */}
              {!isMobileV2 && (
                <>
                  {!cart && messageLimitOrder && (
                    <Typography
                      color="textSecondary"
                      className={row ? styles.text_danger : clsx(styles.text_danger_column_quickOrder, styles.text_desc)}
                    >
                      {messageLimitOrder || ''}
                    </Typography>
                  )}
                  {!cart && (
                    <Typography
                      color="textSecondary"
                      className={row ? styles.text_danger : clsx(styles.text_danger_column_quickOrder_bottom, styles.text_desc)}
                    >
                      {checkAndRenderQuantityProduct() || ''}
                    </Typography>
                  )}
                </>
              )}

              {errorCode === ERROR_CODE_CART.CHANGED_PRICE && (
                <Typography className={row ? styles.text_danger : clsx(styles.text_change_price, styles.text_danger)}>
                  Sản phẩm thay đổi giá. Giá cũ {formatCurrency(currentPrice)}
                </Typography>
              )}
              {/* require GPP */}
              <div className={clsx(isMobileV2 && styles.wrapper_price_input_mv2)}>
                <GetPrice />
                {isMobileV2 && <ActionOrderMV2 />}
              </div>
              {/* Input component */}
              {(isDeal && (
                <CardActions
                  onClick={(e) => e.stopPropagation()}
                  className={
                    row
                      ? clsx(styles.product_action)
                      : clsx(styles.product_action, styles.product_action_column, isMobileV2 && styles.product_action_mv2)
                  }
                >
                  <MinusButton disabled={!dealReady} onClick={handleDecrease} data-test="btn-minus-product" />
                  <InputProduct
                    product={product}
                    // id={productId}
                    // không dùng onChange trong ô input nữa, vì đang gõ ( số bị lên xuống thất thường , lưu lại nhiều log trên server)
                    onChange={handleInputChange}
                    onBlur={handleOnBlur}
                    searchInput={(el) => {
                      searchInput.current[index] = el; // eslint-disable-line no-param-reassign
                    }}
                    onKeyDown={handleOnKeyDown}
                    type={type}
                    defaultValue={value}
                    name={name}
                    className={clsx(value > 0 && styles.has_item, cart && styles.mw_125)}
                    disabled={checkProductAvailable() || !dealReady}
                    data-test="input-num-product"
                  />
                  <PlusButton
                    disabled={checkProductAvailable() || !dealReady || (maxQuantityProduct && value >= maxQuantityProduct)}
                    onClick={() => handleIncrease()}
                    data-test="btn-plus-product"
                  />

                  {cart && (
                    <>
                      <Tooltip title="Xoá sản phẩm">
                        <IconButton className={styles.remove_icon} onClick={removeProductOutCart} data-test="btn-del-product">
                          {isMobile ? <Close className={styles.icon} /> : <Delete className={styles.icon} />}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Chọn sản phẩm">
                        <CustomCheckbox onChange={handleChangeCheckbox} value={productId} checked={isSelected} data-test="checkebox-cart-product" />
                      </Tooltip>
                    </>
                  )}
                  {wishlist && (
                    <Tooltip title="Xoá sản phẩm khỏi danh sách yêu thích">
                      <IconButton className={styles.remove_wishlist_icon} onClick={handleDelete} data-test="btn-del-wishlist">
                        <Delete className={styles.icon} />
                      </IconButton>
                    </Tooltip>
                  )}
                </CardActions>
              )) ||
                (isCampaign && availableProducts > 0 && (
                  <CardActions
                    onClick={(e) => e.stopPropagation()}
                    className={
                      row
                        ? clsx(styles.product_action)
                        : clsx(styles.product_action, styles.product_action_column, isMobileV2 && styles.product_action_mv2)
                    }
                  >
                    <MinusButton onClick={handleDecrease} data-test="btn-minus-product" />
                    <InputProduct
                      product={product}
                      // id={productId}
                      // không dùng onChange trong ô input nữa, vì đang gõ ( số bị lên xuống thất thường , lưu lại nhiều log trên server)
                      onChange={handleInputChange}
                      onBlur={handleOnBlur}
                      searchInput={(el) => {
                        searchInput.current[index] = el; // eslint-disable-line no-param-reassign
                      }}
                      onKeyDown={handleOnKeyDown}
                      type={type}
                      defaultValue={value}
                      name={name}
                      className={clsx(value > 0 && styles.has_item, cart && styles.mw_125)}
                      disabled={checkProductAvailable()}
                      data-test="input-num-product"
                    />
                    <PlusButton
                      disabled={checkProductAvailable() || (availableProducts && value >= availableProducts)}
                      onClick={() => handleIncrease()}
                      data-test="btn-plus-product"
                    />
                    {cart && (
                      <>
                        <Tooltip title="Xoá sản phẩm">
                          <IconButton className={styles.remove_icon} onClick={removeProductOutCart} data-test="btn-del-product">
                            {isMobile ? <Close className={styles.icon} /> : <Delete className={styles.icon} />}
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Chọn sản phẩm">
                          <CustomCheckbox onChange={handleChangeCheckbox} value={productId} checked={isSelected} data-test="checkebox-cart-product" />
                        </Tooltip>
                      </>
                    )}
                    {wishlist && (
                      <Tooltip title="Xoá sản phẩm khỏi danh sách yêu thích">
                        <IconButton className={styles.remove_wishlist_icon} onClick={handleDelete} data-test="btn-del-wishlist">
                          <Delete className={styles.icon} />
                        </IconButton>
                      </Tooltip>
                    )}
                  </CardActions>
                )) || (
                  <CardActions
                    onClick={(e) => e.stopPropagation()}
                    className={
                      row
                        ? clsx(styles.product_action)
                        : clsx(styles.product_action, styles.product_action_column, isMobileV2 && styles.product_action_mv2)
                    }
                  >
                    <MinusButton disabled={checkProductAvailable()} onClick={handleDecrease} data-test="btn-minus-product" />
                    <InputProduct
                      product={product}
                      // id={productId}
                      // không dùng onChange trong ô input nữa, vì đang gõ ( số bị lên xuống thất thường , lưu lại nhiều log trên server)
                      onChange={handleInputChange}
                      onBlur={handleOnBlur}
                      onKeyDown={handleOnKeyDown}
                      searchInput={(el) => {
                        searchInput.current[index] = el; // eslint-disable-line no-param-reassign
                      }}
                      defaultValue={value}
                      name={name}
                      className={clsx(value > 0 && styles.has_item, cart && styles.mw_125)}
                      disabled={checkProductAvailable()}
                      data-test="input-num-product"
                    />
                    <PlusButton
                      disabled={checkProductAvailable() || !!(maxQuantityProduct && value >= maxQuantityProduct)}
                      onClick={() => handleIncrease()}
                      data-test="btn-plus-product"
                    />
                    {cart && (
                      <>
                        <Tooltip title="Xoá sản phẩm">
                          <IconButton className={styles.remove_icon} onClick={removeProductOutCart} data-test="btn-del-product">
                            {isMobile ? <Close className={styles.icon} /> : <Delete className={styles.icon} />}
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Chọn sản phẩm">
                          <CustomCheckbox onChange={handleChangeCheckbox} value={productId} checked={isSelected} data-test="checkebox-cart-product" />
                        </Tooltip>
                      </>
                    )}
                    {wishlist && (
                      <Tooltip title="Xoá sản phẩm khỏi danh sách yêu thích">
                        <IconButton className={styles.remove_wishlist_icon} onClick={handleDelete} data-test="btn-del-wishlist">
                          <Delete className={styles.icon} />
                        </IconButton>
                      </Tooltip>
                    )}
                  </CardActions>
                )}
              {isMobileV2 && (
                <Box className={styles.mobileProductNote_container}>
                  {!cart && messageLimitOrder && (
                    <Typography
                      color="textSecondary"
                      className={row ? styles.text_danger : clsx(styles.mobileText_danger_column_quickOrder, styles.text_desc)}
                    >
                      {messageLimitOrder || ''}
                    </Typography>
                  )}
                  {!cart && (
                    <Typography
                      color="textSecondary"
                      className={row ? styles.text_danger : clsx(styles.mobileText_danger_column_quickOrder_bottom, styles.text_desc)}
                    >
                      {checkAndRenderQuantityProduct() || ''}
                    </Typography>
                  )}
                </Box>
              )}
              {false && isCampaign && availableProducts > 0 && (
                <Typography className={row ? styles.text_danger : clsx(styles.text_danger_column, styles.text_danger)}>
                  Đặt tối đa {formatNumber(availableProducts)} {unit || 'sản phẩm'} với giá khuyến mãi
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
      {/* TODO: popup bị render nhiều lần */}
      {isShowModalRemove && <RemoveProductModal product={product} visible={isShowModalRemove} onClose={handleCancle} onRemove={handleRemove} />}
      {isShowModalWarning && (
        <CustomModal
          onClose={toggleWarning}
          visible={isShowModalWarning}
          title="Xin xác nhận"
          content="Số lượng sản phẩm hiện không thỏa điều kiện để đánh dấu quan trọng. Vui lòng bỏ đánh dấu để tiếp tục xóa"
          btnOkRender={false}
          btnOnClose="Đóng"
        />
      )}
      {isShowModalErrorQuantity && <ErrorQuantityCartModal product={product} visible={isShowModalErrorQuantity} onClose={toggleErrorQuantity} />}
    </>
  );
};
export default ProductCardBuy;
