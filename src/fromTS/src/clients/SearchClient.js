import { PAGE_SIZE_30 } from 'constants/data';
import { getData } from './Clients';
import ProductClientV2 from './ProductClientV2';

async function searchKeywords(keyword) {
  // const url = '/marketplace/product/v2/search/fuzzy';
  const body = {
    text: keyword,
    offset: 0,
    limit: PAGE_SIZE_30,
    // allSku: true,
  };
  // const res = await POST({ url, body });
  const res = await ProductClientV2.getFuzzySearchClient({ body });
  return getData(res);
}

async function searchByKeywords(keyword, hasIngredients = true) {
  // const url = '/marketplace/product/v2/search/fuzzy';
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
  // const res = await POST({ url, body });
  return ProductClientV2.getFuzzySearchClient({ body });
}

export default {
  searchKeywords,
  searchByKeywords,
};
