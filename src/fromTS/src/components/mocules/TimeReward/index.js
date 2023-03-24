import { Grid, Typography } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import { formatDate2, formatDate3 } from 'utils/FormatDate';
import styles from './styles.module.css';

const TimeReward = ({ startTime = '', endTime = '', isList, isMobileV2 = false }) => {
  const fromDateText = isMobileV2 ? formatDate3(startTime) : formatDate2(startTime);
  const toDateText = isMobileV2 ? formatDate3(endTime) : formatDate2(endTime);

  return (
    <>
      <Grid item xs={12} sm={6} lg={6} className={isList ? styles.time : styles.time_detail}>
        <AccessTimeIcon style={{ color: '#5668BA', marginRight: '6px' }} />
        <Typography className={isMobileV2 && styles.mobileTime_from} style={{ marginRight: '11px' }}>
          Từ {fromDateText}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} lg={6} className={isList ? styles.time : styles.time_detail}>
        <AccessTimeIcon style={{ color: '#D4323B', marginRight: '6px' }} />
        <Typography className={isMobileV2 && styles.mobileTime_to}>Đến {toDateText}</Typography>
      </Grid>
    </>
  );
};

export default TimeReward;
