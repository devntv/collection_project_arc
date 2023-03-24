import { FormControl, IconButton, InputAdornment } from '@material-ui/core';
import { AccountCircle, LockOutlined as LockOutlinedIcon, Visibility, VisibilityOff } from '@material-ui/icons';
import { Button, CheckBox, Input } from 'components/atoms';
import { useModal } from 'hooks';
import React, { useCallback, useState } from 'react';
import EventUtils from 'utils/EventUtils';

const SignInForm = React.memo(({ className, onClickForget, onClickLogin, onClickSignUp }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorUserName, setErrorUserName] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, toggleRememberMe] = useModal(true);

  const validateLogin = (data) => {
    setErrorUserName(false);
    setErrorPassword(false);
    if (!data) {
      setErrorUserName(true);
      setErrorPassword(true);
      return false;
    }

    if (!data.username) {
      setErrorUserName(true);
      return false;
    }

    if (!data.password) {
      setErrorPassword(true);
      return false;
    }
    return true;
  };

  // handle login with data
  const handleLogin = () => {
    const data = { username: userName, password, rememberMe };
    if (!validateLogin(data)) {
      return;
    }
    onClickLogin(data);
  };

  // handle forget password
  const handleClickForget = useCallback(
    (e) => {
      e.preventDefault();
      onClickForget();
    },
    [onClickForget],
  );

  const handleClickSignUp = useCallback(
    (e) => {
      e.preventDefault();
      onClickSignUp();
    },
    [onClickSignUp],
  );

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const IconAccount = (
    <InputAdornment position="start">
      <AccountCircle />
    </InputAdornment>
  );
  const IconPassword = (
    <InputAdornment position="start">
      <LockOutlinedIcon />
    </InputAdornment>
  );

  const IconEndPassword = (
    <InputAdornment position="end">
      <IconButton onClick={handleClickShowPassword}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
    </InputAdornment>
  );

  return (
    <div className={className}>
      <form className={className} onSubmit={handleLogin}>
        <FormControl className="form-control">
          <Input
            id="username"
            name="username"
            startAdornment={IconAccount}
            placeholder="Nhập số điện thoại hoặc email"
            variant="outlined"
            error={errorUserName}
            onChange={(e) => setUserName(e?.target?.value || '')}
            onKeyPress={(e) => EventUtils.handleKeyPressEnter(e, handleLogin)}
          />
        </FormControl>
        <FormControl className="form-control">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            startAdornment={IconPassword}
            endAdornment={IconEndPassword}
            placeholder="Nhập mật khẩu"
            variant="outlined"
            error={errorPassword}
            onChange={(e) => setPassword(e?.target?.value || '')}
            onKeyPress={(e) => EventUtils.handleKeyPressEnter(e, handleLogin)}
          />
        </FormControl>
        <div className="rememberPassword">
          <CheckBox isChecked={rememberMe} onClick={toggleRememberMe} name="rememberMe" label="Giữ tôi đăng nhập" />
        </div>
        <div className="forgetPassword">
          <a href="/" className="forgetPassword" onClick={handleClickForget}>
            Quên Mật Khẩu
          </a>
        </div>
        <Button className="btnLogin" color="white" onClick={handleLogin}>
          Đăng Nhập
        </Button>
        <div className="register">
          <span className="text-capitalize">
            Để nhận Ưu đãi hấp dẫn,{' '}
            <a href="#top" style={{ color: '#f9b514', padding: '2px' }} onClick={handleClickSignUp}>
              <strong>Đăng ký thành viên</strong>
            </a>
          </span>
        </div>
      </form>
    </div>
  );
});

export default SignInForm;
