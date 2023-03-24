import { Grid, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { InfoFormControl } from 'components/atoms';
import { useAuth } from 'context';
import React from 'react';
import InfoInput from '../InfoInput';
import styles from './styles.module.css';

const AccountForm = ({ name, email, phone, handleSetValue, err }) => {
  // const [isShowPassword, setIsShowPassword] = useState(false);
  const { toggleChangePassword } = useAuth();
  // const handleClickShowPassword = () => {
  //   setIsShowPassword(!isShowPassword);
  // };
  // const IconEndPassword = () => (
  //   <InputAdornment className={styles.padding_none}>
  //     <IconButton onClick={handleClickShowPassword}>{isShowPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
  //   </InputAdornment>
  // );
  return (
    <Paper className={styles.root} elevation={4}>
      <h1 className={styles.title}> Thông tin tài khoản </h1>
      <Grid container>
        <InfoFormControl xs={12} isRequired label="Họ tên khách hàng" htmlFor="name" error={err.name}>
          <InfoInput id="name" placeholder="Họ và tên" value={name} error={err.name} onChange={(e) => handleSetValue('name', e.target.value)} />
        </InfoFormControl>

        <InfoFormControl xs={12} isRequired label="Số điện thoại" htmlFor="phone" error={err.phone}>
          <InfoInput
            id="phone"
            placeholder="Số điện thoại"
            value={phone}
            error={err.phone}
            onChange={(e) => handleSetValue('phone', e.target.value)}
          />
        </InfoFormControl>

        <InfoFormControl xs={12} label="Email" htmlFor="email" error={err.email}>
          <InfoInput id="email" placeholder="Email" value={email} error={err.email} onChange={(e) => handleSetValue('email', e.target.value)} />
        </InfoFormControl>

        <div className={styles.changepw}>
          <Button onClick={toggleChangePassword} color="primary">
            Thay đổi mật khẩu
          </Button>
        </div>
        {/* TODO: off change password */}
        {/* <InfoFormControl xs={12} label="Mật khẩu mới" htmlFor="password">
          <InfoInput
            id="password"
            type={isShowPassword ? 'text' : 'password'}
            endAdornment={<IconEndPassword />}
            value={password}
            onChange={(e) => handleSetValue('password', e.target.value)}
          />
          <FormHelperText>Mật khẩu dài tối thiểu 6 ký tự</FormHelperText>
        </InfoFormControl> */}
      </Grid>
    </Paper>
  );
};
export default AccountForm;
