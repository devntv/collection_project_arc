import { Paper } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { CustomerService } from 'services';
import DeliveryCardList from '../DeliveryCardList';
import styles from './styles.module.css';

const DeliveryForm = () => {
  const [addresses, setAddresses] = useState([]);

  const loadData = useCallback(async () => {
    const addressList = await CustomerService.getListAddress({});
    setAddresses(addressList);
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Paper className={styles.root} elevation={4}>
      <h1 className={styles.title}> Thông tin giao hàng </h1>
      <DeliveryCardList addresses={addresses} handleReloadData={loadData} />
    </Paper>
  );
};

export default DeliveryForm;
