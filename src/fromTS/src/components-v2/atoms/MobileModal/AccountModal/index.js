import { Backdrop, Box, Grid, IconButton, Modal, Slide, Typography } from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import { AuthClient, CustomerClient, getFirst, isValid } from 'clients';
import AccountClient from 'clients/AccountClient';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import NewCustomModal from 'components/mocules/NewCustomModal';
import validateForm from 'components/organisms/AccountInfoContainer/validateForm';
import { LINK_DIRECT_TO_MESSENGER } from 'constants/data/mobile';
import {
  ICON_MOBILE_ICON_BACK,
  ICON_MOBILE_ICON_RANK_DIAMOND,
  ICON_MOBILE_ICON_RANK_GOLD,
  ICON_MOBILE_ICON_RANK_PLATIUM,
  ICON_MOBILE_ICON_RANK_SILVER,
  ICON_MOBILE_ICON_TS_POINT,
  ICON_MOBILE_ICON_WALLET,
} from 'constants/Icons';
import {
  BUSINESS_ICON,
  CHAT_ICON,
  CONTACT_ICON,
  HAND_SHAKE_ICON,
  HEART_ICON,
  INFO_ICON,
  INSIGHT_ICON,
  MOBILE_USER_ICON,
  MOBILE_VOUCHER_ICON,
  M_EYE_ICON,
  ORDER_ICON,
  PHONE_ICON,
  POINT_ACCUMULATING_ICON,
  QUESTION_ICON,
  RESEARCH_INFO_ICON,
  SIGN_OUT_ICON,
  TRUCK_ICON,
} from 'constants/Images/mobile';
import { USER_PROMO_CODES_URL } from 'constants/Paths';
import { useAuth, useCart } from 'context';
import { useModal } from 'hooks';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useState } from 'react';
import { isDesktop } from 'react-device-detect';
import { NotifyUtils } from 'utils';
import { formatFloatNumber } from 'utils/FormatNumber';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import useMobileV2 from 'zustand-lib/storeMobile';
import MobileFormBusinessInfo from './FormBussinessInfo';
import styles from './styles.module.css';

const style = {
  position: 'absolute',
  top: 0,
  transform: 'translate(-50%, 0)',
  width: '100%',
  height: '100%',
};

const pageTitleList = {
  HOME: 'Tài khoản',
  USER_INFO: 'Thông tin tài khoản',
  BUSSINES_INFO: 'Thông tin doanh nghiệp',
  REWARDS: 'Chương trình trả thưởng',
};

// list menu

const MENUS_USER_INFO = [
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
    href: 'my-account?tab=3',
    srcIcon: BUSINESS_ICON,
  },
];

