// TODO: refactor contanst
import { DOMAIN_TS } from 'sysconfig';
import { encodeUrl } from 'utils/StringUtils';
/* eslint-disable operator-linebreak */
// WEB
export const MY_ACCOUNT = '/my-account';
export const MY_ORDER_URL = '/my-order';
export const ABOUT_US_URL = '/about-us';
export const PRIVACY_POLICY_URL = '/privacy-policy';
export const GENERAL_POLICY_URL = '/general-policy';
export const CONDITIONS_OF_USE_URL = '/conditions-of-use';
export const DISPUTE_RESOLUTION_URL = '/dispute-resolution';
export const TERMS_URL = '/terms-and-condition';
export const QUY_CHE_HOAT_DONG_URL = '/static/quy-che-hoat-dong/quy-che-hoat-dong.pdf';
export const CHINH_SACH_BAO_MAT_URL = '/chinh-sach-bao-mat';
export const CHINH_SACH_GIAI_QUYET_KHIEU_NAI_URL = '/chinh-sach-giai-quyet-khieu-nai';
export const REGULATIONS_URL = '/regulations';
export const NOTIFICATIONS = '/notifications';
export const QUICK_ORDER = '/quick-order';
export const CHINH_SACH_DANG_TAI_SAN_PHAM_URL = '/chinh-sach-dang-tai-san-pham';
export const PRODUCT = '/product/[slug]';
export const PRODUCT_LIST = '/products';
export const DEALS = '/deals';
export const PRODUCTS_URL = '/products';
export const PRODUCTS_LOADING_URL = '/products/loading';
export const CART_URL = '/cart';
export const SUPPLIER = '/supplier';
export const INGREDIENT = '/ingredients';
export const MANUFACTURERS = '/manufacturers';
export const CHECKOUT_URL = '/checkout';
export const THANKYOU_URL = '/thankyou';
export const NOT_FOUND_URL = '/404';
export const PROMO_CODES = '/promo-codes';
export const HOME_PAGE = '/';
export const CATEGORIES = '/categories';
export const USER_PROMO_CODES_URL = '/users/my-voucher';
export const KHUYEN_MAI = '/khuyenmai';
export const KHUYEN_MAI_LOADING = '/khuyenmai/loading';
export const SELLERS = '/sellers';
export const SELLERS_LOADING_URL = '/sellers/loading';
export const HOW_TO_UPLOAD_PRODUCTS = '/huong-dan-dang-tai-san-pham';
export const HOW_TO_ORDER_AND_PAYMENT = '/huong-dan-dat-hang-va-thanh-toan';
export const HOW_TO_RETURN_REFUND = '/chinh-sach-doi-tra';
export const PRODUCT_DETAILS_LOADING_URL = '/product/loading';
export const REFERRALS_PAGE = '/users/referrals';
export const LOYALTY_PAGE = '/users/loyalty_points';
export const WISHLIST = '/user/wishlist';
export const BULK_ORDER = '/bulk-order/import';
export const BULK_ORDER_CART = '/bulk-order/cart';
export const BULK_ORDER_LIST = '/bulk-order';
export const DISCOVERY = '/discovery';
export const ACCOUNT = '/users/account';
export const MY_TICKET = '/users/my-ticket';
export const CONVERSATIONS = '/conversations';
export const EXCHANGE_LOYALTY = '/users/exchange-loyalty';
export const MY_VOUCHER_PAGE = '/users/my-voucher';
export const NEW_PRODUCTS_URL = '/sanphammoi';
export const TAG_PAGE = '/tag';

export const getPathProductBySlug = (slug) => `${PRODUCT.replace('[slug]', encodeUrl(slug))}`;
export const getPathProductBySlugWithDomain = (slug) => DOMAIN_TS + getPathProductBySlug(slug);

export const getPathOrderById = (id) => `${`${MY_ORDER_URL}/${id}`}`;
export const getPathOrderByIdWithDomain = (id) => DOMAIN_TS + getPathOrderById(id);

export const getPathTicketById = (id) => `${`${MY_TICKET}?id=${id}`}`;
export const getPathTicketByIdWithDomain = (id) => DOMAIN_TS + getPathTicketById(id);

