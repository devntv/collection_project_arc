import {
  BILL_ICON,
  BILL_ICON_ACTIVE,
  DIAMOND_ICON_RANK,
  DIAMOND_ICON_RANK_ACTIVE,
  EditDetailV2,
  EDIT_INVOICE,
  FEEDBACK_ICON,
  FEEDBACK_ICON_ACTIVE,
  FEEDBACK_ICON_WHITE,
  GOLD_ICON_RANK,
  GOLD_ICON_RANK_ACTIVE,
  ICON_ARROW_ORDER,
  ICON_ARROW_ORDER_ACTIVE,
  I_ARROW_RIGHT_DETAILV2,
  I_COMPLETED,
  I_CONFIRMED,
  I_DELIVERED,
  I_DELIVERING,
  I_EDIT_ORDER_V2,
  I_EXIT,
  I_FEEDBACK_DETAILV2,
  I_FILE_CHECKED,
  I_PROCESSING_V2,
  I_RETURN_ORDER_DETAILV2,
  I_TRANSPORTING,
  I_WAIT_TO_CONFIRM,
  I_WISHLIST_DEL,
  LEVEL_ICON,
  LEVEL_ICON_ACTIVE,
  LEVEL_ICON_WHITE,
  LOGOUT_ICON,
  LOGOUT_ICON_WHITE,
  LOGO_THUOCSI_SHORTENED,
  LOYALTY_ARROW_VIEW_MORE,
  MOBILE_ICON_ALERT_SUCCESS,
  MOBILE_ICON_ATTACH_FILE,
  MOBILE_ICON_RATING_STAR,
  MOBILE_ICON_RATING_STAR_FILL,
  MOBILE_ICON_RATING_STAR_NOT_FILL,
  MOBILE_ICON_RATING_SUCCESS,
  ORDER_ICON_MENU,
  ORDER_ICON_MENU_ACTIVE,
  ORDER_ICON_MENU_WHITE,
  PLATINUM_ICON_RANK,
  PLATINUM_ICON_RANK_ACTIVE,
  POINTS_ICON,
  POINTS_ICON_ACTIVE,
  POINTS_ICON_WHITE,
  QR_ICON,
  QR_ICON_ACTIVE,
  QR_ICON_WHITE,
  QUEST_REWARDS_ICON,
  QUEST_REWARDS_ICON_ACTIVE,
  QUEST_REWARDS_ICON_WHITE,
  ReAddToCartV2,
  REFER_FRIEND_ICON,
  REFER_FRIEND_ICON_ACTIVE,
  REFER_FRIEND_ICON_WHITE,
  SEARCHV2_ICON,
  SLIVER_ICON_RANK,
  SLIVER_ICON_RANK_ACTIVE,
  STATISTICAL_ICON,
  STATISTICAL_ICON_ACTIVE,
  STATISTICAL_ICON_WHITE,
  TRUCK_ICON_WHITE,
  UP_INVOICE,
  USER_ICON,
  USER_ICON_ACTIVE,
  USER_ICON_WHITE,
  VIEWED_ICON,
  VIEWED_ICON_ACTIVE,
  VIEWED_ICON_WHITE,
  VOUCHER_ICON,
  VOUCHER_ICON_ACTIVE,
  VOUCHER_ICON_WHITE,
  VOUCHER_TITLE,
  VOUCHER_TITLE_DETAIL,
  VOUCHER_TITLE_GREEN,
  VOUCHER_TS_PROMO,
  VOUHCER_PROMOTION_BOX,
  WISHLIST_ICON,
  WISHLIST_ICON_1,
  WISHLIST_ICON_4,
  WISHLIST_ICON_ACTIVE,
  WISHLIST_ICON_WHITE
} from 'constants/Images';
import {
  MOBILE_ICON_BACK,
  MOBILE_ICON_RANK_DIAMOND,
  MOBILE_ICON_RANK_GOLD,
  MOBILE_ICON_RANK_PLATIUM,
  MOBILE_ICON_RANK_SILVER,
  MOBILE_ICON_TS_POINT,
  MOBILE_ICON_WALLET
} from 'constants/Images/mobile';
// TODO: refactor contanst
import Image from 'next/image';
import { memo } from 'react';
import { ImageFallbackStatic } from 'utils/ImageFallback';
// icons
export const TAG_LOGO_HANG_HANG = '/icons/tag_logo_hang_hang.svg';
export const ICON_CO_O_KHO = '/icons/icon_co_o_kho.svg';
export const PRODUCT_ICON = '/icons/product.svg';
export const ORDER_ICON = '/icons/order.svg';
export const DOWNLOAD_APP_ICON = '/icons/download_app.svg';
export const INGREDIENT_ICON = '/icons/ingredient.svg';
export const SALE_ICON = '/icons/sale.svg';
export const COUPON_ICON = '/icons/coupon.svg';
export const MONEY_ICON = '/images/icon/money.svg';
export const STORE_ICON_2 = '/images/store_icon.png';
export const ICON_CHAT_NGAY = '/images/icon_chat_ngay.svg';
export const DOLLAR_ICON = '/images/icon/dollar.svg';
export const MONEY_ICON_V2 = '/images/icon/money_v2.svg';

