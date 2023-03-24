export const ENUM_SCOPE = {
  DRUGSTORE: 'DRUGSTORE',
  PHARMACY: 'PHARMACY',
  CLINIC: 'CLINIC',
  HOSPITAL: 'HOSPITAL',
  PHARMA_COMPANY: 'PHARMA_COMPANY',
  DENTISTRY: 'DENTISTRY',
  BEAUTY_SALON: 'BEAUTY_SALON',
  HEALTH_CENTER: 'HEALTH_CENTER',
};

export const ENUM_SCOPE_LABEL = {
  [ENUM_SCOPE.DRUGSTORE]: 'Quầy thuốc',
  [ENUM_SCOPE.PHARMACY]: 'Nhà thuốc',
  [ENUM_SCOPE.CLINIC]: 'Phòng khám',
  [ENUM_SCOPE.HOSPITAL]: 'Bệnh viện',
  [ENUM_SCOPE.PHARMA_COMPANY]: 'Công ty dược phẩm',
  [ENUM_SCOPE.DENTISTRY]: 'Nha khoa',
  [ENUM_SCOPE.BEAUTY_SALON]: 'Thẩm mỹ viện',
  [ENUM_SCOPE.HEALTH_CENTER]: 'Trung tâm y tế',
};

export const PAYMENT_METHOD = {
  COD: 'PAYMENT_METHOD_NORMAL',
  TRANSFER: 'PAYMENT_METHOD_BANK',
  CREDIT: 'PAYMENT_METHOD_CREDIT',
};

export const ENUM_TYPE = {};

export const RIBBON_STATUS = {
  UP: 'up',
  DOWN: 'down',
};

export const PROMO_TYPE = {
  DISCOUNT: 'DISCOUNT',
  COMBO: 'COMBO',
  GIFT: 'GIFT',
  VOUCHERCODE: 'VOUCHERCODE',
  FREESHIP: 'FREESHIP',
  PERCENTAGE: 'PERCENTAGE',
  ABSOLUTE: 'ABSOLUTE',
  POINT: 'POINT',
};

export const PROMOTION_STATUS = {
  WAITING: 'WAITING',
  ACTIVE: 'ACTIVE',
  FULL: 'FULL',
  EXPIRED: 'EXPIRED',
  DELETED: 'DELETED',
};

export const PROMOTION_SCOPE = {
  GLOBAL: 'GLOBAL',
  SELLER: 'SELLER',
  CATEGORY: 'CATEGORY',
  PRODUCT: 'PRODUCT',
  SKU: 'SKU',
};

export const PROMO_RULE_FIELD_TYPE = {
  MIN_QUANTITY: 'MIN_QUANTITY',
  MIN_ORDER_VALUE: 'MIN_ORDER_VALUE',
};

export const PROMO_RULE_TYPE = {
  VALUE: 'VALUE',
  PERCENT: 'PERCENT',
  GIFT: 'GIFT',
  PRODUCT: 'PRODUCT',
  ABSOLUTE: 'ABSOLUTE',
};

export const PROMO_REWARD_TYPE = {
  PERCENTAGE: 'PERCENTAGE',
  GIFT: 'GIFT',
  POINT: 'POINT',
  ABSOLUTE: 'ABSOLUTE',
};

export const HTTP_STATUS = {
  Ok: 'OK',
  Error: 'ERROR',
  Invalid: 'INVALID',
  NotFound: 'NOT_FOUND',
  Forbidden: 'FORBIDDEN',
  Existed: 'EXISTED',
  Unauthorized: 'UNAUTHORIZED',
};

export const PRODUCT_TYPE = {
  CAN_INVOICE: 'can invoice',
};

export const DEFAULT_PAGINATION = {
  OFFSET: 0,
  LIMIT: 20,
  TOTAL: 0,
};

export const ALIGN = {
  LEFT: 'left',
  RIGHT: 'right',
  CENTER: 'center',
};

