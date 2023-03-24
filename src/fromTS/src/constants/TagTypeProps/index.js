// TODO: refactor contanst
import { ICON_CO_O_KHO, TAG_LOGO_HANG_HANG } from 'constants/Icons';
import {
  ICON_TAG_CAN_DATE,
  ICON_TAG_DOI_MAU,
  ICON_TAG_DONG_Y,
  ICON_TAG_GAM_HANG_LANH,
  ICON_TAG_GIAO_NHANH,
  ICON_TAG_QUA_TANG,
  ICON_TAG_SUC_KHOE_HAU_COVID,
  ICON_TAG_THIET_BI_CAO_CAP,
  TAG_BAN_CHAY,
  TAG_HANG_DIEM,
  TAG_HOA_DON_NHANH,
} from 'constants/Icons/tag';
import { ENV } from 'sysconfig';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import styles from './style.module.css';

const ImageTag = ({ src }) => <ImageFallbackStatic src={src} width={15} height={15} className={styles.icon_svg} />;

const defaultNewStyle = {
  border: '1px solid #00b46e',
  textColor: '#09884D',
  borderColor: '#F2F4FA',
  backgroundColor: '#F2F4FA',
  isStyleV2: true,

  styleName: {
    fontFamily: 'ggsr',
  },
};

const TagTypeProps = {
  default: {
    border: '1px solid #000',
    color: '#000',
  },

  NEAR_EXPIRATION: {
    code: 'NEAR_EXPIRATION',
    name: 'Cận date',
    textColor: '#DC5C00',
    backgroundColor: '#FFEEEF',
    index: 100,
    url: '/products',
  },
  GIFT: {
    code: 'GIFT',
    name: 'Quà tặng',
    textColor: '#ff4fae',
  },
  MEGA_DAY: {
    name: 'Mega Day',
    textColor: '#09884D',
    backgroundColor: '#F2F4FD',
  },

  FLASH_SALE: {
    name: 'Flash Sale',
    textColor: '#09884D',
    backgroundColor: ' #F2F4FD',
    url: '/deals',
  },
  DEAL: {
    border: '1px solid #dc3545',
    color: '#dc3545',
    name: 'Khuyến mãi',
    textColor: '#fff',
    backgroundColor: '#dc3545',
    url: '/deals',
    code: 'DEAL',
  },

  HANG_DAT_TRUOC: {
    code: 'HANG_DAT_TRUOC',
    border: '1px solid #FDB971',
    name: 'Đặt trước 7 ngày',
    backgroundColor: '#FF9B05',
    color: '#FFFFFF',
    textColor: '#FFFFFF',
    index: 98,
  },

  //  off limit
  LIMIT: {
    code: 'LIMIT',
    name: 'Số lượng có hạn',
    textColor: '#D14900',
    backgroundColor: '#FFF8EA',
    url: '/products',
  },
  FV2U: {
    code: 'FV2U',
    name: 'Có Ở Kho',
    textColor: '#09884D',
    backgroundColor: '#F3F3FC',
    Icon: <ImageTag src={ICON_CO_O_KHO} />,
  },
  // Logo hàng hãng 12May2022 - chị ngọc nhờ
  '2ABC': {
    code: '2ABC',
    name: '',
    textColor: '#FFF',
    color: '#D6A816',
    backgroundColor: '#D6A816',
    isTooltip: true,
    Icon: <ImageTag src={TAG_LOGO_HANG_HANG} />,
    index: 99,
  },
  // new style

  BAN_CHAY: {
    ...defaultNewStyle,
    code: 'BAN_CHAY',
    name: 'Bán Chạy',
    isTooltip: true,
    Icon: <ImageTag src={TAG_BAN_CHAY} />,
    index: 97,
  },
  '3ABC': {
    ...defaultNewStyle,
    code: '3ABC',
    name: 'Bán Chạy',
    isTooltip: true,
    Icon: <ImageTag src={TAG_BAN_CHAY} />,
    index: 97,
  },
  HOADONNHANH: {
    ...defaultNewStyle,
    name: 'Hóa Đơn Nhanh',
    code: 'HOADONNHANH',
    isTooltip: true,
    Icon: <ImageTag src={TAG_HOA_DON_NHANH} />,
    index: 99,
  },
  Y7GB: {
    ...defaultNewStyle,
    code: 'Y7GB',
    name: 'Hàng Điểm',
    isTooltip: true,
    Icon: <ImageTag src={TAG_HANG_DIEM} />,
    index: 98,
  },
  YEU_CAU_GPP_GDP: {
    ...defaultNewStyle,
    name: 'Yêu Cầu Có GPP/GDP',
    index: 95,
  },
  GIAO_NHANH: {
    ...defaultNewStyle,
    name: 'Giao Nhanh',
    isTooltip: true,
    Icon: <ImageTag src={ICON_TAG_GIAO_NHANH} />,
    index: 90,
  },
  DONG_Y: {
    ...defaultNewStyle,
    name: 'Đông Y',
    isTooltip: true,
    Icon: <ImageTag src={ICON_TAG_DONG_Y} />,
    index: 93,
  },
  CAN_DATE: {
    ...defaultNewStyle,
    name: 'Cận Date',
    isTooltip: true,
    Icon: <ImageTag src={ICON_TAG_CAN_DATE} />,
  },
  GAM_HANG_LANH: {
    ...defaultNewStyle,
    name: 'Gam Hàng Lạnh',
    isTooltip: true,
    Icon: <ImageTag src={ICON_TAG_GAM_HANG_LANH} />,
    index: 92,
  },
  DOI_MAU: {
    ...defaultNewStyle,
    name: 'Đổi Mẫu',
    isTooltip: true,
    Icon: <ImageTag src={ICON_TAG_DOI_MAU} />,
    index: 95,
  },
  QUA_TANG: {
    ...defaultNewStyle,
    name: 'Quà Tặng',
    isTooltip: true,
    Icon: <ImageTag src={ICON_TAG_QUA_TANG} />,
    index: 89,
  },
  SUC_KHOE_HAU_COVID: {
    ...defaultNewStyle,
    name: 'Sức Khoẻ Hậu Covid',
    isTooltip: true,
    Icon: <ImageTag src={ICON_TAG_SUC_KHOE_HAU_COVID} />,
    index: 91,
  },
  THIET_BI_CAO_CAP: {
    ...defaultNewStyle,
    name: 'Thiết Bị Cao Cấp',
    isTooltip: true,
    Icon: <ImageTag src={ICON_TAG_THIET_BI_CAO_CAP} />,
    index: 94,
  },
};

