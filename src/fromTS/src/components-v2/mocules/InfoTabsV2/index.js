import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import {
  BILL,
  BILL_ACTIVE,
  FEEDBACK,
  FEEDBACK_ACTIVE,
  ORDER,
  ORDER_ACTIVE,
  POINTS,
  POINTS_ACTIVE,
  QR,
  QR_ACTIVE,
  REFER,
  REFER_ACTIVE,
  REWARDS,
  REWARDS_ACTIVE,
  STATISTICAL,
  STATISTICAL_ACTIVE,
  USER,
  USER_ACTIVE,
  VIEWED,
  VIEWED_ACTIVE,
  VOUCHER,
  VOUCHER_ACTIVE,
  WISHLIST,
  WISHLIST_ACTIVE,
} from 'constants/Icons';
import { USER_PROMO_CODES_URL } from 'constants/Paths';
import { gtag } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from 'zustand-lib/storeGlobal';
import styles from './styles.module.css';

const tabs = [
  { label: 'Tài khoản của tôi', icon: <USER />, iconActive: <USER_ACTIVE />, id: 1, link: '/my-account', enable: true },
  // { label: 'Thông tin cấp bậc', icon: <LEVEL />, iconActive: <LEVEL_ACTIVE />, id: 2, link: '/user/level', enable: FEATURE_LEVEL },
  { label: 'Điểm tích luỹ', icon: <POINTS />, iconActive: <POINTS_ACTIVE />, id: 8, link: '/users/loyalty_points', enable: true },
  { label: 'Đơn hàng của tôi', icon: <ORDER />, iconActive: <ORDER_ACTIVE />, id: 3, link: '/my-order', enable: true },
  { label: 'Thống kê', icon: <STATISTICAL />, iconActive: <STATISTICAL_ACTIVE />, id: 4, link: '/user/dashboard', enable: true },
  { label: 'Giới thiệu bạn bè', icon: <REFER />, iconActive: <REFER_ACTIVE />, id: 5, link: '/users/referrals', enable: true },
  {
    label: 'Mã giảm giá của tôi',
    icon: <VOUCHER />,
    iconActive: <VOUCHER_ACTIVE />,
    id: 6,
    link: USER_PROMO_CODES_URL,
    enable: true,
  },
  { label: 'Phản hồi của tôi', icon: <FEEDBACK />, iconActive: <FEEDBACK_ACTIVE />, id: 7, link: '/users/my-ticket', enable: true },
  { label: 'Tra cứu vận đơn', icon: <BILL />, iconActive: <BILL_ACTIVE />, id: 9, link: 'https://tracuu.thuocsi.vn', enable: true },
  { label: 'Tra cứu mã QR', icon: <QR />, iconActive: <QR_ACTIVE />, id: 10, link: '/qr', enable: true },
  { label: 'Sản phẩm quan tâm', icon: <WISHLIST />, iconActive: <WISHLIST_ACTIVE />, id: 11, link: '/user/wishlist', enable: true },
  { label: 'Sản phẩm đã xem', icon: <VIEWED />, iconActive: <VIEWED_ACTIVE />, id: 12, link: '/productviewed', enable: true },
  { label: 'Chương trình trả thưởng', icon: <REWARDS />, iconActive: <REWARDS_ACTIVE />, id: 13, link: '/users/rewards', enable: true },
];

// todo: move logic accountingBalance vào trong ssr
const InfoTabsV2 = ({ value }) => {
  const user = useStore((state) => state.user);
  const { level = '' } = user || {};
  return (
    <Box className={styles.WrapSilder}>
      <Box className={styles.wrapBox}>
        {tabs
          ?.filter((item) => item.enable)
          ?.map(
            (tab) =>
              (level !== 'LEVEL_BLACKLIST' || tab.id !== 2) && (
                <Box
                  key={`tab-${uuidv4()}`}
                  className={clsx(styles.wrapMenu, value === tab.id ? styles.tab_active : styles.tab_inactive)}
                  value={tab.id}
                  onClick={() => {
                    if (tab?.link === 'https://tracuu.thuocsi.vn') {
                      gtag.clickTrackingOrder();
                    }
                  }}
                >
                  <LinkComp href={tab.link} prefetch={false}>
                    <Box className={styles.menuIcon}>{value === tab.id ? tab.iconActive ?? tab.icon : tab.icon}</Box>
                    <Box className={styles.menuLabel}>
                      <Typography className={styles.titleTab}>{tab.label}</Typography>
                    </Box>
                  </LinkComp>
                </Box>
              ),
          )}
        {/* tạm ẩn */}
        {/* {debt && <Typography className={styles.cn}>Công nợ - &nbsp; {formatCurrency(accountingBalance)}</Typography>} */}
      </Box>
    </Box>
  );
};

export default InfoTabsV2;
