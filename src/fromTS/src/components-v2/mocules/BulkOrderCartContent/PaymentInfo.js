import { Box, Collapse, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import clsx from 'clsx';
import { PAYMENT_METHOD } from 'constants/Enums';
import { ICON_UP_INVOICE } from 'constants/Icons';
import Link from 'next/link';
import { Fragment, memo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const renderPaymentMethod = ({ item = null, selectedVal = null }) => {
  const { code, name, description, subTitle, url, isDisable, errorMessage = '' } = item || {};

  return (
    <Fragment key={code}>
      <FormControlLabel
        key={uuidv4()}
        value={code}
        disabled={isDisable}
        control={<Radio classes={{ root: clsx(styles.checkbox, styles.checkbox_color) }} />}
        label={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <div className={clsx(styles.text_payment, isDisable && styles.text_disable)}>
            {name}
            {code === PAYMENT_METHOD.TRANSFER && url && (
              <a href={url} target="_blank" rel="noreferrer">
                &nbsp;(Hướng dẫn chuyển khoản)
              </a>
            )}
          </div>
        }
      />
      {errorMessage && <div className={styles.subTitle}>{errorMessage}</div>}

      {code === PAYMENT_METHOD.TRANSFER && code === selectedVal && (
        <>
          {subTitle && !isDisable && <div className={styles.subTitle}>{subTitle}</div>}
          <Alert className={styles.bank_info} icon={false} severity="info">
            <div
              className={styles.content_bank_info}
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          </Alert>
        </>
      )}
    </Fragment>
  );
};

const PaymentInfo = memo(({ open = true, toggle, user = null, selectedPayment = null, payments = [], handleChange }) => {
  const { wardCode = '', districtCode = '', provinceCode = '' } = user;

  return (
    <div className={styles.delivery_container}>
      <Collapse
        in={open}
        collapsedSize={48}
        style={{ width: '100%', borderRadius: '10px', boxShadow: open ? '0px' : '0px 0px 6px rgba(0, 0, 0, 0.05)' }}
      >
        <Grid container className={styles.delivery_content}>
          <Grid container justifyContent="space-between" className={styles.delivery_top_content}>
            <Typography className={styles.delivery_top_content}>Hình thức thanh toán</Typography>
            <Box className={clsx(styles.btn_hidden, !open && styles.align_center)} onClick={toggle}>
              <p style={{ marginTop: '4px' }}>{open ? 'Ẩn' : 'Hiện'}</p>
              <div className={clsx(styles.toggle_ic, !open && styles.rotate_icon)}>
                <ICON_UP_INVOICE />
              </div>
            </Box>
          </Grid>
          {(!wardCode || !districtCode || !provinceCode) && (
            <Alert severity="info" style={{ borderRadius: '8px' }}>
              Vui lòng nhập đầy đủ {!wardCode && 'xã/phường'}
              {!districtCode && ', quận/huyện'}
              {!provinceCode && ', tỉnh/thành phố'} trong{' '}
              <b>
                <Link href="/my-account">
                  <a href="/my-account" target="_blank">
                    Thông tin tài khoản
                  </a>
                </Link>
              </b>{' '}
              để được hưởng đúng chiết khấu.
            </Alert>
          )}
          <FormControl component="fieldset">
            <RadioGroup value={selectedPayment?.code} onChange={(e) => handleChange(e)}>
              {payments?.length > 0 && payments?.map((item) => renderPaymentMethod({ item, selectedVal: selectedPayment?.code }))}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Collapse>
    </div>
  );
});

export default memo(PaymentInfo);
