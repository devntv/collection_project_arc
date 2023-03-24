/* eslint-disable arrow-body-style */
/* eslint-disable no-param-reassign */
import { getData } from 'clients';
import { KHUYEN_MAI } from 'constants/Paths';
import { ProductServiceV2 } from 'services';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const productsData = {
  data: [],
  loading: true,
  err: '',
  urlDeal: '',
};

let useDealUrlFromProduct = (set, get) => {
  return {
    productsData,
    getProductRes: async (query) => {
      set(
        (state) => {
          state.productsData.loading = true;
        },
        false,
        'fetchDataProducts',
      );
      try {
        const res = await ProductServiceV2.loadDataProductWeb({ query });
        set(
          (state) => {
            state.productsData.loading = false;
            state.productsData.data = getData(res);
          },
          false,
          'fetchDataProduct_success',
        );
      } catch (err) {
        set(
          (state) => {
            state.productsData.loading = false;
            state.productsData.err = err;
          },
          false,
          'fetchDataProduct_err',
        );
      }
    },
    getUrlDeal: () => {
      let url = '';
      const productData = get().productsData.data || [];
      if (productData)
        productData.forEach(({ campaign }) => {
          const { campaignType, slug, campaignCode } = campaign || {};
          if (campaignType !== 'DAILY_DEAL') url = `${KHUYEN_MAI}/${slug}?code=${campaignCode}`;
        });
      set((state) => {
        state.productsData.urlDeal = url;
      });
    },
  };
};
useDealUrlFromProduct = devtools(useDealUrlFromProduct);
export default create(useDealUrlFromProduct);
