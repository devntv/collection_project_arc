/* eslint-disable react/no-array-index-key */
import { Box, CircularProgress } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TicketItem from '../TicketItem';
import styles from '../styles.module.css';

const TicketList = ({ ticketList, isFetching = false, handleSelectItem }) => (
  <List className={styles.list} disablePadding>
    {ticketList?.map((ticket, index) => (
      <Box key={`list${index}${ticket?.sku?.code}`}>
        <ListItem
          disableGutters
          divider
          className={styles.listItem}
          onClick={() => {
            handleSelectItem(ticket);
          }}
        >
          <TicketItem ticket={ticket} />
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

export default TicketList;