export const LIST_REASONS = [
  {
    code: 'SAI_SAN_PHAM',
    name: 'Sai sản phẩm',
  },
  {
    code: 'DONG_THIEU_HANG',
    name: 'Đóng thiếu hàng',
  },
  {
    code: 'DONG_DU_HANG',
    name: 'Đóng dư hàng',
  },
  {
    code: 'CAN_NGAY',
    name: 'Cận ngày',
  },
  {
    code: 'SAN_PHAM_HU_BE',
    name: 'Sản phẩm hư bể',
  },
  {
    code: 'CHENH_LECH_CHUYEN_KHOAN',
    name: 'Chênh lệch chuyển khoản',
  },
  {
    code: 'KHACH_DAT_SAI',
    name: 'Khách đặt sai',
  },
  {
    code: 'MAT_HANG',
    name: 'Mất hàng',
  },
  {
    code: 'SAI_HOA_DON',
    name: 'Sai hóa đơn',
  },
  {
    code: 'GIAO_LON_THUNG_HANG',
    name: 'Giao lộn thùng hàng',
  },
  {
    code: 'GIAO_HANG_TRE',
    name: 'Giao hàng trễ',
  },
  {
    code: 'HUY_DON',
    name: 'Hủy đơn',
  },
  {
    code: 'TRA_HANG_VE',
    name: 'Trả hàng về',
  },
  {
    code: 'CHAT_LUONG_SAN_PHAM',
    name: 'Chất lượng sản phẩm',
  },
  {
    code: 'DONG_SAI_SO_LUONG',
    name: 'Đóng sai số lượng',
  },
  {
    code: 'HEN_GIAO_HANG',
    name: 'Hẹn giao hàng',
  },
  {
    code: 'HOA_DON_DO',
    name: 'Hóa đơn đỏ',
  },
  {
    code: 'HOI_GIAO_HANG',
    name: 'Hối giao hàng',
  },
  {
    code: 'KHACH_TU_Y_HUY_DON',
    name: 'Khách tự ý hủy đơn',
  },
  {
    code: 'KHONG_LIEN_LAC_DUOC_KHACH',
    name: 'Không liên lạc được khách',
  },
  {
    code: 'SAI_DIA_CHI',
    name: 'Sai địa chỉ',
  },
  {
    code: 'THAY_DOI_DIA_CHI',
    name: 'Thay đổi địa chỉ',
  },
  {
    code: 'THAY_DOI_HINH_THUC_THANH_TOAN',
    name: 'Thay đổi hình thức thanh toán',
  },
  {
    code: 'THAY_DOI_SO_LUONG',
    name: 'Thay đổi số lượng',
  },
  {
    code: 'TINH_TRANG_DON_HANG',
    name: 'Tình trạng đơn hàng',
  },
  {
    code: 'GHI_CHU_DON_HANG',
    name: 'Ghi chú đơn hàng',
  },
  {
    code: 'THAC_MAC_SAN_PHAM',
    name: 'Thắc mắc sản phẩm',
  },
  {
    code: 'THAC_MAC_DICH_VU',
    name: 'Thắc mắc dịch vụ',
  },
  {
    code: 'THAC_MAC_THANH_TOAN',
    name: 'Thắc mắc thanh toán',
  },
  {
    code: 'LOI_KI_THUAT',
    name: 'Lỗi kĩ thuật',
  },
  {
    code: 'VAN_DE_KHAC',
    name: 'Vấn đề khác',
  },
];

export const LIST_REASONS_MAP = LIST_REASONS.reduce((map, item) => {
  // eslint-disable-next-line no-param-reassign
  map[item.code] = item;
  return map;
}, {});

export const FEEDBACK_REASON = LIST_REASONS_MAP;
// {
//   DONG_THIEU_HANG: {
//     code: 'DONG_THIEU_HANG',
//     name: 'Đóng thiếu hàng',
//   },
//   DONG_DU_HANG: {
//     code: 'DONG_DU_HANG',
//     name: 'Đóng dư hàng',
//   },
// };

