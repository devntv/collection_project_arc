import { useEffect, useLayoutEffect, useRef } from "react";

export const useCheckMount =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useEventListener(eName, handle, elements) {
  const saveHandleRef = useRef(handle);

  useCheckMount(() => {
    saveHandleRef.current = handle;
  }, [handle]);

  useEffect(() => {
    const targetE = elements?.current || window;

    if (!(targetE && targetE.addEventListener)) return;

    const eListener = (e) => saveHandleRef.current(e);
    targetE.addEventListener(eName, eListener);

    // clear clean up
    return () => targetE.removeEventListener(eName, eListener);
  }, [eName, elements]);
}

export function useClickOutSide(ref, handle, event = ["mousedown"]) {
  useEventListener(event, (event) => {
    const ele = ref?.current;
    if (!ele || ele.contains(event.target)) return;
    handle(event);
  });
}

// note: use
// const [count, setCount] = useState(0);
// const ref = useRef(null)
// const handleClick = () => setCount(count + 1);
// useClickOutSide(ref, handleClick)

// return (
//     <b>Clicked Outside {count} Times!</b>
//     <button ref={ref}>Click Outside Of Me!</button>
// )
