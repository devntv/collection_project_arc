import { Box, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Modal, ModalButton } from 'components/atoms';
import React, { memo } from 'react';
import styles from './styles.module.css';

const CouponDetailModal = memo(
  ({
    children,
    onClose,
    onClickOk,
    visible,
    className,
    restProps,
    title,
    content,
    btnOk,
    isMobileV2 = false,
    btnOkRender = (
      <ModalButton className={styles.yes_btn} onClick={onClickOk}>
        {btnOk}
      </ModalButton>
    ),
  }) => (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <div
        className={`${styles.confirm_modal_wrap}  ${title && content && styles.fixed_width_wrapper} ${isMobileV2 && styles.confirm_modal_wrap_mv2}`}
      >
        <CloseIcon className={styles.closeIcon} onClick={onClose} />
        <div>
          {title && <Typography className={styles.modal_title}>{title}</Typography>}
          {content && <div className={styles.modal_content}>{content}</div>}
          <div className={styles.children}>{children}</div>
        </div>
        <Box className={styles.btn_container}>{btnOk && btnOkRender}</Box>
      </div>
    </Modal>
  ),
);

export default React.memo(CouponDetailModal);
