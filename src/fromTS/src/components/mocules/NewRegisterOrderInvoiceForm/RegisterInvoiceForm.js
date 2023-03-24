/* eslint-disable react/jsx-wrap-multilines */
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, FormControl, Typography } from '@material-ui/core';
import ErrorIconOutlined from '@material-ui/icons/ErrorOutlined';
import { CustomerClient, isValidWithoutData } from 'clients';
import clsx from 'clsx';
import { Button, InputV2 } from 'components/atoms';
import { Controller, useForm } from 'react-hook-form';
import { gtag } from 'utils';
import NotifyUtils from 'utils/NotifyUtils';
import * as yup from 'yup';
import styles from './styles.module.css';

// register without orderId
function RegisterInvoiceForm({ invoice, className, onClose, getValueInvoice, invoiceInfoChooserItem, customerEmail, check, handleReloadInvoices }) {
  const schema = yup.object().shape({
    companyName: yup.string().required('Tên công ty/Nhà thuốc/Quầy thuốc không được để trống'),
    taxCode: yup
      .string()
      .min(10, 'Mã số thuế phải có độ dài là 10 hoặc 14')
      .max(14, 'Mã số thuế phải có độ dài là 10 hoặc 14')
      .test('check number', 'Mã số thuế sai định dạng', (value) => value.match(/^[0-9][0-9 -]*$/))
      .test('check-min-max', 'Mã số thuế phải có độ dài là 10 hoặc 14', (value) => !(value.length !== 10 && value.length !== 14))
      .test('check -', 'Mã số thuế sai định dạng -', (value) => (value.length === 14 ? value.includes('-') : true)),
    companyAddress: yup.string().required('Địa chỉ xuất hóa đơn không được trống'),
  });
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const handleCreateNewInvoice = async (value) => {
    const isEdit = check;
    const data = {
      ...value,
      email: invoice?.email || customerEmail || '',
      // invoiceRequest: true,
    };
    try {
      if (isEdit) {
        const requestInvoiceResult = await CustomerClient.updateInvoiceInfo({
          ...data,
          code: invoiceInfoChooserItem?.code,
          customerID: invoiceInfoChooserItem?.customerID,
        });
        if (!isValidWithoutData(requestInvoiceResult)) {
          NotifyUtils.error('Cập nhật thông tin hoá đơn thất bại');
        }
      } else {
        const requestInvoiceResult = await CustomerClient.createInvoiceInfo({
          body: data,
        });
        if (!isValidWithoutData(requestInvoiceResult)) {
          NotifyUtils.error('Tạo thông tin hoá đơn thất bại');
        }
      }

      NotifyUtils.success(isEdit ? 'Gửi cập nhật thông tin hóa đơn thành công' : 'Tạo thông tin hoá đơn thành công');
      // clear
      await handleReloadInvoices();
      getValueInvoice(data);
      gtag.requestInvoice();
      onClose();
    } catch (error) {
      NotifyUtils.error(error?.message || 'Gửi cập nhật thông tin hoá đơn thất bại');
    }
  };

  return (
    <div className={clsx(className, styles.form_sign_up, styles.slideLeft)}>
      <form className={className} onSubmit={handleSubmit((data) => handleCreateNewInvoice(data))}>
        <Controller
          name="companyName"
          defaultValue={check ? invoiceInfoChooserItem?.companyName : ''}
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputV2
                label={
                  <Box display="flex">
                    <Typography>Tên công ty/Nhà thuốc/Quầy thuốc</Typography>
                    <span className={styles.textRequired}>*</span>
                  </Box>
                }
                id="companyName"
                error={!!errors.companyName}
                className={styles.input}
                {...field}
              />
              {errors.companyName?.message && (
                <div className={styles.textError}>
                  <ErrorIconOutlined className={styles.iconError} /> {errors.companyName?.message}
                </div>
              )}
            </FormControl>
          )}
        />
        <Controller
          name="taxCode"
          defaultValue={check ? invoiceInfoChooserItem?.taxCode : ''}
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputV2
                label={
                  <Box display="flex">
                    <Typography>Mã số thuế</Typography>
                    <span className={styles.textRequired}>*</span>
                  </Box>
                }
                error={!!errors.taxCode}
                className={styles.input}
                {...field}
              />

              {errors.taxCode?.message && (
                <div className={styles.textError}>
                  <ErrorIconOutlined className={styles.iconError} /> {errors.taxCode?.message}
                </div>
              )}
            </FormControl>
          )}
        />
        <Controller
          name="companyAddress"
          defaultValue={check ? invoiceInfoChooserItem?.companyAddress : ''}
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputV2
                label={
                  <Box display="flex">
                    <Typography>Địa chỉ xuất hoá đơn</Typography>
                    <span className={styles.textRequired}>*</span>
                  </Box>
                }
                error={!!errors.companyAddress}
                className={styles.input}
                {...field}
              />

              {errors.companyAddress && (
                <div className={styles.textError} data-test="signup-err-username">
                  <ErrorIconOutlined className={styles.iconError} /> {errors.companyAddress.message}
                </div>
              )}
            </FormControl>
          )}
        />
        <Box textAlign="center" marginTop="30px">
          <Button className={styles.sendData} type="submit">
            gửi yêu cầu
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default RegisterInvoiceForm;
