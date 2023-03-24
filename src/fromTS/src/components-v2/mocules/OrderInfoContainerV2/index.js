import { Grid } from '@material-ui/core';
import OrderInfoTabsV2 from '../OrderInforTabV2';

const OrderInfoContainerV2 = ({
  user,
  orders,
  status,
  bankInfo,
  reasonsList,
  pageSize,
  listInvoiceInfo,
  isMobile,
  total,
  tabValue,
  handleChange,
}) => (
  <>
    {/* <OrderTop /> */}
    <Grid item container spacing={3}>
      <Grid item xs={12} key="order-info-2">
        <OrderInfoTabsV2
          user={user}
          orders={orders}
          status={status}
          bankInfo={bankInfo}
          reasonsList={reasonsList}
          pageSize={pageSize}
          listInvoiceInfo={listInvoiceInfo}
          isMobile={isMobile}
          total={total}
          tabValue={tabValue}
          handleChange={handleChange}
        />
      </Grid>
    </Grid>
  </>
);

export default OrderInfoContainerV2;
