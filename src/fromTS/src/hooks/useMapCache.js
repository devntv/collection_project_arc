import React, { useCallback } from 'react';
import { replacer, reviver } from 'utils/ArrUtils';

const MAP_GLOBAL = new Map();

export const useMapCache = ({ defaultValue = null, key, ttl = 0, getValueDefault }) => {
  const [value, setValue] = React.useState(defaultValue);

  const getWithExpiry = useCallback(() => {
    const itemStr = MAP_GLOBAL.get(key);
    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr, reviver);

    if (item.expiry && new Date().getTime() > item.expiry) {
      MAP_GLOBAL.delete(key);
      return null;
    }
    return item.value;
  }, []);

  React.useEffect(() => {
    const stickyValue = getWithExpiry();

    if (stickyValue !== null) {
      setValue(stickyValue);
    } else if (getValueDefault) {
      const fetchData = async () => {
        const data = await getValueDefault();
        if (data) {
          setValue(data);
        }
      };
      fetchData();
    }
  }, [key]);

  React.useEffect(() => {
    const dataStr = JSON.stringify(
      {
        value,
        expiry: ttl > 0 ? new Date().getTime() + ttl * 1000 : null,
      },
      replacer,
    );
    MAP_GLOBAL.set(key, dataStr);
  }, [key, value]);

  const getValue = () => getWithExpiry();

  return [value, getValue];
};

export default useMapCache;
