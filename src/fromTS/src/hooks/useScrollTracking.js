import { useRouter } from 'next/router';
import { useState } from 'react';
import { gtag } from 'utils';
import useScroll from './useScroll';

const scrollBreak = {
  scroll25: false,
  scroll50: false,
  scroll75: false,
  scroll100: false,
};

const useScrollTracking = (category) => {
  const scrollInfo = useScroll();
  const router = useRouter();
  const [breakPoints, setBreakPoints] = useState(scrollBreak);

  if (scrollInfo.percentage >= 25 && !breakPoints.scroll25 && !breakPoints.scroll50 && !breakPoints.scroll75 && !breakPoints.scroll100) {
    setBreakPoints({
      ...breakPoints,
      scroll25: true,
    });

    gtag.scrollDepth(router.asPath, category, 25);
  }

  if (scrollInfo.percentage >= 50 && !breakPoints.scroll50 && !breakPoints.scroll75 && !breakPoints.scroll100) {
    setBreakPoints({
      ...breakPoints,
      scroll50: true,
    });

    gtag.scrollDepth(router.asPath, category, 50);
  }

  if (scrollInfo.percentage >= 75 && !breakPoints.scroll75 && !breakPoints.scroll100) {
    setBreakPoints({
      ...breakPoints,
      scroll75: true,
    });

    gtag.scrollDepth(router.asPath, category, 75);
  }

  if (scrollInfo.percentage >= 95 && !breakPoints.scroll100) {
    setBreakPoints({
      ...breakPoints,
      scroll100: true,
    });

    gtag.scrollDepth(router.asPath, category, 100);
  }
};

export default useScrollTracking;
