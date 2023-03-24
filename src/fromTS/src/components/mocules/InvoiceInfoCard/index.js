import { Button, Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { CustomerClient, isValidWithoutData } from 'clients';
import clsx from 'clsx';
import { useModal } from 'hooks';
import React from 'react';
import { NotifyUtils } from 'utils';
import DeleteInvoiceInfoModal from '../InvoiceInfoDeleteModal';
import styles from './styles.module.css';

const CardComp = ({ invoiceInfo, handleReloadData, handleEdit }) => {
  const { companyName = '', companyAddress = '', taxCode = '', code } = invoiceInfo;

  const [open, toggle] = useModal();

  const handleDelete = async () => {
    try {
      const result = await CustomerClient.deleteInvoiceInfo({ code });
      if (!isValidWithoutData(result))
        throw Error(result?.errorCode === 'INVOICE_NOT_FOUND' ? 'Không tìm thấy thông tin xuất hóa đơn' : 'Xóa thông tin không thành công');
      NotifyUtils.success('Xoá thông tin thành công');
      handleReloadData();
    } catch (error) {
      NotifyUtils.error(error.message);
    }
  };

  return (
    <Grid item xs={12} md={6}>
      <Card className={styles.card}>
        <CardHeader />
        <CardContent>
          <div className={styles.float_bottom}>
            <div>
              <div className={styles.ellipsis_2_line}>
                <b> Tên công ty: </b> {companyName}
              </div>
              <div className={styles.ellipsis_2_line}>
                <b> Mã số thuế: </b> {taxCode}
              </div>
              <div className={styles.ellipsis_2_line}>
                <b> Địa chỉ công ty: </b> {companyAddress}
              </div>

              <div className={styles.group_button}>
                <Button
                  variant="outlined"
                  className={clsx(styles.action_button, styles.important_action_button)}
                  onClick={() => handleEdit(invoiceInfo)}
                >
                  Sửa
                </Button>
                <Button variant="outlined" className={styles.action_button} onClick={toggle}>
                  Xoá
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <DeleteInvoiceInfoModal visible={open} onClose={toggle} onClickOk={handleDelete} />
    </Grid>
  );
};

export default CardComp;
