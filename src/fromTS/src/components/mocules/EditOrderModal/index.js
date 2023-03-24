import { Button, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { Modal } from 'components/atoms';
import { memo } from 'react';

import styles from './style.module.css';

const EditOrderModal = memo((props) => {
  const { onClose, onClickOk, visible, className, restProps } = props;

  return (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <div className={styles.confirm_modal_wrap}>
        <div>
          <div className={styles.warning_icon}>
            <Typography className={styles.text_icon}>!</Typography>
          </div>
          <Typography className={styles.modal_title}>Xin xác nhận</Typography>
          <Typography className={styles.modal_content}>
            Đơn của bạn sẽ được trả về lại giỏ hàng. Bạn&nbsp;
            <strong>cần bấm Thanh Toán lại </strong>
            đơn hàng ngay sau khi chỉnh sửa xong. Nếu không xác nhận ngay, giá sản phẩm có thể thay đổi theo giá tăng/giảm hàng ngày. Bạn có chắc muốn
            sửa lại đơn này?
          </Typography>
        </div>
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <Button className={clsx(styles.btn, styles.brown_btn)} onClick={onClose} data-test="btn-cancel-edit-order">
            Không
          </Button>
          <Button onClick={onClickOk} className={clsx(styles.btn, styles.fill_btn)} data-test="btn-ok-edit-order">
            Có
          </Button>
        </div>
      </div>
    </Modal>
  );
});

export default EditOrderModal;
