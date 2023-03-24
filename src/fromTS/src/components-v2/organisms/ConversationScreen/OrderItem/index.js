/* eslint-disable no-shadow */
import { Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { ENUM_ORDER_STATUS_COLOR_V2, ENUM_ORDER_STATUS_LABEL, PAYMENT_METHOD_NAME_SHORT } from 'constants/Enums';
import { TIME } from 'constants/Icons';
import { formatDate3 } from 'utils/FormatDate';
import { formatCurrency } from 'utils/FormatNumber';
import useChat from 'zustand-lib/useChat';
import styles from '../styles.module.css';

const OrderItem = ({ order }) => {
  const {
    orderId = null,
    paymentMethod = '',
    createdTime = '',
    totalPrice = '',
    totalQuantity = 0,
    status = '',
    redeemCode = [],
    customerShippingAddress = '',
    totalDiscount = 0,
    customerProvinceCode = '',
    customerDistrictCode = '',
    customerWardCode = '',
  } = order;
  const { masterAddressObj = null } = useChat((state) => state);
  const addressOrder = {
    provinceCode: customerProvinceCode,
    districtCode: customerDistrictCode,
    wardCode: customerWardCode,
  };
  const addressOrderStr = JSON.stringify(addressOrder);

  return (
    <Grid className={clsx(styles.rootOrder)}>
      <Grid container className={styles.twoColOrder}>
        <Grid item xs={6} className={styles.leftOrder}>
          <Typography className={styles.codeOrder} variant="h6">
            #{orderId}
          </Typography>
          <div className={styles.wrapperTime}>
            <TIME />
            <Typography className={styles.dateOrder} variant="h6">
              {formatDate3(createdTime, true)}
            </Typography>
          </div>
          <div className={styles.wrapperTotal}>
            <Typography className={styles.totalOrder} variant="h6">
              Tổng SL
            </Typography>
            <Typography className={styles.quantityOrder} variant="h6">
              {totalQuantity}
            </Typography>
          </div>
          <Typography className={styles.priceOrder} variant="h6">
            {formatCurrency(totalPrice)}
          </Typography>
        </Grid>
        <Grid item xs={5} className={styles.rightOrder}>
          <div className={styles.statusOrder}>
            <div className={styles.statusLinkItem} style={{ backgroundColor: ENUM_ORDER_STATUS_COLOR_V2[status] }} />
            <Typography className={styles.textStatusOrder} variant="h6">
              {ENUM_ORDER_STATUS_LABEL[status]}
            </Typography>
          </div>
          <Typography className={styles.methodPaymentOrder} variant="h6">
            {PAYMENT_METHOD_NAME_SHORT[paymentMethod]}
          </Typography>
          {totalDiscount > 0 && (
            <Typography className={styles.methodPaymentOrder} variant="h6">
              -{formatCurrency(totalDiscount)}
            </Typography>
          )}
          <Typography className={styles.codeCouponOrder} variant="h6">
            {redeemCode.length > 0 ? redeemCode[0] : ''}
          </Typography>
        </Grid>
        <Grid item xs={1} />
      </Grid>
      <div className={styles.addressOrder}>
        {`${customerShippingAddress}, `}
        {(masterAddressObj && masterAddressObj[addressOrderStr]) || ''}
      </div>
    </Grid>
  );
};
export default OrderItem;
