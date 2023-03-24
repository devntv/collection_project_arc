/* eslint-disable no-param-reassign */
import { KHUYEN_MAI } from 'constants/Paths';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

let useDealUrl = (set) => ({
  link: '',
  debug: '',

  getUrlDeal: ({ campaign: campaignWithProduct = {} }) => {
    set((state) => {
      state.debug = campaignWithProduct;
    });
    const { campaign } = campaignWithProduct || {};
    const { campaignType, slug: linkTagBySlug, campaignCode } = campaign || {};
    if (campaignType !== 'DAILY_DEAL') {
      set(
        (state) => {
          state.link = `${KHUYEN_MAI}/${linkTagBySlug}?code=${campaignCode}`;
        },
        false,
        'get_link_with_campaign',
      );
    }
    // deal
    if (!campaignWithProduct) {
      set(
        (state) => {
          state.link = '/dealss';
        },
        false,
        'get_link_with_deal',
      );
    }
  },
});
useDealUrl = devtools(useDealUrl);
export default create(useDealUrl);
