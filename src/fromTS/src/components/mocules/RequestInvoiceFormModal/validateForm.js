import { ValidateUtils } from 'utils';

const validateForm = ({ companyName, taxCode, email, companyAddress }) => {
  if (ValidateUtils.isEmpty(companyName.trim())) throw Error('Bạn phải nhập tên công ty khi yêu cầu xuất chứng từ hoá đơn');
  else if (companyName.length < 2) throw Error('Tên công ty phải có ít nhất 2 kí tự');
  else if (ValidateUtils.isEmpty(taxCode)) throw Error('Bạn phải nhập mã số thuế khi yêu cầu xuất chứng từ hoá đơn');
  else if (!ValidateUtils.isEmpty(email) && !ValidateUtils.validateEmail(email)) throw Error('Email sai định dạng');
  else if (ValidateUtils.isEmpty(companyAddress.trim())) throw Error('Bạn phải nhập địa chỉ khi yêu cầu xuất chứng từ hoá đơn');
  else if (!ValidateUtils.isNumber(taxCode) || !(taxCode.length === 10 || taxCode.length === 14)) throw Error('Mã số thuế sai định dạng');
};

export default validateForm;
