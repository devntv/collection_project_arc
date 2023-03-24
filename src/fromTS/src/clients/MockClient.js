const { GET, POST } = require('./Clients');

// load san pham moi
const loadDataNewProducts = async (params) => GET({ url: '/web/sanphammoi', mock: true, isAuth: false, params });
const loadDataAlternativeProducts = async (params) => GET({ url: '/web/sanphamthaythe', mock: true, isAuth: false, params });

const loadTabs = async () => GET({ url: '/web/tabs', mock: true, isAuth: false });
const getAllSellers = async () => GET({ url: '/web/sellers', mock: true, isAuth: false });

const getProductBySlugs = async (body) => POST({ url: '/web/product/slugs', mock: true, body });

export default {
  loadDataNewProducts,
  loadDataAlternativeProducts,
  loadTabs,
  getProductBySlugs,
  getAllSellers,
};
