import { AuthClient, CustomerClient, getFirst, isValid } from 'clients';
import AccountClient from 'clients/AccountClient';
import { CustomModal } from 'components/mocules';
import validateForm from 'components/organisms/AccountInfoContainer/validateForm';
import FormAccountInfo from 'components/organisms/FormAccountInfo';
import FormBankInfo from 'components/organisms/FormBankInfo';
import FormBusinessInfo from 'components/organisms/FormBusinessInfo';
import FormChangePassword from 'components/organisms/FormChangePassword';
import FormDeliveryInfo from 'components/organisms/FormDeliveryInfo';
import FormInvoiceInfo from 'components/organisms/FormInvoiceInfo';
import { useAuth, useCart } from 'context';
import { useModal } from 'hooks';
import { useCallback, useEffect, useState } from 'react';
import { NotifyUtils } from 'utils';

export default function TabInfo({ tab, user, isMobile }) {
  const { status = '' } = user || {};
  const { logout, reloadDataCustomer } = useAuth();

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
  const handleSetValue = (key, val) => {
    setValue({ ...value, [key]: val });
  };
  const [currentAddress, setCurrentAddress] = useState({
    address: '',
    provinceCode: '',
    districtCode: '',
    wardCode: '',
  });

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

  useEffect(() => {
    loadData();
  }, []);

  const { cartItems } = useCart();
  const [showModalConfirm, toggleShowModal] = useModal(false);
  const [showModalLogout, toggleShowModalLogout] = useModal(false);
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
      value.licenseInfo.number = value?.licenseInfo?.number?.trim() || null;
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

      // setErr({});
    } catch (error) {
      NotifyUtils.error(error?.message || 'Cập nhật thông tin thất bại');
    }
  };

  const PopupConfirmChangePhoneNumber = (props) => (
    <CustomModal
      {...props}
      btnOk="Tôi đã hiểu"
      btnOnClose="Huỷ"
      title="Chú ý!"
      content="Bạn đang yêu cầu thay đổi số điện thoại. Việc này sẽ ảnh hưởng đến thông tin đăng nhập của bạn."
      onClickOk={updateAccount}
    />
  );

  const PopupLogout = (props) => (
    <CustomModal
      {...props}
      btnOk="Đăng Xuất"
      btnCloseRender={null}
      title="Thay đổi thông tin thành công"
      content="Vui lòng đăng nhập lại để hoàn tất quá trình đổi số điện thoại."
      onClickOk={logout}
      onClose={logout}
    />
  );

  const handleChangeAddress = (idProvince, idDistrict, idWard, province, district, ward) => {
    setValue({ ...value, [idProvince]: province, [idDistrict]: district, [idWard]: ward });
  };

  const renderTab = () => {
    switch (tab) {
      case '1':
        return <FormAccountInfo {...value} handleSetValue={handleSetValue} handleUpdateProfile={handleUpdateProfile} />;
      case '2':
        return <FormChangePassword />;
      case '3':
        return (
          <FormBusinessInfo
            {...value}
            handleSetValue={handleSetValue}
            handleChangeAddress={handleChangeAddress}
            handleUpdateProfile={handleUpdateProfile}
            isMobile={isMobile}
            status={status}
          />
        );
      case '4':
        return <FormBankInfo />;
      case '5':
        return <FormInvoiceInfo />;
      case '6':
        return <FormDeliveryInfo />;
      default:
        return <FormDeliveryInfo />;
    }
  };
  return (
    <>
      {renderTab()}
      <PopupConfirmChangePhoneNumber visible={showModalConfirm} onClose={toggleShowModal} />
      <PopupLogout visible={showModalLogout} />
    </>
  );
}
