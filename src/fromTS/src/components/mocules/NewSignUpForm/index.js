import { yupResolver } from '@hookform/resolvers/yup';
import { Box, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, NativeSelect, Radio, RadioGroup, Typography } from '@material-ui/core';
import {
  EmailOutlined as EmailIcon,
  ExpandMore as ExpandMoreIcon,
  LocationOn as LocationOnIcon,
  PeopleOutlined as PeopleIcon,
  PhoneOutlined as PhoneIcon,
} from '@material-ui/icons';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ErrorIconOutlined from '@material-ui/icons/ErrorOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import clsx from 'clsx';
import PasswordWarningText from 'components-v2/atoms/PasswordWarningText';
import { Button, CheckBox, Input } from 'components/atoms';
import { BRAND_NAME, ENUM_SCOPE } from 'constants/Enums';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { isDesktop, isMobile } from 'react-device-detect';
import { Controller, useForm } from 'react-hook-form';
import AddressService from 'services/AddressService';
import { NotifyUtils, regUtils, ValidateUtils } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from './styles.module.css';

const { validateData, Error, isEmpty } = ValidateUtils;
const { PHONE_REGEX, EMAIL_REGEX } = regUtils;

const validateSignUp = ({ isCheckAgree, name, email, password, phone }, failCallback) => {
  try {
    validateData.name(name);
    validateData.phoneNumber(phone);
    if (!isEmpty(email)) {
      validateData.email(email);
    }
    validateData.password(password);
    if (!isCheckAgree) throw new Error('Vui lòng chọn Đồng ý với Điều khoản sử dụng.');
    return true;
  } catch (error) {
    NotifyUtils.error(error?.message || 'Đã có lỗi xảy ra');
    failCallback(error);
    return false;
  }
};

