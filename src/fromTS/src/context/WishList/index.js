import { getData, isValid, isValidWithoutData, WishlistClient } from 'clients';
import { HTTP_STATUS } from 'constants/Enums';
import { createContext, useCallback, useContext, useEffect } from 'react';
import { gtag, NotifyUtils } from 'utils';
import { useEnhancedReducer } from 'utils/EnhanceReducer';
import useSellers from 'zustand-lib/useSellers';
import { useAuth } from '../Auth/index';
import reducer from './reducer';
import types from './types';

const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const { user } = useAuth();
  const [state, dispatch, getState] = useEnhancedReducer(reducer, {});
  // eslint-disable-next-line no-shadow
  const getSellerByCode = useSellers((state) => state.getSellerByCode);
  // getWishlist

  useEffect(async () => {
    if (user && user.customerID) {
      const wishlistResult = await WishlistClient.getAllWishlist({ customerID: user.customerID });
      const data = getData(wishlistResult);
      dispatch({ type: types.GET_WISHLIST_RESP, payload: { data } });
    } else {
      // clear wishlist
      dispatch({ type: types.CLEAR });
    }
  }, [user]);

  const getWishlistBySkus = useCallback(async (product) => {
    if (!product || !product?.sku) {
      return false;
    }
    const { mapWishList = new Map() } = getState();
    return mapWishList.has(product?.sku);
  }, []);

  const handleDeleteProductWishlist = async (product) => {
    const res = await WishlistClient.deleteItemWishlist(product?.sku);
    if (isValidWithoutData(res)) {
      NotifyUtils.success(`Đã xóa ${product?.name} khỏi danh sách quan tâm`);
      dispatch({ type: types.REMOVE_WISHLIST, payload: { sku: product?.sku } });
      return false;
    }
    NotifyUtils.error(`Xóa sản phẩm ${product?.name} khỏi danh sách quan tâm thất bại`);
    return null;
  };

  const handleUpdateWishlist = async (product) => {
    const res = await WishlistClient.updateWishlist(product?.sku);

    if (isValid(res) || res?.status === HTTP_STATUS.Existed) {
      NotifyUtils.success(`Đã thêm ${product?.name} vào danh sách quan tâm`);

      dispatch({ type: types.ADD_WISHLIST_ITEM, payload: { sku: product?.sku } });

      // FB event tracking addToWishlist
      // fbpixel.addToWishlist(product);
      const sellerInfo = await getSellerByCode({ code: product?.sellerCode, tags: product?.tags });
      gtag.addToWishList({ ...product, sellerInfo });

      return true;
    }
    NotifyUtils.error(`Thêm ${product?.name} vào danh sách sản phẩm quan tâm thất bại`);
    return null;
  };

  const contextValues = {
    getWishlistBySkus,
    handleDeleteProductWishlist,
    handleUpdateWishlist,
    ...state,
  };

  return <WishListContext.Provider value={contextValues}>{children}</WishListContext.Provider>;
};

export const useWishList = () => useContext(WishListContext);
