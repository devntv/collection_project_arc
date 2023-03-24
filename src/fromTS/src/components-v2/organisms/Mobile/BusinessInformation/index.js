import { AuthClient, CustomerClient, getFirst, isValid } from 'clients';
import MobileFormBusinessInfo from 'components-v2/atoms/MobileModal/AccountModal/FormBussinessInfo';
import validateEnterprise from 'components/organisms/AccountInfoContainer/validateEnterprise';
import { useAuth, useCart } from 'context';
import { useCallback, useEffect, useState } from 'react';
import { NotifyUtils } from 'utils';
import useMobileV2 from 'zustand-lib/storeMobile';

const MV2BusinessInformation = ({ user }) => {
  const { cartItems } = useCart();
  const { reloadDataCustomer } = useAuth();
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
  const [wardList, setWardList] = useState([]);
  const { status = '' } = user || {};
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());

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

  const handleSetValue = (key, val) => {
    setValue({ ...value, [key]: val });
  };
  const handleChangeAddress = (idProvince, idDistrict, idWard, province, district, ward) => {
    setValue({ ...value, [idProvince]: province, [idDistrict]: district, [idWard]: ward });
  };
  const updateAccountEnterprise = async () => {
    const isChangeAddress =
      currentAddress?.address !== value?.address ||
      currentAddress?.provinceCode !== value?.provinceCode ||
      currentAddress?.districtCode !== value?.districtCode ||
      currentAddress?.wardCode !== value?.wardCode;
    const res = await CustomerClient.updateProfileEnterprise({ ...value, isChangeAddress });
    if (!isValid(res)) throw Error(res?.message);
    NotifyUtils.success('Cập nhật thông tin thành công');
    return isValid(res);
  };
  const handleUpdateProfile = async () => {
    try {
      // chặn đổi tỉnh thành  phố khi có sản phẩm trong giỏ hàng
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
      // validate with ward have a list, if ward list null -> unValidate
      validateEnterprise(value, wardList);
      await updateAccountEnterprise();
      await reloadDataCustomer();
    } catch (error) {
      NotifyUtils.error(error?.message || 'Cập nhật thông tin thất bại');
    }
  };
  const setWardListFromBusinessInfo = (wardLists) => {
    setWardList(wardLists);
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <MobileFormBusinessInfo
      {...value}
      handleSetValue={handleSetValue}
      handleChangeAddress={handleChangeAddress}
      handleUpdateProfile={handleUpdateProfile}
      status={status}
      isMobileV2={isMobileV2}
      setWardListFromBusinessInfo={setWardListFromBusinessInfo}
    />
  );
};

export default MV2BusinessInformation;
