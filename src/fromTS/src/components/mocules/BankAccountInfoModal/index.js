import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { CustomerClient, isValidWithoutData } from 'clients';
import { Button, InfoFormControl } from 'components/atoms';
import router from 'next/router';
import React, { memo, useEffect, useState } from 'react';
import { APP_STYLES } from 'styles';
import { NotifyUtils } from 'utils';
import EventUtils from 'utils/EventUtils';
import InfoInput from '../InfoInput';
import styles from './styles.module.css';
import validateForm from './validateForm';

const BankAccountInfoModal = memo((props) => {
  const { onClose, visible, bankAccountInfo = {} } = props;
  const [val, setVal] = useState(bankAccountInfo);

  const isEdit = bankAccountInfo.code;
  const handleChangeValue = (key, value) => {
    setVal({ ...val, [key]: value });
  };
  useEffect(() => {
    setVal(bankAccountInfo);
  }, [bankAccountInfo]);

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
        const result = await CustomerClient.updateBankAccountInfo({
          body: formData,
        });
        if (!isValidWithoutData(result)) throw Error(result?.message || 'Cập nhật thông tin không thành công');
        NotifyUtils.success('Sửa thông tin thành công');
      } else {
        const result = await CustomerClient.createBankAccountInfo({
          body: formData,
        });
        if (!isValidWithoutData(result)) throw Error(result?.message || 'Tạo mới thông tin không thành công');
        NotifyUtils.success('Tạo thông tin thành công');
      }

      onClose();
      router.push('/my-account', undefined, { scroll: false });
    } catch (error) {
      NotifyUtils.error(error.message);
    }
  };
  return (
    <div className={styles.address_dialog}>
      <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={visible} className={styles.address_dialog}>
        <DialogTitle id="customized-dialog-title" onClose={onClose} style={{ width: '100%', color: APP_STYLES.COLORS.GREEN }}>
          {isEdit ? 'Chỉnh sửa thông tin tài khoản ngân hàng' : 'Thêm thông tin tài khoản ngân hàng'}
          <IconButton aria-label="close" className={styles.close_button} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container direction="row">
            <Grid container direction="row" spacing={3}>
              <InfoFormControl xs={12} label="Tên ngân hàng" htmlFor="bankName" isRequired>
                <br />
                <TextField
                  id="bankName"
                  multiline
                  autoFocus
                  rows={2}
                  variant="outlined"
                  placeholder="Nhập tên ngân hàng"
                  value={val?.bankName || ''}
                  onChange={(e) => handleChangeValue('bankName', e.target.value)}
                  style={{ background: '#fff' }}
                  onKeyPress={(e) => EventUtils.handleKeyPressEnter(e, handleSubmit)}
                />
              </InfoFormControl>

              <InfoFormControl xs={12} label="Số tài khoản" htmlFor="bankCode" isRequired>
                <InfoInput
                  id="bankCode"
                  value={val?.bankCode || ''}
                  onChange={(e) => handleChangeValue('bankCode', e.target.value)}
                  placeholder="Nhập số tài khoản"
                  onKeyPress={(e) => EventUtils.handleKeyPressEnter(e, handleSubmit)}
                />
              </InfoFormControl>

              <InfoFormControl xs={12} label="Chủ tài khoản" htmlFor="bankAccountName" isRequired>
                <InfoInput
                  id="bankAccountName"
                  value={val?.bankAccountName || ''}
                  onChange={(e) => handleChangeValue('bankAccountName', e.target.value)}
                  placeholder="Nhập tên chủ tài khoản"
                  onKeyPress={(e) => EventUtils.handleKeyPressEnter(e, handleSubmit)}
                />
              </InfoFormControl>
              <InfoFormControl xs={12} label="Chi nhánh" htmlFor="bankBranch" isRequired>
                <InfoInput
                  id="bankBranch"
                  value={val?.bankBranch || ''}
                  onChange={(e) => handleChangeValue('bankBranch', e.target.value)}
                  placeholder="Nhập chi nhánh ngân hàng"
                  onKeyPress={(e) => EventUtils.handleKeyPressEnter(e, handleSubmit)}
                />
              </InfoFormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            // autoFocus
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

export default BankAccountInfoModal;
