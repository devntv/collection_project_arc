import { Box, FormControlLabel, Grid, Radio, RadioGroup, Tooltip, Typography } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { memo, useEffect, useState } from 'react';
import RegisterInvoiceForm from '../NewRegisterOrderInvoiceForm/RegisterInvoiceForm';
import styles from './styles.module.css';

const DEFAULT_INVOICE_INFO = {
  companyName: '',
  companyAddress: '',
  taxCode: '',
};

// form without orderId
function InvoiceForm({
  listInvoiceInfo = [],
  customerEmail,
  getValueInvoice,
  getStepInvoiceAdd,
  step,
  setCheck,
  setStep,
  toggleOpenModalInvoice,
  check,
  handleSetAllInvoice,
  invoice = null,
  handleReloadInvoices,
}) {
  const [invoiceInfoChooserItem, setInvoiceInfoChooserItem] = useState(invoice || listInvoiceInfo[0]);

  useEffect(
    () => () => {
      if (step === 2) {
        setStep(1);
      }
    },
    [step],
  );

  const handleChangeInvoiceInfoSelected = (e) => {
    const { value } = e.target;

    const info = listInvoiceInfo.find((item) => item.code === value);
    if (!info) {
      const newInvoice = {
        invoiceRequest: true,
        isUseCustom: true,
        ...DEFAULT_INVOICE_INFO,
      };

      handleSetAllInvoice(newInvoice);
      setInvoiceInfoChooserItem(newInvoice);
    } else {
      handleSetAllInvoice({
        invoiceRequest: true,
        ...info,
      });
      setInvoiceInfoChooserItem(info);
    }
  };

  const toggleAdding = () => {
    getStepInvoiceAdd(step);
  };

  const handleEditInvoice = (item) => {
    setCheck(true);
    setInvoiceInfoChooserItem(item);
    toggleAdding();
  };
  const handleAddNewInvoice = () => {
    toggleAdding();
  };

  const renderInvoiceUser = (item, index) => (
    <div className={styles.cardWrapper}>
      <Box display="flex" alignItems="center" justifyContent="space-between" className="cardHeader">
        <Typography className={styles.cardTitle}>thông tin {index + 1}</Typography>
        <Box display="flex">
          <Tooltip title="Sửa">
            <span aria-hidden="true" onClick={() => handleEditInvoice(item)} className={styles.iconEdit}>
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
            <Typography className={styles.subTitle}>MST</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{item.taxCode}</Typography>
          </Grid>
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
        <RegisterInvoiceForm
          onClose={toggleOpenModalInvoice}
          getValueInvoice={getValueInvoice}
          invoiceInfoChooserItem={invoiceInfoChooserItem}
          check={check}
          customerEmail={customerEmail}
          handleReloadInvoices={handleReloadInvoices}
        />
      ) : (
        <Grid container item xs={12} className={styles.slideRight}>
          <>
            <Grid item xs={12} className={styles.listInvoice}>
              <RadioGroup
                aria-label="invoice"
                name="value"
                value={invoice?.code || listInvoiceInfo[0]?.code}
                onChange={handleChangeInvoiceInfoSelected}
              >
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
          </>
        </Grid>
      )}
    </>
  );
}

export default memo(InvoiceForm);
