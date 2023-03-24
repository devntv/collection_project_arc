import { ValidateUtils } from 'utils';
import { trimText } from 'utils/StringUtils';

const validateForm = ({ bankAccountName, bankCode, bankName, bankID, bankBranchCode }) => {
  // 218 va 245 la agribank va citibank
  if (ValidateUtils.isEmpty(trimText(bankName))) throw Error('Tên ngân hàng không được trống');
  if (bankName && !bankBranchCode && bankID !== 245 && bankID !== 218) throw Error('Bạn phải chọn ngân hàng trong sách của chúng tôi');
  if (ValidateUtils.isEmpty(trimText(bankAccountName))) throw Error('Tên chủ tài khoản tài khoản không được trống');
  if (!ValidateUtils.isFullName(trimText(bankAccountName))) throw Error('Tên chủ tài khoản không hợp lệ');
  if (ValidateUtils.isEmpty(trimText(bankCode))) throw Error('Số tài khoản không được trống');
  if (!ValidateUtils.isDigits(bankCode)) throw Error('Số tài khoản chỉ gồm các chữ số từ 0 đến 9');
  if ((bankID === 245 || bankID === 218) && !bankBranchCode) throw Error('Vui lòng nhập chi nhánh');
};

export default validateForm;
