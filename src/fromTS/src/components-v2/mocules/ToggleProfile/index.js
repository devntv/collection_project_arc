import { Box, Divider, Fade, IconButton, Menu, MenuItem, Tooltip, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import clsx from 'clsx';
import MenuItemDropDownItem from 'components-v2/atoms/MenuItemDropDown';
import NewCustomModal from 'components/mocules/NewCustomModal';
import { BILL, FEEDBACK, LOGOUT_ICON_IMG, ORDER, POINTS, QR, REFER, REWARDS, STATISTICAL, USER, VIEWED, VOUCHER, WISHLIST } from 'constants/Icons';
import { USER_PROMO_CODES_URL } from 'constants/Paths';
import { useAuth, useCart } from 'context';
import { useModal } from 'hooks';
import { useRouter } from 'next/router';
import React from 'react';
import { gtag } from 'utils';
import { formatFloatNumber } from 'utils/FormatNumber';
import { useStore } from 'zustand-lib/storeGlobal';
import styles from './styles.module.css';

function ToggleProfile({ level, point, classCustom, ...restProps }) {
  const router = useRouter();
  const validateFeature = useStore((state) => state.validateFeature);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showPoupLogout, toggleLogout] = useModal(false);
  const open = Boolean(anchorEl);
  const { clearCart } = useCart();
  const { logout } = useAuth();
  const availableDebtBalanceFormated = useStore((state) => state.getAvailableDebtBalance({ isFormated: true, isCurrency: false }));
  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleLogout = () => {
    logout(() => {}, { clearAll: true });
    clearCart();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box {...restProps}>
      <IconButton className={clsx(styles.iconInfo, classCustom)} onClick={handleClick} data-test="btn-toggle-profile">
        <ExpandMore />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="simple-menu"
        open={open}
        onClose={handleClose}
        getContentAnchorEl={null}
        TransitionComponent={Fade}
        elevation={0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        classes={{ paper: clsx(classCustom, styles.Menu || styles.Menu) }}
      >
        <MenuItem onClick={handleClose} className={styles.MenuItem}>
          <Box className={styles.MenuTop}>
            <Tooltip title="Hạn mức công nợ còn lại mà khách hàng có thể sử dụng.">
              <Typography variant="h5" className={styles.MenuTop_title}>
                Hạn mức (đ)
              </Typography>
            </Tooltip>

            <Typography variant="h5" className={styles.MenuTop_title}>
              Điểm thưởng
            </Typography>
          </Box>
          <Box className={styles.MenuTop}>
            <Typography className={styles.MenuTop_titleTransaction} variant="h5" color="primary">
              {availableDebtBalanceFormated}
            </Typography>
            <Typography className={styles.MenuTop_titleTransaction} variant="h5" color="secondary">
              {formatFloatNumber(point)}
            </Typography>
          </Box>
        </MenuItem>
        <Divider />

        <MenuItemDropDownItem className={styles.ProfileStyle} handleClick={() => router.push('/my-account')} text="Tài khoản của tôi">
          <USER />
        </MenuItemDropDownItem>
        {/* {level !== 'LEVEL_BLACKLIST' && FEATURE_LEVEL && (
          <MenuItemDropDownItem handleClick={() => router.push('/user/level')} text="Thông tin cấp bậc">
            <LEVEL />
          </MenuItemDropDownItem>
        )} */}
        <MenuItemDropDownItem handleClick={() => router.push('/users/loyalty_points')} text="Điểm tích luỹ">
          <POINTS />
        </MenuItemDropDownItem>
        <MenuItemDropDownItem handleClick={() => router.push('/my-order')} text="Đơn hàng của tôi">
          <ORDER />
        </MenuItemDropDownItem>
        <MenuItemDropDownItem handleClick={() => router.push('/user/dashboard')} text="Thống kê">
          <STATISTICAL />
        </MenuItemDropDownItem>

        <MenuItemDropDownItem handleClick={() => router.push('/users/referrals')} text="Giới thiệu bạn bè">
          <REFER />
        </MenuItemDropDownItem>

        <MenuItemDropDownItem handleClick={() => router.push(USER_PROMO_CODES_URL)} text="Mã giảm giá của tôi">
          <VOUCHER />
        </MenuItemDropDownItem>

        <MenuItemDropDownItem handleClick={() => router.push('/users/my-ticket')} text="Phản hồi của tôi">
          <FEEDBACK />
        </MenuItemDropDownItem>

        <MenuItemDropDownItem
          handleClick={() => {
            gtag.clickTrackingOrder();
            router.push('https://tracuu.thuocsi.vn');
          }}
          text="Tra cứu vận đơn"
        >
          <BILL />
        </MenuItemDropDownItem>

        <MenuItemDropDownItem handleClick={() => router.push('/qr')} text="Tra cứu mã QR">
          <QR />
        </MenuItemDropDownItem>

        <MenuItemDropDownItem handleClick={() => router.push('/user/wishlist')} text="Sản phẩm quan tâm">
          <WISHLIST />
        </MenuItemDropDownItem>

        <MenuItemDropDownItem text="Sản phẩm đã xem" handleClick={() => router.push('/productviewed')}>
          <VIEWED />
        </MenuItemDropDownItem>
        <MenuItemDropDownItem text="Chương trình trả thưởng" handleClick={() => router.push('/users/rewards')}>
          <REWARDS />
        </MenuItemDropDownItem>
        {/* KH Vip mới thấy */}
        {validateFeature('BULK_ORDER') && (
          <MenuItemDropDownItem text="Đặt hàng số lượng lớn" handleClick={() => router.push('/bulk-order/import')}>
            <BILL />
          </MenuItemDropDownItem>
        )}
        <MenuItemDropDownItem handleClick={toggleLogout} text="Đăng xuất">
          <LOGOUT_ICON_IMG />
        </MenuItemDropDownItem>
      </Menu>
      <NewCustomModal
        visible={showPoupLogout}
        onClose={toggleLogout}
        title="Xin xác nhận"
        content="Bạn có chắc muốn đăng xuất?"
        btnOk="Có"
        onClickOk={handleLogout}
        btnOnClose="Không"
      />
    </Box>
  );
}

export default ToggleProfile;