const NewSignUpForm = React.memo((props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { className, onClickSignIn, onClickSignUp, referCode, page, setPage, handleScrollTop } = props;
  const [provinces, setProvinces] = useState([]);
  const beta = useMobileV2((state) => state.beta);
  const router = useRouter();

  const schema = yup
    .object({
      name: yup.string().required('Bạn chưa điền tên đăng nhập').min(2, 'Tên đăng nhập phải có ít nhất 2 ký tự'),
      password: yup.string().required('Bạn chưa điền mật khẩu'),
      phone: yup.string().required('Bạn chưa điền số điện thoại').matches(PHONE_REGEX, 'Số điện thoại không đúng định dạng'),
      email: yup.string().matches(EMAIL_REGEX, 'Email không đúng định dạng'),
    })
    .required();
  const {
    formState: { errors },
    control,
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    const getListProvince = async () => {
      try {
        const provinceResult = await AddressService.getProvinces();
        setProvinces(provinceResult);
        reset({ provinceCode: provinceResult[0]?.value });
      } catch (error) {
        NotifyUtils.error('Lấy danh sách tỉnh thành không thành công');
      }
    };
    getListProvince();
  }, [reset]);

  const handleSubmitSignUp = useCallback(
    (data) => {
      // validate
      if (
        validateSignUp(data, (error) => {
          if (error) {
            const newError = {};
            newError[error.type] = true;
            // setErrors({ ...newError });
          }
        })
      ) {
        onClickSignUp(data);
      }
    },
    [onClickSignUp],
  );

  const handleClickSignIn = useCallback(
    (e) => {
      e.preventDefault();
      onClickSignIn();
    },
    [onClickSignIn],
  );

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickTerms = useCallback(
    (e) => {
      e.preventDefault();
      router.push('/?terms=true');
      setPage(page + 2);
      handleScrollTop();
    },
    [page],
  );

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

  const IconPhone = (
    <InputAdornment position="start" className={styles.input_icon}>
      <PhoneIcon />
    </InputAdornment>
  );

  const IconLocation = (
    <InputAdornment position="start" className={styles.input_icon}>
      <LocationOnIcon />
    </InputAdornment>
  );
  const IconEndPassword = (
    <InputAdornment position="end" className={styles.input_icon}>
      <IconButton onClick={handleClickShowPassword}>{!showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}</IconButton>
    </InputAdornment>
  );
  const IconInviter = (
    <InputAdornment position="start" className={styles.input_icon}>
      <PeopleIcon />
    </InputAdornment>
  );
  const IconEmail = (
    <InputAdornment position="start" className={styles.input_icon}>
      <EmailIcon />
    </InputAdornment>
  );

  const labelAgree = (
    <div>
      Tôi đã đọc và đồng ý với&nbsp;
      {beta && isMobile ? (
        <Box component="a" onClick={handleClickTerms} style={{ color: '#09884D' }}>
          Điều khoản sử dụng*
        </Box>
      ) : (
        <a href="/terms-and-condition" target="_blank" rel="noreferrer" style={{ color: '#09884D' }}>
          Điều khoản sử dụng*
        </a>
      )}
      {/* <a href="/terms-and-condition" target="_blank" rel="noreferrer" style={{ color: '#09884D' }}>
        Điều khoản sử dụng*
      </a> */}
    </div>
  );

  return (
    <div className={clsx(className, styles.form_sign_up)}>
      {beta && isMobile && (
        <div className={styles.wrapperTitle} style={{ marginTop: '60px' }}>
          <p className="title">Đăng ký thành viên</p>
        </div>
      )}
      <form className={className} onSubmit={handleSubmit(handleSubmitSignUp)}>
        <Controller
          name="name"
          defaultValue=""
          control={control}
          className={styles.form_control}
          render={({ field }) => (
            <FormControl fullWidth>
              <Input
                startAdornment={IconAccount}
                placeholder="Nhập tên *"
                variant="outlined"
                error={!!errors.name || false}
                className={styles.input}
                data-test="signup-username"
                {...field}
              />
              {errors.name?.message && (
                <div className={styles.text_error} data-test="signup-err-username">
                  <ErrorIconOutlined /> {errors.name?.message}
                </div>
              )}
            </FormControl>
          )}
        />

        <Controller
          name="phone"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <Input
                startAdornment={IconPhone}
                placeholder="Nhập số điện thoại *"
                variant="outlined"
                error={!!errors.phone || false}
                className={styles.input}
                data-test="signup-phone"
                {...field}
              />
              {errors.phone?.message && (
                <div className={styles.text_error} data-test="signup-err-phone">
                  <ErrorIconOutlined /> {errors.phone?.message}
                </div>
              )}
            </FormControl>
          )}
        />

        <Controller
          name="email"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <Input
                startAdornment={IconEmail}
                placeholder="Nhập email"
                variant="outlined"
                error={!!errors.email || false}
                className={styles.input}
                data-test="signup-email"
                {...field}
              />
              {errors.email?.message && (
                <div className={styles.text_error} data-test="signup-err-email">
                  <ErrorIconOutlined /> {errors.email?.message}
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
                type={showPassword ? 'text' : 'password'}
                autoComplete="password"
                startAdornment={IconPassword}
                endAdornment={IconEndPassword}
                placeholder="Nhập mật khẩu *"
                variant="outlined"
                error={!!errors.password || false}
                className={styles.input}
                data-test="signup-password"
                {...field}
              />
              {errors.password?.message && (
                <div className={styles.text_error} data-test="signup-err-password">
                  <ErrorIconOutlined /> {errors.password?.message}
                </div>
              )}
            </FormControl>
          )}
        />
        <PasswordWarningText className={styles.mt_16} />
        <Controller
          name="provinceCode"
          defaultValue={provinces[0]?.value}
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <NativeSelect
                IconComponent={ExpandMoreIcon}
                input={<Input data-test="signup-provinceCode" startAdornment={IconLocation} />}
                className={styles.province}
                {...field}
              >
                {provinces.map((province) => (
                  <option value={province.value} key={uuidv4()}>
                    {province.label}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          )}
        />

        <Controller
          name="referCode"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <Input
                startAdornment={IconInviter}
                value={referCode}
                placeholder="Nhập mã người giới thiệu."
                variant="outlined"
                disabled={!!referCode}
                className={styles.input}
                data-test="signup-referCode"
                {...field}
              />
            </FormControl>
          )}
        />
        <Controller
          name="scope"
          defaultValue={ENUM_SCOPE.PHARMACY}
          control={control}
          render={({ field }) => (
            <Grid container className={styles.radio_wrapper} {...field}>
              <RadioGroup className={styles.radioGroup} defaultValue={ENUM_SCOPE.PHARMACY} aria-label="scope" name="scope" row>
                <Grid item xs={6}>
                  <FormControlLabel className={styles.item} value={ENUM_SCOPE.PHARMACY} control={<Radio />} label="Nhà thuốc" />
                  <FormControlLabel className={styles.item} value={ENUM_SCOPE.CLINIC} control={<Radio />} label="Phòng khám" />
                  <FormControlLabel className={styles.item} value={ENUM_SCOPE.DRUGSTORE} control={<Radio />} label="Quầy thuốc" />
                  <FormControlLabel className={styles.item} value={ENUM_SCOPE.HOSPITAL} control={<Radio />} label="Bệnh viện" />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel className={styles.item} value={ENUM_SCOPE.PHARMA_COMPANY} control={<Radio />} label="Trung tâm y tế" />
                  <FormControlLabel className={styles.item} value={ENUM_SCOPE.DENTISTRY} control={<Radio />} label="Nha khoa" />
                  <FormControlLabel className={styles.item} value={ENUM_SCOPE.BEAUTY_SALON} control={<Radio />} label="Thẩm mỹ viện" />
                  <FormControlLabel className={styles.item} value={ENUM_SCOPE.HEALTH_CENTER} control={<Radio />} label="Công ty Dược phẩm" />
                </Grid>
              </RadioGroup>
            </Grid>
          )}
        />
        <Typography className={styles.disclaimer}>
          Để tài khoản được kích hoạt, quý khách hàng vui lòng cung cấp cho {BRAND_NAME} đầy đủ các giấy phép theo quy định của pháp luật.
        </Typography>
        <Controller
          name="isCheckAgree"
          defaultValue={false}
          control={control}
          render={({ field }) => (
            <div className={styles.agree_term}>
              <CheckBox data-test="signup-isCheckAgree" label={labelAgree} {...field} />
            </div>
          )}
        />
        {isDesktop && (
          <div className={`${styles.link_login_wrapper} ${styles.center}`}>
            <p>
              Nếu bạn đã có tài khoản, vui lòng&nbsp;
              <a href="#top" className={styles.link_login} onClick={handleClickSignIn}>
                Đăng nhập
              </a>
            </p>
          </div>
        )}

        <Box className={styles.center}>
          <Button className={styles.btn_register} type="submit" data-test="signup-submit">
            Tạo tài khoản
          </Button>
        </Box>
      </form>
    </div>
  );
});

export default NewSignUpForm;
