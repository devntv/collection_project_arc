import { Paper } from '@material-ui/core';
import { CustomerClient, getData } from 'clients';
import React, { useCallback, useEffect, useState } from 'react';
import InvoiceInfoCardList from '../InvoiceInfoCardList';
import styles from './styles.module.css';

const InvoiceInfoForm = () => {
  const [invoiceInfos, setInvoiceInfos] = useState([]);

  const loadData = useCallback(async () => {
    const invoiceInfoList = await CustomerClient.getListInvoiceInfo({});
    setInvoiceInfos(getData(invoiceInfoList));
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Paper className={styles.root} elevation={4}>
      <h1 className={styles.title}> Danh sách thông tin xuất hoá đơn</h1>
      <InvoiceInfoCardList invoiceInfos={invoiceInfos} handleReloadData={loadData} />
    </Paper>
  );
};

export default InvoiceInfoForm;
