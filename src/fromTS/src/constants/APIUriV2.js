// file containt file path

const ACCOUNT_API_PREFIX = '/core/account/v1';

const AUTHENTICATION = `${ACCOUNT_API_PREFIX}/authentication`;
const GET_ACCOUNT_INFO = `${ACCOUNT_API_PREFIX}/me`;
const PASSWORD_RECOVERY = `${ACCOUNT_API_PREFIX}/password-recovery`;
export const ACCOUNT_API = {
  AUTHENTICATION,
  GET_ACCOUNT_INFO,
  PASSWORD_RECOVERY,
};

// MARKETPLACE

// PRICING
const PRICING_API_PREFIX = '/marketplace/pricing/v2';
const DELIVERY_METHOD = `${PRICING_API_PREFIX}/delivery-platform/list`;
const DELIVERY_METHOD_DETAIL = `${PRICING_API_PREFIX}/delivery-platform`;
const PAYMENT_METHOD = `${PRICING_API_PREFIX}/payment-method/list`;
const PAYMENT_METHOD_DETAIL = `${PRICING_API_PREFIX}/payment-method`;
export const PRICING_API = {
  PAYMENT_METHOD,
  DELIVERY_METHOD,
  PAYMENT_METHOD_DETAIL,
  DELIVERY_METHOD_DETAIL,
};

// CUSTOMER
const CUSTOMER_API_PREFIX = '/marketplace/customer/v1';

const REGISTER = `${CUSTOMER_API_PREFIX}/register`;
const REGISTER_GUEST = `${CUSTOMER_API_PREFIX}/guest`;
const INFO = `${CUSTOMER_API_PREFIX}/me`;
const WALLET = `${CUSTOMER_API_PREFIX}/wallets`;
const ORDER = `${CUSTOMER_API_PREFIX}/orders`;
const REFERRAL = `${CUSTOMER_API_PREFIX}/me/reference/list`;
const SEND_SMS = `${CUSTOMER_API_PREFIX}/me/reference`;
const RETRY_SEND_SMS = `${CUSTOMER_API_PREFIX}/me/reference/sms`;
const PROMO = `${CUSTOMER_API_PREFIX}/promos`;
const BANK_ACCOUNT = `${INFO}/account/bank`;
const BANK_ACCOUNT_LIST = `${INFO}/bank/list`;
const BANK_ACCOUNT_INFO = `${INFO}/bank`;
const INVOICE_INFO = `${CUSTOMER_API_PREFIX}/me/invoice-info`;
const INVOICE_LIST = `${CUSTOMER_API_PREFIX}/me/invoice-info/list`;
const ADDRESS_ACCOUNT = `${INFO}/account/address`;
const LOYALTY_LIST = `${CUSTOMER_API_PREFIX}/loyalty/list`;
const LOYALTY = `${INFO}/loyalty`;
const HISTORY_LOYALTY_LIST = `${INFO}/history-loyalty/list`;
const UPLOAD_FILE = `${CUSTOMER_API_PREFIX}/upload/file`;
// const SIGN_IN = `${CUSTOMER_API_PREFIX}/sign-in`;
// /marketplace/customer/v1/authentication
const SIGN_IN = `${CUSTOMER_API_PREFIX}/authentication`;
const LEVEL_LIST = `${CUSTOMER_API_PREFIX}/level/list`;
const CACULATE_POINTS_CUSTOMER = `${CUSTOMER_API_PREFIX}/setting`;

export const API_UPLOAD_DOCUMENT = '/core/file-manager/v1/upload/document';
export const API_UPLOAD_IMAGE = '/core/file-manager/v1/upload/image';
export const API_GEN_TOKEN = '/core/file-manager/v1/access-token/gen';

export const API_UPLOAD = '/upload';
export const API_UPLOAD_FEEDBACK_MOCK = '/upload/feedback';

export const API_UPLOAD_FILE = '/core/file-manager/v1/upload/document';

const UPDATE_INFO_ACCOUNT = `${CUSTOMER_API_PREFIX}/me/basic-info`;
const UPDATE_INFO_ENTERPRISE = `${CUSTOMER_API_PREFIX}/me/business-info`;

export const CUSTOMER_API = {
  REGISTER,
  INFO,
  WALLET,
  ORDER,
  REFERRAL,
  PROMO,
  SEND_SMS,
  RETRY_SEND_SMS,
  REGISTER_GUEST,
  BANK_ACCOUNT,
  BANK_ACCOUNT_LIST,
  BANK_ACCOUNT_INFO,
  INVOICE_INFO,
  INVOICE_LIST,
  ADDRESS_ACCOUNT,
  LOYALTY_LIST,
  HISTORY_LOYALTY_LIST,
  LOYALTY,
  UPLOAD_FILE,
  SIGN_IN,
  LEVEL_LIST,
  UPDATE_INFO_ACCOUNT,
  UPDATE_INFO_ENTERPRISE,
  CACULATE_POINTS_CUSTOMER,
};

