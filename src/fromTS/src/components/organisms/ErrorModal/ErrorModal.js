import React, { memo } from 'react';
import { Modal } from 'components/atoms';
import { Button, Typography } from '@material-ui/core';

import styles from './style.module.css';

const ErrorModal = memo((props) => {
  const { onClose, visible, className, restProps } = props;

  return (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <div className={styles.confirm_modal_wrap}>
        <div style={{ textAlign: 'center' }}>
          <div className={styles.warning_icon}>
            <Typography className={styles.text_icon}>!</Typography>
          </div>
          <Typography className={styles.modal_title}>Xin xác nhận</Typography>
          <Typography className={styles.modal_content}>
            Số lượng sản phẩm được đánh dấu quan trọng không được nhiều hơn 20% tổng số sản phẩm
          </Typography>
        </div>
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Button variant="contained" color="primary" className={styles.btn} onClick={onClose}>
            OK
          </Button>
        </div>
      </div>
    </Modal>
  );
});

export default ErrorModal;
