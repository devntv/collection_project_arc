import { useState, useLayoutEffect } from "react";
        
function useCountDown(callback, interval) {
    const [count, setCount] = useState(interval);

    useLayoutEffect(() => {
        const timer = setInterval(() => {
            setCount((prevCount) => prevCount - 1);
        }, 1000);

        if (count === 0) {
            callback();
            setCount(interval);
        }

        return () => clearInterval(timer);
    }, [count]);

    return count;
}

export default useCountDown;