// PRODUCTS

const CONTENT_API_PREFIX = '/marketplace/content/v1';
const STATIC_CONTENT = `${CONTENT_API_PREFIX}/static`;
export const CONTENT_API = {
  STATIC_CONTENT,
};

const PRODUCT_API_PREFIX = '/marketplace/product/v2';

export const PRODUCT_API = {
  INGREDIENT: `${PRODUCT_API_PREFIX}/ingredient`,
  INGREDIENT_LIST: `${PRODUCT_API_PREFIX}/ingredient/list`,
  INGREDIENT_PRODUCT_LIST: `${PRODUCT_API_PREFIX}/ingredients/list`,
  MANUFACTURER: `${PRODUCT_API_PREFIX}/manufacturers`,
  MANUFACTURER_LIST: `${PRODUCT_API_PREFIX}/manufacturer/list`,
  MANUFACTURER_DETAIL: `${PRODUCT_API_PREFIX}/manufacturer`,
  MANUFACTURER_INFO: `${PRODUCT_API_PREFIX}/manufacturer`,
  PRODUCT_LIST: `${PRODUCT_API_PREFIX}/search/list`,
  PRODUCT_LIST_COLLECTION: `${PRODUCT_API_PREFIX}/collection/page`,
  TAGS: `${PRODUCT_API_PREFIX}/tag/list`,
  TABS_ACTIVE: `${PRODUCT_API_PREFIX}/tabs/active`,
  DEALS: `${PRODUCT_API_PREFIX}/products/deal/list`,
  DEALS_DETAIL: `${PRODUCT_API_PREFIX}/deal/list`,
  CATEGORY_LIST: `${PRODUCT_API_PREFIX}/category/list`,
  CATEGORY_INFO: `${PRODUCT_API_PREFIX}/category`,
  WISHLIST: `${PRODUCT_API_PREFIX}/me/wishlist`,
  WISHLIST_LIST: `${PRODUCT_API_PREFIX}/me/wishlist/list`,
  RECENT_PRODUCTS: `${PRODUCT_API_PREFIX}/me/recent-products`,
  SKUS_BY_ID: `${PRODUCT_API_PREFIX}/sku/list-by-product`,
  SELLER: `${PRODUCT_API_PREFIX}/sku/list`,
  SKU_LIMIT: `${PRODUCT_API_PREFIX}/sku-limit/list`,
  EFFICACY_LIST: `${PRODUCT_API_PREFIX}/efficacy/list`,
  EFFICACY_COMBINED_LIST: `${PRODUCT_API_PREFIX}/efficacy-combined/list`,
  SELLER_CATEGORY_LIST: `${PRODUCT_API_PREFIX}/seller-category`,
  PRODUCT_API_PREFIX: `${PRODUCT_API_PREFIX}/product/detail`,
};

const CORE_MASTER_DATA_PREFIX = '/core/master-data/v1';
const PROVINCE_LIST = `${CORE_MASTER_DATA_PREFIX}/provinces/list`;
const DISTRICT = `${CORE_MASTER_DATA_PREFIX}/districts`;
const ADMINISTRATIVE = `${CORE_MASTER_DATA_PREFIX}/administratives/list`;
const REGIONS = `${CORE_MASTER_DATA_PREFIX}/region/list`;

export const CORE_API = {
  PROVINCE_LIST,
  DISTRICT,
  ADMINISTRATIVE,
  INGREDIENT_LIST: `${CORE_MASTER_DATA_PREFIX}/ingredient/list`,
  REGIONS,
};

const CART_API_PREFIX = '/marketplace/order/v2';
const CART_INFO = `${CART_API_PREFIX}/cart`;
const DELIVERY_METHOD_UPDATE = `${CART_INFO}/delivery-method`;
const PAYMENT_METHOD_UPDATE = `${CART_INFO}/payment-method`;
const CART_ADD = `${CART_API_PREFIX}/cart/add`;
const CART_REMOVE = `${CART_API_PREFIX}/cart/remove`;
const CART_UPDATE_REDEEM_CODE = `${CART_API_PREFIX}/cart/voucher`;
const CART_ITEM = `${CART_API_PREFIX}/cart-item`;
const CART_ITEM_LIST = `${CART_API_PREFIX}/cart-item/list`;
const RE_ORDER = `${CART_API_PREFIX}/cart/re-order`;
const CONFIRM = `${CART_API_PREFIX}/cart/confirm`;
const DELIVERY_LIMITATION = `${CART_API_PREFIX}/delivery-limitation`;
const SELECT_ITEM = `${CART_INFO}/select`;
const VERIFY_CART = `${CART_INFO}/verify`;

