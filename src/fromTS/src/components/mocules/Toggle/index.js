import { Button, Divider, MenuItem, Typography } from '@material-ui/core';
import { MenuRounded as MenuRoundedIcon } from '@material-ui/icons';
import { MenuDropDown, MenuDropDownItem } from 'components/atoms';
import { BILL, FEEDBACK, LOGOUT_ICON_IMG, ORDER, POINTS, QR, REFER, REWARDS, STATISTICAL, USER, VIEWED, VOUCHER, WISHLIST } from 'constants/Icons';
import { USER_PROMO_CODES_URL } from 'constants/Paths';
import { useAuth, useCart } from 'context';
import { useModal } from 'hooks';
import { useRouter } from 'next/router';
import React from 'react';
import { gtag } from 'utils';
import { formatCurrency, formatFloatNumber } from 'utils/FormatNumber';
import NewCustomModal from '../NewCustomModal';
import styles from './styles.module.css';

export default function Toggle({ point, balance }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showPoupLogout, toggleLogout] = useModal(false);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { clearCart } = useCart();
  const { logout } = useAuth();

  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleLogout = () => {
    logout();
    clearCart();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button className={styles.toggle_button} aria-haspopup="true" onClick={handleClick} cursor="pointer">
        <MenuRoundedIcon />
      </Button>
      <MenuDropDown anchorEl={anchorEl} open={open} handleClose={handleClose}>
        <MenuItem onClick={handleClose} className={styles.menu_item}>
          <div className={styles.top_menu}>
            <Typography className={styles.top_text} variant="h5">
              Công nợ
            </Typography>
            <Typography className={styles.top_text} variant="h5">
              Điểm thưởng
            </Typography>
          </div>
          <div className={styles.top_menu}>
            <Typography className={styles.top_text} variant="h5" color="primary">
              {formatCurrency(balance)}
            </Typography>
            <Typography className={styles.top_text} variant="h5" color="secondary">
              {formatFloatNumber(point)}
            </Typography>
          </div>
        </MenuItem>
        <Divider />

        <MenuDropDownItem handleClick={() => router.push('/my-account')} text="Tài khoản của tôi">
          <USER />
        </MenuDropDownItem>
        {/* {level !== 'LEVEL_BLACKLIST' && FEATURE_LEVEL && (
          <MenuDropDownItem handleClick={() => router.push('/user/level')} text="Thông tin cấp bậc">
            <LEVEL />
          </MenuDropDownItem>
        )} */}
        <MenuDropDownItem handleClick={() => router.push('/users/loyalty_points')} text="Điểm tích luỹ">
          <POINTS />
        </MenuDropDownItem>
        <MenuDropDownItem handleClick={() => router.push('/my-order')} text="Đơn hàng của tôi">
          <ORDER />
        </MenuDropDownItem>

        <MenuDropDownItem handleClick={() => router.push('/user/dashboard')} text="Thống kê">
          <STATISTICAL />
        </MenuDropDownItem>

        <MenuDropDownItem handleClick={() => router.push('/users/referrals')} text="Giới thiệu bạn bè">
          <REFER />
        </MenuDropDownItem>

        <MenuDropDownItem handleClick={() => router.push(USER_PROMO_CODES_URL)} text="Mã giảm giá của tôi">
          <VOUCHER />
        </MenuDropDownItem>

        <MenuDropDownItem handleClick={() => router.push('/users/my-ticket')} text="Phản hồi của tôi">
          <FEEDBACK />
        </MenuDropDownItem>

        <MenuDropDownItem
          handleClick={() => {
            gtag.clickTrackingOrder();
            router.push('https://tracuu.thuocsi.vn');
          }}
          text="Tra cứu vận đơn"
        >
          <BILL />
        </MenuDropDownItem>
        <MenuDropDownItem handleClick={() => router.push('/qr')} text="Tra cứu mã QR">
          <QR />
        </MenuDropDownItem>
        <MenuDropDownItem handleClick={() => router.push('/user/wishlist')} text="Sản phẩm quan tâm">
          <WISHLIST />
        </MenuDropDownItem>

        <MenuDropDownItem text="Sản phẩm đã xem" handleClick={() => router.push('/productviewed')}>
          <VIEWED />
        </MenuDropDownItem>
        <MenuDropDownItem text="Chương trình trả thưởng" handleClick={() => router.push('/users/rewards')}>
          <REWARDS />
        </MenuDropDownItem>

        <MenuDropDownItem handleClick={toggleLogout} text="Đăng xuất">
          <LOGOUT_ICON_IMG />
        </MenuDropDownItem>
      </MenuDropDown>
      <NewCustomModal
        visible={showPoupLogout}
        onClose={toggleLogout}
        title="Xin xác nhận"
        content="Bạn có chắc muốn đăng xuất?"
        btnOk="Có"
        onClickOk={handleLogout}
        btnOnClose="Không"
      />
    </>
  );
}
