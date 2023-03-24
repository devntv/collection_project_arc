export const API_HOST = process.env.API_HOST || '/backend';
export const API_HOST_DOMAIN = process.env.NEXT_PUBLIC_API_HOST_DOMAIN;
export const API_CHAT_DOMAIN = process.env.NEXT_PUBLIC_API_CHAT_DOMAIN;
export const API_PRD_HOST_DOMAIN = process.env.NEXT_PUBLIC_API_PRD_HOST_DOMAIN;
// export const API_HOST = 'https://v2api.thuocsi.vn/';
export const MOCK_API_HOST = process.env.MOCK_API_HOST || '/api';
export const BASIC_AUTHEN = process.env.NEXT_PUBLIC_BASIC_AUTHEN || '';
export const DOMAIN_SELLER_CENTER = process.env.NEXT_PUBLIC_DOMAIN_SELLER_CENTER || '';
export const FACEBOOK_MESSENGER_ID = process.env.NEXT_PUBLIC_FACEBOOK_MESSENGER_ID || '';
export const DISCOVERY_URL = process.env.NEXT_PUBLIC_DISCOVERY || '';
// export const WEB_HOST = process.env.WEB_HOST || '';
export const NEXT_I18NEXT_NAME_SPACES = ['common', 'apiErrors'];
export const DOMAIN_TS = process.env.NEXT_PUBLIC_DOMAIN_TS || '';
export const DOMAIN_TS_MIEN_BAC = process.env.NEXT_PUBLIC_DOMAIN_TS_MIEN_BAC || '';
export const ENV = process.env.NEXT_PUBLIC_ENV || 'stg';
export const GG_IMAGE = process.env.NEXT_PUBLIC_DOMAIN_GG_IMAGE || 'https://storage.googleapis.com';
export const PROXY_IMAGE = process.env.NEXT_PUBLIC_DOMAIN_PROXY_IMAGE || '//img-proxy.v2-dev.thuocsi.vn';
export const isPrd = ENV === 'prd';
export const LINK_LICENSE =
  process.env.NEXT_PUBLIC_LINK_LICENSE ||
  'https://buymedv1prdgcpbackup.blob.core.windows.net/buymed-storage/trading_license/1.%20Trading%20License%20-%20Buymed%20(GC%2020%20June%202019)%20(VN).pdf?sv=2020-08-04&ss=bqtf&srt=sco&sp=rwdlacuptfxi&se=2021-08-27T12:47:55Z&sig=EpT7zqi%2BHnb%2F07cVHPnazba9vkWuZbAP42dcbDITOCU%3D&_=1630039704966';

export const INSIDER_ID = process.env.NEXT_PUBLIC_INSIDER_ID;
export const INSIDER_API_DOMAIN = process.env.NEXT_PUBLIC_INSIDER_API_DOMAIN;
export const SHOW_INSIDER_RECOMMEND = process.env.NEXT_PUBLIC_SHOW_INSIDER_RECOMMEND === 'on';
export const THUOCSI_DOMAIN = '/';
export const DOMAIN_FEEDBACK = process.env.NEXT_PUBLIC_DOMAIN_FEEDBACK || '';
export const FACEBOOK_PIXEL_CODE = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_CODE || '';

export const PROVINCES_TURN_OFF_PAYMENT = process.env.NEXT_PUBLIC_FEATURE_PROVINCE_TURNOFF_PAYMENT || [];
export const PROVINCES_DELAY_DELIVERY = process.env.NEXT_PUBLIC_FEATURE_PROVINCE_DELAY_DELIVERY || [];
export const NOTIFY_IN_TOP_BAR = process.env.NEXT_PUBLIC_FEATURE_NOTI_TOPBAR || '';
export const NOTIFY_IN_TOP_BAR_UIV2 = process.env.NEXT_PUBLIC_FEATURE_NOTI_TOPBAR_UIV2 || '';
export const MAX_SKU_IN_ORDER = process.env.NEXT_PUBLIC_FEATURE_MAX_SKU_IN_ORDER || 0;
export const MAX_ORDER_IN_WEEK = process.env.NEXT_PUBLIC_FEATURE_MAX_ORDER_IN_WEEK || 0;

/// Feature on off here
export const FEATURE_WISHLIST = !process.env.NEXT_PUBLIC_FEATURE_WISHLIST || process.env.NEXT_PUBLIC_FEATURE_WISHLIST === 'on';
export const FEATURE_RE_ORDER = !process.env.NEXT_PUBLIC_FEATURE_RE_ORDER || process.env.NEXT_PUBLIC_FEATURE_RE_ORDER === 'on';
export const FEATURE_LEVEL = !process.env.NEXT_PUBLIC_FEATURE_LEVEL || process.env.NEXT_PUBLIC_FEATURE_LEVEL === 'on';
export const FEATURE_BANK_ACCOUNT = !process.env.NEXT_PUBLIC_FEATURE_BANK_ACCOUNT || process.env.NEXT_PUBLIC_FEATURE_BANK_ACCOUNT === 'on';
export const SELLER_CODES_REQUIRE_GPP = process.env.NEXT_PUBLIC_SELLER_CODES_REQUIRE_GPP || [];

