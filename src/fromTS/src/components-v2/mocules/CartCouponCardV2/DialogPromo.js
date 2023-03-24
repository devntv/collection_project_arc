import { Dialog, DialogContent, Divider, Grid, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { ENUM_TRACKING_ACTION } from 'constants/Enums';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Tracking } from 'utils';
import styles from './styles.module.css';

function DialogPromo({ open, handleClose, code, renderConfigConditionVoucher, accountId, customerID, currentPage, isMobile }) {
  const [isCoppied, setIsCoppied] = useState(false);
  const handleCopy = () => {
    setIsCoppied(true);
    Tracking.trackingFunc(ENUM_TRACKING_ACTION.CLICK_COPY_VOUCHER_ON_CART_PAGE, { accountId, customerID, page: '/cart', currentPage, isMobile });
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent className={styles.containerContent}>
        <Grid container item xs={12} className={styles.tooltipContainer}>
          <Grid className={styles.tooltipTitle} container xs={12} item>
            <Typography>Điều kiện sử dụng</Typography>
            <CloseIcon className={styles.closeIcon} onClick={handleClose} />
          </Grid>

          <Grid container item xs={12} className={styles.wrapCodeVoucher} alignItems="center">
            <Grid item xs={4} className={styles.voucherCodeTitle}>
              <Typography>Mã giảm giá</Typography>
            </Grid>
            <Grid xs={8} className={styles.voucherCode} item>
              <Typography>{code}</Typography>
              <CopyToClipboard text={code} onCopy={handleCopy}>
                <FileCopyOutlinedIcon />
              </CopyToClipboard>
              <Typography style={{ display: !isCoppied && 'none' }}>
                {isCoppied ? <DoneIcon style={{ color: '#09884D', fontSize: '16px', padding: '0px', margin: '0px' }} /> : null}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} className={styles.dividerTooltip}>
            <Divider />
          </Grid>

          <Grid className={styles.coditionVoucher}>
            <Typography>Điều kiện sử dụng</Typography>
          </Grid>

          <Grid item container xs={12} className={styles.coditionDesc}>
            {renderConfigConditionVoucher()}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default DialogPromo;
