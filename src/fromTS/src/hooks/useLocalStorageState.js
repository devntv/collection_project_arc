import * as React from 'react';

const useLocalStorageState = (key, defaultValue = '', { serialize = JSON.stringify, deserialize = JSON.parse } = {}) => {
  const [state, setState] = React.useState(() => {
    if (typeof window !== 'undefined') {
      // here `window` is available
      const valueInLocalStorage = window.localStorage.getItem(key);
      if (valueInLocalStorage) {
        try {
          return deserialize(valueInLocalStorage);
        } catch (error) {
          window.localStorage.removeItem(key);
        }
      }
    }

    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  });

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }

    prevKeyRef.current = key;
    try {
      window.localStorage.setItem(key, serialize(state));
    } catch (error) {
      window.localStorage.removeItem(key);
    }
  }, [key, state, serialize]);

  return [state, setState];
};

export default useLocalStorageState;
