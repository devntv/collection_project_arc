import { Button, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { Modal } from 'components/atoms';
import { memo } from 'react';

import styles from './style.module.css';

const DeleteAddressModal = memo((props) => {
  const { onClose, onClickOk, visible, className, restProps } = props;

  return (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <div className={styles.confirm_modal_wrap} data-test="modal-delete-address">
        <div>
          <div className={styles.warning_icon}>
            <Typography className={styles.text_icon}>!</Typography>
          </div>
          <Typography className={styles.modal_title}>Xin xác nhận</Typography>
          <Typography className={styles.modal_content}>Bạn có chắc muốn xoá địa chỉ này chứ ?</Typography>
        </div>
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <Button className={clsx(styles.btn, styles.brown_btn)} onClick={onClose}>
            Không
          </Button>
          <Button onClick={onClickOk} className={clsx(styles.btn, styles.fill_btn)} data-test="btn-ok-delete-modal">
            Có
          </Button>
        </div>
      </div>
    </Modal>
  );
});

export default DeleteAddressModal;
