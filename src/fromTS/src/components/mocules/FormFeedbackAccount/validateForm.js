import { ValidateUtils } from 'utils';

const validateForm = ({ phone, email }) => {
  if (ValidateUtils.isEmpty(phone)) throw Error('Bạn chưa điền thông tin số điện thoại !');
  if (!ValidateUtils.validatePhone(phone)) throw Error('Số điện thoại không hợp lệ !');
  if (email && !ValidateUtils.validateEmail(email)) throw Error('Email không đúng định dạng !');
};

export default validateForm;
