/* eslint-disable no-param-reassign */
import { getData, PromotionClient } from 'clients';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const promotionLists = {
  data: [],
  loading: true,
  err: '',
  listSku: [],
};

let useGetPromoLists = (set, get) => ({
  promotionLists,
  getPromoLists: async ({ skus = [], getVoucherInfo, signal }) => {
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
          state.promotionLists.data = [getData(res)];
          state.promotionLists.listSku = [skus];
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
        'fetchDataPromotionLists_err',
      );
    }
  },
  dataByPromoListsDetail: () => {
    const { data } = get().promotionLists;
    return data;
  },
  filterTagGift: (sku, dataFunc, productCode) => {
    if (!sku || typeof dataFunc !== 'function' || !dataFunc) return false;
    const [data] = dataFunc() || [];

    const [filterTagWithSku] =
      data?.filter((item) => {
        if (item.sku) return item.sku === sku;
        return item.productCode === productCode;
      }) || [];
    if (filterTagWithSku && filterTagWithSku?.hasGift) return true;
    return false;
  },
});

useGetPromoLists = devtools(useGetPromoLists);
useGetPromoLists = persist(useGetPromoLists, { name: 'gifts' });
export default create(useGetPromoLists);
