import { CartClientV2, getFirst, isValid, isValidWithoutData } from 'clients';
import { ARR_REMOVE_PRODUCT, MONITORING_COLLECTOR_TYPE } from 'constants/Enums';
import { ERROR_CART, ERROR_CODE_CART } from 'constants/ErrorCart';
import { useAuth } from 'context/Auth';
import { useProduct } from 'context/Product/context';
import { useModal } from 'hooks';
import { useRouter } from 'next/router';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { CartService } from 'services';
import { MAX_ITEM_IN_CART } from 'sysconfig';
import { NotifyUtils, gtag } from 'utils';
import { useEnhancedReducer } from 'utils/EnhanceReducer';
import { formatCurrency } from 'utils/FormatNumber';
import { getProxyImageList } from 'utils/ImageUtils';
import MonitorUtils, { mapScreenToEnum, mapSourceToEnum } from 'utils/MonitorUtils';
import { capitalizeText } from 'utils/StringUtils';
import { isEmpty } from 'utils/ValidateUtils';
import useSellers from 'zustand-lib/useSellers';
import { CartReducer } from './CartReducer';
import { CHECKOUT, CLEAR, FETCH_ERROR, FETCH_SUCCESS, INCREASE_BY, SELECT_ALL_ITEM, SELECT_ITEM, UN_SELECT_ALL_ITEM } from './CartType';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { getProductBySkus } = useProduct();
  const initialState = { loading: true };
  const [isShowModalMax200Item, toggleShowModalMax200Item] = useModal();
  const getSellerByCode = useSellers((state) => state.getSellerByCode);

  const giftProductRowRef = useRef(null);

  const [isLoadingCart, setIsLoadingCart] = useState(false);

  // const [state, dispatch] = useReducer(CartReducer, initialState);

  // enhance cartReducer support function getState
  const [state, dispatch, getState] = useEnhancedReducer(CartReducer, initialState);
  const clearCart = () => {
    dispatch({ type: CLEAR });
    setIsLoadingCart(false);
  };

  const handleCheckout = () => {
    dispatch({ type: CHECKOUT });
  };

  // const getPromoInfo = useCallback(async ({ voucherCode }) => {
  //   if (!voucherCode) {
  //     return null;
  //   }
  //   const promoData = await PromoService.getPromotionDetailByVoucherCode({ voucherCode });
  //   return promoData;
  // });

  // business_client , GPP , business certificate
  // eslint-disable-next-line no-unused-vars
  const getErrorCart = ({ errorCode, errorMessage = null }) =>
    // console.log('🚀 ~ file: CartContext.js ~ line 54 ~ getErrorCart ~ errorCode, errorMessage', errorCode, errorMessage);
    // if (errorCode === ERROR_CODE_CART.REQUIRED_CERTIFICATE) {
    //   let message = 'Sản phẩm yêu cầu giấy phép: ';
    //   if (errorMessage?.indexOf('GPP') >= 0) {
    //     message += 'GPP';
    //   }
    //   if (errorMessage?.indexOf('BUSSINESS_CLIENT') >= 0) {
    //     message += ' giấy đủ điều kiện kinh doanh dược';
    //   }
    //   if (errorMessage?.indexOf('BUSSINESS_CERTIFICATE') >= 0) {
    //     message += ' giấy hoạt động phòng khám ';
    //   }
    //   return message;
    // }
    ERROR_CART[errorCode];
  const getInfoCartItem = useCallback(async ({ data, getPrice }) => {
    if (isEmpty(data)) {
      return [];
    }
    const skusReduce = data.reduce((accumulator, item) => {
      if (item?.sku) return [...accumulator, item.sku];
      return accumulator;
    }, []);

    if (skusReduce.length === 0) {
      return [];
    }
    const mapInfo = await getProductBySkus({ skus: skusReduce, getPrice });

    // sort những item nào có lỗi sẽ hiện lên trước
    let cartItems = data.map((item) => {
      const { quantity, skuStatus } = item || {};

      // TODO: ẩn nhà cung cấp
      const {
        imagesProxy,
        unit,
        volume,
        name,
        slug,
        deal = {},
        isDeal,
        isGift,
        skuType,
        productId,
        defaultImage,
        displayPrice,
        salePrice,
        dealPrice,
        requireGPPMessage,
        isCampaign,
        availableProducts,
        tags,
        productSkuType,
        weight,
        productVolume,
        statusData,
        limitPerDay,
        maxQuantityPerDay,
        quantityPurchasedToday,
        discountPercent,
        messageLimitOrder,
        categoryCodes,
        campaign,
        isContractPrice,
        skus,
      } = mapInfo.get(item.sku) || {};

      let { errorCode = '' } = item;
      const isNearOutOfStock = skuStatus === 'LIMIT' || false;
      if (!errorCode && maxQuantityPerDay > 0 && quantity > maxQuantityPerDay - quantityPurchasedToday) {
        // eslint-disable-next-line no-param-reassign
        errorCode = 'MAX_QUANTITY';
      }

      // const salePrice = deal?.dealType === 'COMBO' || !deal ? item.price : item.salePrice;
      const disableAddTocart =
        errorCode === 'NOT_ACTIVE_SKU' ||
        errorCode === 'SUSPENDED_SKU' ||
        errorCode === 'OUT_OF_STOCK_SKU' ||
        errorCode === 'CART_ITEM_INVALID' ||
        errorCode === 'NOT_AVAILABLE_SKU' ||
        errorCode === 'NOT_FOUND_SKU' ||
        errorCode === 'NOT_FOUND_PRICE_SKU' ||
        errorCode === 'COMBO_INVALID' ||
        errorCode === ERROR_CODE_CART.REQUIRED_CERTIFICATE ||
        false;

      /*
      // nếu item (cart item ) là deal thì có thêm 1 field là  salePrice ( giá gốc )
      // nếu không là deal thì chỉ có price 
      nhưng khi hiển thị ở cartProductBuy lại chỉ check salePrice , nên nếu 
      Updaate chỗ này để nếu có saleprice thì lấy giá saleprice , còn nếu ko có thì lấy giá price theo cartItem 
      salePrice: item.salePrice || item.price,
  */
      const info = {
        ...item,
        salePrice,
        errorCode,
        defaultImage,
        displayPrice,
        displayPriceFormated: formatCurrency(displayPrice),
        dealPrice,
        imagesProxy,
        volume,
        unit,
        name,
        slug,
        deal,
        isDeal,
        isGift,
        disableAddTocart,
        skuType,
        productId, // for insider
        requireGPPMessage,
        isCampaign,
        availableProducts,
        productTags: tags || [],
        tags,
        productSkuType,
        weight,
        productVolume,
        statusData,
        isVAT: tags?.indexOf('HOADONNHANH') >= 0 || false,
        limitPerDay,
        maxQuantityPerDay,
        quantityPurchasedToday,
        discountPercent,
        messageLimitOrder,
        categoryCodes,
        campaign,
        isNearOutOfStock,
        isContractPrice,
        skus,
      };
      // khi add khuyến mãi là các gift quà tặng thì auto sellected là false luôn,
      function isGiftSellect(giftSellected) {
        if (giftSellected) return Object.assign(info, { isSelected: false });
        return null;
      }
      isGiftSellect(isGift);
      return info;
    });

    cartItems = cartItems.sort((a, b) => (a.errorCode && !b.errorCode ? -1 : 1));

    return cartItems;
  });

  // const getTotalCartItem = async () => {};
  // const updateCartFirstTime = async () => {};

  const getCartItemsInfo = async (cartData = {}) => {
    const { cartItems = [] } = cartData || {};
    const [cartItemsInfo] = await Promise.all([getInfoCartItem({ data: cartItems, getPrice: true })]);

    return { ...cartData, cartItems: cartItemsInfo };
  };

  // reload cart
  const reloadDataCart = async ({ cartRes, successMessage, errorMessage, isUpdate = false, isLoadFromStart = false }) => {
    try {
      if (isLoadFromStart) setIsLoadingCart(true);
      if (cartRes && !isValidWithoutData(cartRes)) {
        const [cartResponse] = getFirst(cartRes, []);
        switch (cartRes.errorCode) {
          case 'MAX_QUANTITY':
            // [ [ {quantity} ] ]
            if (cartResponse?.quantity > 0) {
              NotifyUtils.error(`${cartRes.message}, Số lượng hàng còn lại là ${cartResponse.quantity}`);
            } else {
              NotifyUtils.error(`${cartRes.message}`);
            }
            break;
          case 'PAYLOAD_VALIDATE':
            if (cartRes.message === 'Type must be one of [NORMAL DEAL COMBO CAMPAIGN]') {
              NotifyUtils.error(`Không thể thêm sản phẩm là Quà tặng vào giỏ hàng`);
            } else {
              NotifyUtils.error('Đã có lỗi xảy ra, vui lòng thử lại');
            }
            break;
          default:
            if (cartRes && cartRes.message) {
              NotifyUtils.error(`${cartRes.message}`);
            } else if (errorMessage) {
              NotifyUtils.error(errorMessage);
            }
            return;
        }
      }
      if (successMessage) NotifyUtils.success(successMessage);

      const cartResult = await CartClientV2.loadDataCart();

      const cartData = getFirst(cartResult);
      if (!cartData) {
        clearCart();
        return;
      }

      /*
       chỉ trang cart cần load lại data product , còn  khi các action khác chỉ cần update lại thông tin cartItem thôi là dc
      */
      const { cartItems = [], redeemApplyResult = [], maxWeight = 0, maxVolume = 0 } = cartData || {};

      // const giftArray = redeemApplyResult?.[0]?.gifts || [];
      const hasGiftArray = redeemApplyResult
        ?.filter((item) => item?.gifts && item?.canUse === true)
        ?.map((item) => ({
          ...item,
          gifts: item?.gifts.map((gift) => ({ ...gift })),
        }));
      const giftList = [];
      hasGiftArray.forEach((ele) => {
        giftList.push(...ele.gifts);
      });
      const arrayHashmap = giftList.reduce((obj, item) => {
        const newObj = obj;

        if (newObj[item?.sku]) {
          newObj[item.sku].quantity += item.quantity;
        } else {
          newObj[item.sku] = { ...item };
        }

        return newObj;
      }, {});

      const giftArray = Object.values(arrayHashmap);
      const [cartItemsInfo, giftInfo] = await Promise.all([
        getInfoCartItem({ data: cartItems, getPrice: true }),
        // getPromoInfo({ voucherCode: redeemCode[0] }),
        getInfoCartItem({ data: giftArray, getPrice: false }),
      ]);

      // thêm isGift vào để phân biệt
      const giftsInfo = giftInfo?.map((item) => ({ ...item, isGift: true, type: 'GIFT' }));

      cartData.cartItems = [...cartItemsInfo, ...giftsInfo];

      /* Check error cart item */
      cartData.isErrorCartItem =
        cartData?.cartItems?.some((item) => item?.isSelected && item?.errorCode && item?.errorCode !== ERROR_CODE_CART.CHANGED_PRICE) || false;
      cartData.havingItemSelected = !!cartData?.cartItems?.find((item) => item?.isSelected === true);
      cartData.isItemInArrayRemove = cartData?.cartItems?.some((item) => ARR_REMOVE_PRODUCT.indexOf(item?.errorCode) >= 0) || false;
      if (maxVolume > 0 || maxWeight > 0) {
        const { totalWeight, totalVolume, maxWidth, maxHeight, maxLength } = cartData || {};

        const isOverWeightOrVolume = (maxWeight > 0 && totalWeight >= maxWeight) || (maxVolume > 0 && totalVolume >= maxVolume);
        cartData.isOverWeightOrVolume = isOverWeightOrVolume;
        let messageOverWeight = '';
        let messageOverVolume = '';
        if (maxWeight > 0 && totalWeight >= maxWeight) {
          messageOverWeight = `Giỏ hàng hiện tại vượt quá ${maxWeight}kg.`;
          if (isUpdate) NotifyUtils.error(`Tổng khối lượng của đơn hàng đã vượt quá ${maxWeight}kg`);
        }
        if (maxVolume > 0 && totalVolume >= maxVolume) {
          let maxVolumeCalc = '';
          if (maxWidth > 0 && maxLength > 0 && maxHeight > 0) {
            maxVolumeCalc = `${maxLength}x${maxWidth}x${maxHeight}`;
          }
          messageOverVolume = `Giỏ hàng hiện tại vượt quá quy cách đóng gói ${maxVolumeCalc}`;
          if (totalVolume >= maxVolume) {
            NotifyUtils.error(`Giỏ hàng hiện tại đã vượt quá quy cách đóng gói ${maxVolumeCalc}`);
          }
        }
        if (isOverWeightOrVolume) cartData.messageOverWeightOrVolume = `${messageOverWeight}${messageOverVolume}`;
      }

      setIsLoadingCart(false);
      dispatch({ type: FETCH_SUCCESS, payload: cartData || [] });
    } catch (error) {
      NotifyUtils.error(error.message || 'Tải giỏ hàng thất bại');
      dispatch({ type: FETCH_ERROR });
      setIsLoadingCart(false);
    }
  };

  // TODO: change to reloadCart
  const updateCart = useCallback(async () => {
    // const cartRes = await CartClientV2.loadDataCart();
    // if (!isValid(cartRes)) {
    //   dispatch({ type: FETCH_ERROR });
    //   return;
    // }
    await reloadDataCart({ isLoadFromStart: true });
  }, []);

  useEffect(() => {
    async function fetchData() {
      await updateCart();
    }
    try {
      if (isAuthenticated) {
        fetchData();
      } else {
        // logout remove cart
        clearCart();
      }
    } catch (error) {
      clearCart();
    }
  }, [updateCart, isAuthenticated]);

  const mapDataProduct = (products = []) => {
    const { mapQuantity = new Map() } = getState();
    return products.map((item) => ({
      ...item,
      imagesProxy: getProxyImageList(item?.imageUrls) || [],
      // unit: item.unit && item.unit === '<nil>' ? '' : item.unit,
      quantity: mapQuantity.get(item.sku) || 0,
    }));
  };

  const updateCartItem = async (payload, reload = false, isReloadData = false, isNotify = true) => {
    if (!payload?.product?.sku && isNotify) {
      NotifyUtils.error('Không tìm thấy sản phẩm cần thêm.');
      return null;
    }

    const { cartItems, cartNo } = getState();

    const info = cartItems?.find((item) => item.sku === payload?.product?.sku);
    const sellerInfo = await getSellerByCode({ code: payload?.product?.sellerCode });

    const dataUpdate = { ...payload, cartNo, sellerID: sellerInfo?.sellerID || null };

    dataUpdate.page = info?.page || router.pathname.replace('/', '') || 'home';

    dataUpdate.searchKey = info ? info.searchKey : router.query?.q || router.query?.text;

    dataUpdate.eventSource = mapSourceToEnum(payload?.product || {}, router.pathname) || '';
    dataUpdate.eventScreen = mapScreenToEnum(payload?.product || {}, router.pathname) || '';

    let cartRes = await CartClientV2.updateCartItem(dataUpdate);

    if (reload) {
      reloadDataCart({
        cartRes,
        isReloadData,
        isUpdate: true,
      });
    }

    if (isValid(cartRes)) {
      // FB event tracking addToCart
      // fbpixel.addToCart(payload.product);

      if (!info?.quantity && payload?.product?.isRecommendedByTS) {
        // 0 -> 1: send tracking collector event
        MonitorUtils.sendSKUEvent(MONITORING_COLLECTOR_TYPE.ADD_TO_CART, { ...payload.product, quantity: dataUpdate?.q || 0 }, window.location.href);
      }

      gtag.addToCart({ ...payload.product, quantity: dataUpdate?.q || 0, sellerInfo });
      gtag.addToCartInPage({ ...payload.product, quantity: dataUpdate?.q || 0, sellerInfo }, router.pathname);

      if (isNotify) {
        NotifyUtils.success(`Đã cập nhật ${capitalizeText(dataUpdate.product.name)} thành công`);
      }
    } else if (cartRes.errorCode === 'CART_MAX_QUANTITY' || cartRes.errorCode === 'MAX_QUANTITY') {
      try {
        // get quanity can add from response and compare with maxQuantity
        const [{ quantity = dataUpdate.product.maxQuantity }] = getFirst(cartRes, []);
        dataUpdate.q = quantity;
        cartRes = await CartClientV2.updateCartItem(dataUpdate);
        // if (isValid(cartRes)) {
        //   NotifyUtils.success(`Đã cập nhật ${capitalizeText(dataUpdate.product.name)} thành công`);
        // } else {
        //   NotifyUtils.error(`Cập nhật sản phẩm thất bại`);
        // }
        dispatch({ type: INCREASE_BY, payload: dataUpdate });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }

    return cartRes;
  };

  // clone from updateCardItem add skip call API when payload larger than the quantity required
  const updateCartItemMV2 = async (payload, reload = false, isReloadData = false) => {
    if (!payload?.product?.sku) {
      NotifyUtils.error('Không tìm thấy sản phẩm cần thêm.');
      return null;
    }

    const { cartItems, cartNo } = getState();
    const info = cartItems?.find((item) => item.sku === payload?.product?.sku);

    const dataUpdate = { ...payload, cartNo };

    dataUpdate.page = info?.page || router.pathname.replace('/', '') || 'home';

    dataUpdate.searchKey = info ? info.searchKey : router.query?.q || router.query?.text;

    dataUpdate.eventSource = mapSourceToEnum(payload?.product || {}, router.pathname) || '';
    dataUpdate.eventScreen = mapScreenToEnum(payload?.product || {}, router.pathname) || '';

    const cartRes = await CartClientV2.updateCartItem(dataUpdate);

    if (reload) {
      reloadDataCart({
        cartRes,
        isReloadData,
        isUpdate: true,
      });
    }

    if (isValid(cartRes)) {
      // FB event tracking addToCart
      // fbpixel.addToCart(payload.product);

      gtag.addToCart({ ...payload.product, quantity: dataUpdate?.q || 0 });

      gtag.addToCartInPage({ ...payload.product, quantity: dataUpdate?.q || 0 }, router.pathname);

      NotifyUtils.success(`Đã cập nhật ${capitalizeText(dataUpdate.product.name)} thành công`);
    } else if (cartRes.errorCode === 'CART_MAX_QUANTITY' || cartRes.errorCode === 'MAX_QUANTITY') {
      return {
        status: cartRes.errorCode,
        maxQuantity: getFirst(cartRes, [0])[0]?.quantity || 0,
      };
    }

    return cartRes;
  };

  // update for excel
  const updateCartItems = async (items) => {
    items.forEach((item) => {
      const { sku, quantity } = item || {};
      updateCartItem({ product: { sku }, q: quantity });
    });
  };
  const updateCartItemByExecel = (str) => {
    const arr = str.replaceAll('\t', ' ').split(' ');
    const items = [];
    for (let i = 0; i < arr.length > 0; i += 2) {
      const sku = arr[i].trim();
      const quantity = Number(arr[i + 1]);
      items.push({ sku, quantity });
    }
    updateCartItems(items);
  };

  // update for excel
  const increase = async (payload) => {
    const cartRes = await CartClientV2.updateCartItem({
      ...payload,
      eventSource: mapSourceToEnum({}, router.pathname) || '',
      eventScreen: mapScreenToEnum({}, router.pathname) || '',
    });
    reloadDataCart({
      cartRes,
      successMessage: 'Thêm sản phẩm thành công',
      errorMessage: 'Cập nhật sản phẩm thất bại',
    });
  };

  const decrease = async (payload) => {
    const cartRes = await CartClientV2.updateCartItem({
      ...payload,
      eventSource: mapSourceToEnum({}, router.pathname) || '',
      eventScreen: mapScreenToEnum({}, router.pathname) || '',
    });
    reloadDataCart({
      cartRes,
      successMessage: 'Đã cập nhật giỏ hàng,',
      errorMessage: 'Cập nhật sản phẩm thất bại',
    });
  };

  const removeCartItem = async ({ sku, isRecommended = false, isSameCategoryProduct = false }, isReloadData = false, isShowMessage = true) => {
    const payload = { sku };
    const { cartItems, cartNo } = getState();

    const info = cartItems.find((item) => item.sku === sku);

    // :TODO: LOGS info for activity
    payload.cartNo = cartNo;
    payload.name = info?.name;
    payload.slug = info?.slug;
    // payload.productCode = info?.productCode;
    payload.productId = info?.productId;
    payload.salePrice = info?.salePrice;
    payload.sellerCode = info?.sellerCode;
    payload.cartNo = info?.cartNo;
    payload.cartItemType = info?.cartItemType;
    payload.type = info?.type || null;
    payload.eventSource = mapSourceToEnum({ isRecommended, isSameCategoryProduct }, router.pathname) || '';
    payload.eventScreen = mapScreenToEnum({ isRecommended, isSameCategoryProduct }, router.pathname) || '';
    // end log

    const sellerInfo = await getSellerByCode({ code: payload?.sellerCode });

    const cartRes = await CartClientV2.removeCartItem({ ...payload, sellerID: sellerInfo?.sellerID || null });

    // if (cartRes?.status === 'OK') {
    //   MonitorUtils.sendSKUEvent(MONITORING_COLLECTOR_TYPE.REMOVE_FROM_CART, payload);
    // }

    if (isReloadData) {
      reloadDataCart({
        cartRes,
        successMessage: isShowMessage ? `Sản phẩm ${capitalizeText(payload.name)} đã được xóa ra khỏi giỏ hàng` : '',
        errorMessage: isShowMessage ? 'Xoá sản phẩm thất bại' : '',
        isReloadData,
      });
    }
    return cartRes;
  };

  const removeAllCartItems = async (isReloadData = false, isShowMessage = true) => {
    // add isDeleteAll to remove all items in cart
    const payload = { isDeleteAll: true };
    const { cartNo } = getState();
    // :TODO: LOGS info for activity
    payload.cartNo = cartNo;
    // payload.eventSource = mapSourceToEnum({ isRecommended, isSameCategoryProduct }, router.pathname) || '';
    // payload.eventScreen = mapScreenToEnum({ isRecommended, isSameCategoryProduct }, router.pathname) || '';
    // end log
    const cartRes = await CartClientV2.removeCartItem(payload);

    if (isReloadData) {
      reloadDataCart({
        cartRes,
        successMessage: isShowMessage ? `Xoá giỏ hàng thành công` : '',
        errorMessage: isShowMessage ? 'Xoá giỏ hàng thất bại' : '',
        isReloadData,
      });
    }
    return cartRes;
  };

  const addImportant = async (payload) => {
    const cartRes = await CartClientV2.updateCartItemImportant({
      eventSource: mapSourceToEnum({}, router.pathname) || '',
      eventScreen: mapScreenToEnum({}, router.pathname) || '',
      sku: payload.sku,
      isImportant: true,
      type: payload.type,
    });
    updateCart({
      cartRes,
      successMessage: 'Đánh dấu quan trọng thành công ',
      errorMessage: 'Đánh dấu quan trọng sản phẩm thất bại',
    });
  };

  const removeImportant = async (payload, isReloadData = true) => {
    const cartRes = await CartClientV2.updateCartItemImportant({
      eventSource: mapSourceToEnum({}, router.pathname) || '',
      eventScreen: mapScreenToEnum({}, router.pathname) || '',
      sku: payload.sku,
      isImportant: false,
      type: payload.type,
    });
    if (isReloadData)
      updateCart({
        cartRes,
        successMessage: 'Xoá đánh dấu quan trọng thành công',
        errorMessage: 'Xoá đánh dấu quan trọng thất bại',
      });
  };

  const updateDeliveryInfo = async (body) => {
    const res = await CartClientV2.updateDeliveryMethod({
      ...body,
    });
    if (!isValid(res)) {
      return;
    }
    updateCart();
  };

  const updateDeliveryMethod = async ({
    deliveryMethod,
    customerDistrictCode,
    customerProvinceCode,
    customerWardCode,
    customerShippingAddress,
    info, // logs info
  }) => {
    const { cartNo } = getState();

    const res = await CartClientV2.updateDeliveryMethod({
      deliveryMethod,
      customerDistrictCode,
      customerProvinceCode,
      customerWardCode,
      customerShippingAddress,
      ...info,
      cartNo,
    });
    if (!isValid(res)) {
      NotifyUtils.error(res?.message || 'Cập nhật phương thức giao hàng thất bại ');
      return;
    }
    NotifyUtils.success('Cập nhật phương thức giao hàng thành công');
    updateCart();
  };

  const updatePaymentMethod = async ({
    paymentMethod,
    customerDistrictCode,
    customerProvinceCode,
    customerWardCode,
    info, // for logs
  }) => {
    const { cartNo } = getState();
    const res = await CartClientV2.updatePaymentMethod({
      paymentMethod,
      customerDistrictCode,
      customerProvinceCode,
      customerWardCode,
      ...info, // for log
      cartNo,
    });
    if (!isValid(res)) {
      NotifyUtils.error(res.message || 'Cập nhật phương thức thanh toán thất bại ');
      return;
    }
    NotifyUtils.success('Cập nhật phương thức thanh toán thành công');
    updateCart();
  };

  const updateInvoice = async (body) => {
    const result = await CartClientV2.updateCart({ body });
    if (!isValid(result)) {
      NotifyUtils.error(result.message || 'Cập nhật thông tin xuất hoá đơn thất bại ');
    }
  };

  const updateCartInfo = async (body) => {
    const result = await CartClientV2.updateCart({ body });
    if (!isValid(result)) {
      NotifyUtils.error(result.message || 'Cập nhật thông tin thất bại');
    } else {
      updateCart();
    }
  };

  const reOrderById = async ({ orderId }) => {
    const result = await CartService.reOrder({ orderId });
    if (isValid(result)) {
      updateCart();
    } else {
      NotifyUtils.error(result.message || 'Không thể đặt lai đơn hàng này');
    }
    return result;
  };

  // APO-8
  const selectCartItem = async ({ sku, skus, isSelected, isReloadCart, name, quantity }) => {
    dispatch({ type: SELECT_ITEM, payload: { sku, skus, isSelected } });
    if (isReloadCart) {
      reloadDataCart({
        successMessage: 'Thêm sản phẩm thành công',
        errorMessage: 'Cập nhật sản phẩm thất bại',
      });
    }
    const result = await CartService.selectCartItem({ sku, skus, isSelected, cartNo: state?.cartNo || '', quantity, name });
    // update lai cart sau khi sellected
    await updateCart();
    return result;
  };

  const selectAllCartItem = async () => {
    dispatch({ type: SELECT_ALL_ITEM });
    const result = await CartService.selectAllCartItem({ cartNo: state?.cartNo || '' });
    updateCart();
    return result;
  };

  const unselectAllCartItem = async () => {
    dispatch({ type: UN_SELECT_ALL_ITEM });
    const result = await CartService.unSelectAllCartItem({ cartNo: state?.cartNo || '' });
    updateCart();
    return result;
  };

  const verifyPayment = async (body) => {
    const rs = await CartClientV2.verifyPayment({ body });
    return rs;
  };
  // chặn không quá 200 item
  const validate200Item = (sku) => {
    const { mapQuantity } = getState();
    const quantity = mapQuantity?.get(sku) || 0;
    if (quantity === 0 && mapQuantity.size >= MAX_ITEM_IN_CART) {
      NotifyUtils.error(`Giỏ hàng chỉ chứa tối đa ${MAX_ITEM_IN_CART} mặt hàng`);
      // toggleShowModalMax200Item();
      return false;
    }
    return true;
  };

  const handleScrollToGiftRow = () => {
    giftProductRowRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' });
  };

  const contextValues = {
    mapDataProduct,
    removeCartItem,
    removeAllCartItems,
    updateCartItem,
    updateCartItemMV2,
    increase,
    decrease,
    clearCart,
    handleCheckout,
    addImportant,
    removeImportant,
    updateCart,
    updateDeliveryMethod,
    updatePaymentMethod,
    reloadDataCart,
    getCartItemsInfo,
    updateInvoice,
    updateDeliveryInfo,
    updateCartInfo,
    reOrderById,
    updateCartItems,
    updateCartItemByExecel,
    selectCartItem,
    selectAllCartItem,
    unselectAllCartItem,
    verifyPayment,
    validate200Item,
    getErrorCart,
    toggleShowModalMax200Item,
    isShowModalMax200Item,
    giftProductRowRef,
    handleScrollToGiftRow,
    isLoadingCart,
    getState,
    ...state,
  };

  return <CartContext.Provider value={contextValues}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
