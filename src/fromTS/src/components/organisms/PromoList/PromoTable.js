import { Grid, Paper, TableCell, TableRow, Tooltip } from '@material-ui/core';
import { InfoTable } from 'components/atoms';
import { ALIGN } from 'constants/Enums';
import Link from 'next/link';
import { DateTimeUtils } from 'utils';
import { formatCurrency } from 'utils/FormatNumber';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const heads = [
  { text: 'Mã', align: ALIGN.LEFT },
  { text: 'Ngày nhận', align: ALIGN.LEFT },
  { text: 'Số lần sử dụng', align: ALIGN.LEFT },
  { text: 'Đã dùng (/lần)', align: ALIGN.LEFT },
  { text: 'Hạn dùng', align: ALIGN.LEFT },
  { text: 'Giá trị đơn hàng tối thiểu', align: ALIGN.LEFT },
  { text: 'Đã hết hạn', align: ALIGN.LEFT },
  { text: 'Đơn hàng liên quan', align: ALIGN.LEFT },
];

function PromoTable({ promos }) {
  return (
    <div className={styles.root}>
      <InfoTable heads={heads}>
        {promos.length !== 0 &&
          promos.map((row) => {
            let minOrderValue = 0;
            let value = 0;
            if (row.conditions && row.conditions.length > 0 && row.conditions[0].type === 'ORDER_VALUE' && row.conditions[0].minOrderValue) {
              minOrderValue = row.conditions[0].minOrderValue;
            }

            if (row.rewards && row.rewards.length > 0 && row.rewards[0].type === 'ABSOLUTE' && row.rewards[0].absoluteDiscount) {
              value = row.rewards[0].absoluteDiscount;
            }

            const { orderIds = [] } = row.used || {};
            const description = `Giảm ${formatCurrency(value)} cho đơn hàng tối thiểu ${formatCurrency(minOrderValue)}`;
            return (
              <TableRow key={uuidv4()} hover>
                <TableCell align="left">
                  <Tooltip title={description} aria-label="add" placement="top" arrow>
                    <Grid container direction="column">
                      <b style={{ color: '#17a2b8' }}>{row.code} </b>
                    </Grid>
                  </Tooltip>
                </TableCell>
                <TableCell align="left">{DateTimeUtils.getFormattedDate(new Date(row.createdTime), 'DD/MM/YYYY HH:mm')}</TableCell>
                <TableCell align="left">{row.maxUsagePerCustomer === -1 ? 'Không giới hạn' : row.maxUsagePerCustomer}</TableCell>
                <TableCell align="left">{row.used.amount || 0}</TableCell>
                <TableCell align="left">{DateTimeUtils.getFormattedDate(new Date(row.endTime), 'DD/MM/YYYY HH:mm')}</TableCell>
                <TableCell align="left">
                  <b>{formatCurrency(minOrderValue)}</b>
                </TableCell>
                <TableCell align="left">{row.isExpired ? 'Đã hết hạn' : 'Chưa hết hạn'}</TableCell>
                <TableCell align="left">
                  {orderIds?.map((orderId) => (
                    <b key={orderId} style={{ display: 'block' }}>
                      <Link href={`/my-order/${orderId}`} className={styles.related_order}>{`#${orderId}`}</Link>
                    </b>
                  ))}
                </TableCell>
              </TableRow>
            );
          })}
      </InfoTable>
      {promos.length === 0 && (
        <Grid container justifyContent="center">
          <Paper className={styles.not_use}>Bạn chưa dùng mã giảm giá nào</Paper>
        </Grid>
      )}
    </div>
  );
}

export default PromoTable;
