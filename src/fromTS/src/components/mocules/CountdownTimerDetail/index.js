import { NoSsr } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { calculateTimeLeft } from 'utils';

// thuannc
// TODO:
// MUST FIX

function CountdownTimerDetail({ prefix, dealEndDay, ...otherProps }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(dealEndDay));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(dealEndDay));
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = [];
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={`timer-${Math.random()}`}>
        {timeLeft[interval]}
        {interval === 'days' ? ' Ngày, ' : null}
      </span>,
    );
  });
  return (
    <NoSsr>
      <div {...otherProps}>
        {timerComponents.length ? (
          <>
            <span>{timerComponents}</span>
          </>
        ) : (
          <span>Khuyến mãi đã kết thúc</span>
        )}
      </div>
    </NoSsr>
  );
}

export default CountdownTimerDetail;
