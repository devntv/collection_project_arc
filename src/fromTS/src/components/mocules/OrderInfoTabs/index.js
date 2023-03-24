import { Grid, Paper, Tab, Tabs, withStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { LIMIT_DEFAULT } from 'clients';
import { Button } from 'components/atoms';
import { ENUM_ORDER_STATUS } from 'constants/Enums';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidV4 } from 'uuid';
import OrderRow from './OrderRow';
import styles from './styles.module.css';

const CustomTab = withStyles({
  root: {
    textTransform: 'none',
    minWidth: 130,
  },
  selected: {
    color: '#00b46e!important',
    fontWeight: 'bold',
  },
})(Tab);

const ComeHomeButton = styled(Button)`
  color: #fff !important;
  background-color: #00b46e !important;
  border-color: #00b46e !important;
  border: 1px solid transparent !important;
  padding: 0.375rem 0.75rem !important;
  font-size: 1rem !important;
  line-height: 1.5 !important;
  border-radius: 50px !important;
  text-transform: none !important;
`;

const tabs = [
  { label: 'Tất cả', value: ENUM_ORDER_STATUS.ALL },
  { label: 'Chờ Xác Nhận', value: ENUM_ORDER_STATUS.WAIT_TO_CONFIRM },
  { label: 'Đã Xác Nhận', value: ENUM_ORDER_STATUS.CONFIRMED },
  { label: 'Đang Xử Lý', value: ENUM_ORDER_STATUS.PROCESSING },
  { label: 'Đang Giao', value: ENUM_ORDER_STATUS.DELIVERING },
  { label: 'Đã Giao', value: ENUM_ORDER_STATUS.DELIVERED },
  { label: 'Hoàn Tất', value: ENUM_ORDER_STATUS.COMPLETED },
  { label: 'Huỷ', value: ENUM_ORDER_STATUS.CANCEL },
];

const limit = LIMIT_DEFAULT;

export default function OrderInfoTabs({ user, orders, status, bankInfo, reasonsList, pageSize, listInvoiceInfo, isMobile }) {
  const router = useRouter();
  const { offset = 0 } = router?.query || {};

  const [numPage, setNumpage] = useState((+offset + limit) / limit);
  const handleChangeOrderStatus = (statusR) => {
    router.push({
      pathname: router.pathname,
      query: {
        status: statusR,
      },
    });
    setNumpage(1);
  };

  const handleComehome = () => {
    router.push('/');
  };

  const handleChangePage = (_, page) => {
    const offsetByPage = (page - 1) * limit;
    setNumpage(page);
    router.push({
      pathname: router.pathname,
      query: {
        offset: offsetByPage,
        limit,
        status,
        // q: status !== ENUM_ORDER_STATUS.ALL && JSON.stringify({ status }),
      },
    });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} className={styles.tabs}>
        <Paper elevation={0}>
          <Tabs value={status} textColor="primary" centered classes={{ indicator: styles.indicator }}>
            {tabs &&
              tabs.map(({ label, value }) => (
                <CustomTab
                  key={uuidV4()}
                  label={label}
                  disableFocusRipple
                  disableRipple
                  onClick={() => handleChangeOrderStatus(value)}
                  value={value}
                />
              ))}
          </Tabs>
        </Paper>
      </Grid>
      {orders.length === 0 ? (
        <Grid item xs={12} container justifyContent="center">
          <div className={styles.not_order_container}>
            <div className={styles.not_order_title}>Không có đơn hàng</div>
            <div>
              <ComeHomeButton onClick={handleComehome}> Đến trang đặt hàng nhanh </ComeHomeButton>
            </div>
          </div>
        </Grid>
      ) : (
        <Grid item xs={12}>
          {orders &&
            orders.map((order) => (
              <OrderRow
                {...order}
                key={uuidV4()}
                user={user}
                handleSetOrderStatus={handleChangeOrderStatus}
                bankInfo={bankInfo}
                reasonsList={reasonsList}
                listInvoiceInfo={listInvoiceInfo}
                isMobile={isMobile}
              />
            ))}
        </Grid>
      )}

      {orders.length > 0 && (
        <Grid item xs={12}>
          <div className={styles.justify_center}>
            <Pagination defaultPage={numPage} count={pageSize} onChange={handleChangePage} page={numPage} />
          </div>
        </Grid>
      )}
    </Grid>
  );
}
