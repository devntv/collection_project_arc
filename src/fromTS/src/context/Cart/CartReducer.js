import { convertArrayToMapValue } from 'utils/ArrUtils';
import Insider from 'utils/Insider';
import {
  ADD_IMPORTANT,
  ADD_ITEM,
  CHECKOUT,
  CLEAR,
  DECREASE,
  FETCH_ERROR,
  FETCH_SUCCESS,
  INCREASE,
  INCREASE_BY,
  REMOVE_IMPORTANT,
  REMOVE_ITEM,
  SELECT_ALL_ITEM,
  SELECT_ITEM,
  UN_SELECT_ALL_ITEM,
} from './CartType';

// remove cartiItems
const Storage = () => {
  // eslint-disable-next-line no-unused-expressions
  typeof localStorage !== 'undefined' && localStorage.removeItem('cartThuocSi');
  // typeof localStorage !== 'undefined' && localStorage.setItem('cartThuocSi', JSON.stringify(cartItems.length > 0 ? cartItems : []));
};

export const sumItems = (cartItems) => {
  Storage(cartItems);
  const itemCount = cartItems.reduce((total, product) => total + product.quantity, 0);
  return { itemCount };
};

const findIsSelectAllItem = (cartItems) => !cartItems.find(({ isSelected = false, isGift = false }) => !isSelected && !isGift);

const getImportantList = (cartItems) => cartItems?.filter((item) => item.isSelected && item.isImportant);

const checkIsHaveProductDeal = (cartItems) => !!cartItems.find((item) => item.type === 'DEAL' || item.type === 'COMBO' || item.isCampaign);

const getErrProducts = (cartItems) => cartItems?.filter((item) => item?.isSelected && (item?.errorCode || item?.errorMessage)) || [];

// logic đánh dấu sp quan trọng , chỉ được đánh 1 sản phẩm trên 5 sp
const checkImportantList = (cartItems) => {
  const cartItemsSelected = cartItems?.filter((item) => item.isSelected);
  const totalImportant = cartItemsSelected?.filter((item) => item.isImportant).length;
  const totalCanImportant = Math.floor(cartItemsSelected.length / 5);
  const totalRemainingCanImportant = totalCanImportant - totalImportant;
  return { isErrorImportant: !(totalImportant <= totalCanImportant), totalCanImportant, totalRemainingCanImportant };
};

const initState = {
  itemCount: 0,
  cartItems: [],
  redeemCode: [],
  note: '',
  totalPrice: 0,
  price: 0,
  discount: 0,
  paymentMethod: null,
  paymentMethodFee: 0,
  deliveryMethod: null,
  deliveryMethodFee: 0,
  loading: false,
  mapQuanity: null,
  extraFee: null,
  isSelectedAll: false,
  importantList: [],
  isHaveProductDeal: false,
  customerShippingAddress: null,
  customerWardCode: null,
  customerProvinceCode: null,
  customerDistrictCode: null,
  wardCode: null,
  districtCode: null,
  provinceCode: null,
  customerPhone: null,
  customerName: null,
  customerId: null,
  customerCode: null,
  customerAddressCode: null,
  cartNo: null,
  paymentMethodPercentage: null,
  regionCode: null,
  regionCodes: [],
  subPrice: 0,
  totalFee: 0,
  totalItem: 0,
  totalItemSelected: 0,
  totalPriceAllItem: 0,
  isErrorCartItem: false,
  isErrorImportant: false,
  totalCanImportant: 0,
  totalRemainingCanImportant: 0,
  errProducts: [],
  redeemApplyResult: [],
};

