import { getData, getFirst, isValid, WebServiceClient } from 'clients';
import { PAGE_SIZE_30, PreventSearchKeywords, PreventSearchKeywordsAlias } from 'constants/data';
import { HTTP_STATUS } from 'constants/Enums';
import { convertSlug, mapDataProduct } from 'services/ProductServiceV2';
import { ResponseUtils, StringUtils } from 'utils';
import WebServiceUtils from 'utils/WebServiceUtils';

// product
async function getDataProductDetail({ ctx, slug = '' }) {
  const params = {};

  if (slug) {
    params.q = convertSlug(slug);
  } else {
    const { query } = ctx;
    params.q = convertSlug(query?.slug);
  }
  const { params: newParams } = WebServiceUtils.addQueryOption({ params });
  const result = await WebServiceClient.loadProductDetail({ ctx, params: newParams });

  if (!isValid(result)) return result;
  return mapDataProduct({ ctx, result });
}

async function getDataProductBySlugs({ ctx, slugs = [] }) {
  const results = await Promise.all(
    slugs.map((slug) => {
      const params = {
        q: convertSlug(slug),
      };
      const { params: newParams } = WebServiceUtils.addQueryOption({ params });
      return WebServiceClient.loadProductDetail({ ctx, params: newParams });
    }),
  );
  const result = {
    status: HTTP_STATUS.Ok,
    data: results?.filter((res) => isValid(res))?.map((productRes) => getFirst(productRes)) || [],
  };

  return mapDataProduct({ ctx, result, isGetQuantity: false, isAvailable: true });
}

// search
async function getProductsFuzzySearch({ body }) {
  const { body: bodyReq } = WebServiceUtils.addQueryOption({ body });
  const { text } = bodyReq || {};
  // chặn search những keyword cấm
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
  const res = await WebServiceClient.loadProductsFuzzySearch({ body: bodyReq });

  return getData(res);
}

async function searchByKeywords(keyword = '', hasIngredients = true) {
  const searchStrategy = {
    text: true,
    keyword: true,
    ingredient: hasIngredients,
  };
  const body = {
    text: keyword,
    offset: 0,
    limit: PAGE_SIZE_30,
    searchStrategy,
  };

  return getProductsFuzzySearch({ body });
}

// cart
async function getCart({ ctx }) {
  const params = {};
  params.queryOption = 'price';
  const cartRes = await WebServiceClient.loadCart({ ctx, params });

  if (isValid(cartRes)) {
    return getFirst(cartRes);
  }
  return cartRes;
}

// chuyển data mới thành cấu trúc cũ để ít thay đổi nhất
const convertProductLiteToProductNormal = (data) =>
  data?.map(({ displayPrice, name, slug, sellerInfo }) => ({
    displayPrice,
    name,
    sku: {
      name,
      slug,
      sellerCode: sellerInfo?.sellerCode,
      retailPriceValue: displayPrice,
    },
    product: {
      name,
    },
    slug,
    sellerInfo,
  }));

// search lite dành cho mỗi cái search ở NAVBAR
const searchFuzzyLite = async (body) => {
  const searchRes = await WebServiceClient.searchFuzzyLite(body);
  const data = convertProductLiteToProductNormal(getData(searchRes));
  return data;
};

export default { getDataProductDetail, getDataProductBySlugs, getProductsFuzzySearch, searchByKeywords, getCart, searchFuzzyLite };
