import { INSIDER_API_DOMAIN } from 'sysconfig';

const INSIDER_API_PREFIX = `${INSIDER_API_DOMAIN}/thuocsivn/vi_VN`;
const MOST_VIEWED = `${INSIDER_API_PREFIX}/most/viewed/partner`;
const USER_BASED = `${INSIDER_API_PREFIX}/user`;

export const INSIDER_API = {
  MOST_VIEWED,
  USER_BASED,
};

const ACCOUNT_API_PREFIX = '/core/account/v1';

const AUTHENTICATION = `${ACCOUNT_API_PREFIX}/authentication`;
const GET_ACCOUNT_INFO = `${ACCOUNT_API_PREFIX}/me`;
const PASSWORD_RECOVERY = `${ACCOUNT_API_PREFIX}/password-recovery`;
const PASSWORD_NEW = `${GET_ACCOUNT_INFO}/password`;
const LOGOUT = `${GET_ACCOUNT_INFO}/logout`;
export const ACCOUNT_API = {
  AUTHENTICATION,
  GET_ACCOUNT_INFO,
  PASSWORD_RECOVERY,
  PASSWORD_NEW,
  LOGOUT,
};

// MARKETPLACE

// PRICING
const PRICING_API_PREFIX = '/marketplace/pricing/v1';
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
const ADDRESS_ACCOUNT = `${INFO}/account/address`;
const LOYALTY_LIST = `${CUSTOMER_API_PREFIX}/loyalty/list`;
const LOYALTY = `${INFO}/loyalty`;
const HISTORY_LOYALTY_LIST = `${INFO}/history-loyalty/list`;
const UPLOAD_FILE = `${CUSTOMER_API_PREFIX}/upload/file`;
// const SIGN_IN = `${CUSTOMER_API_PREFIX}/sign-in`;
const SIGN_IN = `${CUSTOMER_API_PREFIX}/authentication`;

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
  ADDRESS_ACCOUNT,
  LOYALTY_LIST,
  HISTORY_LOYALTY_LIST,
  LOYALTY,
  UPLOAD_FILE,
  SIGN_IN,
};

// PRODUCTS

const CONTENT_API_PREFIX = '/marketplace/content/v1';
const STATIC_CONTENT = `${CONTENT_API_PREFIX}/static`;
export const CONTENT_API = {
  STATIC_CONTENT,
};

const PRODUCT_API_PREFIX = '/marketplace/product/v1';

export const PRODUCT_API = {
  INGREDIENT: `${PRODUCT_API_PREFIX}/ingredients`,
  INGREDIENT_LIST: `${PRODUCT_API_PREFIX}/ingredients/list`,
  INGREDIENT_PRODUCT_LIST: `${PRODUCT_API_PREFIX}/ingredients/list`,
  MANUFACTURER: `${PRODUCT_API_PREFIX}/manufacturers`,
  MANUFACTURER_LIST: `${PRODUCT_API_PREFIX}/manufacturers/list`,
  MANUFACTURER_DETAIL: `${PRODUCT_API_PREFIX}/manufacturer`,
  MANUFACTURER_INFO: `${PRODUCT_API_PREFIX}/manufacturer/info`,
  PRODUCT_LIST: `${PRODUCT_API_PREFIX}/products/list`,
  PRODUCT_LIST_COLLECTION: `${PRODUCT_API_PREFIX}/collection/page`,
  TAGS: `${PRODUCT_API_PREFIX}/tags/list`,
  TABS_ACTIVE: `${PRODUCT_API_PREFIX}/tabs/active`,
  DEALS: `${PRODUCT_API_PREFIX}/products/deal/list`,
  CATEGORY_LIST: `${PRODUCT_API_PREFIX}/category/list`,
  CATEGORY_INFO: `${PRODUCT_API_PREFIX}/categories/info`,
};

const CORE_MASTER_DATA_PREFIX = '/core/master-data/v1';
const PROVINCE_LIST = `${CORE_MASTER_DATA_PREFIX}/provinces/list`;
const COUNTRIES_LIST = `${CORE_MASTER_DATA_PREFIX}/country/list`;
const DISTRICT_LIST = `${CORE_MASTER_DATA_PREFIX}/districts`;
const ADMINISTRATIVE = `${CORE_MASTER_DATA_PREFIX}/administratives/list`;
const PROVINCE = `${CORE_MASTER_DATA_PREFIX}/province`;
const DISTRICT = `${CORE_MASTER_DATA_PREFIX}/district`;
const WARD = `${CORE_MASTER_DATA_PREFIX}/ward/list`;
const BANK_LIST = `${CORE_MASTER_DATA_PREFIX}/bank/list`;
const BANK_BRANCH_LIST = `${CORE_MASTER_DATA_PREFIX}/bank-branch/list`;
const BANK_BY_ID = `${CORE_MASTER_DATA_PREFIX}/bank`;
const BANK_BRANCH_BY_ID = `${CORE_MASTER_DATA_PREFIX}/bank-branch`;
const REGIONS = `${CORE_MASTER_DATA_PREFIX}/region/list`;

