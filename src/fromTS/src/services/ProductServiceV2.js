import { CartClientV2, GET, getData, getFirst, isValid, POST, ProductClientV2, SellerClient } from 'clients';
import CatClient from 'clients/CatClientV2';
import { getProducts } from 'clients/ProductClientV2';
import { ORDER_API } from 'constants/APIUriV2';
import { PAGE_SIZE, PAGE_SIZE_30, THUOC_VA_HOAT_CHAT } from 'constants/data';
import { HTTP_STATUS } from 'constants/Enums';
import { GIFT_IMAGE } from 'constants/Images';
import { SELLER_CODES_REQUIRE_GPP, TAG_NEW } from 'sysconfig';
import { convertArrayToMap } from 'utils/ArrUtils';
import { formatCurrency, formatNumber } from 'utils/FormatNumber';
import { getProxyImageList } from 'utils/ImageUtils';
import { capitalizeTextFirst } from 'utils/StringUtils';
import { isEmpty } from 'utils/ValidateUtils';
import { getAccount } from './UserService';

export const findDiscountPercent = (salePrice, displayPrice) => {
  if (salePrice === displayPrice || displayPrice > salePrice) return 0;
  let percentDiscountProduct = ((salePrice - displayPrice) / salePrice) * 100;
  if (percentDiscountProduct > 100) percentDiscountProduct = 100;
  return Math.floor(percentDiscountProduct);
};

export const convertSlug = (slug) => slug?.toLowerCase() || slug;

const DEFAULT_SEARCH_STRATEGY = {
  text: true,
  keyword: true,
  ingredient: true,
};