export const FACEBOOK_ICON = '/icons/facebook_icon.png';
export const ZALO_ICON = '/icons/zalo_icon.png';
export const TIKTOK_ICON = '/icons/tiktok_icon.png';
export const LINKEDIN_ICON = '/icons/linkedin_icon.png';

export const STORE_BLUE_ICON = '/images/store_blue.svg';
export const STORE_ICON = '/images/icon/store.svg';
export const COLOR_STORE = '/icons/color_seller.svg';
export const FLASH_SALE_ICON = '/icons/flash_sale.svg';
export const NEW_PRODUCT_ICON = '/icons/new_product.svg';
export const PDF_ICON = '/icons/pdf_file.svg';
export const XLS_ICON = '/icons/xls_file.svg';
export const DOCS_ICON = '/icons/docs_file.svg';
export const VIDEO_ICON = '/icons/video_file.svg';
export const IMG_ICON = '/icons/img_file.svg';
export const MORE_ICON = '/icons/more_icon.svg';
export const ATTACH_ICON = '/icons/attach_file.svg';
export const PAPER_PLANE_ICON = '/icons/paper_plane.svg';
export const GALLERY_ICON = '/icons/gallery.svg';
export const LIGHT_BLUE_LOGO_ICON = '/icons/light_blue_logo.svg';
export const TIME_ICON = '/orderStatus/time.svg';
export const SELLER_GRAY_ICON = '/icons/seller_gray.svg';
export const CHAT_ICON = '/icons/chat.svg';

