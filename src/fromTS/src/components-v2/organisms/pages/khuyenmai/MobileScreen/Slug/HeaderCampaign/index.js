import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import TimerComponent from 'components-v2/atoms/Mobile/TimerComponent';
import NewCountdownTimer from 'components/mocules/StyledCountdownTimer';
import { FLASHSALE_ICON } from 'constants/Icons/mobile';
import { MEGA_SALE_ICON } from 'constants/Images';
import { format } from 'date-fns';
import useDidUpdateEffect from 'hooks/useDidUpdateEffect';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { ImageFallback } from 'utils';
import { calStatusTimeFunc } from 'utils/DateTimeUtils';
import { ImageFallbackStatic } from 'utils/ImageFallback';

import styles from './styles.module.css';

const curTime = new Date();

const HeaderCampaign = (props) => {
  const { flashSale, timerCurrent, setTimerCurrent } = props;

  let Icon;
  let title;

  // filter các thời gian campain trong ngày => lấy maximun 3
  const flashSaleTime = flashSale?.flashSaleTimesView
    ?.filter((item) => {
      const startTime = new Date(item?.startTime);
      return `${curTime.getMonth()}${curTime.getDate()}` === `${startTime.getMonth()}${startTime.getDate()}`;
    })
    .splice(0, 3);

  // timer hiện tại
  const currentTimer = flashSaleTime?.find((item) => item?.ref === timerCurrent);
  const currentStatus = calStatusTimeFunc(new Date(currentTimer?.startTime), new Date(currentTimer?.endTime));
  //  chỉ show count down timer khi campaign đang diễn ra
  const [showCountdown, setShowCountdown] = useState(currentStatus === 'ACTIVE');

  useDidUpdateEffect(() => {
    setShowCountdown(currentStatus === 'ACTIVE');
  }, [flashSale]);

  const isNormal = flashSale?.campaignType !== 'FLASH_SALE';

  switch (flashSale?.campaignType) {
    case 'FLASH_SALE':
      title = 'Flash sale';
      Icon = <ImageFallback src={FLASHSALE_ICON} alt="icon flash sale" className={styles.icon_img} />;
      break;

    case 'NORMAL':
      title = 'Mega Day';
      Icon = <ImageFallbackStatic src={MEGA_SALE_ICON} alt="icon mega sale" height="40" width="40" className={styles.icon_img} />;
      break;

    default:
  }
  const name = isNormal ? flashSale?.campaignName : title;

  const timeStart = flashSale?.startTime ? format(new Date(flashSale?.startTime), 'dd/MM') : '--/--';
  const timeEnd = flashSale?.endTime ? format(new Date(flashSale?.endTime), 'dd/MM') : '--/--';

  if (!Icon) {
    return (
      <Box style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Skeleton variant="rect" width="100px" height="25px" style={{ borderRadius: '4px' }} />
          <Skeleton variant="rect" width="120px" height="25px" style={{ borderRadius: '4px' }} />
        </Box>
        <Box>
          <Skeleton variant="rect" width="100%" height="40px" style={{ borderRadius: '4px' }} />
        </Box>
      </Box>
    );
  }

  return (
    <>
      <div className={styles.headerProduct}>
        <div className={styles.headerProductTitle}>
          <div style={{ flexShrink: 0 }}>{Icon}</div>
          <div style={{ marginLeft: '9px' }}>
            <strong className={`${styles.textHeader} lineLimit1`}>{name}</strong>
            {/* label hiện thị khoảng thời gian cho normal */}
            {isNormal && <h6 className={styles.dateRange}>{`Từ ${timeStart} đến ${timeEnd}`}</h6>}
          </div>
        </div>
        {/* countdown cho flashsale */}
        {showCountdown && !isNormal && <NewCountdownTimer dealEndDay={new Date(currentTimer?.endTime)} />}
        {/* countdown cho mega day */}
        {isNormal && <NewCountdownTimer dealEndDay={new Date(flashSale?.endTime)} />}
      </div>
      <TimerComponent
        isDetailPromotion
        setShowCountdown={setShowCountdown}
        timerCurrent={timerCurrent}
        setTimerCurrent={setTimerCurrent}
        flashSaleTimesView={flashSaleTime}
        handleSetTimerCurrent
      />
    </>
  );
};

HeaderCampaign.propTypes = {
  flashSale: PropTypes.object,
  flashSaleTimesView: PropTypes.array,
  timerCurrent: PropTypes.string,
  setTimerCurrent: PropTypes.func,
};

export default HeaderCampaign;
