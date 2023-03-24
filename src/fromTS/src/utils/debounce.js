import { useEffect, useState } from 'react';

const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const debounceFunc = (time) => debounce((cb) => cb(), time);
export const debounceFunc100 = debounceFunc(100);
export const debounceFunc200 = debounceFunc(200);
export const debounceFunc300 = debounceFunc(300);
export const debounceFunc400 = debounceFunc(400);
export const debounceFunc500 = debounceFunc(500);
export const debounceFunc1000 = debounceFunc(1000);
export const debounceFunc1500 = debounceFunc(1500);

const DEFAULT_DELAY = 300;

export const useDebounce = (value, delay = DEFAULT_DELAY) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default debounce;
