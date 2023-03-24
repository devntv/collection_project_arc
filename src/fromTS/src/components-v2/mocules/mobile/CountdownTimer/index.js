import { NoSsr } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { calculateTimeLeft } from 'utils';

// thuannc
// TODO:
// MUST FIX

function MobileCountdownTimer({ prefix, dealEndDay, ...otherProps }) {
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

    /**
     *  bổ sung rules cho UI mobile v2
     *  + countdown có thêm ngày -> chia 2 dòng 1 dòng ngày 1 dòng giờ:phút:giây
     *  + countdown không có ngày -> 1 dòng giờ:phút:giây
     */
    
    let Tag = 'span';
    if(interval === 'days') Tag = 'div' 
    
    timerComponents.push(
      <Tag key={`timer-${Math.random()}`}>
        {val}
        {interval === 'days' ? ' ngày ' : null}
      </Tag>,
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

export default MobileCountdownTimer;
