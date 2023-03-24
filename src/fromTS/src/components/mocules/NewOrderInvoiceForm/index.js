import { Box, FormControlLabel, Grid, Radio, RadioGroup, Tooltip, Typography } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { CustomerClient, isValidWithoutData } from 'clients';
import { Button } from 'components/atoms';
import NewRegisterOrderInvoiceForm from 'components/mocules/NewRegisterOrderInvoiceForm';
import React, { useState } from 'react';
import { gtag } from 'utils';
import NotifyUtils from 'utils/NotifyUtils';
import styles from './styles.module.css';

export default function NewOrderInvoiceForm({
  listInvoiceInfo = [],
  orderId,
  customerEmail,
  onClose,
  getValueInvoice,
  getStepInvoiceAdd,
  step,
  setCheck,
  setStep,
  toggleOpenModalInvoice,
  check,
}) {
  const invoiceInfoFirst = listInvoiceInfo[0]?.code;
  const [invoiceInfoSelected, setInvoiceInfoSelected] = useState(invoiceInfoFirst);
  const chooserItem = listInvoiceInfo.find((item) => item.code === invoiceInfoSelected);
  const [invoiceInfoChooserItem, setInvoiceInfoChooserItem] = useState(chooserItem);

  React.useEffect(
    () => () => {
      if (step === 2) {
        setStep(1);
      }
    },
    [step],
  );
  const initVal = {
    companyName: '',
    taxCode: '',
    email: '',
    companyAddress: '',
  };

  const [val, setVal] = useState(initVal);

  const handleChangeInvoiceInfoSelected = (e) => {
    const { value } = e.target;
    setInvoiceInfoSelected(value);

    const chooser = listInvoiceInfo.find((item) => item.code === value);
    setVal({
      ...val,
      companyName: chooser?.companyName || '',
      companyAddress: chooser?.companyAddress || '',
      taxCode: chooser?.taxCode || '',
    });
    setInvoiceInfoChooserItem({
      ...val,
      companyName: chooser?.companyName || '',
      companyAddress: chooser?.companyAddress || '',
      taxCode: chooser?.taxCode || '',
    });
  };

  const onSubmit = async () => {
    const data = {
      ...val,
      companyName: chooserItem?.companyName || '',
      companyAddress: chooserItem?.companyAddress || '',
      taxCode: chooserItem?.taxCode || '',
      email: customerEmail || '',
      orderId,
      invoiceRequest: true,
    };

    try {
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
      getValueInvoice(data);
      gtag.requestInvoice();
    } catch (error) {
      NotifyUtils.error(error.message);
    }
  };

  const toggleAdding = () => {
    getStepInvoiceAdd(step);
  };

  const handleEditInvoice = () => {
    toggleAdding();
    setCheck(true);
  };
  const handleAddNewInvoice = () => {
    toggleAdding();
    // checkAddNewInvoice(true);
  };
  const renderInvoiceUser = (item, index) => (
    <div className={styles.cardWrapper}>
      <Box display="flex" alignItems="center" justifyContent="space-between" className="cardHeader">
        <Typography className={styles.cardTitle}>thông tin {index + 1}</Typography>
        <Box display="flex">
          <Tooltip title="Sửa">
            <span aria-hidden="true" onClick={handleEditInvoice} className={styles.iconEdit}>
              <EditOutlinedIcon />
            </span>
          </Tooltip>
        </Box>
      </Box>
      <div className={styles.content}>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Typography className={styles.subTitle}>tên</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{item.companyName}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className={styles.subTitle}>mST</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{item.taxCode}</Typography>
          </Grid>
          {/* hien tai bo trường std
          <Grid item xs={3}>
            <Typography className={styles.subTitle}>SĐT</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>012345</Typography>
          </Grid> */}
          <Grid item xs={3}>
            <Typography className={styles.subTitle}>Địa chỉ</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{item.companyAddress}</Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
  return (
    <>
      {step === 2 ? (
        <NewRegisterOrderInvoiceForm
          onClose={toggleOpenModalInvoice}
          orderId={orderId}
          getValueInvoice={getValueInvoice}
          invoiceInfoChooserItem={invoiceInfoChooserItem}
          check={check}
          customerEmail={customerEmail}
        />
      ) : (
        <Grid container item xs={12} className={styles.slideRight}>
          <>
            <Grid item xs={12} className={styles.listInvoice}>
              <RadioGroup aria-label="invoice" name="value" value={invoiceInfoSelected || ''} onChange={handleChangeInvoiceInfoSelected}>
                {listInvoiceInfo.length > 0 && (
                  <>
                    {listInvoiceInfo.map((item, index) => (
                      <FormControlLabel
                        key={item.code}
                        className={styles.labelRight}
                        value={item.code}
                        control={<Radio className="checkInvoice" />}
                        label={renderInvoiceUser(item, index)}
                      />
                    ))}
                  </>
                )}
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <Box className={styles.btnBorder} onClick={handleAddNewInvoice}>
                <Typography className={styles.btnName}>Thêm thông tin mới</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box textAlign="center" marginTop="30px">
                <Button className={styles.sendData} onClick={onSubmit}>
                  Gửi yêu cầu
                </Button>
              </Box>
            </Grid>
          </>
        </Grid>
      )}
    </>
  );
}