export const ENUM_ORDER_STATUS = {
  ALL: 'ALL',
  WAIT_TO_CONFIRM: 'WAIT_TO_CONFIRM',
  CONFIRMED: 'CONFIRMED',
  PROCESSING: 'PROCESSING',
  DELIVERING: 'DELIVERING',
  TRANSPORTING: 'TRANSPORTING',
  DELIVERED: 'DELIVERED',
  CANCEL: 'CANCEL',
  COMPLETED: 'COMPLETED',
  WAIT_TO_DELIVER: 'WAIT_TO_DELIVER',
};
export const ENUM_GARMINICATION = {
  ALL: 'ALL',
  UPCOMING: 'UPCOMING',
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: 'FINISHED',
  COMPLETED: 'EXPIRED',
};
export const GARMINICATION_STATUS = [
  {
    value: 'ALL',
    label: 'Tất cả',
    color: '#fff',
    background: '#fff',
  },
  {
    value: 'PROCESSING',
    label: 'Đang diễn ra',
    color: '#D4323B',
    background: '#FFEAEA',
  },
  {
    value: 'UPCOMING',
    label: 'Sắp diễn ra',
    color: '#A87E00',
    background: '#FCF4DE',
  },
  {
    value: 'EXPIRED',
    label: 'Đã kết thúc',
    color: '#636363',
    background: '#E9E9E9',
  },
];
export const ENUM_ORDER_STATUS_LABEL = {
  [ENUM_ORDER_STATUS.WAIT_TO_CONFIRM]: 'Chờ xác nhận',
  [ENUM_ORDER_STATUS.CONFIRMED]: 'Đã xác nhận',
  [ENUM_ORDER_STATUS.PROCESSING]: 'Đang xử lý',
  [ENUM_ORDER_STATUS.DELIVERING]: 'Đang vận chuyển',
  [ENUM_ORDER_STATUS.TRANSPORTING]: 'Đang trung chuyển',
  [ENUM_ORDER_STATUS.WAIT_TO_DELIVER]: 'Chờ vận chuyển',
  [ENUM_ORDER_STATUS.DELIVERED]: 'Đã giao',
  [ENUM_ORDER_STATUS.CANCEL]: 'Đã hủy',
  [ENUM_ORDER_STATUS.COMPLETED]: 'Đã hoàn tất',
};

export const ENUM_ORDER_STATUS_COLOR = {
  [ENUM_ORDER_STATUS.WAIT_TO_CONFIRM]: 'btn--default',
  [ENUM_ORDER_STATUS.CONFIRMED]: 'btn--default',
  [ENUM_ORDER_STATUS.PROCESSING]: 'btn--default',
  [ENUM_ORDER_STATUS.WAIT_TO_DELIVER]: 'btn--default',
  [ENUM_ORDER_STATUS.DELIVERING]: 'btn--delivery',
  [ENUM_ORDER_STATUS.TRANSPORTING]: 'btn--delivery',
  [ENUM_ORDER_STATUS.DELIVERED]: 'btn--delivered',
  [ENUM_ORDER_STATUS.CANCEL]: 'btn--cancel',
  [ENUM_ORDER_STATUS.COMPLETED]: 'btn--complete',
};

export const ENUM_ORDER_TYPE = {
  NORMAL: 'NORMAL',
  COMBO: 'COMBO',
  DEAL: 'DEAL',
  GIFT: 'GIFT',
  CAMPAIGN: 'CAMPAIGN',
};

export const GROUP_ADDRESS_TYPE = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
};

export const ADDRESS_CHANGE_TYPE = {
  ASSIGNED: 'ASSIGNED',
  PROVINCE_CHANGE: 'PROVINCE_CHANGE',
  DISTRICT_CHANGE: 'DISTRICT_CHANGE',
  WARD_CHANGE: 'WARD_CHANGE',
};

export const LOYALTY_HISTORY_TYPE = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
};

export const REFERRAL_STATUS = {
  NEW: 'NEW',
  APPROVED: 'APPROVED',
  DECLINED: 'DECLINED',
};

export const REFERRAL_STATUS_LABEL = {
  [REFERRAL_STATUS.NEW]: 'Chưa tạo tài khoản',
  [REFERRAL_STATUS.APPROVED]: 'Giới thiệu thành công',
  [REFERRAL_STATUS.DECLINED]: 'Giới thiệu bị từ chối',
};

export const LOYALTY_HISTORY_TYPE_LABEL = {
  [LOYALTY_HISTORY_TYPE.INCREMENT]: 'Tích luỹ',
  [LOYALTY_HISTORY_TYPE.DECREMENT]: 'Đã đổi điểm',
};

export const FILE_TYPE = {
  PDF: 'application/pdf',
  PNG: 'image/png',
  JPEG: 'image/jpeg',
  DOC: 'application/msword',
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

export const LOYALTY_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};

