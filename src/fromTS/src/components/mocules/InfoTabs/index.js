import { ListItemIcon, MenuItem, MenuList, Typography } from '@material-ui/core';
import { LinkComp } from 'components/atoms';
import { BILL, FEEDBACK, ORDER, POINTS, QR, REFER, STATISTICAL, USER, VIEWED, VOUCHER, WISHLIST } from 'constants/Icons';
import { USER_PROMO_CODES_URL } from 'constants/Paths';

import { useAuth } from 'context';
import { gtag } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const tabs = [
  { label: 'Tài khoản của tôi', icon: <USER />, id: 1, link: '/my-account', enable: true },
  // { label: 'Thông tin cấp bậc', icon: <LEVEL />, id: 2, link: '/user/level', enable: FEATURE_LEVEL },
  { label: 'Điểm tích luỹ', icon: <POINTS />, id: 8, link: '/users/loyalty_points', enable: true },
  { label: 'Đơn hàng của tôi', icon: <ORDER />, id: 3, link: '/my-order', enable: true },
  { label: 'Thống kê bb', icon: <STATISTICAL />, id: 4, link: '/user/dashboard', enable: true },
  { label: 'Giới thiệu bạn bè', icon: <REFER />, id: 5, link: '/users/referrals', enable: true },
  {
    label: 'Mã giảm giá của tôi',
    icon: <VOUCHER />,
    id: 6,
    link: USER_PROMO_CODES_URL,
    enable: true,
  },
  { label: 'Phản hồi của tôi', icon: <FEEDBACK />, id: 7, link: '/users/my-ticket', enable: true },
  { label: 'Tra cứu vận đơn', icon: <BILL />, id: 9, link: 'https://tracuu.thuocsi.vn', enable: true },
  { label: 'Tra cứu mã QR', icon: <QR />, id: 10, link: '/qr', enable: true },
  { label: 'Sản phẩm quan tâm', icon: <WISHLIST />, id: 11, link: '/user/wishlist', enable: true },
  { label: 'Sản phẩm đã xem', icon: <VIEWED />, id: 12, link: '/productviewed', enable: true },
];

const InfoTabs = ({ value, name }) => {
  const { user } = useAuth();
  const { level = '' } = user || {};
  return (
    <div className={styles.tab_box}>
      <div className={styles.account_name}>
        Tài khoản của
        <Typography variant="h5" className={styles.name}>
          {name}
        </Typography>
      </div>
      <MenuList>
        {tabs
          ?.filter((item) => item.enable)
          ?.map(
            (tab) =>
              (level !== 'LEVEL_BLACKLIST' || tab.id !== 2) && (
                <LinkComp href={tab.link} key={`tab-${uuidv4()}`} prefetch={false}>
                  <MenuItem
                    button={false}
                    classes={{ root: value === tab.id ? styles.tab_active : styles.tab_inactive }}
                    value={tab.id}
                    onClick={() => {
                      if (tab?.link === 'https://tracuu.thuocsi.vn') {
                        gtag.clickTrackingOrder();
                      }
                    }}
                  >
                    <ListItemIcon>{tab.icon}</ListItemIcon>
                    <Typography variant="inherit">{tab.label}</Typography>
                  </MenuItem>
                </LinkComp>
              ),
          )}
      </MenuList>
      {/* <Typography>Công nợ - &nbsp; {formatCurrency(balance)}</Typography> */}
    </div>
  );
};

export default InfoTabs;
