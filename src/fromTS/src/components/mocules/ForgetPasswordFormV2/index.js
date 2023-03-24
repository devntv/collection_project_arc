import { Box, FormControl, Typography } from '@material-ui/core';
import PasswordWarningText from 'components-v2/atoms/PasswordWarningText';
import { Button, Input } from 'components/atoms';
import { useAuth } from 'context';
import React, { useEffect, useState } from 'react';
import { FormDataUtils } from 'utils';
import CircleTimer from '../CircleTimer';
import styles from './styles.module.css';

const ForgetPasswordFormV2 = React.memo(
  ({ className, onClickPhoneForm, onClickNewPasswordForm, step, onTimeout, isTimeOut, setIsTimeOut, toggleResend, onClose }) => {
    const { toggleLogin } = useAuth();
    const regExp = /(09|07|08|05|03|02[0|1|2|3|4|5|6|7|8|9])+([0-9]{8})\b/;
    const regExpOpt = /^.{6,6}$/;
    // const regExpPw = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(^.{8,20}$)/;
    const SECOND_TIMEOUT = 180;

    const [phoneValue, setPhoneValue] = useState(false);
    const [errorPhone, setErrorPhone] = useState(false);
    const [errorPhoneMessage, setErrorPhoneMessage] = useState('');

    const [errorOtp, setErrorOtp] = useState(false);
    const [errorOtpMessage, setErrorOtpMessage] = useState('');

    const [pwValue, setPwValue] = useState('');
    const [errorPw, setErrorPw] = useState(false);
    const [errorPwMessage, setErrorPwMessage] = useState('');

    const [errorPwConfirm, setErrorPwConfirm] = useState(false);
    const [errorPwConfirmMessage, setErrorPwConfirmMessage] = useState('');

    const [second, setSecond] = useState(0);

    const handleLoginFunc = () => {
      onClose();
      toggleLogin();
    };

    // handle validate
    const validatePhone = (data) => {
      setErrorPhone(false);
      if (data === '') {
        setErrorPhone(true);
        setErrorPhoneMessage('Vui lòng nhập số điện thoại');
        return false;
      }
      if (!data.match(regExp)) {
        setErrorPhone(true);
        setErrorPhoneMessage('Số điện thoại bạn nhập không đúng');
        return false;
      }
      return true;
    };

    const validateOtp = (data) => {
      setErrorOtp(false);
      if (data === '') {
        setErrorOtp(true);
        setErrorOtpMessage('Vui lòng nhập mã OTP');
        return false;
      }
      if (!data.match(regExpOpt)) {
        setErrorOtp(true);
        setErrorOtpMessage('Mã OTP gồm 6 chữ số');
        return false;
      }
      return true;
    };

    const validatePw = (data) => {
      setErrorPw(false);
      if (data === '') {
        setErrorPw(true);
        setErrorPwMessage('Bạn chưa điền mật khẩu');
        return false;
      }
      if (data.length > 30 || data.length < 2) {
        setErrorPw(true);
        setErrorPwMessage('Mật khẩu tối thiểu 2 và tối đa 30 kí tự');
        return false;
      }
      return true;
    };

    const validatePwConfirm = (data) => {
      setErrorPwConfirm(false);
      if (data === '') {
        setErrorPwConfirm(true);
        setErrorPwConfirmMessage('Bạn chưa điền mật khẩu xác nhận');
        return false;
      }
      if (data !== pwValue) {
        setErrorPwConfirm(true);
        setErrorPwConfirmMessage('Mật khẩu xác nhận không khớp');
        return false;
      }
      return true;
    };

    // handle submit form
    const onSubmitPhoneForm = (e) => {
      e.preventDefault();
      const data = FormDataUtils.convert(e);
      setPhoneValue(data.phoneNumber);
      if (!validatePhone(data.phoneNumber)) {
        return;
      }
      // data type is customer on web
      data.type = 'CUSTOMER';
      onClickPhoneForm(data);
    };

    const onSubmitNewPasswordForm = (e) => {
      e.preventDefault();
      const data = FormDataUtils.convert(e);
      if (!validateOtp(data.token)) {
        return;
      }
      if (!validatePw(data.newPassword) || !validatePwConfirm(data.confirmPassword)) {
        return;
      }
      delete data.confirmPassword;
      // data type is customer on web
      data.type = 'CUSTOMER';
      onClickNewPasswordForm(data);
    };

    // handle input
    const handleOnChangePhone = (e) => {
      e.preventDefault();
      validatePhone(e.target.value);
    };
    const handleOnChangeOpt = (e) => {
      e.preventDefault();
      validateOtp(e.target.value);
    };

    const handleOnChangePw = (e) => {
      e.preventDefault();
      setPwValue(e.target.value);
      validatePw(e.target.value);
    };

    const handleOnChangePwConfirm = (e) => {
      e.preventDefault();
      validatePwConfirm(e.target.value);
    };

    const startCoundown = (time) => {
      setSecond(time);
      setIsTimeOut(false);
    };

    const onResend = () => {
      startCoundown(SECOND_TIMEOUT);
      onClickPhoneForm({ phoneNumber: phoneValue, type: 'CUSTOMER' });
    };

    useEffect(() => {
      if (step === 2) {
        startCoundown(SECOND_TIMEOUT);
      }
    }, [toggleResend]);

    useEffect(() => {
      const timer = setTimeout(() => {
        if (second > 0) {
          setSecond(second - 1);
          // setMinute(Math.floor(second / 60));
        }
        if (second === 0) {
          onTimeout();
        }
      }, 1000);
      // Clear timeout if the component is unmounted
      return () => clearTimeout(timer);
    }, [second]);

    return (
      <div className={className}>
        {step === 1 && (
          <div>
            <div className={styles.desc}>Nhập số điện thoại cần khôi phục</div>
            <form className={className} onSubmit={onSubmitPhoneForm}>
              <FormControl fullWidth>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="number"
                  placeholder="Nhập số điện thoại"
                  variant="outlined"
                  className={styles.input}
                  error={errorPhone}
                  onChange={handleOnChangePhone}
                />
                <div className={styles.error}>{errorPhone && errorPhoneMessage}</div>
              </FormControl>
              <PasswordWarningText className={styles.mb_10} />
              <Box className={styles.center}>
                <Button type="submit" className={styles.btn}>
                  Gửi
                </Button>
              </Box>
            </form>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className={styles.desc}>Nhập mã OTP và mật khẩu mới</div>
            <form className={className} onSubmit={onSubmitNewPasswordForm}>
              <div className={styles.timing_wrapper}>
                {!isTimeOut ? (
                  <>
                    {/* <div className={styles.timing}>{second}</div> */}
                    <CircleTimer duration={second} />
                  </>
                ) : (
                  <Button className={styles.btn} onClick={onResend}>
                    Gửi lại
                  </Button>
                )}
              </div>
              <FormControl fullWidth>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="number"
                  placeholder="Nhập số điện thoại"
                  variant="outlined"
                  className={[styles.input, styles.disabled]}
                  value={phoneValue}
                  inputProps={{
                    readOnly: true,
                  }}
                />
              </FormControl>

              <FormControl fullWidth>
                <Input
                  className={styles.input}
                  id="token"
                  name="token"
                  text="text"
                  placeholder="Nhập mã OTP"
                  variant="outlined"
                  error={errorOtp}
                  onChange={handleOnChangeOpt}
                />
                {errorOtp && <div className={styles.error}>{errorOtpMessage}</div>}
              </FormControl>
              <FormControl fullWidth>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  variant="outlined"
                  className={styles.input}
                  error={errorPw}
                  onChange={handleOnChangePw}
                />
                {errorPw && <div className={styles.error}>{errorPwMessage}</div>}
              </FormControl>
              <FormControl fullWidth>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Xác nhận lại mật khẩu"
                  variant="outlined"
                  error={errorPwConfirm}
                  className={styles.input}
                  onChange={handleOnChangePwConfirm}
                />
                <div className={styles.error}>{errorPwConfirm && errorPwConfirmMessage}</div>
              </FormControl>
              <Box className={styles.center}>
                <Button type="submit" className={styles.btn}>
                  Gửi
                </Button>
              </Box>
            </form>
          </div>
        )}

        {(step === 3 || step === 4) && (
          <div>
            <div className={styles.confirm_modal_wrap}>
              <div>
                <div className={styles.warning_icon}>
                  <Typography className={styles.text_icon}>✓</Typography>
                </div>
                <Typography className={styles.modal_title}>Thay đổi mật khẩu thành công</Typography>
              </div>
            </div>
            <Box className={styles.center}>
              <Button className={styles.btn} onClick={handleLoginFunc}>
                Đăng nhập
              </Button>
            </Box>
          </div>
        )}
      </div>
    );
  },
);
export default ForgetPasswordFormV2;
