import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import styles from './styles.module.css';

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className={styles.timer}>Hết hạn...</div>;
  }
  return (
    <div className={styles.timer}>
      <div className={styles.value}>{remainingTime}</div>
    </div>
  );
};

const CircleTimer = ({ duration }) => (
  <CountdownCircleTimer
    isPlaying
    duration={duration}
    size={80}
    strokeWidth={8}
    colors={[
      ['#00b46e', 0.4],
      ['#3cb56b', 0.35],
      ['#9ac100', 0.25],
    ]}
  >
    {renderTime}
  </CountdownCircleTimer>
);
export default CircleTimer;