export const CartReducer = (state, { type, payload }) => {
  const { cartItems } = state;
  // const data = payload && payload.cartItems ? payload.cartItems : [];
  const { cartItems: data = [], extraFee = null, paymentMethodFee = 0, deliveryMethodFee = 0, cartNo, subPrice = 0 } = payload || {};

  const mapQuantity = convertArrayToMapValue(data, 'sku', 'quantity');

  if (data) {
    // TODO: insider
    Insider.updateCartItem(data);
  }

  switch (type) {
    case FETCH_SUCCESS: {
      const result = {
        ...state,
        ...initState,
        ...sumItems([...data]),
        cartItems: [...data],
        mapQuantity,
        ...payload,
        subPrice: Math.max(subPrice, 0),
        deliveryMethodFee,
        paymentMethodFee,
        extraFee,
        cartNo,
        loading: false,
        isSelectedAll: findIsSelectAllItem(data),
        groupBySellerCode: [],
        importantList: getImportantList(data),
        isHaveProductDeal: checkIsHaveProductDeal(data),
        errProducts: getErrProducts(data),
        ...checkImportantList(data),
      };
      return result;
    }
    case FETCH_ERROR:
      return {
        ...state,
        ...initState,
      };
    case ADD_ITEM:
      if (!cartItems.find((item) => item.sku === payload.sku)) {
        cartItems.push({
          ...payload,
          quantity: 1,
          isSelected: true,
        });
      }

      return {
        ...state,
        ...sumItems(cartItems),
        cartItems: [...cartItems],
        mapQuantity,
        isHaveProductDeal: checkIsHaveProductDeal(data),
      };
    case SELECT_ITEM: {
      const { skus = [], sku } = payload;
      if (sku) {
        skus.push(sku);
      }
      skus.forEach((skuItem) => {
        cartItems[cartItems.findIndex((item) => item.sku === skuItem)].isSelected = payload.isSelected || false;
      });

      return {
        ...state,
        cartItems: [...cartItems],
        isSelectedAll: findIsSelectAllItem(cartItems),
        ...checkImportantList(data),
      };
    }
    case UN_SELECT_ALL_ITEM: {
      return {
        ...state,
        cartItems: cartItems.map((item) => ({ ...item, isSelected: false })),
        isSelectedAll: false,
        isHaveProductDeal: checkIsHaveProductDeal(data),
        ...checkImportantList(data),
      };
    }
    case SELECT_ALL_ITEM: {
      return {
        ...state,
        cartItems: cartItems.map((item) => ({ ...item, isSelected: true })),
        isSelectedAll: true,
        isHaveProductDeal: checkIsHaveProductDeal(data),
        ...checkImportantList(data),
      };
    }
    case REMOVE_ITEM:
      return {
        ...state,
        ...sumItems(cartItems.filter((item) => item.sku !== payload.sku)),
        cartItems: [...cartItems.filter((item) => item.sku !== payload.sku)],
        mapQuantity,
        isSelectedAll: findIsSelectAllItem(cartItems),
        isHaveProductDeal: checkIsHaveProductDeal(data),
        ...checkImportantList(data),
      };
    case INCREASE:
      if (!cartItems.find((item) => item.sku === payload.sku)) {
        cartItems.push({
          ...payload,
          quantity: 1,
          isSelected: true,
        });
      } else {
        cartItems[cartItems.findIndex((item) => item.sku === payload.sku)].quantity += 1;
      }
      return {
        ...state,
        ...sumItems(cartItems),
        cartItems: [...cartItems],
        mapQuantity,
        isHaveProductDeal: checkIsHaveProductDeal(data),
      };
    case INCREASE_BY:
      if (!cartItems.find((item) => item.sku === payload.product.sku)) {
        cartItems.push({
          ...payload.product,
          quantity: payload.q,
          isSelected: true,
        });
      } else {
        cartItems[cartItems.findIndex((item) => item.sku === payload.product.sku)].quantity = payload.q;
      }
      return {
        ...state,
        ...sumItems(cartItems),
        cartItems: [...cartItems],
        mapQuantity,
        isHaveProductDeal: checkIsHaveProductDeal(data),
      };
    case DECREASE:
      // eslint-disable-next-line no-case-declarations
      const currentItem = cartItems[cartItems.findIndex((item) => item.sku === payload.sku)];
      if (currentItem && currentItem.quantity !== 0) {
        currentItem.quantity -= 1;
      }
      return {
        ...state,
        ...sumItems(currentItem && currentItem.quantity !== 0 ? cartItems : cartItems.filter((item) => item.sku !== payload.sku)),
        cartItems: currentItem && currentItem.quantity !== 0 ? [...cartItems] : [...cartItems.filter((item) => item.sku !== payload.sku)],
        mapQuantity,
        isHaveProductDeal: checkIsHaveProductDeal(data),
        ...checkImportantList(data),
      };
    case CHECKOUT:
      return {
        checkout: true,
        ...initState,
      };
    case ADD_IMPORTANT:
      // eslint-disable-next-line no-param-reassign
      state.cartItems[state.cartItems.findIndex((item) => item.sku === payload.sku)].isImportant = true;
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
        importantList: getImportantList(data),
        ...checkImportantList(data),
      };
    case REMOVE_IMPORTANT:
      // eslint-disable-next-line no-param-reassign
      delete state.cartItems[state.cartItems.findIndex((item) => item.sku === payload.sku)].isImportant;
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
        importantList: getImportantList(data),
        ...checkImportantList(data),
      };
    case CLEAR:
      return {
        cartItems: [],
        ...sumItems([]),
        note: '',
        redeemCode: [],
        mapQuantity,
        loading: false,
        ...initState,
      };
    default:
      return state;
  }
};
