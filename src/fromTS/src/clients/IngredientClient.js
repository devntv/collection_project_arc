// file IngredientClient : GET PUT POST DELTE , not contain logic

import { CORE_API, PRODUCT_API } from 'constants/APIUriV2';
import { API_HOST_DOMAIN } from 'sysconfig';
import { GET, getData, GET_ALL } from './Clients';
import ProductClientV2 from './ProductClientV2';

async function loadDataIngredient(ctx) {
  const res = await GET_ALL({ url: API_HOST_DOMAIN + PRODUCT_API.INGREDIENT_LIST, ctx, isBasic: true, isAuth: false, limit: 100 });
  return getData(res);
}

async function loadDataIngredientClient() {
  const res = await GET_ALL({ url: PRODUCT_API.INGREDIENT_LIST, isBasic: true, isAuth: false });
  return getData(res);
}
const loadDataIngredientClientMock = async () => GET({ url: '/ingredients', mock: true, isAuth: false });

// // 24Aug2021 Update new core : master data ingredient list , support for product ( default limit 20 )
async function getAllIngredientProduct() {
  const res = await GET_ALL({ url: CORE_API.INGREDIENT_LIST, isBasic: true, isAuth: false, limit: 20 });
  return getData(res);
}
const getAllIngredientProductMock = async () => GET({ url: '/ingredients/ingredientProduct', mock: true, isAuth: false });

async function getIngredientBySlug(ctx, slug) {
  const slugObject = JSON.stringify({ slug });
  const url = PRODUCT_API.INGREDIENT;
  const params = {
    q: slugObject,
  };
  return GET({ url, params, ctx, isBasic: true });
}

async function getProductsBySlug(ctx, code, params) {
  // const res = await POST({ url, ctx, body: { filter: { ingredient: code }, ...params } });
  return ProductClientV2.getFuzzySearchClient({ ctx, body: { filter: { ingredient: code }, ...params } });
}

export default {
  loadDataIngredient,
  getIngredientBySlug,
  getProductsBySlug,
  loadDataIngredientClient,
  getAllIngredientProduct,
  loadDataIngredientClientMock,
  getAllIngredientProductMock,
};
