import { PRODUCT_API } from 'constants/APIUriV2';
import { TopManufacturer } from 'constants/manufacturer';
import { sortComparer } from 'utils/ArrUtils';
import { GET, GET_ALL, isValid } from './Clients';

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
  const res = await GET_ALL({ url: PRODUCT_API.CATEGORY_LIST, ctx, isBasic: true, params });
  if (!isValid(res)) {
    return [];
  }

  return res?.data?.sort((a, b) => sortComparer(a?.name?.toLowerCase() || '', b?.name?.toLowerCase() || ''));
}
async function loadCategoryInfoBySlug(ctx) {
  const { query } = ctx;
  const url = `${PRODUCT_API.CATEGORY_INFO}?q=${query.slug || ''}`;
  const res = await GET({ url, ctx, isBasic: true });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}

async function loadManufacturerInfoBySlug(ctx) {
  const { query } = ctx;
  const url = `${PRODUCT_API.MANUFACTURER_INFO}?q=${query.slug || ''}`;
  const res = await GET({ url, ctx, isBasic: true });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}

async function loadTags(ctx) {
  const url = PRODUCT_API.TAGS;
  const res = await GET({
    url,
    ctx,
    isBasic: true,
  });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}
export default {
  loadBrand,
  loadGroup,
  loadCategoryInfoBySlug,
  loadManufacturerInfoBySlug,
  loadTags,
};
