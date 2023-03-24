import { CartClientV2, GET, getData, getFirst, isValid, ProductClient, ProductClientV2 } from 'clients';
import { PRODUCT_API } from 'constants/APIUri';
import { PAGE_SIZE_30 } from 'constants/data';
import { HTTP_STATUS } from 'constants/Enums';
import { convertArrayToMap } from 'utils/ArrUtils';
import { getProxyImageList } from 'utils/ImageUtils';

const LIMIT = 50;

export const mapDataProduct = async ({ ctx, result }) => {
  let cartObject = new Map();

  // if (isValid(cartRes)) {
  //   const cart = cartRes.data[0];
  //   if (cart && !isEmpty(cart.cartItems)) {
  //     cartObject = convertArrayToMap(cart.cartItems, 'sku');
  //   }
  // }

  const cartRes = await CartClientV2.getCartItemList({ ctx });

  if (isValid(cartRes)) {
    const cartItems = getData(cartRes);
    if (cartItems?.length > 0) {
      cartObject = convertArrayToMap(cartItems, 'sku');
    }
  }
  // eslint-disable-next-line no-param-reassign
  result.data = result.data.map((item) => ({
    ...item,
    imagesProxy: getProxyImageList(item?.imageUrls) || [],
    // unit: item.unit && item.unit === '<nil>' ? '' : item.unit,
    quantity: cartObject.get(item.sku)?.quantity || 0,
  }));
  return result;
};

// search product
export const searchProductsQuickOrder = async (keyword, page = 1) => {
  // const url = '/marketplace/product/v1/search/fuzzy';
  const body = {
    offset: (page - 1) * PAGE_SIZE_30,
    text: keyword || null,
    limit: PAGE_SIZE_30,
    getTotal: true,
    getPrice: true,
    // allSku: true,
  };
  const result = await ProductClientV2.getFuzzySearchClient({ body });
  // const result = await POST({ url, body });

  return result;
};

export const loadDataQuickOrder = async ({ page }) => {
  const params = {
    page,
    limit: PAGE_SIZE_30,
    getTotal: true,
  };

  const result = await GET({ url: PRODUCT_API.PRODUCT_LIST, params });
  if (!isValid(result)) return result;

  return mapDataProduct({ result });
};

export const loadDataProduct = async ({ ctx, isTotal }) => {
  const params = {
    ...ctx.query,
    limit: PAGE_SIZE_30,
    getTotal: typeof isTotal !== 'undefined' ? isTotal : true,
  };

  const result = await GET({ url: PRODUCT_API.PRODUCT_LIST, ctx, params, isBasic: true });
  if (!isValid(result)) return result;

  return mapDataProduct({ ctx, result });
};

export const loadDataProductDetail = async ({ ctx }) => {
  const { query } = ctx;
  const params = {
    q: query.slug,
  };
  const url = `/marketplace/product/v1/products`;
  const result = await GET({
    url,
    ctx,
    isBasic: true,
    params,
  });
  if (!isValid(result)) return result;
  return mapDataProduct({ ctx, result });
};

async function loadProductWithCategory({ ctx, isTotal }) {
  const { query } = ctx;
  const url = PRODUCT_API.PRODUCT_LIST;

  const { currentTab = '', sortBy = '', page = 0, q = '', slug: category } = query;
  const params = {
    currentTab,
    sortBy,
    page,
    q,
    category,
    limit: PAGE_SIZE_30,
    getTotal: typeof isTotal !== 'undefined' ? isTotal : true,
  };
  const result = await GET({ url, ctx, params, isBasic: true });
  if (!isValid(result)) return result;
  return mapDataProduct({ ctx, result });
}

async function loadProductWithManufacturer({ ctx, isTotal }) {
  const { query } = ctx;
  const url = PRODUCT_API.PRODUCT_LIST;

  const { currentTab = '', sortBy = '', page = 0, q = '', slug: manufacturers } = query;
  const params = {
    manufacturers,
    currentTab,
    sortBy,
    page,
    q,
    limit: PAGE_SIZE_30,
    getTotal: typeof isTotal !== 'undefined' ? isTotal : true,
  };
  const result = await GET({ url, ctx, params, isBasic: true });
  if (!isValid(result)) return result;
  return mapDataProduct({ ctx, result });
}

export const getListTabs = async ({ ctx }) => {
  const res = await ProductClient.getTabs({ ctx });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
};

export const getDeals = async ({ ctx, params }) => {
  const result = await ProductClient.getDeals({ ctx, params });
  if (!isValid(result)) return result;
  return mapDataProduct({ ctx, result });
};

export const getSettingTags = async ({ ctx, params }) => ProductClient.getSettingTags({ ctx, params });

export const getProductInfoMapFromSkus = async ({ ctx, skus }) => {
  const skuListArray = [];
  for (let i = 0; i < skus.length; i += LIMIT) {
    skuListArray.push(skus.slice(i, i + LIMIT));
  }
  const mapProducts = {};
  const responses = await Promise.all(skuListArray.map((codes) => ProductClient.getProducts({ codes, ctx, limit: LIMIT })));

  responses.forEach(({ data }) => {
    data?.forEach((product) => {
      mapProducts[product?.sku] = {
        ...product,
        imagesProxy: getProxyImageList(product?.imageUrls) || [],
      };
    });
  });

  return {
    status: HTTP_STATUS.Ok,
    data: [mapProducts],
  };
};

// TODO:
async function loadDataProductCollection(ctx) {
  const result = await ProductClient.getDataCollections({ ctx });
  if (!isValid(result)) {
    return [];
  }

  let cart = {};

  try {
    cart = await CartClientV2.loadDataCart(ctx);
  } catch (error) {
    cart.status = 'ERROR';
  }
  const dataCart = getFirst(cart);
  const cartObject = {};

  let blocks = getData(result);
  // eslint-disable-next-line no-restricted-syntax
  if (dataCart && dataCart?.cartItems?.length > 0) {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of dataCart.cartItems) {
      cartObject[item.sku] = item;
    }

    // productListWithQuantityInCart = GetQuantityProductFromCart.GetQuantity2(result, cartObject);

    if (blocks && blocks.length > 0) {
      blocks = blocks.map(({ data = [] }) => ({
        data: data?.map((product) => ({
          ...product,
          imagesProxy: getProxyImageList(product.imageUrls),
          quantity: cart[product.sku]?.quantity || 0,
        })),
      }));
    }
  }

  return blocks;
}

export default {
  loadDataProduct,
  mapDataProduct,
  loadDataProductDetail,
  loadProductWithCategory,
  loadProductWithManufacturer,
  getListTabs,
  getSettingTags,
  getDeals,
  searchProductsQuickOrder,
  getProductInfoMapFromSkus,
  loadDataProductCollection,
  loadDataQuickOrder,
};
