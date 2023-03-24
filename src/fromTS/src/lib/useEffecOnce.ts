import { useEffect, useRef } from 'react';

export default function useEffectOnce(fn: () => void, deps: []) {
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current) {
      fn();
    }
    return () => {
      ref.current = true;
    };
  }, [...deps, fn]);
}
