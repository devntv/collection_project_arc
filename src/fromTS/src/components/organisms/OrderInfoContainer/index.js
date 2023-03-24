import { Grid } from '@material-ui/core';
// import { Alert } from '@material-ui/lab';
import { OrderInfoTabs } from 'components/mocules';
import { PATH_INFO_BILL } from 'constants/Paths';
import styles from './styles.module.css';

const OrderInfoContainer = ({ user, orders, status, bankInfo, reasonsList, pageSize, listInvoiceInfo, isMobile }) => (
  <Grid item container spacing={3}>
    {/* <Grid item xs={12}>
      <Alert severity="warning">
        Bạn đang sử dụng hệ thống phiên bản mới. Thông tin đơn hàng cũ của bạn đang được tạm ẩn. Chúng tôi đang xử lý và sẽ hiển thị lại trong thời
        gian sớm nhất có thể.
      </Alert>
    </Grid> */}
    <Grid item xs={12} key="order-info-1">
      <div className={styles.detail}>
        Xem thông tin xuất hoá đơn đỏ &nbsp;
        <a href={PATH_INFO_BILL}>tại đây</a>
      </div>
    </Grid>
    <Grid item xs={12} key="order-info-2">
      <OrderInfoTabs
        user={user}
        orders={orders}
        status={status}
        bankInfo={bankInfo}
        reasonsList={reasonsList}
        pageSize={pageSize}
        listInvoiceInfo={listInvoiceInfo}
        isMobile={isMobile}
      />
    </Grid>
  </Grid>
);

export default OrderInfoContainer;
