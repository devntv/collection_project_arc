/* eslint-disable no-shadow */
import { Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { EnumsTicket } from 'constants/Enums';
import { TIME } from 'constants/Icons';
import { formatDate3 } from 'utils/FormatDate';
import styles from './styles.module.css';

const isDay = true;

const TicketItem = ({ ticket }) => {
  const { type, status, createdTime, feedbackContent, reasonsInfo, orderId, ticketId, code } = ticket;

  const codeTicket = {
    PROMOTION: ticketId,
    ORDER: orderId,
    PRODUCT: code,
  };

  return (
    <Grid container className={clsx(styles.rootLinkItem)}>
      <Grid item xs={12}>
        <div className={styles.wrapperHeadLinkItem}>
          <Grid xs={7} className={styles.wrapperLine1LinkItem}>
            <div className={styles.titleLinkItem}>Phiếu Hỗ Trợ</div>
            <div>
              <span className={styles.labelTimeLinkItem}>Vấn đề </span>
              <span className={styles.typeTimeLinkItem}>{EnumsTicket.TYPE_OF_TICKET_SUPPORT[type]}</span>
            </div>
            {codeTicket[type] && (
              <div>
                <span className={styles.labelTimeLinkItem}>Lý do </span>
                <span className={styles.typeTimeLinkItem}>{reasonsInfo?.length > 0 && reasonsInfo[0]?.name}</span>
              </div>
            )}
          </Grid>
          <Grid item xs={5} className={styles.wrapperLink2LinkItem}>
            <div className={styles.wrapperStatusLinkItem}>
              <div className={styles.statusLinkItem} style={{ backgroundColor: EnumsTicket.BACKGROUND_COLOR_STATUS[status] }} />
              <Typography className={styles.textStatusOrder} variant="h6">
                {EnumsTicket.TYPE_OF_STATUS[status]}
              </Typography>
            </div>
            {codeTicket[type] && (
              <Typography className={styles.textTimeLinkItem} variant="caption">
                #{codeTicket[type] || ''}
              </Typography>
            )}
            <div className={styles.wrapperTimeLinkItem}>
              <TIME />
              <Typography className={styles.textTimeLinkItem} variant="caption">
                {formatDate3(createdTime, isDay)}
              </Typography>
            </div>
          </Grid>
        </div>
      </Grid>
      <div className={clsx(styles.contentTicket, 'lineLimit1')}>
        <span className={styles.labelTimeLinkItem}>Nội dung</span> <span className={styles.typeTimeLinkItem}>{feedbackContent}</span>
      </div>
    </Grid>
  );
};
export default TicketItem;
