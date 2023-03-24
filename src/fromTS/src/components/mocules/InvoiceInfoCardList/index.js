import { Card, CardContent, Grid, IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useModal } from 'hooks';
import React, { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import InvoiceInfoCard from '../InvoiceInfoCard';
import InvoiceInfoModal from '../InvoiceInfoModal';
import styles from './styles.module.css';

const InvoiceInfoCardList = ({ invoiceInfos = [], handleReloadData }) => {
  const [openAddressModal, toggleAddressModal] = useModal();
  const invoiceInfo = useRef({
    companyName: '',
    companyAddress: '',
    taxCode: '',
  });

  const handleEdit = (info) => {
    invoiceInfo.current = info;
    toggleAddressModal();
    handleReloadData();
  };

  const handleNew = () => {
    invoiceInfo.current = {
      companyName: '',
      companyAddress: '',
      taxCode: '',
    };
    toggleAddressModal();
    handleReloadData();
  };

  return (
    <>
      <Grid container spacing={2}>
        {invoiceInfos.map((info) => (
          <InvoiceInfoCard key={uuidv4()} invoiceInfo={info} handleReloadData={handleReloadData} handleEdit={handleEdit} />
        ))}

        {invoiceInfos.length < 10 && (
          <Grid item xs={12} md={6}>
            <Card className={styles.card} onClick={handleNew}>
              <CardContent>
                <div className={styles.add_icon_column}>
                  <div className={styles.add_icon_row}>
                    <IconButton>
                      <AddCircleIcon size="large" />
                    </IconButton>
                    <b>Thêm thông tin xuất hoá đơn </b>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
      <InvoiceInfoModal
        visible={openAddressModal}
        onClose={toggleAddressModal}
        invoiceInfo={invoiceInfo.current}
        handleReloadData={handleReloadData}
      />
    </>
  );
};

export default InvoiceInfoCardList;
