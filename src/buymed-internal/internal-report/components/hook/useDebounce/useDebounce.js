import { useEffect, useState } from "react";

const DEFAULT_DELAY = 300

export const useDebounce = (value, delay = DEFAULT_DELAY) => {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);
    
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    },[value, delay]);

    return debouncedValue;
}