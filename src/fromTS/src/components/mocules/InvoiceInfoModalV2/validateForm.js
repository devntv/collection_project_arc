import { ValidateUtils } from 'utils';
import { trimText } from 'utils/StringUtils';

const validateForm = ({ companyName, companyAddress, taxCode, mst }) => {
  if (ValidateUtils.isEmpty(trimText(companyName))) throw Error('Tên công ty không được trống');
  if (trimText(companyName).length <= 2) throw Error('Tên công ty không hợp lệ');
  if (ValidateUtils.isEmpty(taxCode || mst)) throw Error('Mã số thuế không được trống');
  if (ValidateUtils.isEmpty(trimText(companyAddress))) throw Error('Địa chỉ công ty không được trống');
  if (trimText(companyAddress).length <= 2) throw Error('Địa chỉ công ty không hợp lệ');

  // if (!ValidateUtils.isNumber(mst)) throw Error('Mã số thuế sai định dạng');
  const mstError = ValidateUtils.validateMst(taxCode || mst) || '';
  if (mstError) throw Error(mstError);

  // Truong Phan confirm
  // if (mst.length !== 10 && mst.length !== 14) throw Error('Mã số thuế phải có 10 hoặc 14 số');
};

export default validateForm;
