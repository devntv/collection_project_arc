import { useEffect, useRef } from 'react';

// useEffect nhưng ignore first render
function useDidUpdateEffect(fn, dependencies = []) {
  const didMountRef = useRef(false);
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (didMountRef.current) return fn();
    didMountRef.current = true;
  }, dependencies);
}

export default useDidUpdateEffect;