export const CORE_API = {
  PROVINCE_LIST,
  COUNTRIES_LIST,
  DISTRICT_LIST,
  PROVINCE,
  DISTRICT,
  WARD,
  ADMINISTRATIVE,
  CORE_MASTER_DATA_PREFIX,
  BANK_LIST,
  BANK_BRANCH_LIST,
  BANK_BY_ID,
  BANK_BRANCH_BY_ID,
  REGIONS,
};

const CART_API_PREFIX = '/marketplace/order/v1';
const CART_INFO = `${CART_API_PREFIX}/cart`;
const DELIVERY_METHOD_UPDATE = `${CART_INFO}/delivery-method`;
const PAYMENT_METHOD_UPDATE = `${CART_INFO}/payment-method`;
const CART_ADD = `${CART_API_PREFIX}/cart/add`;
const CART_REMOVE = `${CART_API_PREFIX}/cart/remove`;
const CART_UPDATE_REDEEM_CODE = `${CART_API_PREFIX}/cart/promotion`;

export const CART_API = {
  CART_INFO,
  CART_ADD,
  CART_REMOVE,
  CART_UPDATE_REDEEM_CODE,
  DELIVERY_METHOD_UPDATE,
  PAYMENT_METHOD_UPDATE,
};

const ORDER_API_PREFIX = '/marketplace/order/v1';
export const ORDER_ITEM_LIST = `${ORDER_API_PREFIX}/me/order-item`;
export const ORDER_INFO = `${ORDER_API_PREFIX}/me/order`;
export const MY_ORDER_LIST = `${ORDER_API_PREFIX}/me/orders`;

export const ORDER_API = {
  ORDER_ITEM_LIST,
  ORDER_INFO,
  MY_ORDER_LIST,
};

// promotion
// /marketplace/promotion/v1/promotion
const PROMOTION_API_PREFIX = '/marketplace/promotion/v1';
const PROMOTION_ALL = `${PROMOTION_API_PREFIX}/promotion`;
const PROMOTION_DETAI_VOUCHER_CODE = `${PROMOTION_API_PREFIX}/voucher`;
const VOUCHER = `${PROMOTION_API_PREFIX}/me/voucher`;

export const PROMOTION_API = {
  PROMOTION_ALL,
  PROMOTION_API_PREFIX,
  PROMOTION_DETAI_VOUCHER_CODE,
  VOUCHER,
};

// Supplier API

const SUPPLIER_API_PREFIX = '/seller/core/v1';
const SUPPLIER_INFO = `${SUPPLIER_API_PREFIX}/seller/info`;

export const SUPPLIER_API = {
  SUPPLIER_INFO,
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
const PRODUCT_FILE = `${MARKETING_API_PREFIX}/product-file`;

export const MARKETING_API = {
  BANNER,
  HASHTAG_TOP_SEARCH,
  PRODUCT_FILE,
};

const TICKET_API_PREFIX = '/marketplace/ticket/v1';
const TICKET_LIST = `${TICKET_API_PREFIX}/me/ticket/list`;
const TICKET = `${TICKET_API_PREFIX}/me/ticket`;
const FEEDBACK_WITHOUT_LOGIN = `${TICKET_API_PREFIX}/feedback`;
const TICKET_REASONS = `${TICKET_API_PREFIX}/reason/list`;
const TICKET_UPLOAD = `${TICKET_API_PREFIX}/upload`;
const TICKET_CREATESUPPORT = `${TICKET_API_PREFIX}/me/ticket`;
export const TICKET_API = {
  TICKET,
  TICKET_LIST,
  FEEDBACK_WITHOUT_LOGIN,
  TICKET_REASONS,
  UPLOAD_FILE: TICKET_UPLOAD,
  TICKET_CREATESUPPORT,
};

export const STATISTIC_PURCHASED_PRODUCT_API = '/api/statistic/purchased-product';

// Tracking event
const MONITOR_API_PREFIX = '/monitoring/collector/v1';
const COLLECTOR = `${MONITOR_API_PREFIX}/event`;

export const MONITOR_API = {
  COLLECTOR,
};
