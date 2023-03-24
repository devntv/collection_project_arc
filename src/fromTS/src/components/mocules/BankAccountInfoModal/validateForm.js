import { ValidateUtils } from 'utils';
import { trimText } from 'utils/StringUtils';

const validateForm = ({ bankAccountName, bankBranch, bankCode, bankName }) => {
  if (ValidateUtils.isEmpty(trimText(bankName))) throw Error('Tên ngân hàng không được trống');
  if (ValidateUtils.isEmpty(trimText(bankCode))) throw Error('Số tài khoản không được trống');
  if (!ValidateUtils.isNumber(trimText(bankCode))) throw Error('Số tài khoản không hợp lệ');
  if (ValidateUtils.isEmpty(trimText(bankAccountName))) throw Error('Tên chủ tài khoản tài khoản không được trống');
  if (ValidateUtils.isEmpty(trimText(bankBranch))) throw Error('Chi nhánh ngân hàng không được trống');
};

export default validateForm;
