// CHange event

// https://thuocsi1-my.sharepoint.com/:x:/g/personal/thao_thuocsi_vn/Ectdykk4E59Pkyzi_lWivnMBapW58CEv3KtbOMUKhakyOg?e=hTiArp

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA;
export const GA_TRACKING_ID_V2 = process.env.NEXT_PUBLIC_GA_MOBILEV2;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  if (GA_TRACKING_ID && window.gtagGA && !url?.endsWith('/loading')) {
    window.gtagGA('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, params }) => {
  if (window && window.gtagGA) {
    window.gtagGA('event', action, params);
  }
};
export const eventV2 = ({ action, params }) => {
  if (window && window.gtagGAV2) {
    window.gtagGAV2('event', action, params);
  }
};

const showModalDiscovery = ({ sku }) =>
  event({ action: 'discovery_show_detail', params: { event_category: 'discovery', event_label: 'Show detail discovery', value: sku } });

const displayTopSearch = () => event({ action: 'display_topSearch', params: { event_category: 'TopSearch', event_label: 'Display Top Search' } });

const displayCountDownBar = () =>
  event({ action: 'display_countDownBar', params: { event_category: 'CountDownBar', event_label: 'Display CountDownBar' } });

const clickTopSearch = ({ url = '', hashtag = '' }) =>
  event({ action: 'click', params: { event_category: 'Homepage', value: url, event_label: `Click top search: ${hashtag}` } });

const convertProduct = (product) => ({
  id: product?.productId || '',
  name: product?.name || '',
  price: `${product?.displayPrice}` || '',
  value: product?.displayPrice || '',
  // tags: product?.tags || '',
  quantity: product?.quantity || 0,
  brand: `${product?.sellerInfo?.name ? `${product?.sellerInfo?.name} - ` : ''}${product?.sellerCode || ''}`,
  category: product?.categoryCodes?.length > 0 ? product?.categoryCodes?.join(' - ') : '',
});

// eslint-disable-next-line camelcase
export const eventSimple = (action, event_category, event_label) => event({ action, params: { event_category, event_label } });
// eslint-disable-next-line camelcase
export const eventSimpleV2 = (action, event_category, event_label) => eventV2({ action, params: { event_category, event_label } });

const eventEcommerce = ({ action, products, params = {} }) => {
  event({
    action,
    params: {
      ...params,
      items: products?.map((product) => convertProduct(product)) || [],
    },
  });
};

// CONSTANTS and MAP
const TIME_TO_TRACK = [10, 30, 90, 300, 600];

const mapPathToCategory = (path) => {
  if (path === '/user/wishlist' || path === '/productviewed') return 'My account';
  if (path === '/quick-order') return 'Quick order';
  if (path === '/khuyenmai') return 'Promotion';
  if (path.includes('seller') || path.includes('flagship-store') || path.includes('product-listing')) return 'Sellers';
  return null;
};

const mapPathToLabel = {
  '/user/wishlist': 'Add To Cart mục sản phẩm quan tâm',
  '/productviewed': 'Add To Cart mục sản phẩm đã xem',
};

const clickMenubar = (item) => eventSimple('click', 'Homepage', `Click menubar <NAME: ${item.name} | URL: ${item.url}>`);
const clickCountdownbar = (item) => eventSimple('click', 'Homepage', `Click countdownbar <TYPE: ${item.imageType} | URL: ${item.url}>`);
const clickBanner = (item) => eventSimple('click', 'Homepage', `Click banner <URL: ${item.link}>`);
const showBanner = (item) => eventSimple('impression', 'Homepage', `Show banner <URL: ${item.link}>`);

// Click event category product
const clickTabInProduct = (tab) => eventSimple('click', 'Product', `Click tab <${tab}>`);
const clickViewShop = (shop) => eventSimple('click', 'Product', `Button "Xem store" ${shop}`);
const clickCategoryDrugsTitle = (ingredient) => eventSimple('click', 'Product', `Từng danh mục trong Nhóm thuốc: ${ingredient}`);
const clickCategoryManufacturerTitle = (manufacturer) => eventSimple('click', 'Product', `Từng danh mục trong Nhà sản xuất: ${manufacturer}`);
const clickTagInProduct = (tag) => eventSimple('click', 'Product', `Click Tag ${tag}`);
const clickViewAllProductSameManufacturer = () => eventSimple('click', 'Product', 'Button "Xem tất cả" | Sản phẩm cùng nhà bán hàng');
const clickViewAllProductSameIngredient = () => eventSimple('click', 'Product', 'Button "Xem tất cả" | Cùng hoạt chất');

// Sellers event
const clickViewAllSellers = () => eventSimple('click', 'Sellers', 'Button  "xem tất cả"');
const clickSellerNameID = (sellerName, ID) => eventSimple('click', 'Sellers', `Click seller name: ${sellerName} - ID: ${ID}`);
const clickFlagshipStoreNameID = (storeName, ID) => eventSimple('click', 'Sellers', `Click flagship-store name: ${storeName} - ID: ${ID}`);

// Click event category order
const clickUsePromoCode = () => eventSimple('click', 'Order', 'Click mục "Dùng mã giảm giá" trong trang cart');
const clickUseDirectlyPromoCode = (code) => eventSimple('click', 'Order', `Click dùng ngay mã giảm giá ${code}`);

// Time tracking
const timeTracking = (label, eventCategory, time) => eventSimple(`timing_${time}`, eventCategory, label);

// Scroll depth
const scrollDepth = (label, eventCategory, scrollPercent) => eventSimple(`scrolldepth_${scrollPercent}_percent`, eventCategory, label);

// My Account
const clickTrackingOrder = () => eventSimple('click', 'My account', 'Click vào Trang "Tra cứu vận đơn"');
const clickRewardDetail = (name, id) => eventSimple('click', 'My account', `Click Reward Name: ${name} | ID: ${id}`);

// Promotion
const clickViewAllPromotion = (promotion) => eventSimple('click', 'Promotion', `Button "Xem tất cả" ${promotion}`);
const clickActivePromotionButton = () => eventSimple('click', 'Promotion', `ô khung giờ "Đang diễn ra"`);
const clickNextPromotionButton = () => eventSimple('click', 'Promotion', `ô khung giờ "Sắp diễn ra"`);

// Search
const mapEventBySearchType = {
  1: 'Search',
  2: 'Search_ingredient',
  3: 'Search_seller',
  4: 'Search_drug',
};

const clickSearch = (type, keyword) => eventSimple(mapEventBySearchType[type], 'Search', `Keyword: "${keyword}"`);
const searchInQuickOrder = (keyword) => eventSimple('Search_Quick_order', 'Quick order', `Keyword: "${keyword}"`);

// Custom Ecommerce event with path
export const addToCartInPage = (product, path) => {
  if (mapPathToCategory(path)) {
    eventEcommerce({
      action: 'add_to_cart',
      products: [product],
      params: {
        currency: 'VND',
        event_category: mapPathToCategory(path),
        event_label: mapPathToLabel[path] || 'Add To Cart',
      },
    });
  }
};

export const viewItemInPage = ({ product, path }) => {
  if (mapPathToCategory(path)) {
    eventEcommerce({
      action: 'click_item',
      params: {
        content_type: 'Product',
        event_category: mapPathToCategory(path),
        event_label: `View Product Detail Has SKU:${product?.sku || ''}`,
      },
      products: [product],
    });
  }
};

const toggleMobileV2 = (state) => eventSimple('click', 'Toggle Mobile V2', state ? 'V1 to V2' : 'V2 to V1');

const viewBlog = () => eventSimple('view_blog', 'Engagement', 'View Blog');
const viewCareer = () => eventSimple('view_career', 'Engagement', 'View Career');
const viewSeller = () => eventSimple('view_seller', 'Engagement', 'View Seller');
const popup = () => eventSimple('popup', 'Engagement', 'Click popup');
const callHotline = () => eventSimple('call', 'Engagement', 'Call Hotline');
const sendEmail = () => eventSimple('send_mail', 'Engagement', 'Send Mail');
const chat = () => eventSimple('chat', 'Engagement', 'Chat Facebook');
const fanpage = () => eventSimple('fanpage', 'Engagement', 'Fanpage');
const downloadIos = () => eventSimple('download_IOS', 'Engagement', 'Donwload App IOS');
const downloadAndroid = () => eventSimple('download_android', 'Engagement', 'Donwload App Android');
const referral = () => eventSimple('referral', 'Engagement', 'Referral SMS');

const register = () => eventSimple('register', 'User - Web', 'Register');
const registedCompleted = () => eventSimple('registedCompleted', 'User - Web', 'Registed Completed');

const sendFeedback = () => eventSimple('send_feedback', 'Order', 'Send Feedback');
const requestInvoice = () => eventSimple('request_invoice', 'Order', 'Request Invoice');

const viewPromotion = () => eventSimple('view_promotion', 'Promotion', 'View Discount Codes');
const selectPromotion = (promotions = []) =>
  event({ action: 'select_content', params: { event_category: 'Promotion', event_label: 'Select Discount Codes', promotions } });
// const removePromotion = () => eventSimple('remove_promotion', 'Promotion', 'Remove Discount Codes');
const exchangePoint = () => eventSimple('exchange_point', 'Promotion', 'Redeem Accumulation Points');

const reOrderShowPopup = () => eventSimple('re_order_click', 'ReOrder', 'Show popup re-order');
const reOrderClickOk = () => eventSimple('re_order_click_ok', 'ReOrder', 'Click ok re-order');
const reOrderClickCancel = () => eventSimple('re_order_click_cancel', 'ReOrder', 'Click cancel re-order');

const voteV2 = (state) => eventSimpleV2('click', 'user_choose_option', state);
const surveyV2 = (state) => eventSimpleV2('click', 'user_click_survey', state);

export const addToCart = (product) => {
  eventEcommerce({
    action: 'add_to_cart',
    products: [product],
    params: {
      currency: 'VND',
      event_category: 'Product',
      event_label: 'Add To Cart',
    },
  });
};

const addToWishList = (product) => {
  eventEcommerce({
    action: 'add_to_wishlist',
    params: {
      event_category: 'Product',
      event_label: 'Add To Wishlist',
    },
    products: [product],
  });
};

const removeFromCart = (product) => {
  eventEcommerce({
    action: 'remove_from_cart',
    params: {
      event_category: 'Product',
      event_label: 'Remove from cart',
    },
    products: [product],
  });
};

const beginCheckout = (cartInfo) => {
  const { cartItems, redeemApplyResult = [] } = cartInfo || {};

  const voucherInfo = redeemApplyResult[0] || null;
  const { code = null, canUse = false } = voucherInfo || {};

  eventEcommerce({
    action: 'begin_checkout',
    params: {
      coupon: canUse && code,
      event_category: 'Order',
      event_label: 'Go To Checkout',
    },
    products: cartItems,
  });
};

const purchase = ({ cartId, cartItems = [], totalPrice = 0, deliveryMethodFee = 0, redeemApplyResult = [] }) => {
  const voucherInfo = redeemApplyResult[0] || null;
  const { code = null, canUse = false } = voucherInfo || {};

  eventEcommerce({
    action: 'purchase',
    params: {
      id: cartId,
      coupon: canUse && code,
      transaction_id: cartId,
      shipping: deliveryMethodFee || 0,
      value: totalPrice,
      currency: 'VND',
      event_category: 'Order',
      event_label: 'Action Checkout',
    },
    products: cartItems,
  });
};

const viewContent = ({ product }) => {
  eventEcommerce({
    action: 'click_item',
    params: {
      content_type: 'Product',
      event_category: 'Product',
      event_label: `View Product Detail Has SKU:${product?.sku || ''}`,
    },
    products: [product],
  });
};

const refund = ({ orderId, products, totalPrice, redeemCode = [] }) =>
  eventEcommerce({
    action: 'refund',
    params: {
      currency: 'VND',
      transaction_id: orderId,
      coupon: (redeemCode.length > 0 && redeemCode[0]) || null,
      id: orderId,
      value: totalPrice,
      event_category: 'Order',
      event_label: 'Cancel Order',
    },
    products,
  });

export default {
  refund,
  pageview,
  event,
  addToCart,
  viewContent,
  eventEcommerce,
  removeFromCart,
  beginCheckout,
  timeTracking,
  purchase,
  addToWishList,
  clickRewardDetail,
  clickUsePromoCode,
  viewBlog,
  viewCareer,
  viewSeller,
  popup,
  callHotline,
  sendEmail,
  fanpage,
  downloadAndroid,
  clickViewAllPromotion,
  downloadIos,
  referral,
  chat,
  sendFeedback,
  requestInvoice,
  viewPromotion,
  exchangePoint,
  reOrderShowPopup,
  reOrderClickCancel,
  reOrderClickOk,
  selectPromotion,
  register,
  registedCompleted,
  displayTopSearch,
  clickTopSearch,
  displayCountDownBar,
  showModalDiscovery,
  clickMenubar,
  clickCountdownbar,
  clickBanner,
  clickTabInProduct,
  clickViewShop,
  clickCategoryDrugsTitle,
  clickCategoryManufacturerTitle,
  clickTrackingOrder,
  TIME_TO_TRACK,
  addToCartInPage,
  clickTagInProduct,
  clickViewAllProductSameManufacturer,
  clickViewAllProductSameIngredient,
  viewItemInPage,
  clickViewAllSellers,
  clickSellerNameID,
  clickFlagshipStoreNameID,
  scrollDepth,
  mapPathToCategory,
  clickActivePromotionButton,
  clickNextPromotionButton,
  clickUseDirectlyPromoCode,
  clickSearch,
  searchInQuickOrder,
  toggleMobileV2,
  showBanner,
  voteV2,
  surveyV2,
};
