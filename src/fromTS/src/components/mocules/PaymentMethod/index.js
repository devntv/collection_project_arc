/* eslint-disable react/jsx-wrap-multilines */
import { FormControl, FormControlLabel, Paper, Radio, RadioGroup } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import clsx from 'clsx';
import { PAYMENT_METHOD } from 'constants/Enums';
import Link from 'next/link';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const renderPaymentMethod = ({ item }) => {
  const { code, name, description, subTitle, url, isDisable, errorMessage = '' } = item || {};

  return (
    <React.Fragment key={uuidv4()}>
      <FormControlLabel
        key={uuidv4()}
        value={code}
        disabled={isDisable}
        control={<Radio classes={{ root: clsx(styles.checkbox, styles.checkbox_color) }} data-test="radio-checkout-payment" />}
        label={
          <div className={styles.fw500}>
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
      {subTitle && !isDisable && <div className={styles.subTitle}>{subTitle}</div>}

      {description && (
        <React.Fragment key={uuidv4()}>
          <Alert className={styles.bank_info} icon={false} severity="info">
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          </Alert>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const PaymentMethod = ({ handleChange, selectedValue = '', paymentMethods = [], paymentMethodDefault, user }) => {
  const selectedVal = selectedValue || paymentMethodDefault?.code || '';
  const { wardCode = '', districtCode = '', provinceCode = '' } = user;
  return (
    <Paper className={styles.root} elevation={4}>
      <h1 className={styles.title}>Hình thức thanh toán</h1>
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
        <RadioGroup value={selectedVal} onChange={(e) => handleChange(e)}>
          {paymentMethods?.length > 0 && paymentMethods?.map((item) => renderPaymentMethod({ item }))}
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};

export default PaymentMethod;
