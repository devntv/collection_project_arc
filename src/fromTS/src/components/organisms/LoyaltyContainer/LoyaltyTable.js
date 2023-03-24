import { TableCell, TableRow } from '@material-ui/core';
import { InfoTable } from 'components/atoms';
import { ALIGN, LOYALTY_HISTORY_TYPE } from 'constants/Enums';
import { MY_ORDER_URL } from 'constants/Paths';
import { DateTimeUtils, FormatNumber } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const heads = [
  { text: 'Thời gian', align: ALIGN.LEFT },
  { text: 'Nội dung', align: ALIGN.LEFT },
  { text: 'Số điểm', align: ALIGN.RIGHT },
];

const headsLevelPoint = [
  { text: 'Thời gian', align: ALIGN.LEFT },
  { text: 'Nội dung', align: ALIGN.LEFT },
  { text: 'Giá trị đơn hàng', align: ALIGN.RIGHT },
  { text: 'Số điểm', align: ALIGN.RIGHT },
];
const headsLevelPointMobile = [
  { text: 'Thời gian', align: ALIGN.LEFT },
  { text: 'Giá trị đơn hàng', align: ALIGN.LEFT },
  { text: 'Số điểm', align: ALIGN.RIGHT },
];

const getReferText = (item, type, isMobile) => {
  if (type === 'level' && isMobile)
    return (
      <div>
        Đơn hàng
        <a href={`${MY_ORDER_URL}/${item.orderId}`}>
          <b> #{item.orderId}</b>
        </a>{' '}
        - {FormatNumber.formatCurrency(item?.totalPrice)}
      </div>
    );
  if (type === 'level')
    return (
      <div>
        Điểm tích luỹ từ đơn hàng
        <a href={`${MY_ORDER_URL}/${item.orderId}`}>
          <b> #{item.orderId}</b>
        </a>
      </div>
    );
  if (item.type === LOYALTY_HISTORY_TYPE.INCREMENT)
    return (
      <div>
        Nhận điểm từ đơn hàng
        <a href={`${MY_ORDER_URL}/${item.orderId}`}>
          <b> #{item.orderId}</b>
        </a>
      </div>
    );
  if (item.type === LOYALTY_HISTORY_TYPE.DECREMENT) {
    if (item?.reason === 'RESET') return <div>Trừ điểm tích lũy do hết hạn vào 31/12/2022</div>;
    if (item?.rewards?.[0]?.type === 'ABSOLUTE')
      return (
        <div>
          Đổi thành công mã giảm giá
          <b> {FormatNumber.formatCurrency(item?.rewards[0].absoluteDiscount, '.', 'VND')} </b> -
          <b className={styles.voucherCode}> {item.voucherCode} </b>
        </div>
      );
    if (item?.rewards?.[0]?.type === 'PERCENTAGE')
      return (
        <div>
          Đổi thành công mã giảm giá
          <b> {item?.rewards[0].percentageDiscount}% </b> -<b className={styles.voucherCode}> {item.voucherCode} </b>
        </div>
      );
    return (
      <div>
        Đổi thành công mã quà tặng -<b className={styles.voucherCode}> {item.voucherCode} </b>
      </div>
    );
  }
  return null;
};

function LoyaltyTable({ data = [], type = '', isMobile }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <InfoTable
        heads={(type === 'loyalty' && heads) || (isMobile && headsLevelPointMobile) || headsLevelPoint}
        className={styles.bottom_square}
        stickyHeader
      >
        {data.length > 0 ? (
          data.map((row) => (
            <TableRow hover key={uuidv4()}>
              <TableCell align="left">{DateTimeUtils.getFormattedDate(new Date(row?.createdTime || null), 'DD/MM/YYYY HH:mm:ss')}</TableCell>
              <TableCell align="left">{getReferText(row, type, isMobile)}</TableCell>
              {type === 'level' && !isMobile && <TableCell align="right">{FormatNumber.formatCurrency(row?.totalPrice)}</TableCell>}
              <TableCell
                align="right"
                style={{
                  color: LOYALTY_HISTORY_TYPE.INCREMENT === row.type ? '#09884D' : '#D03B29',
                }}
              >
                <span className={styles.point}>
                  {`${row.type === LOYALTY_HISTORY_TYPE.INCREMENT ? '+ ' : '- '}${FormatNumber.formatFloatNumber(Math.abs(row.point || 0))}`}
                </span>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow hover key={uuidv4()}>
            <TableCell component="th" scope="row" colSpan={4} align="center">
              {type === 'loyalty' ? 'Bạn chưa có điểm tích luỹ' : 'Bạn chưa có điểm xếp hạng'}
            </TableCell>
          </TableRow>
        )}
      </InfoTable>
    </div>
  );
}

export default LoyaltyTable;
