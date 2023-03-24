import { PRODUCT_API } from 'constants/APIUriV2';
import { TopManufacturer } from 'constants/manufacturer';
import { sortComparer } from 'utils/ArrUtils';
import { GET, getData, GET_ALL, isValid } from './Clients';

async function loadBrand({ ctx, params }) {
  const res = await GET_ALL({ url: PRODUCT_API.MANUFACTURER_LIST, ctx, isBasic: true, params });
  if (!isValid(res)) {
    return [];
  }

  return res?.data
    ?.filter((item) => TopManufacturer.indexOf(item.code) >= 0)
    .sort((a, b) => sortComparer(a?.name?.toLowerCase() || '', b?.name?.toLowerCase() || ''));
}

async function loadGroup({ ctx, params }) {
  const res = await GET({ url: PRODUCT_API.CATEGORY_LIST, ctx, isBasic: true, params });
  if (!isValid(res)) {
    return [];
  }

  return res?.data?.sort((a, b) => sortComparer(a?.name?.toLowerCase() || '', b?.name?.toLowerCase() || ''));
}

const loadGroupMock = async ({ ctx }) => GET({ url: '/web/categories', ctx, mock: true, isAuth: false });

async function loadEfficacyList({ ctx, params }) {
  const res = await GET({ url: PRODUCT_API.EFFICACY_LIST, ctx, isBasic: true, params });
  return getData(res);
}

async function loadEfficacyCombinedList({ ctx, params }) {
  const res = await GET({ url: PRODUCT_API.EFFICACY_COMBINED_LIST, ctx, isBasic: true, params });
  return getData(res);
}

async function loadSellerCategoryList({ ctx, params }) {
  const res = await GET({ url: PRODUCT_API.SELLER_CATEGORY_LIST, ctx, isBasic: true, params });
  return getData(res);
}

async function loadCategoryInfoBySlug(ctx) {
  const { query } = ctx;
  const params = {
    q: JSON.stringify({ slug: query.slug }),
  };

  const url = PRODUCT_API.CATEGORY_INFO;
  const res = await GET({ url, ctx, params, isBasic: true });
  return getData(res);
}

async function loadManufacturerInfoBySlug(ctx) {
  const { query } = ctx;
  const params = {
    q: JSON.stringify({ slug: query.slug }),
  };
  const url = PRODUCT_API.MANUFACTURER_INFO;
  const res = await GET({ url, ctx, params, isBasic: true });
  return getData(res);
}

async function loadTags(ctx) {
  const url = PRODUCT_API.TAGS;
  const res = await GET({
    url,
    ctx,
    isBasic: true,
  });
  return getData(res);
}

async function loadTagDetail({ ctx, params }) {
  const url = PRODUCT_API.TAGS;
  return GET({
    url,
    ctx,
    isBasic: true,
    params,
  });
}
// mobile V2: get tag by slug
async function loadTagInfoBySlug(ctx) {
  const { query } = ctx;
  const params = {
    q: JSON.stringify({ slug: query.slug }),
  };
  const url = PRODUCT_API.TAGS;
  const res = await GET({ url, ctx, params, isBasic: true });

  return getData(res);
}

async function loadTabDetail({ ctx, params }) {
  const url = PRODUCT_API.TABS_ACTIVE;
  return GET({
    url,
    ctx,
    isBasic: true,
    params,
  });
}
export default {
  loadBrand,
  loadGroup,
  loadGroupMock,
  loadCategoryInfoBySlug,
  loadManufacturerInfoBySlug,
  loadTags,
  loadTagDetail,
  loadTagInfoBySlug,
  loadTabDetail,
  loadEfficacyList,
  loadEfficacyCombinedList,
  loadSellerCategoryList,
};
