import { useEffect } from "react";

export function useLeaveTabDetect(onLeave) {
  useEffect(() => {
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () =>
      document.documentElement.removeEventListener("mouseleave", onLeave);
  }, []);
}

// note: how to use
// const [leave, setLeave] = useState(0);
// useLeaveDetection(() => setLeave((s) => s + 1));
// return (
//     <button>
//         {`You have left the page ${leave} times!`}
//     </button>
// );
