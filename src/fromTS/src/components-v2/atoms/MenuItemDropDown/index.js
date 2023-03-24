import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './styles.module.css';

const testObjMap = {
  'Tài khoản của tôi': 'menu-item-my-account',
  'Điểm tích luỹ': 'menu-item-accumulate-point',
  'Đơn hàng của tôi': 'menu-item-my-order',
  'Thống kê': 'menu-item-analytic',
  'Giới thiệu bạn bè': 'menu-item-friends',
  'Mã giảm giá của tôi': 'menu-item-my-voucher',
  'Phản hồi của tôi': 'menu-item-my-response',
  'Tra cứu vận đơn': 'menu-item-bill-lookup',
  'Tra cứu mã QR': 'menu-item-qr',
  'Sản phẩm quan tâm': 'menu-item-product-fav',
  'Sản phẩm đã xem': 'menu-item-product-viewed',
  'Chương trình trả thưởng': 'menu-item-give-reward',
  'Đăng xuất': 'menu-item-logout',
};

const MenuItemDropDownItem = ({ handleClick, children, text }) => (
  <MenuItem onClick={handleClick} className={styles.root} data-test={testObjMap[text] || ''}>
    {/* children = icon of menu item */}
    <ListItemIcon>{children}</ListItemIcon>
    {text}
  </MenuItem>
);

export default MenuItemDropDownItem;
