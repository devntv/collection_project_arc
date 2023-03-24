import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const TableData = ({ heads, children, className, stickyHeader, unSetMinWidth = false }) => (
  <Paper classes={{ root: styles.root }}>
    <TableContainer className={className}>
      <Table className={styles.table} stickyHeader={stickyHeader} aria-label="sticky table">
        <TableHead>
          <TableRow>
            {heads.map((head) => (
              <TableCell key={uuidv4()} classes={{ root: unSetMinWidth ? styles.tablle_origin : styles.table_head }} align={head.align}>
                {head.text}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  </Paper>
);

export default TableData;
