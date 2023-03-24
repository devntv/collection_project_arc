/* eslint-disable no-nested-ternary */
import { Box, Grid, Paper, Slider, Tooltip, Typography, withStyles } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Skeleton } from '@material-ui/lab';
import { CustomerClient, getData } from 'clients';
import clsx from 'clsx';
import { LoyaltyRulesContent } from 'constants/data';
import {
  ICON_DIAMOND_RANK,
  ICON_DIAMOND_RANK_ACTIVE,
  ICON_GOLD_RANK,
  ICON_GOLD_RANK_ACTIVE,
  ICON_PLATINUM_RANK,
  ICON_PLATINUM_RANK_ACTIVE,
  ICON_SLIVER_RANK,
  ICON_SLIVER_RANK_ACTIVE,
} from 'constants/Icons';
import { useModal } from 'hooks';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { DateTimeUtils, FormatNumber } from 'utils';
import deviceUtils from 'utils/deviceUtils';
import { v4 as uuidv4 } from 'uuid';
import ModalCustomer from './ModalCustomer';
import ModalRanking from './ModalRanking';
import styles from './styles.module.css';

const CustomizeTooltip = withStyles({
  tooltip: {
    backgroundColor: '#ffffff',
    boxShadow: ' 0px 0px 6px rgba(0, 0, 0, 0.05)',
    borderRadius: '5px',
    width: 'auto',
    maxWidth: '249px',
    border: '1px solid #e9e9e9',
    padding: '10px',
    color: 'black',
  },
})(Tooltip);

