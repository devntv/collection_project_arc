import { useState } from "react";
import { useEventListener } from "./useClickOutSide";

const getPositionValue = () =>
  typeof window !== "undefined"
    ? { x: window.pageXOffset, y: window.pageYOffset }
    : { x: 0, y: 0 };

const setPosition = ({ x, y }) => {
  if (typeof window !== "undefined") {
    const scrollOptions = { behavior: "smooth" };

    if (typeof x === "number") scrollOptions.left = x;
    if (typeof y === "number") scrollOptions.top = y;

    window.scrollTo(scrollOptions);
  }
};

export function useScrollPosition() {
  const [currentPosition, setCurrentPosition] = useState(getPositionValue());
  ["scroll", "resize"].forEach((item) =>
    useEventListener(item, () => setCurrentPosition(getPositionValue()))
  );

  return [currentPosition, setPosition];
}

// note: how to use
// const [scroll, setScroll] = useScrollPosition();

// return (
//     <>
//         <b>Position when you scroll: {`X: ${scroll.x}, Y: ${scroll.y}`}!</b>
//         <button onClick={() => setScroll({ y: document.body.scrollHeight })}>
//             Scroll To bottom page
//         </button>
//     </>
// );
