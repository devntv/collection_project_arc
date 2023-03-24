import { AddressClient, GET, getData, getFirst, isValid, MarketingClient, ProductClientV2, SellerClient } from 'clients';
import CatClientV2 from 'clients/CatClientV2';
import { MARKETING_API } from 'constants/APIUriV2';
import { ENUMS_CHAT_SETTING_VALUE } from 'constants/Enums';
import { TopManufacturer } from 'constants/manufacturer';
import { DEFAULT_THUMBNAIL_PATH } from 'constants/Paths';
import { WEB_HOST } from "sysconfig";
import CacheUtils from 'utils/CacheUtils';

const KEY_CACHE_BANNERS = 'API_BANNERS';

const getBanners = async (ctx) => {
  let data = CacheUtils.getCacheValue(KEY_CACHE_BANNERS);
  if (data) {
    return data;
  }
  const bannerRes = await MarketingClient.getListBanner(ctx);
  data = isValid(bannerRes)
    ? {
        ...bannerRes,
        data: getData(bannerRes)
          ?.filter((item) => item && item.isVisible)
          .map((item) => ({ ...item, createdTime: null, lastUpdatedTime: null, _id: null })),
      }
    : null;
  CacheUtils.setCacheKeyobject(KEY_CACHE_BANNERS, data);
  return data;
};

const KEY_CACHE_TAGS = 'API_TAGS';
const getTags = async () => {
  let data = CacheUtils.getCacheValue(KEY_CACHE_TAGS);
  if (data) {
    return data;
  }
  const tagsRes = await ProductClientV2.getSettingTags({});
  data = getData(tagsRes)
    // ?.filter((item) => item.visible)
    ?.map(({ code = null, name = null, slug = null, textColor = null, preIcon = null, nameAsTooltip = null, style = null, visible = false }) => ({
      code,
      name,
      slug,
      textColor,
      preIcon,
      nameAsTooltip,
      style,
      visible,
    }));
  CacheUtils.setCacheKey(KEY_CACHE_TAGS, data);
  return data;
};

const KEY_CACHE_TABS = 'API_TABS';
const getTabs = async () => {
  let data = CacheUtils.getCacheValue(KEY_CACHE_TABS);
  if (data) {
    return data;
  }
  const tabResult = await ProductClientV2.getTabs({});
  data = getData(tabResult)
    ?.sort((a, b) => (a?.ordinalNumber || 0) - (b?.ordinalNumber || 0))
    ?.map(({ name, slug, type, value }) => ({ name, slug, type, value }));
  CacheUtils.setCacheKey(KEY_CACHE_TABS, data);
  return data;
};

const KEY_CACHE_COUNTRIES = 'API_MASTER_DATA_COUNTRY';
const getListCountries = async () => {
  let data = CacheUtils.getCacheValue(KEY_CACHE_COUNTRIES);
  if (!data) {
    const countryRes = await AddressClient.getAllCountries({});
    data = getData(countryRes);
    CacheUtils.setCacheKey(KEY_CACHE_COUNTRIES, data);
  }

  return data;
};

const KEY_CACHE_PROVINCES = 'API_MASTER_DATA_PROVINCES';
const getListProvinves = async () => {
  let data = CacheUtils.getCacheValue(KEY_CACHE_PROVINCES);
  if (!data) {
    const provinesRes = await AddressClient.getProvinces();
    data = getData(provinesRes);
    CacheUtils.setCacheKey(KEY_CACHE_PROVINCES, data);
  }

  return data;
};

const KEY_CACHE_SELLERS = 'API_SELLERS';
const getListSellers = async () => {
  let data = CacheUtils.getCacheValue(KEY_CACHE_SELLERS);
  if (!data) {
    const sellersRes = await SellerClient.getAllSellers({});
    const dataSellers = getData(sellersRes);
    data = dataSellers?.map(({ name, code, sellerID }) => ({ name, code, sellerID }));
    CacheUtils.setCacheKey(KEY_CACHE_SELLERS, data);
  }

  return data;
};

