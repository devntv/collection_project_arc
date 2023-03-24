import { Button, Grid, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Modal } from 'components/atoms';
import { memo } from 'react';
import styles from './styles.module.css';

function CustomModalV2({
  icon = true,
  children,
  onClose,
  onClickOk,
  visible,
  className,
  restProps,
  title,
  content,
  btnOk = 'Đồng ý',
  btnOnClose = 'Từ chối',
  btnCloseRender = (
    <Button className={styles.btn_on_close} onClick={onClose}>
      {btnOnClose}
    </Button>
  ),
  btnOkRender = (
    <Button className={styles.btn_ok} onClick={onClickOk}>
      {btnOk}
    </Button>
  ),
  customBtnRender,
}) {
  return (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <div className={styles.confirm_modal_wrap}>
        <IconButton className={styles.btn_ic_close} onClick={onClose}>
          <CloseIcon style={{ color: '#C0C0C0' }} />
        </IconButton>
        <div style={{ textAlign: 'center' }}>
          {icon && (
            <div className={styles.warning_icon}>
              <Typography className={styles.text_icon}>!</Typography>
            </div>
          )}
          {title && (
            <Typography className={styles.modal_title} data-test="modal-custom-title">
              {title}
            </Typography>
          )}
          {content && (
            <Typography className={styles.modal_content} data-test="modal-custom-content">
              {content}
            </Typography>
          )}
          {children}
        </div>
        <Grid container justifyContent="center" style={{ textAlign: 'center', marginTop: '20px', columnGap: '18px' }}>
          {btnCloseRender && btnCloseRender}
          {btnOkRender && btnOkRender}
          {customBtnRender && customBtnRender}
        </Grid>
      </div>
    </Modal>
  );
}

export default memo(CustomModalV2);
