import { useEffect, useRef, useState } from 'react';

const useScrollTrackingViewport = (options) => {
  const [inview, setInview] = useState(false);
  const targetRef = useRef(null);
  const funcObserverTracking = (entries) => {
    const [entry] = entries;
    setInview(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(funcObserverTracking, options);

    if (targetRef.current) observer.observe(targetRef.current);

    return () => {
      if (targetRef.current) observer.unobserve(targetRef.current);
    };
  }, [targetRef, options]);

  return [inview, targetRef];
};

export default useScrollTrackingViewport;