const KEY_CACHE_HASHTAG_TOP_SEARCH = 'API_HASHTAG_TOP_SEARCH';
const getListHashtagTopSearch = async () => {
  let data = CacheUtils.getCacheValue(KEY_CACHE_HASHTAG_TOP_SEARCH);
  if (!data) {
    const topSearchRes = await GET({ url: MARKETING_API.HASHTAG_TOP_SEARCH, isBasic: true });
    data =
      topSearchRes?.data
        ?.filter((item) => {
          if (!item?.isActive) return false;

          const currentTime = new Date();
          const startDisplayTime = new Date(item.startDisplayTime);

          if (currentTime < startDisplayTime) return false;

          const endDisplayTime = new Date(item.endDisplayTime);
          if (currentTime > endDisplayTime) return false;

          return true;
        })
        ?.sort((hashtag1, hashtag2) => hashtag1?.ordinalNumber - hashtag2?.ordinalNumber)
        ?.map(({ code = '', hashtag = '', url = '' }) => ({
          code,
          hashtag,
          url: url?.startsWith(WEB_HOST) ? url.replace(WEB_HOST, '') : url,
        })) || [];

    CacheUtils.setCacheKey(KEY_CACHE_HASHTAG_TOP_SEARCH, data);
  }

  return data;
};

const KEY_CACHE_COUNTDOWN_BAR = 'API_COUNTDOWN_BAR';
const getListCountdownBar = async () => {
  let data = CacheUtils.getCacheValue(KEY_CACHE_COUNTDOWN_BAR);
  if (!data) {
    const countdownBarRes = await GET({ url: MARKETING_API.COUNTDOWN_BAR, isBasic: true });
    const countdownBarList =
      countdownBarRes?.data
        ?.filter((item) => {
          if (!item?.isActive) return false;

          const currentTime = new Date();
          const startDisplayTime = new Date(item.startDisplayTime);

          if (currentTime < startDisplayTime) return false;

          const endDisplayTime = new Date(item.endDisplayTime);
          if (currentTime > endDisplayTime) return false;

          return true;
        })
        ?.sort((cd1, cd2) => {
          const startDisplayTimeCD1 = new Date(cd1?.startDisplayTime);
          const startDisplayTimeCD2 = new Date(cd2?.startDisplayTime);
          return startDisplayTimeCD2 - startDisplayTimeCD1;
        })
        ?.map(({ imageType = '', imageUrl = '', name = '', type = '', url = '', code = '', backgroundColor = '', countdownbarID = '' }) => ({
          imageType,
          imageUrl,
          name,
          type,
          url,
          code,
          backgroundColor,
          countdownbarID,
        })) || [];
    data = countdownBarList;

    CacheUtils.setCacheKey(KEY_CACHE_COUNTDOWN_BAR, data);
  }

  return data;
};

const KEY_CACHE_MENU_BAR = 'API_MENU_BAR';
const getMenuBar = async () => {
  let data = CacheUtils.getCacheValue(KEY_CACHE_MENU_BAR);
  if (!data) {
    const menuBarRes = await GET({ url: MARKETING_API.MENU_BAR, isBasic: true });
    const menuBar =
      menuBarRes?.data?.[0]?.items?.filter((item) => item?.isActive)?.map(({ iconUrl = '', label = '', url = '' }) => ({ iconUrl, label, url })) ||
      [];
    data = menuBar;
    CacheUtils.setCacheKey(KEY_CACHE_MENU_BAR, data);
  }

  return data;
};

const KEY_CACHE_INSIDER_SETTING = 'API_INSIDER_SETTING';
const getInsiderSetting = async () => {
  let data = CacheUtils.getCacheValue(KEY_CACHE_INSIDER_SETTING);
  if (!data) {
    const insiderSettingRes = await GET({ url: MARKETING_API.INSIDER_SETTING, isBasic: true });
    const insiderSetting = getFirst(insiderSettingRes)?.isActive || false;
    data = insiderSetting;
    CacheUtils.setCacheKey(KEY_CACHE_INSIDER_SETTING, data, 30);
  }

  return data;
};

