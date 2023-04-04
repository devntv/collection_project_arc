import { useCallback, useReducer, useRef } from "react"

export const useEnhancedReducer = (reducer, initState, initializer) => {
	const lastState = useRef(initState)
	const getState = useCallback(() => lastState.current, [])
	const [state, dispatch] = useReducer((state, action) => {
		return lastState.current = reducer(state, action)
	},initState,initializer)
	return [
		state,
		dispatch,
		getState
	]
}