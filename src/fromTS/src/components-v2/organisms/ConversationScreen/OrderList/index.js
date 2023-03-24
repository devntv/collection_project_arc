/* eslint-disable react/no-array-index-key */
import { Box, CircularProgress } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import OrderItem from '../OrderItem';
import styles from '../styles.module.css';

const OrderList = ({ orderList, isFetching = false, handleSelectItem }) => (
  <List className={styles.list} disablePadding>
    {orderList?.map((order, index) => (
      <Box key={`list${index}${order?.sku?.code}`}>
        <ListItem
          disableGutters
          divider
          className={styles.listItem}
          onClick={() => {
            handleSelectItem(order);
          }}
        >
          <OrderItem order={order} />
        </ListItem>
      </Box>
    ))}
    {isFetching && (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0px' }}>
        <CircularProgress size="25px" />
      </div>
    )}
  </List>
);

export default OrderList;