export const TIME = memo(({ width = 12, height = 12 }) => <ImageFallbackStatic src={TIME_ICON} width={width} height={height} />);
export const LOGO_SHORT_BLUE = memo(({ width = 45, height = 45 }) => (
  <ImageFallbackStatic src={LOGO_THUOCSI_SHORTENED} width={width} height={height} />
));
export const LIGHT_BLUE_LOGO = memo(({ width = 200, height = 200 }) => <ImageFallbackStatic src={LIGHT_BLUE_LOGO_ICON} width={width} height={height} />);
export const CHAT = memo(({ width = 40, height = 40 }) => <ImageFallbackStatic src={CHAT_ICON} width={width} height={height} />);
export const SELLER_GRAY = memo(({ width = 15, height = 16 }) => <ImageFallbackStatic src={SELLER_GRAY_ICON} width={width} height={height} />);
export const LOGO_SHORT_BLUE_20 = memo(({ width = 20, height = 20 }) => (
  <ImageFallbackStatic src={LOGO_THUOCSI_SHORTENED} width={width} height={height} />
));
export const PAPER_PLANE = memo(({ width = 24, height = 24, ...rest }) => <ImageFallbackStatic {...rest} src={PAPER_PLANE_ICON} width={width} height={height} />);
export const USER = memo(() => <ImageFallbackStatic src={USER_ICON} width="24px" height="24px" />);
export const BILL = memo(() => <ImageFallbackStatic src={BILL_ICON} width="26px" height="21px" />);
export const FEEDBACK = memo(() => <ImageFallbackStatic src={FEEDBACK_ICON} width="24px" height="24px" />);
export const POINTS = memo(() => <ImageFallbackStatic src={POINTS_ICON} width="20px" height="24px" />);
export const REFER = memo(() => <ImageFallbackStatic src={REFER_FRIEND_ICON} width="26px" height="20px" />);
export const STATISTICAL = memo(() => <ImageFallbackStatic src={STATISTICAL_ICON} width="24px" height="24px" />);
export const WISHLIST = memo(() => <ImageFallbackStatic src={WISHLIST_ICON} width="24px" height="22px" />);
export const ORDER = memo(() => <ImageFallbackStatic src={ORDER_ICON_MENU} width="20px" height="24px" />);
export const VIEWED = memo(() => <ImageFallbackStatic src={VIEWED_ICON} width="24px" height="20px" />);
export const QR = memo(() => <ImageFallbackStatic src={QR_ICON} width="24px" height="24px" />);
export const LEVEL = memo(() => <ImageFallbackStatic src={LEVEL_ICON} width="24px" height="24px" />);
export const VOUCHER = memo(() => <ImageFallbackStatic src={VOUCHER_ICON} width="24px" height="24px" />);
export const PDF = memo(({ width = 60, height = 60 }) => <ImageFallbackStatic src={PDF_ICON} width={width} height={height} />);
export const XSL = memo(({ width = 60, height = 60 }) => <ImageFallbackStatic src={XLS_ICON} width={width} height={height} />);
export const DOCS = memo(({ width = 60, height = 60 }) => <ImageFallbackStatic src={DOCS_ICON} width={width} height={height} />);
export const VIDEO = memo(({ width = 60, height = 60 }) => <ImageFallbackStatic src={VIDEO_ICON} width={width} height={height} />);
export const IMG = memo(({ width = 60, height = 60 }) => <ImageFallbackStatic src={IMG_ICON} width={width} height={height} />);
export const MORE = memo(() => <ImageFallbackStatic src={MORE_ICON} width="24px" height="24px" />);
export const ATTACH = memo(({ width = 200, height = 200 }) => <ImageFallbackStatic src={ATTACH_ICON} width={width} height={height} />);
export const GALLERY = memo(() => <ImageFallbackStatic src={GALLERY_ICON} width="32px" height="28px" />);

export const LOGOUT_ICON_IMG = memo(() => <ImageFallbackStatic src={LOGOUT_ICON} width="24px" height="24px" />);
export const LOGOUT_ICON_WHITE_IMG = memo(() => <ImageFallbackStatic src={LOGOUT_ICON_WHITE} width="24px" height="24px" />);

