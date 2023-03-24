import { Card, CardContent, Grid, IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { ADDRESS_CHANGE_TYPE } from 'constants/Enums';
import { useModal } from 'hooks';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddressCard from '../AddressCard';
import AddressModal from '../AddressModal';
import styles from './styles.module.css';

const DeliveryCardList = ({ isSelect = false, addresses, handleOnSelect, handleReloadData, selectAddressCode, customerID }) => {
  const [openAddressModal, toggleAddressModal] = useModal();
  const [value, setValue] = useState({
    name: '',
    phone: '',
    changeType: ADDRESS_CHANGE_TYPE.ASSIGNED,
    province: '0',
    district: '0',
    ward: '0',
  });

  const handleEdit = (address) => {
    setValue({
      ...address,
      changeType: ADDRESS_CHANGE_TYPE.ASSIGNED,
      province: address.provinceCode,
      district: address.districtCode,
      ward: address.wardCode,
    });
    toggleAddressModal();
  };

  const handleNew = () => {
    setValue({
      changeType: ADDRESS_CHANGE_TYPE.ASSIGNED,
      province: '0',
      district: '0',
      ward: '0',
    });
    toggleAddressModal();
  };

  return (
    <>
      <Grid container spacing={2}>
        {addresses.map((address) => (
          <AddressCard
            key={uuidv4()}
            address={address}
            isSelect={isSelect}
            handleReloadData={handleReloadData}
            handleEdit={handleEdit}
            handleOnSelect={handleOnSelect}
            selectAddressCode={selectAddressCode}
          />
        ))}

        {addresses.length <= 10 && (
          <Grid item xs={12} md={6}>
            <Card className={styles.card} onClick={handleNew} data-test="btn-add-new-address">
              <CardContent>
                <div className={styles.add_icon_column}>
                  <div className={styles.add_icon_row}>
                    <IconButton>
                      <AddCircleIcon size="large" />
                    </IconButton>
                    <b>Thêm địa chỉ </b>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
      <AddressModal
        visible={openAddressModal}
        onClose={toggleAddressModal}
        address={value}
        handleReloadData={handleReloadData}
        customerID={customerID}
      />
    </>
  );
};

export default DeliveryCardList;
