import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { CustomerClient, isValidWithoutData } from 'clients';
import { Button, InputV2 } from 'components/atoms';
import GroupAddressSelectV2 from 'components/mocules/GroupAddressSelectV2';
import { ADDRESS_CHANGE_TYPE } from 'constants/Enums';
import { useAuth } from 'context';
import { memo, useState } from 'react';
import { NotifyUtils } from 'utils';
import styles from './styles.module.css';
import validateForm from './validateForm';

const DeliveryInfoModalV2 = memo((props) => {
  const { onClose, visible, address = {}, handleReloadData, isNewHandle = false, handleUpdate } = props;
  const {
    user: { customerID = '' },
  } = useAuth();
  const [val, setVal] = useState(address);
  const [addressSelected, setAddressSelected] = useState({
    province: address.provinceCode,
    district: address.districtCode,
    ward: address.wardCode,
    customerID,
    changeType: ADDRESS_CHANGE_TYPE.ASSIGNED,
  });

  const isEdit = address.code;
  const handleChangeValue = (key, value) => {
    setVal({ ...val, [key]: value });
  };

  const handleSetAddress = (addressInfo) => {
    setAddressSelected(addressInfo);
  };

  const handleClick = async () => {
    const formData = {
      ...val,
      wardCode: addressSelected.ward,
      districtCode: addressSelected.district,
      provinceCode: addressSelected.province,
      customerID,
    };
    // delete formData.isDefault;
    Object.keys(formData).forEach((key) => {
      if (typeof formData[key] === 'string') {
        formData[key] = formData[key].trim();
      }
    });
    try {
      validateForm(formData);
      if (isNewHandle && typeof handleUpdate === 'function') {
        handleUpdate(formData);
      } else if (isEdit) {
        const result = await CustomerClient.updateAddress({
          body: { ...formData, code: address.code },
        });
        if (!isValidWithoutData(result)) throw Error(result?.message || 'Cập nhật địa chỉ không thành công');
        NotifyUtils.success('Sửa địa chỉ thành công');
      } else {
        const result = await CustomerClient.createAddress({
          body: formData,
        });
        if (!isValidWithoutData(result)) throw Error(result?.message || 'Tạo mới địa chỉ không thành công');
        NotifyUtils.success('Tạo địa chỉ thành công');
      }

      onClose();

      if (typeof handleReloadData === 'function') {
        handleReloadData();
      }
    } catch (error) {
      NotifyUtils.error(error.message);
    }
  };
  return (
    <div className={styles.address_dialog}>
      <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={visible} className={styles.address_dialog}>
        <DialogTitle id="customized-dialog-title" onClose={onClose} style={{ width: '100%', color: '#292929' }}>
          {isEdit ? 'Chỉnh sửa thông tin giao hàng' : 'Thêm thông tin giao hàng'}
          <IconButton aria-label="close" className={styles.close_button} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <InputV2
            style={{ width: '-webkit-fill-available' }}
            label="Tên"
            required
            id="name"
            value={val?.name || ''}
            onChange={(e) => handleChangeValue('name', e.target.value)}
          />
          <InputV2
            style={{ width: '-webkit-fill-available' }}
            label="Số điện thoại"
            required
            id="phone"
            value={val?.phone || ''}
            onChange={(e) => handleChangeValue('phone', e.target.value)}
          />
          <InputV2
            style={{ width: '-webkit-fill-available' }}
            label="Địa chỉ"
            required
            id="address"
            onChange={(e) => handleChangeValue('address', e.target.value)}
            value={val?.address || ''}
          />
          <GroupAddressSelectV2 currentAddress={addressSelected} handleSetCurrentAddress={handleSetAddress} className={styles.address_group} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus className="my-order__button my-order__button--green" onClick={handleClick}>
            {isEdit ? 'Sửa' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default DeliveryInfoModalV2;
