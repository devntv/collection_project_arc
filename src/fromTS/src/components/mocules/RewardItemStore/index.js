import { Box, Grid, Paper, Typography, Tab, Button, Collapse } from '@material-ui/core';
import { useState, useRef, useEffect } from 'react';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { GARMINICATION_STATUS } from 'constants/Enums';
import clsx from 'clsx';
import { formatCurrency } from 'utils/FormatNumber';
import TimeReward from '../TimeReward';
import styles from './styles.module.css';

const RewardItemStore = (props) => {
  const { reward } = props;
  const { name = '', details = {}, startTime, endTime, status = '', description = '' } = reward || {};
  const { condition = {}, reward: rewardDetail = undefined } = details[0] || {};
  const { target = 0 } = condition || {};
  const { label = '', color = '' } = GARMINICATION_STATUS.find((item) => item?.value === status) || {};
  const [value, setValue] = useState('0');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [seeMore, setSeeMore] = useState(false);
  const [seeMoreReward, setSeeMoreReward] = useState(false);
  const [height, setHeight] = useState(0);
  const [heightReward, setHeightReward] = useState(0);

  const ref = useRef(null);
  const refReward = useRef(null);
  useEffect(() => {
    setHeight(ref?.current?.clientHeight || 0);
    setHeightReward(refReward?.current?.clientHeight || 0);
  });
  return (
    <Grid>
      <Paper className={styles.wrap_detail}>
        <Box className={styles.header}>
          <Typography className={styles.name_detail}>{name}</Typography>
        </Box>
        <Box className={styles.wrap_content}>
          <Grid container justifyContent="flex-start">
            <Grid item container lg={6} md={8} sm={12}>
              <TimeReward startTime={startTime} endTime={endTime} />
            </Grid>
          </Grid>
          <Box style={{ display: 'flex', alignItems: 'center', margin: '12px 0 15px 0' }}>
            <FiberManualRecordIcon style={{ color: `${color}`, fontSize: '12px', marginRight: '4px' }} />
            <Typography>{label}</Typography>
          </Box>
          <Typography className={styles.revenue_label}>Doanh số yêu cầu</Typography>
          <Typography className={styles.target}>{formatCurrency(target)}</Typography>
          <div className={styles.tabs}>
            <TabContext value={value}>
              <TabList indicatorColor="primary" onChange={handleChange} aria-label="tabs info">
                <Tab label="Thông tin chi tiết" value="0" />
                <Tab label="Phần thưởng" value="1" />
              </TabList>

              <TabPanel value="0" index={0}>
                <Collapse
                  in={seeMore}
                  collapsedSize="100px"
                  className={height > 90 && seeMore === false ? styles.content : clsx(styles.content, styles.content_full)}
                >
                  <div
                    ref={ref}
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                  />
                </Collapse>
                {height > 90 && (
                  <Box style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      className={styles.button}
                      onClick={() => {
                        setSeeMore(!seeMore);
                        if (seeMore)
                          window.scrollTo({
                            top: ref.current.offsetTop - 400,
                            behavior: 'smooth',
                          });
                      }}
                    >
                      {seeMore ? 'Ẩn' : 'Xem thêm'}
                    </Button>
                  </Box>
                )}
              </TabPanel>
              <TabPanel value="1" index={1}>
                <Collapse
                  in={seeMoreReward}
                  collapsedSize="100px"
                  className={heightReward > 90 && seeMoreReward === false ? styles.content : clsx(styles.content, styles.content_full)}
                >
                  <div
                    ref={refReward}
                    dangerouslySetInnerHTML={{
                      __html: rewardDetail?.description || '',
                    }}
                  />
                </Collapse>
                {heightReward > 90 && (
                  <Box style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      className={styles.button}
                      onClick={() => {
                        setSeeMoreReward(!seeMoreReward);
                        if (seeMoreReward)
                          window.scrollTo({
                            top: refReward.current.offsetTop - 400,
                            behavior: 'smooth',
                          });
                      }}
                    >
                      {seeMoreReward ? 'Ẩn' : 'Xem thêm'}
                    </Button>
                  </Box>
                )}
              </TabPanel>
            </TabContext>
          </div>
        </Box>
      </Paper>
    </Grid>
  );
};

export default RewardItemStore;
