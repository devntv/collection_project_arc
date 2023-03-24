import { Box, Grid, IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import clsx from 'clsx';
import { Modal } from 'components/atoms';
import React from 'react';
import styles from './styles.module.css';

const NewInvoiceModal = ({
  className,
  visible,
  onClose,
  restProps,
  width,
  title,
  children,
  isAdding,
  step,
  getStepInvoiceSubtract,
  check,
  setCheck,
}) => {
  const handleBackStepInvoice = () => {
    getStepInvoiceSubtract();
    setCheck(false);
  };

  const renderTitle = () => {
    if (step === 2 && !check) return 'Thêm mới thông tin hóa đơn';
    if (step === 2 && check) return 'Sửa thông tin xuất hóa đơn';
    return title;
  };
  return (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <div className={styles.auth_modal_content} style={{ width: `${width}` }}>
        <Grid container className={styles.auth_modal_header} justifyContent="space-between" alignItems="center">
          <Grid item xs={10}>
            <Box display="flex" alignItems="center">
              {step === 2 && (
                <IconButton onClick={handleBackStepInvoice} className={isAdding ? styles.hiddenClose : styles.iconBack}>
                  <ArrowBackIosIcon />
                </IconButton>
              )}

              <header className={styles.auth_modal_title}>{renderTitle()}</header>
            </Box>
          </Grid>

          <Grid item xs={1}>
            <IconButton aria-label="close" className={styles.auth_modal_close} onClick={onClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>
        <div className={clsx(styles.auth_modal_body, styles.slideRight)}>{children}</div>
      </div>
    </Modal>
  );
};

export default React.memo(NewInvoiceModal);
