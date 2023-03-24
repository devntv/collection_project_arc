import React, { memo } from 'react';
import { Modal } from 'components/atoms';
import { Button, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { formatCurrency } from 'utils/FormatNumber';
import DoneIcon from '@material-ui/icons/Done';
import Router from 'next/router';
import { USER_PROMO_CODES_URL } from 'constants/Paths';
import styles from './styles.module.css';

const SuccessExchangeModal = memo((props) => {
  const { onClose, visible, className, restProps, loyalty } = props;
  let value = 0;
  if (
    loyalty &&
    loyalty.promotion &&
    loyalty.promotion.rewards &&
    loyalty.promotion.rewards.length > 0
  )
    value = loyalty.promotion.rewards[0].absoluteDiscount;

  const handleClickOk = () => {
    Router.push(USER_PROMO_CODES_URL);
  };
  return (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <div className={styles.confirm_modal_wrap}>
        <div>
          <div className={styles.success_icon}>
            <Typography className={styles.text_icon}>
              <DoneIcon style={{ fontSize: '60px' }} />
            </Typography>
          </div>
          <Typography className={styles.modal_title}>Xin chúc mừng</Typography>
          <Typography className={styles.modal_content}>
            Xin chúc mừng! Bạn vừa đổi thành công mã giảm giá trị giá
            <b> {formatCurrency(value)} </b>
          </Typography>
        </div>
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <Button className={clsx(styles.btn, styles.green_btn)} onClick={handleClickOk}>
            Xem ngay
          </Button>
          <Button onClick={onClose} className={clsx(styles.btn, styles.red_btn)}>
            Tiếp tục
          </Button>
        </div>
      </div>
    </Modal>
  );
});

export default SuccessExchangeModal;
