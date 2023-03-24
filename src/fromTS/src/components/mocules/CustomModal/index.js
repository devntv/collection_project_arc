import { Typography } from '@material-ui/core';
import { ButtonDefaultLogin, Modal } from 'components/atoms';
import React, { memo } from 'react';
import styles from './style.module.css';

const CustomModal = memo(
  ({
    icon = true,
    children,
    onClose,
    onClickOk,
    visible,
    className,
    restProps,
    title,
    content,
    btnOk = 'Có',
    btnOnClose = 'Không',
    btnCloseRender = (
      <ButtonDefaultLogin className={styles.font_gg} btnType="warning" onClick={onClose} data-test="btn-custom-modal-cancel">
        {btnOnClose}
      </ButtonDefaultLogin>
    ),
    btnOkRender = (
      <ButtonDefaultLogin className={styles.font_gg} onClick={onClickOk} data-test="btn-custom-modal-ok">
        {btnOk}
      </ButtonDefaultLogin>
    ),
    customBtnRender,
  }) => (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <div className={styles.confirm_modal_wrap}>
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
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          {btnCloseRender && btnCloseRender}
          {btnOkRender && btnOkRender}
          {customBtnRender && customBtnRender}
        </div>
      </div>
    </Modal>
  ),
);

export default React.memo(CustomModal);
