import { ValidateUtils } from 'utils';
import ValidateInvoice from '../InvoiceInfoModal/validateForm';

const validateForm = (
  {
    customerName,
    customerPhone,
    customerEmail,
    customerShippingAddress,
    customerProvinceCode,
    customerDistrictCode,
    customerWardCode,
    totalWard,
    invoice,
  },
  onSetError,
) => {
  if (ValidateUtils.isEmpty(customerName)) {
    onSetError('name', true);
    throw new Error('Bạn chưa điền tên.');
  }

  if (ValidateUtils.isEmpty(customerPhone)) {
    onSetError('phone', true);
    throw new Error('Bạn chưa điền số điện thoại.');
  }

  if (!ValidateUtils.validatePhone(customerPhone)) {
    onSetError('phone', true);
    throw new Error('Bạn chưa điền đúng định dạng số điện thoại.');
  }

  if (!ValidateUtils.isEmpty(customerEmail) && !ValidateUtils.validateEmail(customerEmail)) {
    onSetError('email', true);
    throw new Error('Email sai định dạng.');
  }
  if (ValidateUtils.isEmpty(customerShippingAddress)) {
    onSetError('address', true);
    throw new Error('Bạn chưa điền địa chỉ.');
  }

  if (customerProvinceCode === '0') {
    throw new Error('Bạn chưa chọn Tỉnh/Thành phố.');
  }

  if (customerDistrictCode === '0') {
    throw new Error('Bạn chưa chọn Quận/Huyện.');
  }

  if (customerWardCode === '0' && totalWard > 0) {
    throw new Error('Bạn chưa chọn Phường/Xã.');
  }

  const { invoiceRequest } = invoice || {};
  // validate invoice
  if (invoice && invoiceRequest) {
    ValidateInvoice(invoice);

    // if (ValidateUtils.isEmpty(customerEmail) || !ValidateUtils.validateEmail(customerEmail)) {
    //   onSetError('email', true);
    //   throw new Error('Xuất hoá đơn yêu cầu thông tin email.');
    // }
  }
};

export default validateForm;
