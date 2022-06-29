import React, { useEffect } from "react";

const defaultEvents = ["keypress", "mousemove", "touchmove", "click", "scroll"];

const defaultOptions = {
  e: defaultEvents,
  initialState: true,
};

export function useIsWork(time, options) {
  const { e, initialState } = { ...defaultOptions, ...options };
  const [online, setOnline] = React.useState(initialState);
  const timer = React.useRef();

  useEffect(() => {
    const handleE = () => {
      setOnline(false);

      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setOnline(true), time);
    };

    e.forEach((event) => document.addEventListener(event, handleE));

    return () =>
      e.forEach((event) => document.removeEventListener(event, handleE));
  }, [time]);

  return online;
}

// note: cach su dung - how to use
// const isWork = useIsWork(2000)
// return <b>current status: {isWork 'work' : 'active'}</b>

// customize
// const work = useIsWork(1000, { events: ['click', 'touchstart', 'scroll'], initialState: false });

// return (
//   <b>

//       <b>Current Status: {idle ? 'work' : 'Active'}</b>
//   </>
