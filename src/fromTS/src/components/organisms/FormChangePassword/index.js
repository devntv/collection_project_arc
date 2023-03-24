import { InputAdornment } from '@material-ui/core';
import VisibilityOffOutlined from '@material-ui/icons/VisibilityOffOutlined';
import VisibilityOutlined from '@material-ui/icons/VisibilityOutlined';
import { isValidWithoutData } from 'clients';
import PasswordWarningText from 'components-v2/atoms/PasswordWarningText';
import { Button } from 'components/atoms';
import InputV2 from 'components/atoms/InputV2';
import { useAuth } from 'context';
import { useState } from 'react';
import { AuthService } from 'services';
import { NotifyUtils } from 'utils';
import styles from './styles.module.css';

const FormChangePassword = () => {
  const [isVisionOldPass, setIsVisionOldPass] = useState(false);
  const [isVisionNewPass, setIsVisionNewPass] = useState(false);
  const [isVisionConfirmPass, setIsVisionConfirmPass] = useState(false);
  const {
    user: { customerID },
  } = useAuth();
  const [errorPw, setErrorPw] = useState(false);
  const [errorPwMessage, setErrorPwMessage] = useState('');

  const [errorNewPassword, setErrorNewPassword] = useState(false);
  const [errorNewPasswordMessage, setErrorNewPasswordMessage] = useState('');

  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [errorConfirmPasswordMessage, setErrorConfirmPasswordMessage] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // handle validate

  const validatePw = (data) => {
    setErrorPw(false);
    if (data === '') {
      setErrorPw(true);
      setErrorPwMessage('Bạn chưa nhập mật khẩu');
      return false;
    }
    if (data.length > 50) {
      setErrorPw(true);
      setErrorPwMessage('Mật khẩu quá dài');
      return false;
    }
    return true;
  };

  const validateNewPassword = (data, oldPassword) => {
    setErrorNewPassword(false);
    if (data === '') {
      setErrorNewPassword(true);
      setErrorNewPasswordMessage('Bạn chưa nhập mật khẩu mới');
      return false;
    }

    if (data.length > 30 || data.length < 2) {
      setErrorNewPassword(true);
      setErrorNewPasswordMessage('Mật khẩu tối thiểu 2 và tối đa 30 kí tự');
      return false;
    }

    if (oldPassword === data) {
      setErrorNewPassword(true);
      setErrorNewPasswordMessage('');
      // setErrorNewPasswordMessage('Mật khẩu mới không được giống mật khẩu cũ');
      NotifyUtils.error('Mật khẩu mới không được trùng với mật khẩu gần nhất.');
      return false;
    }
    return true;
  };

  const validateConfirmPassword = (data) => {
    setErrorConfirmPassword(false);
    if (data === '') {
      setErrorConfirmPassword(true);
      setErrorConfirmPasswordMessage('Bạn chưa nhập lại mật khẩu mới');
      return false;
    }
    if (data !== newPassword) {
      setErrorConfirmPassword(true);
      setErrorConfirmPasswordMessage('Mật khẩu mới không khớp');
      return false;
    }
    return true;
  };

  // handle submit form

  const submitNewPasswordForm = async (data) => {
    const result = await AuthService.newPWUpdate(data);
    if (isValidWithoutData(result)) {
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
    }
  };

  const onSubmitNewPasswordForm = () => {
    const data = {
      password: currentPassword,
      newPassword,
      customerID,
    };
    if (!validatePw(currentPassword)) {
      return;
    }
    if (!validateNewPassword(data.newPassword, currentPassword)) {
      return;
    }
    if (!validateConfirmPassword(confirmPassword)) {
      return;
    }

    submitNewPasswordForm(data);
  };

  // handle input

  const handleOnChangePw = (e) => {
    e.preventDefault();
    validatePw(e.target.value);
    setCurrentPassword(e.target.value);
  };

  const handleOnChangeNewPassword = (e) => {
    e.preventDefault();
    validateNewPassword(e.target.value);
    setNewPassword(e.target.value);
  };

  const handleOnChangeConfirmPassword = (e) => {
    e.preventDefault();
    validateConfirmPassword(e.target.value);
    setConfirmPassword(e.target.value);
  };

  return (
    <form style={{ textAlign: 'center', margin: '30px 0' }}>
      <InputV2
        label="Mật khẩu cũ"
        id="new_password"
        type={isVisionOldPass ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" onClick={() => setIsVisionOldPass(!isVisionOldPass)} className={styles.btn}>
              {isVisionOldPass ? <VisibilityOutlined style={{ color: '#AFAFAF' }} /> : <VisibilityOffOutlined style={{ color: '#AFAFAF' }} />}
            </InputAdornment>
          ),
        }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleOnChangePw}
      />
      {errorPw && <div className={styles.error}>{errorPwMessage}</div>}

      <InputV2
        label="Mật khẩu mới"
        id="new_password"
        type={isVisionNewPass ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" onClick={() => setIsVisionNewPass(!isVisionNewPass)} className={styles.btn}>
              {isVisionNewPass ? <VisibilityOutlined style={{ color: '#AFAFAF' }} /> : <VisibilityOffOutlined style={{ color: '#AFAFAF' }} />}
            </InputAdornment>
          ),
        }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleOnChangeNewPassword}
      />
      <div className={styles.error}>{errorNewPassword && errorNewPasswordMessage}</div>
      <InputV2
        label="Nhập lại mật khẩu mới"
        id="new_password2"
        type={isVisionConfirmPass ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" onClick={() => setIsVisionConfirmPass(!isVisionConfirmPass)} className={styles.btn}>
              {isVisionConfirmPass ? <VisibilityOutlined style={{ color: '#AFAFAF' }} /> : <VisibilityOffOutlined style={{ color: '#AFAFAF' }} />}
            </InputAdornment>
          ),
        }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleOnChangeConfirmPassword}
      />
      <div className={styles.error}>{errorConfirmPassword && errorConfirmPasswordMessage}</div>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '10px' }}>
        <PasswordWarningText className={styles.text_warning_style} />
      </div>
      <div style={{ margin: '30px 0' }}>
        <Button className="my-order__button my-order__button--green" onClick={onSubmitNewPasswordForm}>
          Cập nhật{' '}
        </Button>
      </div>
    </form>
  );
};

export default FormChangePassword;
