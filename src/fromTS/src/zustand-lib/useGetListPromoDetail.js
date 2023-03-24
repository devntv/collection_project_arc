/* eslint-disable no-param-reassign */
import { getData, PromotionClient } from 'clients';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const promotionLists = {
  data: [],
  loading: true,
  err: '',
};

let useGetPromoLists = (set, get) => ({
  promotionLists,
  getPromoLists: async ({ skus, getVoucherInfo, signal }) => {
    set(
      (state) => {
        state.promotionLists.loading = true;
      },
      false,
      'fetchDataPromotionLists',
    );
    try {
      const res = await PromotionClient.getPromoLists({ skus, getVoucherInfo, signal });
      set(
        (state) => {
          state.promotionLists.loading = false;
          state.promotionLists.data = getData(res);
        },
        false,
        'fetchDataPromotionLists_success',
      );
    } catch (err) {
      set(
        (state) => {
          state.promotionLists.loading = false;
          state.promotionLists.err = err;
        },
        false,
        'fetchDataProduct_err',
      );
    }
  },
  getDataByPromoListsDetail: () => {
    const data = get().promotionLists;
    return data;
  },
});

useGetPromoLists = devtools(useGetPromoLists);
useGetPromoLists = persist(useGetPromoLists, { name: 'giftsDetail' });
export default create(useGetPromoLists);
