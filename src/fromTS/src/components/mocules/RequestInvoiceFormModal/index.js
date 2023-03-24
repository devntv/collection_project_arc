/* eslint-disable react/jsx-wrap-multilines */
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { CustomerClient, isValidWithoutData } from 'clients';
import clsx from 'clsx';
import { Button, InfoFormControl, Modal } from 'components/atoms';
import { BRAND_NAME } from 'constants/Enums';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { gtag } from 'utils';
import NotifyUtils from 'utils/NotifyUtils';
import InfoInput from '../InfoInput';
import styles from './style.module.css';
import validateForm from './validateForm';

const RequestInvoiceModal = (props) => {
  const { visible, onClose, orderId, listInvoiceInfo, customerEmail, invoice, isMobile } = props;
  // const [disable, setDisable] = useState(true);
  const router = useRouter();
  const initVal = {
    companyName: invoice?.companyName || '',
    taxCode: invoice?.taxCode || '',
    email: invoice?.email || customerEmail || '',
    companyAddress: invoice?.companyAddress || '',
  };
  const [val, setVal] = useState(initVal);
  // useEffect(() => {
  //   if (
  //     val.companyName === initVal.companyName &&
  //     val.taxCode === initVal.taxCode &&
  //     val.email === initVal.email &&
  //     val.companyAddress === initVal.companyAddress
  //   )
  //     setDisable(true);
  //   else setDisable(false);
  // }, [val]);

  const handleChangeValue = (key, value) => {
    setVal({ ...val, [key]: value });
  };
  const onSubmit = async () => {
    const data = {
      ...val,
      orderId,
      invoiceRequest: true,
    };
    try {
      validateForm(val);
      const requestInvoiceResult = await CustomerClient.updateInvoiceInfoOrder(data);
      if (!isValidWithoutData(requestInvoiceResult)) {
        let message = '';
        const { errorCode } = requestInvoiceResult;
        switch (errorCode) {
          case 'ERR_UPDATE_MANUALLY_EXPORTED_INVOICE':
            message = ' Đơn hàng không thể giao thành công cho quý khách. Vui lòng không cập nhật thông tin cho hóa đơn của đơn hàng này';
            break;
          case 'ERR_UPDATE_MANUALLY_IMPORTED_INVOICE':
            message = 'Vui lòng không cập nhật thông tin cho hóa đơn của đơn hàng này';
            break;
          case 'ERR_UPDATE_INVOICE_MULTIPLE_TIMES':
            message = 'Đơn hàng yêu cầu thay đổi thông tin hóa đơn > 1 lần';
            break;
          case 'ERR_INVALID_CHANGE_REQUEST_TIME':
            message = 'Không thể yêu cầu xuất hóa đơn sau 7 ngày.';
            break;
          case 'ERR_INVALID_CHANGE_INVOICE_INFO_TIME':
            message = 'Không thể thay đổi thông tin xuất hóa đơn sau 14 ngày.';
            break;
          default:
            message = requestInvoiceResult.message || 'Gửi cập nhật thông tin hóa đơn thất bại';
        }

        throw new Error(message);
      }
      NotifyUtils.success('Gửi cập nhật thông tin hóa đơn thành công');
      // clear
      onClose();
      setVal({});
      gtag.requestInvoice();
      router.push(window.location.href);
    } catch (error) {
      NotifyUtils.error(error.message);
    }
  };
  const [invoiceInfoSelected, setInvoiceInfoSelected] = useState('');

  const handleChangeInvoiceInfoSelected = (e) => {
    const { value } = e.target;
    setInvoiceInfoSelected(value);
    const choosenItem = listInvoiceInfo.find((item) => item.code === value);
    setVal({
      ...val,
      email: invoice?.email || customerEmail || '',
      companyName: choosenItem?.companyName || '',
      companyAddress: choosenItem?.companyAddress || '',
      taxCode: choosenItem?.taxCode || '',
    });
  };
  return (
    <Modal open={visible} onClose={onClose} className={styles.modal}>
      <div className={styles.wrap}>
        {isMobile && (
          <div style={{ position: 'sticky', top: '0px', zIndex: 999 }}>
            <CancelIcon style={{ float: 'right', margin: '5px' }} onClick={onClose} />
          </div>
        )}
        <div className={clsx(styles.title, isMobile && styles.titleMobile)}>
          {!invoice?.invoiceRequest ? 'Yêu cầu xuất hóa đơn' : 'Chỉnh sửa thông tin xuất hóa đơn'}
        </div>
        <Grid container className={styles.container}>
          <Grid item xs={12}>
            <Typography style={{ fontWeight: 'bold' }}>Thông tin xuất hóa đơn</Typography>
          </Grid>
          <Grid item xs={12} container justifyContent="space-evenly" spacing={1}>
            <InfoFormControl xs={12} md={12} htmlFor="companyName" label="Tên công ty" isRequired>
              <br />
              <TextField
                id="companyName"
                multiline
                variant="outlined"
                minRows={2}
                style={{ background: '#fff' }}
                value={val.companyName}
                placeholder="Ít nhất 2 kí tự"
                onChange={(e) => handleChangeValue('companyName', e.target.value)}
              />
            </InfoFormControl>
            <InfoFormControl xs={12} md={12} label="Mã số thuế" htmlFor="taxCode" isRequired>
              <InfoInput id="taxCode" placeholder="Mã số thuế" value={val.taxCode} onChange={(e) => handleChangeValue('taxCode', e.target.value)} />
            </InfoFormControl>
            <InfoFormControl xs={12} label="Địa chỉ" htmlFor="companyAddress" isRequired>
              <br />
              <TextField
                multiline
                minRows={4}
                variant="outlined"
                id="companyAddress"
                placeholder="Nhập địa chỉ xuất hóa đơn (bao gồm Phường/Xã, Quận/Huyện, Tỉnh/Thành phố nếu có)"
                value={val.companyAddress}
                onChange={(e) => handleChangeValue('companyAddress', e.target.value)}
                style={{ background: '#fff' }}
              />
            </InfoFormControl>
            <InfoFormControl xs={12} md={12} label="Email" htmlFor="email">
              <InfoInput id="email" placeholder="Email" value={val.email} onChange={(e) => handleChangeValue('email', e.target.value)} />
            </InfoFormControl>
            <div className={styles.helper_text}>
              <small className={styles.text_muted}>
                <FontAwesomeIcon icon={faInfoCircle} className={styles.icon} />
                <span className={styles.fw500}>Lưu ý:</span>
                <ul className={styles.notifi_list}>
                  <li>Phải điền chính xác thông tin xuất hóa đơn</li>
                  <li>Hóa đơn đối tác {BRAND_NAME} sẽ xuất từ 8-10 ngày sau khi đơn hàng được giao thành công</li>
                </ul>
              </small>
            </div>
          </Grid>

          {listInvoiceInfo.length > 0 && (
            <>
              <Grid item xs={12}>
                <Typography style={{ fontWeight: 'bold' }}>Hoặc chọn: </Typography>
              </Grid>
              <Grid item xs={12}>
                <RadioGroup aria-label="gender" name="gender1" value={invoiceInfoSelected} onClick={handleChangeInvoiceInfoSelected}>
                  {listInvoiceInfo.map((item) => (
                    <FormControlLabel
                      key={item.code}
                      control={<Radio name="checkedC" classes={{ root: styles.checkbox }} value={item.code} />}
                      label={
                        <div>
                          <i style={{ textTransform: 'capitalize' }}> {item.companyName}</i> - <b> {item.taxCode} </b> ({item.companyAddress})
                        </div>
                      }
                    />
                  ))}
                </RadioGroup>
              </Grid>
            </>
          )}
          <Grid className={styles.textarea} item container justifyContent="center" xs={12} spacing={1}>
            <Button className="payment_button" onClick={onSubmit}>
              Gửi yêu cầu
            </Button>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};

export default RequestInvoiceModal;
