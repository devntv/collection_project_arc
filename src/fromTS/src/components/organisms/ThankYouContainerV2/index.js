import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorIcon from '@material-ui/icons/Error';
import { Typography, Grid, Button } from '@material-ui/core';
import { EditOrderButton } from 'components/mocules';
import { DateTimeUtils } from 'utils';
import Router from 'next/router';
import { MY_ORDER_URL } from 'constants/Paths';
import styles from './styles.module.css';

const WatchOrderButton = ({ handleClick }) => (
  <Button className={styles.watch_order_button} onClick={handleClick}>
    Xem Đơn Hàng
  </Button>
);

const ThankYouContainer = ({ orderId = 0, deliveryDate, canEdit = false }) => {
  const handleWatchOrder = () => {
    Router.push(`${MY_ORDER_URL}/${orderId}`);
  };

  // todo : không có delivery date thì off
  const deliveryDateStr = DateTimeUtils.getFormattedWithDate(new Date(deliveryDate)).toLowerCase();

  return (
    <Grid container spacing={2} className={styles.container} direction="column">
      <Grid className={styles.icon}>
        <CheckCircleOutlineIcon className={styles.icon} />
      </Grid>
      <Typography variant="h5" className={styles.title}>
        Cảm ơn bạn đã đặt hàng tại thuocsi.vn!
      </Typography>
      {deliveryDate && (
        <Grid item>
          Dự kiến giao vào&nbsp;
          <strong>{deliveryDateStr} </strong>
        </Grid>
      )}

      <Grid item>
        Đơn hàng sẽ được xác nhận bằng tin nhắn trong vòng 60 phút.
        <br />
        {/* Để xuất đơn đỏ, vui lòng vào trang&nbsp;
        <Link prefetch={false} href={MY_ORDER_URL}>
          đơn hàng của tôi
        </Link>
        &nbsp;và nhấn vào nút "Xuất hoá đơn". */}
      </Grid>
      <Grid item className={styles.note} container justifyContent="center" alignItems="center">
        <ErrorIcon /> &nbsp;Quý khách sẽ có 30 phút để chỉnh sửa giỏ hàng, bỏ bớt sản phẩm trong vòng 2 tiếng và được hỗ trợ huỷ đơn hàng trong vòng
        12 tiếng sau khi đặt hàng
      </Grid>
      <Grid item container justifyContent="center">
        <EditOrderButton orderId={orderId} canEdit={canEdit} />
        <WatchOrderButton handleClick={handleWatchOrder} />
      </Grid>
    </Grid>
  );
};

export default ThankYouContainer;