export const ENUMS_PAYMENT_METHOD = {
  PAYMENT_METHOD_NORMAL: 'PAYMENT_METHOD_NORMAL',
  PAYMENT_METHOD_BANK: 'PAYMENT_METHOD_BANK',
  PAYMENT_METHOD_CREDIT: 'PAYMENT_METHOD_CREDIT',
};

export const PAYMENT_METHOD_NAME = {
  PAYMENT_METHOD_NORMAL: 'Thanh toán tiền mặt khi nhận hàng',
  PAYMENT_METHOD_BANK: 'Thanh toán chuyển khoản',
  PAYMENT_METHOD_CREDIT: 'Thanh toán hợp đồng',
};
export const PAYMENT_METHOD_NAME_SHORT = {
  PAYMENT_METHOD_NORMAL: 'Tiền mặt',
  PAYMENT_METHOD_BANK: 'Chuyển khoản',
  PAYMENT_METHOD_BANK_1: 'Chuyển khoản',
  PAYMENT_METHOD_CREDIT: 'Hợp đồng',
};
export const ARR_REMOVE_PRODUCT = [
  'NOT_ACTIVE_SKU',
  'SUSPENDED_SKU',
  'STOP_PRODUCING_SKU',
  'OUT_OF_STOCK_SKU',
  'CART_ITEM_INVALID',
  'NOT_AVAILABLE_SKU',
  'NOT_FOUND_SKU',
  'NOT_FOUND_PRICE_SKU',
  'COMBO_INVALID',
  'REQUIRED_CERTIFICATE',
];
export const SELLER_GROUP = {
  MEDX: 'MEDX',
  DOITAC: 'DOITAC',
  HANGMUAHO: 'HANGMUAHO',
  DUREX: 'DUREX', // hardcode cho DUREX,
  GIFT_ORDER: 'GIFT_ORDER',
};

export const LEVEL_CODE = {
  LEVEL_SLIVER: 'LEVEL_SLIVER',
  LEVEL_SILVER: 'LEVEL_SILVER',
  LEVEL_GOLD: 'LEVEL_GOLD',
  LEVEL_PLATINUM: 'LEVEL_PLATINUM',
  LEVEL_DIAMOND: 'LEVEL_DIAMOND',
};

export const LEVEL_CUSTOMER = {
  LEVEL_SLIVER: 'bạc',
  LEVEL_SILVER: 'bạc',
  LEVEL_GOLD: 'vàng',
  LEVEL_PLATINUM: 'bạch kim',
  LEVEL_DIAMOND: 'kim cương',
};

export const ACTIVE_STORE_TAG = 'thuocsi.vn Store';

export { default as EnumsTicket } from './EnumsTicket';

export default {
  ENUM_SCOPE,
  ENUM_TYPE,
  HTTP_STATUS,
  ENUM_ORDER_TYPE,
};

export const MAX_WEIGHT = 20000;
export const MAX_VOLUME = 62400000;
// export const COLOR_CUSTOMER = {
//   GREEN: 'GREEN',
//   YELLOW: 'YELLOW',
//   ORANGE: 'ORANGE',
//   RED: 'RED',
//   BLUE: 'BLUE', // VIP
//   PURPLE: 'PURPLE', // VIP - công nợ
// };
export const CUSTOMER_TAG = {
  BAN: 'BAN',
  BLOCK_COD: 'BLOCK_COD',
};
export const TYPE_CUSTOMER_BY_COLOR = {
  LOCKED_CUSTOMER: 'LOCKED_CUSTOMER',
};
export const FLAGSHIP_LABEL = 'Hàng hãng';
export const THUOCSI_LABEL = 'thuocsi.vn Store';
export const MOBILE_FLAGSHIP_LABEL = 'Gian hàng hãng';
export const LABEL_GIFT_TAG_PROMOTION = 'Tặng Quà';

