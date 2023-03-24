import { PRODUCT_API } from 'constants/APIUriV2';
import { TopManufacturer } from 'constants/manufacturer';
import { sortComparer } from 'utils/ArrUtils';
import { GET, getData, GET_ALL, isValid, POST } from './Clients';

async function loadDataMostSearch(ctx) {
  const url = '/product/most-search';
  const result = await GET({ url, ctx });

  return getData(result);
}

async function loadFeedback() {
  const result = await GET({ url: '/feedback', mock: true });
  return getData(result);
}

async function getInfoBanner() {
  const result = await GET({ url: '/banner', mock: true });
  return getData(result);
}

async function loadDataPormotion(ctx) {
  const res = await GET({ url: '/mock/product', mock: true, ctx });
  return getData(res);
}

// TODO  @dat.le
async function loadDataManufacturer(ctx) {
  const res = await GET_ALL({ url: PRODUCT_API.MANUFACTURER_LIST, ctx, isBasic: true });
  if (!isValid(res)) {
    return [];
  }
  return res?.data
    ?.filter((item) => TopManufacturer.indexOf(item.code) >= 0)
    .sort((a, b) => sortComparer(a?.name?.toLowerCase() || '', b?.name?.toLowerCase() || ''));
}

// fix limit 20 of tabs
export const getTabs = async ({ ctx }) => GET({ url: PRODUCT_API.TABS_ACTIVE, params: { limit: 20 }, ctx, isBasic: true });

export const getDeals = async ({ ctx, params }) => GET({ url: PRODUCT_API.DEALS, params, ctx, isBasic: true });

export const getSettingTags = async ({ ctx }) =>
  GET({
    url: PRODUCT_API.TAGS,
    ctx,
    isBasic: true,
  });

export const getProducts = async ({ ctx, codes, limit }) =>
  POST({
    url: PRODUCT_API.PRODUCT_LIST,
    body: { codes },
    params: { limit },
    ctx,
  });

export const getDataCollections = async ({ ctx }) =>
  GET({ url: PRODUCT_API.PRODUCT_LIST_COLLECTION, params: { q: 'MAIN_PAGE' }, isBasic: true, ctx });

export default {
  loadDataMostSearch,
  loadFeedback,
  getInfoBanner,
  loadDataPormotion,
  loadDataManufacturer,
  getTabs,
  getSettingTags,
  getDeals,
  getProducts,
  getDataCollections,
};
