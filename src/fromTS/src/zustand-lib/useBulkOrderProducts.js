import create from 'zustand';
import { persist } from 'zustand/middleware';

const INITIAL_STATE = {
  products: [],
  errorBuklOrderProducts: [],
  overLimitQuantityOrderProducts: [],
  errAddToCartProducts: [],
};

// state cho đặt hàng SLL / luồng bệnh viện
const useBulkOrderProducts = create(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,
      setProducts: (payload) => {
        set({
          ...get(),
          products: payload,
        });
      },
      setErrorBulkOrderProducts: (payload) => {
        set({
          ...get(),
          errorBuklOrderProducts: payload,
        });
      },
      setOverLimitQuantityOrderProducts: (payload) => {
        set({
          ...get(),
          overLimitQuantityOrderProducts: payload,
        });
      },
      setErrAddToCartProducts: (payload) => {
        set({
          ...get(),
          errAddToCartProducts: payload,
        });
      },
      clearState: () => {
        set(INITIAL_STATE);
      },
    }),
    {
      name: 'bulk_order',
    },
  ),
);

export default useBulkOrderProducts;
