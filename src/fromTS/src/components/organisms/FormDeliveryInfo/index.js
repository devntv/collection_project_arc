import { Grid, IconButton, Tooltip, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { CustomerClient, isValidWithoutData } from 'clients';
import DeleteAddressModal from 'components/mocules/DeleteAddressModal';
import DeliveryInfoModalV2 from 'components/mocules/DeliveryInfoModalV2';
import { useModal } from 'hooks';
import { useCallback, useEffect, useState } from 'react';
import { CustomerService } from 'services';
import { NotifyUtils } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const CardDeliveryInfo = ({ deliveryInfo, handleReloadData }) => {
  const [open, toggle] = useModal();
  const [openDel, toggleDel] = useModal();

  const { name = '', phone = '', masterAddress = '', isDefault = false, code = '', customerID = '' } = deliveryInfo || {};

  const handleDelete = async () => {
    try {
      const result = await CustomerClient.deleteAddress({ code, customerID });
      if (!isValidWithoutData(result)) throw Error(result?.message || 'Xoá địa chỉ không thành công');
      NotifyUtils.success('Xoá địa chỉ thành công');
      handleReloadData();
    } catch (error) {
      NotifyUtils.error(error.message);
    }
  };

  const handleSetDefault = async () => {
    try {
      const result = await CustomerClient.updateAddressDefault({ code, customerID });
      if (!isValidWithoutData(result)) throw Error(result?.message || 'Cập nhật địa chỉ mặc định không thành công');
      NotifyUtils.success('Cập nhật địa chỉ mặc định thành công');
      handleReloadData();
    } catch (error) {
      NotifyUtils.error(error.message);
    }
  };
  return (
    <>
      <div className={styles.wrapCard}>
        <div className={styles.cardHeader}>
          <Typography className={styles.cardTitle}>Địa chỉ {isDefault && 'mặc định'} </Typography>
          <div style={{ display: 'flex' }}>
            <Tooltip title="Xóa">
              <IconButton onClick={toggleDel}>
                <DeleteOutlineRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Sửa">
              <IconButton onClick={toggle}>
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            {!isDefault && (
              <Tooltip title="Đặt làm mặc định">
                <IconButton onClick={handleSetDefault}>
                  <LocationOnOutlinedIcon />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </div>
        <div className={styles.content}>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Typography className={styles.subTitle}>Tên:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>{name}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={styles.subTitle}>Số điện thoại:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>{phone}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={styles.subTitle}>Địa chỉ:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>{masterAddress}</Typography>
            </Grid>
          </Grid>
        </div>
      </div>
      <DeliveryInfoModalV2 visible={open} onClose={toggle} address={deliveryInfo} handleReloadData={handleReloadData} />
      <DeleteAddressModal visible={openDel} onClose={toggleDel} onClickOk={handleDelete} />
    </>
  );
};
const CardAddDeliveryInfo = ({ handleReloadData }) => {
  const [open, toggle] = useModal();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.addCard}>
          <IconButton onClick={toggle}>
            <AddIcon style={{ color: '#09884D' }} />
          </IconButton>
        </div>
      </div>
      <DeliveryInfoModalV2 visible={open} onClose={toggle} handleReloadData={handleReloadData} />
    </>
  );
};
const FormDeliveryInfo = () => {
  const [addresses, setAddresses] = useState([]);

  const loadData = useCallback(async () => {
    const addressList = await CustomerService.getListAddress({});
    setAddresses(addressList);
  }, []);

  useEffect(() => {
    loadData();
  }, []);
  return (
    <Grid container spacing={2}>
      {addresses.length > 0 &&
        addresses.map((item) => (
          <Grid item md={6} key={uuidv4()} style={{ width: '100%' }}>
            <CardDeliveryInfo deliveryInfo={item} handleReloadData={loadData} />
          </Grid>
        ))}
      {addresses.length < 2 && (
        <Grid item md={6} style={{ width: '100%' }}>
          <CardAddDeliveryInfo handleReloadData={loadData} />
        </Grid>
      )}
    </Grid>
  );
};
export default FormDeliveryInfo;
