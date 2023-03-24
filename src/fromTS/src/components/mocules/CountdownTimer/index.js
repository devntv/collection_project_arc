import { NoSsr } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { calculateTimeLeft } from 'utils';

// thuannc
// TODO:
// MUST FIX

function CountdownTimer({ prefix, dealEndDay, ...otherProps }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(dealEndDay));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(dealEndDay));
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = [];
  Object.keys(timeLeft).forEach((interval) => {
    const val = timeLeft[interval];
    if (!val) {
      return;
    }
    // 05Jan2022 -> nếu > 30 ngày thì set lại 30 ngày, dài quá bể UI

    timerComponents.push(
      <span key={`timer-${Math.random()}`}>
        {val}
        {interval === 'days' ? ' ngày ' : null}
      </span>,
    );
  });

  return (
    <NoSsr>
      <div {...otherProps}>
        {prefix} {timerComponents.length ? timerComponents : <span>Hết khuyến mãi</span>}
      </div>
    </NoSsr>
  );
}

export default CountdownTimer;
