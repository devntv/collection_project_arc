import { useEffect, useRef } from "react"

export const useIsFirstRender = () => {
    const firstRenderRef = useRef(true);
    useEffect(() => {
        firstRenderRef.current = false;
    }, [])
    return firstRenderRef.current;
}