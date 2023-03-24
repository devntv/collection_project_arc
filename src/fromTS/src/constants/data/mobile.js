import {
  BUSINESS_ICON,
  CHAT_ICON,
  CONTACT_ICON,
  COUPON_ICON,
  HAND_SHAKE_ICON,
  HEART_ICON,
  INFO_ICON,
  INGREDIENT_ICON,
  INSIGHT_ICON,
  MOBILE_USER_ICON,
  MOBILE_VOUCHER_ICON,
  M_EYE_ICON,
  ORDER_ICON,
  PHONE_ICON,
  POINT_ACCUMULATING_ICON,
  PRODUCT_ICON,
  QUESTION_ICON,
  RESEARCH_INFO_ICON,
  TRUCK_ICON,
} from 'constants/Images/mobile';
import { INGREDIENT, PRODUCTS_URL, PROMO_CODES, USER_PROMO_CODES_URL } from 'constants/Paths';

export const HOME_MENUS = [
  {
    name: 'Sản Phẩm',
    url: PRODUCTS_URL,
    icon: PRODUCT_ICON,
    id: 1,
  },
  {
    name: 'Hoạt Chất',
    url: INGREDIENT,
    icon: INGREDIENT_ICON,
    id: 2,
  },
  {
    name: 'Mã Giảm Giá',
    url: PROMO_CODES,
    icon: COUPON_ICON,
    id: 3,
  },
];

export const LINK_DIRECT_TO_MESSENGER = 'https://m.me/thuocsivn';

export const MENUS_USER_INFO = [
  {
    name: 'Thông tin tài khoản',
    href: '/my-account',
    srcIcon: MOBILE_USER_ICON,
  },
  // {
  //   name: 'Thông tin cấp bậc',
  //   href: '',
  //   srcIcon: LEVEL_ICON,
  // },
  {
    name: 'Thông tin doanh nghiệp',
    href: '/user/business-information',
    srcIcon: BUSINESS_ICON,
  },
];

export const MENUS_UTIL = [
  {
    name: 'Đơn hàng của tôi',
    href: '/my-order',
    srcIcon: ORDER_ICON,
  },
  {
    name: 'Tra cứu vận đơn',
    href: '/tracking-order',
    srcIcon: TRUCK_ICON,
  },
  // {
  //   name: 'Thông tin xuất hóa đơn',
  //   href: '/productviewed',
  //   srcIcon: DOCUMENT_ICON2,
  // },
  {
    name: 'Thống kê đơn hàng',
    href: '/user/dashboard',
    srcIcon: INSIGHT_ICON,
  },
  {
    name: 'Sản phẩm đã xem',
    href: '/productviewed',
    srcIcon: M_EYE_ICON,
  },
  {
    name: 'Giới thiệu bạn bè',
    href: '/users/referrals',
    srcIcon: INFO_ICON,
  },
  {
    name: 'Mã giảm giá của tôi',
    href: USER_PROMO_CODES_URL,
    srcIcon: MOBILE_VOUCHER_ICON,
  },
  {
    name: 'Sản phẩm quan tâm',
    href: '/user/wishlist',
    srcIcon: HEART_ICON,
  },
  {
    name: 'Tra cứu thông tin sản phẩm',
    href: '/qr',
    srcIcon: RESEARCH_INFO_ICON,
  },
  {
    name: 'Phản hồi của tôi',
    href: '/users/my-ticket',
    srcIcon: CHAT_ICON,
  },
  {
    name: 'Điểm tích lũy',
    href: '/users/loyalty_points',
    srcIcon: POINT_ACCUMULATING_ICON,
  },
  {
    name: 'Chương trình trả thưởng',
    href: '/users/rewards',
    srcIcon: HAND_SHAKE_ICON,
  },
];
export const MENUS_SUPPORT = [
  {
    name: 'Câu hỏi thường gặp',
    href: 'https://thuocsihotro.helpwise.help/',
    srcIcon: QUESTION_ICON,
  },
  {
    name: 'Hotline: 02 873 008 840',
    href: 'tel:+842873008840',
    srcIcon: PHONE_ICON,
  },
  {
    name: 'Liên hệ chat',
    href: LINK_DIRECT_TO_MESSENGER,
    srcIcon: CONTACT_ICON,
  },
  // {
  //   name: 'hotro@thuocsi.vn',
  //   href: 'mailto:hotro@thuocsi.vn',
  //   srcIcon: SUPPORT_ICON,
  // },
];
export const ENUM_PRODUCT_TYPE = {
  KHUYENMAI: 'khuyenmai',
  NEW: 'new',
  FAV: 'fav',
};
export const ENUM_SELLER_TYPE = {
  ALL: 'all',
  FLAGSHIP: 'flagship',
};

