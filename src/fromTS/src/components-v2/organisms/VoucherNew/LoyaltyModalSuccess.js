import { Button, Dialog, DialogContent, Grid, makeStyles, Typography } from '@material-ui/core';
import { CART_URL } from 'constants/Paths';
import Router from 'next/router';
import styles from './styles.module.css';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiPaper-root': {
      borderRadius: '12px',
      maxWidth: '360px',
      minWidth: '360px',
      minHeight: '180px',
    },
  },
}));
function LoyaltyModalSuccess(props) {
  const classes = useStyles();
  const { onClose, open, dataVoucher = [] } = props;

  const handleClickOk = () => {
    Router.push(CART_URL);
  };
  return (
    <Dialog open={open} onClose={onClose} className={classes.root}>
      <DialogContent>
        <Grid style={{ padding: '24px 0px' }} container justifyContent="center" alignContent="center">
          <Typography className={styles.successTitle}>
            Chúc mừng bạn đã thành công đổi điểm lấy Voucher <span style={{ color: '#08AC60' }}>{dataVoucher[0]?.voucherCode || ''}</span>. Tận hưởng
            ngay mức giá ưu đãi!
          </Typography>
        </Grid>
        <Grid container justifyContent="space-around">
          <Button className={styles.btnNo} onClick={onClose}>
            Quay lại
          </Button>
          <Button className={styles.btnYes} onClick={handleClickOk}>
            Dùng ngay
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default LoyaltyModalSuccess;
