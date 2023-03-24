import { ValidateUtils } from 'utils';

const validateForm = ({ name, phone, email, address, provinceCode, districtCode, wardCode }) => {
  if (ValidateUtils.isEmpty(name)) throw Error('Tên không được trống');
  if (ValidateUtils.isEmpty(phone)) throw Error('Số điện thoại không được trống');
  if (ValidateUtils.isEmpty(address)) throw Error('Địa chỉ không được trống');
  if (provinceCode === '0') throw Error('Tỉnh/Thành Phố không được trống');
  if (districtCode === '0') throw Error('Quận/Huyện không được trống');
  if (wardCode === '0') throw Error('Phường/Xã phố không được trống');

  if (!ValidateUtils.isEmpty(email) && !ValidateUtils.validateEmail(email)) throw Error('Email sai định dạng');
  if (!ValidateUtils.validatePhone(phone)) throw Error('Số điện thoại sai định dạng');
};

export default validateForm;