export const ENUM_ORDER_STATUS_COLOR_V2 = {
  [ENUM_ORDER_STATUS.WAIT_TO_CONFIRM]: '#788FCA',
  [ENUM_ORDER_STATUS.CONFIRMED]: '#3B438F',
  [ENUM_ORDER_STATUS.PROCESSING]: '#E8AE00',
  [ENUM_ORDER_STATUS.DELIVERING]: '#D4323B',
  [ENUM_ORDER_STATUS.DELIVERED]: '#01A0B5',
  [ENUM_ORDER_STATUS.CANCEL]: '#A2A0A0',
  [ENUM_ORDER_STATUS.COMPLETED]: '#0CBA69',
  [ENUM_ORDER_STATUS.WAIT_TO_DELIVER]: '#D55D2A',
};

export const ENUM_INVOICE_STATUS = {
  NOT: 'Chưa xuất hoá đơn',
  REQUEST: 'Đã yêu cầu xuất hoá đơn',
  EXPORT: 'Đã xuất hoá đơn',
};

export const ARR_STATUS_WARE_HOUSE = [
  'DRAFT',
  'CONFIRMED',
  'RESERVING',
  'WAIT_TO_PICK',
  'PICKING',
  'WAIT_TO_CHECK',
  'CHECKING',
  'WAIT_TO_PACK',
  'PACKING',
  'WAIT_TO_DELIVERY',
  'DELIVERING',
  'DELIVERED',
  'COMPLETED',
  'RETURN',
  'RETURNING',
  'RETURNED',
  'DAMAGE',
  'LOST',
  'CANCEL',
];

export const MONITORING_COLLECTOR_TYPE = {
  LOGIN: 'LOGIN',
  SKU_DETAIL_VIEW: 'SKU_DETAIL_VIEW',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  SKU_IMPRESSION: 'SKU_IMPRESSION',
};

export const THUOCSI_RECOMMENDATION = {
  SAME_CATEGORY: 'SAME_CATEGORY',
  PURCHASE_TOGETHER: 'PURCHASE_TOGETHER',
  CONFIG_WEIGHT: 'CONFIG_WEIGHT',
  ALL: 'ALL',
};

export const INSIDER_RECOMMENDATION = {
  MOST_VIEWED: 'MOST_VIEWED',
  USER_BASED: 'USER_BASED',
};
export const ENUM_TRACKING_NAVBAR = {
  GO_TO_PROMO_CODES_PAGE: 'GO_TO_PROMO_CODES_PAGE',
  GO_TO_PRODUCTS_PAGE: 'GO_TO_PRODUCTS_PAGE',
  GO_TO_QUICKORDER_PAGE: 'GO_TO_QUICKORDER_PAGE',
  GO_TO_CAMPAIGN_PAGE: 'GO_TO_CAMPAIGN_PAGE',
  GO_TO_SELLER_PAGE: ' GO_TO_SELLER_PAGE',
  GO_TO_EVENTS_PAGE: ' GO_TO_EVENTS_PAGE',
};

export const ENUM_TRACKING_ACTION = Object.freeze({
  // page promo-codes
  PROMO_GO_TO_QUICK_ORDER: 'CLICK_QUICK_ORDER_LINK_ON_PROMO_CODES_PAGE',
  PROMO_GO_TO_PRODUCTS: 'CLICK_PRODUCTS_LINK_ON_PROMO_CODES_PAGE',
  PROMO_GO_TO_CART: 'CLICK_CART_LINK_ON_PROMO_CODES_PAGE',
  PROMO_GO_TO_USERS_REFERRALS: 'CLICK_REFERRALS_LINK_ON_PROMO_CODES_PAGE',
  PROMO_GO_TO_USERS_LOYALTY_POINTS: 'CLICK_LOYALTY_POINTS_LINK_ON_PROMO_CODES_PAGE',
  PROMO_CLICK_INFO_VOUCHER: 'CLICK_VIEW_VOUCHER_DETAIL_ON_PROMO_CODES_PAGE',
  PROMO_COPY_VOUCHER_CODE: 'CLICK_COPY_VOUCHER_DETAIL_ON_PROMO_CODES_PAGE',
  PROMO_CLICK_APPLY_VOUCHER: 'CLICK_APPLY_VOUCHER_DETAIL_ON_PROMO_CODES_PAGE',
  SCROLL_DOWN_FIRST_ON_PROMO_CODES_PAGE: 'SCROLL_DOWN_FIRST_ON_PROMO_CODES_PAGE',

  // page cart
  CLICK_APPLY_VOUCHER_ON_CART_PAGE: 'CLICK_APPLY_VOUCHER_ON_CART_PAGE',
  CLICK_VIEW_VOUCHER_CONDITION_ON_CART_PAGE: 'CLICK_VIEW_VOUCHER_CONDITION_ON_CART_PAGE',
  CLICK_SEARCH_VOUCHER_ON_CART_PAGE: 'CLICK_SEARCH_VOUCHER_ON_CART_PAGE',
  ON_CHANGE_SEARCH_VOUCHER_ON_CART_PAGE: 'ON_CHANGE_SEARCH_VOUCHER_ON_CART_PAGE',
  CLICK_OPEN_VOUCHER_POPUP_ON_CART_PAGE: 'CLICK_OPEN_VOUCHER_POPUP_ON_CART_PAGE',
  CLICK_GO_TO_CART_PAGE: 'CLICK_GO_TO_CART_PAGE',
  CLICK_COPY_VOUCHER_ON_CART_PAGE: 'CLICK_COPY_VOUCHER_ON_CART_PAGE',
  SCROLL_DOWN_FIRST_VOUCHER_POPUP_ON_CART_PAGE: 'SCROLL_DOWN_FIRST_VOUCHER_POPUP_ON_CART_PAGE',
});

