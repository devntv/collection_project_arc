/* eslint-disable no-nested-ternary */
import { Grid, LinearProgress, Typography } from '@material-ui/core';
import clsx from 'clsx';
import MobileCountdownTimer from 'components-v2/mocules/mobile/CountdownTimer';
import { formatDate } from 'utils/FormatDate';
import useMobileV2 from 'zustand-lib/storeMobile';
import CountdownTimer from '../CountdownTimer';
import styles from './styles.module.css';

const DealSectionNew = ({ dealEndDay, dealReady, dealStartTime, totalSold = 0, isHappeningCampaign = false, percentDealSold = 0 }) => {
  const startDate = formatDate(dealStartTime);
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());

  return (
    <Grid
      container
      spacing={isMobileV2 ? 0 : 1}
      className={clsx(styles.deal_section, {
        [styles.deal_section_mv2]: isMobileV2,
      })}
    >
      <Grid
        item
        xs={isMobileV2 ? (dealReady ? 12 : 8) : 12}
        className={clsx(styles.process_wrapper, {
          [styles.process_wrapper_mv2]: isMobileV2,
        })}
      >
        {isHappeningCampaign && dealReady && percentDealSold === 100 ? (
          <></>
        ) : (
          <>
            <LinearProgress
              classes={{
                root: clsx(styles.root_process, isMobileV2 && styles.root_process_mv2),
                barColorPrimary: styles.bar_background,
                colorPrimary: styles.blur_background,
              }}
              variant="determinate"
              value={percentDealSold}
            />
            {!isHappeningCampaign && dealReady && percentDealSold === 100 && <Typography className={styles.process_content}>Hết hàng</Typography>}
            {dealReady && percentDealSold < 75 && <Typography className={styles.process_content}>{`Đã bán ${totalSold}`}</Typography>}
            {!dealReady && <Typography className={styles.process_content}>Sắp mở bán</Typography>}
            {dealReady && percentDealSold >= 75 && <Typography className={styles.process_content}>Sắp bán hết</Typography>}
          </>
        )}
      </Grid>
      {(isHappeningCampaign && <></>) ||
        (dealReady && (
          <Grid xs={isMobileV2 ? 4 : 12} item className={styles.count_down_container}>
            <Grid className={clsx(isMobileV2 && styles.countdown_timer_mv2)} item>
              {isMobileV2 ? (
                <MobileCountdownTimer className={styles.count_down} dealEndDay={dealEndDay} />
              ) : (
                <CountdownTimer className={styles.count_down} dealEndDay={dealEndDay} />
              )}
            </Grid>
          </Grid>
        )) ||
        (!dealReady && (
          <Grid
            item
            className={clsx(styles.startDate, {
              [styles.startDate_mv2]: isMobileV2,
            })}
          >
            {startDate}
          </Grid>
        ))}
    </Grid>
  );
};

export default DealSectionNew;
