import { useEffect, useRef, useState } from 'react';
import { getScrollBottom, getScrollPercentage, getScrollTop } from 'utils/scrollUtils';

// initialize throttlePause variable outside throttle function
let throttlePause;
 
const throttleFunc = (callback, time) => {
  // don't run the function if throttlePause is true
  if (throttlePause) return;
 
  // set throttlePause to true after the if condition. This allows the function to be run once
  throttlePause = true;
   
  // setTimeout runs the callback within the specified time
  setTimeout(() => {
    callback();
     
    // throttlePause is set to false once the function has been called, allowing the throttle function to loop
    throttlePause = false;
  }, time);
};

function useScroll(throttle = 100) {
  const scrollThrottle = useRef(throttle);
  const [scroll, setScroll] = useState({
    hasScrolled: false,
    top: 0,
    bottom: 0,
    percentage: 0,
  });

  useEffect(() => {
    scrollThrottle.current = throttle;
  }, [throttle]);

  useEffect(() => {
    const updateScroll = () => {
      setScroll({
        hasScrolled: true,
        top: getScrollTop(),
        bottom: getScrollBottom(),
        percentage: getScrollPercentage(),
      });
    };
    const scrollListener = throttleFunc(updateScroll, scrollThrottle.current);

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  return scroll;
}

export default useScroll;