const MENUS_UTIL = [
  {
    name: 'Đơn Hàng của tôi',
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
const MENUS_SUPPORT = [
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

const AccountModal = ({ ...restProps }) => {
  const router = useRouter();
  const { isShowModal, setShowModal } = restProps;
  const [headerTitle, setHeaderTitle] = useState(pageTitleList.HOME);
  const [page, setPage] = useState(0);
  const [value, setValue] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    scope: '',
    legalRepresentative: '',
    businessName: '',
    provinceCode: '0',
    districtCode: '0',
    wardCode: '0',
    taxCode: '',
    address: '',
    customerID: '',
    licenses: [],
    gpp: [],
    pharmacyEligibilityLicense: [],
    examinationAndTreatmentLicense: [],
    licenseInfo: {
      number: '',
      date: '',
      place: '0',
    },
    gppInfo: {
      number: '',
      date: '',
      place: '0',
    },
    pharmacyEligibilityLicenseInfo: {
      number: '',
      date: '',
      place: '0',
    },
    examinationAndTreatmentLicenseInfo: {
      number: '',
      date: '',
      place: '0',
    },
  });
  const [currentAddress, setCurrentAddress] = useState({
    address: '',
    provinceCode: '',
    districtCode: '',
    wardCode: '',
  });

  const { user, logout, /* customerInfo */ reloadDataCustomer } = useAuth();
  const beta = useMobileV2((state) => state.beta);
  const { clearCart, cartItems } = useCart();
  const [showPoupLogout, toggleLogout] = useModal(false);
  const loadData = useCallback(async () => {
    const userRes = await AuthClient.getUser();
    if (isValid(userRes)) {
      const userInfo = getFirst(userRes);
      const {
        name = '',
        phone = '',
        email = '',
        provinceCode = '',
        wardCode = '',
        districtCode = '',
        scope = '',
        taxCode = '',
        licenses = [],
        legalRepresentative = '',
        customerID = '',
        businessName = '',
        address = '',
        gpp = [],
        pharmacyEligibilityLicense = [],
        examinationAndTreatmentLicense = [],
        licenseInfo = {
          date: '',
          place: '0',
          number: '',
        },
        gppInfo = {
          number: '',
          date: '',
          place: '0',
        },
        pharmacyEligibilityLicenseInfo = {
          number: '',
          date: '',
          place: '0',
        },
        examinationAndTreatmentLicenseInfo = {
          number: '',
          date: '',
          place: '0',
        },
        businessImages = [],
      } = userInfo || {};
      setCurrentAddress({
        address,
        provinceCode,
        districtCode,
        wardCode,
      });
      setValue({
        name,
        phone,
        email,
        password: '',
        scope,
        legalRepresentative,
        businessName,
        provinceCode,
        districtCode,
        wardCode,
        taxCode,
        address,
        customerID,
        licenses,
        gpp,
        businessImages,
        pharmacyEligibilityLicense,
        examinationAndTreatmentLicense,
        licenseInfo,
        gppInfo,
        pharmacyEligibilityLicenseInfo,
        examinationAndTreatmentLicenseInfo,
      });
    }
  }, []);

  const [showModalConfirm, toggleShowModal] = useModal(false);
  const [, /* showModalLogout */ toggleShowModalLogout] = useModal(false);
  const { status = '' } = user || {};
  const isMobileV2 = !isDesktop && beta;
  const handleSetValue = (key, val) => {
    setValue({ ...value, [key]: val });
  };

  const updateAccount = async () => {
    const resUpdateAccount = await AccountClient.updateAccountInfo({
      dataUpdate: {
        fullname: value.name || '',
        email: value.email || '',
        phoneNumber: value.phone,
        username: value.phone,
        type: 'CUSTOMER',
      },
    });

    if (!isValid(resUpdateAccount)) {
      let message = '';
      switch (resUpdateAccount.errorCode) {
        case 'PHONE_EXISTED':
          message = 'Số điện thoại này đã tồn tại tài khoản.';
          break;
        default:
          message = resUpdateAccount?.message || 'Cập nhật thông tin thất bại';
      }
      NotifyUtils.error(message);
      return false;
    }
    const isChangeAddress =
      currentAddress?.address !== value?.address ||
      currentAddress?.provinceCode !== value?.provinceCode ||
      currentAddress?.districtCode !== value?.districtCode ||
      currentAddress?.wardCode !== value?.wardCode;
    const res = await CustomerClient.updateProfile({ ...value, isChangeAddress });
    if (!isValid(res)) throw Error(res?.message);
    NotifyUtils.success('Cập nhật thông tin thành công');

    // showModal
    if (showModalConfirm) {
      toggleShowModal();
      logout(() => {});
      toggleShowModalLogout();
    }

    return isValid(res);
  };

  const handleChangeAddress = (idProvince, idDistrict, idWard, province, district, ward) => {
    setValue({ ...value, [idProvince]: province, [idDistrict]: district, [idWard]: ward });
  };
  const handleUpdateProfile = async () => {
    try {
      // cchặn đổi tỉnh thành  phố khi có sản phẩm trong giỏ hàng
      if (cartItems?.length > 0 && user.provinceCode !== value?.provinceCode) {
        NotifyUtils.error('Bạn không được thay đổi tỉnh/thành phố khi đang có sản phẩm trong giỏ hàng.');
        return;
      }
      value.licenseInfo.date = value.licenseInfo.date ? new Date(value.licenseInfo.date).toJSON() : null;
      value.gppInfo.date = value.gppInfo.date ? new Date(value.gppInfo.date).toJSON() : null;
      value.pharmacyEligibilityLicenseInfo.date = value.pharmacyEligibilityLicenseInfo.date
        ? new Date(value.pharmacyEligibilityLicenseInfo.date).toJSON()
        : null;
      value.examinationAndTreatmentLicenseInfo.date = value.examinationAndTreatmentLicenseInfo.date
        ? new Date(value.examinationAndTreatmentLicenseInfo.date).toJSON()
        : null;
      value.licenseInfo.number = value.licenseInfo.number.trim();
      value.gppInfo.number = value.gppInfo.number.trim();
      value.pharmacyEligibilityLicenseInfo.number = value.pharmacyEligibilityLicenseInfo.number.trim();
      value.examinationAndTreatmentLicenseInfo.number = value.examinationAndTreatmentLicenseInfo.number.trim();

      validateForm(value);
      if (value.phone !== user?.phone) {
        toggleShowModal();
      } else {
        await updateAccount();
        await reloadDataCustomer();
      }
    } catch (error) {
      NotifyUtils.error(error?.message || 'Cập nhật thông tin thất bại');
    }
  };

  useEffect(() => {
    loadData();
  }, [page]);
  const handleLogout = () => {
    logout();
    clearCart();
  };
  const RenderUserLevel = () => {
    let levelName = '';
    let levelIcon = '';
    switch (user?.level) {
      case 'LEVEL_SILVER':
        levelName = 'Thành viên bạc';
        levelIcon = <ICON_MOBILE_ICON_RANK_SILVER />;
        break;
      case 'LEVEL_GOLD':
        levelName = 'Thành viên vàng';
        levelIcon = <ICON_MOBILE_ICON_RANK_GOLD />;
        break;
      case 'LEVEL_PLATIUM':
        levelName = 'Thành viên bạch kim';
        levelIcon = <ICON_MOBILE_ICON_RANK_PLATIUM />;
        break;
      case 'LEVEL_DIAMOND':
        levelName = 'Thành viên kim cương';
        levelIcon = <ICON_MOBILE_ICON_RANK_DIAMOND />;
        break;
      default:
        break;
    }
    return (
      <Box display="flex" alignItems="center" gridGap={4}>
        <span style={{ width: 16, height: 16 }}>{levelIcon}</span>
        {levelName}
      </Box>
    );
  };
  const handleClose = () => setShowModal(false);

  const ItemMenu = ({ name, href = '', onClick, srcIcon }) => {
    const othersProp = {};
    if (typeof onClick === 'function') {
      othersProp.onClick = onClick;
    }

    return (
      <li>
        <LinkComp
          className={clsx(styles.sidebar__item_link, router.pathname === '/account-info' && styles.active)}
          name={name}
          href={href}
          color="black"
          {...othersProp}
        >
          <ImageFallbackStatic src={srcIcon} width="24" height="24" />
          <ChevronRight className={styles.iconArrow_right} />
        </LinkComp>
      </li>
    );
  };
  // chứa danh sách modal
  const pageComponentList = [
    <div className={styles.modalContent_container}>
      <nav className={styles.sidebar_content}>
        <Box style={{ margin: '15px', borderRadius: '12px' }} bgcolor="white">
          <div className={styles.sidebar__user_container}>
            <div className={styles.sidebar__user_avatar}>
              <Image className="header_user_avatar_image" src="/images/avatar/user_avatar_default.svg" width={64} height={64} />
            </div>
            <div className={styles.sidebar__user_name}>{user?.name || ''}</div>
            <div className={styles.sidebar__user_tier}>{RenderUserLevel()}</div>
          </div>
          <div className={styles.sidebar__point_container}>
            <div className={styles.sidebar_user_waller}>
              <ICON_MOBILE_ICON_WALLET /> <span className={styles.unit}>0đ</span>
            </div>
            <div className={styles.divine_line} />
            <div className={styles.sidebar_user_bonus_point}>
              <ICON_MOBILE_ICON_TS_POINT />
              <span className={styles.unit}>{formatFloatNumber(user?.point) || 0}</span>
            </div>
          </div>
        </Box>
        <ul className={styles.items}>
          <h4 className={styles.sidebar__header}>Thông Tin Tài Khoản</h4>
          {MENUS_USER_INFO.map((item, index) => (
            <ItemMenu
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              name={item?.name}
              href={item?.href}
              onClick={() => {
                if (typeof item?.onClick === 'function') {
                  item?.onClick(setHeaderTitle, setPage);
                }
              }}
              srcIcon={item?.srcIcon}
            />
          ))}
        </ul>
        <ul className={styles.items}>
          <h4 className={styles.sidebar__header}>Tiện ích</h4>
          {MENUS_UTIL.map((item, index) => (
            <ItemMenu
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              name={item?.name}
              href={item?.href}
              onClick={() => {
                if (typeof item?.onClick === 'function') {
                  item?.onClick(setHeaderTitle, setPage);
                }
              }}
              srcIcon={item?.srcIcon}
            />
          ))}
        </ul>

        <ul className={styles.items}>
          <h4 className={styles.sidebar__header}>Hỗ trợ</h4>
          {MENUS_SUPPORT.map((item, index) => (
            <ItemMenu
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              name={item?.name}
              href={item?.href}
              onClick={() => {
                if (typeof item?.onClick === 'function') {
                  item?.onClick(setHeaderTitle, setPage);
                }
              }}
              srcIcon={item?.srcIcon}
            />
          ))}
          <li>
            <div onClick={toggleLogout} role="presentation" className={styles.sidebar__item_link}>
              {/* <FontAwesomeIcon className={styles.navIcon} icon={faSignOutAlt} /> */}
              <ImageFallbackStatic src={SIGN_OUT_ICON} width="24" height="24" />
              <p className="MuiTypography-root MuiTypography-body2">Đăng xuất</p>
            </div>
          </li>
        </ul>
        <NewCustomModal
          visible={showPoupLogout}
          onClose={toggleLogout}
          title="Xin xác nhận"
          content="Bạn có chắc muốn đăng xuất?"
          btnOk="Có"
          onClickOk={handleLogout}
          btnOnClose="Không"
        />
      </nav>
    </div>,
    <div className={`${headerTitle === pageTitleList.USER_INFO ? styles.slideOpen : styles.slideClose} ${styles.modalContent_container}`} />,
    <div className={`${headerTitle === pageTitleList.BUSSINES_INFO ? styles.slideOpen : styles.slideClose} ${styles.modalContent_container}`}>
      <MobileFormBusinessInfo
        {...value}
        handleSetValue={handleSetValue}
        handleChangeAddress={handleChangeAddress}
        handleUpdateProfile={handleUpdateProfile}
        isMobile={beta}
        status={status}
        isMobileV2={isMobileV2}
      />
    </div>,
  ];

  return (
    <Box>
      <Modal
        aria-labelledby="mobile-account-modal"
        open={isShowModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 200,
        }}
      >
        <Slide direction="right" in={isShowModal || page === 2} timeout={200}>
          <Box sx={style}>
            <div className={clsx(styles.search_wrap)}>
              <Grid container className={styles.gridContainer}>
                <Grid item xs={1}>
                  <IconButton
                    className={styles.btnBack}
                    onClick={() => {
                      if (page > 0) {
                        setHeaderTitle(pageTitleList.HOME);
                        setPage(0);
                      } else {
                        setShowModal(false);
                      }
                    }}
                    color="#C0C0C0"
                  >
                    <ICON_MOBILE_ICON_BACK />
                  </IconButton>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h5" className={styles.pageTitle}>
                    {headerTitle}
                  </Typography>
                </Grid>
                <Grid item xs={1} />
              </Grid>
            </div>
            {pageComponentList[page]}
          </Box>
        </Slide>
      </Modal>
    </Box>
  );
};

export default memo(AccountModal);