export const FEATURE_STORE = !process.env.NEXT_PUBLIC_FEATURE_STORE || process.env.NEXT_PUBLIC_FEATURE_STORE === 'on';
/// QR CODE
export const QR_CODE_DOMAIN = process.env.NEXT_PUBLIC_QR_CODE_DOMAIN;

export const TTL_CACHE_LOCAL = process.env.NEXT_PUBLIC_TTL_CACHE_LOCAL;
export const TTL_CACHE_SERVER = process.env.NEXT_PUBLIC_TTL_CACHE_SERVER || 900;

export const LIKE_FEEDBACK_CODE = process.env.NEXT_PUBLIC_LIKE_FEEDBACK_CODE || '';
export const DISLIKE_FEEDBACK_CODE = process.env.NEXT_PUBLIC_DISLIKE_FEEDBACK_CODE || '';
export const TIME_PREVENT_FEEDBACK_PRICE = process.env.NEXT_PUBLIC_TIME_PREVENT_FEEDBACK_PRICE || 1000;

// tag new
export const TAG_NEW = process.env.NEXT_PUBLIC_TAG_NEW || '';

// btn return order at /my-order
export const RETURN_ORDER_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN_POS || '';
export const RETURN_ORDER_DOMAIN_TICKETID = process.env.NEXT_PUBLIC_DOMAIN_POS_TICKETID || '';
// tag 7 ngay
export const TAG_7DAYS = process.env.NEXT_PUBLIC_TAG_7DAY || '';
export const REGION_MB = process.env.NEXT_PUBLIC_MIENBAC_REGIONCODE || '';

export const GTM = process.env.NEXT_PUBLIC_GTM || '';

export const DOMAIN_FLAGSHIP_STORE = process.env.NEXT_PUBLIC_WEB_SELLER_FLAGSHIP_STORE || '';
export const GENERAL_DOMAIN = process.env.NEXT_PUBLIC_GENERAL_DOMAIN || '';
export const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || '';
export const WEB_HOST = process.env.NEXT_PUBLIC_WEB_HOST || '';
export const DOMAIN_WEB_HOST = process.env.NEXT_PUBLIC_DOMAIN_WEB_HOST || '';

export const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN || 'ts_auth_access_token_v2';
export const ACCESS_TOKEN_LONGLIVE = process.env.NEXT_PUBLIC_ACCESS_TOKEN_LONG_LIVE || 'ts_auth_access_token_longlive_v2';

export const MAX_ITEM_IN_CART = process.env.NEXT_PUBLIC_MAX_ITEM_IN_CART || 200;
export const FEATURE_SHOW_BUTTON_VERIFY_CART =
  !process.env.NEXT_PUBLIC_FEATURE_SHOW_BUTTON_VERIFY_CART || process.env.NEXT_PUBLIC_FEATURE_SHOW_BUTTON_VERIFY_CART === 'on';

export const TAG_HANG_DAT_TRUOC = 'HANG_DAT_TRUOC';

export const BOT_TELE_ORDER_TOKEN = process.env.NEXT_PUBLIC_BOT_TELE_ORDER_ALERT || null;
export const BOT_TELE_CHANNEL_ID = process.env.NEXT_PUBLIC_TELE_CHANNEL_ID || '-644658115';

export const DOMAIN_IMAGE_CACHE_LOADER = process.env.NEXT_PUBLIC_LOADER_IMAGE || '';

export const REASON_CANCEL_ORDER = process.env.NEXT_PUBLIC_REASON_CANCEL_ORDER || '';
export const REASON_VOUCHER_BIRTHDAY = process.env.NEXT_PUBLIC_VOUCHER_BIRTHDAY_CODE || '';

// Image
export const PROVINCES_IMAGE_FULL_WIDTH = process.env.NEXT_PUBLIC_PROVINCES_IMAGE_FULL_WIDTH || [];
export const IS_USE_FULL_WIDTH_ALL = PROVINCES_IMAGE_FULL_WIDTH?.includes('00');
export const FEATURE_CHAT = process.env.NEXT_PUBLIC_FEATURE_CHAT === 'on' || false;

// web service apis
export const IS_WEB_SERVICE = process.env.NEXT_PUBLIC_WEB_SERVICE === 'on';
export const IS_WEB_SERVICE_SEARCH_LITE = process.env.NEXT_PUBLIC_WEB_SERVICE_SEARCH_LITE === 'on';

// ao-1409: new logo
export const NEW_MISSING_IMAGE =
  process.env.NEXT_PUBLIC_MISSING_LOGO || 'https://storage.googleapis.com/thuocsi-live/web/static/images/new-missing-logo.svg';

export const HOTLINE = process.env.NEXT_PUBLIC_HOTLINE || '02873008840';
export const HOTLINE_TEXT = process.env.NEXT_PUBLIC_HOTLINE_TEXT || '028 7300 8840';

// cdn
export const DOMAIN_CDN = process.env.NEXT_PUBLIC_CDN || '';