/*
Hàm convert thông tin product từ API trả về và chỉ dùng 1 số phần thôi 
dùng trong tất cả các hàm ở web
*/
// limit order
function getLimitOrder(limitPerday, limitPerOrder, unit) {
  let messageLimitOrder = '';
  if (limitPerday > 0 && limitPerday < limitPerOrder) {
    messageLimitOrder = `Đặt tối đa ${formatNumber(limitPerday)} ${unit || 'sản phẩm'}/ngày`;
  }
  if (limitPerday <= 0 && limitPerOrder > 0 && limitPerOrder < 100000) {
    messageLimitOrder = `Đặt tối đa ${formatNumber(limitPerOrder)} ${unit || 'sản phẩm'}/lần`;
  }
  if (limitPerOrder <= 0 && limitPerday > 0) {
    messageLimitOrder = `Đặt tối đa ${formatNumber(limitPerday)} ${unit || 'sản phẩm'}/ngày`;
  } else if ((limitPerOrder > 0 && limitPerday > 0 && limitPerday === limitPerOrder) || limitPerday > limitPerOrder) {
    messageLimitOrder = `Đặt tối đa ${formatNumber(limitPerday)} ${unit || 'sản phẩm'}/ngày ${
      limitPerday !== limitPerOrder ? `và ${formatNumber(limitPerOrder)} ${unit || 'sản phẩm'}/lần` : ''
    }`;
  }
  return messageLimitOrder;
}
// 19Apr22 : thêm config limitPerDay -> chỉ áp dụng cho normal , ko áp dụng cho deal/ campaign /
const convertProductV2 = (item = {}) => {
  // console.log('convertProductV2  > item', item);
  // console.log('convertProductV2  > item product ', item.product);
  // console.log('convertProductV2  > item sku', item.sku);
  // console.log('convertProductV2  > item deal', item.deal);
  // const { product, sku, deal = null } = item;
  const {
    isAvailable = true,
    product,
    sku,
    deal = null,
    nextPriceLevel = {},
    campaign = null,
    skuDescription = {},
    limitPerDay = 0,
    quantityPurchasedToday = 0,
    consumedMaxQuantity = null, // web service
    // feature display product without login
    withoutLogin = false,
    isProductCard = false,
  } = item || {};

  const {
    categoryCodes = null,
    name = '',
    origin = '',
    volume = null,
    unit = null,
    manufacturerCode = null,
    ingredients = [],
    ingredientCodes = [], // product detail sẽ trả ra thêm 1 field là ingredientCodes
    productID = '',
    documentFiles = [],
    weight = 0,
    height = 1,
    length = 1,
    width = 1,
  } = product || {};

  // requiredCertificates: [ 'GPP', 'BUSINESS_CERTIFICATE', 'BUSINESS_LICENSE' ],
  const {
    maxQuantityPerOrder = null,
    productCode = '',
    retailPriceType = '',
    retailPriceValue = 0,
    sellerCode = null,
    status = '',
    code = '',
    tags = [],
    slug = null,
    statusData = null,
    type,
    skus = [],
    point = null,
    pointMultiplier = null,
    isActive, // true la co hien thi tren web, false la bi tat hien thi
    lotDates = [], // thong tin ve can date
    requiredCertificates = [],
  } = sku || {};

  const { maxQuantity: maxQuantityDeal } = deal || {};

  const tagExpired = lotDates.find((ele) => ele?.isNearExpired === true) || {};

  const { expiredDate = '', isNearExpired = false } = tagExpired;

  // giá hợp đồng
  const isContractPrice = type === 'SKU_CONTRACT';

  const isDeal = deal && deal?.status === 'ACTIVE' && new Date(deal?.startTime) <= new Date() ? true : null;

  const imageUrls = isDeal && deal?.imageUrls?.length > 0 ? deal?.imageUrls : item?.product?.imageUrls || [];
  const descriptionInfo = item?.description || {};
  if (skuDescription && skuDescription?.description) {
    descriptionInfo.description = skuDescription.description;
  }

  // const salePrice = deal?.price || retailPriceValue;
  // ưu tiên campaign

  const isCampaign = !!campaign || false;
  const isHappeningCampaign = (campaign && campaign?.isShow) || false;
  // anpham: push status into tags
  const newTags = (status !== 'NORMAL' && status !== 'NEAR_EXPIRATION' && [...tags, status]) || tags;
  if (isNearExpired) newTags.push('NEAR_EXPIRATION');
  const isNew = tags?.indexOf(TAG_NEW) >= 0;
  // logic check sản phẩm này có dc hiển thị hay ko ở đây
  let errorMessageProduct = null;
  let customMessageproduct = null;
  let requireGPPMessage = null;

  if (SELLER_CODES_REQUIRE_GPP?.length > 0 && sellerCode && SELLER_CODES_REQUIRE_GPP.indexOf(sellerCode) >= 0) {
    requireGPPMessage = 'Yêu cầu cung cấp GPP và giấy phép kinh doanh';
  }

  // off isAvailable
  // feature display product without login
  if (!withoutLogin) {
    if (!retailPriceValue || retailPriceValue === 0 || status === 'STOP_SELLING') {
      errorMessageProduct = 'Đang cập nhật giá';
    }
    if (isAvailable !== null && !isAvailable) {
      errorMessageProduct = 'Sản phẩm chưa hỗ trợ giao vùng này';
    }
    if (!isActive) errorMessageProduct = 'Sản phẩm tạm ngưng bán';
    switch (status) {
      case 'SUSPENDED':
        errorMessageProduct = 'Sản phẩm đã ngưng bán';
        break;
      case 'STOP_PRODUCING':
        errorMessageProduct = 'Sản phẩm ngưng sản xuất';
        break;
      case 'OUT_OF_STOCK':
        errorMessageProduct = 'Sản phẩm tạm hết hàng';
        break;
      default:
    }
  }
  const dealPrice = (isDeal && deal && deal?.price) ?? null;
  const imagesProxy = getProxyImageList(imageUrls);

  const isGift = status === 'GIFT';

  // variable template
  // update formatedCurrency
  let displayPrice = dealPrice ?? retailPriceValue;

  // product type
  let productType = 'NORMAL';
  let typeItem = 'NORMAL';
  const hidenPrice = null;
  let maxQuantity = maxQuantityPerOrder;
  const maxQuantityPerOrderItem = maxQuantityPerOrder;

  // percentage of quantity sold and sold out condition
  let percentDealSold;
  // available products to be able to buy in campaign
  let availableProducts;
  let discountPercentage;
  const messageLimitOrder = getLimitOrder(limitPerDay, maxQuantityPerOrderItem, unit);

  // nếu có campaign
  if (isHappeningCampaign) {
    const {
      campaign: campaignInfo,
      maxQuantityPerOrder: maxQuantityPerOrderCampaign = maxQuantityPerOrder,
      quantity: maxQuantityCampaign,
      retailPriceValue: retailPriceCampaign,
      soldQuantity = 0,
    } = campaign;

    percentDealSold = (soldQuantity / campaign?.quantity) * 100;

    if (percentDealSold < 100) {
      newTags.push('DEAL');
      discountPercentage = findDiscountPercent(retailPriceValue, retailPriceCampaign);
      availableProducts = Math.min(maxQuantityCampaign - soldQuantity, maxQuantityPerOrderCampaign);
      if (campaignInfo?.campaignType === 'NORMAL') {
        productType = 'MEGA_DAY';
      } else if (campaignInfo?.campaignType === 'FLASH_SALE') {
        productType = 'FLASH_SALE';
        newTags.push(productType);
      }
      // price for campaign
      typeItem = 'CAMPAIGN';
      displayPrice = retailPriceCampaign;
      maxQuantity = maxQuantityCampaign;
    } else {
      productType = 'NORMAL';
      customMessageproduct = `Bạn đã bỏ lỡ giá khuyến mãi ${formatCurrency(retailPriceCampaign)}`;
    }
  } else if (isDeal) {
    productType = 'DEAL';
    typeItem = 'DEAL';
    // MIN
    maxQuantity = Math.min(maxQuantityDeal, maxQuantityPerOrder);
    discountPercentage = findDiscountPercent(retailPriceValue, dealPrice);
    newTags.push(productType);
    availableProducts = deal?.maxQuantity - deal?.quantity || 0;
    percentDealSold = ((deal?.quantity || 0) / deal?.maxQuantity) * 100;
  } else {
    productType = 'NORMAL';
    // availableProducts = limitPerDay;
  }
  // end
  // @deprecase
  // tag giao hang 7 days
  // if (tags?.indexOf(TAG_7DAYS) >= 0) {
  //   newTags.push('TAG_7DAYS');
  // }

  if (isProductCard) {
    return {
      consumedMaxQuantity,
      isNew,
      isAvailable,
      defaultImage: isGift ? imagesProxy[0] || GIFT_IMAGE : imagesProxy[0] || '',
      originalImages: getProxyImageList(item?.product?.imageUrls || []),
      maxQuantity,
      maxQuantityPerOrder: maxQuantityPerOrderItem,
      maxQuantityPerDay: limitPerDay,
      limitPerDay,
      quantityPurchasedToday,
      // price
      salePrice: retailPriceValue,
      salePriceFormated: formatCurrency(retailPriceValue) || '',
      dealPrice,
      dealPriceFormated: formatCurrency(dealPrice) || '',
      displayPrice,
      displayPriceFormated: formatCurrency(displayPrice) || '',
      hidenPrice,
      // sku
      sku: code,
      // combo
      skus,
      skuId: productCode,
      // code
      slug: convertSlug(slug),
      status,
      // deal
      // nếu tồn tại campaing thì sẽ ko tồn tại deal- thuannc 06Jan2022
      deal: isCampaign ? null : deal,
      isDeal,
      // seller
      sellerCode,
      seller: withoutLogin
        ? {}
        : {
            code: sellerCode,
            slug, // not yet
          },
      // info
      // DONE: name deal thuannc
      name: (isDeal && deal && deal?.name) || name,
      nameNormal: name,
      productId: productID, // for insider
      unit,
      volume: capitalizeTextFirst(volume),
      statusData,
      productSkuType: type,
      tags: withoutLogin ? [] : newTags || null,
      type: typeItem || null,
      productType,
      isGift,
      errorMessageProduct,
      customMessageproduct,
      requiredCertificates,

      // campaign
      isCampaign,
      campaign,
      discountPercent: discountPercentage || 0,
      isHappeningCampaign,
      availableProducts: availableProducts || 0,

      // percentage discount for progress
      percentDealSold: percentDealSold || 0,
      isContractPrice, // giá hợp đồng
      // plus points
      point,
      pointMultiplier,
      messageLimitOrder,
      isActive,
      expiredDate,
    };
  }

  const productInfo = {
    consumedMaxQuantity,
    isNew,
    isAvailable,
    imageUrls,
    imagesProxy: isGift ? imagesProxy || [GIFT_IMAGE] : imagesProxy,
    defaultImage: isGift ? imagesProxy[0] || GIFT_IMAGE : imagesProxy[0] || '',
    originalImages: getProxyImageList(item?.product?.imageUrls || []),
    maxQuantity,
    maxQuantityPerOrder: maxQuantityPerOrderItem,
    maxQuantityPerDay: limitPerDay,
    limitPerDay,
    quantityPurchasedToday,

    // price
    salePrice: retailPriceValue,
    salePriceFormated: formatCurrency(retailPriceValue) || '',
    dealPrice,
    dealPriceFormated: formatCurrency(dealPrice) || '',
    nextPrice: isDeal || isCampaign ? 0 : nextPriceLevel?.price || 0,
    nextLevel: nextPriceLevel?.code || '',
    displayPrice,
    displayPriceFormated: formatCurrency(displayPrice) || '', // không sài giá âm ví dụ: -410000đ
    hidenPrice,
    // sku
    sku: code,
    // combo
    skus,
    skuId: productCode,
    kind: retailPriceType,
    // code
    slug: convertSlug(slug),
    status,
    ingredients,
    ingredientCodes,
    manufacturerCode,
    categoryCodes,

    // type

    // deal
    // nếu tồn tại campaing thì sẽ ko tồn tại deal- thuannc 06Jan2022
    deal: isCampaign ? null : deal,
    isDeal,
    // seller
    sellerCode,
    seller: withoutLogin
      ? {}
      : {
          code: sellerCode,
          slug, // not yet
        },
    // info
    // DONE: name deal thuannc
    name: (isDeal && deal && deal?.name) || name,
    nameNormal: name,
    productId: productID, // for insider
    unit,
    origin,
    description: descriptionInfo,
    volume: capitalizeTextFirst(volume),
    weight,
    productVolume: width * height * length,
    statusData,
    productSkuType: type,
    tags: withoutLogin ? [] : newTags || null,
    type: typeItem || null,
    productType,
    isGift,
    errorMessageProduct,
    customMessageproduct,
    requireGPPMessage,
    requiredCertificates,
    documentFiles,

    // campaign
    isCampaign,
    campaign,
    discountPercent: discountPercentage || 0,
    isHappeningCampaign,
    availableProducts: availableProducts || 0,

    // percentage discount for progress
    percentDealSold: percentDealSold || 0,
    isContractPrice, // giá hợp đồng
    // plus points
    point,
    pointMultiplier,
    messageLimitOrder,
    isActive,
    expiredDate,
  };

  // ưu tiên tag theo thứ tự -> hang_dat_truoc,...

  // console.log('convertProductV2  > ', productInfo);
  return productInfo;
};

