import TimerComponent from 'components-v2/atoms/Mobile/TimerComponent';
import NewCountdownTimer from 'components/mocules/StyledCountdownTimer';
import { FLASH_SALE_ICON, MEGA_SALE_ICON } from 'constants/Images';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { calStatusTimeFunc } from 'utils/DateTimeUtils';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import styles from './styles.module.css';

const HeaderCampaign = (props) => {
  const { flashSale, flashSaleTimesView = [], timerCurrent, setTimerCurrent } = props;
  let Icon;
  let title;
  const isNormal = flashSale?.campaignType !== 'FLASH_SALE';

  switch (flashSale?.campaignType) {
    case 'FLASH_SALE':
      title = 'Flash sale';
      Icon = <ImageFallbackStatic src={FLASH_SALE_ICON} alt="icon flash sale" className={styles.icon_img} height="40" width="40" />;
      break;

    case 'NORMAL':
      title = 'Mega Day';
      Icon = <ImageFallbackStatic src={MEGA_SALE_ICON} alt="icon mega sale" height="40" width="40" className={styles.icon_img} />;
      break;

    default:
  }
  const name = isNormal ? flashSale?.campaignName : title;

  const countDownTimerValue = flashSaleTimesView?.find((item) => item?.ref === timerCurrent)?.endTime;

  const firstTimesView = flashSaleTimesView?.length ? flashSaleTimesView[0] : {};
  const startTimeDate = new Date(firstTimesView?.startTime);
  const endTimeDate = new Date(firstTimesView?.endTime);
  const firstTimeViewStatus = calStatusTimeFunc(startTimeDate, endTimeDate);

  //  chỉ show count down timer khi campaign đang diễn ra
  const [showCountdown, setShowCountdown] = useState(firstTimeViewStatus === 'ACTIVE');

  return (
    <>
      <div className={styles.headerProduct}>
        <div className={styles.headerProductTitle}>
          <div style={{ flexShrink: 0 }}>{Icon}</div>
          <div style={{ marginLeft: '9px' }}>
            <strong className={`${styles.textHeader} lineLimit1`}>{name}</strong>
            {isNormal && (
              <h6 className={styles.dateRange}>
                {`Từ ${format(new Date(flashSale?.startTime), 'dd/MM')} đến ${format(new Date(flashSale?.endTime), 'dd/MM')}`}
              </h6>
            )}
          </div>
        </div>
        {/* countdown cho flashsale */}
        {showCountdown && <NewCountdownTimer dealEndDay={new Date(countDownTimerValue)} />}
        {/* countdown cho mega day */}
        {isNormal && <NewCountdownTimer dealEndDay={new Date(flashSale?.endTime)} />}
      </div>
      <TimerComponent
        setShowCountdown={setShowCountdown}
        timerCurrent={timerCurrent}
        setTimerCurrent={setTimerCurrent}
        flashSaleTimesView={flashSaleTimesView}
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
