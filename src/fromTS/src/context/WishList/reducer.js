import { convertArrayToMap } from 'utils/ArrUtils';
import types from './types';

export const initialState = {
  loading: true,
  mapWishList: new Map(),
};

const ProductReducer = (state, { type, payload }) => {
  switch (type) {
    case types.GET_WISHLIST: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.GET_WISHLIST_RESP: {
      const { data } = payload;
      return {
        ...state,
        mapWishList: data && convertArrayToMap(data, 'sku'),
        loading: false,
      };
    }
    case types.REMOVE_WISHLIST: {
      const { sku } = payload;
      state.mapWishList.delete(sku);
      return {
        ...state,
        mapWishList: state.mapWishList,
      };
    }
    case types.ADD_WISHLIST_ITEM: {
      const { sku } = payload;
      state.mapWishList.set(sku, true);
      return {
        ...state,
        mapWishList: state.mapWishList,
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
