import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { CustomerClient, isValidWithoutData } from 'clients';
import { Button, InfoFormControl } from 'components/atoms';
import React, { memo, useEffect, useState } from 'react';
import { APP_STYLES } from 'styles';
import { NotifyUtils } from 'utils';
import InfoInput from '../InfoInput';
import styles from './styles.module.css';
import validateForm from './validateForm';

const InvoiceInfoModal = memo((props) => {
  const { onClose, visible, invoiceInfo = {}, handleReloadData } = props;
  const [val, setVal] = useState(invoiceInfo);

  const isEdit = invoiceInfo.code;
  const handleChangeValue = (key, value) => {
    setVal({ ...val, [key]: value });
  };

  useEffect(() => {
    setVal(invoiceInfo);
  }, [invoiceInfo]);

  const handleSubmit = async () => {
    const formData = val;
    Object.keys(formData).forEach((key) => {
      if (typeof formData[key] === 'string') {
        formData[key] = formData[key].trim();
      }
    });
    try {
      validateForm(formData);
      if (isEdit) {
        const result = await CustomerClient.updateInvoiceInfo({ ...formData, code: invoiceInfo.code });
        if (!isValidWithoutData(result)) throw Error(result?.message || 'Cập nhật thông tin không thành công');
        NotifyUtils.success('Sửa thông tin thành công');
      } else {
        const result = await CustomerClient.createInvoiceInfo({
          body: formData,
        });
        if (!isValidWithoutData(result)) throw Error(result?.message || 'Tạo mới thông tin không thành công');
        NotifyUtils.success('Tạo thông tin thành công');
      }

      onClose();
      handleReloadData();
    } catch (error) {
      NotifyUtils.error(error.message);
    }
  };
  return (
    <div className={styles.address_dialog}>
      <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={visible} className={styles.address_dialog}>
        <DialogTitle id="customized-dialog-title" onClose={onClose} style={{ width: '100%', color: APP_STYLES.COLORS.GREEN }}>
          {isEdit ? 'Chỉnh sửa thông tin xuất hoá đơn' : 'Thêm thông tin xuất hoá đơn'}
          <IconButton aria-label="close" className={styles.close_button} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container direction="row">
            <Grid container direction="row" spacing={3}>
              <InfoFormControl xs={12} label="Tên công ty/Nhà thuốc/Quầy thuốc" htmlFor="companyName" isRequired>
                <InfoInput
                  id="companyName"
                  value={val?.companyName || ''}
                  onChange={(e) => handleChangeValue('companyName', e.target.value)}
                  placeholder="Nhập tên công ty"
                />
              </InfoFormControl>

              <InfoFormControl xs={12} label="Mã số thuế" htmlFor="taxCode" isRequired>
                <InfoInput
                  id="taxCode"
                  value={val?.taxCode || ''}
                  onChange={(e) => handleChangeValue('taxCode', e.target.value)}
                  placeholder="Nhập mã số thuế"
                />
              </InfoFormControl>

              <InfoFormControl xs={12} label="Địa chỉ công ty" htmlFor="companyAddress" isRequired>
                <TextField
                  id="companyAddress"
                  type="text"
                  multiline
                  name="companyAddress"
                  variant="outlined"
                  aria-label="Địa chỉ"
                  placeholder="Nhập địa chỉ công ty (bao gồm Phường/Xã, Quận/Huyện, Tỉnh/Thành phố nếu có)"
                  rows={5}
                  style={{ marginTop: '15px' }}
                  onChange={(e) => handleChangeValue('companyAddress', e.target.value)}
                  value={val?.companyAddress || ''}
                />
              </InfoFormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            color="primary"
            variant="contained"
            className="my-order__button--secondary"
            style={{ borderRadius: '30px', padding: '5px 40px' }}
            onClick={handleSubmit}
          >
            {isEdit ? 'Sửa' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default InvoiceInfoModal;
