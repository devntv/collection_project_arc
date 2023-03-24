import { Dialog, Grid, Slide } from '@material-ui/core';
import ButtonV2 from 'components-v2/atoms/ButtonV2';
import React from 'react';
import styles from './styles.module.css';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function ModalCustomer({ open, onClose, contentLoyaltyCustomer }) {
  return (
    <Dialog fullWidth open={open} onClose={onClose} TransitionComponent={Transition} className={styles.wrapDiablog}>
      <Grid className={styles.wrapContent} item>
        <Grid container className={styles.titleRules} justifyContent="center">
          Cách tính cấp bậc khách hàng
        </Grid>
        <Grid className={styles.contentRules}>{contentLoyaltyCustomer}</Grid>
        <Grid item className={styles.wrapBtn}>
          <ButtonV2 onClick={onClose} className={styles.btnV2}>
            Đóng
          </ButtonV2>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default ModalCustomer;
