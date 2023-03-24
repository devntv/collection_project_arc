import { getData, getFirst, isValid } from 'clients';
import SellerClient from 'clients/SellerClient';
import { HTTP_STATUS } from 'constants/Enums';
import { ProductServiceV2 } from 'services';
import { mapDataProduct } from './ProductServiceV2';

// get all data for server side -> return data mapped
const getAllSellers = async ({ ctx }) => {
  const sellerResult = await SellerClient.getAllSellers({ ctx });
  if (!isValid(sellerResult)) {
    return sellerResult;
  }

  const sellers = getData(sellerResult);
  return {
    ...sellerResult,
    data: sellers?.map(({ name, code, sellerID }) => ({ name, code, sellerID })),
  };
};

const getSellerBanner = async ({ ctx, sellerCode }) => {
  const bannerResult = await SellerClient.getListBanner({ ctx, sellerCode });
  const bannerList = getData(bannerResult);
  const banners = bannerList.map((item) => ({ targetURL: item?.link || '', imgURL: item?.images[0] || '', name: item?.name || '' }));
  return { status: HTTP_STATUS.Ok, data: banners };
};

const getSellerInfo = async ({ ctx, slug }) => {
  const infoResult = await SellerClient.getSellerInfo({ ctx, slug });
  if (!isValid(infoResult)) {
    return null;
  }
  const info = getFirst(infoResult);

  // validate store is active from seller
  const { code: sellerCode } = info || {};

  const listStoreActive = await SellerClient.getListStoreActive({ sellerCode, ctx });
  if (!isValid(listStoreActive)) {
    return null;
  }

  return info;
};

const getStoreInfo = async ({ ctx, slug }) => {
  const infoResult = await SellerClient.getStoreInfo({ ctx, slug });
  if (!isValid(infoResult)) {
    return null;
  }
  return getFirst(infoResult);
};

const getListSearchStore = async ({ ctx, body }) => {
  const listStoreActiveRes = await SellerClient.searchStore({ ctx, body });
  if (!isValid(listStoreActiveRes)) {
    return null;
  }
  const data = getData(listStoreActiveRes);
  const promiseAll = [];
  const { total } = listStoreActiveRes;
  data.forEach((ele) => {
    const { code } = ele;
    promiseAll.push(
      ProductServiceV2.loadProductWithSeller({
        ctx,
        code,
        offset: 0,
        limit: 3,
        text: '',
      }),
    );
  });
  const topProductsRes = await Promise.all(promiseAll);
  const topProductsArr = [];
  topProductsRes.forEach((ele) => {
    topProductsArr.push(getData(ele));
  });

  const topProducts = topProductsArr.map((item) => {
    const sellerCode = item[0]?.sellerCode || '';
    return { sellerCode, topProducts: item };
  });

  const sellerMapTopProduct = data.map((item) => {
    const { code } = item;
    const obj = topProducts.find((ele) => ele.sellerCode === code);
    return { ...item, product: { sellerCode: code, topProducts: obj?.topProducts.slice(0, 3) || {} } };
  });

  return { sellerMapTopProduct, total };
};

const getSearchStoreByName = async ({ ctx, params }) => {
  const listStoreRes = await SellerClient.searchStoreByText({ ctx, params });
  if (!isValid(listStoreRes)) {
    return null;
  }
  const data = getData(listStoreRes);
  const promiseAll = [];
  const { total } = listStoreRes;
  data.forEach((ele) => {
    const { code } = ele;
    promiseAll.push(
      ProductServiceV2.loadProductWithSeller({
        ctx,
        code,
        offset: 0,
        limit: 3,
        text: '',
      }),
    );
  });
  const topProductsRes = await Promise.all(promiseAll);
  const topProductsArr = [];
  topProductsRes.forEach((ele) => {
    topProductsArr.push(getData(ele));
  });

  const topProducts = topProductsArr.map((item) => {
    const sellerCode = item[0]?.sellerCode || '';
    return { sellerCode, topProducts: item };
  });

  const sellerMapTopProduct = data.map((item) => {
    const { code } = item;
    const obj = topProducts.find((ele) => ele.sellerCode === code);
    return { ...item, product: { sellerCode: code, topProducts: obj?.topProducts.slice(0, 3) || {} } };
  });

  return { sellerMapTopProduct, total };
};

const getSearchProducts = async ({ ctx, body }) => {
  const result = await SellerClient.searchProductInSellers({ ctx, body });
  if (!isValid(result)) return result;
  const deals = await mapDataProduct({ ctx, result });
  const now = new Date();
  const data = getData(deals, []).filter((item) => item?.deal?.readyTime && new Date(item?.deal?.readyTime) < now);
  return { ...deals, data };
};
const getLandingPageSeller = async ({ ctx, sellerCode }) => {
  const result = await SellerClient.getLandingPageSeller({ ctx, sellerCode });
  if (!isValid(result)) return null;
  return getFirst(result);
};
export default {
  getAllSellers,
  getSellerBanner,
  getSellerInfo,
  getListSearchStore,
  getSearchProducts,
  getLandingPageSeller,
  getStoreInfo,
  getSearchStoreByName,
};
