import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { CustomerClient, isValidWithoutData } from 'clients';
import { Button, InputV2 } from 'components/atoms';
import { useAuth } from 'context';
import { memo, useState } from 'react';
import { NotifyUtils } from 'utils';
import styles from './styles.module.css';
import validateForm from './validateForm';

const InvoiceInfoModalV2 = memo((props) => {
  const { onClose, visible, invoiceInfo = {}, handleReloadData } = props;
  const {
    user: { customerID = '' },
  } = useAuth();

  const [val, setVal] = useState({
    companyName: invoiceInfo?.companyName || '',
    taxCode: invoiceInfo?.taxCode || '',
    companyAddress: invoiceInfo?.companyAddress || '',
    customerID,
  });
  const isEdit = invoiceInfo.code;
  const handleChangeValue = (key, value) => {
    setVal({ ...val, [key]: value });
  };
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
        const result = await CustomerClient.updateInvoiceInfo({ ...formData, code: invoiceInfo?.code, customerID: invoiceInfo?.customerID });
        if (!isValidWithoutData(result))
          throw Error(result?.errorCode === 'INVOICE_NOT_FOUND' ? 'Không tìm thấy thông tin xuất hóa đơn' : 'Cập nhật thông tin không thành công');
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
        <DialogTitle id="customized-dialog-title" onClose={onClose} style={{ width: '100%', color: '#292929' }}>
          {isEdit ? 'Chỉnh sửa thông tin xuất hoá đơn' : 'Thêm thông tin xuất hoá đơn'}
          <IconButton aria-label="close" className={styles.close_button} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <InputV2
            style={{ width: '-webkit-fill-available' }}
            label="Tên công ty/Nhà thuốc/Quầy thuốc"
            required
            id="companyName"
            value={val?.companyName || ''}
            onChange={(e) => handleChangeValue('companyName', e.target.value)}
          />
          <InputV2
            style={{ width: '-webkit-fill-available' }}
            label="Mã số thuế"
            id="taxCode"
            required
            value={val?.taxCode || ''}
            onChange={(e) => handleChangeValue('taxCode', e.target.value)}
          />
          <InputV2
            style={{ width: '-webkit-fill-available' }}
            className={styles.textArea}
            label="Địa chỉ công ty"
            id="companyAddress"
            type="text"
            multiline
            required
            minRows={4}
            onChange={(e) => handleChangeValue('companyAddress', e.target.value)}
            value={val?.companyAddress || ''}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus className="my-order__button my-order__button--green" onClick={handleSubmit}>
            {isEdit ? 'Sửa' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default InvoiceInfoModalV2;
