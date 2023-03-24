import { CardActions } from '@material-ui/core';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { calStatusTimeFunc } from 'utils/DateTimeUtils';
import styles from './styles.module.css';

const TYPE_TIMER = {
  ACTIVE: {
    text: 'Đang Diễn Ra',
  },
  NEXT: {
    text: 'Sắp Diễn Ra',
  },
  DISABLED: {
    text: 'Đã Diễn Ra', // không bắt sự kiện onClick
  },
};

const TimerComponent = ({ setShowCountdown, setTimerCurrent, flashSaleTimesView = [], timerCurrent, isDetailPromotion = false }) => {
  const router = useRouter();
  const currentTimerRef = isDetailPromotion ? router?.query?.code : timerCurrent

  const changeTimerFlashSale = (timerCode = '') => {
    const url = `/khuyenmai/${router?.query?.slug}?code=${timerCode}`;
    router?.replace(
      url,
      undefined,
      { shallow: true },
    );
  };

  const ItemTimer = ({ handleSetTimerCurrent, status, timeLabel, isActive = false, codeTimer }) => (
    <CardActions
      className={clsx({
        [styles.timerComponent]: true,
        [styles.timerNotReady]: !(status === 'ACTIVE'),
        [styles.timerActive]: !(status === 'ACTIVE') && isActive,
        [styles.disabled]: status === 'DISABLED',
      })}
      onClick={() => {
        if (status !== 'DISABLED') {
          // ẩn - hiện countdown
          handleSetTimerCurrent();
          setShowCountdown(status === 'ACTIVE');
          if(isDetailPromotion) { // check nếu là trang chi tiết khuyến mãi 
            changeTimerFlashSale(codeTimer)
          }
        }
      }}
    >
      <h4 className="time">{timeLabel}</h4>
      <small className="conditions">{TYPE_TIMER[status]?.text}</small>
    </CardActions>
  );

  return (
    <div className={styles.wrapperTimer}>
      {flashSaleTimesView.map((item) => {
        const startTimeDate = new Date(item?.startTime);
        const endTimeDate = new Date(item?.endTime);
        const nameFlashSale = `${startTimeDate.getHours()}H`;
        const isActive = item?.ref === currentTimerRef;
        // const isInDay = curTime.getDate() === startTimeDate.getDate();
        return (
          <ItemTimer
            isActive={isActive}
            key={item?.ref}
            codeTimer={item?.ref}
            status={calStatusTimeFunc(startTimeDate, endTimeDate)}
            handleSetTimerCurrent={() => setTimerCurrent(item?.ref)}
            timeLabel={nameFlashSale}
          />
        );
      })}
    </div>
  );
};

export default TimerComponent;
