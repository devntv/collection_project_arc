import { useCallback, useEffect, useRef, useState } from "react";
import { useEventListener } from "./useClickOutSide";

export function useLocalStorage(key, init) {
  const getReadVL = useCallback(() => {
    if (typeof window === "undefined") return init;

    try {
      const item = window.localStorage.getItem(key);
      return item ? parseJSON(item) : init;
    } catch (error) {
      console.error(`Error cannot read key “${key}”:`, error);
      return init;
    }
  }, [init, key]);

  const [storedValue, setStoredValue] = useState(getReadVL);
  const setValueRef = useRef();

  setValueRef.current = (value) => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(newValue));

      setStoredValue(newValue);
      window.dispatchEvent(new Event("local-storage"));
    } catch (error) {
      console.warn(`Error adding "${key}" to storage:`, error);
    }
  };

  const setValue = useCallback((value) => setValueRef.current?.(value), []);

  useEffect(() => {
    setStoredValue(getReadVL());
  }, []);

  const handleStorageChange = useCallback(
    () => setStoredValue(getReadVL()),
    [getReadVL]
  );
  useEventListener("storage", handleStorageChange);
  useEventListener("local-storage", handleStorageChange);
  return [storedValue, setValue];
}

function parseJSON(value) {
  try {
    return value === "undefined" ? undefined : JSON.parse(value ?? "");
  } catch {
    return undefined;
  }
}
