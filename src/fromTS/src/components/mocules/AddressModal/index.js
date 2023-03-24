import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { CustomerClient, isValidWithoutData } from 'clients';
import { Button, InfoFormControl } from 'components/atoms';
import { GROUP_ADDRESS_TYPE } from 'constants/Enums';
import { memo, useEffect, useState } from 'react';
import { NotifyUtils } from 'utils';
import GroupAddressSelect from '../GroupAddressSelect';
import InfoInput from '../InfoInput';
import styles from './styles.module.css';
import validateForm from './validateForm';

const AddressModal = memo((props) => {
  const { onClose, visible, address = {}, handleReloadData, customerID } = props;
  const [val, setVal] = useState(address);
  const [addressSelected, setAddressSelected] = useState(address);

  const isEdit = address.code;
  const handleChangeValue = (key, value) => {
    setVal({ ...val, [key]: value });
  };

  const handleSetAddress = (addressInfo) => {
    setAddressSelected(addressInfo);
  };
  useEffect(() => {
    setVal(address);
    setAddressSelected(address);
  }, [address]);

  const handleClick = async () => {
    const formData = {
      ...val,
      wardCode: addressSelected.ward,
      districtCode: addressSelected.district,
      provinceCode: addressSelected.province,
      customerID,
    };
    delete formData.isDefault;
    Object.keys(formData).forEach((key) => {
      if (typeof formData[key] === 'string') {
        formData[key] = formData[key].trim();
      }
    });
    try {
      validateForm(formData);
      if (isEdit) {
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
      handleReloadData();
    } catch (error) {
      NotifyUtils.error(error.message);
    }
  };
  return (
    <div className={styles.address_dialog}>
      <Dialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={visible}
        className={styles.address_dialog}
        data-test="modal-add-address"
      >
        <DialogTitle id="customized-dialog-title" onClose={onClose} style={{ width: '100%' }}>
          {isEdit ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ'}
          <IconButton aria-label="close" className={styles.close_button} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container direction="row">
            <Grid container direction="row" spacing={3}>
              <InfoFormControl xs={12} label="Tên" htmlFor="name" isRequired>
                <InfoInput
                  id="name"
                  value={val?.name || ''}
                  onChange={(e) => handleChangeValue('name', e.target.value)}
                  placeholder="Nhập tên"
                  data-test="input-address-name-modal"
                />
              </InfoFormControl>

              <InfoFormControl xs={12} label="Số điện thoại" htmlFor="phone" isRequired>
                <InfoInput
                  id="phone"
                  value={val?.phone || ''}
                  onChange={(e) => handleChangeValue('phone', e.target.value)}
                  placeholder="Nhập số điện thoại"
                  data-test="input-address-phone-modal"
                />
              </InfoFormControl>

              <InfoFormControl xs={12} label="Địa chỉ" htmlFor="address" isRequired>
                <InfoInput
                  id="address"
                  value={val?.address || ''}
                  onChange={(e) => handleChangeValue('address', e.target.value)}
                  placeholder="Nhập toà nhà ,tên đường, ..."
                  data-test="input-address-place-modal"
                />
              </InfoFormControl>
            </Grid>
            <GroupAddressSelect currentAddress={addressSelected} handleSetCurrentAddress={handleSetAddress} type={GROUP_ADDRESS_TYPE.VERTICAL} />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            color="primary"
            variant="contained"
            className="my-order__button--secondary"
            style={{ borderRadius: '30px', padding: '5px 40px' }}
            onClick={handleClick}
            data-test="btn-address-add-modal"
          >
            {isEdit ? 'Sửa' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default AddressModal;
