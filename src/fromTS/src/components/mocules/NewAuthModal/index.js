import { Grid, IconButton } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { Modal } from 'components/atoms';
import React from 'react';
import styles from './styles.module.css';

const NewAuthModal = React.memo((props) => {
  const { width, onClose, visible, children, title, className, restProps, height, isShowCloseBtn = true } = props;

  return (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <div className={styles.auth_modal_content} style={{ width: `${width}`, height: `${height}` }}>
        <Grid container className={styles.auth_modal_header} justifyContent="space-between" alignItems="center">
          <Grid item xs={isShowCloseBtn ? 10 : 12}>
            <header data-test="modal-title" className={styles.auth_modal_title}>
              {title}
            </header>
          </Grid>

          {isShowCloseBtn && (
            <Grid item xs={1}>
              <IconButton data-test="signup-close" aria-label="close" className={styles.auth_modal_close} onClick={onClose}>
                <CloseOutlinedIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
        <div className={styles.auth_modal_body}>{children}</div>
      </div>
    </Modal>
  );
});

export default NewAuthModal;