export const mapDataProduct = async ({ ctx, result, isGetQuantity = true, withoutLogin = false, isAvailable = false, isProductCard = false }) => {
  try {
    if (!isValid(result)) {
      return result;
    }
    let cartObject = new Map();
    let limitSkus = new Map();

    const { data: dataProducts = [] } = result || {};
    let data = dataProducts;
    if (isAvailable) {
      data = data.filter((item) => item.isAvailable);
    }

    const skuCodes = data.map((item) => item?.sku?.code);

    if (!withoutLogin) {
      const tasks = [];
      if (isGetQuantity) {
        tasks.push(
          CartClientV2.getCartItemList({ ctx }).then((cartRes) => {
            if (isValid(cartRes)) {
              const cartItems = getData(cartRes);
              if (cartItems?.length > 0) {
                cartObject = convertArrayToMap(cartItems, 'sku');
              }
            }
          }),
        );
      }

      // lấy config theo ngày
      tasks.push(
        ProductClientV2.getSkusLimit({ ctx, skuCodes }).then((limitSkusRes) => {
          const skusLimitData = getData(limitSkusRes)?.filter((item) => item.isActive);
          limitSkus = convertArrayToMap(skusLimitData, 'itemCode');
        }),
      );

      await Promise.all(tasks);
    }

    // eslint-disable-next-line no-param-reassign
    result.data =
      data?.map((item) => {
        // 20Apr thêm limitPerDay
        const info = convertProductV2({ ...item, limitPerDay: limitSkus?.get(item?.sku?.itemCode)?.quantity || 0, withoutLogin, isProductCard });
        return {
          ...info,
          quantity: cartObject?.get(info.sku)?.quantity || 0,
        };
      }) || [];

    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
};

// map with limit skus

export const mapDataProductWithoutCart = async ({ result }) => {
  try {
    const { data = [] } = result || {};
    // eslint-disable-next-line no-param-reassign
    result.data = data.map((item) => {
      const info = convertProductV2(item);
      return {
        ...info,
      };
    });
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
};
// search product
export const searchProductsQuickOrder = async (keyword, page = 1) => {
  // const url = FUZZY_SEARCH;
  const body = {
    offset: (page - 1) * PAGE_SIZE_30,
    text: keyword || null,
    limit: PAGE_SIZE_30,
    getTotal: true,
    getPrice: true,
    searchStrategy: DEFAULT_SEARCH_STRATEGY,
    // allSku: true, // for status out of stock for search
  };
  // const result = await POST({ url, body });
  const result = await ProductClientV2.getFuzzySearchClient({ body });
  if (!isValid(result)) {
    return result;
  }

  return mapDataProduct({ result, isGetQuantity: true });
};
// Mobile Product V2
export const searchProductsMobile = async (keyword, page, query) => {
  const { category, manufacturer, sort, text, tag } = query;
  const filter = {};
  const defaultQuerySearch = '';

  if (category) {
    filter.category = query.category;
  }
  if (manufacturer) {
    filter.manufacturer = query.manufacturer;
  }
  if (tag) {
    filter.tag = query.tag;
  }
  const searchText = keyword || text || defaultQuerySearch;
  const searchSort = !keyword ? sort : '';
  const searchPage = Number(page) || Number(query?.page) || 1;
  const body = {
    ...query,
    offset: Number(page - 1) * PAGE_SIZE,
    text: searchText,
    limit: PAGE_SIZE,
    getTotal: true,
    getPrice: true,
    searchStrategy: DEFAULT_SEARCH_STRATEGY,
    filter,
    sort: searchSort,
    isAvailable: query?.isAvailable === 'true',
    page: searchPage,
  };
  // const result = await POST({ url, body });
  const result = await ProductClientV2.getFuzzySearchClient({ body });
  if (!isValid(result)) {
    return result;
  }

  return mapDataProduct({ result, isGetQuantity: false });
};

export const getListTabs = async ({ ctx }) => {
  const res = await ProductClientV2.getTabs({ ctx });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
};

export const loadDataQuickOrder = async ({ page = 1 }) => {
  // const url = FUZZY_SEARCH;
  const body = {
    offset: (page - 1) * PAGE_SIZE_30,
    limit: PAGE_SIZE_30,
    getTotal: true,
    getPrice: true,
    searchStrategy: DEFAULT_SEARCH_STRATEGY,
    // allSku: true,
  };

  const result = await ProductClientV2.getFuzzySearchClient({ body });
  // const result = await POST({ url, body });
  if (!isValid(result)) return result;

  return mapDataProduct({ result, isGetQuantity: false });
};

const checkCurrentTab = async ({ ctx, filter }) => {
  const { query } = ctx;
  if (query.currentTab) {
    const tabs = await getListTabs({ ctx });
    const currentTab = tabs.find((tab) => tab.slug === query.currentTab);
    // eslint-disable-next-line no-param-reassign
    if (currentTab) filter[currentTab.type.toLowerCase()] = currentTab.value;
  }
};

// tabs truyền vào từ ssr / client
export const loadDataProduct = async ({ ctx, limit = PAGE_SIZE_30, tabs = [] }) => {
  const { query } = ctx;
  let filter = {};

  // check currentTab -> filter
  if (query.currentTab) {
    if (tabs?.length > 0) {
      const currentTab = tabs.find((tab) => tab.slug === query.currentTab);
      if (currentTab) filter[currentTab.type.toLowerCase()] = currentTab.value;
    } else {
      await checkCurrentTab({ ctx, filter });
    }
  }
  // check tag
  if (query.tag) {
    filter.tag = query.tag;
  }

  if (query.filter) {
    let categoryFilters = [];
    try {
      categoryFilters = JSON.parse(query.filter)?.categoryFilters || [];
    } catch (e) {
      categoryFilters = [];
    }

    const combinedCategoryFilters = categoryFilters.filter((item) => item.isCombined) || [];

    categoryFilters = categoryFilters.filter(
      (cat) =>
        cat.code !== cat.categoryCodes?.[0] ||
        cat.efficacyCodes?.length > 0 ||
        combinedCategoryFilters.every((item) => !item.categoryCodes?.includes(cat.code)),
    );

    filter = {
      ...filter,
      categoryFilters,
    };
  }

  // end
  const sort = query?.sort || '';
  const page = Number(query?.page - 1 || 0);

  const body = {
    ...ctx.query,
    text: ctx?.query?.q || ctx?.query?.text || null,
    offset: page * PAGE_SIZE_30,
    limit,
    getTotal: true,
    filter,
    sort,
    searchStrategy: DEFAULT_SEARCH_STRATEGY,
    // allSku: true,
  };

  // const result = await POST({ url: FUZZY_SEARCH, body, ctx });
  const result = await ProductClientV2.getFuzzySearchClient({ ctx, body });

  if (!isValid(result)) return result;

  return mapDataProduct({ ctx, result });
};
// TODO:
export const loadDataProductWeb = async ({ query, filter = {} }) => {
  // check currentTab -> filter
  if (query.tag) {
    if (query.tag === 'DOCQUYENGIATOT' && query.provinceCode !== undefined) {
      const formatQueryProvinceCode = `PROVINCE_${query.provinceCode}`;
      // eslint-disable-next-line no-param-reassign
      filter.tags = [query.tag, formatQueryProvinceCode];
    } else {
      // eslint-disable-next-line no-param-reassign
      filter.tag = query.tag;
    }
  }

  if (query.manufacturer) {
    // eslint-disable-next-line no-param-reassign
    filter.manufacturer = query.manufacturer;
  }
  if (query.category) {
    // eslint-disable-next-line no-param-reassign
    filter.category = query.category;
  }

  if (query.filter) {
    let categoryFilters = [];
    try {
      categoryFilters = JSON.parse(query.filter)?.categoryFilters || [];
    } catch (e) {
      categoryFilters = [];
    }

    const combinedCategoryFilters = categoryFilters.filter((item) => item.isCombined) || [];

    categoryFilters = categoryFilters.filter(
      (cat) =>
        cat.code !== cat.categoryCodes?.[0] ||
        cat.efficacyCodes?.length > 0 ||
        combinedCategoryFilters.every((item) => !item.categoryCodes?.includes(cat.code)),
    );

    // eslint-disable-next-line no-param-reassign
    filter = {
      ...filter,
      categoryFilters,
    };
  }

  // end
  const sort = query?.sort || '';
  const page = Number(query?.page - 1 || 0);
  const searchType = Number(query?.searchType || THUOC_VA_HOAT_CHAT);
  const searchStrategy = {
    text: true,
    keyword: true,
    ingredient: searchType === THUOC_VA_HOAT_CHAT,
  };
  const body = {
    ...query,
    text: query?.q || query?.text || null,
    offset: page * PAGE_SIZE_30,
    limit: PAGE_SIZE_30,
    getTotal: true,
    filter,
    sort,
    isAvailable: query?.isAvailable === 'true',
    searchStrategy,
    // allSku: true,
  };
  const result = await ProductClientV2.getFuzzySearchClient({ body });
  // const result = await POST({ url: FUZZY_SEARCH, body });
  if (!isValid(result)) return result;
  return mapDataProduct({ result, isProductCard: true });
};

// Mobile V2 Product
// export const loadDataProductMobile = async ({ ctx }) => {
//   const { query } = ctx;
//   const page = Number(query?.page - 1 || 0);
//   const sort = query?.sort || '';
//   const cat = query.category;
//   const filter = {};
//   // check currentTab -> filter
//   await checkCurrentTab({ ctx, filter });
//   // check tag
//   if (query.tag) {
//     filter.tag = query.tag;
//   }

//   if (cat) {
//     filter.category = cat;
//   }

//   if (query.manufacturer) {
//     filter.manufacturer = query.manufacturer;
//   }

//   const body = {
//     ...ctx.query,
//     text: ctx?.query?.q || ctx?.query?.text || null,
//     offset: page * PAGE_SIZE_30,
//     limit: PAGE_SIZE_30,
//     getTotal: true,
//     filter,
//     sort,
//     searchStrategy: DEFAULT_SEARCH_STRATEGY,
//     // allSku: true,
//   };
//   // const result = await POST({ url: FUZZY_SEARCH, body, ctx });
//   const result = await ProductClientV2.getFuzzySearchClient({ ctx, body });

//   if (!isValid(result)) return result;

//   return mapDataProduct({ ctx, result });
// };
export const loadDataProductMobileClient = async ({ page = 1, query, isEmptySearch = false }) => {
  const filter = {};
  const defaultQuerySearch = '';
  // check currentTab -> filter
  if (query.tag) {
    if (query.tag === 'DOCQUYENGIATOT' && query.provinceCode !== undefined) {
      const formatQueryProvinceCode = `PROVINCE_${query.provinceCode}`;
      // eslint-disable-next-line no-param-reassign
      filter.tags = [query.tag, formatQueryProvinceCode];
    } else {
      // eslint-disable-next-line no-param-reassign
      filter.tag = query.tag;
    }
  }
  if (query.category) {
    filter.category = query.category;
  }
  if (query.manufacturer) {
    filter.manufacturer = query.manufacturer;
  }

  // end
  const sort = query?.sort || '';
  const searchPage = Number(page) || Number(query?.page) || 1;
  const searchType = Number(query?.searchType || THUOC_VA_HOAT_CHAT);
  const searchStrategy = {
    text: true,
    keyword: true,
    ingredient: searchType === THUOC_VA_HOAT_CHAT,
  };
  const searchText = isEmptySearch ? defaultQuerySearch : query?.q || query?.text;
  const body = {
    ...query,
    page: searchPage,
    text: searchText,
    offset: (searchPage - 1) * PAGE_SIZE,
    limit: PAGE_SIZE,
    getTotal: true,
    getPrice: true,
    filter,
    sort,
    isAvailable: query?.isAvailable === 'true',
    searchStrategy,
    // allSku: true,
  };
  const result = await ProductClientV2.getFuzzySearchClient({ body });
  if (!isValid(result)) return result;
  return mapDataProduct({ result });
};

const loadProductFuzzy = async ({ ctx, offset, limit = PAGE_SIZE_30, filter, text = '', sort = '', isUseRawData = false, ...params }) => {
  // const url = FUZZY_SEARCH;

  const body = {
    text,
    offset,
    limit,
    getTotal: true,
    sort,
    filter,
    searchStrategy: DEFAULT_SEARCH_STRATEGY,
    ...params,
    // allSku: true,
  };
  // const result = await POST({ url, ctx, body });

  const result = await ProductClientV2.getFuzzySearchClient({ ctx, body });

  if (isUseRawData) return result;

  const mappedData = await mapDataProduct({ ctx, result });
  // const result = await POST({ url, ctx, body });
  return {
    ...mappedData,
  };
};

const loadProductWithFilter = async ({ ctx, offset, limit = PAGE_SIZE_30, filter, text = '', sort = '' }) => {
  // const url = FUZZY_SEARCH;
  const body = {
    text,
    offset,
    limit,
    getTotal: true,
    sort,
    filter,
    searchStrategy: DEFAULT_SEARCH_STRATEGY,
    // allSku: true,
  };
  // const result = await POST({ url, ctx, body, isBasic: true });
  const result = await ProductClientV2.getFuzzySearchClient({ ctx, body, isBasic: true });
  if (!isValid(result)) return result;
  return mapDataProduct({ ctx, result });
};

const loadProductWithTag = async ({ ctx, slug, offset, ...params }) =>
  loadProductWithFilter({
    ctx,
    offset,
    filter: {
      tag: slug,
    },
    ...params,
  });

const loadProductWithIngredient = async ({ ctx, code, offset }) =>
  loadProductWithFilter({
    ctx,
    offset,
    filter: {
      ingredient: code,
    },
  });

const loadProductWithSeller = async ({ ctx, code, offset, ...params }) =>
  loadProductWithFilter({
    ctx,
    offset,
    filter: {
      seller: code,
    },
    ...params,
  });

async function loadProductWithCategory({ ctx }) {
  const { query } = ctx;
  const page = Number(query?.page - 1 || 0);
  const sort = query?.sort || '';
  const catInfo = await CatClient.loadCategoryInfoBySlug(ctx);
  const cat = catInfo?.[0]?.code || '';
  const filter = {};
  // check currentTab -> filter
  await checkCurrentTab({ ctx, filter });
  // end
  if (cat) {
    filter.category = cat;
  }

  return loadProductWithFilter({
    ctx,
    offset: page * PAGE_SIZE_30,
    sort,
    filter,
  });
}

async function loadProductWithManufacturer({ ctx }) {
  const { query } = ctx;
  const page = Number(query?.page - 1 || 0);
  const sort = query?.sort || '';
  const manufacturerInfo = await CatClient.loadManufacturerInfoBySlug(ctx);
  const manufacturer = manufacturerInfo?.[0]?.code || '';
  let filter = {};
  try {
    filter = JSON.parse(query.filter || '{}');
  } catch (e) {
    filter = {};
  }
  // check currentTab -> filter
  await checkCurrentTab({ ctx, filter });
  // end
  if (manufacturer) {
    filter.manufacturer = manufacturer;
  }
  return loadProductWithFilter({
    ctx,
    offset: page * PAGE_SIZE_30,
    sort,
    filter,
  });
}

const LIMIT = 50;
export const getProductInfoFromSkus = async ({ ctx, skus, useCache = true, getPrice = true, customerLevel, locationCode, customerId }) => {
  const body = { ctx, limit: LIMIT, useCache, getPrice };
  const skuListArray = [];
  for (let i = 0; i < skus.length; i += LIMIT) {
    skuListArray.push(skus.slice(i, i + LIMIT));
  }

  // fix chữa cháy hàm getProduct cần user customer_level + location
  if (getPrice) {
    if (!customerLevel || !locationCode) {
      const userInfo = await getAccount(ctx);
      const { level, provinceCode, customerID: id } = getFirst(userInfo, {});
      body.customerLevel = level;
      body.locationCode = provinceCode;
      body.customerId = id;
    } else {
      body.customerLevel = customerLevel;
      body.locationCode = locationCode;
      body.customerId = customerId;
    }
  }

  const responses = await Promise.all(skuListArray.map((codes) => getProducts({ ...body, codes })));
  const mapLimitSkus = {};
  const responsesLimitSkus = await Promise.all(skuListArray.map((codes) => ProductClientV2.getSkusLimit({ ctx, skuCodes: codes })));
  const listSkusLimited = [];
  responsesLimitSkus.forEach(({ data }) => {
    data
      ?.filter((item) => item?.isActive)
      ?.forEach((skuLimit) => {
        mapLimitSkus[skuLimit.itemCode] = skuLimit;
        listSkusLimited.push(skuLimit.sku);
      });
  });

  const mapSkuPurchased = {};
  if (listSkusLimited.length > 0) {
    const responseSkuHistory = await ProductClientV2.getSkusBuyed({ ctx, skuCodes: listSkusLimited });
    if (isValid(responseSkuHistory)) {
      getData(responseSkuHistory)?.forEach((item) => {
        mapSkuPurchased[item.itemCode] = item;
      });
    }
  }

  const newData = [];

  responses.forEach(({ data }) => {
    data?.forEach((product) => {
      const sku = product?.sku?.itemCode;
      const limitSku = mapLimitSkus[sku] || {};
      newData.push(
        convertProductV2({ ...product, limitPerDay: limitSku?.quantity || 0, quantityPurchasedToday: mapSkuPurchased[sku]?.quantity || 0 }),
      );
    });
  });

  return {
    status: HTTP_STATUS.Ok,
    data: newData,
  };
};

export const getProductInfoFromSkusForSeller = async ({ ctx, skus, useCache = true, getPrice = true, customerLevel, locationCode, customerId }) => {
  const body = { ctx, limit: LIMIT, useCache, getPrice };
  const skuListArray = [];
  for (let i = 0; i < skus.length; i += LIMIT) {
    skuListArray.push(skus.slice(i, i + LIMIT));
  }

  // fix chữa cháy hàm getProduct cần user customer_level + location
  if (getPrice) {
    if (!customerLevel || !locationCode) {
      const userInfo = await getAccount(ctx);
      const { level, provinceCode, customerID: id } = getFirst(userInfo, {});
      body.customerLevel = level;
      body.locationCode = provinceCode;
      body.customerId = id;
    } else {
      body.customerLevel = customerLevel;
      body.locationCode = locationCode;
      body.customerId = customerId;
    }
  }

  const responses = await Promise.all(skuListArray.map((codes) => getProducts({ ...body, codes })));
  const newData = [];

  let cartObject = new Map();

  const cartRes = await CartClientV2.loadDataCart(ctx);
  if (isValid(cartRes)) {
    const cart = cartRes.data[0];
    if (cart && !isEmpty(cart.cartItems)) {
      cartObject = convertArrayToMap(cart.cartItems, 'sku');
    }
  }

  responses.forEach(({ data }) => {
    data?.forEach((product) => {
      newData.push({ ...convertProductV2(product), quantity: cartObject.get(product?.sku?.code)?.quantity || 0 });
    });
  });

  return {
    status: HTTP_STATUS.Ok,
    data: newData,
  };
};

export const getProductInfoMapFromSkus = async ({ ctx, skus, useCache = true, getPrice = true, customerLevel, locationCode, customerID }) => {
  const body = { ctx, limit: LIMIT, useCache, getPrice };
  const skuListArray = [];
  for (let i = 0; i < skus.length; i += LIMIT) {
    skuListArray.push(skus.slice(i, i + LIMIT));
  }

  // fix chữa cháy hàm getProduct cần user customer_level + location
  if (!customerLevel || !locationCode) {
    const userInfo = await getAccount(ctx);
    const { level, provinceCode, customerID: id } = getFirst(userInfo, {});
    body.customerLevel = level;
    body.locationCode = provinceCode;
    body.customerId = id;
  } else {
    body.customerLevel = customerLevel;
    body.locationCode = locationCode;
    body.customerId = customerID;
  }

  const mapProducts = {};

  // get limit
  const responses = await Promise.all(skuListArray.map((codes) => getProducts({ ...body, codes })));
  const mapLimitSkus = {};
  const responsesLimitSkus = await Promise.all(skuListArray.map((codes) => ProductClientV2.getSkusLimit({ ctx, skuCodes: codes })));
  const listSkusLimited = [];
  responsesLimitSkus.forEach(({ data }) => {
    data
      ?.filter((item) => item.isActive)
      ?.forEach((skuLimit) => {
        mapLimitSkus[skuLimit.itemCode] = skuLimit;
        listSkusLimited.push(skuLimit.sku);
      });
  });

  const mapSkuPurchased = {};
  if (listSkusLimited.length > 0) {
    const responseSkuHistory = await ProductClientV2.getSkusBuyed({ ctx, skuCodes: listSkusLimited });
    if (isValid(responseSkuHistory)) {
      getData(responseSkuHistory)?.forEach((item) => {
        mapSkuPurchased[item.itemCode] = item;
      });
    }
  }

  responses.forEach(({ data }) => {
    data?.forEach((product) => {
      const sku = product?.sku?.itemCode;
      const info = convertProductV2({
        ...product,
        limitPerDay: mapLimitSkus[sku]?.quantity || 0,
        quantityPurchasedToday: mapSkuPurchased[sku] || 0,
        campaign: product.campaign || {},
      });
      mapProducts[info?.sku] = info;
    });
  });

  return {
    status: HTTP_STATUS.Ok,
    data: [mapProducts],
  };
};

export const loadDataProductDetail = async ({ ctx }) => {
  const { query } = ctx;
  const params = {
    q: convertSlug(query.slug),
  };
  const url = `/marketplace/product/v2/product/detail`;
  const result = await GET({
    url,
    ctx,
    isBasic: true,
    params,
  });
  if (!isValid(result)) return result;
  return mapDataProduct({ ctx, result });
};

// export const loadDataProductDetailWithoutCTX = async ({ slug }) => {
//   const params = {
//     q: convertSlug(slug),
//   };
//   const url = `/marketplace/product/v2/product/detail`;
//   const result = await GET({
//     url,
//     isBasic: true,
//     params,
//   });
//   if (!isValid(result)) return result;
//   return mapDataProduct({ result });
// };

export const getDataProductBySlug = async ({ ctx, slug }) => {
  const params = {
    q: convertSlug(slug),
  };
  const url = `/marketplace/product/v2/product/detail`;
  const result = await GET({
    url,
    ctx,
    isBasic: true,
    params,
  });
  if (!isValid(result)) return result;
  return mapDataProduct({ ctx, result });
};

export const getDataProductsBySlugs = async ({ ctx, slugs, isBasic = true }) => {
  const url = `/marketplace/product/v2/product/detail`;
  const results = await Promise.all(
    slugs.map((slug) => {
      const params = {
        q: convertSlug(slug),
      };
      return GET({
        url,
        ctx,
        isBasic,
        params,
      });
    }),
  );

  const result = {
    status: HTTP_STATUS.Ok,
    data: results?.filter((res) => isValid(res))?.map((productRes) => getFirst(productRes)) || [],
  };

  // filter isAvailable
  return mapDataProduct({ ctx, result, isGetQuantity: false, isAvailable: true });
  // return result;
};

export const getSettingTags = async ({ ctx, params }) => ProductClientV2.getSettingTags({ ctx, params, isBasic: true });

export const getTagNameFromIds = async ({ params }) => ProductClientV2.getTagNameFromIds({ params });

export const getDeals = async ({ ctx, sellerCode = '' }) => {
  const { query } = ctx;
  // const url = FUZZY_SEARCH;
  const page = Number(query?.page - 1 || 0);
  let body = {};

  if (sellerCode) {
    body = {
      ...ctx.query,
      offset: page * PAGE_SIZE_30,
      limit: PAGE_SIZE_30,
      getTotal: true,
      getDealOnly: true,
      filter: {
        sellers: [sellerCode],
      },
      text: '',
    };
  } else {
    body = {
      ...ctx.query,
      text: ctx?.query?.q || null,
      offset: page * PAGE_SIZE_30,
      limit: PAGE_SIZE_30,
      getTotal: true,
      getDealOnly: true,
    };
  }
  body.searchStrategy = DEFAULT_SEARCH_STRATEGY;
  // const result = await POST({ url, ctx, body, isBasic: true });
  const result = await ProductClientV2.getFuzzySearchClient({ ctx, body, isBasic: true });
  if (!isValid(result)) return result;
  const deals = await mapDataProduct({ ctx, result });
  const now = new Date();
  const data = getData(deals, []).filter((item) => new Date(item?.deal?.readyTime || 0) < now);
  return { ...deals, data };
};

// without ctx
export const getDealsClient = async ({ query, sellerCode = '', limit = PAGE_SIZE_30 }) => {
  const page = Number(query?.page - 1 || 0);
  let body = {};

  if (sellerCode) {
    body = {
      ...query,
      offset: page * limit,
      limit,
      getTotal: true,
      getDealOnly: true,
      filter: {
        sellers: [sellerCode],
      },
      text: '',
    };
  } else {
    body = {
      ...query,
      text: query?.q || null,
      offset: page * limit,
      limit,
      getTotal: true,
      getDealOnly: true,
    };
  }
  const searchResult = await ProductClientV2.getFuzzySearchClient({ body });
  if (!isValid(searchResult)) return searchResult;
  const dealsRes = await mapDataProduct({ result: searchResult });
  // const now = new Date();
  // const data = getData(dealsRes, []).filter((item) => {
  //   if (item?.deal?.readyTime) {
  //     return new Date(item.deal.readyTime) < now;
  //   }
  //   return false;
  // });
  const data = getData(dealsRes);
  return { ...dealsRes, data };
};
export const getStoreProductClient = async ({ query, sellerCode = '', keywords = '', sectionStore = '', isDeal = false }) => {
  const page = Number(query?.page - 1 || 0);
  let body = {};

  if (sellerCode) {
    body = {
      offset: page * PAGE_SIZE_30,
      limit: PAGE_SIZE_30,
      getTotal: true,
      getDealOnly: isDeal,
      filter: {
        sellers: [sellerCode],
        sectionStore,
      },
      text: keywords,
      ...query,
    };
  } else {
    body = {
      ...query,
      text: keywords,
      offset: page * PAGE_SIZE_30,
      limit: PAGE_SIZE_30,
      getTotal: true,
      getDealOnly: isDeal,
    };
  }

  const searchResult = await ProductClientV2.getFuzzySearchClient({ body });
  if (!isValid(searchResult)) return searchResult;
  const dataRes = await mapDataProduct({ result: searchResult });
  return { ...dataRes };
};

// TODO:
const getProductsByIds = async ({ ctx, ids = [], ...restProps }) => {
  const idsListArray = [];
  for (let i = 0; i < ids.length; i += LIMIT) {
    idsListArray.push(ids.slice(i, i + LIMIT));
  }
  const responses = await Promise.all(idsListArray.map((productIds) => ProductClientV2.getProductsByIds({ ids: productIds, ...restProps })));

  const newData = [];
  responses?.forEach((res) => {
    res?.data?.forEach((product) => {
      newData.push(product);
    });
  });

  return {
    status: HTTP_STATUS.Ok,
    data: newData,
  };
};

// without ctx
const getProductsByCodes = async ({ codes = [], ...restProps }) => {
  const responses = await Promise.all(codes.map((productCodes) => ProductClientV2.getProductsByCodes({ codes: [productCodes], ...restProps })));

  const newData = [];
  responses?.forEach((res) => {
    res?.data?.forEach((product) => {
      newData.push(product);
    });
  });

  return {
    status: HTTP_STATUS.Ok,
    data: newData,
  };
};

const getDescriptionByProductId = async ({ ctx, productId, ...restProps }) => ProductClientV2.getDescriptionById({ productId, ctx, ...restProps });

export const getProductOfSeller = async ({ ctx, params }) => {
  const result = await SellerClient.getProductBySeller({ ctx, params });
  if (!isValid(result)) return result;
  const data = getData(result);
  const skus = data.map(({ code }) => code);

  const productMapRes = await getProductInfoMapFromSkus({ ctx, skus });
  if (!isValid(productMapRes)) return productMapRes;
  const mapProduct = getFirst(productMapRes, {});
  const productInfo = skus.map((sku) => ({ ...mapProduct[sku] }));
  return { total: result?.total || 0, data: productInfo, status: 'OK' };
};

const getFilesProduct = async ({ ctx, refCode }) => ProductClientV2.getFilesProduct({ ctx, refCode });

const getProductByCampaign = ({ ctx, text, campaignCode = null, offset = 0, limit = 30 }) =>
  loadProductWithFilter({ ctx, text, filter: { campaign: campaignCode }, offset, limit });

const getDescriptionBySkus = async ({ ctx, sku }) => {
  const description = await ProductClientV2.getDescriptionBySku({ ctx, sku });
  if (!isValid(description)) return null;
  return getFirst(description);
};
export const getHistoryBySkus = async ({ ctx, skuCodes = null }) => {
  POST({
    ctx,
    url: ORDER_API.SKU_HISTORY,
    body: {
      skuCodes,
    },
  });
};
const getDetailProductWithoutLogin = async ({ ctx, provinceCode }) => {
  const url = '/marketplace/product/v2/product/detail-raw';
  const params = {
    q: convertSlug(ctx?.query?.slug || null),
    provinceCode,
  };
  const result = await GET({ ctx, url, params, provinceCode, isBasic: true });
  if (!isValid(result)) return result;
  return mapDataProduct({ ctx, result, isGetQuantity: false, withoutLogin: true });
};
export default {
  findDiscountPercent,
  loadDataProduct,
  loadDataProductWeb,
  // loadDataProductMobile,
  loadDataProductMobileClient,
  mapDataProduct,
  searchProductsQuickOrder,
  searchProductsMobile,
  loadDataQuickOrder,
  loadProductWithCategory,
  loadProductWithManufacturer,
  getListTabs,
  getProductInfoMapFromSkus,
  loadDataProductDetail,
  getSettingTags,
  getTagNameFromIds,
  getDeals,
  loadProductWithFilter,
  loadProductWithTag,
  loadProductWithIngredient,
  getProductInfoFromSkus,
  getProductsByIds,
  getFilesProduct,
  getProductOfSeller,
  loadProductWithSeller,
  getDescriptionByProductId,
  getProductByCampaign,
  getDataProductBySlug,
  getDataProductsBySlugs,
  getDescriptionBySkus,
  loadProductFuzzy,
  convertProductV2,
  getDetailProductWithoutLogin,
  getProductInfoFromSkusForSeller,
  getDealsClient,
  getHistoryBySkus,
  getProductsByCodes,
  getStoreProductClient,
  // loadDataProductDetailWithoutCTX,
};
