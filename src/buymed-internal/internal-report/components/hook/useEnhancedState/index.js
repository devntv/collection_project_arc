import { useEffect, useState, useRef, useCallback } from "react"

export const useEnhancedState = (defaultValue) => {
	const lastState = useRef(defaultValue)
	const getState = useCallback(() => lastState.current, [])
	const [state, setState] = useState(defaultValue);

    useEffect(()=>{
        lastState.current = state;
    });

	return [
        state,
        getState,
		setState,
	]
}