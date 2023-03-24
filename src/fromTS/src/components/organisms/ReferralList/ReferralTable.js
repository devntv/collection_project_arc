import { TableRow, TableCell, Button } from '@material-ui/core';
import { InfoTable } from 'components/atoms';
import { DateTimeUtils } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import { ALIGN, REFERRAL_STATUS_LABEL } from 'constants/Enums';
import styles from './styles.module.css';

const heads = [
  { text: 'Số điện thoại', align: ALIGN.LEFT },
  { text: 'Mã giới thiệu', align: ALIGN.LEFT },
  { text: 'Thời gian hết hạn', align: ALIGN.LEFT },
  { text: 'Trạng thái', align: ALIGN.LEFT },
  // { text: 'Số đơn hàng đã thanh toán', align: ALIGN.LEFT },
  { text: 'Gửi lại SMS', align: ALIGN.LEFT },
];

function ReferralTable({ referrals, handleRetrySms }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <InfoTable heads={heads} className={styles.bottom_square}>
        {referrals.length > 0 ? (
          referrals.map((row) => (
            <TableRow hover key={uuidv4()}>
              <TableCell component="th" scope="row">
                {row.phone}
              </TableCell>
              <TableCell align="left">{row.code}</TableCell>
              <TableCell align="left">
                {DateTimeUtils.getFormattedDate(
                  new Date(row?.expireTime || null),
                  'DD/MM/YYYY HH:mm:ss',
                )}
              </TableCell>
              <TableCell align="left">
                {REFERRAL_STATUS_LABEL[row.status]}
              </TableCell>
              {/* <TableCell align="left">{row.paid}</TableCell> */}
              <TableCell align="left" className={styles.text_danger}>
                {row.canResendSMS ? (
                  <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-start' }}>
                    <Button
                      classes={{ root: styles.button_send_sms }}
                      onClick={() => handleRetrySms({ code: row.code })}
                    >
                      Gửi SMS
                    </Button>
                  </div>
                ) : (
                  <span className={styles.text_danger}>{row.message}</span>
                )}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow hover key={uuidv4()}>
            <TableCell component="th" scope="row" colSpan={5} align="center">
              Bạn chưa giới thiệu bạn bè
            </TableCell>
          </TableRow>
        )}
      </InfoTable>
    </div>
  );
}

export default ReferralTable;
