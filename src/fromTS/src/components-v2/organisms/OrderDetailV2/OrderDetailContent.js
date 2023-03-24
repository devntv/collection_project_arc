import { Box, Grid, Typography } from '@material-ui/core';
import { PAYMENT_METHOD_NAME } from 'constants/Enums';
import { DateTimeUtils } from 'utils';
import styles from './styles.module.css';

function OrderDetailContent({ order }) {
  const {
    customerName,
    masterAddress,
    customerPhone,
    customerEmail,
    deliveryDate,
    note,
    deliveryCarrier,
    deliveryTrackingNumber,
    deliveryMethodName,
    paymentMethod,
  } = order;

  return (
    <Grid container justifyContent="flex-start" alignItems="center">
      <Grid item xs={12}>
        <Typography className={styles.text_title}>Địa chỉ và thông tin người nhận hàng</Typography>
      </Grid>
      <ul style={{ paddingLeft: '20px', marginBottom: '4px', color: '#A2A0A0' }}>
        <li>
          <Box className={styles.contentDetail}>
            <span style={{ marginRight: '12px' }}>Tên người nhận:</span>
            <span className={styles.contentValueInfo}>{customerName || '(Chưa có)'}</span>
          </Box>
        </li>
        <li>
          <Box className={styles.contentDetail}>
            <span style={{ marginRight: '12px' }}>Địa chỉ giao hàng:</span>
            <span className={styles.contentValueInfo}>{masterAddress || '(Chưa có)'}</span>
          </Box>
        </li>
        <li>
          <Box className={styles.contentDetail}>
            <span style={{ marginRight: '12px' }}>Số điện thoại:</span>
            <span className={styles.contentValueInfo}>{customerPhone}</span>
          </Box>
        </li>
        <li>
          <Box className={styles.contentDetail}>
            <span style={{ marginRight: '12px' }}>Email:</span>
            <span className={styles.contentValueInfo}>{customerEmail || '(Chưa có)'}</span>
          </Box>
        </li>
      </ul>

      <Grid item xs={12} style={{ marginTop: '12px' }}>
        <Typography className={styles.text_title}>Hình thức thanh toán & Vận chuyển</Typography>
      </Grid>
      <ul style={{ paddingLeft: '20px', marginBottom: '4px', color: '#A2A0A0' }}>
        <li>
          <Box className={styles.contentDetail}>
            <span style={{ marginRight: '12px' }}>Hình thức thanh toán:</span>
            <span className={styles.contentValueInfo}>{PAYMENT_METHOD_NAME[paymentMethod] || '(Chưa có)'}</span>
          </Box>
        </li>
        <li>
          <Box className={styles.contentDetail}>
            <span style={{ marginRight: '12px' }}>Ngày giao:</span>
            <span className={styles.contentValueInfo}>
              Dự kiến {deliveryDate ? DateTimeUtils.getFormattedWithDate(new Date(deliveryDate)) : 'chưa xác định'}
            </span>
          </Box>
        </li>
        <li>
          <Box className={styles.contentDetail}>
            <span style={{ marginRight: '12px' }}>Hình thức vận chuyển:</span>
            <span className={styles.contentValueInfo}>{deliveryMethodName || '(Chưa có)'}</span>
          </Box>
        </li>
        <li>
          <Box className={styles.contentDetail}>
            <span style={{ marginRight: '12px' }}>đơn vị vận chuyển:</span>
            <span className={styles.contentValueInfo}>{deliveryCarrier || '(Chưa có)'}</span>
          </Box>
        </li>
        <li>
          <Box className={styles.contentDetail}>
            <span style={{ marginRight: '12px' }}>Mã vận đơn:</span>
            <span className={styles.contentValueInfo}>{deliveryTrackingNumber || '(Chưa có)'}</span>
          </Box>
        </li>
        <li>
          <Box className={styles.contentDetail}>
            <span style={{ marginRight: '12px' }}>Ghi chú:</span>
            <span className={styles.contentValueInfo}>{note || '(Chưa có)'}</span>
          </Box>
        </li>
      </ul>
    </Grid>
  );
}

export default OrderDetailContent;
