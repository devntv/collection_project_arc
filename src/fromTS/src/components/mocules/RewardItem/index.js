import { Avatar, Box, CardActions, Chip, Divider, Grid, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import BorderLinearProgress from 'components/atoms/BorderLinearProgress';
import { AvatarCacheFromGG } from 'components/atoms/ImageStatic';
import { BRAND_NAME, GARMINICATION_STATUS } from 'constants/Enums';
import { AVATARV2_ICON } from 'constants/Images';
import { useSetting } from 'context';
import { gtag } from 'utils';
import { formatCurrency } from 'utils/FormatNumber';
import useMobileV2 from 'zustand-lib/storeMobile';
import TimeReward from '../TimeReward';
import styles from './reward.module.css';

// style mobile v2

const RewardItem = (props) => {
  const { reward, isMobile, handleOpenDetailProgram, idItem } = props;
  const { getNameSeller } = useSetting();
  const { name = '', details = [], startTime, endTime, status, gamificationID = '', sellerCode = '' } = reward || {};
  const sellerInfo = getNameSeller({ seller: { code: sellerCode } });
  const { sellerName = '', avatar = [], linkSeller = '', linkStore = '', slug = '' } = sellerInfo;
  const href = '/users/rewards/[slug]'.replace('[slug]', gamificationID);
  const { condition = {}, result = undefined } = details[0] || {};
  const { target = 0 } = condition || {};
  const btnStatus = GARMINICATION_STATUS.find((item) => item.value === status);

  const isMobileV2 = useMobileV2((state) => state.isMobileV2());

  // wrapper dành cho desktop và mobile V1 => xem chi tiết => chuyển sang url khác
  const WrapperV1 = ({ children }) => <Paper className={clsx(styles.reward_item)}>{children}</Paper>;
  // wrapper dành cho mobile V2 => xem chi tiết => show modal
  const WrapperV2 = ({ children }) => (
    <CardActions className={clsx(styles.reward_item, isMobileV2 && styles.reward_item_mv2)} onClick={() => handleOpenDetailProgram(idItem)}>
      {children}
    </CardActions>
  );

  const Wrapper = isMobileV2 ? WrapperV2 : WrapperV1;

  return (
    <Wrapper>
      <Chip
        className={clsx(styles.chip, {
          [styles.chip_mv2]: isMobileV2,
        })}
        label={btnStatus.label}
        style={{ width: '116px', background: `${btnStatus.background}`, color: `${btnStatus.color}` }}
      />
      {/* mobilev2 -> show modal 
       desktop or mobilev2 -> redirect url */}
      {isMobileV2 ? (
        <Typography
          className={clsx(styles.name, {
            [styles.name_mobile]: isMobile,
            [styles.name_mv2]: isMobileV2,
          })}
          onClick={() => {
            gtag.clickRewardDetail(name, gamificationID);
          }}
        >
          {name}
        </Typography>
      ) : (
        <LinkComp className={styles.link} href={href}>
          <Typography
            className={clsx(styles.name, {
              [styles.name_mobile]: isMobile,
              [styles.name_mv2]: isMobileV2,
            })}
            onClick={() => {
              gtag.clickRewardDetail(name, gamificationID);
            }}
          >
            {name}
          </Typography>
        </LinkComp>
      )}
      <Grid
        container
        spacing={1}
        className={clsx(styles.content, {
          [styles.content_mv2]: isMobileV2,
        })}
      >
        <Grid item xs={12} lg={2}>
          {slug ? (
            <Box className={styles.storeContainer}>
              <AvatarCacheFromGG className={clsx(isMobileV2 && styles.avatar_seller_mv2)} src={avatar[0] || AVATARV2_ICON} />
              <LinkComp href={linkStore !== '' ? linkStore : linkSeller} onClick={(e) => e.stopPropagation()}>
                <Typography
                  className={clsx(styles.seller, {
                    [styles.seller_mv2]: isMobileV2,
                  })}
                >
                  {sellerName}
                </Typography>
              </LinkComp>
            </Box>
          ) : (
            <Box style={{ display: 'flex', alignItems: 'center', padding: isMobileV2 ? '5px 0px' : '0px' }}>
              <Avatar className={clsx(isMobileV2 && styles.avatar_seller_mv2)} />
              <Typography
                className={clsx(styles.seller, {
                  [styles.seller_mv2]: isMobileV2,
                })}
              >
                {BRAND_NAME}
              </Typography>
            </Box>
          )}
        </Grid>
        {isMobileV2 && (
          <Grid container item xs={12} lg={7}>
            <TimeReward startTime={startTime} endTime={endTime} isMobileV2={isMobileV2} isList isMobile={isMobile} />
          </Grid>
        )}
        <Grid item xs={12} lg={3} className={styles.revenue}>
          <Typography
            className={clsx(styles.revenue_text, {
              [styles.revenue_text_mv2]: isMobileV2,
            })}
          >
            Doanh số yêu cầu
          </Typography>
          <Typography
            className={clsx(styles.revenue_request, {
              [styles.revenue_request_mv2]: isMobileV2,
            })}
          >
            {formatCurrency(target)}
          </Typography>
        </Grid>
        {!isMobileV2 && (
          <Grid container item xs={12} lg={7}>
            <TimeReward startTime={startTime} endTime={endTime} isMobileV2={isMobileV2} isList isMobile={isMobile} />
          </Grid>
        )}
      </Grid>
      {result && ((result?.status === 'IN_PROGRESS' && btnStatus?.value === 'PROCESSING') || result?.status === 'COMPLETED') && (
        <Box>
          <Divider style={{ marginBottom: isMobileV2 ? '8px' : '27px', marginTop: isMobileV2 ? '8px' : '0px' }} />
          <Grid container spacing={2} style={{ display: 'flex', alignItems: 'center' }}>
            <Grid item xs={12} sm={4} lg={3} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography style={{ color: '#7E7E7E', textTransform: 'capitalize', fontSize: isMobileV2 ? '12px' : '14px' }}>
                Doanh số tạm tính của bạn{' '}
              </Typography>
              {isMobile && (
                <Typography
                  style={{
                    color: result?.status === 'IN_PROGRESS' ? '#DC5C00' : '#09884D',
                    fontFamily: 'googlesansmedium',
                    marginLeft: '7px',
                    fontSize: isMobileV2 ? '12px' : '14px',
                  }}
                >
                  {formatCurrency(result?.value)}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={8} lg={5}>
              <BorderLinearProgress
                value={result?.status === 'IN_PROGRESS' ? (result?.value / target) * 100 : 100}
                variant="buffer"
                progressTxt={!isMobile && formatCurrency(result?.value)}
                status={result?.status}
              />
            </Grid>

            {(result?.status === 'IN_PROGRESS' && (
              <Grid item xs={12} lg={4}>
                <Typography style={{ color: '#DC5C00', fontSize: '12px', textTransform: 'capitalize' }}>
                  Cần {formatCurrency(target - result?.value)} để đạt điều kiện nhận thưởng!
                </Typography>
              </Grid>
            )) ||
              (slug && (
                <Grid item xs={12} lg={4}>
                  <Typography style={{ color: '#09884D', fontSize: '12px', textTransform: 'capitalize' }}>
                    Chúc mừng bạn đã đạt điều kiện nhận thưởng!
                  </Typography>
                </Grid>
              ))}

            <Grid item xs={12}>
              <Typography style={{ fontSize: '12px', color: '#7E7E7E' }}>
                Doanh số thực tế của bạn có thể chênh lệch. {BRAND_NAME} sẽ thực hiện đối soát doanh số sau khi chương trình kết thúc.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}
    </Wrapper>
  );
};

export default RewardItem;
