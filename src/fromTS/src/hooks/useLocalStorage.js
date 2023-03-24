/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef } from 'react';
import { TTL_CACHE_LOCAL } from 'sysconfig';
import { replacer, reviver } from 'utils/ArrUtils';
import ObjectUtils from 'utils/ObjectUtils';

const verDefault = 4;

function utf8ToB64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function b64ToUtf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
}

const serializeFuncDefault = ({ fieldNames, dataList }) =>
  dataList.map((item) => {
    const object = {};
    fieldNames?.forEach((name, index) => {
      object[index] = item[name];
    });

    return ObjectUtils.isEmpty(object) ? null : object;
  });
const deserializeFuncDefault = ({ fieldNames, dataList }) =>
  dataList.map((item) => {
    const object = {};
    fieldNames?.forEach((name, index) => {
      object[name] = item[index];
    });
    return ObjectUtils.isEmpty(object) ? null : object;
  });

const encodeData = (dataStr) => dataStr;

const decodeData = (itemStr) => itemStr;

export const useLocalStorage = ({
  defaultValue = null,
  key,
  ttl = TTL_CACHE_LOCAL || 900,
  getValueDefault,
  fieldNames = null,
  serializeFunc,
  deserializeFunc,
  ver = verDefault,
}) => {
  if (fieldNames && fieldNames.length === 0) {
    throw Error('Missing fieldNames');
  }

  const getWithExpiry = useRef((keyLocalStorage) => {
    try {
      const itemStr = window.localStorage.getItem(keyLocalStorage);
      if (!itemStr) {
        return null;
      }

      const decodeDt = decodeData(itemStr);

      const item = JSON.parse(decodeDt, reviver);
      // const item = JSON.parse(itemStr, reviver);
      const curTime = new Date().getTime();
      if ((item.expiry && curTime > item.expiry) || item.ver !== ver) {
        window.localStorage.removeItem(key);
        return null;
      }

      // deserialFunc
      let data = item.value;
      if (item && item.value) {
        if (fieldNames) {
          data = deserializeFuncDefault({ fieldNames, dataList: item.value });
        } else if (deserializeFunc) {
          data = deserializeFunc(item.value);
        }
      }

      return data;
    } catch (error) {
      return null;
    }
  }, []);

  const [value, setValue] = React.useState(() => getWithExpiry.current(key));

  const fetchData = async () => {
    const data = await getValueDefault();
    if (data) {
      setValue(data);
    }
    return data;
  };

  useEffect(() => setValue(() => getWithExpiry.current(key)), [key]);

  const getValue = useCallback(async () => {
    let dataLocalstorage = value;
    let dataLocalstorageSerilize = value;

    if (!dataLocalstorage) {
      dataLocalstorage = await fetchData();
    }

    if (dataLocalstorage) {
      if (fieldNames) {
        dataLocalstorageSerilize = serializeFuncDefault({ dataList: dataLocalstorage, fieldNames });
      } else if (typeof serializeFunc === 'function') {
        dataLocalstorageSerilize = serializeFunc(dataLocalstorage);
      }
    }

    const dataStr = JSON.stringify(
      {
        value: dataLocalstorageSerilize,
        expiry: ttl > 0 ? new Date().getTime() + ttl * 1000 : null,
        ver,
      },
      replacer,
    );
    const dataEncoded = encodeData(dataStr);
    try {
      window.localStorage.setItem(key, dataEncoded);
      setValue(dataLocalstorage);
    } catch (error) {
      // console.log(error.code);
      window.localStorage.clear();
    }
    return dataLocalstorage;
  });

  // React.useEffect(async () => {
  //   const stickyValue = getWithExpiry();
  //   console.log('🚀 ~ file: useLocalStorage.js ~ line 146 ~ React.useEffect ~ stickyValue', stickyValue);
  //   if (stickyValue !== null) {
  //     setValue(stickyValue);
  //   }
  // }, []);

  const remove = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setValue(undefined);
    } catch (error) {
      console.error(error);
    }
  }, [key, setValue]);

  return [value, getValue, remove];
};

export default useLocalStorage;

const makeLocalStorageFull = () => {
  try {
    while (true) {
      console.log('running ');
      localStorage.setItem(new Date() + Math.random(), new Date());
    }
  } catch (error) {
    if (error === 'QUOTA_EXCEEDED_ERR') {
      console.log('quota -> ');
    }
  }
};
