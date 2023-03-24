import React, { memo } from 'react';
import { Modal } from 'components/atoms';
import { Button, Typography } from '@material-ui/core';
import { formatNumber } from 'utils/FormatNumber';
import clsx from 'clsx';

import styles from './styles.module.css';

const ExchangeModal = memo((props) => {
  const { onClose, onClickOk, visible, className, restProps, point } = props;

  return (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <div className={styles.confirm_modal_wrap}>
        <div>
          <div className={styles.warning_icon}>
            <Typography className={styles.text_icon}>!</Typography>
          </div>
          <Typography className={styles.modal_title}>Xin xác nhận</Typography>
          <Typography className={styles.modal_content}>
            Bạn đang dùng <b>{formatNumber(point)} </b> điểm để đổi mã giảm giá.Bạn có muốn tiếp tục
            ?
          </Typography>
        </div>
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <Button className={clsx(styles.btn, styles.brown_btn)} onClick={onClose}>
            Không
          </Button>
          <Button onClick={onClickOk} className={clsx(styles.btn, styles.fill_btn)}>
            Có
          </Button>
        </div>
      </div>
    </Modal>
  );
});

export default ExchangeModal;
