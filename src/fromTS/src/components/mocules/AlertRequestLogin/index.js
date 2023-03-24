import { Grid } from '@material-ui/core';
import { LinkComp } from 'components/atoms';
import { useAuth } from 'context';

const AlertRequestLogin = ({ bgColor }) => {
  const { toggleLogin, toggleSignUp } = useAuth();

  return (
    <Grid
      container
      style={{ background: bgColor || '#F7F8FB', maxWidth: '400', borderRadius: '5px', padding: '5px', fontSize: '14px' }}
      alignItems="center"
    >
      Vui Lòng{' '}
      <LinkComp style={{ marginLeft: '2px', color: '#0E1983', cursor: 'pointer', fontSize: '14px' }} href="#" onClick={toggleLogin}>
        Đăng Nhập
      </LinkComp>
      /
      <LinkComp style={{ marginRight: '2px', color: '#0E1983', cursor: 'pointer', fontSize: '14px' }} href="#" onClick={toggleSignUp}>
        Đăng Ký
      </LinkComp>{' '}
      Để Xem Chi Tiết Hơn Về Sản Phẩm
    </Grid>
  );
};

export default AlertRequestLogin;