const KEY_CACHE_THUMBNAIL = 'API_THUMBNAIL';
const getThumbnailList = async () => {
  let data = CacheUtils.getCacheValue(KEY_CACHE_THUMBNAIL);
  if (!data) {
    const thumbnailRes = await GET({ url: MARKETING_API.THUMBNAIL, isBasic: true });
    const thumbnailList = thumbnailRes?.data?.filter((item) => item?.isActive) || [];
    const mappedThumbnailList = thumbnailList.map((thumbnail) => ({
      url: thumbnail.url.replace(/^[a-zA-Z]{3,5}:\/{2}[a-zA-Z0-9_.:-]+\//, '/') || '',
      title: thumbnail.title || '',
      pageTitle: thumbnail.pageTitle || '',
      description: thumbnail.description || '',
      imageUrl: thumbnail.imageUrl || '',
    }));

    const thumbnailMap = {};
    mappedThumbnailList?.forEach((thumbnail) => {
      thumbnailMap[thumbnail.url] = thumbnail;
    });

    const defaultThumbnail = thumbnailMap[DEFAULT_THUMBNAIL_PATH] || {};
    data = { defaultThumbnail, thumbnailMap };

    CacheUtils.setCacheKey(KEY_CACHE_THUMBNAIL, data);
  }

  return data;
};

// const getProductBySlugs = async () => {};

const KEY_CACHE_CATEGORIES = 'API_CATEGORIES';
const getCategories = async () => {
  let data = CacheUtils.getCacheValue(KEY_CACHE_CATEGORIES);
  if (!data) {
    const dataCategories = await CatClientV2.loadGroup({ params: { getCache: true, limit: 1000 } });
    data = dataCategories?.map(({ code = '', name = '', slug = '' }) => ({ code, name, slug }));
    CacheUtils.setCacheKey(KEY_CACHE_CATEGORIES, data);
  }

  return data;
};

const KEY_CACHE_API_MANUFACTUERS = 'API_MANUFACTUERS';
const getManufacturers = async () => {
  let data = CacheUtils.getCacheValue(KEY_CACHE_API_MANUFACTUERS);
  if (!data) {
    data = await ProductClientV2.loadDataManufacturer({});
    data = data?.map(({ code = '', name = '', slug = '', id = '', shortName = '' }) => ({ code, name, slug, id, shortName }));
    CacheUtils.setCacheKey(KEY_CACHE_API_MANUFACTUERS, data);
  }

  return data;
};

const KEY_CACHE_API_TOP_MANUFACTUERS = 'API_TOP_MANUFACTUERS';
const getTopManufacturers = async () => {
  const dataManufacturer = await getManufacturers();
  let data = dataManufacturer?.filter((item) => TopManufacturer.indexOf(item?.code) >= 0);
  if (data.length === 0) {
    data = dataManufacturer?.slice(0, 20);
  }
  data = data?.map(({ code = '', name = '', slug = '', id = '', shortName = '' }) => ({ code, name, slug, id, shortName }));
  CacheUtils.setCacheKey(KEY_CACHE_API_TOP_MANUFACTUERS, data);

  return data;
};

const KEY_CACHE_CHAT_SETTING = 'API_CHAT_SETTING';
const getChatSetting = async () => {
  let data = CacheUtils.getCacheValue(KEY_CACHE_CHAT_SETTING);
  if (!data) {
    const chatSettingRes = await GET({ url: MARKETING_API.CHAT_SETTING, isBasic: true });
    data = getFirst(chatSettingRes)?.value || ENUMS_CHAT_SETTING_VALUE.THUOCSI;
    CacheUtils.setCacheKey(KEY_CACHE_CHAT_SETTING, data, 30);
  }

  return data;
};

export default {
  getTags,
  getTabs,
  getListCountries,
  getListProvinves,
  getListSellers,
  getListHashtagTopSearch,
  getListCountdownBar,
  getBanners,
  getMenuBar,
  getCategories,
  getManufacturers,
  getTopManufacturers,
  getInsiderSetting,
  getThumbnailList,
  getChatSetting,
};
