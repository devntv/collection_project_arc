import { PRODUCT_API, SUPPLIER_API } from 'constants/APIUriV2';
import { GET, GET_ALL, POST } from './Clients';
import ProductClientV2 from './ProductClientV2';
// API for wweb
const getAllSellerWeb = async ({ ctx }) => GET({ ctx, url: '/web/sellers', mock: true });

// for server side
const getAllSellers = async ({ ctx }) => GET_ALL({ ctx, url: '/seller/core/v1/account/list', isBasic: true, isAuth: false });

const getListBanner = async ({ ctx, sellerCode, isActive = true }) => {
  const url = SUPPLIER_API.SUPPLIER_BANNER;
  const params = { q: JSON.stringify({ sellerCode, isActive }) };
  return GET({ ctx, url, params });
};
const getSellerInfo = async ({ ctx, slug }) => {
  const url = SUPPLIER_API.SUPPLIER_ACCOUNT_INFO;
  const params = { slug };
  return GET({ ctx, url, params });
};

const getStoreInfo = async ({ ctx, slug }) => {
  const url = SUPPLIER_API.STORE_INFO;
  const params = { slug };
  return GET({ ctx, url, params, isBasic: true });
};

const getListStoreActive = async ({ ctx, sellerCode, status = 'ACTIVE' }) => {
  const url = SUPPLIER_API.SUPPLIER_STORE_LIST;
  const params = { q: JSON.stringify({ status, sellerCode }) };
  return GET({ ctx, url, params });
};

// API for mock
const getAllStoreActive = async ({ ctx, status = 'ACTIVE' }) => {
  const url = SUPPLIER_API.SUPPLIER_STORE_LIST;
  const params = { q: JSON.stringify({ status }) };
  return GET_ALL({ ctx, url, params, limit: 20, isBasic: true, isAuth: false });
};

// API web
const getAllStoreActiveWeb = async ({ ctx }) => GET({ ctx, url: '/seller/store/active', mock: true, isAuth: false });

const getProductBySeller = async ({ ctx, params }) => {
  const url = PRODUCT_API.SELLER;
  return GET({ ctx, url, params });
};

// https://api.v2-stg.thuocsi.vn/seller/core/v1/account?sellerCode=4GQEM8DN9F
const getSellerByCode = async ({ ctx, sellerCode }) => GET({ ctx, url: '/seller/core/v1/account', params: { sellerCode }, cache: true });

const searchStore = async ({ ctx, body }) => {
  const url = '/seller/core/v1/stores/search';
  return POST({ ctx, url, body, isBasic: true, isAuth: false });
};
const searchStoreByText = async ({ ctx, params }) => {
  const url = '/seller/core/v1/account/list';
  return GET({ ctx, url, params, isBasic: true, isAuth: false });
};
const searchProductInSellers = async ({ ctx, body }) =>
  // const url = '/marketplace/product/v2/search/fuzzy';
  // return POST({ ctx, url, body });
  ProductClientV2.getFuzzySearchClient({ ctx, body });

const getLandingPageSeller = async ({ ctx, sellerCode }) => GET({ ctx, url: '/seller/core/v1/store/info-for-web', params: { sellerCode } });

export default {
  getAllStoreActive,
  getAllStoreActiveWeb,
  getListStoreActive,
  getSellerByCode,
  getAllSellers,
  getAllSellerWeb,
  getListBanner,
  getSellerInfo,
  getProductBySeller,
  searchStore,
  searchProductInSellers,
  getLandingPageSeller,
  getStoreInfo,
  searchStoreByText,
};
