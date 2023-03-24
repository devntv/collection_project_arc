import { faCartPlus, faGifts, faMoneyBillAlt, faShippingFast, faSpinner, faStore, faTint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { COUPON_ICON, INGREDIENT_ICON, ORDER_ICON, PRODUCT_ICON, SALE_ICON } from 'constants/Icons';
import { PRODUCTS_URL } from 'constants/Paths';

export const MENU = [
  {
    id: '1',
    name: 'Sản Phẩm',
    icon: <FontAwesomeIcon icon={faCartPlus} />,
    iconUrl: null,
    iconV2: PRODUCT_ICON,
    url: PRODUCTS_URL,
    isNew: false,
    prefetch: true,
  },
  {
    id: '2',
    name: 'Hoạt Chất',
    icon: <FontAwesomeIcon icon={faTint} />,
    iconUrl: null,
    iconV2: INGREDIENT_ICON,
    url: '/ingredients',
    urlV2: '/v2/ingredients',
    isNew: false,
    prefetch: false,
  },
  {
    id: '3',
    name: 'Đặt Hàng Nhanh',
    icon: <FontAwesomeIcon icon={faShippingFast} />,
    iconUrl: null,
    iconV2: ORDER_ICON,
    url: '/quick-order',
    isNew: false,
    prefetch: true,
  },
  {
    id: '4',
    name: 'Khuyến Mãi',
    icon: <FontAwesomeIcon icon={faGifts} />,
    iconUrl: null,
    iconV2: SALE_ICON,
    url: '/deals',
    isNew: false,
    prefetch: true,
  },
  {
    id: '5',
    name: 'Mã Giảm Giá',
    icon: <FontAwesomeIcon icon={faMoneyBillAlt} />,
    iconUrl: null,
    iconV2: COUPON_ICON,
    url: '/promo-codes',
    isNew: true,
    prefetch: true,
  },
  {
    id: '6',
    name: 'thuocsi.vn Store',
    icon: <FontAwesomeIcon icon={faStore} />,
    iconV2: COUPON_ICON,
    url: '/sellers',
    isNew: true,
    prefetch: true,
  },
  {
    id: '7',
    name: 'Vòng Quay',
    icon: <FontAwesomeIcon icon={faSpinner} />,
    iconV2: COUPON_ICON,
    url: 'https://try.thuocsi.vn/quayso',
    isNew: true,
    prefetch: false,
  },
];

export default {
  MENU,
};
