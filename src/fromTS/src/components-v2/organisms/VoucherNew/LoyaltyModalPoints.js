import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, makeStyles, Slide } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { CustomerClient, getData, isValid } from 'clients';
import { ENUMS_ERROR_MSG_CODE } from 'constants/Enums';
import { useModal } from 'hooks';
import React from 'react';
import { DateTimeUtils, gtag, NotifyUtils } from 'utils';
import LoyaltyModalExchange from './LoyaltyModalExchange';
import LoyaltyModalSuccess from './LoyaltyModalSuccess';
import styles from './styles.module.css';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiPaper-root': {
      borderRadius: '12px',
      maxWidth: '360px',
      minWidth: '320px',
    },
  },
}));
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
function LoyaltyModalPoints(props) {
  const classes = useStyles();
  const { handleClose, open, code, promotion, point, handleSuccessExchange, voucherInfo, pointUser } = props;
  const { description, promotionName, conditionDescription = '' } = promotion || {};
  const [openSuccessExchangeModal, toggleSuccessExchangeModal] = useModal();
  const [ModalExchange, ModalExchangeToggle] = useModal();

  const [dataVoucher, setDataVoucher] = React.useState([]);
  const [isSending, setIsSending] = React.useState(false);
  const handleExchangeVoucher = async (loyaltyCode) => {
    setIsSending(true);
    try {
      const res = await CustomerClient.exchangeLoyalty({
        body: {
          loyaltyCode,
        },
      });
      if (!isValid(res)) throw Error(ENUMS_ERROR_MSG_CODE[res.errorCode] || 'Có lỗi khi đổi voucher. Vui lòng thử lại sau!');
      NotifyUtils.success('Đổi thành công');
      setDataVoucher(getData(res));
      setIsSending(false);
      gtag.exchangePoint();
      ModalExchangeToggle();
      toggleSuccessExchangeModal();
      handleClose();
      handleSuccessExchange(toggleSuccessExchangeModal);
    } catch (error) {
      NotifyUtils.error(error.message);
      setIsSending(false);
    }
  };

  // const handleApplyValue = () => {
  //   let value = 0;
  //   if (promotion?.rewards && promotion?.rewards.length > 0) {
  //     value = promotion?.rewards[0]?.absoluteDiscount;
  //   }
  //   return formatCurrency(value);
  // };

  return (
    <>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} TransitionComponent={Transition} className={classes.root}>
        <DialogTitle className={styles.dialogTitle}>
          <span className={styles.code}>Mã giảm giá</span>
          <IconButton className={styles.iconClose} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={6} sm={4} className={styles.titleVoucher}>
              Điểm đổi
            </Grid>
            <Grid item xs={6} sm={8} className={styles.titleValueVoucher}>
              {point}
            </Grid>
            {/* <Divider style={{ width: '92%' }} />
            <Grid item xs={6} sm={4} className={styles.titleVoucher}>
              Mã giảm giá
            </Grid>
            <Grid item xs={6} sm={8} className={styles.titleValueVoucher}>
              {code}
            </Grid> */}
            <Divider style={{ width: '92%', height: '0.5px' }} />
            <Grid item xs={6} sm={4} className={styles.titleVoucher}>
              Hạn sử dụng
            </Grid>
            <Grid item xs={6} sm={8}>
              {DateTimeUtils.getFormattedDate(new Date(promotion?.endTime))}
            </Grid>
            <Divider style={{ width: '92%', height: '0.5px' }} />
            <Grid item xs={12} className={styles.titleVoucher}>
              Giá trị áp dụng
            </Grid>
            <Grid item xs={12} className={styles.contentApplyValue}>
              {description || promotionName}
            </Grid>
            <Divider style={{ width: '92%', height: '0.5px' }} />
          </Grid>
          <Grid container style={{ marginTop: '26px', height: '100%' }} alignItems="center">
            <Box className={styles.coditionalUse}>Điều kiện sử dụng</Box>
            <Grid className={styles.contentInfoVoucher} item xs={12}>
              {/* {conditionsArrayFiltered.length ? (
                conditionsArrayFiltered.map((condition) => condition.message.map((mes) => <p key={uuidV4()}>{mes.text}</p>))
              ) : (
                <p>Áp dụng cho mọi đơn hàng</p>
              )} */}
              <div dangerouslySetInnerHTML={{ __html: conditionDescription }} />
            </Grid>
          </Grid>
          <Grid xs={12} item container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
            <Box className={styles.wrapBtn}>
              <Button className={styles.btnCashLoyalty} onClick={ModalExchangeToggle}>
                Đổi điểm tích lũy
              </Button>
            </Box>
          </Grid>
        </DialogContent>
      </Dialog>
      <LoyaltyModalExchange
        pointUser={pointUser}
        open={ModalExchange}
        onClose={ModalExchangeToggle}
        pointVoucher={point}
        onClickOK={() => handleExchangeVoucher(code)}
        isSending={isSending}
      />
      <LoyaltyModalSuccess
        open={openSuccessExchangeModal}
        onClose={toggleSuccessExchangeModal}
        pointVoucher={point}
        voucherInfo={voucherInfo}
        dataVoucher={dataVoucher}
      />
    </>
  );
}

export default React.memo(LoyaltyModalPoints);
