import { Typography as MuiTypography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@material-ui/lab';
import { spacing } from '@material-ui/system';
import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';
import { DateTimeUtils } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const useStyles = makeStyles({
  missingOppositeContent: {
    '&:before': {
      content: 'unset !important',
    },
  },
});
const Typography = styled(MuiTypography)(spacing);

const StatusOrder = ({ logsTpl, orderCode }) => {
  const classes = useStyles();
  if (!orderCode || orderCode.length === 0) {
    return <></>;
  }
  return (
    <div className={styles.wrap}>
      <Timeline className={clsx(classes.missingOppositeContent, styles.timeline)}>
        {logsTpl && logsTpl.length > 0 ? (
          logsTpl.map((item, key) => (
            <TimelineItem className={styles.item} key={uuidv4()}>
              <TimelineSeparator>
                <TimelineDot color={key === logsTpl.length - 1 ? 'primary' : ''} />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography className={styles.header}>
                  {item.statusName} {item.createdSource && `( ${item.createdSource} )`}
                </Typography>
                <Typography className={styles.detail} t={1}>
                  {DateTimeUtils.getFormattedDate(new Date(item.lastUpdatedTime), 'HH:mm   Ngày DD, tháng MM, YYYY')}
                </Typography>
                {item?.trackingCode && (
                  <Typography className={styles.detail} t={1}>
                    Mã vận đơn: {item.trackingCode}
                  </Typography>
                )}

                {/* <Typography className={styles.detail} t={1}>
                  {item.tplStatusName}
                </Typography>

                {item.reason && (
                  <Typography className={styles.detail} t={1}>
                    {item.reason}
                  </Typography>
                )} */}
              </TimelineContent>
            </TimelineItem>
          ))
        ) : (
          <div>Đơn hàng chưa có thông tin vận chuyển. Xin vui lòng tra cứu lại sau </div>
        )}
      </Timeline>
    </div>
  );
};

export default StatusOrder;
