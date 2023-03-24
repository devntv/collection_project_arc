import { ValidateUtils } from 'utils';

const DEFAULT_PROVINCE_VALUE = '0';
const DEFAULT_DISTRICT_VALUE = '0';
const DEFAULT_WARD_VALUE = '0';

const validateForm = ({
  name,
  phone,
  email,
  //   password,
  address,
  provinceCode,
  districtCode,
  wardCode,
  // deliveryProvinceCode,
  // deliveryDistrictCode,
  // deliveryWardCode,
  // mst,
  licenseInfo,
  gppInfo,
  pharmacyEligibilityLicenseInfo,
  examinationAndTreatmentLicenseInfo,
}) => {
  // check empty or null
  if (ValidateUtils.isEmpty(name)) throw Error('Bạn chưa điền tên');
  if (ValidateUtils.isEmpty(phone)) throw Error('Bạn chưa điền số điện thoại');
  if (new Date(licenseInfo?.date) > new Date()) throw Error('Ngày cấp của Giấy chứng nhận đăng ký doanh nghiệp không hợp lệ');
  if (new Date(pharmacyEligibilityLicenseInfo?.date) > new Date())
    throw Error('Ngày cấp của Giấy chứng nhận đủ điều kiện kinh doanh dược không hợp lệ');
  if (new Date(gppInfo?.date) > new Date()) throw Error('Ngày cấp của Hồ sơ GDP/GPP/GSP không hợp lệ');
  if (new Date(examinationAndTreatmentLicenseInfo?.date) > new Date()) throw Error('Ngày cấp của Giấy phép hoạt động khám, chữa bệnh không hợp lệ');

  // 14May2021 không check mã số thuế nữa, vì khách không có nên nhập sai
  // if (ValidateUtils.isEmpty(mst)) throw Error('Bạn chưa điền mã số thuế');
  // if (!ValidateUtils.isNumber(mst)) throw Error('Mã số thuế sai định dạng');

  if (ValidateUtils.isEmpty(address)) throw Error('Bạn chưa điền địa chỉ');

  if (!provinceCode || provinceCode === DEFAULT_PROVINCE_VALUE) throw Error('Tỉnh/Thành Phố không được trống');
  if (!districtCode || districtCode === DEFAULT_DISTRICT_VALUE) throw Error('Quận/Huyện không được trống');
  if (!wardCode || wardCode === DEFAULT_WARD_VALUE) throw Error('Phường/Xã phố không được trống');

  // if (deliveryProvinceCode === DEFAULT_PROVINCE_VALUE)
  //   throw Error('Tỉnh/Thành Phố không được trống');
  // if (deliveryDistrictCode === DEFAULT_DISTRICT_VALUE) throw Error('Quận/Huyện không được trống');
  // if (deliveryWardCode === DEFAULT_WARD_VALUE) throw Error('Phường/Xã phố không được trống');

  // validate
  if (!ValidateUtils.validatePhone(phone)) throw Error('Số điện thoại sai định dạng');
  if (!ValidateUtils.isEmpty(email) && !ValidateUtils.validateEmail(email)) throw Error('Email sai định dạng');
};

export default validateForm;
