import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import styles from './styles.module.css';

const InfoTable = ({ heads, children, className, stickyHeader }) => (
  <TableContainer component={Paper} className={className}>
    <Table className={styles.table} stickyHeader={stickyHeader}>
      <TableHead>
        <TableRow>
          {heads.map((head) => (
            <TableCell key={uuidv4()} classes={{ root: styles.table_head }} align={head.align}>
              {head.text}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>{children}</TableBody>
    </Table>
  </TableContainer>
);

const StyledInfoTable = styled(InfoTable)`
    &.MuiPaper-rounded {
      border-radius: 10px !important;
      border-bottom-right-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
    }
`;

export default StyledInfoTable;
