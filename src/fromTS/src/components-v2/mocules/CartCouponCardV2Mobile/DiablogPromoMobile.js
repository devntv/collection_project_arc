import { Dialog, DialogContent, DialogContentText, Grid, makeStyles, Slide, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import clsx from 'clsx';
import ButtonV2 from 'components-v2/atoms/ButtonV2';
import { ENUM_TRACKING_ACTION } from 'constants/Enums';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Tracking } from 'utils';
import stylesMobile from './stylesMobile.module.css';

const useStyles = makeStyles({
  paper: {
    position: 'absolute',
    marginBottom: 0,
    bottom: 0,
  },
});
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
function DiablogPromoMobile({
  open,
  handleClose,
  className,
  iconCoppy,
  code = '',
  newCondition = '',
  canUse = false,
  handleChangePromo,
  description = '',
  redeemCode = [],
  accountId,
  customerID,
  currentPage,
  isMobile,
}) {
  const classes = useStyles();
  // copy code
  const [isCoppied, setIsCoppied] = React.useState(false);
  const codeUsing = String(code) === redeemCode[0];
  const handleCoppied = () => {
    setIsCoppied(true);
    Tracking.trackingFunc(ENUM_TRACKING_ACTION.CLICK_COPY_VOUCHER_ON_CART_PAGE, {
      accountId,
      customerID,
      page: '/cart',
      currentPage,
      isMobile,
    });
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      TransitionComponent={Transition}
      className={clsx(className)}
      classes={{ paper: classes.paper }}
    >
      <DialogContent>
        <DialogContentText component="div">
          <Grid container xs={12} className={stylesMobile.containerTitle} item>
            <Grid className={stylesMobile.titleTop} item xs={11}>
              <Typography>Điều kiện sử dụng</Typography>
            </Grid>
            <Grid item xs={1}>
              <CloseIcon style={{ cursor: 'pointer', color: '#d0d0d0' }} onClick={handleClose} />
            </Grid>
          </Grid>
        </DialogContentText>
        <Grid container item xs={12} className={stylesMobile.actionCodeContainer} alignItems="center">
          <Grid item xs={4} className={stylesMobile.wrapLabelCode}>
            <Typography>Mã giảm giá</Typography>
          </Grid>
          <Grid item xs={8} className={stylesMobile.actionCode} alignItems="center">
            <Typography>{code}</Typography>
            <CopyToClipboard text={code} onCopy={handleCoppied}>
              {iconCoppy}
            </CopyToClipboard>
            <Typography style={{ display: !isCoppied && 'none' }}>
              {isCoppied ? <DoneIcon style={{ color: '#09884D', fontSize: '16px', padding: '0px', margin: '0px' }} /> : null}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} style={{ marginTop: '10px' }}>
          <Grid item xs={12} className={stylesMobile.wrapDesc}>
            <Typography>Điều kiện sử dụng</Typography>
          </Grid>
          <Grid className={stylesMobile.coditionDesc} container xs={12} item>
            <div dangerouslySetInnerHTML={{ __html: newCondition }} />
          </Grid>
          <Grid container xs={12} item className={stylesMobile.btnApplyMobile} justifyContent="center">
            <ButtonV2
              onClick={codeUsing ? null : () => handleChangePromo(String(code), description)}
              disabled={!canUse}
              className={clsx(stylesMobile.btnApply, !canUse && stylesMobile.disabledBtn, codeUsing && stylesMobile.codeUsing)}
            >
              {codeUsing ? 'Đang dùng' : 'Dùng Ngay'}
            </ButtonV2>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(DiablogPromoMobile);
