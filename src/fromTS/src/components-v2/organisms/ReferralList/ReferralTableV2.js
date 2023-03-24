import { Box, TableCell, TableRow } from '@material-ui/core';
import clsx from 'clsx';
import ButtonV2 from 'components-v2/atoms/ButtonV2';
import TableData from 'components-v2/atoms/TableData';
import { ALIGN, REFERRAL_STATUS, REFERRAL_STATUS_LABEL } from 'constants/Enums';
import React from 'react';
import { DateTimeUtils } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const heads = [
  { text: 'Số điện thoại', align: ALIGN.LEFT },
  { text: 'Mã giới thiệu', align: ALIGN.LEFT },
  { text: 'Thời gian hết hạn', align: ALIGN.LEFT },
  { text: 'Trạng thái', align: ALIGN.LEFT },
  { text: 'Gửi lại SMS', align: ALIGN.LEFT },
];

function ReferralTableV2({ referrals, handleRetrySms }) {
  return (
    <Box className={styles.wrapTable}>
      <TableData heads={heads} stickyHeader>
        {referrals?.length > 0 ? (
          referrals?.map((row) => (
            <TableRow key={uuidv4()} className={styles.tableData}>
              <TableCell component="th" scope="row" align="left" className={styles.phoneData}>
                {row.phone}
              </TableCell>
              <TableCell align={heads.align} className={styles.codeData}>
                {row.code}
              </TableCell>
              <TableCell align={heads.align} className={styles.timeData}>
                {DateTimeUtils.getFormattedDate(new Date(row.expireTime || null), 'DD/MM/YYYY HH:mm:ss')}
              </TableCell>
              <TableCell
                align={heads.align}
                className={clsx(styles.statusData, row.status === 'APPROVED' && styles.success, row.status === 'DECLINED' && styles.declined)}
              >
                {REFERRAL_STATUS_LABEL[row.status]}
              </TableCell>
              <TableCell align={heads.align} className={styles.text_danger}>
                {row.canResendSMS && row?.status !== REFERRAL_STATUS.APPROVED ? (
                  <Box className={styles.btnResend}>
                    <ButtonV2 tooltipTitle="gửi lại sms" onClick={() => handleRetrySms({ code: row.code })}>
                      Gửi lại SMS
                    </ButtonV2>
                  </Box>
                ) : (
                  <Box className={styles.noticeSend}>{row.status === REFERRAL_STATUS.APPROVED ? '' : row.message}</Box>
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
      </TableData>
    </Box>
  );
}

export default ReferralTableV2;
