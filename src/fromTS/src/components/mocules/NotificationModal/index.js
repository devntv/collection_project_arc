import { Typography } from '@material-ui/core';
import { ButtonDefaultLogin, Modal } from 'components/atoms';
import React, { memo } from 'react';
import styles from './style.module.css';

const CustomModal = memo(
  ({
    children,
    onClose,
    onClickOk,
    visible,
    className,
    restProps,
    title,
    content,
    btnOk = 'Có',
    btnOkRender = <ButtonDefaultLogin onClick={onClickOk}>{btnOk}</ButtonDefaultLogin>,
    customBtnRender,
    icon = '!',
  }) => (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <div className={styles.confirm_modal_wrap}>
        <div style={{ textAlign: 'center' }}>
          {icon && (
            <div className={styles.warning_icon}>
              <Typography className={styles.text_icon}>{icon}</Typography>
            </div>
          )}
          {title && <Typography className={styles.modal_title}>{title}</Typography>}
          {content && <Typography className={styles.modal_content}>{content}</Typography>}
          {children}
        </div>
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          {btnOkRender && btnOkRender}
          {customBtnRender && customBtnRender}
        </div>
      </div>
    </Modal>
  ),
);

export default React.memo(CustomModal);