function HeadingRight({ levelDatas, customerDatas, isMobile }) {
  const router = useRouter();
  const [dataInfoRank, setDataInfoRank] = React.useState({});
  const [isHoverTooltip, setIsHoverTooltip] = React.useState(false);
  const [dataCaculateByMonth, setDataCaculateByMonth] = React.useState([]);
  const isTablet = deviceUtils.isTablet();
  const [openInfoRank, toggleInfoRank] = useModal();
  const [openCustomerModal, toggleCustomerModal] = useModal();
  const isDeviceMobile = isTablet || isMobile;
  const { levelPoint: levelCurrentWithPoint = 0, level } = customerDatas[0] || {};
  // const sortLevel = levelDatas?.sort((a, b) => a.point - b.point);

  const maxLevelPoint = levelCurrentWithPoint >= levelDatas[levelDatas?.length - 1]?.point;
  let valNextLevel = null;
  let valPreviousLevel = null;
  const nextLevel = levelDatas?.reduce((curr, data, index) => {
    // data trả ra object, nếu data.code === với level hiện tại thì trả về levelData tiếp theo (levelDatas[index + 1])
    if (data.code === customerDatas[0]?.level) {
      valNextLevel = levelDatas[index + 1];
    }
    if (!valNextLevel) return levelDatas[levelDatas?.length - 1];
    return valNextLevel;
  }, {});

  const previousLevel = levelDatas?.reduce((curr, data, index) => {
    // tương tự như nextLevel, data là object nếu data.code === level hiện tại và index >=0 thi trả ra levelData trước  (levelDatas[index - 1]),
    if (data.code === customerDatas[0]?.level && index >= 0) {
      valPreviousLevel = levelDatas[index - 1];
    }
    if (valPreviousLevel === null) return 0;
    return valPreviousLevel;
  }, {});

  // 3 months ago with to day -> logic in internal -> web allow
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    (async () => {
      const resDataCaculate = getData(await CustomerClient.updateCaculatePoints({ signal }));
      setDataCaculateByMonth(resDataCaculate);
    })();
    return () => controller.abort();
  }, []);

  const handleTimeWithThreeMonthAgo = () => {
    const date = new Date();
    if (dataCaculateByMonth?.length === 0) return <Skeleton height={20} width={120} />;
    return `${DateTimeUtils.getFormattedDate(
      new Date(date.getFullYear(), date.getMonth() - dataCaculateByMonth[0]?.numberOfMonthsCalLevel, 1),
      'DD/MM/YYYY',
    )} - ${DateTimeUtils.getFormattedDate(new Date(), 'DD/MM/YYYY')}`;
  };

  const handleValueWithCurrLevel = () => {
    // const percentPreviousLevel = 0;
    const maxPointWithCurrStep = 100;
    const { point: pointStepNextLevel } = nextLevel || {};
    const currentLevel = levelDatas?.find((item) => item.code === level);
    const { point: pointCurrentLevel } = currentLevel || 0;
    const percentWithStep = ((levelCurrentWithPoint - pointCurrentLevel) / (pointStepNextLevel - pointCurrentLevel)) * maxPointWithCurrStep;
    return percentWithStep;
  };

  const RulesLoyalty = () => (
    <Grid container xs={12} className={styles.wrapTooltip} item>
      <Grid item xs={12} className={styles.titleTooltip}>
        Cấp bậc và quyền lợi
      </Grid>
      <Grid item xs={12} className={styles.tooltipContent}>
        {LoyaltyRulesContent.content}
      </Grid>
    </Grid>
  );

  const RenderWithLevel = (levelCode, levelPoint, description) => {
    // const handleWithLinkfromEditor = (e) =>{
    //   const targetLink = e.target.closest('a')
    //   if(!targetLink) return
    //   e.preventDefault();
    //   console.log(targetLink.href);
    // }
    const InfoRankLabel = ({ levelLabel, point, descriptionLevel }) => (
      <div className={clsx(styles.wrapLevel)}>
        <Typography>{point}</Typography>
        <Box className={clsx(styles.levelLabelBox, levelDatas?.length <= 3 && levelLabel?.length >= 8 && styles.paddingLevel)}>
          <Typography>{levelLabel} </Typography>
          {isDeviceMobile ? (
            <InfoOutlinedIcon className={styles.iconCaclTitle} />
          ) : (
            <CustomizeTooltip enterTouchDelay={0} leaveTouchDelay={2000} interactive title={<ContentTooltipRanking desc={descriptionLevel} />}>
              <InfoOutlinedIcon className={styles.iconCaclTitle} />
            </CustomizeTooltip>
          )}
        </Box>
      </div>
    );

    const ContentTooltipRanking = ({ desc }) => {
      const handleWithLinkfromEditor = (e) => {
        const targetLink = e.target.closest('a');
        if (!targetLink) return;
        e.preventDefault();
        router.push(targetLink.href);
      };
      return (
        <div
          className={clsx(styles.tooltipRanking)}
          contentEditable="true"
          dangerouslySetInnerHTML={{ __html: desc }}
          onClick={handleWithLinkfromEditor}
          role="presentation"
        />
      );
    };

    switch (levelCode) {
      case 'LEVEL_SILVER':
        return <InfoRankLabel levelLabel="Bạc" point={levelPoint} key={uuidv4()} descriptionLevel={description} />;
      case 'LEVEL_GOLD':
        return <InfoRankLabel levelLabel="Vàng" point={levelPoint} key={uuidv4()} descriptionLevel={description} />;
      case 'LEVEL_PLATINUM':
        return <InfoRankLabel levelLabel="Bạch kim" point={levelPoint} key={uuidv4()} descriptionLevel={description} />;
      case 'LEVEL_DIAMOND':
        return <InfoRankLabel levelLabel="Kim cương" point={levelPoint} key={uuidv4()} descriptionLevel={description} />;
      default:
        return '';
    }
  };
  const handleModalLevel = (levelCode, desc) => {
    setDataInfoRank({ ...dataInfoRank, levelCode, desc });
    toggleInfoRank();
  };
  // console.log('sort', sortLevel);
  return (
    <Paper className={styles.headingRight}>
      <Grid item container>
        <Grid item container xs={5}>
          <Typography className={styles.titleRanking}>Điểm xếp hạng</Typography>
        </Grid>
        <Grid item container xs={7} justifyContent="flex-end">
          <Typography className={styles.datePoint}>{handleTimeWithThreeMonthAgo()}</Typography>
        </Grid>
      </Grid>
      <Grid container xs={12} styles={styles.wrapRankPoint} style={{ marginTop: '6px' }} item>
        <Grid item className={clsx(styles.rankPoint, maxLevelPoint && styles.heightMaxlevel)} xs={12}>
          <Typography className={styles.currPoint}>
            <span>{FormatNumber.formatFloatNumber(levelCurrentWithPoint)}</span>
            <span className={styles.points}>điểm</span>
          </Typography>
          {nextLevel?.point - levelCurrentWithPoint > 0 ? (
            <p style={{ marginTop: '20px', marginLeft: '6px', color: '#D55D2A' }}>
              Cần {FormatNumber.formatFloatNumber(FormatNumber.formatRoundOf(nextLevel?.point - levelCurrentWithPoint, 2)) || 0} điểm để thăng hạng
              <span style={{ textTransform: 'capitalize' }}> {nextLevel?.name} </span>
            </p>
          ) : (
            <div style={{ marginTop: '30px' }} />
          )}
        </Grid>

        <Grid container item xs={12} style={{ display: 'flex', flexWrap: 'nowrap', position: 'relative' }} alignItems="baseline">
          {levelDatas?.map((levelRank, index) => (
            <React.Fragment key={uuidv4()}>
              {(levelRank?.code === 'LEVEL_SILVER' && (levelRank?.code === level ? <ICON_SLIVER_RANK_ACTIVE /> : <ICON_SLIVER_RANK />)) ||
                (levelRank?.code === 'LEVEL_PLATINUM' && (levelRank?.code === level ? <ICON_PLATINUM_RANK_ACTIVE /> : <ICON_PLATINUM_RANK />)) ||
                (levelRank.code === 'LEVEL_GOLD' && (levelRank?.code === level ? <ICON_GOLD_RANK_ACTIVE /> : <ICON_GOLD_RANK />)) ||
                (levelRank.code === 'LEVEL_DIAMOND' && (levelRank?.code === level ? <ICON_DIAMOND_RANK_ACTIVE /> : <ICON_DIAMOND_RANK />))}
              <Slider
                className={clsx(
                  levelDatas?.length >= 4 ? styles.stepCtn : styles.stepCtnLarge,
                  // isMobile ? (levelRank?.point < 10 ? styles.stepMin : styles.stepLarge) : '',
                  levelRank?.code === level ? (styles.levelActive, styles.hiddenNextStep) : styles.hiddenStep,
                  nextLevel?.code !== levelRank.code ? styles.Enough : styles.notEnough,
                  previousLevel === 0 && styles.hiddenAllStep,
                  levelCurrentWithPoint > previousLevel?.point && levelRank?.code !== nextLevel?.code ? styles.completedStep : '',
                )}
                // disabled
                marks={[{ value: 0, label: [RenderWithLevel(levelRank?.code, levelRank?.point, levelRank?.description, index)] }]}
                value={handleValueWithCurrLevel(levelRank.point)}
                track={levelRank?.code === level ? 'normal' : false}
                onChangeCommitted={isDeviceMobile ? () => handleModalLevel(levelRank?.code, levelRank?.description) : null}
                step={null}
              />
            </React.Fragment>
          ))}
        </Grid>

        <Grid container xs={12} style={{ marginTop: '66px' }} item>
          <Grid item xs={12} container style={{ display: 'flex' }} alignItems="center">
            <Typography className={styles.levelCaclTitle}>Cách tính cấp bậc khách hàng</Typography>

            {isDeviceMobile ? (
              <InfoOutlinedIcon className={styles.iconCaclTitle} onClick={toggleCustomerModal} />
            ) : (
              <CustomizeTooltip title={<RulesLoyalty />} placement="top" enterTouchDelay={0} open={isHoverTooltip}>
                <InfoOutlinedIcon
                  className={styles.iconCaclTitle}
                  onClick={() => setIsHoverTooltip(true)}
                  onMouseOver={() => setIsHoverTooltip(true)}
                  onMouseLeave={() => setIsHoverTooltip(false)}
                />
              </CustomizeTooltip>
            )}
          </Grid>
          {isDeviceMobile && openCustomerModal && (
            <ModalCustomer open={openCustomerModal} onClose={toggleCustomerModal} contentLoyaltyCustomer={LoyaltyRulesContent.content} />
          )}
          {isDeviceMobile && openInfoRank && <ModalRanking open={openInfoRank} onClose={toggleInfoRank} dataInfoRank={dataInfoRank} />}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default HeadingRight;

// nextLevel?.point > levelRank?.point
