import { ValidateUtils } from 'utils';

const validateForm = ({ type, phone, orderId, orderDetail, sku, email }) => {
  // if (ValidateUtils.isEmpty(feedbackContent)) throw Error('Bạn chưa nhập nội dung phản hồi');
  if (ValidateUtils.isEmpty(type)) throw Error('Bạn chưa chọn loại phản hồi');
  if (email && !ValidateUtils.validateEmail(email)) throw Error('Bạn nhập sai email');

  switch (type) {
    case 'PRODUCT': {
      if (!sku || ValidateUtils.isEmpty(sku)) throw Error('Bạn chưa chọn sản phẩm');
      if (orderId && !orderDetail) throw Error('Bạn nhập sai mã đơn hàng');
      if (phone && !ValidateUtils.validatePhone(phone)) throw Error('Số điện thoại sai định dạng');
      break;
    }
    case 'ORDER': {
      if (!orderId || ValidateUtils.isEmpty(orderId)) throw Error('Bạn chưa điền thông tin mã đơn hàng');
      if (!orderDetail) throw Error('Bạn nhập sai mã đơn hàng');
      break;
    }
    case 'ACCOUNT':
    case 'OTHER ': {
      if (ValidateUtils.isEmpty(phone)) throw Error('Bạn chưa nhập số điện thoại');
      if (!ValidateUtils.validatePhone(phone)) throw Error('Số điện thoại sai định dạng');
      break;
    }
    default: {
      break;
    }
  }
};

export default validateForm;
