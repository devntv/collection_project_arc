import React from 'react';
import styles from './styles.module.css';

function CountDownEdit30Minutes({ minutes = 0, seconds = 0 }) {
  const [, setOver] = React.useState(false);
  const [time, setTime] = React.useState({
    // hours: parseInt(hours, 10),
    minutes: parseInt(minutes, 10),
    seconds: parseInt(seconds, 10),
  });

  const tick = () => {
    if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) setOver(true);
    else if (time.minutes === 0 && time.seconds === 0)
      setTime({
        // hours: time.hours - 1,
        minutes: 59,
        seconds: 59,
      });
    else if (time.seconds === 0)
      setTime({
        // hours: time.hours,
        minutes: time.minutes - 1,
        seconds: 59,
      });
    else
      setTime({
        // hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds - 1,
      });
  };

  React.useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });
  return <div className={styles.countDown}>Bạn còn {`${time.minutes.toString().padStart(2, '0')}`} phút để sửa đơn hàng</div>;
}

export default CountDownEdit30Minutes;
