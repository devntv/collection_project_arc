import { Button, CircularProgress, Dialog, DialogContent, Grid, makeStyles, Typography } from '@material-ui/core';
import { AuthClient, getFirst } from 'clients';
import React from 'react';
import { FormatNumber } from 'utils';
import styles from './styles.module.css';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiPaper-root': {
      borderRadius: '12px',
      maxWidth: '360px',
      minWidth: '360px',
      padding: '10px 0px',
    },
  },
}));
function LoyaltyModalExchange({ open, onClose, onClickOK, pointVoucher, isSending }) {
  const [userInfo, setUserInfo] = React.useState([]);

  React.useEffect(() => {
    async function getUserInfo() {
      const result = await AuthClient.getUser();
      setUserInfo(getFirst(result));
    }
    if (open) {
      getUserInfo();
    }
  }, [userInfo?.point, open]);

  const classes = useStyles();
  return (
    <Dialog open={open} onClose={onClose} className={classes.root}>
      <DialogContent>
        <Grid container>
          <Grid item>
            <Typography className={styles.desExchange}>
              Bạn đang có <span style={{ color: '#08AC60' }}>{FormatNumber.formatFloatNumber(userInfo?.point || 0)}</span> điểm. Bạn có đồng ý đổi{' '}
              <span style={{ color: '#08AC60' }}>{pointVoucher}</span> điểm để lấy mã giảm giá này không?
            </Typography>
          </Grid>
          <Grid item container justifyContent="space-around" style={{ marginTop: '20px' }}>
            <Button className={styles.btnNo} onClick={onClose}>
              Từ chối
            </Button>
            <Button className={styles.btnYes} onClick={onClickOK} disabled={isSending} style={{ backgroundColor: isSending && '#16bb6e' }}>
              {isSending ? <CircularProgress size={20} value={100} thickness={4} style={{ color: '#ffffff' }} /> : 'Đồng ý'}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default LoyaltyModalExchange;
