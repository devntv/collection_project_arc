/* eslint-disable no-return-assign */
import { useCallback, useReducer, useRef } from 'react';

// update state when state change
export const useEnhancedReducer = (reducer, initState, initializer) => {
  const lastState = useRef(initState);
  const getState = useCallback(() => lastState.current, []);
  return [
    ...useReducer(
      (state, action) => (lastState.current = reducer(state, action)),
      initState,
      initializer,
    ),
    getState,
  ];
};

export default { useEnhancedReducer };
