import { yupResolver } from '@hookform/resolvers/yup';
import { Box, FormControl, Grid, IconButton, InputAdornment, Switch } from '@material-ui/core';
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ErrorIconOutlined from '@material-ui/icons/ErrorOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import clsx from 'clsx';
import MobileBadge from 'components-v2/atoms/MobileBadge';
import PasswordWarningText from 'components-v2/atoms/PasswordWarningText';
import { Button, CheckBox, Input, LinkComp } from 'components/atoms';
import { BRAND_NAME } from 'constants/Enums';
import { ICON_MOBILE_ICON_HOME, MOBILE_LOGO } from 'constants/Images/mobile/Icons';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Controller, useForm } from 'react-hook-form';
import { checkNewUser } from 'utils/transVersion';
import * as yup from 'yup';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from '../NewSignUpForm/styles.module.css';

const NewSignInForm = ({
  className,
  onClickForget,
  onClickLogin,
  onClickSignUp,
  isLoading = false,
  page = null,
  setPage = null,
  isShowLogin = false,
  isShowSignUp = false,
  toggleLogin,
  toggleSignUp,
  user,
}) => {
  const schema = yup
    .object({
      username: yup.string().required('Bạn chưa điền số điện thoại hoặc email đăng nhập'),
      password: yup.string().required('Bạn chưa điền mật khẩu'),
    })
    .required();
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const handleChangeUI = useMobileV2((state) => state.toggleBeta);
  const beta = useMobileV2((state) => state.beta);
  // handle login with data
  const handleLogin = (data) => {
    onClickLogin(data);
    // if (isAuthenticated && isMobile && beta && openNewLogin) {
    //   handleLoginV2();
    //   console.log(123);
    // }
    // if (isAuthenticated && isMobile && beta && openSignupV2) {
    //   handleSignupV2();
    // }
  };

  // handle forget password
  const handleClickForget = useCallback(
    (e) => {
      if (isMobile && beta) {
        e.preventDefault();
        router.push('/?forgetpass=true');
        setPage(page + 2);
      } else {
        e.preventDefault();
        onClickForget();
      }
    },
    [onClickForget, page, isMobile],
  );

  const handleClickSignUp = useCallback(
    (e) => {
      if (isMobile && beta) {
        e.preventDefault();
        router.push('/?register=true');
        setPage(page + 1);
      } else {
        e.preventDefault();
        onClickSignUp();
      }
    },
    [onClickSignUp, page, isMobile],
  );

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const IconAccount = (
    <InputAdornment position="start" className={styles.input_icon}>
      <AccountCircleOutlinedIcon />
    </InputAdornment>
  );
  const IconPassword = (
    <InputAdornment position="start" className={styles.input_icon}>
      <LockOutlinedIcon />
    </InputAdornment>
  );

  const IconEndPassword = (
    <InputAdornment position="end" className={styles.input_icon}>
      <IconButton onClick={handleClickShowPassword}>{showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}</IconButton>
    </InputAdornment>
  );

  return (
    <div className={className}>
      {beta && isMobile && (
        <div className={styles.wrapperTitle}>
          <Box marginBottom="100px" marginTop="20px" display="flex" justifyContent="space-between">
            <LinkComp href="/">
              <MOBILE_LOGO className={styles.logo} />
              {/* <Image className={styles.logo} href="/" src={} width="50px" height="50px" /> */}
            </LinkComp>
            {/* <MobileBadge className={clsx(styles.badge, styles.greenIcon)} onClick={onClickLogin}>
              <ICON_MOBILE_ICON_HOME />
            </MobileBadge>
            <MobileBadge className={clsx(styles.badge, styles.greenIcon)} onClick={onClickLogin}>
              <ICON_MOBILE_ICON_HOME />
            </MobileBadge> */}
            {isShowLogin && (
              <MobileBadge className={clsx(styles.badge, styles.greenIcon)} onClick={toggleLogin}>
                <ICON_MOBILE_ICON_HOME />
              </MobileBadge>
            )}
            {isShowSignUp && (
              <MobileBadge className={clsx(styles.badge, styles.greenIcon)} onClick={toggleSignUp}>
                <ICON_MOBILE_ICON_HOME />
              </MobileBadge>
            )}
          </Box>
          <p className="title">Chào mừng đến với {BRAND_NAME}</p>
          <p className="desc">Đăng nhập để nhận nhiểu ưu đãi hấp dẫn</p>
        </div>
      )}

      <form className={className} onSubmit={handleSubmit((data) => handleLogin(data))}>
        <Controller
          name="username"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <Input
                error={!!errors.username}
                startAdornment={IconAccount}
                placeholder="Nhập số điện thoại hoặc email"
                variant="outlined"
                className={styles.input}
                {...field}
                data-test="signin-username"
              />
              {errors.username?.message && (
                <div className={styles.text_error} data-test="signin-err-username">
                  <ErrorIconOutlined /> {errors.username?.message}
                </div>
              )}
            </FormControl>
          )}
        />
        <Controller
          name="password"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <Input
                error={!!errors.password}
                type={showPassword ? 'text' : 'password'}
                startAdornment={IconPassword}
                endAdornment={IconEndPassword}
                placeholder="Nhập mật khẩu"
                autoComplete="password"
                variant="outlined"
                className={styles.input}
                {...field}
                data-test="signin-password"
              />
              {errors.password?.message && (
                <div className={styles.text_error} data-test="signin-err-password">
                  <ErrorIconOutlined /> {errors.password?.message}
                </div>
              )}
            </FormControl>
          )}
        />
        <Controller
          name="rememberMe"
          defaultValue
          control={control}
          render={({ field }) => (
            <div className={styles.agree_term} style={{ padding: '0 0 1rem 0' }}>
              <CheckBox
                data-test="signin-rememberMe"
                label="Giữ tôi đăng nhập"
                onChange={(e) => field.onChange(e.target.checked)}
                isChecked={field.value}
                {...field}
              />
            </div>
          )}
        />
        <div style={{ marginBottom: '20px' }}>
          <PasswordWarningText />
        </div>
        <div className={`${styles.link_login_wrapper} ${styles.center}`}>
          <a href="/" className={styles.link_login} onClick={handleClickForget}>
            Quên Mật Khẩu
          </a>
        </div>
        <Box className={styles.center}>
          <Button className={styles.btn_register} type="submit" disabled={isLoading} data-test="signin-submit">
            Đăng Nhập
          </Button>
        </Box>
        <div className={`${styles.link_login_wrapper} ${styles.center}`}>
          <p>
            Để nhận Ưu đãi hấp dẫn,&nbsp;
            <a href="#top" className={styles.link_login} onClick={handleClickSignUp}>
              Đăng ký thành viên
            </a>
          </p>
        </div>
      </form>
      {beta && isMobile && !checkNewUser(user?.account?.createdTime) && (
        <Box display="flex" justifyContent="center">
          <Grid component="label" container alignItems="center" justifyContent="center" spacing={1}>
            <Grid item style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Switch color="primary" checked={beta} onChange={handleChangeUI} name="checkedMobileNew" />
              <div style={{ fontFamily: 'googlesansregular', fontSize: '14px', color: '#000000DE' }}>Trải nghiệm giao diện mới</div>
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
};

export default NewSignInForm;
