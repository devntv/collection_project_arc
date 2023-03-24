import { ValidateUtils } from 'utils';

const validateForm = ({ feedbackContent }) => {
  if (ValidateUtils.isEmpty(feedbackContent)) throw Error('Bạn chưa nhập nội dung phản hồi');
};

export default validateForm;
