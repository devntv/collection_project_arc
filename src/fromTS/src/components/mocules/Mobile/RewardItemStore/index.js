import { Box, Fab, Grid, Paper, Typography } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import clsx from 'clsx';
import TimeReward from 'components/mocules/TimeReward';
import { GARMINICATION_STATUS } from 'constants/Enums';
import { useState } from 'react';
import { formatCurrency } from 'utils/FormatNumber';

import MobileAlert from 'components-v2/atoms/MobileAlert';
import { MOBILE_STORE_REWARD_EVENT } from 'components-v2/atoms/MobileAlert/constants';
import { ICON_MOBILE_ICON_DOUBLE_ARROW_RIGHT } from 'constants/Images/mobile/Icons';
import styles from './styles.module.css';

const MV2RewardItemStore = (props) => {
  const { reward, isMobileV2 = false } = props;
  const { name = '', details = {}, startTime, endTime, status = '', description = '' } = reward || {};
  const { condition = {}, reward: rewardDetail = undefined } = details[0] || {};
  const { target = 0 } = condition || {};
  const { label = '', color = '' } = GARMINICATION_STATUS.find((item) => item?.value === status) || {};
  const [toggleSeeMore, setToggleSeeMore] = useState(false);
  const [tabReward, setTabReward] = useState(MOBILE_STORE_REWARD_EVENT[0].value);

  const indexActiveTag = MOBILE_STORE_REWARD_EVENT.findIndex((option) => option.value === tabReward);
  const RenderRewardEventContent = () => (
    <div
      className={styles.mobileReward_content}
      dangerouslySetInnerHTML={{
        __html: tabReward === MOBILE_STORE_REWARD_EVENT[0].value ? description : rewardDetail?.description || '',
      }}
    />
  );
  return (
    <Grid>
      <Paper className={styles.wrap_detail}>
        <Box className={styles.header}>
          <Typography className={styles.name_detail}>{name}</Typography>
        </Box>
        <Box className={styles.wrap_content}>
          <Grid container justifyContent="flex-start">
            <Grid item container lg={6} md={8} sm={12} spacing={1}>
              <TimeReward startTime={startTime} endTime={endTime} isMobileV2={isMobileV2} />
            </Grid>
          </Grid>
          <Box style={{ display: 'flex', alignItems: 'center', margin: '20px 0 15px' }}>
            <FiberManualRecordIcon style={{ color: `${color}`, fontSize: '12px', marginRight: '4px' }} />
            <Typography>{label}</Typography>
          </Box>
          <Typography className={styles.revenue_label}>Doanh số yêu cầu</Typography>
          <Typography className={styles.target}>{formatCurrency(target)}</Typography>
          <Grid container spacing={2} style={{ marginTop: 20 }}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Typography className={styles.mobileReward_tab}>Thông tin chi tiết</Typography>
                <Box className={styles.mobileSeemore_container}>
                  <ICON_MOBILE_ICON_DOUBLE_ARROW_RIGHT />
                  <Typography
                    className={styles.mobileSeemore}
                    onClick={() => {
                      setToggleSeeMore(!toggleSeeMore);
                      setTabReward(MOBILE_STORE_REWARD_EVENT[0].value);
                    }}
                  >
                    Xem thêm
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Typography className={styles.mobileReward_tab}>Phần thưởng</Typography>
                <Box className={styles.mobileSeemore_container}>
                  <ICON_MOBILE_ICON_DOUBLE_ARROW_RIGHT />
                  <Typography
                    className={styles.mobileSeemore}
                    onClick={() => {
                      setToggleSeeMore(!toggleSeeMore);
                      setTabReward(MOBILE_STORE_REWARD_EVENT[1].value);
                    }}
                  >
                    Xem thêm
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <MobileAlert isOpen={toggleSeeMore} handleClose={() => setToggleSeeMore(false)} height="85%">
        <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'nowrap', whiteSpace: 'nowrap', overflowY: 'scroll', width: 'auto' }}>
          {MOBILE_STORE_REWARD_EVENT.map((child) => (
            <Box key={`tabs-${child.id}`} onClick={() => setTabReward(child.value)}>
              <Fab
                variant="extended"
                aria-label="all"
                className={clsx(MOBILE_STORE_REWARD_EVENT[indexActiveTag].value === child.value && styles.active, styles.rewardEvent_option)}
              >
                {child.title}
              </Fab>
            </Box>
          ))}
        </Box>
        <Box sx={{ maxHeight: '400px', marginTop: 20, overflowY: 'scroll' }}>
          <RenderRewardEventContent />
        </Box>
      </MobileAlert>
    </Grid>
  );
};

export default MV2RewardItemStore;