export const REWARDS = memo(() => <ImageFallbackStatic src={QUEST_REWARDS_ICON} width="24px" height="24px" />);
// active icons
export const USER_ACTIVE = memo(() => <ImageFallbackStatic src={USER_ICON_ACTIVE} width="24px" height="24px" />);
export const BILL_ACTIVE = memo(() => <ImageFallbackStatic src={BILL_ICON_ACTIVE} width="26px" height="21px" />);
export const ORDER_ACTIVE = memo(() => <ImageFallbackStatic src={ORDER_ICON_MENU_ACTIVE} width="20px" height="24px" />);
export const FEEDBACK_ACTIVE = memo(() => <ImageFallbackStatic src={FEEDBACK_ICON_ACTIVE} width="24px" height="24px" />);
export const POINTS_ACTIVE = memo(() => <ImageFallbackStatic src={POINTS_ICON_ACTIVE} width="20px" height="24px" />);
export const REFER_ACTIVE = memo(() => <ImageFallbackStatic src={REFER_FRIEND_ICON_ACTIVE} width="26px" height="20px" />);
export const STATISTICAL_ACTIVE = memo(() => <ImageFallbackStatic src={STATISTICAL_ICON_ACTIVE} width="24px" height="24px" />);
export const QR_ACTIVE = memo(() => <ImageFallbackStatic src={QR_ICON_ACTIVE} width="24px" height="24px" />);
export const VIEWED_ACTIVE = memo(() => <ImageFallbackStatic src={VIEWED_ICON_ACTIVE} width="24px" height="20px" />);
export const WISHLIST_ACTIVE = memo(() => <ImageFallbackStatic src={WISHLIST_ICON_ACTIVE} width="24px" height="22px" />);
export const LEVEL_ACTIVE = memo(() => <ImageFallbackStatic src={LEVEL_ICON_ACTIVE} width="24px" height="24px" />);
export const VOUCHER_ACTIVE = memo(() => <ImageFallbackStatic src={VOUCHER_ICON_ACTIVE} width="24px" height="24px" />);

// icon white
export const USER_WHITE = memo(() => <ImageFallbackStatic src={USER_ICON_WHITE} width="24px" height="24px" />);
export const TRUCK_WHITE = memo(() => <ImageFallbackStatic src={TRUCK_ICON_WHITE} width="26px" height="21px" />);
export const FEEDBACK_WHITE = memo(() => <ImageFallbackStatic src={FEEDBACK_ICON_WHITE} width="24px" height="24px" />);
export const POINTS_WHITE = memo(() => <ImageFallbackStatic src={POINTS_ICON_WHITE} width="20px" height="24px" />);
export const REFER_WHITE = memo(() => <ImageFallbackStatic src={REFER_FRIEND_ICON_WHITE} width="26px" height="20px" />);
export const STATISTICAL_WHITE = memo(() => <ImageFallbackStatic src={STATISTICAL_ICON_WHITE} width="24px" height="24px" />);
export const WISHLIST_WHITE = memo(() => <ImageFallbackStatic src={WISHLIST_ICON_WHITE} width="24px" height="22px" />);
export const ORDER_WHITE = memo(() => <ImageFallbackStatic src={ORDER_ICON_MENU_WHITE} width="20px" height="24px" />);
export const VIEWED_WHITE = memo(() => <ImageFallbackStatic src={VIEWED_ICON_WHITE} width="24px" height="20px" />);
export const QR_WHITE = memo(() => <ImageFallbackStatic src={QR_ICON_WHITE} width="24px" height="24px" />);
export const LEVEL_WHITE = memo(() => <ImageFallbackStatic src={LEVEL_ICON_WHITE} width="24px" height="24px" />);
export const VOUCHER_WHITE = memo(() => <ImageFallbackStatic src={VOUCHER_ICON_WHITE} width="24px" height="24px" />);
export const REWARDS_WHITE = memo(() => <ImageFallbackStatic src={QUEST_REWARDS_ICON_WHITE} width="24px" height="22px" />);
export const REWARDS_ACTIVE = memo(() => <ImageFallbackStatic src={QUEST_REWARDS_ICON_ACTIVE} width="24px" height="22px" />);

export const WISHLIST_IMAGE_INACTIVE = memo(() => <ImageFallbackStatic src={WISHLIST_ICON_1} width={24} height={24} />);
export const WISHLIST_IMAGE_ACTIVE = memo(() => <ImageFallbackStatic src={WISHLIST_ICON_4} width={24} height={24} />);

