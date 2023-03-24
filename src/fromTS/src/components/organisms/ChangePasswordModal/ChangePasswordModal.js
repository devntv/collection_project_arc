import { isValidWithoutData } from 'clients';
import { useAuth } from 'context';
import React, { useState } from 'react';
import { AuthService } from 'services';
import { NotifyUtils } from 'utils';

import LoadingScreen from 'components/organisms/LoadingScreen';
import { AuthModal, NewPasswordForm } from '../../mocules';
import styles from './styles.module.css';

const ChangePasswordModal = React.memo((props) => {
  const { className, visible, onClose } = props;
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { logout, toggleLogin } = useAuth();

  const onSubmitNewPasswordForm = async (data) => {
    setIsLoading(true);
    const result = await AuthService.newPWUpdate(data);
    if (isValidWithoutData(result)) {
      setStep(2);
      setIsLoading(false);
      NotifyUtils.success('Mật khẩu mới đã được cập nhật');
    } else {
      const { errorCode } = result;
      switch (errorCode) {
        case 'NOT_FOUND':
          NotifyUtils.error('Không tìm thấy thông tin người dùng.');
          break;
        case 'WRONG_PASSWORD':
          NotifyUtils.error('Bạn đã nhập sai thông tin người dùng.');
          break;
        default:
          NotifyUtils.error(result?.message || 'Đã có lỗi xảy ra');
      }
      setIsLoading(false);
    }
  };

  const toggleModalAndSignout = () => {
    toggleLogin();
    logout();
  };

  const clearState = () => {
    setStep(1);
    setIsLoading(false);
  };

  const handleClose = () => {
    clearState();
    onClose();
    if (step === 2) {
      logout();
    }
  };

  return (
    <AuthModal visible={visible} className={className} title="Thay đổi mật khẩu" onClose={handleClose}>
      {isLoading && (
        <div className={styles.overlay}>
          <LoadingScreen />
        </div>
      )}
      <NewPasswordForm
        className={className}
        onClickNewPasswordForm={onSubmitNewPasswordForm}
        toggleModalAndSignout={toggleModalAndSignout}
        onClose={handleClose}
        step={step}
      />
    </AuthModal>
  );
});

export default ChangePasswordModal;
