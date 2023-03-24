import { getData, SupplierClient } from 'clients';
import { mapShortNamesLowercase } from 'constants/data/sellers';
import { StringUtils } from 'utils';
import CacheUtils from 'utils/CacheUtils';

// mọck api
const convertShortNames = (name) => {
  if (!name) {
    return '';
  }
  let newName = name?.toLowerCase();
  Object.keys(mapShortNamesLowercase).forEach((keyname) => {
    if (newName.indexOf(keyname) >= 0) {
      newName = newName.replace(keyname, mapShortNamesLowercase[keyname]);
    }
  });

  return StringUtils.capitalizeFirstOfEachWords(newName);
};
const convertSeller = ({ code, name, slug, sellerClass = '', sellerType, status, slugStore, sellerStore, avatar = null, isVip = null }) => {
  const { landingPages, name: storeName, slug: storeSlug = '', logo: storeLogo, status: statusStore } = sellerStore || {};
  return {
    code,
    name: storeName && statusStore === 'ACTIVE' ? convertShortNames(storeName) : convertShortNames(name),
    fullName: statusStore === 'ACTIVE' ? storeName : name,
    slug: statusStore === 'ACTIVE' && storeSlug ? storeSlug : slug, // co the ko co slugStore
    sellerType,
    isInternal: sellerClass === 'INTERNAL',
    status,
    statusStore,
    slugStore: statusStore === 'ACTIVE' ? slugStore : slug,
    landingPage: (landingPages?.length > 0 && landingPages[0]) || '',
    isVip,
    avatar: statusStore === 'ACTIVE' && storeLogo ? storeLogo : avatar,
    storeSlug,
    isStore: status === 'ACTIVE' && statusStore === 'ACTIVE' && storeSlug,
  };
};

// TODO: tính làm api /[code] cho từng seller
const KEY_CACHE = 'API_SELLER_STORE';
// const KEY_CACHE_MAP = 'MAP_SELLER_STORE';
export default async (req, res) => {
  const curDate = +new Date();
  const ctx = { req, res };
  // const { code } = req.query;

  // let mapData = CacheUtils.getCacheValue(KEY_CACHE_MAP);
  let data = CacheUtils.getCacheValue(KEY_CACHE);
  let message = 'Query seller successfully (web api) (cache)';
  if (!data) {
    const result = await SupplierClient.getAll({ ctx });
    data = getData(result)?.map(convertSeller) || [];
    message = 'Query seller successfully (web api) (not cache)';
    CacheUtils.setCacheKey(KEY_CACHE, data);
  }

  res.statusCode = 200;
  res.setHeader('Cache-Control', 'public, s-maxage=43200, stale-while-revalidate=300');
  res.json({
    status: 'OK',
    data,
    message,
    time: new Date() - curDate,
  });
};
