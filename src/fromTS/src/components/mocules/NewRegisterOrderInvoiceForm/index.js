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

export default function NewRegisterOrderInvoiceForm({
  invoice,
  orderId,
  className,
  onClose,
  getValueInvoice,
  invoiceRes,
  invoiceInfoChooserItem,
  customerEmail,
  check,
}) {
  const schema = yup.object().shape({
    companyName: yup.string().required('Tên công ty/Nhà thuốc/Quầy thuốc không được để trống'),
    taxCode: yup
      .string()
      // .matches(/^[0-9]+$/, 'Bạn chưa nhập mã số thuế')
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

  const handleSendRequest = async (value) => {
    const data = {
      ...value,
      orderId,
      email: invoice?.email || customerEmail || '',
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
  return (
    <div className={clsx(className, styles.form_sign_up, styles.slideLeft)}>
      <form className={className} onSubmit={handleSubmit((data) => handleSendRequest(data))}>
        <Controller
          name="companyName"
          defaultValue={check ? invoiceInfoChooserItem?.companyName : invoiceRes?.companyName || ''}
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
          defaultValue={check ? invoiceInfoChooserItem?.taxCode : invoiceRes?.taxCode || ''}
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
        {/* <Controller
          name="addressCompany"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputV2
                label="Địa chỉ công ty "
                required
                // placeholder="Nhập địa chỉ công ty (bao gồm Phường/Xã, Quận/Huyện, Tỉnh/Thành phố nếu có)"
                error={!!errors.addressCompany}
                // value={legalRepresentative}
                // onChange={(e) => handleSetValue('legalRepresentative', e.target.value)}
                className={styles.input}
                {...field}
                value={invoiceRes?.companyName}
              />

              {errors.addressCompany && (
                <div className={styles.textError} data-test="signup-err-username">
                  <ErrorIconOutlined className={styles.iconError} /> {errors.addressCompany?.message}
                </div>
              )}
            </FormControl>
          )}
        /> */}
        <Controller
          name="companyAddress"
          defaultValue={check ? invoiceInfoChooserItem?.companyAddress : invoiceRes?.companyAddress || ''}
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
