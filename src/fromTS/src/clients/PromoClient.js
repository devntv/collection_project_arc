/* eslint-disable import/no-cycle */
import { PROMOTION_API } from 'constants/APIUriV2';
import { PAGE_SIZE_30 } from 'constants/data';
import { GET, getData, GET_ALL, POST } from './Clients';
import ProductClientV2 from './ProductClientV2';

async function getPromos(ctx) {
  const url = PROMOTION_API.PROMOTION_ALL;
  const res = await GET({ url, ctx });
  return getData(res);
}

async function getPromosByStatus({ ctx, status }) {
  const stringify = encodeURI(JSON.stringify({ status }));
  const url = `${PROMOTION_API.PROMOTION_ALL}?q=${stringify}`;
  const res = await GET({ url, ctx, isBasic: true });
  return getData(res);
}

async function getPromosActive({ ctx }) {
  const url = `${PROMOTION_API.PROMOTION_API_PREFIX}/promotion/active`;
  return GET_ALL({ url, ctx });
}

async function getPromotionByID({ ctx, promotionId }) {
  const url = `${PROMOTION_API.PROMOTION_API_PREFIX}/promotion`;
  const params = {
    promotionId,
  };
  return GET({ url, ctx, params });
}

async function getPromotionListByIDs({ ctx, promotionIDs }) {
  const url = PROMOTION_API.PROMOTION_ALL;
  const params = {
    q: JSON.stringify({ listIds: promotionIDs }),
  };
  return GET({ url, ctx, params });
}

async function getVoucherActiveOrder({ ctx }) {
  const url = `/marketplace/order/v2/voucher/active`;
  const params = {
    getValidate: true,
  };
  return GET_ALL({ url, params, ctx });
}

async function getVoucherActive({ ctx }) {
  const url = `${PROMOTION_API.PROMOTION_API_PREFIX}/voucher/active`;
  return GET_ALL({ url, ctx });
}

async function checkPromoAvailableForCart({ voucherCode, cartItems, totalPrice, ctx }) {
  const url = `${PROMOTION_API.PROMOTION_API_PREFIX}/check`;
  const body = { voucherCode, cartItems, totalPrice };
  return POST({ url, ctx, body });
}

async function getPromoDetailByVoucherCode({ voucherCode }) {
  const url = PROMOTION_API.PROMOTION_DETAI_VOUCHER_CODE;
  return GET({ url, params: { voucherCode } });
}

async function getMyVoucher({ ctx, offset, limit }) {
  const params = {
    offset,
    limit,
    getTotal: true,
  };
  const url = PROMOTION_API.VOUCHER;
  return GET({ url, ctx, params });
}

export const getActiveCampaign = async ({ ctx, limit = 100 }) => {
  const url = PROMOTION_API.PROMOTION_CAMPAIGN;
  return GET({ url, ctx, limit });
};

export const getActiveCampaignClient = async () => {
  const url = PROMOTION_API.PROMOTION_CAMPAIGN;
  return GET({ url });
};

export const getCampaignProducts = async ({ slug, ctx }) => {
  // const url = FUZZY_SEARCH;
  const searchStrategy = {
    text: true,
    keyword: true,
    ingredient: true,
  };
  const body = {
    filter: { campaign: slug },
    limit: PAGE_SIZE_30,
    getTotal: true,
    searchStrategy,
  };
  // const result = await POST({ url, body, ctx });
  return ProductClientV2.getFuzzySearchClient({ ctx, body });
};

export const getVoucherActiveConfig = async ({ offset, limit = 20, search = '', signal }) => {
  const url = '/marketplace/order/v2/voucher/active';

  const params = {
    getValidate: true,
    getTotal: true,
    offset,
    limit,
    search,
  };
  return GET({ url, params, signal });
};

export const getDataVoucherClient = async ({ signal, scope = '' }) => {
  const url = `${PROMOTION_API.VOUCHER}/list`;
  const params = {
    getTotal: true,
    scope,
  };
  return GET_ALL({ url, params, signal });
};

export const getMyHistoryVoucher = async ({ offset, limit, q = null }) => {
  const url = PROMOTION_API.MYVOUCHER_HISTORY;
  const params = {
    getTotal: true,
    offset,
    limit,
    q,
  };
  return GET({ url, params });
};

export default {
  getPromos,
  getPromosByStatus,
  checkPromoAvailableForCart,
  getPromosActive,
  getPromoDetailByVoucherCode,
  getMyVoucher,
  getPromotionByID,
  getPromotionListByIDs,
  getVoucherActive,
  getActiveCampaign,
  getActiveCampaignClient,
  getCampaignProducts,
  getVoucherActiveOrder,
  getVoucherActiveConfig,
  getMyHistoryVoucher,
  getDataVoucherClient,
};
