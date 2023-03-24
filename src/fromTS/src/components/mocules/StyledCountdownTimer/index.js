import { NoSsr, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { isDesktop } from 'react-device-detect';
import { calculateTimeLeftWithoutColon } from 'utils/calculateTimeLeft';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from './styles.module.css';

function NewCountdownTimer({ dealEndDay }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeftWithoutColon(dealEndDay));
  const beta = useMobileV2((state) => state.beta);
  const isMobileV2 = !isDesktop && beta;

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeftWithoutColon(dealEndDay));
    }, 1000);
    return () => clearTimeout(timer);
  });

  const isEmpty = (inputObject) => Object.keys(inputObject).length === 0;

  return (
    <NoSsr>
      <>
        {!isEmpty(timeLeft) ? (
          <div className={styles.container} key={`timer-${Math.random()}`}>
            {timeLeft?.days !== 0 && (
              <>
                <div
                  className={clsx(styles.wrapper_date, {
                    [styles.wrapper_date_mv2]: isMobileV2,
                  })}
                >
                  <Typography className={styles.date}>
                    {timeLeft?.days} {timeLeft?.days && 'ngày'}
                  </Typography>
                </div>
                <div className={styles.colon}>:</div>
              </>
            )}

            <div
              className={clsx(styles.wrapper_time, {
                [styles.wrapper_time_mv2]: isMobileV2,
              })}
            >
              <Typography className={styles.time}>{timeLeft?.hours}</Typography>
            </div>
            <div className={styles.colon}>:</div>

            <div
              className={clsx(styles.wrapper_time, {
                [styles.wrapper_time_mv2]: isMobileV2,
              })}
            >
              <Typography className={styles.time}>{timeLeft?.minutes}</Typography>
            </div>
            <div className={styles.colon}>:</div>

            <div
              className={clsx(styles.wrapper_time, {
                [styles.wrapper_time_mv2]: isMobileV2,
              })}
            >
              <Typography className={styles.time}>{timeLeft?.seconds}</Typography>
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    </NoSsr>
  );
}

export default NewCountdownTimer;