// LOYALTY VOUCHER V2
export const VOUCHER_TITLE_BOX = memo(() => <ImageFallbackStatic src={VOUHCER_PROMOTION_BOX} width={20} height={23} />);
export const VOUCHER_TITLE_TS_DETAIL = memo(() => <ImageFallbackStatic src={VOUCHER_TITLE_DETAIL} width={15} height={16} />);
export const VOUCHER_TITLE_TS = memo(() => <ImageFallbackStatic src={VOUCHER_TITLE} width={27} height={24} />);
export const VOUCHER_TITLE_TS_GREEN = memo(() => <ImageFallbackStatic src={VOUCHER_TITLE_GREEN} width={24} height={24} />);
export const LOYALTY_BTN_VIEW_MORE = memo(() => <ImageFallbackStatic src={LOYALTY_ARROW_VIEW_MORE} width={9} height={11} />);
export const ARROW_ORDER = memo(() => <ImageFallbackStatic src={ICON_ARROW_ORDER} width={18} height={17} />);
export const ARROW_ORDER_ACTIVE = memo(() => <ImageFallbackStatic sec={ICON_ARROW_ORDER_ACTIVE} width={18} height={17} />);
// order detail v2 icon
export const ICON_FILE_CHECKED = memo(() => <ImageFallbackStatic src={I_FILE_CHECKED} width={20} height={20} />);
export const ICON_RE_ORDERV2 = memo(() => <ImageFallbackStatic src={ReAddToCartV2} width={28} height={28} />);
export const ICON_EDIT_V2 = memo(() => <ImageFallbackStatic src={EditDetailV2} width={28} height={28} />);
export const ICON_EDIT_ORDER_V2 = memo(() => <ImageFallbackStatic src={I_EDIT_ORDER_V2} width={16} height={16} />);
export const ICON_STEP_WAIT_TO_CONFIRM = memo(() => <ImageFallbackStatic src={I_WAIT_TO_CONFIRM} width={20} height={20} priority />);
export const ICON_STEP_PROCESSING = memo(() => <ImageFallbackStatic src={I_PROCESSING_V2} width={20} height={20} priority />);
export const ICON_STEP_DELIVERING = memo(() => <ImageFallbackStatic src={I_DELIVERING} width={20} height={20} priority />);
export const ICON_STEP_DELIVERED = memo(() => <ImageFallbackStatic src={I_DELIVERED} width={20} height={20} priority />);
export const ICON_STEP_TRANSPORTING = memo(() => <ImageFallbackStatic src={I_TRANSPORTING} width={20} height={20} priority />);
export const ICON_STEP_CONFIRMED = memo(() => <ImageFallbackStatic src={I_CONFIRMED} width={20} height={20} priority />);
export const ICON_STEP_COMPLETED = memo(() => <ImageFallbackStatic src={I_COMPLETED} width={20} height={20} priority />);
export const ICON_STEP_EXIT = memo(() => <ImageFallbackStatic src={I_EXIT} width={20} height={20} priority />);
export const ICON_FEEBACK_DETAILV2 = memo(() => <ImageFallbackStatic src={I_FEEDBACK_DETAILV2} width={14} height={15} />);
export const ICON_RETURN_DETAILV2 = memo(() => <ImageFallbackStatic src={I_RETURN_ORDER_DETAILV2} width={15} height={17} />);
export const ICON_ARROW_RIGHT_DETAILV2 = memo(() => <ImageFallbackStatic src={I_ARROW_RIGHT_DETAILV2} width={20} height={20} />);
export const ICON_EDIT_INVOICE = memo(() => <ImageFallbackStatic src={EDIT_INVOICE} width={16} height={16} />);
export const ICON_UP_INVOICE = memo(() => <ImageFallbackStatic src={UP_INVOICE} width={16} height={16} />);
export const ICON_SLIVER_RANK = memo(() => <ImageFallbackStatic src={SLIVER_ICON_RANK} width={25} height={24} priority />);
export const ICON_GOLD_RANK = memo(() => <ImageFallbackStatic src={GOLD_ICON_RANK} width={24} height={24} priority />);
export const ICON_PLATINUM_RANK = memo(() => <ImageFallbackStatic src={PLATINUM_ICON_RANK} width={24} height={24} priority />);
export const ICON_DIAMOND_RANK = memo(() => <ImageFallbackStatic src={DIAMOND_ICON_RANK} width={24} height={24} priority />);
export const ICON_DIAMOND_RANK_ACTIVE = memo(() => <ImageFallbackStatic src={DIAMOND_ICON_RANK_ACTIVE} width={24} height={24} priority />);
export const ICON_SLIVER_RANK_ACTIVE = memo(() => <ImageFallbackStatic src={SLIVER_ICON_RANK_ACTIVE} width={24} height={24} priority />);
export const ICON_GOLD_RANK_ACTIVE = memo(() => <ImageFallbackStatic src={GOLD_ICON_RANK_ACTIVE} width={24} height={24} priority />);
export const ICON_PLATINUM_RANK_ACTIVE = memo(() => <ImageFallbackStatic src={PLATINUM_ICON_RANK_ACTIVE} width={24} height={24} priority />);

