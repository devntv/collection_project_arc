import { ValidateUtils } from 'utils';

const validateForm = ({ feedbackContent, phone }) => {
  if (ValidateUtils.isEmpty(feedbackContent)) throw Error('Bạn chưa nhập nội dung phản hồi');
  if (ValidateUtils.isEmpty(phone)) throw Error('Bạn chưa điền thông tin số điện thoại');
};

export default validateForm;
