import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import { formatCurrency } from 'utils/FormatNumber';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

// function createData(data) {
//   return {
//     name: data['0'],
//     volume: data['1'],
//     price: data?.type === 'header' || data?.type === 'headerTitle' ? data['2'] : formatCurrency(data['2']),
//     vol: data['3'],
//     link: data['4'] || '',
//     type: data?.type,
//   };
// }

function ExcelConvertToTable({ rows = [] }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" stickyHeader>
        {/* <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={5}>
              Tên sản phẩm
            </TableCell>
          </TableRow>
        </TableHead> */}
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={uuidv4()}
              className={clsx(
                row.dataRows.name === null && styles.hiddenRow,
                row.type === 'header' ? styles.styleHeader : styles.styleData,
                row.type === 'headerTitle' && styles.styleHeaderTitle,
              )}
            >
              <TableCell
                colSpan={row.type === 'headerTitle' ? 4 : null}
                scope="row"
                className={clsx(row.type === 'header' ? styles.header : styles.data, row.type === 'headerTitle' && styles.headerTitle)}
              >
                {row.type === 'headerTitle' || row.type === 'header' ? (
                  <Typography
                    variant="subtitle2"
                    className={clsx(row.type === 'header' ? styles.header : styles.data, row.type === 'headerTitle' && styles.headerTitle)}
                  >
                    {row?.dataRows?.name || ''}
                  </Typography>
                ) : (
                  <LinkComp style={{ fontSize: '14px' }} href={row.dataRows.link}>
                    {row.dataRows.name}
                  </LinkComp>
                )}
              </TableCell>
              {row.type === 'headerTitle' ? null : (
                <>
                  <TableCell className={clsx(row.type === 'headerTitle' && styles.headerTitle)} align="left">
                    {row.dataRows.volume}
                  </TableCell>
                  <TableCell className={clsx(row.type === 'headerTitle' && styles.headerTitle)} align="left">
                    {row.dataRows.vol}
                  </TableCell>
                  <TableCell className={clsx(row.type === 'headerTitle' && styles.headerTitle)} align="right">
                    {row?.type === 'header' || row?.type === 'headerTitle' ? row?.dataRows.price : formatCurrency(row?.dataRows?.price)}
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ExcelConvertToTable;
