import { useCallback, useEffect, useRef } from "react";
import random from "./random";

const useRandomInterval = (callback, minDelay, maxDelay) => {
  const timeoutId = useRef(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    let isEnabled =
      typeof minDelay === "number" && typeof maxDelay === "number";
    if (isEnabled) {
      const handleTick = () => {
        const nextTickAt = random(minDelay, maxDelay);
        timeoutId.current = window.setTimeout(() => {
          savedCallback.current();
          handleTick();
        }, nextTickAt);
      };
      handleTick();
    }
    return () => window.clearTimeout(timeoutId.current);
  }, [minDelay, maxDelay]);

  const cancel = useCallback(() => {
    window.clearTimeout(timeoutId.current);
  }, []);

  return cancel;
};

export default useRandomInterval;
