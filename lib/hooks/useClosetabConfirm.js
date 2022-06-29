import React from "react";

const active = (obj, ...stringArgs) => {
  if (obj && obj.addEventListener) obj.addEventListener(...stringArgs);
};

const unActive = (obj, ...stringArgs) => {
  if (obj && obj.removeEventListener) obj.removeEventListener(...stringArgs);
};

export function useActiveToggle(initialValue = false) {
  function useToggle(init, options) {
    const handleToggle = () =>
      setState((current) => (current === options[0] ? options[1] : options[0]));
    const [state, setState] = React.useState(init);
    const toggle = (vl) =>
      typeof value !== "undefined" ? setState(vl) : handleToggle();
    return [state, toggle];
  }
  return useToggle(initialValue, [true, false]);
}

export function useClosetabConfirm(
  enabled,
  msg = "Are you sure close this tab?"
) {
  const handle = React.useCallback(
    (e) => {
      const fEnable = typeof enabled === "function" ? enabled() : true;
      if (!fEnable) return;
      e.preventDefault();

      if (msg) e.returnValue = msg;

      return msg;
    },
    [enabled, msg]
  );

  React.useEffect(() => {
    if (!enabled) return;
    active(window, "beforeunload", handle);

    return () => unActive(window, "beforeunload", handle);
  }, [enabled, handle]);
}

// note: cach su dung - how to use
// const [active, toggle] = useActiveToggle();
// useClosetabConfirm(active)

// return (
//     <p>active: {`${active}`}</p>
//     <button onClick={() => toggle()}>{active ? 'Set active' : 'Set off'}</button>
// )
