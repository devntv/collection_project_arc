import { FormControl, IconButton, InputAdornment, Typography } from '@material-ui/core';
import { LockOutlined as LockOutlinedIcon, Visibility, VisibilityOff } from '@material-ui/icons';
import { Button, Input } from 'components/atoms';
import React, { useState } from 'react';
import { NotifyUtils } from 'utils';
import styles from './styles.module.css';

const NewChangePasswordForm = React.memo(({ className, onClickNewPasswordForm, step, toggleModalAndSignout }) => {
  // const regExpPw = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(^.{8,20}$)/;

  const [showPassword, setShowPassword] = useState(false);

  const [errorPw, setErrorPw] = useState(false);
  const [errorPwMessage, setErrorPwMessage] = useState('');

  const [errorNewPassword, setErrorNewPassword] = useState(false);
  const [errorNewPasswordMessage, setErrorNewPasswordMessage] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

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
    // if (!data.match(regExpPw)) {
    //   setErrorPw(true);
    //   setErrorPwMessage(
    //     'Mật khẩu phải ít nhất 8 ký tự và không quá 20 ký tự. Có chứa ít nhất 1 chữ thường, 1 chữ hoa, và 1 số',
    //   );
    //   return false;
    // }
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
      // setErrorNewPasswordMessage('Mật khẩu mới không được trùng với mật khẩu gần nhất.');
      NotifyUtils.error('Mật khẩu mới không được trùng với mật khẩu gần nhất.');
      return false;
    }
    return true;
  };

  // handle submit form

  const onSubmitNewPasswordForm = () => {
    const data = {
      password: currentPassword,
      newPassword,
    };
    if (!validateNewPassword(data.newPassword, currentPassword)) {
      return;
    }
    onClickNewPasswordForm(data);
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const IconPassword = (
    <InputAdornment position="start" className={styles.input_icon}>
      <LockOutlinedIcon />
    </InputAdornment>
  );

  const IconEndPassword = (
    <InputAdornment position="end" className={styles.input_icon}>
      <IconButton onClick={handleClickShowPassword}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
    </InputAdornment>
  );

  return (
    <div className={className}>
      {step === 1 && (
        <div className={styles.forget_password}>
          <form className={`${styles.form_forget_password} ${className}`}>
            <FormControl fullWidth className={styles.form_control}>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Vui Lòng nhập mật khẩu hiện tại"
                variant="outlined"
                className={styles.input}
                error={errorPw}
                onChange={handleOnChangePw}
              />
              {errorPw && <div className={styles.error}>{errorPwMessage}</div>}
            </FormControl>
            <FormControl fullWidth className={styles.form_control}>
              <Input
                id="newPassword"
                name="newPassword"
                type={showPassword ? 'text' : 'password'}
                startAdornment={IconPassword}
                endAdornment={IconEndPassword}
                placeholder="Vui lòng nhập mật khẩu mới"
                variant="outlined"
                error={errorNewPassword}
                className={styles.input}
                onChange={handleOnChangeNewPassword}
              />
              <div className={styles.error}>{errorNewPassword && errorNewPasswordMessage}</div>
            </FormControl>
            <div className={styles.center}>
              <Button className={styles.btn} onClick={onSubmitNewPasswordForm}>
                Gửi
              </Button>
            </div>
          </form>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className={styles.confirm_modal_wrap}>
            <div className={styles.center}>
              <div className={styles.warning_icon}>
                <Typography className={styles.text_icon}>✓</Typography>
              </div>
              <Typography className={styles.modal_title}>Thành công</Typography>
              <Typography className={styles.modal_title}>Đăng nhập lại để hoàn tất!</Typography>
            </div>
          </div>
          <div className={styles.center}>
            <Button className={styles.btn} onClick={toggleModalAndSignout}>
              Đăng nhập lại
            </Button>
          </div>
        </div>
      )}
    </div>
  );
});
export default NewChangePasswordForm;