const tagsStyles = {
  dev: {
    BANCHAY: { ...TagTypeProps.BAN_CHAY, code: 'BANCHAY' },
    X7GB: { ...TagTypeProps.YEU_CAU_GPP_GDP, code: 'X7GB' },
    PABC: { ...TagTypeProps.DONG_Y, code: 'PABC' },
    DOIMAU: { ...TagTypeProps.DOI_MAU, code: 'DOIMAU' },
    GIAONHANH: {
      ...TagTypeProps.GIAO_NHANH,
      code: 'GIAONHANH',
    },
    LY7G: { ...TagTypeProps.SUC_KHOE_HAU_COVID, code: 'LY7G' },
    '1U1Y': { ...TagTypeProps.THIET_BI_CAO_CAP, code: '1U1Y' },
  },
  stg: {
    '84AB': { ...TagTypeProps.BAN_CHAY, code: '84AB' },
    GIAONHANH: {
      ...TagTypeProps.GIAO_NHANH,
      code: 'GIAONHANH',
    },
    DOIMAU: { ...TagTypeProps.DOI_MAU, code: 'DOIMAU' },
    LY7G: { ...TagTypeProps.SUC_KHOE_HAU_COVID, code: 'LY7G' },
    '1U1Y': { ...TagTypeProps.THIET_BI_CAO_CAP, code: '1U1Y' },
    X7GB: { ...TagTypeProps.YEU_CAU_GPP_GDP, code: 'X7GB' },
    PABC: { ...TagTypeProps.DONG_Y, code: 'PABC' },
  },
  uat: {
    X7GB: { ...TagTypeProps.YEU_CAU_GPP_GDP, code: 'X7GB' },
    PABC: { ...TagTypeProps.DONG_Y, code: 'PABC' },
    DOIMAU: { ...TagTypeProps.DOI_MAU, code: 'DOIMAU' },
    GIAONHANH: {
      ...TagTypeProps.GIAO_NHANH,
      code: 'GIAONHANH',
    },
    LY7G: { ...TagTypeProps.SUC_KHOE_HAU_COVID, code: 'LY7G' },
    '1U1Y': { ...TagTypeProps.THIET_BI_CAO_CAP, code: '1U1Y' },
  },
  prd: {
    X7GB: { ...TagTypeProps.YEU_CAU_GPP_GDP, code: 'X7GB' },
    PABC: { ...TagTypeProps.DONG_Y, code: 'PABC' },
    DOIMAU: { ...TagTypeProps.DOI_MAU, code: 'DOIMAU' },
    GIAONHANH: {
      ...TagTypeProps.GIAO_NHANH,
      code: 'GIAONHANH',
    },
    LY7G: { ...TagTypeProps.SUC_KHOE_HAU_COVID, code: 'LY7G' },
    '1U1Y': { ...TagTypeProps.THIET_BI_CAO_CAP, code: '1U1Y' },
  },
};

export default { ...TagTypeProps, ...tagsStyles[ENV] };
