import { Avatar } from '@material-ui/core';
import { Button } from 'components/atoms';
import InputV2 from 'components/atoms/InputV2';

const FormAccountInfo = ({ name, phone, email, handleSetValue, handleUpdateProfile }) => (
  <div style={{ textAlign: 'center', margin: '30px 0' }}>
    <Avatar alt="" scr="" style={{ margin: 'auto', width: '150px', height: '150px', marginBottom: 10 }} />
    <InputV2
      label="Họ và tên khách hàng"
      id="name"
      required
      value={name}
      onChange={(e) => {
        handleSetValue('name', e.target.value);
      }}
      InputLabelProps={{
        shrink: true,
      }}
    />

    <InputV2
      label="Số điện thoại"
      id="phone"
      required
      value={phone}
      onChange={(e) => handleSetValue('phone', e.target.value)}
      InputLabelProps={{
        shrink: true,
      }}
    />
    <InputV2
      label="Email"
      id="email"
      value={email}
      onChange={(e) => handleSetValue('email', e.target.value)}
      InputLabelProps={{
        shrink: true,
      }}
    />
    <div style={{ margin: '30px 0' }}>
      <Button className="my-order__button my-order__button--green" onClick={handleUpdateProfile}>
        Cập nhật{' '}
      </Button>
    </div>
  </div>
);
export default FormAccountInfo;