export const ENUM_TRACKING_SOURCE = {
  QUICK_ORDER: 'quick-order',
  PRODUCT_LIST: 'product-list',
  PROMOTION: 'promotion',
  SELLER_HOME: 'seller-home',
  RECOMMENDATION: 'recommendation',
  RECOMMENDATION_TS: 'recommendation-ts',
  SAME_CATEGORY: 'same-category',
  WISHLIST: 'wishlist',
  VIEWED_LIST: 'viewed-list',
  HOME: 'home',
  PRODUCT_DETAIL: 'product-detail',
  EXCLUSIVE: 'exclusive',
};

export const ENUM_COUNTDOWN_BAR_IMAGE_TYPE = {
  HALF: 'HALF',
  FULL: 'FULL',
};

export const BRAND_NAME = 'thuocsi.vn';
export const BRAND_EMAIL_HELP = 'hotro@thuocsi.vn';
export const BRAND_PHONE = '02873008840';
export const BRAND_PHONE_DISPLAY = '02 873 008 840';

export const ENUMS_ERROR_MSG_CODE = {
  STATUS_INVALID: 'Đã có lỗi xảy ra, xin vui lòng thử lại sau.',
  PROMOTION_NOT_FOUND: 'Mã khuyến mãi không tồn tại.',
  PROMOTION_INACTIVE: 'Mã khuyến mãi chưa được kích hoạt.',
  PROMOTION_TYPE_INVALID: 'Mã khuyến mãi có loại không hợp lệ.',
  LOYALTY_FAILED: 'Đã xảy ra lỗi khi đổi điểm.',
  LOYALTY_INVALID: 'Số điểm đổi phải nhỏ hơn 1000.',
  LOYALTY_NOT_FOUND: 'Điểm đổi không hợp lệ.',
  NOT_ENOUGH_POINTS: 'Bạn không có đủ điểm để đổi mã giảm giá này.',
  TYPE_INVALID: 'Đã có lỗi xảy ra, xin vui lòng thử lại sau.',
};

export const ENUMS_ERROR_ACC_CODE = {
  CUSTOMER_DELETED: 'CUSTOMER_DELETED',
  CUSTOMER_BLOCK: 'CUSTOMER_BLOCK',
  WRONG_PASSWORD: 'WRONG_PASSWORD',
  NOT_FOUND: 'NOT_FOUND',
};

export const ENUMS_CHAT_SETTING_VALUE = {
  THUOCSI: 'THUOCSI',
  OFF: 'OFF',
  MESSENGER: 'MESSENGER',
};
export const UserType = {
  CUSTOMER: 'CUSTOMER',
  GUEST: 'GUEST',
  EMPLOYEE: 'EMPLOYEE',
};

export const ENUMS_FILTER_CATEGORY_TYPE = {
  EXTRA_CATEGORY: 'EXTRA_CATEGORY',
  CATEGORY: 'CATEGORY',
  MANUFACTURER: 'MANUFACTURER',
};
