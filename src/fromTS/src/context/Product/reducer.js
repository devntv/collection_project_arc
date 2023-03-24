import types from './types';

export const initialState = {
  loading: false,
  mapProducts: new Map(),
  mapProductsByIds: new Map(),
  productViewed: null,
  productsPerDay: [],
};

const ProductReducer = (state, { type, payload }) => {
  switch (type) {
    case types.SET_HISTORY_TODAY: {
      const { productsPerDay } = payload;
      return {
        ...state,
        productsPerDay,
        loading: false,
      };
    }
    case types.CLEAR_MAP_PRODUCT: {
      return {
        ...state,
        mapProducts: new Map(),
        mapProductsByIds: new Map(),
      };
    }
    case types.GET_PRODUCT_BY_SKUS: {
      const { mapProducts } = payload;
      return {
        ...state,
        mapProducts,
        loading: false,
      };
    }
    case types.SET_PRODUCT_VIEWED: {
      const { productViewed } = payload;
      return {
        ...state,
        productViewed,
      };
    }
    case types.GET_PRODUCT_BY_IDS: {
      const { mapProductsByIds } = payload;
      return {
        ...state,
        mapProductsByIds,
        loading: false,
      };
    }
    case types.CLEAR:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default ProductReducer;
