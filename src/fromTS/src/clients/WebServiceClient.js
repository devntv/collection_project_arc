import { FRONTEND_APIS } from 'constants/APIUriV2';
import { GET, POST } from './Clients';

const loadProductDetail = async ({ ctx, params }) =>
  GET({
    url: FRONTEND_APIS.PRODUCT_DETAIL,
    ctx,
    isBasic: true,
    params,
  });

const loadProductsFuzzySearch = async ({ body, ctx, ...restProps }) => POST({ ctx, url: FRONTEND_APIS.FUZZY_SEARCH, body, ...restProps });

const loadCart = async ({ ctx, params }) => GET({ ctx, url: FRONTEND_APIS.CART, params });

const searchFuzzyLite = async ({ ctx, params, body }) => POST({ ctx, url: FRONTEND_APIS.FUZZY_SEARCH_LITE, params, body });

export default {
  loadProductDetail,
  loadProductsFuzzySearch,
  loadCart,
  searchFuzzyLite,
};
