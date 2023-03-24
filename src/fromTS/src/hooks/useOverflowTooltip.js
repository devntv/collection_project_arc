import { useEffect, useRef, useState } from 'react';

function useOverflowTooltip() {
  const [isOverflowed, setIsOverflow] = useState(false);
  const textElementRef = useRef();
  useEffect(() => {
    setIsOverflow(textElementRef?.current?.scrollHeight > textElementRef?.current?.clientHeight);
  }, []);
  return [isOverflowed, textElementRef];
}

export default useOverflowTooltip;