export const ACCOUNTS_TRIAL = {
  prd: [
    16236, 59954, 31217, 46433, 24079, 40543, 31680, 33223, 606, 63761, 82295, 29412, 3556, 74843, 74326, 14183, 42320, 68705, 51644, 13344, 726,
    91787, 56644, 52904, 43409, 40132, 22272, 81345, 76029, 46913, 54056, 8244, 3013, 37592, 221073, 79549, 227444, 91661, 62743, 218228, 89357,
    244185, 48845, 253562, 73230, 74027, 45079, 4968, 89768, 92729, 234491, 249365, 89377, 55990, 38097, 94401, 225343, 91230, 94843, 82919, 81372,
    253699, 226652, 237691, 248883, 227714, 92730, 11856, 244703, 205792, 253556, 60803, 218616, 82835, 226001, 79342, 36289, 68951, 218511, 73802,
    11244, 28393, 68476, 270946, 245254, 34936, 31539, 88356, 233664, 226273, 91487, 222566, 82221, 238730, 225688, 235299, 53784, 222654, 46359,
    267038, 69353, 80958, 227446, 251412, 230234, 255311, 29976, 47701, 230086, 52621, 31835, 83101, 56124, 223662, 90539, 71992, 248895, 245519,
    61808, 253238, 48727, 64801, 91247, 242995, 254007, 224139, 205065, 90169, 206435, 61136, 39267, 91029, 43805, 242804, 64655, 248894, 73573,
    62199, 92335, 74466, 37820, 244195, 23096, 25678, 217377, 236150, 77357, 32791, 266958, 243821, 16236, 59954, 31217, 46433, 24079, 40543, 31680,
    33223, 606, 63761, 82295, 29412, 3556, 74843, 74326, 14183, 42320, 68705, 51644, 13344, 726, 91787, 56644, 52904, 43409, 40132, 22272, 81345,
    76029, 46913, 54056, 8244, 3013, 37592, 221073, 79549, 227444, 91661, 62743, 218228, 89357, 244185, 48845, 253562, 73230, 74027, 45079, 4968,
    89768, 92729, 234491, 249365, 89377, 55990, 38097, 94401, 225343, 91230, 94843, 82919, 81372, 253699, 226652, 237691, 248883, 227714, 92730,
    11856, 244703, 205792, 253556, 60803, 218616, 82835, 226001, 79342, 36289, 68951, 218511, 73802, 11244, 28393, 68476, 270946, 245254, 34936,
    31539, 88356, 233664, 226273, 91487, 222566, 82221, 238730, 225688, 235299, 53784, 222654, 46359, 267038, 69353, 80958, 227446, 251412, 230234,
    255311, 29976, 47701, 230086, 52621, 31835, 83101, 56124, 223662, 90539, 71992, 248895, 245519, 61808, 253238, 48727, 64801, 91247, 242995,
    254007, 224139, 205065, 90169, 206435, 61136, 39267, 91029, 43805, 242804, 64655, 248894, 73573, 62199, 92335, 74466, 37820, 244195, 23096, 25678,
    217377, 236150, 77357, 32791, 266958, 243821, 247359, 247884, 254737, 260042, 247657,
  ],
  stg: [2511, 2871, 2730],
};

export const TagCode = {
  SP: '@SP_',
  DH: '@DH_',
  HOTRO: '@HOTRO_',
};
export const tagList = [
  {
    code: TagCode.SP,
    image: '/icons/mobile/chat/SP.svg',
    title: 'Tag sản phẩm',
    guide: `${TagCode.SP}`,
  },
  {
    code: TagCode.DH,
    image: '/icons/mobile/chat/DH.svg',
    title: 'Tag đơn hàng',
    guide: `${TagCode.DH}`,
  },
  {
    code: TagCode.HOTRO,
    image: '/icons/mobile/chat/HOTRO.svg',
    title: 'Tag phiếu hỗ trợ',
    guide: `${TagCode.HOTRO}`,
  },
];
export default {};
