/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useMemo, useState } from 'react';

export default function useOnScreen(ref, isActive = true) {
  if (!IntersectionObserver) {
    return false;
  }

  const [isIntersecting, setIsIntersecting] = useState(false);

  const options = {
    threshold: 0.8,
  };

  const observer = useMemo(() => new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting), options), []);

  const onScroll = () => {
    if (ref?.current) {
      observer.observe(ref.current);
    }
  };

  useEffect(() => {
    if (!isActive) {
      return () => {
        observer.disconnect();
      };
    }

    if (ref?.current) {
      observer.observe(ref.current);
    }

    document.addEventListener('scroll', onScroll, true);
    document.addEventListener('touchmove', onScroll, true);

    return () => {
      observer.disconnect();
      document.removeEventListener('scroll', onScroll, true);
      document.addEventListener('touchmove', onScroll, true);
    };
  }, [ref, observer]);

  return isIntersecting;
}