export const CART_API = {
  CART_INFO,
  CART_ADD,
  CART_REMOVE,
  CART_UPDATE_REDEEM_CODE,
  DELIVERY_METHOD_UPDATE,
  PAYMENT_METHOD_UPDATE,
  RE_ORDER,
  CART_ITEM,
  CART_ITEM_LIST,
  CONFIRM,
  DELIVERY_LIMITATION,
  SELECT_ITEM,
  VERIFY_CART,
};

const ORDER_API_PREFIX = '/marketplace/order/v2';
export const ORDER_ITEM_LIST = `${ORDER_API_PREFIX}/order-item/list`;
export const ORDER_INFO = `${ORDER_API_PREFIX}/order`;
export const MY_ORDER_LIST = `${ORDER_API_PREFIX}/order/list`;
const SKU_HISTORY = `${ORDER_API_PREFIX}/sku-limit/history-today`;

export const SEARCH_ORDER_ID = `${CART_API_PREFIX}/order`;
export const REVERT = `${ORDER_API_PREFIX}/cart/revert`;
export const SEARCH_ORDER = `${ORDER_API_PREFIX}/order/search`;
export const ORDER_API = {
  ORDER_ITEM_LIST,
  ORDER_INFO,
  MY_ORDER_LIST,
  REVERT,
  SKU_HISTORY,
  SEARCH_ORDER_ID,
};

// promotion
// /marketplace/promotion/v1/promotion
const PROMOTION_API_PREFIX = '/marketplace/promotion/v1';
const PROMOTION_ALL = `${PROMOTION_API_PREFIX}/promotion`;
const PROMOTION_DETAI_VOUCHER_CODE = `${PROMOTION_API_PREFIX}/voucher`;
const PROMOTION_CAMPAIGN = `/marketplace/promotion/v1/campaign/active/list`;
const VOUCHER = `${PROMOTION_API_PREFIX}/me/voucher`;
const MYVOUCHER_HISTORY = `${VOUCHER}/history`;
const PROMOLISTS_DETAIL_PRODUCT = `${PROMOTION_API_PREFIX}/voucher/list-by-sku`;

export const PROMOTION_API = {
  PROMOTION_ALL,
  PROMOTION_API_PREFIX,
  PROMOTION_DETAI_VOUCHER_CODE,
  PROMOTION_CAMPAIGN,
  VOUCHER,
  MYVOUCHER_HISTORY,
  PROMOLISTS_DETAIL_PRODUCT,
};

// Supplier API

const SUPPLIER_API_PREFIX = '/seller/core/v1';
const SUPPLIERS = `${SUPPLIER_API_PREFIX}/account/list`;
const SUPPLIER_INFO = `${SUPPLIER_API_PREFIX}/seller/info`;
const SUPPLIER_ACCOUNT_INFO = `${SUPPLIER_API_PREFIX}/account-by-slug`;
const SUPPLIER_BANNER = `${SUPPLIER_API_PREFIX}/store/banner-for-web`;
const SUPPLIER_STORE_LIST = `${SUPPLIER_API_PREFIX}/store/list`;
const SUPPLIER_CONFIG = `${SUPPLIER_API_PREFIX}/seller/config`;
const STORE_INFO = `${SUPPLIER_API_PREFIX}/store/info-for-web`;

// seller/core/v1/store/list?q={\"sellerCode\":\"4GQEM8DN9F\", \"status\": \"ACTIVE\"}"
export const SUPPLIER_API = {
  SUPPLIER_INFO,
  SUPPLIERS,
  SUPPLIER_ACCOUNT_INFO,
  SUPPLIER_BANNER,
  SUPPLIER_STORE_LIST,
  SUPPLIER_CONFIG,
  STORE_INFO,
};

const NOTIFICATION_API_PREFIX = '/integration/notification/v1';
const NOTIFICATION_LIST = `${NOTIFICATION_API_PREFIX}/notification/me`;
const NOTIFICATION_COUNTER = `${NOTIFICATION_API_PREFIX}/notification/me/counter`;
const NOTIFICATION_WSS = `${NOTIFICATION_API_PREFIX}/web-socket`;
const NOTIFICATION = `${NOTIFICATION_API_PREFIX}/notification`;
const NOTIFICATION_ALL = `${NOTIFICATION_API_PREFIX}/notification/all`;

