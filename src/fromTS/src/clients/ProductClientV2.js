import { FUZZY_SEARCH, ORDER_API, PRODUCT_API } from 'constants/APIUriV2';
import { PreventSearchKeywords, PreventSearchKeywordsAlias } from 'constants/data';
import { ResponseUtils, StringUtils } from 'utils';
import { sortComparer } from 'utils/ArrUtils';
import { GET, getData, GET_ALL, POST } from './Clients';

async function loadDataMostSearch(ctx) {
  const url = '/product/most-search';
  const result = await GET({ url, ctx });
  return getData(result);
}

// TODO  @dat.le
async function loadDataManufacturer(ctx) {
  const res = await GET_ALL({ url: PRODUCT_API.MANUFACTURER_LIST, ctx, isBasic: true });
  return getData(res)?.sort((a, b) => sortComparer(a?.name?.toLowerCase() || '', b?.name?.toLowerCase() || ''));
}

const loadDataManufacturerMock = async () => GET({ url: '/web/manufactuers', mock: true, isAuth: false });

const getTagNameFromIds = async ({ tagIds }) => GET({ url: '/marketplace/product/v2/tag/list', params: { codes: tagIds, limit: 100 } });

// fix limit 20 of tabs -> converted
export const getTabs = async ({ ctx }) => GET({ url: PRODUCT_API.TABS_ACTIVE, params: { limit: 100 }, ctx, isBasic: true });

export const getDeals = async ({ ctx, params }) => GET({ url: PRODUCT_API.DEALS, params, ctx, isBasic: true });

export const getDealsDetail = async ({ ctx, body, params }) => POST({ url: PRODUCT_API.DEALS_DETAIL, body, ctx, params, isBasic: true });

export const getSettingTags = async ({ ctx, limit = 1000 }) =>
  GET_ALL({
    url: PRODUCT_API.TAGS,
    ctx,
    isBasic: true,
    limit,
  });

export const getSettingTagsMock = async ({ ctx }) =>
  GET({
    url: '/web/tags',
    ctx,
    mock: true,
    isAuth: false,
  });

export const getProducts = async ({ ctx, codes, limit, customerLevel, locationCode, getPrice = true, customerId }) =>
  POST({
    url: PRODUCT_API.PRODUCT_LIST,
    body: { skus: codes, getProduct: true, locationCode, customerLevel, getPrice, customerId },
    params: { limit },
    ctx,
  });

export const getDataCollections = async ({ ctx }) =>
  GET({ url: PRODUCT_API.PRODUCT_LIST_COLLECTION, params: { q: 'MAIN_PAGE' }, isBasic: true, ctx });

export const getFilesProduct = async ({ ctx, refCode }) =>
  GET({
    url: `/core/file-manager/v1/file`,
    params: { q: JSON.stringify({ refType: 'PRODUCT', fileType: 'DOCUMENT', refCode }) },
    isBasic: true,
    ctx,
  });

const getProductsByIds = async ({ ctx, ids, ...restProps }) =>
  GET({ ctx, url: '/marketplace/product/v2/product/list', params: { ids }, ...restProps });

const getProductsByCodes = async ({ ctx, codes = [], ...restProps }) =>
  POST({ ctx, url: '/marketplace/product/v2/product/list', body: { codes }, ...restProps });

const getDescriptionById = async ({ ctx, productId, ...restProps }) =>
  GET({ ctx, url: '/marketplace/product/v2/product/description', params: { q: JSON.stringify({ productID: productId }) }, ...restProps });

const loadDiscovery = async ({ ctx, lastID = '' }) => {
  const body = {
    limit: 20,
    lastID,
  };
  return POST({ ctx, url: '/marketplace/social/v1/posts', body });
};

const getDescriptionBySku = async ({ ctx, sku }) => {
  const code = sku.split('.')[1] || '';
  const params = { q: JSON.stringify({ code }) };
  return GET({ ctx, url: '/marketplace/product/v2/product/description', params });
};

const getDetailProductWithoutLogin = async ({ ctx, provinceCode }) => {
  const url = '/marketplace/product/v2/product/detail-raw';
  const params = {
    q: ctx.query.slug || null,
    provinceCode,
  };
  return GET({ ctx, url, params, provinceCode, isBasic: true });
};
const getSkusLimit = async ({ ctx, skuCodes }) =>
  POST({
    ctx,
    url: PRODUCT_API.SKU_LIMIT,
    body: {
      skuCodes,
    },
  });

const getSkusBuyed = async ({ ctx, skuCodes }) =>
  POST({
    ctx,
    url: ORDER_API.SKU_HISTORY,
    body: {
      skuCodes,
    },
  });

const getSkusByProductId = async ({ productIds, ctx }) => {
  const url = '/marketplace/product/v2/sku-item/list';
  const params = {
    productIds,
  };
  return GET({ ctx, url, params, isBasic: true });
};

// without ctx
const getFuzzySearchClient = async ({ body, ctx, ...restProps }) => {
  const { text } = body || {};
  if (text) {
    const textSearch = text.toLocaleLowerCase().trim();
    const lengthTextSearch = textSearch?.split(' ').length;
    if (
      (lengthTextSearch === 1 && PreventSearchKeywords.indexOf(textSearch) >= 0) ||
      textSearch.toLocaleLowerCase().startsWith('http') ||
      PreventSearchKeywordsAlias.indexOf(StringUtils.changeAlias(textSearch)) >= 0
    ) {
      return ResponseUtils.notfound('Keyword is not valid');
    }
  }

  return POST({ ctx, url: FUZZY_SEARCH, body, ...restProps });
};
export const loadPromotion = async () => GET({ url: '/promotion', mock: true });

export default {
  loadDataMostSearch,
  loadDataManufacturer,
  loadDataManufacturerMock,
  getTabs,
  getSettingTags,
  getSettingTagsMock,
  getDeals,
  getDealsDetail,
  getProducts,
  getDataCollections,
  getProductsByIds,
  getProductsByCodes,
  getFilesProduct,
  getDescriptionById,
  loadDiscovery,
  getDescriptionBySku,
  getDetailProductWithoutLogin,
  getSkusLimit,
  getSkusBuyed,
  getTagNameFromIds,
  getFuzzySearchClient,
  getSkusByProductId,
};
