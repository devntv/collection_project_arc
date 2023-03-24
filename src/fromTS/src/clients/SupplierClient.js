import { SUPPLIER_API } from 'constants/APIUriV2';
import { GET, GET_ALL } from './Clients';

async function getInfoSupplier({ ctx, params }) {
  const url = SUPPLIER_API.SUPPLIER_INFO;
  return GET({ url, isBasic: true, ctx, params });
}

// for api/seller/index.js
// nhằm hạn chế data trả ra ngoài nên sẽ làm api/seller để lấy hết data , rồi trả ra 1 api dạng internal
async function getAll({ ctx }) {
  const url = SUPPLIER_API.SUPPLIERS;
  const params = {
    getStoreInfo: true,
  };
  return GET_ALL({ url, isBasic: true, ctx, isAuth: false, params });
}

// for web
async function getSellersMock() {
  const url = '/seller';
  return GET({ url, mock: true, isAuth: false });
}

async function getSellerConfig({ ctx, sellerCodes }) {
  const url = SUPPLIER_API.SUPPLIER_CONFIG;
  return GET({ url, ctx, params: { sellerCodes } });
}

export default {
  getInfoSupplier,
  getAll,
  // api web
  getSellersMock,
  getSellerConfig,
};
