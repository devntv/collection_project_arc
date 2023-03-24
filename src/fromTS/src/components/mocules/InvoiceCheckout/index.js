/* eslint-disable react/jsx-wrap-multilines */
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import { InfoFormControl } from 'components/atoms';
import { BRAND_NAME } from 'constants/Enums';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import InfoInput from '../InfoInput';
import styles from './styles.module.css';

const DEFAULT_INVOICE_INFO = {
  companyName: '',
  companyAddress: '',
  taxCode: '',
};

const invoiceInfoOtherID = uuidv4();
const InvoiceCheckout = ({ invoiceInfoList = [], handleChangeInvoice, handleSetAllInvoice, invoice = {} }) => {
  const { invoiceRequest = true, companyAddress = '', companyName = '', mst = '', taxCode = '' } = invoice || {};

  const [expanded, setExpanded] = useState(invoiceRequest);

  let invoiceInfoDefault = (invoiceInfoList && invoiceInfoList[0] && invoiceInfoList[0].code) || invoiceInfoOtherID;

  // find invoice select by compare all data
  const invoiceInfo = invoiceInfoList.find(
    (item) => item.companyAddress === companyAddress && item.companyName === companyName && (mst || taxCode) === item.taxCode,
  );
  if (invoiceInfo && invoiceInfo.code) {
    invoiceInfoDefault = invoiceInfo.code;
  } else if (companyAddress && companyName && (mst || taxCode)) {
    invoiceInfoDefault = invoiceInfoOtherID;
  }

  const [invoiceInfoSelected, setInvoiceInfoSelected] = useState(invoiceInfoDefault);

  const isInvoiceInfoOther = invoiceInfoSelected === invoiceInfoOtherID;

  const [form, setForm] = useState({
    ...DEFAULT_INVOICE_INFO,
    ...invoice,
  });

  const handleExpand = () => {
    setExpanded(!expanded);
    if (expanded) {
      handleSetAllInvoice({
        invoiceRequest: false,
        ...DEFAULT_INVOICE_INFO,
      });
    } else if (isInvoiceInfoOther) {
      handleSetAllInvoice({
        invoiceRequest: true,
        ...DEFAULT_INVOICE_INFO,
      });
    } else {
      const info = invoiceInfoList.find((item) => item.code === invoiceInfoDefault);
      handleSetAllInvoice({
        invoiceRequest: true,
        ...info,
      });
    }
  };

  const handleChangeForm = (key, value) => {
    setForm({ ...form, [key]: value.trim() });
    handleChangeInvoice(key, value.trim());
  };

  const handleChangeInvoiceInfoSelected = (e) => {
    const { value = invoiceInfoOtherID } = e.target;
    setInvoiceInfoSelected(value);
    if (value !== invoiceInfoOtherID) {
      const info = invoiceInfoList.find((item) => item.code === value);
      handleSetAllInvoice({
        invoiceRequest: true,
        ...info,
      });
    } else {
      handleSetAllInvoice({
        invoiceRequest: true,
        isUseCustom: true,
        ...DEFAULT_INVOICE_INFO,
      });
    }
  };

  // {} === {} -> false || new Set array like obj with JSON.
  const uniqueInvoiceList = [...new Set(invoiceInfoList?.map(JSON.stringify))].map(JSON.parse);

  return (
    <Paper elevation={4} className={styles.paperroot}>
      <Accordion expanded={expanded} className={styles.root} elevation={4}>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <Typography>
            <FormControlLabel
              control={
                <Checkbox classes={{ root: styles.checkbox }} checked={expanded} onChange={handleExpand} data-test="checkbox-checkout-invoice" />
              }
              label="Thông tin xuất hoá đơn "
            />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container data-test="list-invoice-container">
            <Grid item xs={12}>
              <RadioGroup aria-label="gender" name="gender1" value={invoiceInfoSelected} onChange={handleChangeInvoiceInfoSelected}>
                {uniqueInvoiceList.map((item) => (
                  <FormControlLabel
                    key={item.code}
                    control={<Radio name="checkedC" classes={{ root: styles.checkbox }} value={item.code} />}
                    label={
                      <div>
                        <i> {item.companyName}</i> - <b> {item.taxCode} </b> ({item.companyAddress})
                      </div>
                    }
                  />
                ))}

                {(!invoiceInfoList || invoiceInfoList.length < 10) && (
                  <FormControlLabel
                    control={<Radio name="checkedC" value={invoiceInfoOtherID} classes={{ root: styles.checkbox }} />}
                    label={
                      <i>
                        <b>Khác </b>
                      </i>
                    }
                  />
                )}
              </RadioGroup>
            </Grid>
            {isInvoiceInfoOther && (
              <>
                <InfoFormControl xs={12} isRequired label="Tên công ty/Nhà thuốc/Quầy thuốc" htmlFor="companyName">
                  <InfoInput
                    id="companyName"
                    placeholder="Ít nhất 2 kí tự"
                    onBlur={(e) => handleChangeForm('companyName', e.target.value)}
                    defaultValue={companyName}
                  />
                </InfoFormControl>
                <InfoFormControl xs={12} isRequired label="Mã số thuế" htmlFor="taxCode">
                  <InfoInput
                    id="taxCode"
                    placeholder="Mã số thuế"
                    onBlur={(e) => handleChangeForm('taxCode', e.target.value)}
                    defaultValue={mst || taxCode}
                  />
                </InfoFormControl>
                <InfoFormControl xs={12} isRequired label="Địa chỉ" htmlFor="address">
                  <TextField
                    id="address"
                    type="text"
                    multiline
                    name="address"
                    variant="outlined"
                    aria-label="Địa chỉ"
                    placeholder="Nhập địa chỉ công ty (bao gồm Phường/Xã, Quận/Huyện, Tỉnh/Thành phố nếu có)"
                    rows={4}
                    style={{ marginTop: '15px' }}
                    defaultValue={companyAddress}
                    onBlur={(e) => handleChangeForm('companyAddress', e.target.value)}
                  />
                </InfoFormControl>
                <div className={styles.helper_text}>
                  <small className={styles.text_muted}>
                    <FontAwesomeIcon icon={faInfoCircle} className={styles.icon} />
                    <span className={styles.fw500}>Lưu ý: </span>
                    <ul className={styles.notifi_list}>
                      <li>Phải điền chính xác thông tin xuất hóa đơn</li>
                      <li>Hóa đơn đối tác {BRAND_NAME} sẽ xuất từ 8-10 ngày sau khi đơn hàng được giao thành công</li>
                    </ul>
                  </small>
                </div>
              </>
            )}
            {!isInvoiceInfoOther && (
              <div className={styles.helper_text} style={{ marginTop: 10 }}>
                <small className={styles.text_muted}>
                  <FontAwesomeIcon icon={faInfoCircle} className={styles.icon} />
                  <span className={styles.fw500}>
                    Lưu ý: Hóa đơn đối tác của {BRAND_NAME} sẽ xuất từ 8-10 ngày sau khi đơn hàng được giao thành công
                  </span>
                </small>
              </div>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default InvoiceCheckout;
