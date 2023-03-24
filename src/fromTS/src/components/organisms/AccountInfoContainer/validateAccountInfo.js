import { ValidateUtils } from 'utils';

const validateForm = ({ name, phone, email }) => {
  // check empty or null
  if (ValidateUtils.isEmpty(name)) throw Error('Bạn chưa điền tên');
  if (ValidateUtils.isEmpty(phone)) throw Error('Bạn chưa điền số điện thoại');

  if (!ValidateUtils.validatePhone(phone)) throw Error('Số điện thoại sai định dạng');
  if (!ValidateUtils.isEmpty(email) && !ValidateUtils.validateEmail(email)) throw Error('Email sai định dạng');
};

export default validateForm;
