import { Avatar, Box, CardActions, Grid, Paper, Tab, Typography } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import BorderLinearProgress from 'components/atoms/BorderLinearProgress';
import { BRAND_NAME, GARMINICATION_STATUS } from 'constants/Enums';
import { useSetting } from 'context';
import { useState } from 'react';
import { formatCurrency } from 'utils/FormatNumber';
import useMobileV2 from 'zustand-lib/storeMobile';
import TimeReward from '../TimeReward';
import styles from './reward.module.css';

// style including mobile v2

const RewardItemDetail = (props) => {
  const { reward, isMobile, arrow = false } = props;

  const { name = '', details = {}, startTime, endTime, status = '', description = '', sellerCode = '' } = reward || {};
  const { condition = {}, result = undefined, reward: rewardDetail = undefined } = details[0] || {};
  const { target = 0 } = condition || {};
  const { label = '', color = '', value: valueStatus } = GARMINICATION_STATUS.find((item) => item?.value === status) || {};
  // using for mobile v2
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  const [value, setValue] = useState('0');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { getNameSeller } = useSetting();
  const sellerInfo = getNameSeller({ seller: { code: sellerCode } });
  const { sellerName = '', avatar = [], linkSeller = '', linkStore = '', slug = '' } = sellerInfo;
  // using for desktop and mobile v1
  const WrapperDetailV1 = ({ children }) => <Paper className={styles.wrap_detail}>{children}</Paper>;

  const WrapperDetailV2 = ({ children }) => <>{children}</>;

  const WrapperDetail = isMobileV2 ? WrapperDetailV2 : WrapperDetailV1;

  // hiện thanh progress
  const ProgressBarCondition = () => {
    const ProgressBar = () => (
      <>
        {result && ((result?.status === 'IN_PROGRESS' && valueStatus === 'PROCESSING') || result?.status === 'COMPLETED') && (
          <>
            <Typography className={clsx(styles.revenue_label, isMobileV2 && styles.revenue_label_mv2)}>Doanh số tạm tính của bạn</Typography>
            {result && ((result?.status === 'IN_PROGRESS' && valueStatus === 'PROCESSING') || result?.status === 'COMPLETED') && (
              <Box style={{ width: isMobileV2 ? '100%' : '80%', marginTop: '30px', marginBottom: '10px' }}>
                <BorderLinearProgress
                  value={result?.status === 'IN_PROGRESS' ? (result?.value / target) * 100 : 100}
                  variant="buffer"
                  progressTxt={formatCurrency(result?.value)}
                  status={result?.status}
                  isMobile={isMobile}
                  arrow={arrow}
                />
              </Box>
            )}
            {result?.status === 'COMPLETED' && slug && isMobileV2 && (
              <Typography className={clsx(styles.completed_text, { [styles.completed_text_mv2]: isMobileV2 })}>
                Chúc mừng bạn đã đạt điều kiện nhận thưởng!
              </Typography>
            )}
            <Typography
              className={clsx(styles.note, {
                [styles.note_mv2]: isMobileV2,
              })}
            >
              Doanh số thực tế của bạn có thể chênh lệch. {BRAND_NAME} sẽ thực hiện đối soát doanh số sau khi chương trình kết thúc.{' '}
            </Typography>
          </>
        )}
      </>
    );

    return (
      <>
        {isMobileV2 && <ProgressBar />}
        {result?.status === 'IN_PROGRESS' && valueStatus === 'PROCESSING' && (
          <Typography className={clsx(styles.need_more, { [styles.need_more_mv2]: isMobileV2 })}>
            Cần {formatCurrency(target - result.value)} để đạt điều kiện nhận thưởng!
          </Typography>
        )}
        {result?.status === 'COMPLETED' && slug && !isMobileV2 && (
          <Typography className={clsx(styles.completed_text, { [styles.completed_text_mv2]: isMobileV2 })}>
            Chúc mừng bạn đã đạt điều kiện nhận thưởng!
          </Typography>
        )}
        {!isMobileV2 && <ProgressBar />}

        {!isMobileV2 && (
          <>
            <Typography className={clsx(styles.revenue_label)}>Doanh số yêu cầu</Typography>
            <Typography
              className={clsx(styles.target, {
                [styles.target_mv2]: isMobileV2,
              })}
            >
              {formatCurrency(target)}
            </Typography>
          </>
        )}
      </>
    );
  };

  const TabContentsMobileV2 = () => {
    // there are two states detail and reward
    const [tabState, setTabState] = useState('detail');

    const contentTab = {
      detail: description,
      reward: rewardDetail?.description || '',
    };

    return (
      <Box style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Box className={styles.tab_container_mv2}>
          <CardActions
            className={clsx(styles.tab_text_container_mv2, {
              [styles.tab_text_container_mv2_inactive]: tabState !== 'detail',
            })}
            onClick={() => {
              setTabState('detail');
            }}
          >
            <Typography className={styles.tab_text_mb2}>Thông Tin Chi Tiết</Typography>
          </CardActions>
          <CardActions
            className={clsx(styles.tab_text_container_mv2, {
              [styles.tab_text_container_mv2_inactive]: tabState !== 'reward',
            })}
            onClick={() => {
              setTabState('reward');
            }}
          >
            <Typography className={styles.tab_text_mb2}>Phần Thưởng</Typography>
          </CardActions>
        </Box>

        <Box style={{ padding: '20px 0px' }}>
          <Typography className={styles.revenue_label_mv2}>Doanh số yêu cầu</Typography>
          <Typography
            className={clsx(styles.target, {
              [styles.target_mv2]: isMobileV2,
            })}
          >
            {formatCurrency(target)}
          </Typography>
        </Box>
        <ProgressBarCondition />
        <Typography className={styles.description_mv2}>Mô tả</Typography>
        <div
          className={styles.tab_content_mv2}
          dangerouslySetInnerHTML={{
            __html: contentTab[tabState],
          }}
        />
      </Box>
    );
  };

  return (
    <Grid className={clsx(isMobileV2 && styles.container_mv2)}>
      <WrapperDetail>
        {/* turn off header in mobile v2 */}
        {!isMobileV2 && (
          <Box className={styles.header}>
            <Typography className={styles.name_detail}>{name}</Typography>
          </Box>
        )}

        <Box
          className={clsx({
            [styles.wrap_content]: !isMobileV2,
          })}
        >
          {/* turn off time & seller in mobile v2 */}
          {!isMobileV2 && (
            <>
              <Grid container justifyContent="flex-start">
                <Grid item container lg={8} md={9} sm={12}>
                  <TimeReward startTime={startTime} endTime={endTime} />
                </Grid>
              </Grid>
              <Box style={{ display: 'flex', alignItems: 'center', margin: '12px 0 5px 0' }}>
                <FiberManualRecordIcon style={{ color: `${color}`, fontSize: '12px', marginRight: '4px' }} />
                <Typography>{label}</Typography>
              </Box>
              {slug ? (
                <LinkComp
                  className={styles.link}
                  href={linkStore !== '' ? linkStore : linkSeller}
                  style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}
                >
                  <Avatar src={avatar[0]} />
                  <Typography className={styles.sellerDetail}>{sellerName}</Typography>
                </LinkComp>
              ) : (
                <Box style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                  <Avatar />
                  <Typography className={styles.sellerDetail}>{BRAND_NAME}</Typography>
                </Box>
              )}
            </>
          )}

          {!isMobileV2 && <ProgressBarCondition />}

          {isMobileV2 && <TabContentsMobileV2 />}

          {/* turn off tab context in mobile v2 => create the new one */}
          {!isMobileV2 && (
            <div className={styles.tabs}>
              <TabContext value={value}>
                <TabList indicatorColor="primary" onChange={handleChange} aria-label="tabs info">
                  <Tab label="Thông tin chi tiết" value="0" />
                  <Tab label="Phần thưởng" value="1" />
                </TabList>
                <TabPanel value="0" index={0}>
                  <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                  />
                </TabPanel>
                <TabPanel value="1" index={1}>
                  <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{
                      __html: rewardDetail?.description || '',
                    }}
                  />
                </TabPanel>
              </TabContext>
            </div>
          )}
        </Box>
      </WrapperDetail>
    </Grid>
  );
};

export default RewardItemDetail;