export const NOTIFICATION_API = {
  NOTIFICATION_COUNTER,
  NOTIFICATION_LIST,
  NOTIFICATION_WSS,
  NOTIFICATION_ALL,
  NOTIFICATION,
};

const SETTING_API_PREFIX = '/marketplace/marketing/v1';
const SETTING_LIST = `${SETTING_API_PREFIX}/settings/all`;

export const SETTING_API = {
  SETTING_LIST,
};

const MARKETING_API_PREFIX = '/marketplace/marketing/v1';
const BANNER = `${MARKETING_API_PREFIX}/banners/available`;
const HASHTAG_TOP_SEARCH = `${MARKETING_API_PREFIX}/hashtag-search/list`;
const COUNTDOWN_BAR = `${MARKETING_API_PREFIX}/countdownbar/list`;
const THUMBNAIL = `${MARKETING_API_PREFIX}/meta-thumbnail/list`;
const MENU_BAR = `${MARKETING_API_PREFIX}/menu-bar`;
const INSIDER_SETTING = `${MARKETING_API_PREFIX}/insider-setting`;
const CHAT_SETTING = `${MARKETING_API_PREFIX}/setting?key=chat_config`;

export const MARKETING_API = {
  BANNER,
  HASHTAG_TOP_SEARCH,
  COUNTDOWN_BAR,
  THUMBNAIL,
  MENU_BAR,
  INSIDER_SETTING,
  CHAT_SETTING,
};

const RETURN_ORDER = '/marketplace/ticket/v1/return-ticket/self-list';
const VERIFY_RETURN_ORDER = '/drugstore/inventory/v1/inbound-session/verify-complete';
const TICKET_API_PREFIX = '/marketplace/ticket/v1';
const TICKET_LIST = `${TICKET_API_PREFIX}/me/ticket/list`;
const TICKET = `${TICKET_API_PREFIX}/me/ticket`;
const TICKET_REASONS = `${TICKET_API_PREFIX}/reason/list`;
const TICKET_DETAIL = `${TICKET_API_PREFIX}/me/ticket`;
const FEEDBACK = `${TICKET_API_PREFIX}/me/ticket/feedback`;
const ACCEPT = `${TICKET_API_PREFIX}/me/ticket/accept`;
const FEEDBACK_WITHOUT_LOGIN = `${TICKET_API_PREFIX}/guest/ticket`;

export const TICKET_API = {
  TICKET,
  TICKET_DETAIL,
  TICKET_REASONS,
  FEEDBACK,
  TICKET_LIST,
  ACCEPT,
  FEEDBACK_WITHOUT_LOGIN,
  RETURN_ORDER,
  VERIFY_RETURN_ORDER,
};

// PRODUCT SEARCH
const FUZZY_API = '/marketplace/product/v2/search/fuzzy';
export const FUZZY_SEARCH = FUZZY_API;

export const REWARDS_API = '/marketplace/promotion/v1/me/gamification/list';
export const REWARD_DETAIL = '/marketplace/promotion/v1/me/gamification';
export const REWARDS_BY_SELLER = '/marketplace/promotion/v1/gamification-by-seller/list';

const SMART_RECOMMENDATION = '/recommendation/product/v1';
const RECOMMEND = `${SMART_RECOMMENDATION}/recommend`;
export const SMART_RECOMMENDATION_API = {
  RECOMMEND,
};

// accounting/core/v1/debt/list
const ACCOUNTING_API_PREFIX = '/accounting/core/v1';

export const ACCOUNTING_API = {
  debt: `${ACCOUNTING_API_PREFIX}/debt/list`,
  DEBT_CHECK: `${ACCOUNTING_API_PREFIX}/debt/check`,
  DEBT_ORDER: `${ACCOUNTING_API_PREFIX}/debt-order/list`,
};

// /payment/wallet/v1/me/transaction/list
const PAYMENT_WALLET = '/payment/wallet/v1';
export const PAYMENT_WALLET_API = {
  TRANSACTIONS: `${PAYMENT_WALLET}/me/transaction/list`,
};

// buyer-service-invoice
export const BUYER_SERVICE_API = '/accounting/invoice/v1/buyer-service-invoice/lite';
// web service frontend-apis
const FRONTEND_APIS_PREFIX = '/marketplace/frontend-apis/v1';

export const FRONTEND_APIS = {
  FUZZY_SEARCH: `${FRONTEND_APIS_PREFIX}/search/fuzzy`,
  PRODUCT_DETAIL: `${FRONTEND_APIS_PREFIX}/product/detail`,
  CART: `${FRONTEND_APIS_PREFIX}/cart`,
  FUZZY_SEARCH_LITE: `${FRONTEND_APIS_PREFIX}/search/fuzzy/lite`,
};
