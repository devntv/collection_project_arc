import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import clsx from 'clsx';
import { PAYMENT_METHOD_NAME } from 'constants/Enums';
import React from 'react';
import DateTimeUtils from 'utils/DateTimeUtils';
import styles from './styles.module.css';

const NOT_YET = '(Chưa có)';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const OrderDetailInfo = ({
  customerName,
  masterAddress,
  customerEmail,
  customerPhone,
  note,
  deliveryTrackingNumber,
  deliveryDate,
  deliveryCarrier,
  deliveryMethodName,
  paymentMethod,
  invoice = {},
}) => {
  const classes = useStyles();
  const { invoiceRequest = false, companyName, companyAddress, taxCode, mst, email } = invoice;
  return (
    <div className={styles.info}>
      <Grid container spacing={2} className={styles.info_inner_grid}>
        <Grid item xs={5} className={styles.info_adress}>
          <Paper className={classes.paper} elevation={3} classes={{ root: styles.info_left_paper }}>
            <Typography variant="h5" className={styles.info_label}>
              Tên người nhận
            </Typography>
            <Typography variant="h6" className={clsx(styles.info_value, styles.ellipsis_1_line)}>
              {customerName}
            </Typography>
            <Typography variant="h5" className={styles.info_label}>
              Địa chỉ giao hàng
            </Typography>
            <Typography variant="h6" className={clsx(styles.info_value, styles.ellipsis_2_line)}>
              {masterAddress}
            </Typography>
            <Typography variant="h5" className={styles.info_label}>
              Số điện thoại
            </Typography>
            <Typography variant="h6" className={styles.info_value}>
              {customerPhone}
            </Typography>
            <Typography variant="h5" className={styles.info_label}>
              Email
            </Typography>
            <Typography variant="h6" className={clsx(styles.info_value, styles.ellipsis_1_line)}>
              {customerEmail || NOT_YET}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={7} container spacing={2} direction="column" className={styles.info_container}>
          <Grid item className={styles.info_container}>
            <Paper className={classes.paper} elevation={3}>
              <Grid>
                <Typography display="inline" variant="h5" className={styles.info_label}>
                  Hình thức thanh toán:
                </Typography>
                &nbsp;
                <Typography display="inline" variant="h6" className={styles.info_value}>
                  {/* {paymentMethodName} */}
                  {PAYMENT_METHOD_NAME[paymentMethod] || ''}
                </Typography>
              </Grid>
              <Grid>
                {paymentMethod !== 'PAYMENT_METHOD_NORMAL' && (
                  <Alert className={styles.bank_info} icon={false} severity="info">
                    <p>
                      <strong>Chủ tài khoản &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>Công Ty TNHH Buymed
                    </p>
                    <p>
                      <strong>Số tài khoản &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>1913 45430 30020
                    </p>
                    <p>
                      <strong>Ngân hàng &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>Ngân hàng Techcombank - Chi nhánh
                      Bắc Hải
                    </p>
                    <p>
                      <strong>Nội dung &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>Mã đơn hàng - Tên
                      nhà thuốc
                    </p>
                  </Alert>
                )}
              </Grid>
            </Paper>
          </Grid>
          <Grid item className={styles.info_container}>
            <Paper className={classes.paper} elevation={3}>
              <Typography variant="h5" className={styles.info_label}>
                Hình thức vận chuyển:&nbsp;
                <span>{deliveryMethodName} </span>
              </Typography>
              <Typography variant="h5" className={styles.info_label}>
                Đơn vị vận chuyển:&nbsp;
                <span>{deliveryCarrier || NOT_YET} </span>
              </Typography>
              <Typography variant="h5" className={styles.info_label}>
                Ngày giao:&nbsp;
                <span>{deliveryDate ? DateTimeUtils.getFormattedWithDate(new Date(deliveryDate)) : NOT_YET}</span>
              </Typography>
              <Typography variant="h5" className={styles.info_label}>
                Mã vận đơn:&nbsp;<span>{deliveryTrackingNumber || NOT_YET} </span>
              </Typography>
            </Paper>
          </Grid>
          <Grid item className={styles.info_container}>
            <Paper className={classes.paper} elevation={3}>
              <Typography variant="h5" className={styles.info_label}>
                Ghi chú:
              </Typography>
              <Typography variant="h6" className={styles.info_value}>
                {note || NOT_YET}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        {invoiceRequest && (
          <Grid item xs={12} className={styles.info_address}>
            <Paper className={classes.paper} elevation={3} classes={{ root: styles.info_left_paper }}>
              <Typography variant="h4" className={styles.info_title}>
                Thông tin xuất hoá đơn
              </Typography>
              <Typography variant="h5" className={clsx(styles.info_label)}>
                <div>
                  Tên công ty:&nbsp;
                  <span>{companyName}</span>
                </div>
              </Typography>
              <Typography variant="h5" className={clsx(styles.info_label)}>
                Mã số thuế:&nbsp;
                <span>{taxCode || mst}</span>
              </Typography>
              <Typography variant="h5" className={styles.info_label}>
                Địa chỉ xuất hoá đơn:&nbsp;
                <span className={styles.break_down}>{companyAddress}</span>
              </Typography>
              {email && (
                <Typography variant="h5" className={styles.info_label}>
                  Email:&nbsp;
                  <span className={styles.break_down}>{email}</span>
                </Typography>
              )}
            </Paper>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default React.memo(OrderDetailInfo);
