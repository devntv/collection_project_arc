import { isValidWithoutData } from 'clients';
import { ForgetPasswordFormV2, NewAuthModal } from 'components/mocules';
import LoadingScreen from 'components/organisms/LoadingScreen';
import React, { useState } from 'react';
import { AuthService } from 'services';
import { NotifyUtils } from 'utils';
import styles from './styles.module.css';

const NewForgetPasswordModal = React.memo((props) => {
  const { className, visible, onClose } = props;
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [toggleResend, setToggleResend] = useState(false);

  const onClickPhoneForm = async (data) => {
    setIsLoading(true);
    const result = await AuthService.passwordRecovery(data);
    if (isValidWithoutData(result)) {
      setStep(2);
      NotifyUtils.success('Yêu cầu thay đổi mật khẩu thành công. Kiểm tra tin nhắn để lấy mã OTP');
      setIsLoading(false);
      setToggleResend(!toggleResend);
    } else {
      NotifyUtils.error(result?.message || 'Đã có lỗi xảy ra');
      setIsLoading(false);
    }
  };

  const onSubmitOptForm = async (data) => {
    setIsLoading(true);
    const result = await AuthService.passwordRecovery(data);
    if (isValidWithoutData(result)) {
      setStep(2);
      NotifyUtils.info(result.message);
      setIsLoading(false);
    } else {
      NotifyUtils.error(result?.message || 'Đã có lỗi xảy ra');
      setIsLoading(false);
    }
  };

  const onSubmitNewPasswordForm = async (data) => {
    setIsLoading(true);
    const result = await AuthService.passwordUpdate(data);
    if (isValidWithoutData(result)) {
      setStep(3);
      setIsLoading(false);
      NotifyUtils.success('Mật khẩu mới đã được cập nhật');
    } else {
      // NotifyUtils.error(result?.message || 'Đã có lỗi xảy ra');
      switch (result.message) {
        case 'Not found any matched password_recovery.':
          NotifyUtils.error('Nhập sai mã OTP. Xin vui lòng kiểm tra lại');
          break;
        default:
          NotifyUtils.error('Đã có lỗi xảy ra');
          break;
      }
      setIsLoading(false);
    }
  };

  const clearState = () => {
    setStep(1);
    setIsTimeOut(false);
    setIsLoading(false);
  };

  const handleClose = () => {
    clearState();
    onClose();
  };

  const timeOut = () => {
    setIsTimeOut(true);
  };
  return (
    <NewAuthModal visible={visible} className={className} title="Khôi phục mật khẩu" onClose={handleClose} width="30rem">
      {isLoading && (
        <div className={styles.overlay}>
          <LoadingScreen />
        </div>
      )}
      <ForgetPasswordFormV2
        className={className}
        onClickPhoneForm={onClickPhoneForm}
        onClickOptForm={onSubmitOptForm}
        onClickNewPasswordForm={onSubmitNewPasswordForm}
        onClose={handleClose}
        step={step}
        onTimeout={timeOut}
        isTimeOut={isTimeOut}
        setIsTimeOut={setIsTimeOut}
        toggleResend={toggleResend}
      />
    </NewAuthModal>
  );
});

export default NewForgetPasswordModal;