// SUB DOMAIN
export const PATH_NEWS = 'https://news.thuocsi.com.vn';
export const PATH_CAREER = 'https://career.thuocsi.com.vn';
export const PATH_SUPPLIER = 'https://supplier.thuocsi.vn';
export const CAREER = 'https://career.thuocsi.com.vn/';
export const HELP_CENTER = 'https://phanhoi.thuocsi.vn';
export const THUOCSI_SUPPORT = 'https://thuocsihotro.helpwise.help/';
export const THUOCSI_SUPPORT_SELLER = 'https://thuocsisellercenter.helpwise.help/';
export const PATH_TS_FACEBOOK = 'https://www.facebook.com/thuocsivn/';
export const PATH_TS_ZALO = 'https://zalo.me/1836616064223034882';
export const PATH_TS_LINKED = 'https://www.linkedin.com/company/thuocsivn/';
export const PATH_TS_TIKTOK = 'https://www.tiktok.com/@thuocsi.vietnam?';
export const PATH_SHIPPING_POLICY = '/shipping-policy';
// OUTBOUND

export const PATH_INFO_BILL = 'https://thuocsihotro.helpwise.help';
export const QNA = 'https://thuocsihotro.helpwise.help/';
export const ORDER_GUIDE = 'https://thuocsihotro.helpwise.help/';
export const LICENSE_PDF =
  'https://buymed-storage.s3-ap-southeast-1.amazonaws.com/trading_license/1.+Trading+License+-+Buymed+(GC+20+June+2019)+(VN).pdf';
export const LEGAL_IMAGE = 'https://assets.thuocsi.vn/assets/bct-150ac1809a7ae41e0a4b21f1e1e21a26a2f93ee0c79e5c99cc197dd2fdc988c8.png';
export const FEEDBACK = 'https://cs.stg.thuocsi.vn/feedback';

export const NEW_PRODUCT = 'https://try.thuocsi.vn/daitiechangmoi';

export const WEB = {};

export const ASK_PRODUCT =
  'https://forms.office.com/Pages/ResponsePage.aspx?id=f-ffA68NfkimxyYB5SgTPbGuKhViJltLlJQcOW8IoQpURVY2VU1MTjU1M01LSVdIS0hDSUIzWkZTWC4u';

// DOMAINS_THUOCSI -> domain thuocsi sẽ chạy, các host khác proxy tới thuocsi sẽ bị đá lại domain chính
export const DOMAINS_THUOCSI = [
  'v2.thuocsi.vn',
  'mienbac.thuocsi.vn',
  'thuocsi.vn',
  'thuocsi.com.vn',
  'thuocsi.net',
  'web.v2-stg.thuocsi.vn',
  'web.v2-dev.thuocsi.vn',
  'web.v2-uat.thuocsi.vn',
  'local.thuocsi-web.vn',
  'local-prd.thuocsi-web.vn',
  'local.thuocsi.vn',
  'hk.thuocsi.vn',
  'sg.thuocsi.vn',
  'cambodia-stg.thuocsi.vn',
  'cambodia-dev.thuocsi.vn',
  'cambodia-uat.thuocsi.vn',
  'buymed.com.kh',
  'maintain.thuocsi.vn',
  'maintain.v2-stg.thuocsi.vn',
];

export const BOTTOM_NAVIGATION_PAGES = ['/', DISCOVERY, SELLERS, SELLERS_LOADING_URL, KHUYEN_MAI, KHUYEN_MAI_LOADING];
export const ROUTES_CAN_PUSH = ['/sellers?type=all']; // list các routes có thể vào stack routing bỏ qua check duplicate
export const MOBILE_SHOW_LOGO_AND_SWITCH_PAGES = ['/'];
export const MOBILE_SHOW_BACK_BUTTON_PAGES = [
  CART_URL,
  CHECKOUT_URL,
  QUICK_ORDER,
  '/thankyou/[id]',
  MY_ORDER_URL,
  '/user/dashboard',
  '/tracking-order',
  '/productviewed',
  '/users/referrals',
  USER_PROMO_CODES_URL,
  '/user/wishlist',
  '/qr',
  '/users/my-ticket',
  '/users/loyalty_points',
  '/users/rewards',
  '/khuyenmai/[slug]',
  PRODUCT,
  PRODUCTS_URL,
  '/product/[slug]/loading',
  PROMO_CODES,
  '/seller/[slug]',
  '/flagship-store/sanofi',
  '/flagship-store/durex',
  '/seller/[slug]/list-product',
  '/sellers?type=flagship',
  '/sellers?type=all',
  '/flagship-store/[slug]',
  '/flagship-store/[slug]/list-product',
  '/flagship-store/[slug]/flagship-rewards',
];

export const DEFAULT_THUMBNAIL_PATH = '/default';
