import React from 'react';
import { LinearProgress, Typography } from '@material-ui/core';
import { formatDate } from 'utils/FormatDate';
import CountdownTimer from '../CountdownTimer';

import styles from './styles.module.css';

const DealSection = ({ dealEndDay, dealReady, dealStartTime, maxQuantity, totalSold = 0, total = 0 }) => {
  const startDate = formatDate(dealStartTime);
  const totalSoldPercent = (totalSold / total) * 100;
  return (
    <div className={styles.deal_section}>
      <div className={styles.process_wrapper}>
        <LinearProgress
          classes={{
            root: styles.root_process,
            barColorPrimary: styles.bar_background,
            colorPrimary: styles.blur_background,
          }}
          variant="determinate"
          value={totalSoldPercent}
        />
        <Typography className={styles.process_content}>
          {dealReady && maxQuantity === totalSold && 'Hết hàng'}
          {dealReady && maxQuantity > totalSold && totalSoldPercent < 75 && `Đã bán ${totalSold}`}
          {dealReady && maxQuantity > totalSold && totalSoldPercent >= 75 && 'Sắp bán hết'}
          {!dealReady && 'Sắp mở bán'}
        </Typography>
      </div>
      {dealReady ? <CountdownTimer className={styles.count_down} dealEndDay={dealEndDay} /> : <div className={styles.startDate}>{startDate}</div>}
    </div>
  );
};

export default DealSection;
