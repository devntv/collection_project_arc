import { yupResolver } from '@hookform/resolvers/yup';
import { Box, FormControl, MenuItem } from '@material-ui/core';
import ErrorIconOutlined from '@material-ui/icons/ErrorOutlined';
import clsx from 'clsx';
import { Button, InputV2 } from 'components/atoms';
import UploadFiles from 'components/mocules/UploadFiles';
import { LIST_REASONS } from 'constants/Enums';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import styles from './styles.module.css';

export default function NewFeedbackForm({ className, fileList = [], handleSetValue }) {
  const schema = yup.object().shape({
    reasonFeedback: yup.string().required('Lý do không được để trống'),
    username: yup.string().required('Lý do không được để trống'),
    //   .string()
    //   // .matches(/^[0-9]+$/, 'Bạn chưa nhập mã số thuế')
    //   .min(10, 'Mã số thuế phải có độ dài là 10 hoặc 14')
    //   .max(14, 'Mã số thuế phải có độ dài là 10 hoặc 14')
    //   .test('check number', 'Mã số thuế sai định dạng', (value: any) => {
    //     return value.match(/^[0-9][0-9 -]*$/);
    //   })
    //   .test('check-min-max', 'Mã số thuế phải có độ dài là 10 hoặc 14', (value) => {
    //     return value.length !== 10 && value.length !== 14 ? false : true;
    //   })
    //   .test('check -', 'Mã số thuế sai định dạng -', (value) => {
    //     return value.length === 14 ? value.includes('-') : true;
    //   }),
    // addressCompany: yup.string().required('Địa chỉ công ty không được trống'),
    // addressVoice: yup.string().required('Địa chỉ xuất hóa đơn không được trống'),
  });
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => console.log(data);

  return (
    <div className={clsx(className, styles.form_sign_up)}>
      <form className={className} onSubmit={handleSubmit((d) => console.log(d))}>
        <Controller
          name="reasonFeedback"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <FormControl variant="filled" fullWidth>
              <InputV2 className={styles.input} label="Lý do phản hồi" select required error={!!errors.reasonFeedback} {...field}>
                {LIST_REASONS.map(({ code, name }) => (
                  <MenuItem key={code} value={code}>
                    {name}
                  </MenuItem>
                ))}
              </InputV2>
              {errors.reasonFeedback && (
                <div className={styles.textError} data-test="reason-feedback">
                  <ErrorIconOutlined className={styles.iconError} /> {errors.reasonFeedback?.message}
                </div>
              )}
            </FormControl>
          )}
        />
        <Controller
          name="username"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputV2
                className={styles.input}
                label="Tên chủ tài khoản  "
                required
                error={!!errors.username}
                // value={legalRepresentative}
                // onChange={(e) => handleSetValue('legalRepresentative', e.target.value)}
                {...field}
              />

              {errors.username && (
                <div className={styles.textError} data-test="signup-err-username">
                  <ErrorIconOutlined className={styles.iconError} /> {errors.username?.message}
                </div>
              )}
            </FormControl>
          )}
        />
        <Controller
          name="addressCompany"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputV2
                className={styles.input}
                label="Số tài khoản"
                // value={legalRepresentative}
                // onChange={(e) => handleSetValue('legalRepresentative', e.target.value)}
                {...field}
              />
            </FormControl>
          )}
        />
        <Controller
          name="addressVoice"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputV2 className={styles.input} label="Ngân hàng" {...field} />
            </FormControl>
          )}
        />
        <Controller
          name="addressVoice"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputV2
                className={styles.input}
                label="Chi nhánh"
                // value={legalRepresentative}
                // onChange={(e) => handleSetValue('legalRepresentative', e.target.value)}
                {...field}
              />
            </FormControl>
          )}
        />
        <Controller
          name="contentFeedback"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputV2
                style={{ width: '-webkit-fill-available', margin: '8px 0px' }}
                className={styles.textArea}
                label="Nội dung phản hồi"
                type="text"
                multiline
                rows={4}
                // value={legalRepresentative}
                // onChange={(e) => handleSetValue('legalRepresentative', e.target.value)}
                {...field}
              />
            </FormControl>
          )}
        />
        {/* <Box className={styles.boxSendIMG}>
          <div>fdfdfd</div>
        </Box> */}
        <Box>
          <UploadFiles
            className={styles.input}
            handleSetValue={handleSetValue}
            fileList={fileList}
            val="businessImages"
            label="Thêm hình ảnh (Tối đa 6 hình)"
            subLabel="File PNG, JPEG hoặc PDF - tối đa 3 files"
          />
        </Box>

        <Box textAlign="center" marginTop="20px">
          <Button className={styles.btn_register} type="submit" onClick={handleSubmit(onSubmit)}>
            gửi phản hồi
          </Button>
        </Box>
      </form>
    </div>
  );
}