// cart -> poup promo
export const ICON_VOUCHER_PROMO_TS = memo(() => <ImageFallbackStatic src={VOUCHER_TS_PROMO} width={108} height={19} priority />);
export const ICON_SEARCH_PROMO_MOBILE_V2 = memo(() => <ImageFallbackStatic src={SEARCHV2_ICON} width={22} height={22} priority />);

// moible icon

export const ICON_MOBILE_ICON_BACK = memo(() => <ImageFallbackStatic src={MOBILE_ICON_BACK} width={24} height={24} priority />);
export const ICON_MOBILE_ICON_RANK_DIAMOND = memo(() => <Image src={MOBILE_ICON_RANK_DIAMOND} width={24} height={24} priority />);
export const ICON_MOBILE_ICON_RANK_GOLD = memo(() => <Image src={MOBILE_ICON_RANK_GOLD} width={24} height={24} priority />);
export const ICON_MOBILE_ICON_RANK_PLATIUM = memo(() => <Image src={MOBILE_ICON_RANK_PLATIUM} width={24} height={24} priority />);
export const ICON_MOBILE_ICON_RANK_SILVER = memo(() => <Image src={MOBILE_ICON_RANK_SILVER} width={24} height={24} priority />);
export const ICON_MOBILE_ICON_TS_POINT = memo(() => <Image src={MOBILE_ICON_TS_POINT} width={24} height={24} priority />);
export const ICON_MOBILE_ICON_WALLET = memo(() => <Image src={MOBILE_ICON_WALLET} width={24} height={24} priority />);
export const ICON_MOBILE_ICON_ALERT_SUCCESS = memo(() => <Image src={MOBILE_ICON_ALERT_SUCCESS} width={60} height={60} priority />);
export const ICON_MOBILE_ICON_ALERT_WARNING = memo(() => <Image src={MOBILE_ICON_ALERT_SUCCESS} width={60} height={60} priority />);
export const ICON_MOBILE_ICON_RATING_STAR = memo(() => <Image src={MOBILE_ICON_RATING_STAR} width={30} height={30} priority />);
export const ICON_MOBILE_ICON_RATING_STAR_FILL = memo(() => <Image src={MOBILE_ICON_RATING_STAR_FILL} width={30} height={30} priority />);
export const ICON_MOBILE_ICON_RATING_STAR_NOT_FILL = memo(() => <Image src={MOBILE_ICON_RATING_STAR_NOT_FILL} width={30} height={30} priority />);
export const ICON_MOBILE_ICON_RATING_SUCCESS = memo(() => <Image src={MOBILE_ICON_RATING_SUCCESS} width={32} height={32} priority />);
export const ICON_MOBILE_ICON_ATTACH_FILE = memo(() => <Image src={MOBILE_ICON_ATTACH_FILE} width={32} height={32} priority />);

// wishlist v2
export const ICON_WISHLIST_DEL_V2 = memo(() => <ImageFallbackStatic src={I_WISHLIST_DEL} width={19} height={22} priority />);
