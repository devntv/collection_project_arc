import { Dialog, DialogContent, DialogTitle, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { CartClientV2, isValid } from 'clients';
import { DeliveryCardList } from 'components/mocules';
import { useAuth, useCart } from 'context';
import { memo, useCallback, useEffect, useState } from 'react';
import { CustomerService } from 'services';
import { NotifyUtils } from 'utils';
import styles from './styles.module.css';

const ManageAddressModal = memo((props) => {
  const { onClose, visible, handleLoadDataSelect, selectAddressCode } = props;
  const { updateCart } = useCart();
  const {
    user: { customerID },
  } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [addressCodeSelected, setAddressCodeSelected] = useState('');

  const loadData = useCallback(async () => {
    const addressList = await CustomerService.getListAddress({});
    setAddresses(addressList);
    return addressList;
  }, []);

  useEffect(() => {
    async function initData() {
      const addressList = await loadData();
      const addressCodeDefault = addressList.find((address) => address.isDefault)?.code || '';
      setAddressCodeSelected(addressCodeDefault);
    }
    initData();
  }, []);

  const handleOnSelect = async (address) => {
    try {
      const formData = {
        customerName: address.name,
        customerPhone: address.phone,
        customerShippingAddress: address.address,
        customerWardCode: address.wardCode,
        customerDistrictCode: address.districtCode,
        customerProvinceCode: address.provinceCode,
        customerAddressCode: address.code,
        customerID,
      };
      const result = await CartClientV2.updateCart({ body: formData });
      if (!isValid(result)) throw Error(result?.message || 'Chọn địa chỉ thất bại');
      NotifyUtils.success('Chọn địa chỉ thành công');
      updateCart();
      handleLoadDataSelect(formData);
      onClose();
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
        data-test="modal-manage-address"
      >
        <DialogTitle id="customized-dialog-title" onClose={onClose} style={{ width: '100%' }}>
          Thay đổi địa chỉ
          <IconButton aria-label="close" className={styles.close_button} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <DeliveryCardList
            addresses={addresses}
            isSelect
            addressCodeSelected={addressCodeSelected}
            handleOnSelect={handleOnSelect}
            handleReloadData={loadData}
            onCloseCardListModal={onClose}
            selectAddressCode={selectAddressCode}
            customerID={customerID}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default ManageAddressModal;
